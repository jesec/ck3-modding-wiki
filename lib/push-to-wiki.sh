#!/bin/bash
set -e

# Script to push wiki pages to GitHub wiki repository using an orphan branch
# Creates a clean orphan branch with only wiki content and pushes to .wiki.git

WIKI_REPO_URL="https://github.com/jesec/ck3-modding-wiki.wiki.git"
ORPHAN_BRANCH="wiki-pages"

echo "Creating orphan branch '$ORPHAN_BRANCH'..."

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create and checkout orphan branch (no history)
git checkout --orphan "$ORPHAN_BRANCH" 2>/dev/null || git checkout "$ORPHAN_BRANCH"

# Remove all files from index
git rm -rf . 2>/dev/null || true

# Copy wiki pages to root
echo "Copying wiki pages..."
cp wiki_pages/*.md . 2>/dev/null || true

# Copy TABLE_OF_CONTENTS.md as Home.md (GitHub wiki home page)
cp TABLE_OF_CONTENTS.md Home.md

# Copy README from main repo
cp README.md README.md

# Copy assets
echo "Copying assets..."
mkdir -p assets/icons assets/images
cp assets/icons/*.png assets/icons/ 2>/dev/null || true
cp assets/images/* assets/images/ 2>/dev/null || true

# Fix asset paths in markdown files (remove ../ prefix)
echo "Fixing asset paths..."
for file in *.md; do
    if [ -f "$file" ]; then
        sed -i 's|../assets/|assets/|g' "$file"
    fi
done

# Add and commit
echo "Committing to orphan branch..."
git add .

if git diff --staged --quiet; then
    echo "✓ No changes to commit"
    git checkout "$CURRENT_BRANCH"
    exit 0
fi

git commit -m "Update wiki content ($(date +'%Y-%m-%d'))"

# Add wiki remote if it doesn't exist
if ! git remote get-url wiki 2>/dev/null; then
    echo "Adding wiki remote..."
    git remote add wiki "$WIKI_REPO_URL"
fi

# Push to wiki repository
echo "Pushing to GitHub wiki repository..."
git push -f wiki "$ORPHAN_BRANCH":master

echo "✓ Wiki updated successfully at $WIKI_REPO_URL"

# Return to original branch
git checkout "$CURRENT_BRANCH"
