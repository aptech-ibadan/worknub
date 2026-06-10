"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

export default function PricingCard({ plan, isPopular = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-3xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl ${
        isPopular
          ? 'border-2 border-worknub-orange shadow-lg shadow-worknub-orange/10'
          : 'border border-gray-100 shadow-sm'
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-4 right-4 bg-worknub-orange text-white text-[11px] font-bold tracking-[0.06em] uppercase px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Top accent strip */}
      <div className={`h-1 w-full ${isPopular ? 'bg-worknub-orange' : 'bg-worknub-green'}`} />

      {/* Header */}
      <div className="px-7 pt-7 pb-5">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-1">{plan.period}</p>
        <h3 className="text-xl font-extrabold text-worknub-dark tracking-[-0.01em]">{plan.name}</h3>
        {plan.description && (
          <p className="text-gray-500 text-[13px] mt-1.5 leading-[1.6]">{plan.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="px-7 pb-6 border-b border-gray-100">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-400 text-lg font-semibold">₦</span>
          <span className={`text-4xl font-black tracking-[-0.03em] ${isPopular ? 'text-worknub-orange' : 'text-worknub-green'}`}>
            {plan.price}
          </span>
          <span className="text-gray-400 text-sm">/ {plan.period}</span>
        </div>
        {plan.originalPrice && (
          <p className="text-xs text-gray-400 line-through mt-1">₦{plan.originalPrice} / {plan.period}</p>
        )}
      </div>

      {/* Features */}
      <div className="px-7 py-6 flex-1">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-gray-400 mb-4">What's included</p>
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-600 text-[13.5px]">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                isPopular ? 'bg-worknub-orange/10' : 'bg-worknub-green/10'
              }`}>
                <FiCheck
                  size={10}
                  className={isPopular ? 'text-worknub-orange' : 'text-worknub-green'}
                  strokeWidth={3}
                />
              </span>
             
                      {feature}
            
            
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-7 pb-7">
        <Link
          href="/contact"
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
            isPopular
              ? 'bg-worknub-orange text-white hover:bg-[#ef6c00]'
              : 'bg-worknub-dark text-white hover:opacity-90'
          }`}
        >
          Get Started <FiArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
