# Modding

> *This article is timeless and should be accurate for any version of the game.*


> 🎥 **YouTube Video**: [CK3 Modding #1 -Brief introduction to modding. *Mr Samuel Streamer (former Roll1D2 Games)* guide on useful tools and how-to mod beginner's guide.](https://www.youtube.com/watch?v=uu_Zxf4ul2g)


Modding, or creating mods, is the act of modifying the assets or behavior of the game either for personal use, or to release publicly to other players, for instance via [Paradox Mods](https://mods.paradoxplaza.com/games/ck3) or the [Steam Workshop](https://steamcommunity.com/app/1158310/workshop/).

Crusader Kings III is moddable to a great extent and the goals of modders may vary: more events or decisions, better map and models, total conversions, accessibility, translations, etc.

Modding CK3 doesn't require knowledge of any programming language and most of it can be done with a simple text editor. The game uses its own scripting language that is intended to be easy to use and learn. However, this puts some limits on what can be modded, compared to other games.

Mods no longer disable achievements since 1.9 patch. Mods also don't invalidate ironman saves. In multiplayer, all players must use the same mods in the same load order.

This article is a brief introduction to CK3 modding. To learn more, inspect game files and other mods, experiment on your own and join the [modding discord](https://discord.com/invite/apEvxDZ).


## Tips & guidelines

- **Start the game with -debug_mode -develop** launch option to instantly reload files and use the console.
    - On Steam: right-click the game on Steam -> Properties ->  add -debug_mode -develop to Launch Options at the bottom
    - Windows: Create a shortcut for the .exe file -> right-click it -> Properties -> add -debug_mode -develop at the end of the Target field
    - Windows Xbox Game Pass: Open 'Command Prompt' and run 'start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode -develop’
- **Create a mod for your modifications**: use a personal mod even for minor changes, and never directly modify the game files in the CK3 game folder as they may be overwritten without warning.
- **Use a good text editor** to edit files and search through folders. The following, aside from Intellij IDEA are free:
    - [Visual Studio Code](https://code.visualstudio.com/). Has fan-made extensions, like [CK3 Tiger](https://marketplace.visualstudio.com/items?itemName=unlomtrois.ck3tiger-for-vscode&ssr=false#overview) to validate code, [Paradox Highlight](https://marketplace.visualstudio.com/items?itemName=dragon-archer.paradox-highlight&ssr=false#overview) for syntax highlighting and [CWTools](https://marketplace.visualstudio.com/items?itemName=tboby.cwtools-vscode) which does both and adds autocomplete and tooltips for triggers and effects. To install, use the links or go to Extensions on the left panel of VSC and search for them. (Note: CWTools validation rules are incomplete and will show a lot of false errors)
    - [Sublime Text](https://www.sublimetext.com/). Often used by developers themselves, and they've released an extension for it: [forum:1593630/#post-29225852](https://ck3.paradoxwikis.com/forum:1593630/#post-29225852) with syntax highlighting and completions. If you want to toggle comments in Sublime, you also need to add [this file](https://cdn.discordapp.com/attachments/563655919892692996/649656191173263370/PDXComments.tmPreference) to the same "User" folder.
    - [Notepad++](https://notepad-plus-plus.org/downloads/). Choose Perl as your language for syntax highlighting. To set it as default, go to Settings, Styler Configurator, find Perl in the list on the left and add "gui txt" (without quotes) to the "User ext." field at the bottom.
    - [Intellij IDEA](https://www.jetbrains.com/idea/). Has a fan-made Paradox Language Support plugin with syntax highlighting and validation. To install it, go to File -> Settings -> Plugins and search for "Paradox Language Support".
    - [Pulsar](https://pulsar-edit.dev/) (fork of Atom). Doesn't include UTF-8-BOM encoding needed for localization files. Otherwise is very customizable. Choose Perl 6 as your language for highlighting. To set it as default, go to File, Config, find "core:" and add below it: "customFileTypes: "source.perl6": [ "txt" "gui"]", like in [this example](https://discuss.atom.io/t/how-do-i-make-atom-recognize-a-file-with-extension-x-as-language-y/26539).
- **Always check the error.log file for execution errors**. ``Documents/Paradox Interactive/Crusader Kings III/logs/error.log``
- **The log folder also contains lists of effects, triggers and scopes.** Use ``script_docs`` and ``dump_data_types`` console commands in the game to generate them.
- **The directory for the CK3 folder on Linux is** ``~/.local/share/Paradox Interactive/Crusader Kings III``
- **Communicate key facts about your mod:**
    - List the main changes and additions at the top of the description. To help with compatibility, you may add a list of changed files at the bottom.
    - Provide links to your mod on other platforms (Workshop, Paradox Mods, forums).
- When possible, upload your mod to all platforms, especially if it is popular. Not everybody owns the game on Steam.
- Backup your work. Either manually or with a source control system like Git. Consider using GitHub and Discord for team collaboration.
- **Remove your local copy of the mod when you subscribe to the Steam version**, otherwise it will not work in the game. (removing the .mod file or changing its extension is enough)
- Use a proper merge tool (like [WinMerge](https://winmerge.org/?lang=en)) to merge between folders and update modified files for a new patch.
- If you're replacing text across dozens or hundreds lines of code, regular expressions may save a lot of time. They are available in all of the text editors above. Learning resources: [RegexOne](https://regexone.com/), [RegExr](https://regexr.com/).
- Win+V opens your clipboard history. You'll be copying a lot of text while modding, and this lets you access older copied entries without going back to their source.
- Join [CK3 Modding discord](https://discord.com/invite/apEvxDZ) to ask any questions and help others
- The [Modding Git Guide](https://docs.google.com/document/d/1bQdOVMY6FTu-2AKXZblYp6bF2-_W2JMUtXc5a0nZ8Ls) is a community made guide for using Git, GitHub/GitLab, and related tools such as KDiff3. It can be a useful stop for questions beyond this wiki, and contains step by step guides for much of what is talked about here. Though the examples are HOI4 based, the principles apply equally well to any Paradox game mod.
- You can change the path where the launcher and the game saves user specific data:
    - The launcher's settings file is ``steamapps\common\Crusader Kings III\launcher\launcher-settings.json``. Edit the ``gameDataPath`` key to change the location.
    - For the game data you need to create the file ``steamapps\common\Crusader Kings III\game\userdir.txt`` with the content being the absolute path where the game should save it's data. For example: ``C:/Users/username/AppData/Local/Paradox Interactive/Crusader Kings III/``. Note that the path must end with a ``/``.


### Localization Files

- *.yml files in the localization folder must be saved with **UTF-8 + BOM** encoding to be read properly by the game.
- filenames need to be saved in the form as ***l_<language>.yml** for the game to read the file correctly. For example **council_l_english.yml**.
    - You must use the US spelling of "localization". The Commonwealth spelling of "localisation" *will not work*.
    - Note, l_ is a lower case L, as in **l**anguage, not capital i.
- To overwrite existing localization values, put your files with changes into a folder named "replace" within the localization folder.
- If a mod only has English localization, any player using a different language will see unlocalized strings_like_this. It is better to copy your localization for other languages, even if you don't provide a translation. Modding discord [has a tool](https://discord.com/channels/735413460439007241/1161423005830881462/1161423005830881462) to copy all the files and rename their language markers in one click.


### Launch options

    - -debug_mode** - enables dev tooltips and interactions

    - -develop** - enables hot reload of most files as soon as they are saved

    - -mapeditor** - opens the map editor

    - -debug_controller_camera** - adds support for controlling camera with a controller (before 1.9 it was -handle_controller_input)

    - -nographics** - launches the game without creating a window or rendering anything and starts an observer game

    - -random_seed=42** - launches the game with a fixed RNG seed (in this example 42), works only in combination with -debug_mode

    - -benchmark** - runs an automated test for 1.5 years, moving the camera around and opening various windows. Outputs timer_dump logs showing how much time each tick took to process (convert them to tables and make graphs to analyze)

    - -continuelastsave** - can be used in a shortcut to ck3.exe to automatically load the last save, same as pressing Resume in the launcher


## Creating a mod


> **Main article:** [Mod structure#Creating initial files](Mod_structure.md#Creating initial files)


It is recommended to use the game launcher to create initial mod files:
1. Open the game launcher. 
1. Go to Mod library on the left.
1. Press Upload Mod in the top right.
1. Press Create a Mod.
1. Enter a name, version of the mod (not the game), directory (the launcher will create it) and at least one tag. All of these must be completed before you can press Create at the bottom.
    - (Name must be at least 3 symbols long. DIrectory can include spaces, but cannot end with one.)
After this, copy the game files you want to edit to the created mod folder, following the same folder structure. For example, ``mod/my_new_mod/events/test_events.txt``


## Uploading/updating a mod

Uploading and updating follows the same process:
1. Open the game launcher. 
1. Go to Mod library on the left.
1. Press Upload Mod in the top right.
1. Choose your mod from the dropdown menu.
1. Choose what platform to upload it to.
1. Enter any description. (If updating, make sure the launcher copied the most recent one from the site.)
1. Add a thumbnail
    - For the Steam Workshop, put thumbnail.png in the mod folder. Use 1:1 ratio, 1MB max. The biggest thumbnail the Workshop displays is around 600x600 pixels.
    - For Paradox Mods, drag the thumbnail to the field below the description. Suggested minimum size is 900x500, png or jpg, 1MB max.
1. Press "Upload".
    - On Steam, the mod will be uploaded in private mode and appear in your Steam Profile -> Workshop Items. Open it and change visibility on the side bar to Public to actually publish.
    - On Paradox Mods the mod will be published after the verification process. You may need to edit your description, as the site usually removes line breaks and BBCode formatting.


## Installing mods manually

Mods are installed to your ``Documents/Paradox Interactive/Crusader Kings III/mod`` folder in Windows or ``~/.local/share/Paradox Interactive/Crusader Kings III/mod/`` in Linux.

Every mod in it must have a .mod file and a folder. (For example, "Nameplates.mod" and "nameplates" folder)

Note that the individual mod folder doesn't need to be in the main CK3 mod folder, only the .mod file is required to be here. You can just edit the .mod file to point at a new mod folder path. (As in change the line ``path="mod/my mod"`` to for example ``path="C:/Local_Documents/CK3_mods/my mod"``) 

This is very helpful if your OneDrive is getting full, and you don't want to pay for more space.

### Installing Forum mods

Modders will usually zip both the .mod file and the mod folder. In this case, you only need to unpack the zip file directly to your "mod" directory. If instead you see descriptor.mod and a number of other folders, continue to the next section:

### Installing Paradox Mods

Mods downloaded from Paradox Mods only have the contents of the mod folder and require the following:
1. Create a new folder in your "mod" directory. Give it any name, like "my mod".
1. Unzip the downloaded mod directly to this new folder.
1. Copy descriptor.mod from it and paste to your "mod" folder.
1. Rename the copied descriptor file to anything.
1. Open it with a text editor and add a line ``path="mod/my mod"`` (where "my mod" is the name of the folder you created). Save the file.
1. After this, you should be able to add this mod in the launcher.
If this didn't work, you can try to create a new mod from the launcher and then copy the downloaded files to its folder (excluding descriptor.mod).


## Extracting files From Microsoft Store version

If you want to read the files using the Microsoft Store version, you can use a program called UWPDumper to extract the files.
1. Download the latest x64 binary of [Modding#Tools & utilities](#tools-&-utilities)
1. Enable Developer Mode (Windows Settings -> Update and Security -> For Developers -> Developer Mode).
1. Run CK3.
1. Run UWPInjector.exe from the program you just downloaded.
1. Enter the number next to ck3.exe : ParadoxInteractive.ProjectTitus_zfnrdv2de78ny as the processID.
1. Check where it is going to store the files (probably somewhere like C:\Users\%USERPROFILE%\AppData\Local\Packages\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny\TempState\DUMP
1. Wait for the program to finish.
The files should then be present in the directory specified earlier. If you want to edit the files, create a mod and copy the desired files there.


## Mod load order

Load order only matters when two or more mods change the same files, this is called a mod conflict.

Mods are loaded in order from top to bottom of the playset.

**The mod lower in the playset will overwrite identical files from above.**

So if you want to make sure that a mod is not overwritten by anything, put it at the very bottom of the playset.

Always read mod description. Modders will often list what files they change and what compatibility issues might arise with other mods.

Some popular mods have compatches that merge conflicting files together and let players use both mods. The compatch mod is loaded after the other two mods.

Otherwise, load order doesn't impact anything.


## Override rules


#### Full file override

If a mod has the same file as the game, it replaces all the contents of the file.

(By the same file we mean same path, same filename).

Avoid doing this unless you intend to overwrite the whole file!

When two mods have the same file, the file of the mod that is **lower in the playset** is loaded.


#### Single object override

Often, we can override a single object, for example, a define or a scripted trigger.

Put your changes in a new file, with the same path as vanilla.

The name of your file should come **later in [commons:Media:ASCII-Table-wide.svg](https://ck3.paradoxwikis.com/commons:Media:ASCII-Table-wide.svg)** **order**: 01_defines.txt will override 00_defines.txt.

This has been called Last in Only Served, or LIOS. Most overrides follow this order. Types in UI files use FIOS: First In Only Served.

Example:

We can create a file in ``common\scripted_triggers``, call it ``all_can_raid_trigger.txt`` with this:

```c
can_raid_trigger = { always = yes }
```
It will override ``can_raid_trigger`` trigger in ``00_scripted_rule_triggers.txt`` and allow anyone to raid.


The general rule is we can override a top-level declaration in a file: things that are defined at the start of a line, not inside any block.

A single override also cannot remove an object, only change it.

With overrides, it is good practice to add your mod's name to the filename, so you can easily spot if it was loaded in database_conflicts.log.

**More specifics:**


##### Defines

- common/defines*

Include the name of the category you change, for example:

```c
NCharacter = {
	BASE_FERTILITY = 0.5
	BASE_HEALTH = 5.0
}
```


##### On_actions

- common/on_action*

Some parts of on_actions combine rather than override each other.

``events``, ``random_events`` and ``on_actions`` are appended.

``trigger`` and ``effect`` technically overwrite, but they produce errors.

If you want to add effects to an on_action, make a custom one with your effects and fire it from the existing one.

This *adds* an effect to on_birth:

```c
on_birth = { on_actions = { my_mod_on_birth } }
my_mod_on_birth = {
   effect = { add_gold = 100 }
}
```
This *overrides* all of vanilla effects of on_birth:
```c
on_birth = {
   effect = { add_gold = 100 }
}
```
Do not do this, unless you intend to make such drastic changes.


##### Localization

We can replace single localization keys, but this produces errors, unless the file is added to the replace/ folder.

Both paths work:

``localization/{language}/replace``

``localization/replace/{language}``


##### UI types

Windows have to be in specificly named gui files, so if we want to change the character window, we have to edit the whole window_character.gui

Types and templates can be overwritten, but they follow FIOS order: first loaded type or template takes priority.

Your file name needs to come **first asciibetically**, for example, add 00_ to it: 00_my_buttons.gui.
If replacing a type, remember to define a group first, with any name. Then the type inside it.
If it's a template, just put the template in the file, don't need to add anything else.

This redefines the small button to have a different size:
```
 types SmallButton {
   type button_standard_small = button_standard
     {
         size = { 40 25 }
     }
 }
```


##### Common issues

We **cannot** override a single event, we cannot override a single faith. We have to override their whole files.

In history defined characters do not overwrite each other but produce duplicates. Have to override the whole file.

While multiple mods can add buildings, they need to overwrite the whole holdings.txt file in common/holdings to actually add them.

New clothes would also need to overwrite genes, animations need to overwrite the idle animation.


## Troubleshooting


### A mod from Paradox Mods is broken

Currently, there is [forumdirect:/threads/ck-iii-mods-from-paradox-mods-dont-work-if-they-add-new-files.1531866/](https://ck3.paradoxwikis.com/forumdirect:/threads/ck-iii-mods-from-paradox-mods-dont-work-if-they-add-new-files.1531866/) when adding mods from the Paradox Mods website. If a mod adds new files, the game completely ignores them.

To fix it, remove the mod from the playset, download it and install manually, [Modding#Installing Paradox Mods](#installing-paradox-mods).


### The mod you uploaded to Steam doesn't work

Make sure that you only use one version of the mod: either from Steam Workshop or your local copy. Unsubscribe or remove the other one. Otherwise, even if one if them is disabled, the game will be confused and may not load the mod at all.


### Mods stopped working

For unknown reasons, mods sometime stop working. There are two ways to solve this:
- Reload from the launcher:
    1. Open the launcher
    1. Go to Mod library on the left
    1. Press Reload Mods in the top right and Reload (Clearing cache doesn't seem to be necessary)
    1. Go to Playsets. The mod should have a warning saying the files aren't present on disk. Remove it from the playset.
    1. Close the launcher
    1. Resubscribe to the mod.
    1. Open the launcher and add the mod back again.
- If nothing helps, delete the following files if they are present and restart the launcher:
    1. Documents/Paradox Interactive/Crusader Kings III/mods_registry.json
    1. Documents/Paradox Interactive/Crusader Kings III/launcher-v2.sqlite


### Mods are conflicting

If several mods modify the same files or game objects, only one version of the file/object will be loaded. That's what we call a mod conflict.

Conflicts are logged in ``Documents/Paradox Interactive/Crusader Kings III/logs/database_conflicts.log``

To search for conflicting files in downloaded mods, you can use a text editor like Visual Studio Code and drop the mod folder in it.

CK3 mods are downloaded to ``Steam\steamapps\workshop\content\1158310``

In VSC you can press Ctrl+Shift+F to search through your whole project or right-click a folder and choose Find in Folder.


## Tools & utilities

- [Exporters](Exporters.md) (Maya and Photoshop)
- [Modding tools](Modding_tools.md)
- [Clausewitz Maya Exporter](https://forum.paradoxplaza.com/forum/threads/information-and-faq.924764/): a tool to create and export 3D models to use in CK3 and other Clausewitz games.
- [UWPDumper](https://github.com/Wunkolo/UWPDumper): a tool to extract files from Microsoft Store games.
- [CK3 triggers, modifiers, effects, event scopes, event targets, on actions, code revisions and setup.log](https://github.com/OldEnt/crusader-kings-3-triggers-modifiers-effects-event-scopes-targets-on-actions-code-revisions-list): List of valid inputs for most game versions since launch. Use GitHub file history feature to compare_versions.


## Save game editing

> This doesn't seem to work anymore 

Save files are located in:
- Windows: Documents\Paradox Interactive\Crusader Kings III\save games
- Linux: ~/.local/share/Paradox Interactive/Crusader Kings III/save games

**First start the game in the debug mode and save**. If it's an ironman game, exit to menu to autosave.

- On Steam: right-click the game on Steam -> Properties ->  add -debug_mode to Launch Options at the bottom
- Windows: Create a shortcut for the .exe file -> right-click it -> Properties -> add -debug_mode at the end of the Target field

PC:
1. Find the save file in the save games folder.
1. If it was an autosave, skip to the next step. Else:
## Right-click the save file and extract it like an archive with 7-Zip or WinRar
## Rename the extracted 'gamestate' file to have a .ck3 extension.
1. Right-click it and open with a text editor (Windows Notepad is not recommended as the save files are very big).
1. Edit the file and save it.
    - To remove ironman status, search for "ironman=yes" and change it to "no"
1. Load it in the game.


Mac:
1. Open Terminal
1. Ensure that the directory is set to the correct folder
1. Type in "unzip FileName.ck3"
1. Rename the extracted 'gamestate' file to something with a .ck3 extension
1. Edit this plain-text save
1. Load it directly in the game (no need to re-compress)


| **OS** | **Save type** | **Location** |
| --- | --- | --- |
| Windows | Local | ``C:\Users\%USERPROFILE%\Documents\Paradox Interactive\Crusader Kings III\save games`` |
| Windows | Steam Cloud | ``C:\Program Files (x86)\Steam\userdata\####\1158310\remote\save games`` |
| Mac | Local | ``$HOME/Documents/Paradox Interactive/Crusader Kings III/save games`` |
| Linux | Local | ``$HOME/.local/share/Paradox Interactive/Crusader Kings III/save games`` |


### Contents of the gamestate file

The table below contains the possible first-level blocks in the gamestate file. Entries are provided in order of appearance.

| **Block** | **Description** |
| --- | --- |
| meta_data | Contains metadata about the game, such as the game version. Used by the main menu screen. |
| (various variables) | These variables do not belong in a block.<br><br>\| **Variable** \|<br>\| --- \|<br>\| date \|<br>\| random_seed \|<br>\| random_count \|<br>\| speed \|<br>\| date \|<br>\| bookmark_date \|<br>\| first_start \| |
| variables | Contains script flags. |
| traits_lookup | Various traits that can been looked up |
| provinces | Contains province data, including buildings. |
| landed_titles | Contains the following sub-blocks:<br><br>\| **Sub-block** \| **Description** \|<br>\| --- \| --- \|<br>\| dynamic_templates \|  \|<br>\| landed_titles<br>*(repetition)* \| *See [Code Block 1](#code-block-1) below* \|<br>\| index=(value)<br>*(variable)* \|  \| |
| dynasties | Contains the following sub-blocks:<br>* dynasty_house (ends at entry ~6401)<br>* dynasties (ends at entry ~6239)<br>* static_dynasties (list of numbers)<br>* static_dynasty_houses (list of numbers) |
| character_lookup |  |
| deleted_characters |  |
| living | Contains entries of living characters. The following format is used for each character:<br><br>\| *See [Code Block 2](#code-block-2) below* \|<br>\| --- \| |
| dead_unprunable | Contains character entries. |
| characters | Contains the following sub-blocks:<br>* dead_prunable (contains character entries)<br>* prune_queue<br>* dummy_female (contains a character entry)<br>* dummy_male (contains a character entry)<br>* unborn (contains unborn data entries)<br>* natural_deaths<br>* current_natural_death<br>* sexuality_chances |
| units |  |
| (triggered events) | Each triggered event has its own block, started using triggered_event={ |
| played_character | Contains the following sub-blocks:<br>* name="..." *(variable)*<br>* character=(character id) *(variable)*<br>* player=(value) *(variable)*<br>* important_decisions<br>* legacy<br>* rally_points |
| currently_played_characters={ (character id...) } | List of character ids. |
| armies | Contains the following sub-blocks:<br>* regiments<br>* army_regiments<br>* armies |
| activity_manager | database entry |
| opinions | Contains the following sub-blocks:<br>* active_opinions (contains opinion entries) |
| relations | Encompasses hooks, alliances, Contains the following sub-blocks:<br>* active_relations |
| schemes | Contains the following sub-blocks:<br>* active (contains scheme entries) |
| stories | Contains the following sub-blocks:<br>* active (contains story entries)<br>* next=(date) *(variable)* |
| combats | combat_results ={}<br>combats={} |
| pending_character_interactions | Contains the following sub-blocks:<br>* data<br>* player |
| secrets | Contains the following sub-blocks:<br>* secrets (contains entries of secrets) *(repetition)*<br>** indices<br>*** type<br>*** target<br>**** type<br>**** identity=(id)<br>*** owner=(id)<br>*** relation_type<br>*** participants = { (ids)}<br>* known_secrets = {<br>** secret=(id)<br>** owner=(id) |
| mercenary_company_manager | Contains the following sub-blocks:<br>* mercenary_companies |
| vassal_contracts | active={<br>id=contract_details<br>} |
| religion | Contains the following sub-blocks:<br>* religions<br>* faiths<br>* great_holy_wars<br>* holy_sites |
| wars | Contains the following sub-blocks:<br>* active_wars<br>* names |
| sieges | Contains the following sub-blocks:<br>* sieges *(repetition)* |
| succession |  |
| holdings |  |
| county_manager | Contains the following sub-blocks:<br>* counties<br>* monthly_increase (list of values) |
| fleet_manager | Contains the following sub-blocks:<br>* fleets |
| council_task_manager | Contains the following sub-blocks:<br>* active |
| important_action_manager | Contains the following sub-blocks:<br>* active |
| faction_manager | Contains the following sub-blocks:<br>* factions |
| culture_manager | Contains the following sub-blocks:<br>* cultures<br>* template_cultures (list of numbers)<br>* era_discovery |
| holy_orders | Contains the following sub-blocks:<br>* holy_orders<br>* religion_name<br>* faith_name |
| ai | Contains the following sub-blocks:<br>* war_coordinator_db<br>* war_plan_db<br>* ai_stategies |
| game_rules | Contains the save's current game rules. |
| raid | Contains the following sub-blocks:<br>* raid *(repetition)* |
| ironman_manager | Related to ironman saving. |
| coat_of_arms | Contains the following sub-blocks:<br>* coat_of_arms_manager_name_map<br>* coat_of_arms_manager_database (ends at entry ~17278)<br>* next_id=(id) *(variable)* |
| artifacts |  |
| inspirations_manager |  |
| court_positions |  |
| struggle_manager |  |
| character_memory_manager |  |
| diarchies |  |
| travel_plans |  |
| accolades |  |
| tax_slot_manager |  |
| epidemics |  |
| legends |  |
| next_player_event_id=(value) *(variable)* |  |


## Mods with wiki pages


> **Note:** Wiki pages for modifications are the responsibility of the modification team, not the Paradox wiki team


- [Way of Kings](https://ck3.paradoxwikis.com/Way_of_Kings)
- [Kingdom of Heaven](https://ck3.paradoxwikis.com/Kingdom_of_Heaven)
- [When the World Stopped Making Sense](https://ck3.paradoxwikis.com/When_the_World_Stopped_Making_Sense)
- [Princes of Darkness](https://www.princesofdarknessmod.com/wiki/)
- [Elder Kings II](https://ck3.paradoxwikis.com/Elder_Kings_II)
- [CK3AGOT](https://ck3.paradoxwikis.com/CK3AGOT)
- [Nightmare in Britain](https://ck3.paradoxwikis.com/Nightmare_in_Britain)
- [Rajas of Asia](https://ck3.paradoxwikis.com/Rajas_of_Asia)
- [LotR: Realms in Exile](https://ck3.paradoxwikis.com/LotR:_Realms_in_Exile)
- [The Fallen Eagle](https://ck3.paradoxwikis.com/The_Fallen_Eagle)


## External links

- [CK3 User Mods](https://forum.paradoxplaza.com/forum/forums/crusader-kings-iii-user-mods.1080/) on the Paradox Forum.
- [Crusader Kings](https://discord.gg/ck3) official Discord modding channel. Go to the server-roles channel and choose CK3 Modding in the [Channel Access post](https://discordapp.com/channels/616881873506795550/710484698924711976/710490306788982804).
- [CK3 Mod Coop](https://discord.gg/apEvxDZ) A community Discord server dedicated to modding for CK3.


Category:Modding


---

## Extracted Code Blocks

<a id="code-block-1"></a>
### Code Block 1

```json
# Exact formatting in file is different in terms of spaces and lines
# It is usually more compact.
# It has been edited here for clarity and demonstration.


# Index for titles starts at 0
index={
	key="(title id)" # The one used in 00_landed_titles.txt, e.g. k_england

	de_facto_liege=(title index) # Optional
	de_jure_liege=(title index) # Optional. The number at the start of a similar block, NOT the title id
	de_jure_vassals={ (title index...) } # Optional, list of title indices.
	holder="(character id)" # Optional

	name="..."
	adj="..." # Optional
	pre="..." # Optional
	article="..." # Optional

	date=2020.10.27 # yyyy.mm.dd
	heir={ (character id...) } # Optional. List of character ids.
	claim={ (character id...) } # Optional
	history = { (...) } # Optional 
	capital=(province id)
	capital_barony=yes # Optional
	theocratic_lease=yes # Optional
	history_government="(government id)" # Optional
	laws={ "(law id)"... } # Optional. List of law ids.

	# Optional (succession_election).
	succession_election={
		electors = {  (character id...) }
		candidates={ (character id...) }
		nominations={
			{
				elector=(character id)
				candidate=(character id)
				strength=(value)
			}
		
		}
	} # end of succession_election block

	coat_of_arms_id=(coat of arms id)
	localization_key="(localization key)" # Optional

	# All below is used for mercenary bands
	special={
		type=mc
		identity=(id)
	}
	color=rgb { (r) (g) (b) }
	landless=yes
	destroy_if_invalid_heir=yes
	no_automatic_claims=yes
	definite_form=yes
}
```

<a id="code-block-2"></a>
### Code Block 2

```json
index={
	first_name="..."
	birth=(date) # Format: yyy.m.d
	female=yes # Optional
	was_playable=yes # Optional
	nickname="nick_..." # Optional
	culture=(culture index) # Optional if dynasty_house is specified, defaults to dynasty_house culture. Required if no dynasty_house, or culture different from that of dynasty_house.
	faith=(faith index) # Optional if dynasty_house is specified, defaults to dynasty_house faith.  Required if no dynasty_house or faith different from that of dynasty_house.
	dynasty_house=(dynasty house index) # Optional, must specify culture and faith if omitted
	skill={ (diplomacy) (stewardship) (martial) (intrigue) (learning) (prowess) } # One value for each skill
	prowess_age=(value) # Optional. Negative value.
	dna="(dna string)" # Optional
	mass=(value) # Optional, exclusive with weight
	weight={ # Optional, exclusive with mass
		base=(value)
		current=(value) # Optional
		target=(value) # Optional
	}

	sexuality=(value) # Optional. Defaults to heterosexual. Valid values: ho, bi, as, none. None is for children under 10.
	traits={ (trait index...) } # Optional. List of trait indices. Typically omitted for young children.
	recessive_traits = { (trait index...) } # Optional. List of trait indices
	inactive_traits = { (trait index...) } # Optional. List of trait indices
	
	# Optional (family_data)
	family_data={
		real_father=(character id) # Optional
		betrothed=(character id) # Optional
		primary_spouse=(character id) # Optional. Equal to one of the spouse ids.
		spouse=(character id) # Optional. First spouse
		spouse=(character id) # Optional. Second spouse
		spouse=(character id) # Optional. Third spouse
		spouse=(character id) # Optional. Fourth spouse
		concubine=(character id) # Optional. First concubine
		concubine=(character id) # Optional. Second concubine
		concubine=(character id) # Optional. Third concubine
		former_spouses={ (character id...) } # Optional. List of character ids
		former_concubines={ (character id...) } # Optional. List of character ids
		former_concubinists={ (character id...) } # Optional. List of character ids
		child = { (character id...) } # Optional. List of character ids
	}

	alive_data={

		# Optional (variables), contains flags
		variables={
			data={
				# (...)
			}
		}

		# Optional (modifiers), various locations in alive_data
		modifier={
			modifier="(modifier)"
			expiration_date=(date)
		}

		gold=(value) # Optional
		income=(value) # Optional
		location=(landed title index) # Optional
		stress=(value) # Optional
		fertility=(value)
		health=(value)
		piety={
			currency=(value)
			accumulated=(value) # Optional. Devotion
		}
		prestige={
			currency=(value) # Optional
			accumulated=(value) # Optional. Fame
		}
		focus={ # Optional
			type="(value)" # Education or lifestyle
			date=(date)
			changes=(value)
			progress=(value)
		}
		secrets= { (id...) } # Optional. List of ids
		targeting_secrets={ (id...) } # Optional. List of ids
		schemes={ (id...) } # Optional. List of ids
		targeting_schemes={ (id...) } # Optional. List of ids
		heir={ (ids...) } # Optional. List of ids
		pretender={ (ids...) } # Optional. List of ids
		claim={ { # Optional. List of claims
			title=(title id)
			pressed=yes # Optional
			}
		}
		used_punishments={ # Optional. List of reasons
			(value)={
				imprisonment_reason=yes # Optional
				revoke_title_reason=yes # Optional
			}
		}
		lifestyle_xp={ # Optional
			diplomacy_lifestyle=(value) # Optional
			martial_lifestyle=(value) # Optional
			stewardship_lifestyle=(value) # Optional
			intrigue_lifestyle=(value) # Optional
			learning_lifestyle=(value) # Optional
		}
		perk={ ... } # Optional. List of perks
		prison_data={ # Optional
			imprisoner=(character id)
			date=(date)
			imprison_type_date=(date)
			type="(value)" # house_arrest or dungeon
		}
		weight_update=(value) # Optional
		kills={ (character ids... } # Optional. List of character ids
		pool_history=(date) # Optional
		wars={ (value) (value) (value) (value) } # Optional
	} # End of alive_data block

	court_data={
		# All keys within this block are optional
		host=(value)
		employer=(character id)
		council_task=(council task index)
		special_council_tasks={ (value...) }
		army=(value)
		regiment=(regiment index)
		knight=yes
		wants_to_leave_court=yes
		leave_court_date=(date)
	}

	# Optional (landed_data)
	landed_data={
		domain={ (landed title index...) } # List of landed title indices
		vassal_contracts={ (values) } # List of values
		units= { (values...) } # Optional
		last_war_finish_date=(date) # Optional
		last_raid=(date) # Optional
		became_ruler_date=(date)
		laws={ "(law id)"... } # List of law ids
		strength=(value)
		strength_for_liege=(value) # Optional
		liege_tax=(value) # Optional
		balance=(value)
		dread=(value) # Optional
		known_schemes={ (ids...) } # Optional. List of ids
		succession={ (character id...) } # List of character ids
		is_powerful_vassal=yes # Optional
		vassal_power_value=(value) # Optional
		domain_limit=(value)
		vassal_limit=(value) # Optional
		vassals_towards_limit=(value) # Optional
		government="(government id)"
		realm_capital=(value)
		ai_allowed_to_marry=yes
		council={ (value...) } # List of values
		at_peace_penalty=(value)
		diplo_centers={ (value...) } # List of values
		election_titles={ (landed title index...) } # List of landed title indices
		absolute_control=yes # Optional
		interaction_cooldowns={ # Optional
			(interaction)=(date)
		}
	} # End of landed_data block

	# Optional (playable_data)
	playable_data={
		knights={ (character id...) } # List of character ids
		was_player=yes
	}

}
```

---

*Source: https://ck3.paradoxwikis.com/Modding*
