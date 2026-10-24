import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { DocMarkdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { getButterMetaServerFn } from "@/server/butter-meta";

const OVERVIEW_DOCUMENT_MARKDOWN = `
## What is Butter?

Butter is an **agent-first, distributed authentication architecture**. Rather than installing an all-in-one npm package with black-box internals, rigid database schemas, and framework lock-in, Butter provides security-critical auth primitives and business logic that you copy directly into your own codebase and own completely.

Guided by [Pilcrow's Auth Book](https://auth.pilcrowonpaper.com) and built with [Effect](https://effect.website), Butter stops at **Flows**—pure functional workflows returning typed Effects, completely decoupled from HTTP routing frameworks and UI libraries.

With coding agents now capable of generating and maintaining application code, you no longer need an auth dependency that attempts to abstract every database and framework under a single polymorphic model. Butter gives your agent the foundation it needs to build and maintain an auth system tailored directly to your application.

## How It Works

Butter structures authentication around a small set of clear, composable principles:

- **Slices, Not a Monolith**: Auth capabilities (such as sessions, email and password, verification codes, and OAuth) are divided into independent **Slices**. Each slice contains its own data shapes, repository interfaces (Ports), and pure business logic (Flows).
- **Pure Flows & Ports**: Flows contain pure business logic and never touch HTTP requests, response headers, or database drivers directly. They interact with typed Ports—Stores for data access and Strategies for configurable behaviors like session transport or rate limiting.
- **Atomic SQL Contracts**: Concurrency guarantees and security invariants are enforced directly at the database level. Critical state transitions—such as single-use token consumption or session rotation—execute as single, atomic SQL operations, eliminating race conditions.
- **Agent Guidance**: Instead of configuring plugins and lifecycle hooks, your AI coding agent uses Butter skills to scaffold migrations, wire Adapters for your specific ORM and database, and integrate the flows directly into your app.
- **Invariants & Advisories**: Every slice is governed by strict, plain-language security invariants backed by automated tests shipped into your repository. Security fixes arrive as updated invariant tests that your agent adapts your code to satisfy, preserving your customizations.

## Architecture at a Glance

In an installed Butter system, data flows cleanly from primitives to your application:

\`\`\`
Primitives  ──┐
Flows       ──┼──► Ports (Stores & Strategies) ◄── Adapters (User's Stack)
              │
              └──► Composition Root ──► Effect API / Application Handlers
\`\`\`

- **Primitives**: Low-level cryptographic and encoding helpers built on standard libraries (\`@oslojs/*\`, \`arctic\`).
- **Flows**: Pure business logic using Effect v4.
- **Ports**: Context interfaces defining what the flows need to read, write, or hash.
- **Adapters**: Concrete implementations of Ports written for your chosen database and ORM.
- **Composition Root**: A single user-owned file in your project assembling the slices and adapters into a cohesive \`Auth\` service.

## Project Status

Butter is currently in active design and initial development. This site serves as an architectural overview and starting point—comprehensive documentation, an interactive slice configurator, dynamic registry distribution, and agent setup skills are in progress.

In the meantime, explore the repository on [GitHub](https://github.com/slovakian/butter) or review [Pilcrow's Auth Book](https://auth.pilcrowonpaper.com) to understand the foundational principles Butter is built on.
`;

const HomePage = () => {
  const meta = useLoaderData({ from: "/" });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Styled Document Preamble */}
      <header className="border-border/60 mb-10 border-b pb-8">
        <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono">DOC-ID: BUTTER-OVERVIEW-001</span>
          <span>•</span>
          <span>Status: Architectural Overview (v{meta.version})</span>
          <span>•</span>
          <span>Updated: October 2026</span>
        </div>

        <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
          Butter Auth
        </h1>

        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          An agent-first, distributed authentication architecture. Pure
          primitives, atomic SQL contracts, and security invariants you own in
          your codebase.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Distributed Code</Badge>
          <Badge variant="outline">Pilcrow Auth Book</Badge>
          <Badge variant="outline">Effect v4</Badge>
          <Badge variant="outline">Atomic SQL</Badge>
        </div>
      </header>

      {/* Document Body with shadcn typeset styling and TanStack Markdown */}
      <article className="typeset typeset-docs">
        <DocMarkdown>{OVERVIEW_DOCUMENT_MARKDOWN}</DocMarkdown>
      </article>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => await getButterMetaServerFn(),
});
