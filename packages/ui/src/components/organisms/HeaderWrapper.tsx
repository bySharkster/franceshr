import type { JwtPayload } from "@supabase/supabase-js";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

import { Button } from "../atoms/ui/button";
import { EnvVarWarning } from "../molecules/env-var-warning";
import { NavSection } from "../molecules/nav-section";
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
  const user: JwtPayload | null = data?.claims || null;

  const navSection = <NavSection />;
  // Build the auth section with real Next.js Links and forms
  const authSection = !hasEnvVars ? (
    <EnvVarWarning />
  ) : user ? (
    <div className="flex items-center gap-4">
      Hola, {user.user_metadata.full_name}!
      <Button asChild size="sm" variant="default" className="hidden md:flex">
        <Link href="/app">Ir al App</Link>
      </Button>
      {/* <LogoutButton /> */}
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="ghost" className="hidden md:flex">
        <Link href="/auth/login">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth/sign-up">Registrarse</Link>
      </Button>
    </div>
  );

  return <Header navSection={navSection} authSection={authSection} hasEnvVars={hasEnvVars} />;
}
