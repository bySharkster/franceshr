import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthLoading } from "@/components/molecules/auth-loading";
import { SignUpForm } from "@/components/molecules/forms/auth/sign-up-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export const metadata: Metadata = {
  title: "Registrarse",
  description: "Regístrate en FrancesHR para acceder a tus servicios de Recursos Humanos.",
  alternates: {
    canonical: "https://franceshr.com/auth/sign-up",
  },
  openGraph: {
    title: "Registrarse | FrancesHR",
    description: "Regístrate en FrancesHR para acceder a tus servicios de Recursos Humanos.",
    type: "website",
    url: "https://franceshr.com/auth/sign-up",
  },
};

export default function Page() {
  return (
    <AuthWrapper>
      <Suspense fallback={<AuthLoading />}>
        <SignUpForm />
      </Suspense>
    </AuthWrapper>
  );
}
