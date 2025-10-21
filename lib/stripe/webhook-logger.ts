/**
 * Webhook Logger Utility
 * Provides structured logging for Stripe webhook events
 */

export const WebhookLogger = {
  info: (message: string, data?: Record<string, unknown>) => {
    console.log(`ℹ️ [Webhook] ${message}`, data ? data : '');
  },

  success: (message: string, data?: Record<string, unknown>) => {
    console.log(`✅ [Webhook] ${message}`, data ? data : '');
  },

  error: (message: string, error?: unknown) => {
    console.error(`❌ [Webhook] ${message}`, error || '');
  },

  warn: (message: string, data?: Record<string, unknown>) => {
    console.warn(`⚠️ [Webhook] ${message}`, data ? data : '');
  },

  event: (eventType: string, eventId: string) => {
    console.log(`📦 [Webhook] Event: ${eventType} | ID: ${eventId}`);
  },

  database: (action: string, table: string) => {
    console.log(`💾 [Webhook] Database ${action}: ${table}`);
  },

  payment: (message: string, amount?: number, currency?: string) => {
    const formatted = amount && currency 
      ? ` | ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`
      : '';
    console.log(`💳 [Webhook] ${message}${formatted}`);
  },
};

/**
 * Alternative: Use a more advanced logging solution
 * 
 * For production, consider:
 * 1. Vercel Log Drains - Send logs to external services (Datadog, Logtail, etc.)
 * 2. Axiom - Built-in Vercel integration for log management
 * 3. Sentry - Error tracking with context
 * 4. Custom logging service with log levels and filtering
 * 
 * Example with environment-based logging:
 */
export const isProd = process.env.NODE_ENV === 'production';
export const isDebug = process.env.WEBHOOK_DEBUG === 'true';

export const conditionalLog = {
  debug: (message: string, data?: unknown) => {
    if (isDebug || !isProd) {
      console.log(`🔍 [Debug] ${message}`, data || '');
    }
  },
  
  prod: (message: string, data?: unknown) => {
    if (isProd) {
      console.log(`🚀 [Prod] ${message}`, data || '');
    }
  },
};
