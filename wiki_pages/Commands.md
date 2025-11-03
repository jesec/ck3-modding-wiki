# Commands

> **Note:** Last verified for version 1.0


    - Commands** or **effects** are used in [scripting](Scripting.md) to alter the target that was selected with [scopes](Scopes.md) and [conditions](https://ck3.paradoxwikis.com/conditions).

They appear in:
- command blocks (the *immediate* and *option* sections of [events](https://ck3.paradoxwikis.com/events), or similar: effect, creation_effect, gain_effect, success, ...)
- [scripted effect](Scripted_effects.md)s, which can be used to group commands into re-usable macro.

(Scripting) commands are different from [console commands](Console_commands.md), though some console commands have a scripting equivalent.

Available commands depend on the current [scope](Scopes.md) type.

## List of Commands


|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| **Command** | **Used in vanilla** | **Used from scope** | **Value type** | **Description** | **Example** | **Category** |
| add_dynasty_modifier |  | dynasty |  | Adds a modifier to a dynasty. | add_dynasty_modifier = name<br>add_dynasty_modifier = { modifier = name days/weeks/months/years = int } | Modifiers |
| add_dynasty_perk |  | dynasty | key | Adds dynasty perk. | add_dynasty_perk = key | Lifestyles |
| dynasty_prestige [amount] |  | dynasty | int | Adds [amount] dynasty prestige. |  | Dynasty |
| add_dynasty_prestige_level |  | dynasty |  | Adds dynasty prestige levels. |  | Dynasty |
| remove_all_dynasty_modifier_instances |  | dynasty | modifier | Remove all instances of a modifier from a dynasty. | remove_all_dynasty_modifier_instances = name | Modifiers |
| remove_dynasty_modifier |  | dynasty | modifier | Remove a modifier from a dynasty. | remove_dynasty_modifier = name | Modifiers |
| add_house_modifier |  | dynasty/house | modifier | Add a modifier to a house. | add_house_modifier = name | Modifiers |
| remove_all_house_modifier_instances |  | dynasty/house | modifier | Remove all instances of a modifier from a house. | remove_all_house_modifier_instances = name | Modifiers |
| remove_house_modifier |  | dynasty/house | modifier | Remove a modifier from a house. | remove_house_modifier = name | Modifiers |
| add_scheme_modifier |  | scheme | modifier for "type" and int for "days" | Adds the specified scheme modifier.<br> | add_scheme_modifier = { type = X days = Y }<br>(Days are optional, the modifier will expire in Y days if specified) | Modifiers |
| add_scheme_progress |  | scheme | int | Add progress to the scope scheme. (Progress is in 0.0 - 100.0 range) | add_scheme_progress = X | Schemes |
| end_scheme |  | scheme | bool | Ends a specific scheme and removes it without any other effect. | end_scheme = yes | Schemes |
| expose_scheme |  | scheme |  | Exposes the scheme to the defender |  | Schemes |
| expose_scheme_agent |  | scheme | character | Exposes the target character as an agent of the current scheme. |  | Schemes |
| remove_scheme_modifier |  | scheme | modifier | Removes the specified scheme modifier. |  | Modifiers |
| scheme_freeze_days |  | scheme | int | freezes the scheme for X days (0 unfreezes the scheme) | scheme_freeze_days = X | Schemes |
| add_county_modifier |  | landed title | modifier/int | Add a modifier to a county. | add_county_modifier = name<br>add_county_modifier = { modifier = name days/weeks/months/years = int } | Modifiers |
| change_county_control |  | landed title | int | Changes the county control of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. |  | Control |
| change_de_jure_drift_progress |  | landed title | title/int | Change the progress of de jure drift of a title. | <drifting_title> = { change_de_jure_drift_progress = { target = <drift_target_title>  value = <progress_change_value> } } | Title |
| change_development_level |  | landed title | int | Changes the development level of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. |  | Title |
| change_development_progress |  | landed title | int | Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. |  | Development |
| change_development_progress_with_overflow |  | landed title | int | Changes the development progress of a title. If the title has higher tier than county, the effect will propagate down to all counties below it. Will overflow, so adding +100 to a county with 50 progress left will increase the level by 1 and result in 50 progress towards the next level. |  | Development |
| clear_title_laws |  | landed title | bool | Remove all title laws from the scoped title. DOES NOT apply law removal costs and effects. | clear_title_laws = yes | Laws |
| clear_title_laws_effects |  | landed title | bool | Remove all title laws from the scoped title. DOES apply law removal costs and effects. | clear_title_laws_effects = yes | Laws |
| copy_title_history |  | landed title | title | Copy title history from another title. | copy_title_history = source_title | Titles |
| remove_all_county_modifier_instances |  | landed title | modifier | Remove all instances of a modifier from a county. | remove_all_county_modifier_instances = name | Modifiers |
| remove_county_modifier |  | landed title | modifier | Remove a modifier from a county. | remove_county_modifier = name | Modifiers |
| reset_title_name |  | landed title | bool | Sets the name and adjective of the scoped title back to being based on its key. Won't cause the prefix to change. | reset_title_name = yes | Title |
| reset_title_prefix |  | landed title | bool | Sets the prefix of the scoped title back to being based on its key. Won't cause its adjective or name to change. | reset_title_prefix = yes | Title |
| revoke_lease |  | landed title | bool | Revoke the lease of the scoped title. | revoke_lease = yes | Title |
| set_always_follows_primary_heir |  | landed title | bool | Sets if the title should always go to the primary heir in partition succession. | set_always_follows_primary_heir = yes | Title |
| set_capital_county |  | landed title | title | Sets the capital county of the title to the target county. | set_capital_county = <some county title> | Title |
| set_color_from_title |  | landed title | title | Sets the color of the title to the same as the target title (shifted very slightly to not be identical). | set_color_from_title = <some title> | Title |
| set_county_culture |  | landed title | culture/title | Sets the culture of a county. | set_county_culture = english/root.character_culture | Title |
| set_county_faith |  | landed title | faith | Changes what faith a county has. |  | Title |
| set_de_jure_liege_title |  | landed title | title | Set a new DeJure liege title. | set_de_jure_liege_title = new_de_jure_liege | Title |
| set_definitive_form |  | landed title | bool | Sets if the title should use a definitive form name (no 'Kingdom of'). | set_definitive_form = yes | Title |
| set_delete_on_destroy |  | landed title | bool | Sets if the title should be deleted from the gamestate completely when it is destroyed. | set_delete_on_destroy = yes | Title |
| set_destroy_if_invalid_heir |  | landed title | bool | Sets if the title should be destroyed on succession if there's no heir matching its restrictions. | set_destroy_if_invalid_heir = yes | Title |
| set_destroy_on_succession |  | landed title | bool | Sets if the title should be destroyed on succession. | set_destroy_on_succession = yes | Title |
| set_landless_title |  | landed title | bool | Sets if the title is landless (can be held by rulers with no land) | set_landless_title = yes | Title |
| set_no_automatic_claims |  | landed title | bool | Sets if the title should disallow automatic claims (meaning claims will only be added by script, and by pressed claims being inherited). | set_no_automatic_claims = yes | Title |
| set_title_name |  | landed title | key | sets the name (localization key) of the scoped title. The adjective will be constructed by adding '_adj' to the localisation key. Won't cause the prefix to change. | set_title_name = TEST_NAME_PLEASE_IGNORE | Title |
| set_title_prefix |  | landed title | key | sets the prefix of the scoped title. Won't cause its name or adjective to change. | set_title_prefix = PREFIX_THE | Title |
| title_create_faction |  | landed title | faction<br>character/title | The scoped landed title creates a faction of the specified type against the specified target. | title_create_faction = { type = X target = Y } | Factions |
| title_join_faction |  | landed title | faction | The landed title in the scope joins the assigned faction. |  | Factions |
| title_leave_faction |  | landed title | faction | The title in the scope leaves the assigned faction |  | Factions |
| end_story |  | story cycle |  | Ends a story and executes it's on_end effect, the story can no longer be accessed after this. |  | Stories |
| make_story_owner |  | story cycle | character | Makes the character the new owner of the story. | make_story_owner = character_target | Stories |
| add_innovation |  | culture | innovation | Add innovation to a culture. |  | Innovations |
| add_random_innovation |  | culture | innovation/bool | Add random available innovation | <culture> = { add_random_innovation = culture_group_military/culture_group_civic/culture_group_regional/yes } | Innovations |
| get_all_innovations_from |  | culture | culture | Discover all innovations from the target culture. | get_all_innovations_from = <culture> | Innovations |
| get_random_innovation_from |  | culture |  | Get random available innovation from another culture. |  | Innovations |
| add_character_flag |  | character | flag | Adds a character flag. | add_character_flag = X<br>add_character_flag = { flag = X days/weeks/years = Y } X is the name of the flag and Y is a value or value interval "{ min max }". | Flags |
| add_character_modifier |  | character | modifier/int | Add a modifier to a character. | add_character_modifier = name<br>add_character_modifier = { modifier = name days/weeks/months/years = int } | Modifiers |
| add_courtier |  | character | character | Add the target character to the scope character's court.(It doesn't work) |  | Characters |
| add_diplomacy_lifestyle_perk_points |  | character | int | Adds lifestyle per points to the given character. |  | Lifestyles |
| add_diplomacy_lifestyle_xp |  | character | int | Adds lifestyle XP to the given character. |  | Lifestyles |
| add_dread |  | character | int | Adds (or removes) dread to a character. |  | Characters |
| add_gold |  | character |  | Adds gold to a character. |  | Characters |
| add_hook |  | character | hook/character/secret/int | Adds a hook on a character. Does send a toast to the player if it's involved. | add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }<br>days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it. | Hooks and Secrets |
| add_hook_no_toast |  | character | hook/character/secret/int | Adds a hook on a character. Does NOT send a toast to the player. | add_hook = { type = X, target = Y, secret = Z, days/months/years = W  }<br>days/months/years optional (taken from hook type otherwise) and can be a value or an interval, secret required for hook types that require it. | Hooks and Secrets |
| add_intrigue_lifestyle_perk_points |  | character | int | Adds lifestyle per points to the given character. |  | Lifestyles |
| add_intrigue_lifestyle_xp |  | character | int | Adds lifestyle XP to the given character. |  | Lifestyles |
| add_joined_faction_discontent |  | character | int | Adds (or subtracts) discontent to the factions the scope character is in. | add_joined_faction_discontent = X | Factions |
| add_knows_of_killer |  | character | character | Adds the right hand side character as knowing of the killer of the scoped object. | dead_person = { add_knows_of_killer = root } | Characters |
| add_learning_lifestyle_perk_points |  | character | int | Adds lifestyle per points to the given character. |  | Lifestyles |
| add_learning_lifestyle_xp |  | character | int | Adds lifestyle XP to the given character |  | Lifestyles |
| add_martial_lifestyle_perk_points |  | character | int | Adds lifestyle per points to the given character. |  | Lifestyles |
| add_martial_lifestyle_xp |  | character | int | Adds lifestyle XP to the given character. |  | Lifestyles |
| add_opinion |  | character | modifier/int/character | Adds a temporary opinion modifier. | add_opinion = { modifier = X days/months/years = Y target = Z } | Characters |
| add_perk |  |  | character | Adds the perk for this character |  | Lifestyles |
| add_piety |  | character |  | Gives (or takes) piety to a character. |  | Characters |
| add_piety_experience |  | character |  | Gives (or takes) piety experience to a character. |  | Characters |
| add_piety_level |  | character |  | Increases (or decreases) the piety level of a character. |  | Characters |
| add_pressed_claim |  | character | landed title | Gives a pressed claim to a character. |  | Title |
| add_prestige |  | character |  | Gives (or takes) prestige to a character. |  | Characters |
| add_prestige_experience |  | character |  | Gives (or takes) prestige experience to a character. |  | Characters |
| add_prestige_level |  | character |  | Increases (or decreases) the prestige level of a character. |  | Characters |
| add_realm_law |  | character |  | Adds the given law to the scoped character. |  | Laws |
| add_realm_law_skip_effects |  | character |  | Adds the given law to the scoped character. Skips the cost and the pass effect, and the revoke effects of the current law. |  | Laws |
| add_relation_flag |  | character |  | Adds a flag to an existing relation. | add_relation_flag = { relation = scripted_relation flag = flag_name (declared in the relation's script) target = other_character } | Flags |
| add_scheme_cooldown |  | character | character/scheme/int | Sets a scheme cooldown for the scoped character. | <scoped_character> = { target=target_character type=scheme_type days/weeks/months/years = duration } | Hooks and Schemes |
| add_secret |  | character | secret/character | Adds a secret.<br>Note that if you create a Secret in the immediate effect, the tooltips for other effects run in that Secret's scope (such as reveal_to) are likely to be displayed incorrectly, or not to be displayed at all. This is due to the game generating the tooltip before it actually has a Secret that exists to work off of. Test rigorously and use custom tooltips if necessary. Creating a Secret in the immediate and then running effects on it in an event option should produce perfectly normal tooltips. | add_secret = { type = X target = Y } | Hooks and Secrets |
| add_stewardship_lifestyle_perk_points |  | character | int | Adds lifestyle per points to the given character. |  | Lifestyles |
| add_stewardship_lifestyle_xp |  | character | int | Adds lifestyle XP to the given character. |  | Lifestyles |
| add_stress |  | character | int | Increases (or decreases) stress of a character. |  | Characters |
| add_targeting_factions_discontent |  | character | int | Adds (or subtracts) discontent to all the factions that are targeting the scope character. | add_targeting_factions_discontent = X | Factions |
| add_to_scheme |  | character | cheme | Adds a character as an agent to the scheme. |  | Hooks and Schemes |
| add_trait |  | character |  | Adds a trait to a character (the trait will not be added and no tooltip will be shown if the character isn't eligible for the trait, i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range). |  | Characters |
| add_trait_force_tooltip |  | character |  | Adds a trait to a character (if the add_trait effect would not add the trait - i.e. when already having the trait, having an opposing trait, not fulfilling the trait's is_potential trigger or being outside of the trait's range - a tooltip will be shown but the trait will not be added). |  | Characters |
| add_truce_both_ways |  | character | character/string/bool/war result | Sets the both-way truce against the specified character.<br>'character' specifies the target character<br>'override' says whether it should replace the previous truce even if shorter<br>'years / months / days' sets the duration of the truce<br>'result' specifies the result from the scope character's point of view ('white_peace' by default)<br>'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'<br>'name' sets a custom description. Dynamic description with the current scope<br>'war' sets the war that caused the truce, mutually exclusive with 'casus_belli' | add_truce_both_ways = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z } | Characters |
| add_truce_one_way |  | character | character/string/bool/war result | Sets the truce against the specified character.<br>'character' specifies the target character<br>'override' says whether it should replace the previous truce even if shorter<br>'years / months / days' sets the duration of the truce<br>'result' specifies the result from the scope character's point of view ('white_peace' by default)<br>'casus_belli' sets the casus belli scope that caused the truce, mutually exclusive with 'name'<br>'name' sets a custom description. Dynamic description with the current scope<br>'war' sets the war that caused the truce, mutually exclusive with 'casus_belli' | add_truce_one_way = { character = X years/months/days = Y override = yes/no result = victory/defeat/white_peace casus_belli/war = Z } | Characters |
| add_tyranny |  | character | int | Adds (or removes) tyranny to (or from) a character. |  | Characters |
| add_unpressed_claim |  | character | landed title | Gives an unpressed claim to a character. |  | Titles |
| add_visiting_courtier |  | character | character | Add the target character as the scope character's guest.(It doesn't work) |  | Characters |
| allow_alliance |  | character | character | Allows an alliance with the target character after the alliance has been broken or when no familial relation exists. |  | Characters |
| allow_in_scheme |  |  | character | Allow the character to join the scheme as an agent. |  | Hooks and Schemes |
| apply_ai_vassal_obligation_liege_most_desired |  | character |  | Apply the new level for the most desired AI obligation level the liege in the contract wants |  | Laws |
| apply_ai_vassal_obligation_vassal_most_desired |  | character |  | Apply the new level for the most desired AI obligation level the vassal in the contract wants. |  | Laws |
| assign_council_task |  | character |  | Assigns the target character to the council task. | assign_council_task = { council_task = council_task_scope target = character_taking_the_position fire_on_actions = yes/no } | Jobs |
| assign_councillor_type |  | character |  | Assigns the target character to the first available council position of the type available. | assign_councillor_type = { type = council_position_type_key target = character_taking_the_position fire_on_actions = yes/no } | Jobs |
| banish |  | character |  | The character gets banished. |  | Characters |
| becomes_independent |  | character |  | Becomes and independent ruler. | becomes_independent = { change = 'previously created title_and_vassal_change' } | Vassalage |
| break_alliance |  | character | character | Breaks the alliance with the target character. |  | Relations |
| cancel_truce_both_ways |  | character | character | Ends the truce against the specified character, and theirs against the scoped character. | cancel_truce_both_ways = scope:character | Relations |
| cancel_truce_one_way |  | character | character | Ends the truce against the specified character. | cancel_truce_one_way = scope:character | Relations |
| change_current_weight |  | character | int | Change the current weight of the scoped character | change_current_weight = 20 | Characters |
| change_first_name |  | character | key/character | Change the first name of a character. | change_first_name = <localization_key><br>change_first_name = scope:name/var:name<br>change_first_name = { template_character = scope:character } | Characters |
| change_government |  | character | key | Changes the government of a character. |  | Characters |
| change_liege |  | character |  | Adds a liege change. | change_liege = { liege = 'Character that should become the new liege' change = 'previously created title_and_vassal_change'} | Vassalage |
| change_prison_type |  | character | key | Changes the charater's prison type. Scoped character is the prisoner. Accepts any static modifier (see also improson effect). | change_prison_type = house_arrest | Characters |
| change_target_weight |  | character | int | Change the target weight of the scoped character. | change_target_weight = 20 | Characters |
| clear_forced_vote |  | character | bool | clear_forced_vote = yes |  | Characters |
| consume_banish_reasons |  | character | character | 'Consume' all banish reasons that the scoped character has on the target character. Until they get a new reason, they cannot banish the target again. |  | Characters |
| consume_divorce_reasons |  | character | character | 'Consume' all divorce reason that the scoped character has on the target character. Until they get a new reason, they cannot divorce the target again. |  | Characters |
| consume_execute_reasons |  | character | character | 'Consume' all execute reasons that the scoped character has on the target character. Until they get a new reason, they cannot execute the target again. |  | Characters |
| consume_imprisonment_reasons |  | character | character | 'Consume' all imprisonment reasons that the scoped character has on the target character. Until they get a new reason, they cannot imprison the target again. |  | Characters |
| consume_revoke_title_reason |  | character | character | 'Consume' 1 revoke title reason that the scoped character has on the target character. |  | Characters |
| copy_inheritable_appearance_from |  | character | character | Copies the inheritable appearance attributes (inheritable genes in the character's DNA string) from the target character to the scoped character. |  | Titles |
| create_alliance |  | character | character | Create an alliance between the scoped character and the target. The allied through characters determine who gets checked against for if the alliance should persist or not. | create_alliance = scope<br>create_alliance = { target = scope allied_through_owner = scope allied_through_target = scope } | Relations |
| create_cadet_branch |  | character | bool | The scope character creates a cadet branch of the house he is in. |  | Characters |
| create_faction |  | key/character |  | The scoped character creates a faction of the specified type against the specified target. | create_faction = { type = X target = Y } | Factions |
| create_story |  | character | key/character | Creates and initializes a story cycle with the current character as owner. | create_story = story_type<br>create_story = { type = story_type save_scope_as/save_temporary_scope_as = scope_name # optional way to get a reference to the new story } | Stories |
| death |  | character | character/key | Kills a character. Where X is a character and Y is one of the death reason keys. Or death = natural which will pick a natural death reason to kill the character from. | death = { killer = X death_reason = Y } | Characters |
| depose |  | character | bool | The character gets deposed. |  | Vassalage |
| destroy_title |  | character | title | Destroys a title. |  | Titles |
| end_pregnancy |  | character |  | End a pregnancy (It doesn't work) |  | Characters |
| execute_decision |  | character |  | Execute the specified decision for the scoped character |  | Characters |
| finish_council_task |  | character |  | The councillor finish the current assigned task successfully. |  | Jobs |
| fire_councillor |  | character | character | The scope character fires the target character from the council. |  | Jobs |
| forbid_from_scheme |  | character |  | Forbid the scope character from joining the target scheme as an agent (and kick the character out if already in the scheme) |  | Hooks and Schemes |
| force_add_to_scheme |  | character | key/int | Adds a character as an agent to the scheme and forces them to stay. | force_add_to_scheme = { scheme = target_Scheme days/months/years = duration } | Hooks and Schemes |
| force_vote_as |  | character |  | Forces the character to vote the same as the target. | force_vote_as = { target = someone days/months/years = x } | Characters |
| get_title |  | character | title | Gives a title to a character. |  | Titles |
| give_nickname |  | character | key | Give a nickname to this character. |  | Characters |
| join_faction |  | character |  | The character in the scope joins the assigned faction. |  | Factions |
| join_faction_forced |  | character | key/character/int | The character in the scope is forced to join a faction by a character for a defined time. | join_faction_forced = { faction = X forced_by = Y days/months/years = duration } | Factions |
| join_faction_skip_check |  | character |  | The character in the scope joins the assigned faction skiping the can_character_join trigger. |  | Factions |
| leave_faction |  | character |  | The charcter in the scope leaves the assigned faction. |  | Factions |
| make_claim_strong |  | character | title | Makes a claim strong (character adds the claim if not having it already). |  | Titles |
| make_claim_weak |  | character | title | Makes a claim weak (character adds the claim if not having it already). |  | Titles |
| make_concubine |  | character | character | Makes the target character a concubine of the scope character, the target should not be imprisoned. |  | Characters |
| make_pregnant |  | character | character/int/bool | Makes a character pregnant. | make_pregnant = { father= 'the real father' number_of_children= X known_bastard=yes/no } | Characters |
| make_trait_active |  | character |  | Activates an inactive trait. Tooltip will not be shown if the character cannot have the trait. |  | Characters |
| make_trait_active_force_tooltip |  | character |  | Activates an inactive trait. Tooltip will be shown even if the character cannot have the trait. |  | Characters |
| make_trait_inactive |  | character |  | Makes a current trait of a character inactive. Tooltip will not be shown if the character doesn't have the trait. |  | Characters |
| make_trait_inactive_force_tooltip |  | character |  | Makes a current trait of a character inactive. Tooltip will be shown even if the character doesn't have the trait. |  | Characters |
| make_unprunable |  | character |  | The scope character will no longer be prunable after their death. Use with care, as this will make everyone related to them unprunable too. So you should only use this if someone absolutely *needs* to stick around several years after their death. | make_unprunable = yes | Characters |
| marry |  | character | character | Marries the scoped character to the target character. | marry = target | Characters |
| marry_matrilineal |  | character | character | Marries the scoped character to the target character matrilineally | marry_matrilineal = target | Characters |
| move_to_pool |  | character | bool | The scoped character (courtier or guest) leaves their current court and moves into the pool. | scope:guest = { move_to_pool = yes } | Characters |
| move_to_pool_at |  | character | province | The scoped character (courtier/guest/pool character) leaves their current court (if any) and moves into the pool of the specified province | scope:guest = { move_to_pool_at = scope:some_province } | Characters |
| pay_long_term_gold |  | character | character/int | The scope character pays gold to the target character. (AI budget category long term). | pay_gold = { target = X gold = Y } | Characters |
| pay_short_term_gold |  | character |  | The scope character pays gold to the target character. (AI budget category short term). | pay_gold = { target = X gold = Y } | Characters |
| pay_short_term_income |  | character | character/int | The scope character immediately pays gold corresponding to their income to the target character. (AI budget short term). | pay_income = { target = X days/months/years = Y } | Characters |
| play_music_cue |  | character |  | Plays the specified music cue. |  | Music |
| recalculate_scripted_relation |  | character |  | Recalculates the effect of a scripted relation. | recalculate_scripted_relation = friend | Relations |
| recruit_courtier |  | character | character | Recruits the target to become a courtier.(It doesn't work) | scope:liege = { recruit_courtier = scope:new_courtier } | Characters |
| refund_all_perks |  | character | bool | Refunds all perks of the character. | refund_all_perks = yes | Lifestyles |
| refund_perks |  | character | key | Refunds all perks of the RHS lifestyle. | refund_perks = intrigue_lifestyle | Lifestyles |
| release_from_prison |  | character | bool | Releases the character from the prison. | release_from_prison = yes | Characters |
| remove_all_character_modifier_instances |  | character | modifier | Remove all instances of a modifier from a character | remove_all_character_modifier_instances = name | Modifiers |
| remove_character_flag |  | character | flag | Removes a character flag. |  | Flags |
| remove_character_modifier |  | character | modifier | Remove a modifier from a character. | remove_character_modifier = name | Modifiers |
| remove_claim |  | character | landed title | Removes an explicit (not from a living parent/grand parent) claim. |  | Title |
| remove_concubine |  | character | character | Removes the target character as a concubine of the scope character. |  | Relations |
| remove_courtier_or_guest |  | character | character | Removes the target character (guest or courtier) from the scope character's court. | scope:host = { remove_courtier_or_guest = scope:guest }<br>scope:host = {<br>remove_courtier_or_guest = {<br>character = scope:guest<br>new_location = scope:some_province # optionally specify a new location<br>}<br>} | Characters |
| remove_decision_cooldown |  | character | key | Remove the cooldown on taking a decision for the scoped character. | remove_decision_cooldown = decision_name | Decisions |
| remove_hook |  | character | character/hook_type | Removes a hook on a character. If type is specified, the hook will only be removed if it is of that type. | remove_hook = { target = X, type = Y } | Hooks and Schemes |
| remove_interaction_cooldown |  | character | interaction | Remove the cooldown on using an interaction for the scoped character. | remove_interaction_cooldown = interaction_name | Interactions |
| remove_interaction_cooldown_against |  | character | interaction/character | Remove the cooldown on using an interaction against the target character for the scoped character. | remove_interaction_cooldown_against = { interaction = interaction_name target = character } | Interactions |
| remove_long_term_gold |  | character |  | Removes gold from a character (AI's long term budget). |  | Characters |
| remove_nickname |  | character | bool | Removes any nickname from the current character. |  | Characters |
| remove_opinion |  | character | character/modifier/bool | Removes a temporary opinion modifier. Where X is a character, Y is the opinion modifier, Z tells whether to remove all instances of the modifier or just one. | remove_opinion = { target = X modifier = Y single = Z (no by default) } | Modifiers |
| remove_perk |  | character |  | Remove the perk for this character |  | Characters |
| remove_realm_law |  | character | law | Removes the given law from the scoped character. This will leave the law group empty, so only do this if you're getting rid of a law group. |  | Laws |
| remove_relation_best_friend |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_bully |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_court_physician |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_crush |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_flag |  | flag/character/relation | Removed a flag from an existing relation. |  | remove_relation_flag = { flag = flag_name (declared in scripted_relation) target = other_character relation = scripted_relation } | Flags |
| remove_relation_friend |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_guardian |  | character | character | Removes scripted relationship |  | Relations |
| remove_relation_intrigue_mentor |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_intrigue_student |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_lover |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_mentor |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_nemesis |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_oaf |  | character | character | Removes scripted relationship |  | Relations |
| remove_relation_potential_friend |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_potential_lover |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_potential_rival |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_rival |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_soldier_friend |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_soulmate |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_student |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_victim |  | character | character | Removes scripted relationship. |  | Relations |
| remove_relation_ward |  | character | character | Removes scripted relationship. |  | Relations |
| remove_scheme_cooldown_against |  | character | scheme/character | Remove the cooldown on using a scheme against the target character for the scoped character | remove_scheme_cooldown_against = { scheme = scheme_name target = character } | Hooks and Schemes |
| remove_short_term_gold |  | character |  | Removes gold from a character (AI's short term budget). |  | Characters |
| remove_trait |  | character |  | Removes a trait from a character. Tooltip will not be shown if the character doesn't have the trait. |  | Characters |
| remove_trait_force_tooltip |  | character |  | Removes a trait from a character. Tooltip will be shown even if the character doesn't have the trait. |  | Characters |
| reset_beneficiary |  | character | bool | The target character stops having a beneficiary. | reset_beneficiary = yes | Holy Wars |
| return_to_court |  | character |  | Returns the scope character to the employers court. |  | Characters |
| reverse_add_opinion |  | character | modifier/int/character | Adds a temporary reverse opinion modifier. X is a scripted modifier name. Y can be a value or a range "{ A B }" If no timeout are specified, the modifier's scripted default timeout will be used. | reverse_add_opinion = { modifier = X days/months/years = Y target = Z } | Modifiers |
| scriptedtests_recalculate_character_modifier |  | character |  | Recalculates the modifier of the scoped character. |  | Modifiers |
| scriptedtests_recalculate_succession |  | character |  | Recalculates the line of succession of the scoped character. |  | Succession |
| send_interface_message |  | character |  | Sends a message to the player playing the character in the scope and then executes any effects inside.<br>For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense and $DESC$ contains the text from the desc field. | send_interface_message = {<br>type = message_type # default: send_interface_message<br>title = LOCALIZATION # optional, otherwise takes it from the message type<br>desc = LOCALIZATION # optional, otherwise takes it from the message type<br>tooltip = LOCALIZATION # optional, otherwise takes it from the message type<br>left_icon = scope:recipient # optional, character or title<br>right_icon = scope:the_title # optional, character or title<br>goto = scope:the_title # optional, character, barony title, province will add a goto button<br># optional effects...<br>add_dread = 5<br>scope:someone = { add_gold = 5 }<br>} | Notifications |
| send_interface_toast |  | character |  | Sends a message to the player playing the character in the scope and then executes any effects inside.<br>For the message text and tooltip, $EFFECT$ contains the text description of the effects in the past tense.<br>And $DESC$ contains the text from the desc field. | send_interface_toast = {<br>type = message_type # default: send_interface_toast<br>title = LOCALIZATION # optional, otherwise takes it from the message type<br>desc = LOCALIZATION # optional, otherwise takes it from the message type<br>left_icon = scope:recipient # optional, character or title<br>right_icon = scope<br>goto = scope:the_title # optional, character, barony title, province will add a goto button<br># optional effects...<br>add_dread = 5<br>scope:someone = { add_gold = 5 }<br>} | Notifications |
| set_absolute_country_control |  | character |  | Sets if this character has absolute country control. |  | Control |
| unlock_character_movement |  |  | bool/character |  |  | Characters |
| set_beneficiary |  | character | character | The target character becomes the beneficiary of the scoped character. | set_beneficiary = some character | Holy Wars |
| set_character_faith |  | character | faith | Changes what faith a character has executing the effects for it. For history setup use 'set_character_faith_history' instead. |  | Characters |
| set_character_faith_history |  | character | faith | Changes what faith a character has NOT executing the effects for it. USE ONLY IN HISOTRY SETUP! |  | Characters |
| set_character_faith_with_conversion |  | character | faith | Changes what faith a character has, as if they used the faith-view interaction (minus the piety cost). So vassals who'd accept will get converted, as will capitals |  | Characters |
| set_child_of_concubine_on_pregnancy |  | character |  | Sets the child to be (or not be) a child of a concubine during pregnancy |  | Characters |
| set_council_task |  | character | key/character | Sets the task of the scope councillor | set_council_task = { task_type = council_position_type_key target = for_targeted_tasks  } | Jobs |
| set_culture |  | character | culture | Set the culture for this character |  | Characters |
| set_culture_same_as |  | character | character | Sets the culture of the character to be the same as the culture of the target. |  | Characters |
| set_death_reason |  | character |  | Sets the death reason and the killer of a dead character. | set_death_reason = { killer = X death_reason = Y }, both parameters are optional | Characters |
| set_default_education |  |  | character | Sets the default education focus for this character. |  | Lifestyles |
| set_designated_heir |  | character | character | Sets the given character as designated heir. |  | Succession |
| set_employer |  | character | character | Add the scope character to the target character's court. |  | Characters |
| set_father |  | character | character | Sets the father of a character. |  | Characters |
| set_focus |  | character |  | Set the focus for this character |  | Lifestyles |
| set_house |  | character | dynasty house | Sets the dynasty house of the character. |  | Characters |
| set_immortal_age |  | character | int | Changes what age the character became immortal at. Only works if already immortal. | set_immortal_age = 20 | Characters |
| set_killer_public |  | character |  | Sets the scoped character's killer as being publicly known | set_killer_public = bool | Hooks and Schemes |
| set_known_bastard_on_pregnancy |  | character |  | Sets the child to a known or unknown bastard during pregnancy. |  | Characters |
| set_num_pregnancy_children |  | character | int | Set the number of children |  | Characters |
| set_override_designated_winner |  | character | bool | The scoped character will put their beneficiary on the throne if they're the #1 participant if this is called with 'yes'. Call with 'no' to turn it off again. | set_override_designate_winner = yes | Holy Wars |
| set_player_character |  | character | character | The scope character's player will now play as the target character. Scope must be player-controlled. Target cannot be player-controlled. |  | Characters |
| set_pregnancy_assumed_father |  | character | character | Set the assumed father of the pregnancy. |  | Characters |
| set_primary_spouse |  | character | character | Set the primary spouse of a character. | set_primary_spouse = scope | Characters |
| set_primary_title_to |  | character | landed title | Sets the primary title for a character. | set_primary_title_to = <title> | Titles |
| set_real_father |  | character | character | Changes the real father of the character scope. |  | Characters |
| set_realm_capital |  | character | landed title | Set a new realm capital | character = { set_realm_capital = new_title } | Realm |
| set_relation_best_friend |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_bully |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_court_physician |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_crush |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_friend |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_guardian |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_intrigue_mentor |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_intrigue_student |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_lover |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_mentor |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_nemesis |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_oaf |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_potential_friend |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_potential_lover |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_potential_rival |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_rival |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_soldier_friend |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_soulmate |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_student |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_victim |  | character | character | Sets scripted relationship. |  | Relations |
| set_relation_ward |  | character | character | Sets scripted relationship. |  | Relations |
| set_sexuality |  | character |  | Sets the sexuality of the character |  | Characters |
| set_to_lowborn |  | character |  | Set the character to lowborn. |  | Characters |
| set_vassal_contract_modification_blocked |  | character |  | Blocks the vassal contract from being modified with regards to being checked by 'vassal_contract_is_blocked_from_modification' |  | Vassalage |
| spawn_army |  | character |  | Spawns an army for this character. If the character is not at war, the regiments will be created, but the army will not be spawned. | spawn_army = {<br>levies = int/script value # optional, number of men<br>men_at_arms = { # optional, multiple can be specified. Need either levies or MAA<br>type = key<br>men/stacks = int/script value<br>}<br>location = province<br>origin = province # optional, location used if not set. This is used for where to base bonuses and the like on<br>war = war # optional. If set, the stack will disband after the war ends<br>inheritable = yes/no # Default: yes<br>uses_supply = yes/no # Default: yes<br>army = army # optional. If set, the stack will merge into this army<br>save_scope_as/save_temporary_scope_as = new_army # optional way to get a reference to the new army. Note this might not be set if the army wasn't spawned (e.g. if the character is not at war)<br>name = description # gives the troops a specific name that shows up in interfaces<br>} | Armies |
| start_default_task |  | character |  | Force the Councillor to revert to the default task. Any relevant percentage progress will be lost (even if the councillor was performing the default task already). |  | Jobs |
| start_scheme |  | character |  |  | starts a scheme  = { type = X target = Y } | Hooks and Schemes |
| start_war |  | character |  | Starts a war. X is a casus belli type, Y is the target character, Z i the (optional) claimant, W1, W2.... are targeted titles. | start_war = { casus_belli/cb = X target = Y claimant = Z target_title = W1 target_title = W2 ... } | Wars |
| stress_impact |  | character |  | Stress impact according to specified traits (trait = value), use base = value for a base value that's always added. | stress_impact = { sadistic = medium_stress_impact_loss }<br>stress_impact = { compassionate = medium_stress_impact_gain } | Characters |
| use_hook |  | character | character | Uses a hook a character has (removes if weak, puts on cooldown if strong). | use_hook = some_character | Hooks and Schemes |
| vassal_contract_decrease_obligation_level |  | character |  | Decrease the obligation level of the scoped character's vassal contract. |  | Vassalage |
| vassal_contract_increase_obligation_level |  | character |  | Increase the obligation level of the scoped character's vassal contract. |  | Vassalage |
| vassal_contract_set_obligation_level |  | character |  | Change the obligation level of the scoped character's vassal contract. | vassal_contract_set_obligation_level = { type = name level = 1 } # index to obligation level<br>vassal_contract_set_obligation_level = { type = name level = feudal_obligation_low } | Vassalage |
| visit_court_of |  | character | character | Add the scope character as the target character's guest. |  | Characters |
| add_faction_discontent |  | faction |  | Adds (or subtracts) discontent to the scope faction. | add_faction_discontent = X | Factions |
| destroy_faction |  | faction |  | The scope faction is destroyed. | destroy_faction = yes | Factions |
| faction_remove_war |  | faction |  | Removes the war currently associated with the faction. | faction_remove_war = yes | Factions |
| faction_start_war |  | faction |  | The scope faction starts the war agains their target. | faction_start_war = {<br>title = [optional]<br>} | Factions |
| remove_special_character |  | faction |  | Removes the special character for the scope faction |  | Factions |
| remove_special_title |  | faction |  | Removes the special character for the scope faction. |  | Factions |
| set_special_character |  | faction | character | Sets the special character for the scope faction. |  | Factions |
| set_special_title |  | faction | landed title | Sets the special title for the scope faction |  | Factions |
| add_attacker |  | war | character | Adds the target character to the scope war as an attacker. |  | Wars |
| add_defender |  | war | character | Adds the target character to the scope war as a defender. |  | Wars |
| end_war |  | war |  | Ends the war with the specified winner. | end_war = attacker/defender/white_peace | Wars |
| remove_participant |  | war | character | Removes the target character from the scope war. |  | Wars |
| set_called_to |  | war | character | Sets the target character as already called to the scope war. |  | Wars |
| set_casus_belli |  | war |  | Sets the casus belli of the scope war. |  | Wars |
| activate_holy_site |  | faith |  | Activate an inactive holy site. | <faith_scope> = { activate_holy_site = <holy_site_name> } | Faiths |
| add_doctrine |  | faith | doctrines | Add doctrine to faith. | <faith_scope> = { add_doctrine = <doctrine_name> } | Faiths |
| change_fervor |  | faith | int | Changes the fervor of the faith by the given value. | change_fervor = script value | Faiths |
| remove_doctrine |  | faith | doctrines | Remove doctrine from faith. | <faith_scope> = { remove_doctrine = <doctrine_name> } | Faiths |
| remove_religious_head_title |  | faith | bool | Removes the religious head title of the faith. | remove_religious_head_title = yes | Faiths |
| set_religious_head_title |  | faith | landed title | Sets the religious head title of the faith to the given title. | set_religious_head_title = scope | Faiths |
| start_great_holy_war |  | faith |  | Starts a great holy war. | start_great_holy_war = {<br>target_character = someone<br>target_title = some<br>titledelay = script value# Number of days until the war should<br>startwar = some war # Optional. Will make this a directed GHW instead of undirected, and tie it to this specific war<br>} | Faiths |
| set_add_claim_on_loss |  | title/vassal change |  | If set, any title losses will result in claims being added to the previous holder. |  | Titles |
| set_title_and_vassal_change_type |  | title/vassal change | conquest, conquest_holy_war, conquest_claim, conquest_populist, inheritance, abdication, destroyed, created, usurped, granted, revoked, election, independency, returned, leased_out, lease_revoked, faction_demand | Sets the type of change. |  | Titles |
| add_secret_participant |  | secret | character | Adds an participant to the secret. |  | Hooks and Schemes |
| disable_exposure_by |  | secret | character | Forbids the target character from exposing the secret | disable_exposure_by = target_character | Hooks and Schemes |
| add_building_slot |  | title/holding | int | Adds adds number of building slots to holding. |  | Buildings |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Commands*
