import { Mail, MapPin, Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-text mb-4 text-lg font-semibold">FrancesHR</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Soluciones profesionales de recursos humanos para impulsar tu carrera.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Puerto Rico & United States</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-text mb-4 text-lg font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/resume-basico"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Resume Básico
                </Link>
              </li>
              <li>
                <Link
                  href="/services/resume-profesional"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Resume para Profesionales
                </Link>
              </li>
              <li>
                <Link
                  href="/services/resume-ejecutivo"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Resume para Ejecutivos
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mentorias-laborales"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Mentorías Laborales
                </Link>
              </li>
              <li>
                <Link
                  href="/services/entrevistas-simuladas"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Entrevistas Simuladas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5" />
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-settings"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text mb-4 flex items-center gap-2 text-lg font-semibold">
              <Mail className="h-5 w-5" />
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@franceshr.com"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  info@franceshr.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:privacy@franceshr.com"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  privacy@franceshr.com
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Formulario de Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} FrancesHR. All rights reserved.
            </p>

            {/* Compliance Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                GDPR Compliant
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                CCPA Compliant
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                UK GDPR
              </span>
            </div>
          </div>

          {/* Jurisdiction Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Serving clients in the United States, Puerto Rico, and United Kingdom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
