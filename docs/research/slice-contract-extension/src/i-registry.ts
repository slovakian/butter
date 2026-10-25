// I. (Not Effect) TypeScript declaration merging as a type-level registry, like TanStack Router's `Register`.
// Butter declares an empty interface; installed Slices augment it; sign-in constructors read it.
import { Schema } from "effect"
import { HttpApiEndpoint } from "effect/http-api"
import { Credentials, SignedIn } from "./support/slices.ts"

export interface SignInResults {} // augmented by Slices: see i-registry-2fa.ts
const registry: Array<Schema.Top> = [] // runtime twin: filled by import side effects
export const registerSignInResult = (s: Schema.Top) => void registry.push(s)

type Extra = SignInResults[keyof SignInResults]
export const signInCall = <const Id extends string>(id: Id) =>
  HttpApiEndpoint.post(id, `/${id}`, {
    payload: Credentials,
    success: [SignedIn, ...registry] as unknown as readonly [typeof SignedIn, ...Array<Extract<Extra, Schema.Top>>]
  })
