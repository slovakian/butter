# Each Slice owns its Ports; there is no shared "account" concept

Only User and Session are shared across Slices. Every other piece of auth data belongs to the Slice that introduces it and sits behind that Slice's own Store: the password Slice owns Password Credentials, the OAuth Slice owns Provider Identities, and future Slices (passkeys, TOTP) will own their own. Physical layout is an Adapter choice: the canonical SQL defaults to one table per Sign-in Method so each Slice migrates on its own, but Pilcrow-style columns on the user table are equally valid, and the Invariant tests do not depend on layout.

## Considered Options

- A polymorphic `account` table (Better Auth): rejected because every Sign-in Method must bend to one shared shape, which is the single-model coupling Butter exists to avoid.
- Columns on the user table as the only layout (Pilcrow's examples): kept as an allowed layout, not the default, because each new Slice would have to alter a shared table and multiple OAuth providers fit awkwardly.
