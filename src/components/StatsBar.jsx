"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiUsers, FiClock, FiZap, FiAward } from "react-icons/fi";
import { stats } from "./HeroData";

const icons = [FiUsers, FiClock, FiZap, FiAward];

/*
  Parse "120+", "24/7", "100%", "5.0★"
  → { prefix, number, suffix, isFloat }
  Non-numeric values (e.g. "24/7") return number: null → rendered as-is.
*/
function parseStat(value) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
  if (!match) return { prefix: "", number: null, suffix: value, isFloat: false };
  return {
    prefix: match[1] || "",
    number: parseFloat(match[2]),
    suffix: match[3] || "",
    isFloat: match[2].includes("."),
  };
}

function easeOut(t) {
  return 1 - (1 - t) * (1 - t);
}

function CountUp({ value, duration = 1600, delay = 0, started }) {
  const { prefix, number, suffix, isFloat } = parseStat(value);
  const [display, setDisplay] = useState(isFloat ? "0.0" : "0");
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!started || number === null) return;

    const timeout = setTimeout(() => {
      startRef.current = null;

      const step = (timestamp) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const current = easeOut(progress) * number;

        setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toString());

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(isFloat ? number.toFixed(1) : number.toString());
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, number, duration, delay, isFloat]);

  if (number === null) return <>{value}</>;

  return <>{prefix}{display}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="bg-worknub-green" ref={ref}>
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
              <div className="text-[1.5rem] sm:text-[2rem] font-extrabold tracking-[-0.03em]">
                <CountUp
                  value={value}
                  duration={1600}
                  delay={i * 150}
                  started={inView}
                />
              </div>
              <div className="text-[11px] sm:text-[13px] opacity-75 mt-0.5">{label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}