# Turborepo Migration Guide

## Import Path Changes

### Database/Supabase Imports

**Before:**

```typescript
import { createClient } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/service-role-client";
import { updateSession } from "@/lib/supabase/middleware";
```

**After:**

```typescript
import { createBrowserClient } from "@franceshr/database";
import { createServerClient } from "@franceshr/database";
import { createServiceRoleClient } from "@franceshr/database";
import { updateSession } from "@franceshr/database";
```

### Type Imports

**Before:**

```typescript
import type { Order } from "@/types/database.types";
import type { Price } from "@/types/prices.type";
import type { ServiceType } from "@/types/services.type";
```

**After:**

```typescript
import type { Order, Price, ServiceType } from "@franceshr/types";
```

### UI Component Imports (No Change for apps/web)

Components remain in the app:

```typescript
import { Button } from "@/components/atoms/ui/button";
```

### Hooks (No Change for app-specific hooks)

App-specific hooks remain:

```typescript
import { useAuth } from "@/hooks/use-auth";
```

## Files Updated

- All files importing from `@/lib/supabase/*`
- All files importing from `@/types/*`
- middleware.ts
- All service files
- All hooks
- All components using Supabase client

## Testing Checklist

- [ ] `pnpm dev` - Development server starts
- [ ] `pnpm build` - Production build succeeds
- [ ] `pnpm lint` - No linting errors
- [ ] `pnpm test` - All tests pass
- [ ] `pnpm storybook` - Storybook runs
- [ ] Authentication flows work
- [ ] Database queries work
- [ ] Stripe integration works
