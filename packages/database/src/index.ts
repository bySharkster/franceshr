// Export with specific names to avoid conflicts
export { createClient as createBrowserClient } from "./client";
// Server-only exports - import directly from "@franceshr/database/server" or "@franceshr/database/service-role-client"
// export { createClient as createServerClient } from "./server";
// export { createClient as createServiceRoleClient } from "./service-role-client";
export * from "./check-env";
export * from "./middleware";
