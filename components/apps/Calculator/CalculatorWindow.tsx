import { Calculator } from "lucide-react";
import { CalcDisplay } from "./components/CalcDisplay";
import { CalcButton } from "./components/CalcButton";

import { useCalculatorStore } from "@/store/calculatorStore";

export default function CalculatorWindow() {
    const {
        display,
        lastOperation,
        handleNumber,
        handleDecimal,
        handleOperation,
        handleEquals,
        handleClear,
        handleToggleSign,
        handlePercent,
    } = useCalculatorStore();

    const rows = [
        ["AC", "+/-", "%", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["calc", "0", ".", "="],
    ];

    interface ButtonConfig {
        onClick?: () => void;
        className?: string;
        variant?: "operator";
        element?: React.ReactNode;
    }

    const buttonActions: Record<string, ButtonConfig> = {
        "AC": { onClick: handleClear, className: "text-xl" },
        "+/-": { onClick: handleToggleSign, className: "text-xl" },
        "%": { onClick: handlePercent, className: "text-xl" },
        "÷": { onClick: () => handleOperation("÷"), variant: "operator" },
        "×": { onClick: () => handleOperation("×"), variant: "operator" },
        "-": { onClick: () => handleOperation("-"), variant: "operator" },
        "+": { onClick: () => handleOperation("+"), variant: "operator" },
        "=": { onClick: handleEquals, variant: "operator" },
        ".": { onClick: handleDecimal },
        "calc": { element: <Calculator className="w-6 h-6" />, className: "text-2xl" },
    };

    return (
        <div className="w-full dark:bg-neutral-900 text-gray-900 dark:text-white">
            <CalcDisplay value={display} lastOperation={lastOperation} />
            <div className="grid grid-cols-4 gap-1 p-1 min-w-0">
                {rows.map(row =>
                    row.map(btn => {
                        const config = buttonActions[btn];

                        if (config) {
                            if (config.element) {
                                return <CalcButton key={btn} className={config.className}>{config.element}</CalcButton>;
                            }
                            return (
                                <CalcButton
                                    key={btn}
                                    onClick={config.onClick}
                                    className={config.className}
                                    variant={config.variant}
                                >
                                    {btn}
                                </CalcButton>
                            );
                        }
                        return (
                            <CalcButton key={btn} onClick={() => handleNumber(btn)}>
                                {btn}
                            </CalcButton>
                        );
                    })
                )}
            </div>
        </div>
    )
}