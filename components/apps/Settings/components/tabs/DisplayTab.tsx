import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import { useDisplayStore } from "@/store/displayStore";

export default function DisplayTab() {
    const {
        brightness,
        setBrightness,
    } = useDisplayStore();

    useEffect(() => {
        const update = () => {
            const newBrightness = 100;

            const effective = Math.min(brightness, newBrightness);
            setBrightness(effective);
        };

        update();
        const id = setInterval(update, 60 * 1000);
        return () => clearInterval(id);
    }, [brightness, setBrightness]);

    const handleSliderChange = (val: number | number[]) => {
        const numeric = Array.isArray(val) ? val[0] : val;
        setBrightness(numeric);
    };

    return (
        <div className="border border-red-500">
            <div className="w-full h-full px-3 py-2 flex flex-col gap-3">
                <div className="flex justify-between border-b py-2">
                    <h2>Brightness</h2>
                    <div className="flex gap-3">
                        <Slider
                            value={[brightness]}
                            onValueChange={handleSliderChange}
                            min={10}
                            max={100}
                            step={1}
                            className="w-40"
                        />
                    </div>
                </div>
                <div className="flex justify-between border-b py-2">
                    <h2>Night mode</h2>
                    <div className="flex gap-3">
                        Night Mode will be here
                    </div>
                </div>
            </div>
        </div>
    )
}