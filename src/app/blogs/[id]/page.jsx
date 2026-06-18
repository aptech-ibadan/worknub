"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiCalendar, FiClock, FiTag,
  FiShare2, FiBookOpen, FiLoader, FiAlertCircle,
} from 'react-icons/fi';

/* ── helpers ── */
function imageToDataURL(imageHex, mime) {
  if (!imageHex || !mime) return null;
  try {
    const isBase64 = /[^0-9a-fA-F]/.test(imageHex.replace(/[\r\n\s]/g, ''));
    if (isBase64) return `data:${mime};base64,${imageHex}`;
    const bytes  = new Uint8Array(imageHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
    return `data:${mime};base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

/* ── Category theming ── */
const categoryColors = {
  "Productivity":   { pill: "bg-worknub-green/10 text-worknub-green border-worknub-green/20",   accent: "text-worknub-green",  bar: "bg-worknub-green" },
  "Trends":         { pill: "bg-worknub-orange/10 text-worknub-orange border-worknub-orange/20", accent: "text-worknub-orange", bar: "bg-worknub-orange" },
  "Networking":     { pill: "bg-worknub-teal/10 text-worknub-teal border-worknub-teal/20",       accent: "text-worknub-teal",   bar: "bg-worknub-teal" },
  "Future of Work": { pill: "bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20",               accent: "text-[#7c3aed]",      bar: "bg-[#7c3aed]" },
  "Announcements":  { pill: "bg-red-50 text-red-500 border-red-100",                              accent: "text-red-500",        bar: "bg-red-400" },
};
const fallbackColors = { pill: "bg-gray-100 text-gray-500 border-gray-200", accent: "text-worknub-green", bar: "bg-worknub-green" };

/* ── Render content as paragraphs ── */
function BlogContent({ content }) {
  if (!content) return null;
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return (
    <div className="prose-custom space-y-5">
      {paragraphs.map((para, i) => {
        // Headings: lines starting with # or ##
        if (para.startsWith('## ')) {
          return <h2 key={i} className="text-xl sm:text-2xl font-extrabold text-worknub-dark tracking-[-0.02em] mt-8 mb-2">{para.slice(3)}</h2>;
        }
        if (para.startsWith('# ')) {
          return <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-worknub-dark tracking-[-0.02em] mt-8 mb-2">{para.slice(2)}</h2>;
        }
        // Bullet lists
        if (para.trim().startsWith('- ') || para.trim().startsWith('* ')) {
          const items = para.split('\n').filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={i} className="space-y-2 pl-0">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-600 text-[15px] leading-[1.8]">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-worknub-green shrink-0" />
                  <span>{item.replace(/^[-*]\s/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }
        // Regular paragraph
        return (
          <p key={i} className="text-gray-600 text-[15px] sm:text-base leading-[1.85]">
            {para.replace(/\n/g, ' ')}
          </p>
        );
      })}
    </div>
  );
}

/* ── Share button ── */
function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 hover:border-worknub-green/40 hover:text-worknub-green transition-all"
    >
      <FiShare2 size={14} />
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}

/* ══════════════════════════════════════════
   Main page component
══════════════════════════════════════════ */
export default function BlogDetailPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const [blog,   setBlog]   = useState(null);
  const [others, setOthers] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'error'
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      setStatus('loading');
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setBlog(data.blog || data);
        setStatus('ok');
      } catch {
        // Try fetching all blogs and finding by id
        try {
          const res2 = await fetch('/api/blogs');
          if (res2.ok) {
            const data2 = await res2.json();
            const all   = data2.blogs || [];
            const found = all.find(b => (b._id || b.id)?.toString() === id?.toString());
            if (found) {
              setBlog(found);
              setOthers(all.filter(b => (b._id || b.id)?.toString() !== id?.toString()).slice(0, 3));
              setStatus('ok');
              return;
            }
          }
        } catch {}
        setStatus('error');
      }
    }
    load();
  }, [id]);

  /* Fetch "more posts" once we have the blog */
  useEffect(() => {
    if (!blog || others.length) return;
    async function loadOthers() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          const all  = data.blogs || [];
          setOthers(all.filter(b => (b._id || b.id)?.toString() !== id?.toString()).slice(0, 3));
        }
      } catch {}
    }
    loadOthers();
  }, [blog, id, others.length]);

  /* ── Loading ── */
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <FiLoader className="animate-spin text-worknub-green" size={32} />
          <p className="text-sm font-medium">Loading article…</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (status === 'error' || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-400" size={28} />
          </div>
          <h2 className="text-xl font-extrabold text-worknub-dark mb-2">Article not found</h2>
          <p className="text-gray-400 text-sm mb-6">This post may have been removed or the link is incorrect.</p>
          <Link href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-worknub-green px-5 py-2.5 text-sm font-bold text-white hover:bg-[#3aad35] transition-colors">
            <FiArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const colors  = categoryColors[blog.category] || fallbackColors;
  const imgSrc  = !imgError && blog.imageHex && blog.imageMime
    ? imageToDataURL(blog.imageHex, blog.imageMime)
    : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-20 sm:pt-28 pb-0 bg-white relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2D2D2D 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="container-custom relative max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-worknub-green transition-colors mb-7 group"
            >
              <FiArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-wrap items-center gap-2.5 mb-5"
          >
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-black tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border ${colors.pill}`}>
              <FiTag size={9} /> {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 text-[12px]">
              <FiCalendar size={11} />
              {blog.date || new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5 text-gray-400 text-[12px]">
              <FiClock size={11} /> {blog.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-[clamp(1.7rem,4.5vw,3.2rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-[1.1] mb-5"
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-gray-500 text-base sm:text-lg leading-[1.75] mb-7 max-w-2xl"
            >
              {blog.excerpt}
            </motion.p>
          )}

          {/* Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-3 pb-8 border-b border-gray-100"
          >
            <ShareButton title={blog.title} />
          </motion.div>
        </div>
      </section>

      {/* ── Featured Image ── */}
      {imgSrc ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-custom max-w-4xl pt-8"
        >
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md">
            <img
              src={imgSrc}
              alt={blog.title}
              className="w-full max-h-[460px] object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-custom max-w-4xl pt-8"
        >
          <div className={`rounded-3xl overflow-hidden h-48 sm:h-64 bg-linear-to-br ${
            blog.category === 'Trends' ? 'from-worknub-orange/20 to-worknub-orange/5' :
            blog.category === 'Networking' ? 'from-worknub-teal/20 to-worknub-teal/5' :
            blog.category === 'Future of Work' ? 'from-[#7c3aed]/20 to-[#7c3aed]/5' :
            'from-worknub-green/20 to-worknub-green/5'
          } flex items-center justify-center`}>
            <FiBookOpen className="text-worknub-green/30" size={56} />
          </div>
        </motion.div>
      )}

      {/* ── Article body ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_220px] gap-10 sm:gap-14">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {/* Colored top bar */}
              <div className={`h-1 w-14 rounded-full ${colors.bar} mb-8`} />
              <BlogContent content={blog.content} />

              {/* Bottom CTA */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-worknub-green transition-colors group"
                >
                  <FiArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  All articles
                </Link>
                <ShareButton title={blog.title} />
              </div>
            </motion.div>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block space-y-6">

              {/* About card */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5"
              >
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-3">About this post</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <FiTag className="text-gray-400 mt-0.5 shrink-0" size={13} />
                    <div>
                      <p className="text-[11px] text-gray-400">Category</p>
                      <p className="text-[13px] font-bold text-worknub-dark">{blog.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiCalendar className="text-gray-400 mt-0.5 shrink-0" size={13} />
                    <div>
                      <p className="text-[11px] text-gray-400">Published</p>
                      <p className="text-[13px] font-bold text-worknub-dark">
                        {blog.date || new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiClock className="text-gray-400 mt-0.5 shrink-0" size={13} />
                    <div>
                      <p className="text-[11px] text-gray-400">Read time</p>
                      <p className="text-[13px] font-bold text-worknub-dark">{blog.readTime}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* More posts */}
              {others.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 }}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5"
                >
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-4">More articles</p>
                  <div className="space-y-4">
                    {others.map(other => {
                      const otherId    = other._id || other.id;
                      const otherColor = categoryColors[other.category] || fallbackColors;
                      const otherSrc   = other.imageHex && other.imageMime
                        ? imageToDataURL(other.imageHex, other.imageMime)
                        : null;
                      return (
                        <Link
                          key={otherId}
                          href={`/blogs/${otherId}`}
                          className="flex items-start gap-3 group"
                        >
                          {/* Thumb */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                            {otherSrc ? (
                              <img src={otherSrc} alt={other.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className={`w-full h-full bg-linear-to-br ${
                                other.category === 'Trends'         ? 'from-worknub-orange/20 to-worknub-orange/5' :
                                other.category === 'Networking'     ? 'from-worknub-teal/20 to-worknub-teal/5' :
                                other.category === 'Future of Work' ? 'from-[#7c3aed]/20 to-[#7c3aed]/5' :
                                'from-worknub-green/20 to-worknub-green/5'
                              } flex items-center justify-center`}>
                                <span className="text-[10px] font-black opacity-30">{other.category?.[0]}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-worknub-dark leading-snug line-clamp-2 group-hover:text-worknub-green transition-colors">
                              {other.title}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{other.readTime}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/blogs"
                    className="mt-5 flex items-center gap-1.5 text-[12px] font-bold text-worknub-green hover:gap-2.5 transition-all"
                  >
                    All articles <FiArrowLeft size={11} className="rotate-180" />
                  </Link>
                </motion.div>
              )}

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.48 }}
                className="rounded-2xl bg-[#0c1a12] p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)', transform: 'translate(20%,-30%)' }} />
                <p className="text-white font-extrabold text-[15px] leading-snug mb-2 relative">
                  Work smarter at Worknub
                </p>
                <p className="text-white/50 text-[12px] leading-relaxed mb-4 relative">
                  Modern coworking spaces in Ibadan built for focus and growth.
                </p>
                <Link
                  href="/#spaces"
                  className="inline-flex items-center gap-1.5 bg-worknub-green text-white text-[12px] font-bold px-4 py-2 rounded-xl hover:bg-[#3aad35] transition-colors relative"
                >
                  Explore spaces <FiArrowLeft size={11} className="rotate-180" />
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More posts (mobile) ── */}
      {others.length > 0 && (
        <section className="py-10 bg-gray-50/60 lg:hidden">
          <div className="container-custom">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-5">More articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map(other => {
                const otherId  = other._id || other.id;
                const otherSrc = other.imageHex && other.imageMime
                  ? imageToDataURL(other.imageHex, other.imageMime)
                  : null;
                return (
                  <Link
                    key={otherId}
                    href={`/blogs/${otherId}`}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 p-4 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      {otherSrc ? (
                        <img src={otherSrc} alt={other.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-linear-to-br ${
                          other.category === 'Trends'         ? 'from-worknub-orange/20 to-worknub-orange/5' :
                          other.category === 'Networking'     ? 'from-worknub-teal/20 to-worknub-teal/5' :
                          other.category === 'Future of Work' ? 'from-[#7c3aed]/20 to-[#7c3aed]/5' :
                          'from-worknub-green/20 to-worknub-green/5'
                        } flex items-center justify-center`}>
                          <span className="text-sm font-black opacity-30">{other.category?.[0]}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-extrabold text-worknub-dark leading-snug line-clamp-2 group-hover:text-worknub-green transition-colors">
                        {other.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">{other.readTime}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}