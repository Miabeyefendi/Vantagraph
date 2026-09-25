// Captures the README / Marketplace screenshots straight from Spotify.
//
// 1. Start Spotify with a local debugging port (close it first):
//      Spotify.exe --remote-debugging-port=9222
// 2. node src/utils/screenshots/capture.js [palettes] [settings] [snippets] [icons] [extras]
//    (no arguments: everything)
// 3. python src/utils/screenshots/compose.py   (preview.png, preview.gif, grid)
// 4. Restart Spotify normally so the port closes.
//
// The script saves the user's vantagraph:* settings first and puts them back
// at the end. The library is switched to Artists, and the profile picture
// and the name of the playlist playing (right panel header) are hidden, so
// no private playlist names or photos end up in a shot. When the
// theme comes from the Marketplace, its user.css and the settings panel CSS
// are swapped for the local ones for the duration, so the shots show the
// working tree, not the last push.

const fs = require("fs");
const path = require("path");
const { connect, sleep } = require("./cdp");

const ROOT = path.resolve(__dirname, "..", "..", "..");
const OUT = path.join(ROOT, "design", "screenshots");
const RAW = path.join(OUT, "palettes");
const VIEW = { width: 1600, height: 900 };
const ALBUM = "/album/4m2880jivSbbyEGAKfITCa"; // a public album page, same for every shot

const PALETTES = ["VantaBlack", "Spotify Default", "R34 Purple", "Crimson", "Olive",
  "VantaWhite", "Glass", "Rose Vale", "Lavender Blush", "Japanese Indigo", "Teal Green"];
const slug = name => name.toLowerCase().replace(/\s+/g, "-");
const SCENES = ["palettes", "settings", "snippets", "icons", "extras"];
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : SCENES;
const unknown = wanted.filter(s => !SCENES.includes(s));
if (unknown.length) { console.error("unknown scene: " + unknown.join(", ")); process.exit(1); }

// the 66 icons exactly as the icon extension ships them
function iconData() {
  const src = fs.readFileSync(path.join(ROOT, "Extensions", "vantagraph-icons.js"), "utf8");
  const out = [...src.matchAll(/"([\w-]+)\.svg":\s*"(data:image\/svg\+xml;base64,[A-Za-z0-9+/=]+)"/g)].map(m => ({ name: m[1], url: m[2] }));
  if (out.length !== 66) throw new Error("expected 66 icons in vantagraph-icons.js, found " + out.length);
  return out;
}

// colour for icon i on the wall: a diagonal sweep through palette accents
const SWEEP = ["#A8A0E0", "#4480D8", "#80C8A8", "#81B040", "#C8903A", "#E8A0A0"];
function sweep(t) {
  const rgb = SWEEP.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
  const x = Math.min(0.9999, Math.max(0, t)) * (rgb.length - 1);
  const i = Math.floor(x), f = x - i;
  return "#" + rgb[i].map((v, k) => Math.round(v + (rgb[i + 1][k] - v) * f).toString(16).padStart(2, "0")).join("");
}

