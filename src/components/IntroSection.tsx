"use client";

import React from "react";
import { Shield, Sparkles, Compass } from "lucide-react";

export function IntroSection() {
  return (
    <section className="relative py-28 md:py-40 bg-lightBg dark:bg-darkBg text-neutral-900 dark:text-white transition-colors duration-500 overflow-hidden border-t border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Typography */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-ultra text-amber-500 font-semibold">
              The Philosophy
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight leading-[1.08] text-neutral-900 dark:text-white">
              More than <br />
              <span className="italic font-serif font-normal text-amber-600 dark:text-amber-400">
                a car.
              </span>
            </h2>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed font-light text-base md:text-lg">
            <p className="text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 leading-snug">
              Nova Car connects you with exceptional vehicles for exceptional moments.
            </p>
            <p>
              From raw performance machines to refined executive luxury, every vehicle in our portfolio is selected with uncompromising attention to design, provenance, condition and experience.
            </p>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <Shield className="w-5 h-5 mx-auto text-amber-500" />
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-neutral-200">
                  Verified
                </span>
              </div>
              <div className="space-y-1">
                <Sparkles className="w-5 h-5 mx-auto text-amber-500" />
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-neutral-200">
                  Pristine
                </span>
              </div>
              <div className="space-y-1">
                <Compass className="w-5 h-5 mx-auto text-amber-500" />
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-neutral-200">
                  Bespeak
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
