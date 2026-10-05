const { connect, sleep } = require("./qa-lib");
(async () => {
  const c = await connect(); const { ev, go, pause } = c; c.park(); await pause();
  const D = (code) => ev(`(() => { const D = window.VantagraphData; ${code} })()`);
  const orig = await ev(`Spicetify.LocalStorage.get('vantagraph:theme')`);
  const themes = await D(`return Object.keys(D.THEMES);`);
  const read = `(() => { const q = (sel) => document.querySelector(sel); const col = (b) => { const s = b && b.querySelector('svg'); return s ? getComputedStyle(s).color : null; };
    const liked = [...document.querySelectorAll('#main-view button[aria-checked="true"]')].find(b => b.closest('[role=row]')); const un = [...document.querySelectorAll('#main-view button[aria-checked="false"]')].find(b => b.closest('[role=row]'));
    const pl = q('[data-testid="now-playing-widget"] button[aria-checked]:last-of-type'); const heart = getComputedStyle(document.documentElement).getPropertyValue('--spice-heart').trim();
    return { heart, liked: col(liked), unliked: col(un), player: col(pl), playerState: pl && pl.getAttribute('aria-checked') }; })()`;
  const hex2rgb = (h) => { h = h.replace("#", ""); return `rgb(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)})`; };
  await go("/album/2IUf8KXyLYP2q9TAhnZ4T4", 4000); // album with a liked track
  const likedByTheme = {};
  for (const t of themes) { await D(`D.applyTheme(${JSON.stringify(t)});`); await sleep(700); likedByTheme[t] = await ev(read); }
  await go("/album/5D2CHiTlb8MXWJsZWXjkZf", 4000); // album, nothing liked
  const unlikedByTheme = {};
  for (const t of themes) { await D(`D.applyTheme(${JSON.stringify(t)});`); await sleep(700); unlikedByTheme[t] = await ev(read); }
  await D(`D.applyTheme(${JSON.stringify(orig || "Spotify Default")});`);
  console.log("palette".padEnd(18), "liked-row heart".padEnd(24), "expected".padEnd(20), "unliked-row".padEnd(22), "ok?");
  for (const t of themes) { const L = likedByTheme[t], U = unlikedByTheme[t]; const want = hex2rgb(L.heart); const okL = L.liked === want; const okU = U.unliked && U.unliked !== want;
    console.log(t.padEnd(18), String(L.liked).padEnd(24), want.padEnd(20), String(U.unliked).padEnd(22), (okL ? "liked OK" : "LIKED NOT RED") + " / " + (okU ? "unliked plain OK" : "UNLIKED WRONG")); }
  c.unpark(); c.ws.close();
})();
