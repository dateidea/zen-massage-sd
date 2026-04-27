# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Live at: https://dateidea.github.io/blue-moon-spa/

---

## Visual DNA — current redesign

| Dimension | Old DNA (Midnight Apothecary) | **New DNA — "Heritage Classic"** |
| --- | --- | --- |
| Aesthetic | Dark Luxe (Tokyo onsen) | **Heritage Classic** (a 100-year-old hammam reopened by a young owner) |
| Type | Cormorant + Manrope | **Newsreader + Source Serif 4** (Tiempos system, Google equivalents) |
| Palette | Midnight Brass | **Heritage Cream** — cream `#F2EBDB` / deep ink `#2A1A1F` / burgundy accent `#5C1F23` |
| Layout | Stacked Hero Blocks | **Sidebar Anchored** — fixed left rail with logo + section nav, content scrolls right |
| Motion | Slow Image Zoom | **Curtain Reveal** — left-to-right clip-path wipe between sections and on every image frame |
| Imagery | Architectural / spatial | **Heritage Classic** — warm tungsten interiors, marble, weathered brass, faint steam, classic tilework, hands wringing a hot towel |

**What changed:** colour tokens, font families, motion language, sidebar
chrome, all image art-direction. Small caps for nav (heritage editorial
detail). Body shifts right by `--sidebar` width on `lg+`.

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
  Change `--color-clay` to swap the burgundy accent across the entire site.
- **Type variables** also in `globals.css` (`--font-display`, `--font-text`).
  Font import lives in `app/layout.tsx`.
- **NAP, hours, phone** appear in `Sidebar.tsx`, `Nav.tsx`, `Hero.tsx`,
  `Footer.tsx`, `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.

---

## Imagery — heritage hammam

Every photograph is generated via ChatGPT (GPT-4o image generation). The
brief is in `scripts/apply-heritage.sh` comments. Subjects across the set:
warm tungsten interiors, marble walls, weathered brass fixtures, faint
steam, classic Moorish/hammam tilework, hot towels, copper bowls, hands
wringing a hot towel. NO portraits, NO faces.

---

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Push to `main` and the
workflow builds + deploys automatically.

Confirmation: **Copy unchanged. Structure unchanged. Only visual layer redesigned.**
