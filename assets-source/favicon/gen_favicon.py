"""Rasteriza la marca YS. Reproduce exactamente la geometria de public/favicon.svg
(viewBox 64x64) para que el .ico y los PNG no se separen del SVG maestro."""
import os, sys
from PIL import Image, ImageDraw

VB = 64.0
SS = 16          # supersampling: se dibuja a 16x y se reduce con LANCZOS
C0 = (37, 99, 235)    # primary-500  #2563EB
C1 = (99, 102, 241)   # secondary-500 #6366F1
RX = 18.0
STROKE = 5.0
RING_W, RING_INSET, RING_A = 1.3, 0.65, 0.18

def cubic(p0, p1, p2, p3, n=48):
    out = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        out.append((
            u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
            u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
        ))
    return out

# path "S" del SVG: M49 24 C ... encadenados
S_SEGS = [
    ((50, 24),     (50, 20.8),   (47.2, 19.5), (43.5, 19.5)),
    ((43.5, 19.5), (39.8, 19.5), (37, 20.9),   (37, 24.5)),
    ((37, 24.5),   (37, 28.3),   (40, 30.2),   (43.5, 31)),
    ((43.5, 31),   (47, 31.8),   (50, 33.7),   (50, 37.5)),
    ((50, 37.5),   (50, 41.2),   (47.2, 44.5), (43.5, 44.5)),
    ((43.5, 44.5), (39.8, 44.5), (37, 43.1),   (37, 39.5)),
]
Y_V    = [(13.5, 20.5), (20.5, 30.5), (27.5, 20.5)]
Y_STEM = [(20.5, 30.5), (20.5, 43.0)]

def gradient(size):
    """Degradado lineal a 135 grados (esquina sup-izq -> inf-der), igual que
    bg-gradient-to-br de Tailwind."""
    g = Image.new("RGB", (size, size))
    px = g.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(C0, C1))
    return g

def stroke(draw, pts, k, width, color):
    p = [(x * k, y * k) for x, y in pts]
    draw.line(p, fill=color, width=round(width * k), joint="curve")
    r = width * k / 2                      # tapas y uniones redondeadas
    for x, y in p:
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

def scale(pts, f, cx=32.0, cy=32.0):
    return [(cx + (x - cx) * f, cy + (y - cy) * f) for x, y in pts]

def render(size, maskable=False):
    """maskable=True: fondo a sangre y marca reducida al 80% para caber en la
    safe zone circular que recorta Android."""
    f = 0.8 if maskable else 1.0
    k = size * SS / VB
    n = size * SS

    mask = Image.new("L", (n, n), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, n - 1, n - 1],
        radius=0 if maskable else RX * k, fill=255)

    icon = gradient(64).resize((n, n), Image.BICUBIC).convert("RGBA")

    # aro interior blanco al 25% (ring-1 ring-inset del logo del header)
    ring = None if maskable else Image.new("RGBA", (n, n), (0, 0, 0, 0))
    if ring is not None:
      ImageDraw.Draw(ring).rounded_rectangle(
        [RING_INSET * k, RING_INSET * k, (VB - RING_INSET) * k, (VB - RING_INSET) * k],
        radius=(RX - RING_INSET) * k, outline=(255, 255, 255, round(255 * RING_A)),
        width=max(1, round(RING_W * k)))
      icon.alpha_composite(ring)

    d = ImageDraw.Draw(icon)
    stroke(d, scale(Y_V, f), k, STROKE * f, (255, 255, 255, 255))
    stroke(d, scale(Y_STEM, f), k, STROKE * f, (255, 255, 255, 255))
    s_pts = [S_SEGS[0][0]]
    for seg in S_SEGS:
        s_pts += cubic(*seg)[1:]
    stroke(d, scale(s_pts, f), k, STROKE * f, (255, 255, 255, 255))

    icon.putalpha(mask)
    return icon.resize((size, size), Image.LANCZOS)

if __name__ == "__main__":
    out = sys.argv[1]
    for name, size in [("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)]:
        render(size).save(os.path.join(out, name), optimize=True)
        print("ok", name)
    render(512, maskable=True).save(os.path.join(out, "icon-maskable-512.png"), optimize=True)
    print("ok icon-maskable-512.png")
    ico = [render(s) for s in (16, 32, 48, 64)]
    ico[-1].save(os.path.join(out, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("ok favicon.ico")
