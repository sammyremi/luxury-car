"use client";

import React from "react";
import { Gem, SlidersHorizontal, UserCheck, Award } from "lucide-react";

export function WhyNovaCar() {
  const pillars = [
    {
      icon: Gem,
      title: "Curated Selection",
      description: "Vehicles selected for quality, character and presence.",
    },
    {
      icon: SlidersHorizontal,
      title: "Flexible Experience",
      description: "Options for both ownership and rental tailored to your schedule.",
    },
    {
      icon: UserCheck,
      title: "Personal Service",
      description: "A straightforward, white-glove experience from enquiry to delivery.",
    },
    {
      icon: Award,
      title: "Exceptional Vehicles",
      description: "Performance and luxury vehicles chosen for people who appreciate the difference.",
    },
  ];

  return (
    <section className="relative py-24 md:py-36 bg-lightSurface dark:bg-darkSurface text-neutral-900 dark:text-white transition-colors duration-500 border-t border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
            The Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight">
            Why Nova Car
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-lightBg dark:bg-darkBg border border-neutral-200/60 dark:border-neutral-800/60 space-y-5 shadow-lg hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-medium text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
