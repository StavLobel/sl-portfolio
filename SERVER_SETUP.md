# VPS Server Setup Guide

## 🚀 Initial Server Configuration

### 1. Connect to Your VPS
```bash
ssh root@YOUR_SERVER_IP
```

### 2. Create a Non-Root User
```bash
# Create new user
adduser stavlobel

# Add user to sudo group
usermod -aG sudo stavlobel

# Switch to new user
su - stavlobel
```

### 3. Set Up SSH Key Authentication
```bash
# On your local machine, generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "stavlobel@gmail.com"

# Copy your public key to server
ssh-copy-id stavlobel@YOUR_SERVER_IP
```

### 4. Secure SSH Configuration
```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Make these changes:
# PermitRootLogin no
# PasswordAuthentication no
# Port 2222 (optional - change from default 22)

# Restart SSH
sudo systemctl restart sshd
```

## 🌐 Web Server Setup

### 1. Install Nginx
```bash
sudo apt update
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Configure Firewall
```bash
# Install UFW
sudo apt install ufw -y

# Allow SSH (use your custom port if changed)
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

### 3. Install SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📦 Application Setup

### 1. Install Node.js
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 3. Create Application Directory
```bash
# Create app directory
sudo mkdir -p /var/www/portfolio
sudo chown stavlobel:stavlobel /var/www/portfolio
```

## 🔧 Nginx Configuration

### 1. Create Nginx Site Configuration
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/portfolio;
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
}
```

### 2. Enable the Site
```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 🚀 Deployment Strategy

### Option 1: Manual Deployment
```bash
# Build locally and upload
npm run build
scp -r dist/* stavlobel@YOUR_SERVER_IP:/var/www/portfolio/
```

### Option 2: Automated Deployment (Recommended)
We'll set up GitHub Actions to deploy directly to your VPS.

## 🔐 Environment Variables

Create environment file on server:
```bash
nano /var/www/portfolio/.env
```

Add your environment variables:
```bash
VITE_GITHUB_USERNAME=stavlobel
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_EXCLUDE_REPOS=.github,dotfiles
VITE_LINKEDIN_PROFILE_PIC_URL=your_linkedin_pic_url
```

## 📋 Next Steps

1. **Domain Configuration**: Point your domain to your VPS IP
2. **SSL Setup**: Run Certbot for HTTPS
3. **GitHub Actions**: Configure automated deployment
4. **Monitoring**: Set up PM2 for process management
5. **Backups**: Configure regular backups

## 🔍 Troubleshooting

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Firewall
```bash
sudo ufw status
```

## 📊 Performance Optimization

### Enable Gzip Compression
Add to Nginx config:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Enable Browser Caching
Already included in the configuration above.

---

**Ready to proceed? Let me know which VPS provider you're using and I'll help you with the specific setup!** 