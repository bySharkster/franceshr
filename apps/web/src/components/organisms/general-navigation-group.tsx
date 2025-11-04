"use client";

import { ArrowLeft, Briefcase,ChevronDownIcon, Home, Info, LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms/ui/button";
import { ButtonGroup } from "@/components/atoms/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";

const generalRoutes = [
  {
    href: "/",
    label: "Inicio",
    icon: Home,
  },
  {
    href: "/about",
    label: "Sobre Mí",
    icon: Info,
  },
  {
    href: "/#services",
    label: "Servicios",
    icon: Briefcase,
  },
  {
    href: "/app",
    label: "Mi Espacio",
    icon: LogIn,
  },
];

export function GeneralNavigationGroup() {
  return (
    <ButtonGroup orientation="horizontal" aria-label="General Navigation Button Group">
      <Button iconLeft={<ArrowLeft />} size="sm" variant="outline" asChild>
        <Link href="/">Volver</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button iconRight={<ChevronDownIcon />} size="sm" variant="outline" className="pl-2!">
            Navegación
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            {generalRoutes.map((route) => (
              <DropdownMenuItem key={route.href} asChild>
                <Link href={route.href} className="flex items-center gap-2">
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
