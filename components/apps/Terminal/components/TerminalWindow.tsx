import { appLibrary } from "@/data/appLibrary";
import { useAppearanceStore, useWindowStore } from "@/store";
import { useState, useRef, useEffect } from "react";
import { checkColor } from "@/lib/utils";

interface OutputLine {
    type: "command" | "output" | "error"
    content: string
}

export default function TerminalWindow() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState<OutputLine[]>([
        { type: "output", content: "Last login: " + new Date().toLocaleString() },
        { type: "output", content: 'Welcome to Terminal. Type "help" for available commands.' },
    ])
    const [currentPath] = useState("~")
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    const inputRef = useRef<HTMLInputElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)

    const { terminalBgColor, terminalTextColor, setTerminalBgColor, setTerminalTextColor } = useAppearanceStore();
    const { closeWindow } = useWindowStore();

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
    }, [output])

    const addOutput = (content: string, type: "output" | "error" = "output") => {
        setOutput((prev) => [...prev, { type, content }])
    }

    const commands: Record<string, (args: string[]) => void> = {
        help: () => {
            [
                "Available commands:",
                "  echo [text]        - Display text",
                "  open [program]     - Open a program",
                "  clear              - Clear terminal screen",
                "  date               - Display current date and time",
                "  whoami             - Display current user",
                "  bgcolor [color]    - Change terminal background color",
                "  textcolor [color]  - Change terminal text color",
                "  kill               - Kills terminal process",
                "  help               - Show this help message",
            ].forEach((line) => addOutput(line));
        },

        echo: (args) => addOutput(args.join(" ")),

        clear: () => setOutput([]),

        date: () => addOutput(new Date().toString()),

        whoami: () => addOutput("user"),

        bgcolor: (args) => {
            const valid = checkColor(args[0]);
            if (valid) {
                setTerminalBgColor(valid);
            } else {
                addOutput(`Invalid color: ${args[0]}`, "error");
            }
        },

        textcolor: (args) => {
            const valid = checkColor(args[0]);
            if (valid) {
                setTerminalTextColor(valid);
            } else {
                addOutput(`Invalid color: ${args[0]}`, "error");
            }
        },

        open: (args) => {
            const targetApp = args[0]?.toLowerCase();
            if (!targetApp) return addOutput("Usage: open [appName]");

            const appEntry = Object.values(appLibrary).find(
                (app) => app.id.toLowerCase() === targetApp && !app.isLaunchpad
            );
            if (!appEntry) return addOutput(`No such program: ${targetApp}`, "error");

            const { openWindow } = useWindowStore.getState();
            openWindow(appEntry.id);
            addOutput(`Opening ${appEntry.name}...`);
        },

        kill: () => {
            addOutput("Terminating terminal...");
            setTimeout(() => {
                const terminalWindow = useWindowStore
                    .getState()
                    .windows.find((w) => w.appId === "Terminal");
                if (terminalWindow) closeWindow(terminalWindow.id);
            }, 500);
        },
    };

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        setOutput((prev) => [...prev, { type: "command", content: `${currentPath} $ ${trimmed}` }]);
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);

        const [command, ...args] = trimmed.split(" ");
        const handler = commands[command.toLowerCase()];

        if (handler) handler(args);
        else addOutput(`command not found: ${command}`, "error");
    };

    const handleHistoryUp = () => {
        if (commandHistory.length === 0) return;
        const newIndex =
            historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
    };

    const handleHistoryDown = () => {
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setInput("");
        } else {
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            handleHistoryUp();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            handleHistoryDown();
        }
    };

    return (
        <div
            className="h-full font-mono border border-border/50"
            style={{
                backgroundColor: terminalBgColor,
                color: terminalTextColor,
            }}
        >
            <div
                className="bg-[var(--color-terminal-bg)] h-[calc(100%-40px)] p-4 overflow-y-auto font-mono text-sm/3"
                ref={outputRef}
                onClick={() => inputRef.current?.focus()}
            >
                {output.map((line, index) => (
                    <div key={index} className="mb-1 text-[var(--color-terminal-text)]">
                        {line.type === "error" ? (
                            <span className="text-[var(--color-terminal-error)]">{line.content}</span>
                        ) : (
                            line.content
                        )}
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-[var(--color-terminal-prompt)] mr-2">{currentPath} $</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-[var(--color-terminal-text)] outline-none caret-[var(--color-terminal-success)]"
                        autoFocus
                        spellCheck={false}
                    />
                </form>
            </div>
        </div>
    )
}