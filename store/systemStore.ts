import { create } from "zustand";
import { persist } from "zustand/middleware";

type SystemStatus = "off" | "booting" | "login" | "desktop" | "lock";
type OffReason = "boot" | "sleep";

type SystemState = {
  status: SystemStatus;
  loadingProgress: number;
  offReason: OffReason;

  turnOn: () => void;
  turnOff: (reason: OffReason) => void;
  updateProgress: (value: number) => void;
  showLogin: () => void;
  login: () => void;
  shutdown: () => void;
  sleep: () => void;
  wakeUp: () => void;
  restart: () => void;
  quickBoot: () => void;
};

export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      status: "off",
      loadingProgress: 0,
      offReason: "boot",

      turnOn: () => {
        const reason = get().offReason;
        if (reason === "sleep") {
          set({ status: "login", loadingProgress: 100 });
        } else {
          set({ status: "booting", loadingProgress: 0 });
        }
      },

      turnOff: (reason) => {
        set({ status: "off", loadingProgress: 0, offReason: reason });
      },

      updateProgress: (value) => set({ loadingProgress: value }),
      showLogin: () => set({ status: "login" }),
      login: () => set({ status: "desktop" }),
      shutdown: () => set({ status: "off", loadingProgress: 0, offReason: "boot" }),
      sleep: () => set({ status: "lock" }),
      wakeUp: () => set({ status: "login" }),
      restart: () => set({ status: "booting", loadingProgress: 0 }),
      quickBoot: () => set({ status: "login", loadingProgress: 100 }),
    }),
    {
      name: "system-store",
    }
  )
);

