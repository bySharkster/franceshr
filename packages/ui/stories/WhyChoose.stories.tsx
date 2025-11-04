import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WhyChoose } from "@/components/organisms/sections/why-choose";

const meta = {
  title: "Sections/WhyChoose",
  component: WhyChoose,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Why Choose FrancesHR section highlighting four key reasons: 10+ years experience, personalized approach, trust-based advisory, and comprehensive support. Features glassmorphic cards with icons and alternating entrance animations.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WhyChoose>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Why Choose section with:
 * - Four reason cards in 2-column grid
 * - Glassmorphic card design
 * - Icon badges with gradient backgrounds
 * - Alternating entrance animations (left/right)
 * - Hover effects with gradient overlays
 */
export const Default: Story = {};
