import { Suspense } from "react";
import Dock from "../Dock";
import TopBar from "../TopBar";

import WindowWrapper from "../WindowWrapper";

import { useWindowStore } from "@/store/ui/windowStore";
import { useWallpaperStore } from "@/store/ui/wallpaperStore";

export default function Desktop() {
    const windows = useWindowStore((s) => s.windows);
    const wallpaper = useWallpaperStore((s) => s.wallpaper);

    return (
        <div
            className="w-screen h-screen bg-cover bg-center relative transition-all duration-500"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <Suspense fallback={<p className="text-white">System is loading now...</p>}>
                <TopBar />
                {windows.map((w) => (
                    <WindowWrapper key={w.id} {...w} />
                ))}
                <Dock />
            </Suspense>
        </div>
    )
}