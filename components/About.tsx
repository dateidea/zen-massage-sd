import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal variant="fade" className="col-span-12 md:col-span-5">
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[44px] leading-[1.04] md:text-[64px]"
            >
              A small,
              <br />
              <span className="italic font-light text-ink/55">
                Asian-owned studio
              </span>
              <br />
              on El Cajon Boulevard.
            </h2>
          </Reveal>

          <Reveal
            variant="curtain"
            className="col-span-12 md:col-span-7 md:col-start-6 aspect-[4/3] md:aspect-[5/4]"
          >
            <div
              role="img"
              aria-label="Blue Moon Spa"
              className="img-placeholder h-full w-full"
              style={{
                backgroundImage: `url(${asset("/images/about-01.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Reveal>

          <Reveal variant="fade" delay={120} className="col-span-12 md:col-span-7 md:col-start-1">
            <div className="space-y-6 text-[16px] leading-[1.8] text-ink/75">
              <p>
                Blue Moon Spa is the kind of place we wished existed when we were
                the ones working twelve-hour shifts. A small front room with
                warm decor. Quiet treatment rooms with crisp linen and neatly
                folded towels. Hot stones warming on the counter most days,
                hot tea in the kettle every day.
              </p>
              <p>
                Our practitioners — Kiwi, Luna, and the team — are trained in
                Swedish, deep tissue, hot stone, and foot reflexology. We don&rsquo;t
                sell memberships. We don&rsquo;t push add-ons. We don&rsquo;t have a
                points program. The price you see at the door is the price you
                pay, and a real hour means sixty minutes on the table.
              </p>
              <p>
                What we are trying to do is straightforward: give people an
                honest hour. The kind your shoulders remember three days later.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="eyebrow">Specialties</p>
                <p className="mt-2 text-ink/85">
                  Swedish, deep tissue, hot stone, foot
                </p>
              </div>
              <div>
                <p className="eyebrow">Hours</p>
                <p className="mt-2 text-ink/85">Daily, 9 AM – 10 PM</p>
              </div>
              <div>
                <p className="eyebrow">Address</p>
                <p className="mt-2 text-ink/85">
                  5575 Baltimore Dr #106-107</p>
              </div>
              <div>
                <p className="eyebrow">House rate</p>
                <p className="mt-2 text-ink/85">
                  $79.99 / hour, all-in &middot; LGBTQ+ friendly
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
