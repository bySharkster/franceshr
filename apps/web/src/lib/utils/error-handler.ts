export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "DATABASE_ERROR", 500, details);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

// Granular error types for better error handling

export class OrderCreationError extends AppError {
  constructor(
    message: string,
    details?: { userId?: string; amount?: number; packageSlug?: string },
  ) {
    super(message, "ORDER_CREATION_ERROR", 500, details);
    this.name = "OrderCreationError";
  }
}

export class PaymentError extends AppError {
  constructor(message: string, details?: { paymentIntentId?: string; amount?: number }) {
    super(message, "PAYMENT_ERROR", 500, details);
    this.name = "PaymentError";
  }
}

export class EmailSendError extends AppError {
  constructor(message: string, details?: { recipient?: string; emailType?: string }) {
    super(message, "EMAIL_SEND_ERROR", 500, details);
    this.name = "EmailSendError";
  }
}

export class FileUploadError extends AppError {
  constructor(
    message: string,
    details?: { fileName?: string; fileSize?: number; fileType?: string },
  ) {
    super(message, "FILE_UPLOAD_ERROR", 500, details);
    this.name = "FileUploadError";
  }
}

export class StripeWebhookError extends AppError {
  constructor(message: string, details?: { eventType?: string; eventId?: string }) {
    super(message, "STRIPE_WEBHOOK_ERROR", 500, details);
    this.name = "StripeWebhookError";
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string, details?: { missingVar?: string }) {
    super(message, "CONFIGURATION_ERROR", 500, details);
    this.name = "ConfigurationError";
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, "UNKNOWN_ERROR", 500);
  }

  return new AppError("An unknown error occurred", "UNKNOWN_ERROR", 500);
}
