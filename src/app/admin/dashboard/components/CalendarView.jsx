// app/dashboard/components/CalendarView.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";

const statusColors = {
  'Due in': 'bg-orange-100 text-orange-600 border-orange-200',
  'Checked out': 'bg-blue-100 text-blue-600 border-blue-200',
  'Due out': 'bg-red-100 text-red-600 border-red-200',
  'Checked in': 'bg-green-100 text-green-600 border-green-200',
};

const bookings = [
  { id: 1, name: "Lewis", status: "Due in", start: 2, end: 5, room: "101" },
  { id: 2, name: "Mark", status: "Checked out", start: 3, end: 6, room: "102" },
  { id: 3, name: "Tate", status: "Checked out", start: 1, end: 4, room: "103" },
  { id: 4, name: "Andrew", status: "Due out", start: 8, end: 11, room: "104" },
  { id: 5, name: "Lewis", status: "Checked out", start: 9, end: 12, room: "105" },
  { id: 6, name: "Manson", status: "Due in", start: 4, end: 7, room: "106" },
  { id: 7, name: "Mike", status: "Checked out", start: 6, end: 9, room: "107" },
  { id: 8, name: "Bruce", status: "Due out", start: 2, end: 5, room: "108" },
  { id: 9, name: "Mave", status: "Checked in", start: 9, end: 12, room: "109" },
  { id: 10, name: "Otis", status: "Due in", start: 5, end: 8, room: "110" },
  { id: 11, name: "Black", status: "Due out", start: 1, end: 3, room: "111" },
  { id: 12, name: "White", status: "Checked in", start: 10, end: 12, room: "112" },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const days = Array.from({ length: 12 }, (_, i) => i + 1);

export default function CalendarView() {
  const [activeMonth, setActiveMonth] = useState("Feb");
  const [roomSearch, setRoomSearch] = useState("");

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Front desk</span>
          <div className="flex gap-2">
            {Object.entries(statusColors).map(([status, className]) => (
              <span key={status} className={`px-3 py-1 rounded-md text-xs font-medium border ${className}`}>
                {status}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by room number"
              value={roomSearch}
              onChange={(e) => setRoomSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-worknub-green transition-colors w-48"
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative">
        {/* Month headers */}
        <div className="flex border-b border-gray-200">
          <div className="w-20 flex-shrink-0 border-r border-gray-200"></div>
          {months.map((month) => (
            <div key={month} className="flex-1 text-center py-3 text-sm text-gray-500">
              <button
                onClick={() => setActiveMonth(month)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  activeMonth === month 
                    ? "bg-blue-50 text-blue-600 border border-blue-200 font-medium" 
                    : "hover:text-gray-700"
                }`}
              >
                {month}
              </button>
            </div>
          ))}
        </div>

        {/* Days header */}
        <div className="flex border-b border-gray-200">
          <div className="w-20 flex-shrink-0 border-r border-gray-200 bg-gray-50"></div>
          {days.map((day) => (
            <div key={day} className="flex-1 text-center py-2 text-sm text-gray-400 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Bookings */}
        <div className="relative min-h-[400px]">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: booking.id * 0.05 }}
              className="absolute rounded-lg px-3 py-2 text-xs font-medium shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              style={{
                top: `${20 + (booking.id % 5) * 70}px`,
                left: `${(booking.start - 1) * (100/12)}%`,
                width: `${(booking.end - booking.start) * (100/12)}%`,
                backgroundColor: booking.status === 'Due in' ? '#FFF7ED' : 
                               booking.status === 'Checked out' ? '#EFF6FF' :
                               booking.status === 'Due out' ? '#FEF2F2' : '#ECFDF5',
                border: `1px solid ${
                  booking.status === 'Due in' ? '#FED7AA' :
                  booking.status === 'Checked out' ? '#BFDBFE' :
                  booking.status === 'Due out' ? '#FCA5A5' : '#6EE7B7'
                }`,
                color: booking.status === 'Due in' ? '#EA580C' :
                       booking.status === 'Checked out' ? '#2563EB' :
                       booking.status === 'Due out' ? '#DC2626' : '#059669'
              }}
            >
              {booking.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}