import { Suspense } from "react";
import Dock from "../Dock";
import TopBar from "../TopBar";

// import Iframe from 'react-iframe'
import SearchEngine from "../SearchEngine";

export default function Desktop() {
    return (
        <div className="w-screen h-screen bg-[url('/bg-monterrey.jpg')] bg-cover relative">
            <Suspense fallback="<p>System is loading now...</p>">
                <TopBar />
                {/* <SearchEngine /> */}
                <Dock />
            </Suspense>
        </div>
    )
}