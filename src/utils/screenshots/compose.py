"""Builds the Marketplace preview images from the captured screenshots.

    python src/utils/screenshots/compose.py

Inputs  design/screenshots/palettes/palette-*.png, showcase-*.png  (capture.js)
Outputs design/screenshots/preview.gif        800x800 card: a short tour, one feature per scene
        design/screenshots/preview.png        800x800 card: six palettes on one screen
        design/screenshots/palettes-grid.png  the eleven palettes and the settings panel, for the README

The Marketplace draws previews in Spotify's square card with object-fit: cover,
so anything that is not square gets its sides cut off. Everything here is
square and keeps the whole app inside the frame. The card is about 200px wide
there, so every headline is a number and a word or two, big enough to read.
The card itself takes the colours of the palette on screen: the whole theme
changes, not just the app.
"""
import os
import re

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SHOTS = os.path.join(ROOT, "design", "screenshots")
FONTS = os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts")

ORDER = ["vantablack", "spotify-default", "r34-purple", "crimson", "olive",
         "vantawhite", "glass", "rose-vale", "lavender-blush", "japanese-indigo", "teal-green"]
NAMES = {"vantablack": "VantaBlack", "spotify-default": "Spotify Default", "r34-purple": "R34 Purple",
         "crimson": "Crimson", "olive": "Olive", "vantawhite": "VantaWhite", "glass": "Glass",
         "rose-vale": "Rose Vale", "lavender-blush": "Lavender Blush",
         "japanese-indigo": "Japanese Indigo", "teal-green": "Teal Green"}
# one recognisable colour per palette: the accent for dark ones, the panel for light ones
ACCENT = {"vantablack": "#B0B5B0", "spotify-default": "#1ED760", "r34-purple": "#4480D8",
          "crimson": "#C8903A", "olive": "#81B040", "vantawhite": "#F5F4F2", "glass": "#B8D8E8",
          "rose-vale": "#E8A0A0", "lavender-blush": "#A8A0E0", "japanese-indigo": "#8AAAD0",
          "teal-green": "#80C8A8"}
# the palette scene cycles through these, dark and light mixed
TOUR = ["vantablack", "r34-purple", "crimson", "glass", "rose-vale", "teal-green"]
SWEEP = ["#A8A0E0", "#4480D8", "#80C8A8", "#81B040", "#C8903A", "#E8A0A0"]

SIZE = 800
APP_W = 760
APP_H = round(APP_W * 9 / 16)
APP_X = (SIZE - APP_W) // 2
APP_Y = 282
BAR_Y = 748
SKEW = 150  # how far a wipe edge leans between the top and the bottom


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def mix(a, b, t):
    """Colour t of the way from a to b, as a hex string."""
    ca, cb = rgb(a), rgb(b)
    return "#%02X%02X%02X" % tuple(round(ca[i] + (cb[i] - ca[i]) * t) for i in range(3))


def load_themes():
    """Palette colours read from theme.js, so the card chrome matches the theme."""
    src = open(os.path.join(ROOT, "theme.js"), encoding="utf-8").read()
    block = src[src.index("const THEMES = {"):src.index("const SPICE_BRIDGE")]
    themes = {}
    for name, body in re.findall(r'"([\w ]+)": \{(.*?)\}', block, re.S):
        c = {k: "#" + v.upper() for k, v in re.findall(r'"?([\w-]+)"?:\s*"([0-9A-Fa-f]{6})"', body)}
        slug = name.lower().replace(" ", "-")
        themes[slug] = {"bg": c["window"], "glow": c["panel"], "text": c["text"], "accent": c["accent"],
                        "sub": mix(c["text"], c["window"], 0.38)}
    missing = [s for s in ORDER if s not in themes]
    if missing:
        raise SystemExit("palettes missing from theme.js: " + ", ".join(missing))
    return themes


THEMES = load_themes()
# the icon sheet and the closing card sit on the theme's own near-black
INK = {"bg": "#07070A", "glow": "#1A1A24", "text": "#F4F4F8", "accent": "#A8A0E0", "sub": "#9A9AA8"}


def shot(name, size=(APP_W, APP_H)):
    im = Image.open(os.path.join(SHOTS, name)).convert("RGB")
    return im.resize(size, Image.LANCZOS)


