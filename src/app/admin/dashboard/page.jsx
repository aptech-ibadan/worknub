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
import DashboardView from "./components/DashboardView";
import GuestsView from "./components/UsersView";
import SpacesView from "./components/SpacesView";
import OffersView from "./components/OffersView";
import RatesView from "./components/RatesView";
import RevenueView from "./components/RevenueView";
import MembershipView from "./components/MembershipView";
import UsersView from "./components/UsersView";

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
            {activeTab === "users" && <UsersView />}
            {activeTab === "spaces" && <SpacesView />}
            {activeTab === "deals" && <OffersView />}
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
