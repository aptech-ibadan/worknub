// app/dashboard/components/Header.js
"use client";
import { useState } from "react";
import { FiSearch, FiBell, FiUser, FiMenu } from "react-icons/fi";

export default function Header({ onBookNow }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left - Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for spaces and offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green transition-colors"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="/avatar-placeholder.jpg" alt="User" className="w-full h-full object-cover" />
            </div>
          </button>

          <button 
            onClick={onBookNow}
            className="bg-worknub-green text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-worknub-dark transition-colors"
          >
            Create booking
          </button>
        </div>
      </div>
    </header>
  );
}