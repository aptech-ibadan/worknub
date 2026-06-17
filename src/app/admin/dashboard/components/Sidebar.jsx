"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    FiHome, FiCalendar, FiUsers, FiKey, FiTag, FiDollarSign,
    FiTrendingUp, FiEdit, FiAward, FiGift, FiSettings, FiMenu, FiX
} from "react-icons/fi";
import { BsCashStack } from 'react-icons/bs'

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "front-desk", label: "Front desk", icon: FiCalendar },
    { id: "users", label: "Users", icon: FiUsers },
    { id: "blog", label: "Blog", icon: FiEdit },
    { id: "offers", label: "Offers", icon: FiGift },
    { id: "membership", label: "Membership", icon: FiAward },
    { id: "spaces", label: "Spaces", icon: FiKey },
    // { id: "rates", label: "Rate", icon: BsCashStack },
    { id: "revenue", label: "Revenue", icon: FiTrendingUp },

];

export default function Sidebar({ activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* ── Mobile Top Bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
                <Image
                    src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png"
                    alt="Worknub Logo"
                    width={90}
                    height={60}
                    className="w-[75px] h-auto drop-shadow-md"
                    priority
                />
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                </button>
            </div>

            {/* ── Mobile Overlay ── */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Mobile Drawer ── */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: mobileOpen ? 0 : -280 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col pt-1"
            >
                 <Image
                            src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png"
                            alt="Worknub Logo"
                            width={110}
                            height={74}
                            className="w-[90px] ml-4 mt-4 h-auto drop-shadow-md"
                            priority
                        />

                <MobileNav
                    activeTab={activeTab}
                    setActiveTab={(id) => { setActiveTab(id); setMobileOpen(false); }}
                />
            </motion.aside>

            {/* ── Desktop Sidebar ── */}
            <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>

                
                        

                {/* Logo + Collapse Toggle */}
                <div className={`p-4 flex items-center border-b border-gray-100 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && (
                        <Image
                            src="https://res.cloudinary.com/ddldviftf/image/upload/v1780995845/green_and_green_favicon_micadb.png"
                            alt="Worknub Logo"
                            width={110}
                            height={74}
                            className="w-[90px] h-auto drop-shadow-md"
                            priority
                        />
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
                    >
                        {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                title={collapsed ? item.label : undefined}
                                className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                                    ${collapsed ? 'justify-center' : ''}
                                    ${isActive
                                        ? "bg-worknub-mint text-worknub-green"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ml-1 bg-worknub-green" />
                                )}
                                <Icon size={18} className={isActive ? "text-worknub-green" : "text-gray-400"} />
                                {!collapsed && <span>{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Settings */}
                <div className="p-3 border-t border-gray-200">
                    <button
                        title={collapsed ? "Settings" : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
                    >
                        <FiSettings size={18} />
                        {!collapsed && <span>Settings</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

// Shared nav list for mobile drawer
function MobileNav({ activeTab, setActiveTab }) {
    return (
        <>
         
            <nav className="flex-1 px-4 py-4  space-y-1">
               

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "bg-worknub-mint text-worknub-green"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-worknub-green" />
                            )}
                            <Icon size={18} className={isActive ? "text-worknub-green" : "text-gray-400"} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                    <FiSettings size={18} />
                    Settings
                </button>
            </div>
        </>
    );
}