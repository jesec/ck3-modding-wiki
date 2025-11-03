# Modifier list

> **Note:** Last verified for version 1.12


Modifiers are applied to different scopes.

Note that there are two different things that the game calls "modifier". The first is a long term bonus or penalty that is applied to a character, dynasty, or other game item. The second is something that changes the chances of random effects happening. They are both called "modifier" but they are not related.


> **Main article:** [Weight modifier](Weight_modifier.md)


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
| cat_positive | **cat_positive** | cat_negative | **cat_negative** |
| cockroach_positive | **cockroach_positive** | cockroach_negative | **cockroach_negative** |
| county_modifier_control_positive | **control_positive** | county_modifier_control_negative | **control_negative** |
| county_modifier_corruption_positive | **corruption_positive** | county_modifier_corruption_negative | **corruption_negative** |
| county_modifier_development_positive | **development_positive** | county_modifier_development_negative | **development_negative** |
| county_modifier_opinion_positive | **opinion_positive** | county_modifier_opinion_negative | **opinion_negative** |
| diplomacy_positive | **diplomacy_positive** | diplomacy_negative | **diplomacy_negative** |
| dog_positive | **dog_positive** | dog_negative | **dog_negative** |
| dread_positive | **dread_positive** | dread_negative | **dread_negative** |
| drink_positive | **drink_positive** | drink_negative | **drink_negative** |
| economy_positive | **economy_positive** | economy_negative | **economy_negative** |
| family_positive | **family_positive** | family_negative | **family_negative** |
| feast_positive | **feast_positive** | feast_negative | **feast_negative** |
| fertility_positive | **fertility_positive** | fertility_negative | **fertility_negative** |
| food_positive | **food_positive** | food_negative | **food_negative** |
| health_positive | **health_positive** | health_negative | **health_negative** |
| horse_positive | **horse_positive** | horse_negative | **horse_negative** |
| hunt_positive | **hunt_positive** | hunt_negative | **hunt_negative** |
| intrigue_positive | **intrigue_positive** | intrigue_negative | **intrigue_negative** |
| learning_positive | **learning_positive** | learning_negative | **learning_negative** |
| letter_positive | **letter_positive** | letter_negative | **letter_negative** |
| love_positive | **love_positive** | love_negative | **love_negative** |
| magic_positive | **magic_positive** | magic_negative | **magic_negative** |
| martial_positive | **martial_positive** | martial_negative | **martial_negative** |
| outdoors_positive | **outdoors_positive** | outdoors_negative | **outdoors_negative** |
| piety_positive | **piety_positive** | piety_negative | **piety_negative** |
| prestige_positive | **prestige_positive** | prestige_negative | **prestige_negative** |
| prison_positive | **prison_positive** | prison_negative | **prison_negative** |
| prowess_positive | **prowess_positive** | prowess_negative | **prowess_negative** |
| rat_positive | **rat_positive** | rat_negative | **rat_negative** |
| rock_positive | **rock_positive** | rock_negative | **rock_negative** |
| social_positive | **social_positive** | social_negative | **social_negative** |
| spoon_positive | **spoon_positive** | spoon_negative | **spoon_negative** |
| stewardship_positive | **stewardship_positive** | stewardship_negative | **stewardship_negative** |
| stress_positive | **stress_positive** | stress_negative | **stress_negative** |
| treatment_positive | **treatment_positive** | treatment_negative | **treatment_negative** |


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
| life_expectancy | Adds a number of years to the default life expectancy. | <pre><code>character_modifier = {<br>    life_expectancy = 5 # Adds +5 years to expected old age death<br>}</code></pre> |  | Character |
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
| <culture>_opinion |  | Works with modded cultures. | Character | Opinion |
| <faith>_opinion |  | Works with modded faiths. | Character | Opinion |
| <religion>_opinion |  | Works with modded religions. | Character | Opinion |
| <religion_family>_opinion |  | Works with modded religion families. | Character | Opinion |
| monthly_<lifestyle>_xp_gain_mult |  | Works with modded lifestyles. | Character | Character |
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
| <trait>_xp_degradation_mult |  | Works with modded traits. | Character | Traits |
| <trait>_xp_gain_mult |  | Works with modded traits. | Character | Traits |
| <trait>_xp_loss_mult |  | Works with modded traits. | Character | Traits |
| trait_track_<track>_xp_degradation_mult |  | Works with modded traits. | Character | Traits |
| trait_track_<track>_xp_gain_mult |  | Works with modded traits. | Character | Traits |
| trait_track_<track>_xp_loss_mult |  | Works with modded traits. | Character | Traits |
| <region>_development_growth |  | Only works with regions that have ``generates_modifiers = yes`` | Character, Province, County | Development |
| <region>_development_growth_factor |  | Only works with regions that have ``generates_modifiers = yes`` | Character, Province, County | Development |
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

These modifiers affect the opinions and contributions of vassals with certain stances towards their lieges. The syntax is given in the table below and valid values for <vassal_stance> are: ***courtly, glory_hound, parochial, zealot, minority, barons_and_minor_landholders***, plus any vassal stances you have modded in ``common/vassal_stances``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| <vassal_stance>_opinion |  |  | Character | Opinion |
| <vassal_stance>_different_culture_opinion |  |  | Character | Opinion |
| <vassal_stance>_different_faith_opinion |  |  | Character | Opinion |
| <vassal_stance>_same_culture_opinion |  |  | Character | Opinion |
| <vassal_stance>_same_faith_opinion |  |  | Character | Opinion |
| <vassal_stance>_levy_contribution_add |  |  | Character | Government |
| <vassal_stance>_levy_contribution_mult |  |  | Character | Government |
| <vassal_stance>_tax_contribution_add |  |  | Character | Government |
| <vassal_stance>_tax_contribution_mult |  |  | Character | Government |


### Government Related Modifiers

These modifiers affect the opinions and contributions of characters of certain governments towards other characters. The syntax is given in the table below and valid values for <government_name> are: ***feudal_government, republic_government, theocracy_government, clan_government, tribal_government, mercenary_government, holy_order_government***, plus any government types you have modded in ``common/governments``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| <government_name>_opinion |  |  | Character | Opinion |
| <government_name>_vassal_opinion |  |  | Character | Opinion |
| <government_name>_opinion_same_faith |  |  | Character | Opinion |
| <government_name>_tax_contribution_add |  |  | Character | Government |
| <government_name>_tax_contribution_mult |  |  | Character | Government |
| <government_name>_levy_contribution_add |  |  | Character | Government |
| <government_name>_levy_contribution_mult |  |  | Character | Government |


### Holding-type Related Modifiers

These modifiers affect the build cost and speed of (and in) the different holding types. The syntax is given in the table below and valid values for <holding> are: ***castle_holding, city_holding, church_holding, tribal_holding***, plus any holding types you have modded in ``common/holdings``. Note that since the holding types already end with ``_holding``, some of these modifiers will have ``_holding_holding_`` in them. That is normal.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| <holding>_build_speed |  |  |  | Character, Province, County |
| <holding>_build_gold_cost |  |  |  | Character, Province, County |
| <holding>_build_piety_cost |  |  |  | Character, Province, County |
| <holding>_build_prestige_cost |  |  |  | Character, Province, County |
| <holding>_holding_build_speed |  |  |  | Character, Province, County |
| <holding>_holding_build_gold_cost |  |  |  | Character, Province, County |
| <holding>_holding_build_piety_cost |  |  |  | Character, Province, County |
| <holding>_holding_build_prestige_cost |  |  |  | Character, Province, County |
| build_speed |  |  |  | Character, Province, County |
| build_gold_cost |  |  |  | Character, Province, County |
| build_piety_cost |  |  |  | Character, Province, County |
| build_prestige_cost |  |  |  | Character, Province, County |
| holding_build_speed |  |  |  | Character, Province, County |
| holding_build_gold_cost |  |  |  | Character, Province, County |
| holding_build_piety_cost |  |  |  | Character, Province, County |
| holding_build_prestige_cost |  |  |  | Character, Province, County |


### Scheme Related Modifiers

These modifiers affect the schemes of  characters. The syntax is given in the table below and valid values for <scheme_name> are: ***abduct, befriend, claim_throne, convert_to_witchcraft, courting, elope, fabricate_hook, murder, seduce, sway***, plus any schemes you have modded in ``common/schemes``. If the player has got the <u>[Royal Court (DLC)](https://ck3.paradoxwikis.com/Royal_Court_(DLC)) DLC</u> active there are also **learn_language** add **steal_back_artifact** schemes.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| max_<scheme_name>_schemes_add |  |  | Character | Scheme |
| <scheme_name>_scheme_power_add |  |  | Character | Scheme |
| <scheme_name>_scheme_power_mult |  |  | Character | Scheme |
| <scheme_name>_scheme_resistance_add |  |  | Character | Scheme |
| <scheme_name>_scheme_resistance_mult |  |  | Character | Scheme |
| scheme_power_against_<relation>_add |  | Works with modded relations. | Character | Scheme |
| scheme_power_against_<relation>_mult |  | Works with modded relations. | Character | Scheme |


### Terrain Modifiers

These modifiers change the effects of the different terrains. The syntax is given in the table below and valid values for <terrain_name> are: ***plains, farmlands, hills, mountains, desert, desert_mountains, oasis, jungle, forest, taiga, wetlands, steppe, floodplains, drylands***, plus any types you have modded in ``common/terrain_types``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| <terrain_name>_attrition_mult |  |  | Character | Combat |
| <terrain_name>_cancel_negative_supply |  |  | Character | Combat |
| <terrain_name>_advantage |  |  | Character | Combat |
| <terrain_name>_min_combat_roll |  |  | Character | Combat |
| <terrain_name>_max_combat_roll |  |  | Character | Combat |
| <terrain>_development_growth |  |  | Character, Province, County | Development |
| <terrain>_development_growth_factor |  |  | Character, Province, County | Development |
| <terrain>_holding_construction_gold_cost |  |  | Character, Province, County | Construction |
| <terrain>_holding_construction_piety_cost |  |  | Character, Province, County | Construction |
| <terrain>_holding_construction_prestige_cost |  |  | Character, Province, County | Construction |
| <terrain>_construction_gold_cost |  |  | Character, Province, County | Construction |
| <terrain>_construction_piety_cost |  |  | Character, Province, County | Construction |
| <terrain>_construction_prestige_cost |  |  | Character, Province, County | Construction |
| <terrain>_supply_limit |  |  | Character, Province, County | Combat |
| <terrain>_supply_limit_mult |  |  | Character, Province, County | Combat |
| <terrain>_levy_size |  |  | Character, Province, County | Combat |
| <terrain>_travel_danger |  |  | Character, Province, County | Travel |
| <terrain>_tax_mult |  |  | Character, Province, County | Government |


### Men-at-Arms Related Modifiers

These modifiers affect the size and efficacy of Men-at-Arms units of a character. The syntax is given in the table below and valid values for <men_at_arms_name> are: ***heavy_infantry, pikemen, archers, light_cavalry, heavy_cavalry, archer_cavalry, camel_cavalry, elephant_cavalry, skirmishers, siege_weapon***, plus any types you have modded in ``common/men_at_arms_types/``.

| **Name** | **Description** | **Usage** | **Supported Scopes** | **Category** |
| --- | --- | --- | --- | --- |
| <men_at_arms_name>_maintenance_cost_mult |  |  |  | Character |
| <men_at_arms_name>_recruitment_cost_mult |  |  |  | Character |
| <men_at_arms_name>_max_size_add |  |  |  | Character |
| <men_at_arms_name>_max_size_mult |  |  |  | Character |
| <men_at_arms_name>_siege_value_add |  |  |  | Character |
| <men_at_arms_name>_siege_value_mult |  |  |  | Character |
| <men_at_arms_name>_damage_add |  |  |  | Character |
| <men_at_arms_name>_damage_mult |  |  |  | Character |
| <men_at_arms_name>_toughness_add |  |  |  | Character |
| <men_at_arms_name>_toughness_mult |  |  |  | Character |
| <men_at_arms_name>_pursuit_add |  |  |  | Character |
| <men_at_arms_name>_pursuit_mult |  |  |  | Character |
| <men_at_arms_name>_screen_add |  |  |  | Character |
| <men_at_arms_name>_screen_mult |  |  |  | Character |
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
| stationed_<men_at_arms_name>_siege_value_add |  |  |  | Province |
| stationed_<men_at_arms_name>_siege_value_mult |  |  |  | Province |
| stationed_<men_at_arms_name>_damage_add |  |  |  | Province |
| stationed_<men_at_arms_name>_damage_mult |  |  |  | Province |
| stationed_<men_at_arms_name>_toughness_add |  |  |  | Province |
| stationed_<men_at_arms_name>_toughness_mult |  |  |  | Province |
| stationed_<men_at_arms_name>_pursuit_add |  |  |  | Province |
| stationed_<men_at_arms_name>_pursuit_mult |  |  |  | Province |
| stationed_<men_at_arms_name>_screen_add |  |  |  | Province |
| stationed_<men_at_arms_name>_screen_mult |  |  |  | Province |
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
