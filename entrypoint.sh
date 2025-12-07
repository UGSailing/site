#!/bin/sh
set -e

pnpm run db:migrate
pnpm run build

cp -r /app/.next/standalone/* /app/

export NODE_ENV=production

node server.js
