# FrancesHR - Turborepo Monorepo

This project uses [Turborepo](https://turbo.build/repo) to manage a monorepo structure.

## Structure

```
franceshr/
├── apps/
│   ├── web/              # Customer-facing Next.js app
│   └── admin/            # (Future) Admin panel
├── packages/
│   ├── ui/               # Shared UI components + Storybook
│   ├── types/            # Shared TypeScript types
│   ├── config/           # Shared configs (ESLint, TS, Tailwind)
│   └── database/         # Supabase client utilities
├── supabase/             # Supabase local development
└── turbo.json            # Turborepo configuration
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server (web app)
pnpm dev

# Run specific app
pnpm web:dev

# Run Storybook
pnpm storybook

# Build all apps
pnpm build

# Run tests
pnpm test

# Lint all packages
pnpm lint
```

## Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm web:dev` - Start only the web app
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Run all tests
- `pnpm storybook` - Start Storybook
- `pnpm clean` - Clean all build artifacts

## Packages

### @franceshr/web

Customer-facing Next.js application with authentication, payments, and onboarding.

### @franceshr/ui

Shared UI component library with:

- Radix UI primitives
- Custom components
- Storybook documentation
- Tailwind CSS styling

### @franceshr/types

Shared TypeScript types for:

- Database schemas (Supabase)
- Business logic types
- API contracts

### @franceshr/config

Shared configuration files:

- ESLint
- TypeScript
- Tailwind CSS
- Prettier

### @franceshr/database

Supabase client utilities:

- Browser client
- Server client
- Service role client
- Middleware

## Development

### Adding a New Package

1. Create directory in `packages/`
2. Add `package.json` with name `@franceshr/package-name`
3. Add to `pnpm-workspace.yaml` if needed
4. Run `pnpm install`

### Adding a New App

1. Create directory in `apps/`
2. Add `package.json` with name `@franceshr/app-name`
3. Add dependencies to workspace packages
4. Update `turbo.json` if needed

## Supabase

Supabase configuration remains at the root level and is shared across all apps.

```bash
# Start Supabase locally
npx supabase start

# Stop Supabase
npx supabase stop

# Generate types
npx supabase gen types typescript --local > packages/types/src/supabase.types.ts
```

## Deployment

Each app can be deployed independently:

```bash
# Build specific app
pnpm turbo run build --filter=@franceshr/web

# Deploy web app
# (Your deployment commands here)
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
