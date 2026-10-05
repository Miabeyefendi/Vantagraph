const { connect, sleep } = require("./qa-lib");
(async () => {
  const c = await connect(); const { ev, go, sample, issues } = c; c.park();
  const stat = () => ev(`(() => { let m = 0, t = 0; document.querySelectorAll('svg').forEach(s => { const r = s.getBoundingClientRect(); if (!r.width || s.closest('.vg-wave-container')) return; t++; if ((getComputedStyle(s).maskImage || 'none') !== 'none') m++; }); return { masked: m, total: t, styles: document.querySelectorAll('style').length, stored: Spicetify.LocalStorage.get('vantagraph:icons-enabled'), iconStyle: !!document.getElementById('vantagraph-custom-icons') }; })()`);
  await go("/album/5D2CHiTlb8MXWJsZWXjkZf", 4000);
  const s0 = await stat(); console.log("on  (start)    ", JSON.stringify(s0));
  const t0 = Date.now(); await ev(`window.vantagraphIconsToggle(false); 1`); await sleep(1200); const s1 = await stat(); console.log("off            ", JSON.stringify(s1), `(${Date.now() - t0 - 1200}ms)`);
  const sp1 = await sample(1500); console.log("off  perf      ", JSON.stringify(sp1));
  const t1 = Date.now(); await ev(`window.vantagraphIconsToggle(true); 1`); await sleep(1500); const s2 = await stat(); console.log("on   (again)   ", JSON.stringify(s2), `(${Date.now() - t1 - 1500}ms)`);
  const sp2 = await sample(1500); console.log("on   perf      ", JSON.stringify(sp2));
  for (let i = 0; i < 8; i++) { await ev(`window.vantagraphIconsToggle(${i % 2 === 0 ? "false" : "true"}); 1`); await sleep(500); }
  await ev(`window.vantagraphIconsToggle(true); 1`); await sleep(1500); const s3 = await stat(); console.log("after 9 flips  ", JSON.stringify(s3));
  const ok = s1.masked < s0.masked * 0.1 && Math.abs(s2.masked - s0.masked) <= 6 && Math.abs(s3.styles - s0.styles) <= 2 && sp1.fps > 100 && sp2.fps > 100;
  console.log(ok ? "RESULT ok: icons switch off and back on, no leak, frames stay high" : "RESULT CHECK: see numbers above"); console.log("exceptions:", [...new Set(issues)].filter((x) => !/enqueueSnackbar|provider:transport/.test(x)));
  c.unpark(); c.ws.close();
})();
