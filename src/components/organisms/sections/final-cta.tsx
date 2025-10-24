"use client";

import { ArrowRight, Calendar, Rocket } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-16 sm:gap-10 sm:py-20 md:gap-12 md:py-24 lg:py-32">
      {/* Background with strong gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />

      {/* Decorative blur elements */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96 dark:bg-blue-700/20" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96 dark:bg-purple-700/20" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:gap-10 sm:px-6 md:gap-12 lg:px-8">
        {/* Icon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="from-primary to-secondary inline-flex items-center justify-center rounded-3xl bg-linear-to-br p-4 shadow-2xl sm:p-5"
        >
          <Rocket className="text-background h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Da el siguiente paso en{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              tu carrera
            </span>
          </h2>

          {/* Description */}
          <p className="text-foreground/80 mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl">
            Convierte tus metas laborales en resultados reales.
          </p>

          <p className="text-foreground/70 mx-auto max-w-2xl text-base sm:text-lg">
            Agenda hoy una sesión personalizada y comienza a proyectar tu mejor versión profesional.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="#contact"
            className="from-primary to-secondary group hover:shadow-3xl inline-flex items-center gap-3 rounded-xl bg-linear-to-r px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 sm:px-10 sm:py-5 sm:text-xl"
          >
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
            Agenda tu sesión ahora
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2 sm:h-7 sm:w-7" />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
        >
          <div className="text-foreground/60 flex items-center gap-2 text-sm sm:text-base">
            <div className="from-primary to-secondary h-2 w-2 rounded-full bg-linear-to-r" />
            <span>Respuesta en 24 horas</span>
          </div>
          <div className="text-foreground/60 flex items-center gap-2 text-sm sm:text-base">
            <div className="from-primary to-secondary h-2 w-2 rounded-full bg-linear-to-r" />
            <span>100% personalizado</span>
          </div>
          <div className="text-foreground/60 flex items-center gap-2 text-sm sm:text-base">
            <div className="from-primary to-secondary h-2 w-2 rounded-full bg-linear-to-r" />
            <span>Resultados garantizados</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
