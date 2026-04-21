"use client";

import Link from "next/link";
import { CIRCUITS, CALENDAR } from "@/data/f1-data";
import { motion } from "framer-motion";

export default function RacesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <header className="mb-20">
          <span className="text-mercedes font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">World Championship Schedule // 2026</span>
          <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">The Races</h1>
        </header>

        <div className="space-y-4">
          {CIRCUITS.map((circuit, idx) => {
            const race = CALENDAR.find(r => r.country.toLowerCase() === circuit.country.toLowerCase());
            return (
              <Link 
                key={circuit.id} 
                href={`/races/${circuit.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-[#0a0a0a] border border-white/5 hover:bg-white/5 transition-all duration-300 focus-visible:outline-white focus-visible:outline-offset-n4"
                aria-label={`Round ${idx + 1}: ${circuit.name} in ${circuit.country}. Status: ${race?.date || 'TBD'}`}
              >
                <div className="flex items-center gap-10">
                  <span className="text-white/20 text-4xl font-black font-heading w-12" aria-hidden="true">{idx + 1}</span>
                  <div>
                    <span className="text-mercedes text-[10px] uppercase font-bold tracking-widest">{race?.date || 'TBD'}</span>
                    <h2 className="font-heading text-3xl font-bold uppercase group-hover:text-mercedes transition-colors">{circuit.name}</h2>
                    <p className="text-silver/50 text-xs uppercase mt-1">{circuit.location}, {circuit.country}</p>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 flex items-center gap-10">
                   <div className="hidden lg:block text-right">
                      <p className="text-[10px] text-white/20 uppercase">Lap Record</p>
                      <p className="text-sm font-bold">{circuit.stats.record}</p>
                   </div>
                   <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                      →
                   </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
