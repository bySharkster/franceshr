import "server-only";

/** biome-ignore-all lint/style/noNonNullAssertion: Default Supabase Declaration */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseServiceRoleKey, supabaseUrl } from "./check-env";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseServiceRoleKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          // biome-ignore lint/suspicious/useIterableCallbackReturn: Supabase Suggest Leaving This as is.
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
