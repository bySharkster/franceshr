"use client";

import { AlertTriangle, Cookie, Database, Download, Eye, Shield, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ConsentPreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function PrivacySettingsClient() {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        setPreferences(JSON.parse(consent));
      } catch (error) {
        console.error("Failed to load preferences:", error);
      }
    }
  }, []);

  const handleSavePreferences = () => {
    setIsSaving(true);
    const newPrefs = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    localStorage.setItem("cookie-consent-date", newPrefs.timestamp);

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", {
        detail: newPrefs,
      }),
    );

    setTimeout(() => {
      setIsSaving(false);
      alert("Preferencias guardadas exitosamente");
    }, 500);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Collect all user data from localStorage and prepare for export
      const userData = {
        exportDate: new Date().toISOString(),
        cookieConsent: preferences,
        themePreference: localStorage.getItem("franceshr-theme"),
        consentDate: localStorage.getItem("cookie-consent-date"),
        // Add more data as needed
        note: "This export contains all personal data stored locally. For server-side data (orders, onboarding info), please contact privacy@franceshr.com",
      };

      // Create downloadable JSON file
      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `franceshr-data-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert("Datos exportados exitosamente");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Error al exportar datos");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      // Clear all local storage
      localStorage.clear();
      sessionStorage.clear();

      // In a real implementation, you would call an API endpoint to delete server-side data
      // await fetch('/api/account/delete', { method: 'DELETE' });

      alert(
        "Solicitud de eliminación procesada. Los datos locales han sido eliminados. Para eliminar datos del servidor, contacta privacy@franceshr.com",
      );

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error al eliminar cuenta");
    }
  };

  const togglePreference = (key: keyof Omit<ConsentPreferences, "timestamp">) => {
    if (key === "essential") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-linear-to-br min-h-screen from-blue-50 via-purple-50 to-pink-50 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Volver al Inicio
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-r rounded-full from-blue-600 to-purple-600 p-3 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Configuración de Privacidad
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona tus datos y preferencias de privacidad
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cookie Preferences */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center gap-3">
              <Cookie className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Preferencias de Cookies
              </h2>
            </div>

            <div className="space-y-4">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Cookies Esenciales
                    </h3>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Siempre Activas
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Autenticación y funcionalidad básica
                  </p>
                </div>
                <input type="checkbox" checked={true} disabled className="h-5 w-5 opacity-50" />
              </div>

              {/* Functional */}
              <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Cookies Funcionales
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Preferencias de tema e idioma
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference("functional")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.functional ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.functional ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Cookies de Análisis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ayúdanos a mejorar con análisis anónimos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference("analytics")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.analytics ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.analytics ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Cookies de Marketing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contenido y anuncios personalizados
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference("marketing")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.marketing ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.marketing ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSavePreferences}
                disabled={isSaving}
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : "Guardar Preferencias"}
              </button>
            </div>
          </section>

          {/* GDPR Rights */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tus Derechos GDPR
              </h2>
            </div>

            <div className="space-y-4">
              {/* Right to Access */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Ver Mis Datos</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Datos almacenados: Email (
                      {typeof window !== "undefined" && localStorage.getItem("sb-access-token")
                        ? "Autenticado"
                        : "No autenticado"}
                      ), Nombre, Preferencias de cookies
                    </p>
                  </div>
                </div>
              </div>

              {/* Right to Portability */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Download className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Exportar Mis Datos
                      </h3>
                    </div>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      Descarga todos tus datos en formato JSON
                    </p>
                    <button
                      type="button"
                      onClick={handleExportData}
                      disabled={isExporting}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    >
                      {isExporting ? "Exportando..." : "Descargar Datos"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right to Erasure */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Trash2 className="h-5 w-5 text-red-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Eliminar Mi Cuenta
                      </h3>
                    </div>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      Elimina permanentemente todos tus datos
                    </p>
                    {!showDeleteConfirm ? (
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                      >
                        Solicitar Eliminación
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <p className="text-sm font-medium text-red-900 dark:text-red-200">
                            ¿Estás seguro? Esta acción no se puede deshacer.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                          >
                            Sí, Eliminar Todo
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="rounded-2xl border border-gray-200 bg-blue-50 p-6 dark:border-gray-700 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <Shield className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Información Importante
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Tus datos están protegidos según GDPR, UK GDPR y CCPA</li>
                  <li>• Puedes ejercer tus derechos en cualquier momento</li>
                  <li>• Para datos del servidor, contacta: privacy@franceshr.com</li>
                  <li>
                    • Lee nuestra{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Política de Privacidad
                    </Link>{" "}
                    completa
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
