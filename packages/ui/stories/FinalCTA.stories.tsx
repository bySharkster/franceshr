import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FinalCTA } from "@/components/organisms/sections/final-cta";

const meta = {
  title: "Sections/FinalCTA",
  component: FinalCTA,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Final call-to-action section encouraging users to book a session. Features rocket icon, compelling headline, large CTA button with calendar icon, and trust indicators. Strong gradient background for maximum impact.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FinalCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default final CTA section with:
 * - Rocket icon badge with spring animation
 * - "Da el siguiente paso en tu carrera" headline
 * - Large "Agenda tu sesión ahora" button
 * - Three trust indicators (24h response, 100% personalized, guaranteed results)
 * - Strong gradient background
 * - Decorative blur elements
 */
export const Default: Story = {};
