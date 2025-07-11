import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const apps = [
    { id: "finder", icon: "/dock/finder.png", name: "Finder", isActive: true },
    { id: "safari", icon: "/dock/safari.png", name: "Safari", isActive: false },
    { id: "notes", icon: "/dock/notes.png", name: "Notes", isActive: false },
    { id: "terminal", icon: "/dock/terminal.png", name: "Terminal", isActive: false },
    { id: "fider", icon: "/dock/finder.png", name: "Finder", isActive: false },
    { id: "saari", icon: "/dock/safari.png", name: "Safari", isActive: false },
    { id: "noes", icon: "/dock/notes.png", name: "Notes", isActive: false },
    { id: "teminal", icon: "/dock/terminal.png", name: "Terminal", isActive: false },
    { id: "otes", icon: "/dock/notes.png", name: "Notes", isActive: false },
    { id: "erminal", icon: "/dock/terminal.png", name: "Terminal", isActive: false },
    { id: "ider", icon: "/dock/finder.png", name: "Finder", isActive: false },
    { id: "sari", icon: "/dock/safari.png", name: "Safari", isActive: false },
    { id: "nes", icon: "/dock/notes.png", name: "Notes", isActive: false },
    { id: "temnal", icon: "/dock/terminal.png", name: "Terminal", isActive: false },
];

export default function Dock() {
    return (
        <div className="absolute bottom-6 w-full flex justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 flex gap-4 pointer-events-auto border border-white/30">
                {apps.map((app) => (
                    <Tooltip key={app.id}>
                        <div
                            className="flex flex-col items-center group hover:scale-110 transition-transform duration-200 cursor-pointer"
                        >
                            <TooltipTrigger>
                                <div className="relative w-16 h-16">
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
                            {app.isActive && (
                                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
                            )}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}