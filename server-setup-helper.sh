#!/bin/bash

# Interactive script to set up Hostinger VPS for Docker
echo "🚀 Hostinger VPS Docker Setup Helper"
echo "======================================"

# Collect server details
read -p "Enter your VPS IP address: " VPS_HOST
read -p "Enter your VPS username (usually 'root'): " VPS_USERNAME
read -p "Enter SSH port (usually 22): " VPS_PORT
read -p "Enter path to your SSH private key: " VPS_SSH_KEY

echo ""
echo "Testing SSH connection..."
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" "$VPS_USERNAME@$VPS_HOST" "echo 'Connection successful!'" || {
    echo "❌ SSH connection failed. Please check your credentials."
    exit 1
}

echo "✅ SSH connection successful!"
echo ""
echo "Uploading and running Docker setup script..."

# Upload the setup script
scp -i "$VPS_SSH_KEY" -P "$VPS_PORT" scripts/setup-docker-vps.sh "$VPS_USERNAME@$VPS_HOST:/tmp/"

# Run the setup script
ssh -i "$VPS_SSH_KEY" -p "$VPS_PORT" "$VPS_USERNAME@$VPS_HOST" "bash /tmp/setup-docker-vps.sh"

echo ""
echo "🎉 Docker setup complete!"
echo "Next steps:"
echo "1. Log out and log back in to your VPS to apply docker group changes"
echo "2. Test: ssh $VPS_USERNAME@$VPS_HOST 'docker --version'"
echo "3. Deploy your portfolio by pushing to the prod branch"
