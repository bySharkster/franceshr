"use client";

import { Award, CheckCircle2, Heart, Target } from "lucide-react";
import { motion } from "motion/react";

export function WhyChoose() {
  const reasons = [
    {
      icon: Award,
      text: "Más de 10 años de experiencia en reclutamiento y desarrollo profesional.",
    },
    {
      icon: Target,
      text: "Enfoque personalizado y resultados medibles.",
    },
    {
      icon: Heart,
      text: "Asesoría basada en confianza, claridad y estrategia.",
    },
    {
      icon: CheckCircle2,
      text: "Apoyo integral desde el resume hasta la entrevista final.",
    },
  ];

  return (
    // biome-ignore lint/correctness/useUniqueElementIds:unique id
    <section
      id="why-choose"
      className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-24"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-950/10" />

      {/* Decorative blur elements with animation */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-1/4 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-purple-800/10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.28, 0.2],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-blue-800/10"
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
            className="from-primary to-secondary inline-flex items-center justify-center rounded-2xl bg-linear-to-br p-3 shadow-lg"
          >
            <Award className="text-background h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1} />
          </motion.div>

          {/* Title */}
          <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            Por qué elegir{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FrancesHR
            </span>
          </h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.text}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative"
            >
              {/* Neumorphic Card */}
              <div className="bg-card text-card-foreground relative flex items-start gap-4 rounded-[50px] p-6 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-[25px_25px_70px_hsl(var(--color-muted)/0.4),-25px_-25px_70px_hsl(var(--color-card)/1)] sm:gap-6 sm:p-8">
                {/* Gradient overlay on hover */}
                <div className="from-primary/5 via-secondary/5 to-accent/5 absolute inset-0 -z-10 rounded-[50px] bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="from-primary to-secondary shrink-0 rounded-xl bg-linear-to-br p-3 shadow-md"
                >
                  <reason.icon
                    className="text-primary-foreground h-5 w-5 sm:h-6 sm:w-6"
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Text */}
                <p className="text-foreground/80 flex-1 leading-relaxed sm:text-lg">
                  {reason.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
