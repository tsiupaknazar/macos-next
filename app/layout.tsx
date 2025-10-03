"use client";

// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Mac OS",
//   description: "Your Mac OS system, just in browser",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-default`}
      >
        <SidebarProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </SidebarProvider>
        <div className="flex lg:hidden md:block items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold mb-4">Desktop Only</h1>
            <p className="text-lg">
              This app is only available on desktop screens.
              Please open it on a larger device.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
