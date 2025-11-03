// AST-based wikitext to Markdown converter using wikiparser-node
// Comprehensive rewrite with all conversion issues fixed

const Parser = require('wikiparser-node');
const fs = require('fs');
const path = require('path');

// Load available pages for link resolution
// Scan wiki_exports/ to see which pages we have (and will convert to markdown)
const WIKI_EXPORTS_DIR = path.join(__dirname, '..', 'wiki_exports');
let availablePages = new Set();
let availablePagesMap = new Map(); // Map from lowercase to actual filename
try {
    const files = fs.readdirSync(WIKI_EXPORTS_DIR);
    files.forEach(file => {
        if (file.endsWith('.xml')) {
            const baseName = file.replace('.xml', '');
            const pageName = baseName.replace(/_/g, ' ');
            const lowerKey = baseName.toLowerCase();

            availablePages.add(lowerKey);
            availablePages.add(pageName.toLowerCase());
            availablePagesMap.set(lowerKey, baseName); // Store actual filename casing
        }
    });
} catch (e) {
    // Directory might not exist yet
}

/**
 * Get link target - local .md file if exists, otherwise wiki URL
 * Returns link with correct filename casing
 */
function getLinkTarget(pageName, currentPage = '') {
    // Handle empty page names (self-references like [[#Anchor]])
    if (!pageName || pageName.trim() === '') {
        return '';
    }

    const normalized = pageName.replace(/ /g, '_');
    const normalizedLower = normalized.toLowerCase();
    const currentPageLower = currentPage.toLowerCase().replace(/ /g, '_');

    // Self-reference to current page
    if (normalizedLower === currentPageLower) {
        return '';
    }

    // Direct match - use actual filename casing from map
    if (availablePagesMap.has(normalizedLower)) {
        return `${availablePagesMap.get(normalizedLower)}.md`;
    }

    // Try with 's' added (trigger → triggers)
    const plural = normalizedLower + 's';
    if (availablePagesMap.has(plural)) {
        return `${availablePagesMap.get(plural)}.md`;
    }

    // Try without 's' (triggers → trigger)
    if (normalizedLower.endsWith('s')) {
        const singular = normalizedLower.slice(0, -1);
        if (availablePagesMap.has(singular)) {
            return `${availablePagesMap.get(singular)}.md`;
        }
    }

    // Otherwise link to wiki
    return `https://ck3.paradoxwikis.com/${normalized}`;
}

/**
 * Extract template arguments from AST node
 * Templates have childNodes with 'template-name' and 'parameter' types
 */
function extractTemplateArgs(node) {
    const args = [];

    for (const child of node.childNodes || []) {
        if (child.type === 'parameter') {
            // Parameters have a '=' with left and right sides
            // For positional args, the value is in the right side
            // For named args (like custom=1), both sides exist
            const nameNode = child.childNodes.find(n => n.type === 'parameter-name');
            const valueNode = child.childNodes.find(n => n.type === 'parameter-value');

            if (valueNode) {
                const value = valueNode.childNodes.map(n => n.toString()).join('').trim();
                args.push(value);
            }
        }
    }

    return args;
}

/**
 * Get template name from node
 */
function getTemplateName(node) {
    const nameNode = node.childNodes.find(n => n.type === 'template-name');
    if (nameNode) {
        return nameNode.toString().trim();
    }
    return '';
}

/**
 * Convert template to markdown
 */
