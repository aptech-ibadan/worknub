import React from 'react'
import { FiUsers } from 'react-icons/fi'

const skeletonWidths = [82, 94, 70, 106, 88]

export default function UsersView() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
          <h1 className="text-2xl font-bold text-worknub-dark">Users</h1>
        </div>
        <div className="w-48 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Skeleton pills */}
      <div className="flex gap-2 mb-5">
        {[48, 88, 68, 76, 96].map((w, i) => (
          <div key={i} className="h-7 bg-gray-100 rounded-full animate-pulse" style={{ width: w }} />
        ))}
      </div>

      {/* Table + overlay */}
      <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-gray-100">
              {['Guest', 'Room', 'Check-in', 'Check-out', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeletonWidths.map((w, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: w }} />
                  </div>
                </td>
                <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-3 w-24 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-3 w-24 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-2xl">
          <div className="w-16 h-16 bg-worknub-mint rounded-2xl flex items-center justify-center mb-4 border border-worknub-green/20">
            <FiUsers size={28} className="text-worknub-green" />
          </div>
          <p className="text-base font-semibold text-worknub-dark mb-1">Users coming soon</p>
          <p className="text-sm text-gray-400 text-center max-w-[210px] leading-relaxed">
            Guest management, check-ins, and booking history will appear here.
          </p>
        </div>
      </div>

      <p className="text-[12px] text-gray-400 mt-3">Showing 0 guests</p>
    </div>
  )
}