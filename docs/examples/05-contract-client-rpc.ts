/**
 * Conceptual example — not executable library code.
 *
 * One built contract projects to:
 * - server capability caller
 * - browser / RSC client
 * - oRPC (or later tRPC) router
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
    methods: {
      "session.get": "current",
      "organization.create": "create",
      "organization.inviteMember": "invite",
    },
  })
  .build()

export const contract = auth.contract

export const client = createButterClient({
  contract,
  baseUrl: "/api/auth",
})

declare function demoClient() {
  return client.session.current()
}

export const authRouter = toOrpcRouter(contract)

/**
 * Procedure paths follow model alias + method leaf:
 *   auth.session.current
 *   auth.publication.create
 *   auth.publication.invite
 */

import { Effect } from "effect"

export const requireContributor = Effect.gen(function* () {
  const session = yield* auth.use("session.current")
  return session
})
