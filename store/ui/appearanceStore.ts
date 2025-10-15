import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "system"
type SidebarIconSize = "small" | "medium" | "large"

interface AppearanceStore {
    theme: Theme
    accentColor: string
    isDark: boolean
    sidebarIconSize: SidebarIconSize;
    dockSize: number
    terminalTextColor: string
    terminalBgColor: string

    setTheme: (theme: Theme) => void
    setAccentColor: (color: string) => void
    updateSystemTheme: () => void
    setSidebarIconSize: (size: SidebarIconSize) => void
    setDockSize: (size: number) => void
    setTerminalTextColor: (color: string) => void
    setTerminalBgColor: (color: string) => void
}

export const useAppearanceStore = create<AppearanceStore>()(
    persist(
        (set, get) => ({
            theme: "system",
            accentColor: "#3b82f6",
            isDark:
                typeof window !== "undefined"
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    : false,
            sidebarIconSize: "medium",
            dockSize: 72,
            terminalTextColor: "#699111",
            terminalBgColor: "#000",


            setTheme: (theme) => {
                let isDark = false
                if (theme === "system") {
                    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                } else {
                    isDark = theme === "dark"
                }

                document.documentElement.classList.toggle("dark", isDark)
                set({ theme, isDark })
            },

            setAccentColor: (color) => {
                document.documentElement.style.setProperty("--accent-color", color)
                set({ accentColor: color })
            },

            updateSystemTheme: () => {
                const { theme } = get()
                if (theme === "system") {
                    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                    document.documentElement.classList.toggle("dark", isDark)
                    set({ isDark })
                }
            },
            setSidebarIconSize: (size) => set({ sidebarIconSize: size }),
            setDockSize: (size) => set({ dockSize: size }),
            setTerminalTextColor: (color) => set({ terminalTextColor: color }),
            setTerminalBgColor: (color) => set({ terminalBgColor: color }),
        }),
        { name: "theme-settings" }
    )
)
