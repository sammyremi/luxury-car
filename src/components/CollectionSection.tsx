"use client";

import React, { useState, useMemo } from "react";
import { CARS, Car } from "@/data/cars";
import { HorizontalShowroom } from "./HorizontalShowroom";

const CATEGORIES = ["All", "Performance", "Luxury", "Sports", "Sedan", "SUV"] as const;

export function CollectionSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCars = useMemo(() => {
    if (activeCategory === "All") return CARS;
    return CARS.filter((car) => car.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="collection" className="relative w-full pt-24 bg-lightBg dark:bg-darkBg transition-colors duration-500">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-6 mb-12">
        <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
          Curated Inventory
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-light text-neutral-900 dark:text-white tracking-tight">
          The Collection
        </h2>
        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
          A selection of vehicles chosen for performance, presence and character.
        </p>

        {/* Category Filter Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg scale-105"
                    : "bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Showroom Experience */}
      <HorizontalShowroom cars={filteredCars} />
    </section>
  );
}
