"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiWifi, FiZap, FiCoffee, FiPrinter, FiLock, FiUsers, FiGrid, FiHexagon } from "react-icons/fi";
import { SectionLabel } from "./Ui";
import { amenities } from "./HeroData";

const icons = [FiWifi, FiZap, FiCoffee, FiPrinter, FiLock, FiUsers];

// Floating icon component for background decoration
const FloatingIcon = ({ Icon, delay, duration, x, y, size = "text-xl" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.06, 0.06, 0],
      y: [y, y - 30, y - 60, y - 90],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }}
    className={`absolute ${size} text-worknub-green pointer-events-none hidden lg:block`}
    style={{ left: x, top: y }}
  >
    <Icon />
  </motion.div>
);

export default function AmenitiesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showFloatingIcons = !isMobile;

  return (
    <section className="relative bg-worknub-dark py-16 sm:py-24 lg:py-[100px] px-[5vw] overflow-hidden">
      
      {/* Background Pattern Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(76,175,80,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,175,80,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient Orbs for Depth */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(76,175,80,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(76,175,80,0.04) 0%, transparent 70%)',
          transform: 'translate(30%, 30%)'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ 
          background: 'radial-gradient(circle, rgba(76,175,80,0.03) 0%, transparent 70%)'
        }}
      />

      {/* Floating Icons Scattered */}
      {showFloatingIcons && (
        <>
          <FloatingIcon Icon={FiWifi} delay={0} duration={12} x="5%" y="10%" size="text-3xl" />
          <FloatingIcon Icon={FiZap} delay={2.5} duration={14} x="88%" y="15%" size="text-3xl" />
          <FloatingIcon Icon={FiCoffee} delay={4} duration={11} x="10%" y="75%" size="text-3xl" />
          <FloatingIcon Icon={FiPrinter} delay={1.5} duration={13} x="85%" y="80%" size="text-3xl" />
          <FloatingIcon Icon={FiLock} delay={3} duration={10} x="45%" y="20%" size="text-2xl" />
          <FloatingIcon Icon={FiUsers} delay={5} duration={15} x="55%" y="85%" size="text-2xl" />
          <FloatingIcon Icon={FiWifi} delay={2} duration={9} x="75%" y="45%" size="text-2xl" />
          <FloatingIcon Icon={FiZap} delay={3.5} duration={11} x="20%" y="50%" size="text-2xl" />
          <FloatingIcon Icon={FiCoffee} delay={1} duration={8} x="60%" y="60%" size="text-xl" />
          <FloatingIcon Icon={FiUsers} delay={4.5} duration={12} x="35%" y="35%" size="text-xl" />
        </>
      )}

      {/* Animated Border Accents */}
      <motion.div 
        className="absolute top-0 left-0 w-48 h-px bg-linear-to-r from-transparent via-worknub-green to-transparent"
        animate={{ x: ['0%', '100%', '0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ width: '25%' }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-48 h-px bg-linear-to-l from-transparent via-worknub-green to-transparent"
        animate={{ x: ['0%', '-100%', '0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 6 }}
        style={{ width: '25%' }}
      />

      <div className="relative max-w-[1280px] mx-auto z-10">
        
        {/* Section Header with Decorative Elements */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14 relative">
          
          
          <SectionLabel>Facilities &amp; Amenities</SectionLabel>
          
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-white tracking-[-0.02em] relative inline-block">
            Everything You Need, Nothing You Don't
            {/* Animated underline glow */}
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-px bg-linear-to-r from-transparent via-worknub-green to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map(({ title, desc }, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-7 transition-all duration-300 hover:border-worknub-green/40 hover:shadow-xl hover:shadow-worknub-green/5 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-worknub-green/0 to-worknub-green/0 group-hover:from-worknub-green/5 group-hover:to-transparent transition-all duration-500" />
                
                {/* Icon container with hover animation */}
                <motion.div 
                  className="w-11 h-11 bg-worknub-green/13 rounded-[10px] flex items-center justify-center mb-3.5 relative transition-all duration-300 group-hover:scale-105 group-hover:bg-worknub-green/20"
                >
                  <Icon size={20} className="text-worknub-green" />
                </motion.div>
                
                <h3 className="text-white font-bold text-[15px] mb-1.5 group-hover:text-worknub-green transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-400 text-[13.5px] leading-[1.6] group-hover:text-gray-300 transition-colors duration-300">
                  {desc}
                </p>

                {/* Decorative corner accent on hover */}
                <div className="absolute bottom-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-full h-full text-worknub-green/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4L20 4 20 20" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}