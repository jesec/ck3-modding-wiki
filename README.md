# Crusader Kings 3 Modding Documentation

A git-versioned archive of the official Crusader Kings 3 modding documentation from the [Paradox Wiki](https://ck3.paradoxwikis.com/Category:Modding).

[![npm version](https://badge.fury.io/js/ck3-modding-wiki.svg)](https://www.npmjs.com/package/ck3-modding-wiki)
[![update](https://github.com/jesec/ck3-modding-wiki/actions/workflows/update.yml/badge.svg)](https://github.com/jesec/ck3-modding-wiki/actions/workflows/update.yml)

## About This Repository

This repository contains complete modding documentation for Crusader Kings 3, converted to Markdown format for easy reading, searching, and offline access. All content is sourced from the official Paradox Wiki and is maintained as a reference for mod developers.

**Automatically updated daily** via GitHub Actions to stay in sync with the official wiki.

## Quick Start

**New to CK3 modding?** Start here:
- [Modding](wiki_pages/Modding.md) - Introduction and essential guidelines
- [Mod Structure](wiki_pages/Mod_structure.md) - How to organize your mod files
- [Scripting](wiki_pages/Scripting.md) - Core scripting concepts
- [Modding Tools](wiki_pages/Modding_tools.md) - Recommended tools and utilities

**Having issues?** Check:
- [Mod Troubleshooting](wiki_pages/Mod_troubleshooting.md) - Common problems and solutions

## Documentation Index

### Getting Started
- [Modding](wiki_pages/Modding.md) - Overview and tips for CK3 modding
- [Mod Structure](wiki_pages/Mod_structure.md) - File organization and mod setup
- [Mod Troubleshooting](wiki_pages/Mod_troubleshooting.md) - Debugging and common issues
- [Modding Tools](wiki_pages/Modding_tools.md) - Text editors, validators, and utilities

### Core Scripting
- [Scripting](wiki_pages/Scripting.md) - Scripting fundamentals
- [Data Types](wiki_pages/Data_types.md) - Understanding data types in CK3
- [Scopes](wiki_pages/Scopes.md) - Scope concepts and usage
- [Scopes List](wiki_pages/Scopes_list.md) - Complete scope reference
- [Variables](wiki_pages/Variables.md) - Using and manipulating variables
- [Weight Modifier](wiki_pages/Weight_modifier.md) - Weighted random selection

### Effects & Triggers
- [Effects](wiki_pages/Effects.md) - How to use effects
- [Effects List](wiki_pages/Effects_list.md) - Complete effects reference
- [Triggers](wiki_pages/Triggers.md) - Conditional logic
- [Triggers List](wiki_pages/Triggers_list.md) - Complete triggers reference
- [Scripted Effects](wiki_pages/Scripted_effects.md) - Creating reusable effects

### Game Mechanics

#### Characters & Dynasties
- [Characters Modding](wiki_pages/Characters_modding.md) - Character traits, attributes, and systems
- [Dynasties Modding](wiki_pages/Dynasties_modding.md) - Dynasty creation and management
- [Trait Modding](wiki_pages/Trait_modding.md) - Creating and modifying character traits

#### Governments & Titles
- [Governments Modding](wiki_pages/Governments_modding.md) - Government types and mechanics
- [Title Modding](wiki_pages/Title_modding.md) - Titles, ranks, and succession
- [Council Modding](wiki_pages/Council_modding.md) - Council positions and tasks
- [Holdings Modding](wiki_pages/Holdings_modding.md) - Baronies and holdings

#### Religion & Culture
- [Religions Modding](wiki_pages/Religions_modding.md) - Faiths, doctrines, and holy orders
- [Culture Modding](wiki_pages/Culture_modding.md) - Cultural traditions and innovations

#### Events & Decisions
- [Event Modding](wiki_pages/Event_modding.md) - Creating events and event chains
- [Decisions Modding](wiki_pages/Decisions_modding.md) - Adding player decisions
- [Interactions Modding](wiki_pages/Interactions_modding.md) - Character interactions

#### Advanced Systems
- [Artifact Modding](wiki_pages/Artifact_modding.md) - Creating artifacts and relics
- [Story Cycles Modding](wiki_pages/Story_cycles_modding.md) - Story event systems
- [Struggle Modding](wiki_pages/Struggle_modding.md) - Regional struggle mechanics

### Visual & Audio Assets

#### Graphics
- [Graphical Assets](wiki_pages/Graphical_assets.md) - Sprites, textures, and visual assets
- [3D Models](wiki_pages/3D_models.md) - Character and object models
- [Coat of Arms Modding](wiki_pages/Coat_of_arms_modding.md) - Heraldry and emblems
- [Interface](wiki_pages/Interface.md) - UI and GUI modding
- [Fonts](wiki_pages/Fonts.md) - Font configuration

#### Audio
- [Music Modding](wiki_pages/Music_modding.md) - Background music and themes
- [Sound Modding](wiki_pages/Sound_modding.md) - Sound effects and audio

### World Building
- [Map Modding](wiki_pages/Map_modding.md) - Creating and editing the game map
- [Terrain Modding](wiki_pages/Terrain_modding.md) - Terrain types and properties
- [History Modding](wiki_pages/History_modding.md) - Historical setups and bookmarks
- [Bookmarks Modding](wiki_pages/Bookmarks_modding.md) - Start dates and scenarios

### Military
- [Regiments Modding](wiki_pages/Regiments_modding.md) - Unit types and military units

### Localization & Text
- [Localization](wiki_pages/Localization.md) - Translating and text formatting
- [Flavorization](wiki_pages/Flavorization.md) - Dynamic text and name generation

### Reference Lists
- [Commands](wiki_pages/Commands.md) - Script commands reference
- [Console Commands](wiki_pages/Console_commands.md) - Debug console commands
- [Defines](wiki_pages/Defines.md) - Global game constants
- [Lists](wiki_pages/Lists.md) - Various reference lists
- [Modifier List](wiki_pages/Modifier_list.md) - All available modifiers

### Technical
- [Exporters](wiki_pages/Exporters.md) - Data export tools

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
└── wiki_exports/        # Original XML exports (reference only)
    ├── Modding.xml
    └── ...
```

## Versioning

This package uses date-based versioning: `{major}.YYYYMMDD.{patch}`

Example: `1.20251103.0` = Major version 1, snapshot from November 3, 2025, patch 0

Automatically updated daily via GitHub Actions.

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
