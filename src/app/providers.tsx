'use client';

import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { swrOptions } from '@/lib/swr-config';
import { themeConfig } from '@/lib/theme-config';
import { useAuthStore } from '@/store/authStore';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application-wide client-side providers
 * Wraps the entire application with various context providers:
 * - SWRConfig: For data fetching and caching
 * - ThemeProvider: For dark/light mode theming
 */
export function Providers({ children }: ProvidersProps) {
  // Initialize the auth store when the app loads
  const initAuth = useAuthStore((state) => state.init);
  
  useEffect(() => {
    // Initialize authentication state
    initAuth();
    
    // No cleanup needed - the auth store handles its own subscription cleanup
  }, [initAuth]);

  return (
    <SWRConfig value={swrOptions}>
      <ThemeProvider {...themeConfig}>
        {children}
      </ThemeProvider>
    </SWRConfig>
  );
}
