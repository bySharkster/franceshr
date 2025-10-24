"use client";

import { ChevronLeft, ChevronRight, MessageCircle, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Gracias a FrancesHR mejoré mi resumé y obtuve entrevistas en menos de dos semanas. Me sentí más seguro y preparado para cada proceso.",
      author: "Fernando J.",
      role: "Ingeniero de Software",
      rating: 5,
    },
    {
      quote:
        "El proceso de mentoría fue transformador. Frances me ayudó a identificar mis fortalezas y a comunicarlas efectivamente. Ahora tengo la posición que siempre quise.",
      author: "Jose M.",
      role: "Asociado Bancario",
      rating: 5,
    },
    {
      quote:
        "Las entrevistas simuladas fueron clave para mi éxito. Me prepararon para preguntas difíciles y me dieron la confianza que necesitaba. ¡Totalmente recomendado!",
      author: "Lizmarie Acevedo",
      role: "Recepcionista Judicial",
      rating: 5,
    },
    {
      quote:
        "FrancesHR no solo mejoró mi resume, sino que me enseñó a venderme mejor como profesional. La inversión valió cada centavo. Conseguí mi trabajo ideal en tiempo récord.",
      author: "Gregor Rodriguez",
      role: "Desarrollador Full Stack",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-24">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-pink-50/30 to-transparent dark:via-pink-950/10" />

      {/* Decorative blur elements */}
      <div className="absolute top-20 left-1/3 h-40 w-40 rounded-full bg-pink-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-pink-800/10" />
      <div className="absolute right-1/3 bottom-20 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-purple-800/10" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:px-8">
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
            <MessageCircle className="text-background h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1} />
          </motion.div>

          {/* Title */}
          <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            {" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Testimonios
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative w-full max-w-4xl">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={prevTestimonial}
            className="from-primary to-secondary absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-linear-to-r p-2 text-white shadow-lg transition-all hover:scale-110 sm:-translate-x-12 sm:p-3"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={nextTestimonial}
            className="from-primary to-secondary absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-linear-to-r p-2 text-white shadow-lg transition-all hover:scale-110 sm:translate-x-12 sm:p-3"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Testimonial Card with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="border-border/40 bg-card/80 group relative overflow-hidden rounded-3xl border p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl sm:p-10 md:p-12">
                {/* Gradient overlay on hover */}
                <div className="from-primary/10 via-secondary/10 absolute inset-0 -z-10 bg-linear-to-br to-pink-50/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

                {/* Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10 sm:top-10 sm:right-10">
                  <Quote className="text-primary h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
                </div>

                {/* Content */}
                <div className="relative flex flex-col gap-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={`star-${currentIndex}-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: No key for array index
                          i
                        }`}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 sm:h-6 sm:w-6"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground/90 text-lg leading-relaxed sm:text-xl md:text-2xl">
                    &quot;{currentTestimonial.quote}&quot;
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col gap-1">
                    <cite className="text-foreground font-semibold not-italic sm:text-lg">
                      — {currentTestimonial.author}
                    </cite>
                    <p className="text-foreground/60 text-sm sm:text-base">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-2"
        >
          {testimonials.map((_, index) => (
            <button
              key={`indicator-${
                // biome-ignore lint/suspicious/noArrayIndexKey: No key for array index
                index
              }`}
              type="button"
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "from-primary to-secondary w-8 bg-linear-to-r"
                  : "bg-border hover:bg-border/80 w-2"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
