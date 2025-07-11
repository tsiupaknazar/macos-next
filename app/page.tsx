"use client";

import { useEffect } from "react";
import { useSystemStore } from "@/store/systemStore";
import OffScreen from "@/components/screens/OffScreen";
import LoadingScreen from "@/components/screens/LoadingScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import Desktop from "@/components/screens/Desktop";

export default function Home() {
  const status = useSystemStore((s) => s.status);
  // const status = "desktop"
  // const progress = useSystemStore((s) => s.loadingProgress);
  const updateProgress = useSystemStore((s) => s.updateProgress);
  const showLogin = useSystemStore((s) => s.showLogin);

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
  return (
    <>
      {status === "off" && <OffScreen />}
      {status === "booting" && <LoadingScreen />}
      {status === "login" && <LoginScreen />}
      {status === "desktop" && <Desktop />}
      {status === "lock" && <LoginScreen />}
    </>

  );
}
