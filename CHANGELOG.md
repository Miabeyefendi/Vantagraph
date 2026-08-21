# Changelog

Every released version of Vantagraph, newest first. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Releases](https://github.com/Miabeyefendi/Vantagraph/releases)

---

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

[Unreleased]: https://github.com/Miabeyefendi/Vantagraph/compare/5.0.2...HEAD
[5.0.2]: https://github.com/Miabeyefendi/Vantagraph/compare/5.0.1...5.0.2
