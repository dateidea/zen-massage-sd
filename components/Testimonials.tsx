import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

type Quote = {
  body: string;
  name: string;
  role: string;
  image: string;
  alt: string;
};

const quotes: Quote[] = [
  {
    body:
      "I work twelve-hour shifts at Sharp Memorial and my lower back is always wrecked by Friday. I've tried four massage places in San Diego. This is the only one I rebook every week. They don't talk through it. They just work.",
    name: "Daniela R.",
    role: "ICU nurse · Normal Heights",
    image: "/images/testimonial-01.jpg",
    alt: "Candid portrait of a woman in her thirties, soft daylight",
  },
  {
    body:
      "I came in for a 30-minute foot massage after a long shift on a Tuesday and stayed an extra half-hour because I forgot what relaxed felt like. The price is honestly a little embarrassing for them — it should be more.",
    name: "Marcus T.",
    role: "Line cook · College Area",
    image: "/images/testimonial-02.jpg",
    alt: "Candid portrait of a man in his forties, neutral background",
  },
  {
    body:
      "I'm a contractor. I'd written off massages as a wellness thing for other people. The deep tissue here is the real version — they ask where it hurts, they fix it, and you can feel the difference the next morning when you reach for the coffee.",
    name: "Eddie M.",
    role: "General contractor · La Mesa",
    image: "/images/testimonial-03.jpg",
    alt: "Candid environmental portrait of a man in work clothes outdoors",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-ink py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-cream/50">In their words</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="testimonials-heading"
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                People who walked in
                <br />
                <span className="italic font-light text-cream/70">
                  on a hard day,
                </span>
                <br />
                and came back the next.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 100}
              className={`col-span-12 ${
                i === 0 ? "md:col-span-8" : "md:col-span-6 md:col-start-auto"
              } ${i === 1 ? "md:col-start-1 md:col-span-5" : ""} ${
                i === 2 ? "md:col-span-6 md:col-start-7" : ""
              }`}
            >
              <figure className="flex flex-col">
                <blockquote
                  className={`display leading-[1.18] text-cream ${
                    i === 0
                      ? "text-[28px] md:text-[40px]"
                      : "text-[22px] md:text-[28px]"
                  }`}
                >
                  <span className="text-clay">“</span>
                  {q.body}
                  <span className="text-clay">”</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    role="img"
                    aria-label={q.alt}
                    className="img-placeholder h-12 w-12 shrink-0 rounded-full bg-cream/10"
                    style={{
                      backgroundImage: `url(${asset(q.image)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
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
          <div className="mt-20 flex flex-wrap items-center gap-8 border-t border-cream/15 pt-10 text-[13px] text-cream/60">
            <span className="display text-[28px] text-cream">4.7</span>
            <span>average across Google, Yelp, and Fresha</span>
            <span aria-hidden>·</span>
            <span>200+ five-star reviews since 2014</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
