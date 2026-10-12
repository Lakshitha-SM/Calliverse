# ==============================================================================
# CalliLab - Frontend Service Dockerfile
# Multi-stage build: Node.js Vite compiler -> High-performance Nginx runtime
# ==============================================================================

# Stage 1: Build the React + Vite single page application
FROM node:22-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve compiled assets with Nginx
FROM nginx:1.27-alpine AS runtime

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optimized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
