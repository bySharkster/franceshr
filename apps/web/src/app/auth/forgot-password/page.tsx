import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/molecules/forms/auth/forgot-password-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export const metadata: Metadata = {
  title: "Olvidé mi contraseña",
  description:
    "Recupera tu contraseña en FrancesHR para acceder a tus servicios de Recursos Humanos.",
  openGraph: {
    title: "Olvidé mi contraseña | FrancesHR",
    description:
      "Recupera tu contraseña en FrancesHR para acceder a tus servicios de Recursos Humanos.",
    type: "website",
    url: "https://franceshr.com/auth/forgot-password",
  },
};

export default function Page() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
