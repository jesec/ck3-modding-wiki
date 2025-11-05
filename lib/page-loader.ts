// Load available pages for link resolution
import * as fs from 'fs';
import * as path from 'path';

/**
 * Load available pages for link resolution
 * Scans wiki_exports/ directory to build a map of available pages
 */
export function loadAvailablePages(): Map<string, string> {
  const WIKI_EXPORTS_DIR = path.join(import.meta.dirname, '..', 'wiki_exports');
  const pagesMap = new Map<string, string>();

  try {
    const files = fs.readdirSync(WIKI_EXPORTS_DIR);
    files.forEach((file) => {
      if (file.endsWith('.xml')) {
        const baseName = file.replace('.xml', '');
        const lowerKey = baseName.toLowerCase();
        pagesMap.set(lowerKey, baseName); // Store actual filename casing
      }
    });
  } catch (e) {
    // Directory might not exist yet
  }

  return pagesMap;
}
