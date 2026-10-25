# PROTOTYPE (throwaway): can composeAuth reject duplicate Flow Error tags at the type level?

For [Prototype: can composeAuth reject duplicate Flow Error tags at the type level?](https://github.com/slovakian/butter/issues/46). Never merged.

Versions: `effect@4.0.6`, TypeScript 7.0.2, Node 24.22.1.

```sh
# Type check all prototype files (all assertions, @ts-expect-error tests)
./node_modules/.pnpm/node_modules/.bin/tsc -p prototypes/composeauth-duplicate-flow-error-tags

# Run the Invariant runtime test
node --experimental-strip-types prototypes/composeauth-duplicate-flow-error-tags/src/check4-runtime-test.ts
```

## Layout

- `src/proof-structural-indistinguishability.ts`: Structural proof showing that two distinct classes defined via `Schema.TaggedError` with identical fields produce mutually assignable types, making them indistinguishable at the type level.
- `src/check1-action-union.ts`: Duplicate tag checks inside a single action (union vs tuple of schemas).
- `src/check2-cross-slice.ts`: Duplicate tag checks across Slices in `composeAuth` and `joinContracts` (Contract Root).
- `src/check3-compile-time.ts`: 10-Slice benchmark measuring type-check time and instantiations.
- `src/check3-clash.ts`: Verifies readable compiler error `DuplicateTagError<"RateLimited">` when an error tag clashes.
- `src/check4-runtime-test.ts`: Shipped Invariant-style runtime test that walks the live Contract's error schemas and enforces reference equality on class constructors.

## Results: All 4 Questions Answered

### 1. Same class in two Slices → compiles?

**YES (Compiles cleanly).** When `RateLimited` is owned by `rate-limit` and reused by `password`, `emailCode`, `oauth`, etc., `Extract<AllErrors, { _tag: "RateLimited" }>` extracts a single type. `IsUnion` evaluates to `false`, so both `composeAuth` and `joinContracts` compile cleanly without error.

### 2. Two classes, same tag, in different Slices → readable type error naming the tag?

**CONDITIONALLY.**

- **Different fields (e.g. `{ retryAfter: number }` vs `{ reason: string }`): YES.** `Extract<AllErrors, { _tag: "RateLimited" }>` evaluates to a multi-member union. `IsUnion` is `true`, producing a branded type error: `DuplicateTagError<"RateLimited">`.
- **Identical fields (e.g. `{ retryAfter: number }` or empty `{}`): NO (DISPROVEN).** In TypeScript's structural type system, `typeof RateLimitedA` and `typeof RateLimitedB` are identical types. The union `RateLimitedA | RateLimitedB` collapses to `RateLimitedA`. TypeScript has no nominal tracking of `Schema.TaggedError` classes unless branded. Since most auth errors have empty or identical fields (`InvalidCredentials`, `EmailTaken`, `Unauthorized`, `SessionExpired`), **the type check fails silently for the most common clash cases.**

### 3. Two classes, same tag, inside one action's error union → type error?

**YES (via action schema tuple), PARTIALLY (via return union).**

- Inside the Flow's return type `Effect<A, E1 | E2, R>`: Different fields trigger `DuplicateTagsInUnion<E>`. Identical fields collapse.
- Inside `call(id, { error: [E1, E2] })`: Because `error` is a tuple of schemas, `DuplicateTagsInTuple` inspects elements by tuple index and rejects duplicate tags with a readable error, even if the classes have identical fields or are the same class accidentally repeated.

### 4. Cost to type-check time with ~10 Slices?

**NEGLIGIBLE (25ms).** Tested with 10 Slices (`core`, `rate-limit`, `email`, `password`, `email-code`, `oauth`, `oauth-github`, `oauth-google`, `two-factor`, `organizations`):

- `Check time`: **0.025s (25ms)**
- `Total time`: **0.062s**
- `Instantiations`: ~79k
- `Memory used`: ~127MB

## Verdict: Fallback Shipped Invariant Test Wins

Because the type-level check **cannot** detect clashing classes with identical or empty fields (which represents the vast majority of auth errors), relying on a type-level check creates a false sense of security.

The **shipped Invariant-style test** (`check4-runtime-test.ts`):

1. Walks `HttpApi.groups -> endpoints -> endpoint.error`.
2. Inspects `s.schema ?? s` to get the actual JavaScript class constructor reference.
3. Enforces `existing.cls === current.cls` for matching tags.
4. Correctly allows the exact same class reused across 10+ Slices.
5. Catches all clashes: different fields, identical fields, and empty fields `{}`.
6. Runs in **< 1ms** in vitest/node with 0 compilation overhead.
7. Produces an actionable error message naming the conflicting classes and endpoints.
