"use client";

import Link from "next/link";
import { DRIVERS } from "@/data/f1-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";

export default function DriversPage() {
  const { favoriteDrivers, toggleDriverFavorite, isDriverFavorite } = useFavorites();

  // Float favorites to top, preserve order within each group
  const sortedDrivers = [...DRIVERS].sort((a, b) => {
    const aFav = isDriverFavorite(a.slug);
    const bFav = isDriverFavorite(b.slug);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <header className="mb-12">
          <span className="text-ferrari font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Official Entry List // 2026</span>
          <h1 className="font-heading text-5xl md:text-8xl font-black uppercase tracking-tighter">The Drivers</h1>
          {favoriteDrivers.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-[10px] font-mono text-ferrari uppercase tracking-widest"
            >
              ★ {favoriteDrivers.length} Favourite{favoriteDrivers.length > 1 ? "s" : ""} pinned to top
            </motion.p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedDrivers.map((driver) => {
              const isFav = isDriverFavorite(driver.slug);
              return (
                <motion.div
                  key={driver.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Favorite star button */}
                  <button
                    onClick={() => toggleDriverFavorite(driver.slug)}
                    aria-label={isFav ? `Remove ${driver.name} from favourites` : `Add ${driver.name} to favourites`}
                    aria-pressed={isFav}
                    className={`absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isFav
                        ? "bg-ferrari border-ferrari text-white shadow-[0_0_15px_rgba(220,0,0,0.5)]"
                        : "bg-black/60 border-white/20 text-white/40 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{isFav ? "★" : "☆"}</span>
                  </button>

                  {/* Favorite badge */}
                  {isFav && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-3 left-3 z-20 px-2 py-1 bg-ferrari text-white font-mono text-[8px] uppercase tracking-widest font-bold rounded-sm"
                    >
                      FAVOURITE
                    </motion.div>
                  )}

                  <Link
                    href={`/drivers/${driver.slug}`}
                    className={`block relative aspect-[4/5] bg-[#111] border overflow-hidden focus-visible:outline-white focus-visible:outline-offset-4 transition-all duration-500 ${
                      isFav ? "border-ferrari/40 shadow-[0_0_30px_rgba(220,0,0,0.15)]" : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={driver.image}
                      alt={`Action portrait of ${driver.name}`}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-ferrari-light text-[10px] font-bold uppercase tracking-widest">{driver.team}</span>
                      <h2 className="font-heading text-2xl font-bold uppercase mt-1 group-hover:text-ferrari-light transition-colors">{driver.name}</h2>
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
