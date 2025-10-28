# Supabase Code Analysis & Refactoring Plan

## 🔍 Current Issues Identified

### 1. **Inconsistent Client Creation**

- Multiple files create Supabase clients inline without reusing instances
- No centralized client management for client-side operations
- Repeated `createClient()` calls in useEffect hooks

### 2. **Duplicate Auth Logic**

```typescript
// Pattern repeated in 5+ files:
const supabase = createClient();
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) {
  router.push("/auth/login");
  return;
}
```

**Files with duplicate auth checks:**

- `/app/app/page.tsx`
- `/app/onboarding/page.tsx`
- `/app/checkout/page.tsx`
- `/components/molecules/forms/payment-form.tsx`

### 3. **Duplicate Data Fetchbing Patterns**

**Orders Fetching** (repeated 3+ times):

```typescript
const { data: ordersData } = await supabase
  .from("orders")
  .select("*")
  .eq("user_id", currentUser.id)
  .order("created_at", { ascending: false });
```

**Onboarding Data Fetching** (repeated 2+ times):

```typescript
const { data: onboardingDataResult } = await supabase
  .from("onboarding_data")
  .select("*")
  .eq("user_id", currentUser.id)
  .order("created_at", { ascending: false });
```

### 4. **No Error Handling Consistency**

- Some files handle errors, others silently fail
- No centralized error logging or user feedback
- Inconsistent error message formats

### 5. **No Type Safety for Database Queries**

- Using `any` types or generic types
- No generated types from Supabase schema
- Manual type definitions that can drift from database

### 6. **Storage Operations Not Abstracted**

```typescript
// Repeated in onboarding/page.tsx
const { data: _uploadData, error: uploadError } = await supabase.storage
  .from("resumes")
  .upload(filePath, formData.currentResume, {
    upsert: true,
  });

const {
  data: { publicUrl },
} = supabase.storage.from("resumes").getPublicUrl(filePath);
```

---

## 📋 Refactoring Plan

### Phase 1: Create Reusable Hooks & Services

#### 1.1 **Auth Hook** (`/hooks/use-auth.ts`)

```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Centralized auth state management
  // Auto-redirect on auth changes
  // Return user, loading, signOut, etc.
}
```

#### 1.2 **Orders Service** (`/lib/services/orders.service.ts`)

```typescript
export class OrdersService {
  static async getUserOrders(userId: string): Promise<Order[]>;
  static async getOrderById(orderId: string): Promise<Order | null>;
  static async getOrderBySessionId(sessionId: string): Promise<Order | null>;
  static async createOrder(data: CreateOrderData): Promise<Order>;
  static async updateOrderStatus(orderId: string, status: string): Promise<void>;
}
```

#### 1.3 **Onboarding Service** (`/lib/services/onboarding.service.ts`)

```typescript
export class OnboardingService {
  static async getUserOnboardingData(userId: string): Promise<OnboardingData[]>;
  static async createOnboardingData(data: CreateOnboardingData): Promise<OnboardingData>;
  static async getOnboardingByOrderId(orderId: string): Promise<OnboardingData | null>;
}
```

#### 1.4 **Storage Service** (`/lib/services/storage.service.ts`)

```typescript
export class StorageService {
  static async uploadResume(userId: string, file: File): Promise<string>;
  static async getResumeUrl(userId: string, filename: string): Promise<string>;
  static async deleteResume(userId: string, filename: string): Promise<void>;
}
```

### Phase 2: Create Database Types

#### 2.1 **Generate Supabase Types**

```bash
npx supabase gen types typescript --project-id <project-id> > src/types/supabase.types.ts
```

#### 2.2 **Create Domain Types** (`/types/database.types.ts`)

```typescript
import type { Database } from "./supabase.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OnboardingData = Database["public"]["Tables"]["onboarding_data"]["Row"];
// ... etc
```

### Phase 3: Create Error Handling Utilities

#### 3.1 **Error Handler** (`/lib/utils/error-handler.ts`)

```typescript
export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export function handleSupabaseError(error: PostgrestError | null): never {
  if (!error) throw new Error("Unknown error");

  // Log to monitoring service
  console.error("[Supabase Error]", error);

  throw new SupabaseError(error.message, error.code, error.details);
}
```

