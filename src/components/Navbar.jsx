"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { name: 'Home',       path: '/' },
  { name: 'Spaces',     path: '/spaces' },
  { name: 'Pricing',    path: '/pricing' },
  { name: 'Offer',      path: '/offer' },
  { name: 'Gallery',    path: '/gallery' },
  { name: 'Blog',      path: '/blogs' },
  { name: 'Membership', path: '/membership' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-2'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png" alt="Logo" width={120} height={80} className="sm:w-[150px] sm:h-auto" />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3.5 py-2 text-[13.5px] font-semibold rounded-lg transition-colors duration-200 ${
                    active
                      ? 'text-worknub-green bg-worknub-green/8'
                      : 'text-gray-600 hover:text-worknub-dark hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                  {/* Active underline dot */}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-worknub-green" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-worknub-green text-white text-[13px] font-bold px-4 py-2.5 rounded-lg hover:bg-[#43a047] transition-colors shadow-md shadow-worknub-green/25"
            >
              Contact Us <FiArrowRight size={13} />
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-worknub-dark"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{    opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
            >
              <div className="pt-3 pb-5 border-t border-gray-100 mt-3 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors ${
                          active
                            ? 'text-worknub-green bg-worknub-green/8'
                            : 'text-gray-600 hover:text-worknub-dark hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-worknub-green" />}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-gray-100">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-worknub-green text-white py-3 px-5 rounded-xl font-bold text-sm hover:bg-[#43a047] transition-colors"
                  >
                    Contact Us <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
