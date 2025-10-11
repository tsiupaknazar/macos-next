"use client"

import { useEffect } from "react"
import { useAppearanceStore } from "@/store/ui/appearanceStore";

export function ThemeInitializer() {
    const { theme, setTheme, updateSystemTheme } = useAppearanceStore()

    useEffect(() => {
        setTheme(theme)

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => updateSystemTheme()

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme, setTheme, updateSystemTheme])

    return null
}
