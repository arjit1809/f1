"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CIRCUITS, Circuit } from "../data/f1-data";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CircuitSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Filter sequences: Monaco is now the sole spotlight
  const monaco = (CIRCUITS as unknown as Circuit[]).find(c => c.id === 'monaco');
  // Miami moves to the "others" collection for the deck
  const others = (CIRCUITS as unknown as Circuit[]).filter(c => c.id !== 'monaco');

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".circuit-card");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Slightly shorter since we removed one spotlight
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // --- STAGE 1: Monaco Spotlight ---
      // (Starts visible and animates path drawing on scroll)

      // --- STAGE 2: Transition to Deck ---
      tl.to(".monaco-spotlight", { opacity: 0, scale: 0.9, y: -20, pointerEvents: "none" }, "deck-start");
      tl.fromTo(".world-tour-deck", 
        { opacity: 0, scale: 1.1, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }, 
        "deck-start+=0.2"
      );

      // FANNING THE DECK
      cards.forEach((card, i) => {
        tl.to(card, {
          x: i * 80,
          rotateZ: i * 3,
          ease: "none",
        }, "deck-start+=0.5");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Sync Path Animation Helper
  const SpotlightTrack = ({ circuit, className, startOffset, endOffset }: { circuit: Circuit, className: string, startOffset: number, endOffset: number }) => {
    const pathRef = useRef<SVGPathElement>(null);
    useEffect(() => {
      if (!pathRef.current || !containerRef.current) return;
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `top+=${startOffset} top`,
          end: () => `top+=${endOffset} top`,
          scrub: 1,
        }
      });
    }, [startOffset, endOffset]);

    return (
      <div className={`${className} absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-20 z-10 transition-opacity duration-500`}>
        <div className="md:w-1/3 z-20">
           <span className="font-mono text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Featured Spotlight</span>
           <h2 className="font-heading text-5xl md:text-8xl font-bold uppercase text-white mb-2 leading-none tracking-tighter">{circuit.name}</h2>
           <p className="font-mono text-silver mb-8 uppercase tracking-widest text-xs opacity-60 italic">{circuit.location}</p>
           <div className="flex gap-12">
              <div className="border-l-2 border-white/10 pl-6">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Lap Record</span>
                <span className="text-xl font-bold text-white tracking-widest">{circuit.stats.record}</span>
              </div>
              <div className="border-l-2 border-white/10 pl-6">
                <span className="text-[10px] text-white/30 uppercase block mb-1">DRS Deployment</span>
                <span className="text-xl font-bold text-white uppercase tracking-widest">{circuit.stats.drs}</span>
              </div>
           </div>
        </div>
        <div className="md:w-2/3 flex justify-center relative">
          <svg viewBox="0 0 800 600" className="w-full max-w-2xl drop-shadow-[0_0_40px_rgba(255,255,255,0.05)] scale-110">
            {/* The 'ghost' path is now removed to allow the tracing to actually 'make' the circuit */}
            <path 
              ref={pathRef}
              d={circuit.path} 
              fill="none" 
              stroke={circuit.color === 'ferrari' ? '#DC0000' : '#00D2BE'} 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="drop-shadow-[0_0_15px_rgba(0,210,190,0.4)]"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505] z-30 border-t border-white/5 shadow-2xl">
      
      {/* STAGE 1: Monaco Spotlight (Starting Screen) */}
      {monaco && (
        <SpotlightTrack 
          circuit={monaco} 
          className="monaco-spotlight" 
          startOffset={200} 
          endOffset={1800} 
        />
      )}

      {/* STAGE 2: World Tour Deck */}
      <div className="world-tour-deck opacity-0 pointer-events-none absolute inset-0 w-full h-full flex flex-col items-center justify-center">
        <div className="text-center absolute top-20 left-10 md:left-20">
           <span className="font-mono text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Expand the Tour</span>
           <h2 className="font-heading text-6xl font-bold uppercase text-white leading-none tracking-tighter">World Grid</h2>
        </div>

        <div ref={deckRef} className="relative w-full max-w-4xl h-[450px] flex items-center justify-center mt-20">
           {others.slice(0, 10).map((circuit, idx) => (
             <Link 
               key={circuit.id}
               href={`/circuits/${circuit.slug}`}
               className="circuit-card absolute w-[280px] h-[400px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden group cursor-pointer transition-all hover:border-red-500/50"
               style={{ zIndex: idx, transformOrigin: "bottom center" }}
             >
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/40 border-r border-white/5 flex items-center justify-center z-20">
                   <span className="font-heading text-white/40 font-bold uppercase tracking-[0.5em] text-[10px] -rotate-90 whitespace-nowrap group-hover:text-red-500 transition-colors">
                     {circuit.name}
                   </span>
                </div>
                <div className="absolute inset-0 pl-16 p-8 flex flex-col justify-between">
                   <div>
                     <span className="text-[10px] text-white/20 uppercase tracking-widest block mb-2">{circuit.country}</span>
                     <h3 className="font-heading text-3xl font-black text-white leading-[0.8] opacity-80 group-hover:opacity-100 transition-opacity">
                        {circuit.name.split(' ')[0]}<br/>
                        <span className="text-sm opacity-40 font-mono tracking-tighter">{circuit.location.split(' ')[0]}...</span>
                     </h3>
                   </div>
                   <div className="relative h-32 flex items-center justify-center mt-4 group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 800 600" className="w-full h-full opacity-20 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                         <path d={circuit.path} fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" />
                      </svg>
                   </div>
                   <div className="flex justify-between items-end border-t border-white/5 pt-4">
                      <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Details</div>
                      <span className="text-red-500 font-bold text-xs uppercase group-hover:translate-x-2 transition-transform">&rarr;</span>
                   </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
             </Link>
           ))}

           {/* More Tracks Toggle */}
           <div 
             onClick={() => setShowGallery(true)}
             className="circuit-card absolute w-[280px] h-[400px] bg-red-600/10 border-2 border-dashed border-red-500/40 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:bg-red-600/20 hover:border-red-500 transition-all shadow-[0_0_30px_rgba(220,0,0,0.1)]"
             style={{ zIndex: 11 }}
           >
              <div className="w-20 h-20 rounded-full border border-red-500/30 flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-500">
                <span className="text-4xl text-red-500 font-light">+</span>
              </div>
              <span className="font-heading text-lg font-black text-white uppercase tracking-tighter text-center px-6">
                Explore All<br/>
                <span className="text-red-500 text-3xl">24</span><br/>
                Tracks
              </span>
           </div>
        </div>
      </div>

      {/* Gallery Overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl p-10 lg:p-20 flex flex-col items-center justify-around overflow-y-auto">
           <button 
             onClick={() => setShowGallery(false)}
             className="absolute top-10 right-10 text-white font-mono uppercase text-[10px] tracking-widest border border-white/10 px-6 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2"
           >
             <span className="text-lg">&times;</span> Close Gallery
           </button>
           <h2 className="font-heading text-4xl font-black text-white uppercase mb-12 tracking-[0.3em] text-center">
             The <span className="text-red-500 text-5xl">2025</span> Calendar
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
              {(CIRCUITS as unknown as Circuit[]).map(c => (
                <Link key={c.id} href={`/circuits/${c.slug}`} className="bg-white/5 border border-white/5 p-8 hover:border-red-500/50 transition-all group backdrop-blur-sm rounded-lg">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tighter">{c.name}</h3>
                     <span className="text-[9px] text-white/20 font-mono uppercase tracking-[0.2em]">{c.country}</span>
                   </div>
                   <svg viewBox="0 0 800 600" className="w-full h-20 opacity-30 group-hover:opacity-100 transition-all duration-700">
                      <path d={c.path} fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                   </svg>
                </Link>
              ))}
           </div>
        </div>
      )}

      {/* Progress / Transition Indicator */}
      <div className="absolute bottom-10 left-12 flex items-center gap-6 opacity-30 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-red-500 font-bold">Featured Analyst</span>
        <div className="w-12 h-[1px] bg-white/30" />
        <span className="font-mono text-[9px] uppercase tracking-[0.5em]">Calendar Discovery</span>
      </div>
    </section>
  );
}
