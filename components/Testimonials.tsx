import Reveal from "./Reveal";

type Quote = { body: string; name: string; role: string; };

const quotes: Quote[] = [
  { body: "Spacious, bright lobby with warm decor. Comfortable room, crisp white sheets, neatly arranged towels. The most relaxing massage I have had on this side of San Diego — I will be back.",
    name: "David Z.", role: "Returning guest" },
  { body: "I have been a frequent customer for several months. The staff is polite and professional. The price is fair compared to an orthopedic clinic — and the back and neck aches are resolved every visit.",
    name: "Jose S.", role: "Local Guide · Rolando" },
  { body: "Found this place after a long shift. The masseuse is professional and the price is honest — forty-five dollars for a real combo. We have come back as a couple twice. Very, very relaxed afterward.",
    name: "Xiaodong C.", role: "Returning guest · College Area" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2);
}

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-ink py-32 text-cream md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 text-cream/55">
              <span className="index-badge text-cream/55">04</span>
              <span aria-hidden className="h-px w-10 bg-cream/25" />
              <span className="eyebrow text-cream/55">In their words</span>
            </div>
            <h2 id="testimonials-heading" className="display text-[44px] leading-[1.02] md:text-[68px]">
              People who walked in<br />
              <span className="display-italic text-cream/70">on a hard day,</span><br />
              and came back the next.
            </h2>
            <p className="measure-prose text-[15px] leading-[1.85] text-cream/65">Real reviews from real Google profiles, last names abbreviated.</p>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <figure className="mx-auto flex max-w-[820px] flex-col items-center gap-8 border-t border-cream/15 py-16 text-center">
                <blockquote className="display leading-[1.2] text-cream text-[26px] md:text-[36px]">
                  <span className="text-eucalyptus">&ldquo;</span>{q.body}<span className="text-eucalyptus">&rdquo;</span>
                </blockquote>
                <figcaption className="flex flex-col items-center gap-3">
                  <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-[11px] tracking-[0.2em] text-cream/75">{initials(q.name)}</span>
                  <span className="text-[14px] text-cream">{q.name}</span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-cream/55">{q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-cream/15 pt-10 text-center text-[12px] uppercase tracking-[0.18em] text-cream/55">
            <span className="display text-[24px] text-cream">★★★★★</span>
            <span>Google &amp; Yelp regulars · College Area, San Diego, SDSU</span>
            <span aria-hidden className="hidden md:inline">·</span>
            <span>7086 El Cajon Blvd · daily, 9:30 AM – 10 PM</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
