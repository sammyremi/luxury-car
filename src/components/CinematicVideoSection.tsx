"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAssetPath } from "@/lib/utils";

interface YTPlayer {
  playVideo: () => void;
  destroy: () => void;
}

interface YTGlobal {
  Player: new (
    elementId: HTMLElement | string,
    options: Record<string, unknown>
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function CinematicVideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = "YAFUyPp_238";

  // Official YouTube Embed parameters:
  // autoplay=1, mute=1, controls=0, loop=1, playlist=videoId, playsinline=1, rel=0, disablekb=1
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&disablekb=1&enablejsapi=1`;

  useEffect(() => {
    let player: YTPlayer | null = null;

    const initYT = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        try {
          player = new window.YT.Player(iframeRef.current, {
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              loop: 1,
              playlist: videoId,
              playsinline: 1,
              rel: 0,
              disablekb: 1,
            },
            events: {
              onReady: (e: { target: { playVideo: () => void } }) => {
                e.target.playVideo();
                setIsLoaded(true);
              },
            },
          });
        } catch {
          // fallback if YT constructor is occupied
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const oldCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldCallback) oldCallback();
        initYT();
      };
    }

    return () => {
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [videoId]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center border-0 p-0 m-0">
      {/* Fallback Poster Background */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${getAssetPath("/cars/aston martin/aston martin side.webp")})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Persistent Overscaled YouTube Background Iframe Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Nova Car Cinematic Background"
          onLoad={() => setIsLoaded(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none scale-125"
          style={{
            width: "max(120vw, 213.33vh)",
            height: "max(120vh, 67.5vw)",
            minWidth: "120%",
            minHeight: "120%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
        />
        {/* Seamless Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-darkBg/80 pointer-events-none" />
      </div>

      {/* Brand Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 md:py-24 pointer-events-none">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-ultra font-semibold text-amber-400 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            Cinematic Moment
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-ultra font-mono text-neutral-400">
            Sound of Performance
          </span>
        </div>

        <div className="max-w-2xl text-left space-y-3 pointer-events-auto">
          <h2 className="text-3xl md:text-6xl font-display font-light text-white tracking-tight leading-none drop-shadow-2xl">
            Pure <span className="font-serif italic font-normal text-amber-400">Emotion.</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-200 font-light max-w-lg leading-relaxed drop-shadow">
            Experience the unfiltered acoustic resonance and aerodynamic majesty of true automotive mastery.
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/15 pointer-events-auto">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-[11px]">4K HDR CINEMATIC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
