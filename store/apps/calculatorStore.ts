import { create } from "zustand";

export type Operation = "+" | "-" | "×" | "÷" | null;

interface CalculatorState {
    display: string;
    previousValue: number | null;
    operation: Operation;
    shouldResetDisplay: boolean;
    lastOperation?: string;

    handleNumber: (num: string) => void;
    handleDecimal: () => void;
    handleOperation: (op: Operation) => void;
    handleEquals: () => void;
    handleClear: () => void;
    handleToggleSign: () => void;
    handlePercent: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
    display: "0",
    previousValue: null,
    operation: null,
    shouldResetDisplay: false,

    handleNumber: (num) => {
        const { display, shouldResetDisplay } = get();
        set({
            display: shouldResetDisplay ? num : display === "0" ? num : display + num,
            shouldResetDisplay: false,
            lastOperation: undefined,
        });
    },

    handleDecimal: () => {
        const { display, shouldResetDisplay } = get();
        if (shouldResetDisplay) {
            set({ display: "0.", shouldResetDisplay: false });
        } else if (!display.includes(".")) {
            set({ display: display + "." });
        }
    },

    handleOperation: (op) => {
        const { display, previousValue, operation } = get();
        const currentValue = parseFloat(display);

        if (previousValue === null) {
            set({ previousValue: currentValue });
        } else if (operation) {
            const result = calculate(previousValue, currentValue, operation);
            set({ display: result.toString(), previousValue: result });
        }

        set({
            operation: op,
            shouldResetDisplay: true,
            lastOperation: undefined, // clear last operation
        });
    },

    handleEquals: () => {
        const { display, previousValue, operation } = get();
        if (operation && previousValue !== null) {
            const currentValue = parseFloat(display);
            const result = calculate(previousValue, currentValue, operation);

            set({
                display: result.toString(),
                previousValue: null,
                operation: null,
                shouldResetDisplay: true,
                lastOperation: `${previousValue} ${operation} ${currentValue} =`,
            });
        }
    },

    handleClear: () => {
        set({ display: "0", previousValue: null, operation: null, shouldResetDisplay: false });
    },

    handleToggleSign: () => {
        const { display } = get();
        set({ display: (parseFloat(display) * -1).toString() });
    },

    handlePercent: () => {
        const { display } = get();
        set({ display: (parseFloat(display) / 100).toString() });
    },
}));

function calculate(prev: number, current: number, op: Operation) {
    switch (op) {
        case "+": return prev + current;
        case "-": return prev - current;
        case "×": return prev * current;
        case "÷": return current === 0 ? 0 : prev / current;
        default: return current;
    }
}