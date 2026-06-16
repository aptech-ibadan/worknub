// app/admin/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import StatsCards from "./components/StatsCards";
import BookingModal from "./components/BookingModal";
import BlogView from "./components/BlogView"; // ← Import BlogView

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("front-desk");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function validateAuth() {
      try {
        const res = await fetch('/api/auth/validate', { credentials: 'same-origin' });
        if (!res.ok) throw new Error('Unauthorized');
      } catch (error) {
        router.push('/admin/login');
        return;
      }
      setAuthChecking(false);
    }

    validateAuth();
  }, [router]);

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-sm text-gray-700">
        Checking admin access…
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onBookNow={() => setIsBookingModalOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <StatsCards />
          
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

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}

// ─── PLACEHOLDER VIEWS ──────────────────────────────────────────────────────
function DashboardView() { return <div className="p-4">Dashboard Overview</div>; }
function GuestsView() { return <div className="p-4">Guest Management</div>; }
function RoomsView() { return <div className="p-4">Room Management</div>; }
function DealsView() { return <div className="p-4">Deals & Promotions</div>; }
function RatesView() { return <div className="p-4">Rate Management</div>; }
function RevenueView() { return <div className="p-4">Revenue Dashboard</div>; }
function MembershipView() { return <div className="p-4">Membership Management</div>; }
function OffersView() { return <div className="p-4">Offer Management</div>; }