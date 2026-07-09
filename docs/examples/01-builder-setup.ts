/**
 * Conceptual example — not executable library code.
 *
 * Thin builder compiles to an Effect Layer graph.
 * Authors configure; Effect composes.
 *
 * For a realistic multi-file Prisma walkthrough, see
 * `07-prisma-multifile-setup/`.
 */

import { Effect, Layer } from "effect"
import type { AliasMap, AuthContract } from "./_aspirational"

declare const Butter: {
  make: () => ButterBuilder
}
declare const PrismaAdapter: (
  client: unknown,
  options?: { tables?: Record<string, string> }
) => Adapter
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

interface AuthInstance {
  readonly layer: Layer.Layer<never, never, never>
  readonly contract: AuthContract
  readonly use: <A, E, R>(capability: string, input?: unknown) => Effect.Effect<A, E, R>
}

declare const prisma: unknown

export const auth = Butter.make()
  .adapter(PrismaAdapter(prisma))
  .build()

// Under the hood (conceptual):
// auth.layer === Layer.mergeAll(SessionLive, UserStoreLive, AdapterLive, ...)
// auth.contract is the single source for server types, client SDK, and RPC routers
