import { Schema } from "effect";

// Helper to check if a type is a union
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : false;

// All unique tags in union E
type AllTags<E> = E extends { readonly _tag: infer Tag extends string }
  ? Tag
  : never;

// Find duplicate tags in an error union E
export type DuplicateTagsInUnion<
  E,
  Tags extends string = AllTags<E>,
> = Tags extends any
  ? IsUnion<Extract<E, { readonly _tag: Tags }>> extends true
    ? Tags
    : never
  : never;

// Helper to extract the _tag from a Schema class or instance
export type ExtractTag<S> = S extends {
  readonly Type: { readonly _tag: infer Tag extends string };
}
  ? Tag
  : S extends { readonly _tag: infer Tag extends string }
    ? Tag
    : never;

// Check a tuple of Schema classes for duplicate tags
export type DuplicateTagsInTuple<
  T extends readonly any[],
  Seen extends string = never,
> = T extends readonly [infer Head, ...infer Tail]
  ? ExtractTag<Head> extends Seen
    ? ExtractTag<Head>
    : DuplicateTagsInTuple<Tail, Seen | ExtractTag<Head>>
  : never;

// --- Test Classes ---

export class RateLimited extends Schema.TaggedError<RateLimited>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

export class RateLimitedDiffFields extends Schema.TaggedError<RateLimitedDiffFields>()(
  "RateLimited",
  {
    reason: Schema.String,
  }
) {}

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

// 1. Inside an action's error union (Effect<Success, ErrorUnion, R>)
// Case 1a: Union of different classes with DIFFERENT fields, same tag
type ActionErrorsDiff =
  | InvalidCredentials
  | RateLimited
  | RateLimitedDiffFields;

type ClashingTagDiff = DuplicateTagsInUnion<ActionErrorsDiff>;
// ClashingTagDiff is "RateLimited"!

// Case 1b: Union of different classes with IDENTICAL fields, same tag
type ActionErrorsIdentical =
  | InvalidCredentials
  | RateLimited
  | RateLimitedIdenticalFields;

type ClashingTagIdentical = DuplicateTagsInUnion<ActionErrorsIdentical>;
// ClashingTagIdentical is `never` because RateLimited | RateLimitedIdenticalFields collapses to RateLimited!

// 2. Inside call({ error: [...] }) schema tuple
// Case 2a: Two different classes with different fields
type TupleDiff = [
  typeof InvalidCredentials,
  typeof RateLimited,
  typeof RateLimitedDiffFields,
];

type TupleClashDiff = DuplicateTagsInTuple<TupleDiff>;
// TupleClashDiff is "RateLimited"!

// Case 2b: Two different classes with identical fields
type TupleIdentical = [
  typeof InvalidCredentials,
  typeof RateLimited,
  typeof RateLimitedIdenticalFields,
];

type TupleClashIdentical = DuplicateTagsInTuple<TupleIdentical>;
// TupleClashIdentical is "RateLimited"!

// Case 2c: Same class accidentally duplicated in one action
type TupleRedundant = [
  typeof InvalidCredentials,
  typeof RateLimited,
  typeof RateLimited,
];

type TupleClashRedundant = DuplicateTagsInTuple<TupleRedundant>;
// TupleClashRedundant is "RateLimited"!

// Case 2d: No duplicates
type TupleOk = [typeof InvalidCredentials, typeof RateLimited];

type TupleClashOk = DuplicateTagsInTuple<TupleOk>;
// TupleClashOk is `never`!

// Assertions:
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

const a1: Equals<ClashingTagDiff, "RateLimited"> = true;
const a2: Equals<ClashingTagIdentical, never> = true; // Fails to detect at union level because union collapses!
const a3: Equals<TupleClashDiff, "RateLimited"> = true;
const a4: Equals<TupleClashIdentical, "RateLimited"> = true; // Detected at schema tuple level!
const a5: Equals<TupleClashRedundant, "RateLimited"> = true;
const a6: Equals<TupleClashOk, never> = true;
