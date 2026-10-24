import { describe, expect, it } from "vite-plus/test";

import { fn } from "../src/index.ts";

describe(fn, () => {
  it("returns greeting", () => {
    expect(fn()).toBe("Hello, Vite+!");
  });
});
