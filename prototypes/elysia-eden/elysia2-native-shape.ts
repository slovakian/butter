import { Elysia, t } from "elysia"
const app = new Elysia().post("/x", { body: t.Object({ a: t.String() }) }, ({ body }) => ({ hi: true as const, a: body.a }))
export const s: App = 1 as any as number
type App = (typeof app)["~Routes"]
