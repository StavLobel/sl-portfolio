# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-01-26

### Added
- **Badge Extraction System**: Automatically extracts and displays professional badges from repository README files
- **Intelligent Badge Filtering**: Excludes license, build, and generic badges for cleaner project display
- **README Content Parsing**: Fetches and parses markdown badges using regex patterns
- **Color-Aware Badge System**: Extracts colors from shields.io URLs for consistent styling
- **Fallback Technology Detection**: Falls back to language-based detection when no badges are found

### Enhanced
- **Repository Cleanup**: Removed outdated documentation and scripts
- **Comprehensive Documentation**: Updated README.md with accurate deployment instructions
- **Task Management**: Created detailed PROJECT_TASKS.md with completed and future tasks
- **Project Structure**: Improved organization and removed unnecessary files

### Fixed
- **ESLint Compliance**: Resolved regex escape character warnings
- **Badge Display Logic**: Corrected filtering logic to properly exclude unwanted badges
- **Code Quality**: Removed unused imports and variables

### Technical
- Enhanced GitHub API service with README fetching capabilities
- Improved badge extraction with regex pattern matching
- Better error handling and fallback mechanisms
- Streamlined codebase with reduced complexity

## [1.0.0] - 2025-01-XX

### Added
- Initial portfolio website with React + Vite + TypeScript
- Custom green SL favicon and branding
- GitHub API integration for automatic project fetching
- LinkedIn profile picture integration with fallback
- Dark mode as default theme
- Responsive design with Tailwind CSS and shadcn-ui components
- Project sections: Home, About, Projects, Contact
- Technology detection and badges for GitHub repositories
- Smooth scroll animations and fade-in effects
- Automated deployment via GitHub Actions to VPS
- SSL certificate and custom domain (stavlobel.com)
- Comprehensive ESLint and TypeScript configuration
- Semantic versioning with npm scripts

### Features
- **Profile Picture**: Automatic LinkedIn profile picture fetching with initials fallback
- **Projects**: Auto-populated from GitHub repositories, sorted by creation date
- **Technologies**: Smart detection of tech stack from repository languages
- **Contact**: Email, LinkedIn, and GitHub links
- **Responsive**: Mobile-first design with modern UI components
- **Performance**: Optimized images, lazy loading, and efficient API calls
- **Deployment**: Automated CI/CD pipeline with testing and linting

### Technical
- React 18 with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling with custom green theme
- GitHub REST API integration with rate limiting
- ESLint configuration with strict TypeScript rules
- Git workflow with conventional commits
- VPS hosting with Nginx, PM2, and SSL
- GitHub Actions for automated deployment

### Security
- Environment variables properly configured
- GitHub tokens with minimal permissions
- Secure SSH key authentication
- SSL certificate with Let's Encrypt 