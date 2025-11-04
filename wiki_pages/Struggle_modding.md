# Struggle modding

> *This article is timeless and should be accurate for any version of the game.*


> ⚠️ **This section needs expansion**


In Crusader Kings III, it is possible to mod a pre existing, or create your own, struggle.

- [Setup](#setup)
  - [Cultures and Faiths](#cultures-and-faiths)
  - [Regions](#regions)
  - [Conditions](#conditions)
    - [Involvement prerequisite percentage](#involvement-prerequisite-percentage)
  - [Textures/2D-Graphics](#textures2d-graphics)
    - [Struggle-phase Background's](#struggle-phase-backgrounds)
    - [Struggle-phase Icon's](#struggle-phase-icons)
- [Starting the struggle](#starting-the-struggle)
  - [Starting the Struggle](#starting-the-struggle)
- [Phases](#phases)
  - [Phases](#phases)
    - [Phase effects](#phase-effects)
  - [Catalysts](#catalysts)
    - [Creating a catalysts](#creating-a-catalysts)
    - [Localization](#localization)
    - [Defining catalysts in struggle phases](#defining-catalysts-in-struggle-phases)
- [Other modding tutorials](#other-modding-tutorials)


## Setup


### Cultures and Faiths

You need to specify what cultures/ faiths are allowed in the struggle if your making a new one, so not everyone is an interloper. if you're editing an existing one then add the culture/ faiths you want, just remember to use their script name so check out [Culture modding](Culture_modding.md) and [Religions modding](Religions_modding.md). This a shortened example from the Iranian Intermezzo:
```
cultures = {
	# Iranian
	persian
	kurdish

	# Arabic
	bedouin
}
faiths = {
	# Islamic
	ashari
	zayidi

	# Zoroastrian
	mazdayasna
	khurmazta
}
```


### Regions

Regions are the regions as described in [Map modding](Map_modding.md). This is the example from the Iranian Intermezzo:
```
regions = {
	world_persian_empire
	ghw_region_kurdistan
}
```


### Conditions

Those are the conditions needed for a faith and/or culture to join the struggle. There is no way for a uninvolved faith/culture to become involved if none of those are specified.

#### Involvement prerequisite percentage

The percentage of *all* counties of given faith or culture, that need to be inside the struggle region, for the faith or culture to become involved. Note that there is no way to differentiate between culture requirements and faith requirements, the ratio applies to, and allows both. Also note, that if culture or faith has a (1 - involvement_prerequisite_percentage) * (total struggle region counties) counties outside the struggle or more, it's not possible for them to get involved within the struggle. Example from Iberian struggle:
```
# A culture or faith becomes involved if 80% of the total number of counties belonging to it are inside the struggle region.
involvement_prerequisite_percentage = 0.8
```

Due to region of world_europe_west_iberia having 87 counties, a religion or a culture can have at most 21 counties outside Iberia before it's impossible for them to get involved by presence within the Iberian struggle.

Involvement prerequisite percentage is currently the only way to define a requirement allowing religions and cultures to automatically become involved (i.e. Not through a decision/event)


### Textures/2D-Graphics


#### Struggle-phase Background's

Struggle backgrounds (gfx/interface/illustrations/struggle_backgrounds) load automatically if named using this pattern: *custom_struggle_phase_bg.dds*


#### Struggle-phase Icon's

Phase Icons have to be set in gui/texticons.gui and the game_concepts for your struggle phases.

Example for game_concepts:
```lua
custom_struggle = {
	alias = { struggle_custom }
	parent = struggle
	requires_dlc_flag = the_fate_of_iberia
}

struggle_phase_custom_1 = {
	texture = "gfx/interface/icons/struggle_types/struggle_custom_phase_1.dds"
	parent = custom_struggle 
	requires_dlc_flag = the_fate_of_iberia
}
```

Example for texticons.txt:
```lua
texticon = {
	icon = struggle_custom_phase_1
	iconsize = {
		texture = "gfx/interface/icons/struggle_types/struggle_custom_phase_1.dds"
		size = { 25 25 }
		offset = { 0 6 }
		fontsize = 16
	}
}
```


## Starting the struggle

Before you can start a custom struggle you need the on_start and the on_join sections. These are (shortened) examples from the Iranian Intermezzo:

on_start:
```
on_start = {
	# Start the over-time catalysts.
	trigger_event = neutral_struggle.0001
	# Tell the AI to change sides every now and then.
	trigger_event = {
		id = fp3_struggle.0001
		years = { 1 5 }
	}
}
```

on_join:
```
# Root = the character which has joined the struggle
 	on_join = {
		if = {
			limit = {[some condition]}
			add_trait = fp3_struggle_supporter
		}
		else_if = {
			limit = {
				NOR = {
					has_trait = fp3_struggle_supporter
					has_trait = fp3_struggle_detractor
				}
			}
			add_trait = fp3_struggle_detractor
		}

		if = {
			limit = { is_ai = no }
			trigger_event = fp3_struggle.0051
		}
 	}
```


### Starting the Struggle

To actually have your custom struggle appear ingame you need to trigger it from somewhere. A way to do that is to add a scripted effect similar to the one below, to an 'on_game_start' on_action.
```python3
enable_custom_struggle_effect = {	
	start_struggle = {
		struggle_type = custom_struggle
		start_phase = struggle_custom_phase_1
	}
	struggle:custom_struggle ?= {
		trigger_event = { on_action = custom_struggle_starting_events } # the on_start section in the struggle script often doesn't work, which is why many modders trigger their starting events from here
	}
}
```

Example for on_game_start on_action (the Vanilla file is in: game/common/on_action/game_start.txt):
```python3
1. Empty scope
on_game_start = {
	enable_custom_struggle_effect = yes
[...]
}
```


## Phases

Every struggle needs a phase to start. The Iranian Intermezzo has 2 phases, plus an ending phase which is concession, and starts on the unrest phase, while the Iberian Struggle has 3 phases, plus an ending phase which is compromise, and starts in the opportunity phase. Every phase need catalysts, catalysts are what gets you to the next phase, they can be all unique for each phase or the same for every phase. Catalysts are made in a separate folder inside the Struggle folder.


### Phases

The phases start with start_phase = [your 1st phase], then it will go to 
```
phase_list = {
    [your phase 1] = {
        duration = { [how long you want it based on the points given by each catalyst] }
        
        future_phases = {
            [your phase 1, 2, 3...] = {
                catalysts = {
                    [your catalyst 1]
                    [your catalyst 2]
                    [your catalyst 3]...
                }
            }
        }
        
        [all the effect] = {
            [effects]
        }
        
        [all the effect] = {
            [effects]
        }
    }
    
    [your phase 2] = {
        [everything from phase 1]
    }
}
```

Below is a list of all parameters that can be set for a struggle phase:

<details>
<summary></summary>


| **Attribute** | **Type** | **Description** | **Example** | **Default value** |
| --- | --- | --- | --- | --- |
| duration |  | Changes the duration of a phase. It can either be point based or time based.<br>Point based use the parameter ``points`<code style="white-space: pre">.<br><br>Time based use the parameter </code>`days`, `weeks`, `months` or `years``. | duration = { points = 500 } | points = POINT_BASED_PHASE_DEFAULT_DURATION # 1000 |
| future_phases | list&lt;Phases&gt; | Defines the phases that the parent phase can be pushed into.<br>Each phase can have its [catalysts](#catalysts) defined.<br><br>See below for detailed [catalyst definition in phases](#defining-catalysts-in-struggle-phases). | future_phases = {<br> 	struggle_persia_phase_unrest = {<br> 		catalysts = { ... }<br> 	}<br> 	struggle_persia_ending_phase_concession = {<br> 		catalysts = { ... }<br> 	}<br> } | Empty<br>There has to be at least one phase. |
| war_effects<br>culture_effects<br><br>faith_effects<br><br>other_effects | localization key<br>or <br><br>list&lt;list&lt;Effects&gt;&gt; | Defines the war, culture, faith or other effects of the current phase.<br>See below for detailed [phase effects](#phase-effects) parameters. | war_effects = {<br> 	name = WAR_EFFECTS_NAME<br> 	common_parameters = {<br> 		...<br> 	}<br> 	involved_character_modifier = {<br> 		...<br> 	}<br> } | Empty |
| ending_decisions | list&lt;Decisions> | Defines the ending decisions that can be accessed during this phase. | ending_decisions = {<br> 	struggle_persia_ending_foundation_decision<br> 	struggle_persia_ending_assertion_decision<br> 	struggle_persia_ending_rekindle_iran_decision<br> } | Empty<br>At least one Phase needs to have an Ending Decision. |


</details>


Shortened Example for a phase from the Iranian Intermezzo:
```
phase_list = {
	struggle_persia_phase_stabilisation = {
		duration = { points = 500 }

		future_phases = {
			struggle_persia_phase_unrest = {
				catalysts = {
					# Global
					catalyst_yearly_influential_house_is_antagonistic_major = major_struggle_catalyst_gain
					catalyst_yearly_influential_house_is_antagonistic_medium = medium_struggle_catalyst_gain
					catalyst_yearly_influential_house_is_antagonistic_minor = minor_struggle_catalyst_gain
					catalyst_yearly_influential_house_is_antagonistic_minimal = minimal_struggle_catalyst_gain

					[more catalysts]
				}
			}

			struggle_persia_ending_phase_concession = {
			# Catalyst values are low here because we track this stuff across every phase, so they need to take _roughly_ ~100-120 years to build up, all else being equal.
				catalysts = {
					catalyst_passing_of_time = catalyst_fp3_yearly_time_out_ending_drift

					# Supporter / Detractor dynamic
					catalyst_war_ends_in_white_peace_between_supporter_detractor = minor_struggle_catalyst_gain
					catalyst_became_best_friend_soulmate_supporter_detractor = minor_struggle_catalyst_gain
					catalyst_became_friend_lover_supporter_detractor = minimal_struggle_catalyst_gain
					catalyst_forming_alliance_between_supporter_detractor_rulers = catalyst_forming_alliance_between_supporter_detractor_rulers_value
					catalyst_abandon_hook_on_supporter_detractor = minor_struggle_catalyst_gain
					catalyst_grants_pardon_supporter_detractor = minimal_struggle_catalyst_gain
					catalyst_release_supporter_detractor = minor_struggle_catalyst_gain
					catalyst_ransom_supporter_detractor = minimal_struggle_catalyst_gain
					catalyst_grants_vassal_to_de_jure_liege_supporter_detractor = minor_struggle_catalyst_gain
					catalyst_gift_supporter_detractor_ruler = minimal_struggle_catalyst_gain

					[more catalysts]
				}
			}
		}

		war_effects = {
			name = WAR_EFFECTS_NAME
			# lower cost and higher gain for external wars
			common_parameters = {
				apply_truce_when_sending_ward = yes
				invasion_conquest_war_cannot_be_declared = yes
			}

			involved_character_modifier = {
				# Everyone hires soldiers, either to maintain the peace or ready for the next phase of war.
				men_at_arms_recruitment_cost = -0.5
				men_at_arms_maintenance = -0.25
				# This pumps some characters up.
				glory_hound_ai_energy = very_high_positive_ai_value
				glory_hound_ai_boldness = very_high_positive_ai_value
			}

			interloper_character_modifier = {
				# Interlopers benefit a little here too.
				men_at_arms_recruitment_cost = -0.25
			}
		}

		faith_effects = {
			name = FAITH_EFFECTS_NAME

			involved_parameters = {
				piety_from_new_alliance = yes
				completing_building_in_temple_gives_piety = yes
				same_faith_friend_piety_gain = yes
			}

			involved_character_modifier = {
				# The Sunni Caliphate consolidates - everyone else closes ranks too.
				same_faith_opinion = 20
				# Whilst bunkering down and arguing 
				minority_different_faith_opinion = -20
			}
		}

		culture_effects = {
			name = CULTURE_EFFECTS_NAME

			involved_parameters = {
				learning_languages_gives_prestige = yes
				granting_title_to_local_noble_gives_prestige = yes
				gain_acceptance_when_developing_other_culture_county = yes
				release_prisoner_diff_culture_gives_prestige = yes
			}

			involved_character_modifier = {
				# Solidarity within cultural blocks.
				same_culture_opinion = 10
				opinion_of_same_culture = 10
				# Authority figures work to reestablish themselves.
				cultural_head_acceptance_gain_mult = 0.5
			}
		}

		other_effects = {
			name = OTHER_EFFECTS_NAME
			involved_parameters = {
				struggle_unlocks_befriend_schemes_for_everyone = yes
				unlocks_epic_commission_for_independent_rulers = yes
				granting_independence_to_non_dejure_gives_renown = yes
				unlocks_claim_throne_for_caliph_vassals = yes
				less_dissolution_more_claimants = yes

				# Note: this parameter doesn't _do_ anything, it's just for the tooltip.
				## You need to manually set/clear the "struggle_block_dissolution_faction" variable on affected titles instead.
				### We do it this way to save a bit on performance.
				caliph_cant_be_dissolutioned = yes
			}
			involved_character_modifier = {
				castle_holding_build_gold_cost = -0.3
			}
			interloper_parameters = {
				less_dissolution_more_claimants = yes
			}
		}

		ending_decisions = {
			struggle_persia_ending_foundation_decision # renamed Tempering the Caliphate
			struggle_persia_ending_assertion_decision # renamed Strenghten the Caliphate
			struggle_persia_ending_rekindle_iran_decision
		}
	}
}
```


#### Phase effects

Phase effects have three categories : ``war_effects``, ``culture_effects``, ``faith_effects`` and ``other_effects``. Each categories can have parameters, character modifiers and country modifiers defined.

Below is a list of phase effects that can be set for a struggle phase:

| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| name | localization key | Name of the effect group. The key is used in tooltips. | name = WAR_EFFECTS_NAME |
| common_parameters | list | Parameters that generally affect everyone in the Struggle. (For grouping effect descriptions) | common_parameters = {<br> 	apply_truce_when_sending_ward = yes<br> 	invasion_conquest_war_cannot_be_declared = yes<br> } |
| involved_parameters | list | Parameters that affect Involved in the Struggle. (For grouping effect descriptions) | common_parameters = {<br> 	apply_truce_when_sending_ward = yes<br> 	invasion_conquest_war_cannot_be_declared = yes<br> } |
| interloper_parameters | list | Parameters that affect Interlopers in the Struggle. (For grouping effect descriptions) | common_parameters = {<br> 	apply_truce_when_sending_ward = yes<br> 	invasion_conquest_war_cannot_be_declared = yes<br> } |
| uninvolved_parameters | list | Parameters that affect Uninvolved in the Struggle. (For grouping effect descriptions) | common_parameters = {<br> 	apply_truce_when_sending_ward = yes<br> 	invasion_conquest_war_cannot_be_declared = yes<br> } |
| involved_character_modifier | list | Character Modifiers applied on involved characters | involved_character_modifier = {<br> 	men_at_arms_recruitment_cost = -0.5<br> 	men_at_arms_maintenance = -0.25<br> 	glory_hound_ai_energy = very_high_positive_ai_value<br> 	glory_hound_ai_boldness = very_high_positive_ai_value<br> } |
| interloper_character_modifier | list | Character Modifiers applied on interloper characters | involved_character_modifier = {<br> 	men_at_arms_recruitment_cost = -0.5<br> 	men_at_arms_maintenance = -0.25<br> 	glory_hound_ai_energy = very_high_positive_ai_value<br> 	glory_hound_ai_boldness = very_high_positive_ai_value<br> } |
| involved_doctrine_character_modifier | list | Applied to involved characters if they have the given doctrine | involved_character_modifier = {<br> 	men_at_arms_recruitment_cost = -0.5<br> 	men_at_arms_maintenance = -0.25<br> 	glory_hound_ai_energy = very_high_positive_ai_value<br> 	glory_hound_ai_boldness = very_high_positive_ai_value<br> } |
| interloper_doctrine_character_modifier | list | Applied to interloper characters if they have the given doctrine | involved_character_modifier = {<br> 	men_at_arms_recruitment_cost = -0.5<br> 	men_at_arms_maintenance = -0.25<br> 	glory_hound_ai_energy = very_high_positive_ai_value<br> 	glory_hound_ai_boldness = very_high_positive_ai_value<br> } |
| all_county_modifier | list | County Modifiers applied to all Involved County within the struggle | interloper_county_modifier = {<br> 	levy_size = 0.5<br> 	garrison_size = -0.25<br> } |
| involved_county_modifier | list | County Modifiers applied to all the Involved County owned by involved characters | interloper_county_modifier = {<br> 	levy_size = 0.5<br> 	garrison_size = -0.25<br> } |
| interloper_county_modifier | list | County Modifiers applied to all the Involved County owned by interloper characters | interloper_county_modifier = {<br> 	levy_size = 0.5<br> 	garrison_size = -0.25<br> } |
| uninvolved_county_modifier | list | County Modifiers applied to all the Involved County owned by uninvolved characters | interloper_county_modifier = {<br> 	levy_size = 0.5<br> 	garrison_size = -0.25<br> } |


### Catalysts


#### Creating a catalysts

Catalysts are defined in ``common/struggle/catalysts``.

If you're going to give each phases its own unique catalyst, then just be warned it's a lot more time consuming.


#### Localization

The vanilla files are located at ``localization/&lt;language&gt;/struggles/struggle_catalysts_l_&lt;language&gt;.yml``.

| **Localization key** | **Description** | **Example** |
| --- | --- | --- |
| CATALYST | Name of the catalyst | `catalyst_passing_of_time:1 "Yearly Drift [struggle_catalyst_catalyst\|E]"` |
| CATALYST_desc | Description of the catalyst | `catalyst_passing_of_time_desc:2 "Yearly Drift: natural flow towards this [struggle_phase\|E]"` |


#### Defining catalysts in struggle phases

Catalysts must be put in the ``future_phases`` parameter of a [phase](#phases-2) to be used in a struggle, like this:
```
following_phase = {
	catalysts = {
		CATALYST_KEY = NUMBER
	}
}
```

Vanilla catalysts uses pre-defined values for catalysts, defined in ``common/script_values/00_struggles_values.txt``. The vanilla values are:

| **Key** | **Value** |
| --- | --- |
| minimal_struggle_catalyst_gain | 1 |
| minor_struggle_catalyst_gain | 3 |
| medium_struggle_catalyst_gain | 5 |
| major_struggle_catalyst_gain | 10 |
| massive_struggle_catalyst_gain | 20 |
| monumental_struggle_catalyst_gain | 50 |
| minimal_struggle_catalyst_over_time_gain | 1 |
| minor_struggle_catalyst_over_time_gain | 2 |
| medium_struggle_catalyst_over_time_gain | 3 |
| major_struggle_catalyst_over_time_gain | 5 |
| massive_struggle_catalyst_over_time_gain | 10 |
| monumental_struggle_catalyst_over_time_gain | 20 |


Example:
```
struggle_iberia_phase_hostility = {
	catalysts = {
		catalyst_passing_of_time = minimal_struggle_catalyst_over_time_gain
		catalyst_gain_claim_on_title_fp2 = minor_struggle_catalyst_gain
	}
}
```


## Other modding tutorials


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Struggle_modding*
