"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  FiArrowRight, FiUsers, FiStar, FiCheck,
  FiMapPin, FiCreditCard, FiZap,
  FiShield, FiWifi, FiCoffee, FiClock
} from 'react-icons/fi';

const studentRates = [
  { label: "Daily",                   value: "₦2,300",  highlight: true },
  { label: "Flexi Weekly (3 days)",   value: "₦6,900",  highlight: false },
  { label: "Weekly",                  value: "₦11,500", highlight: false },
  { label: "Flexi Monthly (12 days)", value: "₦27,600", highlight: false },
  { label: "Monthly",                 value: "₦46,000", highlight: false },
];

const corperRates = [
  { label: "Daily",                   value: "₦2,900",  highlight: true },
  { label: "Flexi Weekly (3 days)",   value: "₦8,700",  highlight: false },
  { label: "Weekly",                  value: "₦14,500", highlight: false },
  { label: "Flexi Monthly (12 days)", value: "₦34,800", highlight: false },
  { label: "Monthly",                 value: "₦58,000", highlight: false },
];

const corporateSuites = [
  {
    name: "Prime", tagline: "Startups & small teams", membership: "80,000",
    teamSize: "4 – 6 people", popular: false,
    memberPrice: "506,000", standardPrice: "759,000",
    accentText: "text-[#47C341]", accentBg: "bg-[#0c1a12]/[0.07]", accentBorder: "border-[#47C341]/30",
    badgeColor: "bg-[#0c1a12]", stripColor: "bg-[#0c1a12]", shadowColor: "rgba(12,26,18,0.3)",
    includes: [{ label: "Private Office", qty: "×1" }, { label: "Private Desk", qty: "×1" }, { label: "Hot Desk", qty: "×2" }],
  },
  {
    name: "Momentum", tagline: "Growing teams", membership: "120,000",
    teamSize: "7 – 9 people", popular: true,
    memberPrice: "818,000", standardPrice: "1,226,000",
    accentText: "text-worknub-green", accentBg: "bg-worknub-green/[0.07]", accentBorder: "border-worknub-green/20",
    badgeColor: "bg-worknub-green", stripColor: "bg-worknub-green", shadowColor: "rgba(71,195,65,0.3)",
    includes: [{ label: "Private Office", qty: "×1" }, { label: "Private Desk", qty: "×3" }, { label: "Hot Desk", qty: "×3" }],
  },
  {
    name: "Elite", tagline: "Top tier organisations", membership: "160,000",
    teamSize: "10 – 14 people", popular: false,
    memberPrice: "1,248,000", standardPrice: "1,872,000",
    accentText: "text-worknub-orange", accentBg: "bg-worknub-orange/[0.07]", accentBorder: "border-worknub-orange/20",
    badgeColor: "bg-worknub-orange", stripColor: "bg-worknub-orange", shadowColor: "rgba(245,124,0,0.25)",
    includes: [{ label: "Private Office", qty: "×2" }, { label: "Private Desk", qty: "×4" }, { label: "Hot Desk", qty: "×4" }],
  },
];

const perks = [
  { icon: FiWifi,    text: "1 Gbps Fibre WiFi" },
  { icon: FiCoffee,  text: "Unlimited Coffee" },
  { icon: FiShield,  text: "24/7 CCTV Security" },
  { icon: FiClock,   text: "Flexible Hours" },
];

const steps = [
  { number: "01", icon: FiMapPin,     title: "Walk In",      desc: "Visit us at Agodi GRA, Ibadan. No appointment needed." },
  { number: "02", icon: FiCreditCard, title: "Show Your ID", desc: "Present a valid Student ID or NYSC call-up letter." },
  { number: "03", icon: FiZap,        title: "Get to Work",  desc: "You're seated and productive in under 5 minutes." },
];

