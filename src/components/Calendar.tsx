"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fetch2026Calendar, Session } from "../lib/f1-api";

export default function Calendar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [races, setRaces] = useState<Session[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    fetch2026Calendar().then(setRaces);
  }, []);

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-70%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full z-30 bg-black/40 backdrop-blur-md border-y border-[#333]">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="px-6 md:px-20 mb-12">
           <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase text-white">
             2026 Calendar
           </h2>
           <p className="font-mono text-silver uppercase tracking-[0.3em] text-sm mt-2">Live Global Racing Tour</p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-20">
          {races.length > 0 ? races.map((race, idx) => (
            <div 
              key={race.session_key}
              className="group relative min-w-[300px] md:min-w-[400px] bg-[#111]/50 border-r border-[#333] p-10 hover:bg-white/5 transition-all duration-500"
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
          )) : (
            <div className="text-white font-mono opacity-50">Initializing Telemetry Feed...</div>
          )}
          {/* Extended map for "See All" */}
          <div className="min-w-[300px] flex items-center justify-center border-r border-[#333]">
             <button className="font-heading text-white font-bold hover:text-ferrari transition-colors">SEE FULL CALENDAR →</button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
