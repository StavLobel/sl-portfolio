#!/bin/bash

# Script to setup Docker and docker-compose on Hostinger VPS
# Run this script on your VPS to prepare it for Docker deployments

set -e

echo "🐳 Setting up Docker environment on VPS..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📋 Installing required packages..."
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common

# Add Docker's official GPG key
echo "🔑 Adding Docker GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "📂 Adding Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt update

# Install Docker Engine
echo "🐳 Installing Docker Engine..."
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add current user to docker group
echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

# Install Docker Compose
echo "🛠️ Installing Docker Compose..."
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create symbolic link
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Start and enable Docker service
echo "🚀 Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

# Create project directory
echo "📁 Creating project directory..."
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio

# Create shared network for reverse proxy
echo "🌐 Creating shared Docker network..."
docker network create web || echo "Network 'web' already exists"

# Install Traefik (reverse proxy) for managing multiple projects
echo "🔄 Setting up Traefik reverse proxy..."
mkdir -p /var/www/traefik
cat > /var/www/traefik/docker-compose.yml << EOF
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Traefik dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/etc/traefik/traefik.yml:ro
      - ./dynamic.yml:/etc/traefik/dynamic.yml:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - web

networks:
  web:
    external: true
EOF

# Create Traefik configuration
cat > /var/www/traefik/traefik.yml << EOF
global:
  checkNewVersion: false
  sendAnonymousUsage: false

api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entrypoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: web
  file:
    filename: /etc/traefik/dynamic.yml
    watch: true

certificatesResolvers:
  letsencrypt:
    acme:
      email: stavlobel@gmail.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
EOF

# Create dynamic configuration
cat > /var/www/traefik/dynamic.yml << EOF
# Dynamic configuration
http:
  middlewares:
    default-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 31536000

    secure-headers:
      headers:
        accessControlAllowMethods:
          - GET
          - OPTIONS
          - PUT
        accessControlMaxAge: 100
        hostsProxyHeaders:
          - "X-Forwarded-Host"
        referrerPolicy: "same-origin"
EOF

# Create acme.json file with correct permissions
mkdir -p /var/www/traefik/letsencrypt
touch /var/www/traefik/letsencrypt/acme.json
chmod 600 /var/www/traefik/letsencrypt/acme.json

# Start Traefik
cd /var/www/traefik
docker-compose up -d

echo "✅ Docker environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Log out and log back in to apply docker group changes"
echo "2. Verify Docker installation: docker --version"
echo "3. Verify Docker Compose: docker-compose --version"
echo "4. Check Traefik dashboard: http://your-server-ip:8080"
echo "5. Deploy your portfolio using the GitHub Actions workflow"
echo ""
echo "🔧 Useful commands:"
echo "  - View running containers: docker ps"
echo "  - View all containers: docker ps -a"
echo "  - View logs: docker logs <container-name>"
echo "  - Stop all containers: docker stop \$(docker ps -q)"
echo "  - Clean up: docker system prune -a" 