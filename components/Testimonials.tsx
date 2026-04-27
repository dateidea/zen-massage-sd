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
    <section aria-labelledby="testimonials-heading" className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4"><p className="eyebrow text-cream/50">In their words</p></div>
            <div className="col-span-12 md:col-span-8">
              <h2 id="testimonials-heading" className="display text-[40px] leading-[1.02] md:text-[64px]">
                People who walked in<br />
                <span className="italic font-light text-cream/70">on a hard day,</span><br />
                and came back the next.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.7] text-cream/65">Real reviews from real Google profiles, last names abbreviated.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}
              className={ i === 0 ? "col-span-12 md:col-span-8" : i === 1 ? "col-span-12 md:col-span-5 md:col-start-1" : "col-span-12 md:col-span-6 md:col-start-7" }>
              <figure className="flex flex-col">
                <blockquote className={`display leading-[1.18] text-cream ${i === 0 ? "text-[28px] md:text-[40px]" : "text-[22px] md:text-[28px]"}`}>
                  <span className="text-clay">&ldquo;</span>{q.body}<span className="text-clay">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/20 text-[12px] tracking-[0.18em] text-cream/70">{initials(q.name)}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-cream">{q.name}</span>
                    <span className="text-[13px] text-cream/55">{q.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-10 text-[13px] text-cream/60">
            <span className="display text-[28px] text-cream">★★★★★</span>
            <span>Google &amp; Yelp regulars · College Area, San Diego, SDSU</span>
            <span aria-hidden className="hidden md:inline">·</span>
            <span>7086 El Cajon Blvd, San Diego · daily, 9:30 AM – 10 PM</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
