# Characters modding

> **Note:** Last verified for version 1.1


Modding characters involves changing their appearance, data and behaviour. This can vary from small tweaks like adding gold or piety, to complex changes like scripting new visual effects and more.


- [Changing appearance through scripts](#changing-appearance-through-scripts)
- [Outfit Tags](#outfit-tags)
  - [Using outfit_tags](#using-outfit_tags)
  - [Creating outfit_tags](#creating-outfit_tags)
- [Adding new characters or changing existing](#adding-new-characters-or-changing-existing)
  - [Advanced use of date blocks](#advanced-use-of-date-blocks)
  - [Hairstyles and beards for scripted characters](#hairstyles-and-beards-for-scripted-characters)
- [Calling characters from other scripts](#calling-characters-from-other-scripts)
- [References](#references)


## Changing appearance through scripts

Crusader Kings 3 uses a DNA system to define a character's appearance, which has changed from the one used in Crusader Kings 2. These changes allow for more specific and realistic appearances.

You can change a character's DNA through dna_modifiers. Create a file in `/Crusader Kings III/game/gfx/portraits/portrait_modifiers` with any filename and add this:


```
dna_change_example_modifier = {
    usage = game
    priority = 50 # priority line seems to be mandatory to display accessory.
    dna_change_example_modifier = {
        dna_modifiers = {
            accessory = {
                mode = add
                gene = headgear
                template = western_imperial
                value = 1.0
            }
            color = {
                mode = modify
                gene = hair_color
                x = 0.5
                y = -0.5
            }
        }
        weight = {
            base = 0
            modifier = {
                add = 100
                has_character_flag = dna_change_example_modifier
            }
        }
    }
}
```


(The higher the priority, the later the modifier will be applied (and overwrites previous ones). Set to 0 by default. If two groups have the same priority, they will be applied based on file order where these groups are.)

This will add the western_imperial headgear and change the hair color of any character with the "dna_change_example_modifier" flag. You can add a flag to a character with the add_character_flag command, like this:


```
add_character_flag = {
    flag = dna_change_example_modifier
}
```


If you encounter any issues, check the error.log of the game for any specific error messages and correct your script accordingly.


## Outfit Tags

Playing dress-up with characters is a very important part of selling the medieval fantasy presented by Crusader Kings 3.

Outfit tags help us sell that fantasy by letting us force specific clothing or clothing groups on characters during an event.

Be warned that you should not apply armor to characters thorugh outfit tags. Instead you should set the ``single_combat_duel_armor`` character flag in ``immediate`` and then remove it in the ``after`` block of your event.


### Using outfit_tags

There are currently no compiled lists of valid outfit tags, therefore, the standard method of locating outfit tags is to search the ``..game\events`` and ``..game\gfx\portraits\portrait_modifiers`` folders for the keyword ``outfit_tags``.

Once you have found an outfit tag you wish to use, you can either add it directly to the portrait.


```CoffeeScript
right_portrait = {
	character = scope:undercover_thief
	animation = scheme
	outfit_tags = { # These tags all cover different parts of the body, so they will not overwrite one another
		western_stealth_hood		# A hood that covers the head
		sub_saharan_high_nobility	# Main clothing for torso and legs
		mena_war_legwear			# Some shoes
	}
}
```


Or use a ``triggered_outfit`` to make it conditional (such as, only if your gold is over a specific threshold, or if your spouse is dead).


```CoffeeScript
right_portrait = {
	character = scope:merchant_with_funny_wooden_statues_for_sale
	animation = personality_rational
	triggered_outfit = {
		trigger = {} # Your trigger goes here, if it fails, the outfit won't be overridden
		outfit_tags = {} # Insert the tags you wish to use here
		remove_default_outfit = # Use yes/no, if set to yes, portrait modifier categories in which nothing matches any of the event tags will be disabled completely (no by default)
		hide_info = # Use yes/no, only the portrait will be shown, with no identifiable elements (no CoA, tooltips, clicks...) (no by default)
	}
}
```


### Creating outfit_tags

<figure>

![modding portrait editor button and UI sample](../assets/images/modding_portrait_editor_button_and_ui_sample.jpg)
<figcaption>Image showcasing how to open and use the portrait editor.</figcaption>
</figure>
Before we get to scripting anything, we're going to want to preview the clothes in the portrait editor so we can get an idea of what it is that we want to add an outfit tag to.

First, open the portrait editor (small right-hand green button in the [console menu](https://ck3.paradoxwikis.com/Mod_troubleshooting#Getting_Access_to_the_Debug_Tools)).

Optionally, you can click "randomize DNA" to get a character that looks more human. Afterwards, click on the field right under "gene" to display a dropdown menu, select (or type in) the category you desire to preview.

Once selected, click on the button right under "subgroup" and do the same to select a specific article of clothing (gene).

Congratulations! You are now able to preview genes in the portrait editor. Be sure to keep an eye on the subgroup names and write down the ones you want to use.

The next step is to find or create our subgroup's outfit tag.

All clothing (actually genes, which includes hair) that can be worn by characters is stored inside files located at ``..game\gfx\portraits\portrait_modifiers``.

The clothing templates will look more or less like this:


```CoffeeScript
deal_with_it_sunglasses = {
  dna_modifiers = {
    accessory = {
      mode = add
      gene = clothes
      template = deal_with_it_sunglasses_headgear     # This is the subgroup with the refs to the 3D models it will load
      range = { 0 1 } # For the randomness to work correctly
    }
  }
  outfit_tags = { deal_with_it_sunglasses_headgear }  # This is the tag that you use in the portrait window. If this line is not here, just add it and use an appropriate name.
  weight = {                                          # ..It is usually good practice to name the new outfit tag after the subroup it comes from (which is why this one is named deal_with_it_sunglasses_headgear).
    base = 200
  }
}
```


As mentioned in the comment, if the article of clothing does not have an ``outfit_tags`` line, you can go ahead and add one.

If you can not find the clothing you wanted in any of the files based on the subgroup name, then you can create a full template instead.

First, pick a template that is similar to what you are trying to include, then you make a copy.

Afterwards, under ``dna_modifiers`` and ``accessory``, replace the ``template = some_name_here`` with the subgroup name shown in the portrait editor, then update the names and outfit tags on your template so that they are unique (and somewhat matches the subgroup name for consistency reasons). If you do not like using the portrait editor, you can go to ``..game\common\genes``, these files contain all the genes in the game.


## Adding new characters or changing existing

For some mods, for example total conversions, new characters are needed. In Crusader Kings 3 this kind of character modding is pretty easy.
After creating your mod (which is explained in a corresponding article), you have to edit an existing or create a new txt.-file in the folder `/Crusader Kings III/game/example-mod/history/characters`.
In our example the file will be named `/Crusader Kings III/game/example.txt`. An example character will look like this:


```
999001 = {
	name = "Henri"	#Henri de Lyon
	dna = lyon_twin_dna_entry
	dynasty = 2100001 #Lyon
	martial = 14
	diplomacy = 23
	intrigue = 10
	stewardship = 21
	religion = catholic	
	culture = french
	trait = diligent
	trait = education_learning_4
	trait = just
	trait = twin
	trait = physique_good_3
	trait = intellect_good_3
	trait = beauty_good_3
	trait = shrewd
	disallow_random_traits = yes
	father = 999003
	mother = 999004
	846.7.29 = {
		birth = yes
	}
	920.5.25 = {
		death = yes
	}
}
```


- First of all, a character ID is assigned. The ID needs to be unique; going for 900000 and further should be safe. Also it allowed to use chars inside the ID-String like "modChar0". In case of a small mod with a limited number of characters it could be usefull to take the characters name as ID aslong the string itself keep unique for all characters. This ID is used to refer to the character within the game files and is replaced by dynmaic one, when a new game is created.
- The first name of the character can be set via the use of ``name = "NAME"``. Note that in-game names may change based on culture (see [culture modding](Culture_modding.md)).
`/Crusader Kings III/game/00_dna.txt``/Crusader Kings III/game/common/dna_data`- In the dna-line the path for a specific dna can be inserted. An existing dna from the  in  can be used or an new created by using the portrait editor.
- To set the character's gender to female, use ``female = yes``.
`/Crusader Kings III/game/common/dynasties``/Crusader Kings III/game/common\dynasty_houses`- A character can be added to an existing or a new dynasty. Use ``dynasty = DYNASTY_ID`` for dynasties without houses, or ``dynasty_house = HOUSE_ID`` otherwise. The dynasty ID and house ID can be found in  and , respectively. See [dynasties modding](Dynasties_modding.md).
`/Crusader Kings III/game/common/culture``/Crusader Kings III/game/common/religion`- Culture and faith must be assigned with ``culture = CULTURE_ID`` and ``religion = FAITH_ID``, respectively. The right names can be found by searching in the corresponding folders  and .
- Attributes can be set freely. Their value caps at 100. If they are not assigned, the game will generate random values. Note that this only adds to the character's *base* attribute values, so the final value may be smaller or larger depending on traits and other factors. The attributes are as follows:
1. ``martial``
1. ``prowess``
1. ``diplomacy``
1. ``intrigue``
1. ``stewardship``
1. ``learning``
- Traits can be added through the use of ``trait = TRAIT_ID``. Replace ``TRAIT_ID`` with the appropriate [trait ID](https://ck3.paradoxwikis.com/trait_ID). An unlimited amount of traits may be added; unless assigned or specified otherwise, the game will generate random traits. To ensure that traits are not changed at the start of the game, use ``disallow_random_traits = yes``.
- Parents may be optionally assigned by using ``father = CHARACTER_ID`` and ``mother = CHARACTER_ID``. Ensure that one uses the target character's ID, as opposed to their name. This can be useful in creating families.
- Sexuality can be set through ``sexuality = SEXUALITY_ID``. The following can be used:
1. ``asexual``
1. ``heterosexual``
1. ``homosexual``
1. ``bisexual``
- Set the character's base health through ``health = HEALTH_VALUE``, and fertility with ``fertility = FERTILITY_VALUE``.

- Finally, birth and death of the character have to be defined. Crusader Kings 3 uses ``yyyy.mm.dd`` for date formats. Define a date block using ``DATE = {...}``, replacing ``...`` with ``birth = yes`` or ``death = yes``. Alternatively, replace ``yes`` with the date surrounded by speech marks (``"``). See [more uses of date blocks](#advanced-use-of-date-blocks).

The same steps work for changing existing characters. Sometimes, like for Charlemagne, there are already most of the possible lines.


### Advanced use of date blocks

- ``add_spouse = CHARACTER_ID``, ``remove_spouse = CHARACTER_ID`` to add/remove spouses.
- ``give_nickname = NICKNAME_ID`` to add nicknames. Later uses of ``give_nickname`` replace old nicknames. See [nickname ID](https://ck3.paradoxwikis.com/nickname_ID).
- ``employer = CHARACTER_ID``, similar to ``set_employer = CHARACTER_ID`` effect, moves the scoped character to the specified character's court.
- ``give_council_position = COUNCILLOR_ID`` to make the character a councillor. The following are accepted:
1. ``councillor_marshal``
1. ``councillor_spymaster``
1. ``councillor_chancellor``
1. ``councillor_court_chaplain``
1. ``councillor_steward``
- Assignments defined in the previous section, like ``trait = TRAIT_ID``, may also be used in date blocks.
{{cite file|game\history\characters\danish.txt}}, character <code>101515</code>- Various other [effect](Effects.md)s can be used that have a character scope, either directly in the date block or in an ``effect`` sub-block. See the following example from the game files, used to add a character flag and set character sexuality randomly:


```
101515 = {
	...
	1019.1.1 = {
		...
		effect = {
			add_character_flag = has_scripted_appearance
			random_list = {
				50 = { set_sexuality = heterosexual }
				50 = { set_sexuality = bisexual }
			}
		}
	}
	...
}
```


### Hairstyles and beards for scripted characters

To make a scripted character use the correct hairstyle and beard in-game, an entry must be added to `/Crusader Kings III/game/gfx\portraits\portrait_modifiers\99_beards_scripted_characters.txt` and `/Crusader Kings III/game/gfx\portraits\portrait_modifiers\99_hairstyles_scripted_characters.txt`. Under the entry for the hairstyle you want, add the following:

```
modifier = {
	add = 200
	exists = character:<history_id>
	this = character:<history_id>
}
```


## Calling characters from other scripts

It is possible for mods to interact with existing pre-defined characters from their scripts, just like other scopes. Use code `/Crusader Kings III/game/character:<id>` to reference to characters. Below is an example from game files: 
```text
1. this code can be found in /common/on_action/game_start.txt at line 15 (version 1.5.1.1)
character:74025 = {
	if = {
		limit = {
			is_alive = yes
			is_landed = yes
		}
	}
	trigger_event = bookmark.0200
}
```


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Characters_modding*
