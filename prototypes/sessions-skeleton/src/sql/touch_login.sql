UPDATE logins
SET expires_at = $2
WHERE id = $1;
