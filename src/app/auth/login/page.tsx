import { LoginForm } from "@/components/molecules/forms/auth/login-form";
import { AuthWrapper } from "@/components/organisms/wrappers/auth-wrapper";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
