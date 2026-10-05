import sys, glob
from PIL import Image
d = sys.argv[1]; label = sys.argv[2]
def dist(a, b): return max(abs(a[i] - b[i]) for i in range(3))
def runs(vals, ref, tol):
    out = []; cur = None; start = 0
    for i, v in enumerate(vals):
        k = "gap" if dist(v, ref) <= tol else "panel"
        if k != cur:
            if cur is not None: out.append((cur, start, i - start))
            cur = k; start = i
    out.append((cur, start, len(vals) - start)); return out
for f in sorted(glob.glob(d + f"px-{label}-*.png")):
    im = Image.open(f).convert("RGB"); W, H = im.size; px = im.load()
    ref = px[4, H // 2]   # window colour in the 8px edge gap
    y = int(H * 0.5)
    row = [px[x, y] for x in range(W)]
    segs = [s for s in runs(row, ref, 5)]
    desc = " | ".join(f"{k}{'' if k=='panel' else ''} {w}px" for k, st, w in segs if w >= 2)
    print(f"{f.split('px-' + label + '-')[1][:-4]:22} window colour {ref}  y={y}")
    print("   horizontal @y=%d: %s" % (y, desc))
    # vertical scan through the left panel and through the main view
    for name, x in (("left panel", 200), ("main view", int(W * 0.45))):
        col = [px[x, yy] for yy in range(H)]
        vs = [s for s in runs(col, ref, 5) if s[2] >= 2]
        print("   vertical @x=%d (%s): %s" % (x, name, " | ".join(f"{k} {w}px" for k, st, w in vs)))
