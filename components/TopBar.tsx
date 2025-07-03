"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Battery, Search, Wifi } from "lucide-react";

export default function TopBar() {
    const [showAppleMenu, setShowAppleMenu] = useState(false);
    const time = format(new Date(), "HH:mm");
    const date = format(new Date(), "d MMM")

    return (
        <div className="absolute top-0 left-0 w-full h-8 bg-black/30 text-white flex items-center px-4 text-sm backdrop-blur z-50">
            {/*  Apple Menu */}
            <div className="relative">
                <button onClick={() => setShowAppleMenu(!showAppleMenu)} className="px-1.5 font-black text-xl">
                    
                </button>
                {showAppleMenu && (
                    <div className="absolute top-8 left-0 bg-[#1e1e1e] border border-gray-700 shadow-lg py-2 w-48 rounded text-sm">
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">About This Mac</div>
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">System Settings</div>
                        <hr className="my-1 border-gray-600" />
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Sleep</div>
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Restart…</div>
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Shut Down…</div>
                        <hr className="my-1 border-gray-600" />
                        <div className="px-4 py-1 hover:bg-gray-700 cursor-pointer">Log Out</div>
                    </div>
                )}
            </div>

            {/* Active App & Menus */}
            <div className="flex gap-6 ml-4">
                <span className="font-medium">Active App</span>
                <span className="hover:underline cursor-pointer">File</span>
                <span className="hover:underline cursor-pointer">Edit</span>
                <span className="hover:underline cursor-pointer">View</span>
                <span className="hover:underline cursor-pointer">Window</span>
                <span className="hover:underline cursor-pointer">Help</span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Clock / Status */}
            <div className="flex items-center gap-3">
                <Wifi size={24} strokeWidth={3} />
                <Battery size={24} strokeWidth={3} />
                <Search size={18} strokeWidth={2} />
                <span>{date}</span>
                <span>{time}</span>
            </div>
        </div>
    );
}
