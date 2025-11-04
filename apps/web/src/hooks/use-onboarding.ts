"use client";

import { createClient } from "@franceshr/database/client";
import type { OnboardingData } from "@franceshr/types";
import { useEffect, useState } from "react";

export function useOnboarding(userId: string | undefined) {
  const [onboarding, setOnboarding] = useState<OnboardingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchOnboarding() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("onboarding_data")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setOnboarding(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch onboarding data");
      } finally {
        setLoading(false);
      }
    }

    fetchOnboarding();
  }, [userId, supabase]);

  return {
    onboarding,
    loading,
    error,
  };
}
