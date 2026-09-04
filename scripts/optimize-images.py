"""
Phase 1 image optimization — generates resized WebP variants + safe fallbacks
from the original artwork in public/images/. Originals are NEVER modified or
deleted; every generated file is a new sibling with a size suffix.

Run from the repository root:  python scripts/optimize-images.py

Every generated asset must be eyeball-checked (the person running Phase 1 used
ReadMediaFile to confirm appearance) before deployment.
"""

from PIL import Image
from pathlib import Path

IMG = Path(__file__).resolve().parent.parent / "public" / "images"


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im.copy()
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def save_webp(im: Image.Image, name: str, quality: int = 88) -> None:
    out = IMG / name
    im.save(out, "WEBP", quality=quality, method=6)
    print(f"{name}: {out.stat().st_size / 1024:.0f} KB")


def save_jpg(im: Image.Image, name: str, quality: int = 85) -> None:
    out = IMG / name
    im.convert("RGB").save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{name}: {out.stat().st_size / 1024:.0f} KB")


def save_png(im: Image.Image, name: str) -> None:
    out = IMG / name
    im.save(out, "PNG", optimize=True)
    print(f"{name}: {out.stat().st_size / 1024:.0f} KB")


def variant_pair(stem: str, width: int, *, webp_q: int = 88) -> None:
    """<stem>-<width>.webp + <stem>-<width>.png (alpha-safe fallback)."""
    im = Image.open(IMG / f"{stem}.png")
    small = resize_to_width(im, width)
    save_webp(small, f"{stem}-{width}.webp", webp_q)
    save_png(small, f"{stem}-{width}.png")


def main() -> None:
    # --- Social card: 1200x630 JPEG for og:image / twitter:image ------------
    im = Image.open(IMG / "pelican-poses.jpg")
    target_ratio = 1200 / 630
    ratio = im.width / im.height
    if ratio > target_ratio:  # too wide -> crop sides
        new_w = round(im.height * target_ratio)
        x = (im.width - new_w) // 2
        im = im.crop((x, 0, x + new_w, im.height))
    else:  # too tall -> crop vertically around the upper-middle (mascot zone)
        new_h = round(im.width / target_ratio)
        y = max(0, (im.height - new_h) // 3)
        im = im.crop((0, y, im.width, y + new_h))
    im = resize_to_width(im, 1200)
    save_jpg(im, "og-image.jpg", quality=87)

    # --- Hero background (LCP): 1920w WebP; original JPG stays the fallback --
    im = Image.open(IMG / "beach-background.jpg")
    save_webp(resize_to_width(im, 1920), "beach-background-1920.webp", quality=80)

    # --- About-section background: fully opaque, 2560w WebP + JPEG fallback --
    im = Image.open(IMG / "SectionBackground.png")
    small = resize_to_width(im, 2560)
    save_webp(small, "SectionBackground-2560.webp", quality=80)
    save_jpg(small, "SectionBackground-2560.jpg", quality=82)

    # --- Pelican mascot (rendered at 192 CSS px): 288/576 WebP + 576 PNG -----
    im = Image.open(IMG / "PelicanMascot.png")
    save_webp(resize_to_width(im, 288), "PelicanMascot-288.webp", quality=90)
    save_webp(resize_to_width(im, 576), "PelicanMascot-576.webp", quality=90)
    save_png(resize_to_width(im, 576), "PelicanMascot-576.png")

    # --- Service artwork (rendered ~460 px): 640w WebP + PNG fallback each ---
    for stem in [
        "Working_under_sink",
        "Water_heater_repair",
        "Pelican_fixture_upgrade",
        "pelican-sewer",
        "pelican-emergency-final",
    ]:
        variant_pair(stem, 640)

    # pelican-drain is only 309 px wide: WebP at native size, original PNG
    # (110 KB) remains the fallback.
    im = Image.open(IMG / "pelican-drain.png")
    save_webp(im, "pelican-drain.webp", quality=90)

    # --- Homepage services collage default: 640w WebP + JPEG fallback --------
    im = Image.open(IMG / "Pelican-Services-Pic-1200.jpg")
    small = resize_to_width(im, 640)
    save_webp(small, "Pelican-Services-Pic-1200-640.webp", quality=85)
    save_jpg(small, "Pelican-Services-Pic-1200-640.jpg", quality=85)


if __name__ == "__main__":
    main()
