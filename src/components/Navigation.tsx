"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collection", href: "#collection" },
    { name: "Sell", href: "#sell" },
    { name: "Rent", href: "#rent" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-darkBg/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/80 py-4 shadow-sm"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Nova Car Brand Name */}
        <Link
          href="/"
          className="group flex items-center space-x-2 text-xl font-bold tracking-ultra uppercase text-neutral-900 dark:text-white transition-opacity duration-300 hover:opacity-80"
        >
          <span className="font-display font-semibold tracking-[0.25em]">
            NOVA<span className="text-amber-500">.</span>CAR
          </span>
        </Link>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-neutral-700 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400"
                  : "text-neutral-200 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center space-x-5">
          <ThemeToggle />

          <a
            href="#collection"
            className="group inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-md hover:shadow-lg"
          >
            <span>Explore Cars</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle Mobile Menu"
            className="p-2 rounded-full text-neutral-800 dark:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-darkBg/95 backdrop-blur-2xl border-b border-neutral-200 dark:border-neutral-800 px-8 py-8 flex flex-col space-y-6 shadow-2xl transition-all duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest font-semibold text-neutral-900 dark:text-neutral-100 hover:text-amber-500 dark:hover:text-amber-400 py-1 border-b border-neutral-100 dark:border-neutral-900"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
          >
            Explore Cars
          </a>
        </div>
      )}
    </header>
  );
}
