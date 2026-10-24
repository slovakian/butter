import {
  Link,
  createFileRoute,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getButterMetaServerFn } from "@/server/butter-meta";

const tabEnum = z.enum([
  "overview",
  "comparison",
  "strengths-weaknesses",
  "code",
]);

type TabValue = z.infer<typeof tabEnum>;

const searchSchema = z.object({
  tab: tabEnum.optional().default("overview"),
});

const HomePage = () => {
  const meta = useLoaderData({ from: "/" });
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const activeTab: TabValue = search.tab ?? "overview";

  const handleTabChange = (value: string) => {
    const parsed = tabEnum.safeParse(value);

    if (parsed.success) {
      void navigate({
        search: {
          tab: parsed.data,
        },
      });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 py-12 text-center sm:py-20">
        <div className="flex items-center gap-2">
          <Badge
            className="border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs text-amber-300"
            variant="outline"
          >
            🧈 Agent-First Distributed Auth
          </Badge>
          <Badge className="text-xs" variant="secondary">
            v{meta.version}
          </Badge>
        </div>

        <h1 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
          Your Auth. In Your Repo. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Owned by You, Built by Your Agent.
          </span>
        </h1>

        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Butter distributes pure auth primitives and agent skills that you copy
          into and own in your own codebase. No black-box npm packages, no
          framework wrappers, and no polymorphic account tables.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            className="cursor-pointer bg-amber-400 font-semibold text-stone-950 shadow-lg shadow-amber-500/10 hover:bg-amber-300"
            onClick={() => {
              handleTabChange("comparison");
            }}
            size="lg"
          >
            Why Not Better Auth?
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              handleTabChange("code");
            }}
            size="lg"
            variant="outline"
          >
            See Effect Code
          </Button>
          <Link to="/slices">
            <Button className="cursor-pointer" size="lg" variant="ghost">
              Explore Slices →
            </Button>
          </Link>
        </div>

        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 pt-8 text-left sm:grid-cols-3">
          <div className="border-border/50 bg-card/40 rounded-2xl border p-4">
            <div className="text-muted-foreground text-xs font-medium">
              Foundational Reference
            </div>
            <div className="text-foreground mt-1 text-sm font-semibold">
              Pilcrow&apos;s Auth Book
            </div>
          </div>
          <div className="border-border/50 bg-card/40 rounded-2xl border p-4">
            <div className="text-muted-foreground text-xs font-medium">
              Engine & Types
            </div>
            <div className="text-foreground mt-1 text-sm font-semibold">
              Effect v4 + Schema
            </div>
          </div>
          <div className="border-border/50 bg-card/40 col-span-2 rounded-2xl border p-4 sm:col-span-1">
            <div className="text-muted-foreground text-xs font-medium">
              Data Contract
            </div>
            <div className="text-foreground mt-1 text-sm font-semibold">
              Atomic Canonical SQL
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs */}
      <section className="mt-8">
        <Tabs
          className="w-full"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          <div className="mb-8 flex justify-center overflow-x-auto pb-2">
            <TabsList className="border-border/50 bg-card/70 rounded-full border p-1 shadow-inner">
              <TabsTrigger
                className="cursor-pointer px-5 py-2 text-sm"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer px-5 py-2 text-sm"
                value="comparison"
              >
                vs Better Auth
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer px-5 py-2 text-sm"
                value="strengths-weaknesses"
              >
                Strengths & Weaknesses
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer px-5 py-2 text-sm"
                value="code"
              >
                Effect Examples
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: OVERVIEW */}
          <TabsContent className="space-y-8" value="overview">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <div className="mb-2 text-2xl">📦</div>
                  <CardTitle className="text-xl">
                    Distributed Code, Not a Package
                  </CardTitle>
                  <CardDescription>
                    You will never run{" "}
                    <code className="bg-muted text-foreground rounded px-1.5 py-0.5">
                      npm install butter
                    </code>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  Butter ships Primitives and Flows directly into your
                  repository through a dynamic shadcn registry. Your coding
                  agent writes and maintains the stack-specific Adapters, guided
                  by Butter&apos;s Skills and a Manifest tailored to your
                  application.
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <div className="mb-2 text-2xl">📖</div>
                  <CardTitle className="text-xl">
                    Pilcrow&apos;s Auth Book Guidance
                  </CardTitle>
                  <CardDescription>
                    Grounded in the premier industry standard for web
                    authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  Database-backed sessions (
                  <code className="bg-muted text-foreground rounded px-1 py-0.5">
                    id.secret
                  </code>{" "}
                  with 32-byte constant-time secrets), Action Sessions for
                  single-use high-risk operations, CSRF origin verification, and
                  Argon2 password hashing form Butter&apos;s defaults.
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <div className="mb-2 text-2xl">🤖</div>
                  <CardTitle className="text-xl">
                    Agent-First Reconcile Loop
                  </CardTitle>
                  <CardDescription>
                    Built specifically for AI pair programmers like Cursor,
                    Claude, and Codex.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  Setup, adding a slice, and modifying your stack are all the
                  same operation: update{" "}
                  <code className="bg-muted text-foreground rounded px-1 py-0.5">
                    butter.json
                  </code>{" "}
                  and Reconcile. Each Setup Task has an objective Acceptance
                  Check, typically passing Invariant tests.
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <div className="mb-2 text-2xl">🛡️</div>
                  <CardTitle className="text-xl">
                    Invariants, Not Diff Patches
                  </CardTitle>
                  <CardDescription>
                    Security properties stated in plain language and checked by
                    tests.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  Because installed code diverges from upstream through
                  customizations and renames, Butter never ships code diffs.
                  Security fixes ship as <strong>Advisories</strong>: new or
                  updated Invariant tests that your agent adapts your code to
                  pass.
                </CardContent>
              </Card>
            </div>

            {/* Slices Preview */}
            <div className="border-border/60 bg-card/30 rounded-3xl border p-6 sm:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold">Installed Slices</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Units of auth functionality rendered dynamically for your
                    stack.
                  </p>
                </div>
                <Link to="/slices">
                  <Button size="sm" variant="outline">
                    View All {meta.slices.length} Slices →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {meta.slices.slice(0, 3).map((slice) => (
                  <div
                    className="border-border/40 bg-background/50 flex flex-col justify-between rounded-2xl border p-4"
                    key={slice.id}
                  >
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-foreground text-sm font-semibold">
                          {slice.name}
                        </span>
                        <Badge className="text-[10px]" variant="secondary">
                          {slice.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {slice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: VS BETTER AUTH */}
          <TabsContent className="space-y-8" value="comparison">
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Why Butter is Different from Better Auth
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Better Auth is a fantastic library. But Butter deliberately
                departs from its library shape to give you total control.
              </p>
            </div>

            <div className="border-border/60 bg-card/40 overflow-x-auto rounded-3xl border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-border/60 bg-card/60 border-b">
                    <th className="text-foreground w-1/4 p-4 font-semibold sm:p-5">
                      Dimension
                    </th>
                    <th className="text-muted-foreground w-3/8 p-4 font-semibold sm:p-5">
                      Better Auth
                    </th>
                    <th className="w-3/8 p-4 font-semibold text-amber-300 sm:p-5">
                      Butter Auth 🧈
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border/40 divide-y">
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Distribution
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      npm package dependency (
                      <code className="text-xs">better-auth</code>)
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Distributed code via dynamic shadcn registry + agent
                      skills (<code className="text-xs">skills.sh</code>)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Data Model
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      Single shared polymorphic{" "}
                      <code className="text-xs">account</code> table across all
                      providers
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Each Slice owns its own Stores & tables. No polymorphic
                      account coupling (ADR-0004)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Scope & HTTP
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      Ships HTTP routers, endpoint handlers, client libraries,
                      and React components
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Stops at Flows (ADR-0003). No HTTP layer, no UI. You
                      choose your exposure (Effect RPC, oRPC, Server Functions,
                      Hono)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Domain Naming
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      Fixed vocabulary (<code className="text-xs">user</code>,{" "}
                      <code className="text-xs">session</code>) baked into
                      schema and runtime
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Fully renamable (ADR-0001). Rename user to{" "}
                      <code className="text-xs">member</code> or{" "}
                      <code className="text-xs">customer</code> everywhere: DB,
                      types, API
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Security Fixes
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      npm version upgrades and package patches (overwrites
                      customizations)
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Advisories as Invariant tests. Your agent adapts your
                      customized code to pass the tests
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Data Layer
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      CRUD-style ORM adapter layer (
                      <code className="text-xs">find</code> +{" "}
                      <code className="text-xs">delete</code>), prone to
                      concurrency races
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      Canonical SQL data contract (ADR-0002). Atomic Postgres
                      statements prevent races
                    </td>
                  </tr>
                  <tr>
                    <td className="text-foreground p-4 font-medium sm:p-5">
                      Engine
                    </td>
                    <td className="text-muted-foreground p-4 sm:p-5">
                      Standard JavaScript Promises and exceptions
                    </td>
                    <td className="text-foreground bg-amber-400/5 p-4 font-medium sm:p-5">
                      <strong>Effect v4</strong>: typed errors, Schema Port
                      boundaries, services, with Promise facade for non-Effect
                      apps
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border-border/50 bg-card/30 rounded-3xl border p-6">
                <h4 className="text-foreground mb-2 text-base font-semibold">
                  Why No Shared Account Table?
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  In libraries like Better Auth, every auth method (passwords,
                  OAuth, passkeys, magic links) must coerce its credentials into
                  a shared polymorphic{" "}
                  <code className="text-foreground text-xs">account</code>{" "}
                  table. In Butter, only User and Session are shared across
                  Slices. Each Slice owns its credentials directly.
                </p>
              </div>

              <div className="border-border/50 bg-card/30 rounded-3xl border p-6">
                <h4 className="text-foreground mb-2 text-base font-semibold">
                  Why Stop at Flows?
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Auth libraries frequently rot because they bundle HTTP
                  transport and UI wrappers that break when Next.js, Vite, or
                  React changes. Butter stops at pure Flows. Transport security
                  (CSRF origin checks, cookie serialization) is handled by pure
                  Primitives, leaving exposure entirely in your hands.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: STRENGTHS & WEAKNESSES */}
          <TabsContent className="space-y-8" value="strengths-weaknesses">
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Strengths & Trade-offs
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                We believe in architectural honesty. Butter is specifically
                designed for agent-assisted workflows and is not trying to be a
                one-size-fits-all library.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* STRENGTHS */}
              <div className="space-y-4">
                <div className="mb-2 flex items-center gap-2 text-lg font-bold text-emerald-400">
                  <span>✓</span>
                  <h3>Strengths</h3>
                </div>

                <Card className="border-emerald-500/20 bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Absolute Code Ownership
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Zero lock-in. No waiting on library maintainers to accept
                    PRs or add database drivers. All security-critical code
                    lives in your repository.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Designed for AI Coding Agents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Clear separation of Ports and Flows makes it straightforward
                    for LLMs to generate stack-specific adapters with exact
                    acceptance checks.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Atomic Concurrency Safety
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Store operations map to single atomic SQL statements (like
                    CTEs that check and consume verification tokens in one
                    shot), preventing race conditions.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Pilcrow-grade Security Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Constant-time token validation, separate Action Sessions for
                    destructive operations, timing-safe Argon2 hashing, and CSRF
                    origin verification out of the box.
                  </CardContent>
                </Card>
              </div>

              {/* WEAKNESSES */}
              <div className="space-y-4">
                <div className="mb-2 flex items-center gap-2 text-lg font-bold text-amber-400">
                  <span>⚠️</span>
                  <h3>Weaknesses & Non-Goals</h3>
                </div>

                <Card className="border-amber-500/20 bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Not a 1-Line Install for Humans
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    If you don&apos;t use an AI coding agent or prefer a quick
                    plug-and-play package with pre-built React login forms,
                    Butter will feel like too much manual work.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      You Own the Migrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Butter gives you canonical SQL, but you (or your agent) are
                    responsible for generating and executing migrations in
                    Prisma, Drizzle, or raw SQL.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      No Pre-styled UI Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Butter stops at Flows (ADR-0003). There are no pre-styled
                    modal dialogs, OAuth buttons, or form components shipped
                    with Butter.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-base">
                      Effect Learning Curve
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    Flows are written in Effect v4. While Butter supplies a
                    clean Promise facade for standard TypeScript projects,
                    understanding internal Flows requires familiarity with
                    Effect.
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: EFFECT CODE EXAMPLES */}
          <TabsContent className="space-y-8" value="code">
            <div className="mx-auto mb-6 max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Code with Effect
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Flows are pure Effect programs written against typed Ports,
                yielding zero uncaught exceptions and complete compile-time
                security.
              </p>
            </div>

            <div className="space-y-6">
              {/* CODE EXAMPLE 1 */}
              <div className="border-border/60 bg-card/40 overflow-hidden rounded-3xl border">
                <div className="border-border/40 bg-card/80 flex items-center justify-between border-b px-6 py-3">
                  <span className="font-mono text-xs font-medium text-amber-300">
                    packages/slices/sessions/src/flows/validate-session.ts
                  </span>
                  <Badge className="text-[10px]" variant="outline">
                    Flow in Effect
                  </Badge>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-zinc-300">
                  {`import * as Effect from "effect/Effect";
import * as DateTime from "effect/DateTime";
import { constantTimeEqual, sha256 } from "@oslojs/crypto/subtle";
import { SessionStore } from "../ports/session-store";
import { InvalidSessionError, SessionExpiredError } from "../errors";

/**
 * Validates a session token following Pilcrow's Auth Book:
 * Token is "id.secret". The secret is SHA-256 hashed and compared in constant time.
 * Sliding 30-day expiry is refreshed at most daily.
 */
export const validateSessionToken = (token: string) =>
  Effect.gen(function* () {
    const parts = token.split(".");
    if (parts.length !== 2) {
      return yield* Effect.fail(new InvalidSessionError({ reason: "MalformedToken" }));
    }

    const [sessionId, secret] = parts;
    const store = yield* SessionStore;
    const session = yield* store.findSessionById(sessionId);

    if (!session) {
      return yield* Effect.fail(new InvalidSessionError({ reason: "NotFound" }));
    }

    const secretHash = yield* Effect.promise(() => sha256(new TextEncoder().encode(secret)));
    const valid = constantTimeEqual(secretHash, session.secretHash);
    if (!valid) {
      return yield* Effect.fail(new InvalidSessionError({ reason: "SecretMismatch" }));
    }

    const now = yield* DateTime.now;
    if (DateTime.isLessThan(session.expiresAt, now)) {
      yield* store.deleteSession(sessionId);
      return yield* Effect.fail(new SessionExpiredError());
    }

    // Pilcrow recommendation: extend expiry only if within 15 days of expiration
    const refreshThreshold = DateTime.subtractDuration(session.expiresAt, { days: 15 });
    if (DateTime.isLessThan(refreshThreshold, now)) {
      const newExpiresAt = DateTime.addDuration(now, { days: 30 });
      yield* store.updateSessionExpiry(sessionId, newExpiresAt);
    }

    return session;
  });`}
                </pre>
              </div>

              {/* CODE EXAMPLE 2 */}
              <div className="border-border/60 bg-card/40 overflow-hidden rounded-3xl border">
                <div className="border-border/40 bg-card/80 flex items-center justify-between border-b px-6 py-3">
                  <span className="font-mono text-xs font-medium text-amber-300">
                    packages/slices/email-verification/src/ports/store.ts
                  </span>
                  <Badge className="text-[10px]" variant="outline">
                    Atomic SQL Data Contract
                  </Badge>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-zinc-300">
                  {`-- Canonical Postgres statement: consumes verification code atomically in one shot.
-- No race conditions between 'find' and 'delete'.
WITH consumed AS (
  DELETE FROM email_verification_codes
  WHERE user_id = $1
    AND code_hash = $2
    AND expires_at > NOW()
  RETURNING user_id, email
)
UPDATE users
SET email_verified = TRUE
FROM consumed
WHERE users.id = consumed.user_id
RETURNING users.id, users.email;`}
                </pre>
              </div>

              {/* CODE EXAMPLE 3 */}
              <div className="border-border/60 bg-card/40 overflow-hidden rounded-3xl border">
                <div className="border-border/40 bg-card/80 flex items-center justify-between border-b px-6 py-3">
                  <span className="font-mono text-xs font-medium text-amber-300">
                    src/auth/index.ts (Composition Root)
                  </span>
                  <Badge className="text-[10px]" variant="outline">
                    Composition Root
                  </Badge>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-zinc-300">
                  {`import * as Layer from "effect/Layer";
import { makeSessionsSlice } from "@butter/sessions";
import { makeEmailPasswordSlice } from "@butter/email-password";
import { DrizzleSessionAdapter } from "./adapters/drizzle-session";
import { DrizzleCredentialAdapter } from "./adapters/drizzle-credential";
import { db } from "../db";

// Assemble your custom auth system with typed Effect layers
export const AuthLive = Layer.mergeAll(
  makeSessionsSlice({
    cookieName: "butter_session",
    sessionDurationDays: 30,
  }).pipe(Layer.provide(DrizzleSessionAdapter(db))),

  makeEmailPasswordSlice().pipe(
    Layer.provide(DrizzleCredentialAdapter(db))
  )
);`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => await getButterMetaServerFn(),
  validateSearch: searchSchema,
});
