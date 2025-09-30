import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { appLibrary } from "@/data/appLibrary";
import { AppId, useWindowStore } from "@/store/windowStore";

export default function Dock() {
    const windows = useWindowStore((s) => s.windows);
    const openApp = useWindowStore((s) => s.openWindow);

    const isAppActive = (appId: string) =>
        windows.some((w) => w.appId === appId && !w.isMinimized);
    const isFocused = (appId: string) =>
        windows.some((w) => w.appId === appId && w.isActive);

    return (
        <div className="absolute bottom-6 w-full flex justify-center pointer-events-none z-50">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 flex gap-4 pointer-events-auto border border-white/30">
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
                                    className="relative w-16 h-16">
                                    <Image
                                        src={app.icon}
                                        alt={app.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>{app.name}</TooltipContent>
                            {/* Active Dot */}
                            {isAppActive(app.id) && (
                                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
                            )}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}