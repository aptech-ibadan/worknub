"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiArrowRight, FiAward, FiCalendar, FiCheck,
  FiGift, FiPercent, FiUsers, FiShield, FiZap,
  FiStar, FiBriefcase, FiHome
} from 'react-icons/fi';
import Image from 'next/image';

const benefits = [
  {
    icon: FiPercent,
    title: "Exclusive Member Rates",
    desc: "Save up to 40% on co-working spaces compared to standard pricing — every single visit.",
    accent: "text-worknub-green",
    bg: "bg-worknub-green/[0.08]",
    border: "border-worknub-green/20",
  },
  {
    icon: FiGift,
    title: "Special Discounts",
    desc: "Discounted rates on event hall, meeting rooms, lounge, and content space throughout the year.",
    accent: "text-worknub-orange",
    bg: "bg-worknub-orange/[0.08]",
    border: "border-worknub-orange/20",
  },
  {
    icon: FiCalendar,
    title: "Free Events Access",
    desc: "Complimentary access to Worknub-hosted events, workshops, and networking sessions.",
    accent: "text-worknub-teal",
    bg: "bg-worknub-teal/[0.08]",
    border: "border-worknub-teal/20",
  },
  {
    icon: FiUsers,
    title: "Community Benefits",
    desc: "Enhanced collaboration and professional growth opportunities within a curated community.",
    accent: "text-[#7c3aed]",
    bg: "bg-[#7c3aed]/[0.08]",
    border: "border-[#7c3aed]/20",
  },
  {
    icon: FiAward,
    title: "Priority Support",
    desc: "Get priority access and dedicated support from our team — skip the queue, always.",
    accent: "text-worknub-green",
    bg: "bg-worknub-green/[0.08]",
    border: "border-worknub-green/20",
  },
  {
    icon: FiShield,
    title: "Member-Only Perks",
    desc: "Exclusive branded merchandise — T-shirt, face cap — and priority desk reservation.",
    accent: "text-worknub-orange",
    bg: "bg-worknub-orange/[0.08]",
    border: "border-worknub-orange/20",
  },
];

const tiers = [
  { name: "Shared Space",    price: "20,000", icon: FiUsers,     popular: false },
  { name: "Private Desk",    price: "30,000", icon: FiBriefcase, popular: true  },
  { name: "Private Office",  price: "40,000", icon: FiHome,      popular: false },
  { name: "Corporate Suite (PRIME)", price: "80,000", icon: FiStar,      popular: false },
  { name: "Corporate Suite (MOMENTUM)", price: "120,000", icon: FiStar, 
         popular: false },
  { name: "Corporate Suite (ELITE)", price: "200,000", icon: FiStar, 
         popular: false },

];

