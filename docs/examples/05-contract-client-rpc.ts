/**
 * Conceptual example — not executable library code.
 *
 * One built contract projects to:
 * - server capability caller
 * - browser / RSC client
 * - oRPC (or later tRPC) router
 *
 * This is the antidote to Better Auth's parallel client plugin list
 * and inferAdditionalFields hacks.
 */

import { Butter, createButterClient, toOrpcRouter } from "./_aspirational"
import { PublicationExtension } from "./04-extension-contribution"

export const auth = Butter.make()
  .extension(PublicationExtension)
  .alias({
    models: {
      user: "contributor",
      organization: "publication",
      member: "staff",
    },
    namespaces: {
      session: "session",
      organization: "publication",
    },
    methods: {
      "session.get": "current",
      "organization.create": "create",
      "organization.inviteMember": "invite",
    },
  })
  .build()

/** Shared contract — importable from server and client packages as types */
export const contract = auth.contract

// --- Client projection (public namespace + method) --------------------------

export const client = createButterClient({
  contract,
  baseUrl: "/api/auth",
})

declare function demoClient() {
  // hierarchy preserved: namespace then method
  return client.session.current()
}

// --- oRPC projection (reuse the app's RPC layer) ---------------------------

export const authRouter = toOrpcRouter(contract)

/**
 * App wires auth procedures into an existing oRPC app:
 *
 *   const appRouter = {
 *     auth: authRouter,
 *     posts: postsRouter,
 *   }
 *
 * Procedure paths follow independent aliases:
 *   auth.session.current
 *   auth.publication.create
 *   auth.publication.invite
 *
 * HTTP endpoints remain available as an alternate projection of the
 * same contract for apps that want Better Auth-style route handlers.
 */

// --- Server usage ----------------------------------------------------------

import { Effect } from "effect"

export const requireContributor = Effect.gen(function* () {
  // Server may call by public path or stable id — both resolve via contract
  const session = yield* auth.use("session.current")
  return session
})
