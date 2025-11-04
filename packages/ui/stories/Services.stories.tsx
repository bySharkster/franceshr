import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Services } from "@/components/organisms/sections/services";

const meta = {
  title: "Sections/Services",
  component: Services,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Services section showcasing three main offerings: Resume Profesional, Mentorías Laborales, and Entrevistas Simuladas. Features individual ServiceCard components with CTAs, gradient backgrounds, and scroll-triggered animations.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Services>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default services section with:
 * - Three service cards in responsive grid
 * - Individual CTAs for each service
 * - Soft gradient backgrounds
 * - Scroll-triggered animations
 * - Additional consultation CTA at bottom
 */
export const Default: Story = {};
