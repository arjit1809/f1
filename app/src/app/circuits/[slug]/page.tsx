"use client";

import { useParams, useRouter } from "next/navigation";
import { CIRCUITS } from "../../../data/f1-data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CircuitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [circuit, setCircuit] = useState<any>(null);

  useEffect(() => {
    // Exact matching for slugs
    const found = CIRCUITS.find((c) => c.slug === params.slug);
    setCircuit(found);
  }, [params.slug]);

  if (!circuit) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white gap-4">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="tracking-[0.5em] text-[10px] uppercase opacity-40">Synchronizing Telemetry...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black -z-10" />
      
      {/* Header / Back Button */}
      <nav className="p-8 flex justify-between items-center sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-silver hover:text-white transition-colors"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="uppercase tracking-widest text-[10px]">Return to Calendar</span>
        </button>
        <div className="text-[10px] text-white/20 uppercase tracking-[0.5em]">
          Sector Analysis // {circuit.country}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Col: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="text-red-500 font-bold text-sm tracking-widest mb-4 block uppercase leading-none">
            {circuit.location}
          </span>
          <h1 className="text-6xl md:text-9xl font-black font-heading uppercase mb-8 leading-[0.8] tracking-tighter">
            {circuit.name}
          </h1>
          
          <p className="text-silver leading-relaxed mb-12 text-lg max-w-xl opacity-80">
            {circuit.description}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="border-l border-white/10 pl-4">
              <span className="text-[10px] text-white/30 uppercase block mb-1">Lap Record</span>
              <span className="text-2xl font-bold">{circuit.stats.record}</span>
            </div>
            <div className="border-l border-white/10 pl-4">
              <span className="text-[10px] text-white/30 uppercase block mb-1">DRS System</span>
              <span className="text-2xl font-bold">{circuit.stats.drs}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-md border-l-4 border-l-red-500 shadow-2xl">
            <h3 className="text-[10px] font-bold text-red-500 uppercase mb-3 tracking-widest">Technical Insight</h3>
            <p className="text-silver italic text-sm leading-relaxed">
              "{circuit.funFact}"
            </p>
          </div>
        </motion.div>

        {/* Right Col: Map & Telemetry */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          <div className="w-full aspect-square relative flex items-center justify-center">
             {/* Large Ghost Map */}
             <svg viewBox="0 0 800 600" className="w-full h-full absolute opacity-5 scale-125 blur-sm">
               <path d={circuit.path} fill="none" stroke="white" strokeWidth="40" />
             </svg>
             
             {/* Animated Focal Map */}
             <svg viewBox="0 0 800 600" className="w-full h-full relative z-10 drop-shadow-[0_0_50px_rgba(220,0,0,0.3)]">
               <motion.path 
                 d={circuit.path}
                 fill="none"
                 stroke={circuit.color === 'ferrari' ? '#DC0000' : circuit.color === 'mercedes' ? '#00D2BE' : '#FF8700'}
                 strokeWidth="3"
                 strokeLinecap="round"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
               />
               
               {/* Decorative dots for corners */}
               <circle cx="100" cy="300" r="4" fill="white" className="animate-pulse" />
             </svg>
          </div>

          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 grid grid-cols-6 grid-rows-6 opacity-20">
             {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/10" />
             ))}
          </div>
        </motion.div>

      </div>

      {/* Footer Decoration */}
      <div className="w-full border-t border-white/5 py-10 mt-20 text-center opacity-30">
         <span className="text-[10px] text-white uppercase tracking-[1em]">F1 Analysis System // G-FOR_CE V2.0</span>
      </div>
    </main>
  );
}
