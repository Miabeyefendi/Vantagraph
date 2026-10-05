const { connect, sleep } = require("./qa-lib");
(async () => {
  const c = await connect(); const { ev, go, issues } = c; c.park(); await go("/", 3500);
  const D = `window.VantagraphData`;
  const st = () => ev(`({ stored: Spicetify.LocalStorage.get('vantagraph:theme'), pre: Spicetify.LocalStorage.get('vantagraph:pre-bg-theme'), glass: document.body.classList.contains('vg-glass-theme'), bg: document.body.classList.contains('vg-bg-active'), sidebar: getComputedStyle(document.documentElement).getPropertyValue('--spice-sidebar').trim(), main: getComputedStyle(document.documentElement).getPropertyValue('--spice-main').trim() })`);
  const png = await ev(`(() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); g.fillStyle = '#c33'; g.fillRect(0, 0, 64, 64); return c.toDataURL('image/png'); })()`);
  const results = [];
  for (const start of ["R34 Purple", "Olive", "VantaWhite", "Glass"]) {
    await ev(`${D}.applyTheme(${JSON.stringify(start)}); 1`); await sleep(500); const a = await st();
    await ev(`${D}.applySetting('bg-url', ${JSON.stringify(png)}); 1`); await sleep(700); const b = await st();
    await ev(`${D}.applySetting('bg-url', ''); 1`); await sleep(800); const d = await st();
    const ok = d.stored === start && d.sidebar === a.sidebar && !d.bg && (start === "VantaWhite" || start === "Glass" ? true : !d.glass);
    results.push(ok); console.log(`${ok ? "ok  " : "FAIL"} start=${start.padEnd(11)} | with image: theme=${b.stored} glass=${b.glass} bg=${b.bg} | after removing: theme=${d.stored} sidebar ${a.sidebar} -> ${d.sidebar} glass=${d.glass} bg=${d.bg} pre=${d.pre}`);
  }
  await ev(`${D}.applyTheme('R34 Purple'); 1`); // the user's own palette
  console.log("exceptions:", [...new Set(issues)].filter((x) => !/enqueueSnackbar|provider:transport/.test(x))); c.unpark(); c.ws.close();
})();
