/**
 * Conceptual — public naming.
 *
 * Model alias = client/RPC namespace. Same thing.
 * Method aliases rename only the leaf under that model namespace.
 *
 * DB/Prisma names live in adapter.ts — not here.
 */

import type { AliasMap } from "../_aspirational"

export const aliases = {
  models: {
    user: "contributor", // types + client.contributor? no — user rarely has a namespace
    // For models that own capabilities, the model alias *is* the namespace:
    organization: "publication", // → client.publication.*
    member: "staff", // model/type name; capabilities stay under organization→publication
    session: "session", // keep default
  },
  methods: {
    // stable capability id → public method leaf only
    "session.get": "current",
    "session.list": "devices",
    "session.revoke": "signOutDevice",
    "organization.create": "create",
    "organization.inviteMember": "invite",
  },
} satisfies AliasMap

/**
 * Projection rule:
 *
 *   publicPath(capabilityId) =
 *     (models[namespace] ?? namespace) + "." + (methods[capabilityId] ?? methodLeaf)
 *
 *   organization.create → publication.create
 *   session.get         → session.current
 */
