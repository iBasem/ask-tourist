'use client';

import Link from 'next/link';

export default function PendingApproval() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-yellow-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Awaiting Approval</h1>
        
        <p className="text-gray-600">
          Your vendor account has been created and is currently pending approval by our team. 
          This helps us ensure the quality of services offered on our platform.
        </p>
        
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            We'll send you an email once your account has been approved. 
            This usually takes 1-2 business days.
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
