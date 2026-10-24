# Butter Auth

Butter distributes auth code and agent guidance that users copy into, and own in, their own repos. Pilcrow's Auth Book (https://auth.pilcrowonpaper.com/) is its guiding reference.

## Distribution

**Slice**: One installable unit of auth functionality (e.g. sessions, password sign-in, GitHub OAuth), delivered through the registry and owned by the user once installed. _Avoid_: Plugin, module, feature pack

**Configurator**: The site where a user picks their setup and Slices, and receives an install command and a Setup Prompt tailored to those choices. _Avoid_: Generator, wizard, builder

**Setup Prompt**: The setup-specific instructions handed to the user's agent after install, telling it how to finish wiring Butter into that particular stack. _Avoid_: Generated prompt, agent prompt, instructions

**Manifest**: The committed record, in the user's repo, of their Butter choices: stack, installed Slices and their Invariant versions, Strategies, Rename Map, Task View, and every non-secret answer they gave during setup. _Avoid_: Config, lockfile, settings

**Advisory**: A published notice that a Slice gained or changed an Invariant for security reasons, carrying the new tests that prove an install is fixed. _Avoid_: Patch, security update, hotfix

**Skill**: Reusable agent guidance about building or changing a Butter auth system, published by Butter for agents to load on demand. _Avoid_: Prompt pack, rule, recipe

## Setup

**Reconcile**: Bringing a user's repo into agreement with their Manifest; the single operation behind first setup, adding a Slice, and changing a choice. _Avoid_: Install, sync, migrate, scaffold

**Setup Task**: One unit of Reconcile work, done only when its Acceptance Check passes. _Avoid_: Step, todo, job

**Acceptance Check**: The objective condition (usually passing Invariant tests or a succeeding command) that marks a Setup Task done. _Avoid_: Definition of done, verification step

**Task View**: Wherever the user chooses to track Setup Tasks; always rebuildable from the Manifest and the repo, never the source of truth. _Avoid_: Task store, setup state, tracker

## Shape of an installed auth system

**Primitive**: A pure, schema-free building block for a security-sensitive operation (e.g. generating a session token, hashing a password). _Avoid_: Util, helper

**Flow**: The ordered logic of one auth operation (e.g. sign in, verify email), written against Ports and never against storage or a framework. _Avoid_: Handler, endpoint, procedure

**Port**: An interface a Flow depends on, which the user's codebase fulfills. Every Port is either a Store or a Strategy. _Avoid_: Adapter interface, provider, hook

**Store**: A Port describing where auth data lives (e.g. sessions, users), with no opinion about tables, models, or names. _Avoid_: Repository, model, table, adapter

**Strategy**: A Port describing how a behavior works where reasonable systems differ (e.g. cookie vs header token transport, database session vs JWT). _Avoid_: Mode, option, driver

**Adapter**: The user-side implementation of a Port for their particular stack (e.g. a Prisma-backed session Store). _Avoid_: Driver, connector, implementation

**Schema Owner**: Whatever in the user's stack defines auth tables and runs their migrations (an ORM or plain SQL migrations). _Avoid_: ORM, migration tool, database layer

**Query Layer**: Whatever in the user's stack executes Store operations against the database (Reylo, an ORM's raw SQL, or an ORM's query API). _Avoid_: ORM, client, driver, data layer

**Composition Root**: The single user-owned file where Slices, Adapters, Strategies, and config are assembled into the user's auth system. _Avoid_: Auth config, auth instance, setup file

**Invariant**: A security property a Flow or an Exposure must always uphold (e.g. "verification codes are single-use", "cross-origin state-changing requests are rejected"), stated in plain language and checked by a test. _Avoid_: Rule, requirement, guarantee

**Exposure**: The user's own way of making Flows reachable by clients (e.g. RPC, API routes, server functions). _Avoid_: Transport layer, API, routes, endpoints

**Exposure Driver**: A small user-side bridge that lets Butter's Exposure Invariant tests call the user's Exposure, whatever form it takes. _Avoid_: Test adapter, harness, client

## Verifying Butter itself

**Fixture**: A small sample app representing one stack combination, with a pre-filled Manifest, used to test whether agents can set Butter up. _Avoid_: Example app, test project, template

**Agent Eval**: One run in which a coding agent Reconciles a Fixture unattended and a Grader judges the result. _Avoid_: E2E test, integration test, benchmark

**Grader**: The step after an Agent Eval that, out of the agent's reach, restores Butter's original Invariant tests and decides pass or fail. _Avoid_: Judge, checker, validator

## Auth concepts

**User**: The person an auth system authenticates; one of only two Domain Concepts shared by every Slice. _Avoid_: Account, principal, identity

**Session**: Proof that a User completed authentication, held by a client and checked on each request; the other Domain Concept shared by every Slice. _Avoid_: Login, token, auth state

**Action Session**: A short-lived, single-use proof of fresh verification, bound to one User and one sensitive action (e.g. password reset, linking a Provider Identity). _Avoid_: Sudo mode, reauth token, step-up session

**Sign-in Method**: Any way a User can authenticate (password, OAuth provider, passkey). A general term, never a single shared record. _Avoid_: Account, auth method, credential type

**Password Credential**: A User's password-based Sign-in Method, owned by the password Slice. _Avoid_: Credential account, password account

**Provider Identity**: The link between a User and their identity at an external OAuth provider, owned by the OAuth Slice. A User may have several. _Avoid_: Account, OAuth account, social account, connection

## Naming

**Domain Concept**: An auth noun that belongs to the user's vocabulary (e.g. user, session, organization) and that the user may rename everywhere. _Avoid_: Entity, model, resource

**Protocol Vocabulary**: Terms defined by an external specification (e.g. OAuth `state`, WebAuthn `authenticatorData`) that Butter keeps on spec. _Avoid_: Reserved words, core names

**Rename Map**: The user's record of which Domain Concepts they renamed and to what. _Avoid_: Aliases, name overrides
