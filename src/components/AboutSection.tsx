"use client";

import React from "react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-40 bg-lightBg dark:bg-darkBg text-neutral-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
              Our Vision
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight leading-[1.1]">
              A different way to <br />
              <span className="font-serif italic font-normal text-amber-500">
                experience luxury.
              </span>
            </h2>
          </div>

          {/* Right Column: Editorial story */}
          <div className="lg:col-span-6 space-y-6 text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
            <p className="text-xl font-normal text-neutral-900 dark:text-neutral-100 leading-snug">
              Nova Car was founded on a simple principle: automotive passion should be experienced without friction.
            </p>
            <p>
              We bridge the gap between permanent acquisition and temporary enjoyment. Whether you seek to expand your personal collection with a timeless supercar or reserve a high-performance vehicle for a memorable journey, our team delivers seamless, discreet service.
            </p>
            <p>
              Every car in our portfolio is meticulously maintained, documented, and presented to ensure that from the moment you take the wheel, every mile feels extraordinary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
