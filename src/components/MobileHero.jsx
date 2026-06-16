"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiWifi, FiZap, FiMapPin, FiArrowRight, FiMessageCircle,
  FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { Pill } from "./Ui";
import { heroSlides } from "./HeroData";
import BuildingSVG from "./BuildingSVG";

/* ── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(text, speed = 45) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    setDone(false);
    lastRef.current = null;

    const step = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      if (ts - lastRef.current >= speed) {
        lastRef.current = ts;
        idxRef.current += 1;
        setDisplayed(text.slice(0, idxRef.current));
        if (idxRef.current >= text.length) { setDone(true); return; }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [text, speed]);

  return { displayed, done };
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [auto, setAuto] = useState(true);
  const slide = heroSlides[active];
  const cardImages = heroSlides.map(s => s.image || "/default-space.jpg");

  /* Static subtext */
  const staticSubtext = "Experience premium coworking spaces designed for productivity and collaboration in the heart of Agodi GRA, Ibadan.";

  /* Typewriter on the heading only */
  const headingFlat = slide.heading.replace(/\n/g, ' ');
  const { displayed, done } = useTypewriter(headingFlat, 42);

  /* Split displayed text: first line dark, second line accent */
  const lines = slide.heading.split('\n').filter(Boolean);
  const firstLine = lines[0] || '';
  const firstDisplayed  = displayed.slice(0, firstLine.length);
  const secondDisplayed = displayed.length > firstLine.length
    ? displayed.slice(firstLine.length).trimStart()
    : '';

  /* Auto-advance after heading finishes + 3s pause */
  useEffect(() => {
    if (!auto || !done) return;
    const t = setTimeout(() => {
      setDir(1);
      setActive(p => (p + 1) % heroSlides.length);
    }, 3200);
    return () => clearTimeout(t);
  }, [auto, done, active]);

  function goTo(i) {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
    setAuto(false);
    setTimeout(() => setAuto(true), 12000);
  }

  return (
    <section className="relative min-h-screen bg-worknub-mint overflow-hidden flex flex-col">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781088299/Untitled-1_tuqrgv.png)",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-worknub-mint/70 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(240,249,240,0.5) 100%)" }}
      />

      {/* Building SVG */}
      {/* <div className="absolute right-0 bottom-0 w-[320px] xl:w-[420px] pointer-events-none z-[1] hidden lg:block"
        style={{ height: '75vh' }}>
        <BuildingSVG className="w-full h-full" opacity={0.14} />
      </div> */}

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-worknub-green/30 to-transparent z-1" />

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col px-5 sm:px-[5vw] pt-20 sm:pt-24 lg:pt-32 pb-10 max-w-[1280px] mx-auto w-full relative z-2">

        {/* ── Clean Image Slider (NO OVERLAY CONTENT) ── */}
        <div className="w-full max-w-[600px] lg:max-w-[520px] mx-auto mb-8 lg:mb-10">

          {/* Card */}
          <div className="relative flex items-center justify-center mb-4">

            {/* Prev */}
            <button onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute -left-1 sm:-left-5 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-9 h-9 sm:w-10 sm:h-10 cursor-pointer text-gray-600 flex items-center justify-center hover:border-worknub-green/40 hover:text-worknub-green transition-all shadow-md shrink-0">
              <FiChevronLeft size={18} />
            </button>

            {/* Clean image - no overlays */}
            <div className="w-full overflow-hidden rounded-3xl"
              style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  initial={d => ({ opacity: 0, x: d > 0 ? 60 : -60 })}
                  animate={{ opacity: 1, x: 0 }}
                  exit={d => ({ opacity: 0, x: d > 0 ? -40 : 40 })}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={cardImages[active]}
                    alt={heroSlides[active]?.card?.label || 'Workspace'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <button onClick={() => goTo((active + 1) % heroSlides.length)}
              className="absolute -right-1 sm:-right-5 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-9 h-9 sm:w-10 sm:h-10 cursor-pointer text-gray-600 flex items-center justify-center hover:border-worknub-green/40 hover:text-worknub-green transition-all shadow-md shrink-0">
              <FiChevronRight size={18} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                  active === i ? `w-6 ${slide.accentClass.replace('text-', 'bg-')}` : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── ALL CONTENT (BADGE, HEADING, SUBTEXT, CTAs, FEATURES) COMES AFTER IMAGE ── */}
        <div className="w-full max-w-[720px] mx-auto text-center">

          {/* Badge/Pill */}
          <AnimatePresence mode="wait">
            <motion.div key={`pill-${active}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="mb-4">
              <Pill colorClass={`${slide.accentTextClass} ${slide.accentBgClass} ${slide.accentBorderClass}`}>
                {slide.badge}
              </Pill>
            </motion.div>
          </AnimatePresence>

          {/* Heading — typewriter */}
          <h1 className="text-[clamp(2rem,5.5vw,3.8rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ minHeight: 'clamp(5rem, 12vw, 9rem)' }}>
            <span className="text-worknub-dark">{firstDisplayed}</span>
            {secondDisplayed && (
              <>{' '}<span className={slide.accentTextClass}>{secondDisplayed}</span></>
            )}
            {!done && (
              <span className={`inline-block w-[2.5px] h-[0.85em] ml-0.5 align-middle ${slide.accentClass}`}
                style={{ animation: 'twblink 0.65s step-end infinite' }} />
            )}
          </h1>

          {/* Subtext - STATIC */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-gray-500 text-[0.9rem] sm:text-[1rem] lg:text-[1.05rem] leading-[1.75] max-w-[540px] mx-auto mb-8">
            {staticSubtext}
          </motion.p>

          {/* CTAs - STATIC (Explore Spaces & Message Us) */}
          <div className="flex gap-3 flex-wrap justify-center mb-8 sm:mb-10">
            <Link href="/spaces"
              className="bg-worknub-green text-white px-6 sm:px-7 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 no-underline hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
              Explore Spaces <FiArrowRight size={14} />
            </Link>
            <Link href="/contact"
              className="bg-white text-worknub-dark px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 no-underline border border-gray-200 hover:border-worknub-green/40 hover:bg-worknub-mint transition-colors shadow-sm">
              Message Us <FiMessageCircle size={14} />
            </Link>
          </div>

          {/* Feature tags - STATIC */}
          <div className="flex flex-wrap gap-4 sm:gap-6 pt-6 border-t border-gray-200/80 justify-center">
            {[
              { icon: FiWifi,   label: "Super fast internet" },
              { icon: FiZap,    label: "Stable Power" },
              { icon: FiMapPin, label: "Agodi GRA" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-gray-500 text-[12px] sm:text-[13px] whitespace-nowrap">
                <Icon className={slide.accentTextClass} size={13} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes twblink { 50% { opacity: 0; } }`}</style>
    </section>
  );
}