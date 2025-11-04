import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { About } from "@/components/organisms/sections/about";

const meta = {
  title: "Sections/About",
  component: About,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "About section for FrancesHR featuring glassmorphic mission card, neuromorphic feature cards with soft pastel gradients, and smooth scroll-triggered animations. Maintains design consistency with the hero section.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default about section with:
 * - Animated section header with icon badge
 * - Glassmorphic mission statement card
 * - Three neuromorphic feature cards (Resume, Mentorship, Mock Interviews)
 * - Soft pastel gradient backgrounds
 * - Scroll-triggered animations
 */
export const Default: Story = {};
