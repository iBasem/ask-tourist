import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DefaultSeo } from "next-seo";
import { Providers } from "./providers";
import { defaultSEOConfig } from "@/lib/seo-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ask Tourist - Connect with Local Guides for Authentic Experiences",
  description: "Find and book authentic local travel experiences with trusted guides and vendors around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DefaultSeo {...defaultSEOConfig} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
