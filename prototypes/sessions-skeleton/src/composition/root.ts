import type { PGlite } from "@electric-sql/pglite";
import { Context, Effect, Layer } from "effect";

import { makePgliteLoginStore } from "../adapters/pglite-login-store.ts";
import { createLogin, revokeAllUserLogins, revokeLogin, validateLogin } from '../flows/login-flows.ts';
import type { CreatedLoginResult, InvalidTokenError, ValidatedLogin } from '../flows/login-flows.ts';
import { LoginStore } from '../ports/login-store.ts';
import type { LoginStoreService, StoreDecodeError, StoreError } from '../ports/login-store.ts';

/**
 * exposable: actions safe to expose via an Exposure (HTTP, RPC, Server Functions).
 * Every action proves itself (e.g. holds the bearer secret).
 */
export interface AuthExposable {
  readonly login: {
    readonly validate: (
      token: string,
      options?: { readonly now?: Date }
    ) => Effect.Effect<
      ValidatedLogin,
      InvalidTokenError | StoreError | StoreDecodeError
    >;
    readonly revoke: (
      token: string
    ) => Effect.Effect<void, InvalidTokenError | StoreError>;
  };
}

/**
 * internal: trusted operations callable only by the user application's backend code.
 * Never exposed directly to client requests.
 */
export interface AuthInternal {
  readonly login: {
    readonly create: (
      userId: string,
      options?: { readonly maxAgeMs?: number }
    ) => Effect.Effect<CreatedLoginResult, StoreError | StoreDecodeError>;
    readonly revokeAll: (userId: string) => Effect.Effect<void, StoreError>;
  };
}

export interface AuthService {
  readonly exposable: AuthExposable;
  readonly internal: AuthInternal;
}

export class Auth extends Context.Service<Auth, AuthService>()("butter/Auth") {}

export interface SliceDefinition {
  readonly name: string;
}

export const loginSlice = (): SliceDefinition => ({
  name: "login",
});

export interface ComposeAuthOptions {
  readonly queryable: PGlite;
  readonly slices: readonly SliceDefinition[];
  readonly overrides?: {
    readonly loginStore?: LoginStoreService;
  };
}

/**
 * Composition Root: assembles Slices, Store Adapters, and Flows into the Auth service.
 * Returns an unfinished Layer providing Auth, per Decision 1 & Decision 6 of issue #13.
 */
export const composeAuth = (options: ComposeAuthOptions): Layer.Layer<Auth> => {
  const loginStoreService: LoginStoreService =
    options.overrides?.loginStore ?? makePgliteLoginStore(options.queryable);

  const loginStoreLayer = Layer.succeed(LoginStore, loginStoreService);

  const authService: AuthService = {
    exposable: {
      login: {
        revoke: (token) =>
          revokeLogin(token).pipe(Effect.provide(loginStoreLayer)),
        validate: (token, opts) =>
          validateLogin(token, opts).pipe(Effect.provide(loginStoreLayer)),
      },
    },
    internal: {
      login: {
        create: (userId, opts) =>
          createLogin(userId, opts).pipe(Effect.provide(loginStoreLayer)),
        revokeAll: (userId) =>
          revokeAllUserLogins(userId).pipe(Effect.provide(loginStoreLayer)),
      },
    },
  };

  return Layer.succeed(Auth, authService);
};
