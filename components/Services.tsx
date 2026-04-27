import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

type Service = {
  num: string;
  name: string;
  description: string;
  outcome: string;
  duration: string;
  price: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    num: "I",
    name: "The Custom Hour",
    description:
      "Sixty minutes head-to-toe — Swedish strokes, deep tissue, or both, your call. Free essential oil and free hot stone work included, every time. The signature service. Most clients leave on this and rebook on the way out.",
    outcome:
      "For: the long week, the locked-up shoulders, the night you finally have to yourself.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-relax-01.jpg",
    alt: "Architectural interior of a hammam treatment room — heavy marble, hot towels stacked on a marble bench, warm tungsten light, faint steam",
  },
  {
    num: "II",
    name: "Deep Tissue",
    description:
      "Slow-loaded forearm and elbow work into the layer beneath the surface. Not just \"harder pressure everywhere\" — the right knot, the right tool, the right amount of time. We pick the depth together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, anyone who lifts things for a living.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-deep-02.jpg",
    alt: "Hands wringing a hot towel over a copper basin, painterly tungsten light, warm steam rising, marble and brass surroundings",
  },
  {
    num: "III",
    name: "Hot Stone Therapy",
    description:
      "Smooth basalt stones warmed in water, worked along the back and shoulders to draw the deep stuff out. Already included in The Custom Hour — call it out at the front desk and we will prep the stones before you arrive.",
    outcome:
      "For: cold-weather days, deep stress, the kind of week that sits in your back.",
    duration: "Included with the hour",
    price: "Included",
    image: "/images/service-stone-03.jpg",
    alt: "Six smooth dark basalt stones arranged on a brass tray atop classic marble tilework, single warm spotlight, faint steam",
  },
  {
    num: "IV",
    name: "Foot Reflexology",
    description:
      "Sixty minutes in a heated recliner with a hot towel and warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents — anyone on their feet all day.",
    duration: "60 min",
    price: "$59.99",
    image: "/images/service-foot-04.jpg",
    alt: "Heated recliner chair in a tiled hammam alcove — warm brass floor lamp, folded ivory towel, classic geometric tile floor",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">The menu</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="services-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              A short menu.
              <br />
              <span className="italic font-light text-ink/55">
                No memberships, no add-on traps,
              </span>
              <br />
              no upsell at the door.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.75] text-ink/70">
              Most people walk in for the same reason — something hurts,
              sleep has been bad, or the week was too long. Below is the
              entire menu. Walk-ins welcome until 10 PM. Calling ahead helps.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.num}
                className={`grid grid-cols-12 items-center gap-6 border-t border-hairline py-16 md:gap-12 md:py-24 ${
                  reverse ? "md:[direction:rtl]" : ""
                }`}
              >
                <Reveal
                  variant="curtain"
                  className="col-span-12 md:col-span-7 md:[direction:ltr] aspect-[4/5] w-full md:aspect-[3/4]"
                >
                  <div
                    role="img"
                    aria-label={s.alt}
                    className="img-placeholder h-full w-full"
                    style={{
                      backgroundImage: `url(${asset(s.image)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Reveal>

                <Reveal
                  variant="fade"
                  delay={120}
                  className="col-span-12 md:col-span-5 md:[direction:ltr]"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="display text-[20px] text-clay tracking-[0.18em]">
                      {s.num}
                    </span>
                    <span className="h-px flex-1 bg-hairline" />
                  </div>
                  <h3 className="display mt-6 text-[40px] leading-[1.04] md:text-[64px]">
                    {s.name}
                  </h3>
                  <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.75] text-ink/75">
                    {s.description}
                  </p>
                  <p className="mt-5 max-w-[42ch] text-[14px] italic text-ink/45">
                    {s.outcome}
                  </p>
                  <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[14px] text-ink">
                    <span className="display text-[28px] text-clay">
                      {s.price}
                    </span>
                    <span className="text-ink/45">·</span>
                    <span className="text-ink/65">{s.duration}</span>
                    <a
                      href="#booking"
                      className="ml-auto link-underline tracking-[0.04em] text-clay"
                    >
                      Book this →
                    </a>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal variant="fade">
          <p className="mt-16 max-w-[60ch] text-[13px] leading-[1.75] text-ink/55">
            The Custom Hour at $79.99 is the limited-time house rate — Swedish,
            deep tissue, or a combination, with free essential oil and free
            hot stones included. Cash and card both accepted. Tipping is
            appreciated but never required and never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
