# QA harness

Scripts that drive a real Spotify through the Chrome DevTools Protocol and check the theme the way a person would:
every page, panel and menu, every setting, the extensions, panel alignment, heart colours, scroll and idle frame rates.
Written for Spotify 1.3.3 with Spicetify 2.45.3. Windows only (the window parking helper uses user32).

## Run

```bash
bash src/utils/qa/launch-qa.sh        # restarts Spotify with --remote-debugging-port=9222 and rendering flags
node src/utils/qa/qa-sweep.js final   # pages, panels, menus, fullscreen lyrics, contact sheets
```

Results (screenshots, JSON, contact sheets) go to `src/utils/qa/out/`, or to `VG_QA_OUT`. Contact sheets need Python with
Pillow, set `PYTHON` if `python` is not on PATH. When you are done, start Spotify normally so the port closes.

| Script | Checks |
|---|---|
| `qa-sweep.js` | 22 pages, panels, menus, context menus, fullscreen lyrics, icon coverage, two contact sheets |
| `qa-settings.js`, `qa-settings2.js` | every setting and snippet, applied, verified and timed; colour editor on Custom |
| `qa-density.js`, `qa-px-shots.js` + `px-analyze.py` | left panel, main view and right panel share top and bottom edges; real painted gaps from screenshot pixels |
| `qa-volume.js`, `qa-play.js`, `qa-pip.js`, `qa-taskbar.js` | Volume+, LoopyLoop, wave bars, lyric miniplayer and its settings, taskbar player |
| `qa-hearts3.js` (Vantagraph), `qa-hearts-c.js` (Custom) | liked heart in the theme colour, unliked plain |
| `qa-icontoggle.js`, `qa-bgrestore.js` (Vantagraph) | Custom Icons switch, palette restored after removing a background image |

## Rules of the road

- The window is parked off-screen without activating it (`win-park.ps1`) so Chromium keeps rendering and nothing pops up.
- Playback is never started except muted for a few seconds (`qa-play.js`, `qa-pip.js`, `qa-taskbar.js`), and is paused again.
- Scripts restore what they change (settings, volume, mute, library width). Check the library is back to 420 px after a run.
- A DOM rectangle can be right while the screen is wrong. Look at the screenshots, and measure gaps from pixels.
- Some routes are specific to the account the scripts were written on (an album with a liked track, an artist id).
  They sit at the top of `qa-sweep.js` and `qa-hearts*.js`.
