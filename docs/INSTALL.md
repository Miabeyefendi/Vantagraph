# Installing Vantagraph

[Back to the README](https://github.com/Miabeyefendi/Vantagraph#readme) · [Themes](./THEMES.md) · [Settings](./SETTINGS.md) · [Extensions](./EXTENSIONS.md)

---

## Before you start

| | |
|---|---|
| [Spotify Desktop](https://www.spotify.com/download/) | tested on `1.2.86` and newer |
| [Spicetify CLI](https://spicetify.app/docs/getting-started) | tested on `2.43` and newer |
| Platform | Windows, macOS or Linux |

---

## Marketplace, or by hand?

**Spicetify Marketplace** is the short path. Search for Vantagraph, press install, done. The theme
and every extension are pulled straight from this repository and start at once, so there is nothing
to copy and nothing to enable. Skip the rest of this page and go to [Themes](./THEMES.md).

Two things work differently there. Extensions are not individually switchable, because the
Marketplace installs a theme as one unit; turn a feature off inside the settings panel instead. And
updates arrive through a CDN that caches for a few hours, so a fresh release can take a moment to
reach you.

**By hand** gives you file-level control and instant updates. That is the rest of this page.

---

## 1. Copy the files

Spicetify keeps themes and extensions in two **separate** folders. Run `spicetify config-dir` to open the right place.

| What | Where it goes |
|---|---|
| The `Vantagraph` folder, with `color.ini`, `user.css` and `theme.js` | `…/spicetify/Themes/Vantagraph/` |
| Every `.js` file inside `Vantagraph/Extensions/` | `…/spicetify/Extensions/` |

The result should look like this:

```
spicetify/
├─ Themes/
│  └─ Vantagraph/
│     ├─ color.ini
│     ├─ user.css
│     └─ theme.js
└─ Extensions/
   ├─ vantagraph-settings.js          required
   ├─ vantagraph-icons.js             preferred
   ├─ vantagraph-lyric-miniplayer.js  optional
   ├─ vantagraph-loopyloop.js         optional
   ├─ vantagraph-taskbarplayer.js     optional
   ├─ vantagraph-volume-plus.js       optional
   └─ vantagraph-debug.js             developers only
```

Extensions do **not** go inside the theme folder. That is the single most common installation mistake, and it fails silently: the theme loads, the gear icon never appears.

---

## 2. Choose what to enable

Everything is opt-in except the settings panel.

| Tier | Extension | Why |
|---|---|---|
| **Required** | `vantagraph-settings.js` | Without it the gear icon never appears and you lose all live configuration. The theme itself still works. |
| **Preferred** | `vantagraph-icons.js` | Replaces 66 Encore SVGs with the Vantagraph set. The theme still looks right without it. |
| **Optional** | `vantagraph-lyric-miniplayer.js`<br>`vantagraph-loopyloop.js`<br>`vantagraph-taskbarplayer.js`<br>`vantagraph-volume-plus.js` | Feature add-ons. Enable as many as you want, none is required. |
| **Developers** | `vantagraph-debug.js` | Prints the three-layer colour override chain in the console. Not for normal use. |

What each one actually does is in the [extensions guide](./EXTENSIONS.md).

---

## 3. Apply

### Minimal: theme and settings panel

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

### Full: theme, icons and the four optional extensions

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify config extensions vantagraph-volume-plus.js
spicetify config extensions vantagraph-lyric-miniplayer.js
spicetify config extensions vantagraph-loopyloop.js
spicetify config extensions vantagraph-icons.js
spicetify apply
```

`vantagraph-taskbarplayer.js` is bundled but deliberately left out of that block, because it opens a separate always-on-top window and that is a strong opinion to force on everyone. Add it on purpose:

```bash
spicetify config extensions vantagraph-taskbarplayer.js
spicetify apply
```

---

## Verifying it worked

Spotify restarts and a **gear icon** appears at the top right of the topbar. Click it and the settings panel opens.

If the theme colours changed but there is no gear, `vantagraph-settings.js` is not enabled or is in the wrong folder. Check with:

```bash
spicetify config extensions
```

---

## Going back to stock Spotify

```bash
spicetify config inject_css 0 replace_colors 0 overwrite_assets 0 inject_theme_js 0
spicetify config current_theme marketplace
spicetify config extensions vantagraph-settings.js-
spicetify config extensions vantagraph-volume-plus.js-
spicetify config extensions vantagraph-lyric-miniplayer.js-
spicetify config extensions vantagraph-loopyloop.js-
spicetify config extensions vantagraph-taskbarplayer.js-
spicetify config extensions vantagraph-icons.js-
spicetify apply
```

The trailing `-` on each extension name is Spicetify's uninstall syntax.

To clear the stored settings as well, open the panel first and press **↻ Reset to Defaults**. That wipes every `vantagraph:*` key from localStorage, removes the injected styles and clears the inline variables. Uninstalling without it leaves those keys behind, harmlessly but pointlessly.

---

## When something breaks

**After a Spotify update everything is gone.** Spotify replaces the patched client files on update. Run `spicetify backup apply` to re-apply on top of the new version.

**The gear icon disappeared after an update.** Same cause. If it persists after re-applying, Spotify may have changed the topbar markup; open an [issue](https://github.com/Miabeyefendi/Vantagraph/issues/new?template=bug_report.yml) with your Spotify and Spicetify versions.

**A colour looks wrong in one place only.** Some Encore tokens are hardcoded by Spotify and cannot be reached from `color.ini`. `vantagraph-debug.js` prints the full override chain for any variable, which is the fastest way to find out which layer is winning. The [tutorial](./guides/TUTORIAL.md) explains that system.
