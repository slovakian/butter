import { Effect, Option, Schema } from "effect";

import { LoginStore } from '../ports/login-store.ts';
import type { Login, StoreDecodeError, StoreError, User } from '../ports/login-store.ts';
import { generateLoginToken, hashLoginSecret, parseLoginToken, verifyLoginSecret } from '../primitives/token.ts';
import type { GeneratedLoginToken } from '../primitives/token.ts';

export class InvalidTokenError extends Schema.TaggedError<InvalidTokenError>()(
  "InvalidTokenError",
  {
    message: Schema.String,
  }
) {}

export interface ValidatedLogin {
  readonly login: Login;
  readonly user: User;
}

export interface CreatedLoginResult {
  readonly token: string;
  readonly login: Login;
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;

/**
 * Flow: create a new Login for a User.
 * Generates an unguessable token (id.secret) and stores the hashed secret with sliding 30-day expiry.
 */
export const createLogin = (
  userId: string,
  options?: { readonly maxAgeMs?: number }
): Effect.Effect<
  CreatedLoginResult,
  StoreError | StoreDecodeError,
  LoginStore
> =>
  Effect.gen(function*  createLogin() {
    const store = yield* LoginStore;
    const tokenParts: GeneratedLoginToken = generateLoginToken();
    const tokenHash = hashLoginSecret(tokenParts.secret);
    const now = new Date();
    const maxAgeMs = options?.maxAgeMs ?? THIRTY_DAYS_MS;
    const expiresAt = new Date(now.getTime() + maxAgeMs);

    const login = yield* store.create({
      createdAt: now,
      expiresAt,
      id: tokenParts.id,
      tokenHash,
      userId,
    });

    return {
      login,
      token: tokenParts.token,
    };
  });

/**
 * Flow: validate a Login token.
 * 1. Parses id and secret.
 * 2. Fetches login and joined user record from the Store.
 * 3. Verifies secret in constant time.
 * 4. Rejects and cleans up expired logins.
 * 5. Applies sliding expiry (refreshes if remaining lifetime is less than 15 days).
 */
export const validateLogin = (
  token: string,
  options?: { readonly now?: Date }
): Effect.Effect<
  ValidatedLogin,
  InvalidTokenError | StoreError | StoreDecodeError,
  LoginStore
> =>
  Effect.gen(function*  validateLogin() {
    const parsed = parseLoginToken(token);

    if (!parsed) {
      return yield* new InvalidTokenError({
        message: "Malformed token format",
      });
    }

    const store = yield* LoginStore;
    const maybeRecord = yield* store.findWithUser(parsed.id);

    if (Option.isNone(maybeRecord)) {
      return yield* new InvalidTokenError({
        message: "Login not found",
      });
    }

    const record = maybeRecord.value;

    const matches = verifyLoginSecret(parsed.secret, record.login.tokenHash);

    if (!matches) {
      return yield* new InvalidTokenError({
        message: "Invalid token secret",
      });
    }

    const currentTime = options?.now ?? new Date();
    const nowMs = currentTime.getTime();
    const expiresAtMs = record.login.expiresAt.getTime();

    // Expired login: delete from store and fail
    if (nowMs >= expiresAtMs) {
      yield* store.revoke(parsed.id);

      return yield* new InvalidTokenError({
        message: "Login token expired",
      });
    }

    // Sliding window: refresh expiry if within 15 days of expiration
    if (nowMs >= expiresAtMs - FIFTEEN_DAYS_MS) {
      const refreshedExpiresAt = new Date(nowMs + THIRTY_DAYS_MS);
      yield* store.touch(parsed.id, refreshedExpiresAt);

      return {
        login: {
          ...record.login,
          expiresAt: refreshedExpiresAt,
        },
        user: record.user,
      };
    }

    return record;
  });

/**
 * Flow: revoke a Login by token (e.g. current device sign-out).
 */
export const revokeLogin = (
  token: string
): Effect.Effect<void, InvalidTokenError | StoreError, LoginStore> =>
  Effect.gen(function*  revokeLogin() {
    const parsed = parseLoginToken(token);

    if (!parsed) {
      return yield* new InvalidTokenError({
        message: "Malformed token format",
      });
    }

    const store = yield* LoginStore;
    yield* store.revoke(parsed.id);
  });

/**
 * Flow: revoke all Logins for a User (e.g. admin or sign-out everywhere).
 */
export const revokeAllUserLogins = (
  userId: string
): Effect.Effect<void, StoreError, LoginStore> =>
  Effect.gen(function*  revokeAllUserLogins() {
    const store = yield* LoginStore;
    yield* store.revokeAllForUser(userId);
  });
