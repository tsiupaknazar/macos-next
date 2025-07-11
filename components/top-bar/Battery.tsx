import { BatteryCharging, BatteryFull } from "lucide-react";
import React, { useEffect, useState } from "react";

type BatteryManager = {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: ((this: BatteryManager, ev: Event) => void) | null;
    onchargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
    ondischargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => void) | null;
};

export default function Battery() {
    const [batteryInfo, setBatteryInfo] = useState<BatteryManager | null>(null);

    useEffect(() => {
        if ("getBattery" in navigator) {
            (navigator as any).getBattery().then((battery: BatteryManager) => {
                setBatteryInfo(battery);
                console.log(battery);
            });
        }
    }, [batteryInfo]);

    return (
        <div>
            {batteryInfo?.charging ? <BatteryCharging size={24} strokeWidth={3} /> : <BatteryFull size={24} strokeWidth={3} />}
            {/* {batteryInfo ? `Battery level: ${Math.round(batteryInfo.level * 100)}%` : batteryInfo <BatteryFull  size={24} strokeWidth={3}/>} */}
        </div>
    );
}