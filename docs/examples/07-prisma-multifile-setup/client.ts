/**
 * Conceptual — client projection from the shared contract.
 * No parallel plugin list. Import contract types from the server assembly
 * (or from a small shared `auth/contract` package in larger monorepos).
 */

import { createButterClient } from "../_aspirational"
import { contract } from "./auth"

export const authClient = createButterClient({
  contract,
  baseUrl: "/api/auth",
})

/**
 * Public surface after aliases:
 *
 *   await authClient.session.current()
 *   await authClient.session.devices()
 *   await authClient.publication.create({ name: "Weekly" })
 *   await authClient.publication.invite({ publicationId, email })
 */
declare function example() {
  return authClient.session.current()
}
