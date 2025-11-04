import { createClient } from "@franceshr/database/server";
import type { Price } from "@franceshr/types";

export async function GetPricesAction(): Promise<Price[] | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("prices")
      .select("*")
      .eq("active", true)
      .order("unit_amount", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: unknown) {
    console.error("Error fetching prices:", error);
    return null;
  }
}
