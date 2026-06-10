"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
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

const perks = [
  { icon: FiWifi,    text: "Super fast internet." },
  { icon: FiCoffee,  text: "Refreshment lounge" },
  { icon: FiShield,  text: "24/7 CCTV Security" },
  { icon: FiClock,   text: "Flexible Hours" },
];

const steps = [
  { number: "01", icon: FiMapPin,     title: "Walk In",      desc: "Visit us at Agodi GRA, Ibadan. No appointment needed." },
  { number: "02", icon: FiCreditCard, title: "Show Your ID", desc: "Present a valid Student ID or NYSC call-up letter." },
  { number: "03", icon: FiZap,        title: "Get to Work",  desc: "You're seated and productive in under 5 minutes." },
];

function StatBadge({ value, label, className }) {
  return (
    <div className={`bg-white/[0.08] border border-white/[0.12] rounded-2xl px-5 py-3.5 ${className}`}>
      <p className="text-white text-xl font-black tracking-[-0.02em]">{value}</p>
      <p className="text-white/50 text-[11px] font-medium mt-0.5">{label}</p>
    </div>
  );
}

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

      <div className={`${iconBg} px-4 pt-8 pb-7 relative`}>
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block text-[11px] font-black tracking-[0.1em] uppercase px-3 py-1.5 rounded-full text-white mb-4 ${badgeColor}`}>
              {badge}
            </span>
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-11 h-11 ${badgeColor} rounded-xl flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 6px 20px ${shadowColor}` }}>
                <Icon size={22} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-worknub-dark tracking-[-0.02em]">{title}</h2>
            </div>
            <p className="text-gray-500 text-[13px] ml-14">{tagline}</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Save up to</p>
            <p className={`text-4xl font-black tracking-[-0.04em] leading-none ${accentText}`}>{savings}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 flex-1">
        <div className="space-y-2">
          {rates.map(({ label, value, highlight }) => (
            <div
              key={label}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                highlight
                  ? `${iconBg} border-2 ${borderAccent}`
                  : 'bg-gray-50 border border-transparent'
              }`}
            >
              <span className={`text-[13.5px] font-semibold ${highlight ? accentText : 'text-gray-600'}`}>{label}</span>
              <span className={`font-black text-[16px] tracking-[-0.01em] ${highlight ? accentText : 'text-worknub-dark'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
          <FiCheck size={13} className={accentText} strokeWidth={3} />
          <p className="text-gray-500 text-[12.5px]">{note}</p>
        </div>
        <Link
          href="/contact"
          className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-sm text-white tracking-[0.01em] transition-all duration-200 hover:gap-3 ${badgeColor} ${
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

export default function Offer() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-worknub-mint flex flex-col justify-center overflow-hidden">

        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Concentric rings */}
          <div className="absolute rounded-full border border-worknub-green/[0.12]"
            style={{ width: 900, height: 900, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="absolute rounded-full border border-worknub-green/[0.09]"
            style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          {/* Green glow blob */}
          <div className="absolute rounded-full"
            style={{ width: 700, height: 700, top: '50%', left: '30%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(76,175,80,0.12) 0%, transparent 65%)' }} />
          {/* Orange glow blob */}
          <div className="absolute rounded-full"
            style={{ width: 500, height: 500, bottom: '-10%', right: '5%', background: 'radial-gradient(circle, rgba(245,124,0,0.09) 0%, transparent 70%)' }} />
          {/* Dot grid — dark dots on light bg */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(45,45,45,0.9) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          {/* Fade edges */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-worknub-mint to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-worknub-mint to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Label */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-7 h-0.5 bg-worknub-green inline-block rounded-sm" />
                <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Limited Time Offer</span>
              </div>

              <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.03] mb-6">
                Work Smarter.<br />
                <span className="text-worknub-green">Pay Less.</span>
              </h1>

              <p className="text-gray-500 text-lg leading-[1.8] max-w-md mb-10">
                Students save <span className="text-worknub-green font-bold">40%</span>. Corp members save <span className="text-worknub-orange font-bold">25%</span>. Premium workspace, discounted for you — just show your ID.
              </p>

              {/* Perks grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {perks.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 bg-white border border-worknub-green/20 rounded-xl px-4 py-3 shadow-sm">
                    <Icon size={15} className="text-worknub-green shrink-0" />
                    <span className="text-gray-600 text-[13px] font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 bg-worknub-green text-white px-4 py-4 rounded-xl font-black text-sm tracking-[0.01em] hover:bg-[#43a047] transition-colors"
                  style={{ boxShadow: '0 8px 32px rgba(76,175,80,0.35)' }}>
                  See All Rates <FiArrowRight size={15} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 border border-worknub-dark/20 text-worknub-dark px-4 py-4 rounded-xl font-bold text-sm hover:bg-white transition-colors">
                  Book a Tour
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — discount cards */}
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
                  <div className="bg-worknub-green text-white text-xs font-black px-3 py-1.5 rounded-full">40% OFF</div>
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
                  <div className="bg-worknub-orange text-white text-xs font-black px-3 py-1.5 rounded-full">25% OFF</div>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-gray-400 text-lg">₦</span>
                  <span className="text-worknub-dark text-5xl font-black tracking-[-0.04em]">2,900</span>
                  <span className="text-gray-400 text-sm">/day</span>
                </div>
                <p className="text-worknub-orange text-[12px] font-semibold">Was ₦3,800/day → Save ₦900</p>
              </div>

              {/* Stat badges — updated for light bg */}
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

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent" />
      </section>

      {/* ── RATE CARDS ── */}
      <section className="py-24 bg-gray-50/60">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Discounted Rates</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">Choose Your Package</h2>
            <p className="text-gray-500 text-[15px]">All packages include WiFi, coffee, printing, and 24/7 power.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <RateCard
              icon={FiUsers}
              badge="40% OFF — Students"
              badgeColor="bg-worknub-green"
              iconBg="bg-worknub-green/[0.07]"
              accentText="text-worknub-green"
              borderAccent="border-worknub-green/20"
              title="Student Package"
              tagline="University, Polytechnic, College"
              rates={studentRates}
              note="Valid Student ID required at check-in"
              savings="40%"
              delay={0}
              shadowColor="rgba(76,175,80,0.3)"
            />
            <RateCard
              icon={FiStar}
              badge="25% OFF — Corp Members"
              badgeColor="bg-worknub-orange"
              iconBg="bg-worknub-orange/[0.07]"
              accentText="text-worknub-orange"
              borderAccent="border-worknub-orange/20"
              title="Corp Member Package"
              tagline="NYSC members serving in Oyo State"
              rates={corperRates}
              note="Valid NYSC call-up letter or ID required"
              savings="25%"
              delay={0.1}
              shadowColor="rgba(245,124,0,0.3)"
            />
          </div>
        </div>
      </section>

      {/* ── GROUP RATES ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Group Rates</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-worknub-dark tracking-[-0.02em] mb-2">Bring Your Study Group</h2>
            <p className="text-gray-500 text-[15px]">The more you bring, the less each person pays.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { size: "Group of 3", daily: "₦6,300",  weekly: "₦31,500", monthly: "₦126,000", per: "₦2,100/person/day" },
              { size: "Group of 5", daily: "₦10,500", weekly: "₦52,500", monthly: "₦210,000", per: "₦2,100/person/day" },
            ].map((g, i) => (
              <motion.div
                key={g.size}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border-2 border-worknub-teal/20 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-1 bg-worknub-teal w-full" />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-7">
                    <h3 className="text-xl font-extrabold text-worknub-dark">{g.size}</h3>
                    <span className="text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-full bg-worknub-teal/10 text-worknub-teal border border-worknub-teal/20">{g.per}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Daily",   value: g.daily,   featured: true },
                      { label: "Weekly",  value: g.weekly,  featured: false },
                      { label: "Monthly", value: g.monthly, featured: false },
                    ].map(({ label, value, featured }) => (
                      <div key={label} className={`rounded-2xl p-4 text-center border ${featured ? 'bg-worknub-teal/[0.07] border-worknub-teal/25' : 'bg-gray-50 border-gray-100'}`}>
                        <p className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${featured ? 'text-worknub-teal' : 'text-gray-400'}`}>{label}</p>
                        <p className={`font-black text-lg tracking-[-0.02em] ${featured ? 'text-worknub-teal' : 'text-worknub-dark'}`}>{value}</p>
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
      <section className="py-24 bg-[#0c1a12] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-worknub-green/[0.08]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(76,175,80,0.05) 0%, transparent 60%)' }} />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">3 Simple Steps</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-white tracking-[-0.02em] mb-3">Claim Your Discount Today</h2>
            <p className="text-white/50 text-[15px] max-w-md mx-auto">No forms. No waiting. Just show up with your ID.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-11 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-worknub-green/15 via-worknub-green/50 to-worknub-green/15" />

            {steps.map(({ number, icon: Icon, title, desc }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 text-center hover:bg-white/[0.07] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-worknub-green/50 to-transparent" />
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-worknub-green/10" />
                  <div className="w-20 h-20 bg-worknub-green rounded-full flex items-center justify-center relative"
                    style={{ boxShadow: '0 8px 32px rgba(76,175,80,0.35)' }}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0c1a12] border-2 border-worknub-green text-worknub-green text-[10px] font-black rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <p className="text-white/20 text-[11px] font-black tracking-[0.15em] uppercase mb-2">{number}</p>
                <h3 className="font-extrabold text-white text-[18px] tracking-[-0.01em] mb-3">{title}</h3>
                <p className="text-white/50 text-[13.5px] leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-[#0c1a12] rounded-[32px] px-10 md:px-16 py-14 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)', transform: 'translate(20%,-40%)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,124,0,0.07) 0%, transparent 70%)', transform: 'translate(-20%,40%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-lg">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                  <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Your Desk Is Waiting</span>
                </div>
                <h2 className="text-white text-[clamp(1.6rem,2.5vw,2.2rem)] font-extrabold tracking-[-0.02em] leading-tight mb-3">
                  Start working in a world-class environment — at student prices.
                </h2>
                <p className="text-white/50 text-[14px] leading-[1.7]">Walk in today. No paperwork. No setup fees. Just bring your ID and we'll take care of the rest.</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-worknub-green text-white px-4 py-4 rounded-xl font-black text-sm tracking-[0.01em] hover:bg-[#43a047] transition-colors whitespace-nowrap"
                  style={{ boxShadow: '0 8px 28px rgba(76,175,80,0.4)' }}>
                  Get in Touch <FiArrowRight size={15} />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 px-4 py-4 rounded-xl font-bold text-sm hover:bg-white/[0.05] transition-colors whitespace-nowrap">
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
