"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollEffects() {
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create a spring configuration for smooth progress line animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-worknub-green via-worknub-teal to-worknub-green origin-[0%] z-100"
        style={{ scaleX }}
      />

      {/* ── Back to Top Button ── */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-5 w-12 h-12 rounded-full bg-white text-worknub-green border border-gray-150 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] cursor-pointer z-40 transition-shadow duration-300"
            aria-label="Back to top"
          >
            <FiArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
