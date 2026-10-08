"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function BuySection() {
  const features = [
    "Hand-curated luxury & supercar inventory",
    "Comprehensive multi-point mechanical inspection",
    "Dedicated concierge purchase assistance",
    "Full ownership documentation & title support",
    "Enclosed white-glove vehicle delivery",
  ];

  return (
    <section id="sell" className="relative py-24 md:py-36 bg-lightSurface dark:bg-darkSurface text-neutral-900 dark:text-white transition-colors duration-500 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-ultra text-amber-500 font-semibold">
              Acquisition & Sales
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight leading-[1.1]">
              Find the one <br />
              <span className="font-serif italic font-normal text-amber-500">
                worth keeping.
              </span>
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              From high-performance sports cars to refined luxury SUVs, Nova Car helps you find vehicles that match your standards.
            </p>

            <div className="pt-4">
              <a
                href="#collection"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-xl"
              >
                <span>View Cars for Sale</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Service Checklist Card */}
          <div className="lg:col-span-6 bg-lightBg dark:bg-darkBg p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6">
            <h3 className="text-xl font-display font-medium tracking-tight text-neutral-900 dark:text-white">
              Nova Car Ownership Standard
            </h3>
            <div className="space-y-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 font-light">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
