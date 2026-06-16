"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiUsers, FiUser, FiBriefcase,
  FiHome, FiVideo, FiCalendar, FiCheck, FiMapPin
} from 'react-icons/fi';

const spaces = [
  {
    name: "Hot Desk",
    description: "Flexible workspace in our shared area. Perfect for freelancers and remote workers who want energy, community, and zero commitment.",
    icon: FiUsers,
    features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities"],
    price: "₦5,700",
    period: "/ day",
    popular: true,
    tag: "Most Flexible",
    accentClass: "text-worknub-green",
    accentBg: "bg-worknub-green/10",
    accentBorder: "border-worknub-green/20",
    tagBg: "bg-worknub-green text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781008972/IMG_0711_kexdh9.jpg",
  },
  {
    name: "Private Desk",
    description: "Your own dedicated desk in our quiet zone. Keep your equipment securely and build a routine in a space that's truly yours.",
    icon: FiUser,
    features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities", "Dedicated desk + storage", "Priority support"],
    price: "₦8,900",
    period: "/ day",
    popular: false,
    tag: "Best for Routine",
    accentClass: "text-worknub-teal",
    accentBg: "bg-worknub-teal/10",
    accentBorder: "border-worknub-teal/20",
    tagBg: "bg-worknub-teal text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006305/IMG_3610_ngc93i.jpg",
  },
  {
    name: "Private Office",
    description: "Fully private office space for your team. A command centre for startups and growing businesses that need focus and identity.",
    icon: FiBriefcase,
    features: ["Private lockable office", "Seats up to 3 people", "Business address", "Flexible daily access", "High-speed WiFi", "Lounge Access", "Complimentary Coffee"],
    price: "₦32,300",
    period: " /day",
    popular: true,
    tag: "Most Popular",
    accentClass: "text-worknub-orange",
    accentBg: "bg-worknub-orange/10",
    accentBorder: "border-worknub-orange/20",
    tagBg: "bg-worknub-orange text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006330/IMG_3622_jpna0l.jpg",
  },
  {
    name: "Meeting Room",
    description: "Professional meeting spaces equipped with modern technology. Walk in ready to impress — everything is already set up.",
    icon: FiVideo,
    features: ["Projector & screen", "Whiteboard", "Video conferencing"],
    price: "₦38,700",
    period: "/ hour",
    popular: false,
    tag: "On Demand",
    accentClass: "text-worknub-green",
    accentBg: "bg-worknub-green/10",
    accentBorder: "border-worknub-green/20",
    tagBg: "bg-worknub-green text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006297/IMG_3624_dddcqq.jpg",
  },
  {
    name: "Event Space",
    description: "Host workshops, seminars, and networking events in our versatile venue. Ibadan's most exciting professional gathering spot.",
    icon: FiCalendar,
    features: ["Stage & sound system", "Seating for 50+", "Catering available", "Event support", "30% subsequent hour discount"],
    price: "₦ 91,900",
    period: "/ 1st hr",
    popular: false,
    tag: "Full Venue",
    accentClass: "text-worknub-teal",
    accentBg: "bg-worknub-teal/10",
    accentBorder: "border-worknub-teal/20",
    tagBg: "bg-worknub-teal text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781008993/IMG_3906_kljc3h.jpg",
  },
  {
    name: "Content Room",
    description: "Professional content creation space for podcasters and video creators. Soundproofed, lit, and ready for your next hit.",
    icon: FiHome,
    features: ["Soundproof", "A.C", "Aesthetic space", "Large screen display"],
    price: "₦16,200",
    period: "/ hour",
    popular: false,
    tag: "Creator Studio",
    accentClass: "text-worknub-orange",
    accentBg: "bg-worknub-orange/10",
    accentBorder: "border-worknub-orange/20",
    tagBg: "bg-worknub-orange text-white",
    image: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006321/IMG_3605_cubzx0.jpg",
  },
];

