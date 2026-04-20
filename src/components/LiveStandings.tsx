"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DRIVERS } from "../data/f1-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const data = [
  { race: "BHR", VER: 26, LEC: 18, HAM: 15 },
  { race: "KSA", VER: 51, LEC: 36, HAM: 27 },
  { race: "AUS", VER: 76, LEC: 36, HAM: 42 },
  { race: "JPN", VER: 102, LEC: 54, HAM: 52 },
  { race: "CHN", VER: 136, LEC: 76, HAM: 67 },
  { race: "MIA", VER: 162, LEC: 94, HAM: 85 },
];

export default function LiveStandings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entry for rows
      gsap.from(rowsRef.current, {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Entry for chart
      if (chartRef.current) {
        gsap.from(chartRef.current, {
          opacity: 0,
          scale: 0.98,
          y: 20,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-black/30 backdrop-blur-sm z-30 px-6 md:px-20 border-t border-[#333]">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12">
        
        {/* Table representation */}
        <div className="xl:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,0,0,0.8)]" />
            <h2 className="font-heading text-4xl font-bold uppercase text-white">Live Data Feed</h2>
          </div>
          
          <div className="bg-[#0f0f0f] border border-[#222] rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
            <div className="flex px-6 py-4 bg-[#1a1a1a] text-silver uppercase tracking-widest border-b border-[#333]">
               <div className="w-12 text-center">Pos</div>
               <div className="flex-1">Driver</div>
               <div className="w-24 text-right">Pts</div>
            </div>
            
            {DRIVERS.map((driver, idx) => (
              <div 
                key={driver.id}
                ref={(el) => { rowsRef.current[idx] = el; }}
                className="flex px-6 py-4 border-b border-[#222] hover:bg-[#1a1a1a] transition-colors items-center group cursor-pointer"
              >
                 <div className="w-12 text-center font-bold text-white/50">{idx + 1}</div>
                 <div className="flex-1 flex gap-4 items-center">
                    <div className={`w-1 h-6 ${driver.color} rounded-r`}/>
                    <div className="text-white font-bold uppercase group-hover:text-shadow-glow transition-all">
                       {driver.name}
                    </div>
                 </div>
                 <div className="w-24 text-right text-white font-bold">{driver.points}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphical Representation */}
        <div className="xl:w-1/2 h-[500px]">
          <h3 className="font-heading text-2xl font-bold uppercase text-white mb-6">Championship Battle</h3>
          <div ref={chartRef} className="w-full h-full bg-[#0f0f0f] border border-[#222] rounded-xl p-6 shadow-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3671C6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3671C6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC0000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#DC0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="race" stroke="#555" tick={{ fill: '#888', fontFamily: 'monospace', fontSize: 12 }} />
                <YAxis stroke="#555" tick={{ fill: '#888', fontFamily: 'monospace', fontSize: 12 }} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111', borderColor: '#333', fontFamily: 'monospace' }}
                   itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="VER" stroke="#3671C6" strokeWidth={3} fillOpacity={1} fill="url(#colorVer)" />
                <Area type="monotone" dataKey="LEC" stroke="#DC0000" strokeWidth={3} fillOpacity={1} fill="url(#colorLec)" />
                <Area type="monotone" dataKey="HAM" stroke="#00D2BE" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
