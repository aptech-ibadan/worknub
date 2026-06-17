import React from 'react'
import { FiAward } from 'react-icons/fi'

const statCards = ['Total members', 'Active this month', 'Renewals due', 'Revenue (MTD)']
const skeletonCards = [0, 1, 2, 3, 4, 5]

export default function MembershipView() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
          <h1 className="text-2xl font-bold text-worknub-dark">Membership</h1>
        </div>
        <div className="w-36 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Skeleton stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {statCards.map((label, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <p className="text-[12px] text-gray-400 mb-2">{label}</p>
            <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Skeleton tier cards + overlay */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skeletonCards.map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="h-1.5 w-full bg-gray-100 animate-pulse" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 w-2/5 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-1/3 bg-gray-100 rounded animate-pulse" />
                <div className="pt-3 border-t border-gray-50 flex flex-col gap-2">
                  <div className="h-3 w-11/12 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-10/12 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-8 w-full bg-gray-100 rounded-lg animate-pulse mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-2xl">
          <div className="w-16 h-16 bg-worknub-mint rounded-2xl flex items-center justify-center mb-4 border border-worknub-green/20">
            <FiAward size={28} className="text-worknub-green" />
          </div>
          <p className="text-base font-semibold text-worknub-dark mb-1">Membership coming soon</p>
          <p className="text-sm text-gray-400 text-center max-w-[210px] leading-relaxed">
            Member tiers, subscriptions, and loyalty tracking will be managed here.
          </p>
        </div>
      </div>
    </div>
  )
}