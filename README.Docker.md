# Docker usage for this project

This project includes a multi-stage `Dockerfile` and a `compose.yaml` that runs a single `server` service exposing port `3000`.

- `compose.yaml` maps `3000:3000` and sets `NODE_ENV=production` for the container.
- `Dockerfile` builds the Next.js app with pnpm and runs `pnpm start`.

## Prerequisites

- Docker and Docker Compose v2
- pnpm lockfile (`pnpm-lock.yaml`) present
- Environment variables set in your host (or wired via Compose) for runtime (e.g. Supabase, Stripe)

## Local build and run

- Build and start containers (production build):

```bash
docker compose up --build
```

- App will be available at:

```
http://127.0.0.1:3000
```

## Logs and lifecycle

- View logs:

```bash
docker compose logs -f server
```

- Stop containers:

```bash
docker compose down
```

- Rebuild after changes:

```bash
docker compose build --no-cache && docker compose up
```

- Remove dangling images (optional cleanup):

```bash
docker image prune -f
```

## Environment variables

The container needs the same env values your app expects (e.g. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_*`, etc.). You can pass them at runtime via Compose.

Option A — export in your shell before `docker compose up`:

```bash
export NEXT_PUBLIC_SUPABASE_URL=...
export NEXT_PUBLIC_SUPABASE_ANON_KEY=...
export STRIPE_API_KEY=...
export STRIPE_WEBHOOK_SIGNING_SECRET=...
# then
docker compose up --build
```

Option B — use an env file with Compose (recommended):

1. Create a file named `.env.docker` alongside `compose.yaml` with required keys.
2. Add an `env_file` section to the `server` service in `compose.yaml`:

```yaml
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    env_file:
      - .env.docker
    ports:
      - "3000:3000"
```

Then run:

```bash
docker compose --env-file .env.docker up --build
```

Note: `NEXT_PUBLIC_*` variables are needed at build time for Next.js public env exposure. If these can change per environment, rebuild when they change.

## Multi-arch and pushing images

- Build for a different platform (e.g., Apple Silicon → amd64):

```bash
docker build --platform=linux/amd64 -t your-registry/your-app:latest .
```

- Push to your registry:

```bash
docker push your-registry/your-app:latest
```

## Notes

- The `compose.yaml` currently defines only the `server` service. Postgres/Supabase are external and not included in Compose. Ensure the necessary services are reachable via your env settings.
- The image runs `pnpm start` (production server). Use the local Node/pnpm workflow for iterative development if you prefer HMR via `next dev`.

## References

- Docker Node.js guide: https://docs.docker.com/language/nodejs/
- Docker Compose spec: https://docs.docker.com/compose/compose-file/
- Next.js Docker docs: https://nextjs.org/docs/app/building-your-application/deploying#docker
