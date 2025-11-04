/** biome-ignore-all lint/correctness/useUniqueElementIds: false positive */
"use client";

import { createClient } from "@franceshr/database/client";
import type { Order } from "@franceshr/types";
import type { ServiceDetails, ServiceType } from "@franceshr/types";
import type { User } from "@supabase/supabase-js";
import { ArrowRight, CheckCircle, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/atoms/ui/button";
import { getServiceByType } from "@/config/services.config";

interface OnboardingFormData {
  careerGoals: string;
  industryPursuing: string;
  relatedExperience: string;
  currentResume: File | null;
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("service");
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<OnboardingFormData>({
    careerGoals: "",
    industryPursuing: "",
    relatedExperience: "",
    currentResume: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  // TODO this can be a hook @checkout uses to
  const [service, setService] = useState<ServiceDetails | null>(null);

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

      // If coming from checkout with session_id, poll for order creation
      if (sessionId) {
        let attempts = 0;
        const maxAttempts = 20; // Poll for up to 20 seconds
        const pollInterval = 1000; // Check every second

        const pollForOrder = async () => {
          const { data: order } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", currentUser.id)
            .eq("package_slug", serviceType)
            .eq("status", "paid")
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          if (order) {
            console.log("Order found:", order);
            setOrder(order);
            setVerifyingPayment(false);
            return true;
          }

          attempts++;
          if (attempts >= maxAttempts) {
            console.log("Max polling attempts reached, order not found");
            // Still allow access - webhook might be delayed
            setOrder(null);
            setVerifyingPayment(false);
            return false;
          }

          // Continue polling
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
          return pollForOrder();
        };

        await pollForOrder();
      } else {
        // No session_id, check if order exists (returning user)
        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("package_slug", serviceType)
          .eq("status", "paid")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (!order) {
          console.log("No orders found, redirecting to service page");
          router.push(`/services/${serviceType}`);
          return;
        }

        console.log("Existing order found:", order);
        setOrder(order);
        setVerifyingPayment(false);
      }
    };

    if (serviceType) {
      checkAuth();
    }
  }, [serviceType, sessionId, router]);

  useEffect(() => {
    if (serviceType) {
      const service = getServiceByType(serviceType as ServiceType);
      setService(service);
    }
  }, [serviceType]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-foreground mb-4 text-2xl font-bold">Por favor inicia sesión</h1>
          <Button
            type="button"
            asChild
            iconRight={<ArrowRight className="h-5 w-5" />}
            className="from-primary to-secondary bg-linear-to-r inline-flex items-center gap-2 rounded-full px-6 py-3 text-white"
          >
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (verifyingPayment) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">Verificando tu compra...</h1>
          <p className="text-foreground/60">Esto puede tomar unos segundos</p>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Por favor sube un archivo PDF o Word (.doc, .docx)");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo no debe superar 5MB");
        return;
      }
      setFormData({ ...formData, currentResume: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      // Upload resume if provided
      let resumeUrl = null;
      if (formData.currentResume) {
        setUploadProgress(30);

        const fileExt = formData.currentResume.name.split(".").pop();
        const filePath = `${user.id}/resume_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, formData.currentResume, {
            upsert: true, // Overwrite if file already exists
          });

        if (uploadError) throw uploadError;

        setUploadProgress(60);

        // Get long-lived signed URL for email (valid for 30 days)
        const { data, error: signError } = await supabase.storage
          .from("resumes")
          .createSignedUrl(filePath, 2592000); // 30 days

        if (signError) throw signError;

        resumeUrl = data.signedUrl;
      }

      setUploadProgress(80);

      if (!service) throw new Error("Service not found");
      if (!order) throw new Error("Order not found");

      // Save onboarding data to database
      // TODO: Use service.id instead of hardcoding
      // TODO: align service.id with the one in the database
      const { error: dbError } = await supabase.from("onboarding_data").insert({
        user_id: user.id,
        service_id: service.id,
        order_id: order.id,
        career_goals: formData.careerGoals,
        industry_pursuing: formData.industryPursuing,
        related_experience: formData.relatedExperience,
        resume_url: resumeUrl,

        created_at: new Date().toISOString(),
      });

      if (dbError) throw dbError;

      setUploadProgress(90);

      // Send email notification to owner via API
      await fetch("/api/send-onboarding-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
          serviceId: service.id,
          formData: {
            careerGoals: formData.careerGoals,
            industryPursuing: formData.industryPursuing,
            relatedExperience: formData.relatedExperience,
            resumeUrl,
          },
        }),
      });

      setUploadProgress(100);
      setSubmitted(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/app");
      }, 2000);
    } catch (error) {
      console.error("Onboarding error:", error);
      alert("Error al enviar la información. Por favor intenta de nuevo.");
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="from-primary to-secondary bg-linear-to-br mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-foreground mb-4 text-3xl font-bold">¡Información Enviada!</h1>
          <p className="text-foreground/70 mb-6 text-lg">
            Hemos recibido tu información. Comenzaremos a trabajar en tu resume profesional.
          </p>
          <p className="text-foreground/60 text-sm">Redirigiendo al dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="from-background to-background dark:from-background dark:to-background bg-linear-to-b min-h-screen via-blue-50/30 px-4 py-20 dark:via-blue-950/10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Cuéntanos sobre tu carrera
          </h1>
          <p className="text-foreground/70 text-lg">
            Esta información nos ayudará a crear el resume perfecto para ti
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border-border/40 bg-card/80 rounded-3xl border p-8 shadow-xl backdrop-blur-sm sm:p-12"
        >
          {/* Career Goals */}
          <div className="mb-6">
            <label
              htmlFor="careerGoals"
              className="text-foreground mb-2 block text-sm font-semibold"
            >
              Objetivos Profesionales
              <span className="text-red-500/60">&nbsp;*</span>
            </label>
            <textarea
              id="careerGoals"
              required
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              placeholder="¿Qué tipo de posición buscas? ¿Cuáles son tus metas a corto y largo plazo?"
              className="border-border/40 bg-background/50 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
              rows={4}
            />
          </div>

          {/* Industry Pursuing */}
          <div className="mb-6">
            <label
              htmlFor="industryPursuing"
              className="text-foreground mb-2 block text-sm font-semibold"
            >
              Industria o Sector
              <span className="text-red-500/60">&nbsp;*</span>
            </label>
            <input
              id="industryPursuing"
              type="text"
              required
              value={formData.industryPursuing}
              onChange={(e) => setFormData({ ...formData, industryPursuing: e.target.value })}
              placeholder="Ej: Tecnología, Finanzas, Salud, Marketing, etc."
              className="border-border/40 bg-background/50 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Related Experience */}
          <div className="mb-6">
            <label
              htmlFor="relatedExperience"
              className="text-foreground mb-2 block text-sm font-semibold"
            >
              Experiencia Relevante
              <span className="text-red-500/60">&nbsp;*</span>
            </label>
            <textarea
              id="relatedExperience"
              required
              value={formData.relatedExperience}
              onChange={(e) => setFormData({ ...formData, relatedExperience: e.target.value })}
              placeholder="Describe brevemente tu experiencia laboral más relevante, logros destacados y habilidades clave"
              className="border-border/40 bg-background/50 text-foreground placeholder:text-foreground/40 focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
              rows={6}
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-8">
            <label
              htmlFor="resumeUpload"
              className="text-foreground mb-2 block text-sm font-semibold"
            >
              Resume Actual (Opcional)
            </label>
            <p className="text-foreground/60 mb-3 text-sm">
              Si tienes un resume actual, súbelo para que podamos usarlo como referencia
            </p>
            <div className="border-border/40 bg-background/50 hover:border-primary/50 relative rounded-lg border-2 border-dashed p-6 text-center transition-colors">
              <input
                id="resumeUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <Upload className="text-foreground/40 mx-auto mb-2 h-10 w-10" />
              <p className="text-foreground/70 mb-1 text-sm font-medium">
                {formData.currentResume
                  ? formData.currentResume.name
                  : "Haz clic o arrastra tu archivo aquí"}
              </p>
              <p className="text-foreground/50 text-xs">PDF, DOC, DOCX (máx. 5MB)</p>
            </div>
          </div>

          {/* Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="mb-6">
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className="from-primary to-secondary bg-linear-to-r h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-foreground/60 mt-2 text-center text-sm">
                Procesando... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !service || !order}
            className="from-primary to-secondary bg-linear-to-r flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Información
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-foreground/50 mt-4 text-center text-xs">
            Tu información está segura y será utilizada únicamente para crear tu resume profesional
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
