import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <div
              role="img"
              aria-label="The quiet front room of Blue Moon Spa on El Cajon Boulevard, late afternoon window light"
              className="img-placeholder relative aspect-[4/5] w-full overflow-hidden"
              style={{
                backgroundImage: `url(${asset("/images/about-01.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[12px] text-mid">
              The front room, late afternoon.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[40px] leading-[1.05] md:text-[56px]"
            >
              A small,
              <br />
              <span className="italic font-light text-ink-soft">
                Asian-owned studio
              </span>
              <br />
              on El Cajon Boulevard.
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>
                Blue Moon Spa is the kind of place we wished existed when we were
                the ones working twelve-hour shifts. A small front room with
                warm decor. Quiet treatment rooms with crisp linen and neatly
                folded towels. Hot stones warming on the counter most days, hot
                tea in the kettle every day.
              </p>
              <p>
                Our practitioners — Kiwi, Luna, and the team — are trained in
                Swedish, deep tissue, hot stone, and foot reflexology. We don&rsquo;t
                sell memberships. We don&rsquo;t push add-ons. We don&rsquo;t have a points
                program. The price you see at the door is the price you pay,
                and a real hour means sixty minutes on the table.
              </p>
              <p>
                What we are trying to do is straightforward: give people an
                honest hour. The kind your shoulders remember three days later.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="text-mid">Specialties</p>
                <p className="mt-1 text-ink">
                  Swedish, deep tissue, hot stone, foot
                </p>
              </div>
              <div>
                <p className="text-mid">Hours</p>
                <p className="mt-1 text-ink">Daily, 9 AM – 11 PM</p>
              </div>
              <div>
                <p className="text-mid">Address</p>
                <p className="mt-1 text-ink">
                  7034 El Cajon Blvd, San Diego, CA 92115
                </p>
              </div>
              <div>
                <p className="text-mid">House rate</p>
                <p className="mt-1 text-ink">
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
