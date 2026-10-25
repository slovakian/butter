import type { PGlite } from "@electric-sql/pglite";
import { Effect, Layer, Option, Schema } from "effect";

import { LoginRow, LoginStore, LoginWithUserRow, StoreDecodeError, StoreError } from '../ports/login-store.ts';
import type { CreateLoginInput, Login, LoginStoreService, LoginWithUser } from '../ports/login-store.ts';

// Canonical SQL statements (in an installed app, loaded from .sql files or template literals)
const INSERT_LOGIN_SQL = `
INSERT INTO logins (id, user_id, token_hash, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, user_id, token_hash, expires_at, created_at;
`.trim();

const GET_LOGIN_WITH_USER_SQL = `
SELECT
  l.id,
  l.user_id,
  l.token_hash,
  l.expires_at,
  l.created_at,
  u.email as user_email,
  u.created_at as user_created_at
FROM logins l
JOIN users u ON l.user_id = u.id
WHERE l.id = $1;
`.trim();

const TOUCH_LOGIN_SQL = `
UPDATE logins
SET expires_at = $2
WHERE id = $1;
`.trim();

const DELETE_LOGIN_SQL = `
DELETE FROM logins
WHERE id = $1;
`.trim();

const DELETE_USER_LOGINS_SQL = `
DELETE FROM logins
WHERE user_id = $1;
`.trim();

const decodeLoginRow = Schema.decodeUnknownEffect(LoginRow);
const decodeLoginWithUserRow = Schema.decodeUnknownEffect(LoginWithUserRow);

export const makePgliteLoginStore = (db: PGlite): LoginStoreService => (
  {
    create: (input: CreateLoginInput) =>
      Effect.gen(function* () {
        const result = yield* Effect.tryPromise({
          try:  async () =>
            db.query(INSERT_LOGIN_SQL, [
              input.id,
              input.userId,
              input.tokenHash,
              input.expiresAt,
              input.createdAt,
            ]),
          catch: (err) =>
            new StoreError({
              message: "Failed to insert login",
              cause: err,
            }),
        });

        const firstRow = result.rows[0];
        if (!firstRow) {
          return yield* new StoreError({
            message: "Insert login returned no rows",
          });
        }

        const decoded = yield* decodeLoginRow(firstRow).pipe(
          Effect.mapError(
            (err) =>
              new StoreDecodeError({
                message: "Failed to decode inserted login row",
                cause: err,
              })
          )
        );

        const login: Login = {
          id: decoded.id,
          userId: decoded.user_id,
          tokenHash: decoded.token_hash,
          expiresAt: decoded.expires_at,
          createdAt: decoded.created_at,
        };
        return login;
      }),

    findWithUser: (id: string) =>
      Effect.gen(function* () {
        const result = yield* Effect.tryPromise({
          try:  async () => db.query(GET_LOGIN_WITH_USER_SQL, [id]),
          catch: (err) =>
            new StoreError({
              message: "Failed to query login with user",
              cause: err,
            }),
        });

        const firstRow = result.rows[0];
        if (!firstRow) {
          return Option.none();
        }

        const decoded = yield* decodeLoginWithUserRow(firstRow).pipe(
          Effect.mapError(
            (err) =>
              new StoreDecodeError({
                message: "Failed to decode login with user row",
                cause: err,
              })
          )
        );

        const loginWithUser: LoginWithUser = {
          login: {
            id: decoded.id,
            userId: decoded.user_id,
            tokenHash: decoded.token_hash,
            expiresAt: decoded.expires_at,
            createdAt: decoded.created_at,
          },
          user: {
            id: decoded.user_id,
            email: decoded.user_email,
            createdAt: decoded.user_created_at,
          },
        };

        return Option.some(loginWithUser);
      }),

    touch: (id: string, expiresAt: Date) =>
      Effect.tryPromise({
        try:  async () => db.query(TOUCH_LOGIN_SQL, [id, expiresAt]),
        catch: (err) =>
          new StoreError({
            message: "Failed to update login expiry",
            cause: err,
          }),
      }).pipe(Effect.asVoid),

    revoke: (id: string) =>
      Effect.tryPromise({
        try:  async () => db.query(DELETE_LOGIN_SQL, [id]),
        catch: (err) =>
          new StoreError({
            message: "Failed to delete login",
            cause: err,
          }),
      }).pipe(Effect.asVoid),

    revokeAllForUser: (userId: string) =>
      Effect.tryPromise({
        try:  async () => db.query(DELETE_USER_LOGINS_SQL, [userId]),
        catch: (err) =>
          new StoreError({
            message: "Failed to delete logins for user",
            cause: err,
          }),
      }).pipe(Effect.asVoid),
  }
);

export const makePgliteLoginStoreLayer = (
  db: PGlite
): Layer.Layer<LoginStore> =>
  Layer.succeed(LoginStore, makePgliteLoginStore(db));
