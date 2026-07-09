/**
 * Conceptual example — not executable library code.
 *
 * Stable internal IDs stay in core.
 * Public names are composed from independent alias maps:
 *   models     → data/shape names
 *   namespaces → client/RPC grouping
 *   methods    → leaf operation names (within a namespace)
 *
 * Apps do NOT flatten `organization.create` into a single root symbol.
 */

import { Butter } from "./_aspirational"

export const auth = Butter.make()
  .alias({
    models: {
      // internal model id → public model name
      user: "contributor",
      session: "session",
      organization: "publication",
      member: "staff",
    },
    namespaces: {
      // internal capability namespace → public client/RPC namespace
      session: "session",
      organization: "publication",
    },
    methods: {
      // stable capability id → public *method* name only (not a full path)
      "session.get": "current",
      "session.list": "devices",
      "session.revoke": "signOutDevice",
      "organization.create": "create",
      "organization.inviteMember": "invite",
    },
  })
  .build()

/**
 * Public surface keeps hierarchy:
 *
 *   await client.session.current()
 *   await client.session.devices()
 *   await client.publication.create({ name: "Weekly" })
 *   await client.publication.invite({ publicationId, email })
 *
 * Core / extensions still reason about:
 *
 *   session.get
 *   organization.create
 *
 * Rename independently:
 *   - change only the namespace → organization.* becomes publication.*
 *   - change only a method     → publication.create → publication.start
 *   - change both              → publication.start
 *
 * Rejected shape (first draft):
 *   methods: { "organization.create": "startPublication" }
 *   → client.startPublication()  // flattens namespace + method; harder to scan
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
