# Deployment Guide - GitHub Actions + Hostinger

This portfolio uses automated deployment via GitHub Actions when pushing to the `prod` branch.

## Automated Deployment (Recommended)

### Setup GitHub Secrets

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following repository secrets:

**Environment Variables:**
- `VITE_GITHUB_USERNAME`: Your GitHub username (e.g., `stavlobel`)
- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token
- `VITE_GITHUB_EXCLUDE_REPOS`: Comma-separated repos to exclude (e.g., `.github,dotfiles`)
- `VITE_LINKEDIN_PROFILE_PIC_URL`: Your LinkedIn profile picture URL

**Hostinger FTP Credentials:**
- `FTP_SERVER`: Your Hostinger FTP hostname (e.g., `files.000webhost.com`)
- `FTP_USERNAME`: Your FTP username
- `FTP_PASSWORD`: Your FTP password

### Deploy Process

1. **Make changes** on the `main` branch
2. **Test locally**: `npm run dev` and verify everything works
3. **Create prod branch**: 
   ```bash
   git checkout -b prod
   git push origin prod
   ```
4. **Automatic deployment** triggers when you push to `prod` branch

### Deployment Workflow

The GitHub Action will:
1. ✅ Install dependencies
2. ✅ Run TypeScript type checking
3. ✅ Run ESLint validation
4. ✅ Build production bundle
5. ✅ Deploy to Hostinger via FTP

## Manual Deployment (Backup Method)

If you need to deploy manually:

### Prerequisites
- Hostinger hosting account with FTP access
- Node.js installed locally

### Steps
1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload via FTP**:
   - Connect to your Hostinger FTP
   - Upload all contents of `dist/` folder to `public_html/`

## Branch Strategy

- **`main`**: Development branch with CI testing
- **`prod`**: Production branch that triggers deployment

### Workflow:
1. Develop on `main` branch
2. When ready to deploy, merge/push to `prod` branch
3. GitHub Actions automatically deploys to Hostinger

## Environment Configuration

### Production Environment Variables
All environment variables are built into the production bundle during the GitHub Actions build process.

Required variables:
- `VITE_GITHUB_USERNAME`: For GitHub API calls
- `VITE_GITHUB_TOKEN`: For authenticated GitHub API access
- `VITE_GITHUB_EXCLUDE_REPOS`: Repositories to hide from portfolio
- `VITE_LINKEDIN_PROFILE_PIC_URL`: Direct URL to LinkedIn profile picture

### Security Notes
- ⚠️ **Frontend environment variables are public** in the built bundle
- Use GitHub tokens with **minimal permissions** (public repositories only)
- Consider using a dedicated token for portfolio use

## Hostinger Configuration

### File Structure
After deployment, your `public_html` contains:
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── vendor-[hash].js
├── favicon.ico
├── favicon.svg
├── favicon-16x16.png
├── favicon-32x32.png
├── .htaccess
└── robots.txt
```

### SSL Certificate
Enable SSL in Hostinger hPanel:
1. Go to "Security" → "SSL"
2. Enable "Force HTTPS redirect"

## Troubleshooting

### GitHub Actions Issues
- **Build fails**: Check the Actions tab for error logs
- **Secrets missing**: Verify all required secrets are set
- **FTP fails**: Check FTP credentials and server settings

### Website Issues
- **Blank page**: Check browser console for errors
- **API errors**: Verify GitHub token is valid
- **Images not loading**: Check LinkedIn profile picture URL

### Logs and Monitoring
- **GitHub Actions logs**: Repository → Actions tab
- **Build artifacts**: Available for download after successful build
- **FTP logs**: Check GitHub Actions deployment step for FTP output

## Performance

Your site is optimized with:
- ✅ **Minified bundles**: CSS and JavaScript compressed
- ✅ **Code splitting**: Separate vendor and UI chunks
- ✅ **Asset optimization**: Images and fonts optimized
- ✅ **Caching headers**: Via `.htaccess` configuration
- ✅ **GZIP compression**: Enabled by Hostinger

## Updates

To update the live site:
1. Make changes on `main` branch
2. Test locally
3. Push to `prod` branch
4. GitHub Actions deploys automatically
5. Changes live in ~2-3 minutes 