# Sound modding

Required free tool: [FMOD Studio 1.10.20](https://www.fmod.com/download#fmodstudio)

We recommend this version, as newer ones can cause crashes in CK3 1.16.

On the website, select FMOD Studio, Older, in the dropdown find 1.10.20. It's "unsupported" but it works for us.


What is FMOD?

FMOD lets us mix multiple sounds into events which are then stored in banks and played by the game.

Use [FMOD Bank Tools](https://www.nexusmods.com/rugbyleaguelive3/mods/2?tab=files) to extract wav files from the game's banks. (download requires a Nexus account)

While music can be added directly as wav files, sounds cannot, we have to import them throgh FMOD banks.

We also cannot reload audio files while the game is running, we have to restart.


## Import sounds

We have an FMOD template where everything is set up for you. This is the easiest way to do this.![screenshot of FMOD, creating an event with Windows XP error sound](https://ck3.paradoxwikis.com/File:FMOD_creating_an_event.png)![Screenshot of FMOD, assigning a new Windows XP error event to a Master bank](https://ck3.paradoxwikis.com/File:FMOD_assigning_an_event.png)![Screenshot of FMOD, a Windows XP bank with Windows XP error event](https://ck3.paradoxwikis.com/File:FMOD_bank.png)![Screenshot of a mod with new sound files, with two banks inside sound/banks folder](https://ck3.paradoxwikis.com/File:Sound_mod_files.png)


### With a template

1. Download this [FMOD project template](https://github.com/Agamidae/1.10-FMOD-CK3-template) from Github.
1. Unzip it, open '1.10 fmod ck3 template.fspro'.
    - If FMOD asks to recover the file, agree. Re-save it as your own project, so you can always reuse the template.
1. Add your sounds to the Assets tab.
    - It accepts wav, mp3, ogg, aiff, wma and flac.
1. Right-click them and create events (any type, pick 2D if unsure).
    - You can rename events by double-clicking and change their volume at the bottom of the screen.
1. Go to Events tab, right-click your events and assign them to the Bank bank.
1. Go to Banks tab and rename the bank to something unique to avoid conflicts with other mods or game files.
    - IMPORTANT! The name of your bank should precede "Master Bank". Try A-L range. See below for details.
1. Go to Window > Mixer Routing (Ctrl+5).
1. Right-click your events and assign them to appropriate VCAs, these are game's volume controls. Without it, our sounds would blast players at full volume.
1. Save and build the project from File > Build (F7). It will create bank files in the project's ``Build/banks`` folder.
1. Copy the banks to your mod's ``/sound/banks`` folder. You'll have two files, copy both.
    - Check for typos! That's singular ``sound`` and plural ``banks``.
1. For the future, you can tell FMOD to build right to the mod folder, in Edit -> Preferences -> Build.
    - if you change the name of your bank, you'll need to remove the old bank files manually
1. Launch the game with your mod and test with console command ``Audio.PlayEvent event:/myevent`` 
    - Note, the console can't play events with spaces in them. This is not an issue for script and UI.
    - If you put your events into folders in FMOD, then this path would include folder names, eg: ``event:/somefolder/myevent`` 
    - You do not need to reference the name of the bank here.


### Bank name and crashing

The bank name can cause the game to crash on exit.

We don't know why or the exact way to avoid it.

Try using names that come before "Master Bank" alphabetically to reduce the risk of the crash.

This is the name of the master bank used by the game and something about the load order causes issues.


From tests, these names would crash on exit:

❌ Mazter, New, template

These names work:

✔️ Key, List, Ma

There are more oddities:

'Ar' and 'ar' work, while 'aR' crashes. 'Army fix' works, but 'army_fix' crashes.

Try avoiding underscores and capital letters after the first one. More testing is welcome.


This crash doesn't doesn't happen during gameplay, only after a player clicks Exit to Desktop. 

So it's not critical, but it's still better to avoid it, so it doesn't open the crash reporter and doesn't create log files, which can quickly eat up space on the drive.


### Create from scratch

To do this on your own, you'll need to create VCAs and replace all the GUIDs of your project with the ones from the game.

1. Create your project and add new events, following the steps from above.
1. Go to Window > Mixer Routing, VCAs tab. Create a new VCA and name it one of these names, depending on what your sounds are:
    - Ambience, Music, Sound Effects, UI
1. In the Routing tab, expand the Master Bus and assign your sounds to the VCA. This will allow players to adjust their volume.
    - Note, you may need to assign one event to multiple VCAs. UI sounds are also affected by Sound Effects volume, for example.
1. Save your project (don't put it in the mod folder yet).
1. Go to File > Export GUIDs. This will create a text file in your project's Build/ folder.
1. Go to that folder and open GUIDs.txt.
1. Find the line ending with ``bus:/`` and another with the name of your VCA and copy the ids to another file somewhere. They might look like this:
    - ``{767eec3a-3ca8-4ae8-8827-376bf7db4d8f} bus:/``
    - ``{72d40a2a-0111-4078-8ba7-e84d415b91a2} vca:/UI``
1. In CK3 folder, open game/sound/GUIDs.txt and find its ``bus:/`` and vca lines, copy their ids as well. The VCAs are at the bottom. E.g.: 
    - ``{cb930c67-0464-4d7f-957a-a78b08fc39de} bus:/``
    - ``{f8bd5083-a8cc-412b-ada4-cdc08a33ce75} vca:/UI``
1. In your FMOD project folder, search through all the files in the Metadata folder and replace your ids, inside {}, with the ones from the game, for both the bus and vca.
    - In this example, for the bus, we're replacing ``767...`` with ``cb9...``You will likely see at least 4 results.
    - If you don't have a proper text editor, install [VSC](https://code.visualstudio.com/). Drop the Metadata folder into it, right-click > Find in Folder.
1. Go back to FMOD and restart it, reopen your project.
1. Select File > Build. This will create our bank files that will be used by the game.
1. Copy all the bank files created and put them into your mod, in sound/banks folder.

## Playing sounds in the game

Sound events can be played from script, UI or from models on the map.

**Script:** 

``play_sound_effect = "event:/myevent"``

**UI buttons:**

``clicksound = "event:/myevent"``

``oversound = "event:/myevent"`` - this plays when the cursor hovers over a button

**UI animation states:**

```c
state = {
  name = "my_sound"
  start_sound = { soundeffect = "event:/myevent" }
  end_sound = { soundeffect = "event:/myevent" }
  soundparam = { name = parameterName value = 1 }
}
```
end_sound will play at the end of the animation if it has duration. Otherwise, you can simply use start_sound to trigger it immediately.

soundparam is optional, used to modify the event using a parameter set in FMOD. See [Sound modding#Sound Parameters](#sound-parameters) below.

Remember that states don't fire by themselves, see [Interface#Animation states](Interface.md#animation-states)

You can also use a scripted gui that plays the sound in script and fire it from a button's onclick or a state's on_finish.

**3D models:**

Buildings (common/buildings)
```c
asset = {
  ...
  soundeffect = { soundeffect = "event:/eventName" soundparameter = { "parameterName" = 0 } }
}
```
Units (gfx/models/units/infantry)
```c
state = { 
  ...
  event = {
    time = 0.0
    soundparameter = { "parameterName" = 0.0 }
    sound = { soundeffect = "event:/eventName" }
  }
}
```


## Troubleshooting

If the error log says it couldn't load a bank, you probably didn't replace the ids correctly or didn't reopen the project afterward.

If it can't find a specific event, double-check the path, the name and that it's assigned to a bank in FMOD.


## Random sounds

You can easily create randomized sounds in FMOD with multi instrument.

Select multiple audio files, right-click > Create Events > Create a new event with one multi instrument.

Select your new event from the Events tab and select the track in the middle of the screen.

At the bottom, under Playlist, there is a dropdown menu, with Shuffle. You can select other modes, to use pure random chance or to play them one by one with Sequential - Global Scope.

Press play to test it, it will pick a new track every time.

This if, for example, how [CK2 Selection Music](https://steamcommunity.com/sharedfiles/filedetails/?id=3391666885) mod works.


## Overlapping sounds

By default, if you play your sound repeatedly, the sounds will overlap and could cause too much noise.

To avoid it, select your event, at the bottom right there is a parameter Max Instances. It's set to infinite by default.

Hold and drag it or press the little triangle to enter 1. (or another number if you want a few instances to play at the same time)

Below it, Stealing option will determine the behavior. "Oldest" will interrupt the previous sounds, while "None" will prevent any new sounds until the first one finished playing. It seems that CK3 uses "None" for things like notifications and army orders.


## 3D sound

![Distance is a built-in parameter in FMOD that can be used to automate sound effects. (EQ, Volume, Reverb, Delay, etc.)](https://ck3.paradoxwikis.com/File:FMOD_Distance_Automation.png)
If you're adding sounds to be played on the map, create an event with 3D Action or 3D Timeline type. They allow for distance falloff.

At the bottom right there is a parameter Min & Max Distance. The default distance is fairly small, the sound emitter will only play when it's pretty much in the center of the screen.

In the game, use console command Audio.Debug to see the sizes of sound emitters. They are fairly small, so you may choose to keep yours the same size for consistency.


To automate effects (in this case a Multiband EQ) based on the distance parameter in FMOD do the following in an Event:

1. Add Parameter Sheet by clicking the +  view next to Timeline and clicking 'Add Parameter Sheet' > 'New Parameter'.
1. Select 'Built-in: Distance'.
1. Add a Multiband EQ on the instrument.
1. Right click Freq. (A) and modulate it with distance.
1. Draw your curve and test it out live by changing the distance parameter.


## Sound Parameters

![The 'Add Parameter' window in FMOD.](https://ck3.paradoxwikis.com/File:Sound_Parameter.png)
Sound Parameters can be used in script to modify the sound effect. For example, the soundparam CharacterStressLevel is used to intensify the stress outbreaks in-game at higher levels of stress.

- NOTE: Sound Parameters cannot be used in regular script like:* ``play_sound_effect = "event:/myevent"``


### Adding Sound Parameters to Events in FMOD

To add parameters to an event in FMOD do the following:

1. Select the Event that needs the parameter and enter the Event Editor.
1. Press the '+' next to 'Action' or 'Timeline' then press 'Add Parameter Sheet' then 'New Parameter'.
1. Name your parameter. Use 'User: Discrete' Parameter type, if you want the values in integers otherwise use 'User: Continuous'. Press OK.
1. The parameter can now be used to automate Volume, Effects, etc.
1. Right-click the desired value(s) (Volume, panning, reverb length, etc.) and press 'Add Automation'.
1. Press on 'Add Curve' then 'Browse > ParameterName'.
1. Draw a curve by double-clicking in the graph to make points.
1. The sound can be tested live by changing the parameter in the 'Parameters' pane on the right.


### Using the Sound Parameters in In-Game GUI

In GUI you can reference the parameter and use a value to modify the sound effect like this: 

```
start_sound = {
    soundeffect = "event:/test_sound"
    soundparam = { name = ParameterName value = 1.5 }
}
```


## Best Practice

![Right-click and press 'New Folder' to organize your events.](https://ck3.paradoxwikis.com/File:Event_Folders.png)


### Organizing your Events in Folders

Putting all your Events in the root is urorganized, so a folder structure is recommended for bigger mods and mod compatibility.

To make folders simply right-click in the 'Events' tab and press 'New Folder'.

Events can now be referenced like the following:
```
event:/YourModName/SFX/TestSound1
event:/YourModName/SFX/TestSound2
event:/YourModName/Ambiance/Ambiance1
```

Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Sound_modding*
