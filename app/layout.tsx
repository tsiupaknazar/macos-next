"use client";

// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { useDisplayStore } from "@/store/displayStore";
import { InfoModal } from "@/components/InfoModal";
import LaunchpadOverlay from "@/components/LaunchpadOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
              <InfoModal />
              <LaunchpadOverlay />
              {children}
            </ClientWrapper>
          </SidebarProvider>
      </body>
    </html>
  );
}
