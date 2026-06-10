"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiCheckCircle,
  FiAlertCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin
} from 'react-icons/fi';

export default function Contact() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading state
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending message...',
    });

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // This is a simulation - replace with your actual form submission logic
      if (formData.name && formData.email && formData.message) {
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thank you! We\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: '' });
        }, 5000);
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Please fill in all required fields.',
        });
      }
    }, 1000);
  };

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
      color: "worknub-orange"
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: ["theworknub@gmail.com"],
      color: "worknub-teal"
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
    { icon: FiFacebook, href: "https://www.facebook.com/theworknub", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: FiTwitter, href: "https://x.com/theworknub?s=21", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
    { icon: FiInstagram, href: "https://instagram.com/theworknub", label: "Instagram", color: "hover:bg-[#E4405F]" },
    { icon: FiLinkedin, href: "https://linkedin.com/in/theworknub", label: "LinkedIn", color: "hover:bg-[#0077B5]" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-worknub-mint">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-worknub-dark mb-3 sm:mb-4">Contact Us</h1>
            <p className="text-[0.95rem] sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out and let's start a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 -mt-6 sm:-mt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg card-hover text-center"
              >
                <div className={`w-16 h-16 bg-${info.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`text-${info.color} text-2xl`} />
                </div>
                <h3 className="text-xl font-bold text-worknub-dark mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-500 text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-worknub-mint">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-worknub-dark mb-2">Send us a Message</h2>
              <p className="text-gray-500 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

              {/* Form Status Message */}
              {formStatus.submitted && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {formStatus.success ? <FiCheckCircle className="text-xl" /> : <FiAlertCircle className="text-xl" />}
                  <p>{formStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-worknub-dark font-medium mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-worknub-dark font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-worknub-dark font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors"
                    placeholder="+234 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-worknub-dark font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-worknub-dark font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green transition-colors resize-none"
                    placeholder="Tell us about your workspace needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  disabled={formStatus.submitted && !formStatus.success}
                >
                  <FiSend />
                  {formStatus.submitted && !formStatus.success ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-gray-500 mb-4">Follow us on social media</p>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-worknub-dark hover:text-white transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map & Location Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-80 w-full bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.892526328172!2d3.902327974437879!3d7.396575992594624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d8e0d3098c9%3A0x5f5b7e8e0e5c5e5!2sAgodi%20GRA%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Worknub Location Map"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <FiMapPin className="text-worknub-green text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold text-worknub-dark mb-1">Our Location</h3>
                      <p className="text-gray-500 text-sm">
                        2nd Floor, Building 2, West One, beside the office of the governor's wife,<br />
                        Agodi GRA, Ibadan, Oyo State, Nigeria
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Agodi+GRA+Ibadan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-worknub-green font-semibold hover:text-worknub-orange transition-colors"
                  >
                    Get Directions <FiMapPin className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-worknub-green text-white rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="mb-6 opacity-90">Call our support team for quick answers to your questions.</p>
                <a
                  href="tel:+2347077732936"
                  className="inline-flex items-center gap-2 bg-white text-worknub-green px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <FiPhone />
                  +234 707 773 2936
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
                <h3 className="text-xl font-bold text-worknub-dark mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-500 mb-4">Get updates about events, offers, and workspace news.</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-worknub-green"
                  />
                  <button className="btn-primary whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find quick answers to common questions</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How do I book a workspace?",
                a: "You can book a workspace through our website by visiting the Spaces page, or by calling our support team directly."
              },
              {
                q: "What are your operating hours?",
                a: "We're open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 4:00 PM. Sunday is closed."
              },
              {
                q: "Do you offer day passes?",
                a: "Yes! We offer flexible day passes for hot desks starting at ₦5,700 per day."
              },
              {
                q: "Is there parking available?",
                a: "Yes, we have secure parking available for our members and daily users."
              },
              {
                q: "Can I host events at Worknub?",
                a: "Absolutely! We have a dedicated event space that can accommodate up to 50+ people."
              },
              {
                q: "What amenities are included?",
                a: "High-speed WiFi, stable power supply, free coffee, printing services, and 24/7 security are all included and more."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-bold text-worknub-dark mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}