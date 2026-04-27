#!/usr/bin/env python3
"""Generate a 4:5 still-life "about-01.jpg" from a region of "hero-01.jpg" so
the About section can show the studio interior without depicting a person.

The hero is a 2400x1610 wide-angle of the cedar table with the folded ivory
towel, ceramic bowl, and hanging plant. Cropping the right portion of the
hero gives a 4:5 vertical with the towel + bowl + window light — exactly the
quiet still life we want for the About block.
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "hero-01.jpg"
DST = ROOT / "public" / "images" / "about-01.jpg"

TARGET_W = 1200
TARGET_H = 1500  # 4:5


def main() -> None:
    with Image.open(SRC) as im:
        im = im.convert("RGB")
        sw, sh = im.size

        # Take the tallest 4:5 strip we can fit, anchored to the right side
        # where the towel/bowl/stone composition lives in the hero.
        crop_h = sh
        crop_w = int(crop_h * TARGET_W / TARGET_H)

        if crop_w > sw:
            crop_w = sw
            crop_h = int(crop_w * TARGET_H / TARGET_W)

        # Anchor the crop to the right side of the source so the towel and
        # bowl sit in the lower third of the resulting frame.
        x1 = sw - crop_w
        y1 = (sh - crop_h) // 2
        cropped = im.crop((x1, y1, x1 + crop_w, y1 + crop_h))
        cropped = cropped.resize((TARGET_W, TARGET_H), Image.LANCZOS)
        cropped.save(DST, "JPEG", quality=92, optimize=True, progressive=True)
        print(f"wrote {DST.name} ({TARGET_W}x{TARGET_H})")


if __name__ == "__main__":
    main()
