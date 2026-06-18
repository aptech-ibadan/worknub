"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiCalendar, FiClock, FiArrowRight, FiImage } from 'react-icons/fi';

/* ── Image helpers ── */
function imageToDataURL(imageHex, mime) {
  if (!imageHex || !mime) return null;
  try {
    // If it contains chars outside hex range (0-9, a-f, A-F), treat as base64
    const isBase64 = /[^0-9a-fA-F]/.test(imageHex.replace(/[\r\n\s]/g, ''));
    if (isBase64) return `data:${mime};base64,${imageHex}`;
    // True hex → convert to base64
    const bytes  = new Uint8Array(imageHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
    return `data:${mime};base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

/* ── Category theming ── */
const categoryColors = {
  "Productivity":   { pill: "bg-worknub-green/10 text-worknub-green border-worknub-green/20",   dot: "bg-worknub-green",   gradient: "from-worknub-green/20 to-worknub-green/5" },
  "Trends":         { pill: "bg-worknub-orange/10 text-worknub-orange border-worknub-orange/20", dot: "bg-worknub-orange",  gradient: "from-worknub-orange/20 to-worknub-orange/5" },
  "Networking":     { pill: "bg-worknub-teal/10 text-worknub-teal border-worknub-teal/20",       dot: "bg-worknub-teal",    gradient: "from-worknub-teal/20 to-worknub-teal/5" },
  "Future of Work": { pill: "bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20",               dot: "bg-[#7c3aed]",       gradient: "from-[#7c3aed]/20 to-[#7c3aed]/5" },
  "Announcements":  { pill: "bg-red-50 text-red-500 border-red-100",                              dot: "bg-red-400",         gradient: "from-red-100 to-red-50" },
};

const fallback = { pill: "bg-worknub-green/10 text-worknub-green border-worknub-green/20", dot: "bg-worknub-green", gradient: "from-worknub-green/20 to-worknub-green/5" };

/* ── Shared image area ── */
function CardImage({ blog, className, colors }) {
  const [error, setError] = useState(false);
  const src = !error && blog.imageHex && blog.imageMime
    ? imageToDataURL(blog.imageHex, blog.imageMime)
    : null;

  if (src && !error) {
    return (
      <img
        src={src}
        alt={blog.title}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  /* Fallback gradient placeholder */
  return (
    <div className={`${className} bg-linear-to-br ${colors.gradient} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-current opacity-10" />
      <span className={`text-6xl font-black opacity-[0.07] select-none ${colors.pill.split(' ')[1]}`}>
        {blog.category?.[0] || '?'}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   Featured Card  (col-span-2, side-by-side)
══════════════════════════════════════════ */
export default function BlogCard({ blog, index, featured = false }) {
  const blogId = blog._id || blog.id;
  const colors  = categoryColors[blog.category] || fallback;

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group col-span-1 sm:col-span-2 flex flex-col md:flex-row"
      >
        {/* Left image */}
        <div className="relative h-48 md:w-64 md:h-auto shrink-0 overflow-hidden">
          <CardImage
            blog={blog}
            colors={colors}
            className="w-full h-full object-cover"
          />
          {/* Overlaid badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-worknub-dark text-white text-[10px] font-black tracking-[0.08em] uppercase px-2.5 py-1 rounded-lg">
              Featured
            </span>
            <span className={`text-[10px] font-black tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg border backdrop-blur-sm bg-white/80 ${colors.pill}`}>
              {blog.category}
            </span>
          </div>
        </div>

        {/* Right content */}
        <div className="p-5 sm:p-6 flex flex-col justify-center flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
            <span className="flex items-center gap-1.5 text-gray-400 text-[12px]">
              <FiCalendar size={11} /> {blog.date}
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5 text-gray-400 text-[12px]">
              <FiClock size={11} /> {blog.readTime}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-worknub-dark tracking-[-0.02em] leading-snug mb-2 group-hover:text-worknub-green transition-colors duration-200">
            {blog.title}
          </h3>
          <p className="text-gray-500 text-[12px] sm:text-[13px] leading-[1.7] mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          <Link
            href={`/blogs/${blogId}`}
            className="inline-flex items-center gap-1.5 text-worknub-green font-bold text-[12px] sm:text-[13px] hover:gap-2.5 transition-all duration-200"
          >
            Read Article <FiArrowRight size={13} />
          </Link>
        </div>
      </motion.article>
    );
  }

  /* ══════════════════════════════
     Standard Card
  ══════════════════════════════ */
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden shrink-0">
        <CardImage
          blog={blog}
          colors={colors}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {/* Category pill + top accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.dot}`} />
        <span className={`absolute top-3 left-3 text-[10px] font-black tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg border backdrop-blur-sm bg-white/80 ${colors.pill}`}>
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2.5">
          <span className="flex items-center gap-1.5 text-gray-400 text-[11.5px]">
            <FiCalendar size={11} /> {blog.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-400 text-[11.5px]">
            <FiClock size={11} /> {blog.readTime}
          </span>
        </div>
        <h3 className="text-[15px] font-extrabold text-worknub-dark tracking-[-0.01em] leading-snug mb-2 group-hover:text-worknub-green transition-colors duration-200">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-[12.5px] leading-[1.65] mb-4 line-clamp-2 flex-1">
          {blog.excerpt}
        </p>
        <Link
          href={`/blogs/${blogId}`}
          className="inline-flex items-center gap-1.5 text-worknub-green font-bold text-[12.5px] hover:gap-2.5 transition-all duration-200 mt-auto"
        >
          Read More <FiArrowRight size={12} />
        </Link>
      </div>
    </motion.article>
  );
}