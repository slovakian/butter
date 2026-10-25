import { Effect, Schema } from "effect";
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

// ============================================================================
// Type-level duplicate tag checker across Slices / Groups
// ============================================================================

type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : false;

type AllTags<E> = E extends { readonly _tag: infer Tag extends string }
  ? Tag
  : never;

export type DuplicateTags<
  E,
  Tags extends string = AllTags<E>,
> = Tags extends any
  ? IsUnion<Extract<E, { readonly _tag: Tags }>> extends true
    ? Tags
    : never
  : never;

// Error branding for human-readable compiler errors
export interface DuplicateTagError<Tag extends string> {
  readonly __ERROR__: `Duplicate Flow Error tag "${Tag}" detected across Slices`;
}

// Extract all error types from an HttpApiGroup
export type GroupErrors<G> =
  G extends HttpApiGroup.HttpApiGroup<any, any, any>
    ? HttpApiEndpoint.Error<HttpApiGroup.Endpoints<G>>["Type"]
    : never;

// Extract all error types from a tuple of HttpApiGroups
export type AllGroupErrors<
  Groups extends readonly HttpApiGroup.HttpApiGroup<any, any, any>[],
> = Groups[number] extends infer G ? GroupErrors<G> : never;

// ============================================================================
// joinContracts helper that enforces error tag uniqueness
// ============================================================================

export const joinContracts = <
  const Groups extends readonly [
    HttpApiGroup.HttpApiGroup<any, any, any>,
    ...HttpApiGroup.HttpApiGroup<any, any, any>[],
  ],
>(
  ...groups: Groups
): [DuplicateTags<AllGroupErrors<Groups>>] extends [never]
  ? { readonly groups: Groups }
  : DuplicateTagError<DuplicateTags<AllGroupErrors<Groups>>> =>
  ({ groups }) as any;

// ============================================================================
// composeAuth helper that enforces error tag uniqueness on actions
// ============================================================================

export interface SliceDefinition<
  Name extends string,
  Actions extends Record<string, Effect.Effect<any, any, any>>,
> {
  readonly name: Name;
  readonly actions: Actions;
}

export type SliceActionErrors<S> =
  S extends SliceDefinition<any, infer Actions>
    ? Actions[keyof Actions] extends Effect.Effect<any, infer E, any>
      ? E
      : never
    : never;

export type AllSliceErrors<
  Slices extends readonly SliceDefinition<any, any>[],
> = SliceActionErrors<Slices[number]>;

export const composeAuth = <
  const Slices extends readonly [
    SliceDefinition<any, any>,
    ...SliceDefinition<any, any>[],
  ],
>(spec: {
  readonly slices: Slices;
}): [DuplicateTags<AllSliceErrors<Slices>>] extends [never]
  ? { readonly slices: Slices }
  : DuplicateTagError<DuplicateTags<AllSliceErrors<Slices>>> => spec as any;

// ============================================================================
// Test Error Classes
// ============================================================================

// RateLimited owned by rate-limit slice
export class RateLimited extends Schema.TaggedError<RateLimited>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

// Custom RateLimited defined by an app with different fields
export class RateLimitedDiffFields extends Schema.TaggedError<RateLimitedDiffFields>()(
  "RateLimited",
  {
    reason: Schema.String,
  }
) {}

// Local RateLimited declared with identical fields
export class RateLimitedIdenticalFields extends Schema.TaggedError<RateLimitedIdenticalFields>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

export class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()(
  "InvalidCredentials",
  {}
) {}

export class EmailTaken extends Schema.TaggedError<EmailTaken>()(
  "EmailTaken",
  {}
) {}

export class SecondFactorRequired extends Schema.TaggedError<SecondFactorRequired>()(
  "SecondFactorRequired",
  {}
) {}

// ============================================================================
// Scenario 1: Same class reused across Slices -> COMPILES CLEANLY
// ============================================================================

