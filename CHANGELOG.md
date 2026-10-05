# Changelog

Every released version of Vantagraph, newest first. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Releases](https://github.com/Miabeyefendi/Vantagraph/releases)

---

## [5.1.0](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.1.0) - 2026-10-05

Spotify 1.3.3 support. Spotify re-hashed its class names and Spicetify's `css-map` does not know the new ones yet, so every rule
written against a name such as `main-card-card` or `Root__main-view` stopped reaching any element. Needs Spotify `1.3.3+` and
Spicetify `2.45.2+`. For Spotify 1.3.1 and older use the [outdated build](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.0.3-outdated).

### Added

- A compatibility layer in `theme.js`. 62 legacy class names and the three panel areas are given to the markup Spotify ships now, found through
  `data-testid`, roles, encore ids, structure and grid areas, so cards, shelves, track rows, the entity header, the player bar and
  the three panels are styled again. When Spicetify maps the names again both routes land on the same elements.
- Volume+ settings open from a right-click on the `%` button and from the quick volume panel. Spicetify menu items no longer
  show up in Spotify 1.3.3, so the profile menu entry alone left the window out of reach.
- The lyric miniplayer settings open in a Spotify modal. Spotify 1.3.3 answers `window.open` with `null`, so the separate window
  never appeared.
- A QA harness in `src/utils/qa/` that drives a real Spotify: pages, panels, every setting, the extensions, panel alignment and
  heart colours.

### Changed

- Home cards hide their play button with `visibility` instead of opacity alone, which keeps about 90 layers out of the
  compositor. Scrolling Home went from 73 to 136-182 fps in the test.
- The density setting, with and without a background image, keeps the left panel, the main view and the right panel on the same
  top and bottom edges.
- The lyrics highlight follows the accent colour through Spotify's lyrics colour variables.

### Fixed

- The liked heart was not red in the six light palettes: the light-theme icon rule outweighed the heart rule.
- Removing the background image left the Glass palette on. The palette that was active before comes back.
- The "Vantagraph Settings" link in the lyric miniplayer settings did nothing.
- The global search icon was not replaced by the custom one.
- The play icon over a background image, and the settings tab row collapsing while groups were open (both were on `main` after 5.0.3).
- The 60px glow behind the header artwork, the "next track" card and the card hover now behave as designed again.

## [5.0.3](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.0.3) - 2026-09-24

### Changed

- The wave bars next to the progress bar animate in CSS on the compositor instead of being redrawn from JavaScript. The main
  thread while music plays went from 58-81% busy to 14-22%.
- The custom icon set replaced 139 `:has()` rules, re-evaluated for every mounted list row, with one rule per icon. Liked Songs
  scrolls at 142-158 fps.
- The class mapper only processes the parts of the page that changed.
- State icons (play and pause, heart, shuffle, home) switch instantly.

### Fixed

- 10 snippets repaired for Spotify 1.3: Friend Activity, What's New, Shuffle, Ads Banner, New Release Promo Card, Home Shortcuts
  Grid, Mood / Time Recommendations, Thin Library Rows, Spacing Visualizer and the Encore Audit report.
- Custom icons whose original glyph stayed visible, and stale icons left on buttons Spotify reuses.
- Icons already on screen at startup are replaced right away.
- A request per track to Spotify's retired audio-analysis endpoint, which always failed, is gone.

### Security

- Font name, font URL and accent colour are validated before they reach CSS or a `<link>` (code scanning alert #2).
- The Volume+ settings popup no longer puts stored values through the HTML parser (code scanning alert #1).

## [5.0.2](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.0.2) - 2026-08-21

### Fixed

- The theme did nothing when installed from the Spicetify Marketplace. The
  manifest listed `theme.js` in `include` as a relative path, and the
  Marketplace uses those entries verbatim as script sources, resolved against
  Spotify's own document. The request 404'd, the engine never ran, and without
  it there are no `vg-*` classes and no colour bridge, so a Marketplace install
  left the client untouched. The entries are absolute URLs now. Manual installs
  were never affected, which is why this went unnoticed since the first release.

### Added

- Every extension now ships with the Marketplace install. Previously only the
  theme was listed, so a Marketplace user got no settings panel, no icon set,
  no lyric miniplayer, no taskbar player, no volume wheel and no loop tool.

### Changed

- New Marketplace preview image. The old one was a full 1376x768 screenshot at
  1.4 MB, which reads as a smudge in a grid of theme cards.
- `docs/INSTALL.md` opens by separating the Marketplace path from the manual
  one. It used to claim the files were already in place after a Marketplace
  install and send the reader to a section full of commands they cannot run.
- README rebuilt around the Spicetify Marketplace, which renders it inside
  Spotify. All image and document links are absolute, because the Marketplace
  does not rewrite relative links and a reader inside Spotify would otherwise
  click into nothing.
- The long-form content moved out of the README into `docs/`: installation,
  the eleven themes, the settings panel and the extensions each have their own
  page now.
- README published in five languages: English, Turkish, Spanish, Chinese and
  Russian.
- Screenshots renamed to kebab-case and `manifest.json` updated in step, so the
  Marketplace preview keeps resolving.

### Fixed

- `LICENSE` is now the verbatim AGPL-3.0 text, with the supplemental
  attribution terms in `NOTICE`. GitHub previously reported the licence as
  "Other" because the addendum sat above the licence text.
- Three broken navigation anchors in `README_TR.md` and `README_ES.md`. They
  pointed at headings whose anchors differ because GitHub keeps the invisible
  variation selector that follows an emoji.

---

## [5.0.1](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.0.1) - 2026-07-05

A maintenance release. No palette, icon or extension API changes, so it is a
safe drop-in over 5.0.0.

### Added

- **Next Track widget toggle.** The "up next" card above the progress bar can
  be hidden, under Settings, Snippets, Hide Buttons. Shown by default and
  persisted like every other snippet.

### Fixed

- **The like icon reflects the real state again.** Recent Spotify builds stopped
  changing the button's `aria-label` between liked and unliked, which left the
  heart permanently coloured whatever the track's actual state. It now keys off
  `aria-checked`, so it lights up only when the track really is saved.

---

## [5.0.0](https://github.com/Miabeyefendi/Vantagraph/releases/tag/5.0.0) - 2026-06-14

First public release.

### Added

- **Eleven palettes**, five dark and six light, each tuned for long listening
  sessions rather than for a screenshot.
- **An in-app settings panel.** A five-tab modal inside Spotify: theme, font,
  layout, background, snippets. Every control applies live.
- **A custom icon set.** 66 hand-drawn SVGs replacing Spotify's Encore icons
  across the topbar, sidebar, player and context menus.
- **Lyric Miniplayer.** A picture-in-picture window with word-synced karaoke,
  translations, a vinyl display and eight animation presets.
- **Taskbar Player.** A borderless, always-on-top bar on
  `documentPictureInPicture` that keeps working while another application is
  fullscreen.
- **Volume+.** Scroll wheel volume on the bar, middle-click mute, a percentage
  tooltip, quick presets and a mute-state visual.
- **LoopyLoop.** Right-click the progress bar to set start and end points.
  Loops persist per track in localStorage.
- **Thirty-plus snippets.** Hide friend activity, the ads banner, "Made for
  You", "Top Mixes" and the podcasts filter. Rounded images, a modern
  scrollbar, thin library rows, auto-hide sidebar, and a set of developer tools
  covering a layout grid, element highlighter, spacing visualiser, CSS variable
  monitor and DOM mutation logger.
- **Custom backgrounds.** Any image URL, or the current album cover, with live
  blur, brightness, contrast and saturation sliders.
- **Custom font and accent.** Any Google Font or a local one, any HEX accent.
- **One-click reset** that wipes every `vantagraph:*` key, injected style, body
  class and inline variable.

---

[Unreleased]: https://github.com/Miabeyefendi/Vantagraph/compare/5.1.0...HEAD
[5.1.0]: https://github.com/Miabeyefendi/Vantagraph/compare/5.0.3...5.1.0
[5.0.3]: https://github.com/Miabeyefendi/Vantagraph/compare/5.0.2...5.0.3
[5.0.2]: https://github.com/Miabeyefendi/Vantagraph/compare/5.0.1...5.0.2
