"use client";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { FiArrowRight, FiMapPin, FiWifi, FiZap, FiUsers } from 'react-icons/fi';

const slides = [
  {
    title: "Reimagine Your Workspace",
    subtitle: "Nestled in the heart of Ibadan, we offer a flexible, comfortable co-working space for you to get work done.",
    bgColor: "bg-worknub-green",
    ctaText: "Explore Spaces",
    ctaLink: "/spaces",
  },
  {
    title: "Work Anywhere, Anytime",
    subtitle: "Join Ibadan's fastest-growing community of remote workers, freelancers, and entrepreneurs.",
    bgColor: "bg-worknub-teal",
    ctaText: "View Pricing",
    ctaLink: "/pricing",
  },
  {
    title: "Membership Gives You More",
    subtitle: "Save up to 40% with our exclusive membership program - T-shirt, face cap, and discounts included.",
    bgColor: "bg-worknub-orange",
    ctaText: "Join Membership",
    ctaLink: "/membership",
  },
];

export default function HeroSlider() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      transitionTime={600}
      className="hero-slider"
    >
      {slides.map((slide, index) => (
        <div key={index} className={`${slide.bgColor} h-screen flex items-center`}>
          <div className="container-custom text-left text-white">
            <div className="max-w-2xl animate-fade-up">
              <div className="flex items-center space-x-2 mb-4">
                <FiMapPin className="text-worknub-orange" />
                <span className="text-sm">Agodi GRA, Ibadan</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h1>
              <p className="text-xl mb-8 opacity-90">{slide.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={slide.ctaLink} className="bg-white text-worknub-dark px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
                  {slide.ctaText} <FiArrowRight />
                </Link>
                <Link href="/contact" className="border-2 border-white px-4 py-3 rounded-lg font-semibold hover:bg-white hover:text-worknub-dark transition-all inline-flex items-center gap-2">
                  Contact Us
                </Link>
              </div>
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <FiWifi className="text-worknub-orange" />
                  <span>High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiZap className="text-worknub-orange" />
                  <span>24/7 Power</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="text-worknub-orange" />
                  <span>Community Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}