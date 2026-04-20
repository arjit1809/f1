"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRIVERS } from "../data/f1-data";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DriverGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll with pinning handled by GSAP
      gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true, // Let GSAP handle the pinning
          invalidateOnRefresh: true,
        },
      });

      // Parallax on Images
      imagesRef.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            x: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${scrollRef.current!.scrollWidth}`,
              scrub: 1,
            },
          });
        }
      });

      // Hover Effects
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const img = imagesRef.current[index];
          
          const onEnter = () => {
             gsap.to(card, { scale: 1.02, borderColor: "#ffffff66", duration: 0.3 });
             if (img) gsap.to(img, { scale: 1.1, y: -10, duration: 0.4 });
          };
          
          const onLeave = () => {
             gsap.to(card, { scale: 1, borderColor: "#333", duration: 0.3 });
             if (img) gsap.to(img, { scale: 1, y: 0, duration: 0.4 });
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          
          // Cleanup listeners handled by ctx.revert() but we can be explicit
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black/20 backdrop-blur-[2px] z-20 overflow-hidden">
      <div className="flex h-screen items-center">
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase text-white title-shadow">
            2025 Grid
          </h2>
          <div className="w-24 h-1 bg-ferrari mt-4" />
        </div>

        <div ref={scrollRef} className="flex gap-8 px-10 md:px-20 pt-32 will-change-transform">
          {DRIVERS.map((driver, index) => (
            <div
              key={driver.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] bg-[#111] overflow-hidden rounded-xl border border-[#333] shrink-0 transition-colors"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
               <div className="absolute bottom-0 w-full h-[90%] transition-transform duration-500">
                <Image
                  ref={(el) => { imagesRef.current[index] = el as unknown as HTMLImageElement; }}
                  src={driver.image}
                  alt={driver.name}
                  fill
                  className="object-contain object-bottom"
                />
               </div>
               
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="font-mono text-4xl font-black text-white/20 select-none group-hover:text-white/40 transition-colors">
                     {driver.id.substring(0,3).toUpperCase()}
                   </div>
                   <div className={`w-4 h-4 rounded-full ${driver.color}`} />
                </div>
                
                <div>
                   <h3 className="font-heading uppercase text-3xl font-bold text-white leading-none">
                     {driver.name.split(' ')[0]}<br />
                     <span className="text-4xl">{driver.name.split(' ')[1]}</span>
                   </h3>
                   <p className="font-mono text-sm text-silver mt-2 uppercase tracking-wide">
                     {driver.team}
                   </p>
                   
                   <div className="mt-6">
                     <div className="flex justify-between font-mono text-xs text-silver mb-1">
                       <span>World Championship</span>
                       <span>{driver.points} pts</span>
                     </div>
                     <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${driver.color} transition-all duration-1000`}
                         style={{ width: `${(driver.points / 300) * 100}%` }}
                       />
                     </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
