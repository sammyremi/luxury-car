"use client";

import React from "react";
import { ScrollFrameAnimation } from "./ScrollFrameAnimation";
import { porscheFrames } from "@/data/animation-frames";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full">
      <ScrollFrameAnimation
        id="porsche-hero"
        frames={porscheFrames}
        fallbackImage="/cars/porche/gt side.webp"
        heightInVh={420}
        overlayContent={(progress) => {
          // Text opacity & transform fading based on scroll progress
          // Progress 0.0 - 0.25: Hero title visible
          // Progress > 0.35: Text fades out smoothly so user focuses on full 360 rotation
          const opacity = Math.max(0, 1 - progress * 3.0);
          const translateY = progress * -40;

          return (
            <div
              className="w-full h-full flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto pointer-events-none transition-all duration-300"
              style={{
                opacity: opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {/* Top empty space to allow room for navigation */}
              <div className="pt-24" />

              <div className="max-w-2xl text-left pointer-events-auto">
                <span className="inline-block text-xs uppercase tracking-ultra font-semibold text-amber-400 mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                  The Art of Performance
                </span>
                <h1 className="text-4xl md:text-7xl font-display font-light tracking-tight text-white mb-4 leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  NOVA CAR<span className="text-amber-500 font-semibold">.</span>
                </h1>
                <p className="text-xl md:text-3xl font-extralight tracking-wide text-amber-400 mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                  Driven by desire.
                </p>
                <p className="text-sm sm:text-base font-normal text-amber-400 max-w-md mb-8 leading-snug">
                  Luxury vehicles for sale and rent.<br />
                  Selected for performance<br />
                  presence, and character
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#collection"
                    className="px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white text-neutral-900 hover:bg-neutral-200 transition-all duration-300 shadow-black/10 shadow-md"
                  >
                    Explore Collection
                  </a>
                  <a
                    href="#rent"
                    className="px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900/80 backdrop-blur-md text-white border border-white/20 hover:bg-neutral-800 transition-all duration-300"
                  >
                    Rent a Car
                  </a>
                </div>
              </div>

              {/* Bottom Scroll Indicator */}
              <div className="flex items-center justify-between pt-8 border-t border-white/10 text-xs tracking-ultra uppercase text-neutral-400">
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
                  <span>Scroll to rotate vehicle</span>
                </div>
                <span className="hidden sm:inline font-mono text-[10px]">
                  PORSCHE 911 GT3 RS
                </span>
              </div>
            </div>
          );
        }}
      />
    </section>
  );
}
