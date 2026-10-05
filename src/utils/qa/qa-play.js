// Short, muted playback: player heart, wave bars, LoopyLoop, Lyric Miniplayer, Taskbar Player. Pauses and restores at the end.
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");

async function attach(targetId) {
  const t = (await (await fetch("http://127.0.0.1:9222/json")).json()).find((x) => x.id === targetId);
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = {}; const issues = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } if (d.method === "Runtime.exceptionThrown") issues.push("EXC " + (d.params.exceptionDetails.exception?.description || "").split("\n").slice(0, 3).join(" <- ").slice(0, 300)); };
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  await send("Runtime.enable");
  const ev = async (e) => { const r = await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error((r.result.exceptionDetails.exception?.description || "eval").split("\n")[0]); return r.result?.result?.value; };
  return { ws, send, ev, issues };
}
const targets = async () => (await (await fetch("http://127.0.0.1:9222/json")).json()).map((t) => ({ id: t.id, type: t.type, url: t.url.slice(0, 70), title: (t.title || "").slice(0, 40) }));

(async () => {
  const c = await connect(); const { ev, go, send, sample, issues } = c;
  console.log("park:", c.park()); const res = []; const rec = (name, ok, note = "", s) => { res.push({ name, ok, note, s }); console.log(`${ok ? "ok  " : "FAIL"} ${name.padEnd(46)} ${note}${s ? `  [busy ${s.busy}% fps ${s.fps} long ${s.long} worst ${s.worst}ms]` : ""}`); };
  const orig = { muted: await ev(`Spicetify.Player.getMute()`), theme: await ev(`Spicetify.LocalStorage.get('vantagraph:theme')`) };
  await ev(`Spicetify.Player.setMute(true); 1`);
  const stopAll = async () => { await ev(`(async () => { for (let i = 0; i < 5; i++) { let p; try { p = Spicetify.Player.isPlaying(); } catch (e) { p = false; } if (!p) break; await Spicetify.Platform.PlayerAPI.pause(); await new Promise(r => setTimeout(r, 500)); } return 1; })()`); };
  try {
    await go("/collection/tracks", 3500);
    // start a LIKED track (first row of Liked Songs), muted
    await ev(`(() => { const row = document.querySelector('#main-view [role="row"]:has(> [role="presentation"] > [role="gridcell"][aria-colindex])'); const b = row && row.querySelector('button[aria-label^="Play"]'); if (b) b.click(); return !!b; })()`);
    let playing = false; for (let i = 0; i < 20 && !playing; i++) { await sleep(700); playing = await ev(`(() => { try { return Spicetify.Player.isPlaying() && !!Spicetify.Player.data?.item; } catch (e) { return false; } })()`); }
    rec("playback started (muted)", playing, await ev(`Spicetify.Player.data?.item?.name || ''`)); if (!playing) throw new Error("could not start playback");
    await sleep(2500);
    const uri = await ev(`Spicetify.Player.data.item.uri`); const dur = await ev(`Spicetify.Player.getDuration()`);

    // heart in the player bar for a liked track, in a dark and a light palette
    const heart = () => ev(`(() => { const b = document.querySelector('[data-testid="now-playing-widget"] button[aria-checked]:last-of-type'); if (!b) return null; const s = b.querySelector('svg'); return { aria: b.getAttribute('aria-checked'), vg: s.dataset.vgIcon || '', color: getComputedStyle(s).color, want: getComputedStyle(document.documentElement).getPropertyValue('--spice-heart').trim() }; })()`);
    const rgb = (h) => { h = h.replace('#', ''); return `rgb(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)})`; };
    let h = await heart(); rec("player heart: liked track is red (R34 Purple)", !!h && h.aria === "true" && h.color === rgb(h.want), JSON.stringify(h));
    await ev(`window.VantagraphData && window.VantagraphData.applyTheme('VantaWhite'); 1`); await sleep(800); h = await heart(); rec("player heart: liked track is red (second palette)", !!h && h.aria === "true" && h.color === rgb(h.want), JSON.stringify(h));
    await ev(`window.VantagraphData && window.VantagraphData.applyTheme(${JSON.stringify(orig.theme || "Spotify Default")}); 1`); await sleep(500);

    // wave bars while playing
    const wave = await ev(`(() => { const w = document.querySelector('.vg-wave-container'); const b = w && w.querySelector('.vg-wave-bar'); return { live: !!w && w.classList.contains('vg-wave-live'), anims: document.getAnimations().filter(a => a.effect?.target?.classList?.contains('vg-wave-bar')).length, state: b && getComputedStyle(b).animationPlayState, bars: w ? w.querySelectorAll('.vg-wave-bar').length : 0 }; })()`);
    rec("wave bars animate while playing", wave.live && wave.anims > 0 && wave.state === "running", JSON.stringify(wave), await sample(2500));

    // LoopyLoop
    const seekMs = (f) => ev(`Spicetify.Player.seek(${Math.floor(dur * 0.0 + dur * 0)} + ${Math.floor(dur)} * ${f}); 1`);
    await ev(`Spicetify.Player.seek(Math.floor(${dur} * 0.05)); 1`); await sleep(600);
    const barBox = await ev(`(() => { const r = document.querySelector('.vg-playback-progress').getBoundingClientRect(); return { x: r.x, y: r.y + r.height / 2, w: r.width }; })()`);
    const rclick = async (frac, label) => { const x = Math.round(barBox.x + barBox.w * frac), y = Math.round(barBox.y); await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }); await sleep(150); await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "right", buttons: 2, clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "right", buttons: 2, clickCount: 1 }); await sleep(500); const shown = await ev(`!document.querySelector('#loopy-context-menu').hidden`); await ev(`[...document.querySelectorAll('#loopy-context-menu button')].find(b => b.textContent === ${JSON.stringify(label)})?.click(); 1`); await sleep(500); return shown; };
    const m1 = await rclick(0.25, "Set start"); const m2 = await rclick(0.35, "Set end");
    const marks = await ev(`(() => { const s = document.querySelector('#loopy-loop-start'), e = document.querySelector('#loopy-loop-end'); return { start: s && s.style.left, end: e && e.style.left, hidden: s && s.hidden }; })()`);
    const saved = await ev(`JSON.parse(Spicetify.LocalStorage.get('loopy:' + Spicetify.Player.data.item.uri) || 'null')`);
    rec("LoopyLoop: right-click menu + Set start/end", m1 && m2 && marks.start === "25%" && /^3[45]/.test(marks.end || "") , JSON.stringify(marks));
    rec("LoopyLoop: loop saved per track", !!saved && Math.abs(saved.start - 0.25) < 0.02, JSON.stringify(saved));
    await ev(`Spicetify.Player.seek(Math.floor(${dur} * 0.6)); 1`); let back = false, pct = 0; for (let i = 0; i < 12 && !back; i++) { await sleep(500); pct = await ev(`Spicetify.Player.getProgressPercent()`); back = pct < 0.4; }
    rec("LoopyLoop: playing past the end jumps back to start", back, `progress ${(pct * 100).toFixed(1)}%`);
    // wheel nudge near the start marker
    const sx = Math.round(barBox.x + barBox.w * 0.25), sy = Math.round(barBox.y); await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: sx, y: sy }); await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: sx, y: sy, deltaX: 0, deltaY: -120 }); await sleep(500);
    const saved2 = await ev(`JSON.parse(Spicetify.LocalStorage.get('loopy:' + Spicetify.Player.data.item.uri) || 'null')`); rec("LoopyLoop: scroll nudges the nearest marker", !!saved2 && saved2.start > saved.start, `start ${saved.start.toFixed(4)} -> ${saved2 && saved2.start.toFixed(4)}`);
    await rclick(0.5, "Reset"); const cleared = await ev(`Spicetify.LocalStorage.get('loopy:' + Spicetify.Player.data.item.uri)`); rec("LoopyLoop: Reset clears the loop", cleared === null, `stored=${cleared}`);

    // PiP windows need a real click (user activation)
    const pipTest = async (name, btnSel, closeJs, probe) => {
      const before = (await targets()).map((t) => t.id); const pos = await ev(`(() => { const b = document.querySelector(${JSON.stringify(btnSel)}); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
      if (!pos) { rec(name + ": button present", false, "not found: " + btnSel); return; }
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
      let nt = null; for (let i = 0; i < 12 && !nt; i++) { await sleep(500); nt = (await targets()).find((t) => !before.includes(t.id) && t.type === "page"); }
      const hasPiP = await ev(`!!(window.documentPictureInPicture && window.documentPictureInPicture.window)`);
      rec(name + ": window opens", !!nt && hasPiP, nt ? `${nt.title} ${nt.url}` : "no new target"); if (!nt) return;
      const t = await attach(nt.id); await sleep(2500);
      const info = await t.ev(probe); const sp = await sample(2500);
      rec(name + ": renders content", info.ok, JSON.stringify(info).slice(0, 200), sp);
      const s = await t.send("Page.captureScreenshot", {}); fs.writeFileSync(path.join(DIR, `qaP-${name.replace(/\W+/g, "-")}.png`), Buffer.from(s.result.data, "base64"));
      if (t.issues.length) rec(name + ": no exceptions inside the window", false, t.issues.slice(0, 2).join(" | ")); else rec(name + ": no exceptions inside the window", true);
      t.ws.close(); await ev(closeJs); await sleep(1200);
      const left = await ev(`!!(window.documentPictureInPicture && window.documentPictureInPicture.window)`); rec(name + ": closes cleanly", !left, "");
    };
    await pipTest("Lyric Miniplayer", 'button[aria-label="Lyric Miniplayer"]', `window.documentPictureInPicture.window && window.documentPictureInPicture.window.close(); 1`,
      `(() => { const t = document.body.innerText || ''; return { ok: t.length > 20, chars: t.length, buttons: document.querySelectorAll('button').length, lines: document.querySelectorAll('[class*="line"], [class*="lyric"]').length, title: document.title }; })()`);
    await pipTest("Taskbar Player", 'button[aria-label="Taskbar Player"]', `window.documentPictureInPicture.window && window.documentPictureInPicture.window.close(); 1`,
      `(() => { const t = document.body.innerText || ''; return { ok: document.body.children.length > 0 && document.querySelectorAll('button, [role="button"], svg').length > 3, chars: t.length, buttons: document.querySelectorAll('button').length, svgs: document.querySelectorAll('svg').length, title: document.title }; })()`);

    // wave stops after pause
    await stopAll(); await sleep(3200);
    const w2 = await ev(`(() => { const w = document.querySelector('.vg-wave-container'); return { live: w.classList.contains('vg-wave-live'), opacity: getComputedStyle(w).opacity }; })()`); rec("wave bars stop after pause", !w2.live && w2.opacity === "0", JSON.stringify(w2));
  } catch (e) { console.log("test aborted:", e.message); }
  await stopAll(); await ev(`Spicetify.Player.setMute(${orig.muted}); 1`);
  console.log("playing now:", await ev(`(() => { try { return Spicetify.Player.isPlaying(); } catch (e) { return 'n/a'; } })()`), "| muted restored:", await ev(`Spicetify.Player.getMute()`));
  fs.writeFileSync(path.join(DIR, "qa-play.json"), JSON.stringify({ res, issues: [...new Set(issues)].slice(0, 20) }, null, 1));
  console.log("console issues:", [...new Set(issues)].slice(0, 6)); console.log("targets left:", JSON.stringify((await targets()).filter((t) => t.type === "page").map((t) => t.url.slice(0, 40)))); c.unpark(); c.ws.close();
})().catch((e) => { console.error("qa-play failed:", e.stack || e.message); process.exit(1); });
