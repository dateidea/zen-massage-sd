# Feel Good Spa — Marketing Site

A high-converting marketing site for **Feel Good Spa**, a small family-run
massage studio at **6917 El Cajon Blvd, San Diego, CA 92115**.

Built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **TypeScript**,
and a small set of custom components. Editorial, premium, mobile-first.

---

## Run it

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

```bash
npm run build && npm start   # production
```

---

## Project structure

```
app/
  layout.tsx        # fonts, metadata, JSON-LD LocalBusiness schema
  page.tsx          # composes all sections
  globals.css       # Tailwind v4 @theme + design tokens
  sitemap.ts        # /sitemap.xml
  robots.ts         # /robots.txt
components/
  Nav.tsx           # transparent → solid on scroll, mobile overlay
  Hero.tsx          # full-bleed image w/ subtle parallax + scrim
  TrustBar.tsx      # 4-stat row immediately under hero
  Services.tsx      # 4 services, alternating image rows
  Process.tsx       # 4 numbered steps
  Testimonials.tsx  # 3 long-form pull quotes on dark ground
  About.tsx         # founder photo + first-person voice
  FAQ.tsx           # 8 accordion items, real objections
  Booking.tsx       # name / contact / service / message form
  Footer.tsx        # NAP, hours, secondary CTA
  Reveal.tsx        # IntersectionObserver fade-up wrapper
  Logo.tsx          # wordmark
public/images/      # ALL imagery generated via ChatGPT (see IMAGE_BRIEF.md)
IMAGE_BRIEF.md      # ready-to-paste ChatGPT prompts for every image
```

---

## Where to swap copy & colors

- **Copy** lives inside each component file. Search for the section name
  (e.g. `components/Services.tsx` → the `services` array).
- **Colors / fonts / spacing tokens** live at the top of
  [`app/globals.css`](app/globals.css) inside `@theme { ... }`. Change
  `--color-clay` to swap the accent across the entire site.
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, and the JSON-LD schema in `layout.tsx`. Search for
  `(619) 825-3033` to update phone everywhere.
- **Booking form** in `components/Booking.tsx` currently shows a success
  state on submit. Wire `onSubmit` to Formspree, Resend, or your booking
  endpoint. Or replace the form entirely with a Calendly / Cal.com embed —
  drop the embed where the form's `<form>` lives.

---

## Imagery — generate, don't stock

Every photograph on this site must be generated via ChatGPT (GPT-4o image
generation). **No stock, no Unsplash, no placeholder gradients in the
final build.** Until you generate them, the layout falls back to a warm
gradient placeholder so nothing looks broken.

Open [`IMAGE_BRIEF.md`](IMAGE_BRIEF.md) — it contains a copy-paste-ready
prompt for every image, plus dimensions and IDs. Drop the saved files into
`/public/images/` matching the IDs and they'll appear automatically.

---

## Five design decisions made along the way

1. **One serif, one grotesque, no exceptions.** Fraunces (with optical
   sizing + a touch of italic) for display, Inter for body. Tight display
   tracking, generous body line-height (1.65). Every other choice flows
   from this pairing.
2. **Warm cream over pure white.** `#F7F3EC` ground with `#1C1A17` ink and
   a single terracotta clay accent (`#B8754A`). Pure white reads cold and
   medical; this is meant to feel like a wood-panelled apothecary.
3. **One primary CTA, repeated, never diluted.** "Book a session" appears
   in the nav, the hero, the bottom of every services row, the booking
   section, and the footer — same wording every time. Phone number
   `tel:` link is the secondary CTA, also persistent.
4. **Asymmetric editorial grids over centered template shapes.** Services
   alternate sides, the about block hangs the founder photo on the left
   with copy offset to the right column, testimonials use varied column
   spans. Reads more magazine, less Squarespace.
5. **Honest, specific copy keyed to a real neighborhood.** Real prices,
   real address, real hours, real services. Testimonials reference Sharp
   Memorial, SDSU, La Mesa. Trust comes from specificity, not adjectives.

---

## One-line conversion logic per section

- **Nav** — Transparent over hero so it doesn't compete; solidifies on
  scroll so the booking CTA stays clickable from anywhere.
- **Hero** — Names the customer outcome ("an unhurried hour your shoulders
  have been waiting for") instead of the service.
- **Trust Bar** — Four hard numbers immediately under the hero answer the
  cold visitor's first three questions: how long, how much, when, since when.
- **Services** — Four services with real prices and a one-sentence "for:"
  outcome line per service. Removes the call-for-pricing friction.
- **Process** — Four numbered steps reduce uncertainty for first-time
  visitors who haven't booked a massage in years.
- **Testimonials** — Long-form quotes with first name, role, and
  neighborhood do more work than a star count alone.
- **About** — First-person founder voice with credentials in a clean
  spec block — handles the "who is doing this" objection.
- **FAQ** — Eight questions handle real walk-in objections (price, hidden
  fees, late hours, parking, pregnancy, cancellation).
- **Booking** — Minimum-field form (name, contact, service, optional
  message) + repeated phone number for people who'd rather call.
- **Footer** — Quiet, complete NAP and one last booking CTA.

---

## SEO / accessibility / performance

- Semantic HTML, single `<h1>`, hierarchical `<h2>`/`<h3>` per section
- `<a href="tel:">` on every visible phone number
- WCAG AA color contrast (cream/ink combo tested at 14:1+)
- Focus rings via `:focus-visible`
- `prefers-reduced-motion` disables parallax + reveal animations
- JSON-LD `MassageTherapy` LocalBusiness schema in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- OG card configured (`/images/og-01.jpg` once generated)
- All images use `next/font` for Fraunces + Inter — no FOIT/FOUT
- Fonts loaded with `display: swap`
- Hero parallax uses `requestAnimationFrame` and respects reduced motion

---

## Analytics

Drop a Plausible or GA4 snippet into `app/layout.tsx` inside the `<body>`.
Recommended: Plausible (lighter, no cookie banner needed).

---

## Deploy

The site is a stock Next.js 15 App Router project — `vercel deploy` from
the project root works out of the box. Custom domain via Vercel dashboard.
