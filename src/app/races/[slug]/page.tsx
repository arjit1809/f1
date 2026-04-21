"use client";

import { useParams, useRouter } from "next/navigation";
import { CIRCUITS, CALENDAR } from "@/data/f1-data";
import { CIRCUIT_HISTORY } from "@/data/f1-history";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JsonLd from "@/components/JsonLd";

export default function RaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [circuit, setCircuit] = useState<any>(null);
  const [raceInfo, setRaceInfo] = useState<any>(null);

  useEffect(() => {
    const foundCircuit = CIRCUITS.find((c) => c.slug === params.slug);
    setCircuit(foundCircuit || null);
    
    if (foundCircuit) {
        const matchingRace = CALENDAR.find(r => r.country.toLowerCase() === foundCircuit.country.toLowerCase());
        setRaceInfo(matchingRace);
    }
  }, [params.slug]);

  if (!circuit) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white gap-4">
        <div className="w-12 h-12 border-4 border-mercedes border-t-transparent rounded-full animate-spin"></div>
        <span className="tracking-[0.5em] text-[10px] uppercase opacity-40">Calculating Trajectory...</span>
      </div>
    );
  }

  // Schema Markup
  const raceSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `${circuit.name} 2026`,
    "description": circuit.description,
    "startDate": "2026-03-01",
    "location": {
        "@type": "Place",
        "name": circuit.location,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": circuit.country
        }
    },
    "sport": "Formula 1"
  };

  return (
    <article className="min-h-screen bg-[#050505] text-white font-mono selection:bg-mercedes selection:text-black pt-24">
      <JsonLd data={raceSchema} />
      
      {/* Dynamic Circuit Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center -z-10" aria-hidden="true">
        <svg viewBox="0 0 800 600" className="w-[80%] h-[80%]">
          <path d={circuit.path} fill="none" stroke="white" strokeWidth="20" />
        </svg>
      </div>

      <header className="max-w-7xl mx-auto px-6 md:px-20 py-20 relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="border-b border-white/5 pb-12"
        >
          <span className="text-mercedes font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Grand Prix Hub // Round {raceInfo?.round || '?' }
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            {circuit.name}
          </h1>
          <p className="text-silver text-2xl max-w-2xl font-light">
            {circuit.location}, {circuit.country}
          </p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 pb-32">
        
        {/* Left: Circuit Stats */}
        <section className="space-y-12" aria-label="Circuit Statistics">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-[#111] p-8 border border-white/5 rounded-sm">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Lap Record</span>
                <span className="text-3xl font-bold">{circuit.stats.record}</span>
            </div>
            <div className="bg-[#111] p-8 border border-white/5 rounded-sm">
                <span className="text-[10px] text-white/30 uppercase block mb-1">DRS System</span>
                <span className="text-3xl font-bold">{circuit.stats.drs}</span>
            </div>
          </div>

          <div className="bg-white text-black p-10 rounded-sm">
             <h3 className="font-heading text-xl font-bold uppercase mb-4 tracking-tight">Circuit Heritage</h3>
             <p className="text-sm leading-relaxed opacity-80">
               {circuit.description}
             </p>
             <div className="mt-10 pt-10 border-t border-black/10 flex justify-between items-end">
                <div>
                   <p className="text-[9px] uppercase font-bold opacity-40">Tire Compounds</p>
                   <div className="flex gap-2 mt-2">
                      {circuit.stats.wear.map((c: string) => (
                        <span key={c} className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-[10px] font-bold" aria-label={`Tire compound ${c}`}>{c}</span>
                      ))}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[9px] uppercase font-bold opacity-40">Fun Fact</p>
                   <p className="text-xs italic mt-1">&quot;{circuit.funFact}&quot;</p>
                </div>
             </div>
          </div>
        </section>

        {/* Right: Path Visualization */}
        <section className="relative" aria-label="Circuit Map Telemetry">
           <div className="aspect-square relative border border-white/5 bg-[#0a0a0a] flex items-center justify-center">
              <svg 
                viewBox="0 0 800 600" 
                className="w-[80%] h-[80%] drop-shadow-[0_0_40px_rgba(39,244,210,0.2)]"
                aria-label={`Visual map of the ${circuit.name} layout`}
                role="img"
              >
                <motion.path 
                  d={circuit.path}
                  fill="none"
                  stroke="#27F4D2"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              {/* Telemetry Decoration */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-30" aria-hidden="true">
                 <div className="w-20 h-[1px] bg-white"/>
                 <div className="w-20 h-[1px] bg-white"/>
                 <div className="w-20 h-[1px] bg-white self-end"/>
              </div>
           </div>
           
           <div className="mt-8 flex justify-between items-center px-4">
              <button 
                onClick={() => router.back()}
                className="text-[10px] uppercase tracking-widest text-silver hover:text-mercedes transition-colors focus-visible:outline-white focus-visible:outline-offset-8"
                aria-label="Return to global calendar"
              >
                &larr; Global Calendar
              </button>
              <span className="text-[10px] uppercase tracking-widest text-white/20">Authorized Telemetry // 2026.01</span>
           </div>
        </section>
      </div>

      {/* Circuit History Section */}
      {CIRCUIT_HISTORY[circuit.slug as string] && (() => {
        const history = CIRCUIT_HISTORY[circuit.slug as string];
        return (
          <section className="max-w-7xl mx-auto px-6 md:px-20 py-20 border-t border-white/5" aria-label="Historical winners">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Past Winners list */}
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">Race History</p>
                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-white mb-8">Past Winners</h2>
                <div className="space-y-3">
                  {history.winners.map((winner, idx) => (
                    <motion.div
                      key={winner.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex items-center gap-4 py-3 border-b border-white/5 group"
                    >
                      <span className="font-mono text-sm text-white/20 w-12">{winner.year}</span>
                      <div className="w-[3px] h-8 rounded-full shrink-0" style={{ backgroundColor: winner.teamColor }} />
                      <div className="flex-1">
                        <p className="font-heading text-base font-bold text-white group-hover:text-ferrari-light transition-colors">{winner.driver}</p>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{winner.team}</p>
                      </div>
                      {winner.lapRecord && (
                        <span className="font-mono text-[10px] text-white/20 tracking-wider hidden sm:block">{winner.lapRecord}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Record holder callout */}
              <div className="md:w-64 shrink-0">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-4">Circuit Record Holder</p>
                  <p className="font-heading text-5xl font-black text-ferrari-light">{history.mostWins.wins}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-1">Victories</p>
                  <p className="font-heading text-xl font-bold text-white mt-4">{history.mostWins.driver}</p>
                  <div className="mt-6 w-full h-[1px] bg-white/5" />
                  <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mt-4">Most wins at this venue in F1 history</p>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

    </article>
  );
}
