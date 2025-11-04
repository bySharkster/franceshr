import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Hero } from "@/components/organisms/sections/hero";

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A stunning hero section for the HR Services Company featuring animated elements, service highlights, clear CTAs, and social proof. Includes gradient backgrounds, motion animations, and responsive design.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section with all features:
 * - Animated entrance effects
 * - Service highlights (Resume Creation, Mentorship, Mock Interviews)
 * - Dual CTAs (Get Started & View Services)
 * - Social proof with avatars
 * - Stats section (Success Rate, Clients Served, Rating)
 */
export const Default: Story = {};
