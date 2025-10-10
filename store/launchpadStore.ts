import { create } from "zustand";

interface LaunchpadState {
  isVisible: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

export const useLaunchpadStore = create<LaunchpadState>((set) => ({
  isVisible: false,
  toggle: () => set((state) => ({ isVisible: !state.isVisible })),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));
