# Holdings modding

> **Note:** Last verified for version 1.3


- [Creating a Holding](#creating-a-holding)
- [Variables](#variables)
- [Game Concept](#game-concept)
- [Modifiers](#modifiers)
    - [List of generated modifiers](#list-of-generated-modifiers)
- [Localization](#localization)
- [Adding more buildings](#adding-more-buildings)


### Creating a Holding

Holdings are defined in `/Crusader Kings III/game/common/holdings`


**Example**

```
my_holding = {
	primary_building = my_01

	buildings = {
		mychurch_01
		mycastle_01
		myarmoury_01
	}

	flag = myflag
}
```


### Variables


| **Variable** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| primary_building | string | The key of the building that is generated at the start. | primary_building = tribe_01 |
| buildings | block | Assign what buildings are available for this holding type | buildings = {<br>		palisades_01<br><br>		war_camps_01<br><br>		longhouses_01<br><br>		market_villages_01<br><br>	} |
| flag | string | Optional flags that are assigned to the holding type | flag = tribal |
| can_be_inherited | bool | Can the holding type be inherited. | can_be_inherited = yes |


### Game Concept

You can also add .dds icon for your holding in `/Crusader Kings III/game/game/common/game_concepts`

```
my_holding = {
	alias = { my mine mine_holding }
	parent = holding_type
	texture = "gfx/interface/icons/my_holding_icon.dds"
}
```


### Modifiers

Upon loading holding types, modifiers are automatically generated.
You can then modify them in `/Crusader Kings III/game/game/common/modifiers` (they are not declared there)

If you want your mod to have a modifier that modifies build speed then it's as simple as:

```
my_modifier = {
	icon = my_icon
	my_holding_build_speed = -0.25
}
```


##### List of generated modifiers

- &lt;holding_type&gt;_build_speed
- &lt;holding_type&gt;_build_gold_cost
- &lt;holding_type&gt;_build_piety_cost
- &lt;holding_type&gt;_build_prestige_cost
- &lt;holding_type&gt;_holding_build_speed
- &lt;holding_type&gt;_holding_build_gold_cost
- &lt;holding_type&gt;_holding_build_piety_cost
- &lt;holding_type&gt;_holding_build_prestige_cost


### Localization

Example:

```
my_holding:0 "Holding"
my_holding_concept_key:0 "[mine|E]"
```


### Adding more buildings

Buildings are defined in `/Crusader Kings III/game/game/common/buildings`

**Building Structure**

```
name_of_the_building = {

	# How many levies does the building give
	levy = 200

	# How much garrison does the building give
	max_garrison = 100

	# How much garrison regains a percentage of its maximal garrison equal to the garrison reinforcement rate
	garrison_reinforcement_factor = 0.01

	# How long does it take to construct the building
	construction_time = 720

	type = regular/special/duchy_capital	# Specifies whether this is a regular building, a special building, or a duchy capital building. Regular by default

	# Which asset does the building use
	asset = {
		# 'pdxmesh' or 'entity', specifies wheter to use a mesh or an entity. Meshes are more performant and should be preferred.
		type = pdxmesh
		# The name of the mesh or the entity
		name = "western_castle_01_level_03_mesh"
		# To randomize between multiple meshes/entities. Note that they must all be entities, or all be meshes:
		names = { "western_castle_01_level_03a_mesh" "western_castle_01_level_03b_mesh" "western_castle_01_level_03c_mesh" }
		# Path to illustration shown in the county view, texture can be accessed in GUI: "[Holding.GetIllustration]"
		illustration = "path/to/image.dds"
		# Associated sound effect and an optional parameter, can also be just soundeffect = "event:..." if no parameter is needed
		soundeffect = { soundeffect = "event:/SFX/Ambience/3DMapEmitters/Holdings/Generic/sfx_amb_3d_holdings_generic_castle" soundparameter = { "Tier" = 2.0 } }
		# Graphical cultures that prefer this asset to be shown
		graphical_cultures = { arabicgfx muslimgfx }
		# Graphical faiths that prefer this asset to be shown (priority is faith > religion > family, so Catholic graphical_faith overrides Abrahamic graphical_faith)
		graphical_faiths = { catholic_gfx orthodox_gfx }
		# Graphical regions in which this asset is preferred, this is the most important criterion when selecting the asset, with the exception of government and province
		graphical_regions = { western mena }
		# Province IDs in which this asset is preferred. Has a higher priority than graphical region.
		provinces = { 496 1000 }
		# Governments that prefer this asset to be shown
		governments = { tribal_government }
	}

	# Is the building enabled? Else won't give any effects to holder, and not be constructible (see can_construct* below).
	# If is_graphical_background = yes, this controls whether the building can be shown in the province.
	# scopes: root is the province; scope:holder is the holder of the province; county is the county title the province belongs to
	is_enabled = {}

	# Can the building be constructed.
	# Use this instead of is_enabled if you want to allow rulers to "use" the building after getting the holding, but to disallow that they construct it.
	# can_construct_potential controls whether the building appears in the build menu. For upgrades it is identical to can_construct_showing_failures_only.
	# Note that is_enabled (see above) is added to can_construct_potential.
	# Not used if is_graphical_background = yes
	# scopes: root is the province; scope:holder is the holder of the province; county is the county title the province belongs to
	can_construct_potential = {}
	can_construct_showing_failures_only = {}
	can_construct = {}
	show_disabled = yes/no	# if set to yes, the building will show in the build menu even if disabled (will still use can_construct_potential). No by default

	# How much cost does the building cost
	cost = { gold = 500 ... }

	# The next building in chain unlocked by this building
	next_building = castle_02

	# Custom description for effects indirectly provided by building.
	# The scope root refers to the buildings province.
	effect_desc = <loc key>

	# A modifier applied to the owner of the holding
	character_modifier = {
	}
	# Applied if the character's culture has the parameter
	character_culture_modifier = {
		parameter = culture param
	}
	# Applied if the character's faith has the parameter
	character_faith_modifier = {
		parameter = faith param
	}

	# A modifier applied if the holder's dynasty of the county has a specific perk
	characer_dynasty_modifier = {
		county_holder_dynasty_perk = fp2_urbanism_legacy_1 # The name of the perk
		# The effect
		monthly_prestige_gain_mult = 0.2
	}

	# A modifier applied to the province
	province_modifier = {
	}
	province_culture_modifier = {
		parameter = culture param
	}
	province_faith_modifier = {
		parameter = faith param
	}
	province_terrain_modifier = {
		parameter = required culture param (optional)
		terrain = required province terrain (optional, default is all terrain types)
		is_coastal = whether this modifier is applied on coastal or non-coastal provinces (optional, default is both coastal and non-coastal)
		is_riverside = whether this modifier is only applied on provinces that are next to a big river or not (optional, default is both riverside and not)
	}

	# A modifier applied if the holder's dynasty of the county has a specific perk
	province_dynasty_modifier = {
		county_holder_dynasty_perk = fp2_urbanism_legacy_1 # The name of the perk
		# The effect
		monthly_income = 0.2
	}

	# A modifier applied to the county
	county_modifier = {
	}
	county_culture_modifier = {
		parameter = culture param
	}
	county_faith_modifier = {
		parameter = faith param
	}

	# A modifier applied to every de jure county in the duchy (if the county has the same de facto liege as this building's county). Can only be used (and only works) for duchy capital buildings.
	duchy_capital_county_modifier = {
	}
	duchy_capital_county_culture_modifier = {
		parameter = culture param
	}
	duchy_capital_county_faith_modifier = {
		parameter = faith param
	}

	# A special modifier applied to every holding of specified type in the county
	county_holding_modifier = {
		holding = castle_holding
		income_mult = 1
	}

	# A modifier applied if the holder's dynasty of the county has a specific perk
	county_dynasty_modifier = {
		county_holder_dynasty_perk = fp2_urbanism_legacy_1 # The name of the perk
		# The effect
		development_growth_factor = 0.2
	}

	# A modifier applied to the county holder
	county_holder_character_modifier = {

	}

	# Building flags
	flag = castle

	# Effects applied on building completion
	# scopes: root refers to the buildings province
	on_complete = {
		<effects>
	}

	# How desirable is the building for the AI
	ai_value = {
		base = 100
	}

	# If this is set to yes, the building will be used for figuring out which background asset (walls/no walls etc) should be shown
	is_graphical_background = no

	### Brief: on_start/on_cancelled/on_complete
	# Effects that happen when construction of the building 
	# starts/cancels/finishes.
	# 
	# Supported scopes:
	# 		root (Province)
	#			The province the construction took place in.
	#		character
				The character that paid for the construction, if available
	on_start = { ... }
	on_cancelled = { ... }
	on_complete = { ... }
}
```


**Example**

```
my_building = {

 	construction_time = 720 

 	cost_gold =150

 	type = regular/special/duchy_capital

 	can_construct_potential = { 
 		#define the requirements for the building to be shown. They are locared in game/common/scripted_triggers
 	}

 	can_construct = { #the requirements for the building to be constructed.
 		building_requirement_castle_city_church = { LEVEL = 01 }
 	} 

 	can_construct_showing_failures_only = {
 		building_requirement_tribal = no
 	}

	levy = 100 # The augment of levy this building adds	

 	province_modifier = { # add province modifiers here
		stationed_archer_cavalry_toughness_mult = normal_maa_toughness_tier_1
		stationed_archer_cavalry_damage_mult = normal_maa_damage_tier_1
		stationed_archer_cavalry_screen_mult = normal_maa_screen_tier_1
		stationed_archer_cavalry_pursuit_mult = normal_maa_pursuit_tier_1
		travel_danger = -1
	}

	ai_value = { # The priority to build the building
		base = 8
		ai_general_building_modifier = yes
	}
 }
```


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Holdings_modding*
