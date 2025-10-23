"use client";

import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/atoms/ui/button";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-8 p-6 md:p-10">
      <div className="flex w-full max-w-3xl items-center justify-start gap-2">
        <Button iconLeft={<ArrowLeft />} size="sm" variant="default" asChild>
          <NextLink href="/">Back</NextLink>
        </Button>
      </div>
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
