"use client";

import { Cookie, Settings, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../atoms/ui/button";

interface ConsentPreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        applyConsent(saved);
      } catch (error) {
        console.error("Failed to parse consent preferences:", error);
        setShowBanner(true);
      }
    }
  }, []);

  const applyConsent = (prefs: ConsentPreferences) => {
    // Store consent in localStorage
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", prefs.timestamp);

    // Apply functional cookies
    if (prefs.functional) {
      // Enable theme and language preferences
      // These are handled by next-themes and other libraries
    }

    // Apply analytics cookies (when implemented)
    if (prefs.analytics) {
      // Future: Initialize analytics (Google Analytics, etc.)
      console.log("Analytics consent granted");
    } else {
      // Disable analytics
      console.log("Analytics consent denied");
    }

    // Apply marketing cookies (currently none)
    if (prefs.marketing) {
      console.log("Marketing consent granted");
    } else {
      console.log("Marketing consent denied");
    }

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", {
        detail: prefs,
      }),
    );
  };

  const handleAcceptAll = () => {
    const newPrefs: ConsentPreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(newPrefs);
    applyConsent(newPrefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newPrefs: ConsentPreferences = {
      essential: true, // Essential cookies cannot be rejected
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    setPreferences(newPrefs);
    applyConsent(newPrefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    const newPrefs = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    setPreferences(newPrefs);
    applyConsent(newPrefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof Omit<ConsentPreferences, "timestamp">) => {
    if (key === "essential") return; // Cannot toggle essential cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="bg-card/20 fixed inset-0 z-40 backdrop-blur-sm" />

      {/* Banner */}
      <div className="border-border bg-card fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-2xl sm:p-6">
        <div className="mx-auto max-w-7xl">
          {!showSettings ? (
            // Simple Banner View
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Cookie className="text-primary mt-1 h-6 w-6 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-foreground mb-1 text-lg font-semibold">Cookies & Privacy</h3>
                  <p className="text-muted-foreground text-sm">
                    Utilizamos cookies esenciales para el funcionamiento del sitio. Puedes
                    personalizar tus preferencias o aceptar todas las cookies.{" "}
                    <Link
                      href="/cookies"
                      className="text-primary font-medium underline-offset-2 hover:underline"
                    >
                      Más información
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <Settings className="h-4 w-4" />
                  Personalizar
                </Button>
                <Button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Rechazar
                </Button>
                <Button
                  type="button"
                  onClick={handleAcceptAll}
                  className="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  Aceptar Todas
                </Button>
              </div>
            </div>
          ) : (
            // Detailed Settings View
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Preferencias de Cookies</h3>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowSettings(false)}
                  aria-label="Cerrar configuración"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* Essential Cookies */}
                <div className="bg-card/50 flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="text-foreground font-semibold">Cookies Esenciales</h4>
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Siempre Activas
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Necesarias para la autenticación y funcionalidad básica del sitio. No se
                      pueden desactivar.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 opacity-50"
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-card/50 flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1 font-semibold">Cookies Funcionales</h4>
                    <p className="text-muted-foreground text-sm">
                      Permiten recordar tus preferencias (tema, idioma) para mejorar tu experiencia.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePreference("functional")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.functional ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label="Toggle functional cookies"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.functional ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-card/50 flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1 font-semibold">Cookies de Análisis</h4>
                    <p className="text-muted-foreground text-sm">
                      Nos ayudan a entender cómo usas el sitio para mejorarlo. Actualmente no
                      implementadas.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePreference("analytics")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.analytics ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label="Toggle analytics cookies"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.analytics ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-card/50 flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1 font-semibold">Cookies de Marketing</h4>
                    <p className="text-muted-foreground text-sm">
                      Utilizadas para publicidad personalizada. Actualmente no utilizamos cookies de
                      marketing.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePreference("marketing")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.marketing ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label="Toggle marketing cookies"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.marketing ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end dark:border-gray-700">
                <Button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Rechazar Todas
                </Button>
                <Button
                  type="button"
                  onClick={handleSavePreferences}
                  className="rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  Guardar Preferencias
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
