#!/bin/bash

# Force Restart Container Script
# Run this on your VPS to force restart the portfolio container

echo "🔄 Force Restarting Portfolio Container"
echo "======================================"
echo ""

# Navigate to portfolio directory
cd /var/www/portfolio || {
    echo "❌ /var/www/portfolio directory not found"
    exit 1
}

echo "📁 Current directory: $(pwd)"
echo ""

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans
echo ""

# Remove old images to force rebuild
echo "🗑️  Removing old images..."
docker images | grep sl-portfolio | awk '{print $3}' | xargs -r docker rmi -f
echo ""

# Pull latest changes (if using git)
echo "📥 Pulling latest changes..."
if [ -d ".git" ]; then
    git pull origin prod || echo "Git pull failed, continuing with local files"
else
    echo "No git repository found, using local files"
fi
echo ""

# Rebuild and start containers
echo "🔨 Rebuilding and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build --force-recreate
echo ""

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
timeout 60 bash -c 'until docker ps -q -f name=sl-portfolio-prod -f health=healthy | grep -q .; do sleep 2; done' || {
    echo "⚠️  Container may not be healthy, but continuing..."
}

# Check container status
echo "📊 Container Status:"
docker ps | grep sl-portfolio-prod || echo "Container not found"
echo ""

# Check container logs
echo "📋 Recent Logs:"
docker logs --tail 10 sl-portfolio-prod 2>/dev/null || echo "No logs available"
echo ""

# Test the application
echo "🧪 Testing application..."
sleep 5
if curl -f http://localhost:3001/ > /dev/null 2>&1; then
    echo "✅ Application is responding on port 3001"
else
    echo "❌ Application not responding on port 3001"
fi
echo ""

echo "🎉 Force restart completed!"
echo "🌐 Check your website: https://stavlobel.com/"
echo ""
echo "🔍 To monitor logs: docker logs -f sl-portfolio-prod" 