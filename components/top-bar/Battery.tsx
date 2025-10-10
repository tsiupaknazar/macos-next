import { useBattery } from "@/hooks/useBattery";
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";
import React from "react";

export function Battery() {
    const battery = useBattery();

    return (
        <div>
            {battery.charging ? (
                <BatteryCharging size={24} strokeWidth={3} />
            ) : battery.level <= 0.2 ? (
                <BatteryLow size={24} strokeWidth={3} />
            ) : battery.level < 0.5 ? (
                <BatteryMedium size={24} strokeWidth={3} />
            ) : (
                <BatteryFull size={24} strokeWidth={3} />
            )}
        </div>
    );
}