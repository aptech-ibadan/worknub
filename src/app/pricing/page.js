//import Layout from '../components/Layout';
"use client";
import PricingCard from '../../components/PricingCard';
import { motion } from 'framer-motion';
import { useState } from 'react';

const hotDeskPlans = {
  member: [
    { name: "Daily", price: "3,800", period: "day", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ] },
    { name: "Weekly", price: "18,900", period: "week", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ]},
    { name: "Monthly", price: "75,300", period: "month", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ] },
  ],
  nonMember: [
    { name: "Daily", price: "5,700", period: "day", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ]},
    { name: "Weekly", price: "28,300", period: "week", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ] },
    { name: "Monthly", price: "112,900", period: "month", features: ["Flexible daily access", "Ergonomics chair", "High-speed WiFi", "Networking opportunities" ]},
  ],
};

const privateDeskPlans = {
  member: [
    { name: "Daily", price: "6,000", period: "day", features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"]},
    { name: "Weekly", price: "29,600", period: "week", features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"]},
    { name: "Monthly", price: "118,300", period: "month", features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"] },
  ],
  nonMember: [
    { name: "Daily", price: "8,900", period: "day", features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"] },
    { name: "Weekly", price: "44,400", period: "week", features:["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"] },
    { name: "Monthly", price: "177,500", period: "month", features: ["Flexible daily access", "High-speed WiFi", "Networking opportunities","Dedicated desk + storage", "Priority support"]},
  ],
};

export default function Pricing() {
  const [memberType, setMemberType] = useState('member');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-worknub-mint">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-worknub-dark mb-3 sm:mb-4">Simple, Transparent Pricing</h1>
            <p className="text-[0.95rem] sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works for you. Members save up to 40% on standard rates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Member/Non-Member Toggle */}
      <section className="py-6 sm:py-8 bg-white ">
        <div className="container-custom">
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-[560px] mx-auto">
            <button
              onClick={() => setMemberType('member')}
              className={`min-w-0 flex-1 text-center px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${memberType === 'member' ? 'bg-worknub-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              🏆 Membership
            </button>
            <button
              onClick={() => setMemberType('nonMember')}
              className={`min-w-0 flex-1 text-center px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${memberType === 'nonMember' ? 'bg-worknub-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Standard 
            </button>
          </div>
        </div>
      </section>

      {/* Hot Desk Section */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-worknub-dark">Hot Desk</h2>
            <p className="text-gray-600">Flexible workspace in our shared area</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {(memberType === 'member' ? hotDeskPlans.member : hotDeskPlans.nonMember).map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Private Desk Section */}
      <section className="py-16 bg-worknub-mint">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-worknub-dark">Private Desk</h2>
            <p className="text-gray-600">Your own dedicated workspace</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {(memberType === 'member' ? privateDeskPlans.member : privateDeskPlans.nonMember).map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Student & Corper Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-worknub-dark">Student & Corp Member Discounts</h2>
            <p className="text-gray-600">Special rates for students and NYSC members</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-worknub-mint rounded-2xl p-8 text-center">
              <div className="inline-block bg-worknub-green text-white px-4 py-1 rounded-full text-sm mb-4">40% OFF</div>
              <h3 className="text-2xl font-bold mb-4">Students</h3>
              <div className="space-y-2">
                <p className="text-lg">Daily: <span className="font-bold">₦2,300</span></p>
                <p>Weekly: ₦11,500 | Monthly: ₦46,000</p>
                <p>Flexi Weekly (3 days): ₦6,900</p>
                <p>Flexi Monthly (12 days): ₦27,600</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Valid Student ID required</p>
            </div>
            <div className="bg-worknub-mint rounded-2xl p-8 text-center">
              <div className="inline-block bg-worknub-orange text-white px-4 py-1 rounded-full text-sm mb-4">25% OFF</div>
              <h3 className="text-2xl font-bold mb-4">Corp Members</h3>
              <div className="space-y-2">
                <p className="text-lg">Daily: <span className="font-bold">₦2,900</span></p>
                <p>Weekly: ₦14,500 | Monthly: ₦58,000</p>
                <p>Flexi Weekly (3 days): ₦8,700</p>
                <p>Flexi Monthly (12 days): ₦34,800</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Valid NYSC ID required</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}