def palette(slug):
    return shot(os.path.join("palettes", "palette-%s.png" % slug))


def rounded_mask(w, h, r):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], r, fill=255)
    return m


def card(theme):
    """Square in the palette's window colour with a flat disc of its panel
    colour top right. Flat on purpose: a soft glow bands in a 255-colour GIF."""
    big = Image.new("RGB", (SIZE * 2, SIZE * 2), theme["bg"])
    ImageDraw.Draw(big).ellipse([980, -560, 2160, 620], fill=mix(theme["bg"], theme["glow"], 0.3))
    return big.resize((SIZE, SIZE), Image.LANCZOS)


def tracked(d, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=fnt, fill=fill, anchor="ls")
        x += d.textlength(ch, font=fnt) + tracking


def wordmark(d, theme):
    tracked(d, (APP_X + 2, 58), "VANTAGRAPH", font("seguisb.ttf", 21), theme["sub"], 6)


def fit(d, text, name, size, width):
    """Largest font up to `size` that keeps `text` within `width`."""
    while size > 12 and d.textlength(text, font=font(name, size)) > width:
        size -= 2
    return font(name, size)


def headline(canvas, theme, stat, label, sub):
    """A big number, then what it counts and one line of detail beside it."""
    d = ImageDraw.Draw(canvas)
    wordmark(d, theme)
    num = font("seguibl.ttf", 150)
    d.text((APP_X - 4, 214), stat, font=num, fill=theme["accent"], anchor="ls")
    x = APP_X - 4 + d.textlength(stat, font=num) + 26
    room = SIZE - APP_X - x
    d.text((x, 156), label, font=fit(d, label, "segoeuib.ttf", 58, room), fill=theme["text"], anchor="ls")
    d.text((x + 2, 206), sub, font=fit(d, sub, "seguisb.ttf", 25, room), fill=theme["sub"], anchor="ls")


def frame(canvas, app, theme):
    """Drop shadow, rounded corners and a hairline border around a shot."""
    shadow = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(shadow).rounded_rectangle([APP_X + 8, APP_Y + 18, APP_X + APP_W - 8, APP_Y + APP_H + 16], 22, fill=150)
    shadow = shadow.filter(ImageFilter.GaussianBlur(20))
    canvas.paste(Image.new("RGB", (SIZE, SIZE), "#000000"), (0, 0), shadow)
    canvas.paste(app, (APP_X, APP_Y), rounded_mask(APP_W, APP_H, 16))
    edge = mix(theme["bg"], theme["text"], 0.16)
    ImageDraw.Draw(canvas).rounded_rectangle([APP_X, APP_Y, APP_X + APP_W - 1, APP_Y + APP_H - 1], 16, outline=edge, width=1)


def progress(canvas, theme, index, count):
    """One segment per scene under the shot; the current one lit."""
    d = ImageDraw.Draw(canvas)
    gap = 12
    w = (APP_W - gap * (count - 1)) / count
    for i in range(count):
        x = APP_X + i * (w + gap)
        fill = theme["accent"] if i == index else mix(theme["bg"], theme["text"], 0.18)
        d.rounded_rectangle([x, BAR_Y, x + w, BAR_Y + 6], 3, fill=fill)


def floating(canvas, im, xy, radius):
    """Paste a window with its own shadow, as if it hovers over the shot."""
    x, y = xy
    w, h = im.size
    shadow = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(shadow).rounded_rectangle([x + 6, y + 14, x + w - 6, y + h + 14], radius + 6, fill=200)
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    canvas.paste(Image.new("RGB", (SIZE, SIZE), "#000000"), (0, 0), shadow)
    canvas.paste(im, (x, y), rounded_mask(w, h, radius))
    ImageDraw.Draw(canvas).rounded_rectangle([x, y, x + w - 1, y + h - 1], radius, outline="#2A2A38", width=1)


# the tour: (headline, what fills the frame, card colours)
SCENES = [
    ("11", "full palettes", "five dark, six light, one click apart"),
    ("66", "custom icons", "every control of the player, redrawn"),
    ("30+", "snippets", "in a five-tab panel inside Spotify"),
    ("6", "extensions", "taskbar player, lyrics PiP, Volume+, LoopyLoop"),
]
COUNT = len(SCENES) + 1  # plus the closing card


