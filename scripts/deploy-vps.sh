#!/bin/bash

# VPS Deployment Script
# Usage: ./scripts/deploy-vps.sh [server_ip] [username]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SERVER_IP=${1:-"YOUR_SERVER_IP"}
USERNAME=${2:-"stavlobel"}
REMOTE_DIR="/var/www/portfolio"
LOCAL_BUILD_DIR="dist"

echo -e "${GREEN}🚀 VPS Deployment Script${NC}\n"

# Check if server IP is provided
if [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    echo -e "${RED}❌ Please provide your server IP:${NC}"
    echo "Usage: ./scripts/deploy-vps.sh YOUR_SERVER_IP [username]"
    exit 1
fi

# Step 1: Build the project
echo -e "${YELLOW}📦 Building production files...${NC}"
npm run build

if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed!${NC}\n"

# Step 2: Create backup on server
echo -e "${YELLOW}💾 Creating backup on server...${NC}"
ssh $USERNAME@$SERVER_IP << EOF
    if [ -d "$REMOTE_DIR/live" ]; then
        mkdir -p $REMOTE_DIR/backups
        cp -r $REMOTE_DIR/live $REMOTE_DIR/backups/backup-\$(date +%Y%m%d-%H%M%S)
        echo "Backup created"
    else
        echo "No existing deployment found"
    fi
EOF

# Step 3: Upload files
echo -e "${YELLOW}📤 Uploading files to server...${NC}"
scp -r $LOCAL_BUILD_DIR/* $USERNAME@$SERVER_IP:$REMOTE_DIR/temp/

# Step 4: Deploy on server
echo -e "${YELLOW}🔧 Deploying on server...${NC}"
ssh $USERNAME@$SERVER_IP << EOF
    cd $REMOTE_DIR
    
    # Stop any running processes
    pm2 stop portfolio 2>/dev/null || true
    pm2 delete portfolio 2>/dev/null || true
    
    # Replace current deployment
    rm -rf live
    mv temp live
    
    # Set proper permissions
    sudo chown -R $USERNAME:$USERNAME $REMOTE_DIR
    chmod -R 755 live
    
    # Reload Nginx
    sudo systemctl reload nginx
    
    # Clean up old backups (keep last 3)
    ls -t backups/backup-* 2>/dev/null | tail -n +4 | xargs rm -rf 2>/dev/null || true
    
    echo "Deployment completed successfully!"
EOF

echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo -e "${GREEN}🌐 Your site should be available at: http://$SERVER_IP${NC}"

# Optional: Check if domain is configured
if [ ! -z "$DOMAIN" ]; then
    echo -e "${GREEN}🌐 Or at: https://$DOMAIN${NC}"
fi 