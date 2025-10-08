import { CustomSlider } from "@/components/Slider";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider"
import { useAppearanceStore } from "@/store/appearanceStore"

type systemMode = "dark" | "light" | "system";

export default function AppearanceTab() {
    const { theme, setTheme, accentColor, setAccentColor, sidebarIconSize, setSidebarIconSize, dockSize, setDockSize } = useAppearanceStore()

    const sizes = ["small", "medium", "large"] as const

    const presetColors = [
        "#3b82f6",
        "#ef4444",
        "#22c55e",
        "#eab308",
        "#a855f7",
        "#ec4899",
        "#f06e03",
        "#6c6c6c",
    ]

    return (
        <div className="w-full h-full px-3 py-2 flex flex-col gap-3">
            <div className="flex justify-between border-b py-2">
                <h2>Appearance</h2>
                <div className="flex gap-3">
                    {["light", "dark", "system"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setTheme(mode as systemMode)}
                            className={`flex flex-col items-center transition-all ${theme === mode ? "opacity-100 scale-105" : "opacity-60 hover:opacity-90"
                                }`}
                        >
                            <div
                                className={`min-w-18 h-10 rounded-md border-2 ${theme === mode ? "border-[var(--accent-color)]" : "border-gray-400"
                                    } ${mode === "dark" ? "bg-neutral-800" : "bg-neutral-100"
                                    }`}
                                style={
                                    theme === mode
                                        ? { borderColor: accentColor }
                                        : undefined
                                }
                            />
                            <p className="capitalize">{mode}</p>
                        </button>
                    ))}
                </div>

            </div>
            <div className="flex items-center justify-between border-b py-2">
                <h2>Accent colour</h2>
                <div className="flex gap-2">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setAccentColor(color)}
                            className="w-5 h-5 rounded-full border transition-all"
                            style={{
                                backgroundColor: color,
                                borderColor: accentColor === color ? "black" : "transparent",
                                transform: accentColor === color ? "scale(1.1)" : "scale(1)",
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between border-b py-2">
                <h2>Sidebar Icon Size</h2>
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" size="sm">
                                {sidebarIconSize.charAt(0).toUpperCase() + sidebarIconSize.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {sizes.map((size) => (
                                <DropdownMenuItem
                                    key={size}
                                    onClick={() => setSidebarIconSize(size)}
                                    className={sidebarIconSize === size ? "font-semibold" : ""}
                                >
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex items-center justify-between border-b py-2">
                <h2>Dock Size</h2>
                <div className="flex">
                    <Slider
                        min={20}
                        max={80}
                        step={4}
                        value={[dockSize]}
                        onValueChange={(val) => setDockSize(val[0])}
                        className="min-w-48"
                    />
                    {/* <CustomSlider
                        defaultValue={dockSize}
                        min={20}
                        max={80}
                        step={4}
                        onChange={(val) => setDockSize(val)}
                        className="min-w-48"
                    /> */}

                    {/* <span className="text-sm text-muted-foreground">Large</span> */}
                </div>
            </div>
        </div>
    )
}