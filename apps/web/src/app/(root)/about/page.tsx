"use client";

import { Award, Briefcase, GraduationCap, Heart, Target, Users } from "lucide-react";
import { motion } from "motion/react";

import { GeneralNavigationGroup } from "@/components/organisms/general-navigation-group";

const expertise = [
  {
    icon: Briefcase,
    title: "Gestión de Recursos Humanos",
    description:
      "Experiencia en dirección y gestión de procesos completos de RRHH, desde reclutamiento hasta desvinculación.",
  },
  {
    icon: Users,
    title: "Reclutamiento Estratégico",
    description:
      "Especialización en identificación de talento, incorporación, y desarrollo organizacional.",
  },
  {
    icon: Award,
    title: "Cumplimiento Legal",
    description:
      "Conocimiento profundo en nómina, evaluaciones de desempeño y cumplimiento de normativas laborales.",
  },
  {
    icon: Target,
    title: "Desarrollo Profesional",
    description:
      "Guía personalizada para ayudar a profesionales a alcanzar sus metas y destacar en el mercado laboral.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute left-4 top-8 z-50 w-full max-w-3xl items-center justify-start gap-2 pb-8">
        <GeneralNavigationGroup />
      </div>
      {/* Background gradient */}
      <div className="bg-linear-to-b absolute inset-0 -z-10 from-transparent via-purple-50/30 to-transparent dark:via-purple-950/10" />

      {/* Decorative blur elements */}
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
        className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-800/10"
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
        className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-800/10"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center gap-8 text-center md:mb-20 lg:mb-24"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="from-primary to-secondary bg-linear-to-br absolute -inset-1 rounded-full opacity-75 blur-lg" />
            <div className="bg-linear-to-br relative h-32 w-32 overflow-hidden rounded-full from-blue-100 to-purple-100 p-1 sm:h-40 sm:w-40 md:h-48 md:w-48 dark:from-blue-900 dark:to-purple-900">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                <Heart
                  className="text-primary h-16 w-16 fill-indigo-100 sm:h-20 sm:w-20 md:h-24 md:w-24"
                  strokeWidth={1}
                />
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <div className="flex flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-foreground text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            >
              Frances Rodríguez
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="from-primary to-secondary bg-linear-to-r inline-flex items-center gap-2 self-center rounded-full px-6 py-2 text-sm font-semibold text-white"
            >
              <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
              Especialista en Recursos Humanos
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="bg-card text-card-foreground mx-auto max-w-4xl overflow-hidden rounded-[50px] p-8 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-md sm:p-10 md:p-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="from-primary to-secondary bg-linear-to-br inline-flex items-center justify-center rounded-xl p-2.5">
                  <Heart className="text-primary-foreground h-6 w-6" strokeWidth={1.5} />
                </div>
                <h2 className="text-foreground text-2xl font-bold sm:text-3xl">Sobre Mí</h2>
              </div>

              <div className="text-foreground/80 flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
                <p>
                  Soy Frances Rodríguez, una profesional bilingüe con{" "}
                  <span className="text-foreground font-semibold">
                    Bachillerato en Administración de Empresas
                  </span>{" "}
                  y especialización en{" "}
                  <span className="text-foreground font-semibold">Recursos Humanos</span>. Mi
                  trayectoria combina experiencia en gestión administrativa, reclutamiento,
                  cumplimiento legal y desarrollo organizacional, lo que me permite ofrecer una guía
                  completa y estratégica a quienes desean avanzar profesionalmente.
                </p>

                <p>
                  A lo largo de mi carrera, he trabajado en la dirección y gestión de procesos de
                  Recursos Humanos, incluyendo{" "}
                  <span className="text-foreground font-semibold">
                    reclutamiento, incorporación, nómina, evaluaciones de desempeño y desvinculación
                  </span>
                  . Esta experiencia me ha permitido entender a fondo cómo piensan los empleadores y
                  qué buscan en los candidatos, para ayudarte a destacar con claridad, confianza y
                  propósito.
                </p>

                <div className="from-primary/10 via-secondary/10 to-accent/10 bg-linear-to-r mt-2 rounded-3xl p-6">
                  <p className="text-foreground font-medium">
                    En <span className="text-primary font-bold">FrancesHR</span>, mi misión es
                    ayudarte a alcanzar oportunidades laborales alineadas con tus metas
                    profesionales, a través de currículums efectivos, preparación para entrevistas y
                    asesoría personalizada. Mi enfoque une lo mejor del conocimiento en Recursos
                    Humanos con una visión humana y realista del mercado laboral, para que logres el
                    crecimiento que mereces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-10 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Mi{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experiencia
              </span>
            </h2>
            <p className="text-foreground/80 mx-auto max-w-2xl text-base sm:text-lg">
              Áreas clave donde puedo ayudarte a alcanzar tus objetivos profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="bg-card text-card-foreground h-full overflow-hidden rounded-[40px] p-6 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-sm transition-all duration-500 hover:shadow-[25px_25px_70px_hsl(var(--color-muted)/0.4),-25px_-25px_70px_hsl(var(--color-card)/1)] sm:p-8">
                  <div className="flex flex-col gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                      className="from-primary to-secondary bg-linear-to-br inline-flex w-fit items-center justify-center rounded-xl p-3 shadow-md"
                    >
                      <item.icon className="text-primary-foreground h-6 w-6" strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="text-foreground text-xl font-bold sm:text-2xl">{item.title}</h3>

                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="from-primary to-secondary bg-linear-to-r mx-auto max-w-3xl overflow-hidden rounded-[50px] p-8 text-white shadow-2xl sm:p-10 md:p-12">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              ¿Listo para Avanzar en tu Carrera?
            </h2>
            <p className="mb-6 text-base opacity-90 sm:text-lg md:mb-8">
              Trabajemos juntos para alcanzar tus metas profesionales con estrategias personalizadas
              y efectivas.
            </p>
            <motion.a
              href="/auth/sign-up"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-purple-600 shadow-lg transition-all hover:shadow-xl"
            >
              Comienza Ahora
              <Target className="h-5 w-5" strokeWidth={2} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
