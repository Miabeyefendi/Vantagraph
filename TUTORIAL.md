# How Vantagraph works underneath

[Back to the README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Install](./docs/INSTALL.md) · [Themes](./docs/THEMES.md) · [Settings](./docs/SETTINGS.md) · [Extensions](./docs/EXTENSIONS.md)

This page is for people editing the theme, forking it, or trying to work out why a colour is not doing what they told it to. If you only want to use Vantagraph, the [README](https://github.com/Miabeyefendi/Vantagraph#readme) and the four guides above cover everything.

---

## The three-layer colour system

Nothing about the palettes makes sense until this does. A colour travels through three layers before it reaches a pixel, and each layer can override the one before it.

```
color.ini                    human-readable keys: window, panel, menu, heart
    |
    |  SPICE_BRIDGE in theme.js translates the names
    v
:root inline --spice-*       written with root.style.setProperty
    |
    |  Spotify's own stylesheet consumes these
    v
Encore tokens                --background-base, --text-subdued, and the rest
    |
    v
the DOM
```

**Why the bridge exists.** `color.ini` uses names a person would choose: `window`, `panel`, `heart`. Spicetify and Spotify's Encore design system expect different names, and those names have changed more than once. Putting a translation table in the middle means a Spotify rename costs one line in `theme.js` instead of a rewrite of every palette.

### The bridge table

| `color.ini` key | Writes these `--spice-*` variables |
|---|---|
| `window` | `sidebar` |
| `panel` | `main` |
| `panel-hover` | `main-elevated`, `highlight-elevated` |
| `menu` | `card` |
| `player` | `playbar`, `player` |
| `stroke` | `highlight` |
| `btn-active` | `button-active` |
| `play-btn` | `play-button` |
| `play-btn-hover` | `play-button-active` |
| `bar-fill` | `progress-fg` |
| `bar-bg` | `progress-bg` |

`text`, `subtext`, `accent`, `tab-active` and `heart` have no bridge entry. They are written straight through as `--spice-<key>`.

### Where it breaks

Some Encore tokens are **hardcoded in Spotify's own stylesheet** and never read a `--spice-*` variable at all. `--essential-subdued`, `--decorative-subdued` and `--background-elevated-press` are the ones that come up most. No amount of editing `color.ini` will move them; they have to be overridden in `user.css`.

That is the single most common source of "I changed the colour and one button stayed grey".

### Finding out which layer won

`Extensions/vantagraph-debug.js` exists for exactly this. Paste it into DevTools or load it as an extension, and it prints four blocks for any CSS variable: the Encore default, the Spicetify override, the Vantagraph inline override, and anything anomalous. Re-run it with `_vgDebug()`.

Reaching DevTools inside Spotify is `Ctrl + Shift + I` once Spicetify has enabled it.

---

## File map

| File | What it is |
|---|---|
| `theme.js` | The engine. Class mapping, palettes, the bridge, every setting, the background system, the wave animation. |
| `user.css` | The stylesheet. Numbered sections following Spotify's DOM from the top bar down. |
| `color.ini` | The eleven palettes. The comment block at the top documents every key. |
| `manifest.json` | Marketplace metadata: name, description, preview image, readme path. |
| `icons/` | 66 source SVGs. |
| `Extensions/` | The seven extensions. |
| `Debug-Tools/` | Development scripts, not shipped to users. |

### Inside `theme.js`

Section headings rather than line numbers, because line numbers go stale the moment anyone edits the file. Search for these:

| Section | What lives there |
|---|---|
| `VG_CLASS_MAP` | Spotify's generated class names mapped to stable `vg-*` names |
| `applyDynamicClasses` | Applies that map, with a `MutationObserver` and a `requestAnimationFrame` debounce |
| `THEMES` | The palettes again, in JS |
| `SPICE_BRIDGE` | The translation table above |
| `FONT_PRESETS` | The nine bundled families |
| `applyTheme`, `applyFont`, `applyHeartColor` | The appliers |
| `applySetting` | One switch, every setting passes through it |
| `window.VantagraphData` | What the extensions are allowed to use |

**`THEMES` in `theme.js` and `color.ini` hold the same eleven palettes in two places.** They have to be kept in step by hand. If you add a palette, add it twice.

### Inside `user.css`

Sections are numbered and follow the DOM hierarchy: root, top, topbar, left sidebar, main, right sidebar, player, lyrics, context menu, misc, layout, colorist, focus, hover.

Within a section you will find the same three subheadings repeatedly:

- **normal** is the plain state
- **bg-active** is what applies when a background image is on, which turns the surfaces glassy
- **glass theme** is `body.vg-glass-theme`, the light palettes

---

## Adding a snippet

Four places, and missing the fourth is a silent bug.

1. `theme.js`, `applySetting`: add a `case` for the key, in the hide-snippet group.
2. `theme.js`, the `btnCss` object: add the CSS line.
3. `theme.js`, `defaultOffSnippets`: add the key. Being in that array means "off by default", so the element stays visible until someone turns the snippet on.
4. `vantagraph-settings.js`: add the toggle row to the right accordion, **and** add `vantagraph-<key>` to the `injectedIds` array used by the reset routine.

Skip step 4's second half and Reset to Defaults will not clear your snippet. Nothing will look broken; the setting will simply survive a reset that claims to remove everything.

---

## Problems already solved

Worth knowing about before you rediscover them.

**Flicker from `backdrop-filter` next to a rotating element.** A Chromium bug: a spinning element such as the vinyl causes black tearing on a neighbouring element carrying `backdrop-filter`. Moving the filter off the element and onto a `::before` pseudo-element isolates the blur from the parent's repaint cycle and fixes it. GPU hints such as `translateZ` and `backface-visibility` did nothing and were removed.

**The heart icon was always red.** Spotify stopped changing `aria-label` between liked and unliked. Anything keyed on the label coloured the icon whether or not the track was saved. The check is `aria-checked === "true"` now, in both `theme.js` and the CSS selectors. Playlist-level `save-library` and track-level `add-liked-16/24` are handled separately, since the first should stay accent-coloured always.

**The progress bar fill kept fading.** `opacity` on the parent cascades to every child, and the fill is a child. Replaced with an `rgba` variable, `--spice-progress-bg-alpha`, so only the background is transparent.

**Encore's internal colour classes ignore overrides.** `.encore-internal-color-text-subdued` computes its colour internally and skips the `--text-subdued` override. Because the Vantagraph icons use `mask-image` with `background: currentColor`, the visible colour follows the element's `color` property, so `color` has to be forced on the player and topbar buttons carrying that class.

**Spotify writes `fill: transparent` inline.** React applies inline styles to the like and save SVGs, and CSS alone cannot win against that. The observer inside `applyHeartColor()` overwrites it, debounced at 100ms to avoid a mutation loop.

---

## The icon system

`vantagraph-icons.js` swaps Spotify's Encore SVGs for data URIs from `icons/`. The registry is grouped by DOM region: topbar navigation, topbar search, topbar right, sidebar header, sidebar list, main action bar, universal, main misc, player controls, player right, right panel, context menu.

Two matching techniques, chosen per icon:

- **Selector-based**, when a stable `aria-label` or class exists.
- **Path fingerprint**, `svg:has(path[d^="..."])`, when it does not. No flicker, the browser paints it, and several paths can be chained with `|`.

Where CSS cannot distinguish two icons, which happens in context menus and with state variants, a JS path-matcher handles it. A `MutationObserver` plus a one-second full-body sweep catches state flips that only change an attribute.

Global hooks: `window.vantagraphIconsToggle(bool)` and `window.vantagraphIconsRemove()`.

**Do not reformat `icons/` or the registry's path data.** A prettifier that "cleans up" a path string breaks the fingerprint match, and the failure is silent: the icon simply stays as Spotify's.

---

## Testing a change

Edit, then `spicetify apply`, then Spotify restarts. Verify in DevTools.

Browser preview tooling is no help here, because this is an Electron application rather than a page you can load. If you need to confirm DOM behaviour, write a console snippet and run it inside Spotify.
