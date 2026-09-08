# ==========================================
# STAGE 1: Build & Bundle with esbuild
# ==========================================
FROM node:24-trixie AS builder
WORKDIR /app

# 1. Copy root and workspace package manifests
COPY package*.json ./
COPY api/package*.json ./api/
#COPY frontend/package*.json ./frontend/
# Add this line if aws/ is a workspace or has a package.json:
COPY aws/package*.json ./aws/
COPY core/package*.json ./core/

# 2. Install dependencies
RUN npm ci

# 3. Copy ALL required source directories (ADDED aws/)
COPY api/ ./api/
#COPY frontend/ ./frontend/
COPY ../aws ./aws/
COPY ../core ./core/

# 4. Build api
RUN npm run build --workspace=api
ENV NODE_ENV=development
# 5. Build frontend
#RUN npm run build --workspace=frontend -- --mode development
# ==========================================
# STAGE 2: Distroless Production Runtime
# ==========================================
FROM gcr.io/distroless/nodejs24-debian13 AS runner

WORKDIR /app

ENV NODE_ENV=production

# Distroless images include a built-in non-root user named "nonroot" (UID 65532)
USER nonroot:nonroot

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json

EXPOSE 3000

# Distroless Node image automatically invokes 'node' behind the scenes.
# The CMD argument directly passes your entry point script file to Node.
CMD ["dist/index.js"]
