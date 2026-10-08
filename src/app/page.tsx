import React from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { EVSection } from "@/components/EVSection";
import { TransitionSection } from "@/components/TransitionSection";
import { CollectionSection } from "@/components/CollectionSection";
import { BuySection } from "@/components/BuySection";
import { RentalSection } from "@/components/RentalSection";
import { WhyNovaCar } from "@/components/WhyNovaCar";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-darkBg text-white selection:bg-amber-500 selection:text-neutral-950">
      {/* 1. Global Navigation Bar */}
      <Navigation />

      {/* 2. Porsche GT3 Scroll Animation Hero */}
      <HeroSection />

      {/* 3. Introduction Section: More than a car */}
      <IntroSection />

      {/* 4. EV Engineering Exploded View Animation */}
      <EVSection />

      {/* 5. Transition Section: Built for the way you want to move */}
      <TransitionSection />

      {/* 6. Collection Intro & Horizontal Showroom */}
      <CollectionSection />

      {/* 7. Buy / Acquisition Services Section */}
      <BuySection />

      {/* 8. Rental Services Section */}
      <RentalSection />

      {/* 9. Why Nova Car Pillars */}
      <WhyNovaCar />

      {/* 10. About Section */}
      <AboutSection />

      {/* 11. Contact Section & WhatsApp Concierge */}
      <ContactSection />

      {/* 12. Final Cinematic CTA */}
      <FinalCTA />

      {/* 13. Brand Footer */}
      <Footer />
    </main>
  );
}
