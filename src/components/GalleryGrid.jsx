"use client";
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const galleryImages = [
  { id: 1,  title: "Hot Desk Area",       category: "Workspace", url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781008973/IMG_0710_rahzgk.jpg?w=800&h=600&fit=crop" },
  { id: 2,  title: "Private Office",      category: "Workspace", url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006313/IMG_3620_scshn0.jpg?w=800&h=600&fit=crop" },
  { id: 3,  title: "Meeting Room",        category: "Meeting",   url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006297/IMG_3624_dddcqq.jpg?w=800&h=600&fit=crop" },
  { id: 4,  title: "Lounge Area",         category: "Lounge",    url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006321/IMG_3605_cubzx0.jpg?w=800&h=600&fit=crop" },
  { id: 5,  title: "Event Space",         category: "Event",     url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781008993/IMG_3906_kljc3h.jpg?w=800&h=600&fit=crop" },
  { id: 6,  title: "Content Room",        category: "Content",   url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006266/IMG_3606_bzqufs.jpg?w=800&h=600&fit=crop" },
  { id: 7,  title: "Coworking Area",      category: "Workspace", url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006305/IMG_3610_ngc93i.jpg?w=800&h=600&fit=crop" },
  { id: 8,  title: "Conference Room",     category: "Meeting",   url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006331/IMG_3625_wi4npm.jpg?w=800&h=600&fit=crop" },
  { id: 9,  title: "Private Desk",        category: "Workspace", url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006330/IMG_3622_jpna0l.jpg?w=800&h=600&fit=crop" },
  { id: 10, title: "Collaboration Space", category: "Workspace", url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781008972/IMG_0711_kexdh9.jpg?w=800&h=600&fit=crop" },
  { id: 11, title: "Board Room",          category: "Meeting",   url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006331/IMG_3625_wi4npm.jpg?w=800&h=600&fit=crop" },
  { id: 12, title: "Relaxation Zone",     category: "Lounge",    url: "https://res.cloudinary.com/ddldviftf/image/upload/v1781006318/IMG_3604_qi8un5.jpg?w=800&h=600&fit=crop" },
];

const categories = ["All", "Workspace", "Meeting", "Lounge", "Event", "Content"];

const categoryColors = {
  Workspace: { pill: "bg-worknub-green text-white",    dot: "bg-worknub-green" },
  Meeting:   { pill: "bg-worknub-teal text-white",     dot: "bg-worknub-teal" },
  Lounge:    { pill: "bg-worknub-orange text-white",   dot: "bg-worknub-orange" },
  Event:     { pill: "bg-[#7c3aed] text-white",        dot: "bg-[#7c3aed]" },
  Content:   { pill: "bg-worknub-dark text-white",     dot: "bg-worknub-dark" },
};

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const filtered = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openImage = (index) => { setSelectedIndex(index); setDirection(0); };
  const closeImage = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setDirection(1);
    setSelectedIndex(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  const slideVariants = {
    enter: d => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit:   d => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.2 } }),
  };

  return (
    <>
      {/* ── Filter pills ── */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileTap={{ scale: 0.96 }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[13px] font-bold tracking-[0.01em] transition-all duration-200 border ${
                active
                  ? 'bg-worknub-dark text-white border-worknub-dark shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-worknub-green/40 hover:text-worknub-dark'
              }`}
            >
              {cat}
              {active && selectedCategory !== 'All' && (
                <span className="ml-2 text-[11px] opacity-70">
                  {galleryImages.filter(i => i.category === cat).length}
                </span>
              )}
            </motion.button>
          );
        })}

        {/* Count badge */}
        <span className="ml-auto flex items-center text-[12px] sm:text-[13px] text-gray-400 font-medium">
          {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Masonry-style grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {filtered.map((image, index) => {
            const colors = categoryColors[image.category] || categoryColors.Workspace;
            const isTall = index % 5 === 0; // make every 5th image taller for visual variety

            return (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openImage(index)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
                style={{ height: isTall ? 260 : 200 }}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Expand icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                  <FiMaximize2 size={16} className="text-worknub-dark" />
                </div>

                {/* Title + category on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-extrabold text-base tracking-[-0.01em]">{image.title}</p>
                  <p className="text-white/60 text-[12px] mt-0.5">{image.category}</p>
                </div>

                {/* Category pill — always visible */}
                <div className={`absolute top-4 left-4 text-[11px] font-black tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg ${colors.pill}`}>
                  {image.category}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.93)' }}
            onClick={closeImage}
          >
            {/* Close */}
            <button
              onClick={closeImage}
              className="absolute top-5 right-5 w-10 h-10 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-colors z-10"
            >
              <FiX size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 w-11 h-11 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-colors z-10"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 w-11 h-11 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-colors z-10"
            >
              <FiChevronRight size={20} />
            </button>

            {/* Image */}
            <div
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="rounded-2xl overflow-hidden bg-[#111]">
                    <img
                      src={filtered[selectedIndex]?.url}
                      alt={filtered[selectedIndex]?.title}
                      className="w-full max-h-[72vh] object-contain"
                    />
                    <div className="px-7 py-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-extrabold text-lg tracking-[-0.01em]">
                          {filtered[selectedIndex]?.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] mt-0.5">Worknub · Agodi GRA, Ibadan</p>
                      </div>
                      <div className={`text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-lg ${categoryColors[filtered[selectedIndex]?.category]?.pill}`}>
                        {filtered[selectedIndex]?.category}
                      </div>
                    </div>
                  </div>

                  {/* Counter */}
                  <p className="text-center text-white/30 text-xs font-medium mt-4">
                    {selectedIndex + 1} / {filtered.length}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
