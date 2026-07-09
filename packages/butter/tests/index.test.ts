import { Effect } from "effect";
import { describe, expect, test } from "vite-plus/test";

import { auth } from "../src/index.ts";

describe("auth", () => {
  test("returns a string", () => {
    expect(Effect.runSync(auth)).toBe("butter");
  });
});
