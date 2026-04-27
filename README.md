# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **TypeScript**.
Editorial, premium, mobile-first. No people in any imagery — quiet
interior still-life shots only.

Live at: https://dateidea.github.io/blue-moon-spa/

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
- **Colors / fonts / spacing tokens** live at the top of
  `app/globals.css` inside `@theme { ... }`. Change `--color-clay` to
  swap the accent across the entire site.
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.
- **Booking form** in `components/Booking.tsx` currently shows a success
  state on submit. Wire `onSubmit` to Formspree, Resend, or your booking
  endpoint. Or replace the form with a Cal.com / Calendly embed.

---

## Imagery — no people, no stock

Every photograph is a quiet, no-people interior still-life generated via
ChatGPT (GPT-4o image generation), per the owner's preference.

Images live in `/public/images/`. Re-generate via the prompts in
`IMAGE_BRIEF.md`.

---

## Design decisions

1. **One serif, one grotesque.** Fraunces (display) + Inter (body),
   tight display tracking, generous body line-height (1.65).
2. **Warm cream over pure white.** `#F7F3EC` ground with `#1C1A17` ink
   and a single terracotta clay accent (`#B8754A`). Pure white reads
   medical; this is a wood-panelled apothecary feel.
3. **One primary CTA, repeated, never diluted.** "Book a session" appears
   in nav, hero, every services row, the booking section, and the footer.
4. **Asymmetric editorial grids** over centered template shapes.
5. **No portrait photography.** Testimonials use elegant initial monograms
   pulled from real verified Google reviews. The about block uses an
   interior still-life, not a founder portrait.

---

## SEO / accessibility / performance

- Semantic HTML, single `<h1>`, hierarchical `<h2>`/`<h3>` per section
- `<a href="tel:">` on every visible phone number
- WCAG AA contrast (cream/ink combo tested at 14:1+)
- Focus rings via `:focus-visible`
- `prefers-reduced-motion` disables parallax + reveal animations
- JSON-LD `MassageTherapy` schema in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- OG card at `/images/og-01.png`
- All fonts via `next/font` with `display: swap`

---

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Push to `main` and the
workflow builds + deploys automatically.
