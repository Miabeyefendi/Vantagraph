// Vantagraph diagnostics: paste into Spotify DevTools (spicetify enable-devtools, then Ctrl+Shift+I > Console).
// Prints one JSON block to copy back. Reads only, changes nothing.
(() => {
  const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
  const q = (s) => document.querySelector(s);
  const names = ["Root__top-container", "Root__main-view", "Root__right-sidebar", "Root__now-playing-bar", "Root__nav-bar",
    "main-nowPlayingBar-container", "main-nowPlayingBar-nowPlayingBar", "main-nowPlayingBar-left", "main-nowPlayingBar-center",
    "main-nowPlayingBar-right", "main-nowPlayingBar-extraControls", "playback-bar", "main-actionButtons", "main-globalNav-historyButtons",
    "main-view-container", "main-card-card", "main-cardImage-image", "main-card-PlayButtonContainer", "main-trackList-trackListRow",
    "main-entityHeader-container", "main-yourLibraryX-library", "main-topBar-container", "main-userWidget-box"];
  const tag = (e) => e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (e.dataset && e.dataset.testid ? "[" + e.dataset.testid + "]" : "")
    + (e.classList.contains("vg-aliased") ? " alias" : " native") + " " + R(e).slice(2).join("x");
  const legacy = {};
  for (const n of names) { const els = [...document.getElementsByClassName(n)]; if (els.length) legacy[n] = els.slice(0, 4).map(tag); }
  let product = null;
  try { product = Spicetify.Platform.ProductStateAPI?.productStateApi?.getValues ? "see productState" : null; } catch (e) {}
  try { const ps = Spicetify.Platform?.UserAPI?._product_state_service?._cache || null; if (ps) product = JSON.stringify(ps).slice(0, 200); } catch (e) {}
  const out = {
    spotify: (navigator.userAgent.match(/Spotify\/[\d.]+/) || [""])[0],
    spicetify: Spicetify.Config?.version || null,
    platform: navigator.platform, window: [innerWidth, innerHeight, devicePixelRatio],
    theme: Spicetify.Config?.current_theme, scheme: Spicetify.Config?.color_scheme,
    themeData: !!(window.VantagraphData || window.VantagraphCustomData),
    marketplaceCSS: !!q("style.marketplaceUserCSS"), localCSS: !!q("link[href='user.css']"),
    product,
    geometry: {
      nav: R(q("#global-nav-bar")), left: R(q("#Desktop_LeftSidebar_Id")), main: R(q("#main-view")),
      right: R(q(".Root__right-sidebar > div:first-child")) || R(q("[data-testid='right-sidebar']")),
      bar: R(q("[data-testid='now-playing-bar']")), barInner: R(q("[data-testid='now-playing-bar'] > div")),
      controls: R(q("[data-testid='player-controls']")), play: R(q("[data-testid='control-button-playpause']")),
    },
    topRight: [...(q("#global-nav-bar")?.lastElementChild?.querySelectorAll("button, a") || [])].map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 24) + " " + R(b).join(",")),
    legacy,
  };
  console.log(JSON.stringify(out));
  return out;
})();
