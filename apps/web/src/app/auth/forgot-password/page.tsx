import { ForgotPasswordForm } from "@/components/molecules/forms/auth/forgot-password-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