(async () => {
  fs.mkdirSync(RAW, { recursive: true });
  const c = await connect();
  const js = expr => c.evaluate(expr);
  const shot = async (dir, name, clip) => {
    await sleep(800);
    const params = { format: "png", captureBeyondViewport: false };
    if (clip) params.clip = clip;
    const r = await c.send("Page.captureScreenshot", params);
    fs.writeFileSync(path.join(dir, name + ".png"), Buffer.from(r.data, "base64"));
    console.log("saved", name);
  };

  // library filter chips are react-aria options: they need real pointer input,
  // element.click() does nothing. While a filter is on, the first chip is an
  // empty "clear" chip and the second is the active filter.
  const OPTIONS = `[...document.querySelectorAll('#Desktop_LeftSidebar_Id [role="option"]')]`;
  let libraryFilter = "";
  const activeFilter = () => js(`(() => { const o = ${OPTIONS}; return o.length && !o[0].textContent.trim() ? o[1].textContent.trim() : ""; })()`);
  const press = async index => {
    const r = await js(`(() => { const o = ${OPTIONS}[${index}]; if (!o) return null; const b = o.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`);
    if (!r) return false;
    for (const type of ["mousePressed", "mouseReleased"]) {
      await c.send("Input.dispatchMouseEvent", { type, x: r.x, y: r.y, button: "left", clickCount: 1 });
    }
    await sleep(800);
    return true;
  };
  const chip = async text => {
    if (!text) return;
    const i = await js(`${OPTIONS}.findIndex(o => o.textContent.trim() === ${JSON.stringify(text)})`);
    if (i >= 0) await press(i);
  };
  const clearFilter = async () => { if (await activeFilter()) await press(0); };

  // save what the user had
  const saved = await js(`(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("vantagraph:")) o[k] = localStorage.getItem(k); } return o; })()`);

  try {
    // wait for the theme, its settings button and the library chips
    for (let i = 0; ; i++) {
      const ready = await js(`!!(window.VantagraphData && document.querySelector('button[aria-label="Vantagraph Settings"]') && ${OPTIONS}.length)`);
      if (ready) break;
      if (i > 60) throw new Error("Spotify UI did not finish loading");
      await sleep(500);
    }
    await c.send("Emulation.setDeviceMetricsOverride", { width: VIEW.width, height: VIEW.height, deviceScaleFactor: 1, mobile: false });

    // Marketplace install: paint with the local user.css and the local panel
    // CSS. The panel injects its CSS once, only if #vg-settings-css is missing.
    const css = fs.readFileSync(path.join(ROOT, "user.css"), "utf8");
    const panelCss = (fs.readFileSync(path.join(ROOT, "Extensions", "vantagraph-settings.js"), "utf8")
      .match(/s\.id = "vg-settings-css";\s*s\.textContent = `([^`]*)`;/) || [])[1];
    if (!panelCss) throw new Error("settings panel CSS not found in vantagraph-settings.js");
    const swapped = await js(`(() => {
      const s = document.querySelector("style.marketplaceUserCSS");
      if (!s) return false;
      window.__vgShotCss = s.textContent;
      s.textContent = ${JSON.stringify(css)};
      let p = document.getElementById("vg-settings-css");
      if (p) window.__vgShotPanelCss = p.textContent;
      else { p = document.createElement("style"); p.id = "vg-settings-css"; document.head.appendChild(p); }
      p.textContent = ${JSON.stringify(panelCss)};
      return true;
    })()`);
    console.log(swapped ? "user.css: local copy swapped in" : "user.css: local install, used as is");

    // privacy: no avatar, no name of the playing playlist, library shows
    // artists instead of personal playlists
    await js(`(() => {
      let s = document.getElementById("vg-shot-style");
      if (!s) { s = document.createElement("style"); s.id = "vg-shot-style"; document.head.appendChild(s); }
      s.textContent = '.main-userWidget-box, .vg-user-widget, [data-testid="user-widget-link"], .main-nowPlayingView-headerText { visibility: hidden !important; }';
      return true;
    })()`);
    libraryFilter = await activeFilter();
    await clearFilter();
    await chip("Artists");
    const shown = await activeFilter();
    if (shown !== "Artists") throw new Error("library filter did not switch to Artists (" + shown + "), refusing to capture personal playlists");

    await js(`Spicetify.Platform.History.push(${JSON.stringify(ALBUM)})`);
    await sleep(3000);

    const V = "window.VantagraphData";
    const setPalette = async name => { await js(`${V}.applyTheme(${JSON.stringify(name)})`); await sleep(400); };
    const openSettings = async tab => {
      await js(`document.querySelector('button[aria-label="Vantagraph Settings"]').click()`);
      await sleep(600);
      if (tab) {
        await js(`(() => { const t = [...document.querySelectorAll(".vg-sp .vg-tab")].find(b => b.textContent.includes(${JSON.stringify(tab)})); if (t) t.click(); return !!t; })()`);
        await sleep(400);
      }
    };
    const openGroups = n => js(`(() => {
      [...document.querySelectorAll(".vg-sp .vg-acc")].slice(0, ${n}).forEach(a => a.classList.add("open"));
      const sc = document.querySelector(".vg-sp .vg-sc"); if (sc) sc.scrollTop = 0;
      return true;
    })()`);
    const closeSettings = () => js(`(() => { const p = document.querySelector(".vg-sp.open"); if (p) p.classList.remove("open"); return true; })()`);
    const albumCover = async on => { await js(`${V}.applySetting("bg-use-album-cover", ${JSON.stringify(String(on))})`); await sleep(on ? 2500 : 800); };

    // one shot per palette, same page
    if (wanted.includes("palettes")) {
      for (const name of PALETTES) {
        await setPalette(name);
        await shot(RAW, "palette-" + slug(name));
      }
    }

    // settings panel on the Theme tab, both palette groups open. The panel
    // reopens on the last tab used, so the tab is always picked explicitly.
    if (wanted.includes("settings")) {
      await setPalette("R34 Purple");
      await openSettings("Theme");
      await openGroups(2);
      await shot(OUT, "showcase-settings");
      await closeSettings();
    }

    // settings panel on the Snippets tab, first two groups open
    if (wanted.includes("snippets")) {
      await setPalette("Japanese Indigo");
      await openSettings("Snippets");
      await openGroups(2);
      await shot(OUT, "showcase-snippets");
      await closeSettings();
    }

    // every icon of the set on one sheet, masked the way the extension paints them
    if (wanted.includes("icons")) {
      const icons = iconData();
      const cols = 11;
      const rows = Math.ceil(icons.length / cols);
      const tiles = icons.map((ic, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const colour = sweep((col / (cols - 1)) * 0.75 + (row / (rows - 1)) * 0.25);
        return `<div title="${ic.name}" style="border-radius:26px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);display:grid;place-items:center"><i style="display:block;width:62px;height:62px;background:${colour};-webkit-mask:url(${ic.url}) center/contain no-repeat;mask:url(${ic.url}) center/contain no-repeat"></i></div>`;
      }).join("");
      await js(`(() => {
        const d = document.createElement("div");
        d.id = "vg-shot-icons";
        d.style.cssText = "position:fixed;inset:0;z-index:2147483646;display:grid;place-items:center;background:radial-gradient(1100px 640px at 50% 45%, #15151B 0%, #07070A 72%)";
        d.innerHTML = '<div style="display:grid;grid-template-columns:repeat(${cols},118px);grid-auto-rows:118px;gap:12px">' + ${JSON.stringify(tiles)} + '</div>';
        document.body.appendChild(d);
        return true;
      })()`);
      await sleep(600);
      await shot(OUT, "showcase-icons");
      await js(`(() => { const d = document.getElementById("vg-shot-icons"); if (d) d.remove(); return true; })()`);
    }

    // album cover background, then the Taskbar Player on its own at 2x. The
    // player normally opens a picture-in-picture window, which CDP cannot
    // photograph, so for the shot it is handed an iframe in the page instead.
    if (wanted.includes("extras")) {
      await setPalette("R34 Purple");
      await albumCover(true);
      await shot(OUT, "showcase-background");
      await js(`(() => {
        const dpip = window.documentPictureInPicture;
        if (!dpip) throw new Error("documentPictureInPicture is not available");
        dpip.requestWindow = async ({ width, height }) => {
          const f = document.createElement("iframe");
          f.id = "vg-shot-pip";
          f.style.cssText = "position:fixed;z-index:2147483646;left:40px;top:40px;width:" + width + "px;height:" + height + "px;border:0;background:transparent";
          document.body.appendChild(f);
          f.contentWindow.resizeTo = (w, h) => { f.style.width = w + "px"; f.style.height = h + "px"; };
          return f.contentWindow;
        };
        document.dispatchEvent(new CustomEvent("vg-toggle-taskbar"));
        return true;
      })()`);
      await sleep(3500);
      const box = await js(`(() => {
        const f = document.getElementById("vg-shot-pip");
        if (!f || !f.contentDocument || !f.contentDocument.body.childElementCount) throw new Error("taskbar player did not render");
        const b = f.getBoundingClientRect();
        return { x: b.x, y: b.y, width: b.width, height: b.height };
      })()`);
      await shot(OUT, "showcase-taskbar", { ...box, scale: 2 });
      await js(`(() => {
        const f = document.getElementById("vg-shot-pip"); if (f) f.remove();
        delete window.documentPictureInPicture.requestWindow;
        return true;
      })()`);
      await albumCover(false);
    }
  } finally {
    // put the user's settings back exactly, then repaint their palette
    await js(`(() => {
      const saved = ${JSON.stringify(saved)};
      const f = document.getElementById("vg-shot-pip"); if (f) f.remove();
      if (window.documentPictureInPicture) delete window.documentPictureInPicture.requestWindow;
      const d = document.getElementById("vg-shot-icons"); if (d) d.remove();
      const m = document.querySelector("style.marketplaceUserCSS");
      if (m && window.__vgShotCss !== undefined) { m.textContent = window.__vgShotCss; delete window.__vgShotCss; }
      const p = document.getElementById("vg-settings-css");
      if (p && window.__vgShotPanelCss !== undefined) { p.textContent = window.__vgShotPanelCss; delete window.__vgShotPanelCss; }
      const now = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("vantagraph:")) now.push(k); }
      now.forEach(k => { if (!(k in saved)) localStorage.removeItem(k); });
      Object.entries(saved).forEach(([k, v]) => localStorage.setItem(k, v));
      window.VantagraphData.applySetting("bg-use-album-cover", saved["vantagraph:bg-use-album-cover"] || "false");
      if (saved["vantagraph:theme"]) window.VantagraphData.applyTheme(saved["vantagraph:theme"]);
      const s = document.getElementById("vg-shot-style"); if (s) s.remove();
      return true;
    })()`).catch(e => console.error("restore failed:", e.message));
    // library filter back to what it was
    if ((await activeFilter().catch(() => libraryFilter)) !== libraryFilter) {
      await clearFilter().catch(() => {});
      await chip(libraryFilter).catch(() => {});
    }
    await c.send("Emulation.clearDeviceMetricsOverride").catch(() => {});
    c.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
