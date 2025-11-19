"use client";

import { Button } from "@franceshr/ui";
import { Briefcase, Menu, MessageSquare, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/atoms/ui/navigation-menu";
import useIsMobile from "@/hooks/use-mobile";

const LinkItems = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/about",
    label: "Nosotros",
  },
];

const ServiceItems = [
  {
    href: "/services/entrevistas-simuladas",
    title: "Entrevistas Simuladas",
    description: "Prepárate con práctica realista",
    icon: MessageSquare,
  },
  {
    href: "/services/resume-basico",
    title: "Resume Básico",
    description: "Profesional y optimizado para ATS",
    icon: Briefcase,
  },
  {
    href: "/services/resume-profesional",
    title: "Resume Profesional",
    description: "Para experiencia establecida",
    icon: Briefcase,
  },
  {
    href: "/services/resume-ejecutivo",
    title: "Resume Ejecutivo",
    description: "Premium para líderes",
    icon: Briefcase,
  },
  {
    href: "/services/mentorias-laborales",
    title: "Mentorías Laborales",
    description: "Orientación personalizada",
    icon: Users,
  },
];

export const NavSection = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

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
              <div className="bg-background fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto">
                <div className="flex flex-col space-y-4 p-4">
                  {/* Main Links */}
                  {LinkItems.map((item) => (
                    <Button
                      key={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      {item.label}
                    </Button>
                  ))}

                  {/* Services Section */}
                  <div className="border-border border-t pt-4">
                    <p className="text-muted-foreground mb-3 px-3 text-sm font-semibold">
                      Servicios
                    </p>
                    <div className="space-y-1">
                      {ServiceItems.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.href}
                            onClick={() => handleLinkClick(service.href)}
                            type="button"
                            className="hover:bg-accent flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors"
                          >
                            <Icon className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                            <div className="flex-1">
                              <div className="text-foreground text-sm font-medium">
                                {service.title}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {service.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
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

        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {ServiceItems.map((service) => (
                <ServiceListItem
                  key={service.href}
                  title={service.title}
                  href={service.href}
                  icon={service.icon}
                >
                  {service.description}
                </ServiceListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

function ServiceListItem({
  title,
  children,
  href,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: React.ElementType;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
