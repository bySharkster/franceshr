"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          layoutId="auth-form"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
            opacity: { duration: 0.3, ease: "easeInOut" },
            filter: { duration: 0.3, ease: "easeInOut" },
          }}
          className="w-full max-w-3xl"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
