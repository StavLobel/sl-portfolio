# GitHub Secrets Setup Guide

To fix the projects section and enable GitHub API integration, you need to set up the following secrets in your GitHub repository:

## Required Secrets

1. **VITE_GITHUB_TOKEN** - Your GitHub Personal Access Token
2. **VITE_GITHUB_USERNAME** - Your GitHub username (default: StavLobel)
3. **VITE_GITHUB_EXCLUDE_REPOS** - Comma-separated list of repos to exclude (optional)

## How to Create a GitHub Personal Access Token

1. Go to GitHub.com and sign in
2. Click your profile picture → Settings
3. Scroll down to "Developer settings" (bottom left)
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token" → "Generate new token (classic)"
6. Give it a name like "Portfolio API"
7. Set expiration (recommend 90 days)
8. Select scopes:
   - ✅ `public_repo` (to read public repositories)
   - ✅ `read:user` (to read user profile)
9. Click "Generate token"
10. **Copy the token immediately** (you won't see it again)

## Setting Up Secrets in GitHub

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret:
   - Name: `VITE_GITHUB_TOKEN`, Value: [your token]
   - Name: `VITE_GITHUB_USERNAME`, Value: `StavLobel`
   - Name: `VITE_GITHUB_EXCLUDE_REPOS`, Value: `.github,dotfiles`

## Testing the Setup

After setting up the secrets:

1. Push to the `prod` branch to trigger deployment
2. Check the deployment logs in GitHub Actions
3. Visit your site to see if projects are loading

## Troubleshooting

- If projects still don't load, check the browser console for errors
- Verify the token has the correct permissions
- Ensure the username matches your GitHub username exactly
- Check that the deployment workflow completed successfully

## Security Notes

- Never commit the token to your repository
- Use environment-specific tokens when possible
- Regularly rotate your tokens
- The token only needs read access to public repositories 