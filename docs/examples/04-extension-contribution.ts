/**
 * Conceptual example — not executable library code.
 *
 * Extensions contribute models + capabilities to the graph.
 * They do not mutate a single inferred options object.
 */

import { Effect, Schema } from "effect"
import { Butter, defineExtension } from "./_aspirational"

/**
 * A "publication" extension — same job as Better Auth's organization plugin,
 * but named for the app's domain via aliases (not via a separate namespace map).
 */
export const PublicationExtension = defineExtension({
  id: "publication",

  models: {
    organization: Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      slug: Schema.String,
      createdAt: Schema.Date,
    }),
    member: Schema.Struct({
      id: Schema.String,
      organizationId: Schema.String,
      userId: Schema.String,
      role: Schema.Literals(["owner", "admin", "member"]),
    }),
  },

  extends: {
    session: {
      activeOrganizationId: Schema.optional(Schema.String),
    },
  },

  capabilities: {
    "organization.create": {
      input: Schema.Struct({ name: Schema.String, slug: Schema.optional(Schema.String) }),
      output: Schema.Struct({ id: Schema.String, name: Schema.String, slug: Schema.String }),
      handler: (_input: { name: string; slug?: string }) =>
        Effect.succeed({ id: "…", name: "…", slug: "…" }),
    },
    "organization.inviteMember": {
      input: Schema.Struct({
        organizationId: Schema.String,
        email: Schema.String,
        role: Schema.optional(Schema.String),
      }),
      output: Schema.Struct({ invitationId: Schema.String }),
      handler: (_input: { organizationId: string; email: string; role?: string }) =>
        Effect.succeed({ invitationId: "…" }),
    },
  },
})

export const auth = Butter.make()
  .extension(PublicationExtension)
  .alias({
    models: {
      organization: "publication", // type + client.publication.*
      member: "staff",
      user: "contributor",
    },
    methods: {
      "organization.create": "create",
      "organization.inviteMember": "invite",
      "session.get": "current",
    },
  })
  .build()

/**
 * Composition rule:
 * - Extension contributes under stable ids
 * - Model alias is the public namespace
 * - Method alias is the leaf only
 *   → client.publication.create / client.publication.invite / client.session.current
 */
