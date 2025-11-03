#!/usr/bin/env node
// CK3 Modding Wiki Downloader and Converter
// Usage:
//   node index.js download  - Download wiki pages to XML
//   node index.js convert   - Convert XML exports to Markdown

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { convertXmlToMarkdown } = require('./lib/ast-converter');

const OUTPUT_XML_DIR = path.join(__dirname, 'wiki_exports');
const OUTPUT_MD_DIR = path.join(__dirname, 'wiki_pages');
const EXCLUDE_FILE = path.join(__dirname, '.exclude');
const DELAY_MS = 2500; // 2.5 seconds base delay
const MAX_RETRIES = 3;

// Create output directories
[OUTPUT_XML_DIR, OUTPUT_MD_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Load exclusion list
function loadExclusionList() {
    try {
        const content = fs.readFileSync(EXCLUDE_FILE, 'utf-8');
        return content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#'));
    } catch (e) {
        return [];
    }
}

const EXCLUDED_PAGES = loadExclusionList();

function randomDelay() {
    // Add random jitter of ±500ms to appear more human-like
    const jitter = Math.random() * 1000 - 500;
    return DELAY_MS + jitter;
}

async function getCategoryPages(page) {
    console.log('Fetching page list from Category:Modding...');

    for (let retry = 0; retry < MAX_RETRIES; retry++) {
        try {
            await page.goto('https://ck3.paradoxwikis.com/Category:Modding', {
                waitUntil: 'networkidle',
                timeout: 30000
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
                const pages = [];

                pagesList.forEach(group => {
                    const links = group.querySelectorAll('a');
                    links.forEach(link => {
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
            const filtered = pages.filter(page => {
                return !EXCLUDED_PAGES.some(excluded => page.includes(excluded));
            });

            console.log(`Found ${pages.length} total pages`);
            if (EXCLUDED_PAGES.length > 0) {
                console.log(`Excluded: ${EXCLUDED_PAGES.join(', ')}`);
            }
            console.log(`Filtered to ${filtered.length} pages\n`);

            return filtered;
        } catch (error) {
            console.error(`Attempt ${retry + 1}/${MAX_RETRIES} failed: ${error.message}`);
            if (retry < MAX_RETRIES - 1) {
                await page.waitForTimeout(5000); // Wait 5s before retry
            } else {
                throw error;
            }
        }
    }
}

async function downloadPage(page, pageName, index, total) {
    const url = `https://ck3.paradoxwikis.com/Special:Export/${pageName}`;
    const safeFilename = pageName.replace(/\//g, '_');
    const xmlPath = path.join(OUTPUT_XML_DIR, safeFilename + '.xml');

    for (let retry = 0; retry < MAX_RETRIES; retry++) {
        try {
            // Download XML
            const response = await page.goto(url, {
                waitUntil: 'networkidle',
                timeout: 30000
            });
            const xmlContent = await response.text();

            // Verify it's actually XML, not an error page
            if (!xmlContent.includes('<mediawiki')) {
                throw new Error('Response is not valid MediaWiki XML');
            }

            fs.writeFileSync(xmlPath, xmlContent, 'utf-8');

            console.log(`✓ [${index + 1}/${total}] ${safeFilename} (${xmlContent.length} bytes)`);
            return true;

        } catch (error) {
            console.error(`✗ [${index + 1}/${total}] ${pageName} (Attempt ${retry + 1}/${MAX_RETRIES}): ${error.message}`);
            if (retry < MAX_RETRIES - 1) {
                await page.waitForTimeout(5000); // Wait 5s before retry
            } else {
                return false;
            }
        }
    }
}

async function commandDownload() {
    console.log('Starting browser...');
    const browser = await chromium.launch({
        headless: false,
        args: ['--disable-blink-features=AutomationControlled'] // Look more like a real browser
    });
    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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

        console.log(`\n=== Download Complete ===`);
        console.log(`✓ Successful: ${successful}/${pages.length}`);
        console.log(`✗ Failed: ${failed}/${pages.length}`);
        console.log(`Output: ${OUTPUT_XML_DIR}`);
        console.log(`\nTo convert to Markdown, run: node index.js convert`);

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await browser.close();
    }
}

function commandConvert() {
    const xmlFiles = fs.readdirSync(OUTPUT_XML_DIR).filter(f => f.endsWith('.xml'));

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
            failed++;
            console.error(`✗ ${mdFile}: ${error.message}`);
        }
    }

    console.log(`\n=== Conversion Complete ===`);
    console.log(`✓ Successful: ${successful}/${xmlFiles.length}`);
    console.log(`✗ Failed: ${failed}/${xmlFiles.length}`);
    console.log(`Output: ${OUTPUT_MD_DIR}`);
}

function showUsage() {
    console.log(`
CK3 Modding Wiki - Downloader and Converter

Usage:
  node index.js download    Download wiki pages to XML
  node index.js convert     Convert XML exports to Markdown

Commands:
  download    Fetches pages from https://ck3.paradoxwikis.com/Category:Modding
              Saves XML exports to wiki_exports/
              (Does NOT convert - run 'convert' afterwards)

  convert     Reads XML files from wiki_exports/
              Converts to Markdown in wiki_pages/
              Useful for re-converting after logic updates

Configuration:
  .exclude    List pages to exclude from download (one per line)
              Example: Way_of_Kings, Kingdom_of_Heaven
`);
}

// Main entry point
async function main() {
    const command = process.argv[2];

    switch (command) {
        case 'download':
            await commandDownload();
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
