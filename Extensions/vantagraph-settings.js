// Vantagraph Settings - center modal (CSS injected here, deps: window.VantagraphData)
//
// Written by Miabeyefendi - part of the Vantagraph Spicetify theme.
// Repository: https://github.com/Miabeyefendi/Vantagraph

(function vantagraphSettings() {

  // wait for theme.js + Spicetify APIs
  function waitForVantagraphData(cb) {
    if (window.VantagraphData && Spicetify && Spicetify.Player && Spicetify.Platform && Spicetify.LocalStorage && Spicetify.Topbar) cb();
    else setTimeout(() => waitForVantagraphData(cb), 100);
  }

  let panelEl = null;
  let activeTab = "appearance";
  const TABS = [
    { id: "appearance", label: "🎨 Theme" },
    { id: "typography", label: "✏️ Font" },
    { id: "layout",     label: "📐 Layout" },
    { id: "background", label: "🖼️ BG" },
    { id: "snippets",   label: "✂️ Snippets" },
  ];

  // inject panel CSS once
  function ensureStyles() {
    if (document.getElementById("vg-settings-css")) return;
    const s = document.createElement("style");
    s.id = "vg-settings-css";
    s.textContent = `
.vg-sp{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;width:clamp(440px, 35vw, 720px);max-height:85vh;background:var(--spice-panel,#121212);border:1px solid var(--spice-stroke,#1A1A1A);border-radius:14px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.7)}
.vg-sp.open{display:flex}
.vg-sh{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--spice-panel,#121212);border-bottom:1px solid var(--spice-stroke,#1A1A1A)}
.vg-sh span{font-size:15px;font-weight:600;color:var(--spice-text,#FFF);letter-spacing:.5px}
.vg-sh button{width:24px;height:24px;border-radius:50%;border:none;background:var(--spice-stroke,#1A1A1A);color:var(--spice-subtext,#A7A7A7);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .15s}
.vg-sh button:hover{background:#E22134;color:var(--spice-text,#FFF)}
.vg-tabs{display:flex;border-bottom:1px solid var(--spice-stroke,#1A1A1A);background:var(--spice-panel,#121212);overflow-x:auto;scrollbar-width:none}
.vg-tabs::-webkit-scrollbar{display:none}
.vg-tab{padding:10px 14px;font-size:12px;font-weight:500;color:var(--spice-subtext,#A7A7A7);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap;flex-shrink:0}
.vg-tab:hover{color:var(--spice-accent,#1ED760);background:var(--spice-panel-hover,#242424)}
.vg-tab.on{color:var(--spice-accent,#1ED760);border-bottom-color:var(--spice-accent,#1DB954)}
.vg-sc{flex:1;padding:12px 16px;overflow-y:auto;min-height:0;scrollbar-width:thin;scrollbar-color:var(--spice-stroke,#1A1A1A) transparent}
.vg-sc::-webkit-scrollbar{width:4px}
.vg-sc::-webkit-scrollbar-thumb{background:var(--spice-stroke,#1A1A1A);border-radius:4px}
.vg-acc{margin-bottom:8px;border:1px solid var(--spice-stroke,#1A1A1A);border-radius:8px;overflow:hidden}
.vg-ach{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--spice-panel,#121212);cursor:pointer;user-select:none;transition:background .15s}
.vg-ach:hover{background:var(--spice-panel-hover,#242424)}
.vg-ach span:first-child{font-size:13px;font-weight:600;color:var(--spice-text,#FFF)}
.vg-ach span:last-child{font-size:11px;color:var(--spice-subtext,#A7A7A7);transition:transform .2s}
.vg-acc.open .vg-ach span:last-child{transform:rotate(180deg)}
.vg-ab{max-height:0;overflow:hidden;transition:max-height .25s ease}
.vg-acc.open .vg-ab{max-height:600px}
.vg-ai{padding:10px 14px}
.vg-rl{display:flex;flex-direction:column;gap:4px}
.vg-ri{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;cursor:pointer;background:var(--spice-panel,#121212);transition:background .12s}
.vg-ri:hover{background:var(--spice-panel-hover,#242424)}
.vg-ri.on{background:var(--spice-stroke,#1A1A1A)}
.vg-rd{width:14px;height:14px;border-radius:50%;border:2px solid var(--spice-subtext,#A7A7A7);flex-shrink:0;position:relative}
.vg-ri.on .vg-rd{border-color:var(--spice-accent,#1DB954)}
.vg-ri.on .vg-rd::after{content:'';position:absolute;top:2px;left:2px;width:6px;height:6px;background:var(--spice-accent,#1DB954);border-radius:50%}
.vg-rc{flex:1;min-width:0}
.vg-rc .nm{font-size:13px;font-weight:500;color:var(--spice-text,#FFF)}
.vg-sw{display:inline-flex;gap:3px;margin-left:8px;vertical-align:middle}
.vg-sw i{width:12px;height:12px;border-radius:50%;border:1px solid var(--spice-stroke,#1A1A1A);display:inline-block}
.vg-tr{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--spice-panel,#121212)}
.vg-tl{font-size:13px;font-weight:500;color:var(--spice-text,#FFF);flex:1}
.vg-ts{width:36px;height:20px;border-radius:10px;border:none;cursor:pointer;position:relative;transition:background .2s;background:var(--spice-stroke,#1A1A1A);flex-shrink:0;margin-left:8px}
.vg-ts.on{background:var(--spice-accent,#1DB954)}
.vg-tk{position:absolute;top:2px;left:2px;width:16px;height:16px;background:var(--spice-text,#FFF);border-radius:50%;transition:left .2s}
.vg-ts.on .vg-tk{left:18px}
.vg-sr{display:flex;align-items:center;gap:8px;padding:6px 0}
.vg-sr .lb{font-size:12px;color:var(--spice-subtext,#A7A7A7);min-width:60px}
.vg-sr input[type=range]{-webkit-appearance:none;appearance:none;flex:1;height:4px;background:var(--spice-stroke,#1A1A1A);border-radius:2px;outline:none}
.vg-sr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;background:var(--spice-accent,#1DB954);border-radius:50%;cursor:pointer}
.vg-sr .vl{font-size:11px;color:var(--spice-subtext,#A7A7A7);min-width:30px;text-align:right}
.vg-fi{width:100%;padding:8px 10px;background:var(--spice-panel,#121212);border:1px solid var(--spice-stroke,#1A1A1A);border-radius:6px;color:var(--spice-text,#FFF);font-size:13px;margin-top:4px;font-family:inherit;outline:none;transition:border-color .15s}
.vg-fi:focus{border-color:var(--spice-accent,#1DB954)}
.vg-fi::placeholder{color:var(--spice-subtext,#A7A7A7)}
.vg-di{display:inline-flex;cursor:pointer;color:var(--spice-subtext,#A7A7A7);font-size:14px;margin-left:4px;transition:color .15s}
.vg-di:hover{color:#E22134}
.vg-dr{display:flex;gap:4px}
.vg-dr button{flex:1;padding:7px;background:var(--spice-panel,#121212);border:1px solid var(--spice-stroke,#1A1A1A);border-radius:6px;color:var(--spice-subtext,#A7A7A7);cursor:pointer;font-size:12px;font-family:inherit;transition:all .15s;text-align:center}
.vg-dr button:hover{background:var(--spice-panel-hover,#242424)}
.vg-dr button.on{background:var(--spice-stroke,#1A1A1A);color:var(--spice-text,#FFF);border-color:var(--spice-accent,#1DB954)}
.vg-rb{width:100%;margin-top:12px;padding:8px;border:1px solid #E22134;border-radius:6px;background:var(--spice-panel,#121212);color:#E22134;cursor:pointer;font-size:12px;font-weight:500;font-family:inherit;transition:all .15s}
.vg-rb:hover{background:#E22134;color:var(--spice-text,#FFF)}
.vg-cr{text-align:center;font-size:10px;color:var(--spice-subtext,#A7A7A7);opacity:.3;padding:8px;border-top:1px solid var(--spice-stroke,#1A1A1A);flex-shrink:0}`;
    document.head.appendChild(s);
  }

  // open/close modal (toggles)
  // panel is built once and kept in the DOM; open/close only flips display.
  // No enter/exit animation: the 200ms fade over glass panels dropped frames.
  // Content is rebuilt on reopen only when something outside the panel changed
  // it (theme.js auto-switches to Glass when a background is set).
  let renderedState = "";
  function externalState() {
    const g = window.VantagraphData.getSetting;
    return [g("theme", ""), g("bg-url", ""), g("bg-use-album-cover", "")].join("|");
  }
  function toggle() {
    if (panelEl) {
      if (panelEl.classList.contains("open")) { close(); return; }
      if (externalState() !== renderedState) render(panelEl.querySelector(".vg-sc"));
      panelEl.classList.add("open");
      document.addEventListener("keydown", esc);
      return;
    }
    ensureStyles();
    const V = window.VantagraphData;

    const p = document.createElement("div"); p.className = "vg-sp";

    // Header
    const h = document.createElement("div"); h.className = "vg-sh";
    const t = document.createElement("span"); t.textContent = "Vantagraph Settings";
    const cb = document.createElement("button"); cb.textContent = "✕"; cb.onclick = close;
    h.appendChild(t); h.appendChild(cb);

    // Tabs
    const tabs = document.createElement("div"); tabs.className = "vg-tabs";
    TABS.forEach(c => {
      const b = document.createElement("button");
      b.className = "vg-tab" + (c.id === activeTab ? " on" : "");
      b.textContent = c.label;
      b.onclick = () => { activeTab = c.id; tabs.querySelectorAll(".vg-tab").forEach(x => x.classList.remove("on")); b.classList.add("on"); render(sc); };
      tabs.appendChild(b);
    });

    // Content
    const sc = document.createElement("div"); sc.className = "vg-sc";

    // Credits
    const cr = document.createElement("div"); cr.className = "vg-cr"; cr.textContent = "Vantagraph v5.0";

    p.appendChild(h); p.appendChild(tabs); p.appendChild(sc); p.appendChild(cr);
    document.body.appendChild(p);
    panelEl = p;
    render(sc);
    document.addEventListener("keydown", esc);
    p.classList.add("open");
  }

  function close() {
    if (!panelEl) return;
    document.removeEventListener("keydown", esc);
    panelEl.classList.remove("open");
  }
  function esc(e) { if (e.key === "Escape") close(); }

  // helpers: accordion / slider / toggle builders
  function acc(title, open, fn) {
    const d = document.createElement("div"); d.className = "vg-acc" + (open ? " open" : "");
    const h = document.createElement("div"); h.className = "vg-ach";
    const s1 = document.createElement("span"); s1.textContent = title;
    const s2 = document.createElement("span"); s2.textContent = "▼";
    h.appendChild(s1); h.appendChild(s2);
    const b = document.createElement("div"); b.className = "vg-ab";
    const i = document.createElement("div"); i.className = "vg-ai";
    fn(i); b.appendChild(i);
    h.onclick = () => d.classList.toggle("open");
    d.appendChild(h); d.appendChild(b); return d;
  }
  function slider(label, min, max, step, val, unit, cb, centerVal) {
    const isDef = val === "default";
    const r = document.createElement("div"); r.className = "vg-sr";
    const l = document.createElement("span"); l.className = "lb"; l.textContent = label;
    const s = document.createElement("input"); s.type = "range"; s.min = min; s.max = max; s.step = step; s.value = isDef ? centerVal : val;
    const v = document.createElement("span"); v.className = "vl"; v.textContent = isDef ? "DEFAULT" : val + unit;
    if (isDef) s.style.opacity = "0.35";
    let db = null;
    s.oninput = () => {
      s.style.opacity = "1";
      v.textContent = s.value + unit;
      v.style.color = "";
      cb(s.value);
      if (db) db.style.opacity = "1";
    };
    r.appendChild(l); r.appendChild(s); r.appendChild(v);
    if (centerVal !== undefined) {
      db = document.createElement("button"); db.className = "vg-sd"; db.textContent = "DEF";
      db.title = "Restore native Spotify defaults";
      db.style.cssText = "background:none;border:1px solid rgba(255,255,255,0.2);color:#A7A7A7;font-size:9px;font-weight:bold;letter-spacing:0.5px;padding:2px 6px;border-radius:4px;cursor:pointer;margin-left:6px;opacity:" + (isDef ? "0.3" : "1") + ";transition:opacity .2s,color .2s;";
      db.onclick = () => {
        s.value = centerVal;
        s.style.opacity = "0.35";
        v.textContent = "DEFAULT";
        v.style.color = "#666";
        cb("default");
        db.style.opacity = "0.3";
      };
      r.appendChild(db);
    }
    return r;
  }
  function tog(label, on, cb) {
    const r = document.createElement("div"); r.className = "vg-tr";
    const l = document.createElement("span"); l.className = "vg-tl"; l.textContent = label;
    const t = document.createElement("button"); t.className = "vg-ts" + (on ? " on" : "");
    const k = document.createElement("span"); k.className = "vg-tk"; t.appendChild(k);
    t.onclick = () => { const n = !t.classList.contains("on"); t.classList.toggle("on", n); cb(n); };
    r.appendChild(l); r.appendChild(t); return r;
  }

  // render active tab into container c
  function render(c) {
    renderedState = externalState();
    c.innerHTML = "";
    const V = window.VantagraphData;
    const { THEMES, FONT_PRESETS, applyTheme, applyFont, applySetting, getSetting } = V;

    if (activeTab === "appearance") {
      // tab: appearance - themes + custom accent
      const { LIGHT_THEMES } = V;
      const darkThemes = Object.keys(THEMES).filter(n => !LIGHT_THEMES.includes(n));
      const lightThemes = Object.keys(THEMES).filter(n => LIGHT_THEMES.includes(n));

      function buildThemeList(names, container) {
        const cur = getSetting("theme", "Spotify Default");
        const list = document.createElement("div"); list.className = "vg-rl";
        names.forEach(name => {
          const th = THEMES[name];
          const it = document.createElement("div"); it.className = "vg-ri" + (name === cur ? " on" : "");
          const dot = document.createElement("div"); dot.className = "vg-rd";
          const rc = document.createElement("div"); rc.className = "vg-rc";
          const nm = document.createElement("div"); nm.className = "nm"; nm.textContent = name;
          const sw = document.createElement("span"); sw.className = "vg-sw";
          [th.panel, th.window, th.accent].forEach(col => { if(col){ const i = document.createElement("i"); i.style.background = "#" + col; sw.appendChild(i); } });
          nm.appendChild(sw); rc.appendChild(nm); it.appendChild(dot); it.appendChild(rc);
          it.onclick = () => { applyTheme(name); c.querySelectorAll(".vg-ri").forEach(x => x.classList.remove("on")); it.classList.add("on"); };
          list.appendChild(it);
        });
        container.appendChild(list);
      }

      c.appendChild(acc("🌙 Dark Themes", true, inner => buildThemeList(darkThemes, inner)));
      c.appendChild(acc("☀️ Light Themes", false, inner => buildThemeList(lightThemes, inner)));

      // custom icons toggle
      const iconsOn = Spicetify.LocalStorage.get("vantagraph:icons-enabled") !== "false";
      c.appendChild(tog("Custom Icons", iconsOn, v => { if (window.vantagraphIconsToggle) window.vantagraphIconsToggle(v); }));

      // custom accent color picker (always visible, not in accordion)
      const accentWrap = document.createElement("div");
      accentWrap.style.cssText = "padding:10px 14px;margin-top:6px;background:var(--spice-stroke,#1a1a1a);border-radius:8px;border:1px solid var(--spice-panel-hover,#282828);";
      const accentTitle = document.createElement("div");
      accentTitle.style.cssText = "font-size:11px;font-weight:600;color:var(--spice-subtext,#B3B3B3);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;";
      accentTitle.textContent = "🎨 Custom Accent Color";
      accentWrap.appendChild(accentTitle);
      const savedColor = getSetting("snippet-custom-accent", "");
      const accentRow = document.createElement("div"); accentRow.style.cssText = "display:flex;align-items:center;gap:8px;";
      const curAccent = getComputedStyle(document.documentElement).getPropertyValue("--spice-accent").trim() || "#1DB954";
      const picker = document.createElement("input"); picker.type = "color"; picker.value = savedColor || curAccent;
      picker.style.cssText = "width:32px;height:32px;border:none;background:none;cursor:pointer;padding:0;";
      const accentLabel = document.createElement("span"); accentLabel.style.cssText = "font-size:11px;color:var(--spice-subtext,#A7A7A7);min-width:60px;"; accentLabel.textContent = savedColor || "Default";
      const applyBtn = document.createElement("button"); applyBtn.style.cssText = "padding:4px 10px;background:var(--spice-accent,#1DB954);color:var(--spice-text,#fff);border:none;border-radius:4px;font-size:10px;cursor:pointer;margin-left:auto;";
      applyBtn.textContent = "Apply";
      applyBtn.onclick = () => { const v = picker.value; applySetting("snippet-custom-accent", v); accentLabel.textContent = v; Spicetify.showNotification("Accent applied ✓"); };
      const clearBtn = document.createElement("button"); clearBtn.style.cssText = "padding:4px 10px;background:#E22134;color:#fff;border:none;border-radius:4px;font-size:10px;cursor:pointer;";
      clearBtn.textContent = "Reset";
      clearBtn.onclick = () => { applySetting("snippet-custom-accent", ""); Spicetify.LocalStorage.remove("vantagraph:snippet-custom-accent"); accentLabel.textContent = "Default"; const curTheme = getSetting("theme", "Spotify Default"); applyTheme(curTheme); Spicetify.showNotification("Accent reset ✓"); };
      accentRow.appendChild(picker); accentRow.appendChild(accentLabel); accentRow.appendChild(applyBtn); accentRow.appendChild(clearBtn);
      accentWrap.appendChild(accentRow);
      c.appendChild(accentWrap);

    } else if (activeTab === "typography") {
      // tab: typography - font family + size
      c.appendChild(acc("Font Family", true, inner => {
        const cur = getSetting("font", "");
        const list = document.createElement("div"); list.className = "vg-rl";
        FONT_PRESETS.forEach(p => {
          const it = document.createElement("div"); it.className = "vg-ri" + (p.family === cur || (!cur && !p.family) ? " on" : "");
          const dot = document.createElement("div"); dot.className = "vg-rd";
          const rc = document.createElement("div"); rc.className = "vg-rc";
          const nm = document.createElement("div"); nm.className = "nm"; nm.textContent = p.name;
          if (p.url && !document.getElementById("vgfp-" + p.family.replace(/\s/g, ""))) { const lk = document.createElement("link"); lk.id = "vgfp-" + p.family.replace(/\s/g, ""); lk.rel = "stylesheet"; lk.href = p.url; document.head.appendChild(lk); }
          nm.style.fontFamily = p.family || "inherit";
          rc.appendChild(nm); it.appendChild(dot); it.appendChild(rc);
          it.onclick = () => { applyFont(p.family, p.url || ""); list.querySelectorAll(".vg-ri").forEach(x => x.classList.remove("on")); it.classList.add("on"); ci.style.display = cu.style.display = "none"; };
          list.appendChild(it);
        });
        // custom font input (auto-falls-back to Google Fonts URL)
        const isC = cur && !FONT_PRESETS.find(p => p.family === cur);
        const ci = document.createElement("input"); ci.className = "vg-fi"; ci.placeholder = "Font name"; ci.value = getSetting("custom-font", ""); ci.style.display = isC ? "block" : "none";
        const cu = document.createElement("input"); cu.className = "vg-fi"; cu.placeholder = "Google Fonts URL (optional)"; cu.value = getSetting("custom-font-url", ""); cu.style.display = isC ? "block" : "none";
        const cit = document.createElement("div"); cit.className = "vg-ri" + (isC ? " on" : "");
        const cd = document.createElement("div"); cd.className = "vg-rd";
        const crc = document.createElement("div"); crc.className = "vg-rc"; crc.style.cssText = "display:flex;align-items:center;";
        const cnm = document.createElement("div"); cnm.className = "nm"; cnm.textContent = "Custom...";
        const di = document.createElement("span"); di.className = "vg-di"; di.textContent = "✖"; di.title = "Clear";
        di.onclick = e => { e.stopPropagation(); clrFont(); };
        crc.appendChild(cnm); crc.appendChild(di); cit.appendChild(cd); cit.appendChild(crc);
        cit.onclick = () => { list.querySelectorAll(".vg-ri").forEach(x => x.classList.remove("on")); cit.classList.add("on"); ci.style.display = cu.style.display = "block"; ci.focus(); };
        list.appendChild(cit);
        inner.appendChild(list); inner.appendChild(ci); inner.appendChild(cu);

        function applyC() { const n = ci.value.trim(); if (!n) { clrFont(); return; } Spicetify.LocalStorage.set("vantagraph:custom-font", n); Spicetify.LocalStorage.set("vantagraph:custom-font-url", cu.value.trim()); let url = cu.value.trim(); if (!url && n) url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(n)}&display=swap`; applyFont(n, url); }
        function clrFont() { ["font","font-url","custom-font","custom-font-url"].forEach(k => Spicetify.LocalStorage.remove("vantagraph:" + k)); applyFont("", ""); ci.value = cu.value = ""; ci.style.display = cu.style.display = "none"; list.querySelectorAll(".vg-ri").forEach(x => x.classList.remove("on")); list.querySelector(".vg-ri")?.classList.add("on"); }
        ci.addEventListener("keyup", () => { if (!ci.value.trim()) clrFont(); });
        ci.addEventListener("keydown", e => { if (e.key === "Enter") applyC(); });
        ci.addEventListener("blur", applyC);
        cu.addEventListener("keydown", e => { if (e.key === "Enter") applyC(); });
        cu.addEventListener("blur", applyC);
      }));
      c.appendChild(acc("Font Size", true, inner => {
        inner.appendChild(slider("Size", 10, 20, 1, getSetting("font-size", "14"), "px", v => applySetting("font-size", v)));
      }));

    } else if (activeTab === "layout") {
      // tab: layout - icon size, density, corners
      c.appendChild(acc("Layout", true, inner => {
        inner.appendChild(slider("Icon Size", 12, 34, 0.5, getSetting("icon-size", "default"), "px", v => applySetting("icon-size", v), "23"));
        const dl = document.createElement("div"); dl.style.cssText = "font-size:10px;color:#A7A7A7;margin:8px 0 4px;"; dl.textContent = "Density"; inner.appendChild(dl);
        const dr = document.createElement("div"); dr.className = "vg-dr";
        const cd = getSetting("density", "default");
        ["compact", "default", "comfortable"].forEach(d => {
          const b = document.createElement("button"); b.className = d === cd ? "on" : ""; b.textContent = d.charAt(0).toUpperCase() + d.slice(1);
          b.onclick = () => { applySetting("density", d); dr.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); };
          dr.appendChild(b);
        });
        inner.appendChild(dr);
        inner.appendChild(slider("Corners", 0, 24, 1, getSetting("border-radius", "default"), "px", v => applySetting("border-radius", v), "12"));
      }));

    } else if (activeTab === "background") {
      // tab: background - custom URL, album cover, filters
      c.appendChild(acc("Background Image", true, inner => {
        const bi = document.createElement("input"); bi.className = "vg-fi"; bi.placeholder = "Image URL (empty = solid)"; bi.value = getSetting("bg-url", ""); bi.style.marginTop = "0";
        function upd() { const u = bi.value.trim(); Spicetify.LocalStorage.set("vantagraph:bg-url", u); applySetting("bg-url", u); }
        bi.addEventListener("keyup", () => { if (!bi.value.trim()) { Spicetify.LocalStorage.set("vantagraph:bg-url", ""); applySetting("bg-url", ""); } });
        bi.addEventListener("keydown", e => { if (e.key === "Enter") upd(); });
        bi.addEventListener("blur", upd);
        inner.appendChild(bi);
        inner.appendChild(tog("Album Cover as BG", getSetting("bg-use-album-cover", "false") === "true", v => applySetting("bg-use-album-cover", String(v))));
        const warn = document.createElement("div"); warn.style.cssText = "background:#E22134;color:#fff;padding:6px 10px;border-radius:6px;font-size:10px;font-weight:600;margin-top:8px;text-align:center;"; warn.textContent = "⚠ WARNING! Select theme first, then activate BG"; inner.appendChild(warn);
      }));
      c.appendChild(acc("Image Filters", false, inner => {
        inner.appendChild(slider("Blur", 0, 50, 1, getSetting("bg-blur", "0"), "px", v => applySetting("bg-blur", v)));
        inner.appendChild(slider("Brightness", 0, 200, 5, getSetting("bg-brightness", "100"), "%", v => applySetting("bg-brightness", v)));
        inner.appendChild(slider("Contrast", 0, 200, 5, getSetting("bg-contrast", "100"), "%", v => applySetting("bg-contrast", v)));
        inner.appendChild(slider("Saturation", 0, 200, 5, getSetting("bg-saturation", "100"), "%", v => applySetting("bg-saturation", v)));
      }));

    } else if (activeTab === "snippets") {
      // tab: snippets - visual / hide buttons / hide elements / layout / dev tools
      c.appendChild(acc("Visual", true, inner => {
        [
          { k: "snippet-rounded-images", l: "Rounded Images", def: "true" },
          { k: "snippet-modern-scrollbar", l: "Modern ScrollBar", def: "true" },
        ].forEach(s => {
          inner.appendChild(tog(s.l, getSetting(s.k, s.def) !== "false", v => applySetting(s.k, String(v))));
        });
        // vinyl stop: default OFF
        inner.appendChild(tog("Stop Vinyl Animation", getSetting("snippet-vinyl-stop", "false") === "true", v => applySetting("snippet-vinyl-stop", String(v))));
        // reduced motion: default OFF, collapses Spotify's transitions to 1ms
        inner.appendChild(tog("Reduced Motion", getSetting("snippet-reduced-motion", "false") === "true", v => applySetting("snippet-reduced-motion", String(v))));
      }));

      // hide buttons (player bar + topbar controls)
      c.appendChild(acc("Hide Buttons", false, inner => {
        [
          { k: "snippet-hide-friend-activity", l: "Friend Activity Button" },
          { k: "snippet-hide-whats-new",       l: "What's New Button" },
          { k: "snippet-hide-fullscreen",      l: "Fullscreen Button" },
          { k: "snippet-hide-lyrics-btn",      l: "Lyrics Button" },
          { k: "snippet-hide-miniplayer",      l: "Mini Player Button" },
          { k: "snippet-hide-queue-btn",       l: "Queue Button" },
          { k: "snippet-hide-shuffle",         l: "Shuffle Button" },
          { k: "snippet-hide-repeat",          l: "Repeat Button" },
          { k: "snippet-hide-connect",         l: "Connect Device Button" },
          { k: "snippet-hide-volume",          l: "Volume Bar" },
          { k: "snippet-hide-np-widget",       l: "Now Playing Widget" },
          { k: "snippet-hide-next-track",      l: "Next Track Widget" },
        ].forEach(s => {
          inner.appendChild(tog(s.l, getSetting(s.k, "false") === "true", v => applySetting(s.k, String(v))));
        });
      }));

      // hide elements (home sections + interface)
      c.appendChild(acc("Hide Elements", false, inner => {
        [
          { k: "snippet-hide-podcasts",        l: "Podcasts Filter" },
          { k: "snippet-hide-ads-banner",      l: "Ads Banner" },
          { k: "snippet-hide-promo-card",     l: "New Release Promo Card" },
          { k: "snippet-hide-mood-recs",      l: "Mood / Time Recommendations" },
          { k: "snippet-hide-home-shortcuts",  l: "Home Shortcuts Grid" },
          { k: "snippet-hide-made-for-you",    l: "Made For You" },
          { k: "snippet-hide-recents",         l: "Recents" },
          { k: "snippet-hide-top-mixes",       l: "Top Mixes" },
          { k: "snippet-hide-jump-back",       l: "Jump Back In" },
          { k: "snippet-hide-rec-stations",    l: "Recommended Stations" },
          { k: "snippet-hide-new-releases",    l: "New Releases" },
          { k: "snippet-hide-best-artists",    l: "Best of Artists" },
          { k: "snippet-hide-fav-artists",     l: "Favorite Artists" },
          { k: "snippet-hide-rec-today",       l: "Recommended for Today" },
        ].forEach(s => {
          inner.appendChild(tog(s.l, getSetting(s.k, "false") === "true", v => applySetting(s.k, String(v))));
        });
      }));

      // layout
      c.appendChild(acc("Layout", false, inner => {
        [
          { k: "snippet-thin-library",       l: "Thin Library Rows" },
          { k: "snippet-auto-hide-sidebar",  l: "Auto-hide Sidebar (<1200px)" },
        ].forEach(s => {
          inner.appendChild(tog(s.l, getSetting(s.k, "false") === "true", v => applySetting(s.k, String(v))));
        });
      }));

      // dev tools
      c.appendChild(acc("🛠️ Developer Tools", false, inner => {
        [
          { k: "debug-labels",                l: "Panel Labels" },
          { k: "snippet-dev-layout-grid",      l: "Layout Grid Visualizer" },
          { k: "snippet-dev-highlighter",      l: "Element Highlighter" },
          { k: "snippet-dev-spacing-viz",      l: "Spacing Visualizer" },
          { k: "snippet-dev-var-monitor",      l: "CSS Variable Monitor" },
          { k: "snippet-dev-dom-logger",       l: "DOM Mutation Logger" },
        ].forEach(s => {
          inner.appendChild(tog(s.l, getSetting(s.k, "false") === "true", v => applySetting(s.k, String(v))));
        });
        const auditBtn = document.createElement("button");
        auditBtn.style.cssText = "width:100%;padding:8px;background:#2a2a2a;color:#dda0dd;border:1px solid #444;border-radius:6px;font-size:11px;cursor:pointer;margin-top:6px;transition:background 0.2s;";
        auditBtn.textContent = "▶ Run Encore Audit";
        auditBtn.onmouseenter = () => auditBtn.style.background = "#3a3a3a";
        auditBtn.onmouseleave = () => auditBtn.style.background = "#2a2a2a";
        auditBtn.onclick = () => { applySetting("snippet-dev-encore-audit", "true"); };
        inner.appendChild(auditBtn);
      }));
    }

    // reset button: full wipe (storage + injected styles + inline vars + classes)
    const rb = document.createElement("button"); rb.className = "vg-rb"; rb.textContent = "↻ Reset to Defaults";
    rb.onclick = () => {
      if (!confirm("Reset all Vantagraph settings?")) return;

      // 1. clear all vantagraph:* localStorage keys
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith("vantagraph:")) keysToRemove.push(k);
      }
      keysToRemove.forEach(k => Spicetify.LocalStorage.remove(k));

      // 1b. extension keys (lyric / volume+ / icons)
      ["fontsize", "showfont", "showvol", "showlyrics", "showshuffle",
       "showlike", "showclose", "centerlyrics", "showtranslations"
      ].forEach(k => localStorage.removeItem("vg-lyric-" + k));
      ["default-increment", "shift-increment", "ctrl-increment"
      ].forEach(k => Spicetify.LocalStorage.remove("vg-volume-plus." + k));
      Spicetify.LocalStorage.remove("vantagraph:icons-enabled");

      // 2. remove injected <style>/<link> elements
      const injectedIds = [
        // core engine
        "vantagraph-font", "vantagraph-font-link",
        "vantagraph-fontsize", "vantagraph-iconsize",
        "vantagraph-density", "vantagraph-border-radius",
        "vantagraph-bg-element",
        "vantagraph-snippet-custom-accent",
        "vantagraph-debug-labels",
        // visual snippets
        "vantagraph-snippet-modern-scrollbar",
        "vantagraph-snippet-rounded-images-off",
        "vantagraph-snippet-dark-context-menu",
        "vantagraph-snippet-vinyl-stop",
        "vantagraph-snippet-reduced-motion",
        // hide buttons (topbar + player bar)
        "vantagraph-snippet-hide-friend-activity",
        "vantagraph-snippet-hide-whats-new",
        "vantagraph-snippet-hide-fullscreen",
        "vantagraph-snippet-hide-lyrics-btn",
        "vantagraph-snippet-hide-miniplayer",
        "vantagraph-snippet-hide-queue-btn",
        "vantagraph-snippet-hide-shuffle",
        "vantagraph-snippet-hide-repeat",
        "vantagraph-snippet-hide-connect",
        "vantagraph-snippet-hide-volume",
        "vantagraph-snippet-hide-np-widget",
        "vantagraph-snippet-hide-next-track",
        // hide elements (ads + home sections)
        "vantagraph-snippet-hide-ads-banner",
        "vantagraph-snippet-hide-podcasts",
        "vantagraph-snippet-hide-promo-card",
        "vantagraph-snippet-hide-mood-recs",
        "vantagraph-snippet-hide-made-for-you",
        "vantagraph-snippet-hide-recents",
        "vantagraph-snippet-hide-top-mixes",
        "vantagraph-snippet-hide-jump-back",
        "vantagraph-snippet-hide-rec-stations",
        "vantagraph-snippet-hide-new-releases",
        "vantagraph-snippet-hide-best-artists",
        "vantagraph-snippet-hide-fav-artists",
        "vantagraph-snippet-hide-rec-today",
        "vantagraph-snippet-hide-home-shortcuts",
        // layout
        "vantagraph-snippet-thin-library",
        "vantagraph-snippet-auto-hide-sidebar",
        // dev tools
        "vantagraph-snippet-dev-layout-grid",
        "vantagraph-snippet-dev-highlighter",
        "vantagraph-snippet-dev-spacing-viz",
        // extensions
        "vantagraph-custom-icons",
        "vg-volume-plus-css", "vg-volume-plus-style",
      ];
      injectedIds.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });

      // 3. clear inline --spice-* / --vg-* from :root
      const root = document.documentElement;
      const allProps = root.style.cssText.match(/--(?:spice|vg)-[^:]+/g) || [];
      allProps.forEach(prop => root.style.removeProperty(prop.trim()));

      // 4. remove body classes
      document.body.classList.remove("vg-glass-theme", "vg-bg-active", "vg-debug");
      document.body.style.background = "";

      // 4a. dev tool cleanup (var monitor, dom logger, spacing viz overlays)
      const varMon = document.getElementById("vg-var-monitor");
      if (varMon) { clearInterval(parseInt(varMon.dataset.tid)); varMon.remove(); }
      if (window._vgMutObs) { window._vgMutObs.disconnect(); window._vgMutObs = null; }
      document.querySelectorAll("[id^='vg-spacing-']").forEach(el => el.remove());

      // 4b. clear inline bg styles set by BG engine
      const vgRoot = document.querySelector(".vg-root");
      if (vgRoot) vgRoot.style.removeProperty("background");
      const topContainer = document.querySelector(".Root__top-container");
      if (topContainer) topContainer.style.removeProperty("background");

      // 4c. volume+ cleanup (label + width overrides)
      const volLabel = document.getElementById("vg-vol-pct-label");
      if (volLabel) volLabel.remove();
      const volBar = document.querySelector("[data-testid='volume-bar']");
      if (volBar) { volBar.style.removeProperty("width"); volBar.style.removeProperty("min-width"); volBar.style.removeProperty("transition"); }
      const volSlider = volBar?.querySelector(".volume-bar__slider-container");
      if (volSlider) { volSlider.style.removeProperty("width"); volSlider.style.removeProperty("transition"); }

      // 4d. icons extension cleanup
      if (window.vantagraphIconsRemove) window.vantagraphIconsRemove();

      // 5. default theme + font
      applyTheme("Spotify Default"); applyFont("", "");

      // 6. re-init modern scrollbar (default ON)
      applySetting("snippet-modern-scrollbar", "true");

      Spicetify.showNotification("Settings reset ✓");
      render(c);
    };
    c.appendChild(rb);
  }

  // topbar button: right side via Spicetify.Topbar.Button (update-safe, never unmounts)
  function init() {
    const SETTINGS_ICON = '<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10180-icon" viewBox="0 0 16 16" fill="currentColor" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M8 1a.5.5 0 0 1 .5.5v1.12a5.5 5.5 0 0 1 1.725.559l.794-.793a.5.5 0 0 1 .707.707l-.794.794A5.5 5.5 0 0 1 11.49 5.6h1.01a.5.5 0 0 1 0 1H11.49a5.5 5.5 0 0 1-.558 1.725l.793.794a.5.5 0 0 1-.707.707l-.794-.793a5.5 5.5 0 0 1-1.725.558V10.6a.5.5 0 0 1-1 0V9.59a5.5 5.5 0 0 1-1.725-.558l-.794.793a.5.5 0 1 1-.707-.707l.794-.794A5.5 5.5 0 0 1 4.51 6.6H3.5a.5.5 0 0 1 0-1h1.01a5.5 5.5 0 0 1 .558-1.725l-.793-.794a.5.5 0 0 1 .707-.707l.794.794A5.5 5.5 0 0 1 7.5 2.62V1.5A.5.5 0 0 1 8 1zM8 4a2.1 2.1 0 1 0 0 4.2A2.1 2.1 0 0 0 8 4z"/></svg>';

    const settingsBtn = new Spicetify.Topbar.Button(
      "Vantagraph Settings",
      SETTINGS_ICON,
      toggle,
      false,
      true
    );
    // custom class: stable CSS targeting hook
    if (settingsBtn.element) settingsBtn.element.classList.add("vg-topbar-btn");
  }

  waitForVantagraphData(init);
})();
