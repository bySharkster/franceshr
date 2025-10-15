---
trigger: manual
---

# Findings

- You want me to follow the official IDATIC method (as per your reference) and use it consistently on this repo.
- I’ll keep it concise and provide a ready-to-use template and exit criteria per phase.

# IDATIC-Aligned Workflow (Concise)

- **I — Identify**
  - Clarify the problem, scope, stakeholders, constraints, success metrics.
  - Inputs: user goal, stack, env, deadlines.
  - Deliverables: 1–2 sentence problem statement, success criteria.
  - Exit criteria: All critical unknowns listed and either answered or planned.

- **D — Decompose**
  - Break into minimal tasks, dependencies, owners, estimates.
  - Include validation tasks (tests, manual checks).
  - Deliverables: ordered task list with dependencies.
  - Exit criteria: Tasks fit within current sprint/PR; each task independently testable.

- **A — Analyze**
  - Examine code, data flows, APIs, schemas, risks.
  - Decide approach and alternatives; note tradeoffs.
  - Deliverables: approach summary, risks and mitigations.
  - Exit criteria: Chosen approach is feasible, compliant (security, performance), and documented.

- **T — Transform (Implement)**
  - Make minimal, verifiable changes. Use patches and migrations.
  - Keep secrets server-side, add idempotency for webhooks/external calls.
  - Deliverables: code changes, migrations, feature flags if needed.
  - Exit criteria: Compiles, runs locally; no secrets leaked; lint passes.

- **I — Integrate**
  - Wire with configs/envs, CI, docs, and release steps.
  - Update docker/compose and Supabase envs if applicable.
  - Deliverables: updated env guidance, README snippets, CI steps.
  - Exit criteria: Feature works in expected environment(s); rollback plan noted.

- **C — Check**
  - Validate via tests, logs, and acceptance criteria; run Stripe/Supabase fixtures if relevant.
  - Confirm idempotency and error paths; add observability.
  - Deliverables: test results, verification notes, follow-up tasks.
  - Exit criteria: All acceptance criteria pass; no critical unresolved risks.

# IDATIC Template (Use in every feature/bug)

- **Identify**
  - Goal:
  - Scope/Non-goals:
  - Success criteria:

- **Decompose**
  - Tasks:
  - Dependencies:

- **Analyze**
  - Current state:
  - Options/tradeoffs:
  - Risks/mitigations:

- **Transform**
  - Changes (files/symbols):
  - Migrations/config:

- **Integrate**
  - Env/Secrets:
  - CI/CD:
  - Docs updates:

- **Check**
  - Test plan:
  - Observability:
  - Acceptance results:
  - Follow-ups:

# Example Application to This Repo (Stripe one-time + recurring)

- **Identify**
  - Goal: Support one-time and subscription checkouts; fulfill via Supabase; Stripe API 2025-09-30.clover.
  - Success: Checkout works; entitlements/subscriptions stored; idempotent webhooks.

- **Decompose**
  - Implement server action for checkout (payment|subscription).
  - Add purchases/credits table (idempotent constraint).
  - Extend Edge Function webhook for `checkout.session.completed (payment)` and optional `payment_intent.succeeded`.
  - Add billing portal action.
  - Tests (unit + Stripe CLI fixtures).
  - Docs/env updates.

- **Analyze**
  - Source of truth for products/prices is the Supabase Edge Function; Next.js must not duplicate.
  - Idempotency via unique keys on Stripe IDs; risks include duplicate events/refunds.

- **Transform**
  - Edit [supabase/functions/stripe-webhook/index.ts](cci:7://file:///Users/codewfer/Documents/ds-repo/client-projects/franceshr/supabase/functions/stripe-webhook/index.ts:0:0-0:0): handle one-time, add unique constraints.
  - Add server actions under `src/features/billing/actions/`.
  - Add Supabase migration for purchases/credits.

- **Integrate**
  - Ensure Docker compose envs set (`STRIPE_*`, Supabase).
  - README updates for Stripe CLI testing and envs.

- **Check**
  - CLI: `stripe trigger checkout.session.completed` (payment, subscription).
  - DB: single row on retries; UI gates reflect state.
  - Logs: event type, user, branch taken.

# How I’ll Use This Going Forward

- I’ll start each task with the IDATIC template.
- I’ll maintain a live, ordered task list and mark completion as we progress.
- I’ll propose precise patches and testing steps per phase.

# Status

- IDATIC workflow aligned and ready to apply across your features. If you want, I can immediately spin up an IDATIC plan for your next task (e.g., one-time entitlements schema and webhook fulfillment).