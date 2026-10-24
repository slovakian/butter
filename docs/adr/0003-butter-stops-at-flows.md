# Butter stops at Flows: no HTTP layer, no UI

Butter ships Primitives, Flows, Ports, reference Adapters, and Invariant tests, and nothing above them. It has no opinion on how Flows are exposed (Effect RPC, oRPC, Next.js routes or actions, TanStack Start server functions or routes, Hono, etc.) and will never ship UI, even though it distributes through the shadcn registry. Exposure is the user's choice, carried out by their agent following transport guidance in Skills. Security properties that look like UI concerns, such as not revealing whether an email is registered, are Invariants of the Flows themselves.

## Consequences

Transport-level security (CSRF origin checks, cookie attributes, `Cache-Control: no-store`, OAuth `state`/PKCE cookies, rate-limit keys) is still Butter's concern even though Exposure is not. Butter ships framework-free Primitives for it (e.g. origin verification, session cookie serialization) and Exposure Invariant tests that reach the user's Exposure through an agent-written Exposure Driver.
