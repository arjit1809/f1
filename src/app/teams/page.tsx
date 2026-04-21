"use client";

import Link from "next/link";
import { TEAMS } from "@/data/f1-data";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";

export default function TeamsPage() {
  const { favoriteTeams, toggleTeamFavorite, isTeamFavorite } = useFavorites();

  // Float favorites to top
  const sortedTeams = [...TEAMS].sort((a, b) => {
    const aFav = isTeamFavorite(a.id);
    const bFav = isTeamFavorite(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <header className="mb-12">
          <span className="text-white/40 uppercase tracking-[0.5em] text-[10px] mb-4 block">Constructor Standings // 2026</span>
          <h1 className="font-heading text-5xl md:text-8xl font-black uppercase tracking-tighter">The Teams</h1>
          {favoriteTeams.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-[10px] font-mono text-ferrari uppercase tracking-widest"
            >
              ★ {favoriteTeams.length} Favourite{favoriteTeams.length > 1 ? "s" : ""} pinned to top
            </motion.p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {sortedTeams.map((team, idx) => {
              const isFav = isTeamFavorite(team.id);
              return (
                <motion.div
                  key={team.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Favourite toggle */}
                  <button
                    onClick={() => toggleTeamFavorite(team.id)}
                    aria-label={isFav ? `Remove ${team.name} from favourites` : `Add ${team.name} to favourites`}
                    aria-pressed={isFav}
                    className={`absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isFav
                        ? "border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        : "bg-black/60 border-white/20 text-white/30 hover:border-white/60 hover:text-white"
                    }`}
                    style={isFav ? { backgroundColor: team.color + "33", borderColor: team.color } : {}}
                  >
                    <span className="text-sm" style={isFav ? { color: team.color } : {}}>
                      {isFav ? "★" : "☆"}
                    </span>
                  </button>

                  {/* Favourite badge */}
                  {isFav && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-4 left-4 z-20 px-2 py-1 font-mono text-[8px] uppercase tracking-widest font-bold rounded-sm text-white"
                      style={{ backgroundColor: team.color }}
                    >
                      FAVOURITE
                    </motion.div>
                  )}

                  <Link
                    href={`/teams/${team.id}`}
                    className={`block relative bg-[#0a0a0a] border p-12 hover:bg-white/5 transition-all duration-500 flex flex-col justify-between focus-visible:outline-white focus-visible:outline-offset-4 ${
                      isFav ? "shadow-[0_0_40px_rgba(0,0,0,0.5)]" : "border-white/5"
                    }`}
                    style={isFav ? { borderColor: team.color + "40" } : {}}
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-5 font-heading text-[10rem] font-black pointer-events-none"
                      style={{ color: team.color }}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest mb-2 block font-bold" style={{ color: team.color }}>
                        {team.full_name}
                      </span>
                      <h2 className="font-heading text-4xl font-bold uppercase mb-4 group-hover:text-ferrari-light transition-colors">{team.name}</h2>
                      <p className="text-silver/60 text-sm max-w-md leading-relaxed">{team.description}</p>
                    </div>

                    <div className="mt-12 flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/20 uppercase">Power Unit</p>
                        <p className="text-xs font-bold">{team.power_unit}</p>
                      </div>
                      <span className="text-silver group-hover:text-white transition-colors text-xs tracking-widest">DETAILS →</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
