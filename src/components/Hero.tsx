"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [lightsOff, setLightsOff] = useState(false);

  useEffect(() => {
    // Sequence start lights
    const timer = setTimeout(() => {
      setLightsOff(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const lights = [0, 1, 2, 3, 4];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        <h1 className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-silver tracking-tighter mix-blend-overlay">
          F1 2025
        </h1>
        <p className="text-xl md:text-2xl font-mono text-ferrari font-bold mt-2 uppercase tracking-widest text-shadow-glow">
          The New Era
        </p>
      </motion.div>

      {/* Start Lights */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex gap-4 bg-[#111] p-4 rounded-xl border border-[#333] shadow-2xl z-20">
        {lights.map((light, i) => (
          <div key={light} className="flex flex-col gap-2">
            {[0, 1].map((row) => (
              <motion.div
                key={row}
                className="w-10 h-10 rounded-full bg-black/50 border-4 border-black box-content shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                initial={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                animate={{
                  backgroundColor: lightsOff
                    ? "rgba(0, 0, 0, 0.5)" // Off
                    : "rgba(220, 0, 0, 1)", // Red
                  boxShadow: lightsOff
                    ? "inset 0 0 10px rgba(0,0,0,0.8)"
                    : "0 0 20px rgba(220,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.5)",
                }}
                transition={{
                  duration: lightsOff ? 0.1 : 0.2, // Quick off, slight fade on
                  delay: lightsOff ? 0 : i * 0.5, // Sequence on, simultaneous off
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-sm uppercase tracking-widest text-silver">
          Scroll to Ignite
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-white"
        />
      </motion.div>
    </section>
  );
}
