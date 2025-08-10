#!/bin/bash

# Deploy Docker setup to VPS
# This script deploys the portfolio to the VPS using Docker

set -e  # Exit on any error

echo "🚀 Starting Docker deployment to VPS..."

# Check if we're in the right directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# SSH connection details
VPS_HOST="69.62.119.109"
VPS_USER="stavlobel"
VPS_PORT="22"
PROJECT_DIR="/var/www/portfolio"

echo "📤 Uploading source code to VPS..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='.env.local' \
    --exclude='.cursor' \
    -e "ssh -p $VPS_PORT" \
    ./ "$VPS_USER@$VPS_HOST:$PROJECT_DIR/"

echo "🔧 Deploying Docker container on VPS..."
ssh -p $VPS_PORT "$VPS_USER@$VPS_HOST" << 'EOF'
    cd /var/www/portfolio
    
    echo "Stopping and removing existing container..."
    docker stop sl-portfolio-prod || true
    docker rm sl-portfolio-prod || true
    
    echo "Building new Docker image..."
    docker build -t sl-portfolio:latest --no-cache .
    
    echo "Starting new container..."
    docker run -d \
        --name sl-portfolio-prod \
        --restart unless-stopped \
        -p 3001:80 \
        sl-portfolio:latest
    
    echo "Verifying deployment..."
    sleep 5
    if docker ps | grep -q "sl-portfolio-prod"; then
        echo "✅ Deployment successful!"
        docker ps | grep sl-portfolio-prod
        echo "Container logs:"
        docker logs sl-portfolio-prod --tail 10
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
EOF

echo "🎉 Deployment completed successfully!"
echo "🌐 Your portfolio is now live at: http://69.62.119.109:3001" 