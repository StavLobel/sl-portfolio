#!/bin/bash

# Complete Docker setup and deployment script for Hostinger VPS
set -e

echo "🐳 Complete Docker Setup and Deployment for Hostinger VPS"
echo "=========================================================="

# Check if we have the necessary secrets
if [ -z "$VPS_HOST" ] || [ -z "$VPS_USERNAME" ] || [ -z "$VPS_SSH_KEY" ]; then
    echo "❌ Missing required environment variables:"
    echo "Please set: VPS_HOST, VPS_USERNAME, VPS_SSH_KEY"
    echo ""
    echo "Example:"
    echo "export VPS_HOST='your-server-ip'"
    echo "export VPS_USERNAME='root'"
    echo "export VPS_SSH_KEY='~/.ssh/id_rsa'"
    echo "export VPS_PORT='22'"
    exit 1
fi

VPS_PORT=${VPS_PORT:-22}

echo "Server: $VPS_USERNAME@$VPS_HOST:$VPS_PORT"
echo ""

# Test SSH connection
echo "🔐 Testing SSH connection..."
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" -o ConnectTimeout=10 "$VPS_USERNAME@$VPS_HOST" "echo 'SSH connection successful!'" || {
    echo "❌ SSH connection failed. Please check your credentials."
    exit 1
}
echo "✅ SSH connection successful!"

# Step 1: Upload and run Docker setup script
echo ""
echo "📦 Step 1: Setting up Docker environment..."
scp -i "$VPS_SSH_KEY" -P "$VPS_PORT" scripts/setup-docker-vps.sh "$VPS_USERNAME@$VPS_HOST:/tmp/"
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" "$VPS_USERNAME@$VPS_HOST" "bash /tmp/setup-docker-vps.sh"

# Step 2: Build and upload Docker image
echo ""
echo "🏗️ Step 2: Building Docker image..."
docker build -t sl-portfolio:latest .
docker save sl-portfolio:latest | gzip > sl-portfolio.tar.gz

# Step 3: Upload Docker files
echo ""
echo "📤 Step 3: Uploading Docker files..."
scp -i "$VPS_SSH_KEY" -P "$VPS_PORT" sl-portfolio.tar.gz "$VPS_USERNAME@$VPS_HOST:/var/www/portfolio/"
scp -i "$VPS_SSH_KEY" -P "$VPS_PORT" docker-compose.prod.yml "$VPS_USERNAME@$VPS_HOST:/var/www/portfolio/"

# Step 4: Deploy containers
echo ""
echo "🚀 Step 4: Deploying containers..."
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" "$VPS_USERNAME@$VPS_HOST" << 'ENDSSH'
cd /var/www/portfolio

# Load the Docker image
echo "Loading Docker image..."
docker load < sl-portfolio.tar.gz

# Stop existing containers if any
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Start new containers
echo "Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for container to be healthy
echo "Waiting for container to be healthy..."
timeout 60 bash -c 'until docker ps -q -f name=sl-portfolio-prod -f health=healthy | grep -q .; do sleep 2; done' || {
    echo "Container failed to start properly"
    docker logs sl-portfolio-prod
    exit 1
}

# Test the deployment
echo "Testing deployment..."
sleep 5
if curl -f http://localhost:3001/health; then
    echo "✅ Portfolio is running successfully on port 3001"
else
    echo "❌ Health check failed"
    docker logs sl-portfolio-prod
    exit 1
fi

# Clean up
rm -f sl-portfolio.tar.gz

echo "🎉 Deployment completed successfully!"
ENDSSH

# Step 5: Final verification
echo ""
echo "🔍 Step 5: Final verification..."
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" "$VPS_USERNAME@$VPS_HOST" "docker ps | grep sl-portfolio"

# Clean up local files
rm -f sl-portfolio.tar.gz

echo ""
echo "🎊 SUCCESS! Your portfolio is now containerized and running!"
echo ""
echo "📋 What's running:"
echo "- Portfolio: http://$VPS_HOST:3001"
echo "- Traefik Dashboard: http://$VPS_HOST:8080"
echo "- Domain: https://stavlobel.com (via Traefik)"
echo ""
echo "🔧 Useful commands:"
echo "- Check containers: ssh $VPS_USERNAME@$VPS_HOST 'docker ps'"
echo "- View logs: ssh $VPS_USERNAME@$VPS_HOST 'docker logs sl-portfolio-prod'"
echo "- Restart: ssh $VPS_USERNAME@$VPS_HOST 'cd /var/www/portfolio && docker-compose -f docker-compose.prod.yml restart'"
echo ""
echo "🚀 Future deployments will be automatic via GitHub Actions!" 