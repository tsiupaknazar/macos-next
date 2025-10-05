import Link from "next/link";

// export default function NotFound() {
//     <div className="min-w-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
//         <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full p-8 text-center">
//             <div className="flex items-center justify-start gap-2 mb-6">
//                 <span className="w-3 h-3 rounded-full bg-red-500"></span>
//                 <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
//                 <span className="w-3 h-3 rounded-full bg-green-500"></span>
//             </div>

//             <h1 className="text-3xl font-semibold mb-3">This App Don&apos;t Use Other Pages Than &quot;/&quot;</h1>
//             <p className="text-gray-300 text-lg leading-relaxed">
//                 Return to <Link href="/" className="text-blue-400 hover:underline">Home Page</Link>
//             </p>
//         </div>
//     </div>
// }

export default function NotFound() {
    return (
        <div className="min-w-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full p-8 text-center">
                <div className="flex items-center justify-start gap-2 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>

                <h1 className="text-3xl font-semibold mb-3">This App Don&apos;t Use Other Pages Than
                    <span className="inline-block bg-gray-200 text-gray-800 text-xl font-bold ml-2 px-3 py-1 rounded-full">
                        &quot;/&quot;
                    </span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Return to <Link href="/" className="text-blue-400 hover:underline">Home Page</Link>
                </p>
            </div>
        </div>
    )
}
