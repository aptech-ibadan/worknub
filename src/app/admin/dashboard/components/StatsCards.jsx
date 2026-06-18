// app/dashboard/components/StatsCards.js
"use client";
import { motion } from "framer-motion";
import { FiUsers, FiCalendar, FiMoney, FiStar } from "react-icons/fi";
import { BsCashStack } from 'react-icons/bs'
const stats = [
  { label: "Total Guests", value: "-", icon: FiUsers, change: "- %", color: "text-blue-600" },
  { label: "Bookings Today", value: "-", icon: FiCalendar, change: "- %", color: "text-green-600" },
  { label: "Revenue (MTD)", value: "-", icon: BsCashStack, change: "- %", color: "text-purple-600" },
  { label: "Avg Rating", value: "-", icon: FiStar, change: "- %", color: "text-yellow-600" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg`}>
                <Icon className={stat.color} size={24} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}