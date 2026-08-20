<div align="center">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/assets/logo-dark.svg" width="110" alt="Vantagraph">

# Vantagraph

**Eleven hand-tuned colour schemes for Spotify, a settings panel that lives inside the app, and six optional extensions. No config files, no restarts.**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](https://github.com/Miabeyefendi/Vantagraph/blob/main/LICENSE)
[![Version](https://img.shields.io/github/v/release/Miabeyefendi/Vantagraph?style=for-the-badge&color=F59E0B&label=version)](https://github.com/Miabeyefendi/Vantagraph/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Miabeyefendi/Vantagraph/total?style=for-the-badge&color=22C55E&label=downloads)](https://github.com/Miabeyefendi/Vantagraph/releases)
[![Spicetify](https://img.shields.io/badge/Spicetify_2.43%2B-1E293B?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)

[English](https://github.com/Miabeyefendi/Vantagraph#readme) · [Türkçe](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_TR.md) · [Español](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ES.md) · [简体中文](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ZH.md) · [Русский](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_RU.md)

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-dark.png" width="94%" alt="The five dark Vantagraph schemes side by side inside Spotify: VantaBlack, R34 Purple, Crimson, Olive and Spotify Default">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-light.png" width="94%" alt="The six light Vantagraph schemes side by side inside Spotify: VantaWhite, Glass, Lavender Blush, Teal Green, Rose Vale and Japanese Indigo">

</div>

---

## ✨ What you get

**Eleven palettes.** Five dark, six light, each tuned for long sessions rather than for a screenshot. Switch between them from inside Spotify and the change is immediate.

**A settings panel, not a config file.** A gear appears in the topbar and opens a five-tab modal: theme, font, layout, background, snippets. Every slider takes effect as you drag it, and a single button puts everything back.

**Six extensions you can take or leave.** Picture-in-picture lyric karaoke, a borderless taskbar player that survives fullscreen games, scroll-wheel volume, per-track looping, 66 hand-drawn icons, and a developer console. Only the settings panel is required.

**Thirty-plus snippets.** Hide friend activity, the ads banner, "Made for You", the podcasts filter. Round the images, thin the library rows, auto-hide the sidebar under 1200px.

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-settings.png" width="82%" alt="The Vantagraph settings panel open inside Spotify, showing the theme picker with a three-swatch preview on every row">
</div>

---

## 📦 Install

You need [Spotify](https://www.spotify.com/download/) `1.2.86+` and [Spicetify](https://spicetify.app/docs/getting-started) `2.43+`.

Copy the `Vantagraph` folder into `…/spicetify/Themes/` and every `.js` from `Vantagraph/Extensions/` into `…/spicetify/Extensions/`. Then:

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Spotify restarts with the theme on and a gear icon in the topbar. That is the minimum. To turn on the icon set and the optional extensions, or to go back to stock Spotify, follow the [installation guide](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md).

---

## 📖 Documentation

| | |
|---|---|
| [**Installation**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) | Every install path, which extension does what, and how to uninstall cleanly |
| [**The eleven themes**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/THEMES.md) | Each palette with a screenshot and what it was tuned for |
| [**Settings**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/SETTINGS.md) | All five tabs, every slider and every one of the snippets |
| [**Extensions**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md) | The six add-ons in detail, and the credits they are built on |
| [**Tutorial**](https://github.com/Miabeyefendi/Vantagraph/blob/main/TUTORIAL.md) | How the three-layer colour system works underneath |
| [**Changelog**](https://github.com/Miabeyefendi/Vantagraph/blob/main/CHANGELOG.md) | What changed in each release |

> Reading this inside Spotify? The links above open in your browser. Everything you need to install the theme is already on this page.

---

## 📜 License and credits

Vantagraph is **AGPL-3.0**, with the attribution terms in [NOTICE](https://github.com/Miabeyefendi/Vantagraph/blob/main/NOTICE). Use it, change it, ship it, as long as the source stays open and the attribution stays intact.

Three of the extensions are rewrites built on earlier work by [Aspecky](https://github.com/Aspecky), khanhas and the [Spicetify](https://github.com/spicetify) maintainers, and [FO-SS](https://github.com/FO-SS). What each one contributed, and what was added on top, is set out in the [extensions guide](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md#credits).

Spotify is not affiliated with this project and does not endorse it. The theme modifies the desktop client locally; you run it at your own risk.

<div align="center">
<br/>
<sub>Built by <b><a href="https://github.com/Miabeyefendi">Miabeyefendi</a></b></sub>
</div>
