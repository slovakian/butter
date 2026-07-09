import { defineConfig } from "vite-plus";

import fmt from "./oxfmt.config.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt,
  lint: {
    // Ultracite rule presets live in oxlint.config.ts (Oxlint config priority).
    // Vite+ requires type-aware options and its plugin in the root vite config.
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
  run: {
    cache: true,
  },
});
