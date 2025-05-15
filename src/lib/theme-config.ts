import { ThemeProviderProps } from 'next-themes';

// Theme configuration using next-themes
export const themeConfig: ThemeProviderProps = {
  attribute: 'class',
  defaultTheme: 'system',
  enableSystem: true,
  disableTransitionOnChange: false,
};
