import Reveal from "./Reveal";
import SectionRail from "./SectionRail";
import { asset } from "@/lib/asset";

type Service = {
  num: string; name: string; description: string; outcome: string; duration: string; price: string; image: string; alt: string;
};

const services: Service[] = [
  { num: "01", name: "Foot Massage",
    description: "Sixty minutes in a heated recliner — Epsom-salt soak, hot towel, warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents, anyone who has been on their feet.",
    duration: "60 min", price: "From $50",
    image: "/images/about-01.jpg",
    alt: "A folded ivory linen towel set out on a cedar bench beside the recliner — the warm towel ready for the hour" },
  { num: "02", name: "Full Body with Hot Stones",
    description: "A full hour head-to-toe — back, neck, shoulders, glutes, legs, arms — with smooth basalt stones warmed in water and worked along the back to draw the deep stuff out. Medium pressure unless you say otherwise.",
    outcome: "For: the long week, the bad chair, the shoulders that will not drop.",
    duration: "60 min", price: "From $60",
    image: "/images/service-stone-03.jpg",
    alt: "Seven smooth dark basalt river stones arranged in a quiet line on folded ivory linen, beside a small ceramic bowl of warm oil" },
  { num: "03", name: "Deep Tissue & Combo",
    description: "Slow-loaded forearm and elbow work into the layer beneath the surface. Or split the hour: thirty on the feet, thirty on the body, for forty-five dollars. We pick the pressure together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, people who lift things for a living.",
    duration: "60 min · 30/30 from $45", price: "From $55",
    image: "/images/service-thai-04.jpg",
    alt: "A warm oil bowl and a single dark river stone on a wooden stool beside the cedar massage table — the tools warming before the work" },
  { num: "04", name: "Couples Room",
    description: "Two practitioners, one quiet room, side-by-side tables. Hot stones included on request, same warm towels, same cup of tea afterward. The couples room books up before the rest of the studio — calling ahead is the difference between a yes and a maybe.",
    outcome: "For: anniversaries, post-flight, the rare night you both have free.",
    duration: "60 min · per pair", price: "Call for current rate",
    image: "/images/og-01.jpg",
    alt: "A quiet warm treatment room with cedar-panelled walls, sheer linen curtains, hanging plant, and ivory linen on the table — set up for the hour" },
];

export default function Services() {
  return (
    <SectionRail
      id="services"
      eyebrow="The menu"
      index="01"
      labelledBy="services-heading"
      bg="bg-cream"
      heading={
        <h2 id="services-heading" className="display text-center text-[44px] leading-[1.02] md:text-[68px]">
          Four services.<br />
          <span className="display-italic text-ink-soft">No memberships, no add-on traps,</span><br />
          no upsell at the door.
        </h2>
      }
      rail={<>Most people walk in for one of these. Combo deals — foot plus body in the same hour — are how regulars come in. Walk-ins welcome until 9 PM. Calling ahead helps, especially for the couples room.</>}
    >
      <div className="flex flex-col">
        {services.map((s, i) => (
          <Reveal key={s.num}>
            <article className={`grid grid-cols-12 items-center gap-x-6 gap-y-10 border-t border-hairline py-20 md:gap-x-12 md:py-28 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                <div role="img" aria-label={s.alt}
                  className="img-placeholder relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
                  style={{ backgroundImage: `url(${asset(s.image)})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              </div>
              <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                <p className="index-badge text-eucalyptus">No. {s.num}</p>
                <h3 className="display mt-5 text-[34px] leading-[1.05] md:text-[48px]">{s.name}</h3>
                <p className="mt-6 measure-tight text-[17px] leading-[1.85] text-ink-soft">{s.description}</p>
                <p className="mt-6 measure-tight text-[14px] italic text-mid">{s.outcome}</p>
                <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[14px] text-ink">
                  <span className="display text-[26px] text-ink">{s.price}</span>
                  <span className="text-mid">·</span>
                  <span className="text-mid">{s.duration}</span>
                  <a href="#booking" className="ml-auto link-underline tracking-[0.04em] text-eucalyptus-deep">Book this →</a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-20 max-w-[60ch] text-center text-[14px] leading-[1.85] text-mid">
          Combo deals: 30 min foot + 30 min body for $45 · 40 min foot + 40 min body for $60. Active duty and veterans get 10% off any service with a valid ID — discounts cannot be combined. Cash and card both accepted. Tipping is appreciated but never required.
        </p>
      </Reveal>
    </SectionRail>
  );
}
