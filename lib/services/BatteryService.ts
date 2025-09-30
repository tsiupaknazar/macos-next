type BatteryData = {
    level: number;
    charging: boolean;
};

type Listener = (data: BatteryData) => void;

export class BatteryService {
    private listeners: Listener[] = [];
    private data: BatteryData = { level: 1, charging: true };
    private interval: NodeJS.Timeout | null = null;

    constructor() {
        if ("getBattery" in navigator) {
            navigator.getBattery().then((battery) => {
                this.data = { level: battery.level, charging: battery.charging };
                battery.addEventListener("levelchange", () => {
                    this.update({ level: battery.level });
                });
                battery.addEventListener("chargingchange", () => {
                    this.update({ charging: battery.charging });
                });
            });
        } else {
            this.simulate();
        }
    }

    private simulate() {
        let fakeLevel = 1;
        let charging = false;
        this.interval = setInterval(() => {
            fakeLevel = charging ? fakeLevel + 0.01 : fakeLevel - 0.01;
            if (fakeLevel <= 0.2) charging = true;
            if (fakeLevel >= 0.99) charging = false;
            this.update({ level: Number(fakeLevel.toFixed(2)), charging });
        }, 1000);
    }

    private update(newData: Partial<BatteryData>) {
        this.data = { ...this.data, ...newData };
        this.listeners.forEach((cb) => cb(this.data));
    }

    subscribe(cb: Listener) {
        this.listeners.push(cb);
        cb(this.data);
        return () => {
            this.listeners = this.listeners.filter((fn) => fn !== cb);
        };
    }

    destroy() {
        if (this.interval) clearInterval(this.interval);
    }
}
