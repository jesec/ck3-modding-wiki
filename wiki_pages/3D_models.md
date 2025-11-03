# 3D models

- This article is timeless and should be accurate for any version of the game.*


Crusader Kings III uses 3d models to represent objects in the game such as portraits, units and holdings, as well as map objects such as trees. This guide is intended to help CK3 modders with some existing knowledge of 3d modelling and materials. This guide is similar to other 3d modelling guides for Clausewitz like Imperator: Rome.
To create a 3d model, you will need modelling software like Autodesk Maya or Blender. You will also need an addon to import and export Crusader Kings III models. To create a texture, you will need image-editing software like Adobe Photoshop or GIMP with an addon to import and export DDS textures.


## Overview

All models and their respective textures and animations can be found in `/Crusader Kings III/game/gfx/models/`

A typical model will have the following files:
- **<model>.mesh** - The 3d model itself.
- **<model>.asset** - The script adding the model to the game.
- **<model>_diffuse.dds** - The diffuse texture for the model.
- **<model>_normal.dds** - A normal map texture.
- **<model>_properties.dds** - A joint texture with specular, metalness and roughness.

More textures for other 3d models include:
- **<model>_unique.dds** - Used with the standard_atlas shader. The B channel is the models’ ambient occlusion texture.


## Tutorial: Setup


### Tools

