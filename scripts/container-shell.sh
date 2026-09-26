#!/bin/sh
set -e
cd /app

if [ ! -f node_modules/.modules.yaml ] || [ pnpm-lock.yaml -nt node_modules/.modules.yaml ]; then
    echo "[dev] installing dependencies..."
    pnpm i
fi

pnpm run db:generate

echo "[dev] ready. First time? Run: pnpm run db:migrate"
exec bash