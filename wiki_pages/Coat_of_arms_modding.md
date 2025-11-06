# Coat of arms modding

> *This article is timeless and should be accurate for any version of the game.*


**Coat of arms** are images used on shields and flags to identify titles, dynasties, and houses.

They are scripted in `/Crusader Kings III/game/common/coat_of_arms/coat_of_arms`. 

They follow the basic scripting syntax of:


```
coat_of_arms_name = {
    keyword1 = value1
    keyword2 = value2
    ...
}
```

Is the "coat_of_arms_name" identical to an title, house or dynasty keyname (like "d_leon") the game will automatically using this CoA as default layout at game-start for this. This is also working with modded titles, houses or dynasties. 


- [Valid keywords](#valid-keywords)
- [Examples](#examples)
- [Inheritance and subs](#inheritance-and-subs)
- [Dynamic Coats of Arms](#dynamic-coats-of-arms)
- [Easy going by using the IN-Game Designer](#easy-going-by-using-the-in-game-designer)
  - [Designer weaknesses](#designer-weaknesses)
- [Coat of Arms Emblem Modding](#coat-of-arms-emblem-modding)
  - [.DDS file formatting](#dds-file-formatting)
  - [Emblem definitions file](#emblem-definitions-file)


## Valid keywords


<table>
<tr><th colspan="3">Keyword</th><th>Comment</th><th>Example</th></tr>
<tr><td colspan="3"><code>parent</code></td><td>Used for inheritance, read more below.</td><td><code>parent = k_england</code></td></tr>
<tr><td colspan="3"><code>pattern</code></td><td>The path to the file for the background pattern (usually located in <code>/Crusader Kings III/game/gfx/coat_of_arms/patterns/</code>.<br>A pattern should be included to avoid graphical issues with the masking textures when using textured emblems.</td><td><code>pattern = "pattern_vertical_split_01"</code></td></tr>
<tr><td colspan="3"><code style="white-space: pre">color1<br>color2<br>color3<br>color4<br>color5</code></td><td>Specifies a color, to be used in the pattern or as a color reference in colored_emblems.<br>Usually refers to a color defined in <code>/Crusader Kings III/game/common/named_colors</code>.<br>Can also explicitly define RGB, HSV and 8-Digit Hexadecimal values.</td><td><code style="white-space: pre">color1 = "white"<br>color2 = hsv { 1.0 1.0 1.0 }<br>color3 = hsv360 { 360 100 100 }<br>color4 = rgb { 255 255 255 }<br>color5 = hex { aabbccdd }</code></td></tr>
<tr><td><code>textured_emblem</code></td><td colspan="2">---</td><td>Multiple textured emblems can be specified. Each is itself a scripting object with the following valid keywords:</td><td>---</td></tr>
<tr><td><code>textured_emblem</code></td><td colspan="2"><code>texture</code></td><td>The path to the file for the emblem (usually located in <code>/Crusader Kings III/game/gfx/coat_of_arms/textured_emblems/</code>).</td><td><code>texture = "te_griffin_01.dds"</code></td></tr>
<tr><td><code>textured_emblem</code></td><td colspan="2"><code>mask</code></td><td>The coat of arms' background pattern can be used as a clipping mask for emblems.</td><td><code>mask = { 1 3 }</code></td></tr>
<tr><td><code>textured_emblem</code></td><td><code>instance</code></td><td><code>scale</code></td><td>Given as a 2-dim float, has default value { 1.0 1.0 }</td><td><code style="white-space: pre">instance = { <br>    scale = { 0.5 0.5 }  <br>    position = { 0.75 0.75 } <br>    rotation = 45<br>    depth = 5  <br>}</code></td></tr>
<tr><td><code>textured_emblem</code></td><td><code>instance</code></td><td><code>position</code></td><td>Given as a 2-dim float, has default value { 0.0 0.0 }</td><td><code style="white-space: pre">instance = { <br>    scale = { 0.5 0.5 }  <br>    position = { 0.75 0.75 } <br>    rotation = 45<br>    depth = 5  <br>}</code></td></tr>
<tr><td><code>textured_emblem</code></td><td><code>instance</code></td><td><code>rotation</code></td><td>Given as float value, has default value 0.0</td><td><code style="white-space: pre">instance = { <br>    scale = { 0.5 0.5 }  <br>    position = { 0.75 0.75 } <br>    rotation = 45<br>    depth = 5  <br>}</code></td></tr>
<tr><td><code>textured_emblem</code></td><td><code>instance</code></td><td><code>depth</code></td><td>Used to order rendering, given as float value with default of 0.0</td><td><code style="white-space: pre">instance = { <br>    scale = { 0.5 0.5 }  <br>    position = { 0.75 0.75 } <br>    rotation = 45<br>    depth = 5  <br>}</code></td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2">---</td><td>Multiple colored emblems can be specified. Each is itself a scripting object with the following keywords:</td><td>---</td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2"><code>texture</code></td><td>The path to the file for the emblem (usually located in <code>/Crusader Kings III/game/gfx/coat_of_arms/colored_emblems/</code>).</td><td><code>texture = "ce_crown.tga"</code></td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2">"</td><td>All fields from textured_emblem are valid</td><td>---</td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2"><code>color1</code></td><td>defines the base colour of the emblem</td><td><code style="white-space: pre">color1 = color2<br>color2 = "white"<br>#color3 = hsv360 { 360 50 50 }</code></td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2"><code>color2</code></td><td>defines the secondary color of the emblem (the Green channel in the texture)</td><td><code style="white-space: pre">color1 = color2<br>color2 = "white"<br>#color3 = hsv360 { 360 50 50 }</code></td></tr>
<tr><td><code>colored_emblem</code></td><td colspan="2"><code>color3</code></td><td>currently unavailable, will default to white</td><td><code style="white-space: pre">color1 = color2<br>color2 = "white"<br>#color3 = hsv360 { 360 50 50 }</code></td></tr>
<tr><td><code>sub</code></td><td colspan="2">---</td><td>Multiple subs can be specified, each is itself a complete coat of arms scripting object, allowing all fields except another sub, i.e. no sub nesting.</td><td>---</td></tr>
<tr><td><code>sub</code></td><td><code>instance</code></td><td><code>scale</code></td><td>Given as a 2-dim float, has default value { 1.0 1.0 }</td><td>---</td></tr>
<tr><td><code>sub</code></td><td><code>instance</code></td><td><code>offset</code></td><td>Given as a 2-dim float, has default value { 0.0 0.0 }</td><td>---</td></tr>
<tr><td><code>sub</code></td><td><code>instance</code></td><td><code>depth</code></td><td>Used to order rendering, given as float value with default of 0.0</td><td>---</td></tr>
</table>


## Examples

Here follows a few examples with their corresponding coat of arms.

```
flag_with_emblem = {
    pattern = "pattern_vertical_split_01"
    color1 = "lemon_yellow"
    color2 = "sky_blue"

    textured_emblem = {
        texture = "te_griffin_01"
    }
}
```


```
flag_with_culled_emblem = {
    pattern = "pattern_vertical_split_01"
    color1 = "lemon_yellow"
    color2 = "sky_blue"

    textured_emblem = {
        texture = "te_griffin_01"
        mask = { 1 }
    }
}
```


```
two_emblems_scaled_and_positioned = {
    pattern = "pattern_vertical_split_01"
    color1 = "lemon_yellow"
    color2 = "sky_blue"

    textured_emblem = {
        texture = "te_griffin_01"
        instance = { position = { 0.75 0.75 } scale = { 0.5 0.5 }  }
        instance = { position = { 0.75 0.25 } scale = { 0.5 0.5 }  }
    }
}
```


![Emblem examples](../assets/images/emblem_examples.png)


## Inheritance and subs

This section is largely dedicated towards inheritance, but to facilitate that discussion, first two points on subs:

The first "base coat of arms" is an implicit sub:

```
a = {
    pattern = "pattern_solid.tga"
    color1 = "blue"
    sub = { }
}
1. the above is equal to:
b = {
    sub = {
        pattern = "pattern_solid.tga"
        color1 = "blue"
    }
    sub = { }
}
```


Each instance field (coat of arms instances, not emblem instances) is transformed into a separate sub:

```
a = {
    color1 = "blue"
    instance = { offset = { 0 0 } } # A
    instance = { offset = { 1 0 } } # B
    sub {
        color1 = "red"
        instance = { offset= { 0 1 } } # C
        instance = { offset = { 1 1 } } # D
    }
}
1. the above is equal to:
b = {
    sub = {
        color1 = "blue"
        instance = { offset = { 0 0 } } # A
    }
    sub = {
        color1 = "blue"
        instance = { offset = { 1 0 } } # B
    }
    sub {
        color1 = "red"
        instance = { offset = { 0 1 } } # C
    }
    sub {
        color1 = "red"
        instance = { offset = { 1 1 } } # D
    }
}
```


With that out of the way, let's dive into inheritance.

Inheritance is achieved through the parent keyword. It basically says "Fetch the coat of arms given as value, and use it to populate any fields not explicitly set".

Example:

```
daddy = {
    pattern = "pattern_checkers_01.tga"
    color1 = "burned_red"
    color2 = "mid_grey"
    colored_emblem = {
        texture = "ce_angel.dds"
        color1 = "rust_brown"
        color2 = "rust_brown"
    }
}

child = {
    parent = "daddy"
    pattern = "pattern_checkers_diagonal_01.tga"
    color1 = "mint_green"
    # >color2 = "mid_grey"<        inherited
    # >colored_emblem = { ... }<   inherited
}
```


When it comes to emblems the inheritance is "all or nothing": if at least one emblem (of any type) is specified, no emblems are inherited, but if no emblem is specified, all the parent's emblems are inherited.

The inheritance rules become slightly more complicated once subs are involved. The two guiding rules are:

When a parent is specified, all values are fetched from its first sub (which many times will be an "implicit" sub).
If a sub doesn't specify a parent it will piggyback on the parent of its first sub. However, in this case all values will be fetched from the corresponding sub in the parent. Setting parent = "none" disables this automatic inheritance.
Example:

```
daddy = {
    pattern = "pattern_solid.tga"
    sub = { }
    sub = { }
}

child = {
    parent = "daddy"
    # this implicit sub inherits from the implicit sub in daddy
    sub = {
        # Since no parent is specified this sub will piggyback on >parent = "daddy"< and inherit from the second sub of "daddy".
    }
    sub = {
        parent = "other_coa"
        # since parent is specified explicitly this will inherit from first sub of "other_coa"
    }
}
```


Inheritance chains ("deep inheritance") is resolved in a bottom up manner. Users must take care not to create inheritance loops.


```
grand_dad = {
    pattern = "pattern_solid.tga"
    sub = { }
}

daddy = {
    parent = "grand_dad"
    # >pattern = "pattern_solid.tga"< inherited
    color1 = "blue"
    # >sub = { }< inherited
}

child = {
    parent = "daddy"
    # >pattern = "pattern_solid.tga"< inherited
    # >color1 = "blue"< inherited
    sub = {
        # this inherits from the second sub in daddy
    }
    sub = {
        # since daddy only has 2 subs, this has no parent
    }
}
```


And finally, a real example:

```
k_england_and_france = {
    sub = {
        parent = "k_france"  # defined elsewhere
        instance = { offset = { 0.0 0.0 } scale = { 0.5 0.5 }  } # top left
        instance = { offset = { 0.5 0.5 } scale = { 0.5 0.5 }  } # bottom right
    }
    sub = {
        parent = "k_england"  # defined elsewhere
        instance = { offset = { 0.5 0.0 } scale = { 0.5 0.5 }  } # top right
        instance = { offset = { 0.0 0.5 } scale = { 0.5 0.5 }  } # bottom left
    }
}
```


## Dynamic Coats of Arms

In addition to the normal coats of arms assigned to any given title, you can also create dynamic coat of arms definitions, which are stored in `/Crusader Kings III/game/\common\coat_of_arms\dynamic_definitions\`:


```
1. Name must match a landed title definition
title_name = {
	item = { # One or more items
		trigger = { # Trigger for when this item should be picked, first valid item is picked, root = the title
			<trigger> # This can be any scripted trigger, or a trigger defined inline as normal
		}
		coat_of_arms = name # Name of coat of arms to use as defined in Coat of Arms files
	}
}
```


In order to update the coat of arms, you need to call ``update_dynamic_coa = yes`` within the title scope. This is already called in ``on_character_culture_change`` and ``on_character_faith_change`` for all held titles, but if you want the dynamic coat of arms to be updated under any other circumstance, it's up to you to implement [on_actions](Event_modding.md#on_actions_.28on_action.29) as needed.


## Easy going by using the IN-Game Designer

Together with the Royal Court DLC, Paradox has also created a handy ingame editor that can also be used to export the created CoA directly as valid script code. To do this, you simply create your desired coat of arms with the designer and then press the "Copy to clipboard" button. The game then creates the completely finished and valid code required for a coat of arms in the intermediate storage of the PC used. You can then insert this directly into the corresponding text file for your mod using the key combination CTRL+V. You just have to make sure that you set the right name (e.g. k_england). The modder can also use a trick here and simply remove the localization files for a short time; CK then fails to load the name for the title and then displays the title's corresponding keyword in-game instead. The player could also change the title name via the CoA Designer or, in this case, simply copy the keyword and paste it into the appropriate file. In this way you can avoid typos, which would later lead to the corresponding CoA not being displayed ingame.

It should be noted again at this point that due to dynamic CoAs, there can be several CoAs, which can therefore also have a name that does not directly match a title key. Accordingly, the CK interpreter cannot recognize a typo and would therefore not issue an error message. If the self-made CoA is not displayed, the correct, character-accurate spelling should be explicitly checked again.


### Designer weaknesses

The Designer may be intuitively easier to use than, for example, manually coding a CoA, but the Designer cannot be used to inherit or subdivide the CoA. The real example shown above, where you put the English and French coat of arms together into one, can practically not be created with the designer. Even the Spanish flag from EU4, which is a combination of the coats of arms of Castile, Leon, Aragon, Navarra and Sicily, could not be recreated with the designer. However, one of the designers can help create the base crest, so all you have to do afterwards is manually script the inheritance.


## Coat of Arms Emblem Modding

By default, the CoA Designer only displays the emblems of the original game. However, it is very easy to expand the list.


### .DDS file formatting

In order for your custom emblems to be recognized by the game, they must be saved as a .DDS file with a specific format. The file format should be "8.8.8.8 ARGB 32bpp / Unsigned"; this is also known as "B8G8R8A8 (Linear, A8R8G8B8)" in paint.net, a common free image editing program. You can also enable Mip Maps to improve image fidelity at smaller scales, although this is not required. In the image itself, only three specific colors should be used. The game automatically recognizes the color value 0x000084 (blue) as color 1, the color value 0x00FF94 (light green) as color 2, and the color value 0xFF0084 (magenta) as color 3. CK has a certain tolerance and tries to match other deviating colors according to one of these color values. However, this correction is not perfect and cannot be relied upon; the modder should always make sure to use the right colors.


### Emblem definitions file

In addition, you must now create a text file at the same position (as always in UTF-8 BOM coding). In the text file you can now create a separate line with the following syntax for each emblem that you want to offer in the designer:

```
<pic_name>.dds = { colors = <1,2,3> category = <string> }
```

In order for the game to correctly recognize the emblems, the name in the text file must exactly match the name of the image file.

You can specify 1, 2, or 3 as the color option. This specifies how many colors the user can set for the chosen emblem. If you set a value in the corresponding file that is larger than the number of colors actually used, the user has one more color option but it will not have any function. However, if the modder specifies too small a number of colors in the text file, the automatic correction will either try to reduce the extra colors to one color if they are similar enough or simply set the unknown color to a reddish-brown hue, which cannot be changed by the user.

The game supports the following default categories: animals, circles_spirals, crosses_and_knots, faiths, manmade, nature, patterns, tribal_seal, writing & figures. If a different string is used, the game will add a new selectable category for the user. As the category name is displayed as text, you should also define a new line in the localization file for each new category as follows: 
```
COA_DESIGNER_CATEGORY_&lt;your_category_string_here&gt;:0 "&lt;What you want to Display as Category Name for the selected language&gt;"
```


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Coat_of_arms_modding*
