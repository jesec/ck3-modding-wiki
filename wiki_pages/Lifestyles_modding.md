# Lifestyles modding

## Lifestyles

[Lifestyles](https://ck3.paradoxwikis.com/Lifestyle) represent the trees a character can progress in.


### Scripting

Lifestyles are defined in ``common/lifestyles/``. Below is a list of all attributes usable when defining a lifestyle.

| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| is_highlighted | [trigger](Triggers.md) | If the trigger is valid, highlight the lifestyle.<br>See [triggers](#triggers) below. | is_highlighted = {<br> 	has_trait = education_learning<br> } |
| is_valid_showing_failures_only | [trigger](Triggers.md) | Checks if the lifestyle can be selected.<br>See [triggers](#triggers) below. |  |
| is_valid | [trigger](Triggers.md) | Checks if the lifestyle can be selected.<br>See [triggers](#triggers) below. | is_valid = {<br> 	has_dlc_feature = wandering_nobles<br> } |
| xp_per_level | number | How much XP do you need per perk point? | xp_per_level = 1000 |
| base_xp_gain | number | How much XP do you get each month? Before modifiers | base_xp_gain = 25 |
| icon | string | What key to use for the icon; if not defined, will use the key of the lifestyle.<br>See [graphics](#graphics) below. |  |


Here is a complete example:

```lua
learning_lifestyle = {

	is_highlighted = {
		has_trait = education_learning		
	}


	xp_per_level = 1000
	base_xp_gain = 25
}
```


#### Triggers

The triggers are in the character scope.

Any triggers that are part of the lifestyle script files cannot use:

- scripted triggers, effects, or modifiers
- triggers, effects, or modifiers that are generated based on scripted content, such as:
   - diplomacy_lifestyle_perk_points trigger (based on a scripted lifestyle)
   - has_relation_rival trigger (based on a scripted relation)


### Graphics

Lifestyle icons are put in ``gfx/interface/icons/lifestyles/`` in the ``.dds`` format, with the name ``&lt;LIFESTYLE KEY&gt;.dds`` by default (ex. ``diplomacy_lifestyle.dds``), or with the key of the ``icon`` attribute.
File:Learning lifestyle.png|Lifestyle icon example (<code>education_learning.dds</code>)


### Localization

Vanilla localization files are located at ``localization/&lt;language&gt;/focuses_l_&lt;language&gt;.yml``.

| **Localization key** | **Description** | **Example** |
| --- | --- | --- |
| &lt;LIFESTYLE&gt;_name | Name of the lifestyle. | `learning_lifestyle_name:0 "Learning"` |
| &lt;LIFESTYLE&gt;_desc | Description of the lifestyle. | `learning_lifestyle_desc:0 "Focus on learning all that you can. The realm of knowledge and divinity lie within your grasp, as well as the secrets to life itself."` |
| &lt;LIFESTYLE&gt;_highlight_desc | Description of the lifestyle when highlighted (using the trigger `is_highlighted` above) | `learning_lifestyle_highlight_desc:0 "Because of your Learning [education\|E], you gain #P [GetPlayer.Custom('GetEducationLifestylePercentageBoost')]#! more [experience\|E] in this Lifestyle."` |


- [Lifestyles](#lifestyles)
  - [Scripting](#scripting)
    - [Triggers](#triggers)
  - [Graphics](#graphics)
  - [Localization](#localization)
- [Lifestyle focuses](#lifestyle-focuses)
  - [Scripting](#scripting)
  - [Graphics](#graphics)
  - [Localization](#localization)
- [Lifestyle perks](#lifestyle-perks)
  - [Scripting](#scripting)
  - [Graphics](#graphics)
  - [Localization](#localization)
- [Vanilla list](#vanilla-list)


## Lifestyle focuses

[Lifestyle focuses](https://ck3.paradoxwikis.com/Lifestyle#focuses) are the focuses on specific lifestyle characters can choose.


### Scripting

Lifestyle focuses are defined in ``common/focuses/``. Below is a list of all attributes usable when defining a lifestyle focus.

| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| type | <education\|lifestyle> | What type of focus is this?<br>Education focuses are for childrens. | `type = lifestyle` |
| is_shown | [trigger](Triggers.md) | Is the focus visible to the scoped character?<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">is_shown = {<br>    NOT = { government_has_flag = government_is_landless_adventurer }<br>}</code> |
| is_valid | [trigger](Triggers.md) | Can the scoped character choose this focus? <br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">is_valid = {<br>    NOT = { government_has_flag = government_is_landless_adventurer }<br>}</code> |
| is_valid_showing_failures_only | [trigger](Triggers.md) | Can the scoped character choose this focus? These will be shown only if they fail.<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> |  |
| is_good_for | [trigger](Triggers.md) | Is this a good education focus for the scoped child? This is used by education focuses.<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">is_good_for = {<br>    has_diplomacy_education_affinity_childhood_trait_trigger = yes<br>}</code> |
| is_bad_for | [trigger](Triggers.md) | Is this a bad education focus for the scoped child? This is used by education focuses.<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">is_bad_for = {<br>    has_martial_education_disaffinity_childhood_trait_trigger = yes<br>}</code> |
| is_default | [trigger](Triggers.md) | Is this the default education focus for the scoped child? This is used by education focuses.<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">is_default = {<br>    has_trait = bossy<br>}</code> |
| on_change_to | [effect](Effects.md) | Effect to execute on the character changing to this type.<br><table><tr><td>root</td><td>Character</td><td>Character changing to this focus type.</td></tr></table> | <code style="white-space: pre">on_change_to = {<br>    if = {<br>        limit = {<br>            exists = var:education_point_gain_variable<br>        }<br>        ...<br>        remove_variable = education_point_gain_variable<br>    }<br>}</code> |
| on_change_from | [effect](Effects.md) | Effect to execute on the character changing away from this type.<br><table><tr><td>root</td><td>Character</td><td>Character changing away from this focus type.</td></tr></table> | <code style="white-space: pre">on_change_from = {<br>    if = {<br>        limit = {<br>            is_alive = yes<br>            is_adult = no<br>        }<br>        add_character_flag = learning_previous_education<br>        ...<br>    }<br>}</code> |
| on_birthday | [effect](Effects.md) | Effect to execute on the character's birthday if they are above NCharacter::FOCUS_CHILD_MIN_AGE.<br><table><tr><td>root</td><td>Character</td><td>Character that has birthday.</td></tr></table> |  |
| modifier | [modifiers](https://ck3.paradoxwikis.com/modifiers) | Modifiers to apply to the character that has this focus | <code style="white-space: pre">modifier = {<br>    learning = 3<br>    development_growth_factor = 0.15<br>}</code> |
| skill | enum | Which skill is this focus related to? This is used by education focuses. | `skill = learning` |
| lifestyle | [Lifestyle](https://ck3.paradoxwikis.com/Lifestyle) | What lifestyle the focus belongs to. Adding this will make it a lifestyle focus. If the type is lifestyle this is required.<br>Key is mapped to the lifestyle database: `common/lifestyles/` | `lifestyle = learning_lifestyle` |
| icon | string | Override for what key to use for the icon. Defaults to the key of the focus. |  |
| auto_selection_weight | [scripted value](Scripting.md#script-values) | Script value for selection weight. Primarily used by the AI, but also when a character is promoted to having focus for any reason to select initial focus.<br><table><tr><td>root</td><td>Character</td><td>Character being evaluated for focus type.</td></tr></table> | <code style="white-space: pre">auto_selection_weight = {<br>    value = 11<br>    if = {<br>        limit = {<br>            has_education_learning_trigger = yes<br>        }<br>        add = 1989<br>    }<br>}</code> |
| desc | dynamic description | Descriptions used to describe the focus in the interface. | <code style="white-space: pre">desc = {<br>    desc = learning_scholarship_focus_desc<br>    desc = line_break<br>}</code> |


Here is a complete example:

```lua
learning_scholarship_focus = {
	lifestyle = learning_lifestyle

	is_shown = {
		NOT = { government_has_flag = government_is_landless_adventurer }
	}
	is_valid = {
		NOT = { government_has_flag = government_is_landless_adventurer }
	}

	desc = {
		desc = learning_scholarship_focus_desc
		desc = line_break
	}

	modifier = {
		learning = 3
		development_growth_factor = 0.15
	}

	auto_selection_weight = {
		value = 11
		if = {
			limit = {
				has_education_learning_trigger = yes
			}
			add = 1989
		}
		if = {
			limit = {
				government_has_flag = government_is_landless_adventurer
			}
			multiply = 0
		}
	}
}
```


### Graphics

Lifestyle focuses icons are put in ``gfx/interface/icons/focuses/`` in the ``.dds`` format, with the name ``&lt;LIFESTYLE FOCUS KEY&gt;.dds`` by default (ex. ``education_learning.dds``), or with the key of the ``icon`` attribute.

Lifestyle tree background are put in ``gfx/interface/icons/lifestyle_tree_backgrounds/`` in the ``.dds`` format.
File:Focus education learning.png|Lifestyle focus icon example (<code>education_learning.dds</code>)


### Localization

Vanilla localization files are located at ``localization/&lt;language&gt;/lifestyles/perks_l_&lt;language&gt;.yml``.

| **Localization key** | **Description** | **Example** |
| --- | --- | --- |
| &lt;LIFESTYLE FOCUS KEY&gt; | Focus name | `learning_scholarship_focus:0 "Scholarship Focus"` |
| &lt;LIFESTYLE FOCUS KEY&gt;_modifier | Focus modifier name | `learning_scholarship_focus_modifier:1 "[GetFocus('learning_scholarship_focus').GetName]"` |
| &lt;LIFESTYLE FOCUS KEY&gt;_desc | Focus description | `learning_scholarship_focus_desc:0 "The knowledge of those who have come before, the knowledge of those still living, and the knowledge of perpetual truths."` |
| &lt;LIFESTYLE FOCUS KEY&gt;_effect_desc | Focus effect description | `learning_scholarship_focus_effect_desc:0 "Focusing on Scholarship grants:"` |


## Lifestyle perks

[Lifestyle perks](https://ck3.paradoxwikis.com/Lifestyle#perk-trees) are the components of lifestyles which can be unlocked.


### Scripting

Lifestyles perks are defined in ``common/lifestyle_perks/``. Below is a list of all attributes usable when defining a lifestyle perk.

| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| name | dynamic description | Dynamic description. If not set, generated loc key will be used. Character scope | <code style="white-space: pre">name = {<br>    first_valid = {<br>        triggered_desc = {<br>            trigger = { is_landless_adventurer = yes }<br>            desc = apostate_perk_adventurer_name<br>        }<br>        desc = apostate_perk_name<br>    }<br>}</code> |
| tree | string ([Lifestyle focus]()) | Which tree does it belong to? Only used for GUI layout | `tree = scholarship` |
| position | numbers | What is its positioning within the tree? Only used for GUI layout. Multiplied with PERK_X_OFFSET and PERK_Y_OFFSET | `position = { 0 2 }` |
| icon | string | What key to use for the icon; if not defined, will use the key of the perk.<br>See [graphics](#graphics-3) below. | `icon = node_learning` |
| lifestyle | string ([Lifestyle]()) | Which lifestyle the perk belongs to | `lifestyle = learning_lifestyle` |
| parent | string ([Lifestyle perk]()) | Parent perk. Needed to unlock this perk.<br>Multiple parents can be defined | <code style="white-space: pre">parent = apostate_perk<br>parent = scholarly_circles_perk</code> |
| can_be_picked | [trigger](Triggers.md) | Trigger in character scope. | <code style="white-space: pre">can_be_picked = {<br>    always = yes<br>}</code> |
| can_be_auto_selected | [trigger](Triggers.md) | Trigger in character scope. Used in addition to can_be_picked and the parent perks to determine if a character can get a given perk on auto-selection (campaign start, and when becoming landed) |  |
| trait | string ([Trait](Trait_modding.md)) | If effect unlocks a trait, use this to set trait used in the hover tooltip | `trait = scholar` |
| effect | [effect](Effects.md) | Run on unlock. Character scope | <code style="white-space: pre">effect = {<br>    add_trait_force_tooltip = scholar<br>}</code> |
| character_modifier | [effect](Effects.md) | Applied to characters with the perk | <code style="white-space: pre">character_modifier = {<br>        different_faith_opinion = 15<br>        faith_conversion_piety_cost_mult = -0.75<br>    }</code> |
| doctrine_character_modifier | [effect](Effects.md) | Additional modifier applied to characters with the perk and their faith having the specified doctrine<br>Multiple doctrine character modifiers can be applied.<br><table><tr><td>doctrine</td><td>religious doctrine</td><td>Will trigger the effects if the character's religion have this doctrine.</td></tr></table> | <code style="white-space: pre">doctrine_character_modifier = {<br>    doctrine = doctrine_theocracy_temporal<br>    clergy_opinion = 10<br>}</code> |
| culture_character_modifier | [effect](Effects.md) | Additional modifier applied to characters with the perk and their culture having the specified parameter<br>Multiple culture character modifier can be applied.<br><table><tr><td>parameter</td><td>culture parameter</td><td>Will trigger the effects if the character's culture has this parameter applied.</td></tr></table> | <code style="white-space: pre">culture_character_modifier = {<br>    parameter = automatic_befriend_access<br>    befriend_scheme_phase_duration_add = medium_scheme_phase_duration_bonus_value<br>}</code> |
| government_character_modifier | [effect](Effects.md) | Additional modifier applied to characters with the perk and their government type having the specified flag<br>Multiple government character modifier can be applied.<br><table><tr><td>flag</td><td>government flag</td><td>Will trigger the effects if the character's government has this flag.</td></tr><tr><td>invert_check</td><td>&lt;yes/no&gt;</td><td>If set to 'yes' then we will instead apply these modifiers if the government does NOT have the specified flag</td></tr></table> | <code style="white-space: pre">government_character_modifier = {<br>    flag = government_is_landless_adventurer<br>    enemy_terrain_advantage = -0.5<br>    knight_effectiveness_per_learning = 0.005<br>    learning_per_piety_level = -1<br>}</code> |
| auto_selection_weight | number | Script value for weight for auto-selection. Defaults to 1000 | <code style="white-space: pre">auto_selection_weight = {<br>    value = 11<br>    if = {<br>        limit = {<br>            has_education_learning_trigger = yes<br>        }<br>        add = 1989<br>    }<br>}</code> |


Here is a complete example:

```lua
scholarly_circles_perk = {
	lifestyle = learning_lifestyle
	tree = scholarship
	position = { 2 2 }
	icon = node_learning

	parent = planned_cultivation_perk

	name = {
		first_valid = {
			triggered_desc = {
				trigger = { is_landless_adventurer = yes }
				desc = scholarly_circles_perk_adventurer_name
			}
			desc = scholarly_circles_perk_name
		}
	}

	character_modifier = {
		learning_per_piety_level = 1
	}
	government_character_modifier = {
		flag = government_is_landless_adventurer
		enemy_terrain_advantage = -0.5
		knight_effectiveness_per_learning = 0.005
		learning_per_piety_level = -1
	}
}
```


### Graphics

Lifestyle perks icons are put in ``gfx/interface/icons/lifestyles_perks/`` in the ``.dds`` format, with the name ``&lt;LIFESTYLE PERK KEY&gt;.dds`` by default (ex. ``scientific_perk.dds``), or with the key of the ``icon`` attribute.

In vanilla, perks use a common node icon up to the final perk of a lifestyle tree, where the icon is the trait given by that perk.
File:Trait scholar.png|Lifestyle perk icon example (<code>trait_scholar.dds</code>)
File:Node diplomacy.png|Lifestyle node icon example (<code>node_diplomacy.dds</code>)


### Localization

Vanilla localization files are located at ``localization/&lt;language&gt;/lifestyles/perks_l_&lt;language&gt;.yml``.

| **Localization key** | **Description** | **Example** |
| --- | --- | --- |
| &lt;LIFESTYLE PARK&gt;_name | Name of the lifestyle perk. | `learn_on_the_job_perk_name:0 "Learn on the Job"` |


## Vanilla list


<details>
<summary>Vanilla keys</summary>


| **[Lifestyle keys](https://ck3.paradoxwikis.com/Lifestyle)** | **[Lifestyle focus keys](https://ck3.paradoxwikis.com/Focus)** | **[Lifestyle perk trees keys keys](https://ck3.paradoxwikis.com/Perk)** | **[Lifestyle perks keys](https://ck3.paradoxwikis.com/Perk)** |
| --- | --- | --- | --- |
| diplomacy_lifestyle | diplomacy_foreign_affairs_focus | foreign_affairs | thoughtful_perk<br>ducal_conquest_perk<br><br>forced_vassalage_perk<br><br>adaptive_traditions_perk<br><br>flexible_truces_perk<br><br>defensive_negotiations_perk<br><br>embassies_perk<br><br>accomplished_forger_perk<br><br>diplomat_perk |
| diplomacy_lifestyle | diplomacy_majesty_focus | majesty | benevolent_intent_perk<br>inspiring_rule_perk<br><br>firm_hand_perk<br><br>praetorian_guard_perk<br><br>true_ruler_perk<br><br>writing_history_perk<br><br>a_life_of_glory_perk<br><br>dignitas_perk<br>august_perk |
| diplomacy_lifestyle | diplomacy_family_focus | family | befriend_perk<br>confidants_perk<br><br>flatterer_perk<br><br>friendly_counsel_perk<br><br>familial_familiar_perk<br><br>groomed_to_rule_perk<br><br>thicker_than_water_perk<br><br>sound_foundations_perk<br><br>family_man_perk |
| diplomacy_lifestyle | diplomacy_adventurer_focus ![government landless](../assets/icons/government_landless.png) |  |  |
| diplomacy_lifestyle | education_diplomacy ![child](../assets/icons/child.png) |  |  |
| martial_lifestyle | martial_strategy_focus | strategy | bellum_justum_perk<br>parthian_tactics_perk<br><br>envelopment_perk<br><br>organized_retreat_perk<br><br>hit_and_run_perk<br><br>engineered_for_destruction_perk<br><br>living_off_the_land_perk<br><br>sappers_perk<br>strategist_perk |
| martial_lifestyle | martial_authority_focus | authority | serve_the_crown_perk<br>a_mans_home_perk<br><br>enduring_hardships_perk<br><br>prepared_conscription_perk<br><br>strict_organization_perk<br><br>hard_rule_perk<br><br>soldiers_of_lesser_fortune_perk<br><br>absolute_control_perk<br><br>overseer_perk |
| martial_lifestyle | martial_chivalry_focus | chivalry | stalwart_leader_perk<br>courtship_perk<br><br>promising_prospects_perk<br><br>loyalty_and_respect_perk<br><br>chivalric_dominance_perk<br><br>never_back_down_perk<br><br>kingsguard_perk<br><br>peacemaker_perk<br><br>gallant_perk |
| martial_lifestyle | martial_adventurer_focus ![government landless](../assets/icons/government_landless.png) |  |  |
| martial_lifestyle | education_martial ![child](../assets/icons/child.png) |  |  |
| stewardship_lifestyle | stewardship_wealth_focus | wealth | golden_obligations_perk<br>heregeld_perk<br><br>detailed_ledgers_perk<br><br>war_profiteer_perk<br><br>fearful_troops_perk<br><br>it_is_my_domain_perk<br><br>golden_aplomb_perk<br><br>at_any_cost_perk<br><br>avaricious_perk |
| stewardship_lifestyle | stewardship_domain_focus | domain | tax_man_perk<br>defensive_measures_perk<br><br>organized_muster_rolls_perk<br><br>cutting_corners_perk<br><br>professional_workforce_perk<br><br>centralization_perk<br><br>popular_figurehead_perk<br><br>divided_attention_perk<br><br>architect_perk |
| stewardship_lifestyle | stewardship_duty_focus | duty | meritocracy_perk<br>chains_of_loyalty_perk<br><br>likable_perk<br><br>positions_of_power_perk<br><br>large_levies_perk<br><br>soon_forgiven_perk<br><br>toe_the_line_perk<br><br>honored_to_serve_perk<br><br>administrator_perk |
| stewardship_lifestyle | stewardship_adventurer_focus ![government landless](../assets/icons/government_landless.png) |  |  |
| stewardship_lifestyle | education_stewardship ![child](../assets/icons/child.png) |  |  |
| intrigue_lifestyle | intrigue_skulduggery_focus | skulduggery | truth_is_relative_perk<br>digging_for_dirt_perk<br><br>kidnapper_perk<br><br>court_of_shadows_perk<br><br>prepared_for_anything_perk<br><br>swift_execution_perk<br><br>a_job_done_right_perk<br><br>twice_schemed_perk<br><br>schemer_perk |
| intrigue_lifestyle | intrigue_temptation_focus | temptation | like_weed_in_a_garden_perk<br>unshackled_lust_perk<br><br>subtle_desire_perk<br><br>mortal_adoration_perk<br><br>enticing_opportunity_perk<br><br>home_advantage_perk<br><br>graceful_recovery_perk<br><br>smooth_operator_perk<br><br>seducer_perk |
| intrigue_lifestyle | intrigue_intimidation_focus | intimidation | dark_insights_perk<br>divine_retribution_perk<br><br>dreadful_perk<br><br>thriving_in_chaos_perk<br><br>malice_implicit_perk<br><br>fear_tax_perk<br><br>forever_infamous_perk<br><br>prison_feudal_complex_perk<br><br>torturer_perk |
| intrigue_lifestyle | intrigue_adventurer_focus ![government landless](../assets/icons/government_landless.png) |  |  |
| intrigue_lifestyle | education_intrigue ![child](../assets/icons/child.png) |  |  |
| learning_lifestyle | learning_medicine_focus | medicine | anatomical_studies_perk<br>carefree_perk<br><br>mental_resilience_perk<br><br>restraint_perk<br><br>know_thyself_perk<br><br>wash_your_hands_perk<br><br>iron_constitution_perk<br><br>healthy_perk<br><br>whole_of_body_perk |
| learning_lifestyle | learning_scholarship_focus | scholarship | pedagogy_perk<br>open_minded_perk<br><br>apostate_perk<br><br>scientific_perk<br><br>planned_cultivation_perk<br><br>scholarly_circles_perk<br><br>learn_on_the_job_perk<br><br>sanctioned_loopholes_perk<br><br>scholar_perk |
| learning_lifestyle | learning_theology_focus | theology | faithful_perk<br>zealous_proselytizer_perk<br><br>religious_icon_perk<br><br>prophet_perk<br><br>clerical_justifications_perk<br><br>church_and_state_perk<br><br>radiant_perk<br><br>defender_of_the_faith_perk<br><br>theologian_perk |
| learning_lifestyle | learning_adventurer_focus ![government landless](../assets/icons/government_landless.png) |  |  |
| learning_lifestyle | education_learning ![child](../assets/icons/child.png) |  |  |
| wanderer_lifestyle | wanderer_internal_affairs_focus | surveyor | mustering_the_troops_perk<br>local_inspection_perk<br><br>know_your_land_know_your_people_perk<br><br>no_stone_unturned_perk<br><br>travel_logs_perk<br><br>local_arbitration_perk<br><br>realm_charts_perk<br><br>personal_touch_perk<br><br>surveyor_perk |
| wanderer_lifestyle | wanderer_journey_focus | wayfarer | well_prepared_perk<br>roaming_perk<br><br>far_and_wide_perk<br><br>just_one_more_hill_perk<br><br>of_the_people_perk<br><br>local_hero_perk<br><br>travel_companion_perk<br><br>the_home_away_from_home_perk<br><br>wayfarer_perk |
| wanderer_lifestyle | wanderer_destination_focus | voyager | power_at_home_perk<br>mercenary_contacts_perk<br><br>journey_perk<br><br>been_there_done_that_perk<br><br>finally_there_perk<br><br>souvenirs_aplenty_perk<br><br>gracious_host_impeccable_guest_perk<br><br>journey_planner_perk<br><br>voyager_perk |


</details>

Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Lifestyles_modding*
