# GitHub Secrets Setup Guide

## 🔐 Required GitHub Secrets for VPS Deployment

You need to add these secrets to your GitHub repository for automated deployment.

### 📍 **Where to Add Secrets:**
1. Go to: `https://github.com/StavLobel/sl-portfolio/settings/secrets/actions`
2. Click "New repository secret" for each secret below

### 🔑 **Required Secrets:**

#### **VPS Configuration:**
- **Name**: `VPS_HOST`
- **Value**: `69.62.119.109`

- **Name**: `VPS_USERNAME`
- **Value**: `stavlobel`

- **Name**: `VPS_SSH_KEY`
- **Value**: 
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACCB20cJVXTgqVWq2XTbFasWmo/AYGm5bgxJ8nblNdLbvgAAAJidHL36nRy9
+gAAAAtzc2gtZWQyNTUxOQAAACCB20cJVXTgqVWq2XTbFasWmo/AYGm5bgxJ8nblNdLbvg
AAAEBIp/BoykWKBD+wkZtFaWCtumWLFFKJyPdF1FXUO9QDGIHbRwlVdOCpVarZdNsVqxaa
j8BgabluDEnyduU10tu+AAAAE3N0YXZsb2JlbEBnbWFpbC5jb20BAg==
-----END OPENSSH PRIVATE KEY-----
```

- **Name**: `VPS_PORT`
- **Value**: `22`

#### **Environment Variables:**
- **Name**: `VITE_GITHUB_USERNAME`
- **Value**: `stavlobel`

- **Name**: `VITE_GITHUB_TOKEN`
- **Value**: `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`

- **Name**: `VITE_GITHUB_EXCLUDE_REPOS`
- **Value**: `.github,dotfiles`

- **Name**: `VITE_LINKEDIN_PROFILE_PIC_URL`
- **Value**: `https://media.licdn.com/dms/image/v2/D4D35AQEPYF1rl2iXqw/profile-framedphoto-shrink_400_400/B4DZc3WQ4uHMAk-/0/1748980272980?e=1754164800&v=beta&t=QoLMDe-z99wAzBzAAZ6VGlFhTqd-YiGcIQ_ceL8-Xgs`

### 🚀 **After Adding Secrets:**

1. **Create the prod branch:**
   ```bash
   git checkout -b prod
   git push origin prod
   ```

2. **Deploy by pushing to prod:**
   ```bash
   git checkout prod
   git merge main
   git push origin prod
   ```

3. **Monitor deployment:**
   - Go to: `https://github.com/StavLobel/sl-portfolio/actions`
   - Watch the "Deploy to VPS" workflow

### 🌐 **Your Portfolio URLs:**
- **Production**: https://stavlobel.com
- **Development**: http://localhost:8080

### ⚠️ **Security Notes:**
- The GitHub token has minimal permissions (only public repo access)
- SSH key is specific to your VPS
- All secrets are encrypted by GitHub
- Never commit secrets to the repository 