import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface HeaderProps {
  navSection?: ReactNode;
  authSection?: ReactNode;
}

export const Header = ({ navSection, authSection }: HeaderProps) => {
  const renderNavSection = () => {
    if (navSection) {
      return navSection;
    }
  };
  const renderAuthSection = () => {
    if (authSection) {
      return authSection;
    }

    return null;
  };

  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="relative flex w-full max-w-7xl items-center justify-between gap-4 p-3 px-5 text-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 font-semibold">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <h1 className="hidden font-sans text-2xl md:flex">FrancesHR</h1>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
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
