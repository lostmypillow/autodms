FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm -v

FROM base AS builder
WORKDIR /app
ARG BUILD_SCRIPT=build
COPY package*.json pnpm-*.yaml tsconfig.json ./
COPY frontend/package*.json ./frontend/
COPY api/package*.json ./api/
COPY shared/package*.json ./shared/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN --mount=type=cache,id=corepack,target=/root/.cache/corepack \
    pnpm -F frontend run ${BUILD_SCRIPT}

FROM nginx:stable-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
