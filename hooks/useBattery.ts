"use client";
import { useSyncExternalStore, useEffect } from "react";
import { BatteryService } from "@/lib/services/BatteryService";

const batteryService = new BatteryService();

export function useBattery() {
    const battery = useSyncExternalStore(
        (callback) => {
            const unsubscribe = batteryService.subscribe(callback);
            return unsubscribe;
        },
        () => batteryService['data'],
        () => ({ level: 1, charging: true })
    );

    useEffect(() => {
        return () => batteryService.destroy();
    }, []);

    return battery;
}