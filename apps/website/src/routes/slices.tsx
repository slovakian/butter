import {
  Link,
  createFileRoute,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getButterMetaServerFn } from "@/server/butter-meta";

const slicesSearchSchema = z.object({
  slice: z.string().optional(),
});

interface SliceDetailInfo {
  invariants: string[];
  ports: string[];
  sqlContract: string;
}

const SLICE_DETAILS = {
  "action-sessions": {
    invariants: [
      "Short-lived single-use token bound to one User and one sensitive action",
      "Created only after fresh verification (e.g., password confirmation)",
      "Atomically consumed upon sensitive action completion",
    ],
    ports: ["ActionSessionStore (issueActionToken, consumeActionToken)"],
    sqlContract:
      "CREATE TABLE action_sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, action TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL);",
  },
  "email-password": {
    invariants: [
      "Passwords hashed using Argon2id with OWASP-recommended memory parameters",
      "Timing attack resistant verification (constant work on non-existent users)",
      "No email enumeration via sign-in or registration error messages",
    ],
    ports: [
      "PasswordCredentialStore (savePassword, findPasswordByUserId)",
      "RateLimiter",
    ],
    sqlContract:
      "CREATE TABLE password_credentials (user_id TEXT PRIMARY KEY REFERENCES users(id), password_hash TEXT NOT NULL);",
  },
  "email-verification": {
    invariants: [
      "Verification codes are single-use and expire within 15 minutes",
      "Code consumption is atomic with email_verified status update",
      "Rate limited per email and per IP address",
    ],
    ports: [
      "EmailVerificationStore (createCode, consumeCodeAtomically)",
      "EmailSender",
    ],
    sqlContract:
      "CREATE TABLE email_verification_codes (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, code_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL);",
  },
  oauth: {
    invariants: [
      "State and PKCE code_verifier validated with cryptographic randomness",
      "Unverified email from provider is NEVER auto-linked to an existing account",
      "Manual linking requires a fresh Action Session",
    ],
    ports: ["ProviderIdentityStore (linkProvider, findUserByProviderId)"],
    sqlContract:
      "CREATE TABLE provider_identities (provider TEXT NOT NULL, provider_user_id TEXT NOT NULL, user_id TEXT NOT NULL, PRIMARY KEY (provider, provider_user_id));",
  },
  sessions: {
    invariants: [
      "Session token is id.secret, with a 32-byte constant-time secret",
      "Secret is stored only as SHA-256 hash in Postgres",
      "Sliding 30-day expiry refreshed at most once per day",
      "Server-side revocation by session ID or all user sessions",
    ],
    ports: [
      "SessionStore (createSession, findSessionById, deleteSession, updateExpiry)",
    ],
    sqlContract:
      "CREATE TABLE sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, secret_hash BYTEA NOT NULL, expires_at TIMESTAMPTZ NOT NULL);",
  },
} satisfies Record<string, SliceDetailInfo>;

const isKnownSliceId = (id: string): id is keyof typeof SLICE_DETAILS =>
  Object.hasOwn(SLICE_DETAILS, id);

const getSliceDetail = (id: string): SliceDetailInfo | undefined => {
  if (isKnownSliceId(id)) {
    return SLICE_DETAILS[id];
  }

  return undefined;
};

const SlicesPage = () => {
  const meta = useLoaderData({ from: "/slices" });
  const search = useSearch({ from: "/slices" });
  const navigate = useNavigate({ from: "/slices" });

  const activeSliceId =
    search.slice === undefined || search.slice === ""
      ? (meta.slices[0]?.id ?? "sessions")
      : search.slice;

  const selectedSlice =
    meta.slices.find((s) => s.id === activeSliceId) ?? meta.slices[0];

  const sliceDetail =
    selectedSlice === undefined ? undefined : getSliceDetail(selectedSlice.id);

  const handleSelectSlice = (id: string) => {
    void navigate({
      search: { slice: id },
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              className="text-muted-foreground hover:text-foreground text-xs"
              search={{ tab: "overview" }}
              to="/"
            >
              ← Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-xs font-medium text-amber-300">Slices</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Butter Slices
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Installable units of auth functionality. Each Slice owns its Ports,
            Stores, and canonical SQL.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Slice Selector */}
        <div className="space-y-3">
          <div className="text-muted-foreground px-1 text-xs font-semibold tracking-wider uppercase">
            Available Slices
          </div>
          {meta.slices.map((slice) => {
            const isSelected = slice.id === activeSliceId;

            return (
              <button
                className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-amber-400/40 bg-amber-400/10 shadow-sm"
                    : "border-border/40 bg-card/40 hover:bg-card/70"
                }`}
                key={slice.id}
                onClick={() => {
                  handleSelectSlice(slice.id);
                }}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm font-semibold">
                    {slice.name}
                  </span>
                  <Badge
                    className="text-[10px]"
                    variant={isSelected ? "default" : "secondary"}
                  >
                    {slice.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed">
                  {slice.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Slice Details */}
        <div className="space-y-6 lg:col-span-2">
          {selectedSlice === undefined ? null : (
            <Card className="border-border/60 bg-card/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                    <span>🧈</span>
                    <span>{selectedSlice.name} Slice</span>
                  </CardTitle>
                  <Badge
                    className="border-amber-400/30 text-amber-300"
                    variant="outline"
                  >
                    {selectedSlice.status}
                  </Badge>
                </div>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {selectedSlice.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {sliceDetail === undefined ? null : (
                  <>
                    <div>
                      <h4 className="text-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                        Security Invariants
                      </h4>
                      <div className="space-y-2">
                        {sliceDetail.invariants.map((inv) => (
                          <div
                            className="border-border/40 bg-background/50 flex items-start gap-2.5 rounded-xl border p-3 text-xs leading-relaxed"
                            key={inv}
                          >
                            <span className="shrink-0 font-bold text-amber-400">
                              ✓
                            </span>
                            <span className="text-foreground">{inv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                        Ports (Abstract Interface)
                      </h4>
                      <div className="space-y-2">
                        {sliceDetail.ports.map((port) => (
                          <div
                            className="border-border/40 bg-background/50 rounded-xl border p-3 font-mono text-xs text-zinc-300"
                            key={port}
                          >
                            {port}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                        Canonical SQL Contract (Postgres)
                      </h4>
                      <pre className="border-border/40 overflow-x-auto rounded-2xl border bg-stone-950 p-4 font-mono text-xs text-amber-200">
                        {sliceDetail.sqlContract}
                      </pre>
                    </div>
                  </>
                )}

                <div className="border-border/40 flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    Install with dynamic registry:{" "}
                    <code className="text-foreground">
                      shadcn add https://butter.procka.org/r/{selectedSlice.id}
                      .json
                    </code>
                  </div>
                  <Link search={{ tab: "code" }} to="/">
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant="outline"
                    >
                      View Effect Code
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/slices")({
  component: SlicesPage,
  loader: async () => await getButterMetaServerFn(),
  validateSearch: slicesSearchSchema,
});
