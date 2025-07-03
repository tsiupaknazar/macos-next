import { create } from "zustand";

type SystemState = {
    status: "off" | "booting" | "login" | "desktop" | "lock";
    loadingProgress: number;
    turnOn: () => void;
    updateProgress: (value: number) => void;
    showLogin: () => void;
    login: () => void;
    shutdown: () => void;

    sleep: () => void;
    wakeUp: () => void;
    lockSystem: () => void;
};

export const useSystemStore = create<SystemState>((set) => ({
    status: "off",
    loadingProgress: 0,
    turnOn: () => {
        set({ status: "booting", loadingProgress: 0 });
    },
    updateProgress: (value) => {
        set({ loadingProgress: value });
    },
    showLogin: () => set({ status: "login" }),
    login: () => set({ status: "desktop" }),
    shutdown: () => set({ status: "off" }),
    isSleeping: () => set({ status: "login" }),
    sleep: () => set({ status: "off" }),
    wakeUp: () => set({ status: "login" }),
    lockSystem: () => set({ status: "lock" }),
}));
