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
      {/* Neumorphic Card Container */}
      <div className="bg-card text-card-foreground relative flex h-full min-h-[280px] flex-col items-start gap-6 overflow-hidden rounded-[50px] p-6 shadow-[20px_20px_60px_hsl(var(--color-muted)/0.3),-20px_-20px_60px_hsl(var(--color-card)/1)] backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[25px_25px_70px_hsl(var(--color-muted)/0.4),-25px_-25px_70px_hsl(var(--color-card)/1)] sm:min-h-[320px] sm:gap-8 sm:p-8 md:min-h-[380px] md:max-w-[932px]">
        {/* Gradient overlay on hover */}
        <div className="from-primary/5 via-secondary/5 to-accent/5 bg-linear-to-br absolute inset-0 -z-10 rounded-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="from-primary to-secondary bg-linear-to-br inline-flex items-center justify-center rounded-xl p-3 shadow-md sm:p-4"
        >
          <Icon className="text-primary-foreground h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 sm:gap-4">
          {/* Title */}
          <h3 className="text-foreground text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
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
          className="from-primary to-secondary group/btn bg-linear-to-r inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 sm:h-5 sm:w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
