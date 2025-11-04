import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JwtPayload } from "@supabase/supabase-js";
import { fn } from "storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Organisms/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    hasEnvVars: {
      control: "boolean",
      description: "Whether environment variables are configured",
    },
    user: {
      control: "object",
      description: "User object",
    },
    onLogin: {
      description: "Callback function to handle login",
    },
    onSignup: {
      description: "Callback function to handle signup",
    },
    onLogout: {
      description: "Callback function to handle logout",
    },
  },
  args: {
    onLogin: fn(),
    onSignup: fn(),
    onLogout: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
  args: {
    hasEnvVars: true,
    user: {
      email: "john.doe@example.com",
      exp: 1697929200,
      iat: 1697929200,
      jti: "1234567890",
      sub: "1234567890",
    } as unknown as JwtPayload,
    onLogin: fn(),
    onSignup: fn(),
    onLogout: fn(),
  },
};

export const NotAuthenticated: Story = {
  args: {
    hasEnvVars: true,
    user: undefined,
    onLogin: fn(),
    onSignup: fn(),
    onLogout: fn(),
  },
};

export const MissingEnvVars: Story = {
  args: {
    hasEnvVars: false,
    user: undefined,
    onLogin: fn(),
    onSignup: fn(),
    onLogout: fn(),
  },
};
