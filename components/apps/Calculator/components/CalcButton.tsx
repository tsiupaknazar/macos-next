export interface CalcButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: "default" | "operator"
    className?: string
}

export function CalcButton({ children, onClick, variant = "default", className = "" }: CalcButtonProps) {
    const baseStyles =
        "w-10 h-10 rounded-full text-white font-light hover:brightness-110 transition-all flex items-center justify-center"


    const variantStyles = {
        default: "bg-[#505050] text-xl",
        operator: "bg-[#FF9F0A] text-xl",
    }

    return (
        <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {children}
        </button>
    )
}