"use client";

import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/atoms/ui/button";
import { getServiceById } from "@/config/services.config";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const service = getServiceById(serviceId);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="from-primary to-secondary dark:from-background dark:to-background relative min-h-screen bg-gradient-to-b via-blue-50/30 dark:via-blue-950/10">
      <div className="absolute top-8 left-4 z-50 w-full max-w-3xl items-center justify-start gap-2 pb-8">
        <Button iconLeft={<ArrowLeft />} size="sm" variant="outline" asChild>
          <Link href="/">Volver</Link>
        </Button>
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              {/* Icon Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="from-primary to-secondary mb-6 inline-flex w-fit items-center justify-center rounded-2xl bg-linear-to-br p-4 shadow-lg"
              >
                <Icon className="text-background h-10 w-10" strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <h1 className="text-foreground mb-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
                {service.title}
              </h1>

              {/* Short Description */}
              <p className="text-foreground/70 mb-6 text-lg leading-relaxed sm:text-xl">
                {service.shortDescription}
              </p>

              {/* Price */}
              {service.price && (
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-foreground text-5xl font-bold">${service.price}</span>
                    <span className="text-foreground/60 text-xl">{service.currency}</span>
                  </div>
                  {service.deliveryTime && (
                    <p className="text-foreground/60 mt-2 text-sm">
                      Entrega: {service.deliveryTime}
                    </p>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <Button
                type="button"
                asChild
                className="from-primary to-secondary group/btn inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Link
                  href={service.calComLink || `/checkout?service=${service.id}`}
                  target={service.calComLink ? "_blank" : "_self"}
                >
                  {service.ctaText}
                  {service.calComLink ? (
                    <ExternalLink className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  ) : (
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  )}
                </Link>
              </Button>
            </motion.div>

            {/* Right Column - Features Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <div className="border-border/40 bg-card/80 w-full rounded-3xl border p-8 shadow-xl backdrop-blur-sm">
                <h3 className="text-foreground mb-6 text-2xl font-bold">
                  {service.includes ? "Incluye:" : "Características:"}
                </h3>
                <ul className="space-y-4">
                  {(service.includes || service.features).map((item, index) => (
                    <motion.li
                      key={`feature-${index}-${item.slice(0, 10)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="from-primary to-secondary mt-1 rounded-full bg-linear-to-br p-1">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground/80 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extended Description */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="border-border/40 bg-card/60 rounded-3xl border p-8 backdrop-blur-sm sm:p-12">
            <h2 className="text-foreground mb-6 text-3xl font-bold">
              ¿Por qué elegir este servicio?
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {service.extendedDescription}
            </p>

            {service.features && service.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-foreground mb-4 text-xl font-semibold">Lo que obtendrás:</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={`feat-${index}-${feature.slice(0, 10)}`}
                      className="flex items-start gap-2"
                    >
                      <Check className="from-primary to-secondary mt-1 h-5 w-5 flex-shrink-0 bg-linear-to-br bg-clip-text text-transparent" />
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-foreground mb-8 text-center text-3xl font-bold sm:text-4xl">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={`faq-${index}-${faq.question.slice(0, 20)}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-border/40 bg-card/60 overflow-hidden rounded-2xl border backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="text-foreground hover:bg-muted/50 flex w-full items-center justify-between p-6 text-left transition-colors"
                >
                  <span className="pr-4 text-lg font-semibold">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Toggle FAQ</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? "auto" : 0,
                    opacity: openFaqIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="text-foreground/70 border-border/40 border-t p-6 pt-4 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="from-primary/10 via-secondary/10 mx-auto max-w-4xl rounded-3xl bg-linear-to-br to-pink-50/10 p-8 text-center shadow-xl sm:p-12 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20"
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Invierte en tu futuro profesional hoy mismo
          </p>
          <Button
            type="button"
            asChild
            className="from-primary to-secondary group/btn inline-flex items-center gap-2 rounded-full bg-linear-to-r px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Link
              href={service.calComLink || `/checkout?service=${service.id}`}
              target={service.calComLink ? "_blank" : "_self"}
            >
              {service.ctaText}
              {service.calComLink ? (
                <ExternalLink className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              ) : (
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              )}
            </Link>
          </Button>

          <p className="text-foreground/60 mt-6 text-sm">
            <Link href="/#contact" className="hover:text-foreground underline transition-colors">
              ¿Tienes preguntas? Contáctanos
            </Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
