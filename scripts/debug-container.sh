#!/bin/bash

# Debug Container Script
# Run this on your VPS to debug what's being served

echo "🔍 Debugging Portfolio Container"
echo "================================"
echo ""

# Check container details
echo "📦 Container Details:"
docker inspect sl-portfolio-prod --format='{{.Image}}' | xargs docker inspect --format='{{.RepoTags}} {{.Created}}'
echo ""

# Check what's actually being served
echo "🌐 Testing container directly:"
echo "Testing localhost:3001..."
curl -s http://localhost:3001/ | grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1 || echo "No version found in direct container access"
echo ""

# Check container logs
echo "📋 Recent Container Logs:"
docker logs --tail 20 sl-portfolio-prod
echo ""

# Check if the container is serving the right files
echo "📁 Checking container filesystem:"
docker exec sl-portfolio-prod ls -la /usr/share/nginx/html/ | head -10
echo ""

# Check the main HTML file
echo "📄 Checking main HTML file:"
docker exec sl-portfolio-prod cat /usr/share/nginx/html/index.html | grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1 || echo "No version in index.html"
echo ""

# Check if JavaScript files are being served
echo "📜 Checking JavaScript files:"
docker exec sl-portfolio-prod find /usr/share/nginx/html/ -name "*.js" | head -5
echo ""

# Check nginx configuration
echo "⚙️  Nginx Configuration:"
docker exec sl-portfolio-prod cat /etc/nginx/conf.d/default.conf
echo ""

# Test container health
echo "🏥 Container Health Check:"
docker exec sl-portfolio-prod curl -f http://localhost/ || echo "Health check failed"
echo ""

# Check environment variables
echo "🔧 Environment Variables:"
docker exec sl-portfolio-prod env | grep -E "VITE_|NODE_ENV" || echo "No VITE_ environment variables found"
echo ""

# Check if there are any build artifacts
echo "🔨 Checking build artifacts:"
docker exec sl-portfolio-prod find /usr/share/nginx/html/ -name "*.js" -exec grep -l "v1.3.1" {} \; | head -3
echo ""

echo "✅ Debug complete!"
echo ""
echo "🔍 If version is not found, try:"
echo "1. Check if the build process completed successfully"
echo "2. Verify the JavaScript bundle contains the version"
echo "3. Check browser console for JavaScript errors"
echo "4. Clear browser cache and try again" 