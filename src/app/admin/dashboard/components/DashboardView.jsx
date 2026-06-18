import React from 'react'
import { FiUsers, FiCalendar, FiTrendingUp, FiStar } from 'react-icons/fi'

const stats = [
  { label: "Total Guests",   value: "—", icon: FiUsers },
  { label: "Bookings Today", value: "—", icon: FiCalendar },
  { label: "Revenue (MTD)",  value: "—", icon: FiTrendingUp },
  { label: "Avg Rating",     value: "—", icon: FiStar },
]

const DashboardView = () => {
  return (
    <div className="p-6 min-h-[500px] flex flex-col">
      <div className="mb-6">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Worknub Admin</p>
        <h1 className="text-2xl font-bold text-worknub-dark">Dashboard</h1>
      </div>

      {/* Stat cards */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} className="text-gray-400" />
              <p className="text-[12px] text-gray-400 font-medium">{label}</p>
            </div>
            <p className="text-2xl font-bold text-worknub-dark">{value}</p>
          </div>
        ))}
      </div> */}

      {/* Coming soon illustration */}
      <div className="flex-1 flex flex-col items-center justify-center border border-gray-100 rounded-2xl py-14 px-6">
        <svg viewBox="0 0 280 180" width="240" height="155" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-5 opacity-80">
          <rect x="30" y="40" width="220" height="130" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1"/>
          <rect x="46" y="58" width="90" height="10" rx="3" fill="#d1d5db"/>
          <rect x="46" y="74" width="60" height="8" rx="3" fill="#e5e7eb"/>
          <rect x="46" y="96" width="26" height="54" rx="4" fill="#4CAF50"/>
          <rect x="79" y="110" width="26" height="40" rx="4" fill="#4CAF50" opacity="0.6"/>
          <rect x="112" y="102" width="26" height="48" rx="4" fill="#4CAF50" opacity="0.8"/>
          <rect x="145" y="116" width="26" height="34" rx="4" fill="#4CAF50" opacity="0.5"/>
          <rect x="186" y="58" width="48" height="48" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="0.5"/>
          <rect x="194" y="68" width="32" height="4" rx="2" fill="#d1d5db"/>
          <rect x="194" y="78" width="24" height="4" rx="2" fill="#e5e7eb"/>
          <rect x="194" y="88" width="28" height="4" rx="2" fill="#e5e7eb"/>
          <rect x="186" y="116" width="48" height="22" rx="5" fill="#4CAF50" opacity="0.12"/>
          <rect x="194" y="122" width="32" height="4" rx="2" fill="#4CAF50" opacity="0.5"/>
          <circle cx="230" cy="28" r="16" fill="#EAF3DE" stroke="#97C459" strokeWidth="1"/>
          <path d="M224 28 l4 4 l8-8" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <p className="text-base font-semibold text-worknub-dark mb-1">Dashboard coming soon</p>
        <p className="text-sm text-gray-400 text-center max-w-xs leading-relaxed">
          Analytics, booking stats, and revenue summaries will appear here.
        </p>
      </div>
    </div>
  )
}

export default DashboardView