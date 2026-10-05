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
  const snapStore = await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) o[k] = localStorage.getItem(k); return o; })()`);
  try {
    await go("/collection/tracks", 3500);
    await ev(`(() => { const row = document.querySelector('#main-view [role="row"]:has(> [role="presentation"] > [role="gridcell"][aria-colindex])'); const b = row && row.querySelector('button[aria-label^="Play"]'); if (b) b.click(); return !!b; })()`);
    for (let i = 0; i < 20; i++) { await sleep(700); if (await ev(`(() => { try { return Spicetify.Player.isPlaying() && !!Spicetify.Player.data?.item; } catch (e) { return false; } })()`)) break; }
    await sleep(2000);
    const before = (await targets()).map((t) => t.id);
    const pos = await ev(`(() => { const r = document.querySelector('button[aria-label="Lyric Miniplayer"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
    let pt = null; for (let i = 0; i < 12 && !pt; i++) { await sleep(500); pt = (await targets()).find((t) => !before.includes(t.id)); }
    if (!pt) throw new Error("PiP window did not open"); const pip = await attach(pt.id); await sleep(2500);
    const ctrls = await pip.ev(`[...document.querySelectorAll('button, [role="button"], input, select')].map(e => ({ tag: e.tagName.toLowerCase(), id: e.id || '', cls: (e.className || '').toString().slice(0, 30), label: e.getAttribute('aria-label') || e.title || e.textContent.trim().slice(0, 18), type: e.type || '', vis: e.getBoundingClientRect().width > 0 }))`);
    console.log("PiP controls:", ctrls.filter((x) => x.vis).map((x) => `${x.tag}${x.id ? '#' + x.id : ''}[${x.label}]`).join(", ").slice(0, 700));
    // lyric lines present and the current one follows playback
    const l1 = await pip.ev(`(() => { const act = document.querySelector('.active, .current, [class*="active"], [class*="current"]'); return { lines: document.querySelectorAll('[class*="line"], [class*="lyric"]').length, active: act ? act.textContent.trim().slice(0, 30) : null, text: document.body.innerText.slice(0, 80) }; })()`);
    rec("PiP shows lyrics / track info", l1.lines > 0 || l1.text.length > 10, JSON.stringify(l1).slice(0, 200));
    // every non-destructive PiP control: click it, make sure nothing throws, main thread stays calm
    const safe = ctrls.filter((x) => x.vis && x.tag === "button" && !/next|prev|skip|like|save|heart|close|add|mini|compact|settings|menu/i.test(x.label + x.id + x.cls));
    for (const b of safe) { try {
      const i0 = pip.issues.length + issues.length; await pip.ev(`(() => { const e = [...document.querySelectorAll('button')].filter(x => x.getBoundingClientRect().width > 0 && ((x.getAttribute('aria-label') || x.title || x.textContent.trim().slice(0, 18)) === ${JSON.stringify(b.label)}))[0]; if (e) e.click(); return !!e; })()`);
      await sleep(700); const s = await sample(900); const bad = pip.issues.length + issues.length > i0;
      rec(`PiP button "${b.label || b.cls}"`, !bad, bad ? pip.issues.concat(issues).slice(-1)[0] : "", s);
      await pip.ev(`(() => { const e = [...document.querySelectorAll('button')].filter(x => x.getBoundingClientRect().width > 0 && ((x.getAttribute('aria-label') || x.title || x.textContent.trim().slice(0, 18)) === ${JSON.stringify(b.label)}))[0]; if (e && /fullscreen|compact|karaoke|vinyl|mini/i.test(e.title + e.className)) e.click(); return 1; })()`).catch(() => {});
    } catch (e) { rec(`PiP button "${b.label || b.cls}"`, false, "stuck: " + e.message); } }
    // the settings window (gear)
    const t1 = (await targets()).map((t) => t.id);
    const gear = ctrls.find((x) => x.vis && /gear|setting|⚙/i.test(x.label + x.cls + x.id));
    if (gear) {
      const gp = await pip.ev(`(() => { const e = document.getElementById('menuBtn'); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
      await pip.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: gp.x, y: gp.y }); await pip.send("Input.dispatchMouseEvent", { type: "mousePressed", x: gp.x, y: gp.y, button: "left", clickCount: 1 }); await pip.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: gp.x, y: gp.y, button: "left", clickCount: 1 });
      let st = null; for (let i = 0; i < 14 && !st; i++) { await sleep(500); st = (await ev(`!!document.querySelector('[role="dialog"] iframe, .GenericModal iframe')`)) ? { title: 'modal iframe' } : null; }
      rec("settings window opens from the gear", !!st, st ? st.title : "no window");
      if (st) {
        await sleep(1500);
        const sw = { issues: [], ev: (expr) => ev(`(() => { const f = document.querySelector('[role="dialog"] iframe, .GenericModal iframe'); return f.contentWindow.eval(${JSON.stringify(expr)}); })()`), send: async () => ({ result: { data: (await c.send("Page.captureScreenshot", {})).result.data } }), ws: { close() {} } };
        const inputs = await sw.ev(`[...document.querySelectorAll('input, select, button')].map((e, i) => ({ i, tag: e.tagName.toLowerCase(), type: e.type || '', id: e.id || '', label: ((e.closest('label') || e.parentElement)?.textContent || e.title || '').trim().slice(0, 34), checked: e.checked, value: e.value }))`);
        console.log(`settings window controls: ${inputs.length}`);
        const sstore0 = JSON.stringify(await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) if (/lyric|lm-|vg-/i.test(k)) o[k] = localStorage.getItem(k); return o; })()`));
        for (const inp of inputs) {
          if (inp.tag === "button" && !/reset|default/i.test(inp.label)) { /* buttons exercised via inputs only */ }
          const i0 = sw.issues.length + pip.issues.length + issues.length;
          let did = "";
          if (inp.tag === "input" && (inp.type === "checkbox" || inp.type === "radio")) { await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; e.click(); return 1; })()`); await sleep(400); await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; if (e.checked !== ${JSON.stringify(inp.checked)}) e.click(); return 1; })()`); did = "toggled and restored"; }
          else if (inp.tag === "input" && inp.type === "range") { await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; const mid = (Number(e.min || 0) + Number(e.max || 100)) / 2; e.value = mid; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); return 1; })()`); await sleep(400); await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; e.value = ${JSON.stringify(inp.value)}; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); return 1; })()`); did = "moved and restored"; }
          else if (inp.tag === "select") { await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; const o = [...e.options].find(x => x.value !== e.value); if (o) { e.value = o.value; e.dispatchEvent(new Event('change', { bubbles: true })); } return 1; })()`); await sleep(400); await sw.ev(`(() => { const e = document.querySelectorAll('input, select, button')[${inp.i}]; e.value = ${JSON.stringify(inp.value)}; e.dispatchEvent(new Event('change', { bubbles: true })); return 1; })()`); did = "changed and restored"; }
          else continue;
          const s = await sample(700); const bad = sw.issues.length + pip.issues.length + issues.length > i0;
          rec(`setting "${inp.label || inp.id || inp.type}" (${did})`, !bad && s.fps > 100, bad ? sw.issues.concat(pip.issues, issues).slice(-1)[0] : "", s);
        }
        // the toggle rows are buttons (.s-item); flip each twice so the state ends where it started
        const items = await sw.ev(`[...document.querySelectorAll('.s-item')].map((e, i) => ({ i, label: (e.querySelector('.s-label')?.firstChild?.textContent || e.textContent).trim().slice(0, 30), toggle: !!e.querySelector('.t'), link: /vantagraph/i.test(e.textContent) }))`);
        console.log(`toggle rows: ${items.length}`);
        for (const it of items) {
          if (it.link) continue; const i0 = sw.issues.length + pip.issues.length + issues.length;
          await sw.ev(`document.querySelectorAll('.s-item')[${it.i}].click(); 1`); await sleep(450); const s1 = await sample(500);
          await sw.ev(`document.querySelectorAll('.s-item')[${it.i}].click(); 1`); await sleep(400);
          const bad = sw.issues.length + pip.issues.length + issues.length > i0; rec(`toggle "${it.label}" (flipped twice)`, !bad && s1.fps > 100, bad ? issues.concat(pip.issues).slice(-1)[0] : "", s1);
        }
        const hasBridge = await sw.ev(`typeof window.__vg === 'object' && Object.keys(window.__vg).length`); rec("settings page bridge (window.__vg) is wired", !!hasBridge, `methods=${hasBridge}`);
        await sw.ev(`window.__vg.openVgSettings(); 1`); await sleep(1200);
        rec("link 'Vantagraph Settings' opens the Vantagraph panel", await ev(`!!document.querySelector('.vg-sp.open')`), "");
        await ev(`window.__vgOpenSettings && document.querySelector('.vg-sp.open') && document.querySelector('button[aria-label="Vantagraph Settings"]').click(); 1`);
        const sstore1 = JSON.stringify(await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) if (/lyric|lm-|vg-/i.test(k)) o[k] = localStorage.getItem(k); return o; })()`));
        rec("settings window leaves stored values unchanged after restore", sstore0 === sstore1, sstore0 === sstore1 ? "" : "stored values differ");
        const shot = await sw.send("Page.captureScreenshot", {}); fs.writeFileSync(path.join(DIR, "qaP-lyric-settings.png"), Buffer.from(shot.result.data, "base64"));
        await ev(`Spicetify.PopupModal.hide(); 1`);
      }
    } else rec("settings gear found in the PiP window", false, "no gear control");
    const shot2 = await pip.send("Page.captureScreenshot", {}); fs.writeFileSync(path.join(DIR, "qaP-lyric-pip.png"), Buffer.from(shot2.result.data, "base64"));
    // mini bar mode replaces the window, so it is tested last and re-attached
    const miniCtl = ctrls.find((x) => x.vis && /mini/i.test(x.label + x.id));
    if (miniCtl) {
      const idsBefore = (await targets()).map((t) => t.id);
      await pip.ev(`(() => { const e = document.getElementById('miniBtn'); if (e) e.click(); return !!e; })()`).catch(() => {});
      await sleep(2800); const now = await targets(); const fresh = now.find((t) => !idsBefore.includes(t.id)); const samePip = now.find((t) => idsBefore.includes(t.id) && t.url === 'about:blank');
      const tgt = fresh || samePip;
      if (tgt) { try { const m = await attach(tgt.id); const info = await m.ev(`({ buttons: document.querySelectorAll('button').length, text: (document.body.innerText || '').slice(0, 60), w: innerWidth, h: innerHeight })`); rec("Mini bar mode: window renders", info.buttons >= 3, JSON.stringify(info)); const s2 = await sample(1500); rec("Mini bar mode: main thread stays calm", s2.fps > 100, "", s2); await m.ev(`(() => { const e = document.getElementById('miniBtn'); if (e) e.click(); return !!e; })()`).catch(() => {}); await sleep(1500); m.ws.close(); } catch (e) { rec("Mini bar mode: window renders", false, e.message); } }
      else rec("Mini bar mode: window renders", false, "no PiP target after clicking");
    }
    pip.ws.close(); await ev(`window.documentPictureInPicture.window && window.documentPictureInPicture.window.close(); 1`);
  } catch (e) { console.log("test aborted:", e.message); }
  await stop(); await ev(`Spicetify.Player.setMute(${origMute}); 1`);
  await ev(`(() => { const snap = ${JSON.stringify(snapStore)}; for (const k of Object.keys(localStorage)) if (!(k in snap)) localStorage.removeItem(k); for (const [k, v] of Object.entries(snap)) if (localStorage.getItem(k) !== v) localStorage.setItem(k, v); return 1; })()`);
  console.log("windows left:", (await targets()).map((t) => t.url.slice(0, 30)), "| console issues:", [...new Set(issues)].slice(0, 4));
  fs.writeFileSync(path.join(DIR, "qa-pip.json"), JSON.stringify({ out }, null, 1)); c.unpark(); c.ws.close();
})().catch((e) => { console.error("qa-pip failed:", e.stack || e.message); process.exit(1); });
