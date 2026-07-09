/**
 * Conceptual example — not executable library code.
 *
 * Core never talks to Prisma/Drizzle directly.
 * Adapters translate stable model ids (+ field maps) to the ORM.
 * Public model aliases do not have to match table names.
 */

import { Effect } from "effect"
import { Butter, PrismaAdapter, DrizzleAdapter, defineAdapter } from "./_aspirational"

declare const prisma: unknown
declare const db: unknown

// --- Out of the box --------------------------------------------------------

export const withPrisma = Butter.make().adapter(PrismaAdapter(prisma)).build()

export const withDrizzle = Butter.make().adapter(DrizzleAdapter(db)).build()

// --- What an adapter must implement (sketch) -------------------------------

/**
 * Adapters receive stable internal model ids from core/extensions.
 * Mapping to table/model names is adapter + app concern
 * (Prisma @@map, Drizzle table names, etc.).
 */
export const MemoryAdapter = defineAdapter({
  id: "memory",
  create: () => {
    const tables = new Map<string, Map<string, Record<string, unknown>>>()

    const ensure = (model: string) => {
      if (!tables.has(model)) tables.set(model, new Map())
      return tables.get(model)!
    }

    return {
      findOne: (model: string, where: Record<string, unknown>) =>
        Effect.sync(() => {
          const rows = [...ensure(model).values()]
          return rows.find((row) =>
            Object.entries(where).every(([k, v]) => row[k] === v)
          ) ?? null
        }),
      create: (model: string, data: Record<string, unknown>) =>
        Effect.sync(() => {
          const id = String(data.id ?? crypto.randomUUID())
          const row = { ...data, id }
          ensure(model).set(id, row)
          return row
        }),
      update: (model: string, where: Record<string, unknown>, data: Record<string, unknown>) =>
        Effect.gen(function* () {
          const existing = yield* Effect.sync(() => {
            const rows = [...ensure(model).entries()]
            return rows.find(([, row]) =>
              Object.entries(where).every(([k, v]) => row[k] === v)
            )
          })
          if (!existing) return null
          const [id, row] = existing
          const next = { ...row, ...data }
          ensure(model).set(id, next)
          return next
        }),
      delete: (model: string, where: Record<string, unknown>) =>
        Effect.sync(() => {
          for (const [id, row] of ensure(model)) {
            if (Object.entries(where).every(([k, v]) => row[k] === v)) {
              ensure(model).delete(id)
              return true
            }
          }
          return false
        }),
    }
  },
})

export const withMemory = Butter.make().adapter(MemoryAdapter()).build()

/**
 * Agent-native schema story (later CLI):
 *
 * Instead of Butter rewriting Prisma/Drizzle schemas, the CLI emits
 * instructions an agent can apply:
 *
 *   - ensure model Contributor (alias of user) has fields …
 *   - ensure Publication / Staff tables for the publication extension
 *   - keep @@map / table names stable if renaming only the TS surface
 *
 * Core continues to address rows via stable model ids through the adapter.
 */
