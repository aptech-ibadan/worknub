"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiBriefcase, FiStar, FiTag, FiUsers, FiAward } from "react-icons/fi";
import { Pill } from "./Ui";

const discounts = [
  {
    label: "Students",
    discount: "40% OFF",
    price: "From ₦2,300/day",
    badgeClass: "bg-worknub-green text-white",
    textClass: "text-worknub-green",
    icon: FiUsers,
  },
  {
    label: "Corp Members (NYSC)",
    discount: "25% OFF",
    price: "From ₦2,900/day",
    badgeClass: "bg-worknub-orange text-white",
    textClass: "text-worknub-orange",
    icon: FiAward,
  },
];

const tags = ["University Students", "Polytechnic", "NYSC Members", "OND/HND"];

// Floating icon component
const FloatingIcon = ({ Icon, delay, duration, x, y, size = "text-xl" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.08, 0.08, 0],
      y: [y, y - 20, y - 40, y - 60],
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

export default function OfferSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showFloatingIcons = !isMobile;

  return (
    <section className="py-12 sm:py-20 lg:py-[100px] px-4 sm:px-[5vw] bg-white relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2D2D2D 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Floating Icons */}
      {showFloatingIcons && (
        <>
          <FloatingIcon Icon={FiStar} delay={0} duration={10} x="5%" y="15%" size="text-2xl" />
          <FloatingIcon Icon={FiTag} delay={3} duration={12} x="88%" y="25%" size="text-2xl" />
          <FloatingIcon Icon={FiUsers} delay={5} duration={15} x="92%" y="70%" size="text-xl" />
          <FloatingIcon Icon={FiAward} delay={2} duration={11} x="3%" y="80%" size="text-xl" />
          <FloatingIcon Icon={FiBriefcase} delay={4} duration={13} x="50%" y="10%" size="text-xl" />
        </>
      )}

      {/* Subtle Gradient Orbs */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none opacity-30"
        style={{ 
          background: 'radial-gradient(circle, rgba(76,175,80,0.04) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none opacity-30"
        style={{ 
          background: 'radial-gradient(circle, rgba(245,124,0,0.03) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-[1280px] mx-auto">
        <div className="bg-worknub-dark rounded-[20px] sm:rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative">
          
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-worknub-orange/[0.05] rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-worknub-green/[0.05] rounded-tl-full pointer-events-none" />
          
          {/* Animated border line */}
          <motion.div 
            className="absolute top-0 left-1/2 w-px h-0 bg-gradient-to-b from-worknub-green to-transparent hidden lg:block"
            animate={{ height: ['0%', '30%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: '50%' }}
          />

          {/* LEFT — copy + discount rows */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="px-4 py-6 sm:px-8 md:p-[50px] relative z-10"
          >
            <Pill colorClass="text-worknub-orange bg-worknub-orange/10 border-worknub-orange/20">
              Limited Time Offer
            </Pill>
            <h2 className="text-white text-[clamp(1.5rem,2.5vw,2.2rem)] font-extrabold tracking-[-0.02em] mt-4 mb-3.5 leading-[1.2]">
              Special Rates for Students &amp; Corp Members
            </h2>
            <p className="text-gray-400 text-[0.9rem] sm:text-[0.95rem] leading-[1.7] mb-6 sm:mb-8">
              Get up to 40% off shared workspace. Show your valid ID and start working in a professional environment today.
            </p>

            {/* Discount cards — side by side */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              {discounts.map(({ label, discount, price, badgeClass, textClass, icon: Icon }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                  className="relative flex-1 pt-4"
                  whileHover={{ y: -3 }}
                >
                  {/* Badge — floats half above top-right corner */}
                  <div className={`absolute top-0 right-0 ${badgeClass} z-10 text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-full shadow-md -translate-y-1/8 flex items-center gap-1`}>
                    <Icon size={10} />
                    {discount}
                  </div>
                  {/* Card */}
                  <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.10] rounded-xl py-4 px-4 sm:px-5 h-full transition-all duration-300 hover:bg-white/[0.08]">
                    <p className="text-white font-bold text-sm mb-1">{label}</p>
                    <p className={`${textClass} text-base font-black tracking-[-0.01em]`}>{price}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/offer"
              className="group inline-flex items-center gap-2 bg-worknub-orange text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-[13px] sm:text-sm hover:bg-[#e05a00] transition-all hover:gap-3"
            >
              Claim Discount <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* RIGHT — package info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="px-4 py-6 sm:px-8 md:p-[50px] bg-worknub-green/[0.07] flex flex-col justify-center items-center text-center border-t border-white/[0.06] lg:border-t-0 lg:border-l relative"
          >
            {/* Subtle background icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
              <FiBriefcase size={200} />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-16 sm:w-20 h-16 sm:h-20 bg-worknub-green rounded-[16px] sm:rounded-[20px] flex items-center justify-center mb-4 sm:mb-5 relative"
              style={{ boxShadow: '0 8px 24px rgba(71,195,65,0.35)' }}
              whileHover={{ scale: 1.05 }}
            >
              <FiBriefcase size={36} className="text-white" />
              {/* Pulsing ring */}
              <motion.div 
                className="absolute inset-0 rounded-[20px] border-2 border-worknub-green/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <h3 className="text-white text-[1.3rem] font-extrabold mb-2">
              Student &amp; Corper Package
            </h3>
            <p className="text-gray-400 text-[13.5px] mb-5 leading-[1.6] max-w-xs">
              Valid student ID or NYSC call-up letter required. Terms and conditions apply.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                  className="bg-worknub-green/[0.15] text-worknub-green text-[11px] font-semibold px-3 py-1 rounded-full hover:bg-worknub-green/[0.25] transition-all cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}