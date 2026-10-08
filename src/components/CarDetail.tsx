"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car } from "@/data/cars";
import { getAssetPath, formatPrice, createWhatsAppLink } from "@/lib/utils";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import {
  ArrowLeft,
  CheckCircle2,
  Tag,
  Key,
  Gauge,
  Zap,
  Flame,
  Activity,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface CarDetailProps {
  car: Car;
}

export function CarDetail({ car }: CarDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const buyWhatsAppMsg = `Hello Nova Car Concierge,\n\nI am interested in acquiring the ${car.year} ${car.brand} ${car.model} listed at ${formatPrice(car.priceSale)}.\n\nPlease share purchase availability and private viewing schedule.`;
  const rentWhatsAppMsg = `Hello Nova Car Concierge,\n\nI would like to rent the ${car.year} ${car.brand} ${car.model} (${formatPrice(car.priceRentPerDay)}/day).\n\nPlease provide rental availability and reservation terms.`;

  return (
    <main className="min-h-screen bg-lightBg dark:bg-darkBg text-neutral-900 dark:text-white transition-colors duration-500">
      <Navigation />

      {/* Top Header Spacing */}
      <div className="pt-28 pb-12 max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/#collection"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
                {car.brand} — {car.year}
              </span>
              {car.availableForSale && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <Tag className="w-3 h-3 mr-1 text-amber-500" /> Sale
                </span>
              )}
              {car.availableForRent && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-amber-500/10 text-amber-500">
                  <Key className="w-3 h-3 mr-1" /> Rental
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight">
              {car.model}
            </h1>
            <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-300 font-light max-w-2xl">
              {car.tagline}
            </p>
          </div>

          {/* Price & CTAs */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-4">
            <div>
              <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">
                {car.availableForSale ? "Valuation / Price" : "Rental Rate"}
              </span>
              <span className="text-3xl md:text-4xl font-display font-light text-neutral-900 dark:text-white">
                {car.availableForSale
                  ? formatPrice(car.priceSale)
                  : `${formatPrice(car.priceRentPerDay)} / day`}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {car.availableForSale && (
                <a
                  href={createWhatsAppLink(buyWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all text-center shadow-lg flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire to Buy</span>
                </a>
              )}
              {car.availableForRent && (
                <a
                  href={createWhatsAppLink(rentWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-center shadow-lg flex items-center justify-center space-x-2"
                >
                  <Key className="w-4 h-4 text-amber-500" />
                  <span>Enquire to Rent</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-6">
          <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[75vh] bg-lightSurface dark:bg-darkSurface rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden flex items-center justify-center p-6 md:p-12 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAssetPath(car.images.gallery[activeImageIndex] || car.images.hero)}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex items-center justify-center space-x-4">
            {car.images.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                type="button"
                className={`relative w-24 h-16 rounded-xl border-2 overflow-hidden transition-all ${
                  activeImageIndex === idx
                    ? "border-amber-500 scale-105 shadow-md"
                    : "border-neutral-300 dark:border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetPath(img)}
                  alt="Gallery Thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="my-20 space-y-8">
          <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {car.specs.horsepower && (
              <div className="p-6 rounded-2xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Horsepower</span>
                <span className="block text-lg md:text-xl font-light font-display text-neutral-900 dark:text-white">
                  {car.specs.horsepower}
                </span>
              </div>
            )}

            {car.specs.acceleration && (
              <div className="p-6 rounded-2xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">0-60 MPH</span>
                <span className="block text-lg md:text-xl font-light font-display text-neutral-900 dark:text-white">
                  {car.specs.acceleration}
                </span>
              </div>
            )}

            {car.specs.topSpeed && (
              <div className="p-6 rounded-2xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                <Gauge className="w-5 h-5 text-amber-500" />
                <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Top Speed</span>
                <span className="block text-lg md:text-xl font-light font-display text-neutral-900 dark:text-white">
                  {car.specs.topSpeed}
                </span>
              </div>
            )}

            {car.specs.engine && (
              <div className="p-6 rounded-2xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                <Activity className="w-5 h-5 text-amber-500" />
                <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Engine</span>
                <span className="block text-sm md:text-base font-light font-display text-neutral-900 dark:text-white truncate">
                  {car.specs.engine}
                </span>
              </div>
            )}
          </div>

          {/* Details Table */}
          <div className="p-8 rounded-3xl bg-lightSurface dark:bg-darkSurface border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {car.specs.transmission && (
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Transmission</span>
                  <span className="font-light text-neutral-900 dark:text-neutral-100">{car.specs.transmission}</span>
                </div>
              )}

              {car.specs.drivetrain && (
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Drivetrain</span>
                  <span className="font-light text-neutral-900 dark:text-neutral-100">{car.specs.drivetrain}</span>
                </div>
              )}

              {car.specs.fuelType && (
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Fuel Type</span>
                  <span className="font-light text-neutral-900 dark:text-neutral-100">{car.specs.fuelType}</span>
                </div>
              )}

              {car.specs.location && (
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Showroom Location</span>
                  <span className="font-light text-neutral-900 dark:text-neutral-100 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-amber-500" />
                    {car.specs.location}
                  </span>
                </div>
              )}

              {car.specs.mileage && (
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Odometer</span>
                  <span className="font-light text-neutral-900 dark:text-neutral-100">{car.specs.mileage}</span>
                </div>
              )}

              <div>
                <span className="block text-[10px] uppercase tracking-ultra text-neutral-500 mb-1">Certification</span>
                <span className="font-light text-neutral-900 dark:text-neutral-100 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  Nova Verified Pristine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Description */}
        <div className="my-16 max-w-4xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-white">
            Overview
          </h2>
          <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
            {car.description}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
