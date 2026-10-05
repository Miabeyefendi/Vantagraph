// Shared CDP helpers for the QA scripts. Never plays music on its own.
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SRC = __dirname;
const DIR = process.env.VG_QA_OUT || path.join(__dirname, "out"); // screenshots, json, sheets (gitignored)
fs.mkdirSync(DIR, { recursive: true });

async function connect() {
  const t = await (await fetch("http://127.0.0.1:9222/json")).json();
  const p = t.find((x) => x.type === "page" && x.url.includes("xpui"));
  const ws = new WebSocket(p.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = {}; const issues = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; }
    if (d.method === "Runtime.exceptionThrown") issues.push("EXC " + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text || "").split("\n").slice(0, 5).join(" <- ").slice(0, 420));
    if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") issues.push("ERR " + d.params.args.map((a) => a.value || a.description || "").join(" ").replace(/\u001b\[\d+m/g, "").slice(0, 220));
  };
  const send = (m, pa = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: pa })); });
  const ev = async (e) => {
    const r = await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error((r.result.exceptionDetails.exception?.description || "eval failed").split("\n")[0]);
    return r.result?.result?.value;
  };
  await send("Runtime.enable"); await send("Performance.enable");
  for (let i = 0; i < 40; i++) { const ok = await ev(`!!(window.Spicetify && Spicetify.Platform && Spicetify.Platform.History && Spicetify.Player && Spicetify.Player.data !== undefined && Spicetify.Platform.PlayerAPI && document.querySelector('#main-view'))`).catch(() => false); if (ok) break; await sleep(1500); }
  const metrics = async () => Object.fromEntries((await send("Performance.getMetrics")).result.metrics.map((x) => [x.name, x.value]));
  const pause = () => ev(`(async () => { const P = () => { try { return Spicetify.Player.isPlaying(); } catch (e) { const st = Spicetify.Platform.PlayerAPI && Spicetify.Platform.PlayerAPI._state; return st ? !st.isPaused : false; } }; for (let i = 0; i < 5 && P(); i++) { await Spicetify.Platform.PlayerAPI.pause(); await new Promise(r => setTimeout(r, 500)); } return P(); })()`);
  const go = async (route, wait = 3500) => { await ev(`Spicetify.Platform.History.push(${JSON.stringify(route)}); 1`); await sleep(wait); };
  const click = async (sel, wait = 1200) => { const ok = await ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (e) e.click(); return !!e; })()`); await sleep(wait); return ok; };
  const esc = async () => { await ev(`document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true })); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true })); 1`); await sleep(400); };
  const shot = async (file) => { const s = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(DIR, file), Buffer.from(s.result.data, "base64")); };
  // frame probe: counts rAF frames, long frames (>50ms) and the worst gap
  await ev(`(() => { if (window.__qa) return 1; const q = window.__qa = { n: 0, long: 0, worst: 0, last: performance.now(), loaf: 0, loafMax: 0 }; (function l(t) { const d = t - q.last; q.last = t; q.n++; if (d > 50) q.long++; if (d > q.worst) q.worst = d; requestAnimationFrame(l); })(performance.now()); try { new PerformanceObserver((list) => { for (const e of list.getEntries()) { q.loaf++; if (e.duration > q.loafMax) q.loafMax = e.duration; } }).observe({ type: "long-animation-frame", buffered: false }); } catch (e) {} return 1; })()`);
  // measure `ms` of whatever is going on; returns busy%, fps, long frames, worst gap, LoAF count/max
  const sample = async (ms = 2000) => {
    for (let t = 0; t < 4 && (await ev(`document.visibilityState`)) !== "visible"; t++) { park(); await sleep(1200); }
    const m0 = await metrics(); await ev(`(() => { const q = window.__qa; q.n = 0; q.long = 0; q.worst = 0; q.loaf = 0; q.loafMax = 0; q.last = performance.now(); return 1; })()`);
    const s = Date.now(); await sleep(ms); const el = (Date.now() - s) / 1000;
    const m1 = await metrics(); const q = await ev(`window.__qa`); const vis = await ev(`document.visibilityState`);
    return { busy: Math.round(((m1.TaskDuration - m0.TaskDuration) / el) * 100), style: Math.round(((m1.RecalcStyleDuration - m0.RecalcStyleDuration) * 1000) / el), fps: Math.round(q.n / el), long: q.long, worst: Math.round(q.worst), loaf: q.loaf, loafMax: Math.round(q.loafMax), vis };
  };
  const park = () => { try { return execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${path.join(SRC, "win-park.ps1")}" park`).toString().trim(); } catch (e) { return "park failed"; } };
  const unpark = () => { try { return execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${path.join(SRC, "win-unmin.ps1")}"`).toString().trim(); } catch (e) { return "unpark failed"; } };
  return { ws, send, ev, sleep, metrics, pause, go, click, esc, shot, sample, issues, park, unpark };
}
module.exports = { connect, sleep, DIR, SRC };
