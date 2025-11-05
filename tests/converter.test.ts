import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { convertXmlToMarkdown } from '../lib/ast-converter.ts';

interface TestCase {
  name: string;
  wikitext: string;
  expected: string;
}

interface Fixture {
  category: string;
  description: string;
  cases: TestCase[];
}

/**
 * Helper to create MediaWiki XML wrapper for test wikitext
 */
function createTestXml(wikitext: string): string {
  const escaped = wikitext.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<mediawiki><page><title>TestPage</title><revision><text>${escaped}</text></revision></page></mediawiki>`;
}

/**
 * Helper to extract body from full markdown (removes header and footer)
 */
function extractBody(markdown: string): string {
  const match = markdown.match(/^# TestPage\n\n([\s\S]*?)\n\n---\n\n\*Source:/);
  return match ? match[1].trim() : markdown.trim();
}

/**
 * Load all test fixtures from a directory
 */
function loadFixtures(): Fixture[] {
  const fixturesDir = path.join(import.meta.dirname, 'fixtures');
  const fixtureFiles = fs
    .readdirSync(fixturesDir)
    .filter((file) => file.endsWith('.json') && file !== 'test-cases.json');

  const fixtures: Fixture[] = [];
  for (const file of fixtureFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(fixturesDir, file), 'utf8')) as Omit<
      Fixture,
      'category'
    >;
    fixtures.push({
      category: path.basename(file, '.json'),
      ...data,
    });
  }
  return fixtures;
}

// Run tests for each fixture category
const fixtures = loadFixtures();

fixtures.forEach((fixture) => {
  describe(`${fixture.category}: ${fixture.description}`, () => {
    fixture.cases.forEach((testCase) => {
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
