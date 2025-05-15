'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { RouteGuard } from '@/components/RouteGuard';
import Link from 'next/link';

export default function VendorDashboard() {
  const { profile, user, signOut } = useAuthStore();
  const [stats, setStats] = useState({
    packages: 0,
    bookings: 0,
    reviews: 0,
    inquiries: 0
  });

  useEffect(() => {
    // In a real application, you would fetch these statistics from the API
    // For now, we'll just simulate some data
    setStats({
      packages: 5,
      bookings: 12,
      reviews: 8,
      inquiries: 3
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect is handled automatically by the auth store listener
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <RouteGuard allowedRoles={['vendor']}>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard header */}
        <header className="bg-white shadow">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-xl font-bold text-primary-600">Ask Tourist</span>
            </div>
            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
              <span className="mr-4 text-sm text-gray-700">
                {profile?.name || user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {profile?.name || 'Vendor'}! Here's an overview of your account.
            </p>
          </div>

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Packages stat */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Packages
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.packages}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/vendor/packages" className="font-medium text-primary-600 hover:text-primary-500">
                    Manage packages
                  </Link>
                </div>
              </div>
            </div>

            {/* Bookings stat */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Bookings
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.bookings}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/vendor/bookings" className="font-medium text-primary-600 hover:text-primary-500">
                    View bookings
                  </Link>
                </div>
              </div>
            </div>

            {/* Reviews stat */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reviews Received
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.reviews}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/vendor/reviews" className="font-medium text-primary-600 hover:text-primary-500">
                    View reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* Inquiries stat */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        New Inquiries
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.inquiries}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/vendor/inquiries" className="font-medium text-primary-600 hover:text-primary-500">
                    Respond to inquiries
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <p className="text-gray-500">No recent activities found.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
