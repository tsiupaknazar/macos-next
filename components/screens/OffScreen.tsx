import { useSystemStore } from "@/store/system/systemStore";
import ScreenWrapper from "../ScreenWrapper";
import { Power } from "lucide-react"

export default function OffScreen() {
    const turnOn = useSystemStore((s) => s.turnOn);

    console.log(document.fullscreenElement)

    return (
        <ScreenWrapper>
            <div className="bg-black w-full h-full flex items-center justify-center">
                <button
                    onClick={turnOn}
                    className="border cursor-pointer text-white px-10 py-10 rounded-full flex justify-center hover:bg-white hover:text-black transition-all duration-200"
                >
                    <Power size={24} strokeWidth={4} />
                </button>
            </div>
        </ScreenWrapper>
    );
}
