# Observability, Security & Analytics Integration Analysis

## 🔍 Overview

Integration of industry-standard tools:

- **Axiom**: Structured logging and observability
- **Arcjet**: Security layer (rate limiting, bot protection)
- **PostHog**: Product analytics and feature flags

---

## 📊 Current State

### **Missing Capabilities**

1. **No Structured Logging** - Console.log scattered, no aggregation
2. **No Security Layer** - No rate limiting, bot protection, or email validation
3. **No Analytics** - Can't track user behavior or conversions
4. **No Monitoring** - No error tracking or alerting

---

## 🎯 Integration Goals

### **Axiom - Observability**

- Log all API requests/responses
- Track errors with context
- Monitor performance
- Audit admin actions

### **Arcjet - Security**

- Rate limit endpoints
- Bot detection
- Email validation
- DDoS protection

### **PostHog - Analytics**

- Track user journey
- Conversion funnels
- A/B testing
- Feature flags

---

## 📋 Implementation Plan

### **Phase 1: Axiom** (1-2 days)

**Installation**:

```bash
npm install @axiomhq/js next-axiom
```

**Environment Variables**:

```bash
AXIOM_TOKEN=xaat-xxx
AXIOM_DATASET=franceshr-production
```

**Create Service** (`/lib/services/axiom.service.ts`):

```typescript
import { Logger } from "next-axiom";

export class AxiomService {
  private static logger = new Logger();

  static info(message: string, context?: Record<string, any>) {
    this.logger.info(message, context);
  }

  static error(message: string, error: Error, context?: Record<string, any>) {
    this.logger.error(message, { ...context, error });
  }

  static logRequest(req: Request) {
    this.info("API Request", {
      method: req.method,
      url: req.url,
    });
  }

  static async flush() {
    await this.logger.flush();
  }
}
```

---

### **Phase 2: Arcjet** (1-2 days)

**Installation**:

```bash
npm install @arcjet/next
```

**Environment Variables**:

```bash
ARCJET_KEY=ajkey-xxx
```

**Create Service** (`/lib/services/arcjet.service.ts`):

```typescript
import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [shield({ mode: "LIVE" })],
});

export class ArcjetService {
  static authRateLimit = aj.withRule(
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: "1m",
      capacity: 10,
    }),
  );

  static async protect(request: Request, ruleType: string) {
    const decision = await this.authRateLimit.protect(request);
    return decision;
  }
}
```

---

### **Phase 3: PostHog** (1-2 days)

**Installation**:

```bash
npm install posthog-js posthog-node
```

**Environment Variables**:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Create Provider** (`/lib/providers/posthog-provider.tsx`):

```typescript
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogWrapper({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

**Create Service** (`/lib/services/posthog.service.ts`):

```typescript
import { PostHog } from "posthog-node";

const client = new PostHog(process.env.POSTHOG_API_KEY!);

export class PostHogService {
  static track(userId: string, event: string, properties?: Record<string, any>) {
    client.capture({ distinctId: userId, event, properties });
  }

  static trackPurchase(userId: string, orderId: string, amount: number) {
    this.track(userId, "service_purchased", { orderId, amount });
  }
}
```

---

## 🔄 Combined Middleware

**Update** (`/middleware.ts`):

```typescript
import { updateSession } from "@/lib/supabase/middleware";
import { AxiomService } from "@/lib/services/axiom.service";
import { ArcjetService } from "@/lib/services/arcjet.service";

export async function middleware(request: NextRequest) {
  // 1. Supabase session
  const response = await updateSession(request);

  // 2. Arcjet security
  const decision = await ArcjetService.protect(request, "api");
  if (decision.isDenied()) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  // 3. Axiom logging
  AxiomService.logRequest(request);
  await AxiomService.flush();

  return response;
}
```

---

## 📊 Key Events to Track

```typescript
// User Journey
-user_signed_up -
  user_logged_in -
  service_purchased -
  onboarding_completed -
  document_downloaded -
  meeting_scheduled -
  subscription_started;
```

---

## 💰 Cost Estimation

- **Axiom**: $25-50/month
- **Arcjet**: $20-40/month
- **PostHog**: $0-30/month

**Total**: $45-120/month

---

## 🚀 Implementation Timeline

**Total**: 3-6 days

1. **Day 1-2**: Axiom setup and integration
2. **Day 3-4**: Arcjet security layer
3. **Day 5-6**: PostHog analytics

---

## 📝 Integration Checklist

### **Axiom**

- [ ] Install package
- [ ] Configure environment variables
- [ ] Create AxiomService
- [ ] Add to all services
- [ ] Set up dashboards

### **Arcjet**

- [ ] Install package
- [ ] Configure environment variables
- [ ] Create ArcjetService
- [ ] Protect routes
- [ ] Test rate limits

### **PostHog**

- [ ] Install packages
- [ ] Configure environment variables
- [ ] Create provider and service
- [ ] Add event tracking
- [ ] Set up funnels

---

## 🎯 Next Steps

1. Review and approve approach
2. Set up accounts (Axiom, Arcjet, PostHog)
3. Begin Phase 1 implementation
4. Create dashboards
5. Deploy to production

---

## 📚 Resources

- [Axiom Docs](https://axiom.co/docs)
- [Arcjet Docs](https://docs.arcjet.com)
- [PostHog Docs](https://posthog.com/docs)
