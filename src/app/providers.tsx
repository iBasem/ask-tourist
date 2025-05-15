'use client';

import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { swrOptions } from '@/lib/swr-config';
import { themeConfig } from '@/lib/theme-config';

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
  return (
    <SWRConfig value={swrOptions}>
      <ThemeProvider {...themeConfig}>
        {children}
      </ThemeProvider>
    </SWRConfig>
  );
}
