"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

const categoryColors = {
  "Productivity":    { pill: "bg-worknub-green/10 text-worknub-green border-worknub-green/20",   dot: "bg-worknub-green" },
  "Trends":          { pill: "bg-worknub-orange/10 text-worknub-orange border-worknub-orange/20", dot: "bg-worknub-orange" },
  "Networking":      { pill: "bg-worknub-teal/10 text-worknub-teal border-worknub-teal/20",       dot: "bg-worknub-teal" },
  "Future of Work":  { pill: "bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20",               dot: "bg-[#7c3aed]" },
};

const categoryBg = {
  "Productivity":   "from-worknub-green/20 to-worknub-green/5",
  "Trends":         "from-worknub-orange/20 to-worknub-orange/5",
  "Networking":     "from-worknub-teal/20 to-worknub-teal/5",
  "Future of Work": "from-[#7c3aed]/20 to-[#7c3aed]/5",
};

export default function BlogCard({ blog, index, featured = false }) {
  const colors = categoryColors[blog.category] || categoryColors["Productivity"];
  const bgGradient = categoryBg[blog.category] || categoryBg["Productivity"];

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group col-span-1 sm:col-span-2 flex flex-col md:flex-row"
      >
        {/* Image area — left side on md+ */}
        <div className={`relative h-40 md:w-56 md:h-auto bg-gradient-to-br ${bgGradient} overflow-hidden shrink-0`}>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-current opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-7xl font-black opacity-[0.07] select-none ${colors.pill.split(' ')[1]}`}>
              {blog.category[0]}
            </span>
          </div>
          <div className="absolute top-4 left-4 bg-worknub-dark text-white text-[10px] font-black tracking-[0.08em] uppercase px-2.5 py-1 rounded-lg">
            Featured
          </div>
          <div className={`absolute bottom-4 left-4 text-[10px] font-black tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg border ${colors.pill}`}>
            {blog.category}
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col justify-center flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 mb-2 sm:mb-2.5">
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
          <p className="text-gray-500 text-[12px] sm:text-[13px] leading-[1.7] mb-3 sm:mb-4">{blog.excerpt}</p>
          <Link
            href={`/blogs/${blog.id}`}
            className="inline-flex items-center gap-1.5 text-worknub-green font-bold text-[12px] sm:text-[13px] hover:gap-2.5 transition-all duration-200"
          >
            Read Article <FiArrowRight size={13} />
          </Link>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col"
    >
      {/* Image area */}
      <div className={`relative h-36 bg-gradient-to-br ${bgGradient} overflow-hidden shrink-0`}>
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-current opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-6xl font-black opacity-[0.07] select-none ${colors.pill.split(' ')[1]}`}>
            {blog.category[0]}
          </span>
        </div>
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.dot}`} />
        <div className={`absolute top-3.5 left-3.5 text-[10px] font-black tracking-[0.06em] uppercase px-2.5 py-1 rounded-lg border ${colors.pill}`}>
          {blog.category}
        </div>
      </div>

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
        <h3 className="text-[15px] font-extrabold text-worknub-dark tracking-[-0.01em] leading-snug mb-2 group-hover:text-worknub-green transition-colors duration-200 flex-1">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-[12.5px] leading-[1.65] mb-4 line-clamp-2">{blog.excerpt}</p>
        <Link
          href={`/blogs/${blog.id}`}
          className="inline-flex items-center gap-1.5 text-worknub-green font-bold text-[12.5px] hover:gap-2.5 transition-all duration-200 mt-auto"
        >
          Read More <FiArrowRight size={12} />
        </Link>
      </div>
    </motion.article>
  );
}
