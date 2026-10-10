"use client";

import React, { useRef, useEffect } from "react";
import { getAssetUrl } from "@/lib/asset-url";

export function ShowcaseVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force autoplay execution on initial mount for mobile / WebKit
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Video autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black flex items-center justify-center select-none">
      {/* Background Fullscreen Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={getAssetUrl("/videos/car-vid.mp4")}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover pointer-events-none transform-gpu scale-[1.01]"
        />
      </div>

      {/* Subtle Top & Bottom Gradient Overlay for Seamless Integration */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg/60 via-transparent to-darkBg/80 pointer-events-none" />

      {/* Subtle Minimalist Branding Overlay */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pointer-events-none">
        <span className="inline-block text-xs uppercase tracking-ultra font-semibold text-amber-400 mb-3 drop-shadow">
          Nova Car Cinema
        </span>
        <h2 className="text-3xl md:text-6xl font-display font-light text-white tracking-tight drop-shadow-xl uppercase">
          Pure Motion<span className="text-amber-500 font-semibold">.</span>
        </h2>
      </div>
    </section>
  );
}
