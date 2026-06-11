"use client";
import BlogCard from '@/components/BlogCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const blogs = [
  {
    id: 1,
    title: "10 Tips for Productive Remote Work",
    excerpt: "Discover how to stay focused and productive while working remotely from a coworking space in Ibadan.",
    date: "June 1, 2026",
    readTime: "5 min read",
    category: "Productivity",
  },
  {
    id: 2,
    title: "Why Ibadan is Nigeria's Next Tech Hub",
    excerpt: "Explore the growing tech ecosystem in Ibadan and why coworking spaces are leading the charge.",
    date: "May 25, 2026",
    readTime: "7 min read",
    category: "Trends",
  },
  {
    id: 3,
    title: "Networking Tips for Freelancers",
    excerpt: "Learn how to build meaningful professional connections in coworking spaces that actually turn into opportunities.",
    date: "May 18, 2026",
    readTime: "4 min read",
    category: "Networking",
  },
  {
    id: 4,
    title: "The Future of Work: Hybrid Models",
    excerpt: "How hybrid work models are reshaping the way we think about office spaces and professional identity.",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "Future of Work",
  },
];

const categories = ["All", "Productivity", "Trends", "Networking", "Future of Work"];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  /* First blog is featured (full width), rest are standard */
  const featured = filtered[0];
  const rest = filtered.slice(1);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email) setSubscribed(true);
  
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2D2D2D 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div
          className="absolute top-0 right-0 w-[460px] h-[460px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 65%)', transform: 'translate(20%, -30%)' }}
        />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Worknub Blog</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h1 className="text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.05] mb-3 sm:mb-5">
              Insights for the<br />
              <span className="text-worknub-green">Modern Professional</span>
            </h1>
            <p className="text-gray-500 text-[0.95rem] sm:text-lg leading-[1.75] max-w-lg mx-auto">
              Tips, trends, and stories from the Worknub community and beyond.
            </p>

            {/* Inline stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-10 pt-8 border-t border-gray-100"
            >
              {[
                { value: `${blogs.length}`, label: "Articles" },
                { value: "4",              label: "Categories" },
                { value: "Weekly",         label: "New posts" },
              ].map(({ value, label }, i) => (
                <div key={label} className="text-center">
                  <p className="text-worknub-dark font-extrabold text-xl tracking-[-0.02em]">{value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="py-12 sm:py-16 bg-gray-50/60">
        <div className="container-custom">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileTap={{ scale: 0.96 }}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[13px] font-bold tracking-[0.01em] transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-worknub-dark text-white border-worknub-dark shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-worknub-green/40 hover:text-worknub-dark'
                }`}
              >
                {cat}
                {selectedCategory === cat && cat !== 'All' && (
                  <span className="ml-2 text-[11px] opacity-60">
                    {blogs.filter(b => b.category === cat).length}
                  </span>
                )}
              </motion.button>
            ))}
            <span className="ml-auto flex items-center text-[12px] sm:text-[13px] text-gray-400 font-medium self-center">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Blog grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <FiBookOpen size={40} className="mx-auto mb-4 opacity-40" />
                  <p className="font-semibold">No articles in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* First card is featured (full width) */}
                  {featured && (
                    <BlogCard key={featured.id} blog={featured} index={0} featured={true} />
                  )}
                  {/* Rest are standard */}
                  {rest.map((blog, i) => (
                    <BlogCard key={blog.id} blog={blog} index={i + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-[#0c1a12] rounded-[32px] px-10 md:px-16 py-14 overflow-hidden"
          >
            {/* Glows */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.12) 0%, transparent 70%)', transform: 'translate(20%,-40%)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,124,0,0.07) 0%, transparent 70%)', transform: 'translate(-20%,40%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-worknub-green/30 to-transparent" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-md">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
                  <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Newsletter</span>
                </div>
                <h2 className="text-white text-[clamp(1.6rem,2.5vw,2.2rem)] font-extrabold tracking-[-0.02em] leading-tight mb-3">
                  Never miss a post.
                </h2>
                <p className="text-white/50 text-[14px] leading-[1.7]">
                  Get the latest insights, tips, and exclusive Worknub offers straight to your inbox. No spam, ever.
                </p>
              </div>

              <div className="relative w-full md:w-auto shrink-0">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 bg-worknub-green/20 border border-worknub-green/30 rounded-xl px-6 py-4"
                    >
                      <div className="w-8 h-8 bg-worknub-green rounded-full flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-white font-bold text-sm">You're subscribed! 🎉</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubscribe}
                      className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="px-5 py-3.5 rounded-xl text-worknub-dark text-sm font-medium bg-white border-0 outline-none focus:ring-2 focus:ring-worknub-green/40 w-full sm:w-72 placeholder-gray-400"
                      />
                      <button
                        type="submit"                 
                        className="inline-flex items-center justify-center gap-2 bg-worknub-orange text-white px-6 py-3.5 rounded-xl font-black text-sm hover:bg-[#ef6c00] transition-colors whitespace-nowrap shrink-0"
                        style={{ boxShadow: '0 6px 20px rgba(245,124,0,0.35)' }}
                        disabled
                      >
                        Subscribe <FiArrowRight size={14} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
