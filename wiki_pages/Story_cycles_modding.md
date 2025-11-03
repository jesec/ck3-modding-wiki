# Story cycles modding

> *This article is timeless and should be accurate for any version of the game.*


A story cycle is essentially an event manager that fires events periodically and stores any related values for them.

For example, pet events in the game are done through a story cycle that keeps track of the age of the pet and occasionally fires events about them.

Story cycles can also be used as simply a storage for variables and variable lists so they can persist after a character's death.


## Creating a story cycle

Story cycles are defined in common/story_cycles/ folder, in txt files.

Then effect ``create_story = story_cycle_name`` is used in script (event, decision, etc) to create a story cycle, with some character as its owner.

The basic structure of a story cycle is:

```perl6
story_cycle_name = {
	on_setup = {}
	on_end = {}
	on_owner_death = {}
	
	effect_group = {
		days/months/years = x

		trigger = {}
		
		triggered_effect = {
			trigger = {}
			effect = {}
		}
	}
	
	effect_group = {}
	effect_group = {}
	...
}
```
You can choose any name for the ``story_cycle_name``.
- ``on_setup`` - performs effects when the story is created

Use ``story_owner`` if you want to affect the story owner, like this: ``story_owner = { trigger_event = my_event.1 }``

Otherwise, all effects are applied to the story scope itself.

- ``on_end`` - performs effects when the story is ended

A story can be ended with ``end_story = yes``, either manually in script or automatically, when, for example, the story owner dies.

- ``on_owner_death`` - performs effects when the story owner dies (but fires while they are still alive, like on_death on_action)

This often includes ``end_story = yes``, which ends the story and executes any effects in the ``on_end`` block.

Alternatively, it can be used to transfer the story to another character, like the heir, with ``make_story_owner = story_owner.primary_heir`` effect or to copy variables to them.

- ``effect_group`` - a repeating pulse that fires every x days (or months/years) and performs some effect if the trigger returns true.

A random range can be used like this: ``days = { 30 60 }``. Then it will fire every 30 to 60 days.

``chance = x`` can be used to randomize the chance of the effect firing with values from 1 to 100.

``triggered_effect`` can have its own trigger too. If the trigger is true, it executes effects in the effect block.

Multiple triggered_effects can be used in one group and multiple effect_groups in one story cycle.

``first_valid`` can also be used to choose one of multiple triggered_effects, like this:

```perl6
effect_group = {
	days = 30
	first_valid = {
		triggered_effect = {
			trigger = {}	# if this trigger is true, this effect is chosen first
			effect = {}
		}
		triggered_effect = {
			trigger = {}	# otherwise, check for this trigger
			effect = {}
		}
		triggered_effect = {} # and so on
	}
}
```


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Story_cycles_modding*
