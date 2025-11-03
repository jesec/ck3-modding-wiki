# Interface

- This article is timeless and should be accurate for any version of the game.*


CK3's user interface (UI) is highly moddable, but for this reason UI mods change the checksum, to prevent cheating and desyncing in multiplayer.

Since the 1.9 patch UI mods do not disable achievements.

The game includes a GUI editor, but it lacks functionality.

Modders can:
- change the visual style of the interface*
- make windows movable and resizable
- change and remove elements
- add new buttons
- show more information from the code
- add new windows

Modders can’t:

- *create a new hud skin, the game ignores new .skin files in mods

- add new hotkeys. We can only reuse existing ones, the game ignores the .shortcuts file if it's in a mod
- display information from one window in another, unless developers included that possibility.

## Basics

The interface in CK3 is created through .gui files in the game/gui folder, which are somewhat similar to html files.

As such, you can edit them with any text editor, like [Modding#Tips_.26_guidelines](Modding.md#tips_.26_guidelines). Choose Python or Perl 6 for syntax highlighting, they fit well.

CK3 uses .dds files for textures, which are saved inside the game/gfx/ folder. Although it can also accept .png files in many places.

To edit or save .dds files use either Photoshop with [Intel plugin](https://software.intel.com/en-us/articles/intel-texture-works-plugin) or GIMP with [this plugin](https://code.google.com/archive/p/gimp-dds/downloads).

![Steam launch options for auto-reloading files](https://ck3.paradoxwikis.com/File:Debug_launch_options.png)

    - Launch options**

To auto-reload gui files in the game and use console commands, add ``-debug_mode -develop`` launch options:
- right-click the game on Steam, choose Properties, in Launch Options at the bottom enter ``-debug_mode -develop``
Every time a .gui file is saved it will be reloaded by the game.

    - Important console commands:**

- ``dump_data_types`` - lists all available GUI functions in data_types*.log files in your log folder (Documents/Paradox Interactive/Crusader Kings III/logs/data_types)
You can merge all the log files to make it easier to search through them.

To do it quickly, make and run a .bat file in the data_types folder with this code: ``type *.txt > ALL_DATA_TYPES.txt``
- ``tweak gui.debug`` - enables highlighting of UI elements. Uncheck all options, check gui.debug. The tooltip will show the exact file and line of the element.
- ``release_mode`` - shows the error counter on screen. Very useful to quickly spot when you made an error in UI. Can be toggled with a button under the console.
- ``gui_editor`` - opens the GUI editor, hotkey Control + F8

![screenshot of the error counter](https://ck3.paradoxwikis.com/File:Errorhoof.jpg)
Optional, not usually needed with hot reload:
- ``reload gui`` - reloads all gui files or a specific file if provided its name: ``reload gui/frontend_main.gui``
- ``reload texture`` - reloads all texture files or a specific file: ``reload texture flatmap.dds``
Other tips:
- keep the error log open to see if there is a mistake in the code (it's in the same log folder)
- keep the data types logs open, so your text editor uses it for autocompletion
- you can use test_gui.gui in gui/debug for testing. To show this window, open the console and click Test Window. To close it, run the ``GUI.ClearWidgets`` command.
- fold code so it's easier to see its structure. Usual hotkeys are Ctrl+K, Ctrl+1 (where 1 is the level at which to fold the code).


## Creating a GUI mod

1. Start the game launcher, go to Mod library, Upload Mod, Create a Mod. Fill in all the fields, including tags.

Clicking Create will create a new folder and a .mod file in ``Documents/Paradox Interactive/Crusader Kings III/mod``

2. Next, create a "gui" folder inside your mod and copy the files you want to mod there from game/gui.

- If you don’t know which file is needed, use the gui.debug console command or the GUI editor and inspect it in the game.


## Inspecting GUI

We can inspect UI elements in the game with gui.debug inspector or with GUI Editor.

gui.debug is faster, but the editor can also edit the interface right in the game. That said, GUI Editor is very limited and is not recommended.

Both methods let us quickly open the right gui file in the text editor and even jump to the right line. This requires a little bit of setup (you only need to do it once).

If you don't have a proper text editor, install VSCode or Sublime.

To open gui files from the game:

1. Find the .exe file of your text editor, right click it and choose Copy as path.
1. Open pdx_settings.txt in Documents\Paradox Interactive\Crusader Kings III
1. Search for "editor" and in its value paste the path to your text editor, like this: ``value="E:\Program Files\Microsoft VS Code\Code.exe"``
1. In the "editor_postfix" below add ``:$:1`` for its value, like this: ``value=":$:1"``
1. Save the file.

The postfix is what tells the editor to jump to the right line.

After this you can launch the game and quickly open .gui files. The path can also be changed in the game console, using ``settings`` console command, but it will require restarting the game.


### GUI Debug

gui.debug is a console command that enables the inspector.
![a screenshot of the tweaker menu for gui.debug with extra options unchecked except for gui.debug](https://ck3.paradoxwikis.com/File:Tweak_gui.debug.png)
It shows a tooltip with debug information, allows us to select a gui element, open its .gui file and jump to its exact line.

To use it:

1. launch the game with ``-debug_mode -develop`` options.
1. Open the console with a ` (below Esc)
1. type ``tweak gui.debug`` and press Enter
1. In the tweaker menu uncheck all options and check GUI.Debug
1. After that you can use gui.debug command directly, without opening the tweaker. There is a button under the console for it.

(We disable other debug options because they highlight all existing elements and it can be overwhelming)

![a screenshot of a gui.debug tooltip showing what file the character of the week is defined in](https://ck3.paradoxwikis.com/File:Gui.debug.png)
With the inspector active, your cursor will highlight a gui element with a green border and the tooltip will show its file. The number afterwards is the line it's on.

Alt + left-click selects other elements above or below.

Alt + right-click opens the .gui file in your text editor and jumps to the line with that element.

Optional:

To avoid opening the tweaker every time, consider adding your own button to the console, with these commands:

``onclick = "[ExecuteConsoleCommands('gui.DebugRenderOutsideParent;gui.Debug.DrawUnderMouse;gui.Debug.DrawAll;gui.Debug')]"``

This will toggle all the extra options and enable gui.debug. Then use the other button to only toggle gui.debug.

You can also make your own button with a hotkey that would fire gui.debug and spawn the button in with a scripted widget. See scripted widgets below.


### GUI Editor

![a screenshot of GUI Editor showing the structure of the frontend gui file](https://ck3.paradoxwikis.com/File:GUI_editor.png)
GUI Editor is a developer tool for editing the UI in the game.

While it may seem less intimidating then editing raw files, it is also much more limited.

To use it, launch the game with ``-debug_mode`` and ``-develop`` options.

To open the editor, either:
- press Ctrl+F8
- open the console with the ` key (below Esc), click GUI Editor
- open the console, run gui_editor command
    - Features**

By default the editor starts with the Edit mode enabled. You can disable it in the top window, called Outliner. Hotkey "E".

- The edit mode is similar to the Inspect mode in browsers. While it’s enabled you can’t interact with the game, but it allows you to select parts of the UI and change them in the Properties window below.
- Scroll with your mouse wheel to change what element the editor should focus on, since hud.gui tends to get on top of other windows.
- Light blue border indicated the selected element. To hide other borders, uncheck "Show Hierarchy" in the Outliner (Hotkey "L").
- Holding the right mouse button allows to move the selected element.
- Alt+right-click opens the file with that element. Be careful, you can accidentally move the element with right click!
- To undo anything, press Ctrl+Z or the undo button in the Outliner. Redo is next to it, Ctrl+Y.
- Red stars * in the Outliner indicate unsaved changes. Press Ctrl+S or the save button at the top to save them. Make sure the gui files you're editing are in your mod, otherwise it will write the changes to the game folder. (To reset them, verify integrity from Steam's properties window)
- You can move any dev windows by dragging them and resize them by dragging the edges.
- You can drag UI elements in the Outliner's hierarchy to reorder them. Right-click to show the context menu.
- You can change or add new properties (by clicking the plus symbol) in the Properties window.

By clicking "Window" in the Outliner, you can open two more windows: UI components and Registered Data Types.
- UI Components is like a palette from which you can drag new elements to the UI. gui/shared/standard.gui and gui/defaults.gui contain the most common things, like buttons, icons and text.
- Registered Data Types may be used to look up what functions are available to display data from the game.
- Clicking the top right button in the Data Types will dump this data to your log folder (Documents/Paradox Interactive/Crusader Kings III/logs/data_types). You can also use ``dump_data_types`` console command.

Note: it is often easy to select a template by mistake, changing which will affect *all* instances of it in the UI. Pay attention to what file you have selected in the outliner. If you see in the Properties window a blue header that starts with "type:", it is a template, so be careful not to edit this part (unless you intend to).


## UI code

CK3’s UI is composed of containers and objects inside them.

Most windows, for example, are created using a ``window`` container, while map icons use a widget or an hbox.

The order in the file determines the order on the screen: what's lower in the code will appear on a higher layer.

Most elements can also contain others, for example, there can be a textbox inside an icon inside a button. Nested elements, aka children, will be moved with their parent.

Position is set relative to the top left corner (either of the screen or the parent). This can be changed with ``parentanchor`` property. The available options are: left, right, top, bottom, hcenter (horizontal center) and vcenter (vertical center). They can be combined with a | like this: ``parentanchor = right|vcenter``.

Every element is opened and closed with curly brackets, like this: ``container = { }``.

The common code style is to open and close the block on the same level, while indenting the contents with one tab:


```
widget = {
  size = { 50 50 }
  alpha = 0.5
}
```


This helps you see the structure of the code better, notice any missing or extra brackets, and is needed for some editors to correctly fold the blocks of code.


### Promotes and Functions

Each window has a predefined set of commands - promotes and functions - available for it. These can be found in the data_types*.log files in ``Documents/Paradox Interactive/Crusader Kings III/logs/data_types`` after you use the ``dump_data_types`` console command.

They are used to display all data from the game, like your name, gold, children, and to set button actions.

A promote returns a scope, i.e a game object, like Character or Province, while a function returns a number, a string or a boolean (true/false), etc.

Global commands can be used anywhere, like GetPlayer (returns the player character) or GetCurrentDate.

Other commands can only be used in their window/object, for example, GetParents can only be used in the character window and must be started with ``CharacterWindow.GetParents``.

Commands can be chained like this:

``CharacterWindow.GetCharacter.GetPrimaryTitle.GetHeir.GetPrimarySpouse.GetFather``

Objects can inherit the scope from their parent, meaning we wouldn't need to retype the line above to show information about this character. Instead we can set ``datacontext`` of a widget to this line and then every textbox in it will use ``"[Character.GetNameNoTooltip]"``, ``"[Character.GetGold]"``, etc.

The same applies to items in gridboxes.


##### Type casting

Unlike in script, values in UI have different types: integers, fixed-points, floats, etc.

Most of them can be converted to another type with functions like FixedPointToFloat or IntToFixedPoint. This is called type casting.

This is necessary because some functions and elements require a specific type, for example, alpha parameter requires a float.


##### Casting numbers to strings

- (This is an advanced section. Skip it if you're just learning)*

Currently, there is no vanilla function to turn a number into a string. This may be needed for string comparisons or concatenating numbers with text.

The workaround is to pass the number to localization, which will then be treated as a string in UI.

Here are the steps, using player age as the example:

1. Create custom localization in common/customizable_localization:

```c
NumberToString = {
    type = all

    text = {
        localization_key = number_to_string
    }
}
```
2. In the gui file, pass the number to it:

``raw_text = "[GuiScope.AddScope( 'number', MakeScopeValue(IntToFixedPoint( GetPlayer.GetAge ))).Custom( 'NumberToString' )]"`` 

Note that GetAge returns int32, and MakeScopeValue only accepts fixed-points, so we need to cast it first with IntToFixedPoint. Adjust this if your value is of a different type.

3. In the localization, we grab our saved 'number' scope:

```c
l_english:
 number_to_string: "[SCOPE.GetValue('number')|0]"
```
And this will be passed to UI as a string.  Localization number_to_string essentially replaces our whole line in the second step. Read more about [Customizable localization](https://ck3.paradoxwikis.com/Customizable_localization).

The function in the second step can be replaced by a macro to make it shorter and easier to reuse.

To do that, create a new file in a data_binding folder (outside of gui):
```c
macro = {
    description = "Returns the int32 as a string."
    definition = "GetString_int32(Arg0)"
    replace_with = "GuiScope.AddScope( 'number', MakeScopeValue(IntToFixedPoint(Arg0))).Custom('NumberToString')"
}
```
This can be used as ``"[GetString_int32( GetPlayer.GetAge )]"`` or ``"[GetString_int32( '(int32)2' )]"``


### UI Components

These are basic components that compose all windows. The game has many predefined types, based on these components, which can be found in gui/shared.

You can preview some of them in the UI Library window. To open it, toggle release mode under the console and the UI Library button will appear above it.

``window``

- A movable container. To enable movement, add ``movable = yes`` property.
- Can be fixed size or resized by its children.
- In the game the background is set using templates, like ``using = Window_Background`` and ``using = Window_Decoration``.
- If a child is outside of a window, it won't be clickable and won't show a tooltip. Use ``allow_outside = yes`` to change this. 
- Clicking a window will bring it to the front of other windows that share the same layer. Use ``PdxGuiWidget.StackTop`` or ``PdxGuiWidget.StackBottom`` to manipulate the order.

``widget``

- A static container, similar to a window. Clicking it does not bring it to the front.

``margin_widget``

- Similar to a widget, but can be resized with margins. (This allows us to make windows that resize to screens of different size, by setting height to 100% and margins to ~50 to show the hud)

``container``

- Does not have a fixed size (but you can set maximumsize).
- Resizes automatically to fit all its children, including invisible ones. Use ``ignoreinvisible = yes`` to ignore them.
- Often used to group multiple elements to move them together.

``flowcontainer``

- Arranges all its children in a horizontal row and resizes to fit them. Use ``direction = vertical`` to make it vertical.
- Doesn't ignore invisible children by default. Use ``ignoreinvisible = yes`` to change it.
- Can't have fixed size.
- Its children cannot have positions, as they are set automatically.
- If you need to adjust position of its child, you can put it inside a container or a widget and then change position relative to this parent.

``hbox``/``vbox``

- Arranges all its children in a horizontal row and spreads them along its width. Vbox is the same but vertical.
- Can't have fixed size, instead resizes to fit its children or to the size of the parent, depending on the layout policy.
- Can be limited by minimumsize, maximumsize, min_width, max_width and margins.
- Ignores invisible children by default. Use ``ignoreinvisible = no`` to change this.
- Accepts datamodels (to create lists from game data).

``dynamicgridbox``

- Is only used with datamodels.
- Arranges all the items vertically. Use ``flipdirection = yes`` to make it horizontal.
- Doesn't ignore invisible items by default. Use ``ignoreinvisible = yes`` to change it.
- Resized by the content and limited by minimumsize and maximumsize.
- Items can be of different size.
- Can become laggy with very long lists.

``fixedgridbox``

- Similar to a dynamic box but all its items are of fixed size (it is essentially a table).
- Is only used with datamodels.
- Arranges all its items vertically. Use ``flipdirection = yes`` to make it horizontal.
- Cannot ignore invisible items.
- Can be fixed size, resized by the content and limited by minimumsize and maximumsize.
- Much better for performance with long lists.

``overlappingitembox``

- Is only used with datamodels.
- Arranges all its items horizontally and overlaps them if the list is longer that the size of the box. Use ``flipdirection = yes`` to make it horizontal.
- Can be fixed size or autoresized.

``scrollarea``

- A widget with scrollbars that appear if the content is bigger than its size.
- Scrollbars can be disabled with ``scrollbarpolicy_horizontal = always_off`` and ``scrollbarpolicy_vertical = always_off``.
- Can be fixed size, resized by the content and limited by minimumsize and maximumsize.
- Game files primarily use a ``scrollbox`` type, which is a scrollarea with a background, scrollbar and margins.

``button``

- A clickable object. Accepts ``onclick`` and ``onrightclick``.
    - When adding a right click function, include ``button_ignore = none``.
- Doesn't have a texture by default.
- Can be fixed size or resized by its children.
    - A button without size can be used to add invisible hotkeys.

``icon``

- Displays a texture.
- Can be used as a widget to store children.
- Can be flipped with ``mirror = horizontal`` or ``mirror = vertical``.

``textbox``

- Shows text.
- Can be fixed size or autoresized.
- Use ``elide = right`` or ``elide = left`` to cut off text that is too long
- Can be a single line or multiple, with ``multiline = yes``.
- Game files primarily use types set in gui/shared/text.gui, like ``text_single``. Use them to keep visual consistency and to type less code every time.


#### hbox/vbox

Hboxes and vboxes are resizable containers that order and resize or spread out their children. hbox orders children horizontally, vbox vertically, otherwise they work the same way, so all examples here apply to both.

They automatically center themselves and their children. Do not use parentanchor, it will break the layout. Instead use ``expand={}`` to push things to one side. See examples below.

Almost all windows use a vbox to arrange their contents vertically. As a rule of thumb, use expanding policies on a vbox and ``expand={}`` after it. This solves 90% of problems with layout.

    - Important:** objects with large size can stretch boxes and mess up the layout. This often happens in vanilla with long text, especially with German and Russian languages.

Set max_width on your text and test it with very long strings. Use LOREM_IPSUM_TITLE and LOREM_IPSUM_DESCRIPTION localization keys to insert large placeholder text.

    - Detailed behavior:**

On the screenshots below, hboxes have black background. All of the examples are available in the [UI Library mod](https://steamcommunity.com/sharedfiles/filedetails/?id=2579010074).


| By default, an hbox works similar to a flowcontainer: it orders children horizontally and resizes to fit them.
<pre><code>hbox = {<br>    button_round = {}<br>    button_round = {}<br>}</code></pre> | ![Simple hbox wide](https://ck3.paradoxwikis.com/File:Simple_hbox_wide.jpg) |
| --- | --- |
| With ``layoutpolicy_horizontal = expanding`<pre><code> it expands to the width of its parent and spreads its chilren out<br></code></pre>hbox = {
```
    layoutpolicy_horizontal = expanding
    button_round = {}
    button_round = {}
```
}` | ![Expanded hbox](https://ck3.paradoxwikis.com/File:Expanded_hbox.jpg) |
| To group its children, we can use ``expand={}`` to push them to one side. ``expand`<pre><code> is a template widget with layout policies set to "growing" (defined in gui/shared/windows.gui)<br></code></pre>hbox = {
```
    layoutpolicy_horizontal = expanding
    button_round = {}
    button_round = {}
    expand = {}
```
}` | ![Ordered hbox](https://ck3.paradoxwikis.com/File:Ordered_hbox.jpg) |
| With "expanding" policy on children, it also resizes them

This is useful for creating tabs, without needing to manually set their size
<pre><code>hbox = {<br>    layoutpolicy_horizontal = expanding<br>    button_standard = { layoutpolicy_horizontal = expanding }<br>    button_standard = { layoutpolicy_horizontal = expanding }<br>}</code></pre> | ![Tabs hbox 2](https://ck3.paradoxwikis.com/File:Tabs_hbox_2.jpg) |
| With "expanding" horizontal and vertical policy, the hbox and its children will resize in both directions
<pre><code>hbox = {<br>    layoutpolicy_horizontal = expanding   layoutpolicy_vertical = expanding<br>    button_standard = {<br>        layoutpolicy_horizontal = expanding   layoutpolicy_vertical = expanding<br>    }<br>    button_standard = {<br>        layoutpolicy_horizontal = expanding   layoutpolicy_vertical = expanding<br>    }<br>}</code></pre> | ![Big hbox](https://ck3.paradoxwikis.com/File:Big_hbox.png) |


If placed in fixed size parent it will by default expand both horizontally and vertically up to entire size of the parent. But if placed in other vbox/hbox they will not expand to the parent size.


#### Layout policies

Layout policies control how children are resized by hboxes/vboxes. This also applies to boxes inside other boxes.

There are two types, layoutpolicy_horizontal and layoutpolicy_vertical, controlling horizontal and vertical behavior.

There are five policies, with fixed applied by default:

        - fixed** - keeps original size. Cannot grow or shrink past it. An hbox/vbox with "fixed" will resize to fit children, like a container.
        - expanding** - grows to the width/height of the parent, cannot shrink below original size. Has priority over children with other policies. If multiple children are set to "expanding", they split available space equally.
        - growing** - same as "expanding" but with lower priority. If a child with "expanding" is present, "growing" will not grow. This also means the expand = {} widget would resize to 0, so change its policies if you want to use it with "expanding".
        - preferred** - grows or shrinks, depending on available space.
        - shrinking** - can shrink below its original size, cannot grow past it.

Layout policies also respect minimumsize, maximumsize, min_width and max_width.


| "expanding" takes priority over "growing" but will not shrink it smaller than the original (fixed) size
<pre><code>hbox = {<br>	max_width = 400<br>	layoutpolicy_horizontal = expanding<br><br>	button_standard_small = { layoutpolicy_horizontal = expanding }<br>	button_standard_small = { layoutpolicy_horizontal = growing }<br>}</code></pre> | ![Growing hbox 2](https://ck3.paradoxwikis.com/File:Growing_hbox_2.png) |
| --- | --- |
| "preferred" and "shrinking" can both shrink, when there is little space. You may need to limit your hbox with max_width or "shrinking" policy to see this effect.
<pre><code>hbox = {<br>	layoutpolicy_horizontal = shrinking<br><br>	button_standard_small = { layoutpolicy_horizontal = growing }<br>	button_standard_small = { layoutpolicy_horizontal = preferred }<br>	button_standard_small = { layoutpolicy_horizontal = shrinking }<br>}</code></pre> | ![Shrinking hbox 2](https://ck3.paradoxwikis.com/File:Shrinking_hbox_2.png) |


#### Animation states

Animations can be created with ``state``, like this:

```
state = {
    name = _show
    alpha = 0.5
    duration = 0.5
}
```
This state will set the alpha of its object to 50% over 0.5 second when it becomes visible, and it's triggered automatically due to its name.

States can:

- change properties, like size, position, alpha
- play sounds with ``start_sound = { soundeffect = "event:..." }``
- execute functions, similar to a button, with ``on_start`` and ``on_finish`` instead of ``onclick``

``on_start`` triggers at the start of the animation.

``on_finish`` triggers at the end, if the state has duration set.  If not, it's instant like ``on_start``.

        - Known issue:*** ``on_start`` is currently bugged and triggers twice. Use ``on_finish`` whenever possible.

    - State names**

There is a number of predefined names that automatically trigger the state:

- _show - triggers when the object becomes visible. Note that this only fires for the widget itself, not any of its children.
- _hide - when the objects becomes invisible
- _mouse_hierarchy_enter - when the cursor is placed over this window or button
- _mouse_hierarchy_leave - when the cursor leaves this window or button
- _mouse_press - when this button is pressed
- _mouse_click - when this button is pressed and released
- _mouse_release - when the button is released
- daily_tick - triggers every day
- monthly_tick - triggers every month

Some windows have their own specific state names, like ``phase_change`` and ``new_battle_event`` in the combat window.

    - State triggers**

States can be given any other name and triggered manually, using it.

``TriggerAnimation`` triggers one named state in the scoped object.

``PdxGuiTriggerAllAnimations`` triggers all states with the same name that are visible on screen.

Examples:

``onclick = "[PdxGuiWidget.TriggerAnimation('my_state')]"`` - triggers the state that's set inside the button itself.

``onclick = "[PdxGuiWidget.AccessParent.FindChild('widget_with_state').TriggerAnimation('my_state')]"`` - goes to the parent of the button, finds a child named "widget_with_state" and triggers its state. You may need to chain multiple ``AccessParent.AccessParent`` to return higher in the hierarchy. ``FindChild``, however, can search through multiple levels.

``onclick = "[PdxGuiTriggerAllAnimations('my_state')]"`` - triggers all states with this name, even if they are in other (visible) windows.

        - Known issue:*** if the state is inside an invisible object when ``TriggerAnimation`` or ``PdxGuiTriggerAllAnimations`` are used, the state will trigger later when the object becomes visible.

    - Automatic triggers**

States can also trigger automatically when a condition is met.

``trigger_on_create = yes`` - triggers when the window is first created. Not triggered by changing visibility, though it will generally be triggered when the parent widget becomes visible.

``trigger_when`` - triggers when the condition is met.

Note that ``trigger_when`` doesn't prevent the state from firing when triggered manually, it doesn't work like a trigger in an event. It's more like its own on_action.
![a curve that starts with a small dip and grows to a large hump](https://ck3.paradoxwikis.com/File:Bezier_curve.png)
    - Bezier**

For states with duration, a bezier curve can be used to control the rate of change of the animation, to add easing.

For example, this is a bezier curve used by many windows in the game, a template called Animation_Curve_Default:

``bezier = { 0.25 0.1 0.25 1 }``

The numbers are two sets of coordinates for the control points. See the image.

This curve means the window appears with a tiny delay, becomes visible much faster and then eases into 100%.

The effect is not very strong, but it helps create a more natural feeling.

Use this website to try out different bezier curves: https://cubic-bezier.com/#.25,.1,.25,1

To simplify, the two extremes are:

``{ 0 1 1 0 }`` appears fast

``{ 1 0 0 1 }`` appears slow


### Templates

Templates and types are named blocks of code which can be used multiple times throughout the code, like buttons, window backgrounds, and text styles. This helps maintain the same style and reduces the amount of code we write.

Templates can store the contents of an entire window or just one line, like this one:


```
template Window_Size_Sidebar
{
	size = { 610 100% }
}
```


This template can be used with "using = Window_Size_Sidebar", which will, essentially, replace the "using" line with the contents of the template.

Templates are global and can be defined in any .gui file. Most of the game templates are stored in gui/shared. A local version, local_template, has to be defined within the same file.

Commonly used templates and types can be seen in the UI Library. To access it, open the console, toggle Release Mode, and a new button called "UI Library" should appear.


#### Types

While templates may be as small as one property, types are always whole elements, like a button or a widget.

text_single and text_multi are types of a textbox with many properties already defined for them, so we don't need to retype them every time and instead simply write:


```
text_single = {
	text = "my text"
}
```


Types are defined in a slightly different way, by creating a named group of types first:


```
types Standard_Types
{
	type text_single = textbox {
	...
	}
}
```
The name of the group can be anything, it has no impact.


#### Blockoverride

Templates and types can have named override blocks, which allow us to edit a part of an instance without changing the whole template. For example, a template may have a default block of text:


```
block "text"
{
	text = "default_text"
}
```


To replace it, we add a blockoverride with the same name in our instance:


```
blockoverride "text"
{
	text = "actual text"
}
```


We can also remove it from our instance like this: ``blockoverride "text" {}``


#### Replacing types

We can replace individual templates or types, without overwriting whole vanilla files.

For that, create a new file that comes **first** alphabetically. For example, start it with 00_. Like this: 00_my_types.gui.

If replacing a type, remember to define a group first, with any name. Then define the type inside it.

If it's a template, just put the template definition in, don't need to add anything else.

Example. Let's say we want to redefine button_standard_small to have a different default size. We'll create a new file, 00_small_button.gui and write in it:

```c
types SmallButton {
  type button_standard_small = button_standard
    {
        size = { 40 25 }
    }
}
```


#### Adding mod compatibility

It is common that two mods overwrite the same GUI file and thus come into conflict if loaded together: only customizations made by the mod later in the load order will be present in the game.

Modders can collaborate to provide compatibility by using GUI types or templates and creating a "hook" for another mod inside their own.

To do this, one or both collaborating modders include usages of types/templates from the other mod inside the modded ``.gui`` file.

For example, a modder adds ``some_other_mods_type = {}`` or ``using = some_other_mods_template`` to ``window_character.gui`` or another modified vanilla file.

If this mod is then loaded together with the one which defines such a type or template, it will appear in the window. Otherwise, this line will have no visual effect - and a single error will be recorded to ``error.log`` once, on initial loading.

It is therefore good practice to extract custom additions made to vanilla ``.gui`` files into types/templates in separate custom ``.gui`` files, even if you're only using each addition once across your mod's own codebase. Doing so will allow other modders to achieve compatibility with your mod by inserting usages of your types/templates into their own code, potentially even without needing to coordinate with you.


#### Datamodels

Datamodels are used to display lists, eg:

``datamodel = "[CharacterWindow.GetChildren]"``

Datamodels can be displayed with: vbox, hbox, flowcontainer, dynamicgridbox, fixedgridbox, overlappingitembox.

A widget can also display a single item from a list like this:

```c
datacontext_from_model = {
	datamodel = "[EventWindowData.GetOptions]"
	index = "1"
}
```


Many vanilla lists are hardcoded, meaning we can't add other items to them, remove them or change sorting.

However, some items in a list can be hidden with ``visible = "[]"`` parameter. Be aware of two issues:

- A fixedgridbox would leave empty gaps, because it doesn't dynamically resize its cells.

- A dynamicgridbox with multiple rows or columns would also have empty gaps.

In order to create custom sorting, we would need to make the same list in script, as a variable list, and then use ordered_in_list to sort it.

See Advanced Character Search mod for reference.

To display a variable list, use ``[GetPlayer.MakeScope.GetList('list_name')]`` or ``[GetGlobalList]`` for a global variable list.

If it's not saved on the player, then scope to the correct object, like ``CharacterWindow.GetCharacter.MakeScope...``

See more below.


Do not confuse datamodel with datacontext!

Datacontext usually references a single promote, i.e. a game object, like ``[CharacterWindow.GetCharacter]``.

One of very rare exceptions is the list of traits in the character window:

``datacontext = "[CharacterWindow.GetTraitArrays]" datamodel = "[TraitArrays.GetPersonalityTraits]"``


## Scripted GUIs

Scripted guis are, essentially, hidden events triggered from the UI.

They are stored as .txt files in game/common/scripted_guis.

The simplest scripted gui looks like this:

```abap
my_sgui = {
  effect = {
    add_gold = 100
  }
}
```
It can be used in the UI, scoping to the player, like this:
```
 onclick = "[GetScriptedGui('my_sgui').Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).End )]"
```
If an sgui uses global effects, like ``every_player = { add_gold = 100 }``, it can be used without scoping:
```
 onclick = "[GetScriptedGui('my_sgui').Execute( GuiScope.End )]"
```
Other optional parameters are:


```
gui_name = {
	scope = character 		# the root scope, i.e. the target of the effects
	saved_scopes = {} 		# any additional targets

	confirm_title = "your_title"	# adding this will prompt the player to confirm the action
	confirm_text = "your_text"	# additional text in the confirmation popup

	effect = {			# what it does
		custom_tooltip = ""	# adds a tooltip
	}

	is_shown = {} 			# is it visible in the UI?

	is_valid = {} 			# can the player use it? always checked, even if you don't use enabled property on the button

	ai_is_valid = {} 		# is the AI allowed to use it? Disabled by default.
}
```


Not all blocks are necessary. A scripted gui may only contain is_shown or is_valid.

Instead of always linking to the sgui, we can declare it once with datacontext and then all other functions used in that object or its children will use that sgui:


```
datacontext = "[GetScriptedGui('gui_name')]"

onclick = "[ScriptedGui.Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).End)]"

visible = "[ScriptedGui.IsShown( GuiScope.SetRoot( GetPlayer.MakeScope ).End)]"

enabled = "[ScriptedGui.IsValid( GuiScope.SetRoot( GetPlayer.MakeScope ).End)]"

tooltip = "[ScriptedGui.BuildTooltip( GuiScope.SetRoot( GetPlayer.MakeScope ).End)]"
```


Instead of ``GetPlayer.MakeScope`` we can scope to another game object, for example, the character in the character window:``CharacterWindow.GetCharacter.MakeScope``, or if the root of our sgui is a province, ``HoldingView.GetProvince.MakeScope``.

``ScriptedGui.Execute`` executes everything listed in the ``effect`` block. It's used with ``onclick`` for buttons and ``on_start`` or ``on_finish`` with animation states.

``IsShown`` and ``IsValid`` check for conditions in is_shown and is_valid blocks. Both blocks simply return true or false and could be used with other functions, like ``AddTextIf``, Select_CString, etc.

``BuildTooltip`` can also be used with a textbox to display the tooltip as text.

To add another scope to our scripted gui, we use AddScope like this:

```
 "[ScriptedGui.Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).**AddScope( 'target', CharacterWindow.GetCharacter.MakeScope )**.End )]"
```
It's then used as ``scope:target`` in the sgui. You may use any name.

Multiple scopes can be saved this way: ``AddScope().AddScope().AddScope().End``

You don't have to declare any added scopes in saved_scopes. If you do, the game will always check for them and if they are not added in the gui file, the sgui won't work.

We can also pass values, text and booleans from UI to sguis, using ``MakeScopeValue``, ``MakeScopeFlag`` and ``MakeScopeBool``

For example:
```
 onclick = "[GetScriptedGui('give_gold').Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).**AddScope( 'balance', MakeScopeValue(GetPlayerBalance) )**.End )]"
```
The number is then referenced as any other saved scope: ``add_gold = scope:balance``

MakeScopeValue expects fixed point values, so you may need to convert the value first with IntToFixedPoint.

It can also accept a number directly: ``MakeScopeValue('(CFixedPoint)25')``

It is important to not put any spaces before the dots or opening parentheses! ``Execute(`` is correct, ``Execute (`` is not. Other spaces can be omitted, but they help with readability.


### Displaying a variable or script value

Variables and script values can be shown in the UI like this:

A variable:

``text = "[GetPlayer.MakeScope.Var('var_name').GetValue|1]"``

A script value (defined in common/script_values):

``text = "[GetPlayer.MakeScope.ScriptValue('sval_name')|0]"``

Alternative method that allows to add another scope with AddScope:

``text = "[GuiScope.SetRoot( GetPlayer.MakeScope ).AddScope( 'target', CharacterWindow.GetCharacter.MakeScope ).ScriptValue('sval_name')|0]"``

In these examples the player character has the variable and serves as the root of the svalue. Other promotes can be used too, as long as they can use MakeScope. Search through data types logs to see if it's supported (e.g. Character.MakeScope)

|1 at the end is optional and will round down to 1 number after the decimal point, so instead of 1.573 you will see 1.5. You can set this at any number, add % to convert to a percentage, add = or + to color the value if it's positive or negative.

|O can be used with integers to display the number as an ordinal:  ``['(int32)2'|O]"`` will be shown as ``2nd``. Note, this is a capital letter O, not number zero.

To convert a script value to an integer use FixedPointToInt.

Note that script values displayed in UI are calculated on every frame, so if you have a big list of items, a big svalue calculation may impact performance, so it may be better to use variables.

When using localization to display values in events, we use this:

``event_var: "[ROOT.GetCharacter.MakeScope.Var('test_var').GetValue|0]"``

``event_value: "[SCOPE.ScriptValue('test_value')|0]"``

If you have a saved scope (named "target" here), it changes to this:

``event_var: "[target.MakeScope.Var('test_var').GetValue|0]"``

``event_value: "[GuiScope.SetRoot( target.MakeScope ).ScriptValue('test_value')|0]"``


### Displaying data lists

We can create custom lists of characters, for example, to make societies.

To do this, first, we need to add them to a variable list. This can be done though an event or a scripted gui, like this:


```
effect = {
	every_living_character = {
		limit = {
			has_trait = paranoid
		}

		root = {
			add_to_variable_list = {
				name = secret_society
				target = prev
			}
		}
	}
}
```


If we fire this effect for the player, they will be the ``root``, so the list will be stored in them.

Then we use any list box (vbox, dynamicgridbox, fixedgridbox) with the datamodel set to our list


```
dynamicgridbox = {
	datamodel = "[GetPlayer.MakeScope.GetList('secret_society')]"

	item = {
		flowcontainer = {
			datacontext = "[Scope.GetCharacter]"

			portrait_head_small = {}

			text_single = {
				text = "[Character.GetNameNoTooltip]"
			}
		}
	}
}
```
To access the item, we need to use ``Scope`` and the matching function of our object, like ``GetCharacter`` or ``Title``. Check Data Types to see what ``Scope`` functions are available. We can declare it once with a datacontext and then continue to use ``Character``.

Note, your datacontext should not be inside ``item = {}`` itself, but inside the widget used there (be it a button, a text or a flowcontainer like here)


## New windows and toggles

A new window can be added inside another or created in a separate file and spawned as a scripted widget.

Window visibility can be controlled with variables and Scripted Guis or entirely in UI with the UI Variable System.

However, it is difficult to make mods with new windows compatible with each other, since they need to add a button somewhere in an existing file to open the window.

Instead, the window could be opened with a decision, event or character interaction, but it would be less convenient for the player than a button on the hud.


### Create a window as a scripted widget

Make a new gui file with any name, for example ``gui/new_window.gui``.

Create a window inside it like this, with any custom name:

```
window = {
	name = "my_window"
	layer = top
	using = Window_Size_MainTab
	using = Window_Background_Sidebar
}
```
Make a new folder called "scripted_widgets" in your gui/ folder.

Make a new txt file in it with any name, e.g. ``gui\scripted_widgets\scripted_windows.txt``.

In it, add your gui file and the name of the window:

``gui/new_window.gui = my_window``

When the game loads to the map view, your window will be automatically created.

Multiple windows (or other widgets, buttons) can be created, each aded on the new line. E.g.:

```
gui/new_window.gui = my_second_window
gui/my_shortcuts.gui = my_button
etc...
```


### Toggle window visibility

The window can be toggled with [Interface#System Variables](#system-variables), variables or [Interface#Scripted GUIs](#scripted-guis).

    - UI system**

Hide the window with:

``visible = "[GetVariableSystem.Exists('show_my_window')]"``

Have a button with:

``onclick = "[GetVariableSystem.Toggle('show_my_window')]"``

UI system is the quickest to set up, but all toggles will reset when closing the game, unlike with variables.

    - Variables and SGUIs**

Hide the window with:

``visible = "[GetPlayer.MakeScope.Var('show_my_window').IsSet]"``

Make a button with:

``onclick = "[GetScriptedGui('toggle_my_window').Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).End )]"``

And a scripted gui in ``common/scripted_guis`` with:

```
toggle_my_window = {
    effect = {
        if = {
            limit = {
                has_variable = show_my_window
            }
            remove_variable = show_my_window
        }
        else = {
            set_variable = show_my_window
        }
    }
}
```
Alternatively, it can be split into two sguis, one to set and one to remove the variable.

The variable can also be set in an event or a decision.

    - SGUI**

A scripted gui can also be used for a more complex trigger.

In this case, hide the window with:

``visible = "[GetScriptedGui('show_my_window').IsShown( GuiScope.SetRoot( GetPlayer.MakeScope ).End )]"``

And have a scripted gui with:

```
show_my_window = {
    is_shown = {
        # various triggers
        is_adult = yes
        is_female = yes
        is_landed = yes
    }
}
```
Note that here the variable and the scripted gui scope to the player. Another object can be used instead or global variables/sguis, like this:

- ``visible = "[GetGlobalVariable('show_my_window').IsSet]"``
- ``visible = "[GetScriptedGui('show_my_window').IsShown(GuiScope.End)]"``

Remember that this window is created before the player selects the character. So when scopeing to the player, we might need to add a check that the player exists first.

For example, you can set up an invisible widget with100% size, ``visible = "[GetPlayer.IsValid]"`` and ``alwaystransparent = yes`` so it can be clicked through.

Then inside it would be your actual window with the variable or SGUI check.


There are a few other methods to create and toggle windows, but they are more cumbersome.
- [#Toggles_with_PdxGuiWidget](#toggles_with_pdxguiwidget) - straightfoward, but gets complicated with multiple toggles
- [#Toggles_with_animation](#toggles_with_animation) - longer, but easier to trigger multiple things
- Console command ``GUI.CreateWidget`` - console commands don't work in multiplayer and disable achievements. 
Below are older examples.


### Toggles with PdxGuiWidget

PdxGuiWidget is a simple function used to hide or reveal named elements.

In this example we have a container with a hidden submenu, one button that shows it and another that hides it.
1. when clicked, the first button goes back to its parent, searches in it for the submenu and the other button, reveals them and hides itself
1. the second button searches for the element and the button, reveals them and hides itself


```
container = {
	button = {
		name = "show submenu"

		onclick = "[PdxGuiWidget.AccessParent.FindChild('submenu').Show]"
		onclick = "[PdxGuiWidget.AccessParent.FindChild('hide submenu').Show]"
		onclick = "[PdxGuiWidget.Hide]"
	}

	button = {
		name = "hide submenu"
		visible = no

		onclick = "[PdxGuiWidget.AccessParent.FindChild('submenu').Hide]"
		onclick = "[PdxGuiWidget.AccessParent.FindChild('show submenu').Show]"
		onclick = "[PdxGuiWidget.Hide]"
	}

	widget = {
		name = "submenu"
		visible = no
	}
}
```


If the elements are separated by more parents/children, we can repeat AccessParent like this:
```
 onclick = "[PdxGuiWidget.AccessParent.AccessParent.AccessParent.AccessParent.FindChild('submnenu').Show]"
```

Each button can hide or reveal multiple elements of any type. You only need to provide the name.

Pros:
- easy to set up for a simple toggle

Cons:
- the toggles will reset any time the game is restarted
- If you want to hide multiple things or toggles, the code will get very bloated and hard to manage
- trying to hide entries in a data list (like a dynamicgridbox) will only hide the first instance


### Toggles with animation

We can set up animations that are triggered by buttons (or conditions) to hide/show elements or to even move them. This way we don't need to count how many parents separate the button and the window and we can trigger many things at once with just one onclick.

The previous example would look like this and work the same way. The first button triggers "show_submenu", which hides the button and shows the rest, while the second button triggers "hide_submenu", which hides this button and the widget and shows the first button.


```
container = {
	button = {

		state = { # this is an animation
			name = show_submenu
			on_start = "[PdxGuiWidget.Hide]"
		}
		state = {
			name = hide_submenu
			on_start = "[PdxGuiWidget.Show]"
		}

		onclick = "[PdxGuiTriggerAllAnimations('show_submenu')]"
	}

	button = {
		visible = no

		state = {
			name = show_submenu
			on_start = "[PdxGuiWidget.Show]"
		}
		state = {
			name = hide_submenu
			on_start = "[PdxGuiWidget.Hide]"
		}

		onclick = "[PdxGuiTriggerAllAnimations('hide_submenu')]"
	}

	widget = {
		visible = no

		state = {
			name = show_submenu
			on_start = "[PdxGuiWidget.Show]"
		}
		state = {
			name = hide_submenu
			on_start = "[PdxGuiWidget.Hide]"
		}
	}
}
```


it is longer, but animations can be saved as templates and reused with one line, like ``using = hide_animation``. Fullscreen Barbershop uses animations extensively, if you want a better example.

Pros:
- easier to link many things together, and even open a different window and trigger an animation in it

Cons:
- animation blocks can be quite lengthy
- all toggles will reset when the game is restarted


### System Variables

System variables are used internally by the game, they are not save persistent and cannot be directly accessed through scripts.

No setup is needed for them as they can be directly created in the .gui file.

The syntax for using system variables is:

``onclick = "[GetVariableSystem.Toggle( 'var_name' )]"``

or:


```
datacontext = "[GetVariableSystem]"
onclick = "[VariableSystem.Toggle( 'var_name' )]"
```


The available functions are:
- Clear - ``Clear( 'var_name' )`` clears the variable
- ClearIf - ``ClearIf( 'var_name', Condition )`` clears the variable if Condition is true
- Exists - ``Exists( 'var_name' )`` Boolean, returns true if the variable exists
- Get - ``Get( 'var_name' )`` CString, returns the string stored in the variable
- HasValue - ``HasValue( 'var_name', 'string' )`` Boolean, returns true if the variable has the provided string
- Set - ``Set( 'var_name', 'string' )`` sets the variable to the provided string
- Toggle - ``Toggle( 'var_name' )`` clears the variable if it exists, creates it if it does not
- SetOrToggle -  ``SetOrToggle( 'var_name', 'string' )`` clears the variable if it exists and has the same string. If it doesn't, sets it to the provided string


#### Toggles with System Variables

A basic toggle using system variables in this file would looks like this:


```
container = {
	button = {
		onclick = "[GetVariableSystem.Toggle( 'gui_toggle' )]"
	}

	widget = {
		visible = "[GetVariableSystem.Exists( 'gui_toggle' )]"
	}
}
```


When clicked, the system variable is toggled depending on whether it exists, this is then used to show/hide the widget.


#### Tabs with System Variables

A basic setup for three tabs would look like this:


```
container = {
	button = {
		onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_1' )]"
	}
	button = {
		onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_2' )]"
	}
	button = {
		onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_3' )]"
	}

	widget = {
		visible = "[GetVariableSystem.HasValue( 'gui_toggle', 'tab_1' )]"
	}
	widget = {
		visible = "[GetVariableSystem.HasValue( 'gui_toggle', 'tab_2' )]"
	}
	widget = {
		visible = "[GetVariableSystem.HasValue( 'gui_toggle', 'tab_3' )]"
	}
}
```


Note that the variable initially has no value and none of the widgets would show.

To set a default tab the variable needs to be set by the button opening the window:


```
button = {
	onclick = "[GetVariableSystem.Toggle( 'gui_toggle' )]" # this opens the window
	onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_1' )]" # this set the default tab
}
```


or using a state block when the window is shown:


```
state = {
	name = _show
	on_start = "[GetVariableSystem.Set( 'gui_tabs', 'tab_1' )]"
}
```


Alternatively one of the widgets can be set to appear when the variable doesn't exist, avoiding the need for an initial value:


```
container = {
	button = {
		onclick = "[GetVariableSystem.Clear( 'gui_tabs' )]"
	}
	button = {
		onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_2' )]"
	}
	button = {
		onclick = "[GetVariableSystem.Set( 'gui_tabs', 'tab_3' )]"
	}

	widget = {
		visible = "[Not( GetVariableSystem.Exists( 'gui_toggle' ) )]"
	}
	widget = {
		visible = "[GetVariableSystem.HasValue( 'gui_toggle', 'tab_2' )]"
	}
	widget = {
		visible = "[GetVariableSystem.HasValue( 'gui_toggle', 'tab_3' )]"
	}
}
```


This is the equivalent of the first example with one of the methods to set a default value.

Pros:
- simple and easy to remember syntax
- easier to link many things, even in different windows
- can be extended with additional commands (see below) to show entirely new windows, avoiding the need to have the widget in hud.gui

The downsides:
- no direct interaction with scripts, they must be set & cleared using the gui
- can be harder to keep track of
- all toggles will reset when the game is restarted


### Creating a new Widget

It is possible to create entirely new windows by using the ``ExecuteConsoleCommand( ... )`` command.

First create a window in a .gui file to be displayed, for example "gui/custom_windows/my_window.gui". Ensure that you have named the main window.


```
window = {
	name = "my_custom_window"
	parentanchor = center
	layer = middle
	size = { 100 100 }
	using = Window_Background
}
```


The above creates a 100 by 100 window in the center of the screen, the important part is the name as it is used to create the window.

The button to create the window would look like:


```
button = {
	onclick = "[ExecuteConsoleCommand('gui.createwidget gui/custom_windows/my_window.gui my_custom_window')]"
}
```


To close it:


```
button = {
	onclick = "[ExecuteConsoleCommand('gui.ClearWidgets my_custom_window')]"
}
```

Make sure that there is only one space between gui.ClearWidgets and my_custom_window. If there is more than 1 space, gui.ClearWidgets will clear all widgets created with console, not just my_custom_window.

Or combined into a toggle:


```
button = {
	onclick = "[ExecuteConsoleCommand( Select_CString( GetVariableSystem.Exists('my_window_open'), 'gui.ClearWidgets my_custom_window', 'gui.createwidget gui/custom_windows/my_window.gui my_custom_window' ) )]"
	onclick = "[GetVariableSystem.Toggle('my_window_open')]"
}
```


The toggle works by setting a system variable and selecting the command to execute based on it.

``Select_CString( ... )`` takes three arguments:
- A Condition
- A string for true
- A string for false

If the condition returns true, the first string is used, else the second is.
In the above toggle, if the system variable exists the window is destroyed, otherwise it is created.


## List of existing game views

The following names can be used with commands like OpenGameView and IsGameViewOpen like this: IsGameViewOpen('intrigue_window')

| **Game Views** |  |  |
| --- | --- | --- |
| intrigue_window | dynasty_house_view | artifact_kill_list |
| military | dynasty_house_customization | action_item_handler |
| men_at_arms | dynasty_tree_view | transfer_vassal |
| knights | dynasty_legacy_window | title_election |
| levy | dynasty_customization | court_window |
| men_at_arms_type | dynasty_house_members | ruler_designer |
| select_maa_origin_province | factions_window | royal_court |
| army | succession_event | inventory |
| holding_view | lineage_view | reforge_artifact |
| character | religion | appoint_position |
| character_finder | faith | artifact_details |
| combat | faith_creation | language |
| end_of_combat | faith_conversion | memories |
| siege | culture_window | ruler_designer_save |
| raid | hybridize_culture | ruler_designer_load |
| rally_point | diverge_culture | activity_planner |
| place_rally_point | add_culture_tradition | activity_window |
| find_title | replace_culture_pillar | activity_list_window |
| character_focus | great_holy_war | activity_list_detail_host_window |
| lifestyle | hired_troop_detail_view | activity_list_detail_invite_window |
| decisions | lease_out_baronies | activity_locale |
| decision_detail | outliner | activity_guest_list |
| title_view_window | my_realm | activity_intent_selection |
| war_overview | succession_law_change | activity_log |
| struggle | war_declared_overview | travel_planner |
| struggle_involvement | war_results | travel_option_selection_window |
| pause_menu | designate_heir | travel_route_edit_window |
| load_game | change_ghw_target | accolade_view |
| save_game | barbershop | create_accolade_view |
| resign_confirmation | concubine_interaction | diarchy |
| in_front_topbar | title_history | manage_tax_slots |
| select_commander | title_add_law | tax_slot_appoint_tax_collector |
| tutorial | title_customization | tax_slot_obligations |
| council_window | kill_list | tax_slot_vassals |
|  |  | tax_slot_assign_vassal |


## Troubleshooting


### Known crash reasons

- setting 100% size on hboxes and vboxes
- setting ``resizeparent = yes`` on multiple children in the same parent

even if only one of them is visible, this will still crash

- a type that references itself, this will lead to an endless loading screen until you run out of RAM

- syntax errors, like missing brackets or quotation marks

search for ``{`` in your file and then for ``}`` and compare the amounts, they should be the same

double-check that your types are set up correctly, since their syntax is different from other elements

for missing quotes, enable regex search in your editor and search for ``= \[`` and ``\]\n``. You normally shouldn't have square brackets without quotation marks around them.


## Useful links

A color picker with normalized values, from 0 to 1. Useful for thing like tintcolor.

https://rgbcolorpicker.com/0-1

A good tool for UI ptototyping:

https://www.figma.com/
Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Interface*
