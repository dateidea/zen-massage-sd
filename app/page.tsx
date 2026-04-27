import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const SERVICE_TICKER = [
  "Foot Massage",
  "Full Body with Hot Stones",
  "Deep Tissue & Combo",
  "Couples Room",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee items={SERVICE_TICKER} />
        <TrustBar />
        <Services />
        <Marquee items={SERVICE_TICKER} inverse />
        <Process />
        <Testimonials />
        <Marquee items={SERVICE_TICKER} />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Marquee items={SERVICE_TICKER} inverse />
      <Footer />
    </>
  );
}
