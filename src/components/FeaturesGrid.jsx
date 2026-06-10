"use client";
import { motion } from 'framer-motion';
import { FiWifi, FiZap, FiCoffee, FiPrinter, FiLock, FiUsers } from 'react-icons/fi';

const features = [
  { icon: FiWifi, title: 'High-Speed Internet', desc: '1Gbps fiber optic connection' },
  { icon: FiZap, title: '24/7 Power Supply', desc: 'Never worry about NEPA' },
  { icon: FiCoffee, title: 'Free Coffee', desc: 'Unlimited premium coffee' },
  { icon: FiPrinter, title: 'Printing Services', desc: 'High-quality printing' },
  { icon: FiLock, title: '24/7 Security', desc: 'Secure access 24/7' },
  { icon: FiUsers, title: 'Community Events', desc: 'Networking opportunities' },
];

export default function FeaturesGrid() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-worknub-dark mb-4">Why Choose Worknub?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for productive work in one place
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <feature.icon className="text-worknub-green text-4xl mb-4" />
              <h3 className="text-xl font-bold text-worknub-dark mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}