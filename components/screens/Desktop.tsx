import TopBar from "../TopBar";

interface NavigatorWithBattery extends Navigator {
    getBattery?: () => Promise<any>;
}

export default function Desktop() {
    (navigator as NavigatorWithBattery).getBattery?.().then((battery) => {
        function updateAllBatteryInfo() {
            updateChargeInfo();
            updateLevelInfo();
            updateChargingInfo();
            updateDischargingInfo();
        }
        updateAllBatteryInfo();

        battery.addEventListener("chargingchange", () => {
            updateChargeInfo();
        });
        function updateChargeInfo() {
            console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
        }

        battery.addEventListener("levelchange", () => {
            updateLevelInfo();
        });
        function updateLevelInfo() {
            console.log(`Battery level: ${battery.level * 100}%`);
        }

        battery.addEventListener("chargingtimechange", () => {
            updateChargingInfo();
        });
        function updateChargingInfo() {
            console.log(`Battery charging time: ${battery.chargingTime} seconds`);
        }

        battery.addEventListener("dischargingtimechange", () => {
            updateDischargingInfo();
        });
        function updateDischargingInfo() {
            console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
        }
    });

    return (
        <div className="w-full h-full flex items-center justify-center">
            <TopBar />
        </div>
    )
}