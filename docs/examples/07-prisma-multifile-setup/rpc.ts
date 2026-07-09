/**
 * Conceptual — reuse the app's oRPC layer.
 * Same contract as client.ts; different projection.
 */

import { toOrpcRouter } from "../_aspirational"
import { contract } from "./auth"

export const authRouter = toOrpcRouter(contract)

/**
 * Wire into the app router:
 *
 *   const appRouter = {
 *     auth: authRouter,   // auth.session.current, auth.publication.create, …
 *     posts: postsRouter,
 *   }
 *
 * HTTP route handlers can be a third projection of `contract` if desired.
 * RPC is not a second auth system — it is another view of the same graph.
 */
