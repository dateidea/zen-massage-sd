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
    name: "The Honest Hour",
    description:
      "Our standard sixty-minute full-body session. Medium pressure, slow pace, warm room, no clock-watching. The default for a reason.",
    outcome: "For: the long week, the stiff neck, the bad chair at work.",
    duration: "60 min",
    price: "$60",
    image: "/images/service-relax-01.jpg",
    alt: "Hands of a practitioner working on a client's shoulder, dim warm room",
  },
  {
    num: "02",
    name: "Deep Tissue",
    description:
      "Heavier pressure where you actually need it. We talk first about what's hurting, then we work — slow, deliberate, with a real plan.",
    outcome: "For: chronic knots, athletes, people who lift things for a living.",
    duration: "60 min",
    price: "$65",
    image: "/images/service-deep-02.jpg",
    alt: "Forearm pressure on the upper back, soft tungsten lighting",
  },
  {
    num: "03",
    name: "Hot Stone",
    description:
      "Smooth basalt stones, warmed and placed along the spine, then drawn through the long muscles. Heat does half the work for you.",
    outcome: "For: the cold, the wound-up, the impossible-to-relax.",
    duration: "75 min",
    price: "$80",
    image: "/images/service-stone-03.jpg",
    alt: "Smooth dark river stones arranged on a folded towel, warm tones",
  },
  {
    num: "04",
    name: "Foot Reflexology",
    description:
      "Thirty years of Chinese reflexology, applied to the feet, calves, hands, and ears. You sit in a recliner. You don't say a word unless you want to.",
    outcome: "For: nurses, servers, parents, anyone who stands all day.",
    duration: "45 min",
    price: "$45",
    image: "/images/service-foot-04.jpg",
    alt: "Reflexology chart and warm towel, hands working on the arch of a foot",
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
                  No upsells, no packages,
                </span>
                <br />
                no timeshare pitch.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">
                Everyone we work on is here for the same reason — something hurts,
                or sleep has been bad, or the week was too long. The list below is
                the entire menu. Walk-ins are welcome. Calling ahead helps.
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
                  {/* Image */}
                  <div
                    className={`col-span-12 md:col-span-6 md:[direction:ltr]`}
                  >
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

                  {/* Body */}
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
          <p className="mt-14 max-w-[58ch] text-[14px] text-mid">
            Add 30 minutes to any service for $25. Couples-room available with
            advance notice. Tipping appreciated but never expected — gratuity
            never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
