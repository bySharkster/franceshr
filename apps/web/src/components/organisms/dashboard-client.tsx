"use client";

import type { OnboardingData, Order } from "@franceshr/types";
import type { User } from "@supabase/supabase-js";
import { CheckCircle, Clock, type LucideIcon } from "lucide-react";

import { signOut } from "@/app/actions/auth-actions";
import { DashboardHeader } from "@/components/molecules/dashboard-header";
import { DashboardStats } from "@/components/molecules/dashboard-stats";
import { OnboardingSection } from "@/components/molecules/onboarding-section";
import { OrdersList } from "@/components/molecules/orders-list";
import { useScrollToFocus } from "@/hooks/useScrollToFocus";

interface DashboardClientProps {
  user: User;
  initialOrders: Order[];
  initialOnboarding: OnboardingData[];
}

export function DashboardClient({ user, initialOrders, initialOnboarding }: DashboardClientProps) {
  const { scrollToElement: scrollToOnboarding, registerRef } = useScrollToFocus();

  const handleSignOut = async () => {
    await signOut();
  };

  const getServiceName = (slug: string) => {
    const names: Record<string, string> = {
      "resume-profesional": "Resume Profesional",
      "mentorias-laborales": "Mentorías Laborales",
      "entrevistas-simuladas": "Entrevistas Simuladas",
    };
    return names[slug] || slug;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: LucideIcon }> = {
      paid: {
        bg: "bg-green-100 dark:bg-green-950",
        text: "text-green-800 dark:text-green-200",
        icon: CheckCircle,
      },
      pending: {
        bg: "bg-yellow-100 dark:bg-yellow-950",
        text: "text-yellow-800 dark:text-yellow-200",
        icon: Clock,
      },
      failed: {
        bg: "bg-red-100 dark:bg-red-950",
        text: "text-red-800 dark:text-red-200",
        icon: Clock,
      },
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
      >
        <Icon className="h-3 w-3" />
        {status === "paid" ? "Pagado" : status === "pending" ? "Pendiente" : "Fallido"}
      </span>
    );
  };

  const findServiceNameById = (id: string) => {
    const service = initialOrders.find((o) => o.id === id);
    if (!service) return "";
    return getServiceName(service.package_slug);
  };

  return (
    <div className="from-background to-background min-h-screen bg-gradient-to-b via-blue-50/30 px-4 py-8 sm:px-6 lg:px-8 dark:via-blue-950/10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <DashboardHeader user={user} onSignOut={handleSignOut} />

        {/* Stats Cards */}
        <DashboardStats orders={initialOrders} />

        {/* Orders List */}
        <OrdersList
          orders={initialOrders}
          onboardingData={initialOnboarding}
          getServiceName={getServiceName}
          getStatusBadge={getStatusBadge}
          scrollToOnboarding={scrollToOnboarding}
        />

        {/* Onboarding Section */}
        <OnboardingSection
          orders={initialOrders}
          onboardingData={initialOnboarding}
          findServiceNameById={findServiceNameById}
          registerRef={registerRef}
        />
      </div>
    </div>
  );
}
