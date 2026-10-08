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

  // Cached measurement refs to avoid layout thrashing during scroll
  const measurementsRef = useRef({
    maxTranslate: 0,
    containerTop: 0,
    scrollableDistance: 0,
  });

  const isPendingRef = useRef(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Recalculate dimensions dynamically based on actual content track width
    const updateMeasurements = () => {
      if (!container || !track) return;

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate exact distance the track needs to translate
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 96); // 96px end padding
      const requiredContainerHeight = maxTranslate + viewportHeight;

      container.style.height = `${requiredContainerHeight}px`;

      const containerRect = container.getBoundingClientRect();
      const currentScrollTop = window.scrollY || window.pageYOffset;
      const containerTop = containerRect.top + currentScrollTop;

      measurementsRef.current = {
        maxTranslate,
        containerTop,
        scrollableDistance: maxTranslate,
      };
    };

    updateMeasurements();

    // ResizeObserver for track content updates
    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });
    resizeObserver.observe(track);
    window.addEventListener("resize", updateMeasurements);

    // High performance rAF scroll handler using direct DOM mutation
    const updateTransform = () => {
      isPendingRef.current = false;
      const { maxTranslate, containerTop, scrollableDistance } = measurementsRef.current;
      if (scrollableDistance <= 0 || !track) return;

      const currentScrollY = window.scrollY || window.pageYOffset;
      const relativeScroll = currentScrollY - containerTop;
      const progress = Math.max(0, Math.min(1, relativeScroll / scrollableDistance));

      const translateX = progress * maxTranslate;

      // Direct GPU-accelerated transform update without React re-renders
      track.style.transform = `translate3d(${-translateX}px, 0px, 0px)`;
    };

    const handleScroll = () => {
      if (!isPendingRef.current) {
        isPendingRef.current = true;
        requestAnimationFrame(updateTransform);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform(); // Initial sync

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMeasurements);
      resizeObserver.disconnect();
    };
  }, [cars, isReducedMotion]);

  // Reduced motion accessible fallback view
  if (isReducedMotion) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-lightBg dark:bg-darkBg transition-colors duration-500"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-ultra text-amber-500 font-semibold">
              Interactive Showroom
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-light text-neutral-900 dark:text-white">
              Explore the Garage
            </h3>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 font-mono">
            <span>Scroll to explore collection</span>
            <span className="w-8 h-[1px] bg-neutral-400 dark:bg-neutral-600" />
          </div>
        </div>

        {/* GPU-Accelerated Horizontal Track */}
        <div
          ref={trackRef}
          className="flex items-center space-x-6 md:space-x-12 px-6 md:px-16"
          style={{
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
