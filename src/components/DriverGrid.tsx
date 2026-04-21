"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRIVERS } from "../data/f1-data";
import Image from "next/image";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DriverGrid() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    let mm = gsap.matchMedia();

    // Desktop: Pin and horizontal scroll wrapper
    mm.add("(min-width: 768px)", () => {
      // Horizontal Scroll with pinning handled by GSAP
      gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
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
    });

    // Mobile: Native overflow scroll, no GSAP pinning required
    mm.add("(max-width: 767px)", () => {
      // Optional: Add simple vertical entry animations or leave native
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black/20 backdrop-blur-[2px] z-20 overflow-hidden min-h-screen md:h-auto">
      <div className="flex flex-col md:flex-row md:h-screen md:items-center py-32 md:py-0">
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase text-white title-shadow">
            2026 Grid
          </h2>
          <div className="w-24 h-1 bg-ferrari mt-4" />
        </div>

        <div ref={scrollRef} className="flex gap-4 md:gap-8 px-6 md:px-20 pt-10 md:pt-32 will-change-transform overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-10 hide-scrollbar">
          {DRIVERS.map((driver, index) => (
            <div
              key={driver.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onClick={() => router.push(`/drivers/${driver.slug}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/drivers/${driver.slug}`);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${driver.name}, driving for ${driver.team}`}
              className="group relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] bg-[#111] overflow-hidden rounded-xl border border-[#333] shrink-0 transition-all duration-300 cursor-pointer hover:border-white/50 focus-visible:outline-white focus-visible:outline-offset-4"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
               <div className="absolute bottom-0 w-full h-[90%] transition-transform duration-500">
                <Image
                  ref={(el) => { imagesRef.current[index] = el as unknown as HTMLImageElement; }}
                  src={driver.image}
                  alt={`Action portrait of ${driver.name}`}
                  fill
                  className="object-contain object-bottom group-hover:scale-110 transition-transform duration-700"
                />
               </div>
               
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="font-mono text-4xl font-black text-white/20 select-none group-hover:text-white/40 transition-colors">
                     {driver.id.substring(0,3).toUpperCase()}
                   </div>
                   <div className={`w-4 h-4 rounded-full ${driver.color}`} aria-hidden="true" />
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
                     <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden" role="progressbar" aria-valuenow={driver.points} aria-valuemin={0} aria-valuemax={500}>
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