const eligibility = [
  "Subscribe to at least one month of any Worknub service",
  "Pay the applicable annual membership fee",
  "OR refer a client who books at least a one-month package",
];

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export default function Membership() {
  // Fix body scroll on mobile - prevent any overflow issues
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'relative';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-white overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2D2D2D 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Green + orange blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 65%)', transform: 'translate(20%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,124,0,0.06) 0%, transparent 65%)', transform: 'translate(-20%,30%)' }} />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2.5 mb-3 sm:mb-5">
                <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Loyalty Program</span>
              </div>
              <h1 className="text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.05] mb-3 sm:mb-5">
                Membership That<br />
                <span className="text-worknub-green">Gives You More</span>
              </h1>
              <p className="text-gray-500 text-[0.95rem] sm:text-lg leading-[1.75] max-w-md mb-8 sm:mb-10">
                Join Worknub's paid loyalty program and unlock exclusive benefits, priority access, and massive savings — one fee, twelve months of value.
              </p>

              {/* Mini benefit chips */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10">
                {["Up to 40% off", "Free event access", "Priority support", "Member merch", "Community perks"].map(chip => (
                  <span key={chip} className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-worknub-dark bg-worknub-mint border border-worknub-green/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <FiCheck size={11} className="text-worknub-green" strokeWidth={3} />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-worknub-green text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-[13px] sm:text-sm hover:bg-[#43a047] transition-all hover:scale-105"
                  style={{ boxShadow: '0 8px 28px rgba(76,175,80,0.35)' }}>
                  Become a Member <FiArrowRight size={15} />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 border border-worknub-dark/20 text-worknub-dark px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-[13px] sm:text-sm hover:bg-gray-50 transition-all hover:scale-105">
                  View Pricing
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — member card visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              {/* Membership card */}
              <div className="relative bg-worknub-dark rounded-3xl p-8 overflow-hidden"
                style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}>
                {/* Card glows */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.2) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(245,124,0,0.15) 0%, transparent 70%)', transform: 'translate(-20%,30%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-worknub-green/40 to-transparent" />

                {/* Card header */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="flex items-center gap-2.5">
                    <Image src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png" alt="Logo" width={150} height={100} />
                  
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-worknub-green bg-worknub-green/10 border border-worknub-green/25 px-3 py-1.5 rounded-full">
                    Member
                  </span>
                </div>

                {/* Savings highlight */}
                <div className="mb-8 relative">
                  <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">Annual savings up to</p>
                  <p className="text-white text-5xl font-black tracking-[-0.04em]"
                    style={{ textShadow: '0 0 40px rgba(76,175,80,0.3)' }}>40%
                    <span className="text-worknub-green text-2xl ml-1">OFF</span>
                  </p>
                </div>

                {/* Tier mini-list */}
                <div className="space-y-2.5 relative">
                  {tiers.map((tier) => (
                    <div key={tier.name} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${tier.popular ? 'bg-worknub-green/15 border border-worknub-green/25' : 'bg-white/5'}`}>
                      <span className={`text-[13px] font-semibold ${tier.popular ? 'text-white' : 'text-white/60'}`}>{tier.name}</span>
                      <span className={`font-black text-[14px] ${tier.popular ? 'text-worknub-green' : 'text-white/50'}`}>₦{tier.price}/yr</span>
                    </div>
                  ))}
                </div>

                {/* Valid period */}
                <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/8 relative">
                  <FiCalendar size={13} className="text-white/30" />
                  <span className="text-white/35 text-[12px]">Valid for 12 months from activation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-gray-50/60">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Member Benefits</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">
              What the Membership Offers
            </h2>
            <p className="text-gray-500 text-[15px]">One-time annual fee. Twelve months of exclusive value.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl border ${b.border} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 ${b.bg} border ${b.border} rounded-xl flex items-center justify-center mb-4`}>
                  <b.icon size={22} className={b.accent} />
                </div>
                <h3 className="font-extrabold text-worknub-dark text-[15px] tracking-[-0.01em] mb-2">{b.title}</h3>
                <p className="text-gray-500 text-[13px] leading-[1.7]">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP FEES ── */}
      <section className="py-24 bg-[#0c1a12] relative overflow-hidden">
        {/* Background texture */}
        {/* <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-worknub-green/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(76,175,80,0.05) 0%, transparent 60%)' }} /> */}
        

         <div className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781104980/green_gamums.png)",
            backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
          }}
        />  
            <div className="absolute inset-0 bg-[#0c1a12]/80 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Annual Fees</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-white tracking-[-0.02em] mb-2">
              Membership Fees
            </h2>
            <p className="text-white/50 text-[15px]">Annual membership — renewed once every year.</p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"> */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] ${
                  tier.popular
                    ? 'border-worknub-green bg-worknub-green/12'
                    : 'border-white/8 bg-white/4'
                }`}
              >
                {tier.popular && (
                  <div className="bg-worknub-green text-white text-[10px] font-black tracking-[0.08em] uppercase text-center py-1.5">
                    Most Popular
                  </div>
                )}
                <div className="p-7 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${tier.popular ? 'bg-worknub-green' : 'bg-white/8'}`}
                    style={tier.popular ? { boxShadow: '0 6px 20px rgba(76,175,80,0.4)' } : {}}>
                    <tier.icon size={22} className={tier.popular ? 'text-white' : 'text-white/60'} />
                  </div>
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-1">{tier.name}</p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-white/40 text-base">₦</span>
                    <span className={`text-3xl font-black tracking-[-0.03em] ${tier.popular ? 'text-worknub-green' : 'text-white'}`}>
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-white/30 text-[11px]">per year</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Included in all tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 bg-white/4 border border-white/8 rounded-2xl px-4 py-6"
          >
            <p className="text-white/40 text-[11px] font-black uppercase tracking-widest mb-4">Included in all tiers</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {["Member-only rates", "Free event access", "Priority support", "Branded merchandise", "Community access", "12-month validity"].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-white/60 text-[13px]">
                  <span className="w-4 h-4 rounded-full bg-worknub-green/20 flex items-center justify-center shrink-0">
                    <FiCheck size={9} className="text-worknub-green" strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
           
          <div className='flex mt-6 justify-center'>       
            <Link href="/contact"
              className="flex w-48 text-nowrap items-center justify-center gap-2 bg-worknub-green text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-[#43a047] transition-all hover:scale-105"
              style={{ boxShadow: '0 8px 28px rgba(76,175,80,0.4)' }}>
              Get Started <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Eligibility */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Eligibility</span>
              </div>
              <h2 className="text-[clamp(1.6rem,2.5vw,2rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-6">
                Who Can Join?
              </h2>
              <div className="space-y-3">
                {eligibility.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-worknub-mint border border-worknub-green/20 rounded-xl px-5 py-4 hover:shadow-md transition-shadow">
                    <span className="w-6 h-6 bg-worknub-green rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ boxShadow: '0 3px 10px rgba(76,175,80,0.35)' }}>
                      <FiCheck size={11} className="text-white" strokeWidth={3} />
                    </span>
                    <p className="text-gray-600 text-[14px] leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 bg-worknub-orange/6 border border-worknub-orange/20 rounded-xl px-5 py-4">
                <FiZap size={18} className="text-worknub-orange shrink-0 mt-0.5" />
                <p className="text-gray-600 text-[13.5px] leading-[1.65]">
                  <span className="font-bold text-worknub-dark">Refer & Earn:</span> Refer a client who books a one-month package and get your membership for free.
                </p>
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative bg-[#0c1a12] rounded-3xl p-8 sm:p-10 overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
            >
              {/* Glows */}
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-worknub-green/30 to-transparent" />

              <div className="relative">
                <div className="w-14 h-14 bg-worknub-green rounded-2xl flex items-center justify-center mb-6"
                  style={{ boxShadow: '0 6px 24px rgba(76,175,80,0.45)' }}>
                  <FiAward size={26} className="text-white" />
                </div>

                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                  <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Join Today</span>
                </div>

                <h3 className="text-white text-[1.6rem] font-extrabold tracking-[-0.02em] leading-tight mb-3">
                  Ready to Become a Member?
                </h3>
                <p className="text-white/50 text-[14px] leading-[1.7] mb-8">
                  Join the Worknub community today. One annual fee unlocks a full year of savings, perks, and priority access.
                </p>

                <div className="space-y-3 mb-8">
                  {["Starting from ₦20,000/year", "Immediate activation", "Cancel and renew anytime"].map(item => (
                    <div key={item} className="flex items-center gap-3 text-white/60 text-[13px]">
                      <span className="w-4 h-4 rounded-full bg-worknub-green/20 flex items-center justify-center shrink-0">
                        <FiCheck size={9} className="text-worknub-green" strokeWidth={3} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <Link href="/contact"
                  className="flex items-center justify-center gap-2 bg-worknub-green text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-[#43a047] transition-all hover:scale-105"
                  style={{ boxShadow: '0 8px 28px rgba(76,175,80,0.4)' }}>
                  Get Started <FiArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}