/* ── Featured card (2 cols) ─────────────────────────────────── */
function FeaturedCard({ space, index }) {
  const Icon = space.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      viewport={{ once: true }}
      className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-white group"
    >
      {/* IMAGE panel */}
      <div className={`relative overflow-hidden min-h-64 md:min-h-[380px] ${!isEven ? 'md:order-2' : ''}`}>
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-0">
          <span className={`inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-4 w-fit ${space.tagBg}`}>
            {space.tag}
          </span>
          <h3 className="text-white text-2xl font-extrabold tracking-[-0.02em] mb-1">{space.name}</h3>
          {/* <div className="flex items-baseline gap-1">
            <span className="text-white text-xl font-black">{space.price}</span>
            <span className="text-white/60 text-sm">{space.period}</span>
          </div> */}
          <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-out">
            <ul className="mt-4 space-y-2">
              {space.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80 text-[13px]">
                  <FiCheck size={12} className="text-white shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CONTENT panel */}
      <div className={`p-6 md:p-10 flex flex-col justify-between bg-white ${!isEven ? 'md:order-1' : ''}`}>
        <div>
          <div className={`w-10 md:w-14 h-10 md:h-14 rounded-2xl ${space.accentBg} border ${space.accentBorder} flex items-center justify-center mb-4 md:mb-6`}>
            <Icon size={20} className={space.accentClass} />
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-worknub-dark tracking-[-0.02em] leading-tight mb-2 md:mb-3">
            {space.name}
          </h3>
          <p className="text-gray-500 text-[14px] md:text-[15px] leading-[1.75] mb-6 md:mb-8">
            {space.description}
          </p>
          <p className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 mb-3 md:mb-4">What's included</p>
          <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
            {space.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 text-[13px] md:text-[14px]">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${space.accentBg}`}>
                  <FiCheck size={11} className={space.accentClass} strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          {/* <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-3xl font-black tracking-[-0.03em] ${space.accentClass}`}>{space.price}</span>
            <span className="text-gray-400 text-sm">{space.period}</span>
          </div> */}
          <Link
            href="/pricing"
            className={`flex items-center justify-center gap-2 py-3 md:py-3.5 px-5 md:px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:gap-3 ${
              space.popular ? 'bg-worknub-green text-white hover:bg-[#3aad35]' : 'bg-worknub-dark text-white hover:opacity-90'
            }`}
          >
            Book This Space <FiArrowRight size={15} />
          </Link>
          <Link href="/contact" className="text-center text-xs md:text-sm text-gray-400 hover:text-worknub-green transition-colors font-medium">
            Ask a question →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small card (1 col) ─────────────────────────────────────── */
function SmallCard({ space, index }) {
  const Icon = space.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group"
    >
      <div className="relative overflow-hidden h-40 md:h-52 shrink-0">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className={`absolute top-4 left-4 text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg ${space.tagBg}`}>
          {space.tag}
        </span>
        <div className="absolute inset-0 bg-worknub-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-6">
          <p className="text-white font-extrabold text-lg text-center tracking-[-0.01em]">{space.name}</p>
          {/* <div className="flex items-baseline gap-1">
            <span className="text-white text-2xl font-black">{space.price}</span>
            <span className="text-white/60 text-sm">{space.period}</span>
          </div> */}
          <Link href="/pricing" className="mt-2 inline-flex items-center gap-1.5 bg-worknub-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#3aad35] transition-colors">
            Book Now <FiArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className={`w-9 md:w-10 h-9 md:h-10 rounded-xl flex items-center justify-center ${space.accentBg}`}>
            <Icon size={16} className={space.accentClass} />
          </div>
          <h3 className="text-[15px] md:text-[17px] font-extrabold text-worknub-dark tracking-[-0.01em]">{space.name}</h3>
        </div>
        <p className="text-gray-500 text-[12px] md:text-[13px] leading-[1.7] mb-4 md:mb-5 flex-1">{space.description}</p>
        <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5">
          {space.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-600 text-[11.5px] md:text-[12.5px]">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${space.accentBg}`}>
                <FiCheck size={9} className={space.accentClass} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <div className="pt-3 md:pt-4 border-t border-gray-100 flex items-center justify-between">
          {/* <div className="flex items-baseline gap-1">
            <span className={`text-lg md:text-xl font-black tracking-[-0.02em] ${space.accentClass}`}>{space.price}</span>
            <span className="text-gray-400 text-[10px] md:text-xs">{space.period}</span>
          </div> */}
          <Link href="/pricing" className="inline-flex items-center gap-1.5 bg-worknub-dark text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold text-[11px] md:text-xs hover:opacity-90 transition-opacity">
            Book Now <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Spaces() {
  const layout = [
    { type: 'featured', space: spaces[0] },
    { type: 'small',    space: spaces[1] },
    { type: 'small',    space: spaces[2] },
    { type: 'featured', space: spaces[3] },
    { type: 'small',    space: spaces[4] },
    { type: 'small',    space: spaces[5] },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">

        {/* Cloudinary background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781088299/Untitled-1_tuqrgv.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* White overlay — keeps text crisp */}
        <div className="absolute inset-0 bg-white/82 pointer-events-none" />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.5) 100%)" }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2.5 mb-3 sm:mb-5">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-bold tracking-[0.12em] uppercase">Agodi GRA, Ibadan</span>
            </div>
            <h1 className="text-[clamp(1.8rem,5vw,4.2rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.05] mb-4 sm:mb-6">
              Every Kind of Space<br />
              <span className="text-worknub-green">You'll Ever Need</span>
            </h1>
            <p className="text-gray-500 text-[0.95rem] sm:text-lg leading-[1.75] max-w-xl mb-8 sm:mb-10">
              From a single hot desk to a full private office — Worknub has a workspace built around the way you work.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {[
                { label: "6 Space Types", sub: "Hot desk to event venue" },
                { label: "24/7 Access",   sub: "Work on your schedule" },
                { label: "Agodi GRA",     sub: "Prime Ibadan location" },
              ].map(({ label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-1 h-10 bg-worknub-green/30 rounded-full" />
                  <div>
                    <p className="text-worknub-dark font-bold text-sm">{label}</p>
                    <p className="text-gray-400 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating price chips */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute right-0 top-8 hidden lg:flex flex-col gap-3"
          >
            {[
              { label: "Hot Desk",       price: "₦5,700 /day",  color: "text-worknub-green" },
              { label: "Private Office", price: "₦32,300 /day", color: "text-worknub-orange" },
              { label: "Meeting Room",   price: "₦38,700/hr",   color: "text-worknub-teal" },
            ].map(({ label, price, color }) => (
              <div key={label} className="flex items-center gap-3 bg-white border border-gray-100 shadow-md rounded-2xl px-5 py-3">
                <FiMapPin size={13} className="text-gray-300" />
                <span className="text-gray-500 text-xs font-medium">{label}</span>
                {/* <span className={`text-sm font-bold ${color}`}>{price}</span> */}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Spaces Grid ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/60">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {layout.map((item, i) =>
              item.type === 'featured'
                ? <FeaturedCard key={i} space={item.space} index={i} />
                : <SmallCard key={i} space={item.space} index={i} />
            )}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-worknub-dark rounded-3xl px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-worknub-green/[0.07] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-worknub-orange/[0.06] rounded-full translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <p className="text-worknub-green text-xs font-bold tracking-[0.12em] uppercase mb-3">Can't Decide?</p>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-[-0.02em] leading-tight mb-3">
                Come See It In Person
              </h2>
              <p className="text-gray-400 text-[15px] max-w-md leading-[1.7]">
                Book a free tour and walk through every space. No pressure, no commitment — just see if Worknub fits your work style.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 shrink-0">
              <Link href="/gallery" className="inline-flex items-center gap-2 bg-worknub-green text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3aad35] transition-colors">
                View Gallery <FiArrowRight size={15} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors">
                Book a Tour
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}