/**
 * Conceptual — session composition in its own file.
 *
 * Augment / override are first-class. No customSession plugin.
 * This module exports a builder contribution, not a finished auth instance.
 */

import { Effect } from "effect"
import type { ButterBuilder } from "../_aspirational"

declare const loadRecentPosts: (userId: string) => Effect.Effect<ReadonlyArray<{ id: string }>>

/**
 * A "slice" that receives the builder and returns it with session rules applied.
 * Assembly in auth.ts just pipes slices — order is explicit in the assembler.
 */
export const withSession = (butter: ButterBuilder): ButterBuilder =>
  butter.augment("session.get", (original) => (input) =>
    Effect.gen(function* () {
      const base = yield* original(input)
      const userId = (base as { user: { id: string } }).user.id
      const recentPosts = yield* loadRecentPosts(userId)
      return { ...base, recentPosts }
    })
  )
