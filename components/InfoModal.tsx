// components/SystemInfoModal.tsx
"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useModalStore } from "@/store/modalStore"
import { Button } from "./ui/button"
import Link from "next/link"

export function InfoModal() {
    const { systemInfoOpen, closeSystemInfo } = useModalStore()

    return (
        <Dialog open={systemInfoOpen} onOpenChange={closeSystemInfo}>
            <DialogContent showCloseButton={false} className="w-[300px] max-w-[300px] h-[550px] max-h-[550px] bg-white dark:bg-neutral-900 dark:text-white p-2 gap-0">
                <div className="flex gap-2 group">
                    <button
                        onClick={closeSystemInfo}
                        className="w-3 h-3 bg-red-400 rounded-full relative flex items-center justify-center"
                    >
                        <span className="opacity-0 group-hover:opacity-100 text-gray-800 text-[12px] font-bold leading-none">
                            ×
                        </span>
                    </button>
                    <button
                        className="w-3 h-3 bg-gray-900 rounded-full relative flex items-center justify-center"
                    >
                        <span className="opacity-0 text-gray-800 text-[12px] font-bold leading-none" />
                    </button>
                    <button
                        className="w-3 h-3 bg-gray-900 rounded-full relative flex items-center justify-center"
                    >
                        <span className="opacity-0 text-gray-800 text-[12px] font-bold leading-none" />
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center pt-6 pb-4">
                    {/* MacBook Illustration */}
                    <div className="mb-4">
                        <svg width="130" height="90" viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Screen */}
                            <rect x="20" y="10" width="90" height="60" rx="2" fill="#3B82F6" stroke="#6B7280" strokeWidth="2" />
                            <rect x="23" y="13" width="84" height="54" fill="url(#screenGradient)" />
                            {/* Base */}
                            <path d="M 10 70 L 15 75 L 115 75 L 120 70 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
                            <ellipse cx="65" cy="75" rx="3" ry="1" fill="#6B7280" />
                            <defs>
                                <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="100%" stopColor="#3B82F6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Title */}
                    <DialogTitle className="text-xl font-semibold mb-1">MacOS Web Clone</DialogTitle>
                    <p className="text-xs text-gray-400 mb-6">The same Mac OS, just in your browser</p>

                    {/* Specs */}
                    <div className="w-full px-6 space-y-2 text-sm">
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-right">Framework</span>
                            <span className="text-gray-400">Next.js + React</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-right">Styling</span>
                            <span className="text-gray-400">
                                Tailwind CSS, Shadcn UI & Framer Motion
                            </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-right">State</span>
                            <span className="text-gray-400">Zustand</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-right">Language</span>
                            <span className="text-gray-400">Typescript</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-right">Deploy</span>
                            <span className="text-gray-400">Vercel</span>
                        </div>
                    </div>
                    <Button variant="secondary" className="mt-6 bg-slate-700 hover:bg-slate-600 text-white border-slate-600">
                        <Link target="_blank" href="https://github.com/tsiupaknazar/macos-next">More Info...</Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
