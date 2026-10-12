#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

COMPOSE="docker compose --env-file .env.local -f docker-compose.dev.yml"

$COMPOSE build app                 # no-op when nothing changed
$COMPOSE up --wait -d db shadowdb  # start dbs, block until healthy

# one-off container, interactive shell, ports published so `pnpm dev` works
$COMPOSE run --rm --service-ports app sh scripts/container-shell.sh