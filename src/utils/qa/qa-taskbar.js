// Lyric Miniplayer: PiP controls + its settings window, every toggle/select/slider exercised. Muted, brief, restores.
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
async function attach(t0) {
  const t = (await (await fetch("http://127.0.0.1:9222/json")).json()).find((x) => x.id === t0);
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = {}; const issues = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } if (d.method === "Runtime.exceptionThrown") issues.push("EXC " + (d.params.exceptionDetails.exception?.description || "").split("\n").slice(0, 3).join(" <- ").slice(0, 260)); if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") issues.push("ERR " + d.params.args.map((a) => a.value || a.description || "").join(" ").slice(0, 200)); };
  const send = (m, p = {}) => Promise.race([new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: p })); }), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout: ' + m)), 6000))]);
  await send("Runtime.enable");
  const ev = async (e) => { const r = await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error((r.result.exceptionDetails.exception?.description || "eval").split("\n")[0]); return r.result?.result?.value; };
  return { ws, send, ev, issues };
}
const targets = async () => (await (await fetch("http://127.0.0.1:9222/json")).json()).filter((t) => t.type === "page");
(async () => {
  const c = await connect(); const { ev, go, send, sample, issues } = c; console.log("park:", c.park());
  const out = []; const rec = (n, ok, note = "", s) => { out.push({ n, ok, note }); console.log(`${ok ? "ok  " : "FAIL"} ${n.padEnd(52)} ${note}${s ? `  [busy ${s.busy}% fps ${s.fps} worst ${s.worst}ms]` : ""}`); };
  const origMute = await ev(`Spicetify.Player.getMute()`); await ev(`Spicetify.Player.setMute(true); 1`);
  const stop = () => ev(`(async () => { for (let i = 0; i < 5; i++) { let p; try { p = Spicetify.Player.isPlaying(); } catch (e) { p = false; } if (!p) break; await Spicetify.Platform.PlayerAPI.pause(); await new Promise(r => setTimeout(r, 500)); } return 1; })()`);
  try {
    await go("/collection/tracks", 3500);
    await ev(`(() => { const row = document.querySelector('#main-view [role="row"]:has(> [role="presentation"] > [role="gridcell"][aria-colindex])'); const b = row && row.querySelector('button[aria-label^="Play"]'); if (b) b.click(); return !!b; })()`);
    for (let i = 0; i < 20; i++) { await sleep(700); if (await ev(`(() => { try { return Spicetify.Player.isPlaying() && !!Spicetify.Player.data?.item; } catch (e) { return false; } })()`)) break; }
    await sleep(2000);
    const before = (await targets()).map((t) => t.id);
    const pos = await ev(`(() => { const r = document.querySelector('button[aria-label="Taskbar Player"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
    let pt = null; for (let i = 0; i < 12 && !pt; i++) { await sleep(500); pt = (await targets()).find((t) => !before.includes(t.id)); }
    if (!pt) throw new Error("Taskbar Player window did not open"); const pip = await attach(pt.id); await sleep(2500);
    const ctrls = await pip.ev(`[...document.querySelectorAll('button, [role="button"], input, select, [onclick], [class*="btn"]')].map(e => ({ tag: e.tagName.toLowerCase(), id: e.id || '', cls: (e.className || '').toString().slice(0, 30), label: e.getAttribute('aria-label') || e.title || e.textContent.trim().slice(0, 18), vis: e.getBoundingClientRect().width > 0 }))`);
    console.log("controls:", ctrls.filter((x) => x.vis).map((x) => `${x.tag}${x.id ? '#' + x.id : ''}[${x.label}]`).join(", ").slice(0, 500));
    const state1 = await pip.ev(`({ text: document.body.innerText.slice(0, 80), w: innerWidth, h: innerHeight })`); rec("Taskbar Player renders track info", state1.text.length > 5, JSON.stringify(state1));
    const safe = ctrls.filter((x) => x.vis && /button|btn/i.test(x.tag + x.cls + x.id) && !/next|prev|skip|like|save|heart|close|add|exit/i.test(x.label + x.id + x.cls));
    const seen = new Set();
    for (const b of safe) { const key = b.id || b.label || b.cls; if (seen.has(key)) continue; seen.add(key);
      try { const i0 = pip.issues.length + issues.length;
        await pip.ev(`(() => { const all = [...document.querySelectorAll('button, [role="button"], [onclick], [class*="btn"]')].filter(x => x.getBoundingClientRect().width > 0); const e = all.find(x => (x.id || x.getAttribute('aria-label') || x.title || x.textContent.trim().slice(0, 18) || (x.className || '').toString().slice(0, 30)) === ${JSON.stringify(key)}); if (e) e.click(); return !!e; })()`);
        await sleep(600); const s = await sample(800); const bad = pip.issues.length + issues.length > i0; rec(`control "${key}"`, !bad && s.fps > 100, bad ? pip.issues.concat(issues).slice(-1)[0] : "", s);
      } catch (e) { rec(`control "${key}"`, false, "stuck: " + e.message); break; } }
    const shot = await pip.send("Page.captureScreenshot", {}); fs.writeFileSync(path.join(DIR, "qaP-taskbar.png"), Buffer.from(shot.result.data, "base64"));
    pip.ws.close(); await ev(`window.documentPictureInPicture.window && window.documentPictureInPicture.window.close(); 1`); await sleep(800);
    rec("window closes cleanly", !(await ev(`!!(window.documentPictureInPicture && window.documentPictureInPicture.window)`)), "");
  } catch (e) { console.log("test aborted:", e.message); }
  await stop(); await ev(`Spicetify.Player.setMute(${origMute}); 1`);
  console.log("windows left:", (await targets()).map((t) => t.url.slice(0, 30)), "| exceptions:", [...new Set(issues)].filter((x) => !/enqueueSnackbar|provider:transport/.test(x)).slice(0, 4));
  fs.writeFileSync(path.join(DIR, "qa-taskbar.json"), JSON.stringify({ out }, null, 1)); c.unpark(); c.ws.close();
})().catch((e) => { console.error("qa-taskbar failed:", e.stack || e.message); process.exit(1); });
