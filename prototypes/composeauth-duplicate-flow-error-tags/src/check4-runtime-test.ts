import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

// ============================================================================
// Runtime Invariant: Flow Error tag uniqueness across the Contract
// ============================================================================

export interface FlowErrorTagClash {
  readonly tag: string;
  readonly firstLocation: {
    readonly group: string;
    readonly endpoint: string;
    readonly className: string;
  };
  readonly secondLocation: {
    readonly group: string;
    readonly endpoint: string;
    readonly className: string;
  };
}

export class FlowErrorTagClashError extends Error {
  readonly clashes: readonly FlowErrorTagClash[];

  constructor(clashes: readonly FlowErrorTagClash[]) {
    const details = clashes
      .map(
        (c) =>
          `  - Tag "${c.tag}" is defined by different classes:\n` +
          `      1) ${c.firstLocation.className} in ${c.firstLocation.group}.${c.firstLocation.endpoint}\n` +
          `      2) ${c.secondLocation.className} in ${c.secondLocation.group}.${c.secondLocation.endpoint}`
      )
      .join("\n");

    super(
      `Butter Invariant Violation: Duplicate Flow Error tag detected across Contract.\n` +
        `Every Flow Error _tag must be owned by exactly one class.\n${details}`
    );
    this.name = "FlowErrorTagClashError";
    this.clashes = clashes;
  }
}

export function extractErrorTag(s: any): string | undefined {
  const cls = s.schema ?? s;

  if (cls.fields && cls.fields._tag) {
    const tagField = cls.fields._tag;

    if (tagField.ast && "literal" in tagField.ast) {
      return String(tagField.ast.literal);
    }

    if (tagField.literal) {
      return String(tagField.literal);
    }
  }

  if (s.ast && s.ast.annotations) {
    const sentinels = s.ast.annotations["~sentinels"];

    if (Array.isArray(sentinels)) {
      const found = sentinels.find((x) => x.key === "_tag");

      if (found) {
        return String(found.literal);
      }
    }
  }

  return undefined;
}

export function assertNoFlowErrorTagClashes(
  api: HttpApi.HttpApi<any, any>
): void {
  const seen = new Map<
    string,
    { cls: any; group: string; endpoint: string; className: string }
  >();
  const clashes: FlowErrorTagClash[] = [];

  const groups = (api as any).groups as Record<
    string,
    HttpApiGroup.HttpApiGroup<any, any, any>
  >;

  for (const group of Object.values(groups)) {
    const endpoints = (group as any).endpoints as Record<
      string,
      HttpApiEndpoint.Top
    >;

    for (const endpoint of Object.values(endpoints)) {
      const errorSet = (endpoint as any).error as Set<any> | undefined;

      if (!errorSet) {
        continue;
      }

      for (const errSchema of errorSet) {
        const cls = errSchema.schema ?? errSchema;
        const tag = extractErrorTag(errSchema);

        if (!tag) {
          continue;
        }

        const className = cls.name || "AnonymousErrorClass";

        const location = {
          className,
          endpoint: endpoint.identifier,
          group: group.identifier,
        };

        const existing = seen.get(tag);

        if (existing) {
          // If the class constructor reference differs, it's two DIFFERENT classes sharing one tag!
          if (existing.cls !== cls) {
            clashes.push({
              firstLocation: {
                className: existing.className,
                endpoint: existing.endpoint,
                group: existing.group,
              },
              secondLocation: location,
              tag,
            });
          }
        } else {
          seen.set(tag, { cls, ...location });
        }
      }
    }
  }

  if (clashes.length > 0) {
    throw new FlowErrorTagClashError(clashes);
  }
}

// ============================================================================
// Test Suite: Exercising the Runtime Invariant Check
// ============================================================================

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

