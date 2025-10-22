import Link from "next/link";

import { AuthButton } from "@/components/atoms/buttons/auth-button";
import { DeployButton } from "@/components/atoms/buttons/deploy-button";
import { EnvVarWarning } from "@/components/molecules/env-var-warning";
import { hasEnvVars } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href={"/"}>Next.js Supabase Starter</Link>
          <div className="flex items-center gap-2">
            <DeployButton />
          </div>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
