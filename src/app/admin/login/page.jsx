'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-xl p-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-worknub-green font-bold uppercase tracking-[0.2em] mb-2">Admin login</p>
          <h1 className="text-3xl font-extrabold text-worknub-dark">Access the dashboard</h1>
          <p className="text-gray-500 mt-3">Sign in to create blog posts and manage admin content.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="admin"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-worknub-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-worknub-green/20 transition hover:bg-[#43a047] disabled:cursor-not-allowed disabled:bg-worknub-green/70"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
