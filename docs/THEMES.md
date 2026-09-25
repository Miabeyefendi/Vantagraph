# The eleven themes

[Back to the README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Install](./INSTALL.md) · [Settings](./SETTINGS.md) · [Extensions](./EXTENSIONS.md)

Five dark, six light. Every one of them is a full palette rather than a hue shift: panel, window, menu, player, stroke, accent and the play button are set separately, which is why they hold up on long sessions instead of looking good for one screenshot.

Switch between them in the **Theme** tab of the settings panel. Each row carries a three-swatch preview showing panel, window and accent, so you can see what you are picking before you pick it.

---

## Dark

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/main-showcase-dark.png" width="100%" alt="The five dark schemes side by side inside Spotify">

<table>
<tr>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-vantablack.png" width="100%" alt="VantaBlack scheme: near-black panels with off-white text"/><br/>
    <sub><b>VantaBlack</b> · void-deep neutrals, off-white type</sub>
  </td>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-r34-purple.png" width="100%" alt="R34 Purple scheme: midnight indigo panels with gold accents"/><br/>
    <sub><b>R34 Purple</b> · midnight indigo, gold accents, royal blue play</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-crimson.png" width="100%" alt="Crimson scheme: deep wine surfaces with warm gold highlights"/><br/>
    <sub><b>Crimson</b> · deep wine surface, warm gold highlights</sub>
  </td>
  <td align="center">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-olive.png" width="100%" alt="Olive scheme: forest moss panels with a lime accent"/><br/>
    <sub><b>Olive</b> · forest moss, lime accent, soft text</sub>
  </td>
</tr>
</table>

**Spotify Default** ships as the fifth dark scheme. It is there so you can put the stock look back for a moment without uninstalling anything, which is the only honest way to judge whether a theme is actually an improvement.

---

## Light

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/main-showcase-light.png" width="100%" alt="The six light schemes side by side inside Spotify">

<table>
<tr>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-vantawhite.png" width="100%" alt="VantaWhite scheme: paper-white surfaces with near-black text"/><br/>
    <sub><b>VantaWhite</b> · paper-white surfaces, near-black type</sub>
  </td>
  <td align="center" width="50%">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-glass.png" width="100%" alt="Glass scheme: pale blue and teal surfaces with a frosted look"/><br/>
    <sub><b>Glass</b> · pale blue and teal, frosted feel</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-lavender-blush.png" width="100%" alt="Lavender Blush scheme: cream and lavender surfaces with a warm amber accent"/><br/>
    <sub><b>Lavender Blush</b> · cream and lavender, warm amber accent</sub>
  </td>
  <td align="center">
    <img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/theme-teal-green.png" width="100%" alt="Teal Green scheme: soft teal surfaces with a rose-red accent"/><br/>
    <sub><b>Teal Green</b> · soft teal, rose-red accent</sub>
  </td>
</tr>
</table>

**Rose Vale** and **Japanese Indigo** ship in `color.ini` and appear in the picker alongside the four above.

Light themes get their own treatment in the stylesheet under `body.vg-glass-theme`, because a palette that simply inverts a dark theme reads as washed out. Contrast, shadow depth and the hover states are all retuned rather than flipped.

---

## Making one your own

You do not need to edit `color.ini` to change the accent. The **Theme** tab has a **Custom Accent** colour picker that overrides the accent of whichever palette is active, and a reset next to it. That covers most of what people want to change.

If you do want a new palette in the picker, add a section to `color.ini` using the keys the file documents at the top. Two things to know before you start:

- The key names in `color.ini` are not Spotify's names. `theme.js` translates them through a bridge, so `window` becomes the sidebar, `panel` becomes the main surface, `menu` becomes cards. The bridge table is in the [tutorial](./guides/TUTORIAL.md).
- A handful of Encore tokens are hardcoded by Spotify and cannot be reached from `color.ini` at all. Those are overridden in `user.css` instead. `vantagraph-debug.js` will tell you which layer is winning for any given variable.
