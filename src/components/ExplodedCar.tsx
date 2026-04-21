"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAR_PARTS } from "../data/f1-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExplodedCar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const wingRef = useRef<HTMLDivElement>(null);
  const puRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions as any;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Animate Halo
      tl.to(haloRef.current, {
        y: isMobile ? -80 : -150,
        opacity: 1,
        ease: "none",
      }, 0);

      // Animate Front Wing
      tl.to(wingRef.current, {
        x: isMobile ? 60 : 200,
        ease: "none",
      }, 0);

      // Animate Power Unit
      tl.to(puRef.current, {
        x: isMobile ? -60 : -200,
        ease: "none",
      }, 0);

      // Animate Cards staggered entry
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.to(card, {
            opacity: 1,
            y: -10,
            duration: 0.2,
            ease: "power2.out",
          }, index * 0.1 + 0.3);
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] w-full flex items-center justify-center p-8 z-10"
    >
      <div className="sticky top-1/4 w-full max-w-6xl h-[600px] flex items-center justify-center">
        
        {/* Mock Car Base (Chassis) */}
        <div className="absolute w-64 h-96 bg-silver/10 border border-silver/30 rounded-t-full shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md flex items-center justify-center">
            <span className="font-mono text-xs text-white/50 absolute bottom-4">CHASSIS_01</span>
        </div>

        {/* Halo */}
        <div
          ref={haloRef}
          className="absolute z-30 flex gap-4 items-center -top-10 opacity-100"
        >
          <div className="w-24 h-24 border-t-8 border-x-4 border-silver/80 rounded-t-full" />
          <div 
            ref={(el) => { cardsRef.current[0] = el; }}
            className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded max-w-xs opacity-0"
          >
            <h3 className="font-heading text-redbull font-bold text-xl uppercase">{CAR_PARTS[0].name}</h3>
            <p className="font-mono text-xs text-silver mt-1">{CAR_PARTS[0].desc}</p>
            <div className="mt-2 text-white font-mono text-sm border-t border-white/10 pt-2">{CAR_PARTS[0].stat}</div>
          </div>
        </div>

        {/* Front Wing */}
        <div
          ref={wingRef}
          className="absolute z-20 flex flex-col items-center bottom-0 right-[25%]"
        >
          <div className="w-48 h-8 bg-black border border-ferrari/50 rounded shadow-redbull" />
          <div 
            ref={(el) => { cardsRef.current[2] = el; }}
            className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded max-w-xs absolute top-12 opacity-0"
          >
            <h3 className="font-heading text-ferrari font-bold text-xl uppercase">{CAR_PARTS[2].name}</h3>
            <p className="font-mono text-xs text-silver mt-1">{CAR_PARTS[2].desc}</p>
            <div className="mt-2 text-white font-mono text-sm border-t border-white/10 pt-2">{CAR_PARTS[2].stat}</div>
          </div>
        </div>

        {/* Power Unit */}
        <div
          ref={puRef}
          className="absolute z-10 flex flex-col items-center top-[20%] left-[25%]"
        >
          <div className="w-32 h-32 bg-zinc-800 border-2 border-mercedes/50 rounded-lg flex items-center justify-center shadow-lg">
             <div className="w-20 h-20 border border-zinc-600 rounded-full" />
          </div>
          <div 
            ref={(el) => { cardsRef.current[1] = el; }}
            className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded max-w-xs absolute top-36 opacity-0"
          >
            <h3 className="font-heading text-mercedes font-bold text-xl uppercase">{CAR_PARTS[1].name}</h3>
            <p className="font-mono text-xs text-silver mt-1">{CAR_PARTS[1].desc}</p>
            <div className="mt-2 text-white font-mono text-sm border-t border-white/10 pt-2">{CAR_PARTS[1].stat}</div>
          </div>
        </div>

        {/* Title */}
        <div className="absolute top-0 right-10 text-right opacity-30 select-none hidden md:block">
           <h2 className="text-8xl font-black font-heading line-through">ANATOMY</h2>
           <p className="font-mono text-2xl">OF SPEED</p>
        </div>
      </div>
    </section>
  );
}
