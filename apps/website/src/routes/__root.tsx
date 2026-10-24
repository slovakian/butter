import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const NotFound = () => (
  <main className="container mx-auto flex flex-col items-center justify-center p-8 pt-24 text-center">
    <span className="mb-4 text-6xl">🧈</span>
    <h1 className="text-foreground text-3xl font-bold tracking-tight">
      404 - Not Found
    </h1>
    <p className="text-muted-foreground mt-2">
      This route does not exist in Butter.
    </p>
    <Link
      className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 rounded-full px-4 py-2 text-sm font-medium transition-colors"
      search={{ tab: "overview" }}
      to="/"
    >
      Return Home
    </Link>
  </main>
);

const RootDocument = () => (
  <html className="dark scroll-smooth" lang="en">
    <head>
      <HeadContent />
    </head>
    <body className="bg-background text-foreground min-h-screen font-sans antialiased selection:bg-amber-400/20 selection:text-amber-200">
      <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            className="group flex items-center gap-2"
            search={{ tab: "overview" }}
            to="/"
          >
            <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
              🧈
            </span>
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              butter
            </span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-300">
              v1
            </span>
          </Link>

          <nav className="text-muted-foreground hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              className="hover:text-foreground transition-colors"
              search={{ tab: "overview" }}
              to="/"
            >
              Overview
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              search={{ tab: "comparison" }}
              to="/"
            >
              vs Better Auth
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              search={{ tab: "strengths-weaknesses" }}
              to="/"
            >
              Trade-offs
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              search={{ tab: "code" }}
              to="/"
            >
              Effect Code
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              to="/slices"
            >
              Slices
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="border-border bg-card/60 text-foreground hover:bg-accent flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              href="https://github.com/slovakian/butter"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>GitHub</span>
              <span className="text-muted-foreground">↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>

      <footer className="border-border/40 bg-card/30 text-muted-foreground border-t py-8 text-center text-xs">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
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
              href="https://alchemy.run"
              rel="noopener noreferrer"
              target="_blank"
            >
              Alchemy on Cloudflare
            </a>
          </div>
        </div>
      </footer>

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
        content: "Butter 🧈 | Agent-First Distributed Auth Architecture",
        name: "title",
      },
      {
        content:
          "Distributed auth code and agent guidance you copy into and own in your repo. Pilcrow's Auth Book, Effect v4, atomic SQL, and no shared account tables.",
        name: "description",
      },
    ],
  }),
  notFoundComponent: NotFound,
});
