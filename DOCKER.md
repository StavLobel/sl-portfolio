# Docker Containerization Guide

This guide covers how to run the portfolio application using Docker containers for both development and production environments.

## 🐳 Overview

The portfolio is containerized using Docker with the following architecture:

- **Development**: Hot-reload enabled container for local development
- **Production**: Multi-stage build with optimized nginx-based container
- **Reverse Proxy**: Traefik for handling multiple projects and SSL termination
- **Monitoring**: Watchtower for automatic updates

## 📁 Docker Files Structure

```
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development container
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
├── nginx.conf              # Main nginx configuration
├── docker/
│   └── nginx-site.conf     # Site-specific nginx config
└── scripts/
    └── setup-docker-vps.sh # VPS Docker setup script
```

## 🚀 Quick Start

### Local Development

1. **Start development environment:**
   ```bash
   # Create .env.local with your environment variables
   cp .env.example .env.local
   
   # Start development container
   docker-compose up -d
   ```

2. **Access the application:**
   - Portfolio: http://localhost:3000
   - Hot reload is enabled for development

3. **Stop development environment:**
   ```bash
   docker-compose down
   ```

### Production Deployment

1. **Manual build and run:**
   ```bash
   # Build production image
   docker build -t sl-portfolio:latest .
   
   # Run production container
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Automated deployment** (GitHub Actions):
   - Push to `prod` branch triggers automatic Docker deployment

## 🏗️ VPS Setup

### Initial Server Setup

1. **Run the setup script on your VPS:**
   ```bash
   # Upload and run the setup script
   scp scripts/setup-docker-vps.sh user@your-vps:/tmp/
   ssh user@your-vps
   bash /tmp/setup-docker-vps.sh
   ```

2. **This script will:**
   - Install Docker and Docker Compose
   - Setup Traefik reverse proxy
   - Create necessary networks and directories
   - Configure SSL certificates with Let's Encrypt

### Project Structure on VPS

```
/var/www/
├── portfolio/              # This project
│   ├── docker-compose.prod.yml
│   └── sl-portfolio.tar.gz
├── traefik/               # Reverse proxy
│   ├── docker-compose.yml
│   ├── traefik.yml
│   ├── dynamic.yml
│   └── letsencrypt/
└── project2/              # Future projects
    └── docker-compose.yml
```

## 🌐 Networking

### Port Allocation

- **Portfolio**: 3001 (internal container port 80)
- **Traefik Dashboard**: 8080
- **HTTP**: 80 (handled by Traefik)
- **HTTPS**: 443 (handled by Traefik)

### Domain Routing

Traefik handles routing based on domain names:
- `stavlobel.com` → Portfolio container
- Future projects can use subdomains or different domains

## 🔧 Configuration

### Environment Variables

The production container doesn't require environment variables as all secrets are built into the static files during the GitHub Actions build process.

### Health Checks

The production container includes health checks:
- **Endpoint**: `/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

### Security Features

1. **Nginx Security Headers**
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: enabled

2. **SSL/TLS**
   - Automatic SSL certificates via Let's Encrypt
   - HTTP to HTTPS redirection
   - Strong SSL configuration

3. **Container Security**
   - Non-root user in container
   - Minimal attack surface with Alpine Linux
   - Regular security updates via Watchtower

## 📊 Monitoring

### Watchtower

Watchtower automatically updates containers when new images are available:
- **Check Interval**: Every hour
- **Cleanup**: Automatically removes old images
- **Notifications**: Logs to container logs

### Logs

View container logs:
```bash
# Portfolio application logs
docker logs sl-portfolio-prod

# Traefik logs
docker logs traefik

# All containers
docker-compose -f docker-compose.prod.yml logs
```

## 🛠️ Maintenance

### Updates

1. **Automatic Updates** (Recommended):
   - Push to `prod` branch
   - GitHub Actions builds and deploys automatically

2. **Manual Updates**:
   ```bash
   cd /var/www/portfolio
   docker-compose -f docker-compose.prod.yml pull
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Backup

```bash
# Backup container data
docker run --rm -v portfolio-logs:/data -v $(pwd):/backup alpine tar czf /backup/portfolio-logs-backup.tar.gz /data

# Backup container image
docker save sl-portfolio:latest | gzip > portfolio-backup.tar.gz
```

### Cleanup

```bash
# Remove unused containers, networks, images
docker system prune -a

# Remove old portfolio images (keep latest 2)
docker images sl-portfolio --format "table {{.ID}}\t{{.Tag}}" | tail -n +3 | awk '{print $1}' | xargs docker rmi
```

## 🐛 Troubleshooting

### Common Issues

1. **Container fails to start**:
   ```bash
   docker logs sl-portfolio-prod
   docker-compose -f docker-compose.prod.yml ps
   ```

2. **SSL certificate issues**:
   ```bash
   docker logs traefik
   # Check acme.json permissions
   ls -la /var/www/traefik/letsencrypt/
   ```

3. **Port conflicts**:
   ```bash
   # Check what's using ports
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   ```

### Performance Monitoring

```bash
# Container resource usage
docker stats

# System resources
htop
df -h
```

## 🔄 Adding New Projects

To add additional projects to the same VPS:

1. **Create project directory**:
   ```bash
   mkdir -p /var/www/new-project
   ```

2. **Create docker-compose.yml** with unique:
   - Container names
   - Port numbers
   - Traefik labels with different domains/subdomains

3. **Deploy using the same pattern**:
   ```bash
   cd /var/www/new-project
   docker-compose up -d
   ```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🆘 Support

For issues or questions:
1. Check container logs first
2. Verify Traefik configuration
3. Test network connectivity
4. Review GitHub Actions logs for deployment issues 