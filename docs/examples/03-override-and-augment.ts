/**
 * Conceptual example — not executable library code.
 *
 * Override replaces a capability.
 * Augment wraps a capability (custom session without a special plugin).
 */

import { Effect } from "effect"
import { Butter } from "./_aspirational"

declare const loadRecentPosts: (userId: string) => Effect.Effect<ReadonlyArray<{ id: string }>>
declare const loadFavorites: (userId: string) => Effect.Effect<ReadonlyArray<{ id: string }>>

// --- Augment: keep default session.get, enrich the return value ------------

export const authWithAugmentedSession = Butter.make()
  .augment("session.get", (original) => (input) =>
    Effect.gen(function* () {
      const base = yield* original(input)
      const userId = (base as { user: { id: string } }).user.id
      const [recentPosts, favorites] = yield* Effect.all([
        loadRecentPosts(userId),
        loadFavorites(userId),
      ])
      return {
        ...base,
        recentPosts,
        favorites,
      }
    })
  )
  .build()

// --- Override: replace session.get entirely --------------------------------

export const authWithOverriddenSession = Butter.make()
  .override("session.get", (_input) =>
    Effect.gen(function* () {
      // Full control: relational query, custom shape, different store, etc.
      // Still registered under capability id "session.get"
      // so aliases, RPC, and client projections keep working.
      return {
        user: { id: "…", email: "…" },
        session: { id: "…", token: "…" },
        workspace: { id: "…", role: "editor" },
      }
    })
  )
  .build()

/**
 * Contrast with Better Auth:
 * - customSession is a plugin with documented inference caveats
 * - plugin order and hoisted `satisfies BetterAuthOptions` workarounds
 *
 * In Butter, enriching or replacing session.get is ordinary composition
 * on a capability id. Types flow from the built contract, not from
 * re-running client plugin inference.
 */
