# Regiments modding

> **Note:** Last verified for version 1.3


TOC


### Creating a Regiment

Regiments are defined in `/Crusader Kings III/game/game/common/men_at_arms_types`

For best compatibility, use unique file names.

**Example:**

```
example_maa = { # maa = Men at arms
	type = # Men at arms type of my_maa
	
	damage = # damage value of unit
	toughness = # toughness value of unit
	pursuit = # pursuit value of unit
	screen = # screen value of unit
	
	terrain_bonus = { # Terrain bonus
		forest = { # bonus values, i.e, damage = 10 }
	}

	counters = {
		# what type of men at arms this counters for example archers
	}

	buy_cost = { # cost of a unit }
	low_maintenance_cost = { # unraised maintenance cost of a unit }
	high_maintenance_cost = { # raised maintenance cost of a unit }
	
	stack = # Men in one unit
	ai_quality = { # ai weight value }
	icon = # name of icon without .dds
}
```


### Variables


|  |  |  |  |
| --- | --- | --- | --- |
| **Variable** | **Type** | **Description** | **Example** |
| type | string | Unit type | type = skirmishers |
| can_recruit | block | Optional [Triggers](Triggers.md) (in character scope) for whether or not one can recruit this MaA unit.  If not specified (or if specified with an empty block), unit is always recruitable.  See "Regiments in Traditions" below. | can_recruit = { always = no } # Never recruitable |
| damage | int | Unit's damage value | damage = 10 |
| toughness | int | Unit's toughness value | toughness = 10 |
| pursuit | int | Unit's pursuit value | pursuit = 10 |
| screen | int | Unit's screen value | screen = 10 |
| terrain_bonus | block | Terain bonus | terrain_bonus = {<br>forest = { damage = 3 screen = 3 } <br><br><br>} |
| counters | block | What unit types counters this unit. Can counter multiple units. | counters = {<br>heavy_infantry = 1<br><br><br>} |
| buy_cost | block | Cost of one unit | buy_cost = { gold = 150 } |
| low_maintenance_cost | block | Low maintenance costs | low_maintenance_cost = { gold = 1 } |
| high_maintenance_cost | block | High maintenance costs | high_maintenance_cost = { gold = 5 } |
| mercenary_fallback | bool |  | mercenary_fallback = yes |
| holy_order_fallback | bool |  | holy_order_fallback = yes |
| stack | int | Amount of units per one stack | stack = 100 |
| max_sub_regiments | int |  | max_sub_regiments = 5 |
| fallback_in_hired_troops_if_unlocked | bool | Mercs/holy orders won't have a preference towards this MaA if it is unlocked | fallback_in_hired_troops_if_unlocked = yes |
| allowed_in_hired_troops | bool |  | allowed_in_hired_troops = no |
| fights_in_main_phase | bool | If set, only affects the pursuit phase. Handy for siege weapons | fights_in_main_phase = no |
| siege_tier | int | How good it is at countering forts | siege_tier = 1 |
| ai_quality | Variable | AI weight which is determined in *\common\script_values\00_men_at_arms_values* | value = culture_ai_weight_pikemen |
| icon | string | Name of the .dds icon file to represent this MaA type. If you use custom icon then it should be placed in *\gfx\interface\icons\regimenttypes\* | icon = skirmishers |
| hired_stack_size | int | Size of sub-regiment for the purpose of hired troops. If not set, this will be the same as the "stack" value | hired_stack_size = 25 |
| winter_bonus | block | Starting from game version 1.3.0, MaA can include Winter Bonus. Can include one or both bonuses (harsh or normal winter) | winter_bonus = {<br><br>		normal_winter = { <br><br>damage = -10 <br><br>toughness = -5 <br><br>}<br><br><br>harsh_winter = { <br><br>damage = -20 <br><br>toughness = -10 <br><br>}<br><br><br>} |


#### Regiments in Innovations

If you want your custom Innovation to unlock your custom MaA unit.

```
unlock_maa = my_maa # Use the key of maa unit
```


Or you can also provide bonuses to the regiment.


**Example** (given by CK3 devs):

```
maa_upgrade = {
	type = cavalry
	damage = 0.1
	toughness = 0.1
	pursue = 0.1
	screen = 0.1
	siege_value = 0.1
	max_size = 1
}
```


#### Regiments in Traditions

If you want your custom cultural tradition to unlock your custom MaA unit.

In the tradition (e.g. ``common/culture/traditions/my_traditions.txt``):


```
tradition_example = {
1. ...
	parameters = {
		# ...
		unlock_my_maa = yes
		# ...
	}
1. ...
}
```


And in the MaA (e.g. ``common/men_at_arms_types/my_maa_types.txt``):


```
my_maa = {
1. ...
	can_recruit = {
		culture = { has_cultural_parameter = unlock_my_maa }
	}
1. ...
}
```


#### Localization

Example:

```
my_maa_name:0 "My Men at Arms"
my_maa_name_flavor:0 "#F My Men at Arms are better than yours.#!"
```
Note that 'my_maa_flavor' is the regiment's description.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Regiments_modding*
