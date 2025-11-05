// Download all wiki assets (modifier icons and images)
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import type { Browser, Page } from 'playwright';

const ICONS_DIR = path.join(import.meta.dirname, '..', 'assets', 'icons');
const IMAGES_DIR = path.join(import.meta.dirname, '..', 'assets', 'images');
const XML_DIR = path.join(import.meta.dirname, '..', 'wiki_exports');

interface WikiConfig {
  WIKI_BASE_URL: string;
}

interface ImageReference {
  filename: string;
  size: number | null;
}

interface IconMapping {
  identifier: string;
  url: string;
}

interface IconifyMapping {
  iconifyName: string;
  imageUrl: string;
}

interface DownloadResult {
  success: boolean;
  status?: number;
  resized?: boolean;
}

// Load wiki configuration
function loadConfig(): WikiConfig {
  const configPath = path.join(import.meta.dirname, '..', '.wikiconfig');
  const defaults: WikiConfig = {
    WIKI_BASE_URL: 'https://ck3.paradoxwikis.com',
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
        const trimmedKey = key.trim() as keyof WikiConfig;
        config[trimmedKey] = value.trim();
      }
    }
  }

  return config;
}

const CONFIG = loadConfig();

// Helper function: Download image and resize to target size if needed
// Try target size first, fallback to original and resize
async function downloadAndResize(
  page: Page,
  originalUrl: string,
  filepath: string,
  targetSize = 48
): Promise<DownloadResult> {
  let thumbnailUrl: string;

  // Check if originalUrl is already a thumbnail or full image
  if (originalUrl.includes('/thumb/')) {
    // Already a thumbnail URL - just replace the size
    thumbnailUrl = originalUrl.replace(/\/\d+px-([^/]+)$/, `/${targetSize}px-$1`);
  } else {
    // Full image URL - construct thumbnail URL
    // Convert: /images/path/filename.ext -> /images/thumb/path/filename.ext/SIZEpx-filename.ext
    const filename = originalUrl.split('/').pop() || '';
    thumbnailUrl =
      originalUrl.replace('/images/', '/images/thumb/') + `/${targetSize}px-${filename}`;
  }

  let response;

  // Try target size thumbnail first
  response = await page.goto(thumbnailUrl, { waitUntil: 'networkidle', timeout: 30000 });

  // If thumbnail not found, download original and resize
  if (response && response.status() === 404) {
    response = await page.goto(originalUrl, { waitUntil: 'networkidle', timeout: 30000 });
  }

  if (!response || !response.ok()) {
    return { success: false, status: response?.status() };
  }

  const buffer = await response.body();

  // Check if we need to resize
  const metadata = await sharp(buffer).metadata();
  const needsResize = Boolean(
    (metadata.width && metadata.width < targetSize) ||
      (metadata.height && metadata.height < targetSize)
  );

  if (needsResize) {
    // Resize to target size (minimum 48px)
    const resized = await sharp(buffer)
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    fs.writeFileSync(filepath, resized);
  } else {
    // Save as-is
    fs.writeFileSync(filepath, buffer);
  }

  return { success: true, resized: needsResize };
}

