#!/usr/bin/env node
// CK3 Modding Wiki Downloader and Converter
// Usage:
//   node index.ts download  - Download wiki pages to XML
//   node index.ts convert   - Convert XML exports to Markdown

import { chromium } from 'playwright';
import type { Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { convertXmlToMarkdown } from './lib/ast-converter.ts';
import { downloadAssets } from './lib/download-assets.ts';

const OUTPUT_XML_DIR = path.join(import.meta.dirname, 'wiki_exports');
const OUTPUT_MD_DIR = path.join(import.meta.dirname, 'wiki_pages');
const EXCLUDE_FILE = path.join(import.meta.dirname, '.exclude');
const DELAY_MS = 2500; // 2.5 seconds base delay
const MAX_RETRIES = 3;

interface WikiConfig {
  WIKI_BASE_URL: string;
  WIKI_CATEGORY: string;
}

// Load wiki configuration
function loadConfig(): WikiConfig {
  const configPath = path.join(import.meta.dirname, '.wikiconfig');
  const defaults: WikiConfig = {
    WIKI_BASE_URL: 'https://ck3.paradoxwikis.com',
    WIKI_CATEGORY: 'Category:Modding',
  };

  if (!fs.existsSync(configPath)) {
    return defaults;
  }

  const content = fs.readFileSync(configPath, 'utf-8');
  const config: WikiConfig = { ...defaults };

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, value] = trimmed.split('=');
      if (key && value) {
        const trimmedKey = key.trim();
        if (trimmedKey === 'WIKI_BASE_URL' || trimmedKey === 'WIKI_CATEGORY') {
          config[trimmedKey] = value.trim();
        }
      }
    }
  }

  return config;
}

const CONFIG = loadConfig();

