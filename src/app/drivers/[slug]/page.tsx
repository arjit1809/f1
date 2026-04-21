"use client";

import { useParams, useRouter } from "next/navigation";
import { DRIVERS } from "@/data/f1-data";
import { DRIVER_CAREER_STATS } from "@/data/f1-history";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { useFavorites } from "@/context/FavoritesContext";

export default function DriverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [driver, setDriver] = useState<any>(null);
  const { toggleDriverFavorite, isDriverFavorite } = useFavorites();

  useEffect(() => {
    const found = DRIVERS.find((d) => d.slug === params.slug);
    setDriver(found || null);
  }, [params.slug]);

  if (!driver) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white gap-4">
        <div className="w-12 h-12 border-4 border-ferrari border-t-transparent rounded-full animate-spin"></div>
        <span className="tracking-[0.5em] text-[10px] uppercase opacity-40">Accessing Driver Profile...</span>
      </div>
    );
  }

  // Schema Markup
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": driver.name,
    "jobTitle": "Formula 1 Driver",
    "affiliation": {
        "@type": "SportsTeam",
        "name": driver.team
    },
    "image": driver.image,
    "description": driver.bio
  };

  return (
    <article className="min-h-screen bg-[#050505] text-white font-mono selection:bg-ferrari selection:text-white pt-24 pb-20">
      <JsonLd data={personSchema} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Driver Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[4/5] bg-[#111] overflow-hidden border border-white/5 shadow-2xl group"
        >
          <Image 
            src={driver.image} 
            alt={`Official driver portrait of ${driver.name}, wearing ${driver.team} racing suit`} 
            fill 
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8">
            <span className="font-heading text-8xl font-black text-white/10" aria-hidden="true">{driver.country}</span>
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <header className="mb-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-ferrari-light font-bold uppercase tracking-[0.3em] text-sm">{driver.team}</span>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mt-2">
                  {driver.name.split(' ')[0]}<br />
                  <span className="text-silver">{driver.name.split(' ')[1]}</span>
                </h1>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleDriverFavorite(driver.slug)}
                aria-label={isDriverFavorite(driver.slug) ? `Remove ${driver.name} from favourites` : `Add ${driver.name} to favourites`}
                aria-pressed={isDriverFavorite(driver.slug)}
                className={`mt-2 shrink-0 flex flex-col items-center gap-1 px-4 py-3 border rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all duration-500 ${
                  isDriverFavorite(driver.slug)
                    ? "bg-ferrari/10 border-ferrari text-ferrari shadow-[0_0_20px_rgba(220,0,0,0.3)]"
                    : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                }`}
              >
                <span className="text-xl">{isDriverFavorite(driver.slug) ? "★" : "☆"}</span>
                <span>{isDriverFavorite(driver.slug) ? "Favourited" : "Favourite"}</span>
              </motion.button>
            </div>
          </header>

          <div className="space-y-8">
            <p className="text-silver text-lg leading-relaxed border-l-2 border-ferrari-light pl-6">
              {driver.bio}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">2026 Points</p>
                <p className="text-4xl font-bold font-heading">{driver.points}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Race Number</p>
                <p className="text-4xl font-bold font-heading text-ferrari-light">#{driver.id === 'verstappen' ? '1' : '44'}</p>
              </div>
            </div>

            {/* Career Milestones Block */}
            {DRIVER_CAREER_STATS[driver.slug] && (() => {
              const career = DRIVER_CAREER_STATS[driver.slug];
              const statItems = [
                { label: "Championships", value: career.championships, highlight: career.championships > 1 },
                { label: "Race Wins", value: career.wins, highlight: false },
                { label: "Podiums", value: career.podiums, highlight: false },
                { label: "Pole Positions", value: career.poles, highlight: false },
                { label: "Fastest Laps", value: career.fastestLaps, highlight: false },
                { label: "Seasons Active", value: `${career.firstEntry}–`, highlight: false },
              ];
              return (
                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-6">Career Statistics</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {statItems.map((stat) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg border ${
                          stat.highlight
                            ? "border-ferrari/40 bg-ferrari/5"
                            : "border-white/5 bg-white/[0.02]"
                        }`}
                      >
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`font-heading text-3xl font-black ${
                          stat.highlight ? "text-ferrari-light" : "text-white"
                        }`}>
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <blockquote className="mt-6 p-4 border-l-2 border-ferrari-light bg-white/[0.02] rounded-r-lg">
                    <p className="font-mono text-xs text-silver/70 leading-relaxed italic">&ldquo;{career.careerHighlight}&rdquo;</p>
                  </blockquote>
                </div>
              );
            })()}

            <button 
              onClick={() => router.push('/')}
              className="mt-12 px-8 py-4 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 uppercase text-xs tracking-widest font-bold"
            >
              Back to Telemetry Hub
            </button>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
