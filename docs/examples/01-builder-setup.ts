/**
 * Conceptual example — not executable library code.
 *
 * Thin builder compiles to an Effect Layer graph.
 * Authors configure; Effect composes.
 */

import { Effect, Layer } from "effect"
// aspirational:
// import { Butter, PrismaAdapter } from "butter"
// import { prisma } from "./db"

declare const Butter: {
  make: () => ButterBuilder
}
declare const PrismaAdapter: (client: unknown) => Adapter
type Adapter = { readonly _tag: "Adapter" }

interface ButterBuilder {
  adapter: (adapter: Adapter) => ButterBuilder
  extension: (extension: unknown) => ButterBuilder
  alias: (aliases: AliasMap) => ButterBuilder
  augment: <I, A, E, R>(
    capabilityId: string,
    fn: (original: (input: I) => Effect.Effect<A, E, R>) => (input: I) => Effect.Effect<A, E, R>
  ) => ButterBuilder
  override: <I, A, E, R>(
    capabilityId: string,
    fn: (input: I) => Effect.Effect<A, E, R>
  ) => ButterBuilder
  build: () => AuthInstance
}

interface AliasMap {
  models?: Record<string, string>
  namespaces?: Record<string, string>
  /** Stable capability id → public method leaf only */
  methods?: Record<string, string>
}

interface AuthInstance {
  /** Effect Layer that provides all auth services */
  readonly layer: Layer.Layer<never, never, never>
  /** Shared contract projected to client + RPC */
  readonly contract: AuthContract
  /** Server-side capability caller (internal IDs or public aliases) */
  readonly use: <A, E, R>(capability: string, input?: unknown) => Effect.Effect<A, E, R>
}

interface AuthContract {
  readonly models: Record<string, unknown>
  readonly procedures: Record<string, unknown>
  readonly aliases: Required<AliasMap>
}

declare const prisma: unknown

export const auth = Butter.make()
  .adapter(PrismaAdapter(prisma))
  .build()

// Under the hood (conceptual):
// auth.layer === Layer.mergeAll(SessionLive, UserStoreLive, AdapterLive, ...)
// auth.contract is the single source for server types, client SDK, and RPC routers
