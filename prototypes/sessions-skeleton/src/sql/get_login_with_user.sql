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
