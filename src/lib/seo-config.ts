import { DefaultSeoProps } from 'next-seo';

// Base URL for the site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Default SEO configuration for the entire application
export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | Ask Tourist',
  defaultTitle: 'Ask Tourist - Connect with Local Guides for Authentic Experiences',
  description: 'Find and book authentic local travel experiences with trusted guides and vendors around the world.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ask Tourist',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ask Tourist - Connect with Local Guides',
      },
    ],
  },
  twitter: {
    handle: '@askTourist',
    site: '@askTourist',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};
