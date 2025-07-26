#!/bin/bash

# Setup Production Branch Script
# This script creates the prod branch for automated deployment

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up production branch...${NC}\n"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  You're not on the main branch. Switching to main...${NC}"
    git checkout main
fi

# Create prod branch from main
echo -e "${YELLOW}📦 Creating prod branch from main...${NC}"
git checkout -b prod

# Push prod branch to remote
echo -e "${YELLOW}📤 Pushing prod branch to GitHub...${NC}"
git push -u origin prod

echo -e "${GREEN}✅ Production branch setup complete!${NC}\n"

echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Add GitHub secrets (see scripts/setup-github-secrets.md)"
echo "2. To deploy: git checkout prod && git merge main && git push origin prod"
echo "3. Monitor deployment at: https://github.com/StavLobel/sl-portfolio/actions"
echo "4. Your site will be available at: https://stavlobel.com"

# Switch back to main
git checkout main
echo -e "\n${GREEN}✅ Switched back to main branch${NC}" 