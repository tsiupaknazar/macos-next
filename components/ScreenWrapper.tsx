import { motion } from "motion/react";
import { ReactNode } from "react";

export default function ScreenWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            key="screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-screen h-screen absolute top-0 left-0"
        >
            {children}
        </motion.div>
    );
}
