"use client";

import { useEffect } from "react";
import { useSystemStore } from "@/store/system/systemStore";
import OffScreen from "@/components/screens/OffScreen";
import LoadingScreen from "@/components/screens/LoadingScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import Desktop from "@/components/screens/Desktop";

import { useMediaQuery } from "@/hooks/useMediaQuery";
export default function Home() {
  const status = useSystemStore((s) => s.status);
  const updateProgress = useSystemStore((s) => s.updateProgress);
  const showLogin = useSystemStore((s) => s.showLogin);

  const notDesktopScreen = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (status === "booting") {
      let value = 0;
      const interval = setInterval(() => {
        value += 5;
        updateProgress(value);
        if (value >= 100) {
          clearInterval(interval);
          showLogin();
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  if (notDesktopScreen === null) {
    return null;
  }

  return (
    <>
      {!notDesktopScreen ? (
        <>
          {status === "off" && <OffScreen />}
          {status === "booting" && <LoadingScreen />}
          {status === "login" && <LoginScreen />}
          {status === "desktop" && <Desktop />}
          {status === "lock" && <LoginScreen />}
        </>
      ) : (
        <div className="min-w-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full p-8 text-center">
            <div className="flex items-center justify-start gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            <h1 className="text-3xl font-semibold mb-3">Desktop Only</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Please switch to a larger screen to use this app.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
