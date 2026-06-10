"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiWifi, FiZap, FiMapPin, FiArrowRight, FiCalendar,
  FiBriefcase, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { Pill } from "./Ui";
import { heroSlides } from "./HeroData";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const [auto, setAuto]     = useState(true);

  // Extract images from heroSlides for the card display
  const cardImages = heroSlides.map(slide => slide.image || slide.card?.image || "/default-space.jpg");

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [auto]);

  function goTo(i) {
    setDir(i > active ? 1 : -1);
    setActive(i);
    setAuto(false);
    // Re-enable auto after 10 seconds of inactivity
    setTimeout(() => setAuto(true), 10000);
  }

  const slide = heroSlides[active];

  const variants = {
    enter:  d => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   d => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.35 } }),
  };

  // Card shuffling animation variants - 3 cards always visible
  const getCardPosition = (i, activeIndex) => {
    const totalSlides = heroSlides.length;
    
    // Calculate the relative position considering wrapping
    let diff = i - activeIndex;
    if (diff < -1) diff += totalSlides;
    if (diff > 1) diff -= totalSlides;
    
    // For 3 cards: active (0), left (-1), right (1)
    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        width: '300px',
        height: '400px',
      };
    } else if (diff === -1) {
      return {
        x: -190,
        y: 20,
        rotate: -8,
        scale: 0.85,
        zIndex: 5,
        opacity: 0.7,
        width: '260px',
        height: '360px',
      };
    } else if (diff === 1) {
      return {
        x: 190,
        y: 20,
        rotate: 8,
        scale: 0.85,
        zIndex: 5,
        opacity: 0.7,
        width: '260px',
        height: '360px',
      };
    } else {
      // Cards beyond the 3 visible ones are hidden
      return {
        x: diff > 0 ? 300 : -300,
        y: 0,
        rotate: 0,
        scale: 0,
        zIndex: 0,
        opacity: 0,
        width: '0',
        height: '0',
      };
    }
  };

  return (
    <section className="relative min-h-screen bg-worknub-mint overflow-hidden flex flex-col">

      {/* ── Mint background ── */}
      <div className="absolute inset-0 z-0 bg-worknub-mint" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(240,249,240,0.6) 100%)" }} />

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center px-[5vw] pt-[80px] lg:pt-[120px] pb-12 lg:pb-20 max-w-[1280px] mx-auto w-full gap-8 lg:gap-[60px] relative z-[2]">

        {/* LEFT */}
        <div className="w-full lg:flex-[0_0_55%] min-w-0">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
              <div className="mb-5">
                <Pill colorClass={`${slide.accentTextClass} ${slide.accentBgClass} ${slide.accentBorderClass}`}>
                  {slide.badge}
                </Pill>
              </div>
              <p className="text-gray-500 text-[13px] font-semibold tracking-[0.1em] uppercase mb-4">
                {slide.eyebrow}
              </p>
              <h1 className="text-worknub-dark text-[clamp(1.8rem,4.5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-5 whitespace-pre-line">
                {slide.heading}
              </h1>
              <p className="text-gray-500 text-[0.95rem] sm:text-[1.05rem] leading-[1.7] max-w-[460px] mb-9">
                {slide.sub}
              </p>

              <div className="flex gap-3 flex-wrap mb-12">
                <Link href={slide.cta.href}
                  className={`${slide.accentClass} text-white px-7 py-3 rounded-lg font-bold text-sm inline-flex items-center gap-2 no-underline tracking-[0.01em] hover:opacity-90 transition-opacity`}>
                  {slide.cta.label} <FiArrowRight />
                </Link>
                <Link href="/contact"
                  className="bg-white text-worknub-dark px-7 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 no-underline border border-gray-200 hover:border-worknub-green/40 hover:bg-worknub-mint transition-colors shadow-sm">
                  Book a Tour <FiCalendar />
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-6 pt-7 border-t border-gray-200">
                {[
                  { icon: FiWifi,   label: "Super fast internet" },
                  { icon: FiZap,    label: "Stable Power" },
                  { icon: FiMapPin, label: "Agodi GRA" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-gray-500 text-[13px]">
                    <Icon className={slide.accentTextClass} size={15} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — 3D Card Stack with 3 visible cards */}
        <div className="flex flex-1 justify-center items-center relative h-[400px] sm:h-[420px] lg:h-[450px] w-full">
          {cardImages.map((img, i) => {
            const position = getCardPosition(i, active);
            
            return (
              <motion.div
                key={i}
                animate={position}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onClick={() => goTo(i)}
                className="absolute cursor-pointer rounded-[20px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  background: `url(${img}) center/cover`,
                  border: i === active ? '3px solid #4CAF50' : '3px solid rgba(255,255,255,0.3)',
                  boxShadow: i === active 
                    ? '0 25px 60px rgba(0,0,0,0.3)' 
                    : '0 15px 35px rgba(0,0,0,0.15)',
                }}
              >
                {/* Active card badges */}
                {i === active && (
                  <>
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-worknub-dark">
                        {heroSlides[i]?.card?.tag || 'Premium'}
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-worknub-dark">
                        {heroSlides[i]?.card?.stat || 'Featured'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-worknub-dark text-center">
                        {heroSlides[i]?.card?.statLabel|| 'Workspace'}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide nav */}
      <div className="flex items-center justify-center gap-3 px-[5vw] pb-8 lg:pb-10 max-w-[1280px] mx-auto w-full relative z-[2]">
        <button onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
          className="bg-white border border-gray-200 rounded-lg w-9 h-9 cursor-pointer text-gray-600 flex items-center justify-center hover:border-worknub-green/40 hover:text-worknub-green transition-colors shadow-sm hidden sm:flex">
          <FiChevronLeft />
        </button>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${active === i ? "w-7 bg-worknub-green" : "w-2 bg-gray-300"}`} />
        ))}
        <button onClick={() => goTo((active + 1) % heroSlides.length)}
          className="bg-white border border-gray-200 rounded-lg w-9 h-9 cursor-pointer text-gray-600 flex items-center justify-center hover:border-worknub-green/40 hover:text-worknub-green transition-colors shadow-sm hidden sm:flex">
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}