function convertTemplate(node) {
    const name = getTemplateName(node);
    const args = extractTemplateArgs(node);
    const nameLower = name.toLowerCase().replace(/^template:/i, '').trim();

    // {{path|...}} - file paths
    if (nameLower === 'path' || nameLower === 'cite file') {
        if (args.length > 0) {
            const lastArg = args[args.length - 1];
            // If it's a game path, prepend the game directory
            if (!lastArg.includes('Documents') && !lastArg.includes('Paradox Interactive')) {
                return `\`/Crusader Kings III/game/${lastArg}\``;
            }
            return `\`${lastArg}\``;
        }
        return '';
    }

    // {{Version|...}} - version markers
    if (nameLower === 'version') {
        if (args.length > 0 && args[0].toLowerCase() === 'timeless') {
            return '*This article is timeless and should be accurate for any version of the game.*\n\n';
        }
        if (args.length > 0) {
            return `> **Note:** Last verified for version ${args[0]}\n\n`;
        }
        return '';
    }

    // {{Main|...}} - main article links
    if (nameLower === 'main') {
        if (args.length > 0) {
            const target = args[0];
            const [page, anchor] = target.split('#');
            const linkTarget = getLinkTarget(page);
            const fullTarget = anchor ? `${linkTarget}#${anchor}` : linkTarget;
            return `\n> **Main article:** [${target}](${fullTarget})\n\n`;
        }
        return '';
    }

    // {{key press|...}} - keyboard keys
    if (nameLower === 'key press') {
        if (args.length > 0) {
            return `[${args[0]}]`;
        }
        return '';
    }

    // {{iconify|...}} or {{icon|...}} - icons/trait names
    if (nameLower === 'iconify' || nameLower === 'icon') {
        if (args.length > 0) {
            return `**${args[0]}**`;
        }
        return '';
    }

    // {{hatnote|...}} - disambiguation notes
    if (nameLower === 'hatnote') {
        if (args.length > 0) {
            return `\n> **Note:** ${args[0]}\n\n`;
        }
        return '';
    }

    // {{expand|...}} - expansion notices
    if (nameLower === 'expand') {
        if (args.length > 0) {
            return `\n> ⚠️ **This section needs expansion with ${args[0]}**\n\n`;
        }
        return '\n> ⚠️ **This section needs expansion**\n\n';
    }

    // Color indicators
    if (nameLower === 'red') {
        return '🔴';
    }
    if (nameLower === 'green') {
        return '✅';
    }

    // Navigation templates - convert to anchor link or remove
    if (nameLower === 'go to top') {
        return '[↑ Back to top](#)';
    }
    if (nameLower === 'see also') {
        return '\n> **See also:**';
    }

    // Navigation boxes and layout templates - remove entirely
    if (nameLower === 'modding navbox' ||
        nameLower === 'mechanics navbox' ||
        nameLower === 'clear') {
        return '';
    }

    // Unknown template - leave as comment for debugging
    return `<!-- Template: ${name} -->`;
}

/**
 * Track if we just output a closing code fence
 * Used to add blank lines between inline code and code blocks
 */
let lastOutputWasInlineCode = false;

/**
 * Convert AST node to Markdown
 */
