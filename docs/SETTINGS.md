# Settings

[Back to the README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Install](./INSTALL.md) · [Themes](./THEMES.md) · [Extensions](./EXTENSIONS.md)

Everything is configured from inside Spotify. Click the **gear** at the top right of the topbar and a five-tab modal opens. Nothing here needs a file edit, and nothing needs a restart: every slider takes effect as you drag it.

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-settings.png" width="88%" alt="The Vantagraph settings panel open inside Spotify, showing the theme picker">
</div>

Settings are stored under `vantagraph:*` keys in Spicetify's localStorage. They survive a Spotify update; they do not survive **↻ Reset to Defaults**, which is the point of that button.

---

## 🎨 Theme

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-theme.png" width="62%" alt="The theme tab with dark and light groups, each row showing a three-swatch preview"/>

The palette picker, split into dark and light groups. Each row shows three swatches, panel, window and accent, so you can judge a scheme before applying it.

| Control | What it does |
|---|---|
| Scheme list | Applies the palette immediately |
| Custom Icons | Turns the 66-icon set on or off without disabling the extension |
| Custom Accent | Any HEX colour, overriding the accent of the active palette. Apply and reset sit next to it |

---

## ✏️ Font

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-font.png" width="62%" alt="The font tab with preset families and a size slider"/>

| Control | What it does |
|---|---|
| Preset | Nine families, Inter and JetBrains Mono among them |
| Custom family | Type any Google Fonts name and the stylesheet URL is built for you. A locally installed font works too, just type its family name |
| Size | 10 to 20px, applied to every Encore type element rather than to a handful of selectors |

---

## 📐 Layout

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-layout.png" width="62%" alt="The layout tab with icon size, density and corner radius sliders"/>

| Control | Range | What it does |
|---|---|---|
| Icon Size | 12 to 34px | Every icon, not just the player controls |
| Density | compact / default / comfortable | Row heights and padding throughout |
| Corners | 0 to 24px | Border radius on cards, covers and panels |

Each slider has a **DEF** button that restores the value Spotify ships with, so you can compare against stock without resetting everything else.

---

## 🖼️ Background

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-background.png" width="62%" alt="The background tab with a URL field, an album cover toggle and image filter sliders"/>

| Control | What it does |
|---|---|
| Image URL | Any image address |
| Album Cover as BG | Uses the artwork of whatever is playing, changing with the track |
| Blur, Brightness, Contrast, Saturation | Live filters over whichever image is in use |

Pick your palette **before** enabling a background. The dark schemes have a separate `bg-active` treatment that turns the surfaces glassy over an image, and it reads correctly only once the palette underneath is settled.

---

## ✂️ Snippets

Thirty-plus toggles, grouped into accordions.

<table>
<tr>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-snippets-1.png" width="100%" alt="Snippets tab, visual options and hide-button toggles"/><br/>
    <sub><b>Visual and hide buttons</b></sub>
  </td>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/settings-snippets-2.png" width="100%" alt="Snippets tab, hide elements, layout and developer tools"/><br/>
    <sub><b>Hide elements, layout and dev tools</b></sub>
  </td>
</tr>
</table>

| Group | What is in it |
|---|---|
| Visual | Rounded images, modern scrollbar, stop the vinyl animation |
| Hide buttons | Friend Activity, What's New, Fullscreen, Lyrics, Mini Player, Queue, Shuffle, Repeat, Connect, Volume bar, Now Playing widget, Next Track widget |
| Hide sections | Made for You, Top Mixes, Jump Back In, New Releases, Recommended Stations, Recently Played, Home shortcuts, mood recommendations, promo card, ads banner, podcasts filter |
| Layout | Thin library rows, auto-hide sidebar below 1200px |
| Dev tools | Layout grid, element highlighter, spacing visualiser, CSS variable monitor, DOM mutation logger, Encore audit |

The developer tools are there because building a theme against Spotify means guessing which class does what. They are safe to leave off and useful when a selector stops matching.

---

## ↻ Reset to Defaults

The red button at the bottom of the panel. It wipes every `vantagraph:*` localStorage key, removes the injected `<style>` and `<link>` tags, clears the inline `--spice-*` and `--vg-*` variables from `:root`, drops the body classes and re-applies the Spotify Default scheme.

It is a full reset rather than a settings reset, which is what you want when something looks wrong and you cannot tell which of thirty toggles caused it.
