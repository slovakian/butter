import config from "./vite.config.ts";

// Vite+ owns lint settings in vite.config.ts, which extends
// ultracite/oxlint/core, ultracite/oxlint/vitest, and ultracite/oxlint/anti-slop.
// This re-export exists so `ultracite` can find an Oxlint config. Do not add
// rules here.
if (!config.lint) {
  throw new Error("vite.config.ts is missing a lint block");
}

export default config.lint;
