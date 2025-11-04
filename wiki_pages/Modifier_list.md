# Modifier list

> **Note:** Last verified for version 1.12


Modifiers are applied to different scopes.

Note that there are two different things that the game calls "modifier". The first is a long term bonus or penalty that is applied to a character, dynasty, or other game item. The second is something that changes the chances of random effects happening. They are both called "modifier" but they are not related.


> **Main article:** [Weight modifier](Weight_modifier.md)


- [Creating a Character Modifier](#creating-a-character-modifier)
  - [Icons](#icons)
- [List of Modifiers](#list-of-modifiers)
  - [Vassal Stance Related Modifiers](#vassal-stance-related-modifiers)
  - [Government Related Modifiers](#government-related-modifiers)
  - [Holding-type Related Modifiers](#holding-type-related-modifiers)
  - [Scheme Related Modifiers](#scheme-related-modifiers)
  - [Terrain Modifiers](#terrain-modifiers)
  - [Men-at-Arms Related Modifiers](#men-at-arms-related-modifiers)


## Creating a Character Modifier

Character modifiers are defined in .txt files in the directory: ../common/modifiers

A character modifier is defined as given below:


```
my_new_modifier = {
	icon = icon_name

	# Modifiers, such as
	# tax_mult = 0.25
	# county_opinion_add = -30
}
```


### Icons

Each modifier has an icon that is displayed with its name. It can be set by using ``icon=icon_name`` in the main modifier block. The base game has the following modifier icons available:


| **Name** | **Icon** | **Name** | **Icon** |
| --- | --- | --- | --- |
| cat_positive | ![cat_positive](../assets/icons/cat_positive.png) | cat_negative | ![cat_negative](../assets/icons/cat_negative.png) |
| cockroach_positive | ![cockroach_positive](../assets/icons/cockroach_positive.png) | cockroach_negative | ![cockroach_negative](../assets/icons/cockroach_negative.png) |
| county_modifier_control_positive | ![control_positive](../assets/icons/control_positive.png) | county_modifier_control_negative | ![control_negative](../assets/icons/control_negative.png) |
| county_modifier_corruption_positive | ![corruption_positive](../assets/icons/corruption_positive.png) | county_modifier_corruption_negative | ![corruption_negative](../assets/icons/corruption_negative.png) |
| county_modifier_development_positive | ![development_positive](../assets/icons/development_positive.png) | county_modifier_development_negative | ![development_negative](../assets/icons/development_negative.png) |
| county_modifier_opinion_positive | ![opinion_positive](../assets/icons/opinion_positive.png) | county_modifier_opinion_negative | ![opinion_negative](../assets/icons/opinion_negative.png) |
| diplomacy_positive | ![diplomacy_positive](../assets/icons/diplomacy_positive.png) | diplomacy_negative | ![diplomacy_negative](../assets/icons/diplomacy_negative.png) |
| dog_positive | ![dog_positive](../assets/icons/dog_positive.png) | dog_negative | ![dog_negative](../assets/icons/dog_negative.png) |
| dread_positive | ![dread_positive](../assets/icons/dread_positive.png) | dread_negative | ![dread_negative](../assets/icons/dread_negative.png) |
| drink_positive | ![drink_positive](../assets/icons/drink_positive.png) | drink_negative | ![drink_negative](../assets/icons/drink_negative.png) |
| economy_positive | ![economy_positive](../assets/icons/economy_positive.png) | economy_negative | ![economy_negative](../assets/icons/economy_negative.png) |
| family_positive | ![family_positive](../assets/icons/family_positive.png) | family_negative | ![family_negative](../assets/icons/family_negative.png) |
| feast_positive | ![feast_positive](../assets/icons/feast_positive.png) | feast_negative | ![feast_negative](../assets/icons/feast_negative.png) |
| fertility_positive | ![fertility_positive](../assets/icons/fertility_positive.png) | fertility_negative | ![fertility_negative](../assets/icons/fertility_negative.png) |
| food_positive | ![food_positive](../assets/icons/food_positive.png) | food_negative | ![food_negative](../assets/icons/food_negative.png) |
| health_positive | ![health_positive](../assets/icons/health_positive.png) | health_negative | ![health_negative](../assets/icons/health_negative.png) |
| horse_positive | ![horse_positive](../assets/icons/horse_positive.png) | horse_negative | ![horse_negative](../assets/icons/horse_negative.png) |
| hunt_positive | ![hunt_positive](../assets/icons/hunt_positive.png) | hunt_negative | ![hunt_negative](../assets/icons/hunt_negative.png) |
| intrigue_positive | ![intrigue_positive](../assets/icons/intrigue_positive.png) | intrigue_negative | ![intrigue_negative](../assets/icons/intrigue_negative.png) |
| learning_positive | ![learning_positive](../assets/icons/learning_positive.png) | learning_negative | ![learning_negative](../assets/icons/learning_negative.png) |
| letter_positive | ![letter_positive](../assets/icons/letter_positive.png) | letter_negative | ![letter_negative](../assets/icons/letter_negative.png) |
| love_positive | ![love_positive](../assets/icons/love_positive.png) | love_negative | ![love_negative](../assets/icons/love_negative.png) |
| magic_positive | ![magic_positive](../assets/icons/magic_positive.png) | magic_negative | ![magic_negative](../assets/icons/magic_negative.png) |
| martial_positive | ![martial_positive](../assets/icons/martial_positive.png) | martial_negative | ![martial_negative](../assets/icons/martial_negative.png) |
| outdoors_positive | ![outdoors_positive](../assets/icons/outdoors_positive.png) | outdoors_negative | ![outdoors_negative](../assets/icons/outdoors_negative.png) |
| piety_positive | ![piety_positive](../assets/icons/piety_positive.png) | piety_negative | ![piety_negative](../assets/icons/piety_negative.png) |
| prestige_positive | ![prestige_positive](../assets/icons/prestige_positive.png) | prestige_negative | ![prestige_negative](../assets/icons/prestige_negative.png) |
| prison_positive | ![prison_positive](../assets/icons/prison_positive.png) | prison_negative | ![prison_negative](../assets/icons/prison_negative.png) |
| prowess_positive | ![prowess_positive](../assets/icons/prowess_positive.png) | prowess_negative | ![prowess_negative](../assets/icons/prowess_negative.png) |
| rat_positive | ![rat_positive](../assets/icons/rat_positive.png) | rat_negative | ![rat_negative](../assets/icons/rat_negative.png) |
| rock_positive | ![rock_positive](../assets/icons/rock_positive.png) | rock_negative | ![rock_negative](../assets/icons/rock_negative.png) |
| social_positive | ![social_positive](../assets/icons/social_positive.png) | social_negative | ![social_negative](../assets/icons/social_negative.png) |
| spoon_positive | ![spoon_positive](../assets/icons/spoon_positive.png) | spoon_negative | ![spoon_negative](../assets/icons/spoon_negative.png) |
| stewardship_positive | ![stewardship_positive](../assets/icons/stewardship_positive.png) | stewardship_negative | ![stewardship_negative](../assets/icons/stewardship_negative.png) |
| stress_positive | ![stress_positive](../assets/icons/stress_positive.png) | stress_negative | ![stress_negative](../assets/icons/stress_negative.png) |
| treatment_positive | ![treatment_positive](../assets/icons/treatment_positive.png) | treatment_negative | ![treatment_negative](../assets/icons/treatment_negative.png) |


There are more; you can see all of them in ``gfx/interface/icons/modifiers/`` in your game files.


## List of Modifiers

These modifiers can be used in the definition of Modifiers to apply different effects to them. Note that this list has been generated from the output of the "script_docs" console command.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| diplomacy | Adds or Subtracts skill points from the characters Diplomacy skill. | diplomacy = 1 | Any from the Character group. | Character |
| martial | Adds or Subtracts skill points from the characters Martial skill. | martial = -3 | Any from the Character group. | Character |
| stewardship | Adds or Subtracts skill points from the characters Stewardship skill. | stewardship = 2 | Any from the Character group. | Character |
| intrigue | Adds or Subtracts skill points from the characters Intrigue skill. | intrigue = -2 | Any from the Character group. | Character |
| learning | Adds or Subtracts skill points from the characters Learning skill. | learning = 3 | Any from the Character group. | Character |
| prowess | Adds or Subtracts skill points from the characters Prowess skill. | prowess = 3 | Any from the Character group. | Character |
| prowess_no_portrait | As prowess, but does not affect how buff the character looks. |  |  | Character |
| negate_diplomacy_penalty_add |  |  |  | Character |
| negate_martial_penalty_add |  |  |  | Character |
| negate_stewardship_penalty_add |  |  |  | Character |
| negate_intrigue_penalty_add |  |  |  | Character |
| negate_learning_penalty_add |  |  |  | Character |
| negate_prowess_penalty_add |  |  |  | Character |
| no_prowess_loss_from_age |  |  |  | Character |
| diplomacy_per_piety_level | The character will receive or lose a point of Diplomacy skill for every level of piety. | diplomacy_per_piety_level = 1 | Any from the Character group. | Character |
| martial_per_piety_level | The character will receive or lose a point of Martial skill for every level of piety. | martial_per_piety_level = -2 | Any from the Character group. | Character |
| stewardship_per_piety_level | The character will receive or lose a point of Stewardship skill for every level of piety. | stewardship_per_piety_level = 1 | Any from the Character group. | Character |
| intrigue_per_piety_level | The character will receive or lose a point of Intrigue skill for every level of piety. | intrigue_per_piety_level = 2 | Any from the Character group. | Character |
| learning_per_piety_level | The character will receive or lose a point of Learning skill for every level of piety. | learning_per_piety_level = -1 | Any from the Character group. | Character |
| prowess_per_piety_level | The character will receive or lose a point of Prowess skill for every level of piety. | prowess_per_piety_level = 1 | Any from the Character group. | Character |
| diplomacy_per_prestige_level |  |  | Any from the Character group. | Character |
| martial_per_prestige_level |  |  |  | Character |
| stewardship_per_prestige_level |  |  |  | Character |
| intrigue_per_prestige_level |  |  |  | Character |
| learning_per_prestige_level |  |  |  | Character |
| prowess_per_prestige_level |  |  |  | Character |
| piety_level_impact_mult |  |  |  | Character |
| prestige_level_impact_mult |  |  |  | Character |
| diplomacy_per_stress_level |  |  |  | Character |
| martial_per_stress_level |  |  |  | Character |
| stewardship_per_stress_level |  |  |  | Character |
| intrigue_per_stress_level |  |  |  | Character |
| learning_per_stress_level |  |  |  | Character |
| prowess_per_stress_level |  |  |  | Character |
| fertility |  |  |  | Character |
| health |  |  |  | Character |
| negate_fertility_penalty_add |  |  |  | Character |
| negate_health_penalty_add |  |  |  | Character |
| monthly_income |  |  |  | Character |
| monthly_income_mult |  |  |  | Character |
| monthly_war_income_add |  |  |  | Character |
| monthly_war_income_mult |  |  |  | Character |
| monthly_income_per_stress_level_add |  |  |  | Character |
| monthly_income_per_stress_level_mult |  |  |  | Character |
| monthly_piety |  |  |  | Character |
| monthly_piety_gain_mult |  |  |  | Character |
| monthly_piety_gain_per_happy_powerful_vassal_add |  |  |  | Character |
| monthly_piety_gain_per_happy_powerful_vassal_mult |  |  |  | Character |
| monthly_piety_gain_per_dread_add |  |  |  | Character |
| monthly_piety_gain_per_dread_mult |  |  |  | Character |
| monthly_piety_gain_per_knight_add |  |  |  | Character |
| monthly_piety_gain_per_knight_mult |  |  |  | Character |
| monthly_prestige |  |  |  | Character |
| monthly_prestige_gain_mult |  |  |  | Character |
| monthly_prestige_gain_per_happy_powerful_vassal_add |  |  |  | Character |
| monthly_prestige_gain_per_happy_powerful_vassal_mult |  |  |  | Character |
| monthly_prestige_gain_per_dread_add |  |  |  | Character |
| monthly_prestige_gain_per_dread_mult |  |  |  | Character |
| monthly_prestige_gain_per_knight_add |  |  |  | Character |
| monthly_prestige_gain_per_knight_mult |  |  |  | Character |
| monthly_piety_from_buildings_mult |  |  |  | Character |
| monthly_prestige_from_buildings_mult |  |  |  | Character |
| monthly_dynasty_prestige |  |  |  | Character |
| monthly_dynasty_prestige_mult |  |  |  | Character |
| monthly_influence |  |  |  | Character |
| monthly_influence_mult |  |  |  | Character |
| stress_gain_mult |  |  |  | Character |
| stress_loss_mult |  |  |  | Character |
| monthly_dread |  |  |  | Character |
| dread_gain_mult |  |  |  | Character |
| dread_loss_mult |  |  |  | Character |
| tyranny_gain_mult |  |  |  | Character |
| tyranny_loss_mult |  |  |  | Character |
| monthly_tyranny |  |  |  | Character |
| dread_baseline_add |  |  |  | Character |
| dread_decay_add |  |  |  | Character |
| dread_decay_mult |  |  |  | Character |
| dread_per_tyranny_add |  |  |  | Character |
| dread_per_tyranny_mult |  |  |  | Character |
| domain_limit |  |  |  | Character |
| vassal_limit |  |  |  | Character |
| domain_tax_mult |  |  |  | Character |
| domain_tax_same_faith_mult |  |  |  | Character |
| domain_tax_different_faith_mult |  |  |  | Character |
| domain_tax_mult_even_if_baron |  |  |  | Character |
| domain_tax_same_faith_mult_even_if_baron |  |  |  | Character |
| domain_tax_different_faith_mult_even_if_baron |  |  |  | Character |
| vassal_tax_mult |  |  |  | Character |
| men_at_arms_maintenance |  |  |  | Character |
| men_at_arms_maintenance_per_dread_mult |  |  |  | Character |
| army_maintenance_mult |  |  |  | Character |
| short_reign_duration_mult |  |  |  | Character |
| long_reign_bonus_mult |  |  |  | Character |
| diplomatic_range_mult |  |  |  | Character |
| inbreeding_chance |  |  |  | Character |
| positive_inactive_inheritance_chance |  |  |  | Character |
| negative_inactive_inheritance_chance |  |  |  | Character |
| positive_random_genetic_chance |  |  |  | Character |
| negative_random_genetic_chance |  |  |  | Character |
| genetic_trait_strengthen_chance |  |  |  | Character |
| life_expectancy | Adds a number of years to the default life expectancy. | <code style="white-space: pre">character_modifier = {<br>    life_expectancy = 5 # Adds +5 years to expected old age death<br>}</code> |  | Character |
| years_of_fertility |  |  |  | Character |
| knight_limit |  |  |  | Character |
| knight_effectiveness_mult |  |  |  | Character |
| title_creation_cost |  |  |  | Character |
| title_creation_cost_mult |  |  |  | Character |
| monthly_lifestyle_xp_gain_mult |  |  |  | Character |
| mercenary_hire_cost_add |  |  |  | Character |
| mercenary_hire_cost_mult |  |  |  | Character |
| same_culture_mercenary_hire_cost_add |  |  |  | Character |
| same_culture_mercenary_hire_cost_mult |  |  |  | Character |
| holy_order_hire_cost_mult |  |  |  | Character |
| holy_order_hire_cost_add |  |  |  | Character |
| same_culture_holy_order_hire_cost_mult |  |  |  | Character |
| same_culture_holy_order_hire_cost_add |  |  |  | Character |
| opinion_of_female_rulers |  |  | Character | Opinion |
| opinion_of_male_rulers |  |  | Character | Opinion |
| opinion_of_same_culture |  |  | Character | Opinion |
| opinion_of_different_culture |  |  | Character | Opinion |
| opinion_of_same_faith |  |  | Character | Opinion |
| opinion_of_different_faith |  |  | Character | Opinion |
| opinion_of_liege |  |  | Character | Opinion |
| opinion_of_vassal |  |  | Character | Opinion |
| opinion_of_different_faith_liege |  |  | Character | Opinion |
| same_culture_opinion |  |  | Character | Opinion |
| different_culture_opinion |  |  | Character | Opinion |
| same_faith_opinion |  |  | Character | Opinion |
| different_faith_opinion |  |  | Character | Opinion |
| direct_vassal_opinion |  |  | Character | Opinion |
| fellow_vassal_opinion |  |  | Character | Opinion |
| independent_ruler_opinion |  |  | Character | Opinion |
| general_opinion |  |  | Character | Opinion |
| attraction_opinion |  |  | Character | Opinion |
| religious_vassal_opinion |  |  | Character | Opinion |
| religious_head_opinion |  |  | Character | Opinion |
| spouse_opinion |  |  | Character | Opinion |
| twin_opinion |  |  | Character | Opinion |
| close_relative_opinion |  |  | Character | Opinion |
| dynasty_house_opinion |  |  | Character | Opinion |
| dynasty_opinion |  |  | Character | Opinion |
| liege_opinion |  |  | Character | Opinion |
| different_faith_liege_opinion |  |  | Character | Opinion |
| vassal_opinion |  |  | Character | Opinion |
| clergy_opinion |  |  | Character | Opinion |
| councillor_opinion |  |  | Character | Opinion |
| realm_priest_opinion |  |  | Character | Opinion |
| powerful_vassal_opinion |  |  | Character | Opinion |
| courtier_opinion |  |  | Character | Opinion |
| guest_opinion |  |  | Character | Opinion |
| courtier_and_guest_opinion |  |  | Character | Opinion |
| prisoner_opinion |  |  | Character | Opinion |
| player_heir_opinion |  |  | Character | Opinion |
| child_opinion |  |  | Character | Opinion |
| child_except_player_heir_opinion |  |  | Character | Opinion |
| eligible_child_opinion |  |  | Character | Opinion |
| eligible_child_except_player_heir_opinion |  |  | Character | Opinion |
| ignore_negative_culture_opinion |  |  | Character | Opinion |
| ignore_different_faith_opinion |  |  | Character | Opinion |
| pursue_efficiency |  |  |  | Combat |
| counter_efficiency |  |  |  | Combat |
| min_combat_roll |  |  |  | Combat |
| max_combat_roll |  |  |  | Combat |
| men_at_arms_limit | Affects size of individual regiments |  |  | Combat |
| men_at_arms_cap | Affects total number of regiments possible |  |  | Combat |
| embarkation_cost_mult |  |  |  | Combat |
| naval_movement_speed_mult |  |  |  | Combat |
| siege_phase_time |  |  |  | Siege |
| siege_morale_loss |  |  |  | Siege |
| revolting_siege_morale_loss_add |  |  |  | Siege |
| revolting_siege_morale_loss_mult |  |  |  | Siege |
| vassal_tax_contribution_add |  |  |  | Government |
| vassal_tax_contribution_mult |  |  |  | Government |
| intimidated_vassal_tax_contribution_add |  |  |  | Character |
| intimidated_vassal_tax_contribution_mult |  |  |  | Character |
| cowed_vassal_tax_contribution_add |  |  |  | Character |
| cowed_vassal_tax_contribution_mult |  |  |  | Character |
| vassal_levy_contribution_add |  |  |  | Government |
| vassal_levy_contribution_mult |  |  |  | Government |
| intimidated_vassal_levy_contribution_add |  |  |  | Character |
| intimidated_vassal_levy_contribution_mult |  |  |  | Character |
| cowed_vassal_levy_contribution_add |  |  |  | Character |
| cowed_vassal_levy_contribution_mult |  |  |  | Character |
| happy_powerful_vassal_tax_contribution_add |  |  |  | Character |
| happy_powerful_vassal_tax_contribution_mult |  |  |  | Character |
| happy_powerful_vassal_levy_contribution_add |  |  |  | Character |
| happy_powerful_vassal_levy_contribution_mult |  |  |  | Character |
| scheme_power |  |  |  | Scheme |
| scheme_resistance |  |  |  | Scheme |
| scheme_secrecy |  |  |  | Scheme |
| scheme_success_chance |  |  |  | Scheme |
| hostile_scheme_power_add |  |  |  | Character |
| hostile_scheme_power_mult |  |  |  | Character |
| personal_scheme_power_add |  |  |  | Character |
| personal_scheme_power_mult |  |  |  | Character |
| hostile_scheme_resistance_add |  |  |  | Character |
| hostile_scheme_resistance_mult |  |  |  | Character |
| personal_scheme_resistance_add |  |  |  | Character |
| personal_scheme_resistance_mult |  |  |  | Character |
| diplomacy_scheme_power |  |  |  | Character |
| intrigue_scheme_power |  |  |  | Character |
| stewardship_scheme_power |  |  |  | Character |
| martial_scheme_power |  |  |  | Character |
| prowess_scheme_power |  |  |  | Character |
| learning_scheme_power |  |  |  | Character |
| diplomacy_scheme_resistance |  |  |  | Character |
| intrigue_scheme_resistance |  |  |  | Character |
| stewardship_scheme_resistance |  |  |  | Character |
| martial_scheme_resistance |  |  |  | Character |
| prowess_scheme_resistance |  |  |  | Character |
| learning_scheme_resistance |  |  |  | Character |
| scheme_discovery_chance_mult |  |  |  | Character |
| max_personal_schemes_add |  |  |  | Character |
| max_hostile_schemes_add |  |  |  | Character |
| owned_hostile_scheme_success_chance_add |  |  |  | Character |
| owned_personal_scheme_success_chance_add |  |  |  | Character |
| enemy_hostile_scheme_success_chance_add |  |  |  | Character |
| enemy_personal_scheme_success_chance_add |  |  |  | Character |
| movement_speed |  |  |  | Combat |
| retreat_losses |  |  |  | Combat |
| hard_casualty_modifier |  |  |  | Combat |
| enemy_hard_casualty_modifier |  |  |  | Combat |
| advantage |  |  |  | Combat |
| attacker_advantage |  |  |  | Combat |
| defender_advantage |  |  |  | Combat |
| enemy_terrain_advantage |  |  |  | Combat |
| tolerance_advantage_mod |  |  |  | Combat |
| advantage_against_coreligionists |  |  |  | Combat |
| random_advantage |  |  |  | Combat |
| controlled_province_advantage |  |  | Character | Combat |
| no_water_crossing_penalty |  |  |  | Combat |
| raid_speed |  |  |  | Combat |
| hostile_county_attrition |  |  |  | Combat |
| supply_duration |  |  |  | Combat |
| supply_limit_mult |  |  |  | Province |
| supply_limit |  |  |  | Province |
| fort_level |  |  |  | Province |
| supply_capacity_add |  |  |  | Province |
| supply_capacity_mult |  |  |  | Province |
| hostile_raid_time |  |  |  | Province |
| levy_size |  |  |  | Holding |
| garrison_size |  |  |  | Holding |
| levy_reinforcement_rate |  |  |  | Holding |
| levy_reinforcement_rate_same_faith |  |  |  | Character |
| levy_reinforcement_rate_different_faith |  |  |  | Character |
| levy_reinforcement_rate_even_if_baron |  |  |  | Character |
| levy_reinforcement_rate_same_faith_even_if_baron |  |  |  | Character |
| levy_reinforcement_rate_different_faith_even_if_baron |  |  |  | Character |
| levy_reinforcement_rate_friendly_territory |  |  |  | Holding |
| tax_mult |  |  |  | Holding |
| development_growth_factor |  |  |  | County |
| development_growth |  |  |  | County |
| character_capital_county_monthly_development_growth_add |  |  |  | Character |
| monthly_county_control_growth_add |  |  | Character, Province, County | County |
| monthly_county_control_growth_factor |  |  | Character, Province, County | County |
| monthly_county_control_growth_add_even_if_baron |  |  | Character | County |
| monthly_county_control_growth_factor_even_if_baron |  |  | Character | County |
| monthly_county_control_decline_add |  |  | Character, Province, County | County |
| monthly_county_control_decline_factor |  |  | Character, Province, County | County |
| monthly_county_control_decline_add_even_if_baron |  |  | Character | County |
| monthly_county_control_decline_factor_even_if_baron |  |  | Character | County |
| county_opinion_add |  |  | Character, County | Opinion |
| different_faith_county_opinion_mult |  |  | Character | Opinion |
| county_opinion_add_even_if_baron |  |  | Character | Opinion |
| different_faith_county_opinion_mult_even_if_baron |  |  | Character | Opinion |
| mercenary_count_mult |  |  |  | Culture |
| cultural_head_fascination_add |  |  |  | Character |
| cultural_head_fascination_mult |  |  |  | Character |
| faith_conversion_piety_cost_add |  |  |  | Character |
| faith_conversion_piety_cost_mult |  |  |  | Character |
| faith_creation_piety_cost_add |  |  |  | Character |
| faith_creation_piety_cost_mult |  |  |  | Character |
| ai_boldness |  |  |  | AI |
| ai_compassion |  |  |  | AI |
| ai_sociability |  |  |  | AI |
| ai_greed |  |  |  | AI |
| ai_energy |  |  |  | AI |
| ai_honor |  |  |  | AI |
| ai_rationality |  |  |  | AI |
| ai_vengefulness |  |  |  | AI |
| ai_zeal |  |  |  | AI |
| ai_war_chance |  |  |  | AI |
| ai_war_cooldown |  |  |  | AI |
| &lt;culture&gt;_opinion |  | Works with modded cultures. | Character | Opinion |
| &lt;faith&gt;_opinion |  | Works with modded faiths. | Character | Opinion |
| &lt;religion&gt;_opinion |  | Works with modded religions. | Character | Opinion |
| &lt;religion_family&gt;_opinion |  | Works with modded religion families. | Character | Opinion |
| monthly_&lt;lifestyle&gt;_xp_gain_mult |  | Works with modded lifestyles. | Character | Character |
| court_grandeur_baseline_add |  |  |  | Character |
| accolade_glory_gain_mult |  |  | Character |  |
| active_accolades |  |  | Character |  |
| additional_fort_level |  |  | Character, Province, County |  |
| ai_amenity_spending |  |  | Character |  |
| ai_amenity_target_baseline |  |  | Character |  |
| army_damage_mult |  |  | Character |  |
| army_pursuit_mult |  |  | Character |  |
| army_screen_mult |  |  | Character |  |
| army_siege_value_mult |  |  | Character |  |
| army_toughness_mult |  |  | Character |  |
| artifact_decay_reduction_mult |  |  | Character, Province, County |  |
| building_slot_add |  |  | Character, Province, County |  |
| character_travel_safety |  |  | Character |  |
| character_travel_safety_mult |  |  | Character |  |
| character_travel_speed |  |  | Character |  |
| character_travel_speed_mult |  |  | Character |  |
| coastal_advantage |  |  | Character |  |
| counter_resistance |  |  | Character, Terrain |  |
| cultural_acceptance_gain_mult |  |  | Culture |  |
| cultural_head_acceptance_gain_mult |  |  | Character |  |
| culture_tradition_max_add |  |  | Character |  |
| defender_holding_advantage |  |  | Character, Province, County |  |
| defender_winter_advantage |  |  | Province |  |
| hard_casualty_winter |  |  | Province |  |
| hostile_county_attrition_raiding |  |  | Character |  |
| ignore_negative_opinion_of_culture |  |  | Character | Opinion |
| ignore_opinion_of_different_faith |  |  | Character | Opinion |
| independent_primary_defender_advantage_add |  |  | Character |  |
| knight_effectiveness_per_dread |  |  | Character |  |
| knight_effectiveness_per_tyranny |  |  | Character |  |
| led_by_owner_extra_advantage_add |  |  | Character |  |
| levy_maintenance |  |  | Character |  |
| levy_pursuit |  |  | Character |  |
| levy_screen |  |  | Character |  |
| levy_siege |  |  | Character |  |
| max_loot_mult |  |  | Character |  |
| men_at_arms_recruitment_cost |  |  | Character |  |
| monthly_county_control_growth_at_war_add |  |  | Character, Province, County |  |
| monthly_county_control_growth_at_war_factor |  |  | Character, Province, County |  |
| monthly_county_control_decline_at_war_add |  |  | Character, Province, County |  |
| monthly_county_control_decline_at_war_factor |  |  | Character, Province, County |  |
| monthly_court_grandeur_change_add |  |  | Character |  |
| monthly_court_grandeur_change_mult |  |  | Character |  |
| movement_speed_land_raiding |  |  | Character |  |
| no_disembark_penalty |  |  | Character |  |
| opinion_of_parents |  |  | Character | Opinion |
| owned_scheme_secrecy_add |  |  | Character |  |
| same_heritage_county_advantage_add |  |  | Character |  |
| stress_loss_per_piety_level |  |  | Character |  |
| stress_loss_per_prestige_level |  |  | Character |  |
| strife_opinion_gain_mult |  |  | Character | Opinion |
| strife_opinion_loss_mult |  |  | Character | Opinion |
| supply_loss_winter |  |  | Province |  |
| travel_companion_opinion |  |  | Character | Opinion |
| travel_danger |  |  | Character, Province, County |  |
| travel_safety_mult |  |  | Travel Plan |  |
| travel_safety |  |  | Travel Plan |  |
| travel_speed_mult |  |  | Travel Plan |  |
| travel_speed |  |  | Travel Plan |  |
| uncontrolled_province_advantage |  |  | Character |  |
| winter_advantage |  |  | Character |  |
| winter_movement_speed |  |  | Character |  |
| &lt;trait&gt;_xp_degradation_mult |  | Works with modded traits. | Character | Traits |
| &lt;trait&gt;_xp_gain_mult |  | Works with modded traits. | Character | Traits |
| &lt;trait&gt;_xp_loss_mult |  | Works with modded traits. | Character | Traits |
| trait_track_&lt;track&gt;_xp_degradation_mult |  | Works with modded traits. | Character | Traits |
| trait_track_&lt;track&gt;_xp_gain_mult |  | Works with modded traits. | Character | Traits |
| trait_track_&lt;track&gt;_xp_loss_mult |  | Works with modded traits. | Character | Traits |
| &lt;region&gt;_development_growth |  | Only works with regions that have `generates_modifiers = yes` | Character, Province, County | Development |
| &lt;region&gt;_development_growth_factor |  | Only works with regions that have `generates_modifiers = yes` | Character, Province, County | Development |
| legitimacy_baseline_add |  |  | Character | Character |
| legitimacy_gain_mult |  |  | Character | Character |
| legitimacy_loss_mult |  |  | Character | Character |
| monthly_legitimacy_add |  |  | Character | Character |
| monthly_prestige_gain_per_legitimacy_level_add |  |  | Character | Character |
| monthly_prestige_gain_per_legitimacy_level_mult |  |  | Character | Character |
| monthly_piety_gain_per_legitimacy_level_add |  |  | Character | Character |
| monthly_piety_gain_per_legitimacy_level_mult |  |  | Character | Character |
| owned_legend_spread_add |  |  | Character | Character |
| owned_legend_spread_mult |  |  | Character | Character |


### Vassal Stance Related Modifiers

These modifiers affect the opinions and contributions of vassals with certain stances towards their lieges. The syntax is given in the table below and valid values for &lt;vassal_stance> are: ***courtly, glory_hound, parochial, zealot, minority, barons_and_minor_landholders***, plus any vassal stances you have modded in ``common/vassal_stances``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| &lt;vassal_stance&gt;_opinion |  |  | Character | Opinion |
| &lt;vassal_stance&gt;_different_culture_opinion |  |  | Character | Opinion |
| &lt;vassal_stance&gt;_different_faith_opinion |  |  | Character | Opinion |
| &lt;vassal_stance&gt;_same_culture_opinion |  |  | Character | Opinion |
| &lt;vassal_stance&gt;_same_faith_opinion |  |  | Character | Opinion |
| &lt;vassal_stance&gt;_levy_contribution_add |  |  | Character | Government |
| &lt;vassal_stance&gt;_levy_contribution_mult |  |  | Character | Government |
| &lt;vassal_stance&gt;_tax_contribution_add |  |  | Character | Government |
| &lt;vassal_stance&gt;_tax_contribution_mult |  |  | Character | Government |


### Government Related Modifiers

These modifiers affect the opinions and contributions of characters of certain governments towards other characters. The syntax is given in the table below and valid values for &lt;government_name> are: ***feudal_government, republic_government, theocracy_government, clan_government, tribal_government, mercenary_government, holy_order_government***, plus any government types you have modded in ``common/governments``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| &lt;government_name&gt;_opinion |  |  | Character | Opinion |
| &lt;government_name&gt;_vassal_opinion |  |  | Character | Opinion |
| &lt;government_name&gt;_opinion_same_faith |  |  | Character | Opinion |
| &lt;government_name&gt;_tax_contribution_add |  |  | Character | Government |
| &lt;government_name&gt;_tax_contribution_mult |  |  | Character | Government |
| &lt;government_name&gt;_levy_contribution_add |  |  | Character | Government |
| &lt;government_name&gt;_levy_contribution_mult |  |  | Character | Government |


### Holding-type Related Modifiers

These modifiers affect the build cost and speed of (and in) the different holding types. The syntax is given in the table below and valid values for &lt;holding> are: ***castle_holding, city_holding, church_holding, tribal_holding***, plus any holding types you have modded in ``common/holdings``. Note that since the holding types already end with ``_holding``, some of these modifiers will have ``_holding_holding_`` in them. That is normal.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| &lt;holding&gt;_build_speed |  |  |  | Character, Province, County |
| &lt;holding&gt;_build_gold_cost |  |  |  | Character, Province, County |
| &lt;holding&gt;_build_piety_cost |  |  |  | Character, Province, County |
| &lt;holding&gt;_build_prestige_cost |  |  |  | Character, Province, County |
| &lt;holding&gt;_holding_build_speed |  |  |  | Character, Province, County |
| &lt;holding&gt;_holding_build_gold_cost |  |  |  | Character, Province, County |
| &lt;holding&gt;_holding_build_piety_cost |  |  |  | Character, Province, County |
| &lt;holding&gt;_holding_build_prestige_cost |  |  |  | Character, Province, County |
| build_speed |  |  |  | Character, Province, County |
| build_gold_cost |  |  |  | Character, Province, County |
| build_piety_cost |  |  |  | Character, Province, County |
| build_prestige_cost |  |  |  | Character, Province, County |
| holding_build_speed |  |  |  | Character, Province, County |
| holding_build_gold_cost |  |  |  | Character, Province, County |
| holding_build_piety_cost |  |  |  | Character, Province, County |
| holding_build_prestige_cost |  |  |  | Character, Province, County |


### Scheme Related Modifiers

These modifiers affect the schemes of  characters. The syntax is given in the table below and valid values for &lt;scheme_name> are: ***abduct, befriend, claim_throne, convert_to_witchcraft, courting, elope, fabricate_hook, murder, seduce, sway***, plus any schemes you have modded in ``common/schemes``. If the player has got the <u>[Royal Court](https://ck3.paradoxwikis.com/Royal_Court_(DLC)) DLC</u> active there are also **learn_language** add **steal_back_artifact** schemes.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| max_&lt;scheme_name&gt;_schemes_add |  |  | Character | Scheme |
| &lt;scheme_name&gt;_scheme_power_add |  |  | Character | Scheme |
| &lt;scheme_name&gt;_scheme_power_mult |  |  | Character | Scheme |
| &lt;scheme_name&gt;_scheme_resistance_add |  |  | Character | Scheme |
| &lt;scheme_name&gt;_scheme_resistance_mult |  |  | Character | Scheme |
| scheme_power_against_&lt;relation&gt;_add |  | Works with modded relations. | Character | Scheme |
| scheme_power_against_&lt;relation&gt;_mult |  | Works with modded relations. | Character | Scheme |


### Terrain Modifiers

These modifiers change the effects of the different terrains. The syntax is given in the table below and valid values for &lt;terrain_name> are: ***plains, farmlands, hills, mountains, desert, desert_mountains, oasis, jungle, forest, taiga, wetlands, steppe, floodplains, drylands***, plus any types you have modded in ``common/terrain_types``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| &lt;terrain_name&gt;_attrition_mult |  |  | Character | Combat |
| &lt;terrain_name&gt;_cancel_negative_supply |  |  | Character | Combat |
| &lt;terrain_name&gt;_advantage |  |  | Character | Combat |
| &lt;terrain_name&gt;_min_combat_roll |  |  | Character | Combat |
| &lt;terrain_name&gt;_max_combat_roll |  |  | Character | Combat |
| &lt;terrain&gt;_development_growth |  |  | Character, Province, County | Development |
| &lt;terrain&gt;_development_growth_factor |  |  | Character, Province, County | Development |
| &lt;terrain&gt;_holding_construction_gold_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_holding_construction_piety_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_holding_construction_prestige_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_construction_gold_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_construction_piety_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_construction_prestige_cost |  |  | Character, Province, County | Construction |
| &lt;terrain&gt;_supply_limit |  |  | Character, Province, County | Combat |
| &lt;terrain&gt;_supply_limit_mult |  |  | Character, Province, County | Combat |
| &lt;terrain&gt;_levy_size |  |  | Character, Province, County | Combat |
| &lt;terrain&gt;_travel_danger |  |  | Character, Province, County | Travel |
| &lt;terrain&gt;_tax_mult |  |  | Character, Province, County | Government |


### Men-at-Arms Related Modifiers

These modifiers affect the size and efficacy of Men-at-Arms units of a character. The syntax is given in the table below and valid values for &lt;men_at_arms_name> are: ***heavy_infantry, pikemen, archers, light_cavalry, heavy_cavalry, archer_cavalry, camel_cavalry, elephant_cavalry, skirmishers, siege_weapon***, plus any types you have modded in ``common/men_at_arms_types/``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| &lt;men_at_arms_name&gt;_maintenance_cost_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_recruitment_cost_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_max_size_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_max_size_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_siege_value_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_siege_value_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_damage_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_damage_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_toughness_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_toughness_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_pursuit_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_pursuit_mult |  |  |  | Character |
| &lt;men_at_arms_name&gt;_screen_add |  |  |  | Character |
| &lt;men_at_arms_name&gt;_screen_mult |  |  |  | Character |
| maa_siege_value_add |  |  |  | Character |
| maa_siege_value_mult |  |  |  | Character |
| maa_damage_add |  |  |  | Character |
| maa_damage_mult |  |  |  | Character |
| maa_toughness_add |  |  |  | Character |
| maa_toughness_mult |  |  |  | Character |
| maa_pursuit_add |  |  |  | Character |
| maa_pursuit_mult |  |  |  | Character |
| maa_screen_add |  |  |  | Character |
| maa_screen_mult |  |  |  | Character |
| stationed_&lt;men_at_arms_name&gt;_siege_value_add |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_siege_value_mult |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_damage_add |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_damage_mult |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_toughness_add |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_toughness_mult |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_pursuit_add |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_pursuit_mult |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_screen_add |  |  |  | Province |
| stationed_&lt;men_at_arms_name&gt;_screen_mult |  |  |  | Province |
| stationed_maa_siege_value_add |  |  |  | Province |
| stationed_maa_siege_value_mult |  |  |  | Province |
| stationed_maa_damage_add |  |  |  | Province |
| stationed_maa_damage_mult |  |  |  | Province |
| stationed_maa_toughness_add |  |  |  | Province |
| stationed_maa_toughness_mult |  |  |  | Province |
| stationed_maa_pursuit_add |  |  |  | Province |
| stationed_maa_pursuit_mult |  |  |  | Province |
| stationed_maa_screen_add |  |  |  | Province |
| stationed_maa_screen_mult |  |  |  | Province |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Modifier_list*
