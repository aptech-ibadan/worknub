"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import { Pill } from "./Ui";

const discounts = [
  {
    label: "Students",
    discount: "40% OFF",
    price: "From ₦2,300/day",
    badgeClass: "bg-worknub-green text-white",
    textClass: "text-worknub-green",
  },
  {
    label: "Corp Members (NYSC)",
    discount: "25% OFF",
    price: "From ₦2,900/day",
    badgeClass: "bg-worknub-orange text-white",
    textClass: "text-worknub-orange",
  },
];

const tags = ["University Students", "Polytechnic", "NYSC Members", "OND/HND"];

export default function OfferSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-[100px] px-4 sm:px-[5vw] bg-white">
      <div className="max-w-[1280px] mx-auto bg-worknub-dark rounded-[20px] sm:rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Orange accent blob */}
        <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-worknub-orange/[0.07] rounded-br-full pointer-events-none" />

        {/* LEFT — copy + discount rows */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="px-4 py-6 sm:px-10 sm:py-10 md:p-[60px_50px] relative"
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
            {discounts.map(({ label, discount, price, badgeClass, textClass }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="relative flex-1 pt-4"
              >
                {/* Badge — floats half above top-right corner */}
                <div className={`absolute top-0 right-0 ${badgeClass} z-10 text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-full shadow-md -translate-y-1/8`}>
                  {discount}
                </div>
                {/* Card */}
                <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.10] rounded-xl py-4 px-4 sm:px-5 h-full">
                  <p className="text-white font-bold text-sm mb-1">{label}</p>
                  <p className={`${textClass} text-base font-black tracking-[-0.01em]`}>{price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/offer"
            className="bg-worknub-orange text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-[13px] sm:text-sm no-underline inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            Claim Discount <FiArrowRight size={14} />
          </Link>
        </motion.div>

        {/* RIGHT — package info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="px-4 py-6 sm:px-10 sm:py-10 md:p-[60px_50px] bg-worknub-green/[0.07] flex flex-col justify-center items-center text-center border-t border-white/[0.06] lg:border-t-0 lg:border-l"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 sm:w-20 h-16 sm:h-20 bg-worknub-green rounded-[16px] sm:rounded-[20px] flex items-center justify-center mb-4 sm:mb-5"
            style={{ boxShadow: '0 8px 24px rgba(71,195,65,0.35)' }}
          >
            <FiBriefcase size={36} className="text-white" />
          </motion.div>
          <h3 className="text-white text-[1.3rem] font-extrabold mb-2">
            Student &amp; Corper Package
          </h3>
          <p className="text-gray-400 text-[13.5px] mb-5 leading-[1.6]">
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
                className="bg-worknub-green/[0.15] text-worknub-green text-[11px] font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
