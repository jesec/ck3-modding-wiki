# Trait modding

> **Note:** Last verified for version 1.0


[Traits](https://ck3.paradoxwikis.com/Traits) are possessed by [character](https://ck3.paradoxwikis.com/character)s in the game and can modify their attributes, opinions, personality and other parameters.


## Character Traits

The script which stores all character traits can be found in  `/Crusader Kings III/game/common/traits`.


|  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Personality Traits** |  | **Education & Court Traits** | **Lifestyle traits** |  | **Stress Traits** |  | **Commander Traits** |  |
| lustful | chaste | education_intrigue_1 (4) | diplomat | family_first | drunkard | hashishiyah | logistician | military_engineer |
| gluttonous | temperate | education_diplomacy_1 (4) | august | hunter_1 (3) | rakish | reclusive | aggressive_attacker | unyielding_defender |
| greedy | generous | education_stewardship_1 (4) | strategist | reveler_1 (3) | irritable | flagellant | forder | flexible_leader |
| lazy | diligent | education_martial_1 (4) | overseer | gallant | profligate | improvident | desert_warrior | jungle_stalker |
| wrathful | calm | education_learning_1 (4) | architect | administrator | contrite | comfort_eater | reaver | reckless |
| patient | impatient | diplomatic_court_1 (2) | blademaster_1 (3) | avaricious | inappetetic | journaller | holy_warrior | open_terrain_expert |
| arrogant | humble | warlike_court_1 (2) | schemer | whole_of_body | confider | athletic | rough_terrain_expert | forest_fighter |
| deceitful | honest | administrative_court_1 (2) | seducer | scholar |  |  | cautious_leader | organizer |
| craven | brave | intrigue_court_1 (2) | torturer | theologian | **Health Traits** |  | winter_soldier |  |
| shy | gregarious | scholarly_court_1 (2) | mystic_1 (3) | physician_1 (3) | pregnant | depressed_genetic (1) |  |  |
| ambitious | content | education_republican_knowledge_1 (4) | lifestyle_herbalist | lifestyle_gardener | lunatic_genetic (1) | possessed_genetic (1) | **Fame Traits** |  |
| arbitrary | just | education_martial_prowess_1 (4) |  |  | ill | pneumonic | berserker | shieldmaiden |
| cynical | zealous |  | **Physical Traits** |  | great_pox | early_great_pox | varangian | poet |
| paranoid | trusting | **Faith Traits** | beauty_bad_1 (3) | beauty_good_1 (3) | lovers_pox | leper | bastard | legitimized_bastard |
| compassionate | callous | celibate | intellect_bad_1 (3) | intellect_good_1 (3) | wounded_1 (3) | maimed | disputed_heritage | child_of_concubine_female |
| compassionate | sadistic | pilgrim | physique_bad_1 (3) | physique_good_1 (4) | one_eyed | one_legged | child_of_concubine_male | wild_oat |
| stubborn | fickle | excommunicated | pure_blooded | fecund | disfigured | infirm | bastard_founder | twin |
| vengeful | forgiving | devoted | strong | shrewd | incapable | gout_ridden | kinslayer_1 (3) | deviant |
| eccentric |  | sayyid | clubfooted | hunchbacked | consumption | cancer | cannibal | sodomite |
| **Childhood Traits** |  | saoshyant | lisping | stuttering | typhus | bubonic_plague | incestuous | adulterer |
| rowdy | charming | saoshyant_descendant | dwarf | giant | smallpox | scarred | fornicator | murderer |
| curious | pensive | savior | inbred | weak | eunuch | blind | born_in_the_purple | augustus |
| bossy | sickly | divine_blood | dull | impotent |  |  | viking | reincarnation |
|  |  | blood_of_prophet | spindly | scaly | **Culture-Specific Traits** |  | adventurer | heresiarch |
|  |  | faith_warrior | albino | wheezing | crusader_king | chakravarti | peasant_leader | witch |
|  |  | saint | bleeder | infertile | greatest_of_khans | paragon | disinherited | denounced |
|  |  | order_member |  |  | consecrated_blood |  | loyal | disloyal |


## Creating a trait

Traits are defined in .txt files in the directory `/Crusader Kings III/game/common/traits`.

Example trait:

```
my_new_trait = {
	education = yes #yes/no to define whether this is an Education trait
	# Flags and modifiers
        ... # Flags and modifiers
        ... # Flags and modifiers
        
}
```


### Trait category

What unique category this trait is in, categories have gameplay implications as well as sorting

```
category = X
```


Where X can be one of:

| **Name** | **Description** | **Usage** |
| --- | --- | --- |
| personality | The core personality of a character, character's auto generate with some | category = personality |
| education | A character's education, they can only have one at a time and are auto generated with | category = education |
| childhood | The core personality of a child, it will grow into an adult personality trait, auto generated on children | category = childhood |
| commander | A combat trait for how a character fights, auto added to characters if required | category = commander |
| winter_commander | A commander trait but will only be added for characters in an area with winter | category = winter_commander |
| lifestyle | A lifestyle progress trait | category = lifestyle |
| court_type | A trait from a court type | category = court_type |
| fame | A fame (or infamy) trait | category = fame |
| health | A trait representing a health condition | category = health |


### Trait validation


| **Name** | **Description** | **Usage** |
| --- | --- | --- |
| valid_sex | Determines the valid sex for the trait. Defaults to "all". Trait can only be had by characters of this sex | valid_sex = male/female/all |
| minimum_age | Specifies the minimum age required to have this trait (an integer value). | minimum_age = 16 |
| maximum_age | Specifies the maximum age allowed to have this trait (an integer value). | maximum_age = 15 |
| potential | List of triggers which are required for a character to get this trait. | <pre><code>potential = {<br>   exists = dynasty.dynast<br>   faith = dynasty.dynast.faith<br>}</code></pre> |


### Special trait flags


| **Name** | **Description** | **Usage** |
| --- | --- | --- |
| health | Changes actual health value | health = X.X |
| fertility | Percentage modifier on fertility | fertility = X.X |
| inherit_chance | Chance of passing on the trait to children | inherit_chance = X |
| birth | How many characters out of 100 are born with this trait (when not inherited). Can have decimals | birth = X |
| random_creation | How many characters out of 100 are created with this trait? (As opposed to actually being born; this is for things like generated characters, script characters, etc.) | random_creation = X |
| triggered_opinion | Applied if the associated conditions are fulfilled | <pre><code>triggered_opinion = {<br>	opinion_modifier = opinion_modifier_key	<br><br>	# Everything below is optional<br>	parameter = doctrine_parameter_key 	<br>	check_missing = yes			<br>	<br>	same_faith = yes			<br>	same_dynasty = yes			<br>	ignore_opinion_value_if_same_trait = yes	<br>	male_only = yes	<br>	female_only = yes<br>}</code></pre> |
| compatibility | This is not a opinion modifier, but can be used by 'compatibility_modifier' and 'trait_compatibility' trigger. Compatibility is checked for the trait holder vs the listed traits (of another character.) | <pre><code>compatibility = {<br>	gluttonous = 20<br>	drunkard = @pos_compat_low<br>}</code></pre> |
| parent_inheritance_sex | specifies whether the trait can be inherited from male/female/all parents (all by default) | parent_inheritance_sex = male/female/all |
| child_inheritance_sex | specifies whether the trait can be inherited by male/female/all children (all by default) | child_inheritance_sex = male/female/all |
| genetic | If set to yes (no by default), the inheritance will follow the following rules: The trait can be inactive. Children can inherit the trait from both active and inactive parent traits.<br>An active trait is inherited with 100% chance, an inactive trait with a 50% chance. If the trait is successfully inherited from both parents, it becomes active.<br>If it's inherited only from one parent, it's inactive. | genetic = yes/no |
| group_equivalence | Allows multiple traits to be checked using a single, defined name. | <pre><code>lunatic_1 = {<br>	group_equivalence = lunatic<br>}<br>lunatic_genetic = {<br>	group_equivalence = lunatic<br>}<br><br>has_trait = lunatic</code></pre> |
| inherit_from_real_father | Should the trait be inherited from the real (biological) father? (yes by default) | inherit_from_real_father = yes/no |
| enables_inbred | This trait enables the children of the character to be considered for the inbred trait (no by default).<br>It only enables the inbred chance if there are common ancestors of the parents, so there is no risk of 'inbred' if the parents are not related.<br>If inbred is not enabled by parents' traits, but there are common ancestors, there's a chance (same as for inbred trait when it's enabled) the child will get a random trait with enables_inbred = yes. | enables_inbred = yes/no |
| good | marks this trait as good (default no) | good = yes/no |
| genetic_constraint_all | This genetic constraint will be applied when gaining the trait. To add a new genetic constraint, further modifications in gfx\portraits\trait_portrait_modifiers are needed before setting ranges in common\ethnicities | genetic_constraint_all = beauty |
| forced_portrait_age_index | The character will use this portrait age index instead of one of the age sub-genes marked as "generic". You can specify more than one such index if you want to randomize between them. If multiple traits force indexes, it randomizes between all of them | forced_portrait_age_index = 1 |
| forced_portrait_age_index | Example showing that you can define more than one index | forced_portrait_age_index = 2 |
| portrait_extremity_shift | When gaining this trait, every single morph gene will be shifted by this percentage towards 0 or 1; whichever it is closest to. E.G., 0.4 will shift 25% towards 0, resulting in 0.3 | portrait_extremity_shift = 0.25 |
| immortal | Will stop visual aging, and make the character immune to natural death. Can still be killed by script. Fertility will match visual age. You can use set_immortal_age to change the visual age | immortal = yes |
| physical | Marks the trait as physical | physical = yes |
| trait_exclusive_if_realm_contains | A list of terrain types that are taken into consideration when commander traits are randomly assigned to commanders. These traits are only assigned/considered if the commander's culture contains a province that has one of the terrain types specified in the list | trait_exclusive_if_realm_contains = {} |
| shown_in_ruler_designer | Defaults to yes, determines whether trait can be selected from the Ruler Designer | shown_in_ruler_designer = yes/no |


### Creating immortal traits

As with the previous game, traits that grant immortality are not present in the game at launch but are already programmed and can be easily created. It only requires adding the following parameter to a trait: ``immortal = yes``

For your immortals to look forever young, you can use the effect immortal age. Such as, ``set_immortal_age = 30``


### Trait Index

With recent updates, traits no longer use indexes. They instead appear in the ruler designer by order of appearance in code.


## Localization

By default, the name key is trait_<key>, and the desc key is trait_<key>_desc.

## Icon

The default icon path is gfx/interface/icons/traits/<trait>.dds.

These can be overridden with dynamic descriptions.
E.G.,
name = some_loc_key
Or
name = {
	first_valid = { ... }
}

The parameters are: ***name, desc, icon***.

The root scope is the character.
Note that in some cases there may be no root, so make sure your first check is a fallback for "NOT = { exists = this }" if you add dynamic names, descs, or icons.

An example:


```
icon = {
	first_valid = {
		triggered_desc = {
			trigger = { NOT = { exists = this } }
			desc = "gfx/interface/icons/traits/diligent.dds"
		}
		
		triggered_desc = {
			trigger = { gold > 1000 }
			desc = "gfx/interface/icons/traits/diligent.dds"
		}
		
		desc = "gfx/interface/icons/traits/deceitful.dds"
	}
}
```


## Unique Numerical Identifier List (Obsolete)

To avoid possible conflicts there is a Google Sheets document to overview which Trait IDs are already used by the community. The list is not complete, but editable by anyone. Please edit carefully, since there are formulas in use, and if possible only add input into the columns "Name", "Author(s)" and "Link". Green background indicates that the Numerical Identifier (column A, blue background) is most likely not used by another person's mod already.

[Community document of traits](https://docs.google.com/spreadsheets/d/1Hrsog44GfXsnnsdD6_pfQWMqBkVJeOECdd8hXtuKFBI/edit?usp=sharing)


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Trait_modding*
