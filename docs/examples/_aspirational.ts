/**
 * Aspirational shims so conceptual examples typecheck in isolation later
 * if we choose to wire them to a docs tsconfig. Not a real implementation.
 */

import { Effect, Layer, Schema } from "effect"

export type AliasMap = {
  models?: Record<string, string>
  methods?: Record<string, string>
}

export type AuthContract = {
  readonly models: Record<string, unknown>
  readonly procedures: Record<string, unknown>
  readonly aliases: {
    models: Record<string, string>
    methods: Record<string, string>
  }
}

export type AuthInstance = {
  readonly layer: Layer.Layer<never, never, never>
  readonly contract: AuthContract
  readonly use: <A = unknown, E = never, R = never>(
    capability: string,
    input?: unknown
  ) => Effect.Effect<A, E, R>
}

export type ButterBuilder = {
  adapter: (adapter: unknown) => ButterBuilder
  extension: (extension: unknown) => ButterBuilder
  alias: (aliases: AliasMap) => ButterBuilder
  augment: (
    capabilityId: string,
    fn: (original: (input: unknown) => Effect.Effect<unknown>) => (
      input: unknown
    ) => Effect.Effect<unknown>
  ) => ButterBuilder
  override: (
    capabilityId: string,
    fn: (input: unknown) => Effect.Effect<unknown>
  ) => ButterBuilder
  build: () => AuthInstance
}

const emptyContract: AuthContract = {
  models: {},
  procedures: {},
  aliases: { models: {}, methods: {} },
}

const builder = (): ButterBuilder => {
  const api: ButterBuilder = {
    adapter: () => api,
    extension: () => api,
    alias: () => api,
    augment: () => api,
    override: () => api,
    build: () => ({
      layer: Layer.empty as Layer.Layer<never, never, never>,
      contract: emptyContract,
      use: () => Effect.succeed(null) as Effect.Effect<never>,
    }),
  }
  return api
}

export const Butter = {
  make: builder,
}

export const PrismaAdapter = (client: unknown) => ({ _tag: "PrismaAdapter" as const, client })
export const DrizzleAdapter = (client: unknown) => ({ _tag: "DrizzleAdapter" as const, client })

export const defineAdapter = <T>(def: T): T => def

export const defineExtension = <T>(def: T): T => def

export const createButterClient = (_options: {
  contract: AuthContract
  baseUrl: string
}) =>
  new Proxy({} as Record<string, (...args: Array<unknown>) => Promise<unknown>>, {
    get: () => async () => null,
  })

export const toOrpcRouter = (_contract: AuthContract) => ({})

export { Schema }
