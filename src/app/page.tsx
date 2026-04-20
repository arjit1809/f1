import BackgroundSequence from "@/components/BackgroundSequence";
import Hero from "@/components/Hero";
import ExplodedCar from "@/components/ExplodedCar";
import DriverGrid from "@/components/DriverGrid";
import CircuitSpotlight from "@/components/CircuitSpotlight";
import LiveStandings from "@/components/LiveStandings";
import Calendar from "@/components/Calendar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Sequence Layer */}
      <BackgroundSequence />

      {/* Hero Section */}
      <Hero />

      {/* Scrollytelling Modules */}
      <div className="relative z-10 w-full">
        {/* Module 1: The Car Anatomy */}
        <ExplodedCar />

        {/* Module 2: Driver Grid */}
        <DriverGrid />

        {/* Module 3: Circuit Spotlight */}
        <CircuitSpotlight />

        {/* Module 4: Live Standings & Charts */}
        <LiveStandings />

        {/* Module 5: 2025 Calendar */}
        <Calendar />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
