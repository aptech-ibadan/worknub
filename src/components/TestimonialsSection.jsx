"use client";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { SectionLabel } from "./Ui";
import { testimonials } from "./HeroData.js";

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 lg:py-[100px] px-[5vw]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <SectionLabel>Member Stories</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-gray-900 tracking-[-0.02em]">
            Trusted by Ibadan's Best Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] p-6 sm:p-7 border border-gray-200"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating).fill(0).map((_, si) => (
                  <FiStar key={si} size={14} className="text-worknub-orange fill-worknub-orange" />
                ))}
              </div>
              <p className="text-gray-700 text-[14.5px] leading-[1.75] mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-worknub-green rounded-full flex items-center justify-center text-white font-bold text-[13px]">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}