function RateCard({ icon: Icon, badge, badgeColor, iconBg, accentText, borderAccent, title, tagline, rates, note, savings, delay, shadowColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-3xl overflow-hidden flex flex-col border-2 ${borderAccent} shadow-sm hover:shadow-2xl transition-all duration-500`}
    >
      <div className={`absolute -top-12 -right-12 w-40 h-40 ${iconBg} rounded-full opacity-40 pointer-events-none`} />
      <div className={`${iconBg} px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-7 relative`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className={`inline-block text-[11px] font-black tracking-[0.1em] uppercase px-3 py-1.5 rounded-full text-white mb-3 sm:mb-4 ${badgeColor}`}>
              {badge}
            </span>
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 ${badgeColor} rounded-xl flex items-center justify-center shadow-lg shrink-0`}
                style={{ boxShadow: `0 6px 20px ${shadowColor}` }}>
                <Icon size={18} className="text-white" />
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-worknub-dark tracking-[-0.02em] leading-tight">{title}</h2>
            </div>
            <p className="text-gray-500 text-[12px] sm:text-[13px] ml-11 sm:ml-14">{tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Save up to</p>
            <p className={`text-3xl sm:text-4xl font-black tracking-[-0.04em] leading-none ${accentText}`}>{savings}</p>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-8 py-5 sm:py-6 flex-1">
        <div className="space-y-2">
          {rates.map(({ label, value, highlight }) => (
            <div key={label}
              className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-colors ${
                highlight ? `${iconBg} border-2 ${borderAccent}` : 'bg-gray-50 border border-transparent'
              }`}
            >
              <span className={`text-[12.5px] sm:text-[13.5px] font-semibold ${highlight ? accentText : 'text-gray-600'}`}>{label}</span>
              <span className={`font-black text-[14px] sm:text-[16px] tracking-[-0.01em] ${highlight ? accentText : 'text-worknub-dark'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 pb-6 sm:pb-8">
        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4 sm:mb-5">
          <FiCheck size={13} className={accentText} strokeWidth={3} />
          <p className="text-gray-500 text-[12px] sm:text-[12.5px]">{note}</p>
        </div>
        <Link href="/contact"
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-sm text-white tracking-[0.01em] transition-all duration-200 hover:gap-3 whitespace-nowrap ${badgeColor} ${
            badgeColor.includes('green') ? 'hover:bg-[#43a047]' : 'hover:bg-[#ef6c00]'
          }`}
          style={{ boxShadow: `0 8px 24px ${shadowColor}` }}
        >
          Claim This Rate <FiArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

const navItems = [
  { id: 'student-corp-rates', label: 'Student & Corp', short: 'Student / Corp' },
  { id: 'corporate-suites',   label: 'Corporate',      short: 'Corporate' },
];

export default function Offer() {
  const [activeSection, setActiveSection] = useState('student-corp-rates');

  useEffect(() => {
    function onScroll() {
      const sections = navItems.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: el.getBoundingClientRect().top };
      });
      const windowH = window.innerHeight;
      const visible = sections.filter(s => s.top < windowH * 0.6);
      if (visible.length === 0) return;
      const active = visible.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
      setActiveSection(active.id);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-worknub-mint flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781088299/Untitled-1_tuqrgv.png)",
            backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-worknub-mint/70 pointer-events-none" />
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(240,249,240,0.5) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent z-[2]" />

        <div className="container-custom relative z-[3] pt-16 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
                <span className="w-7 h-0.5 bg-worknub-green inline-block rounded-sm" />
                <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Limited Time Offer</span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.05] mb-4 sm:mb-6">
                Work Smarter.<br />
                <span className="text-worknub-green">Pay Less.</span>
              </h1>
              <p className="text-gray-500 text-[0.95rem] sm:text-lg leading-[1.8] max-w-md mb-7 sm:mb-10">
                Students save <span className="text-worknub-green font-bold">40%</span>. Corp members save <span className="text-worknub-orange font-bold">25%</span>. Premium workspace, discounted — just show your ID.
              </p>

              {/* Perks grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-7 sm:mb-10">
                {perks.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 bg-white border border-worknub-green/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm">
                    <Icon size={14} className="text-worknub-green shrink-0" />
                    <span className="text-gray-600 text-[12px] sm:text-[13px] font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 bg-worknub-green text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-sm hover:bg-[#43a047] transition-colors whitespace-nowrap"
                  style={{ boxShadow: '0 8px 32px rgba(76,175,80,0.35)' }}>
                  See All Rates <FiArrowRight size={15} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 border border-worknub-dark/20 text-worknub-dark px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm hover:bg-white transition-colors whitespace-nowrap">
                  Book a Tour
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — discount cards (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {/* Student card */}
              <div className="relative bg-white border border-worknub-green/20 rounded-3xl p-7 mb-4 shadow-xl"
                style={{ boxShadow: '0 20px 60px rgba(76,175,80,0.12)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-worknub-green rounded-xl flex items-center justify-center"
                      style={{ boxShadow: '0 6px 20px rgba(76,175,80,0.4)' }}>
                      <FiUsers size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase tracking-widest">Student Package</p>
                      <p className="text-worknub-dark font-extrabold text-base tracking-[-0.01em]">University / Polytechnic</p>
                    </div>
                  </div>
                  <div className="bg-worknub-green text-white text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap">40% OFF</div>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-gray-400 text-lg">₦</span>
                  <span className="text-worknub-dark text-5xl font-black tracking-[-0.04em]">2,300</span>
                  <span className="text-gray-400 text-sm">/day</span>
                </div>
                <p className="text-worknub-green text-[12px] font-semibold">Was ₦3,800/day → Save ₦1,500</p>
              </div>

              {/* Corp card */}
              <div className="relative bg-white border border-worknub-orange/20 rounded-3xl p-7 shadow-xl"
                style={{ boxShadow: '0 20px 60px rgba(245,124,0,0.10)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-worknub-orange rounded-xl flex items-center justify-center"
                      style={{ boxShadow: '0 6px 20px rgba(245,124,0,0.4)' }}>
                      <FiStar size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase tracking-widest">Corp Member Package</p>
                      <p className="text-worknub-dark font-extrabold text-base tracking-[-0.01em]">NYSC Members</p>
                    </div>
                  </div>
                  <div className="bg-worknub-orange text-white text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap">25% OFF</div>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-gray-400 text-lg">₦</span>
                  <span className="text-worknub-dark text-5xl font-black tracking-[-0.04em]">2,900</span>
                  <span className="text-gray-400 text-sm">/day</span>
                </div>
                <p className="text-worknub-orange text-[12px] font-semibold">Was ₦3,800/day → Save ₦900</p>
              </div>

              {/* Stat badges */}
              <div className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-2xl px-5 py-3.5">
                <p className="text-worknub-dark text-xl font-black tracking-[-0.02em]">120+</p>
                <p className="text-gray-400 text-[11px] font-medium mt-0.5">Active members</p>
              </div>
              <div className="absolute -right-10 top-20 bg-white border border-gray-200 shadow-lg rounded-2xl px-5 py-3.5">
                <p className="text-worknub-dark text-xl font-black tracking-[-0.02em]">5.0★</p>
                <p className="text-gray-400 text-[11px] font-medium mt-0.5">Member rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE OFFER NAV ── */}
      <div className="lg:hidden sticky top-[56px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 py-2">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button key={id} onClick={() => scrollTo(id)}
                  className={`flex-1 text-center py-2.5 px-2 rounded-lg text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive ? 'bg-worknub-green text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RATE CARDS ── */}
      <section id="student-corp-rates" className="py-14 sm:py-20 lg:py-24 bg-gray-50/60">
        <div className="container-custom">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Discounted Rates</span>
            </div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">Choose Your Package</h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px]">All packages include WiFi, coffee, printing, and 24/7 power.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            <RateCard icon={FiUsers} badge="40% OFF — Students" badgeColor="bg-worknub-green"
              iconBg="bg-worknub-green/[0.07]" accentText="text-worknub-green" borderAccent="border-worknub-green/20"
              title="Student Package" tagline="University, Polytechnic, College"
              rates={studentRates} note="Valid Student ID required at check-in"
              savings="40%" delay={0} shadowColor="rgba(76,175,80,0.3)" />
            <RateCard icon={FiStar} badge="25% OFF — Corp Members" badgeColor="bg-worknub-orange"
              iconBg="bg-worknub-orange/[0.07]" accentText="text-worknub-orange" borderAccent="border-worknub-orange/20"
              title="Corp Member Package" tagline="NYSC members serving in Oyo State"
              rates={corperRates} note="Valid NYSC call-up letter or ID required"
              savings="25%" delay={0.1} shadowColor="rgba(245,124,0,0.3)" />
          </div>
        </div>
      </section>

      {/* ── GROUP RATES ── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Group Rates</span>
            </div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">Bring Your Study Group</h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px]">The more you bring, the less each person pays.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {[
              { size: "Group of 3", daily: "₦6,300",  weekly: "₦31,500", monthly: "₦126,000", per: "₦2,100/person/day" },
              { size: "Group of 5", daily: "₦10,500", weekly: "₦52,500", monthly: "₦210,000", per: "₦2,100/person/day" },
            ].map((g, i) => (
              <motion.div key={g.size}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border-2 border-worknub-teal/20 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-1 bg-worknub-teal w-full" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-7">
                    <h3 className="text-xl font-extrabold text-worknub-dark">{g.size}</h3>
                    <span className="text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-full bg-worknub-teal/10 text-worknub-teal border border-worknub-teal/20 whitespace-nowrap">{g.per}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { label: "Daily",   value: g.daily,   featured: true },
                      { label: "Weekly",  value: g.weekly,  featured: false },
                      { label: "Monthly", value: g.monthly, featured: false },
                    ].map(({ label, value, featured }) => (
                      <div key={label} className={`rounded-2xl p-3 sm:p-4 text-center border ${featured ? 'bg-worknub-teal/[0.07] border-worknub-teal/25' : 'bg-gray-50 border-gray-100'}`}>
                        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-1 sm:mb-1.5 ${featured ? 'text-worknub-teal' : 'text-gray-400'}`}>{label}</p>
                        <p className={`font-black text-[15px] sm:text-lg tracking-[-0.02em] ${featured ? 'text-worknub-teal' : 'text-worknub-dark'}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO CLAIM ── */}
      <section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781104980/green_gamums.png)",
            backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[#0c1a12]/80 pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">3 Simple Steps</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold text-white tracking-[-0.02em] mb-3">Claim Your Discount Today</h2>
            <p className="text-white/50 text-[14px] sm:text-[15px] max-w-md mx-auto">No forms. No waiting. Just show up with your ID.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 relative">
            <div className="hidden sm:block absolute top-11 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-worknub-green/15 via-worknub-green/50 to-worknub-green/15" />
            {steps.map(({ number, icon: Icon, title, desc }, i) => (
              <motion.div key={number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/[0.07] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-worknub-green/50 to-transparent" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-worknub-green rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 8px 32px rgba(76,175,80,0.35)' }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#0c1a12] border-2 border-worknub-green text-worknub-green text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <p className="text-white/20 text-[10px] sm:text-[11px] font-black tracking-[0.15em] uppercase mb-2">{number}</p>
                <h3 className="font-extrabold text-white text-[16px] sm:text-[18px] tracking-[-0.01em] mb-2 sm:mb-3">{title}</h3>
                <p className="text-white/50 text-[12.5px] sm:text-[13.5px] leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE SUITES ── */}
      <section id="corporate-suites" className="py-14 sm:py-20 lg:py-24 bg-gray-50/60">
        <div className="container-custom">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">For Organisations</span>
            </div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">
              Corporate Suites Package
            </h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-xl mb-5">
              Tailored workspace bundles for growing teams. One annual membership covers your entire team.
            </p>
            {/* 33% savings callout */}
            <div className="inline-flex items-center gap-3 bg-worknub-green/10 border border-worknub-green/25 rounded-2xl px-5 py-3.5">
              <span className="text-2xl font-black text-worknub-green tracking-tight">33% OFF</span>
              <span className="w-px h-6 bg-worknub-green/25 shrink-0" />
              <p className="text-[13px] text-worknub-dark font-semibold leading-snug">
                Members save <span className="text-worknub-green font-black">33%</span> on all Corporate Suite packages<br />
                <span className="text-gray-400 font-normal text-[12px]">Pay the annual membership fee once — save every month.</span>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {corporateSuites.map((pkg, i) => (
              <motion.div key={pkg.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl overflow-hidden flex flex-col border-2 ${pkg.accentBorder} ${pkg.popular ? 'shadow-xl' : 'shadow-sm'} hover:shadow-2xl transition-all duration-500`}
              >
                <div className={`h-1.5 w-full ${pkg.stripColor}`} />
                <div className={`absolute -top-10 -right-10 w-36 h-36 ${pkg.accentBg} rounded-full opacity-50 pointer-events-none`} />

                {/* Header */}
                <div className={`${pkg.accentBg} px-5 sm:px-7 pt-5 sm:pt-7 pb-5 sm:pb-6 relative`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className={`inline-block text-[11px] font-black tracking-[0.08em] uppercase px-3 py-1.5 rounded-full text-white mb-2 sm:mb-3 ${pkg.badgeColor}`}>
                        {pkg.name} Package
                      </span>
                      <h3 className="text-[17px] sm:text-xl font-extrabold text-worknub-dark tracking-[-0.02em] mb-0.5 leading-tight">{pkg.tagline}</h3>
                      <p className={`text-[12px] font-semibold ${pkg.accentText}`}>{pkg.teamSize}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Annual mem. fee</p>
                      <div className="flex items-baseline gap-0.5 justify-end">
                        <span className="text-gray-400 text-xs sm:text-sm">₦</span>
                        <span className={`text-xl sm:text-2xl font-black tracking-[-0.03em] ${pkg.accentText}`}>{pkg.membership}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-7 py-5 sm:py-6 flex-1 flex flex-col gap-5">

                  {/* Price comparison */}
                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    {/* Member row */}
                    <div className="flex items-center justify-between px-4 py-3 bg-worknub-green/[0.07] border-b border-worknub-green/15">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-worknub-green flex items-center justify-center shrink-0">
                          <FiCheck size={10} className="text-white" strokeWidth={3} />
                        </span>
                        <span className="text-[12px] font-bold text-worknub-dark">Member price</span>
                      </div>
                      <div>
                        <span className={`text-[17px] font-black tracking-tight ${pkg.accentText}`}>₦{pkg.memberPrice}</span>
                        <span className="text-gray-400 text-[11px] ml-1">/mo</span>
                      </div>
                    </div>
                    {/* Standard row */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <span className="text-[12px] font-medium text-gray-400">Standard price</span>
                      <div>
                        <span className="text-[15px] font-bold text-gray-400 line-through">₦{pkg.standardPrice}</span>
                        <span className="text-gray-400 text-[11px] ml-1">/mo</span>
                      </div>
                    </div>
                    {/* Savings row */}
                    <div className={`flex items-center justify-between px-4 py-2.5 ${pkg.accentBg}`}>
                      <span className="text-[11px] font-bold text-gray-500">You save monthly</span>
                      <span className={`text-[13px] font-black ${pkg.accentText}`}>
                        ₦{(parseInt(pkg.standardPrice.replace(/,/g, '')) - parseInt(pkg.memberPrice.replace(/,/g, ''))).toLocaleString()} · 33% OFF
                      </span>
                    </div>
                  </div>

                  {/* What's included */}
                  <div>
                    <p className="text-[10px] font-black tracking-[0.1em] uppercase text-gray-400 mb-3">What's included</p>
                    <div className="space-y-2">
                      {pkg.includes.map(({ label, qty }) => (
                        <div key={label} className={`flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-xl ${pkg.accentBg} border ${pkg.accentBorder}`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.badgeColor}`}>
                              <FiCheck size={10} className="text-white" strokeWidth={3} />
                            </span>
                            <span className={`text-[13px] sm:text-[13.5px] font-semibold ${pkg.accentText}`}>{label}</span>
                          </div>
                          <span className={`font-black text-[14px] sm:text-[15px] ${pkg.accentText}`}>{qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Perks note */}
                  <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 sm:px-4 py-3">
                    <FiCheck size={12} className={pkg.accentText} strokeWidth={3} />
                    <p className="text-gray-500 text-[11.5px] sm:text-[12px] leading-[1.6]">
                      Includes WiFi, coffee, printing, CCTV, 24/7 access & business address for all team members.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 sm:px-7 pb-5 sm:pb-7">
                  <Link href="/contact"
                    className={`flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-xl font-black text-sm text-white tracking-[0.01em] transition-all duration-200 hover:gap-3 whitespace-nowrap ${pkg.badgeColor} ${
                      pkg.badgeColor === 'bg-[#0c1a12]' ? 'hover:bg-[#1a3322]'
                      : pkg.badgeColor.includes('green') ? 'hover:bg-[#3aad35]'
                      : pkg.badgeColor.includes('orange') ? 'hover:bg-[#ef6c00]'
                      : 'hover:opacity-90'
                    }`}
                    style={{ boxShadow: `0 8px 24px ${pkg.shadowColor}` }}
                  >
                    Get This Package <FiArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-[13px] mt-6 sm:mt-8">
            Corporate packages are annual memberships. Need a custom size?{' '}
            <Link href="/contact" className="text-worknub-green font-semibold hover:underline">Talk to us →</Link>
          </p>
        </div>
      </section>

      {/* ── SIDE NAV — desktop only ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {navItems.map(({ id, short }) => {
          const isActive = activeSection === id;
          return (
            <button key={id} onClick={() => scrollTo(id)} className="group flex items-center gap-3 justify-end">
              <span className={`text-[11px] font-bold tracking-[0.06em] uppercase whitespace-nowrap px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-worknub-green text-white shadow-md shadow-worknub-green/30'
                  : 'bg-white/90 text-gray-500 shadow-sm border border-gray-200 hover:border-worknub-green/40 hover:text-worknub-green'
              }`}>{short}</span>
              <span className={`shrink-0 rounded-full transition-all duration-300 ${
                isActive ? 'w-3 h-3 bg-worknub-green shadow-[0_0_8px_rgba(71,195,65,0.6)]' : 'w-2 h-2 bg-gray-300 group-hover:bg-worknub-green/50'
              }`} />
            </button>
          );
        })}
      </div>

      {/* ── CTA BAND ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-[#0c1a12] rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 md:px-16 py-10 sm:py-14 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)', transform: 'translate(20%,-40%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-10">
              <div className="max-w-lg">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                  <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Your Desk Is Waiting</span>
                </div>
                <h2 className="text-white text-[clamp(1.4rem,2.5vw,2.2rem)] font-extrabold tracking-[-0.02em] leading-tight mb-3">
                  Start working in a world-class environment — at student prices.
                </h2>
                <p className="text-white/50 text-[13px] sm:text-[14px] leading-[1.7]">Walk in today. No paperwork. No setup fees. Just bring your ID.</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-worknub-green text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-sm hover:bg-[#43a047] transition-colors whitespace-nowrap"
                  style={{ boxShadow: '0 8px 28px rgba(76,175,80,0.4)' }}>
                  Get in Touch <FiArrowRight size={15} />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm hover:bg-white/[0.05] transition-colors whitespace-nowrap">
                  View Full Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}