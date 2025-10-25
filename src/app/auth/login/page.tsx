import { Suspense } from "react";

import { AuthLoading } from "@/components/molecules/auth-loading";
import { LoginForm } from "@/components/molecules/forms/auth/login-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <Suspense fallback={<AuthLoading />}>
        <LoginForm />
      </Suspense>
    </AuthWrapper>
  );
}
