import { Schema } from "effect";

// ============================================================================
// Mathematical / Structural Proof:
// Two different classes defined with Schema.TaggedError having identical fields
// produce structurally identical TypeScript types.
// ============================================================================

export class RateLimitedSliceA extends Schema.TaggedError<RateLimitedSliceA>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

export class RateLimitedSliceB extends Schema.TaggedError<RateLimitedSliceB>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

// 1. Instance types are mutually assignable
export type Sub1 =
  | RateLimitedSliceA
  | RateLimitedSliceB extends RateLimitedSliceA
  ? true
  : false;

export type Sub2 = RateLimitedSliceA extends
  | RateLimitedSliceA
  | RateLimitedSliceB
  ? true
  : false;

const assertSub1: Sub1 = true;
const assertSub2: Sub2 = true;

// 2. IsUnion evaluates to false: TypeScript treats the union as a single type!
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : false;

export type UnionIsSingleType = IsUnion<RateLimitedSliceA | RateLimitedSliceB>;

const assertUnionIsSingle: UnionIsSingleType = false;

// 3. Class constructors are mutually assignable
type CtorSub1 = typeof RateLimitedSliceA extends typeof RateLimitedSliceB
  ? true
  : false;

type CtorSub2 = typeof RateLimitedSliceB extends typeof RateLimitedSliceA
  ? true
  : false;

const assertCtorSub1: CtorSub1 = true;
const assertCtorSub2: CtorSub2 = true;

// 4. Tuples of constructors are mutually assignable
type TupleReusedSame = [typeof RateLimitedSliceA, typeof RateLimitedSliceA];

type TupleTwoDistinct = [typeof RateLimitedSliceA, typeof RateLimitedSliceB];

const v1: TupleReusedSame = [RateLimitedSliceA, RateLimitedSliceA];
const v2: TupleTwoDistinct = v1; // Assigns cleanly without error!
const v3: TupleReusedSame = v2; // Assigns cleanly without error!

// Conclusion:
// TypeScript's structural type system CANNOT distinguish between reusing the same
// class and declaring a second identical class with Schema.TaggedError.
// Any type check that permits reusing the same class across Slices MUST also
// permit two different classes with identical fields.
