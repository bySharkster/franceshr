import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "@/components/molecules/theme-switcher";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-foreground text-lg font-bold">FrancesHR</h3>
            <p className="text-foreground/60 mt-2 text-sm">
              Servicios profesionales de recursos humanos para impulsar tu carrera.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground text-sm font-semibold">Enlaces Rápidos</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-foreground/60 hover:text-foreground text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-foreground/60 hover:text-foreground text-sm"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/app" className="text-foreground/60 hover:text-foreground text-sm">
                  Mi Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground text-sm font-semibold">Servicios</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-foreground/60 hover:text-foreground text-sm"
                >
                  Resume Profesional
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-foreground/60 hover:text-foreground text-sm"
                >
                  Mentorías Laborales
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-foreground/60 hover:text-foreground text-sm"
                >
                  Entrevistas Simuladas
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Theme */}
          <div>
            <h4 className="text-foreground text-sm font-semibold">Síguenos</h4>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-foreground/60 text-xs">
              © {new Date().getFullYear()} FrancesHR. Todos los derechos reservados.
            </p>
            <p className="text-foreground/60 text-xs">
              Powered by{" "}
              <a
                href="https://fernandoaponte.dev/?utm_source=franceshr&utm_medium=footer&utm_term=franceshr"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                CodeWfer
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
