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

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-night py-28 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">In their words</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="testimonials-heading" className="display mt-6 text-[44px] leading-[1.0] md:text-[80px]">
            People who walked in
            <br />
            <span className="italic font-light text-brass">on a hard day,</span>
            <br />
            and came back the next.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-10 max-w-[58ch] text-[14px] leading-[1.7] text-cream/65">Real reviews from real Google profiles, last names abbreviated.</p>
        </Reveal>

        <div className="mt-20 flex flex-col divide-y divide-hairline border-y border-hairline">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 90}>
              <figure className="grid grid-cols-1 gap-y-8 py-14 md:grid-cols-12 md:gap-x-10 md:py-20">
                <div className="md:col-span-3 flex items-start">
                  <span className="display text-brass text-[44px] leading-none">&ldquo;</span>
                </div>
                <div className="md:col-span-9 flex flex-col">
                  <blockquote className="display text-[26px] leading-[1.18] text-cream md:text-[36px]">
                    {q.body}
                  </blockquote>
                  <figcaption className="mt-8 flex flex-col gap-1">
                    <span className="text-[13px] tracking-[0.18em] uppercase text-brass">{q.name}</span>
                    <span className="text-[12px] tracking-[0.06em] uppercase text-cream/50">{q.role}</span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] tracking-[0.18em] uppercase text-cream/55">
            <span className="display text-[24px] tracking-normal normal-case text-brass">★★★★★</span>
            <span>Google &amp; Yelp regulars · College Area, San Diego, SDSU</span>
            <span aria-hidden className="hidden md:inline text-cream/30">·</span>
            <span>7086 El Cajon Blvd, San Diego · daily, 9:30 AM – 10 PM</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
