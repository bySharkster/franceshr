"use client";

import { CheckCircle, Clock, FileText } from "lucide-react";

import type { Order } from "@/types/database.types";

interface DashboardStatsProps {
  orders: Order[];
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  const activeCount = orders.filter((o) => o.status === "paid" || o.status === "pending").length;

  const completedCount = orders.filter((o) => o.status === "completed").length;

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Active Services */}
      <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="from-primary to-secondary rounded-xl bg-gradient-to-br p-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Servicios Activos</p>
            <p className="text-foreground text-2xl font-bold">{activeCount}</p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="from-primary to-secondary rounded-xl bg-gradient-to-br p-3">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Completados</p>
            <p className="text-foreground text-2xl font-bold">{completedCount}</p>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="from-primary to-secondary rounded-xl bg-gradient-to-br p-3">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-foreground/60 text-sm">En Progreso</p>
            <p className="text-foreground text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
