'use client';

import Link from 'next/link';

export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-green-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Check your email</h1>
        
        <p className="text-gray-600">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Didn't receive an email? Check your spam folder or{' '}
            <button className="font-medium text-primary-600 hover:text-primary-500">
              click here to resend
            </button>
          </p>
        </div>
        
        <div className="pt-6">
          <Link 
            href="/"
            className="inline-block text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
