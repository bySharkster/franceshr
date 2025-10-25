"use client";

import { ArrowRight, Briefcase, MessageSquare, Users } from "lucide-react";
import { motion } from "motion/react";

import { ServiceCard } from "@/components/molecules/ServiceCard";

export function Services() {
  const services = [
    {
      icon: Briefcase,
      title: "Resume Profesional",
      description:
        "Haz que tu resume comunique tu valor real. Diseños modernos, contenido estratégico y redacción optimizada para captar la atención de reclutadores y sistemas automatizados (ATS).",
      ctaText: "Ver detalles",
      ctaLink: "/services/resume-profesional",
    },
    {
      icon: Users,
      title: "Mentorías Laborales",
      description:
        "Recibe orientación personalizada para definir objetivos, fortalecer tu marca personal y trazar un plan efectivo de crecimiento profesional.",
      ctaText: "Ver detalles",
      ctaLink: "/services/mentorias-laborales",
    },
    {
      icon: MessageSquare,
      title: "Entrevistas Simuladas",
      description:
        "Prepárate con una experta en coaching laboral y reclutamiento. Mejora tus respuestas, lenguaje corporal y seguridad antes de tu próxima entrevista.",
      ctaText: "Ver detalles",
      ctaLink: "/services/entrevistas-simuladas",
    },
  ];

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-24">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10" />

      {/* Decorative blur elements */}
      <div className="absolute top-20 left-1/3 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-blue-800/10" />
      <div className="absolute right-1/3 bottom-20 h-40 w-40 rounded-full bg-indigo-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-indigo-800/10" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center sm:gap-5"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="from-primary to-secondary inline-flex items-center justify-center rounded-2xl bg-linear-to-br p-3 shadow-lg"
          >
            <Briefcase className="text-background h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1} />
          </motion.div>

          {/* Title */}
          <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            Nuestros{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>

          {/* Description */}
          <p className="text-foreground/80 max-w-3xl sm:text-lg md:text-xl">
            Soluciones personalizadas para impulsar tu carrera profesional y alcanzar tus objetivos
            laborales
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 sm:mt-6"
        >
          <a
            href="#why-choose"
            className="from-primary to-secondary group inline-flex items-center gap-2 rounded-lg bg-linear-to-r px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl sm:px-8 sm:py-4"
          >
            Descubre el servicio ideal para ti
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
