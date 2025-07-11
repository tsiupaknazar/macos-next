"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function DockIcon({
    src,
    name,
    isActive,
    mouseX,
}: {
    src: string;
    name: string;
    isActive?: boolean;
    mouseX: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const iconCenter = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - iconCenter);

        // Сильне збільшення при близькості
        const maxDistance = 100;
        const scaleFactor = 1.8;
        const proximity = Math.max(0, (maxDistance - distance) / maxDistance);

        setScale(1 + proximity * (scaleFactor - 1));
    }, [mouseX]);

    return (
        <div
            ref={ref}
            className="flex flex-col items-center transition-transform duration-75 ease-out"
            style={{
                transform: `scale(${scale})`,
            }}
        >
            <div className="w-12 h-12 relative">
                <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain rounded"
                />
            </div>
            {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />}
        </div>
    );
}
