'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import type { Profile } from '@/types/auth';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: ('customer' | 'vendor' | 'admin')[];
  requireAuth?: boolean;
}

/**
 * Route guard component that protects routes based on authentication status and user roles
 * @param children - The components to render if access is granted
 * @param allowedRoles - Optional array of roles that are allowed to access the route
 * @param requireAuth - Whether authentication is required (defaults to true)
 */
export function RouteGuard({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading } = useAuthStore();

  // Helper function to check if user has required role
  const hasRequiredRole = (profile: Profile | null, roles: string[]) => {
    if (!profile || roles.length === 0) return false;
    return roles.includes(profile.role);
  };

  useEffect(() => {
    // Skip redirection if still loading
    if (loading) return;

    // If auth is required and user is not authenticated, redirect to login
    if (requireAuth && !user) {
      // Determine which login page to redirect to based on the current URL
      const isVendorRoute = pathname.includes('/vendor');
      const loginRoute = isVendorRoute ? '/login/vendor' : '/login/customer';
      
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      
      router.push(loginRoute);
      return;
    }

    // If specific roles are required, check if user has one of them
    if (user && allowedRoles.length > 0) {
      if (!hasRequiredRole(profile, allowedRoles)) {
        // Redirect based on user's role
        if (profile?.role === 'vendor') {
          router.push('/vendor/dashboard');
        } else if (profile?.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
        return;
      }
    }

    // Check if vendor is approved
    if (user && profile?.role === 'vendor' && !profile.is_approved) {
      router.push('/login/pending-approval');
      return;
    }
  }, [user, profile, loading, allowedRoles, requireAuth, router, pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // If authentication check is complete and user is allowed, render children
  return <>{children}</>;
}
