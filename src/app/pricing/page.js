"use client";
import PricingCard from '../../components/PricingCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiHome, FiMonitor, FiCalendar, FiCheck, FiArrowRight, FiVideo } from 'react-icons/fi';
import Link from 'next/link';

// ─── DATA ────────────────────────────────────────────────────────────────────

const spaceCategories = [
  {
    id: "hot-desk",
    label: "Hot Desk",
    icon: FiUsers,
    description: "Flexible workspace in our shared area",
    bg: "bg-white",
    features: ["Flexible daily access", "Ergonomic chair", "High-speed WiFi", "Networking opportunities"],
    plans: {
      member: [
        { name: "Daily",   price: "3,800",   period: "day"   },
        { name: "Weekly",  price: "18,900",  period: "week"  },
        { name: "Monthly", price: "75,300",  period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "221,000" },
            { type: "6 months",  price: "443,000" },
            { type: "12 months", price: "888,000" },
          ],
        },
      ],
      nonMember: [
        { name: "Daily",   price: "5,700",   period: "day"   },
        { name: "Weekly",  price: "28,300",  period: "week"  },
        { name: "Monthly", price: "112,900", period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "338,700"   },
            { type: "6 months",  price: "677,300"   },
            { type: "12 months", price: "1,354,500" },
          ],
        },
      ],
    },
  },
  {
    id: "private-desk",
    label: "Private Desk",
    icon: FiBriefcase,
    description: "Your own dedicated workspace",
    bg: "bg-worknub-mint",
    features: ["Dedicated desk + storage", "High-speed WiFi", "Networking opportunities", "Priority support"],
    plans: {
      member: [
        { name: "Daily",   price: "6,000",   period: "day"   },
        { name: "Weekly",  price: "29,600",  period: "week"  },
        { name: "Monthly", price: "118,300", period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "350,000"   },
            { type: "6 months",  price: "695,000"   },
            { type: "12 months", price: "1,385,000" },
          ],
        },
      ],
      nonMember: [
        { name: "Daily",   price: "8,900",   period: "day"   },
        { name: "Weekly",  price: "44,400",  period: "week"  },
        { name: "Monthly", price: "177,500", period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "532,000"   },
            { type: "6 months",  price: "1,064,000" },
            { type: "12 months", price: "2,128,000" },
          ],
        },
      ],
    },
  },
  {
    id: "private-office",
    label: "Private Office",
    icon: FiHome,
    description: "A fully enclosed office for your team",
    bg: "bg-white",
    features: ["Private enclosed office", "High-speed WiFi", "Dedicated storage", "Priority support"],
    plans: {
      member: [
        { name: "Daily",   price: "21,500",  period: "day"   },
        { name: "Monthly", price: "236,500", period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "704,000"   },
            { type: "6 months",  price: "1,405,000" },
            { type: "12 months", price: "2,800,000" },
          ],
        },
      ],
      nonMember: [
        { name: "Daily",   price: "32,300",  period: "day"   },
        { name: "Monthly", price: "354,800", period: "month" },
        {
          name: "Yearly", period: "year",
          tiers: [
            { type: "3 months",  price: "1,064,300" },
            { type: "6 months",  price: "2,128,500" },
            { type: "12 months", price: "4,257,000" },
          ],
        },
      ],
    },
  },
  {
    id: "content-room",
    label: "Content Room",
    icon: FiVideo,
    description: "Professional content creation space for podcasters and video creators",
    bg: "bg-worknub-mint",
    features: ["Soundproof room", "Air conditioning", "Aesthetic space design", "Large screen display", "Professional lighting"],
    plans: {
      member: [
        { name: "Hourly", price: "16,200", period: "hour" },
        // {
        //   name: "Bundle", period: "bundle",
        //   tiers: [
        //     { type: "5 hours",  price: "72,900" },
        //     { type: "10 hours", price: "137,700" },
        //     { type: "20 hours", price: "259,200" },
        //   ],
        // },
      ],
      nonMember: [
        { name: "Hourly", price: "16,200", period: "hour" },
        // {
        //   name: "Bundle", period: "bundle",
        //   tiers: [
        //     { type: "5 hours",  price: "72,900" },
        //     { type: "10 hours", price: "137,700" },
        //     { type: "20 hours", price: "259,200" },
        //   ],
        // },
      ],
    },
  },
];

