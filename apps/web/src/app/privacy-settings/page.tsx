"use client";

import dynamic from "next/dynamic";

// Disable SSR for this component since it uses localStorage
const PrivacySettingsClient = dynamic(() => import("./privacy-settings-client"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
        <p className="text-gray-600 dark:text-gray-400">Cargando configuración...</p>
      </div>
    </div>
  ),
});

export default function PrivacySettingsPage() {
  return <PrivacySettingsClient />;
}
