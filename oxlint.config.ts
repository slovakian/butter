import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  extends: [core, vitest],
  ignorePatterns: core.ignorePatterns,
  overrides: [
    {
      files: [
        "**/*.{test,spec}.{ts,tsx,js,jsx}",
        "**/__tests__/**/*.{ts,tsx,js,jsx}",
      ],
      rules: {
        // Vite+ re-exports Vitest from `vite-plus/test`.
        "vitest/prefer-importing-vitest-globals": "off",
      },
    },
  ],
});
