# Exporters

> *This article is timeless and should be accurate for any version of the game.*


Modders can use the **exporter tools** that Paradox provides 'as-is'. These can be used to export textures from Photoshop and meshes/animations from Maya.

The Maya exporter is only used internally with Maya 2018, though it may also work on other versions. It will not work with Maya LT, which has limitations on plugin usage.


- [Setup](#setup)
  - [Installation](#installation)
  - [Photoshop Setup](#photoshop-setup)
  - [Maya Setup](#maya-setup)
- [Forum](#forum)


## Setup


### Installation

The exporter can be downloaded from here (requires Paradox account):

[Paradox Plaza - Downloads](https://accounts.paradoxplaza.com/profile/downloads)

1. Close Photoshop and Maya
1. Download the exe called "Clausewitz Maya Exporter" (this also includes the Photoshop exporter)
1. Run the Maya Exporter Deploy Wizard, filename 'PdxExporterInstall.exe'. Default settings should be fine
1. Run ExporterInstaller.exe (it should run automatically).
1. You should now have the plugins deployed in the correct places, and a settings file
1. Open the newly-created settings file: 'Documents\Paradox Interactive\PdxExporter\settings\clausewitz.settings'
1. Replace the contents with the following:

```
   {
       "projects": [{
           "name":         "CrusaderKingsIII",
           "path":         "C:/Program Files (x86)/Steam/steamapps/common/Crusader Kings III/game/tools/",
           "export_path":  "C:/Program Files (x86)/Steam/steamapps/common/Crusader Kings III/game/",
           "target_exe":   "C:/Program Files (x86)/Steam/steamapps/common/Crusader Kings III/binaries/ck3.exe"
       }],

       "mergetool": "C:/Program Files (x86)/Meld/Meld.exe $1 $2"
   }
```

Make sure it actually pointing to the correct directory where your game has installed. 

When you make any changes, run it through a [JSON Validator](https://jsonlint.com/) to catch any errors early.


### Photoshop Setup

TextureExporter 2.0 should now appear in Photoshop > File > Scripts > TextureExporter 2.0

Assign a hotkey to this as you might end up using it a lot – PDS artists use F7.

In the Exporter, click the 'Texture' Asset Type radio button, and then press Generate Missing Layers.

The layer groups will generate before your eyes. You can place any texture you need within these Layer Groups.

When you are ready to export, hit Export. All the layers will be packed into DDS files and sent into the game.


### Maya Setup

First download and install [Meld](https://meldmerge.org/) as it will make re-exporting a little more painless.

After starting Maya, you go into Plug-in Manager, and activate pdx_exporter.mll 

To open the exporter, run the following MEL script:

```
   rehash; source pdx_export_ui.mel; 
   showPdxExport;
```

You can add this to your shelf using the following process:

[Maya - Make a shelf button for a script](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2016/ENU/Maya/files/GUID-527023AE-9FB5-4D01-8D29-075B1E6C4754-htm.html)

If the window opens and you see the list of shaders in the Output window, then you are good to go!


## Forum

Join the discussion on the [Clausewitz Maya Exporter (modding tool)](https://forum.paradoxplaza.com/forum/forums/clausewitz-maya-exporter-modding-tool.935/) subforum!


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Exporters*
