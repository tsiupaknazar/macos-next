"use client"

import { useState } from "react"
import { Wallpaper, Sun, Eye, Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import DisplayTab from "./tabs/DisplayTab"
import WallpaperTab from "./tabs/WallpaperTab"
import AppearanceTab from "./tabs/AppearanceTab"
import { useAppearanceStore } from "@/store/ui/appearanceStore"
import { LanguagesTab } from "./tabs/LanguagesTab"

const items = [
    { title: "Wallpaper", icon: Wallpaper },
    { title: "Appearance", icon: Eye },
    { title: "Display", icon: Sun },
    { title: "Language", icon: Languages },
]

const iconSizeMap = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
}


export default function SettingsWindow() {
    const [activeTab, setActiveTab] = useState(items[0].title)

    const { accentColor, isDark, sidebarIconSize } = useAppearanceStore();

    const renderContent = () => {
        switch (activeTab) {
            case "Appearance":
                return <AppearanceTab />
            case "Wallpaper":
                return <WallpaperTab />
            case "Display":
                return <DisplayTab />
            case "Languages":
                return <LanguagesTab />
            default:
                return null
        }
    }

    return (
        <div
            className={cn(
                "flex h-screen transition-colors duration-300 no-scrollbar",
                isDark ? "bg-neutral-900 text-gray-100" : "bg-gray-50 text-gray-900"
            )}>
            <aside
                className={cn(
                    "w-40 flex-none h-screen border-r transition-all duration-300 backdrop-blur-md",
                    isDark
                        ? "border-neutral-700 bg-neutral-900/60"
                        : "border-gray-200 bg-white/70"
                )}
                style={{
                    boxShadow: isDark
                        ? "inset -1px 0 0 rgba(255,255,255,0.05)"
                        : "inset -1px 0 0 rgba(0,0,0,0.05)",
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center mt-6 mb-3 px-4">
                        <div className="bg-yellow-600 w-8 h-8 rounded-4xl"></div>
                        <div className="flex flex-col ml-2">
                            <h2 className="font-bold">User Name</h2>
                            <p className={cn("text-xs", isDark ? "opacity-60" : "opacity-70")}>Apple Account</p>
                        </div>
                    </div>

                    <nav className="flex-1 flex flex-col space-y-1 px-2">
                        {items.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.title
                            return (
                                <button
                                    key={item.title}
                                    onClick={() => setActiveTab(item.title)}
                                    className={cn(
                                        "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-white"
                                            : "text-gray-700 dark:text-white hover:bg-gray-200"
                                    )}
                                    style={{
                                        backgroundColor: isActive ? accentColor : "transparent",
                                    }}
                                >
                                    <Icon className={cn(iconSizeMap[sidebarIconSize])} />
                                    <span>{item.title}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 overflow-auto no-scrollbar transition-colors duration-300",
                    isDark ? "bg-neutral-950/40" : "bg-white/70"
                )}
            >
                {renderContent()}
            </main>
        </div>
    )
}