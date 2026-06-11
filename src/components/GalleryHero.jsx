"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiMapPin, FiPlay, FiX } from "react-icons/fi";

const stats = [
  { icon: FiCamera, label: "12 Spaces Captured", sub: "Every room, every angle" },
  { icon: FiMapPin, label: "Agodi GRA, Ibadan",  sub: "Prime location" },
];

export default function GalleryHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #2D2D2D 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Green blob */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 65%)", transform: "translate(20%, -30%)" }}
        />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Photo Gallery</span>
              </div>
              <h1 className="text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.05] mb-3 sm:mb-5">
                See the Space<br />
                <span className="text-worknub-green">Before You Visit</span>
              </h1>
              <p className="text-gray-500 text-[0.95rem] sm:text-lg leading-[1.75] max-w-lg">
                A visual tour of our workspace in Agodi GRA, Ibadan — every desk, room, and corner.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10"
              >
                {stats.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-1 h-10 bg-worknub-green/30 rounded-full" />
                    <div>
                      <p className="text-worknub-dark font-bold text-sm">{label}</p>
                      <p className="text-gray-400 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — video thumbnail + play button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="block"
            >
              <div
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}
                onClick={() => setModalOpen(true)}
              >
                {/* Video thumbnail — first frame via Cloudinary poster */}
                <video
                  className="w-full h-[340px] object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  src="https://res.cloudinary.com/ddldviftf/video/upload/v1781003871/hero-worknub_ib5x3h.mov"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-worknub-dark/40 group-hover:bg-worknub-dark/50 transition-colors duration-300" />

                {/* Green tint */}
                <div className="absolute inset-0 bg-worknub-green/[0.06]" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-worknub-green/30 scale-150 animate-ping opacity-60" />
                    {/* Button */}
                    <div
                      className="relative w-20 h-20 bg-worknub-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: "0 8px 32px rgba(71,195,65,0.5)" }}
                    >
                      <FiPlay size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-worknub-dark/80 to-transparent">
                  <p className="text-white font-bold text-sm">Watch the Tour</p>
                  <p className="text-white/60 text-xs mt-0.5">See Worknub in action</p>
                </div>
              </div>

              {/* Hint below */}
              <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1.5">
                <FiPlay size={10} className="text-worknub-green" />
                Click to watch the full space walkthrough
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setModalOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/[0.08] border border-white/[0.15] rounded-xl flex items-center justify-center text-white hover:bg-white/[0.15] transition-colors z-10"
            >
              <FiX size={18} />
            </button>

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Top border accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/40 to-transparent rounded-t-2xl" />

              <div className="rounded-2xl overflow-hidden bg-[#111] shadow-2xl">
                <video
                  autoPlay
                  muted
                  playsInline
                  className="w-full max-h-[75vh]"
                  src="https://res.cloudinary.com/ddldviftf/video/upload/v1781003871/hero-worknub_ib5x3h.mov"
                >
                  <source src="https://res.cloudinary.com/ddldviftf/video/upload/v1781003871/hero-worknub_ib5x3h.mov" type="video/mp4" />
                  <source src="https://res.cloudinary.com/ddldviftf/video/upload/v1781003871/hero-worknub_ib5x3h.mov" type="video/quicktime" />
                </video>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-extrabold text-base tracking-[-0.01em]">Worknub Space Walkthrough</p>
                    <p className="text-gray-500 text-[13px] mt-0.5">Agodi GRA, Ibadan — Nigeria's No.1 Coworking Space</p>
                  </div>
                  <span className="text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-lg bg-worknub-green/10 text-worknub-green border border-worknub-green/20">
                    Space Tour
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}