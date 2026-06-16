"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiTrendingUp, FiGlobe, FiHeart, FiAward } from "react-icons/fi";
import { SectionLabel } from "./Ui";

const valueProps = [
  { icon: FiTrendingUp, label: "Scalable Plans",  colorClass: "text-worknub-green bg-worknub-green/10" },
  { icon: FiGlobe,      label: "Global Network",  colorClass: "text-worknub-orange bg-worknub-orange/10" },
  { icon: FiHeart,      label: "Community First", colorClass: "text-worknub-green bg-worknub-green/10" },
  { icon: FiAward,      label: "Rated 5 Stars",   colorClass: "text-worknub-orange bg-worknub-orange/10" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-[100px] px-8 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-center">

        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionLabel>About Worknub</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-gray-900 leading-[1.15] tracking-[-0.02em] mb-5">
            Ibadan's Most Productive<br />
            <span className="text-worknub-green">Work Environment</span>
          </h2>
          <p className="text-gray-600 leading-[1.8] mb-6 text-base">
            Worknub is a premium co-working hub nestled in Agodi GRA, Ibadan — designed to help freelancers, startups, and enterprises thrive. We've combined enterprise-grade infrastructure with a warm, community-first culture.
          </p>
          <p className="text-gray-600 leading-[1.8] mb-8 text-base">
            Whether you need a hot desk for the day or a private office for your growing team, Worknub adapts to you.
          </p>
          <div className="flex gap-3">
            <Link href="/spaces" className="bg-worknub-green text-white px-6 py-3 rounded-lg font-bold text-sm no-underline inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              View Spaces <FiArrowRight size={14} />
            </Link>
            <Link href="/contact" className="bg-transparent text-worknub-green px-6 py-3 rounded-lg font-bold text-sm no-underline inline-flex items-center gap-1.5 border border-worknub-green/25 hover:bg-worknub-green/5 transition-colors">
              Book Tour <FiCalendar size={14} />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {valueProps.map(({ icon: Icon, label, colorClass }, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-200 text-center">
                <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} />
                </div>
                <p className="font-bold text-sm text-gray-900">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}