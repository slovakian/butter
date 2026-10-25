import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export interface GeneratedLoginToken {
  readonly token: string;
  readonly id: string;
  readonly secret: string;
}

/**
 * Pure primitive: generates an unguessable login token.
 * Token format is `${id}.${secret}` per Pilcrow's Auth Book.
 * - `id`: 16 random bytes (hex, 32 chars) as public lookup key.
 * - `secret`: 32 random bytes (base64url, 43 chars) as the authenticator.
 */
export const generateLoginToken = (): GeneratedLoginToken => {
  const id = randomBytes(16).toString("hex");
  const secret = randomBytes(32).toString("base64url");
  const token = `${id}.${secret}`;

  return { id, secret, token };
};

/**
 * Pure primitive: parses a raw token string into id and secret parts.
 * Returns null if the token structure is invalid.
 */
export const parseLoginToken = (
  token: string
): { readonly id: string; readonly secret: string } | null => {
  const dotIndex = token.indexOf(".");

  if (dotIndex === -1 || dotIndex === 0 || dotIndex === token.length - 1) {
    return null;
  }

  const id = token.slice(0, dotIndex);
  const secret = token.slice(dotIndex + 1);

  return { id, secret };
};

/**
 * Pure primitive: computes SHA-256 hash of the secret.
 */
export const hashLoginSecret = (secret: string): string => 
  createHash("sha256").update(secret).digest("hex")
;

/**
 * Pure primitive: constant-time comparison of candidate secret against stored hash.
 */
export const verifyLoginSecret = (
  candidateSecret: string,
  storedHash: string
): boolean => {
  const candidateHash = hashLoginSecret(candidateSecret);
  const a = Buffer.from(candidateHash, "hex");
  const b = Buffer.from(storedHash, "hex");

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
};
