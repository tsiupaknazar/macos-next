interface CalcDisplayProps {
    value: string;
    lastOperation?: string;
}

export function CalcDisplay({ value, lastOperation }: CalcDisplayProps) {
    return (
        <div className="w-full min-h-20 px-4 flex flex-col items-end justify-end">
            {lastOperation && (
                <div className="text-gray-400 text-sm">{lastOperation}</div>
            )}
            <div className="font-medium text-4xl">{value}</div>
        </div>
    )
}