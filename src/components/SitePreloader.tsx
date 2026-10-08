"use client";

import React, { useState, useEffect } from "react";
import { getAssetPath } from "@/lib/utils";

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState("Initializing Luxury Experience...");

  useEffect(() => {
    // Assets to preload initially for smooth experience
    const criticalAssets = [
      getAssetPath("/cars/porche/gt side.webp"),
      getAssetPath("/cars/porche/gt front.webp"),
      getAssetPath("/cars/ferrari/ferrari side.webp"),
      getAssetPath("/cars/aston martin/aston martin side.webp"),
      getAssetPath("/911gt-frames/frame_0001.webp"),
      getAssetPath("/911gt-frames/frame_0010.webp"),
      getAssetPath("/ev-frames/frame_0001.webp"),
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length;

    // Minimum display timer so user gets to experience the sleek preloader
    const startTime = Date.now();
    const minPreloadDuration = 1800; // 1.8 seconds minimum smooth progress fill

    const updateProgress = () => {
      loadedCount++;
      const assetRatio = loadedCount / totalAssets;

      if (assetRatio > 0.6) {
        setStatusText("Preloading Automotive Geometry...");
      } else if (assetRatio > 0.3) {
        setStatusText("Caching High-Resolution Assets...");
      }
    };

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Smooth progress bar interval to reach 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsedTime = Date.now() - startTime;
        const timeRatio = Math.min(1, elapsedTime / minPreloadDuration);
        const actualProgress = Math.floor(timeRatio * 100);

        if (actualProgress >= 100) {
          clearInterval(interval);
          setStatusText("Experience Ready.");
          setTimeout(() => {
            setIsComplete(true);
          }, 400);
          return 100;
        }

        return actualProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-darkBg text-white flex flex-col items-center justify-between p-8 md:p-16 transition-opacity duration-700 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl flex items-center justify-between">
        <span className="text-xl font-bold tracking-ultra font-display uppercase">
          NOVA<span className="text-amber-500">.</span>CAR
        </span>
        <span className="text-xs uppercase tracking-ultra font-mono text-neutral-400">
          Concierge Edition
        </span>
      </div>

      {/* Center Cinematic Progress Counter */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center my-auto">
        <div className="relative">
          <span className="text-7xl sm:text-9xl font-display font-extralight tracking-tighter text-white font-mono">
            {progress}
          </span>
          <span className="text-2xl font-light text-amber-400 font-mono align-top ml-1">
            %
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-64 sm:w-80 h-1 bg-neutral-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 transition-all duration-150 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs uppercase tracking-ultra font-mono text-neutral-400 animate-pulse">
          {statusText}
        </p>
      </div>

      {/* Bottom Subtitle */}
      <div className="w-full max-w-7xl flex justify-between items-center text-[10px] uppercase tracking-ultra text-neutral-500 font-mono border-t border-neutral-900 pt-6">
        <span>Driven by Desire</span>
        <span>© 2026 Nova Car</span>
      </div>
    </div>
  );
}
