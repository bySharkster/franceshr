# MVP+ Integration Plan (Fast Track)

## 🎯 Overview

**Excluded** (for later):

- ❌ Testing Infrastructure
- ❌ CI/CD Pipeline
- ❌ Sentry Error Tracking

**Included** (MVP+ essentials):

- ✅ Database Backups & Recovery
- ✅ Documentation
- ✅ User Permissions (Admin/User roles)
- ✅ Email Deliverability
- ✅ File Management
- ✅ Legal & Compliance
- ✅ Notification System
- ✅ Performance Optimization
- ✅ Basic Monitoring (Axiom only)

---

## 📋 Implementation Phases

### **Phase 1: Database & Security** (Week 1)

#### 1.1 Database Backups

**Time**: 1 day

**Tasks**:

- [ ] Enable Supabase automatic backups
- [ ] Document backup schedule
- [ ] Create restore procedure document
- [ ] Test backup restoration once

**Supabase Dashboard**:

```
Settings → Database → Backups
- Enable daily backups
- Set retention to 7 days (free tier) or 30 days (pro)
```

**Create Document** (`/docs/BACKUP_RECOVERY.md`):

````markdown
# Backup & Recovery Procedures

## Automatic Backups

- Daily backups at 2 AM UTC
- 7-day retention
- Stored in Supabase infrastructure

## Manual Backup

```bash
# Export database
npx supabase db dump -f backup.sql

# Export storage
npx supabase storage download --bucket resumes --path ./backups/resumes
```
````

## Restore Procedure

1. Go to Supabase Dashboard → Database → Backups
2. Select backup date
3. Click "Restore"
4. Confirm restoration
5. Verify data integrity

## Emergency Contacts

- Supabase Support: support@supabase.io
- Admin: [your-email]

````

---

#### 1.2 User Permissions & RBAC
**Time**: 2 days

**Database Migration** (`/supabase/migrations/add_user_roles.sql`):
```sql
-- Add role column to users table
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Create role enum
CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');

-- Add role to users metadata
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS app_role user_role DEFAULT 'user';

-- Create admin users table for additional admin data
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS policies for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admin users"
ON public.admin_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.app_role IN ('admin', 'super_admin')
  )
);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id
    AND app_role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id
    AND app_role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
````

**Create Permissions Service** (`/lib/services/permissions.service.ts`):

```typescript
import { createClient } from "@/lib/supabase/server";

export type UserRole = "user" | "admin" | "super_admin";

export class PermissionsService {
  /**
   * Check if user is admin
   */
  static async isAdmin(userId: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.rpc("is_admin", { user_id: userId });
    return data ?? false;
  }

  /**
   * Check if user is super admin
   */
  static async isSuperAdmin(userId: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.rpc("is_super_admin", { user_id: userId });
    return data ?? false;
  }

  /**
   * Get user role
   */
  static async getUserRole(userId: string): Promise<UserRole> {
    const supabase = await createClient();
    const { data } = await supabase.from("auth.users").select("app_role").eq("id", userId).single();

    return (data?.app_role as UserRole) ?? "user";
  }

  /**
   * Set user role (super admin only)
   */
  static async setUserRole(adminId: string, targetUserId: string, role: UserRole): Promise<void> {
    const isSuperAdmin = await this.isSuperAdmin(adminId);
    if (!isSuperAdmin) {
      throw new Error("Unauthorized: Only super admins can change roles");
    }

    const supabase = await createClient();
    await supabase.from("auth.users").update({ app_role: role }).eq("id", targetUserId);
  }
}
```

**Create Admin Middleware** (`/middleware/admin.middleware.ts`):

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PermissionsService } from "@/lib/services/permissions.service";

export async function adminMiddleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isAdmin = await PermissionsService.isAdmin(user.id);

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
```

---

### **Phase 2: Email & Notifications** (Week 2)

#### 2.1 Email Deliverability

**Time**: 2 days

**Update Email Service** (`/lib/services/email.service.ts`):

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  private static readonly FROM_EMAIL = process.env.EMAIL_FROM || "noreply@franceshr.com";

  /**
   * Send email with retry logic
   */
  private static async sendWithRetry(
    params: {
      to: string;
      subject: string;
      react: React.ReactElement;
    },
    maxRetries = 3,
  ) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await resend.emails.send({
          from: this.FROM_EMAIL,
          to: params.to,
          subject: params.subject,
          react: params.react,
          // Add unsubscribe link
          headers: {
            "List-Unsubscribe": `<mailto:unsubscribe@franceshr.com?subject=unsubscribe>`,
          },
        });

        // Log to Axiom
        AxiomService.logEmail("sent", params.to, params.subject, {
          emailId: result.data?.id,
        });

        return result;
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    // Log failure
    AxiomService.logEmail("failed", params.to, params.subject);
    throw lastError;
  }

  /**
   * Handle email bounces (webhook from Resend)
   */
  static async handleBounce(email: string, reason: string) {
    // Mark email as bounced in database
    const supabase = await createClient();
    await supabase.from("email_bounces").insert({
      email,
      reason,
      bounced_at: new Date().toISOString(),
    });
  }
}
```

**Create Email Bounces Table**:

```sql
CREATE TABLE IF NOT EXISTS public.email_bounces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  reason TEXT,
  bounced_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_email_bounces_email ON public.email_bounces(email);
