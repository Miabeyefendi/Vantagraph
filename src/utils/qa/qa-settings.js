// Settings matrix: every Vantagraph setting is applied, checked and measured, then restored.
// usage: node qa-settings.js <label>
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
const label = process.argv[2] || "run";

(async () => {
  const c = await connect();
  const { ev, send, go, sample, pause, issues } = c;
  console.log("park:", c.park());
  await pause();
  const rows = []; const add = (group, name, r) => { rows.push({ group, name, ...r }); const flag = r.problems && r.problems.length ? " !! " + r.problems.join("; ") : ""; console.log(`${group.padEnd(9)} ${String(name).padEnd(34)} busy ${String(r.s?.busy ?? "-").padStart(3)}% fps ${String(r.s?.fps ?? "-").padStart(3)} long ${r.s?.long ?? "-"} worst ${String(r.s?.worst ?? "-").padStart(3)}ms loaf ${r.s?.loaf ?? "-"}/${r.s?.loafMax ?? "-"}ms${flag}`); };

  // wheel scrolling helper that runs while sampling
  const scrolled = async (ms) => {
    const rect = await ev(`(() => { const r = document.querySelector('#main-view').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height * 0.55 }; })()`);
    let stop = false; const driver = (async () => { let n = 0; while (!stop) { await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: Math.round(rect.x), y: Math.round(rect.y), deltaX: 0, deltaY: (Math.floor(n / 45) % 2 ? -1 : 1) * 120 }); n++; await sleep(33); } })();
    const s = await sample(ms); stop = true; await driver; return s;
  };

  // snapshot of the user's settings, restored at the end
  const PFX = (await ev(`window.VantagraphData ? 'vantagraph:' : 'vantagraph-custom:'`)); const snap = await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) if (k.startsWith('vantagraph')) o[k] = localStorage.getItem(k); return o; })()`);
  const D = (code) => ev(`(() => { const D = (window.VantagraphData || window.VantagraphCustomData); ${code} })()`);
  const issuesBefore = () => issues.length;

  await go("/", 3500);
  const base = await sample(3000); add("baseline", "idle home, defaults", { s: base });

  // 1. palettes
  const themes = await D(`return Object.keys(D.THEMES || {});`);
  const origTheme = snap[PFX + "theme"] || "Spotify Default";
  for (const t of themes) {
    const i0 = issuesBefore(); const t0 = Date.now();
    const got = await D(`D.applyTheme(${JSON.stringify(t)}); const cs = getComputedStyle(document.documentElement); const T = D.THEMES[${JSON.stringify(t)}]; return { sidebar: cs.getPropertyValue('--spice-sidebar').trim(), main: cs.getPropertyValue('--spice-main').trim(), text: cs.getPropertyValue('--spice-text').trim(), accent: cs.getPropertyValue('--spice-accent').trim(), T };`);
    const applyMs = Date.now() - t0; await sleep(500);
    const s = await sample(1500); const problems = [];
    const norm = (v) => String(v || "").replace("#", "").toLowerCase();
    for (const [var_, key] of [["sidebar", "window"], ["main", "panel"], ["text", "text"], ["accent", "accent"]]) if (norm(got[var_]) !== norm(got.T[key])) problems.push(`--spice-${var_} ${got[var_]} != ${got.T[key]}`);
    if (issues.length > i0) problems.push(...issues.slice(i0));
    add("palette", t + " (" + applyMs + "ms apply)", { s, problems });
  }
  await D(`D.applyTheme && D.applyTheme(${JSON.stringify(origTheme)});`);

  // 2. fonts
  const fonts = await D(`return D.FONT_PRESETS.map(p => ({ family: p.family, url: p.url || '', name: p.name }));`);
  const origFont = { family: snap[PFX + "font"] || "", url: snap[PFX + "font-url"] || "" };
  for (const f of fonts) {
    const i0 = issuesBefore();
    await D(`D.applyFont(${JSON.stringify(f.family)}, ${JSON.stringify(f.url)});`); await sleep(1200);
    const fam = await ev(`getComputedStyle(document.body).fontFamily`); const s = await sample(1500); const problems = [];
    if (f.family && !fam.toLowerCase().includes(f.family.toLowerCase())) problems.push(`body font is ${fam.slice(0, 40)}`);
    if (f.family) { const ok = await ev(`document.fonts.check('14px "${f.family.replace(/"/g, "")}"')`); if (!ok) problems.push("font not loaded"); }
    if (issues.length > i0) problems.push(...issues.slice(i0));
    add("font", f.name || "(default)", { s, problems });
  }
  await D(`D.applyFont(${JSON.stringify(origFont.family)}, ${JSON.stringify(origFont.url)});`);

  // 2b. colour editor (Custom): every colour key set, checked on the page, reset
  if (await ev(`!!(window.VantagraphCustomData && window.VantagraphCustomData.COLOR_KEYS)`)) {
    const keys = await ev(`window.VantagraphCustomData.COLOR_KEYS.map(k => typeof k === 'string' ? k : (k.key || k.id || k.name))`);
    console.log("colour keys:", keys.length);
    const origOv = await ev(`JSON.stringify(window.VantagraphCustomData.getColorOverrides())`);
    for (const k of keys) {
      const i0 = issues.length; const r = await ev(`(() => { const D = window.VantagraphCustomData; const before = JSON.stringify(D.getColorState()); D.setColor(${JSON.stringify(k)}, '#12ab34'); const st = D.getColorState(); const ov = D.getColorOverrides(); const changed = JSON.stringify(st) !== before || (ov && JSON.stringify(ov).toLowerCase().includes('12ab34')); return { changed }; })()`);
      await sleep(250); const s = await sample(700); const problems = []; if (!r.changed) problems.push("setColor changed nothing"); if (issues.length > i0) problems.push(...issues.slice(i0));
      await ev(`window.VantagraphCustomData.resetColor(${JSON.stringify(k)}); 1`); await sleep(150);
      add("colour", k, { s, problems });
    }
    await ev(`window.VantagraphCustomData.setColorOverrides(${origOv}); 1`);
  }

  // 3. numeric / choice settings
  const orig = (k, d) => (snap[PFX + k] ?? d);
  const settingsPlan = [
    ["font-size", ["10", "20"], "14"], ["icon-size", ["12", "23", "34"], "default"], ["density", ["compact", "comfortable"], "default"], ["border-radius", ["0", "12", "24"], "default"],
  ];
  for (const [k, vals, def] of settingsPlan) {
    for (const v of vals) {
      const i0 = issuesBefore(); await D(`D.applySetting(${JSON.stringify(k)}, ${JSON.stringify(v)});`); await sleep(700);
      const s = await sample(1500); const problems = issues.length > i0 ? issues.slice(i0) : [];
      add("setting", `${k}=${v}`, { s, problems });
    }
    await D(`D.applySetting(${JSON.stringify(k)}, ${JSON.stringify(orig(k, def))});`); await sleep(400);
  }

  // 4. background (glass mode): the historically expensive one, measured idle and while scrolling
  await go("/collection/tracks", 3500);
  const png = await ev(`(() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 256, 256); gr.addColorStop(0, '#3a1c71'); gr.addColorStop(0.5, '#d76d77'); gr.addColorStop(1, '#ffaf7b'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return c.toDataURL('image/png'); })()`);
  const bgSteps = [
    ["bg-url (gradient image)", `D.applySetting('bg-url', ${JSON.stringify(png)});`],
    ["bg blur=20", `D.applySetting('bg-blur', '20');`],
    ["bg brightness=150", `D.applySetting('bg-brightness', '150');`],
    ["bg contrast=150", `D.applySetting('bg-contrast', '150');`],
    ["bg saturation=150", `D.applySetting('bg-saturation', '150');`],
  ];
  for (const [name, code] of bgSteps) {
    const i0 = issuesBefore(); await D(code); await sleep(900);
    const idle = await sample(1500); const sc = await scrolled(3000);
    const active = await ev(`document.documentElement.classList.contains('vg-bg-active') || document.body.classList.contains('vg-bg-active')`);
    const problems = []; if (name.startsWith("bg-url") && !active) problems.push("vg-bg-active not set");
    if (issues.length > i0) problems.push(...issues.slice(i0));
    add("bg-idle", name, { s: idle, problems }); add("bg-scroll", name, { s: sc, problems: [] });
  }
  for (const k of ["bg-blur", "bg-brightness", "bg-contrast", "bg-saturation"]) await D(`D.applySetting(${JSON.stringify(k)}, ${JSON.stringify(orig(k, k === "bg-blur" ? "0" : "100"))});`);
  await D(`D.applySetting('bg-url', ${JSON.stringify(orig("bg-url", ""))});`); await sleep(800);
  { const i0 = issuesBefore(); await D(`D.applySetting('bg-use-album-cover', 'true');`); await sleep(1500); const idle = await sample(1500); const sc = await scrolled(3000); const problems = issues.length > i0 ? issues.slice(i0) : [];
    add("bg-idle", "album cover as bg", { s: idle, problems }); add("bg-scroll", "album cover as bg", { s: sc, problems: [] });
    await D(`D.applySetting('bg-use-album-cover', ${JSON.stringify(orig("bg-use-album-cover", "false"))});`); await sleep(800); }

  // 5. snippets: toggle each one on, check it does what it says, measure, restore
  await go("/", 3500);
  const snippetKeys = [
    "snippet-rounded-images", "snippet-modern-scrollbar", "snippet-vinyl-stop", "snippet-reduced-motion",
    "snippet-hide-friend-activity", "snippet-hide-whats-new", "snippet-hide-fullscreen", "snippet-hide-lyrics-btn", "snippet-hide-miniplayer", "snippet-hide-queue-btn", "snippet-hide-shuffle", "snippet-hide-repeat", "snippet-hide-connect", "snippet-hide-volume", "snippet-hide-np-widget", "snippet-hide-next-track",
    "snippet-hide-podcasts", "snippet-hide-ads-banner", "snippet-hide-promo-card", "snippet-hide-mood-recs", "snippet-hide-home-shortcuts", "snippet-hide-made-for-you", "snippet-hide-recents", "snippet-hide-top-mixes", "snippet-hide-jump-back", "snippet-hide-new-releases", "snippet-hide-rec-stations", "snippet-hide-rec-today", "snippet-hide-fav-artists", "snippet-hide-best-artists",
    "snippet-thin-library", "snippet-auto-hide-sidebar",
  ];
  for (const k of snippetKeys) {
    const i0 = issuesBefore(); const was = snap[PFX + k];
    const before = await ev(`[...document.querySelectorAll('style')].map(s => s.id + ':' + s.textContent.length).join('|')`);
    await D(`D.applySetting(${JSON.stringify(k)}, 'true');`); await sleep(700);
    const probe = await ev(`(() => { const css = [...document.querySelectorAll('style')].filter(s => s.id.includes(${JSON.stringify(k.replace("snippet-", ""))}) || ${JSON.stringify(before)}.indexOf(s.id + ':' + s.textContent.length) < 0).map(s => s.textContent).join('\\n'); const sels = [...css.matchAll(/(?:^|\\})\\s*([^{}@]+)\\{/g)].map(m => m[1].trim()).flatMap(s => s.split(/,(?![^()]*\\))/)).map(s => s.trim()).filter(Boolean); let matched = 0, hidden = 0, bad = 0; for (const s of sels) { let els; try { els = document.querySelectorAll(s); } catch (e) { bad++; continue; } for (const e of els) { matched++; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); if (cs.display === 'none' || cs.visibility === 'hidden' || (r.width === 0 && r.height === 0)) hidden++; } } return { cssLen: css.length, selectors: sels.length, bad, matched, hidden }; })()`);
    const s = await sample(1500); const problems = [];
    if (!probe.cssLen) problems.push("no CSS injected"); if (probe.bad) problems.push(probe.bad + " invalid selectors");
    if (k.startsWith("snippet-hide-") && probe.matched === 0) problems.push("matched 0 elements on this page");
    if (k.startsWith("snippet-hide-") && probe.matched > 0 && probe.hidden < probe.matched) problems.push(`only ${probe.hidden}/${probe.matched} hidden`);
    if (issues.length > i0) problems.push(...issues.slice(i0));
    add("snippet", `${k.replace("snippet-", "")} [${probe.hidden}/${probe.matched} hidden]`, { s, problems, probe });
    await D(`D.applySetting(${JSON.stringify(k)}, ${JSON.stringify(was ?? (k === "snippet-rounded-images" || k === "snippet-modern-scrollbar" ? "true" : "false"))});`); await sleep(300);
  }

  // restore user's stored values exactly
  await ev(`(() => { const snap = ${JSON.stringify(snap)}; for (const k of Object.keys(localStorage)) if (k.startsWith('vantagraph') && !(k in snap)) localStorage.removeItem(k); for (const [k, v] of Object.entries(snap)) localStorage.setItem(k, v); return 1; })()`);
  const out = { label, baseline: base, rows, issues: [...new Set(issues)].slice(0, 40) };
  fs.writeFileSync(path.join(DIR, `qa-settings-${label}.json`), JSON.stringify(out, null, 1));
  console.log("\nconsole issues:", [...new Set(issues)].slice(0, 12));
  console.log("unpark:", c.unpark()); c.ws.close();
})().catch((e) => { console.error("qa-settings failed:", e.stack || e.message); process.exit(1); });
