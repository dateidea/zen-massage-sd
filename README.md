# ZEN Massage — Marketing Site

A marketing site for **ZEN Massage**, an independently run massage studio at
**7086 El Cajon Blvd, San Diego, CA 92115**. Built with **Next.js 15
(App Router)**, **Tailwind CSS v4**, **TypeScript**.

**Live**: <https://navajo-spa.vercel.app/>
**Repo**: <https://github.com/dateidea/zen-massage-sd>

---

## Design DNA — current iteration

| Dimension | OLD (Architectural Apothecary) | NEW (Editorial Minimal · Aesop-meets-Apothecary) |
| --- | --- | --- |
| Aesthetic | Architectural (museum-calm, sticky rails) | **Editorial Minimal** (calm, restrained, slow) |
| Type pairing | Cormorant Garamond + Space Grotesk | **Fraunces + Inter** (generous line-height) |
| Palette | Cream `#F1EDE3` / Forest `#1F3A2F` / Copper `#B27746` | **Off-white `#F4EFE6` / Ink `#1F1A14` / Eucalyptus `#6F7F66`** (single accent) |
| Layout | Sidebar Anchored (sticky `No. 0X` left rails) | **Centered Editorial Grid** (lockup-on-axis, 96–160 px section padding, lots of negative space) |
| Motion | Sticky Reveal + lateral slide-from-left | **Subtle Fade-Up Only** (`translateY(16px)` + opacity, 700 ms ease-out) |
| Imagery | Architectural/Spatial sticky-positioned | **Macro Detail** (hands, oils, neutral linen, soft diffused window light, slight grain — no faces in hero) |

Copy, section order, business info, prices, CTAs, and form fields are 100% unchanged across iterations.

---

## Run it

```bash
npm install
npm run dev   # http://localhost:3000
npm run build && npm start   # production
```

---

## Where to swap copy & colors

- **Copy** lives inside each component file.
- **Color tokens** are at the top of [`app/globals.css`](app/globals.css) inside `@theme { ... }`. Change `--color-eucalyptus` to swap the accent.
- **Fonts** are loaded once in [`app/layout.tsx`](app/layout.tsx) via `next/font/google`.
- **NAP, phone, hours** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`, `Booking.tsx`, `FAQ.tsx`, and the JSON-LD schema in `layout.tsx`.

---

## Imagery — regeneration brief

Macro detail, photoreal, soft diffused window light, slight grain. No people's
faces in the hero. Carry-over images from prior iterations still match the
brief subject; to re-roll for the new palette, the prompt template is:

```
Photorealistic macro detail for a premium massage studio website.
[SUBJECT — practitioner's hands resting beside a small dark glass bottle of
warm oil on neutral linen / a folded ivory linen towel / an open hand
arranging botanical sprigs / hot stones cooling on a folded towel beside
amber oil].
Lighting: soft, diffused, daylight from a high window. Slight 35 mm film
grain, gentle shallow depth of field.
Color palette: warm off-white (#F4EFE6), deep ink (#1F1A14), single accent
of eucalyptus green (#6F7F66) — no other colors.
Composition: centered or rule-of-thirds, generous negative space.
Mood: calm, restrained, slow, apothecary-quiet.
Shot on a 50 mm full-frame lens.
No text, no logos, no watermarks, no AI artifacts, no oversaturation, no
people's faces in frame.
Aspect ratio: [3:2 / 4:5 / 1:1].
```

After generation, run `python3 scripts/strip-watermark.py` to remove the
ChatGPT sparkle.

---

## Conversion logic per section (unchanged)

- **Nav** — Transparent over hero; solidifies on scroll.
- **Hero** — Centered headline names the customer outcome.
- **Trust Bar** — Four hard numbers: combo price, hours, military discount, walk-ins.
- **Services** — Four services with real prices and a one-sentence outcome line.
- **Process** — Four numbered steps reduce uncertainty.
- **Testimonials** — Long-form quotes with first name, role, and neighborhood.
- **About** — First-person voice with a quiet still life.
- **FAQ** — Eight questions handle real walk-in objections.
- **Booking** — Minimum-field form + repeated phone number.
- **Footer** — Quiet, complete NAP and one last booking CTA.

---

## SEO / accessibility / performance

- Semantic HTML, single `<h1>`, hierarchical `<h2>`/`<h3>` per section
- `<a href="tel:">` on every visible phone number
- WCAG AA color contrast (ink on off-white tested at 13:1+)
- Focus rings via `:focus-visible` (eucalyptus outline)
- `prefers-reduced-motion` disables parallax + reveal animations
- JSON-LD `MassageTherapy` LocalBusiness schema in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- OG card configured (`/images/og-01.jpg`)
- `next/font` for Fraunces + Inter — no FOIT/FOUT

---

## Deploy

```bash
npx vercel deploy --prod --yes --name zen-massage-sd
```

---

**Confirmation: Copy unchanged. Structure unchanged. Only visual layer redesigned.**
