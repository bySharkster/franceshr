import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthLoading } from "@/components/molecules/auth-loading";
import { LoginForm } from "@/components/molecules/forms/auth/login-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión en FrancesHR para acceder a tus servicios de Recursos Humanos.",
  alternates: {
    canonical: "https://franceshr.com/auth/login",
  },
  openGraph: {
    title: "Iniciar Sesión | FrancesHR",
    description: "Inicia sesión en FrancesHR para acceder a tus servicios de Recursos Humanos.",
    type: "website",
    url: "https://franceshr.com/auth/login",
  },
};

export default function LoginPage() {
  return (
    <AuthWrapper>
      <Suspense fallback={<AuthLoading />}>
        <LoginForm />
      </Suspense>
    </AuthWrapper>
  );
}