// Single-price spaces (Meeting Room and Event Space)
const singleSpaces = [
  {
    id: "meeting-room",
    label: "Meeting Room",
    icon: FiMonitor,
    description: "Fully furnished space for meetings and collaborations",
    price: "38,700",
    period: "per hour",
    memberNote: "",
    features: ["Seats up to 15", "HD display & whiteboard", "High-speed WiFi", "Priority booking for members"],
  },
  {
    id: "event-space",
    label: "Event Space",
    icon: FiCalendar,
    description: "Dedicated space for events and gatherings",
    price: "91,400",
    period: "1st hour",
    memberPrice: "91,400",
    memberNote: "Subsequent hour ₦64,500",
    features: ["Capacity for large groups", "AV setup included", "High-speed WiFi", "Flexible seating arrangements"],
  },
];

const discounts = [
  {
    label: "Students",
    badge: "40% OFF",
    badgeColor: "bg-worknub-green",
    id: "student",
    note: "Valid Student ID required",
    rates: [
      { label: "Daily",                   value: "₦2,300"  },
      { label: "Weekly",                  value: "₦11,500" },
      { label: "Monthly",                 value: "₦46,000" },
      { label: "Flexi Weekly (3 days)",   value: "₦6,900"  },
      { label: "Flexi Monthly (12 days)", value: "₦27,600" },
    ],
  },
  {
    label: "Corp Members",
    badge: "25% OFF",
    badgeColor: "bg-worknub-orange",
    id: "corp",
    note: "Valid NYSC ID required",
    rates: [
      { label: "Daily",                   value: "₦2,900"  },
      { label: "Weekly",                  value: "₦14,500" },
      { label: "Monthly",                 value: "₦58,000" },
      { label: "Flexi Weekly (3 days)",   value: "₦8,700"  },
      { label: "Flexi Monthly (12 days)", value: "₦34,800" },
    ],
  },
];

const corporateSuites = [
  {
    id: "prime",
    label: "Prime",
    tagline: "Startups & small teams",
    teamSize: "4 – 6 people",
    membershipFee: "80,000",
    popular: false,
    composition: [
      { space: "Private Office", qty: 1 },
      { space: "Private Desk",   qty: 1 },
      { space: "Hot Desk",       qty: 2 },
    ],
    perks: "WiFi, coffee, printing, CCTV, branding, access & business address for all team members.",
    pricing: {
      member:    { monthly: "506,000",   tiers: [{ type: "3 months", price: "1,500,000" }, { type: "6 months", price: "3,000,000" }, { type: "12 months", price: "6,000,000"  }] },
      nonMember: { monthly: "759,000",   tiers: [{ type: "3 months", price: "2,277,000" }, { type: "6 months", price: "4,554,000" }, { type: "12 months", price: "9,108,000"  }] },
    },
  },
  {
    id: "momentum",
    label: "Momentum",
    tagline: "Growing teams",
    teamSize: "7 – 9 people",
    membershipFee: "120,000",
    popular: true,
    composition: [
      { space: "Private Office", qty: 1 },
      { space: "Private Desk",   qty: 3 },
      { space: "Hot Desk",       qty: 3 },
    ],
    perks: "WiFi, coffee, printing, CCTV, branding, 1hr meeting room per month , business address for all team members.",
    pricing: {
      member:    { monthly: "818,000",   tiers: [{ type: "3 months", price: "2,440,000" }, { type: "6 months", price: "4,880,000"  }, { type: "12 months", price: "9,760,000"  }] },
      nonMember: { monthly: "1,226,000", tiers: [{ type: "3 months", price: "3,678,000" }, { type: "6 months", price: "7,356,000"  }, { type: "12 months", price: "14,712,000" }] },
    },
  },
  {
    id: "elite",
    label: "Elite",
    tagline: "Top tier organisations",
    teamSize: "10 – 14 people",
    membershipFee: "160,000",
    popular: false,
    composition: [
      { space: "Private Office", qty: 2 },
      { space: "Private Desk",   qty: 4 },
      { space: "Hot Desk",       qty: 4 },
    ],
    perks: "WiFi, coffee, printing, CCTV,branding, 2hrs meeting room per month & business address for all team members.",
    pricing: {
      member:    { monthly: "1,248,000", tiers: [{ type: "3 months", price: "3,724,000"  }, { type: "6 months", price: "7,448,000"  }, { type: "12 months", price: "14,896,000" }] },
      nonMember: { monthly: "1,872,000", tiers: [{ type: "3 months", price: "5,616,000"  }, { type: "6 months", price: "11,232,000" }, { type: "12 months", price: "22,464,000" }] },
    },
  },
];

