import { describe, expect, it } from "@jest/globals";

import {
  AppError,
  ConfigurationError,
  DatabaseError,
  EmailSendError,
  FileUploadError,
  handleError,
  NotFoundError,
  OrderCreationError,
  PaymentError,
  StripeWebhookError,
  UnauthorizedError,
  ValidationError,
} from "../error-handler";

describe("Error Handler", () => {
  describe("AppError", () => {
    it("should create error with message and code", () => {
      const error = new AppError("Test error", "TEST_ERROR");

      expect(error.message).toBe("Test error");
      expect(error.code).toBe("TEST_ERROR");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("AppError");
    });

    it("should create error with custom status code", () => {
      const error = new AppError("Test error", "TEST_ERROR", 400);

      expect(error.statusCode).toBe(400);
    });

    it("should create error with details", () => {
      const details = { userId: "123", reason: "test" };
      const error = new AppError("Test error", "TEST_ERROR", 500, details);

      expect(error.details).toEqual(details);
    });
  });

  describe("DatabaseError", () => {
    it("should create database error", () => {
      const error = new DatabaseError("Database connection failed");

      expect(error.message).toBe("Database connection failed");
      expect(error.code).toBe("DATABASE_ERROR");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("DatabaseError");
    });

    it("should include details", () => {
      const details = { query: "SELECT * FROM users" };
      const error = new DatabaseError("Query failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("NotFoundError", () => {
    it("should create not found error", () => {
      const error = new NotFoundError("User");

      expect(error.message).toBe("User not found");
      expect(error.code).toBe("NOT_FOUND");
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe("NotFoundError");
    });
  });

  describe("ValidationError", () => {
    it("should create validation error", () => {
      const error = new ValidationError("Invalid email format");

      expect(error.message).toBe("Invalid email format");
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe("ValidationError");
    });

    it("should include validation details", () => {
      const details = { field: "email", value: "invalid" };
      const error = new ValidationError("Invalid email", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("UnauthorizedError", () => {
    it("should create unauthorized error with default message", () => {
      const error = new UnauthorizedError();

      expect(error.message).toBe("Unauthorized");
      expect(error.code).toBe("UNAUTHORIZED");
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe("UnauthorizedError");
    });

    it("should create unauthorized error with custom message", () => {
      const error = new UnauthorizedError("Invalid token");

      expect(error.message).toBe("Invalid token");
    });
  });

  describe("OrderCreationError", () => {
    it("should create order creation error", () => {
      const error = new OrderCreationError("Failed to create order");

      expect(error.message).toBe("Failed to create order");
      expect(error.code).toBe("ORDER_CREATION_ERROR");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("OrderCreationError");
    });

    it("should include order details", () => {
      const details = { userId: "user_123", amount: 5000, packageSlug: "basic" };
      const error = new OrderCreationError("Failed to create order", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("PaymentError", () => {
    it("should create payment error", () => {
      const error = new PaymentError("Payment processing failed");

      expect(error.message).toBe("Payment processing failed");
      expect(error.code).toBe("PAYMENT_ERROR");
      expect(error.name).toBe("PaymentError");
    });

    it("should include payment details", () => {
      const details = { paymentIntentId: "pi_123", amount: 5000 };
      const error = new PaymentError("Payment failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("EmailSendError", () => {
    it("should create email send error", () => {
      const error = new EmailSendError("Failed to send email");

      expect(error.message).toBe("Failed to send email");
      expect(error.code).toBe("EMAIL_SEND_ERROR");
      expect(error.name).toBe("EmailSendError");
    });

    it("should include email details", () => {
      const details = { recipient: "test@example.com", emailType: "receipt" };
      const error = new EmailSendError("Email failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("FileUploadError", () => {
    it("should create file upload error", () => {
      const error = new FileUploadError("File upload failed");

      expect(error.message).toBe("File upload failed");
      expect(error.code).toBe("FILE_UPLOAD_ERROR");
      expect(error.name).toBe("FileUploadError");
    });

    it("should include file details", () => {
      const details = { fileName: "resume.pdf", fileSize: 1024, fileType: "application/pdf" };
      const error = new FileUploadError("Upload failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("StripeWebhookError", () => {
    it("should create stripe webhook error", () => {
      const error = new StripeWebhookError("Webhook processing failed");

      expect(error.message).toBe("Webhook processing failed");
      expect(error.code).toBe("STRIPE_WEBHOOK_ERROR");
      expect(error.name).toBe("StripeWebhookError");
    });

    it("should include webhook details", () => {
      const details = { eventType: "payment_intent.succeeded", eventId: "evt_123" };
      const error = new StripeWebhookError("Webhook failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("ConfigurationError", () => {
    it("should create configuration error", () => {
      const error = new ConfigurationError("Missing environment variable");

      expect(error.message).toBe("Missing environment variable");
      expect(error.code).toBe("CONFIGURATION_ERROR");
      expect(error.name).toBe("ConfigurationError");
    });

    it("should include missing variable details", () => {
      const details = { missingVar: "STRIPE_SECRET_KEY" };
      const error = new ConfigurationError("Missing config", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("handleError", () => {
    it("should return AppError as-is", () => {
      const originalError = new DatabaseError("Test error");
      const result = handleError(originalError);

      expect(result).toBe(originalError);
      expect(result).toBeInstanceOf(DatabaseError);
    });

    it("should wrap Error in AppError", () => {
      const originalError = new Error("Standard error");
      const result = handleError(originalError);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe("Standard error");
      expect(result.code).toBe("UNKNOWN_ERROR");
      expect(result.statusCode).toBe(500);
    });

    it("should handle non-Error objects", () => {
      const result = handleError("string error");

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe("An unknown error occurred");
      expect(result.code).toBe("UNKNOWN_ERROR");
    });

    it("should handle null", () => {
      const result = handleError(null);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe("An unknown error occurred");
    });

    it("should handle undefined", () => {
      const result = handleError(undefined);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe("An unknown error occurred");
    });

    it("should preserve custom error types", () => {
      const originalError = new ValidationError("Invalid input");
      const result = handleError(originalError);

      expect(result).toBe(originalError);
      expect(result).toBeInstanceOf(ValidationError);
      expect(result.code).toBe("VALIDATION_ERROR");
    });
  });
});
