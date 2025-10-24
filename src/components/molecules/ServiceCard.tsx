"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  index?: number;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  ctaText = "Reserva tu sesión",
  ctaLink = "#contact",
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group relative h-full w-full"
    >
      {/* Card Container - Following specified dimensions */}
      <div className="bg-card border-border/40 relative flex h-full min-h-[280px] flex-col items-start gap-6 overflow-hidden rounded-lg border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:min-h-[320px] sm:gap-8 sm:p-8 md:min-h-[380px] md:max-w-[932px]">
        {/* Gradient overlay on hover */}
        <div className="from-primary/10 via-secondary/10 absolute inset-0 -z-10 bg-linear-to-br to-pink-50/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="from-primary to-secondary inline-flex items-center justify-center rounded-xl bg-linear-to-br p-3 shadow-md sm:p-4"
        >
          <Icon className="text-background h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 sm:gap-4">
          {/* Title */}
          <h3 className="text-foreground text-xl leading-tight font-bold sm:text-2xl md:text-3xl">
            {title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 flex-1 text-sm leading-relaxed sm:text-base md:text-lg">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href={ctaLink}
          className="from-primary to-secondary group/btn inline-flex items-center gap-2 rounded-lg bg-linear-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 sm:h-5 sm:w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
