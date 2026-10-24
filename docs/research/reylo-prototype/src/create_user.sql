insert into users (id, email, name)
values (:id::uuid, :email, :name)
returning id, email, name, created_at
