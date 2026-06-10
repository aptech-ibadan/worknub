import HeroSection        from "@/components/HeroSection";
import StatsBar           from "@/components/StatsBar";
import AboutSection       from "@/components/AboutSection";
import AmenitiesSection   from "@/components/AmenitiesSection";
import PricingSection     from "@/components/PricingSection";
import OfferSection       from "@/components/OfferSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection         from "@/components/CTASection";

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <AmenitiesSection />
      <PricingSection />
      <OfferSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}