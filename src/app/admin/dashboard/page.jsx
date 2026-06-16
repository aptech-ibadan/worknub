// app/dashboard/page.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import StatsCards from "./components/StatsCards";
import BookingModal from "./components/BookingModal";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("front-desk");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onBookNow={() => setIsBookingModalOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Overview */}
          <StatsCards />
          
          {/* Main Content Area */}
          <div className="mt-6">
            {activeTab === "front-desk" && <CalendarView />}
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "guests" && <GuestsView />}
            {activeTab === "rooms" && <RoomsView />}
            {activeTab === "deals" && <DealsView />}
            {activeTab === "rates" && <RatesView />}
            {activeTab === "revenue" && <RevenueView />}
            {activeTab === "blog" && <BlogView />}
            {activeTab === "membership" && <MembershipView />}
            {activeTab === "offers" && <OffersView />}
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}

// Placeholder views for other tabs
function DashboardView() { return <div className="p-4">Dashboard Overview</div>; }
function GuestsView() { return <div className="p-4">Guest Management</div>; }
function RoomsView() { return <div className="p-4">Room Management</div>; }
function DealsView() { return <div className="p-4">Deals & Promotions</div>; }
function RatesView() { return <div className="p-4">Rate Management</div>; }
function RevenueView() { return <div className="p-4">Revenue Dashboard</div>; }
function BlogView() { return <div className="p-4">Blog Management</div>; }
function MembershipView() { return <div className="p-4">Membership Management</div>; }
function OffersView() { return <div className="p-4">Offer Management</div>; }