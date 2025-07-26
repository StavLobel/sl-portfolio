#!/bin/bash

# Hostinger VPS Setup Script
# Run this on your VPS as root

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Hostinger VPS Setup Script${NC}\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Please run this script as root${NC}"
    exit 1
fi

# Step 1: Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✅ System updated${NC}\n"

# Step 2: Create user account
echo -e "${YELLOW}👤 Creating user account...${NC}"
if id "stavlobel" &>/dev/null; then
    echo "User stavlobel already exists"
else
    adduser --gecos "" stavlobel
    usermod -aG sudo stavlobel
    echo -e "${GREEN}✅ User stavlobel created and added to sudo group${NC}"
fi
echo ""

# Step 3: Install essential packages
echo -e "${YELLOW}📦 Installing essential packages...${NC}"
apt install -y nginx nodejs npm certbot python3-certbot-nginx ufw curl wget git
echo -e "${GREEN}✅ Packages installed${NC}\n"

# Step 4: Configure firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable
echo -e "${GREEN}✅ Firewall configured${NC}\n"

# Step 5: Create application directory
echo -e "${YELLOW}📁 Creating application directory...${NC}"
mkdir -p /var/www/portfolio
chown stavlobel:stavlobel /var/www/portfolio
chmod 755 /var/www/portfolio
echo -e "${GREEN}✅ Application directory created${NC}\n"

# Step 6: Configure Nginx
echo -e "${YELLOW}🌐 Configuring Nginx...${NC}"

# Create Nginx site configuration
cat > /etc/nginx/sites-available/portfolio << 'EOF'
server {
    listen 80;
    server_name 69.62.119.109;
    
    root /var/www/portfolio/live;
    index index.html;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx
systemctl enable nginx
echo -e "${GREEN}✅ Nginx configured${NC}\n"

# Step 7: Install PM2 globally
echo -e "${YELLOW}📦 Installing PM2...${NC}"
npm install -g pm2
echo -e "${GREEN}✅ PM2 installed${NC}\n"

# Step 8: Set up SSH key authentication
echo -e "${YELLOW}🔑 Setting up SSH key authentication...${NC}"
mkdir -p /home/stavlobel/.ssh
chown stavlobel:stavlobel /home/stavlobel/.ssh
chmod 700 /home/stavlobel/.ssh

# Create authorized_keys file
touch /home/stavlobel/.ssh/authorized_keys
chown stavlobel:stavlobel /home/stavlobel/.ssh/authorized_keys
chmod 600 /home/stavlobel/.ssh/authorized_keys

echo -e "${GREEN}✅ SSH directory created${NC}"
echo -e "${YELLOW}⚠️  You'll need to add your SSH public key to /home/stavlobel/.ssh/authorized_keys${NC}\n"

# Step 9: Secure SSH configuration
echo -e "${YELLOW}🔒 Securing SSH configuration...${NC}"
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd
echo -e "${GREEN}✅ SSH secured${NC}\n"

# Step 10: Create deployment script
echo -e "${YELLOW}📝 Creating deployment script...${NC}"
cat > /var/www/portfolio/deploy.sh << 'EOF'
#!/bin/bash
cd /var/www/portfolio

# Create backup
if [ -d "live" ]; then
    mkdir -p backups
    cp -r live backups/backup-$(date +%Y%m%d-%H%M%S)
fi

# Update deployment
rm -rf live
mv temp live

# Set permissions
chown -R stavlobel:stavlobel /var/www/portfolio
chmod -R 755 live

# Reload Nginx
systemctl reload nginx

# Clean up old backups (keep last 3)
ls -t backups/backup-* 2>/dev/null | tail -n +4 | xargs rm -rf 2>/dev/null || true

echo "Deployment completed successfully!"
EOF

chmod +x /var/www/portfolio/deploy.sh
chown stavlobel:stavlobel /var/www/portfolio/deploy.sh
echo -e "${GREEN}✅ Deployment script created${NC}\n"

# Step 11: Display system information
echo -e "${GREEN}🎉 VPS Setup Complete!${NC}\n"
echo -e "${YELLOW}📋 System Information:${NC}"
echo "IP Address: 69.62.119.109"
echo "User: stavlobel"
echo "Application Directory: /var/www/portfolio"
echo "Nginx Status: $(systemctl is-active nginx)"
echo "Firewall Status: $(ufw status | head -1)"

echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Add your SSH public key to /home/stavlobel/.ssh/authorized_keys"
echo "2. Test connection: ssh stavlobel@69.62.119.109"
echo "3. Configure GitHub Actions secrets"
echo "4. Deploy your portfolio!"

echo -e "\n${GREEN}🚀 Your VPS is ready for deployment!${NC}" 