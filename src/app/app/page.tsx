"use client";

import type { User } from "@supabase/supabase-js";
import {
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  LogOut,
  type LucideIcon,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/atoms/ui/button";
import { createClient } from "@/lib/supabase/client";

import { signOut } from "../actions/auth-actions";

interface Order {
  id: string;
  package_slug: string;
  status: string;
  created_at: string;
  amount: number;
  currency: string;
}

interface OnboardingData {
  id: string;
  service_id: string;
  career_goals: string;
  industry_pursuing: string;
  related_experience: string;
  resume_url: string | null;
  created_at: string;
}

export default function AppPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [onboardingData, setOnboardingData] = useState<OnboardingData[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      setUser(currentUser);

      // Fetch user's orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (ordersData) {
        setOrders(ordersData);
      }

      // Fetch onboarding data
      const { data: onboardingDataResult } = await supabase
        .from("onboarding_data")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (onboardingDataResult) {
        setOnboardingData(onboardingDataResult);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

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

  return (
    <div className="from-background to-background dark:from-background dark:to-background min-h-screen bg-linear-to-b via-blue-50/30 px-4 py-8 sm:px-6 lg:px-8 dark:via-blue-950/10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl">Mi Dashboard</h1>
            <p className="text-foreground/60 mt-2">Bienvenido, {user?.email}</p>
          </div>
          <Button
            type="button"
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            iconRight={<LogOut />}
            className="text-foreground/60 hover:text-foreground border-border/40 rounded-lg border px-4 py-2 text-sm transition-colors"
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="from-primary to-secondary rounded-xl bg-linear-to-br p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm">Servicios Activos</p>
                <p className="text-foreground text-2xl font-bold">
                  {orders.filter((o) => o.status === "paid").length}
                </p>
              </div>
            </div>
          </div>

          <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="from-primary to-secondary rounded-xl bg-linear-to-br p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm">Completados</p>
                <p className="text-foreground text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="from-primary to-secondary rounded-xl bg-linear-to-br p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm">En Progreso</p>
                <p className="text-foreground text-2xl font-bold">
                  {orders.filter((o) => o.status === "paid").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <h2 className="text-foreground mb-4 text-2xl font-bold">Mis Servicios</h2>
          {orders.length === 0 ? (
            <div className="border-border/40 bg-card/80 rounded-2xl border p-12 text-center shadow-lg backdrop-blur-sm">
              <FileText className="text-foreground/20 mx-auto mb-4 h-16 w-16" />
              <p className="text-foreground/60 mb-4 text-lg">No tienes servicios activos</p>
              <button
                type="button"
                onClick={() => router.push("/#services")}
                className="from-primary to-secondary inline-flex items-center gap-2 rounded-full bg-linear-to-r px-6 py-3 text-white"
              >
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-foreground text-lg font-semibold">
                          {getServiceName(order.package_slug)}
                        </h3>
                        {getStatusBadge(order.status)}
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
                    {order.package_slug === "resume-profesional" && order.status === "paid" && (
                      <button
                        type="button"
                        onClick={() => router.push(`/onboarding?service=${order.package_slug}`)}
                        className="from-primary to-secondary inline-flex items-center gap-2 rounded-full bg-linear-to-r px-6 py-2 text-sm font-semibold text-white"
                      >
                        Ver Detalles
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Onboarding Data Section */}
        {onboardingData.length > 0 && (
          <div>
            <h2 className="text-foreground mb-4 text-2xl font-bold">Información Enviada</h2>
            <div className="space-y-4">
              {onboardingData.map((data) => (
                <div
                  key={data.id}
                  className="border-border/40 bg-card/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Upload className="from-primary to-secondary h-5 w-5 bg-linear-to-br bg-clip-text text-transparent" />
                    <h3 className="text-foreground text-lg font-semibold">
                      {getServiceName(data.service_id)}
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-foreground/60 mb-1 font-medium">Objetivos:</p>
                      <p className="text-foreground/80">{data.career_goals}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 mb-1 font-medium">Industria:</p>
                      <p className="text-foreground/80">{data.industry_pursuing}</p>
                    </div>
                    {data.resume_url && (
                      <div>
                        <a
                          href={data.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-medium underline"
                        >
                          Ver Resume Enviado
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
