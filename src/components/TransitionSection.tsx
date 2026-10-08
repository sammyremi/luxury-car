"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export function TransitionSection() {
  return (
    <section className="relative py-28 md:py-36 bg-neutral-950 text-white text-center overflow-hidden border-t border-b border-neutral-900">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-neutral-900 to-darkBg opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-6">
        <span className="text-xs uppercase tracking-ultra text-amber-500 font-medium">
          The Portfolio
        </span>
        <h2 className="text-3xl md:text-6xl font-display font-extralight tracking-tight leading-tight">
          Built for the way you <br />
          <span className="font-serif italic font-normal text-amber-400">
            want to move.
          </span>
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Explore our hand-curated garage of world-class supercars, executive saloons, and grand tourers.
        </p>

        <div className="pt-8 flex justify-center">
          <a
            href="#collection"
            className="p-3 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-amber-500/50 hover:bg-neutral-900 transition-all duration-300"
            aria-label="Scroll to collection"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
