"use client";

import React from "react";
import { getAssetPath } from "@/lib/utils";
import { ArrowRight, MessageSquare } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 bg-neutral-950 text-white overflow-hidden flex items-center justify-center">
      {/* Background Image Showcase Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath("/cars/aston martin/aston martin side.webp")}
          alt="Nova Car Supercar"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <span className="text-xs uppercase tracking-ultra font-semibold text-amber-400">
          The Next Step
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight leading-tight">
          Ready to drive something <br />
          <span className="font-serif italic font-normal text-amber-400">
            extraordinary?
          </span>
        </h2>
        <p className="text-base md:text-xl text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
          Your dream vehicle awaits in our private collection. Sales, acquisitions, and bespoke rentals tailored to your exacting standards.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <a
            href="#collection"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-white text-neutral-950 hover:bg-neutral-200 transition-all duration-300 shadow-2xl"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900/80 backdrop-blur-md text-white border border-white/20 hover:bg-neutral-800 transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Contact Nova Car</span>
          </a>
        </div>
      </div>
    </section>
  );
}
