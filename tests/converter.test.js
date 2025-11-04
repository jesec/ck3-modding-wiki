const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { convertXmlToMarkdown } = require('../lib/ast-converter');

/**
 * Helper to create MediaWiki XML wrapper for test wikitext
 */
function createTestXml(wikitext) {
    const escaped = wikitext
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return `<mediawiki><page><title>TestPage</title><revision><text>${escaped}</text></revision></page></mediawiki>`;
}

/**
 * Helper to extract body from full markdown (removes header and footer)
 */
function extractBody(markdown) {
    const match = markdown.match(/^# TestPage\n\n([\s\S]*?)\n\n---\n\n\*Source:/);
    return match ? match[1].trim() : markdown.trim();
}

/**
 * Load all test fixtures from a directory
 */
function loadFixtures() {
    const fixturesDir = path.join(__dirname, 'fixtures');
    const fixtureFiles = fs.readdirSync(fixturesDir)
        .filter(file => file.endsWith('.json') && file !== 'test-cases.json');

    const fixtures = [];
    for (const file of fixtureFiles) {
        const data = JSON.parse(
            fs.readFileSync(path.join(fixturesDir, file), 'utf8')
        );
        fixtures.push({
            category: path.basename(file, '.json'),
            ...data
        });
    }
    return fixtures;
}

// Run tests for each fixture category
const fixtures = loadFixtures();

fixtures.forEach(fixture => {
    describe(`${fixture.category}: ${fixture.description}`, () => {
        fixture.cases.forEach(testCase => {
            it(testCase.name, () => {
                const xml = createTestXml(testCase.wikitext);
                const fullMarkdown = convertXmlToMarkdown(xml, 'TestPage');
                const actualMarkdown = extractBody(fullMarkdown);
                const expectedMarkdown = testCase.expected.trim();

                assert.equal(
                    actualMarkdown,
                    expectedMarkdown,
                    `\nExpected:\n${expectedMarkdown}\n\nActual:\n${actualMarkdown}`
                );
            });
        });
    });
});
