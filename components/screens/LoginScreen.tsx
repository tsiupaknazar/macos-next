import { useSystemStore } from "@/store/systemStore";
import { useState } from "react";

export default function LoginScreen() {
    const login = useSystemStore((state) => state.login);

    const dateNow = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const now = new Date();

    // Day of week (e.g., "Monday")
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Formatted date (e.g., "1 July")
    const date = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const formattedDate = `${date} ${month}`; // "1 July"


    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (password === "1234") {
                login();
            } else {
                setError("Wrong password, please try again")
            }
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-b py-10 from-black to-gray-900 text-white flex flex-col items-center justify-between" >
            <div className="flex flex-col items-center justify-center gap-4">
                <h6 className="text-xl font-bold">{`${dayOfWeek}, ${formattedDate}`}</h6>
                <h2 className="text-8xl font-black">{dateNow}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-4xl bg-amber-300"></div>
                <input
                    type="password"
                    className="px-4 py-2 rounded-2xl bg-gray-800 text-white outline-0"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleLogin}
                />
                {error && <span>{error}</span>}
            </div>
        </div >
    )
}