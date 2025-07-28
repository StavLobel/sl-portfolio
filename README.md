# Stav Lobel - Portfolio Website

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-3.0.0-2088FF?logo=github-actions)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-24.0.0-2496ED?logo=docker)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-1.24.0-009639?logo=nginx)](https://nginx.org/)

A modern, responsive personal portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, featuring automatic GitHub integration for dynamic project display.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **GitHub Integration**: Automatic project fetching from your GitHub repositories
- **Dark Mode**: Elegant dark/light theme switching
- **Performance Optimized**: Fast loading with code splitting and optimization
- **SEO Ready**: Meta tags, structured data, and social media optimization
- **Docker Support**: Containerized deployment for easy hosting
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Deployment**: Docker, Docker Compose, GitHub Actions
- **Hosting**: VPS with Nginx and Traefik
- **API**: GitHub REST API for project data

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/StavLobel/sl-portfolio.git
cd sl-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with:
```env
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_USERNAME=your_github_username
VITE_GITHUB_EXCLUDE_REPOS=repo1,repo2
```

4. **Start development server**
```bash
npm run dev
```

Navigate to `http://localhost:8080`

### Docker Development

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop environment
docker-compose down
```

## 🚀 Deployment

### Production Deployment

The project uses GitHub Actions for automated deployment to a VPS:

1. **Set up GitHub Secrets** (see `scripts/setup-github-secrets.md`)
2. **Push to `prod` branch** to trigger deployment
3. **Monitor deployment** with provided scripts

### Manual VPS Setup

```bash
# Run the setup script
./scripts/setup-docker-vps.sh

# Deploy manually
./scripts/deploy-vps.sh your-vps-host your-username
```

## 📁 Project Structure

```
sl-portfolio/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── assets/        # Static assets
├── public/            # Public assets
├── scripts/           # Deployment and utility scripts
├── docker/            # Docker configuration
└── .github/           # GitHub Actions workflows
```

## 🔧 Configuration

### Environment Variables

- `VITE_GITHUB_TOKEN`: GitHub Personal Access Token
- `VITE_GITHUB_USERNAME`: Your GitHub username
- `VITE_GITHUB_EXCLUDE_REPOS`: Comma-separated list of repos to exclude

### GitHub Integration

The portfolio automatically fetches your public repositories and displays them with:
- Technology badges extracted from repository topics
- Project descriptions and links
- Last updated dates
- Featured project highlighting

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
docker:dev          # Start Docker development
docker:prod         # Start Docker production
```

## 🌐 Live Sites

- **Development**: http://localhost:8080
- **Production**: https://stavlobel.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Stav Lobel**