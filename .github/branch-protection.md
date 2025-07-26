# Branch Protection Rules

This document outlines the branch protection rules that should be configured for this repository.

## Main Branch Protection

The `main` branch should have the following protection rules enabled:

### ✅ **Required Status Checks**
- Require branches to be up to date before merging
- Required status checks:
  - `CI` workflow (type checking and linting)
  - `test` job completion

### ✅ **Restrict Pushes**
- Restrict pushes that create files 
- Require pull requests before merging
- Require review from code owners
- Dismiss stale reviews when new commits are pushed

### ✅ **Require Linear History**
- Require linear history to maintain clean Git history
- No merge commits allowed

### ✅ **Include Administrators**
- Include administrators in these restrictions
- Even repository admins must follow the branch protection rules

### ✅ **Allow Force Pushes**
- Disabled - Force pushes are not allowed

### ✅ **Allow Deletions**
- Disabled - Branch deletion is not allowed

## Workflow

From now on, all changes must follow this workflow:

1. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Make Changes**: Develop and test your changes
3. **Push Feature Branch**: `git push origin feature/your-feature-name`
4. **Create Pull Request**: Open PR from feature branch to main
5. **Code Review**: Wait for review and CI checks to pass
6. **Merge**: Merge PR after approval and successful checks
7. **Deploy**: Merge main to prod branch for deployment

## Example Commands

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# After PR approval and merge
git checkout main
git pull origin main
git checkout prod
git merge main
git push origin prod  # This triggers deployment
```

## Manual Setup Required

Since GitHub's API has limitations for branch protection rules, these rules should be configured manually in the GitHub repository settings:

1. Go to: `https://github.com/StavLobel/sl-portfolio/settings/branch_protection_rules/new`
2. Branch name pattern: `main`
3. Enable the protection rules listed above 