const sliceRateLimit = {
  actions: {
    check: Effect.fail(new RateLimited({ retryAfter: 60 })),
  },
  name: "rateLimit" as const,
};

const slicePassword = {
  actions: {
    // password reuses the exact same RateLimited class from rate-limit!
    signIn: Effect.fail(new InvalidCredentials()),
  },
  name: "password" as const,
};

// Composing slices where RateLimited is reused:
export const resultSameClass = composeAuth({
  slices: [sliceRateLimit, slicePassword] as const,
});

type TestSameClass = typeof resultSameClass extends { readonly slices: any }
  ? true
  : false;

const assertSameClassCompiles: TestSameClass = true;

// Also in joinContracts with HttpApiGroup:
const groupRateLimit = HttpApiGroup.make("rateLimit").add(
  HttpApiEndpoint.post("check", "/check", { error: [RateLimited] })
);

const groupPassword = HttpApiGroup.make("password").add(
  HttpApiEndpoint.post("signIn", "/signIn", {
    error: [InvalidCredentials, RateLimited],
  })
);

export const contractSameClass = joinContracts(groupRateLimit, groupPassword);

type TestContractSameClass = typeof contractSameClass extends {
  readonly groups: any;
}
  ? true
  : false;

const assertContractSameClassCompiles: TestContractSameClass = true;

// ============================================================================
// Scenario 2: Two different classes with DIFFERENT fields sharing tag
// -> TYPE ERROR NAMING THE TAG!
// ============================================================================

const sliceCustomRateLimit = {
  actions: {
    // Custom RateLimited with different fields (reason: string instead of retryAfter: number)
    check: Effect.fail(new RateLimitedDiffFields({ reason: "too fast" })),
  },
  name: "customRateLimit" as const,
};

export const resultDiffFields = composeAuth({
  slices: [sliceRateLimit, sliceCustomRateLimit] as const,
});

type TestDiffFields =
  typeof resultDiffFields extends DuplicateTagError<"RateLimited">
    ? true
    : false;

const assertDiffFieldsCaught: TestDiffFields = true;

const groupCustomRateLimit = HttpApiGroup.make("customRateLimit").add(
  HttpApiEndpoint.post("check", "/check", { error: [RateLimitedDiffFields] })
);

export const contractDiffFields = joinContracts(
  groupRateLimit,
  groupCustomRateLimit
);

type TestContractDiffFields =
  typeof contractDiffFields extends DuplicateTagError<"RateLimited">
    ? true
    : false;

const assertContractDiffFieldsCaught: TestContractDiffFields = true;

// ============================================================================
// Scenario 3: Two different classes with IDENTICAL fields sharing tag
// -> CANNOT BE DETECTED AT TYPE LEVEL (COLLAPSES)!
// ============================================================================

const sliceIdenticalRateLimit = {
  actions: {
    // Different class instance, but identical fields
    check: Effect.fail(new RateLimitedIdenticalFields({ retryAfter: 60 })),
  },
  name: "identicalRateLimit" as const,
};

export const resultIdenticalFields = composeAuth({
  slices: [sliceRateLimit, sliceIdenticalRateLimit] as const,
});

type TestIdenticalFields = typeof resultIdenticalFields extends {
  readonly slices: any;
}
  ? true
  : false;

const assertIdenticalFieldsMissedByTypeCheck: TestIdenticalFields = true;

const groupIdenticalRateLimit = HttpApiGroup.make("identicalRateLimit").add(
  HttpApiEndpoint.post("check", "/check", {
    error: [RateLimitedIdenticalFields],
  })
);

export const contractIdenticalFields = joinContracts(
  groupRateLimit,
  groupIdenticalRateLimit
);

type TestContractIdenticalFields = typeof contractIdenticalFields extends {
  readonly groups: any;
}
  ? true
  : false;

const assertContractIdenticalFieldsMissed: TestContractIdenticalFields = true;
