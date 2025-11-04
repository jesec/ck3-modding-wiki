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
            return '> *This article is timeless and should be accurate for any version of the game.*\n\n';
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
            // Escape backticks in key names to prevent Markdown code formatting issues
            const key = args[0].replace(/`/g, '\\`');
            return `[${key}]`;
        }
        return '';
    }

    // {{icon|...}} and {{iconify|...}} - both render as icons
    // Syntax: {{icon|identifier}} or {{icon|identifier|width}} or {{icon|identifier|alt=text}}
    // We ignore width parameter since we use fixed 48px thumbnails
    if (nameLower === 'icon' || nameLower === 'iconify') {
        if (args.length > 0) {
            const iconName = args[0].trim();
            // Normalize path: replace spaces with underscores
            const normalizedPath = iconName.replace(/ /g, '_');
            // Use icon name as alt text
            return `![${iconName}](../assets/icons/${normalizedPath}.png)`;
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

    // Navigation templates - remove
    if (nameLower === 'go to top') {
        return '';
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

        case 'text': {
            let text = node.toString();

            // Escape angle brackets for proper HTML rendering (but not inside code blocks)
            if (!context._inCode) {
                text = text.replace(/</g, '&lt;');
                // Escape > but preserve markdown blockquote markers (> followed by space)
                // Use negative lookahead to not escape > when followed by space
                text = text.replace(/>(?! )/g, '&gt;');
            }

            // If we're buffering a list item, add this text to the buffer
            if (context._inListItem && !context._inLinkText) {
                // Check if this is the list marker itself
                const trimmed = text.trim();
                if (trimmed.match(/^[#*]+$/)) {
                    // This is just the marker, skip it
                    return '';
                }

                // Check if this text contains a newline (end of list item)
                if (text.includes('\n')) {
                    // This is the end of the list item
                    const parts = text.split('\n');
                    const contentBeforeNewline = parts[0];
                    const contentAfterNewline = parts.slice(1).join('\n');
                    context._listBuffer += contentBeforeNewline;

                    // Format the complete list item
                    const level = context._listLevel;
                    const marker = context._listMarker;
                    const indent = level > 1 ? '   '.repeat(level - 1) : '';
                    const listMarker = marker.includes('*') ? '-' : '1.';
                    const content = context._listBuffer.trim();

                    // Clear the buffering state
                    context._inListItem = false;
                    delete context._listLevel;
                    delete context._listMarker;
                    delete context._listBuffer;

                    // Fix cases where bold markers are followed by asterisks (e.g., ***l_ should be **\*l_)
                    const fixedContent = content.replace(/\*\*\*([^*])/g, '**\\*$1');

                    // Return the formatted list item AND any remaining text after the newline
                    // Add blank line before content if it exists and doesn't start with whitespace (indicating another list)
                    const separator = contentAfterNewline.trim() && !contentAfterNewline.match(/^\s/) ? '\n' : '';
                    return `${indent}${listMarker} ${fixedContent}\n${separator}${contentAfterNewline}`;
                } else {
                    // Add to buffer and return empty (we'll output it all at once)
                    context._listBuffer += text;
                    return '';
                }
            }

            return text;
        }

        case 'quote': {
            // Convert '''text''' to **text**
            const quoteStr = node.toString();
            if (quoteStr === "'''") {
                // This is a bold marker in wikitext
                // If we're in a list item, add to buffer
                if (context._inListItem && !context._inLinkText) {
                    context._listBuffer += '**';
                    return '';
                }
                // Not in list, convert to markdown bold marker
                return '**';
            } else if (quoteStr === "''") {
                // Italic
                if (context._inListItem && !context._inLinkText) {
                    context._listBuffer += '*';
                    return '';
                }
                return '*';
            }
            return quoteStr;
        }

        case 'bold': {
            const boldContent = node.childNodes.map(n => convertNode(n, context)).join('');
            const boldMd = `**${boldContent}**`;
            if (context._inListItem && !context._inLinkText) {
                context._listBuffer += boldMd;
                return '';
            }
            return boldMd;
        }

        case 'italic': {
            const italicContent = node.childNodes.map(n => convertNode(n, context)).join('');
            const italicMd = `*${italicContent}*`;
            if (context._inListItem && !context._inLinkText) {
                context._listBuffer += italicMd;
                return '';
            }
            return italicMd;
        }

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
                if (context.inTableCell) {
                    // In table cells, use inline code or simple formatting
                    // Keep newlines for now, they'll be handled specially
                    return `\`${inner.trim()}\``;
                }

                // <pre> and <syntaxhighlight> are ALWAYS block-level elements in MediaWiki
                // They are never rendered inline, even when mixed with text
                const prefix = lastOutputWasInlineCode ? '\n' : '';
                lastOutputWasInlineCode = false;

                const fence = name === 'syntaxhighlight' && lang ? `\`\`\`${lang}` : '```';
                // Add double newline after code blocks to create paragraph separation
                const suffix = '\n\n';
                return `${prefix}\n${fence}\n${inner.trim()}\n\`\`\`${suffix}`;
            } else if (name === 'code') {
                lastOutputWasInlineCode = true;
                return `\`${inner}\``;
            }
            return inner;
        }

        case 'table':
            // If we're inside a table cell, convert nested tables to lists instead
            if (context.inTableCell) {
                return convertNestedTableToList(node, context);
            }
            return convertTable(node, context);

        case 'file': {
            // File/Image links [[File:name.png|params...]]
            // Extract filename - use link-target to preserve original case
            let filename = '';
            const linkTarget = node.childNodes?.find(n => n.type === 'link-target');
            if (linkTarget) {
                const textNode = linkTarget.childNodes?.[0];
                if (textNode && textNode.data) {
                    filename = textNode.data.replace(/^File:/i, '');
                }
            }
            // Fallback to node.name if link-target not found
            if (!filename && node.name) {
                filename = node.name.replace(/^File:/i, '');
            }

            // Extract caption and alt from image-parameter nodes
            let caption = '';
            let alt = filename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
            let hasThumb = false;

            for (const param of node.childNodes || []) {
                if (param.type === 'image-parameter') {
                    const paramName = param.name;

                    if (paramName === 'alt') {
                        const altText = param.toString().replace(/^alt=/, '').trim();
                        // Only override default alt if we have a non-empty value
                        if (altText) {
                            alt = altText;
                        }
                    } else if (paramName === 'caption') {
                        caption = param.childNodes.map(n => n.toString()).join('').trim();
                    } else if (paramName && paramName.match(/^(thumb|thumbnail)$/i)) {
                        hasThumb = true;
                    } else if (!paramName || !paramName.match(/^(left|right|center|none|\d+px|x\d+px|frame|frameless|border|upright|link|class|width|height)$/i)) {
                        // Unnamed parameter that's not a formatting directive = caption
                        const text = param.childNodes.map(n => n.toString()).join('').trim();
                        if (text) caption = text;
                    }
                }
            }

            // Convert spaces to underscores to match saved filenames
            const localFilename = filename.replace(/ /g, '_');

            // If thumb directive present and caption exists, create figure with caption
            if (hasThumb && caption) {
                return `<figure>\n\n![${alt}](../assets/images/${localFilename})\n<figcaption>${caption}</figcaption>\n</figure>\n`;
            }

            // Otherwise just return plain markdown image with alt text
            return `![${alt}](../assets/images/${localFilename})`;
        }

        case 'link': {
            // Internal wiki link [[Page]] or [[Page|Text]]
            const linkTargetNode = node.childNodes.find(n => n.type === 'link-target');
            if (!linkTargetNode) return '';

            // Set flag to prevent child text nodes from adding to buffer
            const wasInLinkText = context._inLinkText;
            context._inLinkText = true;

            // Get target from link-target node
            const target = linkTargetNode.toString().trim();

            // Get display text from link-text node (if present)
            const linkTextNode = node.childNodes.find(n => n.type === 'link-text');
            const displayText = linkTextNode ? linkTextNode.toString().trim() : target;

            context._inLinkText = wasInLinkText;

            // Handle File/Image links specially (though these should be handled by 'file' case)
            if (target.match(/^(File|Image):/i)) {
                // File/Image links are handled by the 'file' case in the AST
                // This is a fallback in case they come through as regular links
                return '';
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
            const linkMd = `[${display}](${fullTarget})`;

            if (context._inListItem) {
                context._listBuffer += linkMd;
                return '';
            }
            return linkMd;
        }

        case 'ext-link': {
            // External link [URL Text]
            // The URL is in an 'ext-link-url' child, text in 'ext-link-text'
            let url = '';
            let text = '';

            // Set flag to prevent child text nodes from adding to buffer
            const wasInLinkText = context._inLinkText;
            context._inLinkText = true;

            for (const child of node.childNodes || []) {
                if (child.type === 'ext-link-url') {
                    url = child.toString().trim();
                } else if (child.type === 'ext-link-text') {
                    text = child.childNodes.map(n => convertNode(n, context)).join('').trim();
                }
            }

            context._inLinkText = wasInLinkText;

            text = text || url;
            const linkMd = `[${text}](${url})`;

            if (context._inListItem) {
                context._listBuffer += linkMd;
                return '';
            }
            return linkMd;
        }

        case 'list': {
            // List nodes in wikiparser contain the marker (# or *) in a text child
            // The actual content follows as sibling nodes until we hit a newline
            let marker = '';
            let level = 1;

            for (const child of node.childNodes || []) {
                if (child.type === 'text') {
                    const text = child.data || child.toString();
                    const trimmed = text.trim();

                    // Check if this is a list marker (#, ##, *, **, #*, etc.)
                    if (trimmed.match(/^[#*]+$/)) {
                        marker = trimmed;
                        level = marker.length;
                        break;
                    }
                }
            }

            // Start buffering list item content
            context._inListItem = true;
            context._listLevel = level;
            context._listMarker = marker;
            context._listBuffer = '';

            return '';
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
                const br = context.inTableCell ? '<br>' : '\n';
                if (context._inListItem && !context._inLinkText) {
                    context._listBuffer += br;
                    return '';
                }
                return br;
            } else if (tag === 'code') {
                lastOutputWasInlineCode = true;
                // Set flag to prevent escaping angle brackets in code
                const wasInCode = context._inCode;
                context._inCode = true;
                const inner = node.childNodes.map(n => convertNode(n, context)).join('');
                context._inCode = wasInCode;

                const code = `\`${inner}\``;
                if (context._inListItem && !context._inLinkText) {
                    context._listBuffer += code;
                    return '';
                }
                return code;
            }

            // Strip HTML comments entirely
            if (node.toString().trim().startsWith('<!--')) {
                return '';
            }

            // Pass through other HTML
            const html = node.toString();
            if (context._inListItem && !context._inLinkText) {
                context._listBuffer += html;
                return '';
            }
            return html;
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
    let caption = '';
    let alt = filename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    let hasThumb = false;

    for (const param of params) {
        const p = param.trim();
        const altMatch = p.match(/^alt=(.+)$/i);
        if (altMatch) {
            alt = altMatch[1];
            continue;
        }

        // Check for thumb/thumbnail directive
        if (p.match(/^(thumb|thumbnail)$/i)) {
            hasThumb = true;
            continue;
        }

        // Skip other formatting parameters
        if (p.match(/^(left|right|center|none|\d+px|x\d+px|frame|frameless|border|upright|link=.*|class=.*)$/i)) {
            continue;
        }

        // This is the caption (last unnamed parameter)
        caption = p;
    }

    // Convert spaces to underscores to match saved filenames
    const localFilename = filename.replace(/ /g, '_');

    // If thumb directive present and caption exists, create figure with caption
    if (hasThumb && caption) {
        return `<figure>\n\n![${alt}](../assets/images/${localFilename})\n\n<figcaption>${caption}</figcaption>\n</figure>\n`;
    }

    // Otherwise just return plain markdown image with alt text
    return `![${alt}](../assets/images/${localFilename})`;
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
 * Convert collapsible wiki table to HTML <details> element
 */
function convertCollapsibleTable(tableNode, context) {
    // Check if table has a caption (|+ syntax) - indicates it's a data table
    // Note: wikiparser parses captions as td cells with |+ syntax
    const captionNode = tableNode.childNodes?.find(n => {
        if (n.type === 'caption') return true;
        if (n.type === 'td') {
            const syntax = n.childNodes?.find(c => c.type === 'table-syntax');
            if (syntax) {
                const syntaxText = syntax.childNodes?.[0]?.data || '';
                return syntaxText.includes('|+');
            }
        }
        return false;
    });

    // Check if table has header cells (!) - indicates it's a data table
    const hasHeaders = tableNode.childNodes?.some(n => {
        if (n.type === 'tr') {
            return n.childNodes?.some(cell =>
                cell.type === 'td' && cell.childNodes?.some(syntax =>
                    syntax.type === 'table-syntax' && syntax.toString().trim().startsWith('!')
                )
            );
        }
        return n.type === 'td' && n.childNodes?.some(syntax =>
            syntax.type === 'table-syntax' && syntax.toString().trim().startsWith('!')
        );
    });

    // Check if this is a presentational table (role="presentation")
    let isPresentation = false;
    const tableAttrsNode = tableNode.childNodes?.find(n => n.type === 'table-attrs');
    if (tableAttrsNode) {
        const roleAttr = tableAttrsNode.childNodes?.find(n => n.type === 'table-attr' && n.name === 'role');
        if (roleAttr) {
            const attrValue = roleAttr.childNodes?.find(n => n.type === 'attr-value');
            if (attrValue) {
                const textNode = attrValue.childNodes?.find(n => n.type === 'text');
                if (textNode && textNode.data === 'presentation') {
                    isPresentation = true;
                }
            }
        }
    }

    // If it's a data table (has caption or headers) and not marked as presentational,
    // convert it as a table inside <details>
    if ((captionNode || hasHeaders) && !isPresentation) {
        // Extract caption for the summary
        let summary = 'Show/Hide';
        if (captionNode) {
            // Extract content from caption cell
            summary = extractCellContent(captionNode, context).trim();
            summary = summary.replace(/``([^`]+)``/g, '`$1`');
        }

        // Convert the table as a regular markdown table
        // Pass a flag to prevent infinite recursion
        const tableContext = { ...context, _inCollapsible: true };
        const tableMarkdown = convertTableWithoutCollapsibleCheck(tableNode, tableContext);

        return `\n<details>\n<summary>${summary}</summary>\n\n${tableMarkdown}\n</details>\n`;
    }

    // Otherwise, treat as presentational wrapper (original logic for role="presentation" tables)
    const rows = [];
    for (const child of tableNode.childNodes) {
        if (child.type === 'tr') {
            rows.push(child);
        } else if (child.type === 'td') {
            rows.push({ type: 'tr', childNodes: [child] });
        }
    }

    if (rows.length === 0) return '';

    const firstRow = rows[0];
    const firstCell = firstRow.childNodes?.find(n => n.type === 'td');
    let summary = firstCell ? extractCellContent(firstCell, context).trim() : 'Show/Hide';
    summary = summary.replace(/``([^`]+)``/g, '`$1`');

    const contentRows = rows.slice(1);
    const content = contentRows.map(row => {
        const cells = row.childNodes?.filter(n => n.type === 'td') || [];
        return cells.map(cell => {
            let cellContent = extractCellContent(cell, context).trim();
            if (cellContent.startsWith('`') && cellContent.endsWith('`') && cellContent.includes('\n')) {
                const code = cellContent.slice(1, -1);
                return '```\n' + code + '\n```';
            }
            return cellContent;
        }).join('\n\n');
    }).filter(c => c).join('\n\n');

    return `\n<details>\n<summary>${summary}</summary>\n\n${content}\n\n</details>\n`;
}

/**
 * Convert table without checking for collapsible class (used internally)
 */
function convertTableWithoutCollapsibleCheck(tableNode, context) {
    // Just call convertTable with a flag to skip collapsible check
    return convertTable(tableNode, { ...context, _skipCollapsibleCheck: true });
}

/**
 * Convert nested tables (tables inside table cells) to HTML table tags
 * Markdown doesn't support nested tables, so we use HTML to preserve structure
 * Collapsible tables (mw-collapsible) are converted to <details> elements
 */
function convertNestedTableToList(tableNode, context) {
    // Check if this is a collapsible table
    const tableAttrs = tableNode.childNodes?.find(n => n.type === 'table-attrs');
    const attrsText = tableAttrs ? tableAttrs.toString() : '';
    const isCollapsible = attrsText.includes('mw-collapsible');

    // Extract all cells - they might be in <tr> nodes OR direct children of table
    const allCells = [];
    const rows = [];

    for (const child of tableNode.childNodes || []) {
        if (child.type === 'tr') {
            rows.push(child);
        } else if (child.type === 'td') {
            // Direct td child without tr wrapper
            allCells.push(child);
        }
    }

    // If we have direct td children (no tr wrappers), handle as single row
    if (allCells.length > 0 && rows.length === 0) {
        if (allCells.length === 1) {
            // Single cell table - check if collapsible
            const content = extractCellContent(allCells[0], { ...context, inTableCell: false });

            if (isCollapsible) {
                // Convert to <details> element for collapsible content
                return `<br><details><summary>Show format</summary>${content}</details>`;
            }

            // Non-collapsible single cell - return content inline
            return content || '';
        }
        // Multiple cells without tr - create synthetic row
        rows.push({ childNodes: allCells });
    }

    if (rows.length === 0) return '';

    // If collapsible with rows, check if it's a real table or just a wrapper for content
    if (isCollapsible && rows.length > 0) {
        // Check if this is a single-row table with caption + content (like "living" cell)
        if (rows.length === 1) {
            const cells = rows[0].childNodes?.filter(n => n.type === 'td') || [];

            // If 2 cells and first is empty (caption), extract just the content
            if (cells.length === 2) {
                const firstContent = extractCellContent(cells[0], { ...context, inTableCell: false }).trim();
                const secondContent = extractCellContent(cells[1], { ...context, inTableCell: false });

                if (!firstContent && secondContent) {
                    // First cell empty, second has content - just wrap content in details
                    return `<br><details><summary>Show format</summary>${secondContent}</details>`;
                }
            }
        }

        // Real table with data - wrap table in <details>
        let html = '<br><details><summary>Show details</summary><table>';

        for (const row of rows) {
            const cells = row.childNodes?.filter(n => n.type === 'td') || [];

            // Check if this is a header row
            const isHeader = cells.some(cell => {
                const syntax = cell.childNodes?.find(n => n.type === 'table-syntax');
                return syntax && syntax.toString().includes('!');
            });

            html += '<tr>';
            for (const cell of cells) {
                const tag = isHeader ? 'th' : 'td';
                const content = extractCellContent(cell, { ...context, inTableCell: false });
                html += `<${tag}>${content}</${tag}>`;
            }
            html += '</tr>';
        }

        html += '</table></details>';
        return html;
    }

    // Build HTML table to preserve structure
    // No <br> prefix needed - natural newline in content will provide spacing
    // All on one line to keep markdown table valid
    let html = '<table>';

    for (const row of rows) {
        const cells = row.childNodes?.filter(n => n.type === 'td') || [];

        // Check if this is a header row
        const isHeader = cells.some(cell => {
            const syntax = cell.childNodes?.find(n => n.type === 'table-syntax');
            return syntax && syntax.toString().includes('!');
        });

        html += '<tr>';

        for (const cell of cells) {
            const tag = isHeader ? 'th' : 'td';
            const content = extractCellContent(cell, { ...context, inTableCell: false });
            html += `<${tag}>${content}</${tag}>`;
        }

        html += '</tr>';
    }

    html += '</table>';
    return html;
}

/**
 * Convert markdown syntax to HTML for use in HTML tables
 */
function convertMarkdownToHtml(text) {
    // Convert links: [text](url) to <a href="url">text</a>
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert bold: **text** to <strong>text</strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert italic: *text* to <em>text</em> (but not inside already processed tags)
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Convert inline code: `text` to <code>text</code>
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    return text;
}

/**
 * Render table as HTML (used when table has colspan which Markdown doesn't support)
 */
function renderHtmlTable(grid, maxGridRow, baseColumns, allCells) {
    let html = '\n<table>\n';

    for (let r = 0; r <= maxGridRow; r++) {
        const row = grid[r];
        if (!row) continue;

        html += '<tr>';

        const seen = new Set();
        for (let c = 0; c < baseColumns; c++) {
            const cell = row[c];
            if (cell && !seen.has(cell)) {
                seen.add(cell);
                const tag = cell.isHeader ? 'th' : 'td';
                let content = processTableCell(cell.content);
                // Convert markdown syntax to HTML for HTML tables
                content = convertMarkdownToHtml(content);
                const colspanAttr = cell.colspan > 1 ? ` colspan="${cell.colspan}"` : '';
                html += `<${tag}${colspanAttr}>${content}</${tag}>`;
            }
        }

        html += '</tr>\n';
    }

    html += '</table>\n';
    return html;
}

/**
 * Convert table AST to Markdown table (accounting for colspan/rowspan)
 */
function convertTable(tableNode, context) {
    // Check if this is a collapsible table (mw-collapsible) - unless we're already processing one
    if (!context._skipCollapsibleCheck && !context._inCollapsible) {
        // Extract class from table-attrs child node
        let tableClasses = '';
        const tableAttrsNode = tableNode.childNodes?.find(n => n.type === 'table-attrs');
        if (tableAttrsNode) {
            const classAttr = tableAttrsNode.childNodes?.find(n => n.type === 'table-attr' && n.name === 'class');
            if (classAttr) {
                const attrValue = classAttr.childNodes?.find(n => n.type === 'attr-value');
                if (attrValue) {
                    const textNode = attrValue.childNodes?.find(n => n.type === 'text');
                    if (textNode) {
                        tableClasses = textNode.data || '';
                    }
                }
            }
        }

        const isCollapsible = tableClasses.includes('mw-collapsible') || tableClasses.includes('collapsible');

        if (isCollapsible) {
            // Convert to <details> element (which may contain a table inside)
            return convertCollapsibleTable(tableNode, context);
        }
    }

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

    // Check if any cell has colspan > 1 - if so, use HTML table
    const hasColspan = allCells.some(c => c.colspan > 1);

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

    // Build grid - only for rows that have cells (skip empty rows from separators)
    const rowsWithCells = new Set(allCells.map(c => c.row));
    const rowMapping = {}; // Map original row numbers to grid indices
    let gridRow = 0;

    for (let r = 0; r <= maxRow; r++) {
        if (rowsWithCells.has(r)) {
            rowMapping[r] = gridRow;
            grid[gridRow] = new Array(baseColumns).fill(null);
            gridRow++;
        }
    }

    const maxGridRow = gridRow - 1;

    // Place cells in grid using row mapping
    for (const cell of allCells) {
        const mappedRow = rowMapping[cell.row];
        let col = 0;
        // Find first available column in this row
        while (col < baseColumns && grid[mappedRow][col] !== null) {
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
                const targetRow = mappedRow + r;
                if (grid[targetRow]) {
                    grid[targetRow][col + c] = cell;
                }
            }
        }
    }

    // If table has colspan, render as HTML table instead of Markdown
    if (hasColspan) {
        return renderHtmlTable(grid, maxGridRow, baseColumns, allCells);
    }

    // Check if table has any header cells (!) in first non-section row
    let hasHeaderRow = false;
    let firstContentRow = -1;

    for (let r = 0; r <= maxRow; r++) {
        const row = grid[r];
        if (!row) continue;

        const firstCell = row.find(c => c !== null);
        if (firstCell && firstCell.isSectionHeader) continue; // Skip section dividers

        // This is the first content row
        if (firstContentRow === -1) {
            firstContentRow = r;
        }

        // Check if this row has header cells
        if (row.some(cell => cell && cell.isHeader && !cell.isSectionHeader)) {
            hasHeaderRow = true;
            break;
        }
        // Only check first actual content row
        break;
    }

    // Convert grid to markdown table
    let mdTable = '\n';
    let hasAddedSeparator = false;

    // If no header row, add an empty header row
    if (!hasHeaderRow && firstContentRow >= 0) {
        const emptyHeaders = new Array(baseColumns).fill('  ');
        mdTable += '| ' + emptyHeaders.join(' | ') + ' |\n';
        mdTable += '|' + ' --- |'.repeat(baseColumns) + '\n';
        hasAddedSeparator = true;
    }

    for (let r = 0; r <= maxGridRow; r++) {
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

                // If cell has colspan > 1, repeat content across spanned columns
                // (Markdown doesn't support colspan, so we simulate it by filling cells)
                if (cell.colspan > 1) {
                    // Add the content to all spanned columns
                    for (let span = 0; span < cell.colspan; span++) {
                        rowCells.push(cellContent);
                    }
                } else {
                    rowCells.push(cellContent);
                }
            } else if (!cell) {
                // No cell at this position
                rowCells.push('');
            }
            // else: cell already seen due to colspan - skip it, already added above
        }

        mdTable += '| ' + rowCells.join(' | ') + ' |\n';

        // Add separator after first row (if we haven't already added one)
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

    // First, convert double backticks (inline code from wikiparser) to single backticks
    processed = processed.replace(/``([^`]+)``/g, (match, code) => {
        const escapedCode = code.replace(/\|/g, '\\|');
        return `\`${escapedCode}\``;
    });

    // Then handle multi-line code blocks (single backticks with newlines)
    processed = processed.replace(/`([^`]+)`/g, (match, code) => {
        if (code.includes('\n')) {
            // Multi-line code: Split into lines, escape HTML, convert tabs to spaces, then join with <br>
            const lines = code.split('\n');
            const escapedLines = lines.map(line => {
                // Escape HTML characters first
                let processed = line
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');

                // Convert tabs to 4 spaces
                processed = processed.replace(/\t/g, '    ');

                return processed;
            });
            // Use white-space: pre to preserve spaces without &nbsp;
            return `<code style="white-space: pre">${escapedLines.join('<br>')}</code>`;
        } else {
            // Single-line code: keep as backticks
            return match;
        }
    });

    // Replace remaining newlines with <br> to keep table row on single line in source
    // HTML tables are now on single line, so safe to convert all newlines
    processed = processed.replace(/\n/g, '<br>');

    // Escape pipes not inside code tags or backticks
    processed = processed.replace(/\|(?![^<`]*(<\/code>|`))/g, '\\|');

    return processed;
}

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

    // CRITICAL FIX: Flush any remaining list buffer
    // This handles the case where the last list item in a cell has no trailing newline
    if (cellContext._inListItem && cellContext._listBuffer) {
        const level = cellContext._listLevel || 1;
        const marker = cellContext._listMarker || '*';
        const indent = level > 1 ? '   '.repeat(level - 1) : '';
        const listMarker = marker.includes('#') ? '1.' : '-';
        const listContent = cellContext._listBuffer.trim();

        // Fix cases where bold markers are followed by asterisks
        const fixedContent = listContent.replace(/\*\*\*([^*])/g, '**\\*$1');

        // Append the flushed list item to content (with newline if content already exists)
        const separator = content ? '\n' : '';
        content += `${separator}${indent}${listMarker} ${fixedContent}`;

        // Clear the buffering state
        cellContext._inListItem = false;
        delete cellContext._listLevel;
        delete cellContext._listMarker;
        delete cellContext._listBuffer;
    }

    // Convert inline code blocks with newlines to use <code> + <br> for table compatibility
    // Markdown tables don't support multi-line code blocks, so we use HTML
    if (content.includes('`') && content.includes('\n')) {
        // Match inline code blocks that span multiple lines
        content = content.replace(/`([^`]+)`/g, (match, code) => {
            if (code.includes('\n')) {
                // Process each line: escape HTML, convert tabs to spaces, join with <br>
                const lines = code.split('\n');
                const processedLines = lines.map(line => {
                    // Escape HTML characters first
                    let processed = line
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');

                    // Convert tabs to 4 spaces
                    processed = processed.replace(/\t/g, '    ');

                    return processed;
                });
                // Use white-space: pre to preserve spaces without &nbsp;
                return `<code style="white-space: pre">${processedLines.join('<br>')}</code>`;
            }
            return match;
        });
    }

    // Replace remaining newlines with <br> to keep table row on single line
    // HTML tables and code blocks are now inline with <br> tags, so convert all remaining newlines
    if (content.includes('\n')) {
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
    let lastLineWasClosingFence = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isIndented = line.length > 0 && line[0] === ' ';
        const isBlank = line.trim() === '';
        const isFence = line.trim() === '```' || line.trim().startsWith('```');
        const isListItem = /^\s*([-*+]|\d+\.)\s/.test(line);

        // Track if we're inside a fenced code block (already converted by AST)
        if (isFence) {
            const wasInBlock = inFencedBlock;
            inFencedBlock = !inFencedBlock;
            result.push(line);
            // Track if this was a closing fence (was in block, now not)
            lastLineWasClosingFence = wasInBlock && !inFencedBlock;
            continue;
        }

        // Skip indented block conversion if we're inside a fenced block
        if (inFencedBlock) {
            result.push(line);
            lastLineWasClosingFence = false;
            continue;
        }

        // Skip indented lines immediately after a closing fence
        // These are continuation of text, not code blocks
        if (lastLineWasClosingFence && isIndented && !isBlank) {
            // Strip the leading space and push as normal text
            result.push(line.substring(1));
            lastLineWasClosingFence = false;
            continue;
        }

        // Reset the flag for other cases
        if (!isBlank) {
            lastLineWasClosingFence = false;
        }

        // Skip list items - they're not code blocks even if indented
        if (isListItem) {
            // If we were in a code block, end it first
            if (inIndentedBlock) {
                // Remove leading space from each line (MediaWiki indent marker)
                const dedented = codeBlockLines.map(line => line.startsWith(' ') ? line.substring(1) : line);
                // Check if code block has any non-empty content
                const hasContent = dedented.some(line => line.trim().length > 0);
                if (hasContent) {
                    result.push('```');
                    result.push(...dedented);
                    result.push('```');
                    // Add blank line after code block for proper Markdown separation
                    result.push('');
                }
                codeBlockLines = [];
                inIndentedBlock = false;
            }
            result.push(line);
            continue;
        }

        // MediaWiki rule: lines starting with space are code blocks
        if (isIndented && !inIndentedBlock) {
            // Start new code block
            inIndentedBlock = true;
            codeBlockLines = [line];
        } else if (isIndented && inIndentedBlock) {
            // Continue code block
            codeBlockLines.push(line);
        } else if (isBlank && inIndentedBlock) {
            // Blank line - look ahead to see if more indented lines follow
            let j = i + 1;
            let hasMoreIndented = false;
            while (j < lines.length) {
                const nextLine = lines[j];
                const nextIsBlank = nextLine.trim() === '';
                const nextIsIndented = nextLine.length > 0 && nextLine[0] === ' ';

                if (nextIsIndented) {
                    hasMoreIndented = true;
                    break;
                }
                if (!nextIsBlank) {
                    // Hit non-blank, non-indented line
                    break;
                }
                j++;
            }

            if (hasMoreIndented) {
                // More indented lines follow - keep blank line in code block
                codeBlockLines.push(line);
            } else {
                // No more indented lines - end code block before blank line
                // Remove leading space from each line (MediaWiki indent marker)
                const dedented = codeBlockLines.map(line => line.startsWith(' ') ? line.substring(1) : line);
                // Check if code block has any non-empty content
                const hasContent = dedented.some(line => line.trim().length > 0);
                if (hasContent) {
                    result.push('```');
                    result.push(...dedented);
                    result.push('```');
                }
                codeBlockLines = [];
                inIndentedBlock = false;
                result.push(line);
            }
        } else if (!isIndented && !isBlank && inIndentedBlock) {
            // Non-blank, non-indented line - end code block
            // Remove leading space from each line (MediaWiki indent marker)
            const dedented = codeBlockLines.map(line => line.startsWith(' ') ? line.substring(1) : line);
            // Check if code block has any non-empty content
            const hasContent = dedented.some(line => line.trim().length > 0);
            if (hasContent) {
                result.push('```');
                result.push(...dedented);
                result.push('```');
                // Add blank line after code block for proper Markdown separation
                // This ensures lists and other content don't run into code blocks
                result.push('');
            }
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
        // Remove leading space from each line (MediaWiki indent marker)
        const dedented = codeBlockLines.map(line => line.startsWith(' ') ? line.substring(1) : line);
        // Check if code block has any non-empty content
        const hasContent = dedented.some(line => line.trim().length > 0);
        if (hasContent) {
            result.push('```');
            result.push(...dedented);
            result.push('```');
        }
    }

    return result.join('\n');
}

/**
 * Convert MediaWiki list syntax to Markdown
 * MediaWiki: # for ordered, * for unordered
 * Markdown: 1. for ordered, - for unordered
 *
 * Indentation rules for proper nesting in Markdown:
 * - Top-level items: no indentation
 * - Nested items: 4 spaces per level (works universally for all parsers)
 */
function convertWikiListsToMarkdown(text) {
    const lines = text.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if line starts with # or * (MediaWiki list markers)
        // Capture markers and everything after (without consuming spaces)
        // Allow mixed markers like #*, *#, ##*, etc. for proper nesting
        const listMatch = line.match(/^([#*]+)(.*)$/);

        if (listMatch) {
            const markers = listMatch[1];
            const afterMarkers = listMatch[2]; // Everything after markers, including any leading space

            // Skip if this looks like a markdown heading (multiple consecutive # with space after)
            // e.g., "## Heading" or "### Heading" (note the space)
            // Wiki lists don't have space: "##Item"
            if (markers.length > 1 && /^#+$/.test(markers) && /^\s/.test(afterMarkers)) {
                result.push(line);
                continue;
            }

            // Skip if this is bold/italic markdown (**, ***, etc.)
            // Bold: Pure asterisks with closing markers and NO space at start
            //   Example: **text** → markers="**", afterMarkers="text**"
            // List with bold content: Has space after list marker
            //   Example: * **text** → markers="*", afterMarkers=" **text**"
            const isPureAsterisks = /^\*+$/.test(markers);
            const hasClosingMarker = afterMarkers.includes('**') || afterMarkers.includes('***');
            const startsWithSpace = /^\s/.test(afterMarkers);

            if (isPureAsterisks && hasClosingMarker && !startsWithSpace) {
                // This is bold markdown (no space at start), not a list
                result.push(line);
                continue;
            }

            // Handle case where markers include ** but afterMarkers also has **
            // Example: "#**fixed**" should be marker="#" + content="**fixed**", not marker="#**"
            // This happens when AST outputs list items with bold content
            let adjustedMarkers = markers;
            let adjustedAfterMarkers = afterMarkers;
            if (markers.endsWith('**') && hasClosingMarker) {
                // Strip trailing ** from markers and prepend to afterMarkers
                adjustedMarkers = markers.slice(0, -2);
                adjustedAfterMarkers = '**' + afterMarkers;
            } else if (markers.endsWith('***') && afterMarkers.includes('***')) {
                // Handle *** case
                adjustedMarkers = markers.slice(0, -3);
                adjustedAfterMarkers = '***' + afterMarkers;
            }

            // If no markers left after adjustment, this wasn't a list
            if (adjustedMarkers.length === 0) {
                result.push(line);
                continue;
            }

            // Extract content (trim leading space from adjustedAfterMarkers)
            const content = adjustedAfterMarkers.trimStart();

            const depth = adjustedMarkers.length - 1; // 0-indexed depth
            const indent = '    '.repeat(depth); // 4 spaces per level for proper Markdown nesting

            // Determine list type from last marker
            const lastMarker = adjustedMarkers[adjustedMarkers.length - 1];
            const marker = lastMarker === '#' ? '1.' : '-';

            result.push(`${indent}${marker} ${content}`);
        } else {
            result.push(line);
        }
    }

    return result.join('\n');
}

/**
 * Generate Table of Contents from markdown headings
 * Creates a nested TOC with links based on ## and ### headings (excludes # page title)
 */
function generateTableOfContents(markdown) {
    const lines = markdown.split('\n');
    const tocEntries = [];

    // Extract headings (skip # level 1 - that's the page title)
    for (const line of lines) {
        const match = line.match(/^(#{2,6})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();

            // Create slug for anchor link (GitHub-style)
            // Lowercase, replace spaces with hyphens, remove special chars
            const slug = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
                .replace(/\s+/g, '-')      // Replace spaces with hyphens
                .replace(/-+/g, '-')       // Collapse multiple hyphens
                .replace(/^-|-$/g, '');    // Trim hyphens from start/end

            tocEntries.push({ level, text, slug });
        }
    }

    // If no headings found, return empty string
    if (tocEntries.length === 0) {
        return '';
    }

    // Build TOC markdown
    const tocLines = [];
    const minLevel = Math.min(...tocEntries.map(e => e.level));

    for (const entry of tocEntries) {
        const indent = '  '.repeat(entry.level - minLevel); // 2 spaces per level
        tocLines.push(`${indent}- [${entry.text}](#${entry.slug})`);
    }

    return tocLines.join('\n');
}

/**
 * Convert MediaWiki XML content to Markdown using AST parsing
 */
function convertXmlToMarkdown(xmlContent, pageName) {
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

    // Pre-process YouTube embeds (parser function not handled well by wikiparser-node)
    // Convert {{#ev:youtube|...}} to a markdown blockquote before parsing
    wikitext = wikitext.replace(/\{\{#ev:youtube\s*\|([^}]+)\}\}/gi, (match, params) => {
        // Extract id and description from parameters
        const idMatch = params.match(/id\s*=\s*([^\|\n]+)/i);
        const descMatch = params.match(/description\s*=\s*([^\|\n]+)/i);

        if (idMatch) {
            const videoId = idMatch[1].trim();
            const url = `https://www.youtube.com/watch?v=${videoId}`;

            if (descMatch) {
                const description = descMatch[1].trim();
                return `\n> 🎥 **YouTube Video**: [${description}](${url})\n`;
            }
            return `\n> 🎥 **YouTube Video**: ${url}\n`;
        }
        return match; // Return unchanged if we couldn't parse it
    });

    // Protect comparison operators with pipes before parsing
    // (wikiparser-node treats | as cell separator and gets confused by <|, <=|, etc.)
    // But DON'T apply this inside [[File:...]] or [[Image:...]] links
    const operatorPlaceholders = new Map();
    let placeholderIndex = 0;
    wikitext = wikitext.replace(/([<>=!]+)\|/g, (match, operator, offset) => {
        // Check if we're inside a [[File:...]] or [[Image:...]] link
        const beforeMatch = wikitext.slice(Math.max(0, offset - 100), offset);
        const linkStart = beforeMatch.lastIndexOf('[[');
        const linkEnd = beforeMatch.lastIndexOf(']]');

        // If we found a [[ more recently than ]], we're inside a link
        if (linkStart > linkEnd) {
            const linkContent = beforeMatch.slice(linkStart);
            // Check if it's a File or Image link
            if (linkContent.match(/^\[\[(File|Image):/i)) {
                // Don't replace inside File/Image links
                return match;
            }
        }

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

    // Post-process: Convert HTML tags to Markdown
    // Convert <strike>text</strike> to ~~text~~ (strikethrough)
    markdown = markdown.replace(/<strike>(.*?)<\/strike>/g, '~~$1~~');

    // Post-process: Convert MediaWiki list syntax to Markdown
    // MediaWiki uses # for ordered lists and * for unordered lists
    // But these aren't being parsed as list nodes, so we need to convert them manually
    markdown = convertWikiListsToMarkdown(markdown);

    // Convert indented code blocks (MediaWiki convention: lines starting with space)
    markdown = convertIndentedCodeBlocks(markdown);

    // Clean up blank lines with only whitespace
    markdown = markdown.replace(/^[ \t]+$/gm, '');

    // Clean up excessive blank lines
    markdown = markdown.replace(/\n{4,}/g, '\n\n\n');

    // Generate table of contents for all pages with sections
    const toc = generateTableOfContents(markdown);

    if (toc) {
        // Check if there's an explicit TOC placeholder
        const hasPlaceholder = markdown.includes('TOC') || markdown.includes('FORCETOC');

        if (hasPlaceholder) {
            // Replace both standalone TOC/FORCETOC and the magic word patterns
            markdown = markdown.replace(/^TOC$/gm, toc);
            markdown = markdown.replace(/^FORCETOC$/gm, toc);
            markdown = markdown.replace(/__TOC__/g, toc);
            markdown = markdown.replace(/__FORCETOC__/g, toc);
        } else {
            // Insert TOC before the first heading (after introductory content)
            // Find the first ## heading
            const firstHeadingMatch = markdown.match(/\n\n##\s/);
            if (firstHeadingMatch) {
                const insertPos = firstHeadingMatch.index;
                markdown = markdown.slice(0, insertPos) + '\n\n' + toc + '\n' + markdown.slice(insertPos);
            }
        }
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
