"use client";
import { ArrowLeft,FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-2xl">
            <FileQuestion className="h-16 w-16 text-white sm:h-20 sm:w-20" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl md:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Página No Encontrada
        </h2>

        {/* Description */}
        <p className="mb-8 text-lg text-gray-600 sm:text-xl dark:text-gray-400">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4"
          >
            <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            Ir al Inicio
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 sm:px-8 sm:py-4 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver Atrás
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-lg border border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Necesitas ayuda?{" "}
            <Link
              href="/#contact"
              className="font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
