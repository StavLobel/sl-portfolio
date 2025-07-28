# Stav Lobel - Portfolio Website

A modern, responsive personal portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, featuring automatic GitHub integration for dynamic project display.

## 🚀 Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **GitHub Integration**: Automatically fetches and displays projects from GitHub
- **Technology Detection**: Smart badge generation based on repository languages
- **Smooth Animations**: Fade-ins, transitions, and smooth scrolling
- **Modern UI**: Clean, futuristic design with Slytherin-green accents
- **Automated Deployment**: GitHub Actions CI/CD pipeline

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn-ui components
- **API**: GitHub REST API integration
- **Deployment**: GitHub Actions, VPS (Nginx, PM2)

## 📋 Prerequisites

- Node.js 18+ and npm
- GitHub Personal Access Token (for API access)

## 🚀 Quick Start

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
   ```bash
   VITE_GITHUB_USERNAME=your_github_username
   VITE_GITHUB_TOKEN=your_github_token
   VITE_GITHUB_EXCLUDE_REPOS=.github,dotfiles
   ```

4. **Add your profile picture**
   Place your profile picture in the `public/` directory as `profile-picture.jpg`:
   ```bash
   # Copy your profile picture to the public directory
   cp your-profile-picture.jpg public/profile-picture.jpg
   ```
   Recommended specifications:
   - Size: 400x400 pixels or larger
   - Format: JPG, PNG, or WebP
   - File size: Under 500KB

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Run TypeScript validation
- `npm run check-all` - Run type-check and lint

## 📦 Deployment

The project uses GitHub Actions for automated deployment to a VPS when pushing to the `prod` branch.

### Deployment Process:
1. Make changes on `main` branch
2. Test locally with `npm run dev`
3. Push to `prod` branch:
   ```bash
   git checkout prod
   git merge main
   git push origin prod
   ```
4. GitHub Actions automatically deploys to VPS

### Manual Deployment:
Use the included script for manual deployment:
```bash
./scripts/deploy-vps.sh YOUR_SERVER_IP [username]
```

## 🌐 Live Site

- **Production**: https://stavlobel.com
- **Development**: http://localhost:8080

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Stav Lobel
