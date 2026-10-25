import { Context, Schema } from 'effect';
import type { Effect, Option } from 'effect';

/**
 * Flexible timestamp schema accepting either native Date or ISO string (e.g. from Reylo/SQLite),
 * normalizing to a JavaScript Date object.
 */
export const TimestampSchema = Schema.Union([
  Schema.Date,
  Schema.DateFromString,
]);

/**
 * Raw database row shape returned by canonical SQL for logins.
 */
export const LoginRow = Schema.Struct({
  created_at: TimestampSchema,
  expires_at: TimestampSchema,
  id: Schema.String,
  token_hash: Schema.String,
  user_id: Schema.String,
});

export type LoginRow = typeof LoginRow.Type;

/**
 * Raw database row shape returned by canonical SQL join with users table.
 */
export const LoginWithUserRow = Schema.Struct({
  created_at: TimestampSchema,
  expires_at: TimestampSchema,
  id: Schema.String,
  token_hash: Schema.String,
  user_created_at: TimestampSchema,
  user_email: Schema.String,
  user_id: Schema.String,
});

export type LoginWithUserRow = typeof LoginWithUserRow.Type;

/**
 * Domain entity: Login (Session renamed to Login under the Rename Map).
 */
export interface Login {
  readonly id: string;
  readonly userId: string;
  readonly tokenHash: string;
  readonly expiresAt: Date;
  readonly createdAt: Date;
}

/**
 * Domain entity: User.
 */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly createdAt: Date;
}

export interface LoginWithUser {
  readonly login: Login;
  readonly user: User;
}

/**
 * Tagged errors for store operations and Port-boundary decoding failures.
 */
export class StoreError extends Schema.TaggedError<StoreError>()("StoreError", {
  cause: Schema.optional(Schema.Unknown),
  message: Schema.String,
}) {}

export class StoreDecodeError extends Schema.TaggedError<StoreDecodeError>()(
  "StoreDecodeError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
  }
) {}

export interface CreateLoginInput {
  readonly id: string;
  readonly userId: string;
  readonly tokenHash: string;
  readonly expiresAt: Date;
  readonly createdAt: Date;
}

/**
 * The Store Port interface for Login.
 * Operation-shaped, matching canonical SQL statements.
 */
export interface LoginStoreService {
  readonly create: (
    input: CreateLoginInput
  ) => Effect.Effect<Login, StoreError | StoreDecodeError>;

  readonly findWithUser: (
    id: string
  ) => Effect.Effect<
    Option.Option<LoginWithUser>,
    StoreError | StoreDecodeError
  >;

  readonly touch: (
    id: string,
    expiresAt: Date
  ) => Effect.Effect<void, StoreError>;

  readonly revoke: (id: string) => Effect.Effect<void, StoreError>;

  readonly revokeAllForUser: (
    userId: string
  ) => Effect.Effect<void, StoreError>;
}

export class LoginStore extends Context.Service<
  LoginStore,
  LoginStoreService
>()("butter/LoginStore") {}
