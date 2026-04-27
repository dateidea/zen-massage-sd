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
    num: "01",
    name: "The Custom Hour",
    description:
      "Sixty minutes head-to-toe — Swedish strokes, deep tissue, or both, your call. Free essential oil and free hot stone work included, every time. The signature service. Most clients leave on this and rebook on the way out.",
    outcome:
      "For: the long week, the locked-up shoulders, the night you finally have to yourself.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-relax-01.jpg",
    alt: "A practitioner's hands working slowly along the upper back of a client face-down on a cedar massage table, soft window light",
  },
  {
    num: "02",
    name: "Deep Tissue",
    description:
      "Slow-loaded forearm and elbow work into the layer beneath the surface. Not just \"harder pressure everywhere\" — the right knot, the right tool, the right amount of time. We pick the depth together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, anyone who lifts things for a living.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-deep-02.jpg",
    alt: "Tight crop on a forearm pressing into the upper back, warm tungsten light, deep shadow across the lower frame",
  },
  {
    num: "03",
    name: "Hot Stone Therapy",
    description:
      "Smooth basalt stones warmed in water, worked along the back and shoulders to draw the deep stuff out. Already included in The Custom Hour — call it out at the front desk and we will prep the stones before you arrive.",
    outcome:
      "For: cold-weather days, deep stress, the kind of week that sits in your back.",
    duration: "Included with the hour",
    price: "Included",
    image: "/images/service-stone-03.jpg",
    alt: "Six smooth dark basalt river stones arranged on a folded ivory linen towel, faint steam rising from one, warm window light",
  },
  {
    num: "04",
    name: "Foot Reflexology",
    description:
      "Sixty minutes in a heated recliner with a hot towel and warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents — anyone on their feet all day.",
    duration: "60 min",
    price: "$59.99",
    image: "/images/service-foot-04.jpg",
    alt: "Hands using both thumbs to apply pressure to the arch of a foot resting on a folded warm towel, warm window light",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">The menu</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="services-heading"
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                A short menu.
                <br />
                <span className="italic font-light text-ink-soft">
                  No memberships, no add-on traps,
                </span>
                <br />
                no upsell at the door.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">
                Most people walk in for the same reason — something hurts, sleep
                has been bad, or the week was too long. Below is the entire
                menu. Walk-ins welcome until 10 PM. Calling ahead helps.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={s.num}>
                <article
                  className={`grid grid-cols-12 items-center gap-6 border-t border-hairline py-14 md:gap-10 md:py-20 ${
                    reverse ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                    <div
                      role="img"
                      aria-label={s.alt}
                      className="img-placeholder relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
                      style={{
                        backgroundImage: `url(${asset(s.image)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>

                  <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                    <div className="flex items-baseline gap-6">
                      <span className="display text-[18px] text-mid">{s.num}</span>
                      <span className="h-px flex-1 bg-hairline" />
                    </div>
                    <h3 className="display mt-6 text-[34px] leading-[1.05] md:text-[48px]">
                      {s.name}
                    </h3>
                    <p className="mt-5 max-w-[44ch] text-[17px] text-ink-soft">
                      {s.description}
                    </p>
                    <p className="mt-5 max-w-[44ch] text-[14px] italic text-mid">
                      {s.outcome}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink">
                      <span className="display text-[24px] text-ink">{s.price}</span>
                      <span className="text-mid">·</span>
                      <span className="text-mid">{s.duration}</span>
                      <a
                        href="#booking"
                        className="ml-auto link-underline tracking-[0.02em]"
                      >
                        Book this →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-14 max-w-[60ch] text-[14px] text-mid">
            The Custom Hour at $79.99 is the limited-time house rate — Swedish,
            deep tissue, or a combination, with free essential oil and free hot
            stones included. Cash and card both accepted. Tipping is appreciated
            but never required and never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
