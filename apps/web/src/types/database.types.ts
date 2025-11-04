import type { Database } from "./supabase.types";

// Table types
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OnboardingData = Database["public"]["Tables"]["onboarding_data"]["Row"];
export type OnboardingDataInsert = Database["public"]["Tables"]["onboarding_data"]["Insert"];
export type OnboardingDataUpdate = Database["public"]["Tables"]["onboarding_data"]["Update"];

// Custom types for application use
export interface CreateOrderData {
  userId: string;
  email: string | null;
  packageSlug: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string | null;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  metadata?: Record<string, unknown>;
}

export interface CreateOnboardingData {
  userId: string;
  orderId: string;
  careerGoals: string;
  industryPursuing: string;
  relatedExperience: string;
  resumeUrl?: string;
}

export interface OrderWithOnboarding extends Order {
  onboarding_data?: OnboardingData;
}
