import { CalculatorWindow } from "@/components/apps/Calculator";
import { SettingsWindow } from "@/components/apps/Settings";
import { TerminalWindow } from "@/components/apps/Terminal";

export const appComponents: Record<string, React.FC> = {
  Settings: SettingsWindow,
  Calculator: CalculatorWindow,
  Terminal: TerminalWindow
};