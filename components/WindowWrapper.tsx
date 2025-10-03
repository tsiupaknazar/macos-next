"use client";

import { useWindowStore, WindowData } from "@/store/windowStore";
import { Rnd } from "react-rnd"
import { appComponents } from "@/lib/appComponents";

export default function WindowWrapper(props: WindowData) {
    const { id, appId, position, size, isActive, isMinimized, isFullScreen } = props;

    const close = useWindowStore((s) => s.closeWindow);
    const minimize = useWindowStore((s) => s.minimizeWindow);
    const focus = useWindowStore((s) => s.focusWindow);
    const updateWindow = useWindowStore((s) => s.updateWindow);
    const fullScreen = useWindowStore((s) => s.fullScreen);

    if (isMinimized) return null;

    const AppComponent = appComponents[appId];

    return (
        <Rnd
            default={{
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height,
            }}
            size={isFullScreen ? { width: '100%', height: '100%' } : size}
            position={isFullScreen ? { x: 0, y: 0 } : position}
            enableResizing={!isFullScreen}
            disableDragging={isFullScreen}
            bounds="parent"
            minWidth={300}
            minHeight={200}
            onDragStart={() => focus(id)}
            onDragStop={(e, d) => {
                updateWindow(id, {
                    position: { x: d.x, y: d.y },
                    size,
                });
            }}
            onClick={() => focus(id)}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateWindow(id, {
                    size: {
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                    },
                    position,
                });
            }}
            className={`rounded-md bg-white border cursor-default border-gray-300 shadow-xl overflow-hidden absolute transition-all duration-150 ${isFullScreen && "z-[100]"} ${isActive ? "z-50" : "z-40 opacity-80"}`}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-3 py-2 bg-gray-100 z-50">
                <div className="flex gap-2">
                    <button
                        onClick={() => close(id)}
                        className="w-3 h-3 bg-red-500 rounded-full hover:text-black cursor-pointer"
                    />
                    <button
                        onClick={() => minimize(id)}
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                    />
                    <button
                        onClick={() => fullScreen(id)}
                        className="w-3 h-3 bg-green-500 rounded-full"
                    />
                </div>
                <span className="text-xs text-gray-600">{appId}</span>
                <div className="w-6" />
            </div>

            {/* Content */}
            <div className="text-sm text-gray-500">
                {AppComponent ? <AppComponent /> : `Порожнє вікно: ${appId}`}
            </div>
        </Rnd>
    );
}