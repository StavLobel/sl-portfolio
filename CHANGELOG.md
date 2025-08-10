# Changelog

All notable changes to this project will be documented in this file.

## [v1.3.4] - 2025-08-10

### 🔧 **Deployment Fixes**

**Fixed GitHub Actions deployment workflow and local deployment scripts**

### ✨ What's Fixed
- **Container recreation issues**: Fixed problem where old containers weren't being properly replaced
- **Image caching problems**: Ensured fresh builds with `--no-cache` flag to prevent stale deployments
- **Complex workflow logic**: Simplified deployment process by removing unnecessary docker-compose complexity
- **Local deployment sync**: Updated local deployment script to match GitHub Actions workflow

### 🔧 Technical Changes
- **GitHub Actions workflow**: Streamlined to directly manage Docker containers instead of using docker-compose
- **Container management**: Proper stop/remove/start sequence to ensure clean deployments
- **Build process**: Added `--no-cache` flag to prevent using cached layers from previous builds
- **Local scripts**: Updated `scripts/deploy-docker-setup.sh` to match the new workflow approach

### 🎯 Deployment Improvements
- **Faster deployments**: Simplified workflow reduces deployment time and complexity
- **More reliable**: Direct container management eliminates docker-compose related issues
- **Better debugging**: Clearer logs and verification steps in deployment process
- **Consistent behavior**: Local and remote deployments now use the same approach

---

## [v1.3.2] - 2025-07-28

### 🎨 **UI/UX Improvements**

**Enhanced Visual Design and Deployment Workflow**

### ✨ New Features
- **Updated deployment workflow**: Fixed version number in GitHub Actions to match package.json
- **Improved badge visibility**: Changed technology badge text color from white to black for better readability
- **Simplified footer**: Removed deployment timestamp, keeping only version number for cleaner appearance

### 🔧 Technical Changes
- Updated GitHub Actions workflow to use correct version (1.3.2) in build arguments
- Modified tech-badge CSS styling to use black text (`color: #000000`) instead of white
- Simplified Footer component to display only version number without deployment timestamp
- Updated package.json version from 1.3.1 to 1.3.2

### 🎯 User Experience
- **Better badge readability**: Technology badges now have black text on green background for improved contrast
- **Cleaner footer**: Simplified version display without cluttering timestamp information
- **Consistent versioning**: Deployment workflow now properly reflects the current version

---

## [v1.3.1] - 2025-07-27

### 🐛 **Bug Fixes**

**Profile Picture Display Issue Resolved**

### Fixed
- **Profile picture not displaying**: Resolved blank profile image on website caused by failing LinkedIn API integration
- **Simplified image loading**: Replaced complex LinkedIn API calls with reliable fallback system
- **Bundle size optimization**: Removed unused LinkedIn service files reducing build size
- **Improved error handling**: Enhanced fallback mechanism for profile image loading

### Technical Changes
- Simplified `HeroSection` component to use direct environment variable or UI Avatars fallback
- Removed `src/services/linkedin.ts` and related hooks to eliminate API dependency issues
- Enhanced image error handling with proper fallback to generated avatar
- Improved build performance by removing unused dependencies

### 🔧 Performance Improvements
- Reduced JavaScript bundle size by removing unused LinkedIn API integration
- Faster page load with simplified profile image logic
- More reliable image loading with proper fallback handling

---

## [v1.3.0] - 2025-07-27

### 🐳 **Major Feature: Docker Containerization**

Complete containerization setup enabling multiple projects on the same VPS with proper isolation, monitoring, and SSL handling.

### ✨ New Features
- **Multi-stage Docker build**: Optimized production containers with nginx
- **Development containers**: Hot-reload enabled development environment
- **Traefik reverse proxy**: Professional SSL termination and domain routing
- **Health monitoring**: Built-in health checks and automatic updates with Watchtower
- **Automated deployment**: Docker-based GitHub Actions workflow

### 🏗️ Infrastructure Components
- **Production Dockerfile**: Multi-stage build with Alpine nginx
- **Development Dockerfile**: Node.js with hot-reload support
- **Docker Compose**: Separate configurations for development and production
- **Nginx optimization**: Gzip compression, security headers, caching
- **VPS setup automation**: Complete server setup script

### 🌐 Networking & Routing
- **Port allocation**: Portfolio on 3001, Traefik on 80/443/8080
- **SSL certificates**: Automatic Let's Encrypt integration
- **Domain routing**: Host-based routing via Traefik labels
- **Shared networks**: Support for multiple containerized projects

### 🔧 Configuration Files
- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Local development setup
- `docker-compose.prod.yml` - Production deployment
- `nginx.conf` - Main nginx configuration
- `docker/nginx-site.conf` - Site-specific configuration
- `scripts/setup-docker-vps.sh` - VPS automation script
- `DOCKER.md` - Comprehensive documentation

### 📦 Package.json Scripts
- `docker:build` - Build production image
- `docker:dev` - Start development environment
- `docker:prod` - Start production environment
- `docker:logs` - View container logs

### 🔒 Security Enhancements
- **Container isolation**: Separate network and filesystem namespaces
- **SSL/TLS**: Automatic HTTPS with strong security headers
- **Non-root containers**: Enhanced security posture
- **Regular updates**: Watchtower for automatic security updates

