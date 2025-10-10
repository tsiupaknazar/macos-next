"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLaunchpadStore } from "@/store/launchpadStore";
import { appLibrary } from "@/data/appLibrary";
import { useWindowStore } from "@/store/windowStore";
import Image from "next/image";

export default function LaunchpadOverlay() {
  const { isVisible, hide } = useLaunchpadStore();
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="launchpad-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={hide}
          className="fixed inset-0 z-[999] bg-neutral-900/80 backdrop-blur-2xl flex items-center justify-center"
        >
          <motion.div
            key="launchpad-grid"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-6 gap-10 text-center"
          >
            {Object.values(appLibrary)
              .filter((app) => !app.isLaunchpad && app.id !== "Bin")
              .map((app, i) => (
                <motion.button
                  key={app.id}
                  type="button"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.06 }}
                  onClick={() => {
                    openWindow(app.id);
                    hide();
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group"
                  aria-label={`Open ${app.name}`}
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={80}
                    height={80}
                    className="rounded-2xl p-3 w-28 h-28 object-contain"
                    draggable={false}
                  />
                  <p className="mt-2 text-sm text-white opacity-90 group-hover:opacity-100 select-none">
                    {app.name}
                  </p>
                </motion.button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
