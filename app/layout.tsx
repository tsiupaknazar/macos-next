"use client";

// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeInitializer } from "@/components/ThemeInitializer";

import { useDisplayStore } from "@/store/displayStore";

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
  const { brightness } = useDisplayStore();
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-default`}
        style={{ filter: `brightness(${brightness}%` }}
      >
        <SidebarProvider>
          <ClientWrapper>
            <ThemeInitializer />
            {children}
          </ClientWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
