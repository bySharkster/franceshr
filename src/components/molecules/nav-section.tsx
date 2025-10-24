"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/atoms/ui/navigation-menu";
import useIsMobile from "@/hooks/use-mobile";

const LinkItems = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/services",
    label: "Servicios",
  },
  {
    href: "/about",
    label: "Nosotros",
  },
];

export const NavSection = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="relative flex h-10 w-10 items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <X strokeWidth={1} size={32} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Menu strokeWidth={1} size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        {open && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="bg-background fixed inset-x-0 top-16 bottom-0 z-50">
                <NavigationMenu className="h-full items-start">
                  <NavigationMenuList className="flex-col items-start space-y-2 p-4">
                    {LinkItems.map((item) => (
                      <NavigationMenuItem key={item.href} className="w-full">
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {LinkItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
