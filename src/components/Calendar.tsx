"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fetch2026Calendar, Session } from "../lib/f1-api";
import { useRouter } from "next/navigation";
import { CIRCUITS } from "../data/f1-data";

export default function Calendar() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [races, setRaces] = useState<Session[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    fetch2026Calendar().then(setRaces);
    
    // Responsive check for Framer Motion
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-70%"]);

  const getSlugByCountry = (country: string) => {
    const circuit = CIRCUITS.find(c => c.country.toLowerCase() === country.toLowerCase());
    return circuit?.slug || null;
  };

  return (
    <section ref={containerRef} className="relative md:h-[200vh] w-full z-30 bg-black/40 backdrop-blur-md border-y border-[#333]">
      <div className="md:sticky top-0 w-full md:h-screen flex flex-col justify-center overflow-hidden py-20 md:py-0">
        
        <div className="px-6 md:px-20 mb-12">
           <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase text-white">
             2026 Calendar
           </h2>
           <p className="font-mono text-silver uppercase tracking-[0.3em] text-sm mt-2">Live Global Racing Tour</p>
        </div>

        <motion.div 
          style={isMobile ? {} : { x }} 
          className="flex gap-6 md:gap-12 px-6 md:px-20 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar pb-10"
        >
          {races.length > 0 ? races.map((race, idx) => {
            const slug = getSlugByCountry(race.country_name);
            return (
              <div 
                key={race.session_key}
                onClick={() => slug && router.push(`/races/${slug}`)}
                onKeyDown={(e) => {
                  if (slug && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    router.push(`/races/${slug}`);
                  }
                }}
                tabIndex={slug ? 0 : -1}
                role={slug ? "button" : "article"}
                aria-label={`Race ${idx + 1}: ${race.country_name} at ${race.circuit_short_name}. Starts ${new Date(race.date_start).toLocaleDateString()}`}
                className={`group relative min-w-[85vw] md:min-w-[400px] bg-[#111]/50 border-r border-[#333] p-10 hover:bg-white/5 transition-all duration-500 snap-center ${slug ? 'cursor-pointer focus-visible:outline-white focus-visible:outline-offset-n4' : ''}`}
              >
                <div className="absolute top-0 right-10 text-8xl font-black text-white/5 opacity-10 font-heading">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <span className="font-mono text-ferrari font-bold text-sm uppercase tracking-widest">
                    {new Date(race.date_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <h3 className="font-heading text-4xl font-bold text-white mt-2 leading-none truncate max-w-[250px]">{race.country_name}</h3>
                  <p className="font-mono text-silver mt-1 uppercase text-xs">{race.circuit_short_name}</p>
                  
                  {race.session_name.includes("Sprint") && (
                    <div className="mt-8 inline-block px-3 py-1 bg-mercedes text-black font-mono font-bold text-[10px] uppercase rounded">
                      Sprint Weekend
                    </div>
                  )}

                  <div className="mt-20 flex items-end justify-between">
                     <div className="w-12 h-1 bg-white/20 group-hover:w-full transition-all duration-700" />
                     <div className="font-mono text-[10px] text-silver/50 ml-4 shrink-0">
                       {new Date(race.date_start) < new Date() ? "RESULTS" : "UPCOMING"}
                     </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="text-white font-mono opacity-50 pl-6">Initializing Telemetry Feed...</div>
          )}
          {/* Extended map for "See All" */}
          <div className="min-w-[85vw] md:min-w-[300px] flex items-center justify-center border-r border-[#333] snap-center">
             <button 
                onClick={() => router.push('/races')}
                className="font-heading text-white font-bold hover:text-ferrari transition-colors"
             >
                SEE FULL CALENDAR →
             </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