// Extract all File: and Image: references from XML exports with size parameters
function extractImageReferences(): ImageReference[] {
  const imagesMap = new Map<string, number | null>(); // Map filename -> size (or null if full size)

  if (!fs.existsSync(XML_DIR)) {
    console.log('Warning: wiki_exports/ directory not found. Run download first.');
    return [];
  }

  const xmlFiles = fs.readdirSync(XML_DIR).filter((f) => f.endsWith('.xml'));

  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(XML_DIR, xmlFile);
    const content = fs.readFileSync(xmlPath, 'utf-8');

    // Match [[File:filename|...]] and [[Image:filename|...]] with optional size parameter
    // Captures: [[File:name|24px]] or [[File:name|thumb|400px]] or [[File:name]]
    const regex = /\[\[(File|Image):([^\]|]+)(?:\|([^\]]+))?\]\]/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const filename = match[2].trim();
      const params = match[3]; // Everything after first |

      // Skip if it's a wiki template or special syntax
      if (filename.includes('{{') || filename.includes('}}')) {
        continue;
      }

      // Extract size parameter (like "24px", "400px", etc.)
      let size: number | null = null;
      if (params) {
        // Look for patterns like "24px", "400px" in the parameters
        const sizeMatch = params.match(/(\d+)px/);
        if (sizeMatch) {
          size = parseInt(sizeMatch[1]);
        }
      }

      // Store filename with its size (prefer smaller size if multiple references exist)
      const existingSize = imagesMap.get(filename);
      if (!existingSize || (size && size < existingSize)) {
        imagesMap.set(filename, size);
      }
    }
  }

  // Convert to array of {filename, size} objects
  return Array.from(imagesMap.entries())
    .map(([filename, size]) => ({ filename, size }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

// Extract all icon references from XML exports ({{icon|name}} and {{iconify|name}})
function extractIconReferences(): string[] {
  const icons = new Set<string>();

  if (!fs.existsSync(XML_DIR)) {
    console.log('Warning: wiki_exports/ directory not found. Run download first.');
    return [];
  }

  const xmlFiles = fs.readdirSync(XML_DIR).filter((f) => f.endsWith('.xml'));

  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(XML_DIR, xmlFile);
    const content = fs.readFileSync(xmlPath, 'utf-8');

    // Match both {{icon|name}} and {{iconify|name}} - both render as icons
    const iconRegex = /\{\{icon\|([^}|]+)/gi;
    const iconifyRegex = /\{\{iconify\|([^}|]+)/gi;

    let match;
    while ((match = iconRegex.exec(content)) !== null) {
      const iconName = match[1].trim();
      icons.add(iconName);
    }
    while ((match = iconifyRegex.exec(content)) !== null) {
      const iconName = match[1].trim();
      icons.add(iconName);
    }
  }

  return Array.from(icons).sort();
}

// Scrape iconify→image file mappings via MediaWiki API
async function scrapeIconifyMappings(page: Page): Promise<IconifyMapping[]> {
  const iconifyNames: string[] = [];

  // Extract iconify names from XML
  if (!fs.existsSync(XML_DIR)) {
    return [];
  }

  const xmlFiles = fs.readdirSync(XML_DIR).filter((f) => f.endsWith('.xml'));

  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(XML_DIR, xmlFile);
    const content = fs.readFileSync(xmlPath, 'utf-8');

    const regex = /\{\{iconify\|([^}|]+)/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const name = match[1].trim();
      if (!iconifyNames.includes(name)) {
        iconifyNames.push(name);
      }
    }
  }

  const mappings: IconifyMapping[] = [];

  // Process in batches
  const batchSize = 20;
  for (let i = 0; i < iconifyNames.length; i += batchSize) {
    const batch = iconifyNames.slice(i, Math.min(i + batchSize, iconifyNames.length));

    // Create wikitext with iconify templates
    const wikitext = batch.map((name) => `{{iconify|${name}}}`).join('\n\n');

    // Use MediaWiki API to parse and get rendered HTML with image URLs
    const apiUrl = `${CONFIG.WIKI_BASE_URL}/api.php?action=parse&format=json&text=${encodeURIComponent(wikitext)}&prop=text&disablelimitreport=1`;

    try {
      await page.goto(apiUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Extract the parsed HTML from JSON response
      const jsonText = await page.evaluate(() => document.body.innerText);
      const json = JSON.parse(jsonText);
      const html = json.parse.text['*'];

      // Parse HTML to extract image URLs (thumbnails, not full size)
      // Extract img src attributes - use as provided by wiki
      const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
      const urls: string[] = [];
      let imgMatch;
      while ((imgMatch = imgRegex.exec(html)) !== null) {
        urls.push(imgMatch[1].trim());
      }

      // Match iconify names to image URLs (same order)
      for (let j = 0; j < batch.length && j < urls.length; j++) {
        mappings.push({
          iconifyName: batch[j],
          imageUrl: urls[j],
        });
      }

      await page.waitForTimeout(500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`  Error processing batch: ${errorMessage}`);
    }
  }

  return mappings;
}

async function downloadModifierIcons(page: Page): Promise<void> {
  console.log('\n=== Downloading Icons ===');

  // Create icons directory
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  const allIconMappings: IconMapping[] = [];

  // Source 1: Scrape Template:Icon for general icons (1211+ identifiers)
  console.log('Fetching icon mappings from Template:Icon...');
  await page.goto(`${CONFIG.WIKI_BASE_URL}/Template:Icon`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  const templateIconMappings = await page.evaluate(() => {
    const tables = document.querySelectorAll('table');
    const mappings = new Map<string, string>();

    for (const table of tables) {
      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const identifiers = cells[0]?.textContent?.trim();
          const img = cells[1]?.querySelector('img');

          if (identifiers && img && img.src) {
            // Each cell can have multiple comma-separated identifiers
            const idList = identifiers.split(',').map((id) => id.trim());
            for (const id of idList) {
              if (id && !mappings.has(id)) {
                // Use the URL as provided by the wiki
                mappings.set(id, img.src);
              }
            }
          }
        }
      }
    }

    return Array.from(mappings.entries()).map(([id, url]) => ({ identifier: id, url }));
  });

  allIconMappings.push(...templateIconMappings);
  console.log(`  Found ${templateIconMappings.length} general icon identifiers`);

  // Source 2: Scrape Modifier_list for modifier icons (72 icons)
  console.log('Fetching modifier icons from Modifier_list...');
  await page.goto(`${CONFIG.WIKI_BASE_URL}/Modifier_list#Icons`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  const modifierIconMappings = await page.evaluate(() => {
    const results: { identifier: string; url: string }[] = [];
    const rows = document.querySelectorAll('table.wikitable tr');

    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const name1 = cells[0].textContent?.trim() || '';
        const img1 = cells[1].querySelector('img');
        if (img1 && img1.src) {
          // Use URL as provided by wiki
          results.push({ identifier: name1, url: img1.src });
        }
        if (cells.length >= 4) {
          const name2 = cells[2].textContent?.trim() || '';
          const img2 = cells[3].querySelector('img');
          if (img2 && img2.src) {
            // Use URL as provided by wiki
            results.push({ identifier: name2, url: img2.src });
          }
        }
      }
    }

    return results;
  });

  allIconMappings.push(...modifierIconMappings);
  console.log(`  Found ${modifierIconMappings.length} modifier icons`);

  // Source 3: Scrape iconify→image mappings via API (95+ trait/title icons)
  console.log('Fetching iconify icon mappings via API...');
  const iconifyMappings = await scrapeIconifyMappings(page);
  console.log(`  Found ${iconifyMappings.length} iconify icons`);

  console.log(`Total icon mappings: ${allIconMappings.length + iconifyMappings.length}`);

  // Extract icon references from XML to know which ones we actually need
  const referencedIcons = extractIconReferences();
  console.log(`Found ${referencedIcons.length} icon references in XML files`);

  let success = 0;
  let skipped = 0;
  let failed = 0;
  let notFound = 0;

  for (const iconName of referencedIcons) {
    // Normalize filename: replace spaces with underscores
    const normalizedName = iconName.replace(/ /g, '_');
    const filename = `${normalizedName}.png`;
    const filepath = path.join(ICONS_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      skipped++;
      continue;
    }

    // First, try to find in regular icon mappings (from Template:Icon and Modifier_list)
    // Try both the exact name and with underscores replaced by spaces
    let mapping = allIconMappings.find((m) => m.identifier === iconName);
    if (!mapping && iconName.includes('_')) {
      const nameWithSpaces = iconName.replace(/_/g, ' ');
      mapping = allIconMappings.find((m) => m.identifier === nameWithSpaces);
    }

    if (mapping) {
      // Download 48px version with resize fallback
      try {
        const result = await downloadAndResize(page, mapping.url, filepath, 48);
        if (result.success) {
          success++;
        } else {
          console.log(`✗ ${filename}: HTTP ${result.status}`);
          failed++;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`✗ ${filename}: ${errorMessage}`);
        failed++;
      }
      await page.waitForTimeout(200);
      continue;
    }

    // Second, try iconify mappings (trait/title icons with thumbnail URLs)
    const iconifyMapping = iconifyMappings.find((m) => m.iconifyName === iconName);

    if (iconifyMapping) {
      // Download 48px version with resize fallback
      try {
        let originalUrl = iconifyMapping.imageUrl;

        // Make absolute URL if relative
        if (originalUrl.startsWith('/')) {
          originalUrl = `${CONFIG.WIKI_BASE_URL}${originalUrl}`;
        } else if (originalUrl.startsWith('//')) {
          originalUrl = `https:${originalUrl}`;
        }

        const result = await downloadAndResize(page, originalUrl, filepath, 48);
        if (result.success) {
          success++;
        } else {
          console.log(`✗ ${filename}: HTTP ${result.status}`);
          failed++;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`✗ ${filename}: ${errorMessage}`);
        failed++;
      }
      await page.waitForTimeout(200);
      continue;
    }

    // Third, try API rendering for icons not in any mapping
    console.log(`  Trying API for ${iconName}...`);
    try {
      const apiUrl = `${CONFIG.WIKI_BASE_URL}/api.php?action=parse&format=json&text=${encodeURIComponent(`{{icon|${iconName}}}`)}&prop=text&disablelimitreport=1`;

      await page.goto(apiUrl, { waitUntil: 'networkidle', timeout: 30000 });

      const jsonText = await page.evaluate(() => document.body.innerText);
      const json = JSON.parse(jsonText);
      const html = json.parse.text['*'];

      // Extract image URL from rendered HTML
      const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/i;
      const imgMatch = imgRegex.exec(html);

      if (imgMatch) {
        let originalUrl = imgMatch[1].trim();

        // Make absolute URL if relative
        if (originalUrl.startsWith('/')) {
          originalUrl = `${CONFIG.WIKI_BASE_URL}${originalUrl}`;
        } else if (originalUrl.startsWith('//')) {
          originalUrl = `https:${originalUrl}`;
        }

        // Download 48px version with resize fallback
        const result = await downloadAndResize(page, originalUrl, filepath, 48);
        if (result.success) {
          success++;
        } else {
          console.log(`✗ ${filename}: HTTP ${result.status}`);
          failed++;
        }
      } else {
        console.log(`✗ ${filename}: No image in API response`);
        notFound++;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`✗ ${filename}: API error - ${errorMessage}`);
      notFound++;
    }
    await page.waitForTimeout(200);
  }

  console.log(
    `✓ Downloaded: ${success}, Skipped: ${skipped}, Not found: ${notFound}, Failed: ${failed}`
  );
}

async function downloadWikiImages(page: Page): Promise<void> {
  console.log('\n=== Downloading Wiki Images ===');

  // Create images directory
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // Extract image references from XML files
  const imageRefs = extractImageReferences();

  if (imageRefs.length === 0) {
    console.log('No images found in XML files');
    return;
  }

  console.log(`Found ${imageRefs.length} unique image references`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const { filename, size } of imageRefs) {
    // Save with underscores for clean filesystem
    const localFilename = filename.replace(/ /g, '_');
    const filepath = path.join(IMAGES_DIR, localFilename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      skipped++;
      continue;
    }

    try {
      // Wiki URLs use underscores (MediaWiki convention)
      const wikiFilename = filename.replace(/ /g, '_');
      const filePageUrl = `${CONFIG.WIKI_BASE_URL}/File:${wikiFilename}`;

      // Navigate to the File: page to get image URL
      await page.goto(filePageUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Get both full image URL and thumbnail URL BEFORE navigating away
      const { fullImageUrl, thumbnailUrl } = await page.evaluate(
        (targetSize: number | null) => {
          const fullLink = document.querySelector('.fullImageLink a') as HTMLAnchorElement | null;
          if (!fullLink || !fullLink.href) {
            return { fullImageUrl: null, thumbnailUrl: null };
          }

          const fullUrl = fullLink.href;
          let thumbUrl: string | null = null;

          if (targetSize) {
            // Look for thumbnail with target size
            const thumbLink = document.querySelector(
              `img[width="${targetSize}"]`
            ) as HTMLImageElement | null;
            if (thumbLink && thumbLink.src) {
              thumbUrl = thumbLink.src;
            } else {
              // Construct thumbnail URL from full image
              const filename = fullUrl.split('/').pop();
              thumbUrl =
                fullUrl.replace('/images/', '/images/thumb/') + `/${targetSize}px-${filename}`;
            }
          }

          return { fullImageUrl: fullUrl, thumbnailUrl: thumbUrl };
        },
        size ? Math.max(size, 48) : null
      );

      if (!fullImageUrl) {
        console.log(`✗ ${localFilename}: No image link found`);
        failed++;
        continue;
      }

      // If size is specified, try thumbnail first then fallback to full + resize
      if (size) {
        const targetSize = Math.max(size, 48);

        // Try to navigate to thumbnail
        let response = await page.goto(thumbnailUrl!, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });

        // If thumbnail gives HTML (blocked) or 404, get full image and resize
        const contentType = response?.headers()['content-type'] || '';
        if (contentType.includes('text/html') || response?.status() === 404) {
          response = await page.goto(fullImageUrl, { waitUntil: 'networkidle', timeout: 30000 });
        }

        if (response && response.ok()) {
          const buffer = await response.body();

          // Resize if needed
          const metadata = await sharp(buffer).metadata();
          if (metadata.width !== targetSize || metadata.height !== targetSize) {
            const resized = await sharp(buffer)
              .resize(targetSize, targetSize, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
              })
              .png()
              .toBuffer();
            fs.writeFileSync(filepath, resized);
          } else {
            fs.writeFileSync(filepath, buffer);
          }
          success++;
        } else {
          console.log(`✗ ${localFilename}: HTTP ${response?.status()}`);
          failed++;
        }
      } else {
        // No size specified - download full image without resizing
        const response = await page.goto(fullImageUrl, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });

        if (response && response.ok()) {
          const buffer = await response.body();
          fs.writeFileSync(filepath, buffer);
          success++;
        } else {
          console.log(`✗ ${localFilename}: HTTP ${response?.status()}`);
          failed++;
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`✗ ${localFilename}: ${errorMessage}`);
      failed++;
    }

    // Small delay
    await page.waitForTimeout(300);
  }

  console.log(`✓ Downloaded: ${success}, Skipped: ${skipped}, Failed: ${failed}`);
}

async function downloadAssets(browser: Browser): Promise<void> {
  const page = await browser.newPage();

  try {
    await downloadModifierIcons(page);
    await downloadWikiImages(page);

    console.log('\n=== Asset Download Complete ===');
  } finally {
    await page.close();
  }
}

export { downloadAssets };
