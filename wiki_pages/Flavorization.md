# Flavorization

FORCETOC

Flavorization is how the game defines and prioritizes which "title" to display on characters, whom will often qualify for multiple titles. As such, we define the requirements and overall priority of a title in flavorization files to avoid conflicts and inappropriate title placement.


## Grammar

Flavorization entries are broken down like this:

```CoffeeScript
prince_male_roman = {							# The key of your title, this is how the game finds and references it
	type = character							# Who/what is this for?
	gender = male								# Which gender is this for? (Only use if type = character)
	special = ruler_child						# Are there any special requirements?
	tier = kingdom								# Which tier must you be?
	priority = 40								# How high priority is this?
	name_lists = { name_list_roman }			# Which name list do you need to belong to in order to get this?
	governments = { feudal_government }			# Which government type do you need to belong to?
	top_liege = no								# Do you need to be top liege of your realm?
}
```


| **Entry** | **Required for Characters?** | **Required for Titles?** | **Description & Values** |
| --- | --- | --- | --- |
| ``type`` | ✔️ | ✔️ | Can use either ``character`` or ``title``, defines if it applies to a character or a title. Required for all. |
| ``gender`` | ✔️ | ❌ | Can use either ``male`` or ``female``. Do not use on titles. |
| ``special`` | ✔️ | ❌ | Can be ``ruler_child`` (for princes or princesses), ``queen_mother``, ``councilor``, ``head_of_faith`` or ``holder``. This has to be defined for character types, ``holder`` is the most prevalent. |
| ``tier`` | ❌ | ❌ | Can be ``barony``, ``county``,`` duchy``, ``kingdom``, or ``empire``. Not needed, but will apply to every tier listed if left undefined. |
| ``priority`` | ✔️ | ✔️ | Any numeric value. Try to keep it between 0 and 2147483647. |
| ``name_lists`` | ❌ | ❌ | Defined by the files inside of ``..game\common\culture\name_lists``. You can make your own. (Example: ``name_list_anglo_saxon``). |
| ``heritages`` | ❌ | ❌ | Defined by ``..game\common\culture\pillars\00_heritage.txt``. You can make your own. (Example: ``heritage_north_germanic``). |
| ``religions`` | ❌ | ❌ | Defined by the files inside of ``..game\common\religion\religions``. You can make your own. (Example: ``christianity_religion``). |
| ``faiths`` | ❌ | ❌ | Defined by the faiths in religions. You can make your own. (Example: ``coptic``). |
| ``governments`` | ❌ | ❌ | Defined by ``..game\common\governments\00_government_types.txt``. You can make your own. (Example: ``feudal_government``). |
| ``titles`` | ❌ | ❌ | Uses landed titles. (Example: ``e_byzantium``). |
| ``council_position`` | ❌ | ❌ | Use any defined council position. Requires ``special = councilor``. Do not use on titles. (Example: ``councillor_court_chaplain``). |
| ``only_independent`` | ❌ | ❌ | Uses ``yes`` or ``no``. Used for titles such as "Petty Kings". |
| ``only_holder`` | ❌ | ❌ | Uses ``yes`` or ``no``. Spouse will no longer receive the opposite gender title if set to yes. Good for mayors or female rulers. |
| ``top_liege`` | ❌ | ❌ | Uses ``yes`` or ``no``. Using ``top_liege = no``, you can allow vassals with different religions/cultures to use their own title. Does not apply to spouse. |


## Custom Flavor Example

