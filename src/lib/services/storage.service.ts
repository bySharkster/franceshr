import { createClient } from "@/lib/supabase/server";
import { handleError, ValidationError } from "@/lib/utils/error-handler";

class StorageServiceClass {
  public readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  public readonly ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  /**
   * Validate file before upload
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: "File size exceeds 10MB limit" };
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: "File type not allowed. Only PDF and Word documents are accepted",
      };
    }

    return { valid: true };
  }

  /**
   * Upload resume to storage
   * Returns a signed URL valid for 1 hour
   */
  async uploadResume(userId: string, file: File): Promise<string> {
    try {
      const validation = this.validateFile(file);
      if (!validation.valid) {
        throw new ValidationError(validation.error || "Invalid file");
      }

      const supabase = await createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/resume_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from("resumes").upload(fileName, file, {
        upsert: true,
        contentType: file.type,
      });

      if (error) throw error;

      // Return signed URL valid for 1 hour (3600 seconds)
      const { data, error: signError } = await supabase.storage
        .from("resumes")
        .createSignedUrl(fileName, 3600);

      if (signError) throw signError;

      return data.signedUrl;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get resume URL with signed access
   * @param expiresIn - Expiration time in seconds (default: 1 hour)
   */
  async getResumeUrl(userId: string, fileName: string, expiresIn = 3600): Promise<string> {
    try {
      const supabase = await createClient();
      const path = `${userId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(path, expiresIn);

      if (error) throw error;

      return data.signedUrl;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) throw error;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * List user's resumes
   */
  async listUserResumes(userId: string): Promise<string[]> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.storage.from("resumes").list(userId);

      if (error) throw error;

      return data?.map((file) => file.name) || [];
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get long-lived signed URL for email attachments
   * Valid for 30 days (2592000 seconds)
   */
  async getEmailResumeUrl(userId: string, fileName: string): Promise<string> {
    try {
      const supabase = await createClient();
      const path = `${userId}/${fileName}`;

      // 30 days = 30 * 24 * 60 * 60 = 2592000 seconds
      const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 2592000);

      if (error) throw error;

      return data.signedUrl;
    } catch (error) {
      throw handleError(error);
    }
  }
}

// Export singleton instance
export const StorageService = new StorageServiceClass();

// Export class for testing
export { StorageServiceClass };
