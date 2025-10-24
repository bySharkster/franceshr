# Authentication Setup Guide

## Important: Use 127.0.0.1 Instead of localhost

**Always access your app at `http://127.0.0.1:3000` instead of `http://localhost:3000`**

### Why?

Browsers treat `localhost` and `127.0.0.1` as different domains. This causes cookie issues:

- Cookies set on `127.0.0.1` won't be accessible from `localhost`
- Auth sessions won't persist when switching between the two
- You'll see "auth-code-error" when redirecting between them

### Configuration

The following files are configured to use `127.0.0.1`:

1. **`supabase/config.toml`**

   ```toml
   site_url = "http://127.0.0.1:3000"
   additional_redirect_urls = ["http://127.0.0.1:3000/**"]
   ```

2. **`.env.local`** (create from `.env.example`)
   ```bash
   NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
   ```

## Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
   ```

3. Start Supabase:

   ```bash
   supabase start
   ```

4. Start Next.js:

   ```bash
   pnpm dev
   ```

5. **Access the app at: `http://127.0.0.1:3000`**

## Auth Flow

### Email/Password Sign Up

1. User fills form at `/auth/sign-up`
2. Server action `signUp()` creates user in Supabase
3. Trigger `on_auth_user_created` creates profile in `public.users`
4. User receives confirmation email (if enabled)
5. Redirects to `/protected` or shows success message

### Email/Password Login

1. User fills form at `/auth/login`
2. Server action `signIn()` authenticates user
3. Session cookie is set on `127.0.0.1` domain
4. Redirects to `/protected`

### OAuth Login (Google, Apple, Facebook)

1. User clicks OAuth button
2. Server action `signInWithOAuth()` initiates OAuth flow
3. User authenticates with provider
4. Provider redirects to `/auth/callback?code=...`
5. Callback handler exchanges code for session
6. Redirects to `/protected`

## Troubleshooting

### "auth-code-error" after OAuth login

- **Cause**: Accessing app from `localhost` instead of `127.0.0.1`
- **Fix**: Always use `http://127.0.0.1:3000`

### "Database error saving new user"

- **Cause**: RLS policies or trigger function issues
- **Fix**: Run `supabase db reset` to apply latest migrations

### Session not persisting

- **Cause**: Cookie domain mismatch
- **Fix**: Clear cookies and use only `127.0.0.1`

### "fetch failed" / "ECONNREFUSED 127.0.0.1:54321"

- **Cause**: Supabase is not running
- **Fix**: Run `supabase start`

## OAuth Provider Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://127.0.0.1:54321/auth/v1/callback`
4. Update `supabase/config.toml`:
   ```toml
   [auth.external.google]
   enabled = true
   client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
   secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET)"
   ```
5. Add credentials to `supabase/.env` (not `.env.local`)

### Apple OAuth

Similar setup in Apple Developer Console with redirect URI: `http://127.0.0.1:54321/auth/v1/callback`

### Facebook OAuth

Similar setup in Facebook Developers Console with redirect URI: `http://127.0.0.1:54321/auth/v1/callback`

## Database Schema

### `auth.users` (Supabase managed)

- Stores authentication data
- Managed by Supabase Auth

### `public.users` (Your app)

- Stores user profile data
- Automatically created via trigger when auth user is created
- Fields: `id`, `full_name`, `avatar_url`, `billing_address`, `payment_method`

### Trigger: `on_auth_user_created`

- Fires after insert on `auth.users`
- Calls `handle_new_user()` function
- Creates corresponding record in `public.users`

## Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:

- Users can view their own profile
- Users can update their own profile
- Service role can insert users (for trigger)

### Server Actions

All auth operations use server actions:

- `signUp()` - Create new user
- `signIn()` - Authenticate user
- `signOut()` - End session
- `resetPassword()` - Request password reset
- `updatePassword()` - Update password
- `signInWithOAuth()` - OAuth authentication

## Production Deployment

When deploying to production:

1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Update Supabase project settings with production URLs
3. Configure OAuth providers with production redirect URIs
4. Enable email confirmation in Supabase dashboard
5. Configure SMTP for production emails (Resend recommended)

## References

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
