# Base image
FROM node:20-alpine AS base

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Builder stage
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_STORAGE_URL
ARG CANONICAL_DOMAIN

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_STORAGE_URL=$NEXT_PUBLIC_STORAGE_URL
ENV CANONICAL_DOMAIN=$CANONICAL_DOMAIN

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ARG CANONICAL_DOMAIN
ENV CANONICAL_DOMAIN=$CANONICAL_DOMAIN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public folder
COPY --from=builder /app/public ./public

# Next.js build output
COPY --from=builder /app/.next ./.next

# Dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Custom server
COPY --from=builder /app/server.js ./server.js

# Next.js config
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# src/ içindəki app, components, i18n
COPY --from=builder /app/src ./src

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]