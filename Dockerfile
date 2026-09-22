# ==========================================
# STAGE 1: Build & Bundle with esbuild
# ==========================================
FROM node:24-trixie AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY frontend/package*.json ./frontend/
COPY api/ ./api/
ENV NODE_ENV=development
RUN npm ci
ARG FRONTEND_BUILD_MODE='.'
RUN npm run build --workspace=api
COPY api/src/routes/export/input.docx ./api/dist/

COPY frontend/ ./frontend/
RUN npm run build --workspace=frontend -- --mode ${FRONTEND_BUILD_MODE}
FROM gcr.io/distroless/nodejs24-debian13 AS runner

WORKDIR /app

ENV NODE_ENV=production

USER nonroot:nonroot

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json

EXPOSE 3000

CMD ["dist/index.js"]
