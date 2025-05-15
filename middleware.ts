import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication and email verification
const PROTECTED_ROUTES = [
  '/vendor/dashboard',
  '/customer/dashboard',
  '/admin/dashboard',
  '/profile',
];

/**
 * Simple middleware to check auth token existence and redirect as needed
 * Note: This is a simplified approach. The actual verification is done in the RouteGuard component
 * which can check authentication state more accurately on the client side.
 */
export function middleware(request: NextRequest) {
  // Check if user is accessing a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check if auth token exists in cookies (simplified check)
    const hasAuthCookie = request.cookies.has('sb-access-token') || 
                         request.cookies.has('sb-refresh-token');

    // If no auth token found, redirect to login
    if (!hasAuthCookie) {
      // Determine which login page to use based on the path
      const isVendorRoute = request.nextUrl.pathname.includes('/vendor');
      const loginPath = isVendorRoute ? '/login/vendor' : '/login/customer';
      
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Continue to the request
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Protected routes that require authentication
    '/vendor/:path*',
    '/customer/:path*',
    '/admin/:path*',
    '/profile',
    // Run on auth routes to support redirects
    '/login/:path*',
    '/signup/:path*',
  ],
};
