import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkColor(input: string) {
    const color = String(input).trim();
    const s = new Option().style;

    s.color = color;
    if (s.color) {
        if (/^[0-9A-Fa-f]{3,6}$/.test(color)) {
            return `#${color}`;
        }
        return color;
    }
    return null;
}