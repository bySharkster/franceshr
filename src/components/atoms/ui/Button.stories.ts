import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Button } from "@/components/atoms/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      description: "Variant of the button",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      description: "Size of the button",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    onClick: {
      action: "clicked",
      description: "Callback function to handle click events",
    },
    className: {
      type: "string",
      control: "text",
      description: "Additional className for the button",
    },
    children: {
      type: "string",
      control: "text",
      description: "Content of the button",
    },
    asChild: {
      control: "boolean",
      description: "Whether the button is an anchor tag",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Button",
    asChild: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Button",
    asChild: false,
  },
};

export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Large Button",
    asChild: false,
  },
};

export const Small: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Small Button",
    asChild: false,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Delete",
    asChild: false,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Outline Button",
    asChild: false,
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Ghost Button",
    asChild: false,
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Link Button",
  },
};
