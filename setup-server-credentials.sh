#!/bin/bash

echo "🔐 Hostinger VPS Credentials Setup"
echo "=================================="
echo ""
echo "I'll help you set up your server credentials and run the Docker setup."
echo ""

# Collect credentials
read -p "🌐 Enter your Hostinger VPS IP address: " VPS_HOST
read -p "👤 Enter your VPS username (usually 'root'): " VPS_USERNAME
read -p "🔑 Enter your SSH private key path (e.g., ~/.ssh/id_rsa): " VPS_SSH_KEY
read -p "🚪 Enter SSH port (press Enter for default 22): " VPS_PORT

# Set defaults
VPS_PORT=${VPS_PORT:-22}

echo ""
echo "📋 Credentials Summary:"
echo "Host: $VPS_HOST"
echo "Username: $VPS_USERNAME"  
echo "SSH Key: $VPS_SSH_KEY"
echo "Port: $VPS_PORT"
echo ""

read -p "❓ Do these look correct? (y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled. Please run the script again."
    exit 1
fi

# Export credentials and run setup
echo ""
echo "�� Starting Docker setup..."
export VPS_HOST="$VPS_HOST"
export VPS_USERNAME="$VPS_USERNAME"
export VPS_SSH_KEY="$VPS_SSH_KEY"
export VPS_PORT="$VPS_PORT"

# Run the comprehensive setup script
./scripts/deploy-docker-setup.sh