def palette_still(slug, index=0):
    theme = THEMES[slug]
    c = card(theme)
    headline(c, theme, *SCENES[0])
    frame(c, palette(slug), theme)
    progress(c, theme, index, COUNT)
    return c


def icons_still():
    c = card(INK)
    headline(c, INK, *SCENES[1])
    frame(c, shot("showcase-icons.png"), INK)
    progress(c, INK, 1, COUNT)
    return c


def snippets_still():
    theme = THEMES["japanese-indigo"]
    c = card(theme)
    headline(c, theme, *SCENES[2])
    frame(c, shot("showcase-snippets.png"), theme)
    progress(c, theme, 2, COUNT)
    return c


def extras_still():
    theme = THEMES["r34-purple"]
    c = card(theme)
    headline(c, theme, *SCENES[3])
    frame(c, shot("showcase-background.png"), theme)
    bar = Image.open(os.path.join(SHOTS, "showcase-taskbar.png")).convert("RGB")
    w = 600
    bar = bar.resize((w, round(bar.height * w / bar.width)), Image.LANCZOS)
    floating(c, bar, ((SIZE - w) // 2, APP_Y + APP_H - bar.height - 58), 12)
    progress(c, theme, 3, COUNT)
    return c


def closing_still():
    """The whole tour in one card, plus what the last releases were about."""
    c = card(INK)
    d = ImageDraw.Draw(c)
    wordmark(d, INK)
    d.text((APP_X - 2, 128), "Tuned for", font=font("seguisb.ttf", 46), fill=INK["sub"], anchor="ls")
    big = font("seguibl.ttf", 104)
    d.text((APP_X - 6, 238), "Spotify", font=big, fill=INK["text"], anchor="ls")
    d.text((APP_X - 6 + d.textlength("Spotify ", font=big), 238), "1.3", font=big, fill=INK["accent"], anchor="ls")
    tiles = [(s[0], s[1]) for s in SCENES]
    tw, th, gap = (APP_W - 16) // 2, 150, 16
    for i, (stat, label) in enumerate(tiles):
        x = APP_X + (i % 2) * (tw + gap)
        y = 292 + (i // 2) * (th + gap)
        d.rounded_rectangle([x, y, x + tw, y + th], 18, fill="#101016", outline="#1F1F2A", width=1)
        colour = SWEEP[[1, 5, 2, 0][i]]
        num = font("seguibl.ttf", 84)
        d.text((x + 26, y + 112), stat, font=num, fill=colour, anchor="ls")
        lx = x + 26 + d.textlength(stat, font=num) + 16
        d.text((lx, y + 106), label, font=fit(d, label, "segoeuib.ttf", 36, x + tw - lx - 16), fill=INK["text"], anchor="ls")
    d.text((SIZE // 2, 684), "smooth scrolling, instant icon swaps, no restarts",
           font=font("seguisb.ttf", 27), fill=INK["sub"], anchor="ms")
    progress(c, INK, COUNT - 1, COUNT)
    return c


def wipe(a, b, t):
    """b slides in over a from the left along a slanted edge, t in 0..1."""
    pos = -SKEW / 2 + (SIZE + SKEW) * t
    top, bottom = pos + SKEW / 2, pos - SKEW / 2
    m = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(m).polygon([(-2, 0), (top, 0), (bottom, SIZE), (-2, SIZE)], fill=255)
    out = a.copy()
    out.paste(b, (0, 0), m)
    ImageDraw.Draw(out, "RGBA").line([(top, 0), (bottom, SIZE)], fill=(255, 255, 255, 60), width=2)
    return out


def build_gif():
    """Six palettes wipe into each other, then one scene per feature, then the closing card."""
    stills = [(palette_still(s), 850) for s in TOUR]
    stills[-1] = (stills[-1][0], 1300)
    extras = extras_still()
    stills += [(icons_still(), 2300), (snippets_still(), 2300), (extras, 2300), (closing_still(), 2800)]
    # one colour table for every frame, built from the stills: unchanged pixels
    # keep their index, so a wipe frame only stores the band that moved. 255
    # colours leave one index free, which the encoder uses for "unchanged".
    # The blurred album cover behind the extras scene needs the most shades,
    # so it gets 80 of the table to itself.
    rest = [s for s, _ in stills if s is not extras]
    sheet = Image.new("RGB", (SIZE * len(rest), SIZE))
    for i, still in enumerate(rest):
        sheet.paste(still, (SIZE * i, 0))
    ui = sheet.quantize(colors=175, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    art = extras.quantize(colors=80, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    table = Image.new("P", (1, 1))
    table.putpalette(ui.getpalette()[:175 * 3] + art.getpalette()[:80 * 3])
    # snap every still to the table first. The album cover is dithered, it
    # bands without; the rest stays flat. Wipes are cut from the snapped
    # stills, so a pixel that does not move keeps exactly the same index.
    snap = lambda im, d: im.quantize(palette=table, dither=d).convert("RGB")
    stills = [(snap(s, Image.Dither.FLOYDSTEINBERG if s is extras else Image.Dither.NONE), h) for s, h in stills]
    frames, durations = [], []
    steps = 4
    for i, (still, hold) in enumerate(stills):
        frames.append(still)
        durations.append(hold)
        nxt = stills[(i + 1) % len(stills)][0]
        for k in range(1, steps + 1):
            frames.append(wipe(still, nxt, k / (steps + 1)))
            durations.append(45)
    q = [f.quantize(palette=table, dither=Image.Dither.NONE) for f in frames]
    path = os.path.join(SHOTS, "preview.gif")
    q[0].save(path, save_all=True, append_images=q[1:], duration=durations, loop=0, optimize=True, disposal=1)
    return path


def build_png():
    """The palette scene as one still: six palettes cut into slanted slices."""
    theme = THEMES["vantablack"]
    c = card(theme)
    headline(c, theme, *SCENES[0])
    n = 6
    app = palette(TOUR[0])
    span = APP_W + SKEW
    for i, slug in enumerate(TOUR[1:], start=1):
        t0 = -SKEW / 2 + span * i / n
        m = Image.new("L", (APP_W, APP_H), 0)
        ImageDraw.Draw(m).polygon([(t0 + SKEW / 2, 0), (APP_W + SKEW, 0), (APP_W + SKEW, APP_H), (t0 - SKEW / 2, APP_H)], fill=255)
        app.paste(palette(slug), (0, 0), m)
        ImageDraw.Draw(app, "RGBA").line([(t0 + SKEW / 2, 0), (t0 - SKEW / 2, APP_H)], fill=(255, 255, 255, 70), width=2)
    frame(c, app, theme)
    progress(c, theme, 0, COUNT)
    path = os.path.join(SHOTS, "preview.png")
    c.save(path, optimize=True)
    return path


def build_grid():
    """Eleven palettes plus the settings panel, four by three, for the README."""
    cw, ch, gap, label = 480, 270, 22, 44
    cols, rows = 4, 3
    w = cw * cols + gap * (cols + 1)
    h = (ch + label) * rows + gap * (rows + 1)
    canvas = Image.new("RGB", (w, h), "#07070A")
    d = ImageDraw.Draw(canvas)
    f = font("seguisb.ttf", 22)
    cells = [(n, os.path.join(SHOTS, "palettes", "palette-%s.png" % n), NAMES[n], ACCENT[n]) for n in ORDER]
    cells.append(("settings", os.path.join(SHOTS, "showcase-settings.png"), "Settings panel", None))
    for i, (_, src, name, dot) in enumerate(cells):
        col, row = i % cols, i // cols
        x = gap + col * (cw + gap)
        y = gap + row * (ch + label + gap)
        im = Image.open(src).convert("RGB").resize((cw, ch), Image.LANCZOS)
        canvas.paste(im, (x, y), rounded_mask(cw, ch, 12))
        tx = x
        if dot:
            d.ellipse([x + 2, y + ch + 15, x + 16, y + ch + 29], fill=dot)
            tx = x + 26
        d.text((tx, y + ch + 22), name, font=f, fill="#E8E8F0", anchor="lm")
    path = os.path.join(SHOTS, "palettes-grid.png")
    canvas.save(path, optimize=True)
    return path


if __name__ == "__main__":
    for p in (build_png(), build_gif(), build_grid()):
        im = Image.open(p)
        frames = getattr(im, "n_frames", 1)
        print("%-40s %dx%d  %3d frame(s)  %d KB" % (os.path.relpath(p, ROOT), im.width, im.height, frames, os.path.getsize(p) // 1024))
