# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-01-XX

### Added
- Initial portfolio website with React + Vite + TypeScript
- Custom green SL favicon and branding
- GitHub API integration for automatic project fetching
- LinkedIn profile picture integration
- Dark mode as default theme
- Responsive design with Tailwind CSS and shadcn-ui components
- Project sections: Home, About, Projects, Contact
- Technology detection and badges for GitHub repositories
- Smooth scroll animations and fade-in effects

### Features
- **Profile Picture**: Automatic LinkedIn profile picture fetching with initials fallback
- **Projects**: Auto-populated from GitHub repositories, sorted by creation date
- **Technologies**: Smart detection of tech stack from repository languages
- **Contact**: Email, Phone, LinkedIn, and GitHub links
- **Responsive**: Mobile-first design with modern UI components
- **Performance**: Optimized images, lazy loading, and efficient API calls

### Technical
- React 18 with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling with custom green theme
- GitHub REST API integration with rate limiting
- ESLint configuration with strict TypeScript rules
- Git workflow with conventional commits 