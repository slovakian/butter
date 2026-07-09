/**
 * Conceptual — extension as a module you own or import.
 *
 * Could live in `butter/extensions/organization` and be re-aliased here,
 * or be an app-local extension. Either way: one file, one concern.
 */

import { Effect, Schema } from "effect"
import { defineExtension } from "../_aspirational"

export const PublicationExtension = defineExtension({
  id: "publication",

  // Stable internal model ids (public names come from aliases.ts)
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
