FROM docker.io/library/node:24-alpine

# See https://github.com/nodejs/docker-node/tree/b4117f9333#nodealpine
RUN apk add --no-cache libc6-compat curl

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN corepack enable pnpm

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . .

ENV NODE_ENV=production


EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["/bin/sh", "entrypoint.sh"]
