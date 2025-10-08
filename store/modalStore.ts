import { create } from "zustand"

interface ModalStore {
  systemInfoOpen: boolean
  openSystemInfo: () => void
  closeSystemInfo: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  systemInfoOpen: false,
  openSystemInfo: () => set({ systemInfoOpen: true }),
  closeSystemInfo: () => set({ systemInfoOpen: false }),
}))
