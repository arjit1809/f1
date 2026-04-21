import dynamic from "next/dynamic";
import BackgroundSequence from "@/components/BackgroundSequence";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const ExplodedCar = dynamic(() => import("@/components/ExplodedCar"), { ssr: false });
const DriverGrid = dynamic(() => import("@/components/DriverGrid"), { ssr: false });
const CircuitSpotlight = dynamic(() => import("@/components/CircuitSpotlight"), { ssr: false });
const LiveStandings = dynamic(() => import("@/components/LiveStandings"), { ssr: false });
const Calendar = dynamic(() => import("@/components/Calendar"), { ssr: false });
const SocialFeed = dynamic(() => import("@/components/SocialFeed"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Background Sequence Layer (Visual Only) */}
      <BackgroundSequence />

      {/* Main Content Sections */}
      <section id="hero">
        <Hero />
      </section>

      <div className="relative z-10 w-full">
        <section id="anatomy" aria-label="Car Anatomy">
          <ExplodedCar />
        </section>

        <section id="drivers" aria-label="Driver Grid">
          <DriverGrid />
        </section>

        <section id="spotlight" aria-label="Circuit Spotlight">
          <CircuitSpotlight />
        </section>

        <section id="standings" aria-label="Live Standings">
          <LiveStandings />
        </section>

        <section id="calendar" aria-label="Race Calendar">
          <Calendar />
        </section>
      </div>

      <section id="social" aria-label="Team Social Feed">
        <SocialFeed />
      </section>

      <Footer />
    </>
  );
}
