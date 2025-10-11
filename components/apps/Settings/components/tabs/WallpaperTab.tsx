import { useWallpaperStore } from "@/store/ui/wallpaperStore"

import { wallpapers } from "@/data/wallpapers";
import Image from "next/image";

export default function WallpaperTab() {
    const { setWallpaper } = useWallpaperStore();

    return (
        <div>
            <div className="flex flex-wrap overflow-scroll justify-between object-cover gap-2 p-4 h-96">
                {wallpapers.map((url, i) => (
                    <span
                        key={i}
                        onClick={() => setWallpaper(url)}
                    >
                        {/* <img src={url} alt="Wallpaper" className="h-40 w-52 rounded-lg cursor-pointer" /> */}
                        <Image src={url} alt="Wallpaper" width={208} height={160} className="h-40 w-52 rounded-lg cursor-pointer" />
                    </span>
                ))}
            </div>
        </div>

    )
}