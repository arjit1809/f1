"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchDriverStandings } from "../lib/f1-api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LiveStandings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const [standings, setStandings] = useState<any[]>([]);

  useEffect(() => {
    fetchDriverStandings().then(setStandings);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || standings.length === 0) return;

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

      if (chartRef.current) {
        gsap.from(chartRef.current, {
          opacity: 0, scale: 0.98, y: 20, duration: 1.2, ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [standings]);

  // Mock trend data for the chart based on current standings top 3
  const chartData = [
    { race: "R1", p1: 25, p2: 18, p3: 15 },
    { race: "R2", p1: 44, p2: 36, p3: 27 },
    { race: "R3", p1: 69, p2: 51, p3: 42 },
    { race: "NOW", p1: standings[0]?.points_current || 0, p2: standings[1]?.points_current || 0, p3: standings[2]?.points_current || 0 },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-black/30 backdrop-blur-sm z-30 px-6 md:px-20 border-t border-[#333]">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12">
        <div className="xl:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,0,0,0.8)]" />
            <h2 className="font-heading text-4xl font-bold uppercase text-white">2026 Standings</h2>
          </div>
          <div className="bg-[#0f0f0f] border border-[#222] rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
            <div className="flex px-6 py-4 bg-[#1a1a1a] text-silver uppercase tracking-widest border-b border-[#333]">
               <div className="w-12 text-center">Pos</div>
               <div className="flex-1">Driver</div>
               <div className="w-24 text-right">Pts</div>
            </div>
            {standings.length > 0 ? standings.slice(0, 10).map((driver, idx) => (
              <div 
                key={driver.driver_number}
                ref={(el) => { rowsRef.current[idx] = el; }}
                className="flex px-6 py-4 border-b border-[#222] hover:bg-[#1a1a1a] transition-colors items-center group"
              >
                 <div className="w-12 text-center font-bold text-white/50">{driver.position_current}</div>
                 <div className="flex-1 flex gap-4 items-center">
                    <div className="w-1 h-6 rounded-r" style={{ backgroundColor: driver.color }}/>
                    <div className="text-white font-bold uppercase group-hover:text-red-500 transition-all text-xs md:text-sm">
                       {driver.name}
                       <span className="ml-2 text-[10px] opacity-40 font-normal">{driver.team}</span>
                    </div>
                 </div>
                 <div className="w-24 text-right text-white font-bold">{Math.round(driver.points_current)}</div>
              </div>
            )) : (
              <div className="p-10 text-center text-white/30 font-mono italic">Synchronizing with Race Control...</div>
            )}
          </div>
        </div>

        <div className="xl:w-1/2 h-[500px]">
          <h3 className="font-heading text-2xl font-bold uppercase text-white mb-6">Battle for Supremacy</h3>
          <div ref={chartRef} className="w-full h-full bg-[#0f0f0f] border border-[#222] rounded-xl p-6 shadow-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorP1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={standings[0]?.color || "#3671C6"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={standings[0]?.color || "#3671C6"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="race" stroke="#555" tick={{ fill: '#888', fontFamily: 'monospace', fontSize: 10 }} />
                <YAxis stroke="#555" tick={{ fill: '#888', fontFamily: 'monospace', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Area type="monotone" dataKey="p1" stroke={standings[0]?.color || "#3671C6"} strokeWidth={3} fillOpacity={1} fill="url(#colorP1)" name={standings[0]?.name || "P1"} />
                <Area type="monotone" dataKey="p2" stroke={standings[1]?.color || "#DC0000"} strokeWidth={2} fill="none" name={standings[1]?.name || "P2"} />
                <Area type="monotone" dataKey="p3" stroke={standings[2]?.color || "#00D2BE"} strokeWidth={2} fill="none" name={standings[2]?.name || "P3"} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
