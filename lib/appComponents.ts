import { CalculatorWindow } from "@/components/apps/Calculator";
import { SettingsWindow } from "@/components/apps/Settings";

export const appComponents: Record<string, React.FC> = {
  Settings: SettingsWindow,
  Calculator: CalculatorWindow,
};