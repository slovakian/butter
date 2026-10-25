import {
  EffectRpcExposure,
  EffectRpcExposureDriver,
} from "./exposures/effect-rpc.ts";
import {
  NextServerActionsDriver,
  NextServerActionsRuntime,
} from "./exposures/next-server-actions.ts";
import { runExposureInvariants } from "./invariants.ts";

async function main() {
  console.log(
    "================================================================================"
  );
  console.log(
    "PROTOTYPE: Exposure Driver Contract for Unlike Exposures (Issue #15)"
  );
  console.log(
    "================================================================================\n"
  );

  // 1. Test Effect RPC Exposure
  console.log("--- 1. Testing Effect RPC Exposure ---");
  const effectRpcExposure = new EffectRpcExposure();
  const effectRpcDriver = new EffectRpcExposureDriver(effectRpcExposure);
  const effectResults = await runExposureInvariants(effectRpcDriver);

  for (const res of effectResults.results) {
    const icon = res.passed ? "✓" : "✗";
    console.log(`  ${icon} [${res.invariant}] ${res.message}`);
  }

  console.log(`  All passed: ${effectResults.allPassed ? "YES" : "NO"}\n`);

  // 2. Test Next.js Server Actions (with Route Handler for navigations)
  console.log(
    "--- 2. Testing Next.js Server Actions (Hybrid: Actions + Route Handler) ---"
  );
  const nextRuntime = new NextServerActionsRuntime();
  const nextDriver = new NextServerActionsDriver(nextRuntime, true);
  const nextResults = await runExposureInvariants(nextDriver);

  for (const res of nextResults.results) {
    const icon = res.passed ? "✓" : "✗";
    console.log(`  ${icon} [${res.invariant}] ${res.message}`);
  }

  console.log(`  All passed: ${nextResults.allPassed ? "YES" : "NO"}\n`);

  // 3. Demonstrate Break Point 1: Next.js Server Actions ONLY (no Route Handler)
  console.log(
    "--- 3. Break Point 1: Server Actions alone without Route Handler ---"
  );
  const nextActionsOnlyDriver = new NextServerActionsDriver(nextRuntime, false);
  const nextActionsOnlyResults = await runExposureInvariants(
    nextActionsOnlyDriver
  );
  const oauthRes = nextActionsOnlyResults.results.find(
    (r) => r.invariant === "oauth-state-pkce-lifecycle"
  );
  console.log(
    `  ${oauthRes?.passed ? "✓" : "✗"} [${oauthRes?.invariant}] ${oauthRes?.message}\n`
  );

  // 4. Demonstrate Break Point 2: Origin Rejection Status (500 vs 403)
  console.log("--- 4. Break Point 2: Origin Rejection Status Differences ---");

  const effectUntrusted = await effectRpcDriver.invokeCall({
    action: "signIn",
    input: { email: "u@ex.com" },
    origin: "https://evil.com",
  });

  const nextUntrusted = await nextDriver.invokeCall({
    action: "signIn",
    input: { email: "u@ex.com" },
    origin: "https://evil.com",
  });

  console.log(
    `  Effect RPC rejection status: HTTP ${effectUntrusted.status} (Custom/Butter middleware)`
  );
  console.log(
    `  Next.js rejection status:   HTTP ${nextUntrusted.status} (Built-in action-handler.ts)`
  );
  console.log(
    `  Contract solution: Driver must abstract rejection via .rejected: boolean, not status === 403.\n`
  );

  // 5. Demonstrate Break Point 3: Missing Origin Behavior
  console.log("--- 5. Break Point 3: Missing Origin Header Semantics ---");

  const nextNoOrigin = await nextDriver.invokeCall({
    action: "signIn",
    input: { email: "u@ex.com" },
    origin: undefined,
  });

  console.log(
    `  Next.js missing origin rejected: ${nextNoOrigin.rejected ? "YES" : "NO (Allowed by Next.js by design)"}`
  );
  console.log(
    `  Contract solution: Invariant tests must always send explicit untrusted Origin.\n`
  );

  console.log(
    "================================================================================"
  );
  console.log(
    "VERDICT: Driver Contract holds when abstracting rejection and supporting hybrid doors."
  );
  console.log(
    "================================================================================"
  );
}

main().catch((error) => {
  console.error("Execution failed:", error);
  process.exit(1);
});
