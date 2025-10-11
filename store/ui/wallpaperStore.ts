import { create } from "zustand";
import { persist } from "zustand/middleware";

type WallpaperState = {
  wallpaper: string;
  setWallpaper: (url: string) => void;
};

export const useWallpaperStore = create<WallpaperState>()(
  persist(
    (set) => ({
      wallpaper: "/wallpapers/bg-monterrey.jpg",
      setWallpaper: (url) => set({ wallpaper: url }),
    }),
    {
      name: "wallpaper-store",
    }
  )
);
