'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          roles: [formData.role],
        }),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        let errorMessage = 'Signup failed';
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-xl p-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-worknub-green font-bold uppercase tracking-[0.2em] mb-2">Create account</p>
          <h1 className="text-3xl font-extrabold text-worknub-dark">Admin Sign Up</h1>
          <p className="text-gray-500 mt-3">Create your admin account to manage content.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="John Doe"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="johndoe"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="john@example.com"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-worknub-dark outline-none focus:border-worknub-green focus:ring-2 focus:ring-worknub-green/20"
              placeholder="••••••••"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/admin/login" className="text-worknub-green font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}