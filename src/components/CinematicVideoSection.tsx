"use client";

import React, { useRef, useEffect } from "react";
import { getAssetUrl } from "@/lib/asset-url";

export function CinematicVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure muted autoplay runs immediately across WebKit/Mobile browsers
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center border-0 p-0 m-0 select-none">
      {/* Background Fullscreen Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src={getAssetUrl("/videos/bmw-m3-cinematic.mp4")}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover pointer-events-none transform-gpu scale-[1.01]"
        />
        {/* Seamless Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-black/40 to-darkBg/80 pointer-events-none" />
      </div>

      {/* Brand Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 md:py-24 pointer-events-none">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-ultra font-semibold text-amber-400 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            Cinematic Moment
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-ultra font-mono text-neutral-400">
            Sound of Performance
          </span>
        </div>

        <div className="max-w-2xl text-left space-y-3 pointer-events-auto">
          <h2 className="text-3xl md:text-6xl font-display font-light text-white tracking-tight leading-none drop-shadow-2xl">
            Pure <span className="font-serif italic font-normal text-amber-400">Emotion.</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-200 font-light max-w-lg leading-relaxed drop-shadow">
            Experience the unfiltered acoustic resonance and aerodynamic majesty of true automotive mastery.
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/15 pointer-events-auto">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-[11px]">4K HDR CINEMATIC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
