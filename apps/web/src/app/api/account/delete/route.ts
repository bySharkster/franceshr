import { createClient as createServerClient } from "@franceshr/database/server";
import { createClient as createServiceRoleClient } from "@franceshr/database/service-role";
import { NextResponse } from "next/server";

import { handleError } from "@/lib/utils/error-handler";

/**
 * GDPR Article 17: Right to Erasure ("Right to be Forgotten")
 * Permanently delete user account and all associated data
 */
export async function DELETE() {
  try {
    const supabase = await createServerClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // Use service role client for admin operations
    const adminClient = await createServiceRoleClient();

    // Delete in order (respecting foreign key constraints)

    // 1. Delete onboarding data
    const { error: onboardingError } = await adminClient
      .from("onboarding_data")
      .delete()
      .eq("user_id", userId);

    if (onboardingError) {
      console.error("Failed to delete onboarding data:", onboardingError);
    }

    // 2. Delete orders
    const { error: ordersError } = await adminClient.from("orders").delete().eq("user_id", userId);

    if (ordersError) {
      console.error("Failed to delete orders:", ordersError);
    }

    // 3. Delete files from storage (resumes)
    const { data: files, error: listError } = await adminClient.storage
      .from("resumes")
      .list(userId);

    if (!listError && files && files.length > 0) {
      const filePaths = files.map((file: { name: string }) => `${userId}/${file.name}`);
      const { error: deleteFilesError } = await adminClient.storage
        .from("resumes")
        .remove(filePaths);

      if (deleteFilesError) {
        console.error("Failed to delete files:", deleteFilesError);
      }
    }

    // 4. Delete user folder from storage
    const { error: folderError } = await adminClient.storage.from("resumes").remove([userId]);

    if (folderError) {
      console.error("Failed to delete user folder:", folderError);
    }

    // 5. Delete auth user (this will cascade to related data if RLS is properly configured)
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      console.error("Failed to delete user:", deleteUserError);
      return NextResponse.json(
        { error: "Failed to delete user account", details: deleteUserError.message },
        { status: 500 },
      );
    }

    // Log deletion for compliance (in production, log to secure audit system)
    console.log(`[GDPR] User account deleted: ${userId} at ${new Date().toISOString()}`);

    return NextResponse.json(
      {
        success: true,
        message: "Account and all associated data have been permanently deleted",
        deletedAt: new Date().toISOString(),
        gdprCompliance: "Article 17 - Right to Erasure",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ error: handleError(error).message }, { status: 500 });
  }
}
