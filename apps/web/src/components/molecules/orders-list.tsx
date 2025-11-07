"use client";

import type { OnboardingData, Order } from "@franceshr/types";
import { AlertCircle, ArrowRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/ui/button";

interface OrdersListProps {
  orders: Order[];
  onboardingData: OnboardingData[];
  getServiceName: (slug: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  scrollToOnboarding: (id: string) => void;
}

export function OrdersList({
  orders,
  onboardingData,
  getServiceName,
  getStatusBadge,
  scrollToOnboarding,
}: OrdersListProps) {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-foreground mb-4 text-2xl font-bold">Mis Servicios</h2>
        <div className="border-border/40 bg-card/80 rounded-2xl border p-12 text-center shadow-lg backdrop-blur-sm">
          <FileText className="text-foreground/20 mx-auto mb-4 h-16 w-16" />
          <p className="text-foreground/60 mb-4 text-lg">No tienes servicios activos</p>
          <button
            type="button"
            onClick={() => router.push("/#services")}
            className="from-primary to-secondary bg-linear-to-r inline-flex items-center gap-2 rounded-full px-6 py-3 text-white"
          >
            Explorar Servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-foreground mb-4 text-2xl font-bold">Mis Servicios</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-foreground text-lg font-semibold">
                    {getServiceName(order.package_slug)}
                  </h3>
                  {getStatusBadge(order.status)}
                  {order.status === "paid" &&
                    !onboardingData.some((data) => data.order_id === order.id) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 dark:bg-orange-950 dark:text-orange-200">
                        <AlertCircle className="h-3 w-3" />
                        Onboarding Pendiente
                      </span>
                    )}
                </div>
                <p className="text-foreground/60 text-sm">
                  Comprado el{" "}
                  {new Date(order.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-foreground/80 mt-1 font-semibold">
                  ${order.amount / 100} {order.currency.toUpperCase()}
                </p>
              </div>
              {order.status === "paid" && (
                <>
                  {(() => {
                    const hasOnboarding = onboardingData.some((data) => data.order_id === order.id);

                    if (!hasOnboarding) {
                      // Show "Complete Onboarding" button if no onboarding data exists
                      return (
                        <Button
                          type="button"
                          iconRight={<ArrowRight />}
                          variant="default"
                          size="sm"
                          onClick={() => router.push(`/onboarding?orderId=${order.id}`)}
                          className="from-primary to-secondary bg-linear-to-r"
                        >
                          Completar Onboarding
                        </Button>
                      );
                    }

                    // Show "View Details" button if onboarding exists
                    return (
                      <Button
                        type="button"
                        iconRight={<ArrowRight />}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const onboarding = onboardingData.find(
                            (data) => data.order_id === order.id,
                          );
                          if (onboarding) scrollToOnboarding(onboarding.id);
                        }}
                      >
                        Ver Detalles
                      </Button>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
