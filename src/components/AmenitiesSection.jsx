"use client";
import { motion } from "framer-motion";
import { FiWifi, FiZap, FiCoffee, FiPrinter, FiLock, FiUsers } from "react-icons/fi";
import { SectionLabel } from "./Ui";
import { amenities } from "./HeroData";

const icons = [FiWifi, FiZap, FiCoffee, FiPrinter, FiLock, FiUsers];

export default function AmenitiesSection() {
  return (
    <section className="bg-worknub-dark py-16 sm:py-24 lg:py-[100px] px-[5vw]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <SectionLabel>Facilities &amp; Amenities</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-white tracking-[-0.02em]">
            Everything You Need, Nothing You Don't
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-7 transition-colors duration-200 hover:border-worknub-green/40"
              >
                <div className="w-11 h-11 bg-worknub-green/[0.13] rounded-[10px] flex items-center justify-center mb-3.5">
                  <Icon size={20} className="text-worknub-green" />
                </div>
                <h3 className="text-white font-bold text-[15px] mb-1.5">{title}</h3>
                <p className="text-gray-400 text-[13.5px] leading-[1.6]">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}