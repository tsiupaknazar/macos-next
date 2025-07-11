"use client";
import { useState } from "react";
import { format } from "date-fns";
import {Search, Wifi } from "lucide-react";
import { useSystemStore } from "@/store/systemStore";

import Battery from "@/components/top-bar/Battery"

export default function TopBar() {
    const sleep = useSystemStore((s) => s.sleep);
    const restart = useSystemStore((s) => s.restart);
    const shutdown = useSystemStore((s) => s.shutdown);
    const turnOff = useSystemStore((s) => s.turnOff);


    const [showAppleMenu, setShowAppleMenu] = useState(false);
    const time = format(new Date(), "HH:mm");
    const date = format(new Date(), "d MMM")

    return (
        <div className="absolute top-0 left-0 w-full h-7 bg-black/30 text-white flex items-center px-4 text-sm backdrop-blur z-50">
            {/*  Apple Menu */}
            <div className="relative">
                <button onClick={() => setShowAppleMenu(!showAppleMenu)} className="px-1 font-black text-xl">
                    
                </button>
                {showAppleMenu && (
                    <div className="absolute bg-[#1e1e1e] border border-gray-700 shadow-lg py-2 w-48 rounded text-sm">
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">About This Mac</div>
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">System Settings</div>
                        <hr className="my-1 border-gray-600" />

                        <div onClick={() => turnOff('sleep')} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Sleep</div>
                        <div onClick={restart} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Restart…</div>
                        <div onClick={shutdown} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Shut Down…</div>
                        <hr className="my-1 border-gray-600" />
                        <div onClick={sleep} className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Log Out</div>
                    </div>

                )}
            </div>

            {/* Active App & Menus */}
            <div className="flex items-center gap-1 ml-2">
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3 font-black">Active App</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">File</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Edit</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">View</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Window</span>
                <span className="cursor-default hover:bg-gray-500 hover:rounded-lg py-0.5 px-3">Help</span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Clock / Status */}
            <div className="flex items-center gap-3">
                <Wifi size={24} strokeWidth={3} />
                <Battery />
                <Search size={18} strokeWidth={2} />
                <span>{date}</span>
                <span>{time}</span>
            </div>
        </div>
    );
}
