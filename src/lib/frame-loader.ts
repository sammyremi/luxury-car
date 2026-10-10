import { getAssetPath } from "./utils";
import { porscheFrames, evFrames } from "@/data/animation-frames";

export type LoadingProgressCallback = (progress: {
  loaded: number;
  total: number;
  percentage: number;
  statusText: string;
}) => void;

class FrameLoaderManager {
  private cache: Map<string, HTMLImageElement> = new Map();
  private pending: Map<string, Promise<HTMLImageElement | null>> = new Map();
  private maxConcurrency = 8;
  private porscheLoadedCount = 0;
  private evLoadedCount = 0;
  private criticalLoadedCount = 0;
  private isPorscheComplete = false;
  private isEvComplete = false;

  private criticalAssets = [
    "/cars/porche/gt side.webp",
    "/cars/porche/gt front.webp",
    "/cars/ferrari/ferrari side.webp",
    "/cars/aston martin/aston martin side.webp",
  ];

  /**
   * Preloads an image URL, decoding it off the main thread.
   */
  async loadAndDecodeImage(rawUrl: string): Promise<HTMLImageElement | null> {
    const src = getAssetPath(rawUrl);

    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    if (this.pending.has(src)) {
      return this.pending.get(src)!;
    }

    const loadPromise = (async () => {
      try {
        const img = new Image();
        img.src = src;

        // HTMLImageElement.decode() decodes the image off-thread before drawing
        if (typeof img.decode === "function") {
          await img.decode().catch(() => {
            // Fallback to standard onload if decode fails
          });
        } else {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }

        this.cache.set(src, img);
        this.pending.delete(src);
        return img;
      } catch (err) {
        console.warn(`[FrameLoader] Failed to load/decode frame: ${src}`, err);
        this.pending.delete(src);
        return null;
      }
    })();

    this.pending.set(src, loadPromise);
    return loadPromise;
  }

  /**
   * Gets a cached image if available.
   */
  getCachedImage(rawUrl: string): HTMLImageElement | undefined {
    const src = getAssetPath(rawUrl);
    return this.cache.get(src);
  }

  /**
   * Helper to execute loading queue with concurrency limit.
   */
  private async loadQueue(
    urls: string[],
    onItemComplete?: (url: string) => void
  ): Promise<void> {
    const queue = [...urls];
    const workers: Promise<void>[] = [];

    const worker = async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        if (!url) break;
        await this.loadAndDecodeImage(url);
        if (onItemComplete) onItemComplete(url);
      }
    };

    const count = Math.min(this.maxConcurrency, urls.length);
    for (let i = 0; i < count; i++) {
      workers.push(worker());
    }

    await Promise.all(workers);
  }

  /**
   * Phase 1: Preload Porsche frames + critical assets for initial loading screen.
   */
  async preloadInitialBatch(onProgress?: LoadingProgressCallback): Promise<void> {
    const allInitialUrls = [...this.criticalAssets, ...porscheFrames];
    const totalCount = allInitialUrls.length;
    let completedCount = 0;

    const reportProgress = () => {
      if (!onProgress) return;
      const percentage = Math.min(100, Math.floor((completedCount / totalCount) * 100));
      let statusText = "Loading Assets";
      if (percentage > 85) statusText = "Almost Ready";
      else if (percentage > 50) statusText = "Preparing Showcase";
      else if (percentage > 20) statusText = "Caching Porsche 911 GT3";

      onProgress({
        loaded: completedCount,
        total: totalCount,
        percentage,
        statusText,
      });
    };

    reportProgress();

    // Prioritize critical hero assets first
    await this.loadQueue(this.criticalAssets, () => {
      completedCount++;
      reportProgress();
    });

    // Then load Porsche frames sequentially in batches
    await this.loadQueue(porscheFrames, () => {
      completedCount++;
      reportProgress();
    });

    this.isPorscheComplete = true;
    reportProgress();

    // Immediately trigger background preload of EV frames
    this.preloadEvFramesInBackground();
  }

  /**
   * Phase 2: Progressively preload EV frames in background with controlled concurrency.
   */
  async preloadEvFramesInBackground(): Promise<void> {
    if (this.isEvComplete) return;

    // Load EV frames with slightly lower concurrency to avoid impacting user scroll
    const previousConcurrency = this.maxConcurrency;
    this.maxConcurrency = 6;

    await this.loadQueue(evFrames, () => {
      this.evLoadedCount++;
    });

    this.maxConcurrency = previousConcurrency;
    this.isEvComplete = true;
  }
}

export const frameLoader = new FrameLoaderManager();
