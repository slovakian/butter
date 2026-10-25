import { describe, expect, it } from "vite-plus/test";

import {
  EffectRpcExposure,
  EffectRpcExposureDriver,
} from "./exposures/effect-rpc.ts";
import {
  NextServerActionsDriver,
  NextServerActionsRuntime,
} from "./exposures/next-server-actions.ts";
import { runExposureInvariants } from "./invariants.ts";

describe("Exposure Driver Contract Prototype", () => {
  it("satisfies all 4 invariants against Effect RPC Exposure", async () => {
    const exposure = new EffectRpcExposure();
    const driver = new EffectRpcExposureDriver(exposure);
    const suite = await runExposureInvariants(driver);

    expect(suite.allPassed).toBe(true);
    expect(suite.results).toHaveLength(4);

    for (const res of suite.results) {
      expect(res.passed).toBe(true);
    }
  });

  it("satisfies all 4 invariants against Next.js Server Actions (with Route Handler)", async () => {
    const runtime = new NextServerActionsRuntime();
    const driver = new NextServerActionsDriver(runtime, true);
    const suite = await runExposureInvariants(driver);

    expect(suite.allPassed).toBe(true);
    expect(suite.results).toHaveLength(4);

    for (const res of suite.results) {
      expect(res.passed).toBe(true);
    }
  });

  it("identifies break point: pure Server Actions cannot perform OAuth navigations", async () => {
    const runtime = new NextServerActionsRuntime();
    const driverWithoutRoute = new NextServerActionsDriver(runtime, false);
    const suite = await runExposureInvariants(driverWithoutRoute);

    expect(suite.allPassed).toBe(false);

    const oauthRes = suite.results.find(
      (r) => r.invariant === "oauth-state-pkce-lifecycle"
    );

    expect(oauthRes?.passed).toBe(false);
    expect(oauthRes?.message).toContain("does NOT support navigations");
  });

  it("identifies break point: Next.js returns 500 on origin mismatch, while Effect RPC returns 403", async () => {
    const effectDriver = new EffectRpcExposureDriver(new EffectRpcExposure());
    const nextDriver = new NextServerActionsDriver(
      new NextServerActionsRuntime(),
      true
    );

    const effectRes = await effectDriver.invokeCall({
      action: "signIn",
      input: { email: "u@ex.com" },
      origin: "https://evil.com",
    });

    const nextRes = await nextDriver.invokeCall({
      action: "signIn",
      input: { email: "u@ex.com" },
      origin: "https://evil.com",
    });

    expect(effectRes.status).toBe(403);
    expect(nextRes.status).toBe(500);

    // Both are correctly classified as rejected by the Exposure Driver contract!
    expect(effectRes.rejected).toBe(true);
    expect(nextRes.rejected).toBe(true);
  });
});
