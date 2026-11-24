import ultracite from "ultracite/oxfmt";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import vitest from "ultracite/oxlint/vitest";
import { defineConfig } from "vite-plus";

// Preset order is load-bearing: core, then vitest, then anti-slop so it can
// turn off the core rules it replaces. Vitest is only used by packages/utils;
// the preset itself applies to test files. Project rules stay after the presets.
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ...ultracite,
    ignorePatterns: [
      ...ultracite.ignorePatterns,
      ".agents/**",
      ".claude/**",
      "skills-lock.json",
    ],
  },
  lint: {
    env: core.env,
    extends: [core, vitest, antiSlop],
    ignorePatterns: [...core.ignorePatterns, ".agents/**", ".claude/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    options: { typeAware: true, typeCheck: true },
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
  },
  run: {
    cache: true,
  },
});
