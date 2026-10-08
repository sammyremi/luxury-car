"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAssetPath } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ScrollFrameAnimationProps {
  id?: string;
  frames: string[];
  fallbackImage: string;
  heightInVh?: number; // e.g. 400 for 400vh
  overlayContent?: (progress: number) => React.ReactNode;
  initialFrameCount?: number; // Number of frames to load before initial render
}

export function ScrollFrameAnimation({
  id = "frame-animation",
  frames,
  fallbackImage,
  heightInVh = 400,
  overlayContent,
  initialFrameCount = 12,
}: ScrollFrameAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // In-memory cache for loaded HTMLImageElements
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);

  // Helper to draw a single image onto canvas keeping aspect ratio centered
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate object-fit contain scaling
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) return;

    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Preload frames logic
  useEffect(() => {
    let isMounted = true;
    const totalFrames = frames.length;
    let initialLoaded = 0;

    // Check reduced motion
    isReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Helper to load frame index
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesCacheRef.current.has(index)) {
          resolve(imagesCacheRef.current.get(index)!);
          return;
        }

        const img = new Image();
        const src = getAssetPath(frames[index]);
        img.src = src;

        img.onload = () => {
          if (!isMounted) return;
          imagesCacheRef.current.set(index, img);
          resolve(img);
        };

        img.onerror = () => {
          if (!isMounted) return;
          console.warn(`Failed to load frame at index ${index}: ${src}`);
          reject(new Error(`Failed to load frame ${index}`));
        };
      });
    };

    // Step 1: Load initial frames first to start interactive experience quickly
    const loadInitialBatch = async () => {
      const initialIndicesToLoad: number[] = [];
      const step = Math.max(1, Math.floor(totalFrames / initialFrameCount));
      for (let i = 0; i < totalFrames; i += step) {
        initialIndicesToLoad.push(i);
      }
      if (!initialIndicesToLoad.includes(0)) initialIndicesToLoad.unshift(0);

      try {
        await Promise.allSettled(initialIndicesToLoad.map((idx) => loadFrame(idx)));
        if (!isMounted) return;

        // Render first frame immediately
        const firstImg = imagesCacheRef.current.get(0);
        if (firstImg) {
          drawImageToCanvas(firstImg);
          currentFrameIndexRef.current = 0;
        }

        setIsLoading(false);

        // Step 2: Progressively preload all remaining frames in priority order
        for (let i = 0; i < totalFrames; i++) {
          if (!isMounted) break;
          try {
            await loadFrame(i);
            initialLoaded++;
            if (i % 10 === 0) {
              setLoadedCount(initialLoaded);
            }
          } catch {
            // continue loading other frames
          }
        }
      } catch (err) {
        console.error("Error during initial frame batch loading", err);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    loadInitialBatch();

    return () => {
      isMounted = false;
    };
  }, [frames, initialFrameCount, drawImageToCanvas]);

  // Handle Resize canvas resolution to match display size cleanly
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Redraw current frame after resize
        const currentIndex = currentFrameIndexRef.current;
        if (currentIndex >= 0 && imagesCacheRef.current.has(currentIndex)) {
          drawImageToCanvas(imagesCacheRef.current.get(currentIndex)!);
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [drawImageToCanvas]);

  // Scroll Driven Frame Index Calculation via requestAnimationFrame
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameIdRef.current !== null) return;

      animationFrameIdRef.current = requestAnimationFrame(() => {
        animationFrameIdRef.current = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollableDistance = rect.height - window.innerHeight;

        if (totalScrollableDistance <= 0) return;

        // Progress from 0 (top of section entering viewport) to 1 (bottom leaving)
        const currentScroll = -rect.top;
        const rawProgress = currentScroll / totalScrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));

        setScrollProgress(progress);

        if (isReducedMotionRef.current) return;

        const totalFrames = frames.length;
        const targetFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(progress * (totalFrames - 1)))
        );

        // Only redraw if frame index actually changed
        if (targetFrameIndex !== currentFrameIndexRef.current) {
          const cachedImg = imagesCacheRef.current.get(targetFrameIndex);
          if (cachedImg) {
            drawImageToCanvas(cachedImg);
            currentFrameIndexRef.current = targetFrameIndex;
          } else {
            // Find nearest cached frame if exact frame is still preloading
            let nearestIndex = targetFrameIndex;
            for (let offset = 1; offset < 20; offset++) {
              if (imagesCacheRef.current.has(targetFrameIndex - offset)) {
                nearestIndex = targetFrameIndex - offset;
                break;
              }
              if (imagesCacheRef.current.has(targetFrameIndex + offset)) {
                nearestIndex = targetFrameIndex + offset;
                break;
              }
            }
            const nearestImg = imagesCacheRef.current.get(nearestIndex);
            if (nearestImg) {
              drawImageToCanvas(nearestImg);
              currentFrameIndexRef.current = nearestIndex;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial trigger

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [frames.length, drawImageToCanvas]);

  return (
    <div
      id={id}
      ref={containerRef}
      style={{ height: `${heightInVh}vh` }}
      className="relative w-full bg-darkBg text-white"
    >
      {/* Sticky Full-Viewport Inner Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-darkBg/90 backdrop-blur-md transition-opacity duration-500">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-4" />
            <p className="text-xs uppercase tracking-ultra text-neutral-400 font-medium">
              Loading Cinematic Experience...
            </p>
          </div>
        )}

        {/* Fallback Image if Canvas fails or frames fail to load */}
        {loadError ? (
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAssetPath(fallbackImage)}
              alt="Nova Car Luxury Vehicle"
              className="max-h-[80vh] max-w-[90vw] object-contain drop-shadow-2xl"
            />
          </div>
        ) : (
          /* Main HTML5 Canvas */
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none transition-opacity duration-700"
          />
        )}

        {/* Dynamic Overlay Content based on scroll progress */}
        {overlayContent && (
          <div className="absolute inset-0 z-20 pointer-events-auto flex items-center justify-center">
            {overlayContent(scrollProgress)}
          </div>
        )}
      </div>
    </div>
  );
}
