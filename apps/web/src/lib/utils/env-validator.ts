import { ConfigurationError } from "./error-handler";

/**
 * Environment variable configuration
 */
interface EnvConfig {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;

  // Stripe
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;

  // Resend
  RESEND_API_KEY: string;

  // Email
  EMAIL_FROM?: string;
  EMAIL_TO?: string;

  // Site
  NEXT_PUBLIC_SITE_URL: string;
}

/**
 * Required environment variables for server-side
 */
const REQUIRED_SERVER_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "NEXT_PUBLIC_SITE_URL",
] as const;

/**
 * Required environment variables for client-side
 */
const REQUIRED_CLIENT_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "STRIPE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
] as const;

/**
 * Validate that required environment variables are set
 */
export function validateEnv(side: "server" | "client" = "server"): void {
  const requiredVars = side === "server" ? REQUIRED_SERVER_VARS : REQUIRED_CLIENT_VARS;
  const missing: string[] = [];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value || value.trim() === "") {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new ConfigurationError(`Missing required environment variables: ${missing.join(", ")}`, {
      missingVar: missing.join(", "),
    });
  }
}

/**
 * Get environment variable with validation
 */
export function getEnv(key: keyof EnvConfig, defaultValue?: string): string {
  const value = process.env[key];

  if (!value || value.trim() === "") {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new ConfigurationError(`Environment variable ${key} is not set`, { missingVar: key });
  }

  return value;
}

/**
 * Get optional environment variable
 */
export function getOptionalEnv(key: keyof EnvConfig, defaultValue: string): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : defaultValue;
}

/**
 * Validate URL format
 */
export function validateUrl(url: string, varName: string): void {
  try {
    new URL(url);
  } catch {
    throw new ConfigurationError(`Invalid URL format for ${varName}: ${url}`, {
      missingVar: varName,
    });
  }
}

/**
 * Validate all environment variables and URLs
 */
export function validateAllEnv(): void {
  // Validate required vars exist
  validateEnv("server");

  // Validate URL formats
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  validateUrl(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL");

  const siteUrl = getEnv("NEXT_PUBLIC_SITE_URL");
  validateUrl(siteUrl, "NEXT_PUBLIC_SITE_URL");

  // Validate Stripe keys format
  const stripeSecret = getEnv("STRIPE_SECRET_KEY");
  if (!stripeSecret.startsWith("sk_")) {
    throw new ConfigurationError("STRIPE_SECRET_KEY must start with 'sk_'", {
      missingVar: "STRIPE_SECRET_KEY",
    });
  }

  const stripePublishable = getEnv("STRIPE_PUBLISHABLE_KEY");
  if (!stripePublishable.startsWith("pk_")) {
    throw new ConfigurationError("STRIPE_PUBLISHABLE_KEY must start with 'pk_'", {
      missingVar: "STRIPE_PUBLISHABLE_KEY",
    });
  }

  console.log("✅ All environment variables validated successfully");
}

/**
 * Get validated environment configuration
 */
export function getValidatedEnv(): EnvConfig {
  validateAllEnv();

  return {
    NEXT_PUBLIC_SUPABASE_URL: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    STRIPE_PUBLISHABLE_KEY: getEnv("STRIPE_PUBLISHABLE_KEY"),
    STRIPE_SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
    STRIPE_WEBHOOK_SECRET: getEnv("STRIPE_WEBHOOK_SECRET"),
    RESEND_API_KEY: getEnv("RESEND_API_KEY"),
    EMAIL_FROM: getOptionalEnv("EMAIL_FROM", "noreply@mail.franceshr.com"),
    EMAIL_TO: getOptionalEnv("EMAIL_TO", "contact@fernandoaponte.dev"),
    NEXT_PUBLIC_SITE_URL: getEnv("NEXT_PUBLIC_SITE_URL"),
  };
}
