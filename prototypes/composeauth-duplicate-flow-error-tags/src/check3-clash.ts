import { Effect, Schema } from "effect";

import type { DuplicateTagError } from "./check2-cross-slice.ts";
import { composeAuth } from "./check2-cross-slice.ts";
import { RateLimited } from "./check3-compile-time.ts";

// Clashing error with different fields
export class OrgRateLimited extends Schema.TaggedError<OrgRateLimited>()(
  "RateLimited",
  {
    orgId: Schema.String,
  }
) {}

const sliceRateLimit = {
  actions: {
    check: Effect.fail(new RateLimited({ retryAfter: 60 })),
  },
  name: "rateLimit" as const,
};

const sliceOrg = {
  actions: {
    action: Effect.fail(new OrgRateLimited({ orgId: "org_123" })),
  },
  name: "organizations" as const,
};

// 1. Result of composeAuth has type DuplicateTagError<"RateLimited">
export const clashAuthResult = composeAuth({
  slices: [sliceRateLimit, sliceOrg] as const,
});

type IsClashError =
  typeof clashAuthResult extends DuplicateTagError<"RateLimited">
    ? true
    : false;

const assertClashCaught: IsClashError = true;

// 2. Expect a compile-time type error when trying to use it as a valid auth object
// @ts-expect-error Type 'DuplicateTagError<"RateLimited">' is missing 'slices'
export const invalidAuth: { readonly slices: any } = clashAuthResult;
