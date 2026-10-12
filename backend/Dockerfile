# ==============================================================================
# CalliLab - Backend Service Dockerfile
# Production-ready multi-stage container build with security hardening
# ==============================================================================

FROM node:22-alpine AS runtime

# Install curl for container health check
RUN apk add --no-cache curl

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --only=production --silent && npm cache clean --force

# Copy application source code
COPY . .

# Ensure upload directory exists and has proper permissions
RUN mkdir -p uploads && chown -R node:node /usr/src/app

# Run as non-privileged system user for security hardening
USER node

# Expose backend REST API port
EXPOSE 5000

# Container Healthcheck probe leveraging existing /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
