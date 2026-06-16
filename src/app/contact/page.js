"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiPhone, FiMail, FiClock, FiSend,
  FiCheckCircle, FiAlertCircle,
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin
} from 'react-icons/fi';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

const contactInfo = [
  {
    icon: FiMapPin,
    title: "Visit Us",
    details: [
      "2nd Floor, Building 2, West One Building,",
      "Beside the office of the Governor's wife",
      "Agodi GRA, Ibadan, Oyo State, Nigeria"
    ],
    color: "worknub-green"
  },
  {
    icon: FiPhone,
    title: "Call Us",
    details: ["+234 707 773 2936"],
    color: "worknub-orange",
    href: "tel:+2347077732936"
  },
  {
    icon: FiMail,
    title: "Email Us",
    details: ["theworknub@gmail.com"],
    color: "worknub-teal",
    href: "mailto:theworknub@gmail.com"
  },
  {
    icon: FiClock,
    title: "Opening Hours",
    details: [
      "Monday - Friday: 8:00 AM - 6:00 PM",
      "Saturday: 9:00 AM - 4:00 PM",
      "Sunday: Closed"
    ],
    color: "worknub-green"
  }
];

const socialLinks = [
  { icon: FiFacebook,  href: "https://www.facebook.com/theworknub",       label: "Facebook",  color: "hover:bg-[#1877F2]" },
  { icon: FiTwitter,   href: "https://x.com/theworknub?s=21",             label: "Twitter",   color: "hover:bg-[#1DA1F2]" },
  { icon: FiInstagram, href: "https://instagram.com/theworknub",          label: "Instagram", color: "hover:bg-[#E4405F]" },
  { icon: SiTiktok,    href: "https://www.tiktok.com/@theworknub",         label: "TikTok",    color: "hover:bg-[#010101]" },
  { icon: FiLinkedin,  href: "https://linkedin.com/in/theworknub",         label: "LinkedIn",  color: "hover:bg-[#0077B5]" },
];

const faqs = [
  { q: "How do I book a workspace?",   a: "Visit the Spaces page on our website or call our support team directly to book." },
  { q: "What are your operating hours?", a: "Monday–Friday 8AM–6PM, Saturday 9AM–4PM. Sunday closed." },
  { q: "Do you offer day passes?",     a: "Yes! Flexible hot desk day passes start at ₦5,700 per day." },
  { q: "Is there parking available?",  a: "Yes, we have secure parking available for members and daily users." },
  { q: "Can I host events at Worknub?",a: "Absolutely — our event space accommodates 50+ people with full support." },
  { q: "What amenities are included?", a: "High-speed WiFi, stable power, free coffee, printing, and 24/7 security." },
];

