import { createClient } from "@franceshr/database/server";
import { SuspenseLoader } from "@franceshr/ui";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { DashboardClient } from "@/components/organisms/dashboard-client";
import { OnboardingService } from "@/lib/services/onboarding.service";
import { OrdersService } from "@/lib/services/orders.service";

// Server Component - Fetches data on the server
export default async function AppPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch data in parallel on the server
  const [orders, onboardingData] = await Promise.all([
    OrdersService.getUserOrders(user.id),
    OnboardingService.getByUserId(user.id),
  ]);

  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient user={user} initialOrders={orders} initialOnboarding={onboardingData} />
      </Suspense>
    </div>
  );
}

// Loading skeleton component
function DashboardSkeleton() {
  return <SuspenseLoader size="md" fullScreen text="Loading dashboard..." />;
}
