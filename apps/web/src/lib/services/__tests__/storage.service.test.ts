import { beforeEach, describe, expect, it } from "@jest/globals";

import { StorageServiceClass } from "../storage.service";

describe("StorageService", () => {
  let service: StorageServiceClass;

  beforeEach(() => {
    service = new StorageServiceClass();
  });

  describe("validateFile", () => {
    it("should accept valid PDF file under 10MB", () => {
      const file = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 5 * 1024 * 1024 }); // 5MB

      const result = service.validateFile(file);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept valid Word document (.docx)", () => {
      const file = new File(["content"], "resume.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      Object.defineProperty(file, "size", { value: 3 * 1024 * 1024 }); // 3MB

      const result = service.validateFile(file);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept valid Word document (.doc)", () => {
      const file = new File(["content"], "resume.doc", {
        type: "application/msword",
      });
      Object.defineProperty(file, "size", { value: 2 * 1024 * 1024 }); // 2MB

      const result = service.validateFile(file);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject file over 10MB", () => {
      const file = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 11 * 1024 * 1024 }); // 11MB

      const result = service.validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toBe("File size exceeds 10MB limit");
    });

    it("should reject file exactly at 10MB limit + 1 byte", () => {
      const file = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 10 * 1024 * 1024 + 1 }); // 10MB + 1 byte

      const result = service.validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toBe("File size exceeds 10MB limit");
    });

    it("should accept file exactly at 10MB limit", () => {
      const file = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 10 * 1024 * 1024 }); // Exactly 10MB

      const result = service.validateFile(file);

      expect(result.valid).toBe(true);
    });

    it("should reject invalid file type (image)", () => {
      const file = new File(["content"], "image.jpg", {
        type: "image/jpeg",
      });
      Object.defineProperty(file, "size", { value: 1024 }); // 1KB

      const result = service.validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain("File type not allowed");
    });

    it("should reject invalid file type (text)", () => {
      const file = new File(["content"], "document.txt", {
        type: "text/plain",
      });
      Object.defineProperty(file, "size", { value: 1024 });

      const result = service.validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain("File type not allowed");
    });

    it("should reject invalid file type (executable)", () => {
      const file = new File(["content"], "malware.exe", {
        type: "application/x-msdownload",
      });
      Object.defineProperty(file, "size", { value: 1024 });

      const result = service.validateFile(file);

      expect(result.valid).toBe(false);
      expect(result.error).toContain("File type not allowed");
    });

    it("should handle empty file", () => {
      const file = new File([""], "empty.pdf", {
        type: "application/pdf",
      });
      Object.defineProperty(file, "size", { value: 0 });

      const result = service.validateFile(file);

      expect(result.valid).toBe(true); // Empty but valid type
    });
  });

  describe("MAX_FILE_SIZE constant", () => {
    it("should be set to 10MB", () => {
      // Access private property for testing
      const maxSize = (service as StorageServiceClass).MAX_FILE_SIZE;
      expect(maxSize).toBe(10 * 1024 * 1024);
    });
  });

  describe("ALLOWED_TYPES constant", () => {
    it("should include PDF and Word document types", () => {
      const allowedTypes = (service as StorageServiceClass).ALLOWED_TYPES;
      expect(allowedTypes).toContain("application/pdf");
      expect(allowedTypes).toContain("application/msword");
      expect(allowedTypes).toContain(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
    });

    it("should have exactly 3 allowed types", () => {
      const allowedTypes = (service as StorageServiceClass).ALLOWED_TYPES;
      expect(allowedTypes).toHaveLength(3);
    });
  });
});
