"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Wifi, Languages } from "lucide-react";
import { useSystemStore } from "@/store/system/systemStore";

import { Battery } from "@/components/top-bar/Battery";
import { useWindowStore } from "@/store/ui/windowStore";
import { useModalStore } from "@/store/ui/modalStore";

export default function TopBar() {
    const sleep = useSystemStore((s) => s.sleep);
    const restart = useSystemStore((s) => s.restart);
    const shutdown = useSystemStore((s) => s.shutdown);
    const turnOff = useSystemStore((s) => s.turnOff);
    const openWindow = useWindowStore((s) => s.openWindow);
    const activeWindow = useWindowStore((s) => s.activeWindow());
    const openInfoModal = useModalStore((s) => s.openSystemInfo)

    const [showAppleMenu, setShowAppleMenu] = useState(false);
    const [date, setDate] = useState(format(new Date(), "HH:mm"));
    const [time, setTime] = useState(format(new Date(), "d MMM"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), "HH:mm"));
            setDate(format(new Date(), "d MMM"));
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    const handleMenuClick = (action: () => void) => {
        action();
        setShowAppleMenu(false);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-7 bg-black/30 text-white flex items-center px-4 text-sm backdrop-blur z-[60]">
            <div className="relative">
                <button onClick={() => setShowAppleMenu(!showAppleMenu)} className="px-1 font-black text-xl">
                    
                </button>
                {showAppleMenu && (
                    <div className="absolute bg-[#1e1e1e] border border-gray-700 shadow-lg py-2 w-48 rounded text-sm">
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer" onClick={() => handleMenuClick(() => openInfoModal())}>About This Mac</div>
                        <div
                            className="px-4 py-1 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleMenuClick(() => openWindow('Settings'))}
                        >
                            System Settings
                        </div>
                        <hr className="my-1 border-gray-600" />

                        <div onClick={() => handleMenuClick(() => turnOff('sleep'))} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Sleep</div>
                        <div onClick={() => handleMenuClick(() => restart())} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Restart…</div>
                        <div onClick={() => handleMenuClick(() => shutdown())} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Shut Down…</div>
                        <hr className="my-1 border-gray-600" />
                        <div onClick={() => handleMenuClick(() => sleep())} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Log Out</div>
                    </div>

                )}
            </div>


            <div className="flex items-center gap-1 ml-2">
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3 font-black">{activeWindow?.appId || "Finder"}</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">File</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Edit</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">View</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Window</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Help</span>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2 font-medium">
                <Wifi size={24} strokeWidth={3} />
                <Languages />
                <Battery />
                <Search size={18} strokeWidth={2} />
                {/* font SF PRO*/}
                <div className="flex items-center justify-center text-sm font-medium text-center text-white leading-[123%] gap-2">
                    <span>{date}</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
}
