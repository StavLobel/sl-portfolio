# Deployment Guide - Hostinger

This guide covers deploying the Stav Lobel Portfolio to Hostinger hosting.

## Prerequisites

- Hostinger hosting account with File Manager access
- Built production files (npm run build)
- Optional: FTP client (FileZilla, WinSCP, etc.)

## Method 1: Using Hostinger File Manager (Recommended)

### Step 1: Build the Production Files
```bash
npm run build
```

This creates a `dist` folder with all production-ready files.

### Step 2: Access Hostinger File Manager
1. Log into your Hostinger control panel (hPanel)
2. Go to "Files" → "File Manager"
3. Navigate to `public_html` folder (this is your website's root directory)

### Step 3: Clear Existing Files (if any)
- Delete any existing files in `public_html` (except `.htaccess` if it exists)

### Step 4: Upload Production Files
1. Open the `dist` folder on your local machine
2. Select ALL files and folders inside `dist` (not the dist folder itself)
3. Upload them to the `public_html` directory using File Manager's upload feature

### Step 5: Configure Environment Variables
Since this is a static site with frontend-only environment variables, they're already built into the production bundle.

## Method 2: Using FTP Client

### Step 1: Get FTP Credentials
1. In hPanel, go to "Files" → "FTP Accounts"
2. Note your FTP hostname, username, and password

### Step 2: Connect and Upload
1. Connect to your FTP server using your preferred client
2. Navigate to `public_html` directory
3. Upload all contents of the `dist` folder to `public_html`

## Important Notes

### Environment Variables
The following environment variables are compiled into the build:
- `VITE_GITHUB_USERNAME=stavlobel`
- `VITE_GITHUB_TOKEN=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`
- `VITE_LINKEDIN_PROFILE_PIC_URL=...`

⚠️ **Security Note**: The GitHub token is embedded in the frontend bundle. Consider using a token with minimal permissions (public repositories only).

### File Structure After Upload
Your `public_html` should contain:
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
└── robots.txt
```

### Custom Domain (if applicable)
If using a custom domain:
1. Point your domain's DNS to Hostinger's nameservers
2. Add the domain in hPanel under "Domains"

### SSL Certificate
Enable SSL in hPanel:
1. Go to "Security" → "SSL"
2. Enable "Force HTTPS redirect"

## Troubleshooting

### Common Issues:

1. **Blank Page**: Check browser console for errors
2. **404 on Refresh**: Add `.htaccess` file (see below)
3. **API Errors**: Verify GitHub token is valid and has correct permissions

### .htaccess for Single Page Application
Create `.htaccess` in `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Testing

After deployment:
1. Visit your domain/subdomain
2. Test all sections work correctly
3. Verify GitHub API is loading projects
4. Check LinkedIn profile picture loads
5. Test contact links work properly

## Updates

To update the site:
1. Make changes locally
2. Run `npm run build`
3. Upload new `dist` contents to `public_html`
4. Clear browser cache to see changes

## Performance Optimization

Hostinger automatically provides:
- GZIP compression
- Browser caching
- CDN (on higher plans)

Your site is already optimized with:
- Minified CSS and JavaScript
- Code splitting
- Optimized images 