// ─── NAV ITEMS ──────────────────────────────────────────────────────────────

const navItems = [
  { id: 'hot-desk', label: 'Hot Desk', short: 'Hot Desk' },
  { id: 'private-desk', label: 'Private Desk', short: 'Private Desk' },
  { id: 'private-office', label: 'Private Office', short: 'Private Office' },
  { id: 'content-room', label: 'Content Room', short: 'Content Room' },
  { id: 'meeting-room-section', label: 'Meeting Room', short: 'Meeting Room' },
  { id: 'event-space-section', label: 'Event Space', short: 'Event Space' },
  { id: 'corporate-suites', label: 'Corporate Suites', short: 'Corporate' },
  { id: 'student-discounts', label: 'Student & Corp', short: 'Student / Corper' },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function YearlyPricingCard({ plan }) {
  const [selected, setSelected] = useState(0);
  const activeTier = plan.tiers[selected];

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden flex flex-col w-full border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="h-1 w-full bg-worknub-green" />

      <div className="px-7 pt-7 pb-5">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Long-term</p>
        <h3 className="text-xl font-extrabold text-worknub-dark tracking-[-0.01em]">{plan.name}</h3>
      </div>

      {/* Tier selector */}
      <div className="px-7 pb-5">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-gray-400 mb-3">Select duration</p>
        <div className="flex gap-2">
          {plan.tiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all border ${
                selected === i
                  ? 'bg-worknub-green text-white border-worknub-green shadow-md shadow-worknub-green/25'
                  : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-worknub-green/30 hover:text-worknub-green'
              }`}
            >
              {tier.type}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="px-7 pb-6 border-b border-gray-100">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold">₦</span>
          <span className="text-4xl font-black tracking-[-0.03em] text-worknub-green">
            {activeTier.price}
          </span>
        </div>
        <p className="text-gray-400 text-[12px] mt-1">for {activeTier.type}</p>
      </div>

      {/* CTA */}
      <div className="px-7 py-7 mt-auto">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-worknub-dark text-white hover:opacity-90 transition-all duration-200"
        >
          Get Started <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function FeatureStrip({ features }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-2.5 mb-8"
    >
      {features.map((f) => (
        <span
          key={f}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-worknub-dark bg-white border border-worknub-green/20 px-3 py-1.5 rounded-full shadow-sm"
        >
          <FiCheck size={11} className="text-worknub-green" strokeWidth={3} />
          {f}
        </span>
      ))}
    </motion.div>
  );
}

function CorporateSuiteCard({ suite, pricing, index }) {
  const [selected, setSelected] = useState(0);
  const activeTier = pricing.tiers[selected];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex flex-col rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] ${
        suite.popular
          ? "border-worknub-green bg-worknub-green/8"
          : "border-white/8 bg-white/4"
      }`}
    >
      {suite.popular && (
        <div className="bg-worknub-green text-white text-[10px] font-black tracking-widest uppercase text-center py-1.5">
          Most Popular
        </div>
      )}

      <div className="p-7 flex flex-col flex-1 gap-5">
        {/* Header */}
        <div>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-1">{suite.tagline}</p>
          <h3 className={`text-2xl font-black tracking-tight ${suite.popular ? "text-worknub-green" : "text-white"}`}>
            {suite.label}
          </h3>
          <p className="text-white/50 text-[13px] mt-1">{suite.teamSize}</p>
        </div>

        {/* Monthly base price */}
        <div className="border-t border-white/8 pt-5">
          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-1">Monthly base</p>
          <div className="flex items-baseline gap-1">
            <span className="text-white/60 text-base">₦</span>
            <span className={`text-3xl font-black tracking-[-0.03em] ${suite.popular ? "text-worknub-green" : "text-white"}`}>
              {pricing.monthly}
            </span>
            <span className="text-white/30 text-sm">/mo</span>
          </div>
        </div>

        {/* Duration selector */}
        <div>
          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-2">Long-term pricing</p>
          <div className="flex gap-1.5 mb-3">
            {pricing.tiers.map((tier, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                  selected === i
                    ? "bg-worknub-green text-white border-worknub-green"
                    : "bg-white/5 text-white/50 border-white/8 hover:border-worknub-green/40 hover:text-white/80"
                }`}
              >
                {tier.type}
              </button>
            ))}
          </div>
          <div className="flex items-baseline gap-1 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
            <span className="text-white/40 text-sm">₦</span>
            <span className={`text-2xl font-black tracking-tight ${suite.popular ? "text-worknub-green" : "text-white"}`}>
              {activeTier.price}
            </span>
            <span className="text-white/30 text-xs ml-1">for {activeTier.type}</span>
          </div>
        </div>

        {/* Workspace composition */}
        <div>
          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-2">What's included</p>
          <ul className="space-y-1.5 mb-3">
            {suite.composition.map((c) => (
              <li key={c.space} className="flex items-center justify-between text-[13px]">
                <span className="text-white/60">{c.space}</span>
                <span className={`font-black text-sm ${suite.popular ? "text-worknub-green" : "text-white/80"}`}>×{c.qty}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/35 text-[12px] leading-[1.6] border-t border-white/8 pt-3">{suite.perks}</p>
        </div>

        {/* Annual membership fee */}
        <div className="flex items-center gap-2 bg-worknub-green/10 border border-worknub-green/20 rounded-xl px-4 py-2.5">
          <FiCheck size={13} className="text-worknub-green shrink-0" strokeWidth={3} />
          <p className="text-[12px] text-white/70">
            Annual membership fee: <span className="font-bold text-worknub-green">₦{suite.membershipFee}</span>
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className={`mt-auto flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
            suite.popular
              ? "bg-worknub-green text-white hover:bg-[#43a047]"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
          }`}
        >
          Get This Package <FiArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

function SectionHeader({ label, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="w-6 h-0.5 bg-worknub-green rounded-sm inline-block" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-worknub-dark tracking-tight">{label}</h2>
      </div>
      <p className="text-gray-500 text-[14px] ml-8">{description}</p>
    </motion.div>
  );
}

function SingleSpaceCard({ space, isMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Top row: icon + price */}
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 bg-worknub-mint border border-worknub-green/20 rounded-xl flex items-center justify-center shrink-0">
          <space.icon size={24} className="text-worknub-green" />
        </div>
        <div>
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-worknub-dark tracking-tight">
              ₦{isMember && space.memberPrice ? space.memberPrice : space.price}
            </span>
            <span className="text-gray-400 text-sm">/ {space.period}</span>
          </div>
          {isMember && space.memberPrice ? (
            <p className="text-[12px] text-worknub-green font-semibold">
              {/* Member rate — save ₦{(parseInt(space.price.replace(/,/g, '')) - parseInt(space.memberPrice.replace(/,/g, ''))).toLocaleString()} */}
              ₦65,400 for subsequent hours.
            </p>
          ) : (
            <p className="text-[12px] text-gray-400">{space.memberNote}</p>
          )}

          <p className="text-[12px] text-red-500">
            3hrs+ booking discount: 10% for members, 5% for non-members
          </p>
        </div>
      </div>

      {/* Features */}
      <ul className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 flex-1">
        {space.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[13px] text-gray-600">
            <FiCheck size={12} className="text-worknub-green shrink-0" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-worknub-dark text-white hover:opacity-90 transition-all duration-200"
      >
        Get Started <FiArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

// ─── TOP NAV ────────────────────────────────────────────────────────────────

function TopNav({ activeSection, scrollTo }) {
  return (
    <div className="sticky top-14 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container-custom">
        <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide lg:justify-center">
          {navItems.map(({ id, short }) => {
            const isActive = activeSection === id;
            return (
              <button 
                key={id} 
                onClick={() => scrollTo(id)}
                className={`shrink-0 text-center py-2.5 px-3 rounded-lg text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? 'bg-worknub-green text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {short}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [memberType, setMemberType] = useState('member');
  const [activeSection, setActiveSection] = useState('hot-desk');
  const isMember = memberType === 'member';

  // ── SCROLL SPY ──
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

  // Get the first two spaces for Meeting Room and Event Space sections
  const meetingRoom = singleSpaces[0];
  const eventSpace = singleSpaces[1];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-worknub-mint overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781088299/Untitled-1_tuqrgv.png)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-1 bg-worknub-mint/70" />
        <div className="absolute inset-0 z-1"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(240,249,240,0.5) 100%)" }} />

        <div className="container-custom relative z-2 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-worknub-dark mb-3 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-[0.95rem] sm:text-lg text-gray-600 max-w-xl mx-auto">
              Choose the plan that works for you. Members save up to 40% on every rate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MEMBER/STANDARD TOGGLE (scrollable) ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-3 flex items-center justify-center gap-3">
          {[
            { id: 'member',    label: '🏆 Member Rates' },
            { id: 'nonMember', label: 'Standard Rates'  },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMemberType(id)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                memberType === id
                  ? 'bg-worknub-green text-white shadow-md shadow-worknub-green/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
          {isMember && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-worknub-green bg-worknub-green/10 border border-worknub-green/20 px-3 py-1.5 rounded-full">
              <FiCheck size={10} strokeWidth={3} /> Up to 40% savings active
            </span>
          )}
        </div>
      </div>

      {/* ── TOP NAV (Spaces only - sticky) ── */}
      <TopNav activeSection={activeSection} scrollTo={scrollTo} />

      {/* ── SPACE CATEGORIES ── */}
      {spaceCategories.map((cat) => (
        <section key={cat.id} id={cat.id} className={`py-14 sm:py-20 ${cat.bg}`}>
          <div className="container-custom">
            <SectionHeader label={cat.label} description={cat.description} />
            <FeatureStrip features={cat.features} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {(isMember ? cat.plans.member : cat.plans.nonMember).map((plan, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  {plan.tiers ? <YearlyPricingCard plan={plan} /> : <PricingCard plan={plan} />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── MEETING ROOM ── */}
      <section id="meeting-room-section" className="py-14 sm:py-20 bg-worknub-mint">
        <div className="container-custom">
          <SectionHeader 
            label={meetingRoom.label} 
            description={meetingRoom.description} 
          />
          <div className="max-w-2xl">
            <SingleSpaceCard space={meetingRoom} isMember={isMember} />
          </div>
        </div>
      </section>

      {/* ── EVENT SPACE ── */}
      <section id="event-space-section" className="py-14 sm:py-20 bg-white">
        <div className="container-custom">
          <SectionHeader 
            label={eventSpace.label} 
            description={eventSpace.description} 
          />
          <div className="max-w-2xl">
            <SingleSpaceCard space={eventSpace} isMember={isMember} />
          </div>
        </div>
      </section>

      {/* ── CORPORATE SUITES ── */}
      <section id="corporate-suites" className="py-14 sm:py-20 bg-[#0c1a12] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-6 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Corporate Suite</h2>
            </div>
            <p className="text-white/50 text-[14px] ml-8">All-in-one team packages with a single annual membership fee.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {corporateSuites.map((suite, i) => {
              const pricing = isMember ? suite.pricing.member : suite.pricing.nonMember;
              return (
                <CorporateSuiteCard key={suite.id} suite={suite} pricing={pricing} index={i} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STUDENT & CORP DISCOUNTS ── */}
      <section id="student-discounts" className="py-14 sm:py-20 bg-white">
        <div className="container-custom">
          <SectionHeader
            label="Student & Corp Member Discounts"
            description="Special rates for students and NYSC members — valid ID required."
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {discounts.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="bg-worknub-mint border border-worknub-green/15 rounded-2xl p-7"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-extrabold text-worknub-dark">{d.label}</h3>
                  <span className={`${d.badgeColor} text-white text-[11px] font-black px-3 py-1 rounded-full tracking-wide`}>
                    {d.badge}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {d.rates.map((r) => (
                    <li key={r.label} className="flex items-center justify-between text-[13.5px]">
                      <span className="text-gray-500">{r.label}</span>
                      <span className="font-bold text-worknub-dark">{r.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-gray-400 mt-5 pt-4 border-t border-worknub-green/15">{d.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}