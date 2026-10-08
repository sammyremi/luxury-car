"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { CARS } from "@/data/cars";
import { createWhatsAppLink } from "@/lib/utils";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: CARS[0].model,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Nova Car Concierge,\n\nI would like to enquire about a vehicle.\n\nDetails:\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Vehicle of Interest: ${formData.vehicle}\n- Message: ${formData.message || "No additional message"}`;
    const url = createWhatsAppLink(text);
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-lightSurface dark:bg-darkSurface text-neutral-900 dark:text-white transition-colors duration-500 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra font-semibold text-amber-500">
                Direct Concierge
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-light tracking-tight leading-[1.1]">
                Your next drive <br />
                <span className="font-serif italic font-normal text-amber-500">
                  starts here.
                </span>
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Connect with our concierge team for immediate vehicle availability, purchase inquiries, or bespoke rental arrangements.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Phone</span>
                  <a href={`tel:${siteConfig.contact.phoneClean}`} className="text-base font-medium hover:text-amber-500 transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">WhatsApp Concierge</span>
                  <a
                    href={createWhatsAppLink("Hello Nova Car, I would like to inquire about your fleet.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:text-amber-500 transition-colors"
                  >
                    Instant WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Email</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-base font-medium hover:text-amber-500 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">Showroom Address</span>
                  <span className="text-sm font-light text-neutral-700 dark:text-neutral-300">
                    {siteConfig.contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-lightBg dark:bg-darkBg p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6">
            <h3 className="text-2xl font-display font-light text-neutral-900 dark:text-white">
              Enquire About a Vehicle
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                    Vehicle of Interest
                  </label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    {CARS.map((c) => (
                      <option key={c.id} value={`${c.brand} ${c.model}`}>
                        {c.brand} {c.model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                  Message / Specific Request
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify lease duration, purchase terms, or delivery location..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Send WhatsApp Enquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
