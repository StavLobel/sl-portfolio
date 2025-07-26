# GitHub Secrets Setup Guide

## 🔐 Required GitHub Secrets for VPS Deployment

You need to add these secrets to your GitHub repository for automated deployment.

### 📍 **Where to Add Secrets:**
1. Go to: `https://github.com/StavLobel/sl-portfolio/settings/secrets/actions`
2. Click "New repository secret" for each secret below

### 🔑 **Required Secrets:**

#### **VPS Configuration:**
- **Name**: `VPS_HOST`
- **Value**: Your VPS IP address

- **Name**: `VPS_USERNAME`
- **Value**: Your VPS username

- **Name**: `VPS_SSH_KEY`
- **Value**: Your private SSH key content (from `~/.ssh/id_ed25519`)

- **Name**: `VPS_PORT`
- **Value**: SSH port (usually `22`)

#### **Environment Variables:**
- **Name**: `VITE_GITHUB_USERNAME`
- **Value**: Your GitHub username

- **Name**: `VITE_GITHUB_TOKEN`
- **Value**: Your GitHub Personal Access Token

- **Name**: `VITE_GITHUB_EXCLUDE_REPOS`
- **Value**: Comma-separated list of repos to exclude

- **Name**: `VITE_LINKEDIN_PROFILE_PIC_URL`
- **Value**: Your LinkedIn profile picture URL

### 🚀 **After Adding Secrets:**

1. **Deploy to production:**
   ```bash
   git checkout prod
   git merge main
   git push origin prod
   ```

2. **Monitor deployment:**
   - Go to: `https://github.com/StavLobel/sl-portfolio/actions`
   - Watch the "Deploy to VPS" workflow

### 🌐 **Your Portfolio URLs:**
- **Production**: https://stavlobel.com
- **Development**: http://localhost:8080

### ⚠️ **Security Notes:**
- Never commit secrets to the repository
- All secrets are encrypted by GitHub
- Use minimal permissions for tokens
- Keep SSH keys secure 