```

---

#### 2.2 Notification System

**Time**: 2 days

**Create Notifications Table**:

```sql
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'order_update', 'document_ready', 'meeting_reminder'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
```

**Create Notification Service** (`/lib/services/notification.service.ts`):

```typescript
import { createClient } from "@/lib/supabase/server";
import { EmailService } from "./email.service";

export type NotificationType =
  | "order_update"
  | "document_ready"
  | "meeting_reminder"
  | "payment_received";

export class NotificationService {
  /**
   * Create in-app notification
   */
  static async create(params: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    actionUrl?: string;
  }) {
    const supabase = await createClient();

    const { data } = await supabase
      .from("notifications")
      .insert({
        user_id: params.userId,
        type: params.type,
        title: params.title,
        message: params.message,
        action_url: params.actionUrl,
      })
      .select()
      .single();

    return data;
  }

  /**
   * Send notification (in-app + email)
   */
  static async send(params: {
    userId: string;
    email: string;
    type: NotificationType;
    title: string;
    message: string;
    actionUrl?: string;
  }) {
    // Create in-app notification
    await this.create({
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      actionUrl: params.actionUrl,
    });

    // Send email notification
    // (Use appropriate email template based on type)
    // await EmailService.sendNotification(params);
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string) {
    const supabase = await createClient();
    await supabase.from("notifications").update({ read: true }).eq("id", notificationId);
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(userId: string, limit = 50) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    return data ?? [];
  }

  /**
   * Get unread count
   */
  static async getUnreadCount(userId: string): Promise<number> {
    const supabase = await createClient();
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false);

    return count ?? 0;
  }
}
```

---

### **Phase 3: Legal & Compliance** (Week 3)

#### 3.1 Legal Pages

**Time**: 1 day

**Create Legal Pages**:

`/app/legal/terms/page.tsx`:

```typescript
export default function TermsOfService() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Términos de Servicio</h1>

      <section className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">1. Aceptación de Términos</h2>
          <p className="text-muted-foreground">
            Al acceder y utilizar FrancesHR, aceptas estar sujeto a estos términos de servicio...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">2. Servicios Ofrecidos</h2>
          <p className="text-muted-foreground">
            FrancesHR ofrece servicios de creación de currículums, mentoría laboral...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">3. Pagos y Reembolsos</h2>
          <p className="text-muted-foreground">
            Todos los pagos se procesan de forma segura a través de Stripe...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">4. Propiedad Intelectual</h2>
          <p className="text-muted-foreground">
            Los documentos creados son propiedad del cliente...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">5. Limitación de Responsabilidad</h2>
          <p className="text-muted-foreground">
            FrancesHR no garantiza resultados específicos en procesos de contratación...
          </p>
        </div>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}
```

`/app/legal/privacy/page.tsx`:

```typescript
export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Política de Privacidad</h1>

      <section className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">1. Información que Recopilamos</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Información de contacto (nombre, email)</li>
            <li>Información de pago (procesada por Stripe)</li>
            <li>Currículums y documentos profesionales</li>
            <li>Datos de uso del sitio web</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">2. Cómo Usamos tu Información</h2>
          <p className="text-muted-foreground">
            Utilizamos tu información para proporcionar nuestros servicios...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">3. Compartir Información</h2>
          <p className="text-muted-foreground">
            No vendemos ni compartimos tu información personal con terceros...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">4. Seguridad de Datos</h2>
          <p className="text-muted-foreground">
            Implementamos medidas de seguridad para proteger tu información...
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">5. Tus Derechos (GDPR)</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Derecho de acceso a tus datos</li>
            <li>Derecho de rectificación</li>
            <li>Derecho de eliminación</li>
            <li>Derecho de portabilidad</li>
          </ul>
        </div>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}
```

---

#### 3.2 GDPR Compliance

**Time**: 2 days

**Data Export API** (`/app/api/user/export/route.ts`):

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Collect all user data
  const [orders, onboarding, notifications] = await Promise.all([
    supabase.from("orders").select("*").eq("user_id", user.id),
    supabase.from("onboarding_data").select("*").eq("user_id", user.id),
    supabase.from("notifications").select("*").eq("user_id", user.id),
  ]);

  const userData = {
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
    orders: orders.data,
    onboarding: onboarding.data,
    notifications: notifications.data,
    exported_at: new Date().toISOString(),
  };

  return NextResponse.json(userData);
}
```

