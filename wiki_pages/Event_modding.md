# Event modding

> *This article is timeless and should be accurate for any version of the game.*


<!-- Template: Expand‎ -->
Events are the meat of every well-rounded mod; smaller and larger bits of story that can happen to a player during the campaign.

**Checklist.** Your events must:

- be in ``your_mod\events\`` folder
- have a .txt extension
- have a namespace defined on the first line, like ``namespace = my_events``
- use the namespace as their name + number, like ``my_events.1 = {...``
- be fired from script in some way, like by an [on_action](#on-actions-(on-action))

Events do not fire automatically otherwise, like in older games. Other ways to fire them are decisions, character interactions, story cycles, etc.


- [Scripting Tools](#scripting-tools)
  - [Visual Studio Code](#visual-studio-code)
  - [Sublime Text](#sublime-text)
  - [Notepad++](#notepad)
- [Location](#location)
- [Structure](#structure)
- [This a basic event, use it as a base for other events. Though you probably will want to remove the annotation spam first.](#this-a-basic-event-use-it-as-a-base-for-other-events-though-you-probably-will-want-to-remove-the-annotation-spam-first)
  - [ID and namespace](#id-and-namespace)
  - [Flags](#flags)
- [Portraits](#portraits)
  - [Portrait Positions](#portrait-positions)
  - [Animations](#animations)
- [Themes](#themes)
    - [Backgrounds](#backgrounds)
  - [Environments](#environments)
- [Trigger](#trigger)
  - [on_trigger_fail](#on_trigger_fail)
- [Description](#description)
- [Immediate](#immediate)
- [Options](#options)
- [After](#after)
- [Widgets](#widgets)
- [On Actions (on_action)](#on-actions-on_action)
  - [Common examples](#common-examples)
  - [Appending](#appending)
  - [Scopes](#scopes)
  - [Properties](#properties)
  - [On_actions from code](#on_actions-from-code)
- [Strategy](#strategy)
  - [Triggering the event](#triggering-the-event)
  - [Techniques and design patterns](#techniques-and-design-patterns)


## Scripting Tools

There are various tools capable of helping modders script events with greater ease.


### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) is considered to be the superior choice for modders due to the fact that it features various extensions that allow it to syntax highlight ParadoxScript.

**Recommended Extensions:**
- [CWTools - Paradox Language Services by Thomas Boby](https://marketplace.visualstudio.com/items?itemName=tboby.cwtools-vscode)
- [Paradox Syntax Highlighting by Thomas Boby](https://marketplace.visualstudio.com/items?itemName=tboby.paradox-syntax)

<details>
<summary>Show/Hide</summary>


| **Snippets For Visual Studio Code&nbsp;** |
| --- |
| VSCode snippets are templates that make it easier to enter repeating code patterns, such as complicated scripted effects, conditional statements, or even entire events.<br>It is easy to make custom snippets for templating CK3 script components, below you can find a vanilla sample set. You are encouraged to expand upon this and make your own set tailored to your mod's needs.<br><br>Read more: [Snippets in Visual Studio Code - Microsoft Corporation](https://marketplace.visualstudio.com/items?itemName=tboby.cwtools-vscode) |
| <code style="white-space: pre">/////////////////////////////////////////////////////////////////////////////////////////////////////<br>// Crusader Kings 3 - Snippets for Visual Studio Code.                                             //<br>//                                                                                                 //<br>// How to use in four easy steps:                                                                  //<br>// 1. Install [CWTools - Paradox Language Services] by Thomas Boby                                 //<br>// 2. Install [Paradox Syntax Highlighting] by Thomas Boby                                         //<br>// 3. Copy this file to ..AppData\Roaming\Code\User\snippets                                       //<br>// 4. That's it! Now just start typing the prefix of a snippet and press tab to insert it!         //<br>/////////////////////////////////////////////////////////////////////////////////////////////////////<br>// Learn more: https://code.visualstudio.com/docs/editor/userdefinedsnippets                       //<br>// Use https://vscodesnippetgenerator.azurewebsites.net/, other tools convert tabs into spaces!!   //<br>/////////////////////////////////////////////////////////////////////////////////////////////////////<br><br>{<br>  "Legacy Duel": {<br>      "prefix": ["duel", "legacy duel"],<br>      "body": [<br>        "duel = {",<br>        "\tskill = learning",<br>        "\tvalue = average_skill_rating",<br>        "",<br>        "\t10 = { # Failure",<br>        "\t\t#desc = martial_authority_4001.fail.tt",<br>        "\t\tcompare_modifier = {",<br>        "\t\t\tvalue = scope:duel_value",<br>        "\t\t\tmultiplier = -1.5",<br>        "\t\t\tmin = -5",<br>        "\t\t}",<br>        "",<br>        "\t\tsend_interface_toast = {",<br>        "\t\t\ttype = event_toast_effect_bad",<br>        "\t\t\ttitle = death_bleeder",<br>        "\t\t\tleft_icon = root",<br>        "\t\t\t",<br>        "\t\t\tadd_prestige = minor_prestige_loss",<br>        "\t\t}",<br>        "\t}",<br>        "\t10 = { # Success",<br>        "\t\t#desc = bp1_yearly.1031.c_killed_all.tt",<br>        "\t\tcompare_modifier = {",<br>        "\t\t\tvalue = scope:duel_value",<br>        "\t\t\tmultiplier = 1.5",<br>        "\t\t}",<br>        "",<br>        "\t\tsend_interface_toast = {",<br>        "\t\t\ttype = event_toast_effect_good",<br>        "\t\t\ttitle = tribal.1101.a_success",<br>        "\t\t\tleft_icon = root",<br>        "\t\t\t",<br>        "\t\t\tadd_prestige = medium_prestige_gain",<br>        "\t\t}",<br>        "\t}",<br>        "}"<br>      ],<br>      "description": "A legacy duel powered by a random list."<br>  },<br><br>  "Combat Duel": {<br>      "prefix": ["duel", "combat duel", "fight"],<br>      "body": [<br>        "configure_start_single_combat_effect = {",<br>        "\tSC_INITIATOR = scope:actor ",<br>        "\tSC_ATTACKER = scope:actor",<br>        "\tSC_DEFENDER = scope:recipient",<br>        "\tFATALITY = default",<br>        "\tFIXED = no",<br>        "\tLOCALE = terrain_scope",<br>        "\tOUTPUT_EVENT = single_combat.1006",<br>        "\tINVALIDATION_EVENT = single_combat.1006",<br>        "}"<br>        ],<br>      "description": "A combat duel using the new duelling system."<br>  },<br><br>  "Hidden Event": {<br>      "prefix": ["event", "hidden event"],<br>      "body": [<br>          "yournamespace.0000 = {",<br>          "\thidden = yes",<br>          "",<br>          "\timmediate = {",<br>          "\t\t",<br>          "\t}",<br>          "}"<br>        ],<br>      "description": "A hidden event, does not render UI or present any options. Utilized for the automation of certain tasks, such as sieges or timed outcomes."<br>  },<br><br>  "Simple Event": {<br>      "prefix": ["event", "simple event"],<br>      "body": [<br>        "yournamespace.0000 = {",<br>        "\ttype = character_event",<br>        "\ttitle = stewardship_domain_special.1424.a",<br>        "\tdesc = stewardship_domain_special.1424.a",<br>        "",<br>        "\ttheme = mental_break",<br>        "\tleft_portrait = root",<br>        "",<br>        "\ttrigger = {",<br>        "\t\t",<br>        "\t}",<br>        "",<br>        "\timmediate = {",<br>        "\t\t",<br>        "\t}",<br>        "",<br>        "\toption = {",<br>        "\t\tname = stewardship_domain_special.1424.a",<br>        "\t}",<br>        "}"<br>        ],<br>      "description": "A simple event template containing all of the basics."<br>  },<br><br>  "Advanced Event": {<br>      "prefix": ["event", "advanced event"],<br>      "body": [<br>        "yournamespace.0000 = {",<br>        "\ttype = character_event",<br>        "\ttitle = stewardship_domain_special.1424.a",<br>        "\tdesc = stewardship_domain_special.1424.a",<br>        "",<br>        "\ttheme = mental_break",<br>        "\toverride_background = { reference = throne_room }",<br>        "\tleft_portrait = {",<br>        "\t\tcharacter = root",<br>        "\t\tanimation = idle",<br>        "\t}",<br>        "\tright_portrait = {",<br>        "\t\tcharacter = root",<br>        "\t\tanimation = idle",<br>        "\t}",<br>        "",<br>        "\tcooldown = { years = 5 }",<br>        "",<br>        "\ttrigger = {",<br>        "",<br>        "\t}",<br>        "",<br>        "\timmediate = {",<br>        "",<br>        "\t}",<br>        "",<br>        "\toption = {",<br>        "\t\tname = stewardship_domain_special.1424.a",<br>        "",<br>        "\t\ttrigger = {",<br>        "",<br>        "\t\t}",<br>        "",<br>        "\t\tai_chance = {",<br>        "\t\t\tbase = 50",<br>        "\t\t\tmodifier = {",<br>        "\t\t\t\tadd = 25",<br>        "\t\t\t\talways = yes",<br>        "\t\t\t}",<br>        "",<br>        "\t\t\tai_value_modifier = {",<br>        "\t\t\t\tai_boldness = 0.5",<br>        "\t\t\t\tai_compassion = 0.5",<br>        "\t\t\t\tai_greed = 0.5",<br>        "\t\t\t\tai_energy = 0.5",<br>        "\t\t\t\tai_honor = 0.5",<br>        "\t\t\t\tai_rationality = 0.5",<br>        "\t\t\t\tai_sociability = 0.5",<br>        "\t\t\t\tai_vengefulness = 0.5",<br>        "\t\t\t\tai_zeal = 0.5",<br>        "\t\t\t}",<br>        "\t\t}",<br>        "\t}",<br>        "}"<br>        ],<br>      "description": "An advanced event template containing everything a content designer could desire."<br>  },<br><br>  "Generate Character": {<br>      "prefix": ["create character", "character", "generate character"],<br>      "body": [<br>        "create_character = {",<br>        "\tage = { 20 32 }",<br>        "\tlocation = root.capital_province",<br>        "\tgender_female_chance = root_faith_dominant_gender_female_chance",<br>        "\tculture = root.culture",<br>        "\tfaith = root.faith",<br>        "\trandom_traits = yes",<br>        "\ttrait = blind",<br>        "\tmartial = { 3 10 }",<br>        "",<br>        "\tdynasty = none",<br>        "\tafter_creation = { ",<br>        "\t\tadd_gold = { minor_gold_value medium_gold_value }",<br>        "\t\tadd_prestige = { minor_prestige_gain medium_prestige_gain }",<br>        "\t\tadd_piety = { minor_piety_gain medium_piety_gain }",<br>        "\t}",<br>        "",<br>        "\tsave_scope_as = generated_actor",<br>        "}"<br>        ],<br>      "description": "Runtime character generation for event usage."<br>  },<br><br>  "Random Chance": {<br>      "prefix": ["random"],<br>      "body": [<br>          "random = {",<br>          "\tchance = 25",<br>          "\tadd_trait = Typhus",<br>          "}"<br>        ],<br>      "description": "A random chance for something to happen. Can use weights."<br>  },<br><br>  "Random List": {<br>      "prefix": ["list", "random list"],<br>      "body": [<br>          "random_list = {",<br>          "\t50 = { add_gold = 25 }",<br>          "\t50 = { add_gold = 500 }",<br>          "}"<br>        ],<br>      "description": "A list of possibilities. One will always be picked, can use weights and triggers."<br>  },<br><br>  "Banner Notification": {<br>      "prefix": ["notification", "toast", "interface", "banner notification", "send_interface_toast"],<br>      "body": [<br>          "send_interface_toast = {",<br>          "\ttype = event_toast_effect_bad",<br>          "\ttitle = stress_threshold_prison.1041.t",<br>          "\tleft_icon = ROOT",<br>          "",<br>          "\tadd_stewardship_lifestyle_xp = minor_lifestyle_experience",<br>          "\tadd_piety = -15",<br>          "}"<br>        ],<br>      "description": "An interface element displayed at the top of the screen."<br>  },<br><br>  "Message Notification": {<br>      "prefix": ["notification", "message", "interface", "message notification", "send_interface_message"],<br>      "body": [<br>          "send_interface_message = {",<br>          "\ttype = event_stewardship_neutral",<br>          "\ttitle = hold_court.6180.t",<br>          "\tleft_icon = scope:client",<br>          "\tright_icon = ROOT",<br>          "",<br>          "\tadd_gold = 50",<br>          "}"<br>        ],<br>      "description": "An interface element displayed in the corner of the screen."<br>  },<br><br>  "Triggered Animation": {<br>      "prefix": ["triggered animation", "animation"],<br>      "body": [<br>          "triggered_animation = {",<br>          "\ttrigger = { always = yes }",<br>          "\tanimation = beg",<br>          "}"<br>        ],<br>      "description": "Allows you to make conditional animations, works as a first_valid."<br>  },<br><br>  "Desc Jenga": {<br>      "prefix": ["Desc Jenga"],<br>      "body": [<br>        "desc = { # Desc Jenga!",<br>        "\ttriggered_desc = {",<br>        "\t\ttrigger = { always = yes }",<br>        "\t\tdesc = {",<br>        "\t\t\tdesc = stress_threshold.3201.depressed.gain",<br>        "\t\t\tdesc = {",<br>        "\t\t\t\tfirst_valid = {",<br>        "\t\t\t\t\ttriggered_desc = {",<br>        "\t\t\t\t\t\ttrigger = { always = yes }",<br>        "\t\t\t\t\t\tdesc = stress_threshold.3201.depressed.effect",<br>        "\t\t\t\t\t}",<br>        "\t\t\t\t\ttriggered_desc = {",<br>        "\t\t\t\t\t\ttrigger = { always = no }",<br>        "\t\t\t\t\t\tdesc = stress_threshold_prison.1041.flagellant",<br>        "\t\t\t\t\t}",<br>        "\t\t\t\t\tdesc = court_maintenance.0010.b.paranoid",<br>        "\t\t\t\t}",<br>        "\t\t\t}",<br>        "\t\t}",<br>        "\t}",<br>        "}"<br>        ],<br>      "description": "Prints every desc command for use in scripted loc."<br>  },<br><br>  "Script Header List": {<br>    "prefix": ["script header list", "header", "index"],<br>    "body": [<br>      "### EVENT LIST ####################################################################",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "## XXXX - XXXX\tEvent Name Here by Author Name Here",<br>      "###################################################################################"<br>    ],<br>    "description": "A list containing all events on a script file, useful for organization."<br>  },<br><br>  "Event Header": {<br>    "prefix": ["event header", "header"],<br>    "body": [<br>      "###################################",<br>      "# Your event title here",<br>      "# By Your name here",<br>      "###################################"<br>    ],<br>    "description": "A header comment for scripts, containing name and author."<br>  },<br><br>  "Decision": {<br>    "prefix": ["decision"],<br>    "body": [<br>      "the_name_of_your_decision = {",<br>      "\tpicture = \"gfx/interface/illustrations/decisions/decision_destiny_goal.dds\"",<br>      "\tdesc = secure_iberian_foothold_decision_desc",<br>      "\tsort_order = 100",<br>      "\tmajor = no",<br>      "",<br>      "\tis_shown = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\tis_valid = {",<br>      "\t\t",<br>      "\t}",<br>      "",<br>      "\teffect = {",<br>      "\t\t",<br>      "\t}",<br>      "",<br>      "\tcost = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\tai_check_interval = 32",<br>      "\tai_potential = {}",<br>      "\tai_will_do = {",<br>      "\t\tbase = 100",<br>      "\t}",<br>      "}"<br>  ],<br>    "description": "Simple decision template."<br>  },<br><br>  "Interaction": {<br>    "prefix": ["interaction"],<br>    "body": [<br>      "your_interaction_name_here_interaction = {",<br>      "\ticon = debug_bad",<br>      "\tcategory = interaction_category_diplomacy",<br>      "\tcommon_interaction = yes",<br>      "",<br>      "\tinterface_priority = 200",<br>      "\tdesc = steward_task.1101.notification",<br>      "\t",<br>      "\tai_targets = {",<br>      "",<br>      "\t}",<br>      "\tai_target_quick_trigger = {",<br>      "\t\tadult = yes",<br>      "\t}",<br>      "\tai_frequency = 24",<br>      "\t",<br>      "\tcooldown_against_recipient = { years = 3 } # Very optional",<br>      "",<br>      "\tis_shown = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\tis_valid_showing_failures_only = {",<br>      "",<br>      "\t}",<br>      "\t",<br>      "\tai_min_reply_days = 1",<br>      "\tai_max_reply_days = 5",<br>      "\tai_accept = {",<br>      "\t\tbase = 0",<br>      "\t}",<br>      "\t",<br>      "\tauto_accept = {",<br>      "\t\tcustom_description = {",<br>      "\t\t\ttext = \"spending_hook\"",<br>      "\t\t\tsubject = scope:actor",<br>      "\t\t\tobject = scope:recipient",<br>      "\t\t\tscope:hook = yes",<br>      "\t\t}",<br>      "\t}",<br>      "\t",<br>      "\tsend_options_exclusive = no",<br>      "\tsend_option = {",<br>      "\t\tis_shown = {",<br>      "\t\t\tNOT = { scope:actor = scope:recipient }",<br>      "\t\t}",<br>      "\t\tis_valid = {",<br>      "\t\t\tscope:actor = {",<br>      "\t\t\t\thas_usable_hook = scope:recipient",<br>      "\t\t\t}",<br>      "\t\t}",<br>      "\t\tflag = hook",<br>      "\t\tlocalization = GENERIC_SPEND_A_HOOK",<br>      "\t}",<br>      "\tshould_use_extra_icon = {",<br>      "\t\tscope:actor = { has_usable_hook = scope:recipient }",<br>      "\t}",<br>      "\textra_icon = \"gfx/interface/icons/character_interactions/hook_icon.dds\"",<br>      "\t",<br>      "\ton_accept = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\ton_decline = {",<br>      "",<br>      "\t}",<br>      "\t",<br>      "\tai_potential = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\tai_will_do = {",<br>      "\t\tbase = 0",<br>      "\t}",<br>      "}"<br>    ],<br>    "description": "Simple interaction template."<br>  },<br><br>  "AI Weights": {<br>    "prefix": ["ai weights", "weights"],<br>    "body": [<br>        "ai_value_modifier = {",<br>        "\tai_boldness = 0.5",<br>        "\tai_compassion = 0.5",<br>        "\tai_greed = 0.5",<br>        "\tai_energy = 0.5",<br>        "\tai_honor = 0.5",<br>        "\tai_rationality = 0.5",<br>        "\tai_sociability = 0.5",<br>        "\tai_vengefulness = 0.5",<br>        "\tai_zeal = 0.5",<br>        "}"<br>      ],<br>    "description": "Component with all AI weights for event options."<br>  },<br><br>  "Valid Combatant Trigger": {<br>    "prefix": ["valid combatant trigger"],<br>    "body": ["can_be_combatant_based_on_gender_trigger = { ARMY_OWNER = liege }"],<br>    "description": "Trigger component used to check if a character can be an active combatant."<br>  },<br><br>  "Letter Event": {<br>    "prefix": ["letter event", "event"],<br>    "body": [<br>      "yournamespace.0000 = {",<br>      "\ttype = letter_event",<br>      "\tsender = root",<br>      "\topening = court_amenities_interactions.0001.a",<br>      "\tdesc = yearly.1040.a",<br>      "",<br>      "\timmediate = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\toption = {",<br>      "\t\tname = trait_specific.8501.d",<br>      "\t}",<br>      "}"<br>    ],<br>    "description": "Creates a barebones letter event, for usage when two characters interact."<br>  },<br><br>  "Struggle Event": {<br>    "prefix": ["struggle event"],<br>    "body": [<br>      "DLC_struggle.0000 = {",<br>      "\ttype = fullscreen_event",<br>      "\ttitle = bp1_yearly.5722.t",<br>      "\tdesc = bp1_yearly.5719.a",<br>      "\ttheme = realm",<br>      "\toverride_background = { reference = fp2_fullscreen_intro }",<br>      "\toverride_sound = { reference = \"event:/DLC/FP2/SFX/UI/fp2_struggle_ui_intro_animate\" }",<br>      "",<br>      "\twidgets = {",<br>      "\t\twidget = {",<br>      "\t\t\tgui = \"event_window_widget_struggle_info\"",<br>      "\t\t\tcontainer = \"dynamic_content_widget\"",<br>      "\t\t\tcontroller = struggle_info",<br>      "\t\t\tsetup_scope = { struggle:YOUR_STRUGGLE_HERE = { save_scope_as = struggle } }",<br>      "\t\t}",<br>      "\t}",<br>      "",<br>      "\timmediate = {",<br>      "",<br>      "\t}",<br>      "",<br>      "\toption = {",<br>      "\t\tname = dynn_Hardegg",<br>      "\t\tclicksound = \"event:/DLC/FP2/SFX/UI/fp2_struggle_start_select\"",<br>      "\t}",<br>      "}"<br>    ],<br>    "description": "Full-screen event used for struggles (intros, endings, etc)."<br>  },<br><br>  "Stress Impact": {<br>    "prefix": "stress impact",<br>    "body": [<br>        "stress_impact = {",<br>        "\twrathful = major_stress_impact_gain",<br>        "\tcompassionate = medium_stress_impact_gain",<br>        "\tlifestyle_gardener = minor_stress_impact_loss",<br>        "}"<br>    ],<br>    "description": "stress impact with examples, good for options."<br>  },<br><br>  "Add Opinion": {<br>    "prefix": ["add opinion", "opinion modifier"],<br>    "body": [<br>        "add_opinion = {",<br>        "\ttarget = scope:count_reinhard_von_lohengramm",<br>        "\tmodifier = rebellious_vassal_opinion",<br>        "\topinion = 25",<br>        "\tyears = 10",<br>        "}"<br>    ],<br>    "description": "pre-filled opinion effect for affecting the opinion of the scope character towards the scoped character."<br>  }<br>}</code> |


</details>


### Sublime Text

[Sublime Text](https://www.sublimetext.com/) is a popular choice amongst many because it excels at handling localization files. This is a free software.


### Notepad++

[Notepad++](https://notepad-plus-plus.org/) is a direct update over using regular notepad for scripting, if the two options above seem too daunting, you can start here.


## Location

Events belong in a .txt file inside the ``events`` directory directly below your [root mod folder](Mod_structure.md#mod-folder). Each file can hold as many events as one would like. The ``events`` directory may also have sub-folders containing their own event files, if one prefers.


## Structure

The overall structure is similar to that of a [CK2 event](https://ck3.paradoxwikis.com/CKII:Event_modding), with some tweaks to the syntax and a whole lot of extra features, many of them optional. The barest possible event is laid out here, and each element is described individually in a later section.

```coffeescript
namespace = example
example.1 = {
	desc = example.1.desc

	option = {
		name = example.1.a
	}
}
```

There you go! Add this to your mod, trigger it from the in-game console using "event example.1", and you have got yourself a working event! Everything else is optional, but necessary to really flesh out the events. This is as bare-bones as it gets.

Here is an example of a more fleshed out event, containing only the basics:
```coffeescript
## This a basic event, use it as a base for other events. Though you probably will want to remove the annotation spam first.
superexample.1337 = { # Use comments (like this one!) to put the event name here, this way other scripters can find the event you are working on without knowing the ID.
	type = character_event
	title = "A Modding Example Worthy of Kings" # Protip: you can use strings and later replace it with loc refs later
	desc = birth.1003.b # For Sublime users: there is a "find in files" feature that is excellent for digging through loc

	theme = mental_break
	left_portrait = root

	option = { # Use comments to state what the option says or does (eg "No, I denounce you heretic!" or "Engage in duel against child"), much like with event titles, it's good practice.
		name = stewardship_domain_special.1424.a
	}
}
```


### ID and namespace

Namespaces can be any alphanumeric string (without the '.' character), and are used as prefix in the form ``&lt;namespace&gt;.&lt;id&gt;``. The ID uniquely identifies your event.

If an event file uses a namespace, it has to be declared at the beginning of the file with ``namespace = &lt;namespace&gt;``. This has to be done for every file the namespace is used in.


### Flags

These are top-level variables that determine your event's kind and appearance. They have a limited set of values.


| **Flag** | **Meaning** | **Possible values** |
| --- | --- | --- |
| type | The kind of event. It determines what sort of scope the root is. | - character_event<br>- letter_event<br>- duel_event<br>- none (when an event doesn't use the root scope at all)<br>- empty (necessary for characterless events to trigger. NOTE: this means typing type = empty ) |
| hidden | Set this to true, and the event will not be shown at all; it will happen in the background. Useful for doing maintenance events that are not immediately relevant to the player. | true, false |


## Portraits

In Crusader Kings III, portraits are now in 3D, and can now be animated as well! What follows is a list of the different portrait positions, as well as a list of animations for them.


### Portrait Positions

<figure>

![Example event](../assets/images/example_event.png)
<figcaption>Portrait Positions</figcaption>
</figure>


| **Portrait Position** | **Description** |
| --- | --- |
| left_portrait | Shown on the left side of the event scene. |
| right_portrait | Shown on the right side of the event scene. |
| lower_left_portrait | Shown on the lower left part of the event scene. |
| lower_center_portrait | Shown on the lower center part of the event scene. |
| lower_right_portrait | Shown on the lower right part of the event scene. |


Here is an example of all of the portrait positions in use at the same time, along with a screenshot:

```coffeescript
example_event.1001 = {
	left_portrait = {
		character = ROOT # Whoever this is scoped to will show up in this event window position, exhibiting the chosen animation. 
		animation = fear # Take note that characters with SOME genetic traits (for example, gigantism, dwarfism) that change their character models have different animations, and if you assign one of THOSE animations to a character that does not have that model, crashes may occur.
	}
	right_portrait = {
		character = ROOT
		animation = scheme
	}
	lower_left_portrait = {
		character = ROOT
	}
	lower_center_portrait = {
		character = ROOT
	}
	lower_right_portrait = {
		character = ROOT
	}
}
```

Portraits can take the following parameters:

| **Parameter** | **Description** | **Example** |
| --- | --- | --- |
| character | The character whose portrait is shown. | `character = scope:event_target` |
| animation | The animation that will play | `animation = anger` |
| triggered_animation | Plays a certain animation if the triggers are met. If not, will default to animation set with `animation = ` | <code style="white-space: pre">triggered_animation = {<br>    trigger = {}<br>    animation = fear<br>}</code> |
| triggered_outfit | Set an outfit for use in this event. [(Additional Information on outfit_tags)](https://ck3.paradoxwikis.com/Characters_modding#Outfit_Tags) | <code style="white-space: pre">triggered_outfit = {<br>    trigger = {}<br>    outfit_tags = no_clothes (also accepts multiple tags, in the format outfit_tags = { tag1 tag2 }<br>    remove_default_outfit = yes/no<br>}</code> |
| hide_info | Prevents the game from showing any info on the character (tooltip, COA, clicks, etc). Only the portrait will be shown. | `hide_info = yes/no` |


### Animations


<table>
<tr><th colspan="6">Event-Compatible Animation IDs</th></tr>
<tr><td>idle</td><td>chancellor</td><td>steward</td><td>marshal</td><td>spymaster</td><td>chaplain</td></tr>
<tr><td>anger</td><td>rage</td><td>disapproval</td><td>disbelief</td><td>disgust</td><td>fear</td></tr>
<tr><td>sadness</td><td>shame</td><td>shock</td><td>worry</td><td>boredom</td><td>grief</td></tr>
<tr><td>paranoia</td><td>dismissal</td><td>flirtation</td><td>flirtation_left</td><td>love</td><td>schadenfreude</td></tr>
<tr><td>stress</td><td>happiness</td><td>ecstasy</td><td>admiration</td><td>lunatic</td><td>scheme</td></tr>
<tr><td>beg</td><td>pain</td><td>poison</td><td>aggressive_axe</td><td>aggressive_mace</td><td>aggressive_sword</td></tr>
<tr><td>aggressive_dagger</td><td>aggressive_spear</td><td>aggressive_hammer</td><td>celebrate_axe</td><td>celebrate_mace</td><td>celebrate_sword</td></tr>
<tr><td>celebrate_dagger</td><td>celebrate_spear</td><td>celebrate_hammer</td><td>loss_1</td><td>chess_certain_win</td><td>chess_cocky</td></tr>
<tr><td>laugh</td><td>lantern</td><td>eyeroll</td><td>eavesdrop</td><td>assassin</td><td>toast</td></tr>
<tr><td>toast_goblet</td><td>drink</td><td>drink_goblet</td><td>newborn</td><td>sick</td><td>severelywounded</td></tr>
<tr><td>prisonhouse</td><td>prisondungeon</td><td>war_attacker</td><td>war_defender</td><td>war_over_tie</td><td>war_over_win</td></tr>
<tr><td>war_over_loss</td><td>pregnant</td><td>personality_honorable</td><td>personality_dishonorable</td><td>personality_bold</td><td>personality_coward</td></tr>
<tr><td>personality_greedy</td><td>personality_content</td><td>personality_vengeful</td><td>personality_forgiving</td><td>personality_rational</td><td>personality_irrational</td></tr>
<tr><td>personality_compassionate</td><td>personality_callous</td><td>personality_zealous</td><td>personality_cynical</td><td>frontend_center_idle</td><td>frontend_left_idle</td></tr>
<tr><td>frontend_right_idle</td><td>throne_room_chancellor</td><td>throne_room_kneel_1</td><td>throne_room_kneel_2</td><td>throne_room_curtsey_1</td><td>throne_room_messenger_1</td></tr>
<tr><td>throne_room_messenger_2</td><td>throne_room_messenger_3</td><td>throne_room_conversation_1</td><td>throne_room_conversation_2</td><td>throne_room_conversation_3</td><td>throne_room_conversation_4</td></tr>
<tr><td>throne_room_cheer_1</td><td>throne_room_cheer_2</td><td>throne_room_applaud_1</td><td>throne_room_bow_1</td><td>throne_room_bow_2</td><td>throne_room_bow_3</td></tr>
<tr><td>throne_room_one_handed_passive_1</td><td>throne_room_one_handed_passive_2</td><td>throne_room_two_handed_passive_1</td><td>throne_room_writer</td><td>test_case_1</td><td>holding_staff</td></tr>
<tr><td>marshal_random_weapon</td><td>crying</td><td>delirium</td><td>disappointed</td><td>eccentric</td><td>manic</td></tr>
<tr><td>marshal_axe</td><td>interested</td><td>interested_left</td><td>stunned</td><td>wailing</td><td>wedding_happy_cry</td></tr>
<tr><td>marshal_dagger</td><td>peekaboo</td><td>child_hobby_horse</td><td>clutching_toy</td><td>clutching_ball</td><td>clutching_doll</td></tr>
<tr><td>marshal_mace</td><td>go_to_your_room</td><td>cough</td><td>shiver</td><td>sick_stomach</td><td>loss_1</td></tr>
<tr><td>marshal_shield</td><td>page_flipping</td><td>writing</td><td>reading</td><td>stressed_teacher</td><td>happy_teacher</td></tr>
<tr><td>thinking</td><td>emotion_thinking_scepter</td><td>wedding_drunk</td><td>acknowledging</td><td>betting</td><td>bribing</td></tr>
<tr><td>chess_certain_win</td><td>chess_cocky</td><td>dancing</td><td>dancing_plague</td><td>debating</td><td>hero_flex</td></tr>
<tr><td>obsequious_bow</td><td>physician</td><td>prayer</td><td>scepter</td><td>stayback</td><td>storyteller</td></tr>
<tr><td>survey</td><td>aggressive_axe</td><td>aggressive_mace</td><td>aggressive_sword</td><td>aggressive_dagger</td><td>aggressive_spear</td></tr>
<tr><td>aggressive_hammer</td><td>aggressive_unarmed</td><td>celebrate_axe</td><td>celebrate_mace</td><td>celebrate_sword</td><td>celebrate_dagger</td></tr>
<tr><td>celebrate_spear</td><td>celebrate_hammer</td><td>sword_coup_degrace</td><td>wrestling_victory</td><td>sword_yield_start</td><td>wrestling_yield_start</td></tr>
<tr><td>wooden_sword_yield_start</td><td>throne_room_wooden_sword</td><td>celebrate_wooden_sword</td><td>aggressive_wooden_sword</td><td>marshal_wooden_sword</td><td>wooden_sword_coup_degrace</td></tr>
<tr><td>random_weapon_coup_degrace</td><td>random_weapon_aggressive</td><td>random_weapon_celebrate</td><td>random_weapon_yield</td><td>inspect_weapon</td><td>menacing</td></tr>
<tr><td>threatening</td><td>throne_room_ruler</td><td>throne_room_ruler_2</td><td>throne_room_ruler_3</td><td>throne_room_two_handed_passive_shield</td><td>crossbow</td></tr>
<tr><td>bow_idle</td><td>hunting_shortbow_rest_arrow_default</td><td>hunting_shortbow_rest_bluntarrow_default</td><td>hunting_shortbow_aim_arrow_default</td><td>hunting_shortbow_aim_bluntarrow_default</td><td>hunting_longbow_rest_arrow_default</td></tr>
<tr><td>hunting_longbow_rest_bluntarrow_default</td><td>hunting_longbow_aim_arrow_default</td><td>hunting_longbow_aim_bluntarrow_default</td><td>hunting_horn</td><td>hunting_carcass_start</td><td>hunting_knife_start</td></tr>
<tr><td>hunting_falcon</td><td>jockey_lance_tilted</td><td>jockey_lance_couched_gallop</td><td>jockey_gallop</td><td>jockey_idle</td><td>jockey_victory</td></tr>
<tr><td>jockey_loss</td><td>jockey_walk</td><td>jockey_wave</td><td>chariot_neutral</td><td>chariot_happy</td><td>chariot_shocked</td></tr>
<tr><td>chariot_w_horses_neutral</td><td>chariot_w_horses_happy</td><td>chariot_w_horses_shocked</td><td>wedding_groom_right</td><td>wedding_bride_left</td><td>wedding_priest</td></tr>
<tr><td>reception_groom_left</td><td>reception_bride_right</td><td>wedding_objection_start</td><td>instrument_active</td><td>instrument_idle</td><td>shawm_active</td></tr>
<tr><td>shawm_idle</td><td>qanun_active</td><td>qanun_idle</td><td>lute_active</td><td>lute_idle</td><td>chifonie_active</td></tr>
<tr><td>chifonie_idle</td><td>alto_flute_active</td><td>alto_flute_idle</td><td>incapable</td><td>dead</td><td>survey_staff</td></tr>
</table>


## Themes

A Theme is a collection of background, lighting environment for character portraits, and sound effects. They are declared in common/event_themes/.


<table>
<tr><th colspan="4">Theme</th></tr>
<tr><td>abduct_scheme</td><td>alliance</td><td>bastardy</td><td>battle</td></tr>
<tr><td>befriend_scheme</td><td>claim_throne_scheme</td><td>corruption</td><td>crown</td></tr>
<tr><td>culture_change</td><td>death</td><td>default</td><td>diplomacy</td></tr>
<tr><td>diplomacy_family_focus</td><td>diplomacy_foreign_affairs_focus</td><td>diplomacy_majesty_focus</td><td>dread</td></tr>
<tr><td>dungeon</td><td>dynasty</td><td>education</td><td>fabricate_hook_scheme</td></tr>
<tr><td>faith</td><td>family</td><td>feast_activity</td><td>friend_relation</td></tr>
<tr><td>friendly</td><td>generic_intrigue_scheme</td><td>healthcare</td><td>hunt_activity</td></tr>
<tr><td>hunting</td><td>intrigue</td><td>intrigue_intimidation_focus</td><td>intrigue_skulduggery_focus</td></tr>
<tr><td>intrigue_temptation_focus</td><td>learning</td><td>learning_medicine_focus</td><td>learning_scholarship_focus</td></tr>
<tr><td>learning_theology_focus</td><td>love</td><td>lover_relation</td><td>marriage</td></tr>
<tr><td>martial</td><td>martial_authority_focus</td><td>martial_chivalry_focus</td><td>martial_strategy_focus</td></tr>
<tr><td>medicine</td><td>mental_break</td><td>mental_health</td><td>murder_scheme</td></tr>
<tr><td>party</td><td>pet</td><td>physical_health</td><td>pilgrimage_activity</td></tr>
<tr><td>pregnancy</td><td>prison</td><td>realm</td><td>recovery</td></tr>
<tr><td>rival_relation</td><td>romance_scheme</td><td>secret</td><td>seduce_scheme</td></tr>
<tr><td>seduction</td><td>skull</td><td>stewardship</td><td>stewardship_domain_focus</td></tr>
<tr><td>stewardship_duty_focus</td><td>stewardship_wealth_focus</td><td>sway_scheme</td><td>unfriendly</td></tr>
<tr><td>vassal</td><td>war</td><td>witchcraft</td></tr>
</table>


Individual elements of the theme can be overridden using ``override_background``, ``override_icon``, ``override_sound``, and ``override_environment``.


#### Backgrounds


<table>
<tr><th colspan="4">Background</th></tr>
<tr><td>alley_day</td><td>alley_night</td><td>armory</td><td>army_camp</td></tr>
<tr><td>battlefield</td><td>bedchamber</td><td>burning_building</td><td>corridor_day</td></tr>
<tr><td>corridor_night</td><td>council_chamber</td><td>courtyard</td><td>docks</td></tr>
<tr><td>dungeon</td><td>farmland</td><td>feast</td><td>gallows</td></tr>
<tr><td>garden</td><td>market</td><td>market_east</td><td>market_india</td></tr>
<tr><td>market_tribal</td><td>market_west</td><td>physicians_study</td><td>sitting_room</td></tr>
<tr><td>study</td><td>tavern</td><td>temple</td><td>temple_church</td></tr>
<tr><td>temple_generic</td><td>temple_mosque</td><td>temple_scope</td><td>terrain</td></tr>
<tr><td>terrain_activity</td><td>terrain_scope</td><td>throne_room</td><td>throne_room_east</td></tr>
<tr><td>throne_room_india</td><td>throne_room_mediterranean</td><td>throne_room_scope</td><td>throne_room_tribal</td></tr>
<tr><td>throne_room_west</td><td>wilderness</td><td>wilderness_desert</td><td>wilderness_forest</td></tr>
<tr><td>wilderness_forest_pine</td><td>wilderness_mountains</td><td>wilderness_scope</td><td>wilderness_steppe</td></tr>
</table>


### Environments

When you've selected a background, the appropriate environment is automatically selected. Only overwrite it when necessary.

<table>
<tr><th colspan="3">Environment</th></tr>
<tr><td>environment_body</td><td>environment_council</td><td>environment_cw_east_main</td></tr>
<tr><td>environment_cw_east_spouse</td><td>environment_cw_east_throneroom_main</td><td>environment_cw_east_throneroom_spouse</td></tr>
<tr><td>environment_cw_india_main</td><td>environment_cw_india_spouse</td><td>environment_cw_india_throneroom_main</td></tr>
<tr><td>environment_cw_india_throneroom_spouse</td><td>environment_cw_mediterranean_main</td><td>environment_cw_mediterranean_spouse</td></tr>
<tr><td>environment_cw_mediterranean_throneroom_main</td><td>environment_cw_mediterranean_throneroom_spouse</td><td>environment_cw_tavern</td></tr>
<tr><td>environment_cw_tavern_spouse</td><td>environment_cw_tribal_main</td><td>environment_cw_tribal_spouse</td></tr>
<tr><td>environment_cw_west</td><td>environment_cw_west_spouse</td><td>environment_event_alley</td></tr>
<tr><td>environment_event_alley_day</td><td>environment_event_armory</td><td>environment_event_battlefield</td></tr>
<tr><td>environment_event_bedchamber</td><td>environment_event_church</td><td>environment_event_corridor_day</td></tr>
<tr><td>environment_event_courtyard</td><td>environment_event_desert</td><td>environment_event_docks</td></tr>
<tr><td>environment_event_dungeon</td><td>environment_event_farms</td><td>environment_event_feast</td></tr>
<tr><td>environment_event_forest</td><td>environment_event_forest_pine</td><td>environment_event_gallows</td></tr>
<tr><td>environment_event_garden</td><td>environment_event_genericcamp</td><td>environment_event_market_east</td></tr>
<tr><td>environment_event_market_tribal</td><td>environment_event_market_west</td><td>environment_event_mosque</td></tr>
<tr><td>environment_event_mountains</td><td>environment_event_sittingroom</td><td>environment_event_standard</td></tr>
<tr><td>environment_event_steppe</td><td>environment_event_study</td><td>environment_event_study_physician</td></tr>
<tr><td>environment_event_tavern</td><td>environment_event_temple</td><td>environment_event_throne_room_west</td></tr>
<tr><td>environment_frontend_east_heir</td><td>environment_frontend_east_main</td><td>environment_frontend_east_secondary</td></tr>
<tr><td>environment_frontend_india_heir</td><td>environment_frontend_india_main</td><td>environment_frontend_india_secondary</td></tr>
<tr><td>environment_frontend_mediterranean_heir</td><td>environment_frontend_mediterranean_main</td><td>environment_frontend_mediterranean_secondary</td></tr>
<tr><td>environment_frontend_tribal_heir</td><td>environment_frontend_tribal_main</td><td>environment_frontend_tribal_secondary</td></tr>
<tr><td>environment_frontend_west_heir</td><td>environment_frontend_west_main</td><td>environment_frontend_west_secondary</td></tr>
<tr><td>environment_head</td><td>environment_hud</td><td>environment_portrait_editor</td></tr>
<tr><td>environment_shoulders</td><td>environment_standard</td><td>environment_torso</td></tr>
<tr><td>environment_war_overview</td><td></td></tr>
</table>


## Trigger

This is an additional requirement for an event to work.

```coffee
trigger = { # This is the set of requirements necessary for this event to enable (a gigant IF statement for the event itself)
	culture = {
		has_innovation = innovation_guilds # Checks if you have unlocked guilds on your cultural research
	}
}
```


You can also lock certain requirements in a trigger behind a trigger of their own, using `trigger_if`.
The requirements inside of the `trigger_if` will only be checked if the contents of the `limit` block are true. Optionally, you can add a `trigger_else` afterwards to check alternative requirements if the `trigger_if` fails.


```coffee
trigger = {
	any_held_county = { # We check that we have a blacksmith
		any_county_province = {
			has_building_or_higher = blacksmiths_01
		}
	}

	trigger_if = { # If our character is greedy, then we add the requirement to have 500 gold
		limit = { has_trait = greedy }
		gold > 500
	}
	trigger_else = { # Otherwise, you must have at least 50 piety and 10 gold
		piety > 50
        gold > 10
	}
}
```


The trigger is checked before the event fires, which means that you cannot use any of the scopes created in the [Immediate block](#immediate) when checking if certain characters meet triggers. For example, if you wanted to create an event where you wanted to know if a knight had the brave trait, you could not create a scope called ``scope:knight`` in the immediate block and then check that same scope in the trigger. Instead, to check if a character could meet the triggers for your event, you probably want to use a list builder.

```coffee
trigger = {
    any_knight = { # Will look at all knights of the root character to see if any match the triggers
        has_trait = brave
    }
}
```


### on_trigger_fail

Runs when the trigger fails.


## Description

Text that is going to show up in the event window can include the event's title, description, option names, and option flavor text. To write a description for an event, you can either write out literal text in the event file, or you can refer the description to a localization key which is stored in the ``your_mod\localization\english\`` folder (where english can be replaced by the language of the localization key for your mod). In the vanilla files, localization keys are stored in a subfolder of ``localization\english`` called ``event_localization``, but the game can read any localization key stored in the language folder.

```coffee
my_event.0001 = {
    title = "The Event's Title" # Literal text which will show up in game exactly as displayed here
    desc = my_event.0001.desc # A localization key to be defined in your_mod\localization\english
    # ...
}
```

It can be useful to write literal text when in the early stages of writing an event, but it is generally not advised to use literal text in your mod as it produces an error in the error.log, and it prevents you from using the powerful data context tools that allow you to reactively write out a character's name, pronouns, etc. based on which characters are getting the event. See [Localization](Localization.md) for more information on how to use these data types.

To make your descriptions even more reactive, you can also write out branching and complicated ``desc`` entries to account for different factors when the event fires. For example, you could write out different ``desc`` blocks to be displayed depending on the traits of the character who is getting the event. You can do this by using ``first_valid`` and ``random_valid`` inside of your ``desc`` entry.

```coffee
desc = {
    first_valid = { # Display the localization of the first valid desc block which returns true
        triggered_desc = {
            trigger = {
                has_trait = drunkard
            }
            desc = my_event.0001.desc.drunkard # An loc key to display if the trigger is true
        }
        desc = my_event.0001.desc.fallback # Another loc key to display if nothing before it is valid to display
    }
    random_valid = { # Will display a random localization key, picking from any loc keys for which the triggers return true
        desc = my_event.0001.random_1
        desc = my_event.0001.random_2
        desc = my_event.0001.random_3
        triggered_desc = {
            trigger = {
                is_female = yes
            }
            desc = my_event.0001.random_4
        }
    }
}
```

``first_valid`` will pick the first ``desc`` block inside of it which is valid (i.e., its triggers are true). If you want to set specific triggers, you can do so by using a ``triggered_desc`` block, which requires a trigger and a ``desc`` that it should display if this description is chosen. If you write in a ``desc`` block instead of a ``triggered_desc`` block, then its triggers will always be considered true, and it will always be a valid choice to display. This means that if you use a ``first_valid`` block and put a ``desc`` before a ``triggered_desc`` block, the ``desc`` will always display.

``random_valid`` is similar to ``first_valid``, but instead of picking the first ``desc`` which returns true, it will pick a random description that has true triggers. In this case, you can put the ``triggered_desc`` and ``desc`` keys in any order, as the choice will be randomized. Like with ``first_valid``, a key that is simply ``desc`` will always be considered a valid choice for the random selection.

You can also combine ``first_valid`` and ``random_valid`` to make a more curated randomization for your description.

```coffee
desc = {
    first_valid = { # Pick the first desc block that returns true
        triggered_desc = { # If the character has brave...
            trigger = {
                has_trait = brave 
            }
            desc = { # Then randomly pick one of these
                random_valid = {
                    desc = my_event.0001.brave.random_1
                    desc = my_event.0001.brave.random_2
                    desc = my_event.0001.brave.random_3
                }
            }
        }
        desc = { # Otherwise, if not brave, randomly pick one of these
            random_valid = {
               desc = my_event.0001.fallback.random_1
               desc = my_event.0001.fallback.random_2
               desc = my_event.0001.fallback.random_3
            }
        }
    }
}
```

You can make these descriptions quite varied and complicated by combining these together, but be aware that writing a lot of alternatives for events can be quite time consuming.

You can also combine ``desc`` entries by adding multiple ``desc`` keys outside of a ``first_valid`` or ``random_valid`` entry.

```coffee
desc = {
    desc = { # Only display the opening if the character has the blind trait
        first_valid = {
            triggered_desc = {
                trigger = {
                    has_trait = eccentric
                }
                desc = "Many people have said, because of my eccentricity,"
            }
        }
    desc = "I am an endless font of inspiration," # Always display the middle
    desc = { # Display a different ending depending on if the character has the pregnant trait
        first_valid = {
            triggered_desc = {
                trigger = {
                    has_trait = pregnant
                }
                desc = "and I hope that I am able to pass that on to my child."
            }
            desc = "and it feels good to be appreciated like that."
        }
    }
}
```

The above description will output as many as three separate localization keys as a single event description. If the character receiving the event is eccentric and pregnant, then the event description will read: "Many people have said, because of my eccentricity, I am an endless font of inspriation, and I hope that I am able to pass that on to my child." If the character is eccentric, but not pregnant, then it will read: "Many people have said, because of my eccentricity, I am an endless font of inspiration, and it feels good to be appreciated like that." If the character is not eccentric but is pregnant, then it will read: "I am an endless font of inspiration, and I hope that i am able to pass that on to my child." And, finally, if the character is neither eccentric nor pregnant, it will read: "I am an endless font of inspiration, and it feels good to be appreciated like that."

You can make very complex event descriptions like this, but it can take a lot of work to make sure that all of the possible variations are able to work together, so if you're going to do complciated things, you're going to want to aggressively test the various permutations of your event's description to make sure that all of them make sense.

Also note that when you combine localization strings like this, they are concatenated with a space between strings. If you write two localization keys that say "I have seen this before", and ", haven't you?", then when combined, the description will read: "I have seen this before , haven't you?" So be careful when splitting localization keys to avoid misplaced spaces. On a similar note, the developers also seem to use the en-dash instead of the em-dash for punctuating description text, as the generally accepted use of an en-dash involves a leading and trailing space, whereas an em-dash is usually abutting both characters it is between (e.g., "Hello – how are you?" vs. "Hello—how are you?"), which makes it easier to disguse where the cuts are between localization keys.

``desc`` blocks can be used in various places, as well, such as in the names for options:

```coffee
option = {
    name = {
        text = {
            first_valid = {
                triggered_desc = {
                    trigger = {
                        is_female = yes
                    }
                    desc = my_event.0001.a.female
                }
                desc = my_event.0001.a.fallback
            }
        }
    }
}
```

When it comes to options, however, you have to use a ``text`` block between ``name`` and ``first_valid``, or else the description won't display properly. Alternatively, for ``option`` blocks, you can also do it like:

```coffee
name = {
    trigger = { has_trait = brave }
    text = my_event.0001.a.brave
}
```

You can also use these more complex descriptions in ``flavor`` blocks, and for those you do not need to use the ``text`` block, but can just do it the same as a description block:

```coffee
flavor = {
    first_valid = {
	triggered_desc = {
	    trigger = {
                is_female = yes
             }
	     desc = my_event.0001.a.flavor.female
	}
    desc = my_event.0001.a.flavor.fallback
    }
}
```


## Immediate

This is a block of effect script: it will be ran *immediately* as your event is triggered, before the title, description, portraits, are even evaluated let alone rendered. This block is useful for setting variables and saving scopes to use in your text or for portraits; or for functional effects that you want to happen without the player having any control over it.

"has happened" tooltip.
```coffee
immediate = { # Stuff that happens when the event appears on screen, works regardless of what option you select.
	add_gold = 50 # adds 50 gold to the player 
}
```


## Options

Options within events are able to be pressed by the user. Each event may have any number of options, including none at all (a common example includes hidden events). Each option in defined in the main event block, like so:
```coffee
example.1 = {

	# [...]

	option = {
		# option info
	}

	# [...]

}
```

A more complex example:
```coffee
option = { # Option title
	name = stewardship_domain_special.1424.a
	trigger_event = { # Makes another event happen
		id = yearly.1012 # The event ID is the thing at the top (so stewardship_domain.6017 is valid, as is any other event, so long as it exists).
		days = { 7 14 } # Get random number between two values (unknown wether it is inclusive or exclusive), anything that takes = {X Y} can also just work as = X
	}

	hidden_effect = { # Hides stuff from showing up on the tooltip of the option
		scope:county = { # Gets the location stored in the scope "county"
			add_county_modifier = { # To add modifiers (bonuses or penalites)
				modifier = governance_land_cleared_for_settlement_modifier # https://ck3.paradoxwikis.com/Modifier_list be sure to use one that belongs to the right type (in this case, country).
				days = 3650 # How long it lasts, you can use days = {X Y} too
			}
		}
	}

	ai_chance = {
		base = 50 # What are the chances of selecting this option over others? (Does not need to be 0 to 100, it can be anything)
		modifier = {  # You can change the value based on a variety of things, in this case it is the traits of the AI character
			add = 15
			has_trait = sadistic # List of traits can be found at ..\game\common\traits\00_traits.txt
		}
		modifier = {
			add = -40 # To remove something you just add a negative number (5 + -10 = -5)
			has_trait = compassionate
		}
	}
}
```

The table below describes available keys within the ``option`` block:


| **Key** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- |
| name | Yes | Points to a localization key for the event option button text. | name=example.1.a |
| (effects) | No | Any [effect](Effects.md)s that the option may have can be written directly in the `option` block. | play_music_cue = mx_cue_banquet |
| trigger | No | Defines a [trigger](Triggers.md) that has to be fulfilled for the option to be valid and thus available to the user. Not to be confused with the [main event trigger](#trigger). | <code style="white-space: pre">trigger = {<br>    has_trait = shy<br>}</code> |
| show_as_unavailable | No | If the option is invalid, but this trigger is, the option will be shown, but disabled. This behavior is also influenced by the EVENT_OPTIONS_SHOWN_HIDE_UNAVAILABLE define. | <code style="white-space: pre">show_as_unavailable = {<br>    short_term_gold &lt; medium_gold_value<br>}</code> |
| trait | No | If the player has the given trait, show it on the left side of the option. Hovering over it will say the option is available because of the trait. This is only providing flavor, and does not actually affect the functionality of the option. | trait = honest |
| skill | No | Show the chosen skill on the left side of the option. Hovering over it will say the option is available because of your high skill. This is only providing flavor, and does not actually affect the functionality of the option. | skill = prowess |
| add_internal_flag | No | Can take the values "special" or "dangerous". The key "special" highlights the option as yellow, "dangerous" highlights the option as red. This is only providing flavor, and does not actually affect the functionality of the option. | add_internal_flag = special |
| highlight_portrait | No | Highlights the event portrait of this character while this option is hovered. This is in addition to the automatic highlighting when hovering an event option that has an effect that affects portrait characters. | highlight_portrait = scope:custom |
| fallback | No | If this is yes: if no other options meet their triggers, then this option will be shown even if its trigger is not met either. You can use this together with `trigger = { always = no }` to create an option that is only ever shown as a last resort. | fallback = yes |
| exclusive | No | If an option is marked exclusive = yes and it meets its triggers, it will be the only option shown. If multiple options are marked exclusive = yes and each meets their triggers, each will be shown. | exclusive = yes |
| flavor | No | Flavor text that is shown in the tooltip of the option. The flavor can either be a loc key or a dynamic desc with first_valid etc. | flavor = my_events.1001.a.flavor |


## After

This is a block of effect script that runs after the event has ran its course and an option has been chosen. Works the exact same as the immediate block. Won't do anything if the event has no options (for hidden events, for example).

It is most commonly used for clean-up duty, removing variables, characters, and other kinds of data that are likely to persist when not intended to.

As an example, in the event `fp2_struggle.2009`, "Catching Thieves of Myth", the `after` block is used to check if we have a saved scope (used as a boolean) to decide if we should delete the event-generated character once the event is over.


```coffee
after = {
	if = {
		limit = { NOT = { exists = scope:fp2_2009_thief_permanence_scope } } # Acts as a boolean, if this exists, then it is true
		scope:fp2_2009_garduna_young_thief = { silent_disappearance_effect = yes } # We kill (delete) the young thief, as it is no longer of use for future events
	}
}
```


## Widgets

What types of widgets are there, with screenshots for each of what they look like.


## On Actions (on_action)

On Actions are scripts that execute every time a specific action is called by the game code (such as a child being born, a character inheriting land or using a hook).
This allows modders to intercept and run their own scripts whenever said On Actions are called.

They are defined in **common/on_action**

**Important:** double-check your path. This is a singular **on_action**, not on_actions. This is a common mistake.

Example (trigger a custom event when a child is born):
```c
on_birth_child = {
  events = {
    my_event.1
  }
}
```

See the .info file in that folder for more details. See on_actions.log for a full list of on_actions.

Some on_actions are called by game code directly, while others are called by script: other on_actions, events, decisions, etc.

For example, ``on_birthday`` is fired by code every birthday and tries to fire ``on_birthday_adulthood``, but since it has a trigger ``is_adult = yes`` it will only fire when a character is an adult.

Such custom on_actions are useful to group events or effects. We can create new custom on_actions, we cannot create new code on_actions.


### Common examples

- ``on_birth_child`` - when a child is born
- ``on_16th_birthday`` - when a child becomes an adult
- ``random_yearly_playable_pulse`` - once a year, at a random date, for every count+ character who is allowed be played. Useful for rare events.
- ``quarterly_playable_pulse`` - a more frequent pulse, every three months, for the same kind of characters
- ``on_game_start`` - when the game starts, but before the player selects a character, so ``every_player`` doesn't work here
- ``on_game_start_after_lobby`` - after the player has selected a character and confirmed. This is where you can affect player characters
- ``on_death`` - right before a character dies. Useful to transfer any variables to the primary_heir

Note, there is no monthly on_action. This was done to ensure better performance.

If you *really* need a monthly pulse, you could use quarterly_playable_pulse and trigger your on_action three times with increasing delay:

```c
on_actions = {
  my_on_action
  delay = { months = 1 }
  my_on_action
  delay = { months = 2 }
  my_on_action
}
```

Alternatively, have the on_action call itself with a monthly delay.


### Appending

Most of the time, we want to add something to on_actions without overwriting them. We call this appending.

**Important:** effects and triggers cannot be appended directly. Only events and other on_actions are appended.

To ensure compatibility and not overwrite vanilla effects, do the following:

1. Make a new txt file.
1. Create your own on_action and add it to an existing on_action:

```coffee
on_birth_child = { 
	on_actions = {
		my_on_action # custom on_action appended to on_birth_child
	} 
} 
my_on_action = {
	trigger = { ... } # trigger used only for this on_action
	effect = { ... } # all effects are appended safely
}
```

The example below will ovewrite vanilla effect and trigger (and any added by other mods) 
```coffee
on_birth_child = {
	trigger = { ... } 
	effect = {... } # effect and trigger are overwritten, not appended
}
```

On_actions can also be called by events and other effects like this:

``trigger_event = { on_action = my_on_action }``


### Scopes

Make sure to check what scopes are available in each on_action.

There are comments above each on_action in their files that explain their scopes.

For example, ``on_game_start`` doesn't have a root scope. It fires once, globally. This means we need to use global effects, like ``every_ruler``.

On the other hand, ``yearly_playable_pulse`` fires for all playable characters, and has the character as the root scope. So we can use character effects directly, like add_gold.

**Important**: Do not use ``every_living_character`` in ``yearly_playable_pulse`` and similar on_actions.

That on_action already fires for every character. If you then try to iterate through all characters, that would result in about 20000<sup>2</sup> operations, causing massive lag and repetition of your effects.


### Properties

This table uses contents from */common/on_action/on_actions.info* file.

| **Name** | **Description** | **Expected type** | **Example** |
| --- | --- | --- | --- |
| trigger | On_actions can have triggers. If an on_action fires and its trigger returns false, nothing happens | boolean | <code style="white-space: pre">trigger = {<br>    trigger_conditions = yes<br>}</code> |
| weight_multiplier | Used to manipulate the weight of this on_action if it is a candidate in a random_on_actions list (see below) | integer | <code style="white-space: pre">weight_multiplier = {<br>    base = 1<br>    modifier = {<br>        add = 1<br>        trigger_conditions = yes<br>    }<br>}</code> |
| events | Events listed in "events" brackets will always fire as long as their trigger evaluates to true |  | <code style="white-space: pre">events = {<br>    event_id_1<br>    delay = { days = 365 }        # A delay will mean that all events listed after it will only be fired after the delay has passed. NOTE: For performance reasons, an event will only successfully fire if it is valid both when the on_action is executed AND once the delay is complete. All firing entries support delays, whether for events or on_actions.<br>    event_id_2<br>    delay = { months = { 6 12 } }    # Setting a new delay overrides a previous delay. Delays support random ranges<br>    event_id_3<br>}</code> |
| random_events | A single event will be picked to fire |  | <code style="white-space: pre">random_events = {    # A single event will be picked to fire<br>        <br>    chance_to_happen = 25    # A percentage chance determining whether the events involved will be evaluated at all<br><br>    chance_of_no_event = {     # An entry that can be formatted as a script value (and therefore have conditional entries). Separated from "chance_to_happen" for performance reasons. Will only be evaluated if chance_to_happen is true.<br>        value = 0<br>        if = {<br>            limit = { trigger_conditions = yes }<br>            add = 10<br>        }<br>    }<br><br>    100 = event_id_1     # The number is the weight for picking a specific event. The weight is factored by the event's weight_multiplier entry. (If no weight_multiplier is defined for the event, it is 1)<br>    200 = event_id_2<br>    100 = 0        # Having a "0" entry means that there is a chance no event fires, even if there are other valid events. Good for making sure that rare events don't always fire just because every other possible event is invalid.<br><br>}</code> |
| first_valid | Pick the first event for which the trigger returns true | List&lt;event&gt; | <code style="white-space: pre">first_valid = {        # Pick the first event for which the trigger returns true<br>    event_id_1<br>    event_id_2<br>    fallback_event_without_trigger<br>}</code> |
| on_actions | An on_action can fire other on_actions, following the same rules as with events | List&lt;on_action&gt; | <code style="white-space: pre">on_actions = {    # An on_action can fire other on_actions, following the same rules as with events<br>    on_action_1<br>    on_action_2<br>    on_action_3<br>}</code> |
| random_on_actions | Same as with events. On_actions are also factored by their weight_multipliers, which defaults to 1 |  | <code style="white-space: pre">random_on_actions = {<br>    100 = on_action_1<br>    200 = on_action_2<br>    100 = 0<br>}</code> |
| first_valid_on_action |  | List&lt;on_action&gt; | <code style="white-space: pre">first_valid_on_action = {<br>    on_action_1<br>    on_action_2<br>}</code> |
| effect | An on_action can run effects. It can access the same default or saved scopes as the script chain/code functionality it was fired from. Note that it happens concurrently to events triggered by the on_action, NOT before. Effects run here create a separate chain than events the on_action fires, so you can for example not manipulate values in the effect, and then reliably access those in an event that was fired at the same time. Scopes or local variables set in the effect here will not carry over to any event fired by the on_action. |  | <code style="white-space: pre">effect = {<br>    effects = yes<br>}</code> |
| fallback | on_actions can define a fallback on_action. If no events/on_actions are run by the on_action, the fallback gets called instead. Avoid creating infinite fallback loops, or the game may be prevented from advancing time! | on_action | `fallback = another_on_action` |


### On_actions from code


| **Name** | **Description** | **From code** | **Expected scope** | **Other** |
| --- | --- | --- | --- | --- |
| on_prestige_level_loss |  | Yes | None |  |
| on_rank_down |  | Yes | None |  |
| on_weight_changed |  | Yes | Character |  |
| on_faith_monthly |  | Yes | Faith |  |
| on_knight_combat_pulse |  | Yes | Character |  |
| on_war_invalidated |  | Yes | None |  |
| on_war_transferred |  | Yes | Character |  |
| on_divorce |  | Yes | None |  |
| on_leave_court |  | Yes | Character |  |
| on_guest_ready_to_move_to_pool |  | Yes | Character |  |
| on_guest_arrived_from_pool |  | Yes | Character |  |
| on_siege_completion |  | Yes | Character |  |
| on_war_won_attacker |  | Yes | Casus belli |  |
| on_alliance_added |  | Yes | None |  |
| on_pregnancy_mother |  | Yes | Character |  |
| on_raid_action_start |  | Yes | None |  |
| on_county_faith_change |  | Yes | Landed Title |  |
| on_title_gain_usurpation |  | Yes | None |  |
| on_release_from_prison |  | Yes | Character |  |
| random_yearly_playable_pulse |  | Yes | Character |  |
| on_raid_action_completion |  | Yes | Army |  |
| on_death |  | Yes | Character |  |
| on_birth_father |  | Yes | None |  |
| on_betrothal_broken |  | Yes | None |  |
| on_war_white_peace |  | Yes | None |  |
| three_year_playable_pulse |  | Yes | Character |  |
| on_defeat_raid_army |  | Yes | Army |  |
| on_army_enter_province |  | Yes | Character |  |
| on_join_court |  | Yes | Character |  |
| on_fired_from_council |  | Yes | Character |  |
| on_raid_loot_delivered |  | Yes | Army |  |
| on_pregnancy_ended_mother |  | Yes | None |  |
| on_title_lost |  | Yes | None |  |
| on_title_gain |  | Yes | Character |  |
| on_character_culture_change |  | Yes | Character |  |
| on_birth_child |  | Yes | Character |  |
| on_holy_order_hired |  | Yes | None |  |
| on_great_holy_war_invalidation |  | Yes | Great Holy War |  |
| on_combat_end_loser |  | Yes | Combat Side |  |
| on_concubinage |  | Yes | None |  |
| on_commander_combat_pulse |  | Yes | Character |  |
| random_yearly_everyone_pulse |  | Yes | Character |  |
| five_year_everyone_pulse |  | Yes | Character |  |
| on_perks_refunded |  | Yes | None |  |
| quarterly_playable_pulse |  | Yes | None |  |
| on_prestige_level_gain |  | Yes | None |  |
| on_faith_created |  | Yes | Character |  |
| on_holy_order_new_lease |  | Yes | None |  |
| on_title_gain_inheritance |  | Yes | None |  |
| on_game_start |  | Yes | None |  |
| on_character_faith_change |  | Yes | Character |  |
| on_combat_end_winner |  | Yes | Combat Side |  |
| on_courtier_decided_to_move_to_pool |  | Yes | Character |  |
| on_culture_era_changed |  | Yes | None |  |
| on_birthday |  | Yes | Character |  |
| on_faith_conversion |  | Yes | Character |  |
| on_raid_action_weekly |  | Yes | None |  |
| on_explicit_claim_gain |  | Yes | Character |  |
| on_courtier_ready_to_move_to_pool |  | Yes | Character |  |
| on_potential_great_holy_war_invalidation |  | Yes | Great Holy War |  |
| on_holy_order_destroyed |  | Yes | None |  |
| on_war_won_defender |  | Yes | Casus belli |  |
| yearly_global_pulse |  | Yes | None |  |
| on_great_holy_war_countdown_end |  | Yes | GreaT Holy War |  |
| yearly_playable_pulse |  | Yes | Character |  |
| three_year_pool_pulse |  | Yes | Character |  |
| on_pregnancy_father |  | Yes | None |  |
| on_piety_level_loss |  | Yes | None |  |
| on_piety_level_gain |  | Yes | None |  |
| on_siege_looting |  | Yes | None |  |
| on_title_destroyed |  | Yes | None |  |
| on_army_monthly |  | Yes | None |  |
| on_game_start_after_lobby |  | Yes | None |  |
| on_imprison |  | Yes | Character |  |
| on_birth_mother |  | Yes | Character |  |
| on_dynasty_created |  | Yes | None |  |
| on_alliance_removed |  | Yes | None |  |
| on_county_occupied |  | Yes | None |  |
| on_rank_up |  | Yes | None |  |
| on_vassal_become_powerful |  | Yes | None |  |
| on_join_war_as_secondary |  | Yes | Character |  |
| on_explicit_claim_lost |  | Yes | Character |  |
| on_alliance_broken |  | Yes | None |  |
| on_natural_death_second_chance |  | Yes | None |  |
| on_leave_council |  | Yes | Character |  |
| on_county_culture_change |  | Yes | None |  |
| on_war_started |  | Yes | None |  |
| on_marriage |  | Yes | Character |  |
| on_great_holy_war_participant_replaced |  | Yes | Character |  |
| five_year_playable_pulse |  | Yes | Character |  |
| on_birth_real_father |  | Yes | None |  |
| on_game_start_with_tutorial |  | Yes | None |  |


## Strategy


### Triggering the event

<!-- Template: Expand‎ -->Events do not fire automatically, they have to be fired by something in the script, for example:

- [on_actions](#on-actions-(on-action))
- [story cycles](Story_cycles_modding.md)
- [decisions](Decisions_modding.md)
- character interactions

etc.


### Techniques and design patterns

<!-- Template: Expand‎ -->If you just input the information in your will be overriding vanilla on_actions. The example below is just one of the way to add in your own events.

```coffee
five_year_playable_pulse = { 
	on_actions = { my_five_year_playable_pulse }
}
my_five_year_playable_pulse = {
		random_events = {
1. Your event change name is here.
	}
}
```

Pinging events, message events.

Other fancy ideas.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Event_modding*
