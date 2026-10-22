"use client";

import React, { useState, useEffect } from "react";
import { ScrollFrameAnimation } from "./ScrollFrameAnimation";
import { porscheFrames } from "@/data/animation-frames";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const [isEntered, setIsEntered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsEntered(true);
      return;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsEntered(true);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Trigger smooth entrance animation shortly after mount
    const timer = setTimeout(() => {
      setIsEntered(true);
    }, 120);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full">
      <ScrollFrameAnimation
        id="porsche-hero"
        frames={porscheFrames}
        fallbackImage="/cars/porche/gt side.webp"
        heightInVh={420}
        overlayContent={(progress) => {
          // If the user scrolls before the entrance timer finishes, immediately settle
          const settled = isEntered || progress > 0.01;

          // As the car finishes its full 360-degree rotation timeline (progress > 0.70),
          // smoothly dissolve text to transition into the next section (IntroSection)
          const exitProgress = Math.min(1, Math.max(0, (progress - 0.70) / 0.25));
          const exitOpacity = Math.max(0, 1 - exitProgress);
          const exitTranslateY = -exitProgress * 32;

          return (
            <div className="relative w-full h-full overflow-hidden pointer-events-none select-none">
              {/* Subtle cinematic studio ambient vignette overlay to maximize contrast and text readability */}
              <div
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 50% 52%, transparent 35%, rgba(11, 12, 14, 0.45) 80%, rgba(11, 12, 14, 0.85) 100%), linear-gradient(180deg, rgba(11, 12, 14, 0.65) 0%, transparent 22%, transparent 72%, rgba(11, 12, 14, 0.75) 100%)",
                  opacity: exitOpacity,
                }}
              />

              {/* 1. Main Title: NOVA CAR.
                  - Initially positioned outside viewport on the right (translateX(100vw))
                  - Animates right to left into horizontal center of empty space above vehicle
                  - Maintained visually clear gap above car roofline; never overlaps in any frame */}
              <div
                className="absolute top-[13vh] sm:top-[14vh] md:top-[15vh] lg:top-[16vh] inset-x-0 flex items-center justify-center pointer-events-none z-20 px-4"
                style={{
                  transform: isReducedMotion
                    ? `translateY(${exitTranslateY}px)`
                    : `translateX(${settled ? "0px" : "100vw"}) translateY(${exitTranslateY}px)`,
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 180ms, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 180ms",
                }}
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em] text-white text-center leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] whitespace-nowrap">
                  NOVA CAR<span className="text-amber-500 font-extrabold">.</span>
                </h1>
              </div>

              {/* 2. Supporting Text - Corner 1: Top Left
                  - Text: "The Art of Performance"
                  - Enters from the left */}
              <div
                className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 md:left-12 lg:left-16 pointer-events-auto z-20"
                style={{
                  transform: isReducedMotion
                    ? `translateY(${exitTranslateY}px)`
                    : `translateX(${settled ? "0px" : "-80px"}) translateY(${exitTranslateY}px)`,
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.7s ease-out 120ms",
                }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)] animate-pulse" />
                  <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-ultra font-semibold text-amber-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    The Art of Performance
                  </span>
                </div>
              </div>

              {/* 2. Supporting Text - Corner 2: Top Right
                  - Text: "Driven by desire."
                  - Enters from the right */}
              <div
                className="absolute top-20 sm:top-24 md:top-28 right-4 sm:right-8 md:right-12 lg:right-16 pointer-events-auto text-right z-20"
                style={{
                  transform: isReducedMotion
                    ? `translateY(${exitTranslateY}px)`
                    : `translateX(${settled ? "0px" : "80px"}) translateY(${exitTranslateY}px)`,
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 240ms, opacity 0.7s ease-out 240ms",
                }}
              >
                <p className="text-xs sm:text-sm md:text-base font-light italic tracking-wider text-neutral-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Driven by desire.
                </p>
              </div>

              {/* 2. Supporting Text - Corner 3: Bottom Left
                  - Text: "Luxury vehicles for sale and rent."
                  - Enters upward from below */}
              <div
                className="absolute bottom-14 sm:bottom-16 md:bottom-20 left-4 sm:left-8 md:left-12 lg:left-16 pointer-events-auto max-w-[180px] sm:max-w-xs md:max-w-sm z-20"
                style={{
                  transform: isReducedMotion
                    ? `translateY(${exitTranslateY}px)`
                    : `translateY(${settled ? `${exitTranslateY}px` : "50px"})`,
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 360ms, opacity 0.7s ease-out 360ms",
                }}
              >
                <p className="text-[11px] sm:text-sm md:text-base font-normal text-neutral-200 tracking-wide mb-2 sm:mb-4 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Luxury vehicles for sale and rent.
                </p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <a
                    href="#collection"
                    className="px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-white text-neutral-900 hover:bg-neutral-200 transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Explore Collection
                  </a>
                  <a
                    href="#rent"
                    className="px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-neutral-900/80 backdrop-blur-md text-white border border-white/20 hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Rent a Car
                  </a>
                </div>
              </div>

              {/* 2. Supporting Text - Corner 4: Bottom Right
                  - Text: "Selected for performance, presence, and character."
                  - Enters upward from below */}
              <div
                className="absolute bottom-14 sm:bottom-16 md:bottom-20 right-4 sm:right-8 md:right-12 lg:right-16 pointer-events-auto text-right max-w-[150px] sm:max-w-[200px] md:max-w-xs z-20"
                style={{
                  transform: isReducedMotion
                    ? `translateY(${exitTranslateY}px)`
                    : `translateY(${settled ? `${exitTranslateY}px` : "50px"})`,
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 460ms, opacity 0.7s ease-out 460ms",
                }}
              >
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-light text-neutral-300 tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Selected for performance, presence, and character.
                </p>
              </div>

              {/* Bottom Scroll Indicator & Vehicle Model Tag */}
              <div
                className="absolute bottom-3 sm:bottom-4 md:bottom-5 inset-x-4 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-ultra text-neutral-400 font-mono z-20 pointer-events-none"
                style={{
                  opacity: settled ? exitOpacity : 0,
                  transition: isReducedMotion ? "none" : "opacity 0.8s ease-out 540ms",
                }}
              >
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
                  <span>Scroll to rotate vehicle</span>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-neutral-400">
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
