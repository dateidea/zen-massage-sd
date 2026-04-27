import Reveal from "./Reveal";

type Quote = {
  body: string;
  name: string;
  role: string;
};

const quotes: Quote[] = [
  {
    body:
      "Great experience overall. Kiwi was friendly, professional, and made me feel very comfortable. Optional add-ons were clearly explained and reasonably priced. I left very satisfied and will definitely ask for Kiwi every time. Highly recommend.",
    name: "Ruben C.",
    role: "Verified Google review · Two months ago",
  },
  {
    body:
      "I came in with a sore back and tight shoulders, and the therapist worked pure magic. She had just the right mix of pressure and rhythm that made every muscle relax. You can tell she's really experienced — every move felt intentional and on target.",
    name: "Alyah H.",
    role: "Local Guide · Five months ago",
  },
  {
    body:
      "I had a strain in my lower back and thought I'd give an Asian massage a try. The place looks clean, well-maintained. Luna took me to a small private room — thorough, effective. I left feeling much, much better.",
    name: "Jimmy D.",
    role: "Verified Google review · Five months ago",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-28 md:py-36"
      style={{
        background: "var(--color-cream-soft)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">In their words</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="testimonials-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              People who walked in
              <br />
              <span className="italic font-light text-ink/55">
                on a hard day,
              </span>
              <br />
              and came back the next.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.8] text-ink/65">
              Real reviews from real Google profiles. Last names abbreviated,
              words left exactly as written.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-20">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              variant="curtain"
              delay={i * 100}
              className={
                i === 0
                  ? "col-span-12 md:col-span-9"
                  : i === 1
                  ? "col-span-12 md:col-span-6 md:col-start-1"
                  : "col-span-12 md:col-span-6 md:col-start-7"
              }
            >
              <figure className="flex flex-col">
                <blockquote
                  className={`display leading-[1.18] text-ink ${
                    i === 0
                      ? "text-[32px] md:text-[52px]"
                      : "text-[24px] md:text-[34px]"
                  }`}
                >
                  <span className="text-clay">&ldquo;</span>
                  {q.body}
                  <span className="text-clay">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none text-[12px] tracking-[0.18em] smallcaps"
                    style={{
                      border: "1px solid var(--color-clay)",
                      color: "var(--color-clay)",
                    }}
                  >
                    {initials(q.name)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-ink">{q.name}</span>
                    <span className="text-[13px] text-ink/55">{q.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade">
          <div className="mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-10 text-[13px] text-ink/65">
            <span className="display text-[32px] text-ink">4.5★</span>
            <span>Across Google reviews · still growing by word of mouth</span>
            <span aria-hidden className="hidden md:inline">·</span>
            <span>7034 El Cajon Blvd, San Diego · open daily 9 – 11</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
