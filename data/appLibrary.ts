type AppData = {
  id: string
  name: string
  icon: string
  fixedSize?: boolean
  defaultSize?: { width: number; height: number }
  isLaunchpad?: boolean
}

export const appLibrary: Record<string, AppData> = {
  finder: { id: "Finder", name: "Finder", icon: "/dock/finder.png" },
  launchpad: { id: "Launchpad", name: "Launchpad", icon: "/dock/launchpad.png", isLaunchpad: true },
  settings: {
    id: "Settings",
    name: "Settings",
    icon: "/dock/settings.png",
    fixedSize: true,
    defaultSize: { width: 650, height: 400 }
  },
  safari: { id: "Safari", name: "Safari", icon: "/dock/safari.png" },
  notes: { id: "Notes", name: "Notes", icon: "/dock/notes.png" },
  terminal: { id: "Terminal", name: "Terminal", icon: "/dock/terminal.png" },
  calculator: {
    id: "Calculator",
    name: "Calculator",
    icon: "/dock/calculator.png",
    fixedSize: true,
    defaultSize: { width: 200, height: 350 }
  },
  photos: { id: "Photos", name: "Photos", icon: "/dock/photos.png" },
  weather: { id: "Weather", name: "Weather", icon: "/dock/weather.png" },
  bin: { id: "Bin", name: "Bin", icon: "/dock/bin-empty.png" },
};
