import React from 'react'
import { FiGift } from 'react-icons/fi'

const skeletonCards = [0, 1, 2, 3, 4, 5]

export default function OffersView() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
          <h1 className="text-2xl font-bold text-worknub-dark">Offers</h1>
        </div>
        <div className="w-32 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Skeleton cards + overlay */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skeletonCards.map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
              <div className="w-full h-28 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-3/5" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-4/5" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-2/5" />
              <div className="flex items-center justify-between mt-1">
                <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-7 w-20 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-2xl">
          <div className="w-16 h-16 bg-worknub-mint rounded-2xl flex items-center justify-center mb-4 border border-worknub-green/20">
            <FiGift size={28} className="text-worknub-green" />
          </div>
          <p className="text-base font-semibold text-worknub-dark mb-1">Offers coming soon</p>
          <p className="text-sm text-gray-400 text-center max-w-[210px] leading-relaxed">
            Discounts, promotions, and special deals will be managed here.
          </p>
        </div>
      </div>
    </div>
  )
}