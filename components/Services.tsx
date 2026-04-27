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
    name: "Full Body",
    description:
      "Sixty minutes head-to-toe — soothing strokes through the back, neck, shoulders, glutes, legs, and arms. Medium pressure unless you say otherwise. The default for a reason.",
    outcome: "For: the long week, the stiff neck, the bad chair at work.",
    duration: "60 min",
    price: "$50",
    image: "/images/service-relax-01.jpg",
    alt: "Practitioner's hands working on a client's upper back, soft window light",
  },
  {
    num: "02",
    name: "Foot Massage",
    description:
      "Sixty minutes in a heated recliner with a hot towel and warm oil. Deep work through the arch, calf, and ear reflex points. Most clients fall asleep around minute fifteen.",
    outcome: "For: nurses, servers, parents, anyone who's been on their feet.",
    duration: "60 min",
    price: "$50",
    image: "/images/service-foot-03.jpg",
    alt: "Hands working on the arch of a foot resting on a folded warm towel",
  },
  {
    num: "03",
    name: "Shiatsu",
    description:
      "Japanese pressure-point therapy through loose clothing. Slow, loaded body weight on specific points along the meridians. Asks more of the practitioner than oil massage does, in our opinion.",
    outcome: "For: chronic knots, athletes, people who lift things for a living.",
    duration: "60 min",
    price: "$60",
    image: "/images/service-deep-02.jpg",
    alt: "Forearm pressure on the upper back, soft tungsten lighting, deep shadow",
  },
  {
    num: "04",
    name: "Couples Room",
    description:
      "Two practitioners, one quiet room, side-by-side tables. Same hour, same warm towels, same hot tea afterward. Calling ahead is the difference between a yes and a maybe.",
    outcome: "For: anniversaries, post-flight, after the move.",
    duration: "60 min · per person",
    price: "$95",
    image: "/images/service-couple-04.jpg",
    alt: "Two side-by-side massage tables in a warm dim couples room",
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
                Four services.
                <br />
                <span className="italic font-light text-ink-soft">
                  No memberships, no add-on traps,
                </span>
                <br />
                no upsell at the door.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">
                Everyone who walks in is here for the same reason — something
                hurts, sleep has been bad, or the week was too long. The list
                below is the entire menu. Walk-ins welcome until 10 PM. Calling
                ahead helps.
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
                      <span className="display text-[18px] text-mid">
                        {s.num}
                      </span>
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
                    <div className="mt-8 flex items-center gap-6 text-[14px] text-ink">
                      <span className="display text-[24px] text-ink">
                        {s.price}
                      </span>
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
            New clients get $10 off the first session — no code needed, just
            mention it at the front desk. Add 30 minutes to any service for
            $25. Cash, card, and Apple Pay all accepted. Tipping is appreciated
            but never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
