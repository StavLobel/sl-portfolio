# System Requirements Document (SRD)

## Project Title
**Stav Lobel - Personal Portfolio Website**

---

## 1. Overview
A personal portfolio website for **Stav Lobel**, a software engineer. This is a single-page application built using **React** with **Vite**, **TypeScript**, **Tailwind CSS**, and **shadcn-ui**. The site showcases personal information, GitHub projects, and contact details, with a focus on responsiveness, smooth user experience, and automatic project fetching from GitHub.

The site will be deployed via **GitHub Actions** to a **Hostinger server** using **Docker Compose**.

---

## 2. Functional Requirements

### 2.1 Page Structure
The site will include the following sections:

- **Home**: Displays name and profile picture; anchors to top of page.
- **About**: A short bio + a button to download a PDF resume.
- **Projects**: Main section; shows GitHub projects with:
  - Project name
  - Short description
  - Badges for tech stack (e.g., Python, JS, Selenium, Flutter)
  - Editable after Google login
- **Contact**: Bottom of page with contact details (email, LinkedIn, etc.)

### 2.2 Animations
- Smooth scroll navigation between sections
- Fade-ins and transitions to enhance user experience
- Light/Dark mode toggle in top navigation

### 2.3 Project Management
- **Automatic GitHub Integration**: Projects are automatically fetched from GitHub repositories
- **Technology Detection**: Automatically detects and displays technology badges based on repository languages and dependencies
- **Real-time Updates**: Projects section updates automatically when new repositories are added to GitHub
- **Manual Override**: Optional ability to manually override project descriptions or hide specific repositories

---

## 3. Technical Requirements

### 3.1 Frontend
- **Framework & Stack**: React + Vite + TypeScript + Tailwind CSS + shadcn-ui
- **Design**:
  - Fully responsive (desktop + mobile)
  - Clean, slick, futuristic style with smooth animations
  - Navigation bar: Home | About | Projects | Contact
  - Accent color: Slytherin-style green
- **Features**:
  - Section navigation via anchors
  - Resume download button
  - Dark/Light mode toggle (stored in browser localStorage)

### 3.2 GitHub API Integration
- **GitHub REST API**: Direct integration with GitHub API to fetch repository data
- **Authentication**: GitHub Personal Access Token for API access
- **Data Fetching**:
  - Repository list with names, descriptions, and URLs
  - Repository languages and technology stack detection
  - README content parsing for enhanced descriptions
- **Caching**: Client-side caching to minimize API calls and improve performance

---

## 4. Deployment Pipeline

### 4.1 GitHub Actions
- Trigger: On push to `main` branch
- Steps:
  - Run **ESLint** for TypeScript/React code quality
  - Run **unit and integration tests** for React frontend
  - Build Docker image for frontend
  - Deploy via **Docker Compose** to Hostinger server

### 4.2 Hosting
- Host: Hostinger VPS
- Containerization: Docker Compose with `frontend` and optional `reverse-proxy` services

---

## 5. Data Model (Initial)

### Project
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "badges": ["Python", "Flutter", "Selenium"]
}
```

---

## 6. Future Enhancements
- Add a contact form (store submissions or email via SMTP)
- Admin panel for managing project visibility and descriptions
- Enhanced technology detection (framework detection, dependency analysis)
- Analytics dashboard (page visits, interaction tracking)
- Repository filtering and sorting options

---

## 7. Project Flow
1. Create project on **Lovable**
2. Export codebase to **GitHub**
3. Work on project in **Cursor**
4. Push to `main` to trigger **GitHub Actions**
5. Deploy to **Hostinger VPS** via Docker

---

## 8. Notes
- All static content (bio, resume, contact) will be customizable via environment variables or a config file.
- GitHub Personal Access Token is required for API access and should be stored securely.
- Resume file can be served from the frontend build or a CDN.
- Repository visibility and filtering can be managed through GitHub repository settings or manual configuration.

---

End of Document
