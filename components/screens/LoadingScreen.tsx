import Image from "next/image";
import { Progress } from "@/components/ui/progress"
import ScreenWrapper from "../ScreenWrapper";
import { useSystemStore } from "@/store/systemStore";

export default function LoadingScreen() {
    const progress = useSystemStore((s) => s.loadingProgress)
    return (
        <ScreenWrapper>
            <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-5">
                <div
                >
                    <Image src="/logo.png" alt="Apple logo" width={70} height={70} />
                </div>
                <Progress value={progress} className="w-[40%] mt-10" indicatorColor="bg-white"/>
            </div>
        </ScreenWrapper>
    );
}