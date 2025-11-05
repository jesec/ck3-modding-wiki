// Generate master Table of Contents from all wiki pages
import * as fs from 'fs';
import * as path from 'path';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

/**
 * Extract headings from markdown content
 * Returns array of { level, text, slug }
 */
function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();

      // Create slug for anchor link (GitHub-style)
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      headings.push({ level, text, slug });
    }
  }

  return headings;
}

/**
 * Generate master TOC from all markdown files in wiki_pages/
 */
function generateMasterTOC(): string {
  const wikiPagesDir = path.join(import.meta.dirname, '..', 'wiki_pages');
  const files = fs
    .readdirSync(wikiPagesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  let masterToc = '# CK3 Modding Wiki - Table of Contents\n\n';
  masterToc += 'Complete index of all pages and their sections.\n\n';
  masterToc += '---\n\n';

  for (const file of files) {
    const filePath = path.join(wikiPagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const headings = extractHeadings(content);

    if (headings.length === 0) continue;

    // First heading is the page title (level 1)
    const pageTitle = headings[0];

    // Add page title as main entry
    masterToc += `## [${pageTitle.text}](wiki_pages/${file})\n\n`;

    // Add subsections (level 2 and deeper)
    for (let i = 1; i < headings.length; i++) {
      const heading = headings[i];

      // Skip level 1 headings (shouldn't be any after the title, but just in case)
      if (heading.level === 1) continue;

      // Only include level 2 and 3 headings for readability
      if (heading.level > 3) continue;

      const indent = '  '.repeat(Math.max(0, heading.level - 2));
      masterToc += `${indent}- [${heading.text}](wiki_pages/${file}#${heading.slug})\n`;
    }

    masterToc += '\n';
  }

  return masterToc;
}

/**
 * Main function
 */
function main(): void {
  try {
    const masterToc = generateMasterTOC();
    const outputPath = path.join(import.meta.dirname, '..', 'TABLE_OF_CONTENTS.md');
    fs.writeFileSync(outputPath, masterToc, 'utf8');
    console.log(`✓ Master TOC generated: ${outputPath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('✗ Error generating master TOC:', errorMessage);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateMasterTOC, extractHeadings };
