import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { appLibrary } from "@/data/appLibrary";
import { AppId, useWindowStore } from "@/store/windowStore";
import { useAppearanceStore } from "@/store/appearanceStore";

export default function Dock() {
    const windows = useWindowStore((s) => s.windows);
    const openApp = useWindowStore((s) => s.openWindow);
    const { dockSize } = useAppearanceStore();

    const isAppActive = (appId: string) =>
        windows.some((w) => w.appId === appId && !w.isMinimized);
    const isMinimized = (appId: string) => 
        windows.some((w) => w.appId === appId && w.isMinimized);
    // const isFocused = (appId: string) =>
    //     windows.some((w) => w.appId === appId && w.isActive);

    const iconSize = dockSize; // direct mapping (e.g. 48–128)
    const dockHeight = iconSize + 24; // background height based on icon size
    const dockPaddingX = Math.max(iconSize * 0.25, 12);
    const dockPaddingY = Math.max(iconSize * 0.15, 8);
    const borderRadius = Math.max(iconSize * 0.35, 12);
    const gap = Math.max(iconSize * 0.25, 12);

    return (
        <div className="absolute bottom-6 w-full flex justify-center pointer-events-none z-50">
            <div
                className="dark:bg-white/20 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 flex gap-4 pointer-events-auto border border-white/30"
                style={{
                    height: dockHeight,
                    padding: `${dockPaddingY}px ${dockPaddingX}px`,
                    borderRadius: borderRadius,
                    gap: gap,
                }}
            >
                {Object.values(appLibrary).map((app) => (
                    <Tooltip key={app.id}>
                        {app.id === "Bin" && (
                            <hr className="h-full border cursor-ns-resize border-gray-200" />
                        )}
                        <div
                            className="flex flex-col items-center group hover:scale-110 transition-transform duration-200 cursor-pointer"
                        >
                            <TooltipTrigger>
                                <div onClick={() => {
                                    if (app.id === "Launchpad") {
                                        alert("Launchpad is not implemented yet.");
                                    } else {
                                        openApp(app.id as AppId);
                                    }
                                }}
                                    className="relative transition-transform duration-200 hover:scale-110"
                                >
                                    <Image
                                        src={app.icon}
                                        alt={app.name}
                                        width={iconSize}
                                        height={iconSize}
                                        className="rounded-md"
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>{app.name}</TooltipContent>
                            {(isMinimized(app.id) || isAppActive(app.id)) && (
                                <span
                                    className="rounded-full transition-all duration-200"
                                    style={{
                                        width: Math.max(iconSize * 0.08, 4),
                                        height: Math.max(iconSize * 0.08, 4),
                                        backgroundColor: "white",
                                    }} />
                            )}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}