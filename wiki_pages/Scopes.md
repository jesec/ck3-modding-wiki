# Scopes

> **Note:** Last verified for version 1.1


![CK3 Scope Overview Chart](https://ck3.paradoxwikis.com/File:CK3_Scopes.png)
    - Scopes** are used in [scripting](Scripting.md) to select entities in order to check [triggers](Triggers.md) or execute [effects](Effects.md).
![These are the color-coded direct scopes as of 1.8.0, generated via automated export from the game files.](https://ck3.paradoxwikis.com/File:Exportedscopes190.png)


## Definition

[↑ Back to top](#)

### Database scope

Scope most often refers to a database object, and the database itself is referred to as the scope type. Those include for example characters, titles, provinces, etc.

The full list of available scope types an be found in [Scopes_list](Scopes_list.md).

Unless specified otherwise, the term scope will always refer to a database scope.

A database scope usually has the following three characteristics:

- you can read information from it, using [triggers](Triggers.md)
- you can write information on it or modify it, using [effects](Effects.md)
- you can move from one to another

Some scopes are created on game start, either from `/Crusader Kings III/game/history` files (historical characters, titles), `/Crusader Kings III/game/map data` (provinces), or `/Crusader Kings III/game/common` folders (cultures, faiths, governments, traits...).

Some scopes can also be created on runtime either in code (ex: naturally born characters), or in script (ex: characters created using the ``create_character`` effect, dynamic titles).


### Primitive scope

[↑ Back to top](#)
Numbers, booleans (yes/no) and flag values (``flag:some_string``) are so-called primitive scopes. They cannot be modified or accessed, and while "numbers are scopes" can possibly be a confusing statement to beginners, it is useful to know to better understand some advanced functionalities or error logging.


### Top scope

[↑ Back to top](#)
A top scope is a temporary and abstract object created by the game to store information, amongst other things so that it can be retrieved and displayed in localization or GUI.


## Accessing scopes

[↑ Back to top](#)
Unless specified otherwise, the term scope always refers to a database scope.

In script, [effects](Effects.md) and [triggers](Triggers.md) are executed in a context, and most of them work from specific scope types.

Ex: the [trigger](Triggers.md)``is_ai = no`` checks whether the current scope is a player, which only makes sense in the context of a character scope. Using it in the context of another scope type will throw an error.

This section explains how to change the context in which script is interpreted. Scopes can also be used as arguments for [effects](Effects.md) and [triggers](Triggers.md), where the following methods of access will also be used.


#### root

[↑ Back to top](#)
[Trigger](Triggers.md) blocks and [effect](Effects.md) blocks often have a default context provided by code. When such is the case, unless the context is changed, [triggers](Triggers.md) are evaluated and [effects](Effects.md) are executed in the context of that scope.

Ex: in an event's ``immediate`` effect block, the context is the character that receives the event, and by default, all effects in that block are executed in the context of that specific character scope.

In [effect](Effects.md) and [trigger](Triggers.md) blocks that have a default context, ``root`` is a shortcut to that default context. Contrary to a common misconception, ``root`` is not the player. As a matter of fact, "the" player is a very dubious concept in a game that can have several players.

Not all [effect](Effects.md) blocks and [trigger](Triggers.md) blocks have a ``root``. For example, those in [character interactions](https://ck3.paradoxwikis.com/character_interactions) do not have one, because it could possibly be ambiguous: would it be the character sending the interaction, or the character receiving it?

``root`` is not necessarily a character scope either. Whether there is a ``root`` and what scope it is depends on each [effect](Effects.md) block or [trigger](Triggers.md) block.


### Context switch

[↑ Back to top](#)
The context of an [effect](Effects.md) block or [trigger](Triggers.md) block can be changed at any time by opening a new script block with the scope you want to set the context to, followed by an equal sign ``=`` and an opening bracket ``{``. The context change is in effect until the corresponding closing bracket ``}`` is found.

Ex: in an event's ``immediate`` effect block


```
immediate = {
   < context here is the character receiving the event, a character scope >
   title:k_france = {
      < context here is the Kingdom of France, a title scope >
   }
   < closing the block reverts back to the initial character scope >
}
```


Context can be changed multiple times by opening further nested script blocks. Each time a new block is opened, indentation should be increased. When the block is closed, indentation should be decreased. Keeping a clean indentation helps understanding at a glance in what context [triggers](Triggers.md) and [effects](Effects.md) are interpreted.

When ``root`` is provided, it can be accessed at any time to set the context back to it.

Ex:


```
immediate = {
   title:k_france = {
      < context here is the Kingdom of France >
      root = {
         < context here is the character receiving the event >
      }
   }
}
```


Trying to change the context of a script block to an invalid scope results in a failed context switch.
Ex:

```
immediate = {
   title:k_frnace = {
```

The typo causes a failed context switch because ``k_frnace`` is not defined.


### Database access

[↑ Back to top](#)
Scopes being database objects, they have a unique key or ID. They are identified using the syntax ``<scope type>:<scope key>``.

Ex: ``title:k_france`` is the Kingdom of France, as defined in ``common/landed_titles/``.


```
title:k_france = {
   # context here is the Kingdom of France
}
```


Characters have two IDs: a historical ID, and a runtime ID.
Historical IDs are predetermined in the `/Crusader Kings III/game/history` files, so historical characters can be accessed with that ID. Non-historical characters, on the other hand, only have a runtime ID, assigned when the character is created. As it cannot be known in advance, and is not consistent across different games, it cannot be referenced in script, and non-historical characters can never be accessed through this method.


### Event target

[↑ Back to top](#)
Scopes that have a unique relation from one to another can be accessed through event targets. As the game knows the scope type of all event targets, those are not prefixed.

The full list of available event targets can be found in [Scopes_list](Scopes_list.md).

Ex:

```
holder - Get holder of scoped title
Input Scopes: landed_title
Output Scopes: character
```


``Output Scopes`` is the scope type of the event target.
``Input Scopes`` is the scope type an event target can be used from.

A title can only ever be held by a single character at a time. As such, the ``holder`` event target allows moving from a title scope to the unique character scope holding that title.


```
title:k_france = {
   holder = {
```


Event targets can be chained and separated by a dot.

Ex:

```
title:k_france.holder = {
```


The following event targets have a specific contextual behavior.


#### this

[↑ Back to top](#)
``this`` is the current scope. It is useful specifically in [scope comparison](https://ck3.paradoxwikis.com/scope_comparison), or to feed the current scope as an argument.


#### prev

[↑ Back to top](#)
``prev`` is the previous scope. Like ``this``, it is often useful in [scope comparison](https://ck3.paradoxwikis.com/scope_comparison) or to feed the previous scope as an argument, but it can also be useful when used in conjunction with list-builders below.


```
title:k_france = {
   holder = {
      prev = {
         # context here has been set back one step to title:k_france
```


Unlike in CK2, ``prev`` cannot be chained to go back several steps.


### Saved scope

[↑ Back to top](#)
A saved scope is an arbitrarily-named pointer to a specific scope, using the syntax ``scope:<scope name>``.

Saved scopes can be saved in and provided by code. For example, in [Interactions modding](Interactions_modding.md), ``scope:actor`` is the character sending the interaction, and ``scope:recipient`` the character receiving the interaction.

Some on_actions also provide pre-saved scopes. Check the comments in the files to see which scopes are available.

Saved scopes can also be saved in script using the ``save_scope_as`` [effect](Effects.md), which saves the current scope with the provided name.


```
title:k_france.holder = {
   save_scope_as = king_of_france
}
```


From then on, that saved scope can be accessed at any time:


```
scope:king_of_france = {
```


Saved scopes can be passed from UI to scripted guis or script values/custom localization with AddScope:

``"[ScriptedGui.Execute( GuiScope.SetRoot( GetPlayer.MakeScope ).**AddScope( 'target', CharacterWindow.GetCharacter.MakeScope )**.End )]"``

``"[GuiScope.SetRoot( GetPlayer.MakeScope ).**AddScope( 'target', CharacterWindow.GetCharacter.MakeScope** ).ScriptValue('sval_name')|0]"``

Saved scopes carry throughout an unbroken effect chain. For example, if ``scope:king_of_france`` is saved in event A, and event A then fires event B, ``scope:king_of_france`` will be accessible in event B.

When the unbroken effect chain reaches its end, saved scopes are automatically cleared. If necessary, they can also be manually cleared using the ``clear_saved_scope`` [effect](Effects.md).

``save_temporary_scope_as`` can be used either as an [effect](Effects.md) or as a [trigger](Triggers.md). Saved temporary scopes do not carry throughout an unbroken effect chain, and expire at the end of the current [effect](Effects.md) block or [trigger](Triggers.md) block they were saved in.

A saved scope name can only be used once at any given time. Saving a scope with the same name as another previously saved scope overwrites it.


### List-builder

[↑ Back to top](#)
Scopes that have a relation from one to multiple others cannot be accessed through event targets.

For example, a character only ever has one mother, accessible using the ``mother`` event target. But the opposite is not true: a mother can have multiple children, and as such there cannot be a ``child`` event target, as that would be ambiguous.

In that case, scopes can be provided in a list, which can be accessed using a list-builder, of which there are 3 [effect](Effects.md) variants, and 1 [trigger](Triggers.md) variant.

In the following sections, all script examples are executed in the context of a character scope, using the ``child`` list. There are different kinds of lists, including lists built in script.


> **Main article:** [Lists](Lists.md)


#### every_X

[↑ Back to top](#)
``every_X`` is an [effect](Effects.md) that accesses all scopes in the list one after the other, and executes the [effects](Effects.md) within for each one of them.


```
every_child = {
   add_gold = 10
}
1. every child of the current character scope gets 10 gold
```


If the list is empty, enclosed [effects](Effects.md) are not executed.

The list can be trimmed out using [triggers](Triggers.md) in a [limit](https://ck3.paradoxwikis.com/limit) block. [Effects](Effects.md) will only be executed for scopes for which the limit is evaluated as true.


```
every_child = {
   limit = { is_female = yes }
   add_gold = 10
}
1. every female child of the current character scope gets 10 gold
```


If the filtered list is empty, enclosed [effects](Effects.md) are not executed.

As mentioned above, ``prev`` is often used in list-builders to access back the scope the list-builder is used from.


```
every_child = {
   limit = { is_female = yes }
   prev = {
      add_gold = 10
   }
}
1. the current character scope gets 10 gold for every female child they have
```


Saving scopes in ``every_X`` list builders can be useful, but since only one saved scope with a given name can exist at any given time, once ``every_X`` has finished running, only the last scope in the list is effectively saved.


```
every_child = {
   limit = { is_female = yes }
   save_scope_as = female_child
}
scope:female_child = {
   # this is the last female child in the list, not all of them
}
```


#### random_X

[↑ Back to top](#)
``random_X`` accesses a random scope in the list, and executes the enclosed [effects](Effects.md) only for that one scope.


```
random_child = {
   add_gold = 10
}
1. one child gets 10 gold
```


If the list is empty, enclosed [effects](Effects.md) are not executed.

The list can be trimmed out using [triggers](Triggers.md) in a [limit](https://ck3.paradoxwikis.com/limit) block, and ``random_X`` will access a random scope in the list for which the limit is evaluated as true.


```
random_child = {
   limit = { is_female = yes }
   add_gold = 10
}
1. one female child gets 10 gold
```


If no scope in the list meets the requirements of the [limit](https://ck3.paradoxwikis.com/limit) block, enclosed [effects](Effects.md) are not executed.

Saved scopes are often used in conjunction with ``random_X`` list-builders, especially when trying to scope to specific characters. As most characters in the game are not historical characters, and cannot be accessed through their ID, they need to be accessed relatively to another scope, and then saved as a scope to be easily accessed again later.


```
random_child = {
   limit = {
      is_female = yes
      is_adult = yes
      is_married = no
   }
   save_scope_as = celibate_daughter
}
```


#### ordered_X

[↑ Back to top](#)
``ordered_X`` sorts the list according to its ``order_by`` parameter, and by default accesses the first scope in the list in descending order, and executes the enclosed [effect](Effects.md) for that scope only. ``order_by`` can either be a named value or a script value, interpreted in the context of each scope in the list.

Warning: in [script math](https://ck3.paradoxwikis.com/script_math), the default behavior of ``ordered_X`` is to iterate through *all* scopes in the list in order. It is unclear whether this is a bug, or working as intended.


```
ordered_child = {
   order_by = age
   add_gold = 10
}
1. the eldest child gets 10 gold
```


The list can be trimmed out using [triggers](Triggers.md) in a [limit](https://ck3.paradoxwikis.com/limit) block, and ``ordered_X`` will pick the first scope in the list for which the limit is evaluated as true.


```
ordered_child = {
   limit = { is_female = yes }
   order_by = age
   add_gold = 10
}
1. the oldest female child gets 10 gold
```


The ``position`` parameter enables overriding the default behavior of ``ordered_X`` to access the scope in the list with the specified index< starting at 0. It uses either an integer, or a script value that automatically rounds down to the nearest integer. ``position = 0`` is the first scope in the list.


```
ordered_child = {
   limit = { is_female = yes }
   order_by = age
   position = 1
}
1. the 2nd eldest daughter gets 10 gold
```


The ``min`` and ``max`` parameters make ``ordered_X`` iterate through all scopes in the list in order that have a higher or equal index than ``min`` and a lower or equal index than ``max``. The ``check_range_bounds`` parameter avoids errors when the specified range is larger than the size of the list.


```
ordered_child = {
   limit = { is_female = yes }
   order_by = age
   max = 2
   check_range_bounds = no
}
1. the 3 elder daughters get 10 gold, starting with the oldest
```


#### any_X

[↑ Back to top](#)
``any_X`` accesses scopes in the list in an undetermined order until the triggers nested within evaluate to true for one of them, in which case ``any_X`` evaluates as true. If the enclosed triggers evaluate as false for all scopes in the list, or if the list is empty, ``any_X`` evaluates as false.


```
any_child = {
   age > 10
}
1. true if any child is strictly older than 10
```


The list can be trimmed down using triggers in a ``filter`` block. Triggers enclosed in the ``any_X`` list builder will only be checked for scopes for which the ``filter`` block is evaluated as true.


```
any_child = {
   filter = { is_female = yes }
   age > 10
}
1. true if any female child is strictly older than 10
```


``save_temporary_scope_as`` can be used to save whatever object first evaluates as true for all enclosed triggers, to be accessed later from the same trigger block.


```
any_child = {
   filter = { is_female = yes }
   age > 10
   save_temporary_scope_as = teenage_daughter
}
```


The ``count`` parameter can be used to require triggers enclosed within ``any_X`` to evaluate to true for an arbitrary number of scopes in the list.


```
any_child = {
   condition = { is_female = yes }
   age > 10
   count >= 2
}
1. true if at least to female children are strictly older than 10
```


The ``percent`` parameter can be used to require triggers enclosed within ``any_X`` to evaluate to true for an arbitrary portion of scopes in the list.


```
any_child = {
   condition = { is_female = yes }
   age > 10
   percent >= 0.5
}
1. true if at least half of the female children are strictly older than 10
```


### Saved scope value

[↑ Back to top](#)
A saved scope value is an arbitrarily-named pointer to a specific primitive scope, using the syntax ``scope:<scope name>``.

Saved scope values can be saved in and provided by code, although it is much rarer than saved scopes. For example, in a [character interaction](https://ck3.paradoxwikis.com/character_interaction) that has an interaction option named ``option_1``, ``scope:option_1`` is provided as a boolean scope value, true if the option is selected, false if it isn't.

Saved scope values can also be saved in script using the ``save_scope_value_as`` effect, which saves the provided scope value with the provided name.


```
save_scope_value_as = {
   name = some_name
   value = <boolean>/<number>/<flag value>
}
```


Similarly, temporary saved scope values can be saved by using the ``save_temporary_scope_value_as`` trigger or effect.

Saved scope values and temporary saved scope values follow the same rules as saved scopes regarding availability.


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Scopes*
