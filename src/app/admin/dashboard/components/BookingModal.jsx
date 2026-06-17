// app/dashboard/components/BookingModal.js
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center  justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6  h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Booking</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX size={20} className="text-gray-400" />
              </button>
            </div>

            <form className="space-y-6 h-[80%] overflow-y-scroll">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" placeholder="Enter guest name" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" placeholder="Enter guest name" />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" placeholder="Enter guest name" />
              </div>





              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Space Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green">
                  <option>Hot desk</option>
                  <option>Private desk</option>
                  <option>Private office</option>
                  <option>Meeting room</option>
                  <option>Event space</option>
                  <option>Content Room</option>
                  <option>Corporate suite prime</option>
                  <option>Corporate suite momentum</option>
                  <option>Corporate suite elite</option>
                  
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Offer Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green">
                  <option>Membership</option>
                  <option>Non Member</option>
                  <option>Student</option>
                  <option>Corper</option>
                 
                  
                </select>
              </div>

                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                
                </select>
              </div>


                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" />
                </div>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Price</label>
               <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-worknub-green focus:ring-1 focus:ring-worknub-green" placeholder="Enter guest name" />
              </div>

          

            

              <button className="w-full bg-worknub-green text-white py-2.5 rounded-lg font-medium hover:bg-worknub-dark transition-colors">
                Confirm Booking
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}