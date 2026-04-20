"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 240;

export default function BackgroundSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Object for GSAP to animate
  const seqState = useRef({ frame: 0 });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/background/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadCount++;
        setLoadedCount(loadCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const render = useCallback(
    (frameFloat: number) => {
      if (images.length < FRAME_COUNT || !canvasRef.current) return;

      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      // Clamp and floor for index
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(frameFloat))
      );

      const img = images[frameIndex];
      if (img && img.complete) {
        const canvas = canvasRef.current;
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;

        const hRatio = cw / iw;
        const vRatio = ch / ih;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (cw - iw * ratio) / 2;
        const centerShift_y = (ch - ih * ratio) / 2;

        context.clearRect(0, 0, cw, ch);
        context.drawImage(
          img,
          0,
          0,
          iw,
          ih,
          centerShift_x,
          centerShift_y,
          iw * ratio,
          ih * ratio
        );
        
        setCurrentFrame(frameIndex + 1);
      }
    },
    [images]
  );

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    if (images.length < FRAME_COUNT) return;

    // Create the GSAP animation tracking the entire page scroll
    const ctx = gsap.context(() => {
      gsap.to(seqState.current, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "body", // Track the entire scrollable area of the page
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            render(seqState.current.frame);
            setScrollProgress(self.progress);
            
            // Hide scroll hint after some movement
            if (self.progress > 0.02) {
              const hint = document.getElementById('scroll-hint');
              if (hint) hint.style.opacity = '0';
            } else {
              const hint = document.getElementById('scroll-hint');
              if (hint) hint.style.opacity = '1';
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, [images, render]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(seqState.current.frame);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [render]);

  return (
    <>
      {/* BACKGROUND LAYER (Negative Z-Index) */}
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-80 mix-blend-screen grayscale contrast-125"
        />
        
        {/* Carbon fiber overlay */}
        <div className="absolute inset-0 bg-carbon opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </div>

      {/* FOREGROUND HUD LAYER (Positive Z-Index) */}
      <div className="fixed inset-0 w-full h-full z-50 pointer-events-none">
        {/* Progress Bar (F1 Style) */}
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 transition-all duration-75 ease-out"
          style={{ width: `${(scrollProgress * 100).toFixed(2)}%` }}
        />

        {/* HUD Overlay */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 font-mono select-none">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-t-lg flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Telemetry Frame</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white leading-none">
                {currentFrame.toString().padStart(3, "0")}
              </span>
              <span className="text-white/20 text-xs">/ {FRAME_COUNT}</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1 rounded-b-lg w-full flex justify-between items-center">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Progress</span>
            <span className="text-xs text-red-500 font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Scroll Hint */}
        <div 
          id="scroll-hint"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-700"
        >
          <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-mono">Scroll to Dismantle</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>

        {/* Loading Status */}
        {loadedCount < FRAME_COUNT && (
          <div className="absolute top-4 right-4 bg-red-600/20 backdrop-blur-sm text-red-500 border border-red-500/20 px-3 py-1 font-mono text-[10px] rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Preloading Data: {Math.round((loadedCount / FRAME_COUNT) * 100)}%
          </div>
        )}
      </div>
    </>
  );
}
