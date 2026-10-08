"use client";

import React from "react";
import { Calendar, KeyRound, Sparkles, Clock, ArrowRight } from "lucide-react";

export function RentalSection() {
  const rentalOptions = [
    {
      title: "Daily Rentals",
      description: "Ideal for business travel, single-day getaways, or cinematic photo shoots.",
      icon: Clock,
    },
    {
      title: "Weekend Escapes",
      description: "Experience coastal drives or mountain tours behind the wheel of an icon.",
      icon: Calendar,
    },
    {
      title: "Extended Rentals",
      description: "Weekly or monthly customized bespoke leasing for seasonal stays.",
      icon: KeyRound,
    },
  ];

  return (
    <section id="rent" className="relative py-24 md:py-36 bg-lightBg dark:bg-darkBg text-neutral-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-ultra text-amber-500 font-semibold flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Luxury Car Rentals</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight leading-[1.1]">
            Make the moment <br />
            <span className="font-serif italic font-normal text-amber-500">
              yours.
            </span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
            Whether it is a weekend away, a special occasion or simply the drive you have always wanted, experience luxury on your terms.
          </p>
        </div>

        {/* 3 Rental Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rentalOptions.map((opt, i) => {
            const IconComponent = opt.icon;
            return (
              <div
                key={i}
                className="group p-8 md:p-10 rounded-3xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-light text-neutral-900 dark:text-white">
                    {opt.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-6">
          <a
            href="#collection"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-xl"
          >
            <span>Explore Rentals</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
