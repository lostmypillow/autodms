# ==========================================
# STAGE 1: Build & Bundle with esbuild
# ==========================================
FROM node:24-trixie AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY frontend/package*.json ./frontend/
COPY api/ ./api/
COPY shared/ ./shared/
ENV NODE_ENV=development
RUN npm ci

RUN npm run build --workspace=api

COPY frontend/ ./frontend/
RUN npm run build --workspace=frontend -- --mode development
FROM gcr.io/distroless/nodejs24-debian13 AS runner

WORKDIR /app

ENV NODE_ENV=production

USER nonroot:nonroot

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json

EXPOSE 3000

CMD ["dist/index.js"]
