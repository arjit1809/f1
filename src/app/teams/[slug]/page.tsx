"use client";

import { useParams, useRouter } from "next/navigation";
import { TEAMS, DRIVERS } from "@/data/f1-data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JsonLd from "@/components/JsonLd";
import { useFavorites } from "@/context/FavoritesContext";

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [team, setTeam] = useState<any>(null);
  const [teamDrivers, setTeamDrivers] = useState<any[]>([]);
  const { toggleTeamFavorite, isTeamFavorite } = useFavorites();

  useEffect(() => {
    const foundTeam = TEAMS.find((t) => t.id === params.slug);
    setTeam(foundTeam || null);
    
    if (foundTeam) {
        const matchingDrivers = DRIVERS.filter(d => d.teamId === foundTeam.id);
        setTeamDrivers(matchingDrivers);
    }
  }, [params.slug]);

  if (!team) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <span className="tracking-[0.5em] text-[10px] uppercase opacity-40">Accessing Team Archives...</span>
      </div>
    );
  }

  // Schema Markup
  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": team.full_name,
    "description": team.description,
    "location": {
        "@type": "Place",
        "name": team.base
    },
    "member": teamDrivers.map(d => ({
        "@type": "OrganizationRole",
        "member": {
            "@type": "Person",
            "name": d.name
        },
        "roleName": "Driver"
    }))
  };

  return (
    <article className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black pt-24">
      <JsonLd data={teamSchema} />
      
      {/* Hero Header */}
      <section className="relative py-20 px-6 md:px-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-white/40 uppercase tracking-[0.5em] text-[10px] mb-4 block"
              >
                Technical Specification // {team.id}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
              >
                {team.name}
              </motion.h1>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTeamFavorite(team.id)}
              aria-label={isTeamFavorite(team.id) ? `Remove ${team.name} from favourites` : `Add ${team.name} to favourites`}
              aria-pressed={isTeamFavorite(team.id)}
              className={`mt-2 shrink-0 flex flex-col items-center gap-1 px-4 py-3 border rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all duration-500 ${
                isTeamFavorite(team.id)
                  ? "text-white"
                  : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
              }`}
              style={isTeamFavorite(team.id) ? {
                backgroundColor: team.color + "1a",
                borderColor: team.color,
                color: team.color,
                boxShadow: `0 0 20px ${team.color}33`
              } : {}}
            >
              <span className="text-xl">{isTeamFavorite(team.id) ? "★" : "☆"}</span>
              <span>{isTeamFavorite(team.id) ? "Favourited" : "Favourite"}</span>
            </motion.button>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-silver text-xl md:text-2xl mt-8 max-w-3xl leading-relaxed"
          >
            {team.description}
          </motion.p>
        </div>
      </section>

      {/* Grid: Driver Pairing & Specs */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Specs */}
        <div className="bg-[#111] p-10 rounded-sm border border-white/5 h-fit lg:sticky lg:top-32">
          <h2 className="text-ferrari-light font-bold uppercase tracking-widest text-xs mb-8 pb-4 border-b border-white/10">Vital Statistics</h2>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Base</p>
              <p className="text-white text-sm">{team.base}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Team Principal</p>
              <p className="text-white text-sm">{team.principal}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Chassis</p>
              <p className="text-white text-sm">{team.chassis}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase mb-1">Power Unit</p>
              <p className="text-white text-sm">{team.power_unit}</p>
            </div>
          </div>
        </div>

        {/* Pairing */}
        <div className="lg:col-span-2 space-y-12">
          <h2 className="font-heading text-3xl font-bold uppercase">2026 Driver Pairing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamDrivers.map((driver) => (
              <div 
                key={driver.id}
                onClick={() => router.push(`/drivers/${driver.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(`/drivers/${driver.slug}`);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View profile for ${driver.name}`}
                className="group cursor-pointer bg-[#0a0a0a] border border-white/5 p-8 hover:bg-white/5 transition-all duration-500 focus-visible:outline-white focus-visible:outline-offset-4"
              >
                <div className="w-12 h-1 bg-white/10 mb-6 group-hover:bg-ferrari-light group-hover:w-full transition-all duration-700" />
                <h3 className="font-heading text-2xl font-bold uppercase text-white group-hover:text-ferrari-light transition-colors">{driver.name}</h3>
                <p className="text-silver/50 text-[10px] uppercase tracking-widest mt-2">Professional Driver // {driver.country}</p>
              </div>
            ))}
          </div>

          <div className="pt-20">
             <div className="aspect-[21/9] bg-[#111] border border-white/5 relative flex items-center justify-center overflow-hidden">
                <span className="font-heading text-[15vw] font-black text-white/5 uppercase select-none" aria-hidden="true">{team.id}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
             </div>
          </div>
        </div>

      </section>

      {/* Footer Navigation */}
      <footer className="max-w-7xl mx-auto px-6 md:px-20 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <button 
            onClick={() => router.push('/teams')}
            className="text-silver hover:text-white transition-colors uppercase text-[10px] tracking-[0.5em] focus-visible:outline-white"
        >
          View All Teams
        </button>
        <span className="text-white/10 font-mono text-[10px] uppercase tracking-widest">
          {team.full_name} // official archives
        </span>
      </footer>
    </article>
  );
}
