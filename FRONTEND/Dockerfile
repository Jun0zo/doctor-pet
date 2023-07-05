## 👉 base stage
FROM node:16-alpine AS base

WORKDIR /app

RUN apk add --no-cache g++ git curl make python3 libc6-compat


## 👉 dependencies stage
FROM base as dependencies

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./

RUN yarn install


## 👉 build stage
FROM base AS builder

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build


## 👉 production stage
FROM base AS production

ENV NODE_ENV production

COPY --from=builder /app/package.json ./package.json

COPY --from=dependencies /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js


EXPOSE 13000

ENV PORT 13000

HEALTHCHECK --interval=30s --timeout=20s --retries=3 --start-period=15s \
  CMD curl -fSs 127.0.0.1:13000 || exit 1

CMD ["yarn", "start"]
