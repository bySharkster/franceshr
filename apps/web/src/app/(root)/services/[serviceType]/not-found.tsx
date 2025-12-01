import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="from-primary to-secondary dark:from-background dark:to-background bg-linear-to-b relative min-h-screen via-blue-50/30 dark:via-blue-950/10">
      {/* Back Button */}
      <div className="absolute left-4 top-8 z-50 w-full max-w-3xl items-center justify-start gap-2 pb-8">
        <Link
          href="/"
          className="text-foreground/70 hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Content */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="from-primary to-secondary bg-linear-to-br mx-auto mb-8 inline-flex items-center justify-center rounded-2xl p-6 shadow-lg">
            <FileQuestion className="text-background h-16 w-16" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className="text-foreground mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Servicio no encontrado
          </h1>

          {/* Description */}
          <p className="text-foreground/70 mb-8 text-lg leading-relaxed sm:text-xl">
            Lo sentimos, el servicio que buscas no existe o ha sido movido. Explora nuestros
            servicios disponibles para encontrar lo que necesitas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#services"
              className="from-primary to-secondary bg-linear-to-r inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Ver servicios
            </Link>
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground inline-flex items-center gap-2 text-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Ir al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
