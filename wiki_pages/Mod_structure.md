# Mod structure

> **Note:** Last verified for version 1.1


Mods are located in the folder *~\Paradox Interactive\Crusader Kings III\mod*:
- Default on Windows: `%USERPROFILE%\Documents\Paradox Interactive\Crusader Kings III\mod`
- Default on Linux: `~/.local/share/Paradox Interactive/Crusader Kings III/mod`
Each mod requires two parts. Both must be located in the folder above and share the same name, barring file extensions; otherwise, the game launcher will *not* recognise the mod. Note that folder and file names are case sensitive on Mac and Linux.
- A .mod file, a plain text file with metadata required to use the mod.
- A mod folder containing files specific to modding the game, such as events, images, decisions and characters. It may also be a .zip file instead.


## Creating initial files

It is recommended to generate the initial mod files through the game launcher in the interests of speed and avoiding human error.
1. Open the game launcher.
1. Go to All Installed Mods on the left.
1. Press Upload Mod in the top right.
1. Press Create a Mod.
1. Enter a name, version of the mod (not the game), directory (the launcher will create it) and at least one tag. All of these must be completed before you can press Create at the bottom.
    - (Name must be at least 3 symbols long. DIrectory can include spaces, but cannot end with one.)
    - (Directory cannot include non English characters. If your Windows account name have such characters you must use a directory outside your Documents folder.)
The tags offered by the launcher include:

|  |  |
| --- | --- |
| Alternative History | Historical |
| Balance | [Map modding](Map_modding.md) |
| [Bookmarks modding](Bookmarks_modding.md) | Portraits |
| Character Focuses | [Religion modding](https://ck3.paradoxwikis.com/Religion_modding) |
| Character Interactions | Schemes |
| [Culture modding](Culture_modding.md) | [Sound modding](Sound_modding.md) |
| [Decision modding](https://ck3.paradoxwikis.com/Decision_modding) | Total Conversion |
| [Event modding](Event_modding.md) | [Localization](Localization.md) |
| Fixes | Utilities |
| Gameplay | Warfare |
| Graphics |  |


This process will create the following:
- The mod folder, named after your mod.
- A *descriptor.mod* file, contained within the mod folder.
- Another .mod file, this one named after the mod, located alongside the mod folder.

When [Modding#Uploading/updating a mod](Modding.md#uploading/updating-a-mod), you will be able to change the suggested game version, add thumbnail for Paradox Mods and description.


## The .mod files

The .mod files used by the game are plain text files that contain metadata about their corresponding mod. There are two .mod files for every mod:
- *(modname).mod*, located *alongside* the mod's folder. This one is required; without it, the launcher will not recognise the mod.
- *descriptor.mod*, located *within* the mod folder. It is recommended to keep this file consistent with the other one, excluding the line containing the *path* key which is not needed in the descriptor file.


### Syntax

Similar to other game files, single-line comments can be started using hash (``#``). To set a value to a key, use the format ``key="value"`` for single values; alternatively, use the following structure for lists:


```
list={
	"element0"
	"element1"
	"element2"
}
```


### Keys

The table below describes the keys available for use within the .mod file.


| **Keys** | **Required?** | **Description** | **Example** |
| --- | --- | --- | --- |
| version | Yes | Allows you to define a version of your mod, defined as a string. | version="0.0.1" |
| tags | No | Sets the tags that mod is considered part of. Correlates with Steam Workshop categories. | <pre><code>tags={<br>	"Culture"<br>	"Decisions"<br>	"Fixes"<br>}</code></pre> |
| name | Yes | Determines the name that shows up in the launcher. | name="My Mod" |
| supported_version | Required for file alongside mod folder; not required for descriptor.mod | Defines the latest game version the mod supports; launcher will show a warning if a mod is outdated. The game uses semantic versioning (MAJOR.MINOR.PATCH). Wildcards (``*``) may be used to define a range of versions. | supported_version="1.1.3" |
| path | Yes | Sets which folder is the mod's folder. Note that it is no longer relative to the main *Crusader Kings III* folder, but rather to the Crusader Kings III user folder (described above). Alternatively, one can use the entire path. | * ``path="C:/Users/Example/Documents/Paradox Interactive/Crusader Kings III/mod/my_mod"`<pre><code> (Windows)<br>* </code></pre>`path="/home/example/.local/share/Paradox Interactive/Crusader Kings III/mod/my_mod"`<pre><code> (Linux)<br>* </code></pre>`path="mod/my_mod"`` (Relative, any OS) |
| remote_file_id | Required if uploading and updating your own Steam Workshop mod. Set automatically when mod is uploaded. | Must match the Steam Workshop ID of the mod. Can be found at the end of a Steam Workshop URL, such as "2220762808" in https://steamcommunity.com/sharedfiles/filedetails/?id=2220762808. | remote_file_id="2220762808" |
| picture | No | The picture shown for your mod in the search view and on the mod's page. Steam ignores this key and always looks for thumbnail.png | picture="thumbnail.png" |
| replace_path | No | Doesn't load vanilla files for the specified path. | replace_path="history/characters" |


### Basic example

The example below displays the basic contents of a .mod file. Feel free to copy and paste it for your own .mod file, remembering to change specific details to match your own mod and game version. Note that the descriptor.mod file does *not* require the ``path`` key. 


```
version="0.0.1"
tags={
	"Culture"
	"Decisions"
	"Fixes"
}
name="My Mod"
supported_version="1.1.3"
path="mod/my_mod"
```


## Mod folder

Files that edit the game must be put inside the mod folder and are then subsequently loaded by the game. Files often have to be put into specific folders, otherwise they may not be loaded by the game. Some general ones have been listed below:

| **Type** | **Folder** |
| --- | --- |
| Events | events |
| Decisions | common\decisions |
| Defines | common\defines |
| Traits | common\traits |


For specifics, either consult the relevant modding page using the navigation box at the bottom of this page, or look in the game files (Windows/Steam: `/Crusader Kings III/game/C:/Program Files (x86)/Steam/steamapps/common/Crusader Kings III/game`) and copy the folder structure for a given file up to (and not including) the `/Crusader Kings III/game/game` folder.


## Tips

- When editing your mod folder and .mod file(s), you can reload mods in the launcher to update them without restarting it. In the "Mods" section, press "Manage all mods", then "Reload installed mods". Try this if your mod is not showing up.
- Once you have created your initial mod structure, it is highly recommended to use some form of backup system (as simple as copying your files to someplace else), or source control such as Git / Github. This will greatly help if you lose your mod files or somehow break your mod and you want to go back to an old version.
- When creating your .mod file, ensure that you follow the syntax rules correctly, otherwise your mod may not show up at all. For instance, pay attention to using quotation marks (``"``) where needed, especially around values like paths and names.
- Check spelling everywhere, including the contents and names of files and folders. Even the simplest of errors cause the greatest problems.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Mod_structure*
