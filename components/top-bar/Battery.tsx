import { BatteryService } from "@/lib/services/BatteryService";
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";
import React, { useEffect, useState } from "react";

const battery = new BatteryService();

export function Battery() {
    const [level, setLevel] = useState(1);
    const [charging, setCharging] = useState(true);

    useEffect(() => {
        const unsubscribe = battery.subscribe(({ level, charging }) => {
            setLevel(level);
            setCharging(charging);
            console.log("Battery level:", level, "Charging:", charging);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {charging ? (
                <BatteryCharging size={24} strokeWidth={3} />
            ) : level < 0.2 ? (
                <BatteryLow size={24} strokeWidth={3} />
            ) : level < 0.5 ? (
                <BatteryMedium size={24} strokeWidth={3} />
            ) : (
                <BatteryFull size={24} strokeWidth={3} />
            )}
        </div>
    );
}