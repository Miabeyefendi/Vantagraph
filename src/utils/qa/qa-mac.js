// macOS consistency check (see "MAC" in theme.js). Gives elements the legacy names Spicetify maps only on
// macOS builds, then counts, for every rule in the theme's own sheets, how many elements it reaches before and after.
// Run with the Mac path on: localStorage "vg-qa-platform" = "mac", wait ~30 s so Spotify persists it, restart through
// launch-qa.sh. "fixedChanged" and "vgChanged" must stay empty; "unfixedChanged" lists what the original selectors
// would reach on a Mac. Set the key to "off" (or remove it) afterwards.
const { connect } = require("./qa-lib");
const emu = {
    "main-topBar-container": "#global-nav-bar", "main-topBar-button": "#global-nav-bar button",
    "main-topBar-historyButtons": "#global-nav-bar > div:first-of-type div:has(> button + button)",
    "main-topBar-background": "#global-nav-bar > div", "main-topBar-overlay": "#global-nav-bar > div > div",
    "main-trackList-trackList": "[role='grid']", "main-trackList-trackListRow": "[role='row']", "main-trackList-trackListHeaderRow": "[role='row'][aria-rowindex='1']",
    "main-trackList-rowTitle": "[data-testid='internal-track-link'] > div", "main-trackList-rowImage": "[role='row'] img",
    "main-trackInfo-name": "[data-testid='now-playing-widget'] a", "main-trackInfo-artists": "[data-testid='now-playing-widget'] span",
    "main-entityHeader-container": "[data-testid='entity-header']", "main-entityHeader-title": "[data-testid='entity-header'] h1",
    "main-entityHeader-shadow": "[data-testid='entity-header'] img", "main-entityHeader-imageContainer": "[data-testid='entity-header'] > div:first-child",
    "progress-bar": "[data-testid='progress-bar']", "progress-bar__slider": "[data-testid='progress-bar-handle']",
    "playback-progressbar": "[data-testid='playback-progressbar']", "playback-progressbar-isInteractive": "[data-testid='playback-progressbar']",
    "x-progressBar-sliderArea": "[data-testid='progress-bar-background']", "x-progressBar-progressBarBg": "[data-testid='progress-bar-background']",
    "x-progressBar-fillColor": "[data-testid='progress-bar-background'] > div > div",
    "view-homeShortcutsGrid-shortcuts": "section:has([data-testid='shortcut-background'])", "view-homeShortcutsGrid-shortcut": "div[draggable='true']:has(> [data-testid='shortcut-background'])",
    "view-homeShortcutsGrid-image": "[data-testid='shortcut-background'] img", "view-homeShortcutsGrid-imageWrapper": "[data-testid='shortcut-background'] ~ a > div",
    "main-actionBar-ActionBarRow": "[data-testid='action-bar-row']", "main-gridContainer-gridContainer": "[data-testid='grid-container']",
    "main-card-card": "[data-encore-id='card']", "main-cardImage-image": "[data-encore-id='card'] img",
};
(async () => {
  const c = await connect(); const { ev, go } = c; c.park(); await c.pause();
  const report = {};
  for (const [route, name] of [["/", "home"], ["/collection/tracks", "liked"], ["/album/4aawyAB9vmqN3uQ7FjRGTy", "album"]]) {
    await go(route, 3200);
    report[name] = JSON.parse(await ev(`(async () => {
      const own = (n) => n && ((n.tagName === 'LINK' && /user\\.css/.test(n.getAttribute('href') || '')) || (n.tagName === 'STYLE' && !n.classList.contains('marketplaceSnippets') && /vg-|vantagraph/i.test(n.textContent || '')));
      const rules = [];
      const walk = (list) => { let rs; try { rs = list.cssRules; } catch (e) { return; } for (const r of rs) { if (r.selectorText) rules.push(r.selectorText); else if (r.cssRules) walk(r); } };
      for (const sh of document.styleSheets) if (own(sh.ownerNode)) walk(sh);
      const unfix = (s) => s.replace(/\\.vg-mac--([\\w-]+)/g, '.$1');
      const count = (s) => { try { return document.querySelectorAll(s).length; } catch (e) { return -1; } };
      const vgCounts = () => { const m = {}; document.querySelectorAll('[class*="vg-"]').forEach(e => e.classList.forEach(t => { if (t.startsWith('vg-')) m[t] = (m[t] || 0) + 1; })); return m; };
      await new Promise(r => setTimeout(r, 4000));
      const macRules = rules.filter(s => s.includes('vg-mac--'));
      const before = macRules.map(s => [count(s), count(unfix(s))]);
      const vg0 = vgCounts();
      const M = ${JSON.stringify(emu)};
      let added = 0;
      for (const [n, s] of Object.entries(M)) { try { document.querySelectorAll(s).forEach(e => { if (!e.classList.contains(n)) { e.classList.add(n); added++; } }); } catch (e) {} }
      await new Promise(r => setTimeout(r, 1500));
      const after = macRules.map(s => [count(s), count(unfix(s))]);
      const vg1 = vgCounts();
      const fixedChanged = [], unfixedChanged = [];
      macRules.forEach((s, i) => { if (before[i][0] !== after[i][0]) fixedChanged.push(s.slice(0, 120)); if (before[i][1] !== after[i][1]) unfixedChanged.push(unfix(s).slice(0, 120) + '  ' + before[i][1] + '->' + after[i][1]); });
      const vgChanged = Object.keys({ ...vg0, ...vg1 }).filter(k => (vg0[k] || 0) !== (vg1[k] || 0)).map(k => k + ' ' + (vg0[k] || 0) + '->' + (vg1[k] || 0));
      return JSON.stringify({ mac: document.documentElement.classList.contains('vg-mac'), ownRules: rules.length, rulesUsingMacNames: macRules.length, namesAdded: added, fixedChanged, unfixedChanged, vgChanged });
    })()`));
  }
  console.log(JSON.stringify(report, null, 1));
  c.unpark(); c.ws.close();
})();
