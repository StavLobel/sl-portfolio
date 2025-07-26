# PROJECT TASKS

A complete roadmap for building and refining the Stav Lobel Personal Portfolio Website. Check off each item as you complete it!

---

## 1. Project Structure & Cleanup
- [x] Remove unused Lovable/shadcn-ui boilerplate files and assets
- [x] Organize `src/components`, `sections`, `ui`, `assets`, `lib` folders
- [ ] Replace placeholder images and resume with real assets
- [x] Ensure all component and file names are personal and descriptive
- [x] Update README with proper project documentation
- [x] Add environment variables configuration

## 2. Design & Theming
- [ ] Review and refine Tailwind config for Slytherin-green theme
- [ ] Ensure dark/light mode toggle works and is styled
- [ ] Apply consistent spacing, typography, and color usage
- [ ] Use shadcn-ui components where appropriate
- [ ] Add smooth scroll and fade-in animations

## 3. Section Implementation
### Home
- [ ] Display name and profile photo
- [ ] Add anchor to top of page
- [ ] Add intro tagline and call-to-action buttons

### About
- [ ] Write a short, personal bio
- [ ] Add a button to download PDF resume

### Projects
- [ ] Display project cards with:
  - [ ] Project name
  - [ ] Short description
  - [ ] Tech stack badges
  - [ ] GitHub/live links
- [ ] Make projects editable after Google login (API integration)

### Contact
- [ ] List contact details (email, LinkedIn, etc.)
- [ ] Add anchor navigation

## 4. GitHub Integration & Project Management
- [ ] Set up GitHub Personal Access Token for API access
- [ ] Create GitHub API service for fetching repositories
- [ ] Implement automatic project fetching from GitHub
- [ ] Add technology detection and badge generation
- [ ] Create repository filtering and visibility controls
- [ ] Add caching mechanism for API responses

## 5. GitHub API Integration
- [ ] Implement GitHub REST API client
- [ ] Fetch user repositories with metadata:
  - [ ] Repository names and descriptions
  - [ ] Repository languages and technology stack
  - [ ] README content for enhanced descriptions
  - [ ] Repository URLs and visibility settings
- [ ] Create technology badge mapping system
- [ ] Implement client-side caching for API responses
- [ ] Add error handling and loading states

## 6. Testing
- [ ] Add unit tests for frontend components
- [ ] Add integration tests for GitHub API integration
- [ ] Add unit tests for technology detection logic
- [ ] Add security checks for API token handling
- [ ] Add linting (ESLint for TS/React)

## 7. CI/CD & Deployment
- [ ] Set up GitHub Actions workflow:
  - [ ] Run ESLint for TypeScript/React code quality
  - [ ] Run frontend unit/integration tests
  - [ ] Build Docker image for frontend
  - [ ] Deploy via Docker Compose to Hostinger VPS
- [ ] Configure Docker Compose for frontend and reverse-proxy
- [ ] Set up environment variables for GitHub API token

## 8. Final Polish
- [ ] Replace all placeholder content with real info
- [ ] Test responsiveness on all devices
- [ ] Optimize images and assets
- [ ] Review accessibility (a11y)
- [ ] Add meta tags and SEO basics
- [ ] Write/Update README

---

**Future Enhancements**
- [ ] Add contact form (with SMTP/email integration)
- [ ] Build admin panel for project visibility management
- [ ] Enhanced technology detection (framework detection, dependency analysis)
- [ ] Add analytics dashboard
- [ ] Repository filtering and sorting options
- [ ] Manual project override capabilities 