import { Suspense } from "react";

import { AuthLoading } from "@/components/molecules/auth-loading";
import { SignUpForm } from "@/components/molecules/forms/auth/sign-up-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <Suspense fallback={<AuthLoading />}>
        <SignUpForm />
      </Suspense>
    </AuthWrapper>
  );
}