function convertNode(node, context = {}) {
    const type = node.type;

    switch (type) {
        case 'root': {
            const content = node.childNodes.map(n => convertNode(n, context)).join('');
            // Post-process to handle quote patterns that weren't converted to bold/italic
            return content
                .replace(/'''/g, '**')
                .replace(/''/g, '*');
        }

        case 'heading': {
            const level = node.level || 2;
            const hashes = '#'.repeat(level);
            const text = node.childNodes.map(n => convertNode(n, context)).join('').trim();
            return `\n${hashes} ${text}\n`;
        }

        case 'text':
            return node.toString();

        case 'quote': {
            // Return the actual quote marks so post-processing can convert them
            return node.toString();
        }

        case 'bold':
            return `**${node.childNodes.map(n => convertNode(n, context)).join('')}**`;

        case 'italic':
            return `*${node.childNodes.map(n => convertNode(n, context)).join('')}*`;

        case 'ext': {
            // Extension tags like <pre>, <code>, <syntaxhighlight>
            const name = node.name;

            // Get inner content from ext-inner child node
            const innerNode = node.childNodes.find(n => n.type === 'ext-inner');
            const inner = innerNode ? innerNode.toString() : '';

            // Extract lang and enclose attributes for syntaxhighlight
            let lang = '';
            let enclose = '';
            if (name === 'syntaxhighlight') {
                const attrsNode = node.childNodes.find(n => n.type === 'ext-attrs');
                if (attrsNode) {
                    // Check all attributes
                    for (const attrNode of attrsNode.childNodes.filter(n => n.type === 'ext-attr')) {
                        const keyNode = attrNode.childNodes.find(n => n.type === 'attr-key');
                        const valueNode = attrNode.childNodes.find(n => n.type === 'attr-value');
                        const key = keyNode ? keyNode.toString().trim() : '';
                        const value = valueNode ? valueNode.toString().trim() : '';

                        if (key === 'lang') {
                            lang = value;
                        } else if (key === 'enclose') {
                            enclose = value;
                        }
                    }
                }
            }

            // Check if this is inline syntaxhighlight (enclose="none")
            if (name === 'syntaxhighlight' && enclose === 'none') {
                // Inline code, treat like <code> tag
                lastOutputWasInlineCode = true;
                return `\`${inner}\``;
            }

            if (name === 'pre' || name === 'syntaxhighlight') {
                // Multi-line code block
                const prefix = lastOutputWasInlineCode ? '\n' : '';
                lastOutputWasInlineCode = false;

                if (context.inTableCell) {
                    // In table cells, use inline code or simple formatting
                    // Keep newlines for now, they'll be handled specially
                    return `\`${inner.trim()}\``;
                }

                const fence = name === 'syntaxhighlight' && lang ? `\`\`\`${lang}` : '```';
                return `${prefix}\n${fence}\n${inner.trim()}\n\`\`\`\n`;
            } else if (name === 'code') {
                lastOutputWasInlineCode = true;
                return `\`${inner}\``;
            }
            return inner;
        }

        case 'table':
            return convertTable(node, context);

        case 'file': {
            // File/Image links [[File:name.png|params...]]
            // Extract filename from the file node's name attribute
            const filename = node.name ? node.name.replace(/^File:/i, '') : '';

            // Extract caption from image-parameter nodes
            let caption = filename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
            let alt = caption;

            for (const param of node.childNodes || []) {
                if (param.type === 'image-parameter') {
                    if (param.name === 'alt') {
                        alt = param.toString().replace(/^alt=/, '').trim();
                    } else if (param.name === 'caption') {
                        caption = param.childNodes.map(n => n.toString()).join('').trim();
                    }
                }
            }

            const finalCaption = alt.length > caption.length ? alt : caption;
            const wikiFileUrl = `https://ck3.paradoxwikis.com/File:${filename.replace(/ /g, '_')}`;
            return `![${finalCaption}](${wikiFileUrl})`;
        }

        case 'link': {
            // Internal wiki link [[Page]] or [[Page|Text]]
            const linkInner = node.childNodes.find(n => n.type === 'link-target');
            if (!linkInner) return '';

            const linkText = linkInner.toString();
            const parts = linkText.split('|');
            const target = parts[0].trim();
            const displayText = parts.length > 1 ? parts.slice(1).join('|').trim() : target;

            // Handle File/Image links specially
            if (target.match(/^(File|Image):/i)) {
                return convertFileLink(target, parts.slice(1));
            }

            // Split page and anchor
            const [page, anchor] = target.split('#');

            // Get link target (local .md or external URL)
            const linkTarget = getLinkTarget(page, context.currentPage || '');

            // Build full target with anchor
            let fullTarget;
            if (!linkTarget) {
                // Self-reference, just use anchor
                fullTarget = anchor ? `#${anchor.toLowerCase().replace(/\s+/g, '-')}` : '';
            } else {
                fullTarget = anchor ? `${linkTarget}#${anchor.toLowerCase().replace(/\s+/g, '-')}` : linkTarget;
            }

            const display = displayText || (anchor ? `${page}#${anchor}` : page);
            return `[${display}](${fullTarget})`;
        }

        case 'ext-link': {
            // External link [URL Text]
            // The URL is in an 'ext-link-url' child, text in 'ext-link-text'
            let url = '';
            let text = '';

            for (const child of node.childNodes || []) {
                if (child.type === 'ext-link-url') {
                    url = child.toString().trim();
                } else if (child.type === 'ext-link-text') {
                    text = child.childNodes.map(n => convertNode(n, context)).join('').trim();
                }
            }

            text = text || url;
            return `[${text}](${url})`;
        }

        case 'list': {
            // Unordered or ordered list
            return node.childNodes.map(n => convertNode(n, context)).join('');
        }

        case 'list-item': {
            // Check the actual marker type from the node
            const itemStr = node.toString();
            const isOrdered = itemStr.trim().startsWith('#');
            const marker = isOrdered ? '1.' : '-';
            const content = node.childNodes.map(n => convertNode(n, context)).join('').trim();
            return `${marker} ${content}\n`;
        }

        case 'html': {
            // HTML tags
            const tag = node.name;
            const inner = node.childNodes.map(n => convertNode(n, context)).join('');

            if (tag === 'br') {
                return context.inTableCell ? '<br>' : '\n';
            } else if (tag === 'code') {
                lastOutputWasInlineCode = true;
                return `\`${inner}\``;
            }

            // Strip HTML comments entirely
            if (node.toString().trim().startsWith('<!--')) {
                return '';
            }

            // Pass through other HTML
            return node.toString();
        }

        case 'comment': {
            // Strip all HTML comments
            return '';
        }

        case 'template': {
            return convertTemplate(node);
        }

        default:
            // Unknown node type - recurse into children
            if (node.childNodes && node.childNodes.length > 0) {
                return node.childNodes.map(n => convertNode(n, context)).join('');
            }
            return node.toString();
    }
}

/**
 * Convert File/Image links to markdown
 */
function convertFileLink(target, params) {
    const filename = target.replace(/^(File|Image):/i, '');

    // Extract caption from params (last non-formatting param)
    let caption = filename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    let alt = caption;

    for (const param of params) {
        const p = param.trim();
        const altMatch = p.match(/^alt=(.+)$/i);
        if (altMatch) {
            alt = altMatch[1];
            continue;
        }

        // Skip formatting parameters
        if (p.match(/^(thumb|thumbnail|left|right|center|none|\d+px|x\d+px|frame|frameless|border|upright|link=.*|class=.*)$/i)) {
            continue;
        }

        // This is the caption
        caption = p;
    }

    const finalCaption = alt.length > caption.length ? alt : caption;
    const wikiFileUrl = `https://ck3.paradoxwikis.com/File:${filename.replace(/ /g, '_')}`;
    return `![${finalCaption}](${wikiFileUrl})`;
}

/**
 * Check if a td node is a table caption (|+)
 */
function isCaption(tdNode) {
    const syntaxNode = tdNode.childNodes.find(n => n.type === 'table-syntax');
    if (syntaxNode) {
        const syntax = syntaxNode.toString().trim();
        return syntax === '|+';
    }
    return false;
}

/**
 * Check if content is a code block (starts with ``` and ends with ```)
 */
function isCodeBlock(content) {
    const trimmed = content.trim();
    return trimmed.startsWith('```') && trimmed.endsWith('```');
}

/**
 * Check if content contains code formatting
 */
function hasCodeFormatting(content) {
    return content.includes('`');
}

/**
 * Convert table AST to Markdown table (accounting for colspan/rowspan)
 */
function convertTable(tableNode, context) {
    // Build table grid accounting for colspan/rowspan
    const grid = [];
    let currentRow = 0;

    // First pass: collect all cells with their spans
    const allCells = [];

    for (const child of tableNode.childNodes) {
        if (child.type === 'tr') {
            currentRow++;
            for (const cell of child.childNodes) {
                if (cell.type === 'td' && !isCaption(cell)) {
                    allCells.push({
                        row: currentRow,
                        content: extractCellContent(cell, context),
                        colspan: parseInt(cell.colspan) || 1,
                        rowspan: parseInt(cell.rowspan) || 1,
                        isHeader: cell.childNodes.some(n => n.type === 'table-syntax' && n.toString().trim().startsWith('!'))
                    });
                }
            }
        } else if (child.type === 'td' && !isCaption(child)) {
            // Cell before first row separator
            allCells.push({
                row: 0,
                content: extractCellContent(child, context),
                colspan: parseInt(child.colspan) || 1,
                rowspan: parseInt(child.rowspan) || 1,
                isHeader: child.childNodes.some(n => n.type === 'table-syntax' && n.toString().trim().startsWith('!'))
            });
        }
    }

    if (allCells.length === 0) return '\n*(Empty table)*\n';

    // Determine base column count from the row with the most columns
    // (can't rely on row 0 which may be empty)
    const maxRow = Math.max(...allCells.map(c => c.row));
    let baseColumns = 0;
    for (let r = 0; r <= maxRow; r++) {
        const rowCells = allCells.filter(c => c.row === r);
        const rowColspan = rowCells.reduce((sum, c) => sum + c.colspan, 0);
        if (rowColspan > baseColumns) {
            baseColumns = rowColspan;
        }
    }

    // Fallback if we still don't have columns
    if (baseColumns === 0) baseColumns = Math.max(...allCells.map(c => c.colspan)) || 1;

    // Build grid

    for (let r = 0; r <= maxRow; r++) {
        grid[r] = new Array(baseColumns).fill(null);
    }

    // Place cells in grid
    for (const cell of allCells) {
        let col = 0;
        // Find first available column in this row
        while (col < baseColumns && grid[cell.row][col] !== null) {
            col++;
        }

        // Check if this is a section header (large colspan, usually entire width)
        // But distinguish between table headers (first row) and section dividers (later rows)
        if (cell.colspan >= baseColumns * 0.5 && cell.isHeader) {
            if (cell.row <= 1) {
                // This is a table header row (first or second row) - keep in table
                cell.isTableHeader = true;
            } else {
                // This is a section divider within the table - extract it
                cell.isSectionHeader = true;
            }
        }

        // Place cell and fill span
        for (let r = 0; r < cell.rowspan; r++) {
            for (let c = 0; c < cell.colspan; c++) {
                if (grid[cell.row + r]) {
                    grid[cell.row + r][col + c] = cell;
                }
            }
        }
    }

    // Convert grid to markdown
    let mdTable = '\n';
    let hasAddedSeparator = false;

    for (let r = 0; r <= maxRow; r++) {
        const row = grid[r];
        if (!row) continue;

        // Check if this row is all section headers
        const firstCell = row.find(c => c !== null);
        if (firstCell && firstCell.isSectionHeader) {
            // Render as section divider
            mdTable += `\n**${firstCell.content}**\n\n`;
            continue;
        }

        // Build row cells, avoiding duplicates from span
        const rowCells = [];
        const seen = new Set();

        for (let c = 0; c < baseColumns; c++) {
            const cell = row[c];
            if (cell && !seen.has(cell)) {
                seen.add(cell);
                let cellContent = processTableCell(cell.content);
                // Bold headers (th tags): both table headers and inline headers, but not section dividers
                if (cell.isHeader && !cell.isSectionHeader) {
                    cellContent = `**${cellContent}**`;
                }
                rowCells.push(cellContent);
            } else {
                // Either no cell, or cell already output due to colspan
                rowCells.push('');
            }
        }

        mdTable += '| ' + rowCells.join(' | ') + ' |\n';

        // Add separator after first row
        if (!hasAddedSeparator) {
            mdTable += '|' + ' --- |'.repeat(baseColumns) + '\n';
            hasAddedSeparator = true;
        }
    }

    mdTable += '\n';
    return mdTable;
}

/**
 * Process table cell content for output
 */
function processTableCell(content) {
    let processed = content;

    // Convert multi-line code blocks from backticks to HTML <pre><code>
    processed = processed.replace(/`([^`]+)`/g, (match, code) => {
        if (code.includes('\n')) {
            const escaped = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');  // Replace newlines with <br> for markdown table compatibility
            return `<pre><code>${escaped}</code></pre>`;
        } else {
            return `\`${code}\``;
        }
    });

    // Escape pipes in non-code content
    return processed.replace(/\|(?![^<]*<\/code>)/g, '\\|');
}

/**
 * Track extracted code blocks for referencing in tables
 */
const extractedCodeBlocks = [];

/**
 * Extract content from a td node
 */
function extractCellContent(tdNode, context) {
    // Find td-inner node which contains the actual cell content
    const innerNode = tdNode.childNodes.find(n => n.type === 'td-inner');
    if (!innerNode) {
        return '';
    }

    // Mark that we're in a table cell for code block handling
    const cellContext = { ...context, inTableCell: true };

    // Convert the inner content to markdown
    let content = innerNode.childNodes.map(n => convertNode(n, cellContext)).join('').trim();

    // Check if this cell has a MASSIVE code block (>50 lines or >2000 chars)
    if (content.includes('`')) {
        const codeMatch = content.match(/`([^`]+)`/);
        if (codeMatch) {
            const code = codeMatch[1];
            const lineCount = code.split('\n').length;

            // Extract large code blocks outside the table
            if (lineCount > 50 || code.length > 2000) {
                const blockId = extractedCodeBlocks.length;
                extractedCodeBlocks.push({
                    code: code,
                    lang: 'json' // Default to json for large blocks, could be smarter
                });

                // Replace with reference
                content = `*See [Code Block ${blockId + 1}](#code-block-${blockId + 1}) below*`;
            }
        }
    }

    // Don't replace newlines inside code blocks
    // Only replace newlines in plain text multi-line cells
    if (content.includes('\n') && !hasCodeFormatting(content)) {
        content = content.replace(/\n/g, '<br>');
    }

    return content;
}

/**
 * Convert indented code blocks (MediaWiki convention: lines starting with space)
 * to fenced code blocks
 */
function convertIndentedCodeBlocks(markdown) {
    const lines = markdown.split('\n');
    const result = [];
    let inIndentedBlock = false;
    let inFencedBlock = false;
    let codeBlockLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isIndented = line.length > 0 && line[0] === ' ';
        const isFence = line.trim() === '```' || line.trim().startsWith('```');
        const isListItem = /^\s*([-*+]|\d+\.)\s/.test(line); // Markdown list item (-, *, +, or 1.)

        // Track if we're inside a fenced code block (already converted by AST)
        if (isFence) {
            inFencedBlock = !inFencedBlock;
            result.push(line);
            continue;
        }

        // Skip indented block conversion if we're inside a fenced block
        if (inFencedBlock) {
            result.push(line);
            continue;
        }

        // Skip list items - they're not code blocks even if indented
        if (isListItem) {
            // If we were in a code block, end it first
            if (inIndentedBlock) {
                result.push('```');
                result.push(...codeBlockLines);
                result.push('```');
                codeBlockLines = [];
                inIndentedBlock = false;
            }
            result.push(line);
            continue;
        }

        // Handle indented blocks (MediaWiki style)
        if (isIndented && !inIndentedBlock) {
            // Start of an indented code block
            inIndentedBlock = true;
            codeBlockLines = [line];
        } else if (isIndented && inIndentedBlock) {
            // Continuation of indented code block
            codeBlockLines.push(line);
        } else if (!isIndented && inIndentedBlock) {
            // End of indented code block
            result.push('```');
            result.push(...codeBlockLines);
            result.push('```');
            codeBlockLines = [];
            inIndentedBlock = false;
            result.push(line);
        } else {
            // Normal line
            result.push(line);
        }
    }

    // Handle code block at end of file
    if (inIndentedBlock && codeBlockLines.length > 0) {
        result.push('```');
        result.push(...codeBlockLines);
        result.push('```');
    }

    return result.join('\n');
}

/**
 * Convert MediaWiki list syntax to Markdown
 * MediaWiki: # for ordered, * for unordered
 * Markdown: 1. for ordered, - for unordered
 */
function convertWikiListsToMarkdown(text) {
    const lines = text.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if line starts with # or * (MediaWiki list markers)
        // May or may not have space after markers
        // Exclude markdown headings by checking if content looks like heading
        const listMatch = line.match(/^([#*]+)\s*(.*)$/);

        if (listMatch) {
            const markers = listMatch[1];
            const content = listMatch[2];

            // Skip if this looks like a markdown heading (multiple consecutive # only)
            // e.g., ## Heading or ### Heading
            // But allow #* (nested list) or #** etc.
            if (markers.length > 1 && /^#+$/.test(markers)) {
                result.push(line);
                continue;
            }
            const depth = markers.length - 1; // 0-indexed depth
            const indent = '  '.repeat(depth); // 2 spaces per level

            // Determine list type from last marker
            const lastMarker = markers[markers.length - 1];
            const marker = lastMarker === '#' ? '1.' : '-';

            result.push(`${indent}${marker} ${content}`);
        } else {
            result.push(line);
        }
    }

    return result.join('\n');
}

/**
 * Convert MediaWiki XML content to Markdown using AST parsing
 */
function convertXmlToMarkdown(xmlContent, pageName) {
    // Clear extracted code blocks from previous conversion
    extractedCodeBlocks.length = 0;

    // Extract wikitext from XML
    const wikitextMatch = xmlContent.match(/<text[^>]*>([\s\S]*?)<\/text>/);
    if (!wikitextMatch) {
        throw new Error('Could not extract wikitext from XML');
    }

    let wikitext = wikitextMatch[1];

    // Decode HTML entities
    wikitext = wikitext
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&'); // Must be last!

    // Protect comparison operators with pipes before parsing
    // (wikiparser-node treats | as cell separator and gets confused by <|, <=|, etc.)
    const operatorPlaceholders = new Map();
    let placeholderIndex = 0;
    wikitext = wikitext.replace(/([<>=!]+)\|/g, (match, operator) => {
        const placeholder = `__OP_${placeholderIndex++}__`;
        operatorPlaceholders.set(placeholder, match);
        return placeholder;
    });

    // Parse wikitext to AST
    const ast = Parser.parse(wikitext);

    // Convert AST to Markdown with context
    const context = { currentPage: pageName };
    let markdown = convertNode(ast, context);

    // Restore comparison operators with pipes
    for (const [placeholder, original] of operatorPlaceholders) {
        markdown = markdown.replace(new RegExp(placeholder, 'g'), original);
    }

    // Post-process: Convert MediaWiki list syntax to Markdown
    // MediaWiki uses # for ordered lists and * for unordered lists
    // But these aren't being parsed as list nodes, so we need to convert them manually
    markdown = convertWikiListsToMarkdown(markdown);

    // Convert indented code blocks (MediaWiki convention)
    markdown = convertIndentedCodeBlocks(markdown);

    // Clean up excessive blank lines
    markdown = markdown.replace(/\n{4,}/g, '\n\n\n');

    // Append extracted code blocks at the end
    if (extractedCodeBlocks.length > 0) {
        markdown += '\n\n---\n\n## Extracted Code Blocks\n\n';
        extractedCodeBlocks.forEach((block, index) => {
            markdown += `<a id="code-block-${index + 1}"></a>\n`;
            markdown += `### Code Block ${index + 1}\n\n`;
            markdown += `\`\`\`${block.lang}\n${block.code}\n\`\`\`\n\n`;
        });
    }

    // Add metadata
    const header = `# ${pageName}\n\n`;
    const url = `https://ck3.paradoxwikis.com/${pageName.replace(/ /g, '_')}`;
    const footer = `\n\n---\n\n*Source: ${url}*\n`;

    return header + markdown.trim() + footer;
}

module.exports = {
    convertXmlToMarkdown
};
