// ============================================================
// Vantagraph v4 — Premium Glassmorphism Spicetify Theme
// Complete JS: themes, fonts, settings UI, wave animation,
// SVG icon replacement, gradient background
// ============================================================

(function vantagraph() {
  // ── Utility: waitForElement with retry ──
  function waitForElement(selector, callback, maxAttempts = 50, useQueryAll = false) {
    const el = useQueryAll
      ? document.querySelectorAll(selector)
      : document.querySelector(selector);
    const found = useQueryAll ? (el && el.length > 0) : !!el;
    if (found) {
      callback(el);
      return;
    }
    if (maxAttempts > 0) {
      setTimeout(() => waitForElement(selector, callback, maxAttempts - 1, useQueryAll), 200);
    }
  }

  // ── Utility: waitForSpicetify ──
  function waitForSpicetify(callback) {
    if (
      Spicetify &&
      Spicetify.Player &&
      Spicetify.Platform &&
      Spicetify.LocalStorage
    ) {
      callback();
    } else {
      setTimeout(() => waitForSpicetify(callback), 100);
    }
  }

  // ── Hex to RGB helper ──
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const n = parseInt(hex, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  }

  // ══════════════════════════════════════════════════════════
  //  THEME DEFINITIONS
  // ══════════════════════════════════════════════════════════
  // BurntSienna-inspired: neutral dark backgrounds + single accent
  // Key principle: background grays are NEUTRAL, accent is the ONLY color
  const THEMES = {
    "Vanta": {
      text: "E8E8E8", subtext: "888888", main: "0A0A0A",
      "main-elevated": "141414", "main-transition": "060606",
      highlight: "1C1C1C", "highlight-elevated": "181818",
      sidebar: "060606", player: "080808", card: "141414",
      shadow: "000000", "selected-row": "222222",
      button: "E0E0E0", "button-active": "C8C8C8",
      "button-disabled": "1C1C1C", "tab-active": "141414",
      notification: "E0E0E0", "notification-error": "FF4444",
      misc: "606060",
      accent: "E0E0E0", "accent-hover": "F0F0F0",
      "progress-fg": "E0E0E0", "progress-bg": "1C1C1C",
      gradient: ["0A0A0A", "0E0E0E", "121212", "161616"],
      glowColor: "224, 224, 224"
    },
    "Letterboxd": {
      text: "E4E8EC", subtext: "8C99A8", main: "14181C",
      "main-elevated": "1C2228", "main-transition": "101418",
      highlight: "242C34", "highlight-elevated": "202830",
      sidebar: "101418", player: "12161C", card: "1C2228",
      shadow: "080C10", "selected-row": "283038",
      button: "00D44E", "button-active": "00B844",
      "button-disabled": "242C34", "tab-active": "1C2228",
      notification: "40BCF4", "notification-error": "FF3030",
      misc: "707880",
      accent: "00D44E", "accent-hover": "20F070",
      "progress-fg": "00D44E", "progress-bg": "242C34",
      gradient: ["14181C", "181C22", "1C2228", "20262E"],
      glowColor: "0, 212, 78"
    },
    "Chocolate Truffle": {
      text: "F0E4D4", subtext: "B09878", main: "1C1614",
      "main-elevated": "26201C", "main-transition": "181210",
      highlight: "302820", "highlight-elevated": "2C241C",
      sidebar: "181210", player: "1A1412", card: "26201C",
      shadow: "0C0808", "selected-row": "342C24",
      button: "C89040", "button-active": "B08038",
      "button-disabled": "302820", "tab-active": "26201C",
      notification: "C89040", "notification-error": "C05050",
      misc: "887060",
      accent: "C89040", "accent-hover": "E0A850",
      "progress-fg": "C89040", "progress-bg": "302820",
      gradient: ["1C1614", "201A16", "26201C", "2A2420"],
      glowColor: "200, 144, 64"
    },
    "Mediterranean Olive": {
      text: "E4DED0", subtext: "A09880", main: "181C14",
      "main-elevated": "22261E", "main-transition": "141810",
      highlight: "2A3024", "highlight-elevated": "262C20",
      sidebar: "141810", player: "161A12", card: "22261E",
      shadow: "0A0C08", "selected-row": "2E3428",
      button: "7CA040", "button-active": "6A8C36",
      "button-disabled": "2A3024", "tab-active": "22261E",
      notification: "7CA040", "notification-error": "C05040",
      misc: "787060",
      accent: "7CA040", "accent-hover": "90B850",
      "progress-fg": "7CA040", "progress-bg": "2A3024",
      gradient: ["181C14", "1C2018", "22261E", "262C22"],
      glowColor: "124, 160, 64"
    },
    "R34 Midnight Purple": {
      text: "E8E4F0", subtext: "A8A0C0", main: "1A1A24",
      "main-elevated": "222230", "main-transition": "16161E",
      highlight: "2A2A3A", "highlight-elevated": "252535",
      sidebar: "16161E", player: "18181F", card: "222230",
      shadow: "0A0A10", "selected-row": "2E2E40",
      button: "9B6DFF", "button-active": "8055E0",
      "button-disabled": "2A2A3A", "tab-active": "222230",
      notification: "9B6DFF", "notification-error": "E05060",
      misc: "8880A8",
      accent: "9B6DFF", "accent-hover": "B090FF",
      "progress-fg": "9B6DFF", "progress-bg": "2A2A3A",
      gradient: ["1A1A24", "1E1E2A", "222230", "262636"],
      glowColor: "155, 109, 255"
    },
  };

  // ══════════════════════════════════════════════════════════
  //  FONT PRESETS
  // ══════════════════════════════════════════════════════════
  const FONT_PRESETS = [
    { name: "Spotify Default", family: "" },
    { name: "Inter", family: "Inter", url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
    { name: "Outfit", family: "Outfit", url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" },
    { name: "Roboto", family: "Roboto", url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" },
    { name: "Poppins", family: "Poppins", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" },
    { name: "JetBrains Mono", family: "JetBrains Mono", url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" },
    { name: "Space Grotesk", family: "Space Grotesk", url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
    { name: "Nunito", family: "Nunito", url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap" },
    { name: "Fira Code", family: "Fira Code", url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" },
    { name: "Custom (type below)", family: "__custom__" }
  ];

  // ══════════════════════════════════════════════════════════
  //  CORE: Apply Theme
  // ══════════════════════════════════════════════════════════
  function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    const root = document.documentElement;

    // Standard --spice-* variables
    const standardVars = [
      "text", "subtext", "main", "main-elevated", "main-transition",
      "highlight", "highlight-elevated", "sidebar", "player", "card",
      "shadow", "selected-row", "button", "button-active", "button-disabled",
      "tab-active", "notification", "notification-error", "misc"
    ];

    standardVars.forEach(v => {
      if (theme[v]) {
        root.style.setProperty(`--spice-${v}`, `#${theme[v]}`);
        root.style.setProperty(`--spice-rgb-${v}`, hexToRgb(theme[v]));
      }
    });

    // Custom vars
    if (theme.accent) root.style.setProperty("--spice-accent", `#${theme.accent}`);
    if (theme["progress-fg"]) root.style.setProperty("--spice-progress-fg", `#${theme["progress-fg"]}`);
    if (theme["progress-bg"]) root.style.setProperty("--spice-progress-bg", `#${theme["progress-bg"]}`);
    if (theme["progress-fg"]) root.style.setProperty("--spice-rgb-progress-fg", hexToRgb(theme["progress-fg"]));
    if (theme["progress-bg"]) root.style.setProperty("--spice-rgb-progress-bg", hexToRgb(theme["progress-bg"]));

    // Gradient background on .Root__top-container
    if (theme.gradient) {
      const [g1, g2, g3, g4] = theme.gradient;
      root.style.setProperty("--spice-gradient",
        `linear-gradient(135deg, #${g1} 0%, #${g2} 30%, #${g3} 60%, #${g4} 100%)`
      );
      // Apply gradient directly (no noise)
      waitForElement(".Root__top-container", (el) => {
        el.style.background = `linear-gradient(135deg, #${g1} 0%, #${g2} 30%, #${g3} 60%, #${g4} 100%)`;
      });
    }

    // Glow colors
    if (theme.glowColor) {
      root.style.setProperty("--vg-glow", `rgba(${theme.glowColor}, 0.15)`);
      root.style.setProperty("--vg-glow-strong", `rgba(${theme.glowColor}, 0.3)`);
    }

    // Save current theme
    Spicetify.LocalStorage.set("vantagraph:theme", themeName);

    // Update settings UI active state
    document.querySelectorAll(".vg-theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === themeName);
    });

    // Inject dynamic icon colors
    injectIconColors(theme);

    console.log(`[Vantagraph] Theme applied: ${themeName}`);
  }

  // ══════════════════════════════════════════════════════════
  //  CORE: Apply Font
  // ══════════════════════════════════════════════════════════
  function applyFont(fontFamily, fontUrl) {
    const styleId = "vantagraph-font";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Load Google Font if URL provided
    if (fontUrl) {
      const linkId = "vantagraph-font-link";
      let linkEl = document.getElementById(linkId);
      if (!linkEl) {
        linkEl = document.createElement("link");
        linkEl.id = linkId;
        linkEl.rel = "stylesheet";
        document.head.appendChild(linkEl);
      }
      linkEl.href = fontUrl;
    }

    if (!fontFamily || fontFamily === "" || fontFamily === "Spotify Default") {
      styleEl.textContent = "";
      Spicetify.LocalStorage.set("vantagraph:font", "");
      Spicetify.LocalStorage.set("vantagraph:font-url", "");
      return;
    }

    // Universal font application with aggressive selectors
    styleEl.textContent = `
      *,
      *::before,
      *::after,
      body,
      button,
      input,
      select,
      textarea,
      .main-type-bass,
      .main-type-alto,
      .main-type-canon,
      .main-type-mesto,
      .main-type-ballad,
      .main-type-viola,
      .main-type-cello,
      .main-type-finale,
      .main-type-minuet,
      .main-trackList-rowTitle,
      .main-trackInfo-name,
      .main-trackInfo-artists,
      .main-entityHeader-title,
      .main-entityHeader-subtitle,
      .main-cardHeader-text,
      .main-contextMenu-menuItemButton,
      .main-shelf-title,
      .main-navBar-navBarLink span,
      .main-rootlist-textWrapper span,
      .main-yourLibraryX-navLink,
      .main-yourLibraryX-listItemTitle,
      .main-yourLibraryX-listItemSubtitle,
      .lyrics-lyricsContent-lyric,
      .queue-tabBar-header span,
      .main-nowPlayingWidget-nowPlaying *,
      .main-playbackBarRemainingTime-container,
      .playback-bar > div,
      .encore-text,
      [class*="Type__TypeElement"],
      [class*="encore-"],
      [data-encore-id] {
        font-family: "${fontFamily}", -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
      }
    `;

    Spicetify.LocalStorage.set("vantagraph:font", fontFamily);
    Spicetify.LocalStorage.set("vantagraph:font-url", fontUrl || "");
    console.log(`[Vantagraph] Font applied: ${fontFamily}`);
  }

  // ══════════════════════════════════════════════════════════
  //  SVG ICON COLORS (Dynamic CSS injection)
  // ══════════════════════════════════════════════════════════
  function injectIconColors(theme) {
    const styleId = "vantagraph-icon-colors";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    const accent = `#${theme.accent || theme.button}`;
    const text = `#${theme.text}`;
    const subtext = `#${theme.subtext}`;

    styleEl.textContent = `
      /* Player control icons */
      .player-controls__buttons button svg,
      .player-controls__buttons button path {
        fill: ${text} !important;
        color: ${text} !important;
      }

      /* Active state (shuffle/repeat when on) */
      .player-controls__buttons button[aria-checked="true"] svg,
      .player-controls__buttons button[aria-checked="true"] path,
      .main-shuffleButton-button[aria-checked="true"] svg,
      .main-repeatButton-button[aria-checked="true"] svg {
        fill: ${accent} !important;
        color: ${accent} !important;
      }

      /* Play/Pause button */
      .player-controls__buttons button[data-testid="control-button-playpause"] svg {
        fill: ${accent} !important;
        color: ${accent} !important;
      }

      /* Sidebar nav icons */
      .main-globalNav-navLink svg,
      .main-yourLibraryX-iconContainer svg {
        fill: ${subtext} !important;
        color: ${subtext} !important;
      }

      .main-globalNav-navLink:hover svg,
      .main-yourLibraryX-iconContainer:hover svg {
        fill: ${text} !important;
        color: ${text} !important;
      }

      /* Extra controls (right side of player bar) */
      .main-nowPlayingBar-extraControls button svg {
        fill: ${subtext} !important;
        color: ${subtext} !important;
      }

      .main-nowPlayingBar-extraControls button:hover svg {
        fill: ${text} !important;
        color: ${text} !important;
      }

      /* Heart/like button */
      .main-addButton-active svg,
      .control-button-heart[aria-checked="true"] svg {
        fill: ${accent} !important;
        color: ${accent} !important;
      }

      /* Top bar buttons */
      .main-topBar-topbarContentRight button svg {
        fill: ${subtext} !important;
        color: ${subtext} !important;
      }

      .main-topBar-topbarContentRight button:hover svg {
        fill: ${text} !important;
        color: ${text} !important;
      }
    `;
  }

  // ══════════════════════════════════════════════════════════
  //  CUSTOM ICON REPLACEMENT (CSS mask-image)
  //  Uses user's custom SVGs as data URIs
  // ══════════════════════════════════════════════════════════
  function replaceIcons() {
    const styleId = "vantagraph-custom-icons";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Custom SVG data URIs (derived from user's icons/ folder)
    // Using simplified SVG paths for performance
    const icons = {
      // Play icon (triangle)
      play: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M221 93c33.6-15.2 71.8-9.1 104 9 45.8 25.6 91.2 51.5 136 78 21.6 12.8 21.6 12.8 21.6 12.8 18.5 60.6 14.3 85-12.3 113.8-6.4 7.5-13 13.6-20 19-45.5 33.8-91 66.8-137 99.2-42.4 27.5-85.6 52.8-130.3 75.4-12-3.2-24-8-35.5-14.2C105 461 91.5 444 84.3 421.2 73.4 381.2 76 337 76 295.8c0-8.3 0-16.5.1-24.8.1-105.4.1-105.4 12.5-131.7 8.4-12.6 13.6-19.2 19-25 39.5-37.3 79.4-30.5 113.4-21.3z' fill='%23fff'/%3E%3C/svg%3E")`,
      // Pause icon (two bars)
      pause: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect x='136' y='70' width='88' height='372' rx='44' fill='%23fff'/%3E%3Crect x='288' y='70' width='88' height='372' rx='44' fill='%23fff'/%3E%3C/svg%3E")`,
      // Shuffle icon
      shuffle: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M411 65c-4-1-10-2-15-1-8 3-11 7-16 12-18 19-36 38-54 56-3 3-5 6-5 10 0 4 2 7 5 11 6 7 16 7 23 3 4-3 9-7 13-13 16-17 33-34 50-50 11-11 20-20 24-28z M55 128c-5-2-10-2-15 0-8 4-12 12-12 21 0 5 2 9 5 13l42 1c23 0 45-1 49-2 14-2 23-7 31-17 8-9 18-26 60-95 46-75 55-90 64-102 19-26 43-38 79-41 5 0 11-1 12-2 2-1 2-3 2-14 0-11-1-13-3-16-4-6-11-8-17-11-8-3-15-2-25-1-35 3-57-15-77 43-10 14-22 33-23 37-3 9 3 20 11 24 8 3 18-2 23-3z M213 264c-5-2-8-6-17-20-19-31-28-38-48-41-4-1-26-1-49-2l-42-1c-2 1-4 4-6 6-2 4-3 5-3 12s1 8 3 12c2 2 4 5 6 6l39-1c54 0 69 1 86 9 19 9 31 22 51 53 9 14 10 17 10 23 0 12-10 21-21 21-3 0-7-1-8-1z' fill='%23fff' transform='translate(51,150) scale(1.0)'/%3E%3C/svg%3E")`,
      // Repeat icon
      repeat: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M342 56c-4-2-9-6-11-10-2-4-2-6-3-17l0-13-66 0c-70 0-84-1-101-4-57-12-105-51-127-104-9-22-12-39-12-64 0-33 9-63 27-91 7-11 12-15 21-15 9 0 15 4 19 12 2 3 2 5 2 11 0 6-1 7-6 15-24 37-28 83-9 122 18 38 51 64 94 73 7 1 20 2 110 2l102 1 6 2c6 3 10 6 14 12 2 4 3 5 3 12 0 13-2 15-23 37-12 11-20 19-23 20-4 2-10 2-16 1z M437 100c-11-4-17-11-16-22 0-6 1-7 6-15 33-50 27-113-14-155-19-20-41-32-69-39-9-2-12-2-112-3l-106-1-6-2c-9-3-15-9-18-16-2-6-2-15 2-22 3-7 38-42 45-44 10-4 21 0 27 10 2 4 3 6 3 18l0 13 66 0c36 0 72 1 78 1 81 6 146 64 159 142 3 16 3 40 0 57-4 22-13 45-25 63-4 7-7 10-10 12-5 3-12 4-16 3z' fill='%23fff' transform='translate(60,280) scale(1.0)'/%3E%3C/svg%3E")`,
      // Next track
      next: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M278 106c34-24 72-18 104 0 36 20 72 41 107 62 14 8 21 13 27 18 26 58 22 85-5 120-3 3-6 6-10 9-46 34-92 67-138 99-43 27-86 53-130 75-12-3-24-8-36-14-21-12-34-28-41-50-12-40-9-84-9-125 0-80 0-109.4 12.5-131.7 8.4-12.6 22-25 50-40 29-14 50-16 69-23z' fill='%23fff'/%3E%3Crect x='100' y='88' width='45' height='340' rx='22' fill='%23fff' transform='translate(310,-1)'/%3E%3C/svg%3E")`,
      // Previous track
      prev: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M325 105c-22-19-51-22-76-8-36 21-72 42-108 63-36 22-72 44-107 67-7 6-14 12-20 19-15 27-16 60-5 89 8 21 22 38 40 50 46 28 92 56 139 83l15 9c37 23 84 26 114 0 25-23 25-43 25-83l0-30c0-66 2-132 0-198-1-22-4-39-17-61z' fill='%23fff'/%3E%3Crect x='102' y='87' width='45' height='340' rx='22' fill='%23fff'/%3E%3C/svg%3E")`,
      // Home icon
      home: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M335 77c-3 3-6 5-10 8-10 8-19 16-28 24-4 3-8 7-12 10-4 4-9 7-13 11-5 4-9 8-14 11-5 4-9 8-14 12-6 5-11 10-17 14-5 5-11 9-16 14-5 4-10 9-15 13-4 3-8 7-13 10-12 9-22 18-27 30-3 15-3 25-3 47 0 17 0 35 0 52 0 18 0 35 0 53 0 17 0 35 0 52 0 6 0 11 0 17 4 21 10 34 28 46 17 11 34 11 56 10 9 0 17-1 26-1 16-1 32-1 48-2 9-5 14-10 17-19 0-17 0-35 0-52 0-18 0-35 0-53 0-4 0-7 0-11 5-14 13-22 27-28 18-6 36-2 51 8 10 10 12 18 12 33 0 17 0 35 0 52 0 18 0 35 0 53l0 4c3 16 9 28 22 38 12 10 28 13 43 13 27 0 48-9 66-29 13-16 15-31 13-51 0-17 0-35 0-52 0-18 0-35 0-53 0-17 0-35 0-52 0-10 0-20 0-30-4-17-14-31-28-42-10-8-20-16-30-24-4-3-7-6-11-9-4-3-8-7-12-10-5-4-9-8-14-11-5-4-10-8-15-12-5-4-10-9-15-13-5-4-10-8-15-12-5-4-10-9-15-13-3-2-6-5-9-7-37-30-83-39-130-24-12 3-23 9-33 17z' fill='%23fff' transform='translate(0,0)'/%3E%3C/svg%3E")`,
      // Search icon
      search: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Ccircle cx='220' cy='220' r='150' fill='none' stroke='%23fff' stroke-width='50'/%3E%3Cline x1='330' y1='330' x2='460' y2='460' stroke='%23fff' stroke-width='50' stroke-linecap='round'/%3E%3C/svg%3E")`,
    };

    styleEl.textContent = `
      /* ── Player Controls Icon Replacement ── */
      /* Play button */
      button[data-testid="control-button-playpause"] svg,
      button[aria-label*="Play"] svg,
      button[aria-label*="Oynat"] svg {
        -webkit-mask-image: ${icons.play};
        mask-image: ${icons.play};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[data-testid="control-button-playpause"] svg path,
      button[aria-label*="Play"] svg path,
      button[aria-label*="Oynat"] svg path {
        fill: transparent !important;
      }

      /* Pause button (when playing) */
      button[aria-label*="Pause"] svg,
      button[aria-label*="Duraklat"] svg {
        -webkit-mask-image: ${icons.pause};
        mask-image: ${icons.pause};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[aria-label*="Pause"] svg path,
      button[aria-label*="Duraklat"] svg path {
        fill: transparent !important;
      }

      /* Shuffle */
      button[data-testid="control-button-shuffle"] svg,
      button[aria-label*="shuffle"] svg,
      button[aria-label*="Karıştır"] svg {
        -webkit-mask-image: ${icons.shuffle};
        mask-image: ${icons.shuffle};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[data-testid="control-button-shuffle"] svg path,
      button[aria-label*="shuffle"] svg path,
      button[aria-label*="Karıştır"] svg path {
        fill: transparent !important;
      }

      /* Repeat */
      button[data-testid="control-button-repeat"] svg,
      button[aria-label*="repeat"] svg,
      button[aria-label*="Tekrarla"] svg {
        -webkit-mask-image: ${icons.repeat};
        mask-image: ${icons.repeat};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[data-testid="control-button-repeat"] svg path,
      button[aria-label*="repeat"] svg path,
      button[aria-label*="Tekrarla"] svg path {
        fill: transparent !important;
      }

      /* Next track */
      button[data-testid="control-button-skip-forward"] svg,
      button[aria-label*="Next"] svg,
      button[aria-label*="Sonraki"] svg {
        -webkit-mask-image: ${icons.next};
        mask-image: ${icons.next};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[data-testid="control-button-skip-forward"] svg path,
      button[aria-label*="Next"] svg path,
      button[aria-label*="Sonraki"] svg path {
        fill: transparent !important;
      }

      /* Previous track */
      button[data-testid="control-button-skip-back"] svg,
      button[aria-label*="Previous"] svg,
      button[aria-label*="Önceki"] svg {
        -webkit-mask-image: ${icons.prev};
        mask-image: ${icons.prev};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      button[data-testid="control-button-skip-back"] svg path,
      button[aria-label*="Previous"] svg path,
      button[aria-label*="Önceki"] svg path {
        fill: transparent !important;
      }

      /* Home nav icon */
      a[href="/"] svg,
      [data-testid="home-button"] svg {
        -webkit-mask-image: ${icons.home};
        mask-image: ${icons.home};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      a[href="/"] svg path,
      [data-testid="home-button"] svg path {
        fill: transparent !important;
      }

      /* Search nav icon */
      a[href="/search"] svg,
      [data-testid="search-button"] svg {
        -webkit-mask-image: ${icons.search};
        mask-image: ${icons.search};
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        background: currentColor !important;
      }
      a[href="/search"] svg path,
      a[href="/search"] svg circle,
      a[href="/search"] svg line,
      [data-testid="search-button"] svg path {
        fill: transparent !important;
        stroke: transparent !important;
      }
    `;

    console.log("[Vantagraph] Custom icons applied");
  }

  // ══════════════════════════════════════════════════════════
  //  WAVE ANIMATION — global state, setInterval, 3-tier
  // ══════════════════════════════════════════════════════════
  let waveTimers = [];
  let waveFadeTimer = null;
  let waveAmplitude = 1;
  let waveEl = null;
  let waveBars = [];
  let waveListenersRegistered = false;

  function waveRandomizeBar(index) {
    const maxH = 85 * waveAmplitude;
    const minH = 8;
    if (maxH <= minH || !waveBars[index]) { if (waveBars[index]) waveBars[index].style.height = "2px"; return; }
    let h, attempts = 0;
    do {
      h = minH + Math.random() * (maxH - minH);
      attempts++;
    } while (
      attempts < 10 &&
      ((index > 0 && Math.abs(h - parseFloat(waveBars[index - 1]?.style.height || 0)) < 6) ||
       (index < waveBars.length - 1 && Math.abs(h - parseFloat(waveBars[index + 1]?.style.height || 0)) < 6))
    );
    waveBars[index].style.height = h + "%";
  }

  function waveStart() {
    waveStop();
    waveBars.forEach((_, i) => {
      const r = Math.random();
      let interval;
      if (r < 0.2) interval = 30 + Math.random() * 20;        // attacks (20%)
      else if (r < 0.75) interval = 450 + Math.random() * 150; // hits (55%)
      else interval = 700 + Math.random() * 300;                // slow (25%) — 700-1000ms

      waveRandomizeBar(i);
      const id = setInterval(() => waveRandomizeBar(i), interval);
      waveTimers.push(id);
    });
  }

  function waveStop() {
    waveTimers.forEach(id => clearInterval(id));
    waveTimers = [];
  }

  // Instant start at full power
  function waveInstantStart() {
    if (!waveEl) return;
    waveEl.style.opacity = "1";
    waveAmplitude = 1;
    waveStart();
  }

  // Instant stop — freeze bars
  function waveInstantStop() {
    waveStop();
    if (waveFadeTimer) { clearInterval(waveFadeTimer); waveFadeTimer = null; }
    waveBars.forEach(bar => { bar.style.height = "2px"; });
    if (waveEl) waveEl.style.opacity = "0.1";
  }

  // Gradual fade-in over 3s (for new track start)
  function waveFadeIn() {
    if (waveFadeTimer) clearInterval(waveFadeTimer);
    if (!waveEl) return;
    waveEl.style.opacity = "1";
    waveAmplitude = 0.05;
    waveStart();
    // 30 steps × 100ms = 3 seconds to full amplitude
    waveFadeTimer = setInterval(() => {
      waveAmplitude = Math.min(1, waveAmplitude + (1 / 30));
      if (waveAmplitude >= 1) { clearInterval(waveFadeTimer); waveFadeTimer = null; }
    }, 100);
  }

  // Gradual fade-out (for track ending)
  function waveFadeOut() {
    if (waveFadeTimer) clearInterval(waveFadeTimer);
    // 20 steps × 100ms = 2 seconds
    waveFadeTimer = setInterval(() => {
      waveAmplitude = Math.max(0, waveAmplitude - 0.05);
      if (waveAmplitude <= 0) {
        clearInterval(waveFadeTimer); waveFadeTimer = null;
        if (waveEl) waveEl.style.opacity = "0.1";
        waveBars.forEach(bar => { bar.style.height = "2px"; });
        waveStop();
      }
    }, 100);
  }

  // Track progress polling for fade-out at ~98%
  let waveProgressPoller = null;
  let waveFadingOut = false;

  function waveStartProgressPoll() {
    if (waveProgressPoller) clearInterval(waveProgressPoller);
    waveFadingOut = false;
    waveProgressPoller = setInterval(() => {
      try {
        if (!Spicetify.Player.isPlaying()) return;
        const progress = Spicetify.Player.getProgress();
        const duration = Spicetify.Player.getDuration();
        if (!duration || duration <= 0) return;
        const pct = progress / duration;
        if (pct >= 0.97 && !waveFadingOut) {
          waveFadingOut = true;
          waveFadeOut();
        }
      } catch (e) { /* ignore */ }
    }, 500);
  }

  function waveStopProgressPoll() {
    if (waveProgressPoller) { clearInterval(waveProgressPoller); waveProgressPoller = null; }
  }

  // Track which songs already played (for fade-in only on first play)
  const playedTracks = new Set();

  function waveOnPlayPause() {
    if (Spicetify.Player.isPlaying()) {
      // Instant resume
      waveInstantStart();
      waveStartProgressPoll();
    } else {
      // Instant stop
      waveInstantStop();
      waveStopProgressPoll();
    }
  }

  function waveOnSongChange() {
    waveStop();
    waveStopProgressPoll();
    if (waveFadeTimer) { clearInterval(waveFadeTimer); waveFadeTimer = null; }
    waveFadingOut = false;
    waveAmplitude = 0;
    waveBars.forEach(bar => { bar.style.height = "2px"; });
    if (waveEl) waveEl.style.opacity = "0";

    // Get current track URI to check if first play
    let trackUri = "";
    try { trackUri = Spicetify.Player.data?.item?.uri || ""; } catch (e) {}

    setTimeout(() => {
      if (!Spicetify.Player.isPlaying()) return;

      if (trackUri && !playedTracks.has(trackUri)) {
        // First time this track plays → fade-in over 3s
        playedTracks.add(trackUri);
        waveFadeIn();
      } else {
        // Already played before → instant start
        waveInstantStart();
      }
      waveStartProgressPoll();
    }, 300);
  }

  function injectWaveAnimation() {
    waitForElement(".playback-bar", (playbackBar) => {
      // Remove old wave if it exists (re-injection after Spotify re-render)
      const existing = playbackBar.querySelector(".vg-wave-container");
      if (existing) existing.remove();

      // Clear old timers
      waveStop();
      if (waveFadeTimer) { clearInterval(waveFadeTimer); waveFadeTimer = null; }

      const BARS = 13;
      waveEl = document.createElement("div");
      waveEl.className = "vg-wave-container";

      waveBars = [];
      for (let i = 0; i < BARS; i++) {
        const bar = document.createElement("div");
        bar.className = "vg-wave-bar";
        bar.style.height = "2px";
        waveEl.appendChild(bar);
        waveBars.push(bar);
      }
      playbackBar.insertBefore(waveEl, playbackBar.firstChild);

      // Start immediately if playing
      if (Spicetify.Player.isPlaying()) {
        waveAmplitude = 1;
        waveEl.style.opacity = "1";
        waveStart();
        waveStartProgressPoll();
      } else {
        waveEl.style.opacity = "0.1";
      }

      // Register listeners ONCE globally
      if (!waveListenersRegistered) {
        Spicetify.Player.addEventListener("onplaypause", waveOnPlayPause);
        Spicetify.Player.addEventListener("songchange", waveOnSongChange);
        waveListenersRegistered = true;
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  //  SETTINGS: Apply helpers
  // ══════════════════════════════════════════════════════════
  function applySetting(key, value) {
    const root = document.documentElement;
    Spicetify.LocalStorage.set(`vantagraph:${key}`, String(value));

    switch (key) {
      case "font-size": {
        const styleId = "vantagraph-fontsize";
        let el = document.getElementById(styleId);
        if (!el) { el = document.createElement("style"); el.id = styleId; document.head.appendChild(el); }
        el.textContent = `*, *::before, *::after { font-size: ${value}px !important; }
          h1, .main-type-canon { font-size: ${value * 2}px !important; }
          h2, .main-type-alto { font-size: ${value * 1.5}px !important; }
          h3, .main-type-bass { font-size: ${value * 1.2}px !important; }
          .main-trackList-rowTitle { font-size: ${value}px !important; }
          .playback-bar > div:not(.playback-progressbar-container) { font-size: ${Math.max(value - 3, 9)}px !important; }`;
        break;
      }
      case "icon-size": {
        const styleId = "vantagraph-iconsize";
        let el = document.getElementById(styleId);
        if (!el) { el = document.createElement("style"); el.id = styleId; document.head.appendChild(el); }
        el.textContent = `.player-controls__buttons button svg { width: ${value}px !important; height: ${value}px !important; }
          .main-nowPlayingBar-extraControls button svg { width: ${value - 4}px !important; height: ${value - 4}px !important; }
          .main-globalNav-navLink svg, .main-yourLibraryX-iconContainer svg { width: ${value}px !important; height: ${value}px !important; }`;
        break;
      }
      case "density": {
        const styleId = "vantagraph-density";
        let el = document.getElementById(styleId);
        if (!el) { el = document.createElement("style"); el.id = styleId; document.head.appendChild(el); }
        const gaps = { compact: "2px", comfortable: "8px", spacious: "14px" };
        const pads = { compact: "2px 4px", comfortable: "4px 8px", spacious: "8px 16px" };
        const rowH = { compact: "32px", comfortable: "40px", spacious: "52px" };
        el.textContent = `.main-trackList-trackListRow { min-height: ${rowH[value]} !important; padding: ${pads[value]} !important; }
          .main-card-card { padding: ${pads[value]} !important; }
          .main-shelf-shelf { gap: ${gaps[value]} !important; }`;
        break;
      }
      case "border-radius": {
        root.style.setProperty("--vg-radius-sm", `${value}px`);
        root.style.setProperty("--vg-radius-md", `${Math.round(value * 1.5)}px`);
        root.style.setProperty("--vg-radius-lg", `${value * 2}px`);
        root.style.setProperty("--vg-radius-xl", `${Math.round(value * 2.5)}px`);
        root.style.setProperty("--vg-radius-2xl", `${value * 3}px`);
        break;
      }
      case "bg-blur":
        root.style.setProperty("--vg-bg-blur", `${value}px`);
        Spicetify.LocalStorage.set(`vantagraph:${key}`, value);
        break;
      case "bg-brightness":
        root.style.setProperty("--vg-bg-brightness", `${value}%`);
        Spicetify.LocalStorage.set(`vantagraph:${key}`, value);
        break;
      case "bg-contrast":
        root.style.setProperty("--vg-bg-contrast", `${value}%`);
        Spicetify.LocalStorage.set(`vantagraph:${key}`, value);
        break;
      case "bg-saturation":
        root.style.setProperty("--vg-bg-saturation", `${value}%`);
        Spicetify.LocalStorage.set(`vantagraph:${key}`, value);
        break;
      case "bg-url":
        const bgId = "vantagraph-bg-element";
        let bgEl = document.getElementById(bgId);
        if (!bgEl) {
          bgEl = document.createElement("div");
          bgEl.id = bgId;
          bgEl.style.cssText = `
            position: fixed; inset: 0; z-index: -1;
            background-size: cover; background-position: center;
            transition: all 0.5s ease;
            pointer-events: none;
          `;
          document.body.prepend(bgEl); // Use body to sit behind everything
        }
        
        if (value) {
          bgEl.style.backgroundImage = `url("${value}")`;
          // Apply filters
          const blur = getSetting("bg-blur", "0");
          const bright = getSetting("bg-brightness", "100");
          const cont = getSetting("bg-contrast", "100");
          const sat = getSetting("bg-saturation", "100");
          bgEl.style.filter = `blur(${blur}px) brightness(${bright}%) contrast(${cont}%) saturate(${sat}%)`;
          // Make default spotify bg transparent so we can see our bg
          document.documentElement.style.setProperty("--spice-main", "transparent");
        } else {
          bgEl.style.backgroundImage = "none";
          // Re-apply theme if bg is disabled
          const currentTheme = getSetting("theme", "Vanta");
          applyTheme(currentTheme);
        }
        break;
    }
  }

  function getSetting(key, fallback) {
    const v = Spicetify.LocalStorage.get(`vantagraph:${key}`);
    return (v !== null && v !== "null" && v !== "") ? v : fallback;
  }

  // ══════════════════════════════════════════════════════════
  //  SETTINGS PANEL — List-based with sliders
  // ══════════════════════════════════════════════════════════
  function createSettingsPanel() {
    const existing = document.querySelector(".vg-settings-overlay");
    if (existing) { existing.remove(); return; }

    const currentTheme = getSetting("theme", "Vanta");
    const currentFont = getSetting("font", "");

    // ── Helpers ──
    function makeSection(titleText) {
      const sec = document.createElement("div");
      sec.className = "vg-section";
      const t = document.createElement("div");
      t.className = "vg-section-title";
      t.textContent = titleText;
      sec.appendChild(t);
      return sec;
    }

    function makeSliderRow(label, min, max, step, value, unit, onChange) {
      const row = document.createElement("div");
      row.className = "vg-slider-row";

      const lbl = document.createElement("span");
      lbl.className = "vg-slider-label";
      lbl.textContent = label;

      const slider = document.createElement("input");
      slider.type = "range";
      slider.className = "vg-slider";
      slider.min = min; slider.max = max; slider.step = step; slider.value = value;

      const valSpan = document.createElement("span");
      valSpan.className = "vg-slider-value";
      valSpan.textContent = `${value}${unit}`;

      slider.addEventListener("input", () => {
        valSpan.textContent = `${slider.value}${unit}`;
        onChange(slider.value);
      });

      row.appendChild(lbl);
      row.appendChild(slider);
      row.appendChild(valSpan);
      return row;
    }

    // ── Content Wrapper ──
    const content = document.createElement("div");
    content.className = "vg-settings-content";
    content.style.padding = "10px 0";

    // ════════ SECTION: Color Theme ════════
    const themeSec = makeSection("Color Theme");
    const themeList = document.createElement("div");
    themeList.className = "vg-radio-list";

    Object.keys(THEMES).forEach(name => {
      const theme = THEMES[name];
      const item = document.createElement("div");
      item.className = "vg-radio-item" + (name === currentTheme ? " active" : "");

      const dot = document.createElement("div");
      dot.className = "vg-radio-dot";

      const content = document.createElement("div");
      content.className = "vg-radio-content";

      const label = document.createElement("div");
      label.className = "vg-radio-label";
      label.textContent = name;

      const preview = document.createElement("div");
      preview.className = "vg-radio-preview";
      preview.textContent = "Aa Sample text";
      preview.style.color = `#${theme.text}`;
      preview.style.background = `#${theme.main}`;
      preview.style.padding = "2px 6px";
      preview.style.borderRadius = "4px";
      preview.style.display = "inline-block";

      const strip = document.createElement("div");
      strip.className = "vg-color-strip";
      if (theme.gradient) {
        const [g1, g2, g3, g4] = theme.gradient;
        strip.style.background = `linear-gradient(90deg, #${g1}, #${g2}, #${g3}, #${g4})`;
      } else {
        strip.style.background = `#${theme.button}`;
      }

      content.appendChild(label);
      content.appendChild(preview);
      content.appendChild(strip);
      item.appendChild(dot);
      item.appendChild(content);

      item.addEventListener("click", () => {
        applyTheme(name);
        themeList.querySelectorAll(".vg-radio-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      });

      themeList.appendChild(item);
    });

    themeSec.appendChild(themeList);
    content.appendChild(themeSec);

    // ════════ SECTION: Typography ════════
    const typoSec = makeSection("Typography");

    // Font list
    const fontSubLabel = document.createElement("div");
    fontSubLabel.style.cssText = "font-size:11px; color:var(--spice-subtext); margin-bottom:6px; opacity:0.7;";
    fontSubLabel.textContent = "Font Family";
    typoSec.appendChild(fontSubLabel);

    const fontList = document.createElement("div");
    fontList.className = "vg-radio-list";

    FONT_PRESETS.forEach(preset => {
      if (preset.family === "__custom__") return;
      const item = document.createElement("div");
      item.className = "vg-radio-item" + (preset.family === currentFont || (!currentFont && preset.family === "") ? " active" : "");

      const dot = document.createElement("div");
      dot.className = "vg-radio-dot";

      const content = document.createElement("div");
      content.className = "vg-radio-content";

      const label = document.createElement("div");
      label.className = "vg-radio-label";
      label.textContent = preset.name;
      // Load font and render label in its own font
      if (preset.url) {
        const linkId = "vg-font-preview-" + preset.family.replace(/\s/g, "-");
        if (!document.getElementById(linkId)) {
          const link = document.createElement("link");
          link.id = linkId;
          link.rel = "stylesheet";
          link.href = preset.url;
          document.head.appendChild(link);
        }
      }
      label.style.fontFamily = preset.family || "inherit";

      content.appendChild(label);
      item.appendChild(dot);
      item.appendChild(content);

      item.addEventListener("click", () => {
        applyFont(preset.family, preset.url || "");
        fontList.querySelectorAll(".vg-radio-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        customInput.style.display = "none";
        customUrlInput.style.display = "none";
      });

      fontList.appendChild(item);
    });

    // Custom font item
    const isCustom = currentFont && !FONT_PRESETS.find(p => p.family === currentFont && p.family !== "__custom__");
    const customItem = document.createElement("div");
    customItem.className = "vg-radio-item" + (isCustom ? " active" : "");
    const customDot = document.createElement("div");
    customDot.className = "vg-radio-dot";
    const customContent = document.createElement("div");
    customContent.className = "vg-radio-content";
    const customLabel = document.createElement("div");
    customLabel.className = "vg-radio-label";
    customLabel.textContent = "Custom Font...";
    customContent.appendChild(customLabel);
    customItem.appendChild(customDot);
    customItem.appendChild(customContent);
    customItem.addEventListener("click", () => {
      fontList.querySelectorAll(".vg-radio-item").forEach(i => i.classList.remove("active"));
      customItem.classList.add("active");
      customInput.style.display = "block";
      customUrlInput.style.display = "block";
      customInput.focus();
    });
    fontList.appendChild(customItem);

    // Custom inputs
    const customInput = document.createElement("input");
    customInput.className = "vg-font-input";
    customInput.placeholder = "Font name (e.g. 'Montserrat')";
    customInput.value = getSetting("custom-font", "");
    customInput.style.display = isCustom ? "block" : "none";

    const customUrlInput = document.createElement("input");
    customUrlInput.className = "vg-font-input";
    customUrlInput.placeholder = "Google Fonts URL (optional)";
    customUrlInput.value = getSetting("custom-font-url", "");
    customUrlInput.style.display = isCustom ? "block" : "none";

    function doApplyCustom() {
      const n = customInput.value.trim();
      if (!n) return;
      Spicetify.LocalStorage.set("vantagraph:custom-font", n);
      Spicetify.LocalStorage.set("vantagraph:custom-font-url", customUrlInput.value.trim());
      // Only append :wght... if the URL doesn't already have query parameters, and we're constructing it from scratch
      let url = customUrlInput.value.trim();
      if (!url && n) {
        url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(n)}&display=swap`;
      }
      applyFont(n, url);
    }
    customInput.addEventListener("keydown", e => { if (e.key === "Enter") doApplyCustom(); });
    customInput.addEventListener("blur", doApplyCustom);
    customUrlInput.addEventListener("keydown", e => { if (e.key === "Enter") doApplyCustom(); });
    customUrlInput.addEventListener("blur", doApplyCustom);

    typoSec.appendChild(fontList);
    typoSec.appendChild(customInput);
    typoSec.appendChild(customUrlInput);

    // Delete custom font button
    const fontDeleteBtn = document.createElement("button");
    fontDeleteBtn.textContent = "Delete Custom Font";
    fontDeleteBtn.style.cssText = `
      display: ${isCustom ? "block" : "none"}; width: 100%; margin-top: 4px; padding: 6px;
      border: 1px solid #e05050; border-radius: 4px;
      background: rgba(224, 80, 80, 0.1); color: #e05050;
      cursor: pointer; font-size: 11px; transition: all 0.2s;
    `;
    fontDeleteBtn.addEventListener("mouseenter", () => {
      fontDeleteBtn.style.background = "rgba(224, 80, 80, 0.3)";
    });
    fontDeleteBtn.addEventListener("mouseleave", () => {
      fontDeleteBtn.style.background = "rgba(224, 80, 80, 0.1)";
    });
    fontDeleteBtn.addEventListener("click", () => {
      // Clear custom font settings
      Spicetify.LocalStorage.remove("vantagraph:font");
      Spicetify.LocalStorage.remove("vantagraph:font-url");
      Spicetify.LocalStorage.remove("vantagraph:custom-font");
      Spicetify.LocalStorage.remove("vantagraph:custom-font-url");
      // Reset to Spotify default
      applyFont("", "");
      // Clear inputs
      customInput.value = "";
      customUrlInput.value = "";
      customInput.style.display = "none";
      customUrlInput.style.display = "none";
      fontDeleteBtn.style.display = "none";
      // Activate Spotify Default in list
      fontList.querySelectorAll(".vg-radio-item").forEach(i => i.classList.remove("active"));
      fontList.querySelector(".vg-radio-item")?.classList.add("active");
    });
    typoSec.appendChild(fontDeleteBtn);

    // Show delete button when custom is selected
    customItem.addEventListener("click", () => {
      fontDeleteBtn.style.display = "block";
    });

    // Font Size slider
    typoSec.appendChild(makeSliderRow("Font Size", 10, 20, 1, getSetting("font-size", "14"), "px", v => applySetting("font-size", v)));
    content.appendChild(typoSec);

    // ════════ SECTION: Layout ════════
    const layoutSec = makeSection("Layout");

    // Icon Size
    layoutSec.appendChild(makeSliderRow("Icon Size", 14, 32, 1, getSetting("icon-size", "20"), "px", v => applySetting("icon-size", v)));

    // Density
    const densityLabel = document.createElement("div");
    densityLabel.style.cssText = "font-size:11px; color:var(--spice-subtext); margin: 8px 0 6px; opacity:0.7;";
    densityLabel.textContent = "Density";
    layoutSec.appendChild(densityLabel);

    const densityRow = document.createElement("div");
    densityRow.className = "vg-density-row";
    const currentDensity = getSetting("density", "comfortable");
    ["compact", "comfortable", "spacious"].forEach(d => {
      const btn = document.createElement("button");
      btn.className = "vg-density-btn" + (d === currentDensity ? " active" : "");
      btn.textContent = d.charAt(0).toUpperCase() + d.slice(1);
      btn.addEventListener("click", () => {
        applySetting("density", d);
        densityRow.querySelectorAll(".vg-density-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
      densityRow.appendChild(btn);
    });
    layoutSec.appendChild(densityRow);

    // Border Radius
    layoutSec.appendChild(makeSliderRow("Corners", 0, 20, 1, getSetting("border-radius", "8"), "px", v => applySetting("border-radius", v)));

    content.appendChild(layoutSec);

    // ════════ SECTION: Background (Hazy Style) ════════
    const bgSec = makeSection("Background");

    // Background Image URL
    const bgUrlInput = document.createElement("input");
    bgUrlInput.className = "vg-font-input";
    bgUrlInput.placeholder = "Background Image URL (leave empty for solid color)";
    bgUrlInput.value = getSetting("bg-url", "");
    bgUrlInput.style.cssText = "width: 100%; padding: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: var(--spice-text); margin-bottom: 12px;";
    
    function updateBg() {
      const url = bgUrlInput.value.trim();
      Spicetify.LocalStorage.set("vantagraph:bg-url", url);
      applySetting("bg-url", url);
    }
    bgUrlInput.addEventListener("keydown", e => { if (e.key === "Enter") updateBg(); });
    bgUrlInput.addEventListener("blur", updateBg);
    bgSec.appendChild(bgUrlInput);

    // Blur
    bgSec.appendChild(makeSliderRow("Blur", 0, 50, 1, getSetting("bg-blur", "0"), "px", v => applySetting("bg-blur", v)));
    // Brightness
    bgSec.appendChild(makeSliderRow("Brightness", 0, 200, 5, getSetting("bg-brightness", "100"), "%", v => applySetting("bg-brightness", v)));
    // Contrast
    bgSec.appendChild(makeSliderRow("Contrast", 0, 200, 5, getSetting("bg-contrast", "100"), "%", v => applySetting("bg-contrast", v)));
    // Saturation
    bgSec.appendChild(makeSliderRow("Saturation", 0, 200, 5, getSetting("bg-saturation", "100"), "%", v => applySetting("bg-saturation", v)));

    content.appendChild(bgSec);

    // ── Credits ──
    const credits = document.createElement("div");
    credits.style.cssText = "text-align:center; font-size:10px; color:var(--spice-subtext); opacity:0.4; margin-top:20px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.06);";
    credits.textContent = "Vantagraph v5.2";
    content.appendChild(credits);

    // Display native modal
    Spicetify.PopupModal.display({
      title: "Vantagraph Settings",
      content: content,
      isLarge: true
    });
  }

  // ══════════════════════════════════════════════════════════
  //  TOPBAR SETTINGS BUTTON
  // ══════════════════════════════════════════════════════════
  function addTopbarButton() {
    // Check if Spicetify Topbar API is available
    if (Spicetify.Topbar && Spicetify.Topbar.Button) {
      // Use native 'edit' icon like Hazy does
      new Spicetify.Topbar.Button(
        "Vantagraph Settings",
        "edit",
        createSettingsPanel
      );
      console.log("[Vantagraph] Topbar button added via API");
    } else {
      console.warn("[Vantagraph] Topbar API not found. Settings panel will not be accessible from topbar.");
    }
  }

  // ══════════════════════════════════════════════════════════
  //  VINYL SPIN ON COVER ART
  // ══════════════════════════════════════════════════════════
  function setupVinylSpin() {
    function updateSpin() {
      waitForElement(".main-nowPlayingWidget-coverArt img, .main-coverSlotCollapsed-container img", (img) => {
        const isPlaying = Spicetify.Player.isPlaying();
        if (isPlaying) {
          img.style.animation = "vg-vinyl-spin 8s linear infinite";
          img.style.borderRadius = "50%";
        } else {
          img.style.animationPlayState = "paused";
        }
      });
    }

    Spicetify.Player.addEventListener("onplaypause", updateSpin);
    Spicetify.Player.addEventListener("songchange", () => {
      setTimeout(updateSpin, 300);
    });
    updateSpin();
  }

  // ══════════════════════════════════════════════════════════
  //  INITIALIZATION
  // ══════════════════════════════════════════════════════════
  function init() {
    console.log("[Vantagraph] Initializing v4...");

    // 1. Apply saved theme
    const savedTheme = Spicetify.LocalStorage.get("vantagraph:theme") || "Vanta";
    applyTheme(savedTheme);

    // 2. Apply saved font
    const savedFont = Spicetify.LocalStorage.get("vantagraph:font");
    const savedFontUrl = Spicetify.LocalStorage.get("vantagraph:font-url");
    const savedCustomFont = Spicetify.LocalStorage.get("vantagraph:custom-font");
    const savedCustomFontUrl = Spicetify.LocalStorage.get("vantagraph:custom-font-url");

    if (savedFont && savedFont !== "null") {
      const preset = FONT_PRESETS.find(p => p.family === savedFont);
      if (preset && preset.url) {
        applyFont(preset.family, preset.url);
      } else if (savedFont === savedCustomFont) {
        applyFont(savedFont, savedCustomFontUrl || "");
      } else {
        applyFont(savedFont, savedFontUrl || "");
      }
    }

    // 3. Restore saved settings
    const savedFontSize = getSetting("font-size", "");
    if (savedFontSize) applySetting("font-size", savedFontSize);
    const savedIconSize = getSetting("icon-size", "");
    if (savedIconSize) applySetting("icon-size", savedIconSize);
    const savedDensity = getSetting("density", "");
    if (savedDensity) applySetting("density", savedDensity);
    const savedRadius = getSetting("border-radius", "");
    if (savedRadius) applySetting("border-radius", savedRadius);
    
    // Background settings
    const savedBgUrl = getSetting("bg-url", "");
    if (savedBgUrl) {
      applySetting("bg-url", savedBgUrl);
      // Wait a moment for dynamic style injection of --spice-main to override applyTheme
      setTimeout(() => applySetting("bg-url", savedBgUrl), 500);
    }

    // 4. Add topbar settings button
    addTopbarButton();

    // 5. Custom icons disabled for now
    // replaceIcons();

    // 6. Inject wave animation
    injectWaveAnimation();

    // 7. Setup vinyl spin
    setupVinylSpin();

    // 8. Re-inject on navigation (Spotify re-renders)
    if (Spicetify.Platform && Spicetify.Platform.History) {
      Spicetify.Platform.History.listen(() => {
        setTimeout(() => {
          injectWaveAnimation();
        }, 500);
      });
    }

    // 7. Re-inject on song change
    Spicetify.Player.addEventListener("songchange", () => {
      setTimeout(injectWaveAnimation, 300);
    });

    console.log("[Vantagraph] v4 initialized successfully!");
  }

  // Start!
  waitForSpicetify(init);
})();
