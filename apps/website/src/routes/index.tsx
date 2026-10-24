import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { DocMarkdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { getButterMetaServerFn } from "@/server/butter-meta";

const SPEC_DOCUMENT_MARKDOWN = `
# Butter Auth — Architectural Reference Specification

Butter is an **agent-first, distributed auth architecture**. Rather than installing a monolithic npm package with black-box internals and runtime schema diffing, you use an AI coding agent to copy pure auth primitives, strict invariants, and atomic SQL contracts directly into your own codebase.

Inspired by [Pilcrow's Auth Book](https://auth.pilcrowonpaper.com) and powered by [Effect v4](https://effect.website), Butter stops at **Flows**: pure functional business logic returning typed Effects, entirely decoupled from your HTTP routing framework.

---

## Table of Contents

1. [Architectural Philosophy](#philosophy)
2. [Butter vs. Better Auth](#vs-better-auth)
3. [The Core Invariants](#invariants)
4. [Slice Architecture & SQL Contracts](#slices)
5. [Effect v4 Reference Implementation](#code)
6. [Honest Trade-offs](#trade-offs)
7. [Agent Skill Quickstart](#quickstart)

---

<h2 id="philosophy">1. Architectural Philosophy</h2>

Most authentication libraries suffer from the **Framework Trap**: they start as clean primitives, but gradually accumulate HTTP adapters, ORM abstractions, polymorphic schema generators, and plugin hooks until they become impossible to audit or customize.

Butter rejects the library-as-dependency model for core authentication:

- **Distributed Code, Not an npm Package**: You own the code. If your business requires biometric step-up authentication or strict multi-tenant session isolation, you modify the files in your repo without waiting for upstream PR merges.
- **Stops at Flows**: A Butter "slice" does not expose HTTP endpoints. It exposes pure functions that take inputs, interact with a typed Port (Store/Hasher/Notifier), and return an \`Effect.Effect<Success, Failure, Requirements>\`.
- **Atomic SQL Contracts**: Auth state transitions (such as consuming a verification code or claiming an invite) belong in single, atomic SQL statements—never in read-modify-write application loops susceptible to race conditions.
- **Invariants Over Plugins**: Instead of monkey-patching behavior with runtime lifecycle hooks, Butter defines static invariants validated at compile-time and guaranteed by database constraints.

---

<h2 id="vs-better-auth">2. Butter vs. Better Auth</h2>

| Dimension | Butter Auth | Better Auth |
| :--- | :--- | :--- |
| **Distribution Model** | Copy-paste code and agent skills you own in repo | npm package runtime dependency |
| **Database Schema** | Dedicated, non-nullable tables per credential type | Shared polymorphic \`accounts\` table with nullable fields |
| **Execution Boundary** | Pure Flows returning typed Effects | Full-stack HTTP route handlers and middleware |
| **Concurrency Guarantees** | Atomic SQL statements (single-shot CTEs) | ORM read-modify-write operations |
| **Extensibility** | Direct source modification via AI agent | Plugin lifecycle hooks and schema diff patches |
| **Runtime Dependencies** | Effect v4 (pure TypeScript) | Framework-specific adapters & database drivers |

### The Polymorphic Account Anti-Pattern

Better Auth combines OAuth tokens, password hashes, and passkey credentials into a single polymorphic \`account\` table. This results in wide tables with dozens of nullable columns, leaky invariants, and impossible-to-enforce database-level foreign key checks.

Butter uses **isolated credential tables**:
- \`password_credentials\` has only \`user_id\` and \`password_hash\`.
- \`oauth_accounts\` has only \`user_id\`, \`provider_id\`, and \`provider_user_id\`.
- \`passkey_credentials\` has only \`user_id\`, \`credential_id\`, and \`public_key\`.

Each table enforces its own relational integrity, unique constraints, and cascade deletion semantics directly in your database engine.

---

<h2 id="invariants">3. The Core Invariants</h2>

Every auth flow in Butter is bounded by inviolable architectural invariants:

1. **Atomic Consumption**: Verification codes, password reset tokens, and action sessions are consumed in a single atomic SQL transaction. If the state was already consumed or expired, zero rows update and the operation fails immediately.
2. **Timing-Attack Resistance**: Password verification and credential checks perform constant-work dummy hashing when a user is not found, mitigating timing enumeration attacks.
3. **Strict Credential Separation**: No polymorphic tables. Every credential model has an independent primary key, unique constraint, and dedicated store port.
4. **OWASP Argon2id Memory Tuning**: Passwords use memory-hard hashing (\`m=19456, t=2, p=1\`) resistant to GPU/ASIC cracking.
5. **Deterministic Error Signatures**: Flows never throw exceptions or return ambiguous string codes. Failures are represented as tagged union errors modeled with Effect Schema.
6. **No Blind Sessions**: Sessions are stateful, revocable, and tied to explicit device/agent identifiers stored with creation and last-accessed timestamps.

---

<h2 id="slices">4. Slice Architecture & SQL Contracts</h2>

Butter breaks authentication into self-contained **Slices**. Each slice consists of:
- **Model**: Typed data shapes and error unions.
- **Ports**: Context tags defining repository interfaces.
- **Flows**: Pure Effect workflows executing business logic.
- **SQL Contract**: Canonical PostgreSQL / SQLite schema definitions.

### Slices Overview

#### \`email-password\`
- **Invariants**: OWASP Argon2id hashing, timing attack resistance, no email enumeration during sign-in.
- **Port**: \`PasswordCredentialStore (savePassword, findPasswordByUserId)\`.
- **SQL Contract**:
\`\`\`sql
CREATE TABLE password_credentials (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
\`\`\`

#### \`email-verification\`
- **Invariants**: 15-minute expiration, single-use numeric or alphanumeric codes, atomic consumption.
- **Port**: \`EmailVerificationStore (issueCode, consumeCode)\`.
- **SQL Contract**:
\`\`\`sql
CREATE TABLE email_verification_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
\`\`\`

#### \`action-sessions\`
- **Invariants**: Short-lived (5 min) single-use tokens scoped to one sensitive action (e.g. billing update, email change), issued only after fresh password/MFA re-authentication.
- **Port**: \`ActionSessionStore (issueToken, consumeToken)\`.
- **SQL Contract**:
\`\`\`sql
CREATE TABLE action_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
\`\`\`

---

<h2 id="code">5. Effect v4 Reference Implementation</h2>

Below is a complete, production-grade Butter verification flow implemented with **Effect v4**. Notice how dependencies are declared via Context, errors are strictly typed, and SQL execution is atomic.

### The Verification Flow

\`\`\`ts
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

// 1. Tagged Errors
export class CodeExpiredError extends Schema.TaggedError<CodeExpiredError>()(
  "CodeExpiredError",
  { codeId: Schema.String },
) {}

export class CodeInvalidError extends Schema.TaggedError<CodeInvalidError>()(
  "CodeInvalidError",
  { codeId: Schema.String },
) {}

// 2. Port Tag (Interface)
export interface EmailVerificationStore {
  readonly consumeCode: (options: {
    readonly codeId: string;
    readonly codeHash: string;
  }) => Effect.Effect<
    { readonly userId: string },
    CodeExpiredError | CodeInvalidError
  >;
}

export const EmailVerificationStore =
  Context.GenericTag<EmailVerificationStore>(
    "@butter/EmailVerificationStore",
  );

// 3. Pure Business Flow
export const verifyEmailFlow = (input: {
  readonly codeId: string;
  readonly candidateCode: string;
}) =>
  Effect.gen(function* () {
    const store = yield* EmailVerificationStore;
    const candidateHash = yield* hashVerificationCode(input.candidateCode);

    // Atomically consumes code in a single SQL statement
    const record = yield* store.consumeCode({
      codeId: input.codeId,
      codeHash: candidateHash,
    });

    return {
      success: true,
      userId: record.userId,
    } as const;
  });
\`\`\`

### Atomic SQL Port Implementation

In your database adapter, you execute a single atomic Postgres statement:

\`\`\`sql
-- Single-shot atomic code consumption: guarantees no double-spending
WITH target AS (
  SELECT id, user_id
  FROM email_verification_codes
  WHERE id = $1
    AND code_hash = $2
    AND expires_at > NOW()
  FOR UPDATE
)
DELETE FROM email_verification_codes
WHERE id IN (SELECT id FROM target)
RETURNING user_id;
\`\`\`

---

<h2 id="trade-offs">6. Honest Trade-offs</h2>

Butter is deliberately not for everyone:

- **More Initial Boilerplate**: You have 10-20 files of auth logic in your own repository instead of \`npm install better-auth\`.
- **No Pre-Packaged UI**: Butter provides zero React or Svelte UI widgets. You build your login form using your own design system (such as shadcn/ui).
- **Requires System Understanding**: Because you own the database contracts and Effect pipelines, developers must understand relational transactions and basic Effect composition.

**When Butter is the right choice**:
- You are tired of breaking changes in third-party auth packages.
- You have custom compliance, audit logging, or multi-tenant database requirements.
- You want an AI coding agent to be able to inspect, maintain, and adapt your auth logic directly.

---

<h2 id="quickstart">7. Agent Skill Quickstart</h2>

To install Butter into an existing project, tell your AI coding agent (Antigravity, Cursor, Claude Code, or Codex):

\`\`\`shell
# Add the butter auth skill to your agent configuration
pnpm add -D @butter/skills
\`\`\`

Then instruct your agent:

> *"Inspect my database configuration and use Butter to scaffold the \`email-password\` and \`action-sessions\` slices using Effect v4 and Postgres atomic statements."*

Your agent will inspect your existing schema, generate the migration file, create the store adapters, and wire the flows directly into your app.
`;

const HomePage = () => {
  const meta = useLoaderData({ from: "/" });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Minimal Reference Preamble */}
      <header className="border-border/60 mb-10 border-b pb-8">
        <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono">DOC-ID: BUTTER-SPEC-001</span>
          <span>•</span>
          <span>Status: Public Reference (v{meta.version})</span>
          <span>•</span>
          <span>Updated: Oct 2026</span>
        </div>

        <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
          Butter Auth Specification
        </h1>

        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          An agent-first, distributed authentication architecture. Pure
          primitives, atomic SQL contracts, and security invariants you own in
          your repo.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Effect v4</Badge>
          <Badge variant="outline">Pilcrow Auth Book</Badge>
          <Badge variant="outline">Atomic SQL</Badge>
          <Badge variant="outline">Agent First</Badge>
        </div>
      </header>

      {/* Document Body with shadcn typeset styling and TanStack Markdown + Highlight */}
      <article className="typeset typeset-docs">
        <DocMarkdown>{SPEC_DOCUMENT_MARKDOWN}</DocMarkdown>
      </article>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => await getButterMetaServerFn(),
});
