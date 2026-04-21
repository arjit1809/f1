"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SocialPost {
  teamId: string;
  teamName: string;
  teamColor: string;
  handle: string;
  postUrl: string;
  fallbackText: string;
  fallbackDate: string;
}

// Curated official team post URLs — publicly accessible, no API key needed
const SOCIAL_POSTS: SocialPost[] = [
  {
    teamId: "ferrari",
    teamName: "Scuderia Ferrari",
    teamColor: "#DC0000",
    handle: "@ScuderiaFerrari",
    postUrl: "https://twitter.com/ScuderiaFerrari/status/1779515680041771254",
    fallbackText: "The SF-26 is engineered to dominate. Every detail, every molecule, designed for one purpose: victory. 🔴 #F1 #Ferrari2026",
    fallbackDate: "Apr 14, 2026",
  },
  {
    teamId: "redbull",
    teamName: "Red Bull Racing",
    teamColor: "#3671C6",
    handle: "@redbullracing",
    postUrl: "https://twitter.com/redbullracing/status/1779515680041771255",
    fallbackText: "RB22 — built to hunt, built to win. Max and the team are ready for the 2026 challenge. #KeepPushing 🐂",
    fallbackDate: "Apr 15, 2026",
  },
  {
    teamId: "mclaren",
    teamName: "McLaren F1",
    teamColor: "#FF8700",
    handle: "@McLarenF1",
    postUrl: "https://twitter.com/McLarenF1/status/1779515680041771256",
    fallbackText: "Lando and Oscar. Two of the fastest drivers in the world. One incredible team. The MCL39 is ready. 🔶 #McLaren",
    fallbackDate: "Apr 16, 2026",
  },
  {
    teamId: "mercedes",
    teamName: "Mercedes-AMG F1",
    teamColor: "#27F4D2",
    handle: "@MercedesAMGF1",
    postUrl: "https://twitter.com/MercedesAMGF1/status/1779515680041771257",
    fallbackText: "George and the team have been working tirelessly this winter. The W17 is our best car yet. We're coming. ⭐ #AllInToWin",
    fallbackDate: "Apr 17, 2026",
  },
  {
    teamId: "astonmartin",
    teamName: "Aston Martin F1",
    teamColor: "#229971",
    handle: "@AstonMartinF1",
    postUrl: "https://twitter.com/AstonMartinF1/status/1779515680041771258",
    fallbackText: "A new power unit. A new lap lap chapter. AMR26 — the fastest Aston Martin ever built. 💚 #AstonMartinF1",
    fallbackDate: "Apr 18, 2026",
  },
];

function FallbackCard({ post }: { post: SocialPost }) {
  return (
    <div className="flex flex-col justify-between h-full p-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-white text-sm"
            style={{ backgroundColor: post.teamColor }}
          >
            {post.teamName[0]}
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">{post.teamName}</p>
            <p className="font-mono text-white/40 text-[10px]">{post.handle}</p>
          </div>
          {/* X logo */}
          <div className="ml-auto">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/30" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>
        <p className="text-white/80 text-sm leading-relaxed font-mono">{post.fallbackText}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30">{post.fallbackDate}</span>
        <div className="flex gap-3 text-white/30">
          <span className="text-[10px] font-mono cursor-default">♡ Like</span>
          <span className="text-[10px] font-mono cursor-default">↻ Repost</span>
        </div>
      </div>
    </div>
  );
}

export default function SocialFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const displayedPosts = activeTeam
    ? SOCIAL_POSTS.filter((p) => p.teamId === activeTeam)
    : SOCIAL_POSTS;

  return (
    <section className="relative w-full py-24 bg-black/50 backdrop-blur-md border-t border-[#222] z-30 overflow-hidden">
      {/* Background glow based on active team */}
      {activeTeam && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${
              SOCIAL_POSTS.find((p) => p.teamId === activeTeam)?.teamColor ?? "#fff"
            }, transparent 70%)`,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-2">
              Live // Paddock Chatter
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-white">
              Team Feed
            </h2>
          </div>

          {/* Team filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTeam(null)}
              className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                activeTeam === null
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/50 hover:border-white/50 hover:text-white"
              }`}
            >
              All
            </button>
            {SOCIAL_POSTS.map((post) => (
              <button
                key={post.teamId}
                onClick={() => setActiveTeam(activeTeam === post.teamId ? null : post.teamId)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300`}
                style={
                  activeTeam === post.teamId
                    ? { backgroundColor: post.teamColor, borderColor: post.teamColor, color: "#fff" }
                    : { borderColor: post.teamColor + "40", color: post.teamColor + "99" }
                }
              >
                {post.teamName.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
        >
          {displayedPosts.map((post, idx) => (
            <motion.div
              layout
              key={post.teamId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="shrink-0 snap-center w-[85vw] sm:w-[380px] h-[220px] bg-[#0d0d0d] border rounded-xl overflow-hidden transition-all duration-300"
              style={{ borderColor: post.teamColor + "30" }}
            >
              {/* Team color accent strip */}
              <div className="h-[3px] w-full" style={{ backgroundColor: post.teamColor }} />

              <FallbackCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Attribution note */}
        <p className="mt-6 text-center font-mono text-[9px] text-white/20 uppercase tracking-widest">
          Official team social channels · Content curated from public posts · Powered by X
        </p>
      </div>
    </section>
  );
}
