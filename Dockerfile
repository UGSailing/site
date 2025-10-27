FROM docker.io/library/node:24-alpine AS base

# See https://github.com/nodejs/docker-node/tree/b4117f9333#nodealpine
RUN apk add --no-cache libc6-compat

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app


FROM base as builder

RUN corepack enable pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . .
RUN pnpm run db:generate
RUN pnpm run build


FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public/ ./public/

# Note: only works if nextjs is configured to produce a standalone output.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static/ ./.next/static/

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["node", "server.js"]
