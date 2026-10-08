"use client";

import React from "react";
import Link from "next/link";
import { Car } from "@/data/cars";
import { getAssetPath, formatPrice } from "@/lib/utils";
import { ArrowRight, Tag, Key } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="group relative w-[85vw] md:w-[65vw] lg:w-[55vw] max-w-4xl shrink-0 bg-lightSurface dark:bg-darkSurface border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 md:p-10">
      {/* Top Header: Brand, Model, Badges */}
      <div className="space-y-3 z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
            {car.brand}
          </span>
          <div className="flex items-center space-x-2">
            {car.availableForSale && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                <Tag className="w-3 h-3 mr-1 text-amber-500" />
                Sale
              </span>
            )}
            {car.availableForRent && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Key className="w-3 h-3 mr-1" />
                Rental
              </span>
            )}
          </div>
        </div>

        <h3 className="text-3xl md:text-5xl font-display font-light tracking-tight text-neutral-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
          {car.model}
        </h3>
        <p className="text-xs md:text-sm font-light text-neutral-600 dark:text-neutral-400 line-clamp-2 max-w-xl">
          {car.tagline}
        </p>
      </div>

      {/* Center Image Showcase */}
      <div className="relative my-8 h-48 sm:h-64 md:h-80 w-full flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath(car.images.hero)}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
          loading="lazy"
        />
      </div>

      {/* Bottom Footer Details & CTA */}
      <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between z-10">
        <div>
          <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">
            {car.availableForSale ? "Purchase Price" : "Rental Rate"}
          </span>
          <span className="text-lg md:text-2xl font-light font-display text-neutral-900 dark:text-white">
            {car.availableForSale
              ? formatPrice(car.priceSale)
              : `${formatPrice(car.priceRentPerDay)} / day`}
          </span>
        </div>

        <Link
          href={`/cars/${car.slug}`}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 group-hover:bg-amber-500 group-hover:text-white dark:group-hover:bg-amber-500 dark:group-hover:text-white transition-all duration-300 shadow-md"
        >
          <span>View Vehicle</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
