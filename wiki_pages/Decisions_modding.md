# Decisions modding

> **Note:** Last verified for version 1.14


> ⚠️ **This section needs expansion with examples, advanced uses**


[Decision](https://ck3.paradoxwikis.com/Decision)s can be modded into the game. They are optional actions that adventurers and count rulers or above may take.


## Location

Decisions belong in .txt files in the mod's `/Crusader Kings III/game/common\decisions` folder. Each text file may contain multiple decisions.


## Structure

Decisions may be defined like so:


```
my_decision = {
	effect = {
		add_gold = 100
	}

	# Other blocks
}
```

The part that says ``my_decision`` is called the *name* or *key* or *id* of the decision. It can be anything you want, but it should be unique. If you define another decision with the same name, one of them will override the other (depending on which one is loaded last). It is common practice to give decisions names that end with "_decision", but it is not necessary.


### Basic example


```
custom_decision = {
	picture = { reference = "gfx/interface/illustrations/decisions/decision_smith.dds" }
	
	desc = custom_decision_desc
	selection_tooltip = custom_decision_tooltip

	is_shown = {
		# Put conditions for the decision to show up here.
	}

	effect = {
		# Add effects of the decision here.
	}

	ai_check_interval = 0 # Change this value if you want the AI to consider this decision.
}
```


## Localization

We also need to add 4 entries to [Localization](Localization.md) files to describe the decision to the player.

All 4 will start with the id of your decision, plus _desc, _tooltip and _confirm.

For example, create a file ``localization/english/my_decisions_l_english.yml`` with this:

```c
l_english:
 my_decision: "My decision's name"
 my_decision_desc: "Description shown when you open it"
 my_decision_tooltip: "Tooltip shown when hovering over it"
 my_decision_confirm: "The text on the confirm button"
```
Make sure to read the [Localization](Localization.md) page to properly define your localization, as it's easy to make a mistake there.

If you want, the default names of these localization entries can be changed with the ``title``, ``desc``, ``selection_tooltip``, and ``confirm_text`` entries in the decision. This can be useful if you want to make multiple decisions with the same localization.


### Keys/blocks

The table below shows keys and blocks that may be defined. "Boolean" values may be either yes or no.

For the full list see common/decision/decision.info file.


| **Key/block** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| picture | String (file name) | Sets the image of the decision and optionally the sound. Multiple pictures can be set with triggers to choose one. | ``picture = { reference = "gfx/image.dds" }`` |
| extra_picture | String (file name) | An extra picture, currently used by Struggle decisions |  |
| decision_group_type | String | Foldable decision group type to put this decision in. Types are listed common\decision_group_types | ``decision_group_type = major`` |
| sort_order | Number | How high in the list of decisions this decision should be placed. Higher numbers are sorted above lower numbers. |  |
| is_invisible | yes/no |  |  |
| ai_goal | yes/no | The AI will budget for this decision. ``ai_check_interval`` will be ignored if this is set. |  |
| ai_check_interval | Integer | How many months to go between each check of this decision. Has to be set, except if ai_goal = yes is set. An interval of 0 means the AI will never check this decision |  |
| cooldown | Block | How long the decision will be unavailable after it has been taken. Can be in years, months, or days. | ``cooldown = { years = 5 }`` |
| confirm_click_sound | String | A sound file to play | ``confirm_click_sound = "event:/DLC/FP2/SFX/UI/fp2_struggle_ending_decision_confirm"`` |
| selection_tooltip | Localization key or block | Overrides the default tooltip for this decision on the decision panel. The default is the decision name plus "_tooltip". It can also be a block like in event descriptions. |  |
| title | Localization key or block | Overrides the default localization key for the decision title, which is normally the same as the decision name. It can also be a block like in event descriptions. |  |
| desc | Localization key or block | Overrides the default localization key for the description, which is the decision name plus "_desc".<br>It can also be a block like in event descriptions. | `desc = start_hunt_decision` |
| confirm_text | Localization key or Block | Overrides the default localization key for the text on the confirm button, which is the decision_name plus "_confirm".<br>It can also be a block like in event descriptions. |  |
| is_shown | Trigger | This determines the conditions required for the decision to appear in the decisions tab. | <pre><code>is_shown = {<br>        has_royal_court = yes<br>}</code></pre> |
| is_valid_showing_failures_only | Trigger | Can this decision be taken now? Both this trigger and ``is_valid`` must be satisfied. The tooltip for this trigger only shows conditions that were not met. | <pre><code>is_valid_showing_failures_only = {<br>        is_available_adult = yes<br>        is_at_war = no<br>}</code></pre> |
| is_valid | Trigger | Can this decision be taken now? Both this trigger and ``is_valid_showing_failures_only`` must be satisfied. | <pre><code>is_valid = {<br>        piety_level &gt;= 3<br>}</code></pre> |
| cost | Block | Sets the cost of the decision in terms of gold, piety and prestige. The default value for each resource is zero. Not every resource has to be defined. The values can be script values. | <pre><code>cost = {<br>	gold = 42<br>	piety = 42<br>	prestige = 42<br>}</code></pre> |
| minimum_cost | Block | Like ``cost``, but the character only needs to have that much available. The cost is not deducted when the decision is taken. Useful when the real cost is scripted in events triggered from this decision, and similar cases. |  |
| effect | Block | What the decision will do when it is taken. | <pre><code>add_character_modifier = {<br>        modifier = vow_of_poverty_modifier<br>}</code></pre> |
| ai_potential | Trigger | Whether the AI will consider this decision. | <pre><code>ai_potential = {<br>        always = yes<br>}</code></pre> |
| ai_will_do | Block | A calculation of the % chance the AI will take this decision when considering it. | <pre><code>ai_will_do = {<br>        base = 100<br>}</code></pre> |
| should_create_alert | Trigger | This trigger is checked when the decision would otherwise notify the player that it can be taken. If the trigger is not satisfied, the alert is not shown. This can be good to add if there are situations where taking the decision is possible but not useful. | <pre><code>should_create_alert = {<br>        gold &gt;= 50<br>}</code></pre> |
| widget | String or Block | A custom gui widget with extra options.
The widget must be created in``gui/decision_view_widgets/``, the file name must match the widget name.
Important! The default controller doesn't work. Try using create_holy_order | <pre><code>widget = {<br>        gui = "decision_view_widget_commission_artifact"<br>        controller = decision_option_list_controller<br>        ...<br>}</code></pre> |


### Values

You can define settings (usually at the top of the file) that can be used in the decisions in place of directly writing numbers. This can be useful to avoid repeating yourself, to avoid subtle errors when you change a value in one place but not in another, or simply to emphasize that the value can be adjusted for balance reasons.

For example:

```
@sale_of_titles_prestige_cost = 500

sale_of_titles_decision = {
        ... stuff ...

        cost = {
                prestige = @sale_of_titles_prestige_cost
        }

        ... stuff ...
}
```


## Custom widgets

Custom gui widgets can be added to a decision to let the player make an additional choice.

See the widget entry in the .info file for more details.

  - Important!** The default controller doesn't work, try using ``controller = create_holy_order``


## Testing Decisions

Sometimes, when testing a mod, it is useful to automatically refresh the cooldown of a decision (for example, if testing an on-action triggered when a hunt or a feast begins). This can be done by running ``effect remove_decision_cooldown = decision_id``. See below for a list of ids for built-in decisions.


## Decision ID

To quickly find the id of a decision, search through localization folder for its name. You'll see something like ``my_decision: "My decision"``

To do a folder search, use a proper text editor, like VSCode. 

Drop the localization folder in, right-click it > Find in Folder or press Ctrl+Shift+F.

Often, the id matches the name, if we replaced all spaces with underscores and added _decision on the end. 

For example, "Commission Artifact" is called commission_artifact_decision.

Some decisions that do not match their internal name are included in the table below:


| **Decision** | **Internal name** |
| --- | --- |
| Call Hunt | start_hunt |
| Search for Physician | hire_physician |
| Borrow Gold from Holy Order | borrow_from_holy_order |
| Challenge the Ruler | tribal_challenge_ruler |
| Stop Gaining Weight | stop_gain_weight |
| Stop Losing Weight | stop_lose_weight |
| Attempt Suicide | commit_suicide |
| Return Roma | return_rome |
| Determine Bhakti | select_personal_deity |
| Give Your Ancestor a Sky Burial | give_sky_burial |
| Raise a Runestone | raise_runestone |
| Found Holy Order | create_holy_order |
| Revoke Holy Order Lease | cancel_holy_order_lease |
| Go on a Pilgrimage | go_on_pilgrimage |
| Undertake the Hajj | go_on_hajj |
| Restore the Kingdom of Cornwall | restore_dumnonia |
| Reclaim Constantinople | set_capital_constantinople |
| Reclaim Rome | set_capital_rome |
| Restore the Papacy | restore_papacy |
| Form the Swiss Confederation | form_switzerland_kingdom |
| Form Archduchy of Austria | form_austria_kingdom |
| Dismantle the Papacy | dismantle_papacy |
| Restore Carolingian Borders | reform_carolingian_empire |
| Unify the Burgundies | unify_burgundy_kingdom |
| Unify Italy | unify_italian_empire |
| Adopt Feudalism (unused) | convert_to_feudalism |
| Adopt Feudal / Clan Ways through Liege | convert_to_feudalism_liege_converted |
| Adopt Feudal / Clan Ways | convert_whole_realm_to_feudalism |
| Form the Outremer Empire | create_outremer_empire |
| Sell Minor Titles | sale_of_titles |
| Restore the Ash'ari Caliphate | restore_sunni_caliphate |
| Restore Israel | create_israel_kingdom |
| Restore the Faith High Priesthood | jewish_restore_high_priesthood |
| Restore the Faith High Priesthood | zoroastrian_restore_high_priesthood |
| Become the Saoshyant | become_saoshyant |
| Dismantle German Pretenders | dismantle_holy_pretender |
| Dismantle Greek Pretenders | dismantle_byz_pretender |
| Form the Sultanate of Rum | form_rum_sultanate |
| Revive Greater Armenia | create_armenian_empire |
| Consecrate Bloodline | declare_bloodline_holy |
| Build a Grand Church | build_grand_church |
| Faith Cannibalism | accept_cannibalism |
| Request Claim on Ireland | england_request_laudabiliter |
| Inspire Opus Francigenum | promote_gothic_innovations |
| Build a Glass Monument | lunatic_building |
| Promote Christian Settlements | promote_hungarian_settlement |
| Revive Táltosism | revive_magyar_paganism |
| Unite the West Slavs | unite_the_western_slavs |
| Unite the South Slavs | unite_the_southern_slavs |
| Defenders of High God | defenders_of_highgod |
| Found a New Kingdom | found_kingdom |
| Found a New Empire | found_empire |
| Amnesty for False Conversions | encourage_confession_of_false_conversions |
| Restore the Holy Roman Empire | restore_holy_roman_empire |
| Adopt Special Succession Type | adopt_special_succession |
| Found the Kingdom of Aragon | form_the_kingdom_of_aragon |
| Indulge in Drink | stress_loss_drunkard |
| Consume Hashish Cakes | stress_loss_hashishiyah |
| Visit a Brothel | stress_loss_rakish |
| Seclude Yourself | stress_loss_reclusive |
| Lash Out | stress_loss_irritable |
| Flagellate | stress_loss_flagellant |
| Visit the Market | stress_loss_profligate |
| Donate to Charity | stress_loss_improvident |
| Confess | stress_loss_contrite |
| Indulge in Food | stress_loss_comfort_eater |
| Shun Food | stress_loss_inappetetic |
| Write Thoughts Down | stress_loss_journaller |
| Talk to Confidant | stress_loss_confider |
| Work off Some Stress | stress_loss_athletic |
| Accuse the Krstjani of Heresy | accuse_krstjani_of_heresy |
| Prepare to Cross the Carpathians | launch_hungarian_migration |
| Restore the Roman Empire | restore_roman_empire (as Byzantine Emperor)<br>restore_roman_empire_holy (as Holy Roman Emperor)<br>restore_roman_empire_italian (as Emperor of Italia) |
| Host Grand Rite | host_witch_ritual_decision |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Decisions_modding*
