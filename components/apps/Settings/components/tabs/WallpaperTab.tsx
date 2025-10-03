import { useWallpaperStore } from "@/store/wallpaperStore"

import { wallpapers } from "@/data/wallpapers";


export default function WallpaperTab() {
    const { setWallpaper } = useWallpaperStore();

    return (
        <div>
            <h4 className="text-md">Choose a new wallpaper by click on image</h4>
            <div className="border border-red-600 flex flex-wrap overflow-scroll justify-between object-cover gap-2 p-4 h-96">
                {wallpapers.map((url, i) => (
                    <span
                        key={i}
                        onClick={() => setWallpaper(url)}
                    >
                        <img src={url} alt="Wallpaper" className="h-40 w-52 rounded-lg cursor-pointer" />
                    </span>
                ))}
            </div>
        </div>

    )
}