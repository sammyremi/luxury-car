import React from "react";
import { SitePreloader } from "@/components/SitePreloader";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { EVSection } from "@/components/EVSection";
import { TransitionSection } from "@/components/TransitionSection";
import { CollectionSection } from "@/components/CollectionSection";
import { CinematicVideoSection } from "@/components/CinematicVideoSection";
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
      {/* 0. Cinematic Site Preloader with 0-100% progress */}
      <SitePreloader />

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

      {/* 7. Full-Screen Cinematic Background Video (YouTube YAFUyPp_238) */}
      <CinematicVideoSection />

      {/* 8. Buy / Acquisition Services Section */}
      <BuySection />

      {/* 9. Rental Services Section */}
      <RentalSection />

      {/* 10. Why Nova Car Pillars */}
      <WhyNovaCar />

      {/* 11. About Section */}
      <AboutSection />

      {/* 12. Contact Section & WhatsApp Concierge */}
      <ContactSection />

      {/* 13. Final Cinematic CTA */}
      <FinalCTA />

      {/* 14. Brand Footer */}
      <Footer />
    </main>
  );
}