![Modding custom title example roboland](https://ck3.paradoxwikis.com/File:Modding_custom_title_example_roboland.jpg)For this example, let's make a series of robot-themed titles.


The first step is to recreate the in-game flavorization directory (``game\common\flavorization``) in your mod folder, like this: ``..Documents\Paradox Interactive\Crusader Kings III\mod\FlavourTestMod\common\flavorization``.

Once you've done this, you can create a text file where your new flavorization will be stored, for this example, we will name ours ``my_cool_flavorization.txt``. You can also copy over and modify the vanilla flavorization files, but be warned that this will lesser compatibility with both other mods and future game versions.

Let's script the titles for our future robot overlords and their land:


```CoffeeScript
### Robots
king_robot = { # Roboto
	type = character
	gender = male
	special = holder
	tier = county
	priority = 5000
	governments = { feudal_government }
	top_liege = no
}

queen_robot = { # Robota
	type = character
	gender = female
	special = holder
	tier = county
	priority = 5000
	governments = { feudal_government }
	top_liege = no
}

county_robot = { # Roboland
	type = title
	tier = county
	priority = 5000
	governments = { feudal_government tribal_government } # You can add multiple items inside of brackets, no comma required.
	top_liege = no
}
```

We want to very clearly tell if our new titles are working or not, so we've set some very simple rules: Anyone holding a county title in a feudal government is eligible.

We've also set the priority to 5000, higher values are higher priority. With a value this high, our new title will overwrite all others.

Next, we will create a file to store our localization in at ``..mod\FlavourTestMod\localization\english\culture`` and name it ``my_new_culture_titles_l_english.yml``.
Be sure to [encode it as UTF8+Bom!](https://ck3.paradoxwikis.com/Mod_troubleshooting#Localization_Debugging)

Then, inside our localization file, we are going to add text to our title keys:


```yaml
l_english:

### Robot ### 
 king_robot: "Roboto"
 queen_robot: "Robota"
 county_robot: "Roboland"
```


If you save both your files and open the game with the mod enabled, you should be able to find "*robotos*" and "*robotas*" tending to their "*robolands*" all across the game world. Congratulations on making your first flavorization.


## Expanding Functionality Through Customizable Localization

![End result of this expansion example, showcasing how the same title can vary loc based on gold amount.](https://ck3.paradoxwikis.com/File:Modding_custom_title_example_roboland_custom_localization_example.jpg)Though flavorization is powerful, it is limited in terms of which triggers it can make use of. If we wish to access a greater range of triggers, we can resort to replacing our key with a [customizable localization](https://ck3.paradoxwikis.com/Customizable_localization) key, which are localization keys with scripted behaviors.

For this example, we will take our ``king_robot`` title from the previous section and expand upon it.

First, we will create a file to store our custom localization logic in at ``..Documents\Paradox Interactive\Crusader Kings III\mod\FlavourTestMod\common\customizable_localization`` and name it ``my_very_clever_custom_loc.txt``.

Next, we will script the custom logic for our localization key.

We start off by giving it a key and type, in our case, we will use ``king_robot`` and ``character`` respectively.


```CoffeeScript
king_robot = {
    type = character
```

After that, we define all the possible localization keys it can use by creating ``text`` blocks, each ``text`` block should contain within its brackets a trigger and the key of the localization we want it to use if the trigger is successful. The custom loc will then pick the first text block that has a passing trigger. You can use ``fallback = yes`` to set a block as the default if none succeed (or set a ``text`` block at the end with no trigger).


```CoffeeScript
king_robot = {
    type = character
    text = {
        trigger = {
            gold > 1000 # We can add as many triggers as we want, but for this example we will just check if the character is very wealthy.
        }
        localization_key = golden_king_robot # If the trigger passes (the conditions within it are true), this will be the loc key it will select!
    }
	text = {
		fallback = yes # If nothing else triggers, it will default to this, ignoring triggers.
        localization_key = rusty_king_robot
    }
}
```

As you can see, in this example we have set a gold check, replacing the usual "king robot" title with a "golden king robot" title to characters with over 1000 gold.

Of course, you can add as many complex triggers as you wish, such as a ``root.faith = { has_doctrine = tenet_struggle_submission }`` trigger to see if the character's faith has the ``tenet_struggle_submission`` tenet.

Next, we will go to our localization file from before and add the ``golden_king_robot`` and ``rusty_king_robot`` keys that we used in the previous script.

We will also tell the game to run our custom localization logic whenever the ``king_robot`` key is used by using a custom loc entry: ``[CHARACTER.Custom('king_robot')]``.


```yaml
l_english:

### Robot ### 
 king_robot: "[CHARACTER.Custom('king_robot')]"
 golden_king_robot: "Gold-Plated MegaBot"
 rusty_king_robot: "Rust-Plated Microbot"
 queen_robot: "Robota"
 county_robot: "Roboland"
```


With this, you've successfully added a variation to your title using custom localization! Congratulations!


## Continue Reading

- TheGib770 made an excellent guide (Link: [forum:1449550](https://ck3.paradoxwikis.com/forum:1449550)) on the Paradox Forum which delves deeper into the details and intricacies of flavorization. Feel free to reach out to him.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Flavorization*
