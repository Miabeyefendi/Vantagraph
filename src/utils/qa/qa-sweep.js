// Full sweep: pages, panels, menus, fullscreen. Verifies every panel really opened, inventories icons,
// saves screenshots and builds two contact sheets. usage: node qa-sweep.js <label>
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
const label = process.argv[2] || "s1";
const INVENTORY = `(() => { const out = []; document.querySelectorAll('svg').forEach(svg => { const r = svg.getBoundingClientRect(); if (!r.width || !r.height || svg.closest('.vg-wave-container')) return; const cs = getComputedStyle(svg); const masked = (cs.maskImage || cs.webkitMaskImage || 'none') !== 'none'; const p = svg.querySelector('path'); const pf = p ? getComputedStyle(p).fill : '-'; const glyphHidden = pf === 'rgba(0, 0, 0, 0)' || pf === 'transparent' || pf === 'none'; out.push({ masked, visible: masked && !glyphHidden }); }); return out; })()`;

(async () => {
  const c = await connect(); const { ev, go, click, esc, send, pause, issues } = c;
  console.log("park:", c.park()); await pause();
  const items = []; // { name, file, ok, note, svgs, masked, glyphVisible, sheet }
  const snap = async (name, sheet, ok = true, note = "") => {
    const inv = await ev(INVENTORY); const file = `qaS-${label}-${String(items.length + 1).padStart(2, "0")}.png`;
    const s = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(DIR, file), Buffer.from(s.result.data, "base64"));
    const rec = { name, file, sheet, ok, note, svgs: inv.length, masked: inv.filter(i => i.masked).length, glyphVisible: inv.filter(i => i.visible).length }; items.push(rec);
    console.log(`${ok ? "ok  " : "FAIL"} ${name.padEnd(34)} svgs ${String(rec.svgs).padStart(3)} masked ${String(rec.masked).padStart(3)} glyph-visible ${rec.glyphVisible} ${note}`);
  };
  const panelLabel = () => ev(`document.querySelector('#Desktop_PanelContainer_Id')?.getAttribute('aria-label') || null`);
  const closePanel = async () => { await click('[data-testid="PanelHeader_CloseButton"] button', 800); if (await panelLabel()) await click('[data-testid="PanelHeader_CloseButton"] button', 800); };
  const me = await ev(`(async () => { try { const u = await Spicetify.Platform.UserAPI.getUser(); return u.username; } catch (e) { return null; } })()`);
  const cur = await ev(`(() => { const i = Spicetify.Player.data?.item; return { album: i?.album?.uri?.split(':').pop(), artist: i?.artists?.[0]?.uri?.split(':').pop() }; })()`);
  await go("/", 3500);
  const playlistHref = await ev(`[...document.querySelectorAll('.YourLibraryX [role="row"] a, .YourLibraryX [role="row"] [id^="onClickHint"]')].map(e => e.getAttribute('href') || e.id.replace('onClickHint', '')).find(h => /playlist/.test(h)) || null`);
  const ownPlaylist = playlistHref ? (playlistHref.startsWith("/") ? playlistHref : "/playlist/" + playlistHref.split(":").pop()) : null;
  await closePanel();

  // A. pages
  const pages = [
    ["Home", "/"], ["Search", "/search"], ["Search results (daft punk)", "/search/daft%20punk"], ["Search: artists tab", "/search/daft%20punk/artists"],
    ["Liked Songs", "/collection/tracks"], ["Library: albums", "/collection/albums"], ["Library: artists", "/collection/artists"], ["Library: podcasts", "/collection/podcasts"],
    ["Playlist (own)", ownPlaylist], ["Playlist (made for you)", "/playlist/37i9dQZF1EQnqst5TRi17F"],
    ["Album", "/album/5D2CHiTlb8MXWJsZWXjkZf"], ["Album with a liked track", "/album/2IUf8KXyLYP2q9TAhnZ4T4"], ["Single", cur.album && "/album/" + cur.album],
    ["Artist (50 Cent)", cur.artist && "/artist/" + cur.artist], ["Artist (Daft Punk)", "/artist/4tZwfgrHOc3mvqYlEYSvVi"],
    ["Profile (me)", me && "/user/" + me], ["Profile (spotify)", "/user/spotify"], ["Genre page", "/genre/0JQ5DAqbMKFEC4WFtoNRpw"],
    ["Settings (/preferences)", "/preferences"], ["Marketplace", "/marketplace"], ["Lyrics page", "/lyrics"], ["Queue page", "/queue"],
  ];
  for (const [name, route] of pages) { if (!route) { console.log("skip", name); continue; } await go(route, 4200); const now = await ev(`Spicetify.Platform.History.location.pathname`); await snap(name, "A", true, now.startsWith("/" + route.split("/")[1]) ? "" : "(landed on " + now + ")"); }

  // B. panels, overlays, menus: each one must verifiably open
  await go("/collection/tracks", 3500);
  const panel = async (name, sel, expect) => { await click(sel, 1800); let l = await panelLabel(); if (expect && (!l || !l.toLowerCase().includes(expect.toLowerCase()))) { await click(sel, 1800); l = await panelLabel(); } const ok = !!l && (!expect || l.toLowerCase().includes(expect.toLowerCase())); await snap(name, "B", ok, ok ? `panel="${l}"` : `panel="${l}" (expected ${expect})`); await closePanel(); };
  await panel("Panel: Queue", '[data-testid="control-button-queue"]', "queue");
  await panel("Panel: Now playing view", '[data-testid="cover-art-button"]', "now playing");
  await click('[data-testid="cover-art-button"]', 1800); await click('.NowPlayingView button[aria-label^="More options"]', 1200); await snap("NPV: more options menu", "B", !!(await ev(`!!document.querySelector('[role="menu"]')`)), ""); await esc(); await closePanel();
  await panel("Panel: Connect devices", 'button[aria-label*="Connect"]', "");
  await panel("Panel: Listening activity", '.main-actionButtons button[aria-label="Listening activity"], .main-actionButtons button[aria-label="Friend Activity"]', "");
  await panel("Notifications: What's New", '.main-actionButtons button[aria-label*="New"]', "");
  await click('[data-testid="user-widget-link"]', 1300); await snap("Menu: profile", "B", !!(await ev(`!!document.querySelector('[role="menu"], #context-menu')`)), ""); await esc();
  await click('button[aria-label^="Vantagraph"]', 1600); await snap("Vantagraph settings window", "B", !!(await ev(`!!document.querySelector('[class*="vg-settings"], [id*="vantagraph-settings"], .GenericModal, [role="dialog"]')`)), ""); await esc();
  const w0 = await ev(`document.querySelector('.YourLibraryX').getBoundingClientRect().width`); await click('button[aria-label*="Expand Your Library"]', 1600); const w1 = await ev(`document.querySelector('.YourLibraryX').getBoundingClientRect().width`); await snap("Library expanded", "B", w1 > w0 + 50, `width ${Math.round(w0)} -> ${Math.round(w1)}`); await click('.YourLibraryX header button[aria-label="Minimize Your Library"]', 1000);
  const ctx = async (name, sel) => { const pos = await ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.x + Math.min(r.width / 2, 300), y: r.y + r.height / 2 }; })()`); if (!pos) { await snap(name, "B", false, "no target"); return; } await sleep(300); await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "right", buttons: 2, clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "right", buttons: 2, clickCount: 1 }); await sleep(1100); const open = await ev(`!!document.querySelector('[role="menu"], #context-menu')`); await snap(name, "B", open, open ? "" : "menu did not open"); await esc(); await esc(); await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 4, y: 4 }); };
  await go("/collection/tracks", 3500); await ctx("Context: track row", '#main-view [role="row"]:has(> [role="presentation"] > [role="gridcell"][aria-colindex])');
  await ctx("Context: library item", '.YourLibraryX [role="row"]');
  await go("/album/5D2CHiTlb8MXWJsZWXjkZf", 3800); await ctx("Context: album track", '#main-view [role="row"]:has(> [role="presentation"] > [role="gridcell"][aria-colindex])');
  await click('[data-testid="action-bar-row"] button[aria-label*="More options"]', 1300); await snap("Album: ... menu", "B", !!(await ev(`!!document.querySelector('[role="menu"]')`)), ""); await esc();
  await ev(`(() => { const i = [...document.querySelectorAll('[role="menuitem"]')].find(e => /playlist/i.test(e.textContent)); if (i) i.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); return 1; })()`);
  await go("/search", 3000); await ev(`(() => { const i = document.querySelector('form[role="search"] input'); i.focus(); return 1; })()`);
  await send("Input.insertText", { text: "daft" }); await sleep(2500); await snap("Search: typing (live results dropdown)", "B", true, ""); await ev(`(() => { const i = document.querySelector('form[role="search"] input'); i.blur(); return 1; })()`); await esc();
  // lyrics page + its fullscreen button, and Spotify's fullscreen view (needs a real click)
  await go("/lyrics", 4000);
  const fsPos = async () => ev(`(() => { const b = document.querySelector('[data-testid="fullscreen-mode-button"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  const pos = await fsPos();
  if (pos) { await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y }); await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 }); await sleep(2500);
    const fs1 = await ev(`!!document.fullscreenElement`); await snap("Fullscreen view (lyrics)", "B", fs1, fs1 ? "document.fullscreenElement set" : "did not enter fullscreen");
    await ev(`(async () => { if (document.fullscreenElement) await document.exitFullscreen(); return 1; })()`); await sleep(1200);
    console.log("fullscreen exited:", !(await ev(`!!document.fullscreenElement`))); }
  else console.log("fullscreen button not found");
  await go("/", 2500); await pause();

  // contact sheets
  const { execFileSync } = require("child_process");
  const py = `
import sys, json
from PIL import Image, ImageDraw
d, label = sys.argv[1], sys.argv[2]
items = json.load(open(d + 'qa-sweep-' + label + '.json'))['items']
for sheet, cols, out in (('A', 4, 'sheet1-pages'), ('B', 4, 'sheet2-panels')):
    its = [i for i in items if i['sheet'] == sheet]
    if not its: continue
    tw, th = 640, 349; rows = (len(its) + cols - 1) // cols
    S = Image.new('RGB', (cols * (tw + 6) + 6, rows * (th + 26) + 6), (24, 24, 24)); dr = ImageDraw.Draw(S)
    for n, it in enumerate(its):
        im = Image.open(d + it['file']).convert('RGB').resize((tw, th)); x = 6 + (n % cols) * (tw + 6); y = 6 + (n // cols) * (th + 26)
        S.paste(im, (x, y + 20)); col = (120, 255, 150) if it['ok'] else (255, 90, 90)
        dr.text((x + 2, y + 4), ('OK ' if it['ok'] else 'FAIL ') + it['name'] + '  masked ' + str(it['masked']) + '/' + str(it['svgs']) + '  glyph ' + str(it['glyphVisible']), fill=col)
    S.save(d + 'QA-' + label + '-' + out + '.png'); print(out, S.size)
`;
  fs.writeFileSync(path.join(DIR, `qa-sweep-${label}.json`), JSON.stringify({ label, items, issues: [...new Set(issues)].slice(0, 30) }, null, 1));
  fs.writeFileSync(path.join(DIR, "sheet.py"), py);
  const pyExe = process.env.PYTHON || "python"; // needs Pillow for the contact sheets
  try { console.log(execFileSync(pyExe, [path.join(DIR, "sheet.py"), DIR + path.sep, label]).toString().trim()); } catch (e) { console.log("sheet build failed:", e.message.slice(0, 200)); }
  console.log("console issues:", [...new Set(issues)].slice(0, 8)); console.log("unpark:", c.unpark()); c.ws.close();
})().catch((e) => { console.error("qa-sweep failed:", e.stack || e.message); process.exit(1); });
