#!/bin/bash

# Server Status Check Script
# Run this on your VPS to check the current deployment status

echo "🔍 Portfolio Server Status Check"
echo "================================"
echo ""

# Check if Docker is running
echo "🐳 Docker Status:"
if command -v docker &> /dev/null; then
    docker --version
    docker info --format "{{.ServerVersion}}" 2>/dev/null || echo "Docker not running"
else
    echo "❌ Docker not installed"
fi
echo ""

# Check running containers
echo "📦 Running Containers:"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" | grep -E "(sl-portfolio|portfolio)" || echo "No portfolio containers found"
echo ""

# Check all containers (including stopped)
echo "📦 All Portfolio Containers:"
docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.CreatedAt}}" | grep -E "(sl-portfolio|portfolio)" || echo "No portfolio containers found"
echo ""

# Check container logs
echo "📋 Recent Container Logs:"
if docker ps -q -f name=sl-portfolio-prod | grep -q .; then
    echo "Last 20 lines of sl-portfolio-prod logs:"
    docker logs --tail 20 sl-portfolio-prod 2>/dev/null || echo "No logs available"
else
    echo "Container sl-portfolio-prod not running"
fi
echo ""

# Check Docker images
echo "🖼️  Available Images:"
docker images | grep -E "(sl-portfolio|portfolio)" || echo "No portfolio images found"
echo ""

# Check Docker Compose status
echo "🎯 Docker Compose Status:"
if [ -f "/var/www/portfolio/docker-compose.prod.yml" ]; then
    cd /var/www/portfolio
    docker-compose -f docker-compose.prod.yml ps
else
    echo "❌ docker-compose.prod.yml not found in /var/www/portfolio/"
fi
echo ""

# Check nginx status
echo "🌐 Nginx Status:"
if command -v nginx &> /dev/null; then
    systemctl status nginx --no-pager -l || echo "Nginx not running via systemctl"
else
    echo "❌ Nginx not installed"
fi
echo ""

# Check port usage
echo "🔌 Port Usage:"
netstat -tlnp | grep -E ":80|:443|:3001" || echo "No relevant ports found"
echo ""

# Check disk space
echo "💾 Disk Space:"
df -h /var/www/portfolio 2>/dev/null || df -h /
echo ""

# Check recent deployment files
echo "📁 Recent Files in /var/www/portfolio:"
if [ -d "/var/www/portfolio" ]; then
    ls -la /var/www/portfolio/ | head -10
else
    echo "❌ /var/www/portfolio directory not found"
fi
echo ""

# Check environment variables
echo "🔧 Environment Variables in Container:"
if docker ps -q -f name=sl-portfolio-prod | grep -q .; then
    docker exec sl-portfolio-prod env | grep -E "VITE_|NODE_ENV" || echo "No VITE_ environment variables found"
else
    echo "Container not running"
fi
echo ""

echo "✅ Status check complete!"
echo ""
echo "🔧 To restart the deployment:"
echo "cd /var/www/portfolio"
echo "docker-compose -f docker-compose.prod.yml down"
echo "docker-compose -f docker-compose.prod.yml up -d --force-recreate"
echo ""
echo "🔍 To check container health:"
echo "docker exec sl-portfolio-prod curl -f http://localhost/ || echo 'Container not healthy'" 