import { Suspense } from "react";
import Dock from "../Dock";
import TopBar from "../TopBar";

import WindowWrapper from "../WindowWrapper";
import { useWindowStore } from "@/store/windowStore";

export default function Desktop() {
    const windows = useWindowStore((s) => s.windows);

    return (
        <div className="w-screen h-screen bg-[url('/bg-monterrey.jpg')] bg-cover relative">
            <Suspense fallback={<p className="text-white">System is loading now...</p>}>
                <TopBar />
                {windows.map((w) => (
                    <WindowWrapper key={w.id} {...w} />
                ))}
                <Dock />
            </Suspense>
        </div>
    )
}