export function runTests(): void {
  // Test 1: Same class reused across Slices -> MUST PASS
  {
    const groupRateLimit = HttpApiGroup.make("rateLimit").add(
      HttpApiEndpoint.post("check", "/check", { error: [RateLimited] })
    );

    const groupPassword = HttpApiGroup.make("password").add(
      HttpApiEndpoint.post("signIn", "/signIn", {
        error: [InvalidCredentials, RateLimited],
      }),
      HttpApiEndpoint.post("signUp", "/signUp", {
        error: [EmailTaken, RateLimited],
      })
    );

    const api = HttpApi.make("butter").add(groupRateLimit, groupPassword);
    assertNoFlowErrorTagClashes(api);
    console.log(
      "✓ Test 1 Passed: Same class reused across Slices passes runtime check"
    );
  }

  // Test 2: Two different classes with DIFFERENT fields sharing tag -> MUST FAIL
  {
    const groupRateLimit = HttpApiGroup.make("rateLimit").add(
      HttpApiEndpoint.post("check", "/check", { error: [RateLimited] })
    );

    const groupCustom = HttpApiGroup.make("custom").add(
      HttpApiEndpoint.post("customCheck", "/customCheck", {
        error: [RateLimitedDiffFields],
      })
    );

    const api = HttpApi.make("butter").add(groupRateLimit, groupCustom);

    let threw = false;

    try {
      assertNoFlowErrorTagClashes(api);
    } catch (e) {
      threw = true;
      if (e instanceof FlowErrorTagClashError) {
        if (e.clashes[0].tag === "RateLimited") {
          console.log(
            "✓ Test 2 Passed: Different fields sharing tag throws FlowErrorTagClashError"
          );
        } else {
          throw new Error("Test 2: Wrong tag in error", { cause: e });
        }
      } else {
        throw e;
      }
    }

    if (!threw) {
      throw new Error("Test 2: Expected assertNoFlowErrorTagClashes to throw!");
    }
  }

  // Test 3: Two different classes with IDENTICAL fields sharing tag -> MUST FAIL
  {
    const groupRateLimit = HttpApiGroup.make("rateLimit").add(
      HttpApiEndpoint.post("check", "/check", { error: [RateLimited] })
    );

    const groupIdentical = HttpApiGroup.make("identical").add(
      HttpApiEndpoint.post("identicalCheck", "/identicalCheck", {
        error: [RateLimitedIdenticalFields],
      })
    );

    const api = HttpApi.make("butter").add(groupRateLimit, groupIdentical);

    let threw = false;

    try {
      assertNoFlowErrorTagClashes(api);
    } catch (e) {
      threw = true;
      if (e instanceof FlowErrorTagClashError) {
        if (e.clashes[0].tag === "RateLimited") {
          console.log(
            "✓ Test 3 Passed: Identical fields in separate classes sharing tag throws FlowErrorTagClashError (caught at runtime where typecheck failed!)"
          );
        } else {
          throw new Error("Test 3: Wrong tag in error", { cause: e });
        }
      } else {
        throw e;
      }
    }

    if (!threw) {
      throw new Error("Test 3: Expected assertNoFlowErrorTagClashes to throw!");
    }
  }

  // Test 4: Two classes sharing tag inside one action -> MUST FAIL
  {
    const groupClashAction = HttpApiGroup.make("clash").add(
      HttpApiEndpoint.post("action", "/action", {
        error: [RateLimited, RateLimitedIdenticalFields],
      })
    );

    const api = HttpApi.make("butter").add(groupClashAction);

    let threw = false;

    try {
      assertNoFlowErrorTagClashes(api);
    } catch (error) {
      threw = true;
      if (error instanceof FlowErrorTagClashError) {
        console.log(
          "✓ Test 4 Passed: Two classes sharing tag in one action throws FlowErrorTagClashError"
        );
      } else {
        throw error;
      }
    }

    if (!threw) {
      throw new Error("Test 4: Expected assertNoFlowErrorTagClashes to throw!");
    }
  }
}

runTests();
