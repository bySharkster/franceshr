# Frances HR

A modern HR management platform built with Next.js, Supabase, and Stripe.

## Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment:**

   ```bash
   cp .env.example .env.local
   # Update .env.local with your credentials
   ```

3. **Start Supabase:**

   ```bash
   supabase start
   ```

4. **Start development server:**

   ```bash
   pnpm dev
   ```

5. **Access the app:**

   ```
   http://127.0.0.1:3000
   ```

   ⚠️ **Important:** Always use `127.0.0.1` instead of `localhost` to avoid cookie/auth issues.

## Documentation

- **[Authentication Setup](./README.Auth.md)** - Complete auth configuration guide
- **[Stripe Integration](./README.Stripe.md)** - Payment setup
- **[Docker Setup](./README.Docker.md)** - Container deployment

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── actions/           # Server actions
│   │   ├── auth/              # Auth pages
│   │   └── protected/         # Protected routes
│   ├── components/
│   │   ├── atoms/             # Basic UI components
│   │   ├── molecules/         # Composite components
│   │   └── organisms/         # Complex components
│   └── lib/                   # Utilities and helpers
├── supabase/
│   ├── migrations/            # Database migrations
│   └── config.toml           # Supabase configuration
└── stories/                   # Storybook stories
```

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter
- `pnpm storybook` - Start Storybook
- `supabase start` - Start local Supabase
- `supabase stop` - Stop local Supabase
- `supabase db reset` - Reset database with migrations

### Database Migrations

Create a new migration:

```bash
supabase migration new migration_name
```

Apply migrations:

```bash
supabase db reset
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linter: `pnpm lint`
4. Test locally
5. Submit a pull request

## License

Private - All rights reserved