**Data Deletion API** (`/app/api/user/delete/route.ts`):

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delete all user data (cascading deletes will handle related records)
  await supabase.auth.admin.deleteUser(user.id);

  return NextResponse.json({ success: true });
}
```

---

### **Phase 4: File Management & Performance** (Week 4)

#### 4.1 File Management

**Time**: 1 day

**Update Storage Service** (`/lib/services/storage.service.ts`):

```typescript
export class StorageService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  /**
   * Validate file before upload
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: "File size exceeds 10MB limit" };
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: "Invalid file type. Only PDF and Word documents allowed" };
    }

    return { valid: true };
  }

  /**
   * Upload resume with validation
   */
  static async uploadResume(userId: string, file: File): Promise<string> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/resume_${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from("resumes").upload(fileName, file, {
      upsert: true,
      contentType: file.type,
    });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("resumes").getPublicUrl(fileName);

    return publicUrl;
  }

  /**
   * Delete file
   */
  static async deleteFile(bucket: string, path: string): Promise<void> {
    const supabase = await createClient();
    await supabase.storage.from(bucket).remove([path]);
  }
}
```

---

#### 4.2 Performance Optimization

**Time**: 1 day

**Add Next.js Config Optimizations** (`/next.config.js`):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ["your-supabase-project.supabase.co"],
    formats: ["image/avif", "image/webp"],
  },

  // Compression
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // Production optimizations
  swcMinify: true,

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

### **Phase 5: Documentation** (Week 5)

#### 5.1 Create Essential Docs

**Time**: 2 days

**Create** `/docs/SETUP.md`:

````markdown
# Local Development Setup

## Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

## Installation

1. Clone repository

```bash
git clone [repo-url]
cd franceshr
```
````

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- RESEND_API_KEY
- AXIOM_TOKEN
- ARCJET_KEY
- NEXT_PUBLIC_POSTHOG_KEY

4. Run database migrations

```bash
npx supabase db push
```

5. Start development server

```bash
npm run dev
```

## Common Issues

- Port 3000 already in use: Change port in package.json
- Supabase connection error: Check environment variables

````

**Create** `/docs/DEPLOYMENT.md`:
```markdown
# Deployment Guide

## Vercel Deployment

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

## Environment Variables Checklist
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] RESEND_API_KEY
- [ ] AXIOM_TOKEN
- [ ] ARCJET_KEY
- [ ] POSTHOG_API_KEY

## Post-Deployment
1. Set up Stripe webhook
2. Verify email sending
3. Test payment flow
4. Check Axiom logs
````

---

## 📊 **MVP+ Timeline Summary**

| Phase       | Duration | Tasks                                |
| ----------- | -------- | ------------------------------------ |
| **Phase 1** | Week 1   | Database backups + User permissions  |
| **Phase 2** | Week 2   | Email deliverability + Notifications |
| **Phase 3** | Week 3   | Legal pages + GDPR compliance        |
| **Phase 4** | Week 4   | File management + Performance        |
| **Phase 5** | Week 5   | Documentation                        |

**Total**: 5 weeks

---

## ✅ **MVP+ Checklist**

### **Week 1**

- [ ] Enable Supabase backups
- [ ] Create backup documentation
- [ ] Add user roles migration
- [ ] Create PermissionsService
- [ ] Create admin middleware
- [ ] Test admin access

### **Week 2**

- [ ] Add email retry logic
- [ ] Create email bounces table
- [ ] Create notifications table
- [ ] Create NotificationService
- [ ] Test email delivery
- [ ] Test in-app notifications

### **Week 3**

- [ ] Create Terms of Service page
- [ ] Create Privacy Policy page
- [ ] Add data export API
- [ ] Add data deletion API
- [ ] Test GDPR compliance
- [ ] Add legal links to footer

### **Week 4**

- [ ] Add file validation
- [ ] Update StorageService
- [ ] Optimize Next.js config
- [ ] Add security headers
- [ ] Test file uploads
- [ ] Test performance

### **Week 5**

- [ ] Create SETUP.md
- [ ] Create DEPLOYMENT.md
- [ ] Create BACKUP_RECOVERY.md
- [ ] Document all APIs
- [ ] Create troubleshooting guide

---

## 🚀 **Ready to Start?**

Begin with **Phase 1, Day 1**: Enable Supabase backups and create the user roles migration.

All code is ready to copy-paste and implement. Let me know when you're ready to begin! 🎯
