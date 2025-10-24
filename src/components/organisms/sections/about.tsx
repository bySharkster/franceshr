"use client";

import { Briefcase, Heart, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function About() {
  const features = [
    {
      icon: Briefcase,
      title: "Redacción de Resume",
      description: "Currículums profesionales que destacan tus fortalezas y experiencia",
    },
    {
      icon: Target,
      title: "Mentorías Personalizadas",
      description: "Guía experta adaptada a tus metas y objetivos profesionales",
    },
    {
      icon: TrendingUp,
      title: "Entrevistas Simuladas",
      description: "Práctica realista para prepararte y ganar confianza",
    },
  ];

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-24">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-950/10" />

      {/* Decorative blur elements */}
      <div className="absolute top-10 left-1/4 h-40 w-40 rounded-full bg-indigo-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-indigo-800/10" />
      <div className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-purple-800/10" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:px-8">
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
            className="from-primary to-secondary shadow-l inline-flex items-center justify-center rounded-2xl bg-linear-to-br p-3"
          >
            <Heart className="text-background h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1} />
          </motion.div>

          {/* Title */}
          <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            Sobre{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FrancesHR
            </span>
          </h2>

          {/* Description */}
          <p className="text-foreground/80 max-w-3xl sm:text-lg md:text-xl">
            En FrancesHR ayudamos a candidatos a alcanzar sus metas laborales con herramientas
            personalizadas: redacción de resume, mentorías y entrevistas simuladas.
          </p>
        </motion.div>

        {/* Mission Statement Card - Glassmorphic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl"
        >
          <div className="group border-border/50 bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl sm:rounded-3xl sm:p-8 md:p-10">
            {/* Gradient overlay on hover */}
            <div className="from-primary/50 via-secondary/50 absolute inset-0 -z-10 bg-linear-to-br to-pink-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="from-primary to-secondary text-background inline-flex items-center gap-2 rounded-full bg-linear-to-r px-4 py-1.5 text-sm font-semibold">
                <Target className="h-4 w-4" strokeWidth={1} />
                Nuestra Misión
              </div>
              <p className="text-foreground/90 leading-relaxed sm:text-lg md:text-xl">
                Ser tu guía en el proceso de obtención de empleo, brindándote apoyo, confianza y una
                estrategia clara para lograr tu próxima oportunidad.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid - Neuromorphic Cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              {/* Neuromorphic Card */}
              <div className="border-border/40 bg-card/80 relative h-full overflow-hidden rounded-2xl border p-6 shadow-[8px_8px_16px_rgba(163,163,163,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] backdrop-blur-sm transition-all duration-300 hover:shadow-[12px_12px_24px_rgba(163,163,163,0.15),-12px_-12px_24px_rgba(255,255,255,0.95)] sm:p-8 dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)] dark:hover:shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.08)]">
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-50/50 group-hover:via-purple-50/50 group-hover:to-pink-50/50 group-hover:opacity-100 dark:group-hover:from-blue-950/20 dark:group-hover:via-purple-950/20 dark:group-hover:to-pink-950/20" />

                {/* Content */}
                <div className="relative flex flex-col items-center gap-4 text-center">
                  {/* Icon */}
                  <div className="from-primary to-secondary inline-flex items-center justify-center rounded-xl bg-linear-to-br p-3 shadow-md transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="text-background h-6 w-6" strokeWidth={1} />
                  </div>

                  {/* Title */}
                  <h3 className="text-foreground text-lg font-bold sm:text-xl">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm leading-relaxed sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
