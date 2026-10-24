# Butter Auth: Design

This document records what Butter is and what we are building. Vocabulary is defined in [GLOSSARY.md](../GLOSSARY.md); load-bearing decisions are recorded in [docs/adr](./adr).

## Guiding light: Pilcrow's Auth Book

[Pilcrow's Auth Book](https://auth.pilcrowonpaper.com/) is the reference Butter is built on. Its session model, Action Sessions, CSRF guidance, password hashing guidance, and ranking of Sign-in Methods are Butter's defaults, and every Butter Skill points agents to the relevant chapter before they change auth code. Where Butter departs from the book, an ADR says why.

Butter also borrows features and approaches from [Better Auth](https://github.com/better-auth/better-auth), but deliberately not its shape (see "Why not a library" below).

## What Butter is

Butter is **distributed code plus agent guidance**, not a package. Users copy the security-critical parts of an auth system into their own repo and own them from then on. Their coding agent writes the stack-specific parts, guided by Butter's Skills and a Setup Prompt tailored to their stack. Tests prove the result is correct.

### Why not a library

Libraries like Better Auth keep one internal model of auth: a fixed set of building blocks (`user`, `session`, `account`, `verification`) wired together one way, extended through a plugin system. That model is excellent, but it is rigid: users wait for the library to support what they need, and every Sign-in Method must bend to one shared shape.

With coding agents, users can own and shape their auth system directly. Butter supplies the parts that must be right (Primitives, Flows, Invariants) and lets the user's agent build everything specific to their app, with no single model to fit into.

## What Butter ships

- **Slices**, distributed through a dynamic [shadcn registry](https://ui.shadcn.com/docs/registry) and rendered with the user's Rename Map. Each Slice contains:
  - Primitives, built on [`@oslojs/*`](https://oslojs.dev) and [`arctic`](https://arcticjs.dev)
  - Flows written in [Effect](https://effect.website) v4, against Ports
  - canonical Postgres SQL: one atomic statement per Store operation
  - Flow and Exposure Invariant tests (Vitest + PGlite)
- **Four Skills**, distributed through [skills.sh](https://skills.sh):
  - `butter-setup`: interview, Manifest, Reconcile, Setup Tasks, Task Views
  - `butter-customize`: Exposure, custom Strategies, renames, fused Store operations, removing Effect
  - `butter-fix`: applying Advisories
  - `butter-principles`: Pilcrow pointers and thinking in Invariants (linked from the other three)

  Stack-specific guidance (each ORM, each Exposure style) lives in reference files inside these Skills, so supporting a new stack means adding a file, not a Skill.

- **The website** (TanStack Start, deployed with Alchemy v4): the Configurator, the dynamic registry, the Advisory feed, and the docs.

## What Butter never ships

- An npm package of our own. Slices depend on `@oslojs/*` and `arctic` directly.
- An HTTP layer or UI of any kind ([ADR-0003](./adr/0003-butter-stops-at-flows.md)).
- Per-ORM adapter code ([ADR-0002](./adr/0002-canonical-sql-is-the-data-contract.md)).
- A shared "account" model ([ADR-0004](./adr/0004-each-slice-owns-its-ports.md)).

## Shape of an installed auth system

```
Primitives ─┐
Flows ──────┼─► Ports ◄── Adapters (user's stack, agent-written or reference)
            │   (Stores + Strategies)
            └─► Composition Root ─► Effect API (+ Promise facade for non-Effect apps)
```

- **Flows** depend only on **Ports**. A **Store** says where data lives; a **Strategy** says how a behavior works where reasonable systems differ (session transport, session storage vs JWT, OAuth linking, rate limiting).
- Store operations are **operation-shaped and atomic** (e.g. "consume this verification code"), never CRUD pairs, so each maps to one SQL statement and concurrency Invariants can be tested.
- **Adapters** fulfil Ports for the user's stack. The **Schema Owner** (Prisma 8, Drizzle, or plain SQL migrations) and the **Query Layer** (Reylo by default, the ORM's raw SQL, or the ORM's query API) are independent choices. Rows are decoded with Effect Schema at the Port boundary.
- The **Composition Root** is one user-owned file where Slices, Adapters, Strategies, and config are assembled into a single `Auth` service (`auth.session.revoke(...)`). The Configurator generates it on first install; later Slices are wired in with a one-line edit.
- Only **User** and **Session** are shared across Slices. Every other record (Password Credential, Provider Identity, and later passkeys, TOTP) is owned by its Slice. The canonical SQL uses a table per Sign-in Method; Pilcrow-style columns on the user table are an equally valid Adapter layout.
- **Exposure** (Effect RPC, oRPC, Next.js routes or actions, TanStack Start server functions or routes, Hono, ...) is entirely the user's choice. Butter ships framework-free transport Primitives (origin verification, session cookie serialization) and Exposure Invariant tests that reach the user's Exposure through an agent-written Exposure Driver.

### Data: Schema Owner × Query Layer

| Setup | Schema Owner | Query Layer |
| --- | --- | --- |
| Reylo alone | plain SQL migrations (dbmate, Atlas, hand-written) | Reylo |
| Reylo + ORM | Drizzle or Prisma 8 | Reylo |
| ORM only | Drizzle or Prisma 8 | ORM raw SQL, or ORM query API |

Reylo is the default Query Layer and never required. Choosing it brings its requirements (TypeScript 7.1 `contentMappers`, a live dev database at typecheck time, a runtime loader or bundler plugin), and the Configurator says so. Drizzle + Reylo can share a client and transactions. Prisma 8 + Reylo runs on a separate `pg` pool and cannot share transactions with app Prisma code unless Prisma 8 exposes its driver.

### Naming

Users own their vocabulary ([ADR-0001](./adr/0001-full-renames-and-invariant-based-fixes.md)). Every Domain Concept (user, session, and others) can be renamed everywhere: storage, identifiers, API, copy. Protocol Vocabulary (OAuth `state`, PKCE `code_verifier`, WebAuthn terms) stays on spec.

## Setup

1. The user builds a **Manifest** (`butter.json`), either in the **Configurator** on the website or by running `/setup-butter`, where their agent interviews them. Both produce the same Manifest.
2. The **Setup Prompt** is a short parameter block that tells the agent to install Butter's Skills and run `butter-setup` with the user's choices.
3. **Reconcile** works out the remaining **Setup Tasks** by comparing the Manifest with the repo. Each task has an **Acceptance Check**, usually passing Invariant tests or a succeeding command.
4. The agent builds the dynamic registry URL from the Manifest and runs `shadcn add`, then works through the tasks: Schema Owner setup, migrations, Adapters, Composition Root, Exposure, Exposure Driver.

The Manifest (including every non-secret answer the user gave) and the committed code are the only durable state, so Reconcile can be re-run anywhere: locally, in a transient cloud VM, or by a different agent. Task lists are optional **Task Views** kept wherever the user chooses (a gitignored file by default, a GitHub issue, Linear, or anything their agent can reach). In transient environments the agent commits after each task whose check passes. Secrets never go in the Manifest; it records only which ones are required.

Adding a Slice later, or changing a choice, is the same operation: change the Manifest and Reconcile.

## Security model

- Every Flow and Exposure has **Invariants**: security properties stated in plain language and checked by tests shipped into the user's repo. The same test files make up Butter's own suite, run against our reference Adapters.
- Installed code will diverge from upstream (through renames and ordinary edits), so security fixes ship as **Advisories**: a new or changed Invariant plus its tests, never a diff. The user's agent changes their code until the tests pass.
- The Manifest records each Slice's Invariant version. `butter-fix`, Reconcile, and an optional scheduled CI check (a copied script, not a package) compare it against the Advisory feed. Advisories are also published as GitHub Security Advisories.
- Agents never edit Butter's shipped Invariant tests, only the code under test.

## v1 scope

- **Sessions**, following Pilcrow: database-backed by default; token is `id.secret` with a 32-byte random secret stored only as a SHA-256 hash and compared in constant time; sliding 30-day expiry refreshed at most daily; rotated on sign-in; server-side sign-out for this device or all devices. JWT sessions are only available as a custom Strategy.
- **Action Sessions**: short-lived, single-use, bound to one User and one sensitive action, created only after fresh verification.
- **CSRF** protection via origin verification.
- **Email and password** sign-up and sign-in (Argon2).
- **Email verification** and **password reset**.
- **OAuth**: generic, plus GitHub and Google. A Provider Identity is never attached to an existing User through an unverified email on either side; manual linking requires a fresh Action Session. A stricter never-auto-link Strategy is available.
- **Rate limiting** as a Strategy the password and verification Flows depend on, with state in Postgres by default.
- **Email sending** as a Port the user's agent fulfils for their provider.

All numbers above are config defaults, not hard-coded.

Not in v1: passkeys, email-code sign-in, TOTP, organizations.

## Verifying Butter itself

- **CI (every push, deterministic):** unit tests, Invariant tests against reference Adapters on PGlite, typecheck, and registry rendering with Rename Maps.
- **Agent Evals (local, on demand):** the eval harness drives an existing coding agent CLI (`claude -p`, `codex exec`, `cursor-agent -p`) on the developer's own plan. Each run gives an agent a **Fixture** (a small app for one stack combination, with a pre-filled Manifest) in a fresh worktree or container. A separate **Grader**, out of the agent's reach, restores Butter's original Invariant tests, then runs them, the typecheck, and a black-box smoke flow (sign up, verify, sign in, sign out) through the Fixture's Exposure. A sample of the matrix runs before Slice or Skill changes ship; the full matrix runs before releases. A simulated-user agent for testing the interview comes later.

## Open facts to verify during implementation

- Whether Effect 4.0 has an official stable release.
- Whether Prisma 8 exposes its underlying driver, so Reylo can share its transactions.
- Whether PGlite can serve as Reylo's dev database for typechecking in CI.
