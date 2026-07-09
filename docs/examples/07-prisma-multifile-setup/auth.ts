/**
 * Conceptual — assembly only.
 *
 * This file should stay thin. If it grows into a Better Auth-style god-object,
 * the composition model has failed.
 *
 * Pattern:
 *   1. import contributions from other files
 *   2. pipe them onto the builder
 *   3. export { auth, contract }
 */

import { Butter } from "../_aspirational"
import { adapter } from "./adapter"
import { aliases } from "./aliases"
import { PublicationExtension } from "./publication"
import { withSession } from "./session"

export const auth = withSession(
  Butter.make().adapter(adapter).extension(PublicationExtension).alias(aliases)
).build()

export const contract = auth.contract

/**
 * What a user actually did to set up Butter + Prisma:
 *
 * 1. Have a Prisma client (db.ts) — already theirs
 * 2. Map Butter internal models → Prisma delegates (adapter.ts)
 * 3. Choose public model (= namespace) + method leaf names (aliases.ts)
 * 4. Drop in extensions as modules (publication.ts)
 * 5. Optionally augment/override capabilities in focused files (session.ts)
 * 6. Assemble in auth.ts and export contract
 * 7. Project contract → client.ts / rpc.ts (and optional HTTP handler)
 *
 * Nothing requires a single clustered config object.
 * Types flow from `contract`, so client/rpc files do not re-list plugins.
 */
