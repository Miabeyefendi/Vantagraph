// Vantagraph v5 - Core Engine

(function vantagraph() {
  // waitForElement: poll until match or max retries
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

  // waitForSpicetify: wait until core APIs ready
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

  // getSetting: localStorage w/ fallback
  function getSetting(key, fallback) {
    const v = Spicetify.LocalStorage.get(`vantagraph:${key}`);
    return (v !== null && v !== "null" && v !== "") ? v : fallback;
  }


  // CLASS MAP
  const VG_CLASS_MAP = [
    // topbar
    { className: "vg-root", selectors: [".Root__top-container", "[data-testid='top-container']", "[data-testid='root']"] },

    { className: "vg-global-nav", selectors: [".Root__globalNav"] },
    { className: "vg-top-bar", selectors: [".Root__top-bar"] },
    { className: "vg-topbar", selectors: [".main-topBar-container", "[data-testid='topbar']", "header[role='banner']"] },
    { className: "vg-topbar-bg", selectors: [".main-topBar-background", "[data-testid='topbar-background']"] },
    { className: "vg-topbar-overlay", selectors: [".main-topBar-overlay", "[data-testid='topbar-overlay']"] },
    { className: "vg-topbar-right", selectors: [".main-topBar-topbarContentRight", "[data-testid='topbar-right']"] },
    { className: "vg-global-nav-link", selectors: [".main-globalNav-navLink"] },
    { className: "vg-actionbar-bg", selectors: [".main-actionBarBackground-background", ".x-actionBarBackground-background"] },
    { className: "vg-home-header", selectors: [".main-home-homeHeader", "[data-testid='home-header']"] },
    { className: "vg-entity-header-overlay", selectors: [".main-entityHeader-overlay", ".x-entityHeader-overlay"] },
    { className: "vg-home-filter-chips", selectors: [".main-home-filterChipsSection", "[data-testid='home-filter-chips']"] },
    { className: "vg-user-widget", selectors: [".main-userWidget-box"] },
    { className: "vg-search-category", selectors: [".search-searchCategory-SearchCategory", ".search-searchCategory-contentArea"] },
    { className: "vg-search-input", selectors: [".x-searchInput-searchInputInput"] },

    // sidebar
    { className: "vg-nav", selectors: [".Root__nav-bar", "[data-testid='left-sidebar']", "nav[aria-label='Main']"] },
    { className: "vg-left-sidebar-id", selectors: ["#Desktop_LeftSidebar_Id"] },
    { className: "vg-nav-bar", selectors: [".main-navBar-navBar"] },
    { className: "vg-library-rootlist", selectors: [".main-yourLibraryX-libraryRootlist"] },
    { className: "vg-rootlist-wrapper", selectors: [".main-rootlist-wrapper"] },
    { className: "vg-library-entrypoints", selectors: [".main-yourLibraryX-entryPoints"] },
    { className: "vg-library-nav-link", selectors: [".main-yourLibraryX-navLink"] },
    { className: "vg-library-icon", selectors: [".main-yourLibraryX-iconContainer"] },
    { className: "vg-your-library", selectors: [".YourLibraryX", ".main-yourLibraryX-library"] },
    { className: "vg-your-library-filter", selectors: [".main-yourLibraryX-filterArea"] },
    { className: "vg-your-library-header", selectors: [".main-yourLibraryX-header", ".main-yourLibraryX-headerContent"] },
    { className: "vg-your-library-container", selectors: [".main-yourLibraryX-libraryContainer"] },
    { className: "vg-your-library-nav-items", selectors: [".main-yourLibraryX-navItems"] },
    { className: "vg-rootlist-divider", selectors: [".main-rootlist-rootlistDivider", ".main-rootlist-rootlistDividerContainer"] },

    // main
    { className: "vg-main", selectors: [".Root__main-view", "[data-testid='main-view']", "main[role='main']"] },
    { className: "vg-main-view-container", selectors: [".main-view-container", "[data-testid='main-view-container']"] },
    { className: "vg-main-view-scroll", selectors: [".main-view-container__scroll-node-child"] },
    { className: "vg-main-view-overlay", selectors: [".Root__main-view-overlay"] },
    { className: "vg-content-spacing", selectors: [".contentSpacing"] },
    { className: "vg-shelf", selectors: [".main-shelf-shelf"] },
    { className: "vg-card", selectors: [".main-card-card", "[data-testid='card']"] },
    // Spotify 1.3 big cards (More like ..., Made for you): the box whose footer holds the play button
    { className: "vg-big-card", selectors: ["[data-encore-id='box']:has(> footer .main-playButton-PlayButton)"] },
    { className: "vg-card-image-wrap", selectors: [".main-cardImage-imageWrapper", "[data-testid='card-image']"] },
    { className: "vg-card-play", selectors: [".main-card-PlayButtonContainer"] },
    { className: "vg-card-image", selectors: [".main-cardImage-image"] },
    { className: "vg-card-image-circular", selectors: [".main-cardImage-circular"] },
    { className: "vg-track-row", selectors: [".main-trackList-trackListRow", "[data-testid='tracklist-row']"] },
    { className: "vg-track-row-title", selectors: [".main-trackList-rowTitle"] },
    { className: "vg-track-row-image", selectors: [".main-trackList-rowImage"] },
    { className: "vg-track-header", selectors: [".main-trackList-trackListHeaderRow"] },
    { className: "vg-entity-header-bg-color", selectors: [".main-entityHeader-backgroundColor"] },
    { className: "vg-entity-header-background", selectors: [".main-entityHeader-background"] },
    { className: "vg-entity-header-image-container", selectors: [".main-entityHeader-imageContainer", ".main-entityHeader-imageContainerNew"] },
    { className: "vg-entity-header-gradient", selectors: [".main-entityHeader-gradient"] },
    { className: "vg-entity-header-shadow", selectors: [".main-entityHeader-shadow"] },
    { className: "vg-entity-image-circle", selectors: [".x-entityImage-circle"] },
    { className: "vg-entity-image-placeholder", selectors: [".main-entityHeader-imagePlaceholder"] },
    { className: "vg-entity-header-circle", selectors: [".main-entityHeader-circle"] },
    { className: "vg-main-image", selectors: [".main-image-image"] },
    { className: "vg-category-card-image", selectors: [".x-categoryCard-image"] },
    { className: "vg-home-shortcut", selectors: [".view-homeShortcutsGrid-shortcut"] },
    { className: "vg-home-shortcut-image", selectors: [".view-homeShortcutsGrid-image"] },
    { className: "vg-home-shortcut-image-wrapper", selectors: [".view-homeShortcutsGrid-imageWrapper"] },
    { className: "vg-artist-overview-image", selectors: [".artist-artistOverview-sideBlock > div > section > div:nth-child(3) > section:nth-child(2) > div > img"] },
    { className: "vg-artist-overview-section", selectors: [".artist-artistOverview-sideBlock > div > section"] },
    { className: "vg-special-rounded", selectors: [".T_JcGdJujSuj014SZfjl"] },

    // right panel
    { className: "vg-right", selectors: [".Root__right-sidebar", "[data-testid='right-sidebar']", "aside[aria-label*='Right']"] },
    { className: "vg-panel-container-id", selectors: ["#Desktop_PanelContainer_Id"] },
    { className: "vg-now-playing-view", selectors: [".main-nowPlayingView-section"] },
    { className: "vg-now-playing-view-content", selectors: [".main-nowPlayingView-content", ".main-nowPlayingView-gradient"] },
    { className: "vg-now-playing-view-lyrics", selectors: [".main-nowPlayingView-lyricsContent", ".main-nowPlayingView-lyricsGradient"] },

    // player bar
    { className: "vg-now-playing", selectors: [".Root__now-playing-bar", "[data-testid='now-playing-bar']", "footer[role='contentinfo']"] },
    { className: "vg-now-playing-bar", selectors: [".Root__now-playing-bar"] },
    { className: "vg-now-playing-bar-container", selectors: [".now-playing-bar-container"] },
    { className: "vg-np-container", selectors: [".main-nowPlayingBar-container", "[data-testid='now-playing-bar'] .main-nowPlayingBar-container"] },
    { className: "vg-np-bar", selectors: [".main-nowPlayingBar-nowPlayingBar"] },
    { className: "vg-np-center", selectors: [".main-nowPlayingBar-center"] },
    { className: "vg-np-left", selectors: [".main-nowPlayingBar-left"] },
    { className: "vg-np-right", selectors: [".main-nowPlayingBar-right"] },
    { className: "vg-np-extra-controls", selectors: [".main-nowPlayingBar-extraControls"] },
    { className: "vg-np-cover", selectors: [".main-nowPlayingWidget-coverArt", "[data-testid='cover-art']"] },
    { className: "vg-np-cover-collapsed", selectors: [".main-coverSlotCollapsed-container"] },
    { className: "vg-np-nowplaying", selectors: [".main-nowPlayingWidget-nowPlaying"] },
    { className: "vg-np-widget-trackinfo", selectors: [".main-nowPlayingWidget-trackInfo"] },
    { className: "vg-track-info-name", selectors: [".main-trackInfo-name"] },
    { className: "vg-track-info-artists", selectors: [".main-trackInfo-artists"] },
    { className: "vg-cover-art", selectors: [".cover-art"] },
    { className: "vg-cover-art-image", selectors: [".cover-art-image"] },
    { className: "vg-player-controls", selectors: [".player-controls__buttons", "[data-testid='player-controls']"] },
    { className: "vg-control-playpause", selectors: ["[data-testid='control-button-playpause']"] },
    { className: "vg-control-skip-fwd", selectors: ["[data-testid='control-button-skip-forward']"] },
    { className: "vg-control-skip-back", selectors: ["[data-testid='control-button-skip-back']"] },
    { className: "vg-control-shuffle", selectors: [".main-shuffleButton-button"] },
    { className: "vg-control-repeat", selectors: [".main-repeatButton-button"] },
    { className: "vg-add-button-active", selectors: [".main-addButton-active"] },
    { className: "vg-control-heart", selectors: [".control-button-heart"] },
    { className: "vg-playback-bar", selectors: [".playback-bar", "[data-testid='playback-bar']"] },
    { className: "vg-playback-progress", selectors: [".playback-progressbar-container", "[data-testid='playback-progressbar']"] },
    { className: "vg-progress-bar", selectors: [".progress-bar"] },
    { className: "vg-progress-bar-bg", selectors: [".progress-bar__bg"] },
    { className: "vg-progressbar-interactive", selectors: [".playback-progressbar-isInteractive"] },
    { className: "vg-progressbar-dragging", selectors: [".progress-bar--isDragging"] },
    { className: "vg-x-progressbar-slider", selectors: [".x-progressBar-sliderArea"] },
    { className: "vg-x-progressbar-bg", selectors: [".x-progressBar-progressBarBg"] },
    { className: "vg-volume-bar", selectors: [".volume-bar", "[data-testid='volume-bar']"] },
    { className: "vg-volume-slider", selectors: [".volume-bar__slider-container"] },
    { className: "vg-volume-icon", selectors: [".volume-bar__icon-button", "[data-testid='volume-bar'] button"] },
    { className: "vg-connect-device", selectors: [".connect-device-list-container"] },

    // lyrics
    { className: "vg-lyrics-container", selectors: [".lyrics-lyricsContainer-LyricsContainer"] },
    { className: "vg-lyrics-highlight", selectors: [".lyrics-lyricsContent-highlight"] },
    { className: "vg-lyrics-bg", selectors: [".lyrics-lyrics-background"] },
    { className: "vg-lyrics-content", selectors: [".lyrics-lyricsContent-lyric", ".lyrics-lyricsContent-text"] },
    { className: "vg-lyrics-active", selectors: [".lyrics-lyricsContent-active"] },
    { className: "vg-lyrics-cinema", selectors: [".Root__lyrics-cinema"] },

    // context menu
    { className: "vg-context-menu", selectors: [".main-contextMenu-menu", "#context-menu ul", "[role='menu']"] },
    { className: "vg-context-menu-item", selectors: [".main-contextMenu-menuItemButton", "[role='menuitem']"] },

    // misc
    { className: "vg-layout-resizer", selectors: [".LayoutResizer__resize-bar"] },
    { className: "vg-layout-resizer-start", selectors: [".LayoutResizer__inline-start"] },
    { className: "vg-layout-resizer-end", selectors: [".LayoutResizer__inline-end"] },
    { className: "vg-encore-dark", selectors: [".encore-dark-theme"] },
  ];

  let vgClassObserver = null;
  let vgClassRaf = null;

  function applyDynamicClasses() {
    VG_CLASS_MAP.forEach(({ className, selectors }) => {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.classList.add(className);
        });
      });
    });

    document.querySelectorAll(".vg-track-row").forEach((row) => {
      const isActive = row.classList.contains("main-trackList-active") ||
        row.getAttribute("aria-selected") === "true";
      row.classList.toggle("vg-track-row-active", !!isActive);
    });

    document.querySelectorAll(".vg-nav-bar").forEach((nav) => {
      const third = nav.children && nav.children[2];
      if (third) third.classList.add("vg-nav-third");
    });
  }

  function startDynamicClassObserver() {
    applyDynamicClasses();
    if (vgClassObserver) return;
    vgClassObserver = new MutationObserver(() => {
      if (vgClassRaf) return;
      vgClassRaf = requestAnimationFrame(() => {
        vgClassRaf = null;
        applyDynamicClasses();
      });
    });
    if (document.body) {
      vgClassObserver.observe(document.body, { childList: true, subtree: true });
    }
  }


  // THEMES
  const LIGHT_THEMES = ["VantaWhite", "Glass", "Rose Vale", "Lavender Blush", "Japanese Indigo", "Teal Green"];

  const THEMES = {
    "VantaBlack": {
      window: "040404", panel: "080808", "panel-hover": "111111",
      menu: "171717", player: "010101", stroke: "0D0D0D",
      text: "F0F5F2", subtext: "525752",
      accent: "B0B5B0", "btn-active": "9EA39E", "tab-active": "171717",
      "play-btn": "F0F5F2", "play-btn-hover": "B0B5B0",
      "bar-fill": "B0B5B0", "bar-bg": "010101", heart: "FF1040"
    },
    "Spotify Default": {
      window: "000000", panel: "121212", "panel-hover": "1F1F1F",
      menu: "282828", player: "0D0D0D", stroke: "191919",
      text: "FFFFFF", subtext: "B3B3B3",
      accent: "1ED760", "btn-active": "FFFFFF", "tab-active": "282828",
      "play-btn": "FFFFFF", "play-btn-hover": "FFFFFF",
      "bar-fill": "13EC4D", "bar-bg": "292929", heart: "FF1040"
    },
    "R34 Purple": {
      window: "090C18", panel: "160B2A", "panel-hover": "0D1C28",
      menu: "200E3C", player: "060810", stroke: "2C1850",
      text: "F0EAF8", subtext: "C8A850",
      accent: "4480D8", "btn-active": "C8A850", "tab-active": "0D1C28",
      "play-btn": "F0EAF8", "play-btn-hover": "4480D8",
      "bar-fill": "4480D8", "bar-bg": "060810", heart: "FF1040"
    },
    "Crimson": {
      window: "090E14", panel: "300C12", "panel-hover": "0D1C28",
      menu: "4D131D", player: "060A0E", stroke: "5C1822",
      text: "F0E4E4", subtext: "BF9098",
      accent: "C8903A", "btn-active": "D9A040", "tab-active": "0D1C28",
      "play-btn": "F0E4E4", "play-btn-hover": "C8903A",
      "bar-fill": "C8903A", "bar-bg": "090E14", heart: "FF1040"
    },
    "Olive": {
      window: "100818", panel: "131C05", "panel-hover": "0A1828",
      menu: "1E0E2E", player: "0B0610", stroke: "243408",
      text: "F0EBE0", subtext: "A8B878",
      accent: "81B040", "btn-active": "98C855", "tab-active": "0A1828",
      "play-btn": "F0EBE0", "play-btn-hover": "81B040",
      "bar-fill": "81B040", "bar-bg": "0B0610", heart: "FF1040"
    },
    "VantaWhite": {
      window: "FFFFFF", panel: "F5F4F2", "panel-hover": "ECEAE6",
      menu: "E4E2DC", player: "F0EEF0", stroke: "D8D4CC",
      text: "1A1A1A", subtext: "6E6E6E",
      accent: "1A1A1A", "btn-active": "3A3A3A", "tab-active": "ECEAE6",
      "play-btn": "1A1A1A", "play-btn-hover": "6E6E6E",
      "bar-fill": "1A1A1A", "bar-bg": "D8D4CC", heart: "FF1040"
    },
    "Glass": {
      window: "F0F6FA", panel: "B8D8E8", "panel-hover": "E4F0F6",
      menu: "9CCAE0", player: "E8F2F8", stroke: "8ABCD4",
      text: "0A1828", subtext: "3A5870",
      accent: "0C4A6E", "btn-active": "1A6A9A", "tab-active": "E4F0F6",
      "play-btn": "0A1828", "play-btn-hover": "0C4A6E",
      "bar-fill": "0C4A6E", "bar-bg": "8ABCD4", heart: "FF1040"
    },
    "Rose Vale": {
      window: "EEF5EB", panel: "E8A0A0", "panel-hover": "F4F9F2",
      menu: "D08888", player: "E2EEE0", stroke: "B87070",
      text: "182010", subtext: "3A5828",
      accent: "182870", "btn-active": "3848A8", "tab-active": "F4F9F2",
      "play-btn": "182010", "play-btn-hover": "182870",
      "bar-fill": "182870", "bar-bg": "B87070", heart: "FF1040"
    },
    "Lavender Blush": {
      window: "F6F1E4", panel: "A8A0E0", "panel-hover": "FAF6EE",
      menu: "9088C8", player: "EDE5D0", stroke: "7868B0",
      text: "1A1830", subtext: "4A4878",
      accent: "8A5010", "btn-active": "B07030", "tab-active": "FAF6EE",
      "play-btn": "1A1830", "play-btn-hover": "8A5010",
      "bar-fill": "8A5010", "bar-bg": "7868B0", heart: "FF1040"
    },
    "Japanese Indigo": {
      window: "F6EEF2", panel: "8AAAD0", "panel-hover": "FAF4F7",
      menu: "6888B8", player: "EDE0E8", stroke: "4868A0",
      text: "0C1828", subtext: "2A4070",
      accent: "8A1408", "btn-active": "B03020", "tab-active": "FAF4F7",
      "play-btn": "0C1828", "play-btn-hover": "8A1408",
      "bar-fill": "8A1408", "bar-bg": "4868A0", heart: "FF1040"
    },
    "Teal Green": {
      window: "F2EEF6", panel: "80C8A8", "panel-hover": "F7F3FA",
      menu: "68B090", player: "E4D8EC", stroke: "50988A",
      text: "081E14", subtext: "285840",
      accent: "901828", "btn-active": "B83848", "tab-active": "F7F3FA",
      "play-btn": "081E14", "play-btn-hover": "901828",
      "bar-fill": "901828", "bar-bg": "50988A", heart: "FF1040"
    },
  };

  // Custom key -> Spicetify var name(s)
  const SPICE_BRIDGE = {
    "window": "sidebar",
    "panel": "main",
    "panel-hover": ["main-elevated", "highlight-elevated"],
    "menu": "card",
    "player": ["playbar", "player"],
    "stroke": "highlight",
    "btn-active": "button-active",
    "play-btn": "play-button",
    "play-btn-hover": "play-button-active",
    "bar-fill": "progress-fg",
    "bar-bg": "progress-bg",
    // text/subtext/accent/tab-active/heart: no bridge needed
  };

  // FONT PRESETS
  const FONT_PRESETS = [
    { name: "Spotify Default", family: "" },
    { name: "Inter", family: "Inter", url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
    { name: "Outfit", family: "Outfit", url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" },
    { name: "Roboto", family: "Roboto", url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" },
    { name: "Poppins", family: "Poppins", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" },
    { name: "JetBrains Mono", family: "JetBrains Mono", url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" },
    { name: "Space Grotesk", family: "Space Grotesk", url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
    { name: "Nunito", family: "Nunito", url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap" },
    { name: "Fira Code", family: "Fira Code", url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" }
  ];

  // applyTheme
  function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--spice-${key}`, `#${value}`);
      const std = SPICE_BRIDGE[key];
      if (std) {
        const targets = Array.isArray(std) ? std : [std];
        targets.forEach(t => root.style.setProperty(`--spice-${t}`, `#${value}`));
      }
    });

    // bar-bg: rgba alpha variant
    if (theme["bar-bg"]) {
      const hex = theme["bar-bg"];
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      root.style.setProperty("--spice-progress-bg-alpha", `rgba(${r}, ${g}, ${b}, 0.35)`);
    }

    Spicetify.LocalStorage.set("vantagraph:theme", themeName);

    const isLight = LIGHT_THEMES.includes(themeName);
    if (isLight) {
      document.body.classList.add("vg-glass-theme");
    } else {
      document.body.classList.remove("vg-glass-theme");
    }

    applyHeartColor();
  }

  // applyHeartColor - Spotify forces inline fill:transparent on like/save SVGs; JS must overwrite.
  let _heartObserver = null;
  let _heartDebounce = null;

  function applyHeartColor() {
    const heartColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--spice-heart").trim();
    if (!heartColor) return;

    // like/save/heart button selectors (multi-locale)
    const selectors = [
      'button[data-testid="add-button"]',
      'button[data-testid="add-to-liked-songs-button"]',
      'button[aria-label*="Save"]',
      'button[aria-label*="Saved"]',
      'button[aria-label*="save"]',
      'button[aria-label*="Kaydet"]',
      'button[aria-label*="Kaydedildi"]',
      'button[aria-label*="Beğen"]',
      'button[aria-label*="beğen"]',
      'button[aria-label*="Like"]',
      'button[aria-label*="like"]',
      'button[aria-label*="Remove"]',
    ];

    const defaultColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--spice-subtext").trim() || "";

    function fixHeartPaths() {
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(btn => {
          const liked = btn.getAttribute("aria-checked") === "true";
          const color = liked ? heartColor : defaultColor;
          // overwrite inline fill/stroke (React would re-apply if removed)
          btn.querySelectorAll("svg path, svg circle").forEach(el => {
            if (el.style.fill) el.style.setProperty("fill", color, "important");
            if (el.style.stroke && el.style.stroke.includes("transparent")) {
              el.style.setProperty("stroke", color, "important");
            }
          });
          // currentColor inherit on svg+btn
          const svg = btn.querySelector("svg");
          if (svg) {
            svg.style.setProperty("color", color, "important");
            svg.style.setProperty("fill", color, "important");
          }
          btn.style.setProperty("color", color, "important");
        });
      });
    }

    fixHeartPaths();

    // debounced observer (avoid mutation loops)
    if (_heartObserver) _heartObserver.disconnect();
    _heartObserver = new MutationObserver(() => {
      if (_heartDebounce) clearTimeout(_heartDebounce);
      _heartDebounce = setTimeout(fixHeartPaths, 100);
    });

    // watch player bar + main view for new like buttons
    const targets = [
      document.querySelector(".Root__now-playing-bar"),
      document.querySelector(".Root__main-view"),
      document.querySelector("[data-testid='now-playing-widget']"),
      document.querySelector(".Root__right-sidebar"),
    ].filter(Boolean);

    targets.forEach(t => {
      _heartObserver.observe(t, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "aria-label", "aria-checked"],
      });
    });
  }

  // applyFont
  function applyFont(fontFamily, fontUrl) {
    const styleId = "vantagraph-font";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // load Google Font if URL given
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

    // universal font apply (covers encore + dynamic classes)
    styleEl.textContent = `
      *,
      *::before,
      *::after,
      body,
      button,
      input,
      select,
      textarea,
      [class*="Type__TypeElement"],
      [class*="encore-"],
      [data-encore-id] {
        font-family: "${fontFamily}", -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
      }
    `;

    Spicetify.LocalStorage.set("vantagraph:font", fontFamily);
    Spicetify.LocalStorage.set("vantagraph:font-url", fontUrl || "");
  }



  // applySetting
  // bg filter string shared by the bg element and the panel glass layers
  function bgFilterValue() {
    const blur = getSetting("bg-blur", "0");
    const bright = getSetting("bg-brightness", "100");
    const cont = getSetting("bg-contrast", "100");
    const sat = getSetting("bg-saturation", "100");
    return `blur(${blur}px) brightness(${bright}%) contrast(${cont}%) saturate(${sat}%)`;
  }

  // user.css paints a pre-blurred copy of the bg behind each panel from these
  function syncBgVars(url) {
    const root = document.documentElement.style;
    if (url) {
      root.setProperty("--vg-bg-image", `url("${url}")`);
      root.setProperty("--vg-bg-filter", bgFilterValue());
    } else {
      root.removeProperty("--vg-bg-image");
      root.removeProperty("--vg-bg-filter");
    }
  }

  function applySetting(key, value) {
    const root = document.documentElement;
    Spicetify.LocalStorage.set(`vantagraph:${key}`, String(value));

    switch (key) {
      // font-size: scaled type ramp
      case "font-size": {
        const styleId = "vantagraph-fontsize";
        let el = document.getElementById(styleId);
        if (!el) { el = document.createElement("style"); el.id = styleId; document.head.appendChild(el); }
        el.textContent = `*, *::before, *::after { font-size: ${value}px !important; }
          h1 { font-size: ${value * 2}px !important; }
          h2 { font-size: ${value * 1.5}px !important; }
          h3 { font-size: ${value * 1.2}px !important; }
          .vg-track-row-title { font-size: ${value}px !important; }
          .vg-playback-bar > div:not(.vg-playback-progress) { font-size: ${Math.max(value - 3, 9)}px !important; }`;
        break;
      }
      // icon-size: 5 tiers (T1=player, T2=topbar/card, T3=secondary, T4=sidebar, T5=mini)
      case "icon-size": {
        const styleId = "vantagraph-iconsize";
        const root = document.documentElement;

        // default: clear overrides + inline JS-set sizes
        if (value === "default" || !value) {
          const el = document.getElementById(styleId);
          if (el) el.remove();
          ["--vg-icon-t1","--vg-icon-t2","--vg-icon-t3","--vg-icon-t4","--vg-icon-t5"].forEach(p => root.style.removeProperty(p));
          document.querySelectorAll('.vg-topbar-btn svg, button[aria-label="Vantagraph Settings"] svg, button[aria-label="Lyric Miniplayer"] svg, button[aria-label="vg-vol-preset-trigger"] svg').forEach(svg => {
            svg.style.removeProperty("width"); svg.style.removeProperty("height");
          });
          Spicetify.LocalStorage.set("vantagraph:icon-size", "default");
          break;
        }

        const v = parseFloat(value);
        const t2 = Math.max(6, v - 2);
        const t3 = Math.max(6, v - 4);
        const t4 = Math.max(5, v - 6);
        const t5 = Math.max(4, v - 10);

        root.style.setProperty("--vg-icon-t1", v + "px");
        root.style.setProperty("--vg-icon-t2", t2 + "px");
        root.style.setProperty("--vg-icon-t3", t3 + "px");
        root.style.setProperty("--vg-icon-t4", t4 + "px");
        root.style.setProperty("--vg-icon-t5", t5 + "px");

        let el = document.getElementById(styleId);
        if (!el) {
          el = document.createElement("style"); el.id = styleId; document.head.appendChild(el);
          el.textContent = `
          .vg-icon-t1 { --encore-icon-height: var(--vg-icon-t1) !important; --encore-icon-width: var(--vg-icon-t1) !important; width: var(--vg-icon-t1) !important; height: var(--vg-icon-t1) !important; }
          .vg-icon-t2 { --encore-icon-height: var(--vg-icon-t2) !important; --encore-icon-width: var(--vg-icon-t2) !important; width: var(--vg-icon-t2) !important; height: var(--vg-icon-t2) !important; }
          .vg-icon-t3 { --encore-icon-height: var(--vg-icon-t3) !important; --encore-icon-width: var(--vg-icon-t3) !important; width: var(--vg-icon-t3) !important; height: var(--vg-icon-t3) !important; }
          .vg-icon-t4 { --encore-icon-height: var(--vg-icon-t4) !important; --encore-icon-width: var(--vg-icon-t4) !important; width: var(--vg-icon-t4) !important; height: var(--vg-icon-t4) !important; }
          .vg-icon-t5 { --encore-icon-height: var(--vg-icon-t5) !important; --encore-icon-width: var(--vg-icon-t5) !important; width: var(--vg-icon-t5) !important; height: var(--vg-icon-t5) !important; }

          /* T1: player controls */
          .vg-player-controls button svg:not([preserveAspectRatio]),
          footer button svg:not([preserveAspectRatio]),
          .Root__now-playing-bar button svg:not([preserveAspectRatio]),
          [data-testid="now-playing-bar"] button svg:not([preserveAspectRatio]),
          [data-testid="control-button-playpause"] svg,
          [data-testid="control-button-playpause"] [data-encore-id="icon"],
          [data-testid="control-button-skip-forward"] svg,
          [data-testid="control-button-skip-forward"] [data-encore-id="icon"],
          [data-testid="control-button-skip-back"] svg,
          [data-testid="control-button-skip-back"] [data-encore-id="icon"],
          [data-testid="control-button-shuffle"] svg,
          [data-testid="control-button-shuffle"] [data-encore-id="icon"],
          [data-testid="control-button-repeat"] svg,
          [data-testid="control-button-repeat"] [data-encore-id="icon"],
          footer [data-encore-id="icon"],
          .Root__now-playing-bar [data-encore-id="icon"]
          { width: var(--vg-icon-t1) !important; height: var(--vg-icon-t1) !important;
            --encore-icon-height: var(--vg-icon-t1) !important; --encore-icon-width: var(--vg-icon-t1) !important; }

          /* T2: topbar, card play */
          .vg-global-nav button svg,
          .vg-top-bar button svg,
          .Root__globalNav button svg,
          .Root__top-bar button svg,
          .Root__globalNav [data-encore-id="icon"],
          .Root__top-bar [data-encore-id="icon"],
          .vg-global-nav-link svg,
          [aria-label="Go back"] svg, [aria-label="Go back"] [data-encore-id="icon"],
          [aria-label="Go forward"] svg, [aria-label="Go forward"] [data-encore-id="icon"],
          [aria-label="Search"] svg,
          [aria-label="Browse"] svg,
          [aria-label="Home"] svg, [aria-label="Home"] [data-encore-id="icon"],
          [aria-label="Marketplace"] svg, [aria-label="Marketplace"] [data-encore-id="icon"],
          [aria-label="Clear search field"] svg,
          [aria-label="Hide notification"] svg,
          [aria-label="Go to settings"] svg,
          [aria-label="Share"] svg,
          [aria-label="Save to Your Library"] svg,
          [aria-label="Download"] svg,
          [aria-label="More"] svg,
          [aria-label*="Add to Your Episodes"] svg,
          [aria-label*="Copy link"] svg,
          [aria-label*="Enable Shuffle"] svg,
          [aria-label*="Invite collaborators"] svg,
          [aria-label*="Invite collaborators"] [data-encore-id="icon"],
          .vg-card-play button svg,
          .main-card-PlayButtonContainer button svg,
          .main-playButton-PlayButton svg,
          .main-playButton-PlayButton [data-encore-id="icon"]
          { width: var(--vg-icon-t2) !important; height: var(--vg-icon-t2) !important;
            --encore-icon-height: var(--vg-icon-t2) !important; --encore-icon-width: var(--vg-icon-t2) !important; }

          /* T3: secondary controls */
          .vg-np-extra-controls button svg,
          [data-testid="volume-bar"] button svg,
          [data-testid="volume-bar-toggle-mute-button"] svg,
          [data-testid="volume-bar-toggle-mute-button"] [data-encore-id="icon"],
          [data-testid="lyrics-button"] svg,
          [data-testid="lyrics-button"] [data-encore-id="icon"],
          [data-testid="control-button-queue"] svg,
          [data-testid="control-button-queue"] [data-encore-id="icon"],
          [data-testid="pip-toggle-button"] svg,
          [data-testid="pip-toggle-button"] [data-encore-id="icon"],
          [data-testid="fullscreen-mode-button"] svg,
          [data-testid="fullscreen-mode-button"] [data-encore-id="icon"],
          [data-testid="big-card-toggle-preview-button"] svg,
          [data-testid="overflow-button-start"] svg,
          [data-testid="overflow-button-end"] svg,
          [data-testid="x-sortBox-sortDropdown"] svg,
          [aria-label="Connect to a device"] svg,
          [aria-label="Connect to a device"] [data-encore-id="icon"],
          [aria-label="What's New"] svg,
          [aria-label="Friend Activity"] svg,
          [aria-label*="More options"] svg,
          [aria-label*="More options"] [data-encore-id="icon"],
          [aria-label="Expand Now Playing view"] svg,
          [aria-label="Hide Now Playing view"] svg,
          [aria-label="Show Now Playing view"] svg,
          [aria-label="Add to playlist"] svg,
          [aria-label="Add to Liked Songs"] svg,
          [aria-label="Remove"] svg,
          [aria-label="Close"] svg,
          [aria-label="Close"] [data-encore-id="icon"],
          [aria-label="Search in playlist"] svg,
          [aria-label="Find a playlist"] svg,
          [aria-label="Change visible columns"] svg,
          [aria-label="Duration"] svg,
          [class*="contextMenu"] svg,
          [data-encore-id="buttonTertiary"] [data-encore-id="icon"],
          [data-encore-id="buttonSecondary"] [data-encore-id="icon"],
          .vg-topbar-btn button svg,
          .vg-topbar-btn [data-encore-id="icon"],
          .vg-topbar-btn svg,
          .main-topBar-topbarContentRight button svg,
          button[aria-label="Vantagraph Settings"] svg,
          button[aria-label="Lyric Miniplayer"] svg,
          button[aria-label="vg-vol-preset-trigger"] svg,
          .vg-library-icon svg
          { width: var(--vg-icon-t3) !important; height: var(--vg-icon-t3) !important;
            --encore-icon-height: var(--vg-icon-t3) !important; --encore-icon-width: var(--vg-icon-t3) !important; }

          /* T4: sidebar library */
          .vg-your-library button svg,
          .vg-your-library-header button svg,
          .vg-your-library-filter button svg,
          [aria-label="Collapse Your Library"] svg,
          [aria-label="Expand Your Library"] svg,
          [aria-label="Open Your Library"] svg,
          [aria-label="Create"] svg,
          [aria-label*="Search in Your Library"] svg,
          [aria-label*="Custom order"] svg,
          [aria-label*="Recents"] svg
          { width: var(--vg-icon-t4) !important; height: var(--vg-icon-t4) !important; }

          /* T5: mini player */
          [data-testid="cover-art-button"] svg,
          .vg-np-left button svg,
          .vg-np-cover button svg
          { width: var(--vg-icon-t5) !important; height: var(--vg-icon-t5) !important; }`;
        }

        // topbar buttons: CSS blocked, set inline
        document.querySelectorAll('.vg-topbar-btn svg, button[aria-label="Vantagraph Settings"] svg, button[aria-label="Lyric Miniplayer"] svg, button[aria-label="vg-vol-preset-trigger"] svg').forEach(svg => {
          svg.style.setProperty("width", t3 + "px", "important");
          svg.style.setProperty("height", t3 + "px", "important");
        });

        Spicetify.LocalStorage.set("vantagraph:icon-size", value);
        break;
      }
      // density: compact|comfortable|default (margin/padding/gap only, sizes locked)
      case "density": {
        const styleId = "vantagraph-density";
        let el = document.getElementById(styleId);
        // default: native spacing
        if (value === "default" || !value) {
          if (el) el.remove();
          if (typeof ntSyncBottom === "function") {
            setTimeout(ntSyncBottom, 100);
            setTimeout(ntSyncBottom, 600);
            setTimeout(ntSyncBottom, 1500);
          }
          break;
        }
        if (!el) { el = document.createElement("style"); el.id = styleId; document.head.appendChild(el); }
        // Spatial Compression v2 - delta from default (Apr 2026)
        const config = {
          compact: {
            panelGap: "8px",
            panelPad: "2px",
            mainMargin: "7px",
            playerMinH: "",
            navGap: "4px",
            navInnerPadX: "0px",
            searchPadX: "0px",
            contentSpacing: "8px",
            sectionPad: "8px",
            sectionGap: "4px",
            rowPad: "0px 4px",
            rowMinH: "32px",
            cardPad: "6px",
            gridGap: "8px",
            listRowHGap: "8px",
            playerTopPad: "15px",
            playerInnerPadX: "",
            playerControlsGap: "",
            playerLeftGap: "",
            playerRightGap: "",
            playerCenterGap: "",
            progressBarPadX: "",
            volMarginR: "",
            playerAlignBottom: false,
            wavePadL: "10px",
            wavePadR: "10px",
          },
          comfortable: {
            panelGap: "10px",
            panelPad: "6px",
            mainMargin: "11px",
            playerMinH: "120px",
            navGap: "10px",
            navInnerPadX: "0px",
            searchPadX: "4px",
            contentSpacing: "20px",
            sectionPad: "16px",
            sectionGap: "10px",
            rowPad: "4px 10px",
            rowMinH: "44px",
            cardPad: "10px",
            gridGap: "16px",
            listRowHGap: "12px",
            playerTopPad: "4px",
            playerInnerPadX: "6px",
            playerControlsGap: "10px",
            playerLeftGap: "",
            playerRightGap: "",
            playerCenterGap: "",
            progressBarPadX: "8px",
            volMarginR: "10px",
            playerAlignBottom: true,
            wavePadL: "20px",
            wavePadR: "0px",
          }
        };

        const d = config[value] || config.comfortable;

        el.textContent = `
          /* panel frame */
          :root .Root__top-container {
            --panel-gap: ${d.panelGap} !important;
            column-gap: ${d.panelGap} !important;
          }
          :root .Root__nav-bar,
          :root #Desktop_LeftSidebar_Id {
            padding-top: ${d.panelPad} !important;
            padding-bottom: ${d.panelPad} !important;
          }
          :root .Root__right-sidebar,
          :root aside[class*="Panel"] {
            padding-top: ${d.panelPad} !important;
            padding-bottom: ${d.panelPad} !important;
          }
          #main-view#main-view {
            margin: ${d.mainMargin} 0 !important;
          }

          /* topbar */
          :root .main-topBar-container {
            padding-left: ${d.navInnerPadX} !important;
            padding-right: ${d.navInnerPadX} !important;
            gap: ${d.navGap} !important;
          }
          :root .Root__globalNav > .Root__top-bar {
            gap: ${d.navGap} !important;
          }
          :root .main-globalNav-searchContainer {
            padding: 0 ${d.searchPadX} !important;
          }
          :root .main-topBar-topbarContentRight,
          :root [data-testid="topbar-right"] {
            gap: ${d.navGap} !important;
          }
          :root .main-globalNav-historyButtons {
            gap: ${d.navGap} !important;
          }

          /* main content */
          :root {
            --content-spacing: ${d.contentSpacing} !important;
            --section-padding: ${d.sectionPad} !important;
            --section-gap: ${d.sectionGap} !important;
          }
          :root .contentSpacing {
            padding: 0 ${d.contentSpacing} !important;
          }
          :root .main-view-container [data-testid="tracklist-row"],
          :root .main-view-container [role="row"][aria-rowindex],
          :root .main-view-container [class*="TrackListRow"],
          :root [class*="main-view"] [data-testid="tracklist-row"],
          :root [class*="main-view"] [role="row"][aria-rowindex] {
            min-height: ${d.rowMinH} !important;
            padding: ${d.rowPad} !important;
          }
          :root .main-view-container [data-testid="card"],
          :root .main-view-container [class*="CardButton"],
          :root [class*="main-view"] [data-testid="card"] {
            padding: ${d.cardPad} !important;
          }
          :root .main-view-container [class*="Shelf"] > div,
          :root [class*="main-view"] [class*="Shelf"] > div {
            gap: ${d.gridGap} !important;
          }
          :root {
            --encore-legacy-list-row-horizontal-gap: ${d.listRowHGap} !important;
          }

          /* player bar */
          :root footer,
          :root .Root__now-playing-bar,
          :root [data-testid="now-playing-bar"] {
            margin: -8px !important;
            padding: 8px !important;
            ${d.playerMinH ? `min-height: ${d.playerMinH} !important;` : ""}
          }
          ${(d.playerTopPad || d.playerControlsGap || d.playerAlignBottom) ? `
          :root .main-nowPlayingBar-nowPlayingBar,
          :root .main-nowPlayingBar-container {
            ${d.playerAlignBottom ? "margin-top: auto !important;" : ""}
            ${d.playerTopPad ? `padding-top: ${d.playerTopPad} !important;` : ""}
            ${d.playerControlsGap ? `gap: ${d.playerControlsGap} !important;` : ""}
          }` : ""}
          ${(d.playerInnerPadX || d.playerLeftGap) ? `
          :root .main-nowPlayingBar-left,
          :root .main-nowPlayingWidget-nowPlaying {
            ${d.playerInnerPadX ? `padding-left: ${d.playerInnerPadX} !important;` : ""}
            ${d.playerLeftGap ? `gap: ${d.playerLeftGap} !important;` : ""}
          }` : ""}
          ${d.playerCenterGap ? `
          :root .main-nowPlayingBar-center {
            gap: ${d.playerCenterGap} !important;
          }` : ""}
          ${d.playerControlsGap ? `
          :root .player-controls__buttons,
          :root [data-testid="player-controls"] {
            gap: ${d.playerControlsGap} !important;
          }` : ""}
          ${d.progressBarPadX ? `
          :root .playback-bar,
          :root [data-testid="playback-bar"] {
            padding: 0 ${d.progressBarPadX} !important;
          }` : ""}
          ${(d.playerInnerPadX || d.playerRightGap) ? `
          :root .main-nowPlayingBar-right,
          :root .main-nowPlayingBar-extraControls {
            ${d.playerInnerPadX ? `padding-right: ${d.playerInnerPadX} !important;` : ""}
            ${d.playerRightGap ? `gap: ${d.playerRightGap} !important;` : ""}
          }` : ""}
          ${d.volMarginR ? `
          :root [data-testid="volume-bar"] {
            margin-right: ${d.volMarginR} !important;
          }` : ""}
          :root .vg-wave-container {
            padding-left: ${d.wavePadL} !important;
            padding-right: ${d.wavePadR} !important;
          }
        `;
        if (typeof ntSyncBottom === "function") {
          setTimeout(ntSyncBottom, 100);
          setTimeout(ntSyncBottom, 600);
          setTimeout(ntSyncBottom, 1500);
        }
        break;
      }
      // border-radius: scaled tiers + bg-active glass boxes
      case "border-radius": {
        // default: clear all
        if (value === "default" || value === "") {
          const brEl = document.getElementById("vantagraph-border-radius");
          if (brEl) brEl.remove();
          ["--vg-radius-sm","--vg-radius-md","--vg-radius-lg","--vg-radius-xl","--vg-radius-2xl","--encore-border-radius-rounded"].forEach(p => root.style.removeProperty(p));
          Spicetify.LocalStorage.set("vantagraph:border-radius", "default");
          break;
        }

        root.style.setProperty("--vg-radius-sm", `${value}px`);
        root.style.setProperty("--vg-radius-md", `${Math.round(value * 1.5)}px`);
        root.style.setProperty("--vg-radius-lg", `${value * 2}px`);
        root.style.setProperty("--vg-radius-xl", `${Math.round(value * 2.5)}px`);
        root.style.setProperty("--vg-radius-2xl", `${value * 3}px`);
        root.style.setProperty("--encore-border-radius-rounded", `${value}px`);

        const brId = "vantagraph-border-radius";
        let brEl = document.getElementById(brId);
        if (!brEl) { brEl = document.createElement("style"); brEl.id = brId; document.head.appendChild(brEl); }
        const r = Math.round(value * 1.5);
        brEl.textContent = `
          /* right panel outer */
          body .Root__right-sidebar > div,
          body .Root__right-sidebar > div[class] {
            border-radius: ${r}px !important;
            overflow: hidden !important;
          }

          #Desktop_PanelContainer_Id#Desktop_PanelContainer_Id {
            border-radius: ${r}px !important;
            overflow: hidden !important;
          }
          #Desktop_PanelContainer_Id#Desktop_PanelContainer_Id > div {
            border-radius: ${r}px !important;
            overflow: hidden !important;
          }

          body .Root__right-sidebar aside {
            border-radius: ${r}px !important;
            overflow: hidden !important;
          }

          .main-nowPlayingView-section,
          .main-nowPlayingView-content,
          .main-nowPlayingView-lyricsContent,
          .main-nowPlayingView-gradient {
            border-radius: ${r}px !important;
          }

          [aria-label="Home"],
          .main-globalNav-homeIcon,
          a[href="/"] > span,
          .main-globalNav-navLinkActive {
            border-radius: ${value}px !important;
          }

          .vg-bg-active #Desktop_LeftSidebar_Id {
            border-radius: ${r}px !important;
          }

          .vg-bg-active .Root__main-view,
          .vg-bg-active .vg-main {
            border-radius: ${r}px !important;
          }

          .vg-bg-active .Root__right-sidebar,
          .vg-bg-active .vg-right {
            border-radius: ${r}px !important;
          }

          .Root__now-playing-bar,
          .vg-now-playing-bar,
          .vg-now-playing {
            border-radius: ${r}px !important;
          }
        `;
        break;
      }

      // bg-url: custom image bg, auto-switches to Glass theme
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
          document.body.prepend(bgEl);
        }
        
        if (value) {
          bgEl.style.backgroundImage = `url("${value}")`;
          bgEl.style.filter = bgFilterValue();
          syncBgVars(value);
          document.documentElement.style.setProperty("--spice-main", "transparent");
          waitForElement(".vg-root", (el) => { el.style.background = "transparent"; });
          document.body.style.background = "transparent";
          document.body.classList.add("vg-bg-active");
          // remember pre-bg theme for restore, then force Glass
          const curTheme = getSetting("theme", "");
          if (curTheme !== "Glass") {
            Spicetify.LocalStorage.set("vantagraph:pre-bg-theme", curTheme);
          }
          applyTheme("Glass");
        } else {
          bgEl.style.backgroundImage = "none";
          syncBgVars(null);
          document.body.style.background = "";
          document.body.classList.remove("vg-bg-active");
          document.documentElement.style.removeProperty("--spice-main");
          const vgRoot = document.querySelector(".vg-root");
          if (vgRoot) vgRoot.style.removeProperty("background");
        }
        break;
      // bg-use-album-cover: live update bg from now-playing cover
      case "bg-use-album-cover":
        Spicetify.LocalStorage.set(`vantagraph:${key}`, value);
        if (value === "true" || value === true) {
          waitForElement(".vg-root", (el) => {
            el.style.background = "transparent";
          });
          document.body.style.background = "transparent";
          document.body.classList.add("vg-bg-active");
          updateAlbumCoverBackground();
        } else {
          const customUrl = getSetting("bg-url", "");
          if (customUrl) {
            applySetting("bg-url", customUrl);
          } else {
            syncBgVars(null);
            document.body.style.background = "";
            document.body.classList.remove("vg-bg-active");
            document.documentElement.style.removeProperty("--spice-main");
            const vgRoot2 = document.querySelector(".vg-root");
            if (vgRoot2) vgRoot2.style.removeProperty("background");
          }
        }
        break;

      // bg image filters: live update existing bg element
      case "bg-blur":
      case "bg-brightness":
      case "bg-contrast":
      case "bg-saturation": {
        const bgEl = document.getElementById("vantagraph-bg-element");
        if (bgEl) {
          bgEl.style.filter = bgFilterValue();
          if (document.body.classList.contains("vg-bg-active")) {
            document.documentElement.style.setProperty("--vg-bg-filter", bgFilterValue());
          }
        }
        break;
      }

      // snippet toggles: CSS lives in user.css; OFF state injects revert
      case "snippet-rounded-images": {
        const sid = "vantagraph-snippet-rounded-images-off";
        let sel = document.getElementById(sid);
        if (value === "false" || value === false) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = `.vg-nav-third,
            .vg-cover-art-image,
            .vg-home-shortcut-image,
            .vg-entity-header-shadow,
            .vg-category-card-image,
            .vg-entity-image-circle,
            .vg-main-image,
            .vg-card-image,
            .vg-card-image-wrap,
            .vg-entity-image-placeholder > div,
            .vg-track-row-image,
            .vg-home-shortcut-image-wrapper,
            .vg-special-rounded,
            .vg-artist-overview-image,
            .vg-artist-overview-section
            { border-radius: revert !important; }
            .vg-card-image-circular,
            .vg-entity-image-placeholder,
            .vg-entity-header-circle { border-radius: revert !important; }
            .vg-np-cover img, .vg-np-cover-collapsed img { border-radius: 50% !important; }`;
        } else { if (sel) sel.remove(); }
        break;
      }
      case "snippet-vinyl-stop": {
        const sid = "vantagraph-snippet-vinyl-stop";
        let sel = document.getElementById(sid);
        if (value === "true" || value === true) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = `.vg-np-cover img, .vg-np-cover-collapsed img { animation: none !important; animation-play-state: paused !important; }`;
        } else { if (sel) sel.remove(); }
        break;
      }
      // reduced motion: every Spotify transition collapses to 1ms (transitionend
      // still fires, so components waiting on it do not hang), delays dropped,
      // programmatic scrolling instant. Keyframe animations (spinners, skeleton
      // shimmer) are left alone. Theme-driven live elements are excluded.
      case "snippet-reduced-motion": {
        const sid = "vantagraph-snippet-reduced-motion";
        let sel = document.getElementById(sid);
        if (value === "true" || value === true) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = `*:not(.vg-wave-bar):not(.vg-ntc-text):not(.vg-next-track-card), *::before, *::after { transition-duration: 1ms !important; transition-delay: 0s !important; }
html, body, * { scroll-behavior: auto !important; }`;
        } else { if (sel) sel.remove(); }
        break;
      }
      case "snippet-modern-scrollbar": {
        const sid = "vantagraph-snippet-modern-scrollbar";
        let sel = document.getElementById(sid);
        if (value === "true" || value === true || (value !== "false" && value !== false)) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = `.os-scrollbar-handle { width: 0.25rem !important; border-radius: 10rem !important; transition: width 300ms ease-in-out !important; }
            .os-scrollbar-handle:focus, .os-scrollbar-handle:focus-within, .os-scrollbar-handle:hover { width: 0.35rem !important; }`;
        } else { if (sel) sel.remove(); }
        break;
      }

      case "snippet-custom-accent": {
        const sid = "vantagraph-snippet-custom-accent";
        let sel = document.getElementById(sid);
        if (value && value !== "false" && value !== "") {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          const root = document.documentElement;
          root.style.setProperty("--spice-accent", value);
          root.style.setProperty("--spice-play-btn", value);
          root.style.setProperty("--spice-play-button", value);
          root.style.setProperty("--spice-bar-fill", value);
          root.style.setProperty("--spice-progress-fg", value);
          sel.textContent = `:root { --spice-accent: ${value} !important; --spice-play-btn: ${value} !important; --spice-play-button: ${value} !important; --spice-bar-fill: ${value} !important; --spice-progress-fg: ${value} !important; }`;
        } else {
          if (sel) sel.remove();
          const root = document.documentElement;
          root.style.removeProperty("--spice-accent");
          root.style.removeProperty("--spice-play-btn");
          root.style.removeProperty("--spice-play-button");
          root.style.removeProperty("--spice-bar-fill");
          root.style.removeProperty("--spice-progress-fg");
        }
        break;
      }

      // hide buttons (topbar + player bar)
      case "snippet-hide-friend-activity":
      case "snippet-hide-whats-new":
      case "snippet-hide-fullscreen":
      case "snippet-hide-lyrics-btn":
      case "snippet-hide-miniplayer":
      case "snippet-hide-queue-btn":
      case "snippet-hide-shuffle":
      case "snippet-hide-repeat":
      case "snippet-hide-connect":
      case "snippet-hide-volume":
      case "snippet-hide-np-widget":
      case "snippet-hide-next-track": {
        const btnCss = {
          "snippet-hide-friend-activity": "button[aria-label='Friend Activity'],button[aria-label='Friend Activity'] ~ *{display:none !important}",
          "snippet-hide-whats-new": "button[aria-label=\"What's New\"],button[aria-label=\"What's New\"] ~ *{display:none !important}",
          "snippet-hide-fullscreen": ".Root__now-playing-bar button[data-testid='fullscreen-mode-button'],.Root__now-playing-bar button[aria-label='Enter Full screen']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-lyrics-btn": ".Root__now-playing-bar button[data-testid='lyrics-button'],.Root__now-playing-bar .main-nowPlayingBar-lyricsButton,.main-nowPlayingBar-lyricsButton{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-miniplayer": ".Root__now-playing-bar button[data-testid='pip-toggle-button'],.Root__now-playing-bar button[aria-label='Open Miniplayer']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-queue-btn": ".Root__now-playing-bar button[data-testid='control-button-queue'],.Root__now-playing-bar button[aria-label='Queue'],.main-useDropTarget-base:has(button[data-testid='control-button-queue']){display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-shuffle": ".Root__now-playing-bar button[aria-label='Shuffle'],.Root__now-playing-bar button[aria-label='Enable shuffle']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-repeat": ".Root__now-playing-bar button[data-testid='control-button-repeat'],.Root__now-playing-bar button[aria-label*='repeat'],.Root__now-playing-bar button[aria-label*='Repeat']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-connect": ".Root__now-playing-bar button[aria-label='Connect to a device'],.Root__now-playing-bar button[aria-label*='Connect to']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-volume": ".Root__now-playing-bar [data-testid='volume-bar'],.Root__now-playing-bar button[data-testid='volume-bar-toggle-mute-button']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-np-widget": ".Root__now-playing-bar [data-testid='now-playing-widget'],.Root__now-playing-bar [data-testid='cover-art-button']{display:none !important;width:0 !important;height:0 !important;overflow:hidden !important;padding:0 !important;margin:0 !important;border:0 !important}",
          "snippet-hide-next-track": ".vg-next-track-card{display:none !important}",
        };
        const sid = "vantagraph-" + key;
        let sel = document.getElementById(sid);
        if (value === "true" || value === true) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = btnCss[key] || "";
        } else { if (sel) sel.remove(); }
        break;
      }

      // hide elements (home sections, layout, dev CSS)
      case "snippet-hide-ads-banner":
      case "snippet-hide-podcasts":
      case "snippet-hide-promo-card":
      case "snippet-hide-mood-recs":
      case "snippet-hide-made-for-you":
      case "snippet-hide-recents":
      case "snippet-hide-top-mixes":
      case "snippet-hide-jump-back":
      case "snippet-hide-rec-stations":
      case "snippet-hide-new-releases":
      case "snippet-hide-best-artists":
      case "snippet-hide-fav-artists":
      case "snippet-hide-rec-today":
      case "snippet-hide-home-shortcuts":
      case "snippet-thin-library":
      case "snippet-auto-hide-sidebar":
      case "debug-labels":
      case "snippet-dev-layout-grid":
      case "snippet-dev-highlighter": {
        const cssMap = {
          "snippet-hide-podcasts": "button[aria-label='Podcasts']{display:none !important}",
          "snippet-hide-ads-banner": `[class*="upgrade"],[data-testid*="upgrade"],[class*="Advertisement"],[data-testid*="ad-slot"],iframe[src*="ad"]{display:none !important}`,
          "snippet-hide-promo-card": ".main-home-content > section:not([aria-label]):not([class*='main-shelf-shelf']):not([class*='vg-shelf']){display:none !important} [class*='PromotionDefaultNative']{display:none !important}",
          "snippet-hide-mood-recs": "section[aria-label*='Soundtrack your'],section[aria-label*='Start your'],section[aria-label*='Good morning'],section[aria-label*='Good afternoon'],section[aria-label*='Good evening'],section[aria-label*='late night'],section[aria-label*='your Monday'],section[aria-label*='your Tuesday'],section[aria-label*='your Wednesday'],section[aria-label*='your Thursday'],section[aria-label*='your Friday'],section[aria-label*='your Saturday'],section[aria-label*='your Sunday']{display:none !important}",
          "snippet-hide-made-for-you": "section[aria-label^='Made For'],.Root__main-view div[aria-label^='Made For']{display:none !important}",
          "snippet-hide-recents": "section[aria-label='Recents'],.Root__main-view div[aria-label='Recents']{display:none !important}",
          "snippet-hide-top-mixes": "section[aria-label='Your top mixes'],.Root__main-view div[aria-label='Your top mixes']{display:none !important}",
          "snippet-hide-jump-back": "section[aria-label='Jump back in'],.Root__main-view div[aria-label='Jump back in']{display:none !important}",
          "snippet-hide-rec-stations": "section[aria-label*='Recommended Stations'],.Root__main-view div[aria-label*='Recommended Stations']{display:none !important}",
          "snippet-hide-new-releases": "section[aria-label*='New releases'],.Root__main-view div[aria-label*='New releases'],.Root__main-view div[aria-label*='New Releases']{display:none !important}",
          "snippet-hide-best-artists": "section[aria-label*='Best of artists'],.Root__main-view div[aria-label*='Best of artists']{display:none !important}",
          "snippet-hide-fav-artists": "section[aria-label*='favorite artists'],.Root__main-view div[aria-label*='favorite artists'],.Root__main-view div[aria-label*='Your favorite']{display:none !important}",
          "snippet-hide-rec-today": "section[aria-label*='Recommended for today'],.Root__main-view div[aria-label*='Recommended for today'],.Root__main-view div[aria-label*='Recommended for Today']{display:none !important}",
          "snippet-hide-home-shortcuts": ".view-homeShortcutsGrid-shortcuts{display:none !important}",
          "snippet-thin-library": ".main-yourLibraryX-listItem{padding-block:2px !important;display:flex !important;align-items:center !important}.main-yourLibraryX-listItem [role='group']{min-block-size:0 !important;align-items:center !important;display:flex !important}.main-yourLibraryX-listItem .x-entityImage-imageContainer,.main-yourLibraryX-rowCover{width:2em !important;height:2em !important;flex-shrink:0 !important}",
          "snippet-auto-hide-sidebar": "@media(max-width:1200px){#Desktop_LeftSidebar_Id{width:0 !important;overflow:hidden}.LayoutResizer__resize-bar{display:none}}",
          "snippet-dev-layout-grid": ".Root__nav-bar{outline:2px dashed #ff6b6b !important}.Root__main-view{outline:2px dashed #4ecdc4 !important}.Root__right-sidebar{outline:2px dashed #ffe66d !important}.Root__now-playing-bar{outline:2px dashed #a8e6cf !important}.Root__globalNav{outline:2px dashed #dda0dd !important}#Desktop_LeftSidebar_Id{outline:2px dashed #ff9f43 !important}",
          "snippet-dev-highlighter": "*:hover{outline:1px solid rgba(29,185,84,0.5) !important;outline-offset:-1px}",
          "debug-labels": `
            body.vg-debug .Root__nav-bar,
            body.vg-debug .Root__main-view,
            body.vg-debug .Root__right-sidebar,
            body.vg-debug .Root__now-playing-bar,
            body.vg-debug footer,
            body.vg-debug .Root__globalNav { position: relative; }

            body.vg-debug .Root__nav-bar::before,
            body.vg-debug .Root__main-view::before,
            body.vg-debug .Root__right-sidebar::before,
            body.vg-debug .Root__now-playing-bar::before,
            body.vg-debug footer::before,
            body.vg-debug .Root__globalNav::before {
              position: absolute; z-index: 9999; top: 4px; left: 4px;
              padding: 2px 8px; border-radius: 4px;
              font-size: 10px; font-weight: 700; letter-spacing: 1px;
              background: rgba(0,0,0,0.85); color: #00ff88;
              font-family: 'JetBrains Mono', monospace;
              pointer-events: none; text-transform: uppercase;
              border: 1px solid rgba(0,255,136,0.3);
              backdrop-filter: blur(4px);
            }
            body.vg-debug .Root__globalNav::before { content: 'TOPBAR - .Root__globalNav'; }
            body.vg-debug .Root__nav-bar::before { content: 'LEFT SIDEBAR - #Desktop_LeftSidebar_Id'; }
            body.vg-debug .Root__main-view::before { content: 'MAIN VIEW - .Root__main-view'; }
            body.vg-debug .Root__right-sidebar::before { content: 'RIGHT PANEL - .Root__right-sidebar'; }
            body.vg-debug .Root__now-playing-bar::before { content: 'NOW PLAYING - .Root__now-playing-bar'; }
            body.vg-debug footer::before { content: 'PLAYER BAR - footer'; }

            body.vg-debug .Root__nav-bar::after,
            body.vg-debug .Root__main-view::after,
            body.vg-debug .Root__right-sidebar::after,
            body.vg-debug .Root__now-playing-bar::after,
            body.vg-debug footer::after,
            body.vg-debug .Root__globalNav::after {
              position: absolute; z-index: 9999; bottom: 4px; left: 4px;
              padding: 2px 6px; border-radius: 3px;
              font-size: 9px; font-weight: 400;
              background: rgba(0,0,0,0.7); color: #888;
              font-family: 'JetBrains Mono', monospace;
              pointer-events: none;
              border: 1px solid rgba(255,255,255,0.1);
            }
            body.vg-debug .Root__globalNav::after { content: 'Safe Zone: TOP BAR (Min Risk)'; color: #4ecdc4; }
            body.vg-debug .Root__nav-bar::after { content: 'Risk: HIGH - Dynamic filtering/resize'; color: #ff6b6b; }
            body.vg-debug .Root__main-view::after { content: 'Risk: EXTREME - React unmount on route'; color: #ff4444; }
            body.vg-debug .Root__right-sidebar::after { content: 'Risk: SEVERE - Contextual re-render'; color: #ff9f43; }
            body.vg-debug .Root__now-playing-bar::after { content: 'Risk: MEDIUM - Horizontal overflow'; color: #ffe66d; }
            body.vg-debug footer::after { content: 'footer element'; color: #666; }
          `,
        };
        const sid = "vantagraph-" + key;
        let sel = document.getElementById(sid);
        if (value === "true" || value === true) {
          if (!sel) { sel = document.createElement("style"); sel.id = sid; document.head.appendChild(sel); }
          sel.textContent = cssMap[key] || "";
          if (key === "debug-labels") document.body.classList.add("vg-debug");
        } else {
          if (sel) sel.remove();
          if (key === "debug-labels") document.body.classList.remove("vg-debug");
        }
        break;
      }

      // dev: spacing visualizer w/ tooltip on hover
      case "snippet-dev-spacing-viz": {
        const styleId = "vantagraph-snippet-dev-spacing-viz";
        const tooltipId = "vg-spacing-tooltip";
        if (value === "true" || value === true) {
          if (!document.getElementById(styleId)) {
            const s = document.createElement("style"); s.id = styleId;
            s.textContent = `#${tooltipId}{position:fixed;z-index:999999;pointer-events:none;font:10px 'JetBrains Mono',monospace;background:rgba(0,0,0,0.9);color:#0f0;padding:5px 10px;border-radius:5px;border:1px solid rgba(0,255,0,0.3);backdrop-filter:blur(6px);white-space:nowrap;opacity:0;transition:opacity 0.15s;box-shadow:0 2px 12px rgba(0,0,0,0.5)}`;
            document.head.appendChild(s);
          }

          if (!document.getElementById(tooltipId)) {
            const tip = document.createElement("div"); tip.id = tooltipId;
            document.body.appendChild(tip);
          }

          window._vgSpacingHandler = function(e) {
            const tip = document.getElementById(tooltipId);
            if (!tip) return;
            const el = e.target;
            if (!el || el === document.body || el === document.documentElement || el.id === tooltipId) { tip.style.opacity = "0"; return; }
            const cs = getComputedStyle(el);
            const parts = [];
            const pT = parseFloat(cs.paddingTop), pR = parseFloat(cs.paddingRight), pB = parseFloat(cs.paddingBottom), pL = parseFloat(cs.paddingLeft);
            const mT = parseFloat(cs.marginTop), mR = parseFloat(cs.marginRight), mB = parseFloat(cs.marginBottom), mL = parseFloat(cs.marginLeft);
            const gap = cs.gap && cs.gap !== "normal" ? cs.gap : null;
            const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
            parts.push(w + "×" + h + "px");
            if (pT || pR || pB || pL) parts.push("pad " + pT + "/" + pR + "/" + pB + "/" + pL);
            if (mT || mR || mB || mL) parts.push("mar " + mT + "/" + mR + "/" + mB + "/" + mL);
            if (gap) parts.push("gap " + gap);
            tip.textContent = parts.join(" │ ");
            const rect = el.getBoundingClientRect();
            tip.style.left = Math.min(rect.left, window.innerWidth - 280) + "px";
            tip.style.top = Math.max(0, rect.top - 24) + "px";
            tip.style.opacity = "1";
            el.style.outline = "1px dashed rgba(0,255,0,0.5)";
            el.style.outlineOffset = "-1px";
          };
          window._vgSpacingLeave = function(e) {
            const tip = document.getElementById(tooltipId);
            if (tip) tip.style.opacity = "0";
            if (e.target && e.target.style) { e.target.style.outline = ""; e.target.style.outlineOffset = ""; }
          };
          document.addEventListener("mouseover", window._vgSpacingHandler, true);
          document.addEventListener("mouseout", window._vgSpacingLeave, true);
          Spicetify.showNotification("Spacing Visualizer active ✓");
        } else {
          const s = document.getElementById(styleId); if (s) s.remove();
          const tip = document.getElementById(tooltipId); if (tip) tip.remove();
          if (window._vgSpacingHandler) { document.removeEventListener("mouseover", window._vgSpacingHandler, true); window._vgSpacingHandler = null; }
          if (window._vgSpacingLeave) { document.removeEventListener("mouseout", window._vgSpacingLeave, true); window._vgSpacingLeave = null; }
        }
        break;
      }

      // dev: live CSS variable monitor panel
      case "snippet-dev-var-monitor": {
        const panelId = "vg-var-monitor";
        if (value === "true" || value === true) {
          if (!document.getElementById(panelId)) {
            Spicetify.showNotification("⏳ CSS Variable Monitor loading...");
            const p = document.createElement("div"); p.id = panelId;
            p.style.cssText = "position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:99999;background:rgba(0,0,0,0.92);color:#0f0;font:11px 'JetBrains Mono',monospace;padding:14px 18px;border-radius:12px;max-height:70vh;min-width:340px;overflow-y:auto;pointer-events:none;backdrop-filter:blur(12px);border:1px solid rgba(0,255,136,0.25);box-shadow:0 8px 32px rgba(0,0,0,0.6);";
            document.body.appendChild(p);
            const tid = setInterval(() => {
              const el = document.getElementById(panelId);
              if (!el) { clearInterval(tid); return; }
              const cs = getComputedStyle(document.documentElement);
              const vars = [
                "--spice-window","--spice-panel","--spice-panel-hover",
                "--spice-menu","--spice-player","--spice-stroke",
                "--spice-text","--spice-subtext","--spice-accent",
                "--spice-btn-active","--spice-tab-active",
                "--spice-play-btn","--spice-play-btn-hover",
                "--spice-bar-fill","--spice-bar-bg","--spice-heart",
                "--spice-main","--spice-sidebar","--spice-card","--spice-play-button","--spice-progress-fg",
                "--vg-icon-t1","--vg-icon-t3","--vg-radius-sm","--vg-radius-md","--vg-radius-lg",
                "--encore-border-radius-rounded","--encore-graphic-size-decorative-smaller",
                "--encore-graphic-size-decorative-base","--encore-text-body-medium-font-size",
              ];
              el.innerHTML = "<b style='color:#00ff88;font-size:12px'>🎨 CSS Variables (" + vars.filter(v=>cs.getPropertyValue(v).trim()).length + "/" + vars.length + ")</b><hr style='border-color:rgba(0,255,136,0.15);margin:6px 0'>" + vars.map(v => {
                const val = cs.getPropertyValue(v).trim();
                if (!val) return "";
                const isColor = val.startsWith("#") || val.startsWith("rgb");
                const swatch = isColor ? `<span style="display:inline-block;width:10px;height:10px;background:${val};border-radius:2px;margin-right:4px;border:1px solid rgba(255,255,255,0.2)"></span>` : "";
                const shortName = v.replace("--spice-","").replace("--vg-","vg:").replace("--encore-","enc:");
                return `<span style="color:#555">${shortName}</span> ${swatch}<span style="color:${isColor ? '#aaa' : '#666'}">${val}</span>`;
              }).filter(Boolean).join("<br>");
            }, 1500);
            p.dataset.tid = tid;
            setTimeout(() => Spicetify.showNotification("CSS Variable Monitor active ✓"), 1600);
          }
        } else {
          const el = document.getElementById(panelId);
          if (el) { clearInterval(parseInt(el.dataset.tid)); el.remove(); }
        }
        break;
      }

      // dev: DOM mutation logger -> console
      case "snippet-dev-dom-logger": {
        if (value === "true" || value === true) {
          if (!window._vgMutObs) {
            window._vgMutObs = new MutationObserver(muts => {
              muts.forEach(m => {
                if (m.type === "childList") {
                  m.addedNodes.forEach(n => { if (n.nodeType === 1) console.log("%c[VG:DOM+]", "color:#0f0;font-weight:bold", n.tagName, n.id ? "#"+n.id : "", n.className ? "."+String(n.className).substring(0,60) : "", n.getAttribute && n.getAttribute("data-testid") ? "[testid="+n.getAttribute("data-testid")+"]" : ""); });
                  m.removedNodes.forEach(n => { if (n.nodeType === 1) console.log("%c[VG:DOM-]", "color:#f44;font-weight:bold", n.tagName, n.id ? "#"+n.id : "", n.className ? "."+String(n.className).substring(0,60) : ""); });
                } else if (m.type === "attributes") {
                  console.log("%c[VG:ATTR]", "color:#ff0;font-weight:bold", m.target.tagName, m.attributeName + "=" + (m.target.getAttribute(m.attributeName) || "").substring(0,50));
                }
              });
            });
            window._vgMutObs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class","style","data-testid","aria-label"] });
            console.log("%c[VG] DOM Mutation Logger started - watching childList + attributes", "color:#0f0;font-weight:bold");
            Spicetify.showNotification("DOM Logger active → check DevTools console");
          }
        } else {
          if (window._vgMutObs) { window._vgMutObs.disconnect(); window._vgMutObs = null; console.log("%c[VG] DOM Mutation Logger stopped", "color:#f44;font-weight:bold"); Spicetify.showNotification("DOM Logger stopped"); }
        }
        break;
      }

      // dev: encore/testid/aria audit -> downloads .txt
      case "snippet-dev-encore-audit": {
        if (value === "true" || value === true) {
          // self-disable to prevent re-trigger loop
          Spicetify.LocalStorage.set("vantagraph:snippet-dev-encore-audit", "false");
          try {
            const lines = [];
            lines.push("═══ VANTAGRAPH ENCORE AUDIT ═══");
            lines.push("Date: " + new Date().toISOString());
            lines.push("Page: " + location.pathname);
            lines.push("");

            const icons = document.querySelectorAll('[data-encore-id="icon"]');
            const stats = {};
            icons.forEach(ic => { try { const cs = getComputedStyle(ic); stats[cs.width + " × " + cs.height] = (stats[cs.width + " × " + cs.height] || 0) + 1; } catch(e){} });
            lines.push("── ENCORE ICONS (" + icons.length + ") ──");
            Object.entries(stats).forEach(([k,v]) => lines.push("  " + k + " → " + v + "x"));

            lines.push("");
            const btns = document.querySelectorAll('[data-encore-id]');
            const btnStats = {};
            btns.forEach(b => { const t = b.getAttribute("data-encore-id"); btnStats[t] = (btnStats[t] || 0) + 1; });
            lines.push("── ENCORE COMPONENTS (" + btns.length + ") ──");
            Object.entries(btnStats).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => lines.push("  " + k + " → " + v + "x"));

            lines.push("");
            const testIds = new Set();
            document.querySelectorAll("[data-testid]").forEach(el => testIds.add(el.getAttribute("data-testid")));
            lines.push("── DATA-TESTID ELEMENTS (" + testIds.size + ") ──");
            [...testIds].sort().forEach(id => lines.push("  " + id));

            lines.push("");
            const ariaSet = new Set();
            document.querySelectorAll("button[aria-label],a[aria-label],[role='button'][aria-label]").forEach(el => {
              ariaSet.add(el.tagName + " | " + el.getAttribute("aria-label"));
            });
            lines.push("── ARIA-LABEL BUTTONS (" + ariaSet.size + ") ──");
            [...ariaSet].sort().forEach(a => lines.push("  " + a));

            lines.push("");
            lines.push("── CSS VARIABLES ──");
            const cs = getComputedStyle(document.documentElement);
            const allProps = Array.from(document.styleSheets).reduce((acc, sheet) => {
              try { Array.from(sheet.cssRules).forEach(r => { if (r.style) { for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; if (p.startsWith("--")) acc.add(p); } } }); } catch(e) {}
              return acc;
            }, new Set());
            [...allProps].sort().forEach(v => {
              const val = cs.getPropertyValue(v).trim();
              if (val) lines.push("  " + v + ": " + val);
            });

            lines.push("");
            lines.push("── ACTIVE STYLE TAGS ──");
            document.querySelectorAll("style[id]").forEach(s => lines.push("  #" + s.id + " (" + s.textContent.length + " chars)"));

            const blob = new Blob([lines.join("\\n")], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "vantagraph-encore-audit.txt";
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            Spicetify.showNotification("Encore audit → txt downloaded ✓");
          } catch(e) {
            Spicetify.showNotification("Audit error: " + e.message);
          }
        }
        break;
      }
    }
  }

  // ALBUM COVER BG
  // try metadata paths first, fall back to DOM cover img
  function getAlbumCoverUrl() {
    let url = Spicetify?.Player?.data?.item?.metadata?.image_url
           || Spicetify?.Player?.data?.item?.metadata?.image_xlarge_url
           || Spicetify?.Player?.data?.item?.metadata?.image_large_url
           || Spicetify?.Player?.data?.track?.metadata?.image_url
           || Spicetify?.Player?.data?.track?.metadata?.image_xlarge_url;
    if (!url) {
      const coverImg = document.querySelector('[data-testid="cover-art-image"]')
                    || document.querySelector('.main-nowPlayingWidget-coverArt img')
                    || document.querySelector('.cover-art img');
      if (coverImg?.src) url = coverImg.src;
    }
    if (!url) return null;
    url = url.replace("spotify:image:", "https://i.scdn.co/image/");
    return url;
  }

  let _bgRetryCount = 0;
  function updateAlbumCoverBackground() {
    const useAlbum = getSetting("bg-use-album-cover", "false");
    if (useAlbum !== "true") return;

    const albumUrl = getAlbumCoverUrl();
    // retry up to 5x: metadata may not be ready
    if (!albumUrl) {
      if (_bgRetryCount < 5) {
        _bgRetryCount++;
        setTimeout(updateAlbumCoverBackground, 300);
      }
      return;
    }
    _bgRetryCount = 0;

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
      document.body.prepend(bgEl);
    }

    bgEl.style.backgroundImage = `url("${albumUrl}")`;
    bgEl.style.filter = bgFilterValue();
    syncBgVars(albumUrl);
    document.documentElement.style.setProperty("--spice-main", "transparent");
    waitForElement(".vg-root", (el) => { el.style.background = "transparent"; });
    document.body.style.background = "transparent";
    document.body.classList.add("vg-bg-active");
  }

  function onSongChangeBackground() {
    const useAlbum = getSetting("bg-use-album-cover", "false");
    if (useAlbum !== "true") return;
    if (Spicetify?.Player?.data?.item?.provider === "ad") return;
    if (!Spicetify?.Player?.data?.item) {
      setTimeout(onSongChangeBackground, 200);
      return;
    }
    updateAlbumCoverBackground();
  }

  // VINYL SPIN
  function setupVinylSpin() {
    function updateSpin() {
      waitForElement(".vg-np-cover img, .vg-np-cover-collapsed img", (img) => {
        let isPlaying = false; try { isPlaying = Spicetify.Player.isPlaying(); } catch(e) {}
        if (!img.style.animationName) {
          img.style.animation = "vg-vinyl-spin 8s linear infinite";
          img.style.borderRadius = "50%";
        }
        // only flip the play state; re-assigning `animation` restarted the
        // rotation and repainted the cover on every resume
        img.style.animationPlayState = isPlaying ? "running" : "paused";
      });
    }

    Spicetify.Player.addEventListener("onplaypause", updateSpin);
    Spicetify.Player.addEventListener("songchange", () => {
      setTimeout(updateSpin, 300);
    });
    updateSpin();
  }

  // NEXT TRACK CARD
  function injectNextTrackCSS() {
    if (document.getElementById("vg-next-track-css")) return;
    const s = document.createElement("style");
    s.id = "vg-next-track-css";
    s.textContent = `
.vg-next-track-card{position:fixed;bottom:72px;left:50%;transform:translateX(-50%);z-index:2;min-width:260px;max-width:460px;height:48px;pointer-events:auto;background:var(--spice-player, var(--spice-playbar));border:1px solid var(--spice-stroke, var(--spice-highlight));border-bottom:none;border-radius:16px 16px 0 0;opacity:0;visibility:hidden;transition:opacity .4s cubic-bezier(.4,0,.2,1),visibility .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1);transform:translateX(-50%) translateY(5px);box-shadow:0 -4px 16px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.06);overflow:hidden;}
.vg-next-track-card.vg-ntc-visible{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}
.vg-ntc-inner{display:flex;align-items:center;gap:10px;padding:6px 18px 6px 6px;height:100%;position:relative;white-space:nowrap;overflow:hidden;}
.vg-ntc-inner::after{content:"";position:absolute;top:0;left:14px;right:14px;height:2px;background:linear-gradient(90deg,transparent 0%,var(--spice-accent) 50%,transparent 100%);opacity:.7;pointer-events:none;z-index:1;}
.vg-next-track-card::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.12) 30%,rgba(255,255,255,.12) 70%,transparent 100%);pointer-events:none;z-index:2;}
.vg-next-track-card::after{display:none;}
.vg-ntc-cover{width:34px;height:34px;min-width:34px;border-radius:8px;object-fit:cover;background:var(--spice-panel, var(--spice-main));margin-left:3px;}
.vg-ntc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--spice-accent);opacity:.9;flex-shrink:0;}
.vg-ntc-sep{font-size:12px;color:var(--spice-subtext);opacity:.4;flex-shrink:0;}
.vg-ntc-text{font-size:13px;color:var(--spice-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}
.vg-ntc-artist-text{color:var(--spice-subtext);font-weight:400;}
.vg-ntc-title-text{color:var(--spice-text);font-weight:500;}
.vg-ntc-sep-text{color:var(--spice-subtext);font-weight:400;}
.vg-ntc-text.vg-ntc-fade-out{opacity:0;transition:opacity .2s ease;}
.vg-ntc-text.vg-ntc-fade-in{opacity:1;transition:opacity .3s ease;}
@media(max-width:900px){.vg-next-track-card{max-width:320px;min-width:180px;}}
@media(max-width:600px){.vg-next-track-card{display:none !important;}}`;
    document.head.appendChild(s);
  }

  // resolve cover img: images[] first, then metadata fallback
  function ntGetImageUrl(item) {
    if (!item) return null;
    const imgs = item.images;
    if (imgs && imgs.length > 0) {
      return (imgs[3] && imgs[3].url) || (imgs[2] && imgs[2].url) || (imgs[1] && imgs[1].url) || (imgs[0] && imgs[0].url) || null;
    }
    const meta = item.metadata;
    if (meta) {
      const metaImg = meta.image_url || meta.image_xlarge_url || meta.image_large_url || meta.image_small_url || null;
      if (metaImg) return metaImg.replace("spotify:image:", "https://i.scdn.co/image/");
    }
    return null;
  }

  // pull next track from nextItems, fall back to queue
  function getNextTrackData() {
    try {
      const data = Spicetify.Player.data;
      if (!data) return null;
      const nextItems = data.nextItems;
      if (nextItems && nextItems.length > 0) {
        const next = nextItems[0];
        if (!next) return null;
        const meta = next.metadata || {};
        const title = meta.title || next.name || "";
        let artist = meta.artist_name || "";
        if (!artist && next.artists && next.artists.length > 0) {
          artist = next.artists.map(a => a.name).join(", ");
        }
        if (!title) return null;
        return { title, artist, img: ntGetImageUrl(next) };
      }
      if (data.queue && data.queue.nextTracks && data.queue.nextTracks.length > 0) {
        const qNext = data.queue.nextTracks[0];
        const qMeta = qNext.metadata || {};
        const qTitle = qMeta.title || qNext.name || "";
        const qArtist = qMeta.artist_name || "";
        if (!qTitle) return null;
        return { title: qTitle, artist: qArtist, img: ntGetImageUrl(qNext) };
      }
      return null;
    } catch (e) { return null; }
  }

  let ntCard = null, ntCover = null, ntText = null, ntArtist = null, ntSep = null, ntTitle = null;
  let ntLastTitle = "", ntLastArtist = "";

  function ntUpdateCard() {
    if (!ntCard) return;
    const data = getNextTrackData();
    if (!data) { ntCard.classList.remove("vg-ntc-visible"); return; }
    const changed = (data.title !== ntLastTitle || data.artist !== ntLastArtist);
    ntLastTitle = data.title; ntLastArtist = data.artist;
    if (data.img && ntCover) { if (ntCover.src !== data.img) ntCover.src = data.img; ntCover.style.display = ""; }
    else if (ntCover) { ntCover.style.display = "none"; }
    if (changed && ntText) {
      ntText.classList.add("vg-ntc-fade-out");
      setTimeout(() => {
        if (data.artist) { ntArtist.textContent = data.artist; ntSep.textContent = " - "; ntTitle.textContent = data.title; ntArtist.style.display = ""; ntSep.style.display = ""; }
        else { ntArtist.textContent = ""; ntSep.textContent = ""; ntTitle.textContent = data.title; ntArtist.style.display = "none"; ntSep.style.display = "none"; }
        ntText.classList.remove("vg-ntc-fade-out"); ntText.classList.add("vg-ntc-fade-in");
        setTimeout(() => ntText.classList.remove("vg-ntc-fade-in"), 300);
      }, 200);
    } else if (ntText) {
      if (data.artist) { ntArtist.textContent = data.artist; ntSep.textContent = " - "; ntTitle.textContent = data.title; ntArtist.style.display = ""; ntSep.style.display = ""; }
      else { ntArtist.textContent = ""; ntSep.textContent = ""; ntTitle.textContent = data.title; ntArtist.style.display = "none"; ntSep.style.display = "none"; }
    }
    ntCard.classList.add("vg-ntc-visible");
  }

  // keep card as immediate sibling after player bar
  function ntEnsurePosition(card) {
    const playerBar = document.querySelector(".Root__now-playing-bar") || document.querySelector(".vg-now-playing-bar");
    if (playerBar) {
      if (card.previousElementSibling !== playerBar) {
        playerBar.after(card);
      }
    }
  }

  function ntInjectCard() {
    if (document.getElementById("vg-next-track-card")) {
      ntCard = document.getElementById("vg-next-track-card");
      ntCover = ntCard.querySelector(".vg-ntc-cover"); ntText = ntCard.querySelector(".vg-ntc-text");
      ntArtist = ntCard.querySelector(".vg-ntc-artist-text"); ntSep = ntCard.querySelector(".vg-ntc-sep-text"); ntTitle = ntCard.querySelector(".vg-ntc-title-text");
      ntEnsurePosition(ntCard);
      ntSyncBottom();
      ntUpdateCard(); return;
    }
    ntCard = document.createElement("div"); ntCard.id = "vg-next-track-card"; ntCard.className = "vg-next-track-card";
    const inner = document.createElement("div"); inner.className = "vg-ntc-inner";
    ntCover = document.createElement("img"); ntCover.className = "vg-ntc-cover"; ntCover.alt = ""; ntCover.draggable = false;
    const label = document.createElement("span"); label.className = "vg-ntc-label"; label.textContent = "NEXT";
    const sep = document.createElement("span"); sep.className = "vg-ntc-sep"; sep.textContent = "›";
    ntText = document.createElement("span"); ntText.className = "vg-ntc-text";
    ntArtist = document.createElement("span"); ntArtist.className = "vg-ntc-artist-text";
    ntSep = document.createElement("span"); ntSep.className = "vg-ntc-sep-text";
    ntTitle = document.createElement("span"); ntTitle.className = "vg-ntc-title-text";
    ntText.appendChild(ntArtist); ntText.appendChild(ntSep); ntText.appendChild(ntTitle);
    inner.appendChild(ntCover); inner.appendChild(label); inner.appendChild(sep); inner.appendChild(ntText);
    ntCard.appendChild(inner);
    // insert after player bar; body fallback if not yet rendered
    const playerBar = document.querySelector(".Root__now-playing-bar") || document.querySelector(".vg-now-playing-bar");
    if (playerBar) {
      playerBar.after(ntCard);
    } else {
      document.body.appendChild(ntCard);
    }
    ntSyncBottom();
    setTimeout(ntUpdateCard, 500);
    // retry positioning: player bar may load late
    setTimeout(() => ntEnsurePosition(ntCard), 1000);
    setTimeout(() => ntEnsurePosition(ntCard), 3000);
    setTimeout(() => ntEnsurePosition(ntCard), 6000);
  }

  // anchor card to player bar's top edge
  function ntSyncBottom() {
    if (!ntCard) return;
    const bar = document.querySelector(".Root__now-playing-bar") ||
                document.querySelector("footer");
    if (!bar) { ntCard.style.bottom = "72px"; return; }
    const sync = () => {
      const top = bar.getBoundingClientRect().top;
      ntCard.style.bottom = Math.ceil(window.innerHeight - top) + "px";
    };
    sync();
    requestAnimationFrame(sync);
  }

  // re-inject card if React unmounts it
  let ntObserver = null, ntDebounce = null;
  function ntSetupObserver() {
    if (ntObserver) return;
    ntObserver = new MutationObserver(() => {
      if (ntDebounce) clearTimeout(ntDebounce);
      ntDebounce = setTimeout(() => { if (!document.getElementById("vg-next-track-card")) ntInjectCard(); }, 500);
    });
    const target = document.querySelector(".vg-now-playing");
    if (target) ntObserver.observe(target, { childList: true });
  }

  function initNextTrack() {
    injectNextTrackCSS();
    ntInjectCard();
    Spicetify.Player.addEventListener("songchange", () => { ntSyncBottom(); setTimeout(ntUpdateCard, 400); if (!document.getElementById("vg-next-track-card")) ntInjectCard(); });
    Spicetify.Player.addEventListener("onplaypause", () => setTimeout(ntUpdateCard, 300));
    try {
      const pAPI = Spicetify.Platform.PlayerAPI;
      if (pAPI && pAPI._queue && pAPI._queue._events && pAPI._queue._events.addListener) {
        pAPI._queue._events.addListener("queue_update", () => setTimeout(ntUpdateCard, 400));
      }
    } catch (e) {}
    try { Spicetify.Platform.History.listen(() => { setTimeout(() => { if (!document.getElementById("vg-next-track-card")) ntInjectCard(); else ntUpdateCard(); }, 600); }); } catch (e) {}
    ntSetupObserver();
    // progressive re-syncs for slow startup
    setTimeout(ntSyncBottom, 1000);
    setTimeout(ntSyncBottom, 3000);
    setTimeout(ntSyncBottom, 6000);
    setTimeout(ntSyncBottom, 10000);
    window.addEventListener("resize", () => ntSyncBottom());
  }

  // WAVE ANIMATION
  function injectWaveCSS() {
    if (document.getElementById("vg-wave-css")) return;
    const s = document.createElement("style"); s.id = "vg-wave-css";
    s.textContent = `.vg-wave-container{display:flex !important;align-items:flex-end !important;justify-content:center !important;gap:2px !important;height:25px !important;padding-top:0px !important;padding-bottom:0px !important;padding-left:0px !important;padding-right:20px !important;flex-shrink:0 !important;transition:opacity 2s ease;overflow:hidden !important;clip-path:inset(0) !important;contain:layout paint !important;box-sizing:border-box !important;width:75px !important;margin-right:auto !important;}
.vg-wave-bar{width:3px;border-radius:1.5px 1.5px 0 0;background:var(--spice-accent);will-change:height;transition:height .15s cubic-bezier(.4,0,.2,1);min-height:0;flex-shrink:0;}`;
    document.head.appendChild(s);
  }

  const WAVE_BARS = 13, WAVE_MID = Math.floor(WAVE_BARS / 2), WAVE_MIN_H = 3;
  const WAVE_MAX_H = [];
  for (let i = 0; i < WAVE_BARS; i++) { WAVE_MAX_H[i] = 100 - (Math.abs(i - WAVE_MID) / WAVE_MID) * 40; }

  // zone: bass 0-3, mid 4-8, treble 9-12
  const WAVE_BAR_ZONE = [];
  for (let i = 0; i < WAVE_BARS; i++) {
    if (i <= 3) WAVE_BAR_ZONE[i] = "bass";
    else if (i <= 8) WAVE_BAR_ZONE[i] = "mid";
    else WAVE_BAR_ZONE[i] = "treble";
  }

  let waveEl = null, waveBars = [], waveInjected = false, waveRafId = null;
  let waveAmplitude = 1, waveFadeTimer = null, waveFadingOut = false;
  let waveProgressPoller = null, waveListenersRegistered = false;

  // audio analysis state (loudness + timbre per segment)
  let waveSegments = null;
  let waveFallbackMode = false;

  const waveBarTargets = new Array(WAVE_BARS).fill(WAVE_MIN_H);
  const waveBarSpeeds = [];
  for (let i = 0; i < WAVE_BARS; i++) { waveBarSpeeds[i] = 150 + Math.random() * 300; }
  const waveBarTimers = new Array(WAVE_BARS).fill(0);

  function waveGetVolume() { try { const v = Spicetify.Player.getVolume(); return typeof v === "number" ? v : 1; } catch (e) { return 1; } }

  // fetch audio analysis: loudness + timbre
  async function waveFetchAnalysis() {
    waveSegments = null;
    waveFallbackMode = false;
    try {
      const uri = Spicetify.Player.data?.item?.uri;
      if (!uri) { waveFallbackMode = true; return; }
      const id = uri.split(":").pop();
      const analysis = await Spicetify.CosmosAsync.get(
        `https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${id}?format=json`
      );
      if (analysis?.segments?.length > 0) {
        const s0 = analysis.segments[0];
        if (typeof s0.start === "number" && typeof s0.loudness_max === "number") {
          waveSegments = analysis.segments;
        } else {
          waveFallbackMode = true;
        }
      } else {
        waveFallbackMode = true;
      }
    } catch (e) {
      waveFallbackMode = true;
    }
  }

  // binary-search current segment, interp loudness curve, derive bass/mid/treble from timbre
  function waveGetSegmentAtProgress() {
    if (!waveSegments || waveSegments.length === 0) return null;
    try {
      const progressSec = Spicetify.Player.getProgress() / 1000;
      let lo = 0, hi = waveSegments.length - 1, seg = waveSegments[0];
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (waveSegments[mid].start <= progressSec) { seg = waveSegments[mid]; lo = mid + 1; }
        else { hi = mid - 1; }
      }
      const lStart = typeof seg.loudness_start === "number" ? seg.loudness_start : -20;
      const lMax = typeof seg.loudness_max === "number" ? seg.loudness_max : -10;
      const lEnd = typeof seg.loudness_end === "number" ? seg.loudness_end : lStart;
      const dur = seg.duration || 0.5;
      const maxTime = seg.loudness_max_time || (dur * 0.3);

      const elapsed = progressSec - seg.start;
      let loudnessDb;
      if (elapsed < maxTime) {
        const t = maxTime > 0 ? elapsed / maxTime : 0;
        loudnessDb = lStart + t * (lMax - lStart);
      } else {
        const remaining = dur - maxTime;
        const t = remaining > 0 ? (elapsed - maxTime) / remaining : 1;
        loudnessDb = lMax + t * (lEnd - lMax);
      }

      if (isNaN(loudnessDb)) loudnessDb = -15;
      const amplitude = Math.max(0, Math.min(1, Math.pow(10, loudnessDb / 20)));
      if (isNaN(amplitude)) return null;

      const timbre = seg.timbre || [];
      const brightness = timbre.length > 1 ? timbre[1] : 0;
      const normBright = Math.max(-1, Math.min(1, brightness / 150));

      const bass = amplitude * Math.max(0.2, 1 - normBright * 0.8);
      const treble = amplitude * Math.max(0.2, 1 + normBright * 0.8);
      const mid = amplitude * (1 - Math.abs(normBright) * 0.5);

      return { amplitude, bass, mid, treble };
    } catch (e) { return null; }
  }

  // RAF loop: real audio data when available, randomized fallback otherwise
  let waveLastFrame = 0;
  function waveLoop(ts) {
    if (!waveLastFrame) waveLastFrame = ts;
    const dt = ts - waveLastFrame; waveLastFrame = ts;
    const vol = waveGetVolume(), amp = waveAmplitude * vol;

    const segData = (!waveFallbackMode) ? waveGetSegmentAtProgress() : null;
    const useReal = segData !== null;

    for (let i = 0; i < WAVE_BARS; i++) {
      waveBarTimers[i] += dt;
      if (waveBarTimers[i] >= waveBarSpeeds[i]) {
        waveBarTimers[i] = 0;
        const bellCurve = WAVE_MAX_H[i] / 100;
        let barHeight;
        if (useReal) {
          const zone = WAVE_BAR_ZONE[i];
          const energy = zone === "bass" ? segData.bass : zone === "treble" ? segData.treble : segData.mid;
          const variation = 0.75 + Math.random() * 0.5;
          barHeight = WAVE_MIN_H + energy * bellCurve * variation * amp * (100 - WAVE_MIN_H);
        } else {
          const maxH = WAVE_MAX_H[i] * amp;
          barHeight = maxH <= WAVE_MIN_H ? WAVE_MIN_H : WAVE_MIN_H + Math.random() * (maxH - WAVE_MIN_H);
        }
        waveBarTargets[i] = Math.max(WAVE_MIN_H, Math.min(100, barHeight));
        waveBarSpeeds[i] = useReal ? (80 + Math.random() * 120) : (150 + Math.random() * 300);
      }
      if (waveBars[i]) waveBars[i].style.height = waveBarTargets[i] + "%";
    }
    waveRafId = requestAnimationFrame(waveLoop);
  }

  function waveStart() { waveStop(); waveLastFrame = 0; waveRafId = requestAnimationFrame(waveLoop); }
  function waveStop() { if (waveRafId) { cancelAnimationFrame(waveRafId); waveRafId = null; } }
  function waveShow() { if (waveEl) waveEl.style.opacity = "1"; }
  function waveHide() { if (waveEl) waveEl.style.opacity = "0"; }
  function waveResetBars() {
    for (let i = 0; i < WAVE_BARS; i++) { waveBarTargets[i] = WAVE_MIN_H; waveBarTimers[i] = 0; if (waveBars[i]) waveBars[i].style.height = WAVE_MIN_H + "%"; }
  }
  function waveInstantStart() { waveAmplitude = 1; waveShow(); waveStart(); }
  function waveInstantStop() { waveStop(); if (waveFadeTimer) { clearInterval(waveFadeTimer); waveFadeTimer = null; } waveResetBars(); waveHide(); }
  function waveFadeIn() {
    if (waveFadeTimer) clearInterval(waveFadeTimer);
    waveAmplitude = 0.05; waveShow(); waveStart();
    waveFadeTimer = setInterval(() => { waveAmplitude = Math.min(1, waveAmplitude + (1 / 30)); if (waveAmplitude >= 1) { clearInterval(waveFadeTimer); waveFadeTimer = null; } }, 100);
  }
  function waveFadeOut() {
    if (waveFadeTimer) clearInterval(waveFadeTimer);
    waveFadeTimer = setInterval(() => { waveAmplitude = Math.max(0, waveAmplitude - 0.05); if (waveAmplitude <= 0) { clearInterval(waveFadeTimer); waveFadeTimer = null; waveResetBars(); waveHide(); waveStop(); } }, 100);
  }
  // poll progress: trigger fade-out near end of track (97%)
  function waveStartProgressPoll() {
    if (waveProgressPoller) clearInterval(waveProgressPoller);
    waveFadingOut = false;
    waveProgressPoller = setInterval(() => {
      try {
        if (!Spicetify.Player.isPlaying()) return;
        const pct = Spicetify.Player.getProgress() / Spicetify.Player.getDuration();
        if (pct >= 0.97 && !waveFadingOut) { waveFadingOut = true; waveFadeOut(); }
      } catch (e) {}
    }, 500);
  }
  function waveStopProgressPoll() { if (waveProgressPoller) { clearInterval(waveProgressPoller); waveProgressPoller = null; } }

  // played-tracks set: fade-in only on first play, instant on replay (capped at 200)
  const wavePlayedTracks = new Set();

  function waveOnPlayPause() {
    if (Spicetify.Player.isPlaying()) { waveInstantStart(); waveStartProgressPoll(); }
    else { waveInstantStop(); waveStopProgressPoll(); }
  }
  function waveOnSongChange() {
    waveStop(); waveStopProgressPoll();
    if (waveFadeTimer) { clearInterval(waveFadeTimer); waveFadeTimer = null; }
    waveFadingOut = false; waveAmplitude = 0; waveResetBars(); waveHide();
    waveFetchAnalysis();
    let trackUri = ""; try { trackUri = Spicetify.Player.data?.item?.uri || ""; } catch (e) {}
    setTimeout(() => {
      if (!Spicetify.Player.isPlaying()) return;
      if (trackUri && !wavePlayedTracks.has(trackUri)) {
        if (wavePlayedTracks.size >= 200) wavePlayedTracks.clear();
        wavePlayedTracks.add(trackUri); waveFadeIn();
      } else { waveInstantStart(); }
      waveStartProgressPoll();
    }, 300);
  }

  // build bars + insert into playback-bar (idempotent on re-injection)
  function injectWaveAnimation() {
    waitForElement(".vg-playback-bar", (playbackBar) => {
      if (waveInjected && waveEl && waveEl.parentNode) {
        if (Spicetify.Player.isPlaying()) { waveInstantStart(); waveStartProgressPoll(); }
        return;
      }
      waveEl = document.createElement("div"); waveEl.className = "vg-wave-container";
      waveBars = [];
      for (let i = 0; i < WAVE_BARS; i++) {
        const bar = document.createElement("div"); bar.className = "vg-wave-bar"; bar.style.height = WAVE_MIN_H + "%";
        waveEl.appendChild(bar); waveBars.push(bar);
      }
      playbackBar.insertBefore(waveEl, playbackBar.firstChild); waveInjected = true;
      let _isPlaying = false; try { _isPlaying = Spicetify.Player.isPlaying(); } catch(e) {}
      if (_isPlaying) { waveFetchAnalysis(); waveAmplitude = 1; waveShow(); waveStart(); waveStartProgressPoll(); }
      else { waveHide(); }
      if (!waveListenersRegistered) {
        Spicetify.Player.addEventListener("onplaypause", waveOnPlayPause);
        Spicetify.Player.addEventListener("songchange", waveOnSongChange);
        waveListenersRegistered = true;
      }
    });
  }

  // re-inject on route change (React unmounts playback-bar)
  function initWave() {
    injectWaveCSS();
    injectWaveAnimation();
    if (Spicetify.Platform && Spicetify.Platform.History) {
      Spicetify.Platform.History.listen(() => { setTimeout(() => { if (!waveEl || !waveEl.parentNode) { waveInjected = false; injectWaveAnimation(); } }, 500); });
    }
  }

  // EXPORTS (consumed by extensions via window.VantagraphData)
  window.VantagraphData = {
    THEMES,
    LIGHT_THEMES,
    FONT_PRESETS,
    applyTheme,
    applyFont,
    applySetting,
    getSetting,
    waitForElement,
    applyDynamicClasses,
    startDynamicClassObserver
  };

  // INIT
  // Spicetify 2.45.x wrapper bug: its scroll optimizer (meant for Spotify <= 1.2.56)
  // guards with `minor >= 2 && patch >= 57`, which fails on 1.3.x since patch resets
  // to 0, so it runs getComputedStyle over every element on every DOM mutation.
  // That optimizer is the only caller of this exact selector; answer it with nothing.
  // Inert once upstream fixes the guard (the selector is never queried).
  // Opt out: Spicetify.LocalStorage.set("vantagraph:wrapper-guard", "false")
  function installWrapperScrollGuard(attempts = 100) {
    if (getSetting("wrapper-guard", "true") === "false") return;
    // Platform.version lands a bit after Platform itself
    if (!Spicetify.Platform?.version) {
      if (attempts > 0) setTimeout(() => installWrapperScrollGuard(attempts - 1), 50);
      return;
    }
    const v = Spicetify.Platform.version.split(".").map(n => parseInt(n, 10));
    if (!(v[0] > 1 || (v[0] === 1 && v[1] >= 3))) return;
    const SCROLL_FIX_SELECTOR = "*:not([data-scroll-optimized])";
    const nativeQSA = Document.prototype.querySelectorAll;
    document.querySelectorAll = function (selector, ...rest) {
      if (selector === SCROLL_FIX_SELECTOR) return [];
      return nativeQSA.call(this, selector, ...rest);
    };
    // undo the layer promotion it already applied before theme.js ran
    nativeQSA.call(document, "[data-scroll-optimized]").forEach((el) => {
      el.style.willChange = "";
      el.style.transform = "";
    });
  }

  function init() {
    // 0. wrapper guard, then dynamic class mapping
    installWrapperScrollGuard();
    startDynamicClassObserver();

    // 1. theme
    const savedTheme = Spicetify.LocalStorage.get("vantagraph:theme") || "Spotify Default";
    applyTheme(savedTheme);

    // 2. font (preset > custom > saved)
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

    // 3. settings
    const savedFontSize = getSetting("font-size", "");
    if (savedFontSize) applySetting("font-size", savedFontSize);
    const savedIconSize = getSetting("icon-size", "");
    if (savedIconSize) applySetting("icon-size", savedIconSize);
    const savedDensity = getSetting("density", "default");
    applySetting("density", savedDensity);
    const savedRadius = getSetting("border-radius", "");
    if (savedRadius) applySetting("border-radius", savedRadius);
    
    // album cover BG takes priority over custom URL; both auto-apply Glass + vg-bg-active
    const savedBgUrl = getSetting("bg-url", "");
    const savedAlbumCover = getSetting("bg-use-album-cover", "false");
    if (savedAlbumCover === "true") {
      applySetting("bg-use-album-cover", "true");
    } else if (savedBgUrl) {
      applySetting("bg-url", savedBgUrl);
    }

    // 4. vinyl spin
    setupVinylSpin();

    // 5. next track card + wave
    initNextTrack();
    initWave();

    // 6. snippets: rounded-images & scrollbar default ON; rest default OFF
    const riState = getSetting("snippet-rounded-images", "true");
    if (riState === "false") applySetting("snippet-rounded-images", "false");
    const msState = getSetting("snippet-modern-scrollbar", "true");
    applySetting("snippet-modern-scrollbar", msState);
    const defaultOffSnippets = [
      "snippet-hide-ads-banner",
      "snippet-hide-friend-activity", "snippet-hide-whats-new", "snippet-hide-fullscreen",
      "snippet-hide-lyrics-btn", "snippet-hide-miniplayer", "snippet-hide-queue-btn",
      "snippet-hide-shuffle", "snippet-hide-repeat", "snippet-hide-connect",
      "snippet-hide-volume", "snippet-hide-np-widget", "snippet-hide-next-track", "snippet-hide-podcasts",
      "snippet-hide-promo-card", "snippet-hide-mood-recs",
      "snippet-hide-made-for-you", "snippet-hide-recents", "snippet-hide-top-mixes",
      "snippet-hide-jump-back", "snippet-hide-rec-stations", "snippet-hide-new-releases",
      "snippet-hide-best-artists", "snippet-hide-fav-artists", "snippet-hide-rec-today",
      "snippet-hide-home-shortcuts", "snippet-thin-library", "snippet-auto-hide-sidebar",
      "debug-labels", "snippet-dev-layout-grid", "snippet-dev-highlighter",
      "snippet-dev-spacing-viz", "snippet-dev-var-monitor", "snippet-dev-dom-logger",
      "snippet-vinyl-stop", "snippet-reduced-motion",
    ];
    defaultOffSnippets.forEach(s => {
      const state = getSetting(s, "false");
      if (state === "true") applySetting(s, "true");
    });
    const savedAccent = getSetting("snippet-custom-accent", "");
    if (savedAccent) applySetting("snippet-custom-accent", savedAccent);

    // 7. album cover bg
    Spicetify.Player.addEventListener("songchange", onSongChangeBackground);
  }

  waitForSpicetify(init);
})();
