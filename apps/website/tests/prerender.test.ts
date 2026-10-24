import { describe, expect, it } from "vite-plus/test";

import { shouldPrerenderPath } from "../vite.config.ts";

describe(shouldPrerenderPath, () => {
  it("allows root and document section paths to be prerendered", () => {
    expect(shouldPrerenderPath("/")).toBeTruthy();
    expect(shouldPrerenderPath("/#how-it-works")).toBeTruthy();
    expect(shouldPrerenderPath("/slices")).toBeTruthy();
  });

  it("filters out the /config route and any subpaths from prerendering", () => {
    expect(shouldPrerenderPath("/config")).toBeFalsy();
    expect(shouldPrerenderPath("/config/")).toBeFalsy();
    expect(shouldPrerenderPath("/config/details")).toBeFalsy();
  });
});
