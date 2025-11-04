import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TestimonialsSection } from "@/components/organisms/sections/testimonials-section";

const meta = {
  title: "Sections/TestimonialsSection",
  component: TestimonialsSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Testimonials section featuring client success stories. Includes large glassmorphic card with 5-star rating, quote, author name and role. Features decorative quote icon and carousel indicators for future expansion.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestimonialsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default testimonials section with:
 * - Featured testimonial from María G.
 * - 5-star rating display
 * - Large glassmorphic card
 * - Decorative quote icon
 * - Carousel indicators (for future multiple testimonials)
 * - Hover effects with gradient overlay
 */
export const Default: Story = {};
