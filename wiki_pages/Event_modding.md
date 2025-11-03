# Event modding

- This article is timeless and should be accurate for any version of the game.*


<!-- Template: Expand‎ -->
Events are the meat of every well-rounded mod; smaller and larger bits of story that can happen to a player during the campaign.

    - Checklist.** Your events must:

- be in ``your_mod\events\`` folder
- have a .txt extension
- have a namespace defined on the first line, like ``namespace = my_events``
- use the namespace as their name + number, like ``my_events.1 = {...``
- be fired from script in some way, like by an [Event modding#On Actions (on action)](#on-actions-(on-action))

Events do not fire automatically otherwise, like in older games. Other ways to fire them are decisions, character interactions, story cycles, etc.


## Scripting Tools

There are various tools capable of helping modders script events with greater ease.


### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) is considered to be the superior choice for modders due to the fact that it features various extensions that allow it to syntax highlight ParadoxScript.

    - Recommended Extensions:**
- [CWTools - Paradox Language Services by Thomas Boby](https://marketplace.visualstudio.com/items?itemName=tboby.cwtools-vscode)
- [Paradox Syntax Highlighting by Thomas Boby](https://marketplace.visualstudio.com/items?itemName=tboby.paradox-syntax)

| **Snippets For Visual Studio Code&nbsp;** |
| --- |
| VSCode snippets are templates that make it easier to enter repeating code patterns, such as complicated scripted effects, conditional statements, or even entire events.<br>It is easy to make custom snippets for templating CK3 script components, below you can find a vanilla sample set. You are encouraged to expand upon this and make your own set tailored to your mod's needs.<br><br>Read more: [Snippets in Visual Studio Code - Microsoft Corporation](https://marketplace.visualstudio.com/items?itemName=tboby.cwtools-vscode) |
| *See [Code Block 1](#code-block-1) below* |


### Sublime Text

[Sublime Text](https://www.sublimetext.com/) is a popular choice amongst many because it excels at handling localization files. This is a free software.


### Notepad++

[Notepad++](https://notepad-plus-plus.org/) is a direct update over using regular notepad for scripting, if the two options above seem too daunting, you can start here.


## Location

Events belong in a .txt file inside the ``events`` directory directly below your [Mod structure#Mod folder](Mod_structure.md#mod-folder). Each file can hold as many events as one would like. The ``events`` directory may also have sub-folders containing their own event files, if one prefers.


## Structure

The overall structure is similar to that of a [CKII:Event_modding](https://ck3.paradoxwikis.com/CKII:Event_modding), with some tweaks to the syntax and a whole lot of extra features, many of them optional. The barest possible event is laid out here, and each element is described individually in a later section.

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

Namespaces can be any alphanumeric string (without the '.' character), and are used as prefix in the form ``<namespace>.<id>``. The ID uniquely identifies your event.

If an event file uses a namespace, it has to be declared at the beginning of the file with ``namespace = <namespace>``. This has to be done for every file the namespace is used in.


### Flags

These are top-level variables that determine your event's kind and appearance. They have a limited set of values.


|  |  |  |
| --- | --- | --- |
| **Flag** | **Meaning** | **Possible values** |
| type | The kind of event. It determines what sort of scope the root is. | * character_event<br>* letter_event<br>* duel_event<br>* none (when an event doesn't use the root scope at all)<br>* empty (necessary for characterless events to trigger. NOTE: this means typing type = empty ) |
| hidden | Set this to true, and the event will not be shown at all; it will happen in the background. Useful for doing maintenance events that are not immediately relevant to the player. | true, false |


## Portraits

In Crusader Kings III, portraits are now in 3D, and can now be animated as well! What follows is a list of the different portrait positions, as well as a list of animations for them.


### Portrait Positions

![Portrait Positions](https://ck3.paradoxwikis.com/File:Example_event.png)


|  |  |
| --- | --- |
| **Portrait Position** | **Description** |
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

|  |  |  |
| --- | --- | --- |
| **Parameter** | **Description** | **Example** |
| character | The character whose portrait is shown. | ``character = scope:event_target`` |
| animation | The animation that will play | ``animation = anger`` |
| triggered_animation | Plays a certain animation if the triggers are met. If not, will default to animation set with ``animation = `` | <pre><code>triggered_animation = {<br>	trigger = {}<br>	animation = fear<br>}</code></pre> |
| triggered_outfit | Set an outfit for use in this event. [(Additional Information on outfit_tags)](https://ck3.paradoxwikis.com/Characters_modding#Outfit_Tags) | <pre><code>triggered_outfit = {<br>	trigger = {}<br>	outfit_tags = no_clothes (also accepts multiple tags, in the format outfit_tags = { tag1 tag2 }<br>	remove_default_outfit = yes/no<br>}</code></pre> |
| hide_info | Prevents the game from showing any info on the character (tooltip, COA, clicks, etc). Only the portrait will be shown. | ``hide_info = yes/no`` |


### Animations


|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **Event-Compatible Animation IDs** |  |  |  |  |  |
| idle | chancellor | steward | marshal | spymaster | chaplain |
| anger | rage | disapproval | disbelief | disgust | fear |
| sadness | shame | shock | worry | boredom | grief |
| paranoia | dismissal | flirtation | flirtation_left | love | schadenfreude |
| stress | happiness | ecstasy | admiration | lunatic | scheme |
| beg | pain | poison | aggressive_axe | aggressive_mace | aggressive_sword |
| aggressive_dagger | aggressive_spear | aggressive_hammer | celebrate_axe | celebrate_mace | celebrate_sword |
| celebrate_dagger | celebrate_spear | celebrate_hammer | loss_1 | chess_certain_win | chess_cocky |
| laugh | lantern | eyeroll | eavesdrop | assassin | toast |
| toast_goblet | drink | drink_goblet | newborn | sick | severelywounded |
| prisonhouse | prisondungeon | war_attacker | war_defender | war_over_tie | war_over_win |
| war_over_loss | pregnant | personality_honorable | personality_dishonorable | personality_bold | personality_coward |
| personality_greedy | personality_content | personality_vengeful | personality_forgiving | personality_rational | personality_irrational |
| personality_compassionate | personality_callous | personality_zealous | personality_cynical | frontend_center_idle | frontend_left_idle |
| frontend_right_idle | throne_room_chancellor | throne_room_kneel_1 | throne_room_kneel_2 | throne_room_curtsey_1 | throne_room_messenger_1 |
| throne_room_messenger_2 | throne_room_messenger_3 | throne_room_conversation_1 | throne_room_conversation_2 | throne_room_conversation_3 | throne_room_conversation_4 |
| throne_room_cheer_1 | throne_room_cheer_2 | throne_room_applaud_1 | throne_room_bow_1 | throne_room_bow_2 | throne_room_bow_3 |
| throne_room_one_handed_passive_1 | throne_room_one_handed_passive_2 | throne_room_two_handed_passive_1 | throne_room_writer | test_case_1 | holding_staff |
| marshal_random_weapon | crying | delirium | disappointed | eccentric | manic |
| marshal_axe | interested | interested_left | stunned | wailing | wedding_happy_cry |
| marshal_dagger | peekaboo | child_hobby_horse | clutching_toy | clutching_ball | clutching_doll |
| marshal_mace | go_to_your_room | cough | shiver | sick_stomach | loss_1 |
| marshal_shield | page_flipping | writing | reading | stressed_teacher | happy_teacher |
| thinking | emotion_thinking_scepter | wedding_drunk | acknowledging | betting | bribing |
| chess_certain_win | chess_cocky | dancing | dancing_plague | debating | hero_flex |
| obsequious_bow | physician | prayer | scepter | stayback | storyteller |
| survey | aggressive_axe | aggressive_mace | aggressive_sword | aggressive_dagger | aggressive_spear |
| aggressive_hammer | aggressive_unarmed | celebrate_axe | celebrate_mace | celebrate_sword | celebrate_dagger |
| celebrate_spear | celebrate_hammer | sword_coup_degrace | wrestling_victory | sword_yield_start | wrestling_yield_start |
| wooden_sword_yield_start | throne_room_wooden_sword | celebrate_wooden_sword | aggressive_wooden_sword | marshal_wooden_sword | wooden_sword_coup_degrace |
| random_weapon_coup_degrace | random_weapon_aggressive | random_weapon_celebrate | random_weapon_yield | inspect_weapon | menacing |
| threatening | throne_room_ruler | throne_room_ruler_2 | throne_room_ruler_3 | throne_room_two_handed_passive_shield | crossbow |
| bow_idle | hunting_shortbow_rest_arrow_default | hunting_shortbow_rest_bluntarrow_default | hunting_shortbow_aim_arrow_default | hunting_shortbow_aim_bluntarrow_default | hunting_longbow_rest_arrow_default |
| hunting_longbow_rest_bluntarrow_default | hunting_longbow_aim_arrow_default | hunting_longbow_aim_bluntarrow_default | hunting_horn | hunting_carcass_start | hunting_knife_start |
| hunting_falcon | jockey_lance_tilted | jockey_lance_couched_gallop | jockey_gallop | jockey_idle | jockey_victory |
| jockey_loss | jockey_walk | jockey_wave | chariot_neutral | chariot_happy | chariot_shocked |
| chariot_w_horses_neutral | chariot_w_horses_happy | chariot_w_horses_shocked | wedding_groom_right | wedding_bride_left | wedding_priest |
| reception_groom_left | reception_bride_right | wedding_objection_start | instrument_active | instrument_idle | shawm_active |
| shawm_idle | qanun_active | qanun_idle | lute_active | lute_idle | chifonie_active |
| chifonie_idle | alto_flute_active | alto_flute_idle | incapable | dead | survey_staff |


## Themes

A Theme is a collection of background, lighting environment for character portraits, and sound effects. They are declared in common/event_themes/.


|  |  |  |  |
| --- | --- | --- | --- |
| **Theme** |  |  |  |
| abduct_scheme | alliance | bastardy | battle |
| befriend_scheme | claim_throne_scheme | corruption | crown |
| culture_change | death | default | diplomacy |
| diplomacy_family_focus | diplomacy_foreign_affairs_focus | diplomacy_majesty_focus | dread |
| dungeon | dynasty | education | fabricate_hook_scheme |
| faith | family | feast_activity | friend_relation |
| friendly | generic_intrigue_scheme | healthcare | hunt_activity |
| hunting | intrigue | intrigue_intimidation_focus | intrigue_skulduggery_focus |
| intrigue_temptation_focus | learning | learning_medicine_focus | learning_scholarship_focus |
| learning_theology_focus | love | lover_relation | marriage |
| martial | martial_authority_focus | martial_chivalry_focus | martial_strategy_focus |
| medicine | mental_break | mental_health | murder_scheme |
| party | pet | physical_health | pilgrimage_activity |
| pregnancy | prison | realm | recovery |
| rival_relation | romance_scheme | secret | seduce_scheme |
| seduction | skull | stewardship | stewardship_domain_focus |
| stewardship_duty_focus | stewardship_wealth_focus | sway_scheme | unfriendly |
| vassal | war | witchcraft |  |


Individual elements of the theme can be overridden using ``override_background``, ``override_icon``, ``override_sound``, and ``override_environment``.


#### Backgrounds


| **Background** |  |  |  |
| --- | --- | --- | --- |
| alley_day | alley_night | armory | army_camp |
| battlefield | bedchamber | burning_building | corridor_day |
| corridor_night | council_chamber | courtyard | docks |
| dungeon | farmland | feast | gallows |
| garden | market | market_east | market_india |
| market_tribal | market_west | physicians_study | sitting_room |
| study | tavern | temple | temple_church |
| temple_generic | temple_mosque | temple_scope | terrain |
| terrain_activity | terrain_scope | throne_room | throne_room_east |
| throne_room_india | throne_room_mediterranean | throne_room_scope | throne_room_tribal |
| throne_room_west | wilderness | wilderness_desert | wilderness_forest |
| wilderness_forest_pine | wilderness_mountains | wilderness_scope | wilderness_steppe |


### Environments

When you've selected a background, the appropriate environment is automatically selected. Only overwrite it when necessary.

| **Environment** |  |  |
| --- | --- | --- |
| environment_body | environment_council | environment_cw_east_main |
| environment_cw_east_spouse | environment_cw_east_throneroom_main | environment_cw_east_throneroom_spouse |
| environment_cw_india_main | environment_cw_india_spouse | environment_cw_india_throneroom_main |
| environment_cw_india_throneroom_spouse | environment_cw_mediterranean_main | environment_cw_mediterranean_spouse |
| environment_cw_mediterranean_throneroom_main | environment_cw_mediterranean_throneroom_spouse | environment_cw_tavern |
| environment_cw_tavern_spouse | environment_cw_tribal_main | environment_cw_tribal_spouse |
| environment_cw_west | environment_cw_west_spouse | environment_event_alley |
| environment_event_alley_day | environment_event_armory | environment_event_battlefield |
| environment_event_bedchamber | environment_event_church | environment_event_corridor_day |
| environment_event_courtyard | environment_event_desert | environment_event_docks |
| environment_event_dungeon | environment_event_farms | environment_event_feast |
| environment_event_forest | environment_event_forest_pine | environment_event_gallows |
| environment_event_garden | environment_event_genericcamp | environment_event_market_east |
| environment_event_market_tribal | environment_event_market_west | environment_event_mosque |
| environment_event_mountains | environment_event_sittingroom | environment_event_standard |
| environment_event_steppe | environment_event_study | environment_event_study_physician |
| environment_event_tavern | environment_event_temple | environment_event_throne_room_west |
| environment_frontend_east_heir | environment_frontend_east_main | environment_frontend_east_secondary |
| environment_frontend_india_heir | environment_frontend_india_main | environment_frontend_india_secondary |
| environment_frontend_mediterranean_heir | environment_frontend_mediterranean_main | environment_frontend_mediterranean_secondary |
| environment_frontend_tribal_heir | environment_frontend_tribal_main | environment_frontend_tribal_secondary |
| environment_frontend_west_heir | environment_frontend_west_main | environment_frontend_west_secondary |
| environment_head | environment_hud | environment_portrait_editor |
| environment_shoulders | environment_standard | environment_torso |
| environment_war_overview |  |  |


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


The trigger is checked before the event fires, which means that you cannot use any of the scopes created in the [Event modding#Immediate](#immediate) when checking if certain characters meet triggers. For example, if you wanted to create an event where you wanted to know if a knight had the brave trait, you could not create a scope called ``scope:knight`` in the immediate block and then check that same scope in the trigger. Instead, to check if a character could meet the triggers for your event, you probably want to use a list builder.

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
| (effects) | No | Any [effect](Effects.md)s that the option may have can be written directly in the ``option`` block. | play_music_cue = mx_cue_banquet |
| trigger | No | Defines a [trigger](Triggers.md) that has to be fulfilled for the option to be valid and thus available to the user. Not to be confused with the [#Trigger](#trigger). | <pre><code>trigger = {<br>	has_trait = shy<br>}</code></pre> |
| show_as_unavailable | No | If the option is invalid, but this trigger is, the option will be shown, but disabled. This behavior is also influenced by the EVENT_OPTIONS_SHOWN_HIDE_UNAVAILABLE define. | <pre><code>show_as_unavailable = {<br>	short_term_gold &lt; medium_gold_value<br>}</code></pre> |
| trait | No | If the player has the given trait, show it on the left side of the option. Hovering over it will say the option is available because of the trait. This is only providing flavor, and does not actually affect the functionality of the option. | trait = honest |
| skill | No | Show the chosen skill on the left side of the option. Hovering over it will say the option is available because of your high skill. This is only providing flavor, and does not actually affect the functionality of the option. | skill = prowess |
| add_internal_flag | No | Can take the values "special" or "dangerous". The key "special" highlights the option as yellow, "dangerous" highlights the option as red. This is only providing flavor, and does not actually affect the functionality of the option. | add_internal_flag = special |
| highlight_portrait | No | Highlights the event portrait of this character while this option is hovered. This is in addition to the automatic highlighting when hovering an event option that has an effect that affects portrait characters. | highlight_portrait = scope:custom |
| fallback | No | If this is yes: if no other options meet their triggers, then this option will be shown even if its trigger is not met either. You can use this together with ``trigger = { always = no }`` to create an option that is only ever shown as a last resort. | fallback = yes |
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

    - Important:** double-check your path. This is a singular **on_action**, not on_actions. This is a common mistake.

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

    - Important:** effects and triggers cannot be appended directly. Only events and other on_actions are appended.

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

    - Important**: Do not use ``every_living_character`` in ``yearly_playable_pulse`` and similar on_actions.

That on_action already fires for every character. If you then try to iterate through all characters, that would result in about 20000<sup>2</sup> operations, causing massive lag and repetition of your effects.


### Properties

This table uses contents from */common/on_action/on_actions.info* file.

| **Name** | **Description** | **Expected type** | **Example** |
| --- | --- | --- | --- |
| trigger | On_actions can have triggers. If an on_action fires and its trigger returns false, nothing happens | boolean | <pre><code>trigger = {<br>	trigger_conditions = yes<br>}</code></pre> |
| weight_multiplier | Used to manipulate the weight of this on_action if it is a candidate in a random_on_actions list (see below) | integer | <pre><code>weight_multiplier = {<br>	base = 1<br>	modifier = {<br>		add = 1<br>		trigger_conditions = yes<br>	}<br>}</code></pre> |
| events | Events listed in "events" brackets will always fire as long as their trigger evaluates to true |  | <pre><code>events = {<br>	event_id_1<br>	delay = { days = 365 }		# A delay will mean that all events listed after it will only be fired after the delay has passed. NOTE: For performance reasons, an event will only successfully fire if it is valid both when the on_action is executed AND once the delay is complete. All firing entries support delays, whether for events or on_actions.<br>	event_id_2<br>	delay = { months = { 6 12 } }	# Setting a new delay overrides a previous delay. Delays support random ranges<br>	event_id_3<br>}</code></pre> |
| random_events | A single event will be picked to fire |  | <pre><code>random_events = {	# A single event will be picked to fire<br>		<br>	chance_to_happen = 25	# A percentage chance determining whether the events involved will be evaluated at all<br><br>	chance_of_no_event = { 	# An entry that can be formatted as a script value (and therefore have conditional entries). Separated from "chance_to_happen" for performance reasons. Will only be evaluated if chance_to_happen is true.<br>		value = 0<br>		if = {<br>			limit = { trigger_conditions = yes }<br>			add = 10<br>		}<br>	}<br><br>	100 = event_id_1 	# The number is the weight for picking a specific event. The weight is factored by the event's weight_multiplier entry. (If no weight_multiplier is defined for the event, it is 1)<br>	200 = event_id_2<br>	100 = 0		# Having a "0" entry means that there is a chance no event fires, even if there are other valid events. Good for making sure that rare events don't always fire just because every other possible event is invalid.<br><br>}</code></pre> |
| first_valid | Pick the first event for which the trigger returns true | List<event> | <pre><code>first_valid = {		# Pick the first event for which the trigger returns true<br>	event_id_1<br>	event_id_2<br>	fallback_event_without_trigger<br>}</code></pre> |
| on_actions | An on_action can fire other on_actions, following the same rules as with events | List<on_action> | <pre><code>on_actions = {	# An on_action can fire other on_actions, following the same rules as with events<br>	on_action_1<br>	on_action_2<br>	on_action_3<br>}</code></pre> |
| random_on_actions | Same as with events. On_actions are also factored by their weight_multipliers, which defaults to 1 |  | <pre><code>random_on_actions = {<br>	100 = on_action_1<br>	200 = on_action_2<br>	100 = 0<br>}</code></pre> |
| first_valid_on_action |  | List<on_action> | <pre><code>first_valid_on_action = {<br>	on_action_1<br>	on_action_2<br>}</code></pre> |
| effect | An on_action can run effects. It can access the same default or saved scopes as the script chain/code functionality it was fired from. Note that it happens concurrently to events triggered by the on_action, NOT before. Effects run here create a separate chain than events the on_action fires, so you can for example not manipulate values in the effect, and then reliably access those in an event that was fired at the same time. Scopes or local variables set in the effect here will not carry over to any event fired by the on_action. |  | <pre><code>effect = {<br>	effects = yes<br>}</code></pre> |
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

- [Event modding#On Actions (on action)](#on-actions-(on-action))
- [Story cycles modding](Story_cycles_modding.md)
- [Decisions modding](Decisions_modding.md)
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

## Extracted Code Blocks

<a id="code-block-1"></a>
### Code Block 1

```json
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Crusader Kings 3 - Snippets for Visual Studio Code.                                             //
//                                                                                                 //
// How to use in four easy steps:                                                                  //
// 1. Install [CWTools - Paradox Language Services] by Thomas Boby                                 //
// 2. Install [Paradox Syntax Highlighting] by Thomas Boby                                         //
// 3. Copy this file to ..AppData\Roaming\Code\User\snippets                                       //
// 4. That's it! Now just start typing the prefix of a snippet and press tab to insert it!         //
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Learn more: https://code.visualstudio.com/docs/editor/userdefinedsnippets                       //
// Use https://vscodesnippetgenerator.azurewebsites.net/, other tools convert tabs into spaces!!   //
/////////////////////////////////////////////////////////////////////////////////////////////////////

{
  "Legacy Duel": {
      "prefix": ["duel", "legacy duel"],
      "body": [
        "duel = {",
        "\tskill = learning",
        "\tvalue = average_skill_rating",
        "",
        "\t10 = { # Failure",
        "\t\t#desc = martial_authority_4001.fail.tt",
        "\t\tcompare_modifier = {",
        "\t\t\tvalue = scope:duel_value",
        "\t\t\tmultiplier = -1.5",
        "\t\t\tmin = -5",
        "\t\t}",
        "",
        "\t\tsend_interface_toast = {",
        "\t\t\ttype = event_toast_effect_bad",
        "\t\t\ttitle = death_bleeder",
        "\t\t\tleft_icon = root",
        "\t\t\t",
        "\t\t\tadd_prestige = minor_prestige_loss",
        "\t\t}",
        "\t}",
        "\t10 = { # Success",
        "\t\t#desc = bp1_yearly.1031.c_killed_all.tt",
        "\t\tcompare_modifier = {",
        "\t\t\tvalue = scope:duel_value",
        "\t\t\tmultiplier = 1.5",
        "\t\t}",
        "",
        "\t\tsend_interface_toast = {",
        "\t\t\ttype = event_toast_effect_good",
        "\t\t\ttitle = tribal.1101.a_success",
        "\t\t\tleft_icon = root",
        "\t\t\t",
        "\t\t\tadd_prestige = medium_prestige_gain",
        "\t\t}",
        "\t}",
        "}"
      ],
      "description": "A legacy duel powered by a random list."
  },

  "Combat Duel": {
      "prefix": ["duel", "combat duel", "fight"],
      "body": [
        "configure_start_single_combat_effect = {",
        "\tSC_INITIATOR = scope:actor ",
        "\tSC_ATTACKER = scope:actor",
        "\tSC_DEFENDER = scope:recipient",
        "\tFATALITY = default",
        "\tFIXED = no",
        "\tLOCALE = terrain_scope",
        "\tOUTPUT_EVENT = single_combat.1006",
        "\tINVALIDATION_EVENT = single_combat.1006",
        "}"
        ],
      "description": "A combat duel using the new duelling system."
  },

  "Hidden Event": {
      "prefix": ["event", "hidden event"],
      "body": [
          "yournamespace.0000 = {",
          "\thidden = yes",
          "",
          "\timmediate = {",
          "\t\t",
          "\t}",
          "}"
        ],
      "description": "A hidden event, does not render UI or present any options. Utilized for the automation of certain tasks, such as sieges or timed outcomes."
  },

  "Simple Event": {
      "prefix": ["event", "simple event"],
      "body": [
        "yournamespace.0000 = {",
        "\ttype = character_event",
        "\ttitle = stewardship_domain_special.1424.a",
        "\tdesc = stewardship_domain_special.1424.a",
        "",
        "\ttheme = mental_break",
        "\tleft_portrait = root",
        "",
        "\ttrigger = {",
        "\t\t",
        "\t}",
        "",
        "\timmediate = {",
        "\t\t",
        "\t}",
        "",
        "\toption = {",
        "\t\tname = stewardship_domain_special.1424.a",
        "\t}",
        "}"
        ],
      "description": "A simple event template containing all of the basics."
  },

  "Advanced Event": {
      "prefix": ["event", "advanced event"],
      "body": [
        "yournamespace.0000 = {",
        "\ttype = character_event",
        "\ttitle = stewardship_domain_special.1424.a",
        "\tdesc = stewardship_domain_special.1424.a",
        "",
        "\ttheme = mental_break",
        "\toverride_background = { reference = throne_room }",
        "\tleft_portrait = {",
        "\t\tcharacter = root",
        "\t\tanimation = idle",
        "\t}",
        "\tright_portrait = {",
        "\t\tcharacter = root",
        "\t\tanimation = idle",
        "\t}",
        "",
        "\tcooldown = { years = 5 }",
        "",
        "\ttrigger = {",
        "",
        "\t}",
        "",
        "\timmediate = {",
        "",
        "\t}",
        "",
        "\toption = {",
        "\t\tname = stewardship_domain_special.1424.a",
        "",
        "\t\ttrigger = {",
        "",
        "\t\t}",
        "",
        "\t\tai_chance = {",
        "\t\t\tbase = 50",
        "\t\t\tmodifier = {",
        "\t\t\t\tadd = 25",
        "\t\t\t\talways = yes",
        "\t\t\t}",
        "",
        "\t\t\tai_value_modifier = {",
        "\t\t\t\tai_boldness = 0.5",
        "\t\t\t\tai_compassion = 0.5",
        "\t\t\t\tai_greed = 0.5",
        "\t\t\t\tai_energy = 0.5",
        "\t\t\t\tai_honor = 0.5",
        "\t\t\t\tai_rationality = 0.5",
        "\t\t\t\tai_sociability = 0.5",
        "\t\t\t\tai_vengefulness = 0.5",
        "\t\t\t\tai_zeal = 0.5",
        "\t\t\t}",
        "\t\t}",
        "\t}",
        "}"
        ],
      "description": "An advanced event template containing everything a content designer could desire."
  },

  "Generate Character": {
      "prefix": ["create character", "character", "generate character"],
      "body": [
        "create_character = {",
        "\tage = { 20 32 }",
        "\tlocation = root.capital_province",
        "\tgender_female_chance = root_faith_dominant_gender_female_chance",
        "\tculture = root.culture",
        "\tfaith = root.faith",
        "\trandom_traits = yes",
        "\ttrait = blind",
        "\tmartial = { 3 10 }",
        "",
        "\tdynasty = none",
        "\tafter_creation = { ",
        "\t\tadd_gold = { minor_gold_value medium_gold_value }",
        "\t\tadd_prestige = { minor_prestige_gain medium_prestige_gain }",
        "\t\tadd_piety = { minor_piety_gain medium_piety_gain }",
        "\t}",
        "",
        "\tsave_scope_as = generated_actor",
        "}"
        ],
      "description": "Runtime character generation for event usage."
  },

  "Random Chance": {
      "prefix": ["random"],
      "body": [
          "random = {",
          "\tchance = 25",
          "\tadd_trait = Typhus",
          "}"
        ],
      "description": "A random chance for something to happen. Can use weights."
  },

  "Random List": {
      "prefix": ["list", "random list"],
      "body": [
          "random_list = {",
          "\t50 = { add_gold = 25 }",
          "\t50 = { add_gold = 500 }",
          "}"
        ],
      "description": "A list of possibilities. One will always be picked, can use weights and triggers."
  },

  "Banner Notification": {
      "prefix": ["notification", "toast", "interface", "banner notification", "send_interface_toast"],
      "body": [
          "send_interface_toast = {",
          "\ttype = event_toast_effect_bad",
          "\ttitle = stress_threshold_prison.1041.t",
          "\tleft_icon = ROOT",
          "",
          "\tadd_stewardship_lifestyle_xp = minor_lifestyle_experience",
          "\tadd_piety = -15",
          "}"
        ],
      "description": "An interface element displayed at the top of the screen."
  },

  "Message Notification": {
      "prefix": ["notification", "message", "interface", "message notification", "send_interface_message"],
      "body": [
          "send_interface_message = {",
          "\ttype = event_stewardship_neutral",
          "\ttitle = hold_court.6180.t",
          "\tleft_icon = scope:client",
          "\tright_icon = ROOT",
          "",
          "\tadd_gold = 50",
          "}"
        ],
      "description": "An interface element displayed in the corner of the screen."
  },

  "Triggered Animation": {
      "prefix": ["triggered animation", "animation"],
      "body": [
          "triggered_animation = {",
          "\ttrigger = { always = yes }",
          "\tanimation = beg",
          "}"
        ],
      "description": "Allows you to make conditional animations, works as a first_valid."
  },

  "Desc Jenga": {
      "prefix": ["Desc Jenga"],
      "body": [
        "desc = { # Desc Jenga!",
        "\ttriggered_desc = {",
        "\t\ttrigger = { always = yes }",
        "\t\tdesc = {",
        "\t\t\tdesc = stress_threshold.3201.depressed.gain",
        "\t\t\tdesc = {",
        "\t\t\t\tfirst_valid = {",
        "\t\t\t\t\ttriggered_desc = {",
        "\t\t\t\t\t\ttrigger = { always = yes }",
        "\t\t\t\t\t\tdesc = stress_threshold.3201.depressed.effect",
        "\t\t\t\t\t}",
        "\t\t\t\t\ttriggered_desc = {",
        "\t\t\t\t\t\ttrigger = { always = no }",
        "\t\t\t\t\t\tdesc = stress_threshold_prison.1041.flagellant",
        "\t\t\t\t\t}",
        "\t\t\t\t\tdesc = court_maintenance.0010.b.paranoid",
        "\t\t\t\t}",
        "\t\t\t}",
        "\t\t}",
        "\t}",
        "}"
        ],
      "description": "Prints every desc command for use in scripted loc."
  },

  "Script Header List": {
    "prefix": ["script header list", "header", "index"],
    "body": [
      "### EVENT LIST ####################################################################",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "## XXXX - XXXX\tEvent Name Here by Author Name Here",
      "###################################################################################"
    ],
    "description": "A list containing all events on a script file, useful for organization."
  },

  "Event Header": {
    "prefix": ["event header", "header"],
    "body": [
      "###################################",
      "# Your event title here",
      "# By Your name here",
      "###################################"
    ],
    "description": "A header comment for scripts, containing name and author."
  },

  "Decision": {
    "prefix": ["decision"],
    "body": [
      "the_name_of_your_decision = {",
      "\tpicture = \"gfx/interface/illustrations/decisions/decision_destiny_goal.dds\"",
      "\tdesc = secure_iberian_foothold_decision_desc",
      "\tsort_order = 100",
      "\tmajor = no",
      "",
      "\tis_shown = {",
      "",
      "\t}",
      "",
      "\tis_valid = {",
      "\t\t",
      "\t}",
      "",
      "\teffect = {",
      "\t\t",
      "\t}",
      "",
      "\tcost = {",
      "",
      "\t}",
      "",
      "\tai_check_interval = 32",
      "\tai_potential = {}",
      "\tai_will_do = {",
      "\t\tbase = 100",
      "\t}",
      "}"
  ],
    "description": "Simple decision template."
  },

  "Interaction": {
    "prefix": ["interaction"],
    "body": [
      "your_interaction_name_here_interaction = {",
      "\ticon = debug_bad",
      "\tcategory = interaction_category_diplomacy",
      "\tcommon_interaction = yes",
      "",
      "\tinterface_priority = 200",
      "\tdesc = steward_task.1101.notification",
      "\t",
      "\tai_targets = {",
      "",
      "\t}",
      "\tai_target_quick_trigger = {",
      "\t\tadult = yes",
      "\t}",
      "\tai_frequency = 24",
      "\t",
      "\tcooldown_against_recipient = { years = 3 } # Very optional",
      "",
      "\tis_shown = {",
      "",
      "\t}",
      "",
      "\tis_valid_showing_failures_only = {",
      "",
      "\t}",
      "\t",
      "\tai_min_reply_days = 1",
      "\tai_max_reply_days = 5",
      "\tai_accept = {",
      "\t\tbase = 0",
      "\t}",
      "\t",
      "\tauto_accept = {",
      "\t\tcustom_description = {",
      "\t\t\ttext = \"spending_hook\"",
      "\t\t\tsubject = scope:actor",
      "\t\t\tobject = scope:recipient",
      "\t\t\tscope:hook = yes",
      "\t\t}",
      "\t}",
      "\t",
      "\tsend_options_exclusive = no",
      "\tsend_option = {",
      "\t\tis_shown = {",
      "\t\t\tNOT = { scope:actor = scope:recipient }",
      "\t\t}",
      "\t\tis_valid = {",
      "\t\t\tscope:actor = {",
      "\t\t\t\thas_usable_hook = scope:recipient",
      "\t\t\t}",
      "\t\t}",
      "\t\tflag = hook",
      "\t\tlocalization = GENERIC_SPEND_A_HOOK",
      "\t}",
      "\tshould_use_extra_icon = {",
      "\t\tscope:actor = { has_usable_hook = scope:recipient }",
      "\t}",
      "\textra_icon = \"gfx/interface/icons/character_interactions/hook_icon.dds\"",
      "\t",
      "\ton_accept = {",
      "",
      "\t}",
      "",
      "\ton_decline = {",
      "",
      "\t}",
      "\t",
      "\tai_potential = {",
      "",
      "\t}",
      "",
      "\tai_will_do = {",
      "\t\tbase = 0",
      "\t}",
      "}"
    ],
    "description": "Simple interaction template."
  },

  "AI Weights": {
    "prefix": ["ai weights", "weights"],
    "body": [
        "ai_value_modifier = {",
        "\tai_boldness = 0.5",
        "\tai_compassion = 0.5",
        "\tai_greed = 0.5",
        "\tai_energy = 0.5",
        "\tai_honor = 0.5",
        "\tai_rationality = 0.5",
        "\tai_sociability = 0.5",
        "\tai_vengefulness = 0.5",
        "\tai_zeal = 0.5",
        "}"
      ],
    "description": "Component with all AI weights for event options."
  },

  "Valid Combatant Trigger": {
    "prefix": ["valid combatant trigger"],
    "body": ["can_be_combatant_based_on_gender_trigger = { ARMY_OWNER = liege }"],
    "description": "Trigger component used to check if a character can be an active combatant."
  },

  "Letter Event": {
    "prefix": ["letter event", "event"],
    "body": [
      "yournamespace.0000 = {",
      "\ttype = letter_event",
      "\tsender = root",
      "\topening = court_amenities_interactions.0001.a",
      "\tdesc = yearly.1040.a",
      "",
      "\timmediate = {",
      "",
      "\t}",
      "",
      "\toption = {",
      "\t\tname = trait_specific.8501.d",
      "\t}",
      "}"
    ],
    "description": "Creates a barebones letter event, for usage when two characters interact."
  },

  "Struggle Event": {
    "prefix": ["struggle event"],
    "body": [
      "DLC_struggle.0000 = {",
      "\ttype = fullscreen_event",
      "\ttitle = bp1_yearly.5722.t",
      "\tdesc = bp1_yearly.5719.a",
      "\ttheme = realm",
      "\toverride_background = { reference = fp2_fullscreen_intro }",
      "\toverride_sound = { reference = \"event:/DLC/FP2/SFX/UI/fp2_struggle_ui_intro_animate\" }",
      "",
      "\twidgets = {",
      "\t\twidget = {",
      "\t\t\tgui = \"event_window_widget_struggle_info\"",
      "\t\t\tcontainer = \"dynamic_content_widget\"",
      "\t\t\tcontroller = struggle_info",
      "\t\t\tsetup_scope = { struggle:YOUR_STRUGGLE_HERE = { save_scope_as = struggle } }",
      "\t\t}",
      "\t}",
      "",
      "\timmediate = {",
      "",
      "\t}",
      "",
      "\toption = {",
      "\t\tname = dynn_Hardegg",
      "\t\tclicksound = \"event:/DLC/FP2/SFX/UI/fp2_struggle_start_select\"",
      "\t}",
      "}"
    ],
    "description": "Full-screen event used for struggles (intros, endings, etc)."
  },

  "Stress Impact": {
    "prefix": "stress impact",
    "body": [
        "stress_impact = {",
        "\twrathful = major_stress_impact_gain",
        "\tcompassionate = medium_stress_impact_gain",
        "\tlifestyle_gardener = minor_stress_impact_loss",
        "}"
    ],
    "description": "stress impact with examples, good for options."
  },

  "Add Opinion": {
    "prefix": ["add opinion", "opinion modifier"],
    "body": [
        "add_opinion = {",
        "\ttarget = scope:count_reinhard_von_lohengramm",
        "\tmodifier = rebellious_vassal_opinion",
        "\topinion = 25",
        "\tyears = 10",
        "}"
    ],
    "description": "pre-filled opinion effect for affecting the opinion of the scope character towards the scoped character."
  }
}
```

---

*Source: https://ck3.paradoxwikis.com/Event_modding*
