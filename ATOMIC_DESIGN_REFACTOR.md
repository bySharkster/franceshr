# Atomic Design Refactoring Guide

## 🏗️ Architecture Pattern

```
Server Component (Page) - Data Fetching
  ├── Suspense Boundary - Loading States
  │   └── Client Component (Organism) - Interactive Logic
  │       ├── Molecule Components - Composed UI Blocks
  │       │   └── Atom Components - Base UI Elements
  │       └── Uses Client Hooks for State
```

## ✅ **Benefits**

1. **Server-First**: Data fetched on server (faster, SEO-friendly)
2. **Minimal JS**: Only interactive parts are client components
3. **Better UX**: Suspense boundaries for loading states
4. **Type Safety**: Props passed from server to client
5. **Reusability**: Atomic components can be reused

---

## 📁 **Component Structure**

### **Atoms** (`/components/atoms/`)

Base UI elements (buttons, inputs, badges)

- Already exist in `/components/atoms/ui/`
- No changes needed

### **Molecules** (`/components/molecules/`)

Composed UI blocks (cards, forms, lists)

- **NEW**: Need to create dashboard-specific molecules

### **Organisms** (`/components/organisms/`)

Complex components with logic

- **NEW**: `dashboard-client.tsx` (created)

### **Pages** (`/app/`)

Server components that fetch data

- **REFACTORED**: `/app/app/page.tsx`

---

## 🎯 **Refactoring Pattern**

### **Before** (Client-Side Everything)

```typescript
"use client";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (loading) return <Loading />;

  return <UI data={data} />;
}
```

### **After** (Server + Client Islands)

```typescript
// page.tsx (Server Component)
export default async function Page() {
  const data = await fetchData(); // Server-side

  return (
    <Suspense fallback={<Loading />}>
      <ClientComponent initialData={data} />
    </Suspense>
  );
}

// client-component.tsx (Client Component)
"use client";

export function ClientComponent({ initialData }) {
  // Only interactive logic here
  return <UI data={initialData} />;
}
```

---

## 📋 **Implementation Checklist**

### **Phase 1: Dashboard Page** ✅ Started

#### Server Component

- [x] `/app/app/page.tsx` - Refactored to server component
- [x] Uses `OrdersService` and `OnboardingService`
- [x] Fetches data in parallel with `Promise.all()`
- [x] Redirects if not authenticated

#### Client Organism

- [x] `/components/organisms/dashboard-client.tsx` - Created
- [ ] Needs molecule components (see below)

#### Molecules Needed

- [ ] `/components/molecules/dashboard-header.tsx`
  - User email display
  - Sign out button
- [ ] `/components/molecules/dashboard-stats.tsx`
  - Stats cards (active services, completed)
  - Uses Order[] data
- [ ] `/components/molecules/orders-list.tsx`
  - List of orders with status badges
  - Click to scroll to onboarding
- [ ] `/components/molecules/onboarding-section.tsx`
  - Onboarding forms for each order
  - Upload resume functionality

---

## 🔄 **Next Pages to Refactor**

### **2. Payment Success Page**

**File**: `/app/pay/success/page.tsx`

**Current**: Client component with useEffect
**Target**: Server component with OrdersService

```typescript
// Server Component
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const order = await OrdersService.getByCheckoutSessionId(
    searchParams.session_id
  );

  return (
    <Suspense fallback={<Loading />}>
      <SuccessClient order={order} />
    </Suspense>
  );
}
```

---

### **3. Onboarding Page**

**File**: `/app/onboarding/page.tsx`

**Current**: Client component with form
**Target**: Server component + client form

```typescript
// Server Component
export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  const order = await OrdersService.getById(searchParams.orderId);

  return (
    <Suspense fallback={<Loading />}>
      <OnboardingForm order={order} />
    </Suspense>
  );
}
```

---

### **4. Services Page**

**File**: `/app/services/[serviceId]/page.tsx`

**Already good** - Uses server components
**May need**: Extract client form to separate component

---

## 📦 **Molecules to Create**

### **Dashboard Molecules**

#### 1. `dashboard-header.tsx`

```typescript
"use client";

interface DashboardHeaderProps {
  user: User;
  onSignOut: () => void;
}

export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Mi Espacio</h1>
        <p className="mt-2 text-foreground/60">Bienvenido, {user.email}</p>
      </div>
      <Button onClick={onSignOut} variant="outline">
        Cerrar Sesión
      </Button>
    </div>
  );
}
```

#### 2. `dashboard-stats.tsx`

