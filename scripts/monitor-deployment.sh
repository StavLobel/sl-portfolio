#!/bin/bash

# Monitor deployment script for v1.3.1
# This script checks the website until v1.3.1 is detected

echo "🚀 Monitoring deployment for v1.3.1..."
echo "Website: https://stavlobel.com/"
echo ""

# Function to check version
check_version() {
    local response=$(curl -s https://stavlobel.com/)
    local version=$(echo "$response" | grep -o 'v1\.3\.1' | head -1)
    
    if [ "$version" = "v1.3.1" ]; then
        echo "✅ SUCCESS! Version v1.3.1 detected on the website!"
        echo "🎉 Deployment completed successfully!"
        return 0
    else
        echo "⏳ Waiting for v1.3.1... (Current: $(echo "$response" | grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1 || echo 'No version found'))"
        return 1
    fi
}

# Function to check GitHub Actions status
check_github_actions() {
    echo "📊 Checking GitHub Actions deployment status..."
    # Note: This would require GitHub CLI or API access
    echo "   Visit: https://github.com/StavLobel/sl-portfolio/actions"
}

# Main monitoring loop
attempt=1
max_attempts=30
interval=30

echo "Starting monitoring loop (max $max_attempts attempts, $interval second intervals)..."
echo ""

while [ $attempt -le $max_attempts ]; do
    echo "Attempt $attempt/$max_attempts - $(date '+%H:%M:%S')"
    
    if check_version; then
        echo ""
        echo "🎯 Deployment verification complete!"
        echo "✅ Profile picture should now be visible"
        echo "✅ Projects section should show repositories or sample projects"
        echo "✅ Version v1.3.1 is live on https://stavlobel.com/"
        exit 0
    fi
    
    if [ $attempt -eq 1 ]; then
        check_github_actions
    fi
    
    if [ $attempt -lt $max_attempts ]; then
        echo "⏱️  Waiting $interval seconds before next check..."
        sleep $interval
    fi
    
    attempt=$((attempt + 1))
done

echo ""
echo "❌ Timeout reached. Deployment may still be in progress."
echo "🔍 Manual verification needed:"
echo "   1. Check GitHub Actions: https://github.com/StavLobel/sl-portfolio/actions"
echo "   2. Visit the website: https://stavlobel.com/"
echo "   3. Check browser console for any errors"
echo "   4. Verify container status on VPS"
exit 1 