INSERT INTO logins (id, user_id, token_hash, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, user_id, token_hash, expires_at, created_at;
