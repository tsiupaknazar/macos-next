'use client';
import { SunMoon, Wallpaper, Bell, Eye } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WallpaperTab from "./tabs/WallpaperTab";


const items = [
    {
        title: "Theme",
        icon: SunMoon,
    },
    {
        title: "Wallpaper",
        icon: Wallpaper,
    },
    {
        title: "Notifications",
        icon: Bell,
    },
    {
        title: "Appearance",
        icon: Eye,
    },
]


export default function SettingsWindow() {
    return (
            <Tabs defaultValue="Theme" className="w-full">
                <Sidebar className="w-40 h-full top-8">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <TabsList className="flex flex-col items-start justify-center border border-red-950 space-y-1 mt-20 mb-5">
                                        <div className="flex items-center mb-2">
                                            <div className="bg-yellow-600 w-8 h-8 rounded-4xl"></div>
                                            <div className="flex flex-col ml-2">
                                                <h2 className="font-bold">User Name</h2>
                                                <p className="text-xs opacity-70">Apple Account</p>
                                            </div>
                                        </div>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <TabsTrigger value={item.title}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </TabsTrigger>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </TabsList>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className="w-[calc(100%-10rem)] min-h-full ml-40 z-50">
                    <TabsContent value="Theme" className="p-4">
                        Theme Settings
                    </TabsContent>
                    <TabsContent value="Wallpaper" className="p-4">
                        <WallpaperTab />
                    </TabsContent>
                    <TabsContent value="Notifications" className="p-4">
                        Notifications Settings
                    </TabsContent>
                    <TabsContent value="Appearance" className="p-4">
                        Appearance Settings
                    </TabsContent>
                </div>
            </Tabs>
    );
}
