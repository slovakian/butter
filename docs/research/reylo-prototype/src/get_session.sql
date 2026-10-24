select s.id, s.expires_at, u.id as user_id, u.email, u.name
from sessions s
join users u on u.id = s.user_id
where s.id = :id
