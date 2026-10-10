"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { frameLoader } from "@/lib/frame-loader";

// Maximum time (ms) to hold the preloader before force-releasing (safety net)
const MAX_PRELOAD_MS = 10_000;

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState("Loading");
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(244);
  const { theme } = useTheme();

  useEffect(() => {
    // Reduced-motion users skip the preloader entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }

    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      setProgress(100);
      setStatusText("Ready");
      setTimeout(() => setIsComplete(true), 400);
    };

    // Safety timeout – always release after MAX_PRELOAD_MS
    const safetyTimer = setTimeout(release, MAX_PRELOAD_MS);

    // Preload Porsche frames + critical assets with real progress tracking
    frameLoader.preloadInitialBatch(({ loaded, total, percentage, statusText: text }) => {
      if (released) return;
      setLoadedCount(loaded);
      setTotalCount(total);
      setProgress(percentage);
      setStatusText(text);

      if (loaded >= total) {
        clearTimeout(safetyTimer);
        release();
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      released = true;
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-8 md:p-16 transition-opacity duration-700 select-none ${
        theme === "light"
          ? "bg-lightBg text-neutral-900"
          : "bg-darkBg text-white"
      } ${progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Top Brand Name */}
      <div className="w-full max-w-7xl flex items-center justify-between pt-4">
        <span className="text-xl font-bold tracking-ultra font-display uppercase">
          NOVA<span className="text-amber-500">.</span>CAR
        </span>
        <span className="text-[10px] uppercase tracking-ultra font-mono text-neutral-400">
          Concierge Edition
        </span>
      </div>

      {/* Central Minimal Loader */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center my-auto">
        <h2 className="text-2xl sm:text-3xl font-display font-light tracking-tight text-neutral-900 dark:text-white">
          NOVA CAR
        </h2>

        <span className="text-xs uppercase tracking-ultra font-mono text-neutral-400">
          {statusText}
        </span>

        {/* Big Percentage Display */}
        <div className="relative">
          <span className="text-6xl sm:text-8xl font-display font-extralight tracking-tighter font-mono text-neutral-900 dark:text-white">
            {progress}
          </span>
          <span className="text-xl font-light text-amber-500 font-mono align-top ml-1">
            %
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-amber-500 transition-all duration-100 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Asset count sub-label */}
        <span className="text-[10px] uppercase tracking-ultra font-mono text-neutral-500">
          {Math.min(loadedCount, totalCount)} / {totalCount} assets
        </span>
      </div>

      {/* Footer Details */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[10px] uppercase tracking-ultra text-neutral-400 font-mono border-t border-neutral-200 dark:border-neutral-900 pt-6">
        <span>Driven by Desire</span>
        <span>© 2026 Nova Car</span>
      </div>
    </div>
  );
}