```typescript
"use client";

interface DashboardStatsProps {
  orders: Order[];
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  const activeCount = orders.filter(
    (o) => o.status === "paid" || o.status === "pending"
  ).length;

  const completedCount = orders.filter(
    (o) => o.status === "completed"
  ).length;

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={FileText}
        label="Servicios Activos"
        value={activeCount}
      />
      <StatCard
        icon={CheckCircle}
        label="Completados"
        value={completedCount}
      />
    </div>
  );
}
```

#### 3. `orders-list.tsx`

```typescript
"use client";

interface OrdersListProps {
  orders: Order[];
  getServiceName: (slug: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  scrollToOnboarding: () => void;
}

export function OrdersList({
  orders,
  getServiceName,
  getStatusBadge,
  scrollToOnboarding,
}: OrdersListProps) {
  if (orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Mis Servicios</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            serviceName={getServiceName(order.package_slug)}
            statusBadge={getStatusBadge(order.status)}
            onComplete={scrollToOnboarding}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 4. `onboarding-section.tsx`

```typescript
"use client";

interface OnboardingSectionProps {
  orders: Order[];
  onboardingData: OnboardingData[];
  findServiceNameById: (id: string) => string;
  registerRef: (el: HTMLElement | null) => void;
}

export function OnboardingSection({
  orders,
  onboardingData,
  findServiceNameById,
  registerRef,
}: OnboardingSectionProps) {
  const pendingOrders = orders.filter(
    (o) => o.status === "paid" &&
    !onboardingData.some((d) => d.order_id === o.id)
  );

  if (pendingOrders.length === 0) {
    return null;
  }

  return (
    <div ref={registerRef}>
      <h2 className="mb-4 text-2xl font-bold">Completa tu Información</h2>
      {pendingOrders.map((order) => (
        <OnboardingForm
          key={order.id}
          order={order}
          serviceName={findServiceNameById(order.id)}
        />
      ))}
    </div>
  );
}
```

---

## 🎨 **Design Patterns**

### **1. Server Component Pattern**

```typescript
// Always async
export default async function Page() {
  // Fetch data
  const data = await fetchData();

  // Pass to client
  return <ClientComponent data={data} />;
}
```

### **2. Client Component Pattern**

```typescript
"use client";

// Receives server data as props
export function ClientComponent({ data }) {
  // Client-side interactivity
  const [state, setState] = useState(data);

  return <UI />;
}
```

### **3. Suspense Pattern**

```typescript
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>
```

### **4. Error Boundary Pattern**

```typescript
<ErrorBoundary fallback={<Error />}>
  <Component />
</ErrorBoundary>
```

---

## 📊 **Progress Tracking**

### **Completed**

- [x] Server component pattern for `/app/app/page.tsx`
- [x] Created `DashboardClient` organism
- [x] Services (OrdersService, OnboardingService)
- [x] Hooks (useAuth, useOrders, useOnboarding)

### **In Progress**

- [ ] Create dashboard molecule components
- [ ] Test refactored dashboard page

### **Pending**

- [ ] Refactor `/app/pay/success/page.tsx`
- [ ] Refactor `/app/onboarding/page.tsx`
- [ ] Extract forms to separate components
- [ ] Add error boundaries
- [ ] Add loading skeletons

---

## 🚀 **Quick Implementation Steps**

### **Step 1: Create Molecules** (Next)

```bash
# Create molecule components
touch src/components/molecules/dashboard-header.tsx
touch src/components/molecules/dashboard-stats.tsx
touch src/components/molecules/orders-list.tsx
touch src/components/molecules/onboarding-section.tsx
```

### **Step 2: Implement Molecules**

Copy the code templates from this document

### **Step 3: Test Dashboard**

```bash
npm run dev
# Visit /app to test refactored dashboard
```

### **Step 4: Refactor Next Page**

Move to payment success page

---

## 💡 **Best Practices**

1. **Keep server components async** - Always fetch on server
2. **Minimize client components** - Only for interactivity
3. **Use Suspense boundaries** - Better loading UX
4. **Pass data as props** - Server → Client
5. **Atomic design** - Build from small to large
6. **Type everything** - Full TypeScript safety

---

## 📝 **Notes**

- Server components are the default in App Router
- Add `"use client"` only when needed (hooks, events, state)
- Suspense works with async server components
- Error boundaries catch errors in component tree
- Loading.tsx files create automatic suspense boundaries

---

**Next Action**: Create the 4 molecule components to complete the dashboard refactor! 🎯
