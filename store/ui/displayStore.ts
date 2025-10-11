import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DisplayStore {
  brightness: number;
  manualNightMode: boolean;
  colorFilter: string;
  setBrightness: (value: number) => void;
  toggleManualNightMode: () => void;
  setColorFilter: (filter: string) => void;
}

export const useDisplayStore = create<DisplayStore>()(
   persist(
    (set) => ({
      brightness: 100,
      manualNightMode: false,
      colorFilter: "",
      setBrightness: (value: number) => set({ brightness: value }),
      toggleManualNightMode: () => set((s) => ({ manualNightMode: !s.manualNightMode })),
      setColorFilter: (filter: string) => set({ colorFilter: filter }),
    }),
    {
      name: "brightness-storage",
      partialize: (state) => ({ brightness: state.brightness, manualNightMode: state.manualNightMode }),
    }
  )
);
