"use client";
import { motion } from "framer-motion";
import { FiUsers, FiClock, FiZap, FiAward } from "react-icons/fi";
import { stats } from "./HeroData";

const icons = [FiUsers, FiClock, FiZap, FiAward];

export default function StatsBar() {
    return (
        <section className="bg-worknub-green">
            <div className="max-w-[1280px] mx-auto px-[5vw] py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map(({ value, label }, i) => {
                    const Icon = icons[i];
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center text-white"
                        >
                            <Icon size={18} className="opacity-70 mb-1 sm:mb-1.5" />
                            <div className="text-[1.5rem] sm:text-[2rem] font-extrabold tracking-[-0.03em]">{value}</div>
                            <div className="text-[11px] sm:text-[13px] opacity-75 mt-0.5">{label}</div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}