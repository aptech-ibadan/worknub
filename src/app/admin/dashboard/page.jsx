// app/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import StatsCards from "./components/StatsCards";
import BookingModal from "./components/BookingModal";

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

function BlogView() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Productivity');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.blogs || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogs();
  }, []);

  async function fileToHex(file) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageHex = '';
      let imageMime = '';

      if (imageFile) {
        imageHex = await fileToHex(imageFile);
        imageMime = imageFile.type;
      }

      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          readTime,
          imageHex,
          imageMime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog');
      }

      setBlogs((prev) => [data.blog, ...prev]);
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory('Productivity');
      setDate('');
      setReadTime('5 min read');
      setImageFile(null);
      setMessage('Blog post successfully created.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-worknub-dark">Blog Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create blog posts and upload images.</p>
        </div>
        <div className="rounded-full bg-worknub-green/10 px-4 py-2 text-sm font-semibold text-worknub-green">{blogs.length} saved posts</div>
      </div>

      {message && (
        <div className="mb-4 rounded-3xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">{message}</div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              >
                {['Productivity', 'Trends', 'Networking', 'Future of Work', 'Announcements'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                required
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Content</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                required
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Publish date</span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="June 16, 2026"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Read time</span>
              <input
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Featured image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl bg-worknub-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-worknub-green/20 transition hover:bg-[#43a047] disabled:cursor-not-allowed disabled:bg-worknub-green/70"
          >
            {loading ? 'Saving...' : 'Save blog post'}
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-worknub-dark mb-4">Recent blog posts</h3>
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <p className="text-gray-500">No posts yet.</p>
              ) : (
                blogs.slice(0, 6).map((blog) => (
                  <article key={blog._id || blog.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-worknub-dark">{blog.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{blog.category} • {blog.readTime}</p>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembershipView() { return <div className="p-4">Membership Management</div>; }
function OffersView() { return <div className="p-4">Offer Management</div>; }