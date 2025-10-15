import { appLibrary } from "@/data/appLibrary";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppId = string;

export type WindowData = {
  id: string;
  appId: AppId;
  isActive: boolean;
  isMinimized: boolean;
  isFullScreen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  fixedSize?: boolean;
};
type WindowState = {
  windows: WindowData[];
  activeWindow: () => WindowData | undefined;
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, changes: Partial<WindowData>) => void;
  fullScreen: (id: string) => void;
  showMinimizedWindows: (id: string) => void;
};

export const useWindowStore = create<WindowState>()(
  persist(
    (set, get) => ({
      windows: [],

      activeWindow: () => get().windows.find((w) => w.isActive),

      openWindow: (appId) =>
        set((state) => {
          const existingWindow = state.windows.find((w) => w.appId === appId);

          if (existingWindow && existingWindow.isMinimized) {
            return {
              windows: state.windows.map((w) =>
                w.id === existingWindow.id
                  ? { ...w, isMinimized: false, isActive: true }
                  : { ...w, isActive: false }
              ),
            };
          }

          if (existingWindow && !existingWindow.isMinimized) {
            return {
              windows: state.windows.map((w) => ({
                ...w,
                isActive: w.id === existingWindow.id,
              })),
            };
          }

          // 3️⃣ Otherwise → create a new window
          const appEntry = Object.values(appLibrary).find((a) => a.id === appId);

          const newWindow: WindowData = {
            id: crypto.randomUUID(),
            appId,
            isActive: true,
            isMinimized: false,
            isFullScreen: false,
            position: { x: 100, y: 100 },
            size: appEntry?.defaultSize ?? { width: 600, height: 400 },
            fixedSize: !!appEntry?.fixedSize,
          };

          return {
            windows: [
              ...state.windows.map((w) => ({ ...w, isActive: false })),
              newWindow,
            ],
          };
        }),

      closeWindow: (id) =>
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id),
        })),

      minimizeWindow: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
        })),

      focusWindow: (id) =>
        set((state) => ({
          windows: state.windows.map((w) => ({
            ...w,
            isActive: w.id === id,
          })),
        })),

      updateWindow: (id, changes) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, ...changes } : w
          ),
        })),

      fullScreen: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isFullScreen: !w.isFullScreen } : w
          ),
        })),
      showMinimizedWindows: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, isActive: true }
              : { ...w, isActive: false }
          ),
        })),
    }),
    {
      name: "window-store",
      partialize: (state) => ({ windows: state.windows }),
    }
  )
);
