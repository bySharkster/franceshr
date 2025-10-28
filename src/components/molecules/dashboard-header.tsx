"use client";

import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

import { Button } from "@/components/atoms/ui/button";

interface DashboardHeaderProps {
  user: User;
  onSignOut: () => void;
}

export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-foreground text-3xl font-bold sm:text-4xl">Mi Espacio</h1>
        <p className="text-foreground/60 mt-2">Bienvenido, {user.email}</p>
      </div>
      <Button
        type="button"
        onClick={onSignOut}
        variant="outline"
        size="sm"
        iconRight={<LogOut />}
        className="border-border/40 text-foreground/60 hover:text-foreground rounded-lg border px-4 py-2 text-sm transition-colors"
      >
        Cerrar Sesión
      </Button>
    </div>
  );
}
