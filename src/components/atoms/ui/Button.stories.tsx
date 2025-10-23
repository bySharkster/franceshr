import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NextLink from "next/link";
import { fn } from "storybook/test";

import { Button } from "@/components/atoms/ui/button";
import { getIcon, iconMap, type IconName } from "@/lib/helpers/icon-map";

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
      description:
        "Whether the button is an anchor tag, if true, children must be a NextLink component, the default code snipper provided by storybooks is a <React.ForwardRef /> update this to <NextLink/> when using asChild ",
    },
    iconLeft: {
      control: "select",
      description: "Icon component to display on the left side",
      options: [null, ...Object.keys(iconMap)],
    },
    iconRight: {
      control: "select",
      description: "Icon component to display on the right side",
      options: [null, ...Object.keys(iconMap)],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
  render: (args) => {
    const { iconLeft, iconRight, asChild, children, ...restArgs } = args;

    // When asChild is true, wrap children in NextLink
    if (asChild) {
      return (
        <Button
          {...restArgs}
          asChild
          iconLeft={getIcon(iconLeft as IconName)}
          iconRight={getIcon(iconRight as IconName)}
        >
          <NextLink href="/">{children}</NextLink>
        </Button>
      );
    }

    return (
      <Button
        {...restArgs}
        iconLeft={getIcon(iconLeft as IconName)}
        iconRight={getIcon(iconRight as IconName)}
      >
        {children}
      </Button>
    );
  },
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
    iconLeft: null,
    iconRight: null,
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
    iconLeft: null,
    iconRight: null,
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
    iconLeft: null,
    iconRight: null,
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
    iconLeft: null,
    iconRight: null,
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
    iconLeft: "trash2",
    iconRight: null,
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
    iconLeft: null,
    iconRight: null,
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
    iconLeft: null,
    iconRight: null,
  },
};

export const LinkVariant: Story = {
  args: {
    variant: "link",
    size: "default",
    disabled: false,
    onClick: fn(),
    className: "",
    children: "Link Button",
    asChild: false,
    iconLeft: null,
    iconRight: null,
  },
};

// Icon examples
export const WithIconLeft: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Back",
    iconLeft: "arrow-left",
    iconRight: null,
  },
};

export const WithIconRight: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Continue",
    iconLeft: null,
    iconRight: "arrow-right",
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Complete",
    iconLeft: "check",
    iconRight: "arrow-right",
  },
};

export const LoadingState: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Submitting...",
    disabled: true,
    iconLeft: null,
    iconRight: "loader2",
  },
  render: (args) => {
    const { iconLeft, iconRight, ...restArgs } = args;
    return (
      <Button
        {...restArgs}
        iconLeft={getIcon(iconLeft as IconName)}
        iconRight={getIcon(iconRight as IconName, "animate-spin")}
      />
    );
  },
};

export const IconOnly: Story = {
  args: {
    variant: "ghost",
    size: "icon",
    children: undefined,
  },
  render: (args) => <Button {...args} iconLeft={getIcon("home")} />,
};

// AsChild with Link component
export const AsChildWithLink: Story = {
  args: {
    variant: "default",
    size: "sm",
    asChild: true,
  },
  render: (args) => (
    <Button {...args} iconLeft={getIcon("arrow-left")}>
      <NextLink href="/">Back to Home</NextLink>
    </Button>
  ),
};
