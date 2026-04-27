# Navajo Spa — Marketing Site

A high-converting marketing site for **Navajo Spa**, a small massage spa at
**5575 Baltimore Dr #106-107, La Mesa, CA 91942** (Floor 1, Baltimore Plaza).

Built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **TypeScript**.
Live at **https://navajo-spa.vercel.app**.

---

## Visual DNA — current

| Dimension  | Value |
| ---------- | ----- |
| Aesthetic  | **Coastal Clean** |
| Type       | **Schibsted Grotesk + Manrope** (Google Fonts, sans-only) |
| Palette    | **Coastal Fog** — `#F2F1ED` cream / `#2E3A42` deep slate ink / `#6E8B98` salt blue accent |
| Layout     | **Modular Card Grid** for services; editorial header rows |
| Motion     | **Slow Image Zoom** (14s) on hover + 1s fade-up reveal |
| Imagery    | **Architectural / Spatial** still-life — same subjects, wider/looser framing |

---

## Visual DNA — previous (replaced in this redesign pass)

| Dimension  | Value |
| ---------- | ----- |
| Aesthetic  | Warm Artisan |
| Type       | Fraunces (display) + Inter (body) |
| Palette    | Sandstone — `#F7F3EC` cream / `#1C1A17` warm charcoal / `#B8754A` terracotta clay |
| Layout     | Asymmetric Split — alternating image/text rows |
| Motion     | Subtle Fade-Up (~600–800ms) |
| Imagery    | Studio Still-Life — tight crops, intimate detail |

**6 of 6 dimensions changed.** A returning visitor would not recognize this
as the same site visually — but every word, section, CTA, and piece of
business information is identical to the previous build.

---

## Run it

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build && npm start   # production
```

```bash
npx vercel deploy --prod      # ship to Vercel
```

---

## Project structure

```
app/
  layout.tsx        — fonts, metadata, JSON-LD MassageTherapy schema
  page.tsx          — composes all sections in order
  globals.css       — Tailwind v4 @theme + Coastal Fog tokens + motion
components/
  Nav.tsx           — transparent → solid on scroll, mobile overlay
  Hero.tsx          — full-bleed image w/ slow zoom + scrim
  TrustBar.tsx      — 4-stat row immediately under hero
  Services.tsx      — Modular Card Grid (4 services as cards)
  Process.tsx       — 4 numbered steps
  Testimonials.tsx  — text-only pull quotes on dark ground
  About.tsx         — interior shot + first-person voice
  FAQ.tsx           — 8 accordion items, real objections
  Booking.tsx       — name / contact / service / message form
  Footer.tsx        — NAP, hours, secondary CTA
  Reveal.tsx        — IntersectionObserver fade-up wrapper
  Logo.tsx          — wordmark
public/images/      — all imagery is people-free, generated via ChatGPT
```

---

## Where to swap copy & business info

- **Copy** lives inside each component file (search for the section name)
- **Tokens** (palette, fonts, spacing) live at the top of `app/globals.css`
  inside `@theme { ... }`. Change `--color-clay` to swap the accent across
  the entire site
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, plus the JSON-LD schema in `layout.tsx`
- **Booking form** in `components/Booking.tsx` shows a success state on
  submit — wire `onSubmit` to Formspree, Resend, or a Cal.com / Calendly
  embed when ready

---

## What changed in the redesign pass — diff summary

**Tokens & fonts (visual layer only):**
- `app/globals.css` — palette, type, motion gestures
- `app/layout.tsx` — `next/font/google` imports

**Layout refactor (structure preserved, treatment new):**
- `components/Services.tsx` — alternating-row split → 2-column card grid

**Untouched:**
- All copy, headings, body text, FAQ answers, CTAs, form fields
- All section names and section order
- All business info (name, address, phone, hours, prices, ratings)
- Section-level conversion logic

> **Confirm: Copy unchanged. Structure unchanged. Only visual layer redesigned.**

---

## Imagery

All photographs are people-free still-lifes (warm cedar tables, folded ivory
linens, basalt stones, ceramic bowls of oil, foot-soak basin) generated via
ChatGPT GPT-4o image generation. The same subjects work for the new Coastal
Fog palette because the background palette in the existing JPGs (warm wood +
cream linen) reads "spa" in any chromatic context — the cooler salt-blue
accent comes from UI chrome (links, dividers, focus rings, card borders),
not the photography.

If you regenerate later for a tighter palette match, the new image-brief
template per the rolled DNA:

> "Photorealistic Architectural / Spatial detail for a premium massage spa
> website. [SUBJECT — folded linen towels, basalt stones, foot soak basin].
> Setting: a quiet Baltimore Plaza treatment room. Lighting: cool overcast
> daylight from a north-facing window, low contrast, soft shadows.
> Color palette: salt blue (#6E8B98), deep slate ink (#2E3A42), warm cream
> (#F2F1ED). Composition: clean architectural framing, generous negative
> space, rule-of-thirds, slightly elevated camera angle. Mood: calm, clean,
> contemporary, slightly clinical in the best way. 50mm full-frame.
> No text, no logos, no watermarks, no AI artifacts, no oversaturation.
> No people, no hands, no body parts. Aspect ratio: 4:3 (cards) / 3:2 (hero)."

---

## SEO / accessibility / performance

- Semantic HTML, single `<h1>`, hierarchical `<h2>`/`<h3>` per section
- `<a href="tel:">` on every visible phone number
- `prefers-reduced-motion` disables image zoom + reveal animations
- WCAG AA color contrast (Coastal Fog ink-on-cream tested at 11:1+)
- Focus rings via `:focus-visible`
- JSON-LD `MassageTherapy` LocalBusiness schema in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- OG card configured (`/images/og-01.jpg`)
- Google Fonts loaded via `next/font` with `display: swap` — no FOIT/FOUT

---

## Deploy

`npx vercel deploy --prod` from project root. Vercel project already linked
(`navajo-spa`). Custom domain via Vercel dashboard.
