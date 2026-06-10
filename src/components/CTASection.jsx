"use client";
import Link from "next/link";
import { FiCalendar, FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const contacts = [
  { icon: FiMapPin, text: "Agodi GRA, Ibadan" },
  { icon: FiPhone,  text: "+234 7077732936" },
  { icon: FiMail,   text: "theworknub@gmail.com" },
];

export default function CTASection() {
  return (
    <section className="bg-worknub-green py-12 sm:py-16 lg:py-20 px-[5vw] text-center">
      <div className="max-w-[680px] mx-auto">
        <h2 className="text-white text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold tracking-[-0.02em] mb-3">
          Ready to Find Your Perfect Workspace?
        </h2>
        <p className="text-white/75 text-[0.95rem] sm:text-base mb-8 sm:mb-9">
          Book a free tour today and experience the Worknub difference. No commitment required.
        </p>
        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
          <Link href="/spaces" className="bg-white text-worknub-green px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg font-bold text-[13px] sm:text-sm no-underline inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            Book a Tour <FiCalendar size={14} />
          </Link>
          <a href="https://wa.me/2347077732936" target="_blank" rel="noreferrer" className="bg-transparent text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg font-bold text-[13px] sm:text-sm no-underline inline-flex items-center gap-1.5 border-2 border-white/40 hover:bg-white/10 transition-colors">
            Talk to Sales <FiPhone size={14} />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8 sm:mt-10 pt-8 border-t border-white/20">
          {contacts.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center sm:justify-start gap-1.5 text-white/70 text-[12px] sm:text-[13px]">
              <Icon size={13} /> {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}