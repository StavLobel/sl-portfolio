# Multi-stage build for React portfolio application
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Build arguments
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Labels
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.vendor="Stav Lobel" \
      org.opencontainers.image.title="Portfolio Website" \
      org.opencontainers.image.description="Personal portfolio website built with React and TypeScript"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production server with nginx
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy .htaccess rules to nginx config (we'll create a conversion script)
COPY docker/nginx-site.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 