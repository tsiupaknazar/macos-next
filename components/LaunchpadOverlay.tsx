"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLaunchpadStore } from "@/store/apps/launchpadStore";
import { appLibrary } from "@/data/appLibrary";
import { useWindowStore } from "@/store/ui/windowStore";
import Image from "next/image";

export default function LaunchpadOverlay() {
  const { isVisible, hide, searchName, setSearchName } = useLaunchpadStore();
  const openWindow = useWindowStore((s) => s.openWindow);

  const filteredApps = Object.values(appLibrary)
    .filter((app) => !app.isLaunchpad && app.id !== "Bin")
    .filter((app) =>
      app.name.toLowerCase().includes(searchName.trim().toLowerCase())
    );

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
          className="fixed inset-0 z-[70] bg-neutral-900/80 backdrop-blur-2xl flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="mt-10 mb-10 w-80 rounded-md bg-white/20 text-white placeholder:text-gray-300 px-4 py-1 outline-none focus:bg-white/30"
            autoFocus
          />
          <motion.div
            key="launchpad-grid"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-6 gap-10 text-center"
          >
            {filteredApps.length > 0 && (
              filteredApps.map((app, i) => (
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
                    className="rounded-2xl p-2 w-28 h-28 object-contain"
                    draggable={false}
                  />
                  <p className="text-sm text-white opacity-90 group-hover:opacity-100 select-none">
                    {app.name}
                  </p>
                </motion.button>
              ))
            )}
            {filteredApps.length === 0 && (
              <div className="flex items-center justify-center w-screen mt-40 text-gray-400 text-xl">
                No results
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