### 🚀 Deployment Benefits
- **Scalability**: Easy addition of new projects to same VPS
- **Consistency**: Identical environments across dev/staging/production
- **Monitoring**: Built-in health checks and logging
- **Rollback capability**: Easy container versioning and rollback
- **Resource efficiency**: Optimized container sizes and resource usage

### 🔄 Migration Path
- Legacy deployment workflow preserved as backup
- New Docker workflow now primary deployment method
- Seamless transition with existing domain and SSL setup

## [v1.2.1] - 2025-07-27

### 🐛 Bug Fixes
- **Project Badge Filtering**: Improved badge detection to show only technology badges
  - Added comprehensive whitelist of 100+ programming languages, frameworks, and tools
  - Excluded process/workflow badges like "Tests", "Code Quality", "Pre-commit", "Build Status"
  - Enhanced pattern matching for technology variations (e.g., "Node.js" vs "nodejs")
  - Filtered out non-technical badges (license, coverage, CI/CD indicators)

### 🔧 Technical Details
- Enhanced `extractBadgesFromReadme` method in GitHub service
- Added sophisticated filtering logic with technology keyword matching
- Improved badge parsing to focus on relevant technical stack information
- Better handling of badge text normalization and pattern recognition

## [v1.2.0] - 2025-07-27

### ✨ New Features
- **Resume Download Functionality**: Added ability to download resume in both PDF and TXT formats
- **Enhanced About Section**: Completely rewritten with personalized content about Stav's experience and background
- **Improved Hero Section**: Updated with more compelling professional description and "Full-Stack Software Engineer" title

### 📝 Content Updates
- **Personalized About Text**: Added detailed content about Stav's 5+ years of experience, technical expertise, and professional philosophy
- **Enhanced Hero Description**: Updated subtitle and description to better represent professional capabilities
- **Professional Branding**: Improved messaging to emphasize technical excellence and user experience focus

### 🛠️ Technical Improvements
- **Dual Format Resume**: Created both PDF and TXT resume files for user preference
- **Enhanced Download UX**: Added two download buttons with clear format indicators
- **Improved Button Styling**: Better visual hierarchy and responsive design for download options

### 📁 New Files
- `public/stav-lobel-resume.pdf` - Placeholder PDF resume file
- `public/stav-lobel-resume.txt` - Text-based resume file with template content

### 🔧 Developer Notes
- Resume files are placeholders and should be replaced with actual content
- PDF file contains basic PDF structure for easy replacement
- TXT file includes comprehensive template with sections for experience, education, etc.

---

## [v1.1.0] - 2025-07-27

### ✨ New Features
- **GitHub API Integration**: Automatic fetching of project data from GitHub repositories
- **Dynamic Project Badges**: Extract comprehensive technology badges from repository README files
- **LinkedIn Profile Integration**: Dynamic profile picture with fallback to initials
- **Dark Mode Default**: Set dark mode as the default theme
- **Version Display**: Show current version in footer
- **Automated Deployment**: GitHub Actions deployment to VPS on prod branch updates

### 🎨 UI/UX Enhancements
- **Professional Badges**: Replace simple language badges with comprehensive technology badges from READMEs
- **Contact Section Updates**: Added GitHub contact, removed phone number, updated email
- **Custom Branding**: Replaced Lovable logo with custom "SL" favicon
- **Project Sorting**: Sort projects by creation date (newest first)
- **Responsive Design**: Improved mobile experience and animations

### 🛠️ Technical Improvements
- **GitHub API Service**: Robust service for fetching repository data and badges
- **LinkedIn Service**: Fallback system for profile pictures with UI Avatars integration
- **Environment Variables**: Secure configuration for API tokens and profile URLs
- **Error Handling**: Comprehensive error handling for API failures and rate limits
- **TypeScript Types**: Enhanced type definitions for badges and project data

### 🔧 DevOps & Deployment
- **GitHub Actions**: Automated CI/CD pipeline with separate main/prod branches
- **VPS Deployment**: Atomic deployment strategy using temp/live directories
- **Security**: GitHub Secrets for sensitive credentials and API tokens
- **Branch Protection**: Documentation for main branch protection rules

### 📝 Documentation
- **Updated SRD**: Removed FastAPI backend requirements, simplified to frontend-only
- **Comprehensive Tasks**: Updated PROJECT_TASKS.md with completed and future tasks
- **Version Management**: Semantic versioning with npm scripts
- **Deployment Guide**: Complete setup instructions for VPS and GitHub Actions

### 🧹 Code Quality
- **Linting**: ESLint configuration with TypeScript and React rules
- **Unused Code Removal**: Cleaned up unused dependencies and components
- **Repository Cleanup**: Removed unnecessary files and scripts
- **Security Scan**: Comprehensive check for hard-coded secrets

---

## [v1.0.0] - 2025-07-27

### 🎉 Initial Release
- **Portfolio Website**: Single-page React application with modern design
- **Responsive Layout**: Mobile-first design with smooth animations
- **Dark/Light Mode**: Theme toggle with persistent preferences
- **Project Showcase**: Static project display with technology badges
- **Contact Section**: Professional contact information and social links
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Vite Build System**: Fast development and optimized production builds 