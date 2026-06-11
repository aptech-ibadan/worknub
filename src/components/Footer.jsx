"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const quickLinks = [
  { name: 'Home',       path: '/' },
  { name: 'Spaces',     path: '/spaces' },
  { name: 'Pricing',    path: '/pricing' },
  { name: 'Gallery',    path: '/gallery' },
  { name: 'Blogs',      path: '/blogs' },
];

const supportLinks = [
  { name: 'Membership',    path: '/membership' },
  { name: 'Student Offer', path: '/offer' },
  { name: 'FAQ',           path: '/faq' },
  { name: 'Contact Us',    path: '/contact' },
];

const socials = [
  { icon: FiFacebook,  href: 'https://www.facebook.com/theworknub', label: 'Facebook' },
  { icon: FiTwitter,   href: 'https://x.com/theworknub?s=21', label: 'Twitter' },
  { icon: FiInstagram, href: 'https://www.instagram.com/theworknub', label: 'Instagram' },
  { icon: SiTiktok,    href: 'https://www.tiktok.com/@theworknub', label: 'TikTok' },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/theworknub/', label: 'LinkedIn' },
];

export default function Footer() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Find your perfect workspace today.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index += 1;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#0f0f0f] text-white relative overflow-hidden">

      {/* ── Decorative top border gradient ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-worknub-green/50 to-transparent" />

      {/* ── Subtle background glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-worknub-green/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* ── Main content ── */}
      <div className="container-custom relative pt-12 sm:pt-16 pb-8 sm:pb-10">

        {/* Top CTA strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/[0.06] mb-8 sm:mb-12">
          <div>
            <p className="text-worknub-green text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase mb-1 sm:mb-2">Ready to get started?</p>
            <h3 className="text-white text-[1.5rem] sm:text-2xl font-extrabold tracking-[-0.02em]">
              {displayText}
              <span className="inline-block w-[1px] h-6 bg-white align-middle ml-1 animate-pulse" />
            </h3>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-worknub-green text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-[13px] sm:text-sm hover:bg-[#43a047] transition-colors shadow-lg shadow-worknub-green/20"
          >
            Book a Tour <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-14">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              {/* <div className="w-9 h-9 bg-worknub-green rounded-xl flex items-center justify-center shadow-md shadow-worknub-green/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div> */}
              {/* <span className="text-[1.3rem] font-extrabold tracking-[-0.02em] font-poppins">
                Work<span className="text-worknub-green">nub</span>
              </span> */}
                   <Image src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png" alt="Logo" width={150} height={100} />
            </Link>

            <p className="text-gray-500 text-[12px] sm:text-[13.5px] leading-[1.8] mb-4 sm:mb-6">
              No.1 Co-working Space in Ibadan. A premium workspace for freelancers, startups, and enterprises in Agodi GRA.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:bg-worknub-green hover:text-white hover:border-worknub-green transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-gray-500 text-[13.5px] hover:text-worknub-green transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-worknub-green transition-all duration-200 rounded-full" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-gray-500 text-[13.5px] hover:text-worknub-green transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-worknub-green transition-all duration-200 rounded-full" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h4 className="text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-5">
              Find Us
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-worknub-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin size={14} className="text-worknub-green" />
                </div>
                <span className="text-gray-500 text-[12px] sm:text-[13px] leading-[1.7]">
                  2nd Floor, Building 2, West One, beside Governor's wife office, Agodi GRA, Ibadan, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-worknub-green/10 flex items-center justify-center shrink-0">
                  <FiPhone size={14} className="text-worknub-green" />
                </div>
                <a href="tel:+2347077732936" className="text-gray-500 text-[12px] sm:text-[13px] hover:text-worknub-green transition-colors">
                  +234 707 773 2936
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-worknub-green/10 flex items-center justify-center shrink-0">
                  <FiMail size={14} className="text-worknub-green" />
                </div>
                <a href="mailto:theworknub@gmail.com" className="text-gray-500 text-[12px] sm:text-[13px] hover:text-worknub-green transition-colors">
                  theworknub@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-600 text-[11px] sm:text-xs text-center sm:text-left">
            © 2026 Worknub. All rights reserved. No.1 Co-working Space in Ibadan.
          </p>
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-gray-600 text-center sm:text-left">
            <span>Follow us </span>
            <a
              href="https://instagram.com/theworknub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-worknub-green font-semibold hover:underline"
            >
              @theworknub
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
