"use client";

import React, { useState, useEffect } from "react";
import { getAssetUrl } from "@/lib/asset-url";
import { useTheme } from "./ThemeProvider";

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState("Loading");
  const { theme } = useTheme();

  useEffect(() => {
    // Reduced motion accessibility check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }

    // Critical initial assets required before revealing site
    const criticalAssets = [
      getAssetUrl("/cars/porche/gt side.webp"),
      getAssetUrl("/cars/porche/gt front.webp"),
      getAssetUrl("/cars/ferrari/ferrari side.webp"),
      getAssetUrl("/cars/aston martin/aston martin side.webp"),
      // Phase 1 critical hero frames
      getAssetUrl("/911gt-frames/frame_0001.webp"),
      getAssetUrl("/911gt-frames/frame_0005.webp"),
      getAssetUrl("/911gt-frames/frame_0010.webp"),
      getAssetUrl("/ev-frames/frame_0001.webp"),
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length;
    const startTime = Date.now();
    const minPreloadDuration = 1400; // 1.4s smooth presentation hold

    const checkAssetProgress = () => {
      loadedCount++;
      const assetRatio = Math.min(1, loadedCount / totalAssets);
      if (assetRatio > 0.7) {
        setStatusText("Preparing Showcase");
      } else if (assetRatio > 0.3) {
        setStatusText("Caching Assets");
      }
    };

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkAssetProgress;
      img.onerror = checkAssetProgress;
    });

    // Smooth weighted progress calculation to 100%
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeRatio = Math.min(1, elapsedTime / minPreloadDuration);
      const assetRatio = Math.min(1, loadedCount / totalAssets);

      // Weighted calculation: 60% time, 40% asset readiness
      const calculatedProgress = Math.floor(timeRatio * 60 + assetRatio * 40);

      setProgress((prev) => {
        const nextVal = Math.max(prev, Math.min(100, calculatedProgress));

        if (nextVal >= 100 || elapsedTime >= 2500) { // Safety timeout at 2.5s
          clearInterval(interval);
          setStatusText("Ready");
          setTimeout(() => {
            setIsComplete(true);
          }, 350);
          return 100;
        }

        return nextVal;
      });
    }, 25);

    return () => clearInterval(interval);
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
      </div>

      {/* Footer Details */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[10px] uppercase tracking-ultra text-neutral-400 font-mono border-t border-neutral-200 dark:border-neutral-900 pt-6">
        <span>Driven by Desire</span>
        <span>© 2026 Nova Car</span>
      </div>
    </div>
  );
}
