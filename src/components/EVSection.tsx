"use client";

import React from "react";
import { ScrollFrameAnimation } from "./ScrollFrameAnimation";
import { evFrames } from "@/data/animation-frames";
import { Cpu } from "lucide-react";

export function EVSection() {
  return (
    <section id="ev-engineering" className="relative w-full">
      <ScrollFrameAnimation
        id="ev-exploded-canvas"
        frames={evFrames}
        fallbackImage="/cars/porche/gt front.webp"
        heightInVh={420}
        overlayContent={(progress) => {
          // Dynamic caption based on scroll progress thresholds
          let title = "Electric, reimagined.";
          let subtitle =
            "Performance is not only about power. It is about how every component works together.";
          let phase = "Phase 01 — Assembled State";

          if (progress > 0.75) {
            title = "The future is engineered.";
            subtitle =
              "Zero compromise. Pure electric architecture engineered for instantaneous response.";
            phase = "Phase 04 — Fully Exploded Architecture";
          } else if (progress > 0.5) {
            title = "Every layer has a purpose.";
            subtitle =
              "Direct battery integration, dual electric motors, and active thermal management.";
            phase = "Phase 03 — Drivetrain Exposure";
          } else if (progress > 0.25) {
            title = "Designed as a system.";
            subtitle =
              "Body panels and aero elements deconstruct to reveal modular structural harmony.";
            phase = "Phase 02 — Component Separation";
          }

          return (
            <div className="w-full h-full flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto pointer-events-none transition-all duration-500">
              {/* Top Header Badge */}
              <div className="flex items-center justify-between pt-20">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 text-xs uppercase tracking-ultra font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>EV Engineering</span>
                </div>
                <span className="text-xs uppercase tracking-ultra font-mono text-neutral-400">
                  {phase}
                </span>
              </div>

              {/* Central Dynamic Caption */}
              <div className="max-w-xs sm:max-w-md md:max-w-xl text-left bg-black/50 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-black/10 shadow-lg transition-all duration-500 mt-auto ml-auto">
                <h3 className="text-xl sm:text-3xl md:text-5xl font-display font-light text-white mb-1.5 sm:mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Progress Bar indicator */}
              <div className="pb-8 space-y-2">
                <div className="flex justify-between text-[11px] uppercase tracking-ultra text-neutral-400 font-mono">
                  <span>Architecture Deconstruction</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-150"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        }}
      />
    </section>
  );
}
