import { create } from "zustand";

interface LaunchpadState {
  isVisible: boolean;
  searchName: string;
  toggle: () => void;
  show: () => void;
  hide: () => void;
  setSearchName: (text: string) => void;
}

export const useLaunchpadStore = create<LaunchpadState>((set) => ({
  isVisible: false,
  searchName: '',
  toggle: () => set((state) => ({ isVisible: !state.isVisible })),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
  setSearchName: (text) => set({searchName: text})
}));
