# Terrain modding

> *This article is timeless and should be accurate for any version of the game.*


Terrain modding allows for the creation or modification of [terrain](https://ck3.paradoxwikis.com/terrain) on the map


## Creating a Terrain Type


### Scripting

Terrain types are defined in ``common/terrain_types/``. Below is a list of all keys usable when defining a terrain type.

<details>
<summary>Terrain type keys</summary>


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| movement_speed | number(mult) | Speed on this type of terrain | movement_speed = 0.8 |
| attacker_modifier | list&lt;modifiers&gt; | Modifiers for the attackers in a combat.<br>See [modifiers](#modifiers). | attacker_modifier = {<br> 	hard_casualty_modifier = 0.2<br> 	retreat_losses = 0.25<br> } |
| defender_modifier | list&lt;modifiers&gt; | Modifiers for the defender in a combat.<br>See [modifiers](#modifiers). | defender_modifier = {<br> 	hard_casualty_modifier = 0.2<br> 	retreat_losses = 0.25<br> } |
| attacker_combat_effects | &lt;combat effect&gt; | Combat effect for the attackers. Look for `common/combat_effects/_combat_effects.info` for more information on how script this one. | attacker_combat_effects = {<br> 	name = combat_wetlands<br> 	image = defender_wetlands<br> 	advantage = 5<br> } |
| defender_combat_effects | &lt;combat effect&gt; | Combat effect for the defenders. Look for `common/combat_effects/_combat_effects.info` for more information on how script this one. | defender_combat_effects = {<br> 	name = combat_forest<br> 	image = defender_forest<br> 	advantage = 3<br> } |
| color | color | Terrain color for the terrain type map mode | color = hsv { 0.3 0.75 0.7 } #50 255 25 |
| combat_width | number(mult) | Multiplier on the combat width | combat_width = 0.9 |
| audio_parameter | number | Used to check the audio to play | audio_parameter = 4.0 |
| province_modifier | list&lt;modifiers&gt; | Modifier applied to the province.<br>See [modifiers](#modifiers). | province_modifier = {<br> 	supply_limit_mult = -0.1<br> 	travel_danger = 45<br> 	county_fertility_growth_add = 0.15<br> } |
| county_capital_modifier | list&lt;modifiers&gt; | Modifier applied to the province if it is the county capital.<br>See [modifiers](#modifiers). | county_capital_modifier = {<br> 	development_growth_factor = -0.05<br> } |
| travel_danger_score | number | The amount of danger this terrain provides when travelling over it. | travel_danger_score = 45 |
| travel_danger_color | color | Terrain color for the travel planner map mode if the danger score is higher than the player's safety. | travel_danger_color = hsv { 0.37 0.8 0.5 } |
| provision_cost | number | The amount of provison cost for this terrain type when moving your domicile (landless rulers). | provision_cost = 50 |
| county_fertility | number | The amount of Fertility contributed by this terrain type. Used to calculate Base County Fertility for relevant counties | county_fertility = 15 |
| entity | string | Environmental graphical asset shown in this terrain. | entity = "forest_birds_01" |


</details>

The ``number(mult)`` types are decimals (ex. -1 (🔴), 0.5 (✅) or 2 (✅)).

Here is a complete example:

```lua
forest = {
	color = hsv { 0.3 0.75 0.7 } #50 255 25
	travel_danger_color = hsv { 0.37 0.8 0.5 }
	travel_danger_score = forest_danger_value
	provision_cost = @provisions_cost_light
	county_fertility = 15

	province_modifier = {
		supply_limit_mult = -0.1
		travel_danger = forest_danger_value
		county_fertility_growth_add = forest_county_fertility_value
	}

	defender_combat_effects = {
		name = combat_forest
		image = defender_forest
		advantage = 3
	}

	movement_speed = 0.8
	combat_width = 0.9

	audio_parameter = 4.0

	entity = "forest_birds_01"
}
```


### Graphics

Terrain type icons are put in ``gfx/interface/icons/terrain_types`` in the ``.dds`` format, with the name ``&lt;TERRAIN TYPE KEY&gt;.dds``. (ex. ``forest.dds``)


### Localization

Vanilla localization files are located at ``localization/&lt;language&gt;/terrains_l_&lt;language&gt;.yml``.

| **Localization key** | **Description** | **Example** |
| --- | --- | --- |
| &lt;TERRAIN&gt; | The name of the terrain. | `forest:0 "Forest"` |
| combat_&lt;TERRAIN&gt; | Text used for combat advantages when the terrain have combat modifiers. | `combat_forest:0 "Defending in Forest"` |


## Modifiers


### Modifiers used in terrains

Modifiers can be used in a terrain in the following fields : ``attacker_modifier``, ``defender_modifier``, ``province_modifier``, ``county_capital_modifier``.

Modifiers referenced by a terrain object can be only generic (hardcoded) modifiers, or modifiers generated from the following databases:

- schemes
- [holdings](Holdings_modding.md)
- lifestyles
- regions

Other generated modifiers are *not* allowed, such as those from other terrains, men_at_arms_types, cultures, or governments.


### Generated modifiers

Below is a list of modifiers generated for each terrain types:

<details>
<summary>Generated modifiers</summary>


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| attrition_mult | number(mult) | Attrition multiplier for armies. | attrition_mult = 0 |
| cancel_negative_supply | boolean | Discards supply penalties from the terrain type | cancel_negative_supply = yes |
| advantage | number | Advantage during the combat | advantage = 0 |
| development_growth | number | Development growth if capital of a county is this terrain | development_growth = 1 |
| development_growth_factor | number(mult) | Development growth factor if capital of a county is this terrain | development_growth_factor = 0.2 |
| construction_gold_cost | number(mult) | Construction cost in gold of buildings. | construction_gold_cost = 0.2 |
| holding_construction_gold_cost | number(mult) | Construction cost in gold of holdings. | holding_construction_gold_cost = 0.2 |
| construction_piety_cost | number(mult) | Construction cost in piety of buildings. | construction_piety_cost = 0.2 |
| holding_construction_piety_cost | number(mult) | Construction cost in piety of holdings. | holding_construction_piety_cost = 0.2 |
| construction_prestige_cost | number(mult) | Construction cost in prestige of buildings. | construction_prestige_cost = 0.2 |
| holding_construction_prestige_cost | number(mult) | Construction cost in prestige of holdings. | holding_construction_prestige_cost = 0.2 |
| supply_limit | number | Changes the army supply limit. | supply_limit = 200 |
| supply_limit_mult | number(mult) | Changes the army supply limit factor. | supply_limit_mult = 0.2 |
| tax_mult | number(mult) | Gold tax multipliers for buildings. | tax_mult = 0.2 |
| levy_size | number(mult) | Changes the levy size. | levy_size = 0.2 |
| min_combat_roll | number | Sets the minimal combat roll. | min_combat_roll = 5 |
| max_combat_roll | number | Sets the maximal combat roll. | max_combat_roll = 5 |
| travel_danger | number | Changes travel danger. | travel_danger = 35 |
| provision_use_mult | number(mult) | Provision use for landless characters. | provision_use_mult = 0.2 |


</details>

The ``number(mult)`` types are decimals (ex. -1 (🔴), 0.5 (✅) or 2 (✅)).

Generated modifiers can then be used anywhere (traits, struggles...) with the name ``&lt;TERRAIN TYPE KEY&gt;_&lt;MODIFIER ATTRIBUTE NAME&gt;``.

For example, writing the following in a trait will add a ✅ advantage in the ``forest`` terrain.
```
forest_advantage = 2
```

They can also be used in the terrain itself, without the terrain key before. For example, writing the following in a terrain will put a  ✅ defender advantage.
```
defender_combat_effects = {
	advantage = 5
}
```


## Terrain mapping

Terrain mapping is defined in ``common/province_terrain/00_province_terrain.txt``. Each province needs a defined terrain. More information on provinces are on the [map modding page](Map_modding.md#defining-baronies).

**Example**

```
1=biger_plains   #
2=taiga          #
3=plains         #
4=mountains      #
5=hills          #
```


- [Creating a Terrain Type](#creating-a-terrain-type)
  - [Scripting](#scripting)
  - [Graphics](#graphics)
  - [Localization](#localization)
- [Modifiers](#modifiers)
  - [Modifiers used in terrains](#modifiers-used-in-terrains)
  - [Generated modifiers](#generated-modifiers)
- [Terrain mapping](#terrain-mapping)


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Terrain_modding*
