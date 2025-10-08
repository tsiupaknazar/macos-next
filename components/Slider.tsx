"use client"

import React, { useState } from "react";

interface CustomSliderProps {
    min?: number
    max?: number
    step?: number
    defaultValue?: number
    onChange?: (value: number) => void
    className?: string
}

export function CustomSlider({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = 0,
    onChange,
    className = "",
}: CustomSliderProps) {
    const [value, setValue] = useState(defaultValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        setValue(newValue)
        onChange?.(newValue)
    }

    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={`relative ${className}`} style={{ width: "200px", height: "24px" }}>
            <div className="absolute inset-0 bg-[#999999] rounded-full" />
            <div
                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-150"
                style={{ width: `${percentage}%` }}
            />
            <div
                className="absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white rounded-full shadow-sm pointer-events-none transition-all duration-150 border"
                style={{ left: `calc(${percentage}% - 22px)` }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ margin: 0 }}
            />
        </div>
    )
}
