# Crusader Kings 3 Modding Documentation

A git-versioned archive of the official Crusader Kings 3 modding documentation from the [Paradox Wiki](https://ck3.paradoxwikis.com/Category:Modding).

[![npm version](https://badge.fury.io/js/ck3-modding-wiki.svg)](https://www.npmjs.com/package/ck3-modding-wiki)
[![update](https://github.com/jesec/ck3-modding-wiki/actions/workflows/update.yml/badge.svg)](https://github.com/jesec/ck3-modding-wiki/actions/workflows/update.yml)

📚 **[Complete Table of Contents](TABLE_OF_CONTENTS)** - Comprehensive index of all pages and sections

## About This Repository

This repository contains complete modding documentation for Crusader Kings 3, converted to Markdown format for easy reading, searching, and offline access. All content is sourced from the official Paradox Wiki and is maintained as a reference for mod developers.

**Automatically updated daily** via GitHub Actions to stay in sync with the official wiki.

## Quick Start

**New to CK3 modding?** Start here:
- [Modding](Modding) - Introduction and essential guidelines
- [Mod Structure](Mod_structure) - How to organize your mod files
- [Scripting](Scripting) - Core scripting concepts
- [Modding Tools](Modding_tools) - Recommended tools and utilities

**Having issues?** Check:
- [Mod Troubleshooting](Mod_troubleshooting) - Common problems and solutions

## Documentation Index

### Getting Started
- [Modding](Modding) - Overview and tips for CK3 modding
- [Mod Structure](Mod_structure) - File organization and mod setup
- [Mod Troubleshooting](Mod_troubleshooting) - Debugging and common issues
- [Modding Tools](Modding_tools) - Text editors, validators, and utilities

### Core Scripting
- [Scripting](Scripting) - Scripting fundamentals
- [Data Types](Data_types) - Understanding data types in CK3
- [Scopes](Scopes) - Scope concepts and usage
- [Scopes List](Scopes_list) - Complete scope reference
- [Variables](Variables) - Using and manipulating variables
- [Weight Modifier](Weight_modifier) - Weighted random selection

### Effects & Triggers
- [Effects](Effects) - How to use effects
- [Effects List](Effects_list) - Complete effects reference
- [Triggers](Triggers) - Conditional logic
- [Triggers List](Triggers_list) - Complete triggers reference
- [Scripted Effects](Scripted_effects) - Creating reusable effects

### Game Mechanics

#### Characters & Dynasties
- [Characters Modding](Characters_modding) - Character traits, attributes, and systems
- [Dynasties Modding](Dynasties_modding) - Dynasty creation and management
- [Trait Modding](Trait_modding) - Creating and modifying character traits

#### Governments & Titles
- [Governments Modding](Governments_modding) - Government types and mechanics
- [Title Modding](Title_modding) - Titles, ranks, and succession
- [Council Modding](Council_modding) - Council positions and tasks
- [Holdings Modding](Holdings_modding) - Baronies and holdings

#### Religion & Culture
- [Religions Modding](Religions_modding) - Faiths, doctrines, and holy orders
- [Culture Modding](Culture_modding) - Cultural traditions and innovations

#### Events & Decisions
- [Event Modding](Event_modding) - Creating events and event chains
- [Decisions Modding](Decisions_modding) - Adding player decisions
- [Interactions Modding](Interactions_modding) - Character interactions

#### Advanced Systems
- [Artifact Modding](Artifact_modding) - Creating artifacts and relics
- [Story Cycles Modding](Story_cycles_modding) - Story event systems
- [Struggle Modding](Struggle_modding) - Regional struggle mechanics

### Visual & Audio Assets

#### Graphics
- [Graphical Assets](Graphical_assets) - Sprites, textures, and visual assets
- [3D Models](3D_models) - Character and object models
- [Coat of Arms Modding](Coat_of_arms_modding) - Heraldry and emblems
- [Interface](Interface) - UI and GUI modding
- [Fonts](Fonts) - Font configuration

#### Audio
- [Music Modding](Music_modding) - Background music and themes
- [Sound Modding](Sound_modding) - Sound effects and audio

### World Building
- [Map Modding](Map_modding) - Creating and editing the game map
- [Terrain Modding](Terrain_modding) - Terrain types and properties
- [History Modding](History_modding) - Historical setups and bookmarks
- [Bookmarks Modding](Bookmarks_modding) - Start dates and scenarios

### Military
- [Regiments Modding](Regiments_modding) - Unit types and military units

### Localization & Text
- [Localization](Localization) - Translating and text formatting
- [Flavorization](Flavorization) - Dynamic text and name generation

### Reference Lists
- [Commands](Commands) - Script commands reference
- [Console Commands](Console_commands) - Debug console commands
- [Defines](Defines) - Global game constants
- [Lists](Lists) - Various reference lists
- [Modifier List](Modifier_list) - All available modifiers

### Technical
- [Exporters](Exporters) - Data export tools

## How to Use This Documentation

1. **Browse by Topic**: Use the index above to find documentation for specific modding areas
2. **Search**: Use your editor's search functionality to find keywords across all files
3. **Cross-Reference**: Pages contain links to related topics (may need conversion to work locally)
4. **XML Source**: Original MediaWiki XML exports are available in `wiki_exports/` for reference

## File Organization

```
ck3-modding-wiki/
├── wiki_pages/          # Markdown documentation (read these)
│   ├── Modding.md
│   ├── Event_modding.md
│   └── ...
├── assets/              # Images and icons from the wiki
│   ├── icons/          # Modifier icons (72 files)
│   └── images/         # Documentation images (65+ files)
└── wiki_exports/        # Original XML exports (reference only)
    ├── Modding.xml
    └── ...
```

All images are bundled locally. Markdown files reference images using relative paths like `![caption](assets/images/filename.png)`.

## Versioning

This package uses date-based versioning: `{major}.YYYYMMDD.{patch}`

Example: `1.20251103.0` = Major version 1, snapshot from November 3, 2025, patch 0

Automatically updated daily via GitHub Actions.

## Development

To update the documentation from the wiki:

```bash
# Full update (downloads wiki pages + assets, then converts)
npm run update

# Individual commands
npm run download         # Download wiki pages and assets
npm run download-assets  # Download only assets
npm run convert          # Convert XML to Markdown
```

## Contributing

This is an archived reference repository. The canonical source is the [CK3 Paradox Wiki](https://ck3.paradoxwikis.com/Category:Modding). To contribute improvements to the documentation itself, please edit the wiki directly.

If you find conversion bugs (tables, code blocks, etc.), please open an issue or submit a PR.

## External Resources

- **Official Wiki**: https://ck3.paradoxwikis.com/Category:Modding
- **CK3 Modding Discord**: https://discord.com/invite/apEvxDZ
- **Paradox Mods**: https://mods.paradoxplaza.com/games/ck3
- **Steam Workshop**: https://steamcommunity.com/app/1158310/workshop/
- **Paradox Forums**: https://forum.paradoxplaza.com/forum/forums/crusader-kings-iii.1046/

## License

### Wiki Content

All wiki content is published under the [Creative Commons Attribution-Share Alike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license. Content may be copied and adapted provided that:
- Attribution and link to the [CK3 Paradox Wiki](https://ck3.paradoxwikis.com/) is included
- Derivative works are published under an equivalent license

### Game Content

This repository makes use of content from Crusader Kings III published by Paradox Interactive. Copyright to such content is held by Paradox Interactive AB or its subsidiary Paradox Development Studio.

Copyright © 2014 Paradox Interactive AB. www.paradoxplaza.com
