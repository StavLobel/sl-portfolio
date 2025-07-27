# Changelog

All notable changes to this project will be documented in this file.

## [v1.2.1] - 2024-12-19

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

## [v1.2.0] - 2024-12-19

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

## [v1.1.0] - 2024-12-19

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

## [v1.0.0] - 2024-12-19

### 🎉 Initial Release
- **Portfolio Website**: Single-page React application with modern design
- **Responsive Layout**: Mobile-first design with smooth animations
- **Dark/Light Mode**: Theme toggle with persistent preferences
- **Project Showcase**: Static project display with technology badges
- **Contact Section**: Professional contact information and social links
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Vite Build System**: Fast development and optimized production builds 