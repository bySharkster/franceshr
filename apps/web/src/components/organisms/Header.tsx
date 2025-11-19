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
  navSection?: ReactNode;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

export const Header = ({
  hasEnvVars,
  user,
  authSection,
  navSection,
  onLogin,
  onSignup,
  onLogout,
}: HeaderProps) => {
  const isAuthenticated = !!user;

  const renderNavSection = () => {
    if (navSection) {
      return navSection;
    }
  };
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
            onClick={onLogin}
            size="default"
            variant="default"
          >
            <Link href="/protected">Ir al Panel</Link>
          </Button>{" "}
          <Button
            type="button"
            onClick={onLogout}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 text-xs font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          >
            Sign out
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button
          asChild
          className=""
          iconLeft={null}
          iconRight={<ArrowRight />}
          onClick={onLogin}
          size="sm"
          variant="ghost"
        >
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>{" "}
        <Button
          asChild
          className=""
          iconLeft={null}
          iconRight={<ArrowRight />}
          onClick={onSignup}
          size="default"
          variant="default"
        >
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className="border-b-foreground/10 z-50 flex h-16 w-full justify-center border-b">
      <div className="relative flex w-full max-w-7xl items-center justify-between gap-4 p-3 px-5 text-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 font-semibold">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={450}
              height={450}
              className="h-8 w-8"
              priority
            />
            <span className="hidden font-sans text-2xl font-bold md:flex">FrancesHR</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
          {renderNavSection()}
        </div>

        <div className="flex items-center gap-4">
          {/* Auth Section - Right */}
          <div className="flex items-center gap-2">{renderAuthSection()}</div>

          {/* Mobile View */}
          <div className="flex h-6 w-6 items-center gap-2 md:hidden">{renderNavSection()}</div>
        </div>
      </div>
    </nav>
  );
};
