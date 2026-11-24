import config from "./vite.config.ts";

// Vite+ owns format settings in vite.config.ts, which spreads ultracite/oxfmt.
// This re-export exists so `ultracite` can find an Oxfmt config. Do not add
// options here.
if (!config.fmt) {
  throw new Error("vite.config.ts is missing a fmt block");
}

export default config.fmt;
