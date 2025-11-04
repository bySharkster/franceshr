import { createClient } from "@franceshr/database/service-role";
import type { CreateOnboardingData, OnboardingData, OnboardingDataInsert } from "@franceshr/types";

import { DatabaseError, handleError } from "@/lib/utils/error-handler";

class OnboardingServiceClass {
  /**
   * Create onboarding data
   */
  async create(data: CreateOnboardingData): Promise<OnboardingData> {
    try {
      const supabase = await createClient();

      const onboardingData: OnboardingDataInsert = {
        user_id: data.userId,
        order_id: data.orderId,
        service_id: data.orderId, // Using orderId as serviceId for now
        career_goals: data.careerGoals,
        industry_pursuing: data.industryPursuing,
        related_experience: data.relatedExperience,
        resume_url: data.resumeUrl,
      };

      const { data: onboarding, error: _error } = await supabase
        .from("onboarding_data")
        .insert(onboardingData)
        .select()
        .single();

      if (_error) {
        throw new DatabaseError("Failed to create onboarding data", _error);
      }

      return onboarding;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get onboarding data by order ID
   */
  async getByOrderId(orderId: string): Promise<OnboardingData | null> {
    try {
      const supabase = await createClient();

      const { data: onboarding, error: _error } = await supabase
        .from("onboarding_data")
        .select("*")
        .eq("order_id", orderId)
        .single();

      if (_error) {
        return null;
      }

      return onboarding;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get onboarding data by user ID
   */
  async getByUserId(userId: string): Promise<OnboardingData[]> {
    try {
      const supabase = await createClient();

      const { data: onboarding, error } = await supabase
        .from("onboarding_data")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new DatabaseError("Failed to fetch onboarding data", error);
      }

      return onboarding || [];
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Update onboarding data
   */
  async update(id: string, updates: Partial<CreateOnboardingData>): Promise<OnboardingData> {
    try {
      const supabase = await createClient();

      const { data: onboarding, error } = await supabase
        .from("onboarding_data")
        .update({
          career_goals: updates.careerGoals,
          industry_pursuing: updates.industryPursuing,
          related_experience: updates.relatedExperience,
          resume_url: updates.resumeUrl,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new DatabaseError("Failed to update onboarding data", error);
      }

      return onboarding;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Delete onboarding data
   */
  async delete(id: string): Promise<void> {
    try {
      const supabase = await createClient();

      const { error } = await supabase.from("onboarding_data").delete().eq("id", id);

      if (error) {
        throw new DatabaseError("Failed to delete onboarding data", error);
      }
    } catch (error) {
      throw handleError(error);
    }
  }
}

// Export singleton instance
export const OnboardingService = new OnboardingServiceClass();

// Export class for testing
export { OnboardingServiceClass };
