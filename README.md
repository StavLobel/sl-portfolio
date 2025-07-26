# Stav Lobel - Portfolio Website

A modern, responsive personal portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, featuring automatic GitHub integration for dynamic project display.

## 🚀 Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **GitHub Integration**: Automatically fetches and displays projects from GitHub
- **Technology Detection**: Smart badge generation based on repository languages
- **Smooth Animations**: Fade-ins, transitions, and smooth scrolling
- **Modern UI**: Clean, futuristic design with Slytherin-green accents

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn-ui components
- **API**: GitHub REST API integration
- **Deployment**: Docker, GitHub Actions, Hostinger VPS

## 📋 Prerequisites

- Node.js 18+ and npm
- GitHub Personal Access Token (for API access)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sl-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your GitHub Personal Access Token
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Deployment

The project uses GitHub Actions for automated deployment to a Hostinger VPS via Docker Compose.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Stav Lobel
