# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js tool that automatically downloads and converts the official Crusader Kings 3 modding documentation from the Paradox Wiki into Markdown format. The converted documentation is published as an npm package (`ck3-modding-wiki`) and updated daily via GitHub Actions.

## IMPORTANT: Repository Purpose

**This repository exists primarily for the documentation content, not the tooling.**

The main value of this repository is the converted CK3 modding documentation located in:
- `wiki_pages/` - Markdown documentation files (the core content)
- `assets/` - Images and icons referenced in the documentation
- `TABLE_OF_CONTENTS.md` - Comprehensive navigation index

The tooling (`index.js`, `lib/`) is infrastructure to keep the documentation updated automatically. When users interact with this repository, they are typically interested in:
- Reading or searching the CK3 modding documentation
- Understanding how to mod Crusader Kings 3
- Finding reference information for game mechanics, scripting, etc.

They are **NOT** typically interested in the scraper/converter tool itself, unless they're specifically working on improving the conversion quality or fixing bugs in the tooling.

## Common Commands

### Development Workflow
```bash
# Install dependencies (includes Playwright, wikiparser-node, Sharp, jsdom)
npm install

# Install Playwright browsers (required for scraping)
npx playwright install chromium

# Show usage/help
npm start

# Run tests
npm test

# Type check with tsgo (from @typescript/native-preview)
npm run check-types

# Lint code with oxlint
npm run lint

# Format code with Prettier
npm run format

# Download wiki pages to XML and assets (icons/images)
npm run download

# Download only assets (skips existing files)
npm run download-assets

# Convert XML to Markdown and generate TABLE_OF_CONTENTS.md
npm run convert

# Full update workflow (download → convert → generate TOC)
npm run update

# Push converted content to GitHub wiki
npm run push-wiki
```

## Architecture

### TypeScript Implementation

This project is written in **TypeScript** with **strict type safety** and uses Node.js v22.18.0+ native type stripping to run `.ts` files directly without a build step. Type checking is done with `tsgo` from `@typescript/native-preview`, linting with `oxlint`, and formatting with `prettier`.

**Type Safety Guidelines:**
- Uses proper typed imports from `wikiparser-node` (TdToken, HeadingToken, ExtToken, HtmlToken, FileToken)
- No `any`, no `unknown`, no `@ts-nocheck` directives
- Minimal type assertions - only when TypeScript's control flow analysis cannot infer types
- All token-specific properties (like `colspan`, `rowspan`, `level`, `name`) use the correct typed classes

### Core Components

**index.ts** - Main CLI entry point with three commands:
- `download`: Uses Playwright to scrape the wiki category page, downloads all listed pages as MediaWiki XML exports, then downloads all referenced assets
- `download-assets`: Downloads only icons and images referenced in XML files
- `convert`: Converts all XML exports to Markdown using AST parsing

**lib/ast-converter.ts** - AST-based wikitext→Markdown converter:
- Parses MediaWiki XML using `wikiparser-node` (TypeScript library with built-in types)
- Converts wiki syntax to GitHub-flavored Markdown
- Resolves internal links to local `.md` files when available, otherwise to wiki URLs
- Handles templates (code blocks, icons, tables, etc.)
- Maintains link target case sensitivity using `availablePagesMap`

**lib/download-assets.ts** - Asset downloader:
- Extracts icon/image references from XML using regex patterns
- Downloads from wiki using Playwright
- Converts images to PNG/JPG using Sharp
- Organizes into `assets/icons/` and `assets/images/`

**lib/generate-master-toc.ts** - Generates `TABLE_OF_CONTENTS.md`:
- Scans all wiki page Markdown files
- Extracts headings to create comprehensive table of contents
- Used as quick navigation index for the entire documentation

**lib/push-to-wiki.sh** - GitHub wiki publisher:
- Clones the GitHub wiki repository
- Copies converted Markdown files
- Commits and pushes to keep wiki in sync

### Data Flow

1. **Download**: Playwright → MediaWiki XML exports → `wiki_exports/`
2. **Asset Download**: XML references → Playwright download → Sharp conversion → `assets/`
3. **Convert**: `wiki_exports/*.xml` → AST parser → Markdown → `wiki_pages/*.md`
4. **Publish**: `wiki_pages/` → npm package + GitHub wiki

### Configuration Files

- `.wikiconfig`: Wiki base URL and category to scrape
- `.exclude`: List of page names to skip during download/conversion
- `package.json`: Uses date-based versioning `{major}.YYYYMMDD.{patch}`, configured as ES module (`"type": "module"`)
- `tsconfig.json`: TypeScript configuration for type checking with `tsgo`
- `.prettierrc`: Code formatting rules
- `oxlint.json`: Linting configuration

### Testing

Tests are located in `tests/` and use Node.js built-in test runner:
- `converter.test.js`: Tests wiki syntax conversion using fixtures in `tests/fixtures/`
- Fixtures are JSON files with `input` (wikitext) and `expected` (markdown) pairs

## Important Implementation Details

### Link Resolution
The converter maintains a case-sensitive map of available pages (`availablePagesMap` in lib/ast-converter.ts) to ensure internal links use the correct filename casing. Links to pages not in the repository are converted to full wiki URLs.

### Rate Limiting
Download operations include random delays (2.5s ± 0.5s) between requests to be respectful to the wiki server (index.ts).

### Error Handling
Download operations retry up to 3 times with 5-second delays between attempts (index.ts).

### GitHub Actions Automation
The `.github/workflows/update.yml` workflow:
- Runs daily at 3 AM UTC
- Uses Node.js v22.18.0+ for native TypeScript support
- Downloads latest wiki content
- Converts to Markdown
- Commits changes if content has changed
- Calculates date-based version (increments patch if same day)
- Publishes to npm automatically
- Pushes to GitHub wiki

## Development Notes

### TypeScript and Tooling
- The project uses Node.js v22.18.0+ native type stripping to run `.ts` files directly
- Type checking: Use `tsgo --noEmit` (from `@typescript/native-preview`) not `tsc`
- Linting: `oxlint` for fast, modern linting
- Formatting: `prettier` with `@prettier/plugin-oxc`
- All source files use ES modules (`import`/`export` syntax)

### Working with the Converter (lib/ast-converter.ts)
- Uses `wikiparser-node` which is a TypeScript library with built-in types
- Template handling is done via AST node traversal, not regex
- The converter expects MediaWiki XML format with `<mediawiki>` root element
- All image paths are converted to relative paths pointing to `../assets/`

### Modifying Download Logic (index.ts)
- Respect the rate limiting delays to avoid being blocked by the wiki
- Always validate XML responses contain `<mediawiki>` tag before saving
- Handle cookie dialogs that may appear during Playwright automation

### Adding New Pages
- Ensure they're listed under the configured category on the wiki
- Add to `.exclude` if they should not be downloaded