export default function Contact() {
  /* ── Refs — same pattern as Question component ── */
  const nameRef    = useRef(null);
  const emailRef   = useRef(null);
  const phoneRef   = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const formRef    = useRef(null);

  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(null);
  const [error,    setError]    = useState(null);
  const [focused,  setFocused]  = useState(null);
  const [newsEmail, setNewsEmail] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  /* ── Submit — exact same fetch pattern as Question ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name:    nameRef.current.value,
      email:   emailRef.current.value,
      phone:   phoneRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess("Thank you! We'll get back to you within 24 hours.");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-5 py-3 border rounded-xl focus:outline-none focus:border-worknub-green transition-colors text-worknub-dark placeholder-gray-400";

  const focusedBorder = (field) =>
    focused === field ? "border-worknub-green" : "border-gray-200";

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-worknub-mint">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">Get in Touch</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-extrabold text-worknub-dark mb-3 sm:mb-4 tracking-[-0.02em]">
              Contact Us
            </h1>
            <p className="text-[0.95rem] sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out and let's start a conversation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/2347077732936"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-worknub-green px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-worknub-green/20 hover:bg-[#43a047] transition-colors"
              >
                <SiWhatsapp className="text-xl" />
                Message us on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="py-12 sm:py-16 -mt-6 sm:-mt-8">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl p-6 shadow-lg text-center card-hover ${info.href ? 'cursor-pointer' : ''}`}
                onClick={() => { if (info.href) window.location.href = info.href; }}
              >
                <div className={`w-14 h-14 bg-${info.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`text-${info.color} text-2xl`} />
                </div>
                <h3 className="text-lg font-bold text-worknub-dark mb-2">{info.title}</h3>
                {info.details.map((d, idx) => (
                  <p key={idx} className="text-gray-500 text-sm leading-relaxed">{d}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-20 bg-worknub-mint">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-worknub-dark mb-2 tracking-[-0.01em]">
                Send us a Message
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              {/* Success toast */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm"
                  >
                    <FiCheckCircle className="shrink-0 text-lg" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error toast */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                  >
                    <FiAlertCircle className="shrink-0 text-lg" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-worknub-dark font-medium mb-1.5 text-sm">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="John Doe"
                    required
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focusedBorder("name")}`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-worknub-dark font-medium mb-1.5 text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="john@example.com"
                    required
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focusedBorder("email")}`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-worknub-dark font-medium mb-1.5 text-sm">
                    Phone Number
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="+234 123 456 7890"
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focusedBorder("phone")}`}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-worknub-dark font-medium mb-1.5 text-sm">
                    Subject
                  </label>
                  <input
                    ref={subjectRef}
                    type="text"
                    placeholder="How can we help you?"
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focusedBorder("subject")}`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-worknub-dark font-medium mb-1.5 text-sm">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={5}
                    placeholder="Tell us about your workspace needs..."
                    required
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focusedBorder("message")} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-worknub-green text-white px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-[#3aad35] transition-colors shadow-md shadow-worknub-green/25 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <motion.span
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <><FiSend size={14} /> Send Message</>
                  )}
                </button>
              </form>

              {/* Social links */}
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-gray-400 text-sm mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {socialLinks.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-worknub-dark hover:text-white transition-all duration-300 ${s.color} hover:scale-110`}>
                      <s.icon className="text-lg" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Map + extras ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-80 w-full">
                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.892526328172!2d3.902327974437879!3d7.396575992594624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d8e0d3098c9%3A0x5f5b7e8e0e5c5e5!2sAgodi%20GRA%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%" height="100%"
                    style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Worknub Location"
                  /> */}
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.455664593069!2d3.9126881999999994!3d7.4061821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103993000d9514a9%3A0xdbcb03feaa1073f3!2sWorknub!5e1!3m2!1sen!2sng!4v1781606090794!5m2!1sen!2sng" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <FiMapPin className="text-worknub-green text-xl mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-worknub-dark mb-1">Our Location</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        2nd Floor, Building 2, West One, beside the office of the Governor's wife,<br />
                        Agodi GRA, Ibadan, Oyo State, Nigeria
                      </p>
                    </div>
                  </div>
                  <a href="https://maps.google.com/?q=Agodi+GRA+Ibadan"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-worknub-green font-semibold text-sm hover:text-worknub-orange transition-colors whitespace-nowrap">
                    Get Directions <FiMapPin size={13} />
                  </a>
                </div>
              </div>

              {/* Quick call CTA */}
              <div className="bg-worknub-green text-white rounded-3xl p-6 sm:p-8 text-center">
                <h3 className="text-xl font-extrabold mb-2 tracking-[-0.01em]">Need Immediate Assistance?</h3>
                <p className="mb-6 opacity-85 text-sm">Call our support team for quick answers.</p>
                <a href="tel:+2347077732936"
                  className="inline-flex items-center gap-2 bg-white text-worknub-green px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap">
                  <FiPhone size={14} /> +234 707 773 2936
                </a>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center">
                <h3 className="text-lg font-extrabold text-worknub-dark mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-500 text-sm mb-4">Get updates about events, offers, and workspace news.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors text-sm"
                  />
                  <button
                  disabled
                    onClick={() => { if (newsEmail) { alert('Subscribed!'); setNewsEmail(''); } }}
                    className="bg-worknub-green text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#3aad35] transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id='faq' className="py-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
              <span className="text-worknub-green text-[11px] font-black tracking-[0.12em] uppercase">FAQ</span>
              <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
            </div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold text-worknub-dark mb-3 tracking-[-0.01em]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Find quick answers to common questions.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-50"
              >
                <h3 className="font-bold text-worknub-dark mb-2 text-[15px]">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}