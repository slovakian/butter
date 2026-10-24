import { createServerFn } from "@tanstack/react-start";

export interface ButterSlice {
  description: string;
  id: string;
  name: string;
  status: string;
}

export interface ButterMeta {
  philosophy: string;
  slices: ButterSlice[];
  stats: {
    defaultSessionDurationDays: number;
    externalDeps: string[];
    invariantsGuaranteed: number;
  };
  version: string;
}

export const getButterMetaServerFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<ButterMeta> => {
    // Explicit server boundary demonstration
    await Promise.resolve();

    return {
      philosophy: "Distributed code + agent guidance, not an npm package.",
      slices: [
        {
          description:
            "Database-backed sessions (id.secret), constant-time verification, sliding 30-day expiry refreshed daily.",
          id: "sessions",
          name: "Sessions",
          status: "v1 core",
        },
        {
          description:
            "Single-use short-lived tokens for high-risk operations (password reset, email changes).",
          id: "action-sessions",
          name: "Action Sessions",
          status: "v1 core",
        },
        {
          description:
            "Argon2 password hashing, timing-safe validation, zero user enumeration leaks.",
          id: "email-password",
          name: "Email & Password",
          status: "v1 core",
        },
        {
          description:
            "Single-use verification codes consumed atomically in a single Postgres statement.",
          id: "email-verification",
          name: "Email Verification",
          status: "v1 core",
        },
        {
          description:
            "Strict linking invariants: unverified emails never auto-link to existing users.",
          id: "oauth",
          name: "OAuth (GitHub & Google)",
          status: "v1 core",
        },
      ],
      stats: {
        defaultSessionDurationDays: 30,
        externalDeps: ["@oslojs/*", "arctic", "effect"],
        invariantsGuaranteed: 24,
      },
      version: "0.1.0-alpha",
    };
  }
);
