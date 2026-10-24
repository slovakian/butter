import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export const shouldPrerenderPath = (path: string): boolean =>
  !path.startsWith("/config");

export default defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        crawlLinks: true,
        enabled: true,
        filter: ({ path }) => shouldPrerenderPath(path),
      },
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});
