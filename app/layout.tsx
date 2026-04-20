import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import AuthProvider from "./context/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 IMPORTANT: change this when you buy domain
const baseUrl = "https://goalcraft-1.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "GoalCraft",
    template: "%s | GoalCraft",
  },

  description: "Share and explore real interview experiences",

  // 🔥 ICONS
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // 🔥 OPEN GRAPH (WHATSAPP / LINKEDIN)
  openGraph: {
    title: "GoalCraft",
    description: "Share and explore real interview experiences",
    url: baseUrl,
    siteName: "GoalCraft",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoalCraft Preview",
      },
    ],
    type: "website",
  },

  // 🔥 TWITTER
  twitter: {
    card: "summary_large_image",
    title: "GoalCraft",
    description: "Share and explore real interview experiences",
    images: ["/og-image.png"],
  },

  // 🔥 SEO BONUS
  keywords: [
    "interview experiences",
    "placement preparation",
    "DSA interview",
    "coding interview",
    "SDE preparation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

          {/* TOAST */}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}