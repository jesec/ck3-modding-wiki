# Test Suite

This directory contains automated tests for the MediaWiki to Markdown converter.

## Structure

```
tests/
├── converter.test.js      # Main test runner
├── fixtures/              # Test case data organized by feature
│   ├── code-blocks.json   # <pre> and <syntaxhighlight> tag tests
│   ├── indented-blocks.json  # MediaWiki indented code blocks (space-prefixed lines)
│   └── lists.json         # MediaWiki list syntax tests
└── README.md             # This file
```

## Running Tests

```bash
npm test
```

Uses Node.js's built-in test runner (no additional dependencies required).

## Adding New Tests

1. **Choose or create a fixture file** in `fixtures/` based on the feature being tested
2. **Add a test case** to the appropriate JSON file:

```json
{
  "description": "Brief description of what this fixture tests",
  "cases": [
    {
      "name": "Descriptive test name",
      "wikitext": "Input MediaWiki markup",
      "expected": "Expected Markdown output"
    }
  ]
}
```

3. **Run tests** to verify: `npm test`

## Fixture Categories

### code-blocks.json
Tests for `<pre>` and `<syntaxhighlight>` tags, which should always render as fenced code blocks in Markdown.

### indented-blocks.json
Tests for MediaWiki's indented code syntax (lines starting with a space character).

### lists.json
Tests for MediaWiki list markup (`#` for numbered, `*` for bulleted) and their conversion to Markdown.

## Test Philosophy

- Tests verify **actual wiki rendering behavior**, not theoretical correctness
- Each test case represents a real pattern found in the CK3 modding wiki
- Fixtures are organized by MediaWiki feature, not by output format
