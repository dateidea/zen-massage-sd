import Reveal from "./Reveal";

type Quote = { body: string; name: string; role: string; };

const quotes: Quote[] = [
  { body: "Spacious, bright lobby with warm decor. Comfortable room, crisp white sheets, neatly arranged towels. The most relaxing massage I have had on this side of San Diego — I will be back.", name: "David Z.", role: "Returning guest · La Mesa" },
  { body: "I have been a frequent customer for several months. The staff is polite and professional. The price is fair compared to an orthopedic clinic — and the back and neck aches are resolved every visit.", name: "Jose S.", role: "Local Guide · Rolando" },
  { body: "Found this place after a long shift. The masseuse is professional and the price is honest — forty-five dollars for a real combo. We have come back as a couple twice. Very, very relaxed afterward.", name: "Xiaodong C.", role: "Returning guest · College Area" },
];

function initials(name: string) { return name.split(" ").map((p) => p[0]).join("").slice(0, 2); }

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4"><p className="eyebrow">In their words</p></div>
            <div className="col-span-12 md:col-span-8">
              <h2 id="testimonials-heading" className="display text-[40px] leading-[1.04] text-ink font-medium md:text-[60px]">
                People who walked in<br />
                <span className="text-clay-deep font-normal">on a hard day,</span><br />
                and came back the next.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.7] text-ink-soft">Real reviews from real Google profiles, last names abbreviated.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <figure className="card flex h-full flex-col p-8 md:p-10">
                <span className="display text-[36px] leading-none text-clay-deep font-medium">&ldquo;</span>
                <blockquote className="mt-3 text-[16px] leading-[1.65] text-ink md:text-[17px]">{q.body}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
                  <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay/30 text-[12px] tracking-[0.10em] text-ink-soft font-medium">{initials(q.name)}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-ink">{q.name}</span>
                    <span className="text-[13px] text-mid">{q.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-ink-soft">
            <span className="display text-[24px] text-clay-deep font-medium">★★★★★</span>
            <span>Google &amp; Yelp regulars · College Area, La Mesa, SDSU</span>
            <span aria-hidden className="hidden md:inline">·</span>
            <span>7900 El Cajon Blvd, La Mesa · daily, 10 AM – 9:30 PM</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
