import ultraciteFmt from "ultracite/oxfmt";
import ultraciteCore from "ultracite/oxlint/core";
import ultraciteVitest from "ultracite/oxlint/vitest";
import { defineConfig } from "vite-plus";

const ignorePatterns = [
  ...new Set([
    ...(ultraciteCore.ignorePatterns ?? []),
    ...(ultraciteFmt.ignorePatterns ?? []),
    ".agent/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".continue/**",
    ".cursor/**",
    ".gemini/**",
    ".opencode/**",
    ".pi/**",
    ".roo/**",
    ".windsurf/**",
    "apps/website/src/routeTree.gen.ts",
    "apps/website/src/components/ui/**",
    "tools/oxlint/anti-slop/**",
    "prototypes/**",
  ]),
];

export default defineConfig({
  fmt: {
    ...ultraciteFmt,
    ignorePatterns,
  },
  lint: {
    extends: [ultraciteCore, ultraciteVitest],
    ignorePatterns,
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" },
      { name: "shadcn", specifier: "@shadcn/lint" },
    ],
    options: { typeAware: true, typeCheck: true },
    rules: {
      "anti-slop/no-array-filter-map": "error",
      "anti-slop/no-chained-type-assertions": "error",
      "anti-slop/no-conditional-empty-object-spread": "error",
      "anti-slop/no-known-value-widening": "error",
      "anti-slop/no-module-mocking": "error",
      "anti-slop/no-object-parameters": "error",
      "anti-slop/no-reduce-accumulator-copy": "error",
      "anti-slop/no-reflect-apply": "error",
      "anti-slop/no-reflect-get": "error",
      "anti-slop/no-runtime-typeof": "error",
      "anti-slop/no-shape-in-symbol-names": "error",
      "anti-slop/no-unknown-parameters": "error",
      "anti-slop/no-unknown-returns": "error",
      "anti-slop/no-unknown-type-aliases": "error",
      "anti-slop/no-unsafe-dictionary-type": "error",
      "anti-slop/no-widen-then-assert": "error",
      "anti-slop/require-readable-spacing": "error",
      "anti-slop/require-safety-comment-for-type-assertion": "error",
      "oxc/no-accumulating-spread": "error",
      "shadcn/no-arbitrary-values": "warn",
      "shadcn/no-raw-colors": "warn",
      "shadcn/no-restyle": "warn",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
  run: {
    cache: true,
  },
  staged: {
    "*": "vpx tools/check-token-limit.ts",
  },
});
