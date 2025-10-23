import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

import { LogoutButton } from "../atoms/buttons/logout-button";
import { Button } from "../atoms/ui/button";
import { EnvVarWarning } from "../molecules/env-var-warning";
import { Header } from "./Header";

/**
 * Server-side wrapper for the Header component that fetches user data
 * and integrates with Supabase authentication.
 *
 * This component should be used in your layouts and pages.
 * The base Header component is used in Storybook for testing.
 */
export async function HeaderWrapper() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Build the auth section with real Next.js Links and forms
  const authSection = !hasEnvVars ? (
    <EnvVarWarning />
  ) : user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );

  return <Header hasEnvVars={!!hasEnvVars} user={user ?? undefined} authSection={authSection} />;
}
