"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collection", href: "#collection" },
    { name: "Sell", href: "#sell" },
    { name: "Rent", href: "#rent" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-20 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-ultra uppercase text-white font-display"
            >
              NOVA<span className="text-amber-500">.</span>CAR
            </Link>
            <p className="text-sm font-light text-neutral-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Nav links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs uppercase tracking-ultra text-amber-500 font-semibold mb-4">
                Navigation
              </span>
              <ul className="space-y-2.5">
                {footerLinks.slice(0, 3).map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-ultra text-amber-500 font-semibold mb-4">
                Services
              </span>
              <ul className="space-y-2.5">
                {footerLinks.slice(3).map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-xs uppercase tracking-ultra text-amber-500 font-semibold">
              Connect
            </span>
            <div className="flex items-center space-x-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-mono">
          <p>© 2026 Nova Car. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with precision for automotive connoisseurs.</p>
        </div>
      </div>
    </footer>
  );
}
