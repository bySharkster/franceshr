import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.svg";

import { AuthButton } from "@/components/atoms/buttons/auth-button";
import { EnvVarWarning } from "@/components/molecules/env-var-warning";
import { hasEnvVars } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <h1 className="hidden font-sans text-3xl md:block">
            <Link href={"/"}>FrancesHR</Link>
          </h1>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
