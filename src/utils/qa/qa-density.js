const { connect, sleep } = require("./qa-lib");
(async () => {
  const c = await connect(); const { ev, go, pause } = c; c.park(); await pause(); await go("/collection/tracks", 3500);
  const D = `(window.VantagraphData || window.VantagraphCustomData)`; const pfx = await ev(`window.VantagraphData ? 'vantagraph:' : 'vantagraph-custom:'`);
  const orig = await ev(`Spicetify.LocalStorage.get('${pfx}density')`) || "default";
  const png = await ev(`(() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); g.fillStyle = '#639'; g.fillRect(0, 0, 64, 64); return c.toDataURL('image/png'); })()`);
  const rects = () => ev(`(() => { const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.y * 10) / 10, Math.round((r.y + r.height) * 10) / 10]; }; return { left: R(document.querySelector('#Desktop_LeftSidebar_Id')), main: R(document.querySelector('#main-view')), right: R(document.querySelector('.Root__right-sidebar > div:first-child')) }; })()`);
  let allOk = true;
  for (const bg of [false, true]) {
    if (bg) { await ev(`${D}.applySetting('bg-url', ${JSON.stringify(png)}); 1`); await sleep(1200); }
    for (const dens of ["compact", "default", "comfortable"]) {
      await ev(`${D}.applySetting('density', ${JSON.stringify(dens)}); 1`); await sleep(900);
      const r = await rects(); const ok = r.left[0] === r.main[0] && r.main[0] === r.right[0] && r.left[1] === r.main[1] && r.main[1] === r.right[1]; allOk = allOk && ok;
      console.log(`${ok ? "ok  " : "FAIL"} ${bg ? "background image" : "normal          "} density=${dens.padEnd(11)} top/bottom: left ${r.left} | main ${r.main} | right ${r.right}`);
    }
    if (bg) { await ev(`${D}.applySetting('bg-url', ''); 1`); await sleep(800); }
  }
  await ev(`${D}.applySetting('density', ${JSON.stringify(orig)}); 1`); console.log(allOk ? "ALL ALIGNED" : "MISALIGNED");
  c.unpark(); c.ws.close();
})();
