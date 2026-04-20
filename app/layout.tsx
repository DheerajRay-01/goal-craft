import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import AuthProvider from "./context/AuthProvider";
import Navbar from "@/components/Navbar";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoalCraft",
  description: "Share and explore real interview experiences",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar  />

          <main>
            {children}
          </main>

          <Footer/>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}