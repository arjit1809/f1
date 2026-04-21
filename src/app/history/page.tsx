"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PAST_CHAMPIONS, DOMINANCE_ERAS, WDCRecord } from "@/data/f1-history";
import Link from "next/link";

const ERA_LABELS: Record<string, string> = {
  "ferrari-dominance": "Ferrari Dominance",
  "red-bull-rise": "Red Bull Rise",
  "hybrid-mercedes": "Hybrid Mercedes",
  "max-era": "Max's Era",
  "new-era": "New Era",
};

export default function HistoryPage() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const filteredChampions = selectedEra
    ? PAST_CHAMPIONS.filter((c) => c.era === selectedEra)
    : PAST_CHAMPIONS;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono pt-28 pb-32">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/30 uppercase tracking-[0.5em] text-[10px] block mb-4"
        >
          Archive // Formula 1 Legend
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none"
        >
          Hall of<br />
          <span className="text-ferrari">Champions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-silver/60 text-lg max-w-2xl leading-relaxed"
        >
          26 seasons. 5 dominant eras. Every World Champion since 2000 — the names, numbers, 
          and narratives that define modern Formula 1.
        </motion.p>
      </div>

      {/* Dominance Era Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 mb-20">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-6">Dominance Eras</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {DOMINANCE_ERAS.map((era, idx) => (
            <motion.button
              key={era.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => setSelectedEra(selectedEra === era.id ? null : era.id)}
              aria-pressed={selectedEra === era.id}
              className={`text-left p-5 rounded-xl border transition-all duration-400 ${
                selectedEra === era.id
                  ? "border-current"
                  : "border-white/5 hover:border-white/20 bg-white/[0.02]"
              }`}
              style={
                selectedEra === era.id
                  ? {
                      backgroundColor: era.teamColor + "15",
                      borderColor: era.teamColor,
                      boxShadow: `0 0 30px ${era.teamColor}20`,
                    }
                  : {}
              }
            >
              <span className="text-2xl block mb-3">{era.icon}</span>
              <p
                className="font-heading text-lg font-black uppercase leading-tight mb-1"
                style={selectedEra === era.id ? { color: era.teamColor } : {}}
              >
                {era.label}
              </p>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-3">
                {era.period}
              </p>
              <p className="text-[10px] text-white/30 font-mono leading-relaxed hidden xl:block">
                {era.description.slice(0, 80)}...
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: era.teamColor }}
                />
                <span className="text-[9px] font-mono text-white/40">
                  {era.championships} WDC{era.championships > 1 ? "s" : ""}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Era description expanded */}
        <AnimatePresence>
          {selectedEra && (
            <motion.div
              key={selectedEra}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {DOMINANCE_ERAS.filter((e) => e.id === selectedEra).map((era) => (
                <div
                  key={era.id}
                  className="mt-4 p-6 rounded-xl border"
                  style={{ borderColor: era.teamColor + "30", backgroundColor: era.teamColor + "08" }}
                >
                  <p className="font-mono text-sm text-silver/70 leading-relaxed max-w-3xl">
                    {era.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Champions Table */}
      <section className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
            {selectedEra
              ? `${ERA_LABELS[selectedEra]} // ${filteredChampions.length} Champions`
              : `2000–2025 // ${filteredChampions.length} Champions`}
          </p>
          {selectedEra && (
            <button
              onClick={() => setSelectedEra(null)}
              className="text-[9px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              Clear filter ×
            </button>
          )}
        </div>

        <div className="border border-white/5 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3 bg-white/[0.03] border-b border-white/5 text-[9px] uppercase tracking-widest text-white/30">
            <span className="col-span-1">Year</span>
            <span className="col-span-4">Driver</span>
            <span className="col-span-3">Team</span>
            <span className="col-span-2 text-right">Points</span>
            <span className="col-span-2 text-right">Wins</span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredChampions.map((champion, idx) => (
              <motion.div
                key={champion.year}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.03 }}
                className="grid grid-cols-12 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center group"
              >
                <span className="col-span-1 font-mono text-sm font-bold text-white/40">
                  {champion.year}
                </span>
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className="w-[3px] h-6 rounded-full shrink-0"
                    style={{ backgroundColor: champion.teamColor }}
                  />
                  <span className="font-heading text-base font-bold text-white group-hover:text-ferrari-light transition-colors">
                    {champion.driver}
                  </span>
                </div>
                <span className="col-span-3 font-mono text-xs text-white/50">
                  {champion.team}
                </span>
                <span className="col-span-2 text-right font-heading font-bold text-white text-sm">
                  {champion.points}
                </span>
                <span className="col-span-2 text-right">
                  <span
                    className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                    style={{ color: champion.teamColor, backgroundColor: champion.teamColor + "15" }}
                  >
                    {champion.wins}W
                  </span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats summary bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Seasons", value: "26" },
            { label: "Unique Champions", value: "9" },
            { label: "Unique Teams", value: "5" },
            { label: "Most Titles", value: "7 — Hamilton" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-xl"
            >
              <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
              <p className="font-heading text-2xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-16 text-center">
        <Link
          href="/"
          className="inline-block px-8 py-4 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 uppercase text-xs tracking-widest font-bold"
        >
          ← Back to Telemetry Hub
        </Link>
      </div>
    </main>
  );
}
