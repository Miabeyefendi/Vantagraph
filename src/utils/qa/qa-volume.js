// Volume+ : wheel (plain/shift/ctrl), arrow keys, middle-click mute, presets, double-click restore, settings modal. Restores everything.
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
(async () => {
  const c = await connect(); const { ev, go, send, pause, sample, issues } = c;
  console.log("park:", c.park()); await pause(); await go("/collection/tracks", 3000);
  const res = []; const rec = (name, ok, note = "", s) => { res.push({ name, ok, note, s }); console.log(`${ok ? "ok  " : "FAIL"} ${name.padEnd(44)} ${note}${s ? `  [busy ${s.busy}% fps ${s.fps} worst ${s.worst}ms]` : ""}`); };
  const vol = () => ev(`Spicetify.Player.getVolume()`); const muted = () => ev(`Spicetify.Player.getMute()`);
  const orig = { vol: await vol(), muted: await muted(), ls: await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) if (k.startsWith('vg-volume-plus')) o[k] = localStorage.getItem(k); return o; })()`) };
  const bar = await ev(`(() => { const b = document.querySelector('[data-testid="volume-bar"]'); const r = (b.querySelector('[data-testid="progress-bar"]') || b).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  const setVol = (v) => ev(`Spicetify.Player.setVolume(${v}); 1`);
  const wheel = async (dy, modifiers = 0, n = 1, gap = 70) => { for (let i = 0; i < n; i++) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: Math.round(bar.x), y: Math.round(bar.y), deltaX: 0, deltaY: dy, modifiers }); await sleep(gap); } await sleep(250); };
  const near = (a, b, t = 0.006) => Math.abs(a - b) <= t;
  const setLS = (k, v) => ev(`Spicetify.LocalStorage.set('vg-volume-plus.${k}', JSON.stringify({ value: ${JSON.stringify(v)} })); 1`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(bar.x), y: Math.round(bar.y) }); await sleep(300);

  // wheel: default increment (1%) up and down
  await setLS("default-increment", "1"); await setLS("shift-increment", "10"); await setLS("ctrl-increment", "0.5");
  await setVol(0.5); await sleep(200); let v0 = await vol(); await wheel(-120, 0, 5); let v1 = await vol(); rec("wheel up x5 (default 1%)", near(v1 - v0, 0.05), `${v0.toFixed(3)} -> ${v1.toFixed(3)}`);
  await wheel(120, 0, 5); let v2 = await vol(); rec("wheel down x5 (default 1%)", near(v2, v0), `${v1.toFixed(3)} -> ${v2.toFixed(3)}`);
  await wheel(-120, 8, 2); let v3 = await vol(); rec("shift+wheel up x2 (10% each)", near(v3 - v2, 0.2, 0.012), `${v2.toFixed(3)} -> ${v3.toFixed(3)}`);
  await wheel(-120, 2, 4); let v4 = await vol(); rec("ctrl+wheel up x4 (0.5% each)", near(v4 - v3, 0.02, 0.006), `${v3.toFixed(3)} -> ${v4.toFixed(3)}`);
  // clamping
  await setVol(0.99); await wheel(-120, 8, 2); rec("clamps at 100%", (await vol()) <= 1, `vol=${(await vol()).toFixed(3)}`);
  await setVol(0.02); await wheel(120, 8, 2); rec("clamps at 0%", (await vol()) >= 0, `vol=${(await vol()).toFixed(3)}`);
  // wheel while muted un-mutes
  await setVol(0.4); await ev(`Spicetify.Player.setMute(true); 1`); await sleep(200); await wheel(-120, 0, 1); rec("wheel while muted un-mutes", (await muted()) === false, `muted=${await muted()}`);
  // arrow keys while hovering
  await setVol(0.5); await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(bar.x), y: Math.round(bar.y) }); await sleep(300);
  const key = async (k, code, vk) => { await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: k, code, windowsVirtualKeyCode: vk }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); await sleep(200); };
  await key("ArrowRight", "ArrowRight", 39); let a1 = await vol(); rec("ArrowRight = +1%", near(a1, 0.51), `vol=${a1.toFixed(3)}`);
  await key("ArrowUp", "ArrowUp", 38); let a2 = await vol(); rec("ArrowUp = +10%", near(a2, a1 + 0.1, 0.012), `vol=${a2.toFixed(3)}`);
  await key("ArrowLeft", "ArrowLeft", 37); await key("ArrowDown", "ArrowDown", 40); let a3 = await vol(); rec("ArrowLeft/Down back to start", near(a3, 0.5, 0.012), `vol=${a3.toFixed(3)}`);
  // middle click mute + muted visual state
  const mid = async () => { await send("Input.dispatchMouseEvent", { type: "mousePressed", x: Math.round(bar.x), y: Math.round(bar.y), button: "middle", buttons: 4, clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: Math.round(bar.x), y: Math.round(bar.y), button: "middle", buttons: 4, clickCount: 1 }); await sleep(500); };
  await ev(`Spicetify.Player.setMute(false); 1`); await mid(); const m1 = await muted(); const dim = await ev(`document.querySelector('[data-vg-muted="true"]') ? getComputedStyle(document.querySelector('.volume-bar__slider-container, [data-testid="volume-bar"] > div:has([data-testid="progress-bar"])') || document.body).opacity : null`);
  rec("middle-click mutes + dims bar", m1 === true && dim !== null, `muted=${m1} dim-opacity=${dim}`); await mid(); rec("middle-click un-mutes", (await muted()) === false, `muted=${await muted()}`);
  // presets overlay
  await ev(`document.querySelector('.vg-vol-preset-trigger').click(); 1`); await sleep(500);
  const ov = await ev(`(() => { const o = document.querySelector('.vg-vol-preset-overlay'); return o ? { visible: o.classList.contains('vg-visible'), btns: o.querySelectorAll('.vg-vol-preset-btn[data-preset]').length } : null; })()`);
  rec("preset overlay opens (7 buttons)", !!ov && ov.visible && ov.btns === 7, JSON.stringify(ov));
  await ev(`[...document.querySelectorAll('.vg-vol-preset-btn')].find(b => b.dataset.preset === '60')?.click(); 1`); await sleep(500);
  rec("preset 60% applies + glows", near(await vol(), 0.6), `vol=${(await vol()).toFixed(3)} glow=${await ev(`!!document.querySelector('.vg-vol-preset-btn.vg-preset-active[data-preset="60"]')`)}`);
  await ev(`document.querySelector('.vg-vol-preset-overlay')?.classList.remove('vg-visible'); 1`);
  // double click = preferred volume
  await setLS("preferred-vol", "35"); await setVol(0.9); await sleep(200);
  const dbl = async () => { for (let i = 0; i < 2; i++) { await send("Input.dispatchMouseEvent", { type: "mousePressed", x: Math.round(bar.x), y: Math.round(bar.y), button: "left", buttons: 1, clickCount: i + 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: Math.round(bar.x), y: Math.round(bar.y), button: "left", buttons: 0, clickCount: i + 1 }); await sleep(90); } await sleep(500); };
  await dbl(); rec("double-click restores preferred (35%)", near(await vol(), 0.35, 0.03), `vol=${(await vol()).toFixed(3)}`);
  // settings modal: right-click on the % button, and the "Volume+ settings" button in the overlay
  const trig = await ev(`(() => { const r = document.querySelector('.vg-vol-preset-trigger').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(trig.x), y: Math.round(trig.y) }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: Math.round(trig.x), y: Math.round(trig.y), button: "right", buttons: 2, clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: Math.round(trig.x), y: Math.round(trig.y), button: "right", buttons: 2, clickCount: 1 }); await sleep(1300);
  const modal = await ev(`!!document.querySelector('#vg-vp-default')`); rec("settings window opens (right-click on % button)", modal, `modal=${modal}`);
  const closeModal = async () => { await ev(`(() => { Spicetify.PopupModal.hide(); return 1; })()`); await sleep(700); const still = await ev(`!!document.querySelector('#vg-vp-default')`); if (still) console.log('  (modal still open after hide())'); };
  if (modal) {
    const vals = await ev(`({ def: document.querySelector('#vg-vp-default').value, shift: document.querySelector('#vg-vp-shift').value, ctrl: document.querySelector('#vg-vp-ctrl').value, startup: document.querySelector('#vg-vp-startup-restore').checked, prefButtons: document.querySelectorAll('#vg-vp-preferred-row .vg-vol-preset-btn').length })`);
    rec("modal shows stored values + 7 preferred buttons", vals.def === "1" && vals.shift === "10" && vals.ctrl === "0.5" && vals.prefButtons === 7, JSON.stringify(vals));
    await ev(`(() => { const i = document.querySelector('#vg-vp-default'); i.value = '5'; i.dispatchEvent(new Event('change', { bubbles: true })); const s = document.querySelector('#vg-vp-startup-restore'); s.checked = !s.checked; s.dispatchEvent(new Event('change', { bubbles: true })); [...document.querySelectorAll('#vg-vp-preferred-row .vg-vol-preset-btn')].find(b => b.textContent === '20%').click(); return 1; })()`);
    await closeModal();
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(bar.x), y: Math.round(bar.y) }); await sleep(300);
    await setVol(0.3); await wheel(-120, 0, 2); const v5 = await vol(); rec("new default increment (5%) used by wheel", near(v5 - 0.3, 0.1, 0.012), `vol=${v5.toFixed(3)}`);
    await setVol(0.9); await dbl(); rec("new preferred volume (20%) used by double-click", near(await vol(), 0.2, 0.03), `vol=${(await vol()).toFixed(3)}`);
    const st = await ev(`({ startup: JSON.parse(localStorage.getItem('vg-volume-plus.startup-restore') || localStorage.getItem('spicetify:vg-volume-plus.startup-restore') || 'null') })`); rec("startup-restore toggle persisted", st.startup && st.startup.value === "false", JSON.stringify(st));
  }
  // second entry point: overlay button
  await ev(`document.querySelector('.vg-vol-preset-trigger').click(); 1`); await sleep(500);
  await ev(`[...document.querySelectorAll('.vg-vol-preset-overlay .vg-vol-preset-btn')].find(b => b.textContent === 'Volume+ settings')?.click(); 1`); await sleep(1300);
  const modal2 = await ev(`!!document.querySelector('#vg-vp-default')`); rec("settings window opens (overlay button)", modal2, `modal=${modal2}`); await closeModal();
  // perf: wheel storm + overlay open
  const storm = (async () => { for (let i = 0; i < 60; i++) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: Math.round(bar.x), y: Math.round(bar.y), deltaX: 0, deltaY: (i % 20 < 10 ? -120 : 120), modifiers: 0 }); await sleep(25); } })();
  const sp = await sample(1800); await storm; rec("wheel storm (60 events) keeps frames", sp.fps >= 100 && sp.worst < 60, "", sp);

  // restore everything
  await ev(`(() => { const o = ${JSON.stringify(orig.ls)}; for (const k of Object.keys(localStorage)) if (k.startsWith('vg-volume-plus') && !(k in o)) localStorage.removeItem(k); for (const [k, v] of Object.entries(o)) localStorage.setItem(k, v); Spicetify.Player.setVolume(${orig.vol}); Spicetify.Player.setMute(${orig.muted}); return 1; })()`);
  console.log("restored: vol", (await vol()).toFixed(3), "muted", await muted(), "(was", orig.vol.toFixed(3), orig.muted + ")");
  fs.writeFileSync(path.join(DIR, "qa-volume.json"), JSON.stringify({ res, issues: [...new Set(issues)].slice(0, 20) }, null, 1));
  console.log("console issues:", [...new Set(issues)].slice(0, 6)); c.unpark(); c.ws.close();
})().catch((e) => { console.error("qa-volume failed:", e.stack || e.message); process.exit(1); });
