import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

import appCss from "../styles.css?url";

const themeInitScript = `(function(){try{var t=localStorage.getItem('butter-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`;

const NotFound = () => (
  <main className="container mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center p-8 pt-24 text-center">
    <span className="mb-4 text-5xl">🧈</span>
    <h1 className="text-foreground text-2xl font-bold tracking-tight">
      404 - Document Not Found
    </h1>
    <p className="text-muted-foreground mt-2 text-sm">
      This section or document does not exist in the Butter specification.
    </p>
    <Link
      className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 rounded-md px-4 py-2 text-xs font-medium transition-colors"
      to="/"
    >
      Return to Reference Document
    </Link>
  </main>
);

const RootDocument = () => (
  <html className="scroll-smooth" lang="en">
    <head>
      <HeadContent />
      <script>{themeInitScript}</script>
    </head>
    <body className="bg-background text-foreground selection:bg-primary/20 selection:text-primary flex min-h-screen flex-col font-sans antialiased">
      <ThemeProvider defaultTheme="system" storageKey="butter-theme">
        <header className="border-border/60 bg-background/90 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
          <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
            <Link className="group flex items-center gap-2" to="/">
              <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                🧈
              </span>
              <span className="text-foreground text-sm font-semibold tracking-tight">
                butter
              </span>
              <Badge variant="outline">Overview</Badge>
            </Link>

            <nav className="text-muted-foreground hidden items-center gap-5 text-xs font-medium sm:flex">
              <a
                className="hover:text-foreground transition-colors"
                href="/#what-is-butter"
              >
                Overview
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="/#how-it-works"
              >
                How It Works
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="/#architecture-at-a-glance"
              >
                Architecture
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="/#project-status"
              >
                Status
              </a>
              <Link
                className="hover:text-foreground transition-colors"
                to="/config"
              >
                Configurator
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a
                className="border-border bg-muted/40 text-foreground hover:bg-accent flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
                href="https://github.com/slovakian/butter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>GitHub</span>
                <span className="text-muted-foreground">↗</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="border-border/40 text-muted-foreground border-t py-8 text-xs">
          <div className="container mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-2">
              <span>🧈</span>
              <span>
                Butter Auth — Distributed code & agent guidance you own.
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a
                className="hover:text-foreground underline underline-offset-2"
                href="https://auth.pilcrowonpaper.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pilcrow&apos;s Auth Book
              </a>
              <a
                className="hover:text-foreground underline underline-offset-2"
                href="https://effect.website"
                rel="noopener noreferrer"
                target="_blank"
              >
                Effect
              </a>
              <a
                className="hover:text-foreground underline underline-offset-2"
                href="https://github.com/slovakian/butter"
                rel="noopener noreferrer"
                target="_blank"
              >
                Repository
              </a>
            </div>
          </div>
        </footer>
      </ThemeProvider>

      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  component: RootDocument,
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
      {
        href: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        content:
          "Butter 🧈 | Public Reference Specification & Distributed Auth",
        name: "title",
      },
      {
        content:
          "Public architectural reference specification for Butter Auth. Distributed code and agent skills you own in your codebase. Inspired by Pilcrow's Auth Book and Effect v4.",
        name: "description",
      },
    ],
  }),
  notFoundComponent: NotFound,
});
