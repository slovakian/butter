/**
 * Conceptual example — not executable library code.
 *
 * Stable internal model ids stay in core.
 * Aliasing a model renames the public type *and* the client/RPC namespace.
 * Method aliases rename only the leaf under that model namespace.
 *
 * DB table names are adapter mapping — see 06 / 07 — not this file.
 */

import { Butter } from "./_aspirational"

export const auth = Butter.make()
  .alias({
    models: {
      // internal model id → public name (= namespace for capabilities)
      user: "contributor",
      session: "session",
      organization: "publication",
      member: "staff",
    },
    methods: {
      // stable capability id → public method leaf only
      "session.get": "current",
      "session.list": "devices",
      "session.revoke": "signOutDevice",
      "organization.create": "create",
      "organization.inviteMember": "invite",
    },
  })
  .build()

/**
 * Public surface:
 *
 *   await client.session.current()
 *   await client.session.devices()
 *   await client.publication.create({ name: "Weekly" })
 *   await client.publication.invite({ publicationId, email })
 *
 * Core still reasons about session.get / organization.create.
 *
 * Projection:
 *   publicPath = (models[ns] ?? ns) + "." + (methods[id] ?? methodLeaf)
 */
type PublicClient = {
  session: {
    current: () => Promise<unknown>
    devices: () => Promise<unknown>
    signOutDevice: (input: { token: string }) => Promise<void>
  }
  publication: {
    create: (input: { name: string }) => Promise<unknown>
    invite: (input: { publicationId: string; email: string }) => Promise<unknown>
  }
}

export type { PublicClient }
