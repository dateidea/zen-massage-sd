# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Live at: https://dateidea.github.io/blue-moon-spa/

---

## Visual DNA — current redesign

| Dimension | Old DNA (Warm Artisan) | **New DNA — "Midnight Apothecary"** |
| --- | --- | --- |
| Aesthetic | Warm Artisan (Aesop / Kinfolk) | **Dark Luxe** (late-night Tokyo onsen) |
| Type | Fraunces + Inter | **Cormorant Garamond + Manrope** |
| Palette | Sandstone (cream / charcoal / terracotta) | **Midnight Brass** — `#0E1620` / `#F1ECDF` / `#B58A4A` |
| Layout | Asymmetric Editorial Grid | **Stacked Hero Blocks** + asymmetric service stack |
| Motion | Subtle fade-up + parallax | **Slow Image Zoom** (signature gesture on every image) |
| Imagery | Studio Still-Life (close hands, towels, stones) | **Architectural / Spatial** (wide moody interiors) |

**What changed:** colour tokens, font families, motion language, hero block
structure, all image art-direction. The Testimonials section is intentionally
*inverted* to ivory — the only bright section in an otherwise dark site —
giving the page a strong rhythm break.

**What stayed:** every word of copy, every section, the section order, every
CTA, every link, the form, the JSON-LD schema, the NAP, the price list,
the Google review excerpts. Diff is tokens / components / images only.

---

## Run it

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

```bash
npm run build && npm start          # production
GITHUB_PAGES=true npm run build      # static export to ./out for Pages
```

---

## Where to swap copy & colors

- **Copy** lives inside each component file. Search for the section name
  (e.g. `components/Services.tsx` → the `services` array).
- **Palette tokens** live at the top of `app/globals.css` inside `@theme`.
  Change `--color-brass` to swap the accent across the entire site.
  Change `--color-midnight` to swap the dominant background.
- **Type variables** also in `globals.css` (`--font-display`, `--font-sans`).
  Font import lives in `app/layout.tsx`.
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.

---

## Imagery — no people, architectural

Every photograph is a moody, no-people **architectural / spatial** shot
generated via ChatGPT (GPT-4o image generation). The brief is in the script
that calls them — every prompt inherits the Midnight Brass palette and a
single warm tungsten light source so the whole set looks like one shoot.

---

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Push to `main` and the
workflow builds + deploys automatically.

Confirmation: **Copy unchanged. Structure unchanged. Only visual layer redesigned.**
