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
 * but named for the app's domain and contributed as typed graph nodes.
 */
export const PublicationExtension = defineExtension({
  id: "publication",

  // Stable model ids (apps may alias these publicly)
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

  // Optional: attach fields to models owned by core / other extensions
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
      organization: "publication",
      member: "staff",
      user: "contributor",
    },
    methods: {
      "organization.create": "startPublication",
      "organization.inviteMember": "inviteStaff",
      "session.get": "current",
    },
  })
  .build()

/**
 * Composition rule:
 * - Extension contributes under stable ids
 * - App aliases for DX
 * - session.activeOrganizationId is a schema contribution, not a
 *   side effect that other plugins must specially re-infer
 */