### Phase 4: Implement Query Hooks

#### 4.1 **Orders Hooks** (`/hooks/use-orders.ts`)

```typescript
export function useUserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    OrdersService.getUserOrders(user.id)
      .then(setOrders)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { orders, loading, error, refetch };
}
```

#### 4.2 **Onboarding Hooks** (`/hooks/use-onboarding.ts`)

```typescript
export function useOnboardingData() {
  // Similar pattern to useUserOrders
}

export function useCreateOnboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOnboarding = async (data: CreateOnboardingData) => {
    setLoading(true);
    try {
      const result = await OnboardingService.createOnboardingData(data);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOnboarding, loading, error };
}
```

---

## 🎯 Benefits of Refactoring

### Code Reusability

- **Before**: 200+ lines of duplicate code across 5 files
- **After**: Single source of truth in services/hooks

### Type Safety

- **Before**: Manual types, prone to drift
- **After**: Generated types from database schema

### Error Handling

- **Before**: Inconsistent, some silent failures
- **After**: Centralized, logged, user-friendly

### Maintainability

- **Before**: Changes require updates in multiple files
- **After**: Update once in service layer

### Testing

- **Before**: Hard to test, tightly coupled
- **After**: Easy to mock services, unit testable

---

## 📊 Impact Analysis

### Files to Refactor (Priority Order)

1. **High Priority** (Duplicate logic, used frequently):
   - `/app/app/page.tsx` - 73 lines of Supabase calls
   - `/app/onboarding/page.tsx` - 60+ lines of Supabase calls
   - `/app/checkout/page.tsx` - Similar auth/order patterns
   - `/app/pay/success/page.tsx` - Order fetching logic

2. **Medium Priority** (Less duplication, but benefits from abstraction):
   - `/components/molecules/forms/payment-form.tsx`
   - `/app/api/create-checkout-session/route.ts`
   - `/app/api/stripe-webhook/route.ts`

3. **Low Priority** (Simple, one-off calls):
   - Auth action files (already somewhat abstracted)
   - Protected page checks

### Estimated Reduction

- **Lines of Code**: ~300-400 lines removed
- **Files Modified**: 8-10 files
- **New Files Created**: 6-8 service/hook files
- **Net Change**: -200 to -300 lines overall

---

## 🚀 Implementation Steps

### Step 1: Create Base Infrastructure (1-2 hours)

1. Generate Supabase types
2. Create error handler utility
3. Set up service base classes

### Step 2: Implement Services (2-3 hours)

1. OrdersService
2. OnboardingService
3. StorageService
4. AuthService (if needed beyond existing)

### Step 3: Create Hooks (2-3 hours)

1. useAuth (centralized)
2. useUserOrders
3. useOnboardingData
4. useCreateOnboarding

### Step 4: Refactor Pages (3-4 hours)

1. `/app/app/page.tsx`
2. `/app/onboarding/page.tsx`
3. `/app/checkout/page.tsx`
4. `/app/pay/success/page.tsx`

### Step 5: Testing & Validation (2-3 hours)

1. Test all refactored pages
2. Verify auth flows
3. Test data fetching
4. Error handling validation

**Total Estimated Time**: 10-15 hours

---

## 📝 Example Refactor

### Before (`/app/app/page.tsx`):

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const supabase = createClient();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    setUser(currentUser);

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (ordersData) {
      setOrders(ordersData);
    }

    const { data: onboardingDataResult } = await supabase
      .from("onboarding_data")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (onboardingDataResult) {
      setOnboardingData(onboardingDataResult);
    }

    setLoading(false);
  };

  checkAuth();
}, [router]);
```

### After:

```typescript
const { user, loading: authLoading } = useAuth({ requireAuth: true });
const { orders, loading: ordersLoading } = useUserOrders();
const { data: onboardingData, loading: onboardingLoading } = useOnboardingData();

const loading = authLoading || ordersLoading || onboardingLoading;
```

**Reduction**: 40+ lines → 4 lines
