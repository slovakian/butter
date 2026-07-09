/**
 * Conceptual example — not executable library code.
 *
 * Stable internal IDs stay in core.
 * Public model + method names are aliases chosen by the app.
 */

import { Butter } from "./_aspirational"

export const auth = Butter.make()
  .alias({
    models: {
      // internal id → public name in app code / contract projections
      user: "contributor",
      session: "session", // keep as-is
      organization: "publication",
      member: "staff",
    },
    methods: {
      // capability id → public method name on client + RPC
      "session.get": "current",
      "session.list": "devices",
      "session.revoke": "signOutDevice",
      "organization.create": "startPublication",
      "organization.inviteMember": "inviteStaff",
    },
  })
  .build()

/**
 * App code sees public names only:
 *
 *   await client.current()
 *   await client.startPublication({ name: "Weekly" })
 *
 * Core / extensions still reason about:
 *
 *   session.get
 *   organization.create
 *
 * Prisma model mapping can match the public names:
 *
 *   model Contributor { ... } // @@map("user") if the table stays "user"
 */
type PublicClient = {
  current: () => Promise<unknown>
  devices: () => Promise<unknown>
  signOutDevice: (input: { token: string }) => Promise<void>
  startPublication: (input: { name: string }) => Promise<unknown>
  inviteStaff: (input: { publicationId: string; email: string }) => Promise<unknown>
}

export type { PublicClient }
