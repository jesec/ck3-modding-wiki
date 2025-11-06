#!/bin/bash
set -e

# Script to push wiki pages to GitHub wiki repository using an orphan branch
# Creates a clean orphan branch with only wiki content and pushes to .wiki.git

WIKI_REPO_URL="https://github.com/jesec/ck3-modding-wiki.wiki.git"
ORPHAN_BRANCH="wiki-pages"

echo "Creating orphan branch '$ORPHAN_BRANCH'..."

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create temporary directory to store files
TEMP_DIR=$(mktemp -d)
echo "Copying files to temp directory..."

# Copy everything we need before switching branches
cp -r wiki_pages "$TEMP_DIR/"
cp TABLE_OF_CONTENTS.md "$TEMP_DIR/"
cp README.md "$TEMP_DIR/"
cp -r assets "$TEMP_DIR/" 2>/dev/null || true

# Create and checkout orphan branch (no history)
git checkout --orphan "$ORPHAN_BRANCH" 2>/dev/null || git checkout "$ORPHAN_BRANCH"

# Remove all files from index
git rm -rf . 2>/dev/null || true

# Copy wiki pages to root
echo "Copying wiki pages..."
cp "$TEMP_DIR"/wiki_pages/*.md . 2>/dev/null || true

# Copy TABLE_OF_CONTENTS.md as regular wiki page
cp "$TEMP_DIR/TABLE_OF_CONTENTS.md" TABLE_OF_CONTENTS.md
# Fix wiki_pages/ links in TOC (remove directory and .md extension)
sed -i 's|](wiki_pages/\([^)]*\)\.md|](\1|g' TABLE_OF_CONTENTS.md

# Copy README as Home.md (GitHub wiki home page)
cp "$TEMP_DIR/README.md" Home.md
# Fix wiki_pages/ links in Home.md (remove directory and .md extension)
sed -i 's|](wiki_pages/\([^)]*\)\.md|](\1|g' Home.md
# Strip .md extension from all remaining internal links (not external URLs)
sed -i 's|](\([^):]*\)\.md\([)#]\)|](\1\2|g' Home.md

# Copy assets
echo "Copying assets..."
cp -r "$TEMP_DIR/assets" . 2>/dev/null || true

# Fix asset paths in markdown files (remove ../ prefix)
echo "Fixing asset paths..."
for file in *.md; do
    if [ -f "$file" ]; then
        sed -i 's|../assets/|assets/|g' "$file"
    fi
done

# Create .gitignore to prevent accidental commits of unwanted files
cat > .gitignore << 'EOF'
# Exclude everything by default
*

# Include only wiki content
!.gitignore
!*.md
!assets/
!assets/**
EOF

# Add and commit (gitignore will prevent unwanted files)
echo "Committing to orphan branch..."
git add .gitignore *.md assets/ 2>/dev/null || true

if git diff --staged --quiet; then
    echo "✓ No changes to commit"
    git checkout "$CURRENT_BRANCH"
    rm -rf "$TEMP_DIR"
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

# Clean up temp directory
rm -rf "$TEMP_DIR"
