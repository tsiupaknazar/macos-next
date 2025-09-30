'use client';
import { cn } from "@/lib/utils";

export default function SettingsWindow() {
    return (
        <div className={cn("w-[500px] h-[350px] bg-white rounded-xl shadow-lg p-4")}>
            <h1 className="text-xl font-bold mb-4">Settings</h1>
            <ul className="space-y-2">
                <li>Theme</li>
                <li>Wallpaper</li>
                <li>🔔 Сповіщення</li>
                <li>🎨 Зовнішній вигляд</li>
            </ul>
        </div>
    );
}
