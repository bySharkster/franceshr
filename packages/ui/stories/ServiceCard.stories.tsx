import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Briefcase, MessageSquare, Users } from "lucide-react";

import { ServiceCard } from "@/components/molecules/ServiceCard";

const meta = {
  title: "Molecules/ServiceCard",
  component: ServiceCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Reusable service card component with icon, title, description, and CTA button. Features gradient backgrounds, hover effects, and smooth animations. Follows specified dimensions: 932px × 380px on desktop, fully responsive on mobile.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
      description: "Lucide icon component",
    },
    title: {
      control: "text",
      description: "Service title",
    },
    description: {
      control: "text",
      description: "Service description",
    },
    ctaText: {
      control: "text",
      description: "CTA button text",
    },
    ctaLink: {
      control: "text",
      description: "CTA button link",
    },
    index: {
      control: "number",
      description: "Animation delay index",
    },
  },
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Resume Profesional service card
 */
export const ResumeProfesional: Story = {
  args: {
    icon: Briefcase,
    title: "Resume Profesional",
    description:
      "Haz que tu hoja de vida destaque ante los reclutadores con un diseño moderno y contenido estratégico.",
    ctaText: "Reserva tu sesión",
    ctaLink: "#contact",
    index: 0,
  },
};

/**
 * Mentorías Laborales service card
 */
export const MentoriasLaborales: Story = {
  args: {
    icon: Users,
    title: "Mentorías Laborales",
    description:
      "Recibe orientación personalizada para definir tus metas, fortalecer tu perfil y potenciar tu búsqueda de empleo.",
    ctaText: "Reserva tu sesión",
    ctaLink: "#contact",
    index: 1,
  },
};

/**
 * Entrevistas Simuladas service card
 */
export const EntrevistasSimuladas: Story = {
  args: {
    icon: MessageSquare,
    title: "Entrevistas Simuladas",
    description:
      "Practica con una experta en reclutamiento y mejora tus respuestas, lenguaje corporal y seguridad.",
    ctaText: "Reserva tu sesión",
    ctaLink: "#contact",
    index: 2,
  },
};
