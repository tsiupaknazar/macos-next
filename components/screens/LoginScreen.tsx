import { useSystemStore } from "@/store/system/systemStore";
import { useState } from "react";

import { useWallpaperStore } from "@/store/ui/wallpaperStore";

export default function LoginScreen() {
    const login = useSystemStore((state) => state.login);
    const wallpaper = useWallpaperStore((s) => s.wallpaper);

    const dateNow = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const now = new Date();

    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });

    const date = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const formattedDate = `${date} ${month}`;


    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (password === "1234") {
                login();
            } else {
                setError("Wrong password, please try again")
            }
        }
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center py-10 text-white flex flex-col items-center justify-between"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <h6 className="text-xl font-bold">{`${dayOfWeek}, ${formattedDate}`}</h6>
                <h2 className="text-8xl font-black">{dateNow}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-4xl bg-amber-300"></div>
                <input
                    type="password"
                    className="px-4 py-2 rounded-2xl bg-gray-800 text-white outline-0"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleLogin}
                />
                {error && <span>{error}</span>}
            </div>
        </div >
    )
}