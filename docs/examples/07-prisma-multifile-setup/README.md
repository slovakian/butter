# Prisma multi-file setup (conceptual)

Illustrates the intended Butter config DX with Prisma: **compose modules, then assemble once**.

These files are not executable. They show how an app would split auth across files instead of one Better Auth-style god-object.

```
07-prisma-multifile-setup/
  README.md          ← you are here
  db.ts              ← Prisma client
  adapter.ts         ← Butter ↔ Prisma bridge + table maps
  aliases.ts         ← model (= namespace) + method leaf aliases
  session.ts         ← augment / override for session
  publication.ts     ← extension module (org-like, domain-named)
  auth.ts            ← thin assembly only — imports the parts
  client.ts          ← browser/RSC client from contract
  rpc.ts             ← oRPC projection from same contract
```

Read `auth.ts` last. Everything else is a contribution; `auth.ts` is just the merge point.
