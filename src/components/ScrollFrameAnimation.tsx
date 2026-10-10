"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAssetPath } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { frameLoader } from "@/lib/frame-loader";

interface ScrollFrameAnimationProps {
  id?: string;
  frames: string[];
  fallbackImage: string;
  heightInVh?: number; // e.g. 400 for 400vh
  overlayContent?: (progress: number) => React.ReactNode;
}

export function ScrollFrameAnimation({
  id = "frame-animation",
  frames,
  fallbackImage,
  heightInVh = 400,
  overlayContent,
}: ScrollFrameAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentFrameIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const lastScrollProgressRef = useRef<number>(0);

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

  // Frame helper: gets cached image or nearest cached frame
  const getFrameImage = useCallback(
    (index: number): HTMLImageElement | null => {
      if (index < 0 || index >= frames.length) return null;

      // 1. Direct hit
      const img = frameLoader.getCachedImage(frames[index]);
      if (img) return img;

      // 2. Nearest frame search
      for (let offset = 1; offset < 30; offset++) {
        const left = index - offset;
        if (left >= 0) {
          const leftImg = frameLoader.getCachedImage(frames[left]);
          if (leftImg) return leftImg;
        }
        const right = index + offset;
        if (right < frames.length) {
          const rightImg = frameLoader.getCachedImage(frames[right]);
          if (rightImg) return rightImg;
        }
      }

      return null;
    },
    [frames]
  );

  // Initial load check & frame readiness
  useEffect(() => {
    let isMounted = true;

    isReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const initAnimation = async () => {
      try {
        // Try rendering frame 0 immediately
        const firstImg = await frameLoader.loadAndDecodeImage(frames[0]);
        if (!isMounted) return;

        if (firstImg) {
          drawImageToCanvas(firstImg);
          currentFrameIndexRef.current = 0;
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to render initial frame", err);
        if (isMounted) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    };

    initAnimation();

    return () => {
      isMounted = false;
    };
  }, [frames, drawImageToCanvas]);

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

        const currentIndex = currentFrameIndexRef.current;
        if (currentIndex >= 0) {
          const img = getFrameImage(currentIndex);
          if (img) drawImageToCanvas(img);
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [drawImageToCanvas, getFrameImage]);

  // Scroll-driven RAF rendering loop
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

        // Progress from 0 to 1
        const currentScroll = -rect.top;
        const rawProgress = currentScroll / totalScrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Throttle React state update to avoid re-rendering on sub-pixel scroll ticks
        if (Math.abs(progress - lastScrollProgressRef.current) > 0.003 || progress === 0 || progress === 1) {
          lastScrollProgressRef.current = progress;
          setScrollProgress(progress);
        }

        if (isReducedMotionRef.current) return;

        const totalFrames = frames.length;
        const targetFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(progress * (totalFrames - 1)))
        );

        // Only redraw canvas if target index changed
        if (targetFrameIndex !== currentFrameIndexRef.current) {
          const img = getFrameImage(targetFrameIndex);
          if (img) {
            drawImageToCanvas(img);
            currentFrameIndexRef.current = targetFrameIndex;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [frames.length, drawImageToCanvas, getFrameImage]);

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
