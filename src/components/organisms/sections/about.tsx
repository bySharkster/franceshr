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

      {/* Decorative blur elements with animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-1/4 h-40 w-40 rounded-full bg-indigo-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-indigo-800/10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-purple-800/10"
      />

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

        {/* Mission Statement Card - Neumorphic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group w-full max-w-4xl"
        >
          <div className="bg-card text-card-foreground relative overflow-hidden rounded-[50px] p-6 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-md transition-all duration-500 hover:scale-[1.01] hover:shadow-[30px_30px_80px_hsl(var(--color-muted)/0.4),-30px_-30px_80px_hsl(var(--color-card)/1)] sm:rounded-[60px] sm:p-8 md:p-10">
            {/* Gradient overlay on hover */}
            <div className="from-primary/10 via-secondary/10 to-accent/10 absolute inset-0 -z-10 rounded-[50px] bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="from-primary to-secondary text-primary-foreground inline-flex items-center gap-2 rounded-full bg-linear-to-r px-4 py-1.5 text-sm font-semibold">
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
              {/* Neumorphic Card */}
              <div className="bg-card text-card-foreground relative h-full overflow-hidden rounded-[50px] p-6 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-sm transition-all duration-500 hover:shadow-[25px_25px_70px_hsl(var(--color-muted)/0.4),-25px_-25px_70px_hsl(var(--color-card)/1)] sm:p-8">
                {/* Gradient accent on hover */}
                <div className="from-primary/5 via-secondary/5 to-accent/5 absolute inset-0 -z-10 rounded-[50px] bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative flex flex-col items-center gap-4 text-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className="from-primary to-secondary inline-flex items-center justify-center rounded-xl bg-linear-to-br p-3 shadow-md"
                  >
                    <feature.icon className="text-primary-foreground h-6 w-6" strokeWidth={1} />
                  </motion.div>

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