- Autodesk Maya. A program used to create 3d models and animation. Needs the Clausewitz Maya Exporter installed.
- [Clausewitz Maya Exporter](https://forum.paradoxplaza.com/forum/threads/information-and-faq.924764/). A Maya plugin from Paradox. Setup models based on installed games and exports model and asset. Installation instructions linked in the forum post and below.
- [Blender](https://www.blender.org/download/). A free program used to create 3d models and animation.
- [IO PDX Mesh addon](https://github.com/ross-g/io_pdx_mesh). Addon that can be installed to Blender or Autodesk Maya. Setup models from compatible games. Installation instructions on their page.


### Setup Clausewitz Maya exporter

There is a full setup guide for the [Exporters](Exporters.md). The below guide is shortened.

To setup CK3 for the exporter, open the clausewitz.settings file using a code editor, edit the folder paths and then save. The folder paths for CK3 are as follows: 
- "name": "CrusaderKingsIII"
- "path": "C:/SteamLibrary/steamaps/common/Crusader Kings III/game/tools"
- "export_path": "Your personal mod’s folder"
- "target_exe": "C:/SteamLibrary/steamaps/common/Crusader Kings III/binaries/ck3.exe"
Notes: 
- Your mod’s gfx/models folder can be anywhere on your C drive. You can choose to edit the settings for every mod you edit, or use one folder and copy your models from there to your mod.
- The / slash (forward slash) is important, Windows Explorer uses \ (backwards slash). If you copy from Windows Explorer, you will need to edit the folder paths to use /.
- The name must be one word, no spaces.


## Making the Model


### Preparing Maya/Blender 3d model


#### UVs

Order of UV maps for the standard_atlas shader: 
        - map1** - uv mapped to AO "<model>_unique"
1. **map2** - uv mapped material atlas


#### Issues with UV maps

This can catch you off guard when creating your model, map1 must be above map2, map1 must be the default uv set in Maya. If you’re importing the model from Blender as a .dae file, the uv maps must be in the correct order in Blender too.
If your uvs are not in the correct order, then use this method to rearrange them. I do not know a method to delete the default uv set in Maya.
The issue is that map1 is mapped to your material atlas. 
1. UV - UV Set Editor. Copy map1.
1. Select map2 in the UV Set Editor.
1. UV - UV Editor. Then in the UV Editor, UV Sets – Copy UVs to UV Set. Choose map1.
1. In the UV Set Editor delete map2.
1. Rename UVSet1 (originally copied from map1 in step 1) to “map2”.
1. Select map1 and click Update.


#### Broken normals

In Maya, use the Mesh Cleanup tool (with default settings) to solve ``Error! Mesh contains broken normals, tangents and/or bitangents.``


### Textures


#### Formats

These are most of the Formats for Textures in Ck3 (Kudos to "@Sparc | Princes of Darkness Mod" from the Ck3 Modding Coop) (Dimensions may have increased for some of these, but the smaller dimensions still work):


##### Icons


| ****Type**** | ****Dimensions**** | ****Format & Minimaps**** |
| --- | --- | --- |
| Religion Icons | 100×100 | ``32bit-A8R8G8B8`` (No minimaps) |
| Coat of Arms (Colored Emblems) | 512×512 | ``BC3/DXT5`` (Minimaps) |
| Coat of Arms (Patterns) | 256×256 | ``DXT1`` (Minimaps) |
| Regiment Type Icons | 120×120 | ``A8R8G8B8`` (No minimaps) |
| Focus Icons | 140×140 | ``A8R8G8B8`` (No minimaps) |
| Faith Doctrine Tenet Icons | 260×400 | ``DXT5`` (No minimaps) |
| Faith Doctrine Icon Banners | 260×400 | ``A8R8G8B8`` (No minimaps) |
| Culture Innovations | 90×60 | ``A8R8G8B8`` (No minimaps) |
| Character Interactions | 120×120 | ``A8R8G8B8`` (No minimaps) |
| Building Type Icons | 150×130 | ``A8R8G8B8`` (No minimaps) |
| Trait Icons | 120×120 | ``A8R8G8B8`` (Minimaps) |
| Lifestyle Perks | 120×120 | ``A8R8G8B8`` (Minimaps) |
| Lifestyle Backgrounds | 608×1546 | ``DXT5`` (No minimaps) |
| Lifestyle Tree Backgrounds | 347×812 | ``DXT5`` (No minimaps) |
| Legacy Tracks | 4216×368 | ``DXT5`` (No minimaps) |
| Event Type Icons | 148×148 | *(Format not specified)* |


##### Illustrations & Backgrounds


| ****Type**** | ****Dimensions**** | ****Format & Minimaps**** |
| --- | --- | --- |
| Loading Screens | 3840×2160 | ``DXT1`` (No minimaps) |
| Event Scenes | 1592×848 | ``DXT1`` (No minimaps) |
| Event Scenes (Frontend) | 1592×828 | ``DXT1`` (No minimaps) |
| Decisions | 1100×440 | ``DXT1`` (No minimaps) |
| Council | 844×844 | ``DXT1`` (No minimaps) |
| Character View | 1539×849 | ``DXT1`` (No minimaps) |
| Holding Types | 2560×1168 | ``DXT1`` (No minimaps) |
| Terrain Types | 1200×600 | ``DXT1`` (No minimaps) |
| Men-at-Arms (Small) | 160×160 | ``DXT1`` (No minimaps) |
| Men-at-Arms (Big) | 680×400 | ``DXT1`` (No minimaps) |
| Bookmarks | 1920×1080 | ``DXT5`` (No minimaps) |


##### Clothing Textures


| ****Type**** | ****Dimensions**** | ****Format & Minimaps**** |
| --- | --- | --- |
| Pattern Properties | 512×512 | ``DXT5`` (Minimaps) |
| Pattern Normal | 512×512 | ``DXT5`` (Minimaps) |


##### Building Textures

All Building Textures are 1024×1024, with DXT5 and Minimaps.


#### Channel packing

Channel packing is a way to combine different image data—like colors or textures—into one file by splitting them into its color channels (red, green, blue, or alpha), saving space and improving efficiency.

This is how most Vanilla Textures are packed (Kudos to the [stella:Maya_exporter#Exporting_textures/](https://ck3.paradoxwikis.com/stella:Maya_exporter#exporting_textures/)):

| **File** | **Channel** |  |  |  | **Notes** |
| --- | --- | --- | --- | --- | --- |
| **File** | **R** | **G** | **B** | **A** | **Notes** |
| [texturename]_diffuse.dds | DiffuseR | DiffuseG | DiffuseB | OpacityR | OpacityGB are ignored |
| [texturename]_normal.dds | NormalR | NormalR | EmissiveR | NormalG | NormalB is ignored.<br>EmissiveGB are ignored |
| [texturename]_specular.dds | Mask (various) | SpecularB | MetalB | GlossB | ColorRGB are ignored<br>SpecularRG are ignored.<br><br>Gloss RG are ignored. |


##### Gimp

If you want to create for example a new normal map in gimp, you would do the following: 

1. Import your Normal texture into Gimp.
1. Make sure you have no active selection, then go to the menu and click Colors > Components > Decompose
1. In the Decompose menu, leave everything as is and click ok. Gimp will now split your Image's Color channels, and you can then edit them as you would edit layers.
1. After this, you go back to Colors>Components>Compose. In the Compose menu, you select RGBA as Color model and can then decide which layer should represent which channel. In our example, you would set Red to the Red Layer, Green to the Red layer, Blue to a Mask Value of 0 and Alpha to the Green Layer.
1. After you click Ok, Gimp will compose the Image for you, and you should be left with a yellowish Normal map. Which you can export to [texturename]_normal.dds with BC3/DXT5 Compression and generated mipmaps.


## Tutorial: Getting them on the map

You'll want to make building models appear in the game; this requires editing a few other files.

First off, the asset file for a building must contain an entity-block and a pdxmesh-block, the former essentially containing just a reference to the latter. You'll want to reference either the mesh or the entity in different places. 


### Holdings

To make holding buildings for your modded religion or culture, you must first make sure they are considered as entities to be placed on the map: you will need to reference them by editing the vanilla file ``all_buildings.asset``, under ``gfx/models/buildings``. It is unclear what all the settings do here, but you can just follow the pattern and add a locator and attach-block for each of your new holding models, e.g. like so:


```
locator = { name = "pos_11_a" position = { @[gap *  6.5] 000 @[gap * -1.5 ] } }
locator = { name = "pos_11_b" position = { @[gap *  6.5] 000 @[gap * -0.5 ] } }
locator = { name = "pos_11_c" position = { @[gap *  6.5] 000 @[gap *  0.5 ] } }
locator = { name = "pos_11_d" position = { @[gap *  6.5] 000 @[gap *  1.5 ] } }
attach = {         "pos_11_a" = "building_[mymod]_city_01_entity" }
attach = {         "pos_11_b" = "building_[mymod]_city_02_entity" }
attach = {         "pos_11_c" = "building_[mymod]_temple_01_entity" }
attach = {         "pos_11_d" = "building_[mymod]_temple_02_entity" }
```


Now, for the second part there's a distinction between temple holdings and castle/city holdings. The choice of temple holding is primarily determined by a religion, and for castles and cities it is culture. In order to have a culture make use of your new city and castle holdings, you define a new ``graphical_culture`` for your culture. This is just a tag and does not need to be declared anywhere; just put e.g. ``[mymod]_building_gfx`` in the ``graphical_cultures`` block at the top of your culture definition. Religions, on the other hand, define a ``graphical_faith``. It is similarly defined at the top of a religion definition.

Then to string everything together, you edit the vanilla file for the *buildings* (not holdings as one would expect). E.g. to add a new temple holding mesh, you edit ``00_temple_buildings.txt``. Each of the four tiers of the holding (of the core building, really) has a series of asset blocks defining potential meshes to use for that building. You add one for your own new holding model like this:


```
asset = {
	type = pdxmesh
	name = "building_[mymod]_temple_01_mesh"
	illustration = "gfx/interface/illustrations/holding_types/temple_[mymod].dds"
	soundeffect = { soundeffect = "event:/SFX/Ambience/3DMapEmitters/Holdings/Temples/[mymod]_temple" soundparameter = { "Tier" = 0 } }
	graphical_faiths = { "[mymod]_gfx" }
	graphical_regions = { "graphical_[mymod]_region" }
}
```


In ``name`` you reference the *mesh* tag from your asset file. ``illustration`` specifies the art forming the background of the holding UI (in vanilla a variable is used instead, with the underlying path at the top of the file). ``soundeffect`` references ambient sound you hear when you hover over the holding in the game. And here ``graphical_faiths`` references one or multiple graphical_faiths that you can define for your new religion.

Finally, ``graphical_region`` is a fully optional way to restrict the geographic usage of the model. It can be used if you have several versions of the same model, using e.g. different materials so they blend in with different locales. They reference to a ``graphical_region`` in ``map_data/geographical_regions.txt``, where you can add new ones too.

This syntax works the same for cities and castles; just use ``graphical_cultures`` in the place of ``graphical_faiths``.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/3D_models*
