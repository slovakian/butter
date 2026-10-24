#!/bin/sh
# Start a throwaway real Postgres cluster for race.mjs (no Docker needed).
# usage: ./start-postgres.sh <data-dir> [port]   then
#        DATABASE_URL=postgres://postgres@127.0.0.1:<port>/postgres node race.mjs postgres
# stop:  pg_ctl -D <data-dir> stop
set -e
DIR="$1"
PORT="${2:-55423}"
BIN="${PG_BIN:-$(dirname "$(command -v pg_ctl)")}"
"$BIN/initdb" -D "$DIR" -U postgres -A trust > /dev/null
"$BIN/pg_ctl" -D "$DIR" -l "$DIR.log" -w \
  -o "-p $PORT -c unix_socket_directories= -c listen_addresses=127.0.0.1 -c max_connections=50" start > /dev/null
echo "postgres://postgres@127.0.0.1:$PORT/postgres"
