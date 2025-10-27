"use client";

import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { getServiceById } from "@/config/services.config";
import { createClient } from "@/lib/supabase/client";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const service = serviceId ? getServiceById(serviceId) : null;

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkAuth();
  }, []);

  if (!service || !service.stripePriceId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-foreground mb-4 text-2xl font-bold">Servicio no encontrado</h1>
          <Link
            href="/"
            className="from-primary to-secondary inline-flex items-center gap-2 rounded-full bg-linear-to-r px-6 py-3 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Check if user is authenticated
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        // Redirect to login with return URL
        const returnUrl = `/checkout?service=${serviceId}`;
        router.push(`/auth/login?next=${encodeURIComponent(returnUrl)}`);
        return;
      }

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/jsopn",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          priceId: service.stripePriceId,
          package_slug: service.id,
          successUrl: `${window.location.origin}/onboarding?service=${service.id}`,
          cancelUrl: `${window.location.origin}/services/${service.id}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la sesión de pago");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió URL de pago");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Error al procesar el pago");
      setLoading(false);
    }
  };

  const Icon = service.icon;

  return (
    <div className="from-background to-background dark:from-background dark:to-background min-h-screen bg-linear-to-b via-blue-50/30 px-4 py-20 dark:via-blue-950/10">
      <div className="mx-auto max-w-2xl">
        {/* Back Button */}
        <Link
          href={`/services/${service.id}`}
          className="text-foreground/60 hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver al servicio
        </Link>

        {/* Checkout Card */}
        <div className="border-border/40 bg-card/80 rounded-3xl border p-8 shadow-xl backdrop-blur-sm sm:p-12">
          {/* Service Info */}
          <div className="mb-8 flex items-start gap-4">
            <div className="from-primary to-secondary rounded-2xl bg-linear-to-br p-3 shadow-lg">
              <Icon className="text-background h-8 w-8" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h1 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
                {service.title}
              </h1>
              <p className="text-foreground/70">{service.shortDescription}</p>
            </div>
          </div>

          {/* Price */}
          <div className="border-border/40 bg-muted/30 mb-8 rounded-2xl border p-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70 text-lg">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-foreground text-4xl font-bold">${service.price}</span>
                <span className="text-foreground/60">{service.currency}</span>
              </div>
            </div>
            {service.deliveryTime && (
              <p className="text-foreground/60 mt-3 text-sm">
                Tiempo de entrega: {service.deliveryTime}
              </p>
            )}
          </div>

          {/* What's Included */}
          {service.includes && (
            <div className="mb-8">
              <h3 className="text-foreground mb-4 text-lg font-semibold">Incluye:</h3>
              <ul className="space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="text-foreground/70 flex items-start gap-2 text-sm">
                    <span className="from-primary to-secondary mt-1 bg-linear-to-br bg-clip-text text-lg leading-none text-transparent">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/20 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Auth Status */}
          {!user && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-200">
              Serás redirigido al inicio de sesión antes de completar la compra
            </div>
          )}

          {/* Checkout Button */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="from-primary to-secondary flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <span>Proceder al pago</span>
            )}
          </button>

          {/* Security Note */}
          <p className="text-foreground/50 mt-4 text-center text-xs">
            Pago seguro procesado por Stripe. Tus datos están protegidos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
