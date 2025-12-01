import type { Metadata } from "next";

import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce a Frances Rodríguez, especialista en Recursos Humanos con experiencia en reclutamiento, desarrollo profesional y asesoría de carrera en Puerto Rico.",
  openGraph: {
    title: "Sobre Nosotros | FrancesHR",
    description:
      "Conoce a Frances Rodríguez, especialista en Recursos Humanos con experiencia en reclutamiento, desarrollo profesional y asesoría de carrera en Puerto Rico.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
