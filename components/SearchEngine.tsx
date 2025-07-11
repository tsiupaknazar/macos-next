'use client';

import { useEffect } from 'react';

export default function SearchEngine() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=b1611c2d9dda0489c';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="w-full max-w-2xl mt-6 p-4 border rounded-xl bg-white shadow-md">
            <div className="gcse-search"></div>
        </div>
    )
}
