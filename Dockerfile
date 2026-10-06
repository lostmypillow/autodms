FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app

COPY package*.json pnpm-*.yaml tsconfig.json ./
COPY frontend/package*.json ./frontend/
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN --mount=type=cache,id=corepack,target=/root/.cache/corepack \
    pnpm -F backend build

COPY api/src/routes/export/input.docx ./api/dist/

FROM gcr.io/distroless/nodejs24-debian13 AS runner

WORKDIR /app

ENV NODE_ENV=production

USER nonroot:nonroot

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json

EXPOSE 3000

CMD ["dist/index.js"]
