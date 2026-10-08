"use client";

import React, { useRef, useEffect, useState } from "react";
import { Car } from "@/data/cars";
import { CarCard } from "./CarCard";

interface HorizontalShowroomProps {
  cars: Car[];
}

export function HorizontalShowroom({ cars }: HorizontalShowroomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let animFrameId: number | null = null;

    const handleScroll = () => {
      if (animFrameId !== null) return;

      animFrameId = requestAnimationFrame(() => {
        animFrameId = null;

        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const containerRect = container.getBoundingClientRect();
        const totalScrollable = containerRect.height - window.innerHeight;

        if (totalScrollable <= 0) return;

        const currentScroll = -containerRect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

        const maxTranslate = track.scrollWidth - window.innerWidth + 96; // 96px padding allowance
        const targetTranslate = progress * maxTranslate;

        setTranslateX(-targetTranslate);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, [cars]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350vh] bg-lightBg dark:bg-darkBg transition-colors duration-500"
    >
      {/* Sticky Full Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-ultra text-amber-500 font-semibold">
              Interactive Showroom
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-light text-neutral-900 dark:text-white">
              Explore the Garage
            </h3>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 font-mono">
            <span>Scroll vertically to navigate</span>
            <span className="w-8 h-[1px] bg-neutral-400 dark:bg-neutral-600" />
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex items-center space-x-8 md:space-x-12 px-6 md:px-16 transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
