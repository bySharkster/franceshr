"use client";

import { ArrowRight, FileText, MessageSquare, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const services = [
    { icon: FileText, text: "Creación de currículums" },
    { icon: Users, text: "Mentoría" },
    { icon: MessageSquare, text: "Entrevistas simuladas" },
  ];

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-8 sm:gap-10 sm:py-12 md:gap-12 md:py-16 lg:py-20">
      {/* Background Gradient */}
      <div className="bg-linear-to-br absolute inset-0 -z-10 from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />

      {/* Decorative Elements with animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blue-200/30 blur-3xl sm:-left-16 sm:-top-16 sm:h-48 sm:w-48 md:-left-20 md:-top-20 md:h-64 md:w-64 dark:bg-blue-800/20"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.35, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-200/30 blur-3xl sm:-bottom-16 sm:-right-16 sm:h-48 sm:w-48 md:-bottom-20 md:-right-20 md:h-64 md:w-64 dark:bg-purple-800/20"
      />

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center sm:gap-7 sm:px-6 md:gap-8 lg:px-8">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-foreground w-full max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:max-w-3xl lg:text-5xl"
        >
          Transforma tu carrera profesional con{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent md:whitespace-nowrap">
            Currículums Profesionales
          </span>
          ,{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mentoría Personalizada
          </span>{" "}
          y{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Entrevistas Simuladas Realistas
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-foreground max-w-xl sm:max-w-2xl sm:text-lg md:text-xl"
        >
          Destaca en tu búsqueda laboral con currículums profesionales, mentoría personalizada y
          entrevistas simuladas realistas adaptadas a tu rol objetivo.
        </motion.p>

        {/* Service Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {services.map((service) => (
            <div
              key={service.text}
              className="bg-card text-card-foreground flex items-center gap-2 rounded-[20px] px-3 py-2 shadow-[8px_8px_16px_hsl(var(--color-muted)/0.2),-8px_-8px_16px_hsl(var(--color-card)/1)] transition-all duration-300 hover:shadow-[10px_10px_20px_hsl(var(--color-muted)/0.25),-10px_-10px_20px_hsl(var(--color-card)/1)] sm:px-4"
            >
              <service.icon className="from-primary to-secondary bg-linear-to-br h-4 w-4 bg-clip-text text-blue-600 sm:h-5 sm:w-5" />
              <span className="text-foreground/70 text-xs font-medium sm:text-sm">
                {service.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="/auth/sign-up"
            className="bg-linear-to-r group inline-flex items-center justify-center gap-2 rounded-lg from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
          >
            Comienza Ahora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Link>
          <Link
            href="#services"
            className="border-border/80 hover:border-border inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:px-8 sm:py-4 sm:text-base dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            Ver Servicios
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-2 pt-2 sm:pt-4"
        >
          <div className="flex -space-x-1.5 sm:-space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-linear-to-br h-8 w-8 rounded-full border-2 border-white from-blue-400 to-purple-400 sm:h-10 sm:w-10 dark:border-gray-800"
              >
                <Image
                  src={`/images/avatars/avatar-${i}.jpeg`}
                  alt={`Avatar ${i}`}
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-foreground/60 px-4 text-center text-xs sm:px-0 sm:text-sm">
            Unete a cientos de profesionales que lograron sus sueños laborales
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6 lg:px-8"
      >
        {[
          { number: "95%", label: "Tasa de éxito" },
          { number: "100+", label: "Clientes atendidos" },
          { number: "4.9/5", label: "Calificación de clientes" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card text-card-foreground flex flex-col items-center gap-1.5 rounded-[30px] p-4 shadow-[15px_15px_40px_hsl(var(--color-muted)/0.25),-15px_-15px_40px_hsl(var(--color-card)/1)] backdrop-blur-sm transition-all duration-300 hover:shadow-[18px_18px_50px_hsl(var(--color-muted)/0.3),-18px_-18px_50px_hsl(var(--color-card)/1)] sm:gap-2 sm:p-6"
          >
            <div className="from-primary to-secondary bg-linear-to-br bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              {stat.number}
            </div>
            <div className="text-foreground/60 text-center text-xs font-medium sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
