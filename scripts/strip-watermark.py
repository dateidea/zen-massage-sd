#!/usr/bin/env python3
"""Remove the ChatGPT sparkle watermark from the bottom-right corner of every
JPG in /public/images by clone-stamping a same-height strip from immediately
to the left of the watermark over the watermark area.

Why a clone-stamp instead of a crop: cropping a few pixels off the bottom
shifts the aspect ratio and reframes the photograph (the founder portrait,
for instance, was framed for 4:5). Clone-stamping a thin strip preserves
both the framing and the texture of the surface the watermark sits on
(wood, fabric, etc.) without resampling the photograph.
"""

from pathlib import Path
from PIL import Image

IMG_DIR = Path(__file__).resolve().parent.parent / "public" / "images"

# Width of the watermark area, as a percentage of image width.
# The ChatGPT sparkle is consistently ~7% of image width across sizes.
WATERMARK_W_PCT = 0.085
WATERMARK_H_PCT = 0.085

# Pad the patched region so we cover the diagonal sparkle bbox cleanly.
PAD = 2


def strip(path: Path) -> None:
    with Image.open(path) as im:
        im = im.convert("RGB")
        W, H = im.size
        wm_w = max(48, int(W * WATERMARK_W_PCT))
        wm_h = max(48, int(H * WATERMARK_H_PCT))

        # Watermark bbox: bottom-right corner.
        x1 = W - wm_w - PAD
        y1 = H - wm_h - PAD
        x2 = W
        y2 = H

        # Source bbox: same height, immediately to the left of the watermark.
        sx1 = max(0, x1 - wm_w)
        sx2 = sx1 + (x2 - x1)
        sy1 = y1
        sy2 = y2

        if sx2 > x1:
            # Image too narrow to clone from the left; fall back to area
            # directly above the watermark instead.
            sx1, sx2 = x1, x2
            sy1 = max(0, y1 - wm_h)
            sy2 = sy1 + (y2 - y1)

        patch = im.crop((sx1, sy1, sx2, sy2))
        im.paste(patch, (x1, y1))
        im.save(path, "JPEG", quality=92, optimize=True, progressive=True)


def main() -> None:
    targets = sorted(IMG_DIR.glob("*.jpg"))
    for p in targets:
        strip(p)
        print(f"patched {p.name}")


if __name__ == "__main__":
    main()