// Create output directories
[OUTPUT_XML_DIR, OUTPUT_MD_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Load exclusion list
function loadExclusionList(): string[] {
  try {
    const content = fs.readFileSync(EXCLUDE_FILE, 'utf-8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
  } catch (e) {
    return [];
  }
}

const EXCLUDED_PAGES = loadExclusionList();

function randomDelay(): number {
  // Add random jitter of ±500ms to appear more human-like
  const jitter = Math.random() * 1000 - 500;
  return DELAY_MS + jitter;
}

async function getCategoryPages(page: Page): Promise<string[]> {
  console.log(`Fetching page list from ${CONFIG.WIKI_CATEGORY}...`);

  for (let retry = 0; retry < MAX_RETRIES; retry++) {
    try {
      await page.goto(`${CONFIG.WIKI_BASE_URL}/${CONFIG.WIKI_CATEGORY}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Handle cookie dialog
      try {
        await page.getByRole('button', { name: 'OK', exact: true }).click({ timeout: 3000 });
        await page.waitForTimeout(1000);
      } catch (e) {
        // Cookie dialog might not appear
      }

      // Extract all page names from the category
      const pages = await page.evaluate(() => {
        const pagesList = document.querySelectorAll('.mw-category-group');
        const pages: string[] = [];

        pagesList.forEach((group) => {
          const links = group.querySelectorAll('a');
          links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.includes(':')) {
              const pageName = href.substring(1);
              pages.push(pageName);
            }
          });
        });

        return pages;
      });

      // Filter out excluded pages
      const filtered = pages.filter((page) => {
        return !EXCLUDED_PAGES.some((excluded) => page.includes(excluded));
      });

      console.log(`Found ${pages.length} total pages`);
      if (EXCLUDED_PAGES.length > 0) {
        console.log(`Excluded: ${EXCLUDED_PAGES.join(', ')}`);
      }
      console.log(`Filtered to ${filtered.length} pages\n`);

      return filtered;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Attempt ${retry + 1}/${MAX_RETRIES} failed: ${errorMessage}`);
      if (retry < MAX_RETRIES - 1) {
        await page.waitForTimeout(5000); // Wait 5s before retry
      } else {
        throw error;
      }
    }
  }

  return [];
}

async function downloadPage(
  page: Page,
  pageName: string,
  index: number,
  total: number
): Promise<boolean> {
  const url = `${CONFIG.WIKI_BASE_URL}/Special:Export/${pageName}`;
  const safeFilename = pageName.replace(/\//g, '_');
  const xmlPath = path.join(OUTPUT_XML_DIR, safeFilename + '.xml');

  for (let retry = 0; retry < MAX_RETRIES; retry++) {
    try {
      // Download XML
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      if (!response) {
        throw new Error('No response received');
      }

      const xmlContent = await response.text();

      // Verify it's actually XML, not an error page
      if (!xmlContent.includes('<mediawiki')) {
        throw new Error('Response is not valid MediaWiki XML');
      }

      fs.writeFileSync(xmlPath, xmlContent, 'utf-8');

      console.log(`✓ [${index + 1}/${total}] ${safeFilename} (${xmlContent.length} bytes)`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `✗ [${index + 1}/${total}] ${pageName} (Attempt ${retry + 1}/${MAX_RETRIES}): ${errorMessage}`
      );
      if (retry < MAX_RETRIES - 1) {
        await page.waitForTimeout(5000); // Wait 5s before retry
      } else {
        return false;
      }
    }
  }

  return false;
}

async function commandDownload(): Promise<void> {
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true, // Always use headless mode (works in CI and locally)
    args: ['--disable-blink-features=AutomationControlled'], // Look more like a real browser
  });
  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setExtraHTTPHeaders({
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  try {
    // Get page list dynamically
    const pages = await getCategoryPages(page);

    console.log(`Downloading ${pages.length} pages to XML...\n`);

    let successful = 0;
    let failed = 0;

    for (let i = 0; i < pages.length; i++) {
      const success = await downloadPage(page, pages[i], i, pages.length);

      if (success) {
        successful++;
      } else {
        failed++;
      }

      // Respectful delay between requests with random jitter
      if (i < pages.length - 1) {
        const delay = randomDelay();
        await page.waitForTimeout(delay);
      }
    }

    console.log(`\n=== Wiki Pages Download Complete ===`);
    console.log(`✓ Successful: ${successful}/${pages.length}`);
    console.log(`✗ Failed: ${failed}/${pages.length}`);
    console.log(`Output: ${OUTPUT_XML_DIR}`);

    // Exit with error if no pages were downloaded
    if (successful === 0) {
      throw new Error('Failed to download any pages');
    }

    // Download assets (icons and images)
    await downloadAssets(browser);

    console.log(`\nTo convert to Markdown, run: node index.ts convert`);
  } catch (error) {
    console.error('Fatal error:', error);
    await browser.close();
    process.exit(1); // Exit with error code
  } finally {
    await browser.close();
  }
}

async function commandDownloadAssets(): Promise<void> {
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true, // Always use headless mode (works in CI and locally)
    args: ['--disable-blink-features=AutomationControlled'],
  });

  try {
    await downloadAssets(browser);
  } catch (error) {
    console.error('Fatal error:', error);
    await browser.close();
    process.exit(1); // Exit with error code
  } finally {
    await browser.close();
  }
}

function commandConvert(): void {
  const xmlFiles = fs.readdirSync(OUTPUT_XML_DIR).filter((f) => f.endsWith('.xml'));

  console.log(`Converting ${xmlFiles.length} XML files to Markdown...\n`);

  let successful = 0;
  let failed = 0;

  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(OUTPUT_XML_DIR, xmlFile);
    const mdFile = xmlFile.replace('.xml', '.md');
    const mdPath = path.join(OUTPUT_MD_DIR, mdFile);

    try {
      const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
      const pageName = xmlFile.replace('.xml', '').replace(/_/g, ' ');

      // Convert using shared logic
      const markdown = convertXmlToMarkdown(xmlContent, pageName);
      fs.writeFileSync(mdPath, markdown, 'utf-8');

      successful++;
      console.log(`✓ ${mdFile}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      failed++;
      console.error(`✗ ${mdFile}: ${errorMessage}`);
    }
  }

  console.log(`\n=== Conversion Complete ===`);
  console.log(`✓ Successful: ${successful}/${xmlFiles.length}`);
  console.log(`✗ Failed: ${failed}/${xmlFiles.length}`);
  console.log(`Output: ${OUTPUT_MD_DIR}`);
}

function showUsage(): void {
  console.log(`
CK3 Modding Wiki - Downloader and Converter

Usage:
  node index.ts download         Download wiki pages to XML and assets
  node index.ts download-assets  Download only assets (icons and images)
  node index.ts convert          Convert XML exports to Markdown

Commands:
  download         Fetches pages from the configured wiki category
                   Extracts and downloads all icon and image references
                   Saves XML exports to wiki_exports/ and assets to assets/

  download-assets  Downloads only icons and images referenced in XML files
                   Icons from {{icon|name}} and {{iconify|name}} templates
                   Images from [[File:name]] and [[Image:name]] links
                   Skips files that already exist

  convert          Reads XML files from wiki_exports/
                   Converts to Markdown in wiki_pages/
                   References local images from assets/

Configuration:
  .wikiconfig      Wiki base URL and category
                   WIKI_BASE_URL=https://ck3.paradoxwikis.com
                   WIKI_CATEGORY=Category:Modding

  .exclude         Pages to exclude from download (one per line)
                   Example: Way_of_Kings, Kingdom_of_Heaven
`);
}

// Main entry point
async function main(): Promise<void> {
  const command = process.argv[2];

  switch (command) {
    case 'download':
      await commandDownload();
      break;
    case 'download-assets':
      await commandDownloadAssets();
      break;
    case 'convert':
      commandConvert();
      break;
    default:
      showUsage();
      process.exit(1);
  }
}

main().catch(console.error);
