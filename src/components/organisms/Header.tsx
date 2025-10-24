import type { JwtPayload } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "../atoms/ui/button";

export interface HeaderProps {
  hasEnvVars?: boolean;
  user?: JwtPayload;
  authSection?: ReactNode;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

export const Header = ({
  hasEnvVars = true,
  user,
  authSection,
  onLogin,
  onSignup,
  onLogout,
}: HeaderProps) => {
  const isAuthenticated = !!user;

  const renderAuthSection = () => {
    if (authSection) {
      return authSection;
    }

    if (!hasEnvVars) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-yellow-500 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
          <span>⚠️ Missing environment variables</span>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          <span>Hola, {user?.email}!</span>
          <Button
            asChild
            className=""
            iconLeft={null}
            iconRight={<ArrowRight />}
            onClick={() => {}}
            size="default"
            variant="default"
          >
            <Link href="/protected">Ir al Panel</Link>
          </Button>{" "}
          <Button
            type="button"
            onClick={onLogout}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Sign out
          </Button>
        </div>
      );
    }

    return (
      <>
        <button
          type="button"
          onClick={onLogin}
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={onSignup}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium whitespace-nowrap shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Sign up
        </button>
      </>
    );
  };

  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="hidden font-sans text-3xl md:block">
            <Link href={"/"}>FrancesHR</Link>
          </h1>
        </div>
        <div className="flex items-center gap-2">{renderAuthSection()}</div>
      </div>
    </nav>
  );
};
