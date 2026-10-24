# Lessons from Lucia for Butter Auth

Researched 2026-10-24 against primary sources only: the authors' GitHub discussions, commits, PRs, READMEs and advisories, the npm registry, the authors' own docs sites and blog. Any claim not verified against a primary source is marked **unverified**. Where I infer something from primary data and the source does not say it outright, I mark it **inference**.

## Answer

- **Why Lucia stopped being a library.** Pilcrow (Lucia's author) said it was "not working" and that he no longer used it himself. His main stated reason was database adapters. At first he framed them as a "complexity tax" and a maintenance burden: drivers were pre-1.0 and their types were unstable. Later he said the bigger problem was that adapters "limit the API" and felt like "a black box". Without adapters, the library did too little to be worth a dependency ([#1707](https://github.com/lucia-auth/lucia/discussions/1707), 2024-10-07; [#1714](https://github.com/lucia-auth/lucia/discussions/1714), 2024-10-20).
- **Framework churn came first.** Lucia 3.0 had already removed framework middleware, because "maintaining APIs for numerous frameworks across multiple major versions wasn't a viable option" ([#1361](https://github.com/lucia-auth/lucia/discussions/1361), 2024-01-27). In 2025 the copy-paste resource itself also dropped its per-database and per-framework guides ([#1790](https://github.com/lucia-auth/lucia/discussions/1790), 2025-04-26; [PR #1801](https://github.com/lucia-auth/lucia/pull/1801), 2025-06-08).
- **Timeline.**
  - Last release: `lucia` 3.2.2 on 2024-10-20.
  - Deprecation announced 2024-10-20, effective "March 2025".
  - The npm deprecation flag was most likely applied on 2025-06-06 (inference from registry timestamps).
  - lucia-auth.com became a learning resource. Since 2026-07-29 it holds only a single replacement file, `code/auth_session.ts`.
- **How fixes reach people who copied code.** Pilcrow never addressed this. A user asked directly on 2024-10-28 and got no answer from him. In practice, later fixes to the copied code went out as silent documentation edits, with no advisory or notice:
  - a broken token bucket
  - an inactivity-timeout bug where seconds and milliseconds were mixed up
  - a session-token redesign "more secure and patches out a very impractical timing attack"

  The lucia, arctic and shadcn-ui repos have 0 published security advisories.
- **Surprising, and it affects Butter directly.** On **2026-07-29**, Pilcrow deprecated **Arctic** and every **`@oslojs/*`** package except `@oslojs/encoding` ([blog/18](https://pilcrowonpaper.com/blog/18)). He also archived the Copenhagen Book (2026-06-03) in favour of the Auth Book. Butter's design says "Slices depend on `@oslojs/*` and `arctic` directly" ([docs/design.md](../design.md)). That dependency is now on deprecated packages.
- **The survey.**
  - shadcn has no versions, no record of what is installed, and no advisories. Its v4 update story is `add --diff` plus "ask your agent … merge with my local changes". The standalone `diff` command was deprecated on 2026-03-05.
  - The Better Auth CLI copies only schema into the user's repo. Its fixes ship as npm releases with GitHub Security Advisories: 37 published as of 2026-10-24.
  - GitHub's Dependabot alerts only fire for GitHub-reviewed advisories matched to package dependencies. A GitHub Security Advisory about copied Butter code will therefore not notify anyone through Dependabot on its own (inference from GitHub docs).

---

## 1. Lucia

### 1.1 Timeline

| Date | Event | Source |
| --- | --- | --- |
| 2022-10-17 | When Lucia was a package, a critical session-expiry bug was handled with an npm version deprecation, a patch release and a discussion post ("UPDATE TO V0.10.3 OR VERSION 12"). | [Discussion #148](https://github.com/lucia-auth/lucia/discussions/148) |
| 2024-01-27 | Lucia 3.0 released. Keys removed. OAuth moved to Arctic. Built on Oslo. **Framework-specific middleware removed.** Database adapters stayed, as separate `@lucia-auth/adapter-*` packages. | [Discussion #1361](https://github.com/lucia-auth/lucia/discussions/1361); npm `lucia` 3.0.0 time `2024-01-27T13:33:03Z` ([registry](https://registry.npmjs.org/lucia)) |
| 2024-07-19 | npm dist-tag `experimental-remove-adapter-package` (`0.0.0-remove-adapter-package.20240719033400`) published. Inference: an attempt to drop the adapter packages before the deprecation decision. | [npm registry `lucia`](https://registry.npmjs.org/lucia) |
| 2024-10-07 | "Future plans": "I am planning to deprecate the library early next year." `lucia` 3.2.1 published the same day. | [#1707](https://github.com/lucia-auth/lucia/discussions/1707); registry |
| 2024-10-20 | "A fresh start": "It's official - I'll be deprecating Lucia v3 by March 2025." The package gets bug fixes until March. Adapters "will all be deprecated by the end of 2024". v3 docs move to v3.lucia-auth.com. Same day: **`lucia` 3.2.2, the last release** ("Fix cookie expiration"). | [#1714](https://github.com/lucia-auth/lucia/discussions/1714); [CHANGELOG in 3.2.2 tarball](https://unpkg.com/lucia@3.2.2/CHANGELOG.md) |
| March 2025 | Deprecation date as stated today: "Lucia was deprecated on March 2025." | [README](https://github.com/lucia-auth/lucia/blob/main/README) (commit `c3c9f7e`, 2026-07-29) |
| 2025-04-26 | "Pushing the project forward": a single Node framework for all tutorials. "No more tutorials or examples for Next.js." | [#1790](https://github.com/lucia-auth/lucia/discussions/1790) |
| 2025-06-06 | Migration guide moved to `/lucia-v3/migrate` and given a "Background" section on the deprecation. The npm `modified` timestamps for `lucia` and `@lucia-auth/adapter-*` all fall between 16:55 and 16:58 UTC that day. All carry the message "This package has been deprecated. Please see https://lucia-auth.com/lucia-v3/migrate." Inference: this is when `npm deprecate` was run. | [PR #1799](https://github.com/lucia-auth/lucia/pull/1799), [PR #1800](https://github.com/lucia-auth/lucia/pull/1800); [registry `lucia`](https://registry.npmjs.org/lucia), [`@lucia-auth/adapter-drizzle`](https://registry.npmjs.org/@lucia-auth%2Fadapter-drizzle) |
| 2025-06-08 | Sessions guide overhauled. ORM/database-specific guides (Drizzle, MySQL, PostgreSQL, Prisma, Redis, SQLite) and framework cookie guides (Astro, Next.js, SvelteKit) removed. Session API changed to "use secrets for verification". | [PR #1801](https://github.com/lucia-auth/lucia/pull/1801), [PR #1802](https://github.com/lucia-auth/lucia/pull/1802) |
| 2026-06-03 | Copenhagen Book archived: "replaced by auth.pilcrowonpaper.com". | [copenhagen README](https://github.com/pilcrowonpaper/copenhagen) (repo `archived: true`) |
| 2026-07-29 | Blog post "I am deprecating most of my open-source NPM packages". Arctic deprecated. All Oslo packages except `@oslojs/encoding` deprecated. lucia-auth.com cut down to "what's necessary to replace the version 3" package. Example repos archived. Discord shutting down "by the end of the year". | [pilcrowonpaper.com/blog/18](https://pilcrowonpaper.com/blog/18) (dated 2026-07-29); lucia commits `3ead47e`…`c3c9f7e` (2026-07-29) |
| 2026-10-24 | **lucia-auth.com/lucia-v3/migrate, the URL in every npm deprecation message, returns 404.** v3.lucia-auth.com still returns 200. | HTTP check by me, 2026-10-24 |

**What lucia-auth.com became.**
- **Oct 2024 to Jul 2026:** a learning resource. "Instead of installing a package, you'll learn how to implement sessions from scratch" ([#1707](https://github.com/lucia-auth/lucia/discussions/1707)). "You'll essentially recreate Lucia v3 in your project … infinitely customizable" ([#1714](https://github.com/lucia-auth/lucia/discussions/1714)).
- **Since 2026-07-29:** a one-paragraph page. It points to [`code/auth_session.ts`](https://github.com/lucia-auth/lucia/blob/main/code/auth_session.ts), "a complete, single-file replacement for the NPM package", and to the [Auth Book](https://auth.pilcrowonpaper.com) ([site source](https://github.com/lucia-auth/lucia/blob/main/lucia-auth.com/index.html)).
- **About that file:**
  - It is licensed 0BSD and has **zero imports**: it uses Web Crypto and `Uint8Array.toBase64()`.
  - It stores the session as `id` + SHA-256 `secretHash`, compared in constant time.
  - It tells you in a comment to implement CSRF protection yourself.
  - Source: file header and body, commit `9fd317e`, 2026-07-29.

### 1.2 What the author said, by topic

**Adapter maintenance burden.** In v3, adapters were separate npm packages: `@lucia-auth/adapter-{prisma,drizzle,sqlite,postgresql,mongodb,…}` ([registry](https://registry.npmjs.org/@lucia-auth%2Fadapter-prisma)).
- [#1707](https://github.com/lucia-auth/lucia/discussions/1707) (2024-10-07): "Database adapters have been a significant complexity tax on the library. It doesn't help that we need them to support a flexible schema. The library is too low level and simple for the burden to be worthwhile. From a maintenance perspective, a lot of database drivers aren't 1.0 yet, and even if their runtime APIs were relatively stable, their types were not."
- [#1714](https://github.com/lucia-auth/lucia/discussions/1714) (2024-10-20) went further: "I think a lot of people interpreted that as maintenance burden on myself. That's not wrong, but the bigger issue is how the adapters limit the API. Adapters always felt like a black box to me as both an end user and a maintainer. It's very hard to design something clean around it and makes everything clunky and fragile, especially when you need to deal with TypeScript shenanigans."
- Author replies in #1707:
  - "I think the general idea of database adapters to be a flawed model, especially when you need to customizability" ([2024-10-12](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10921023)).
  - "The database adapters were like half the point of using Lucia imo" ([2024-10-11](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10913027)).
- The 2025-06-06 migration guide: "The database adapter model wasn't flexible enough for such a low-level library and severely limited the library design" ([PR #1799](https://github.com/lucia-auth/lucia/pull/1799)).

**Abstraction limits.**
- "Without the database adapter, Lucia is the verge on complicated to warrant a library and simple enough to write it from scratch" ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870204)).
- "It only handles sessions and you still need to implement the rest from scratch" ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870228)).
- [#1790](https://github.com/lucia-auth/lucia/discussions/1790) (2025-04-26): "the bitter truth about auth is that it's not something that can be easily encapsulated … If you want something that is fully customizable and feels naturally part of your codebase, you need to write it yourself."
- On Arctic in 2026: "the OAuth 2.0 protocol isn't an ideal layer to abstract into a library and any library should target an abstraction one or two layer above" ([blog/18](https://pilcrowonpaper.com/blog/18)).
- He rejected becoming a framework: "I could make Lucia into something more of a framework, akin to Auth.js. However, they come with their own issues" ([#1707](https://github.com/lucia-auth/lucia/discussions/1707)).

**Framework churn and framework-specific integrations.**
- v3: "We have also removed framework specific middleware … maintaining APIs for numerous frameworks across multiple major versions wasn't a viable option moving forward. We still maintain guides and examples for popular frameworks and you just have to copy-paste few lines of code" ([#1361](https://github.com/lucia-auth/lucia/discussions/1361)).
- 2025 (#1790):
  - "I don't want to create a guide/example for every single JavaScript framework. It's monotonous, and more importantly, I don't feel like I'm providing anything of value. How exactly you set the cookie using your library's specific API isn't important - it's that the cookie itself is set with the necessary flags."
  - On community-maintained examples: "community contributions aren't a good fit for something that requires constant maintenance. All the example needs to be updated whenever the 'main' example is updated" ([#1790](https://github.com/lucia-auth/lucia/discussions/1790); reply [2025-04-26](https://github.com/lucia-auth/lucia/discussions/1790#discussioncomment-12955681)).

**A shadcn-style CLI.**
- Users suggested it ([#1707 comment, 2024-10-08](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10874296); [#1714 comment, 2024-10-28](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11078990)).
- Pilcrow: "A CLI is something I'm open to exploring. It'll likely only support Prisma and Drizzle tho. A big question for me is how it'd work if you already defined your database schema. Probably requires a lot of parsing and code analysis" ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10871568)).
- No CLI was ever shipped.

**Licensing.** He could not relicense the package from MIT to 0BSD because "I'd need to get approval from all past contributors" ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870135)). The 2026 replacement file is 0BSD ([auth_session.ts](https://github.com/lucia-auth/lucia/blob/main/code/auth_session.ts)).

### 1.3 How security fixes reach users who copied code

**The author said nothing about this. I found no statement from him on it.** I checked:
- the three announcement posts: [#1707](https://github.com/lucia-auth/lucia/discussions/1707), [#1714](https://github.com/lucia-auth/lucia/discussions/1714) and [#1790](https://github.com/lucia-auth/lucia/discussions/1790)
- all of his comments and replies in them, via the GitHub REST discussions API
- the README
- the 2026 blog post

The question was put to him directly. davepar, [2024-10-28](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11075836): "If I follow the new examples and implement them in my code (e.g. Passkeys), how will I know if a security issue is found in the examples in the future? Currently, libraries get updated and I pull in the new version. Unless I remember to check back occasionally, I'll never know if the example code is updated or fixed." EricGeek raised the same concern in the next comment: "updates to this one file would be harder to track" ([2024-10-28](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11078990)). The replies were only "Agreed" and an @-mention of Pilcrow ([2024-11-02](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11130437), [2024-11-08](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11192591)). Pilcrow did not reply.

**What actually happened to fixes after deprecation.** Each was a silent edit to the docs or code, with no advisory, changelog or announcement:
- **Rate limiting.** A token bucket comment and code mismatch was reported on 2025-04-06 ([#1786](https://github.com/lucia-auth/lucia/issues/1786)). Unused `refilledAt` drift logic was reported on 2025-05-08 ([#1793](https://github.com/lucia-auth/lucia/issues/1793)). Both were fixed on 2025-06-06 in [PR #1795](https://github.com/lucia-auth/lucia/pull/1795). An earlier `refilledAt` fix landed on 2025-02-23 ([PR #1779](https://github.com/lucia-auth/lucia/pull/1779)). The throttling docs were removed outright ([PR #1796](https://github.com/lucia-auth/lucia/pull/1796)).
- **Inactivity timeout.** Seconds were compared against milliseconds (`>= activityCheckIntervalSeconds` → `* 1000`), fixed on 2025-06-09 ([PR #1803](https://github.com/lucia-auth/lucia/pull/1803)).
- **Session token design.** The Oct 2024 guide derived `sessionId = hex(sha256(token))` (e.g. [`pages/sessions/basic-api/sqlite.md` @ `ede23d7`](https://github.com/lucia-auth/lucia/blob/ede23d7bfefa6ddefa91abd1fb448f1251b79070/pages/sessions/basic-api/sqlite.md)). On 2025-06-08 it was replaced with a separate ID and a hashed secret "to prevent any possibility of a timing attacks". The migration guide said "The new API is more secure and patches out a very impractical timing attack" ([PR #1802](https://github.com/lucia-auth/lucia/pull/1802)). Adopting it means "invalidating all sessions (and signing out everyone)" (same PR).
- **Published GitHub advisories:** `lucia-auth/lucia` has **0** (REST `security-advisories`, checked 2026-10-24).

### 1.4 Related projects Pilcrow pointed to

- **Oslo** (`oslo`, then `@oslojs/*`).
  - The original `oslo` package was deprecated with "Please see https://oslojs.dev for the successor project" ([registry](https://registry.npmjs.org/oslo), modified 2025-01-20).
  - On 2026-07-29, `@oslojs/{crypto,jwt,otp,webauthn,binary,asn1,oauth2,cbor}` were all marked "Package no longer supported…" ([registry](https://registry.npmjs.org/@oslojs%2Fcrypto)).
  - `@oslojs/encoding` is kept because Astro core depends on it. Deprecation is "expect[ed] around 2028" ([blog/18](https://pilcrowonpaper.com/blog/18)).
  - The oslojs.dev site still lists all packages with no deprecation notice (fetched 2026-10-24).
- **Arctic.**
  - Last release 3.7.0 on 2025-05-21. Deprecated on npm on 2026-07-29 ([registry](https://registry.npmjs.org/arctic)).
  - The README now says "Arctic was deprecated on July 2026. Some example code … can be found under /code": PKCE and plain authorization-code request and exchange, refresh, and revocation ([repo](https://github.com/pilcrowonpaper/arctic)).
  - Pilcrow: "I don't think I should've made the library in the first place" ([blog/18](https://pilcrowonpaper.com/blog/18)).
- **The Copenhagen Book.** Archived on 2026-06-03 and replaced by the Auth Book ([repo](https://github.com/pilcrowonpaper/copenhagen)). In 2025 he framed it this way: Copenhagen is "about the theory and concepts. So naturally Lucia should be about the implementation" ([#1790](https://github.com/lucia-auth/lucia/discussions/1790)).
- **The Auth Book** ([auth.pilcrowonpaper.com](https://auth.pilcrowonpaper.com)). "My personal auth book … based on my personal opinion". Its examples are "written in Go" (site, fetched 2026-10-24). He says it will continue to be maintained ([blog/18](https://pilcrowonpaper.com/blog/18)).

---

## 2. Copy-in survey: how fixes reach code users already copied

### 2.1 shadcn/ui and shadcn registries

The current CLI is `shadcn` 4.22.1, published 2026-10-18 ([registry](https://registry.npmjs.org/shadcn)). The old `shadcn-ui` package is deprecated on npm.

- **`diff` was deprecated in CLI v4, not removed.**
  - The command's description changed from "check for updates against the registry" to "[DEPRECATED] Use `add [component] --diff` instead." on 2026-03-05 ([commit `8c705f8`](https://github.com/shadcn-ui/ui/commit/8c705f8af)). It still exists in source ([`packages/shadcn/src/commands/diff.ts`](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/diff.ts)).
  - It is absent from the CLI docs. The docs list `init`, `add`, `apply`, `preset`, `view`, `search`/`list`, `build`, `docs`, `info`, `migrate` and `eject` ([ui.shadcn.com/docs/cli](https://ui.shadcn.com/docs/cli), fetched 2026-10-24).
- **The v4 update story is a diff plus your agent.** CLI v4 (4.0.0 on 2026-03-06; [changelog 4.0.0](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/CHANGELOG.md)) added `add --dry-run`, `--diff [path]` and `--view`. The release notes, under the heading "Updating primitives", say: "You can use the `--diff` flag to check for registry updates. Or ask your agent: 'check for updates from @shadcn and merge with my local changes'" ([docs changelog 2026-03-cli-v4](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-03-cli-v4.mdx)). v4 also shipped `shadcn/skills` for coding agents (same page).
- **Overwrite and reinstall.**
  - `add -o, --overwrite`: "overwrite existing files. (default: false)".
  - `init --reinstall`: "re-install existing UI components".
  - Both overwrite your edits; neither merges ([CLI docs](https://ui.shadcn.com/docs/cli); [`add.ts`](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/add.ts)).
- **There is no versioning and no record of what was installed.**
  - `registry-item.json` has no `version`, changelog, integrity or deprecation field ([docs](https://ui.shadcn.com/docs/registry/registry-item-json)).
  - `components.json` is configuration only: style, tailwind, aliases and `registries` URL templates. It does not record installed items ([docs](https://ui.shadcn.com/docs/components-json)).
  - The deprecated `diff` command found installed components by checking whether each registry file's target path exists on disk ([`diff.ts`](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/diff.ts), "Find all components that exist in the project"). That detection fails after a rename or move (inference).
- **Pinning exists for GitHub registries only.** You can write `npx shadcn@latest add acme/ui/button#v1.2.0` with a branch, tag or full commit SHA, and "For published registries, prefer tags or full commit SHAs" ([registry FAQ](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/registry/faq.mdx)). The pin is not recorded anywhere after installation (inference from the `components.json` docs above).
- **An eject-style precedent.** `npx shadcn eject` (4.9.0, 2026-05-31) "inlines `shadcn/tailwind.css` and removes the dependency", and is irreversible ([CHANGELOG](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/CHANGELOG.md); [CLI docs](https://ui.shadcn.com/docs/cli)). It is the reverse direction: a package dependency becomes owned code, with no update path afterwards.
- **No security channel.** `shadcn-ui/ui` has **0** published repository security advisories (REST, 2026-10-24). I found no documented security-notice mechanism for registry items (**unverified** that none exists outside the repo).

### 2.2 Better Auth

- **The CLI package was renamed.** Docs now invoke `npx auth@latest …` ([cli.mdx](https://github.com/better-auth/better-auth/blob/main/docs/content/docs/concepts/cli.mdx)). The `auth` npm package is "The CLI for Better Auth", built from `packages/cli` (1.7.12, 2026-10-20; [registry](https://registry.npmjs.org/auth)). `@better-auth/cli` (last 1.4.22, 2026-03-16) is now marked "Package no longer supported…" ([registry](https://registry.npmjs.org/@better-auth%2Fcli)). That generic wording is npm's own text; how it came to be applied is **unverified**.
- **What the CLI writes into the user's repo** ([cli.mdx](https://github.com/better-auth/better-auth/blob/main/docs/content/docs/concepts/cli.mdx)):
  - `generate` writes **schema only**: `prisma/schema.prisma`, Drizzle `schema.ts`, or Kysely `schema.sql`. It reads your `auth.ts` config so plugins are included.
  - `migrate` applies the schema to the database, and only for the built-in Kysely adapter.
  - `check schema` writes nothing.
  - `init` supports only Next.js and SQLite. The docs do not say which files it writes.
  - `upgrade` bumps `better-auth` and synchronized `@better-auth/*` specifiers in `package.json`.
  - All runtime auth logic stays in npm packages.
- **How fixes reach users: npm releases plus GitHub Security Advisories.**
  - SECURITY.md: reports go through GHSA or email. "We only support the latest version of Better Auth." Disclosure happens after a patch, or after 90 days without one ([SECURITY.md](https://github.com/better-auth/better-auth/blob/main/SECURITY.md)).
  - **37** published repository advisories as of 2026-10-24 ([advisories](https://github.com/better-auth/better-auth/security/advisories)).
- **Examples:**
  - [GHSA-99h5-pjcv-gr6v](https://github.com/better-auth/better-auth/security/advisories/GHSA-99h5-pjcv-gr6v) (CVE-2025-61928, high, published 2025-10-08):
    - API key plugin.
    - "An attacker who is not signed in can create or change API keys for any user."
    - Affected `>= 1.2.0-beta.18, < 1.4.0`. Fix: "Upgrade `better-auth` to 1.4.0 or later. No 1.3 release fixes key changes."
  - [GHSA-965c-763c-88jm](https://github.com/better-auth/better-auth/security/advisories/GHSA-965c-763c-88jm) (CVE-2026-114607, critical, published 2026-09-30):
    - The OAuth `state` value was accepted as a Magic Link token.
    - Patched in 1.7.7.
    - Even here, in a package model, the advisory asks users to change *their own* code ("Update custom `verification.storeIdentifier.overrides` rules or storage integrations…").
    - It also lists operational steps: coordinated cutover, and pending links can no longer complete.
  - [GHSA-44jh-23m7-hpcf](https://github.com/better-auth/better-auth/security/advisories/GHSA-44jh-23m7-hpcf) (low, published 2026-09-30):
    - A bug in an **adapter**, not core. Database-backed rate limiting on PostgreSQL in `@better-auth/drizzle-adapter` and `@better-auth/kysely-adapter` let concurrent requests exceed the limit.
    - Suggested workaround: "a custom rate-limit storage that checks and increments the counter in one atomic step".
- **Advisory structure.** Each advisory opens with an "Am I affected?" section. It is a predicate over version and configuration (plugins enabled, `storeStateStrategy`, where rate-limit records are stored, and so on), followed by Patches and Workarounds (all three advisories above).
- In #1707, a Better Auth maintainer said framework integrations "are also very tiny layer. And even if they do become an issue, we can always move them to userland and let users copy and paste them when needed" ([2024-10-13, Bekacru](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10928029)).

### 2.3 GitHub Security Advisories for code that is not a package

- Only advisories reviewed by GitHub trigger Dependabot alerts. GitHub reviews advisories for "a package that comes from a supported registry" (Composer, Erlang, Go, GitHub Actions, Maven, npm, NuGet, pip, Pub, RubyGems, Rust, Swift). Reviewed advisories must carry "both ecosystem and package information" ([About the GitHub Advisory Database](https://docs.github.com/en/code-security/security-advisories/working-with-global-security-advisories-from-the-github-advisory-database/about-the-github-advisory-database), fetched 2026-10-24).
- Dependabot detects exposure from the dependency graph: "keep manifest and lock files up to date for accurate detection", and "Only advisories reviewed by GitHub trigger alerts" ([About Dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)).
- When creating a repository advisory, you "define the ecosystem, package name, affected/patched versions" ([Creating a repository security advisory](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/creating-a-repository-security-advisory)). The docs do not say what happens to an advisory with no package (**unverified**).
- **Inference:** a GitHub Security Advisory for a Butter Slice gives Butter publication, a CVE path and search visibility. It does **not** alert users whose copy of the code is not an npm dependency. Butter's own Manifest-based matching must do the delivery.

---

## 3. Lessons for Butter

1. **Act now: Butter's Primitives depend on deprecated packages.**
   - [docs/design.md](../design.md) says Primitives are "built on `@oslojs/*` and `arctic`" and "Slices depend on `@oslojs/*` and `arctic` directly".
   - Since 2026-07-29 every `@oslojs/*` package except `encoding`, and `arctic` itself, is deprecated on npm. The author has said he will not work on Arctic again ([blog/18](https://pilcrowonpaper.com/blog/18); [registry](https://registry.npmjs.org/arctic)).
   - Pilcrow's own replacements are zero-dependency copy-in files that use Web Crypto and `Uint8Array.toBase64()` ([auth_session.ts](https://github.com/lucia-auth/lucia/blob/main/code/auth_session.ts); [arctic/code](https://github.com/pilcrowonpaper/arctic/tree/main/code)).
   - Butter needs an ADR. Options: vendor these Primitives into Slices (the Lucia/Arctic path, and consistent with "distributed code"), or own a fork. Either way, Butter, not Pilcrow, now owns the Advisories for those Primitives.
   - Do not trust oslojs.dev as a status signal: it still shows no deprecation.
2. **Lucia's model has no notification path; Butter's Advisories exist to fill that gap.** davepar's unanswered question ([2024-10-28](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11075836)) is exactly what the Manifest, Advisory feed, `butter-fix` and the CI script answer. Lucia's later history also shows what an Advisory must carry beyond tests:
   - **Design-level fixes cost a migration.** The token redesign in [PR #1802](https://github.com/lucia-auth/lucia/pull/1802) signs everyone out, and Better Auth's GHSA-965c requires a coordinated cutover. An Advisory should include migration and operational notes alongside the new Invariant.
   - **Not every fix is a security fix.** The seconds/milliseconds bug in [PR #1803](https://github.com/lucia-auth/lucia/pull/1803) is correctness and cost, not security. Decide whether non-security Invariant changes travel through the same feed, perhaps with a severity tier.
3. **Concurrency bugs are the canonical copy-in failure, and under Butter they live in user-written Adapters.** Lucia's token bucket needed three fixes ([#1779](https://github.com/lucia-auth/lucia/pull/1779), [#1795](https://github.com/lucia-auth/lucia/pull/1795)). Better Auth's GHSA-44jh was a non-atomic check-and-increment in an *adapter*. Butter's operation-shaped, atomic Store operations ([ADR-0002](../adr/0002-canonical-sql-is-the-data-contract.md)) and concurrency Invariants are aimed squarely at this. Those Invariant tests must actually exercise contention against the user's real Adapter and database, not only the reference Adapter.
4. **Expect maintenance churn in stack guidance, even with no Adapter code.**
   - Lucia v3 dropped framework middleware ([#1361](https://github.com/lucia-auth/lucia/discussions/1361)).
   - The copy-paste site later deleted every ORM- and framework-specific guide and narrowed to one Node framework ([PR #1801](https://github.com/lucia-auth/lucia/pull/1801), [#1790](https://github.com/lucia-auth/lucia/discussions/1790)).
   - Pilcrow rejected community-maintained variants as unfit for "constant maintenance".
   - Butter's per-ORM and per-Exposure reference files in Skills, and its Configurator matrix (Prisma 8 / Drizzle / plain SQL × Reylo / raw SQL / query API), sit in the same position.
   - Mitigations:
     - Keep Invariants as the only normative contract and stack files as non-normative hints.
     - Version and date each stack reference file.
     - Give stack files a stated support and deprecation policy.
     - Budget the Agent Eval matrix explicitly, since it grows multiplicatively.
5. **Ports are an abstraction too, so watch for Pilcrow's adapter critique.** He said adapters "limit the API" and are a "black box" ([#1714](https://github.com/lucia-auth/lucia/discussions/1714)). Butter's Ports are owned by each Slice and are operation-shaped, and users write the Adapters, so the black box is the user's own code. Still, **any Advisory that changes a Port signature forces a change to every user's Adapter.** Prefer Advisories that tighten Invariants behind existing Ports. Treat Port changes as rare, explicitly breaking events with their own migration notes.
6. **Make Advisories discoverable and durable.**
   - Lucia's npm deprecation messages point to a URL that is now 404 (checked 2026-10-24).
   - Lucia's announcements lived in GitHub Discussions, and its Discord is closing ([blog/18](https://pilcrowonpaper.com/blog/18)).
   - Butter should use a permanent, versioned feed URL recorded in the Manifest.
   - It should define the CI script's behaviour when the feed is unreachable or retired. Fail-open versus fail-closed is a design choice.
   - It should publish an explicit end-of-life record format, so a retired Butter does not look like "no Advisories".
7. **A GitHub Security Advisory is a publication channel, not a delivery channel, for copied code.** Dependabot keys on package dependencies and GitHub-reviewed advisories ([§2.3](#23-github-security-advisories-for-code-that-is-not-a-package)). Butter's matching has to happen through the Manifest, Reconcile, `butter-fix` and the CI script. Verify what a GitHub Security Advisory with no npm package looks like before relying on CVE assignment and Advisory Database listing (see Open questions).
8. **Give each Advisory a machine-checkable "Am I affected?".** Better Auth's advisories are predicates over version *and configuration* ([GHSA-965c](https://github.com/better-auth/better-auth/security/advisories/GHSA-965c-763c-88jm), [GHSA-44jh](https://github.com/better-auth/better-auth/security/advisories/GHSA-44jh-23m7-hpcf)). A Butter Advisory should match on Slice, Invariant version and Strategy choices recorded in the Manifest (for example, rate-limit state in Postgres). Reconcile can then skip it, or apply it, without a human reading prose.
9. **Detect installs from the Manifest, not from file paths.** shadcn's old `diff` found installed components by checking whether registry file paths exist on disk ([`diff.ts`](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/diff.ts)), and nothing records versions or refs ([components.json docs](https://ui.shadcn.com/docs/components-json)). With full renames ([ADR-0001](../adr/0001-full-renames-and-invariant-based-fixes.md)), the Manifest (Slices, Invariant versions, Rename Map, registry ref) is the only reliable record. It is worth also recording the exact registry ref or commit each Slice was rendered from.
10. **shadcn has converged on agent-merged diffs. Butter's tests-not-diffs is the stricter version of the same idea.** shadcn v4 tells users to "ask your agent … merge with my local changes" ([cli v4 notes](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-03-cli-v4.mdx)). Butter's Advisory (an Invariant plus tests, applied until they pass) gives the agent an acceptance check that shadcn's diff lacks. This is the central thing Butter adds over both Lucia and shadcn.
11. **Brownfield schemas are the hard part Pilcrow named.** "How it'd work if you already defined your database schema. Probably requires a lot of parsing and code analysis" ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10871568)). Butter hands this to the agent plus Reconcile. The Agent Eval Fixtures should include existing-schema (brownfield) apps, not only greenfield ones.
12. **Settle licensing before the first contributor.** Pilcrow could not relicense Lucia to 0BSD without every contributor's consent ([2024-10-07](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870135)), so he released the replacement file separately under 0BSD. Butter's Slices are renamed and rewritten by users, so an attribution-free license (0BSD or MIT-0) plus contributor terms that allow it should be chosen up front.
13. **Plan for maintainer exit.** Pilcrow deprecated his work twice in two years: Lucia in 2024–25, then Arctic, Oslo and Copenhagen in 2026. Butter's promise ("we will tell you when your copied code is unsafe") outlives any single release, so the end-of-life path for the feed is part of the security model.

## 4. Open questions

- What does a published repository GitHub Security Advisory look like with no supported-ecosystem package? Is it eligible for GitHub review, Advisory Database listing, or CVE assignment? GitHub's docs do not say (**unverified**).
- Was the npm deprecation of `lucia` really run on 2025-06-06? It is inferred from `modified` timestamps; npm does not expose a deprecation date.
- Why do the 2026 Oslo/Arctic and `@better-auth/cli` deprecations carry npm's generic "Contact Support" wording instead of an author message (**unverified**)?
- Can Butter's concurrency Invariants actually reproduce races on PGlite in CI, as opposed to real Postgres with multiple connections? Not researched here.
- Should non-security Invariant changes (correctness, performance) use the Advisory feed, a separate channel, or a severity field?
- Should Butter vendor its Primitives (session secret hashing, constant-time compare, OAuth request and exchange code) into Slices, given the 2026 deprecations? If so, Butter becomes the security owner of that code (see Lesson 1).

## Sources

All accessed 2026-10-24.

**Lucia, Arctic, Oslo, Copenhagen (Pilcrow)**
- Lucia discussions:
  - [#148](https://github.com/lucia-auth/lucia/discussions/148) (2022-10-17)
  - [#1361 Lucia 3.0](https://github.com/lucia-auth/lucia/discussions/1361) (2024-01-27)
  - [#1707 Future plans](https://github.com/lucia-auth/lucia/discussions/1707) (2024-10-07), with author comments ([10867746](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10867746), [10870135](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870135), [10870204](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870204), [10870228](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10870228), [10871568](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10871568), [10913027](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10913027), [10921023](https://github.com/lucia-auth/lucia/discussions/1707#discussioncomment-10921023))
  - [#1714 A fresh start](https://github.com/lucia-auth/lucia/discussions/1714) (2024-10-20), with comments [11075836](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11075836) and [11078990](https://github.com/lucia-auth/lucia/discussions/1714#discussioncomment-11078990)
  - [#1790 Pushing the project forward](https://github.com/lucia-auth/lucia/discussions/1790) (2025-04-26), with comment [12955681](https://github.com/lucia-auth/lucia/discussions/1790#discussioncomment-12955681)
- Lucia issues and PRs: [#1786](https://github.com/lucia-auth/lucia/issues/1786), [#1793](https://github.com/lucia-auth/lucia/issues/1793), [PR #1779](https://github.com/lucia-auth/lucia/pull/1779), [PR #1795](https://github.com/lucia-auth/lucia/pull/1795), [PR #1796](https://github.com/lucia-auth/lucia/pull/1796), [PR #1799](https://github.com/lucia-auth/lucia/pull/1799), [PR #1800](https://github.com/lucia-auth/lucia/pull/1800), [PR #1801](https://github.com/lucia-auth/lucia/pull/1801), [PR #1802](https://github.com/lucia-auth/lucia/pull/1802), [PR #1803](https://github.com/lucia-auth/lucia/pull/1803)
- Lucia repo:
  - [README](https://github.com/lucia-auth/lucia/blob/main/README) and [code/auth_session.ts](https://github.com/lucia-auth/lucia/blob/main/code/auth_session.ts) (commits of 2026-07-29)
  - [lucia-auth.com/index.html](https://github.com/lucia-auth/lucia/blob/main/lucia-auth.com/index.html)
  - [sqlite.md @ ede23d7](https://github.com/lucia-auth/lucia/blob/ede23d7bfefa6ddefa91abd1fb448f1251b79070/pages/sessions/basic-api/sqlite.md)
- [lucia 3.2.2 CHANGELOG](https://unpkg.com/lucia@3.2.2/CHANGELOG.md)
- npm registry:
  - [lucia](https://registry.npmjs.org/lucia)
  - [@lucia-auth/adapter-prisma](https://registry.npmjs.org/@lucia-auth%2Fadapter-prisma) and the other `@lucia-auth/adapter-*` packages
  - [oslo](https://registry.npmjs.org/oslo)
  - [@oslojs/crypto](https://registry.npmjs.org/@oslojs%2Fcrypto), [@oslojs/encoding](https://registry.npmjs.org/@oslojs%2Fencoding)
  - [arctic](https://registry.npmjs.org/arctic)
- [pilcrowonpaper.com/blog/18](https://pilcrowonpaper.com/blog/18) (2026-07-29)
- [Arctic repo README and /code](https://github.com/pilcrowonpaper/arctic)
- [Copenhagen Book repo](https://github.com/pilcrowonpaper/copenhagen) (archived 2026-06-03)
- [Auth Book](https://auth.pilcrowonpaper.com)
- [oslojs.dev](https://oslojs.dev)

**shadcn**
- Docs: [CLI docs](https://ui.shadcn.com/docs/cli), [registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json), [components.json](https://ui.shadcn.com/docs/components-json)
- Docs sources: [registry FAQ](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/registry/faq.mdx), [CLI v4 notes (2026-03-06)](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-03-cli-v4.mdx)
- Code: [diff.ts](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/diff.ts), [commit 8c705f8 (2026-03-05)](https://github.com/shadcn-ui/ui/commit/8c705f8af), [add.ts](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/commands/add.ts), [CHANGELOG](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/CHANGELOG.md)
- npm: [shadcn](https://registry.npmjs.org/shadcn)

**Better Auth**
- [CLI docs source](https://github.com/better-auth/better-auth/blob/main/docs/content/docs/concepts/cli.mdx), [SECURITY.md](https://github.com/better-auth/better-auth/blob/main/SECURITY.md)
- Advisories: [list](https://github.com/better-auth/better-auth/security/advisories), [GHSA-99h5-pjcv-gr6v](https://github.com/better-auth/better-auth/security/advisories/GHSA-99h5-pjcv-gr6v), [GHSA-965c-763c-88jm](https://github.com/better-auth/better-auth/security/advisories/GHSA-965c-763c-88jm), [GHSA-44jh-23m7-hpcf](https://github.com/better-auth/better-auth/security/advisories/GHSA-44jh-23m7-hpcf)
- npm: [auth](https://registry.npmjs.org/auth), [@better-auth/cli](https://registry.npmjs.org/@better-auth%2Fcli), [better-auth](https://registry.npmjs.org/better-auth)

**GitHub**
- [About the GitHub Advisory Database](https://docs.github.com/en/code-security/security-advisories/working-with-global-security-advisories-from-the-github-advisory-database/about-the-github-advisory-database)
- [About Dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)
- [Creating a repository security advisory](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/creating-a-repository-security-advisory)
- [Publishing a repository security advisory](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/publishing-a-repository-security-advisory)
