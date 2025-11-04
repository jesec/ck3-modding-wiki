# Scripting

> *This article is timeless and should be accurate for any version of the game.*


**Scripting** lets us add and change game content, where allowed by developers, with custom scripting language.

It is very readable, using names like add_gold or set_variable.

**Script is used in common/ and events/ folders.**

This extends to decisions, interactions, activities and also definitions of religions, cultures, legacies and so on.

What isn't script:

- Most of AI or army behavior is done in game code, which is inaccessible to modders. We call such features "hardcoded".

- [Interface](Interface.md) is a separate system, and with a few exceptions, we cannot use script in UI or UI functions in script. Use [Interface#Scripted GUIs](Interface.md#scripted-guis) to execute script in UI.

- [History modding](History_modding.md) also uses a slightly different static system, but allows to use effects from script.


## Basics

This is quick guide to the whole scripting language.


#### Documentation

Use ``script_docs`` console command in the game to generate logs with lists of all available functions.

They are created in ``Documents\Paradox Interactive\Crusader Kings III\logs``

Especially, look for effects, triggers and event_targets logs. 

They list the three common types of functions:

* **effects** - they do something, like ``add_gold``. Used in effect blocks, like ``immediate = {}, effect = {}, on_accept = {}``

* **triggers** - check for something and return true or false, like ``is_ai = yes``. Can also return values. Used in trigger blocks, like ``limit = {}, trigger={}``, etc
* **event targets** - select another game object, like ``primary_heir`` selects  your heir. We call such objects "scopes" and switching between them "scoping".

The logs folder also has error and debug logs, useful to find errors and test your script.

There are also .info files in folders, they describe the syntax of files there.


#### Limitations

- No access to the operating system

- One-dimensional arrays

- No string manipulation
- No in-line math
- Slower than actual game code
See [Scripting#Workarounds](#workarounds) below for some solutions.


#### Script language name

There is no official name for the language used in script, it's just "Paradox scripting language".

However, some developers have started to call it "Jomini script", after it was was updated with the the creation of [forum:1170261](https://ck3.paradoxwikis.com/forum:1170261) library of tools.
"Clausewitz" is the name of the game engine.


#### Testing

There are a few ways to quickly test your script:
- you can run short scripts in the console, by adding the word effect or trigger in front, like this:

``effect add_gold = 100`` or ``trigger is_ai = yes``

- use script runner in the explorer (console command ``explorer``)
- place your script in a .txt file in the run/ folder and execute it with ``run filename.txt`` console command
- run the game with ``-develop`` launch option, so your event or decision reloads instantly

Keep the error log open to see any issues. Run console command ``release_mode`` to show the error tracker in game.

Launch the game with ``-debug_mode`` launch option to use the console.

For script validation you can use fan-made [CK3 Tiger](https://github.com/amtep/ck3-tiger) (has an extension for VS Code)


## Basics


### Syntax

Most of the script follow this structure:

``x = y``

``x = { y = z }``

```c
x = {
  a = b
  e = {
    f = g
  }
}
```
Examples:

- ``is_alive = yes``
- ``add_gold = 100``
- ``debug_log = "hello world"``
- ``player_heir = { marry = root }``

Effects and triggers are never used separately, they need to be followed by another parameter, sometimes simply ``= yes``.

Triggers can also be used with ``= no``, to check for the opposite.

``is_ai = no`` is the same as ``NOT = { is_ai = yes }``


Triggers that check for a value can also return it.

``add_gold = age``would add gold equal to the character's age.

For complex triggers that have a ``target`` there is special syntax, with the target in round brackets:

``add_gold = "opinion(liege)"``

Yes, quotation marks are necessary here.


### Scopes

Scopes are entities in the game, like a character or county.

Effects and triggers need to be used on the right scopes

- e.g.``age`` trigger only works on a character

Event targets let us switch from one scope to another, we call that scoping.

- ``primary_heir`` is an event target, only available on a character, returning their primary heir

See logs for information on supported scopes.

Note, event targets can be used anywhere in script, they are not restricted to events.


### Chaining

Scopes can be chained like this: ``x.y.z``

``primary_heir.faith.religious_head`` is the same as

```c
primary_heir = {
  faith = {
    religious_head = { }
  }
}
```


### Prefixes

We need to add a special prefix, like ``culture:``, to directly reference a culture, faith, religion, title or character, for example:

``set_culture = culture:english``

``set_character_faith = faith:orthodox``

``capital_county = title:c_byzantion``

``marry = character:123456``

Look for keys, like ``english`` in the files and character IDs in the debug tooltip.


### Formatting

Script inside curly brackets is called a "code block".

Indentation isn't important for execution of script (this refers to tabs at the start of a line). Most script could technically be written in one line.

However, for readability, each code block should be indented with one more tab. This helps you see where they open and close and allows to collapse blocks of code in the text editor.

Comments are made with # in front of text.

**Exceptions**

There are some blocks that accept multiple entries without a paired parameter. For example, events in on_actions:

```c
on_death = {
  events = {
    death_management.0096
    death_management.0097	
    death_management.0098
  }
}
```


## Keywords

``root`` - the object at the root of the script, for whom the script is executing.

In an event, ``root`` is the character who recieved the event.

Anywhere in that event ``root`` will reference that character again.

E.g. ``primary_heir = { set_relation_grudge = root }``

``prev`` - previous scope in the script

```c
primary_heir = {
  primary_spouse = {
    set_relation_soulmate = prev
  }
}
```
Here the heir's spouse will become their soulmate.

Note that there is no ``prevprev``, we can only go back one time.

Using two prevs, like ``prev = { prev = {`` will go back to the original scope.

``this`` - references current scope.

Not needed most of the time, but useful in some cases, like:

```c
county.holder = {
  OR = {
    this = root
    this = root.primary_spouse
  }
}
```


## Operators


#### Logic operators

Script has the following:

AND, OR, NOT, NOR, NAND

They are used like this:
```c
OR = {
  is_ai = yes
  gold > 100
}
```
This will return true if the character is AI **OR** if they have more than 100 gold.

Multiple parameters can be put in a block, and they can be nested, like ``OR = { AND = { NOT = {...``

**AND** is true if **all** conditions are **true**.

**OR** is true if **any** condition is **true**.

**NOT** and **NOR** are actually the same: true if **all** conditions are **false**.

**NAND** is true if **any** condition is **false**.

Note that all trigger blocks, like ``limit={}``, work as AND by default and accept multiple parameters.

Operators don't have to be capitalized, but it is common practice for readability.


#### Relational operators

Scopes are compared with ``=``. For example, ``primary_heir = primary_spouse``.

``!=`` means NOT equal, same as ``NOT = { x = y }``

Values can be compared with ``< <= = != > >=``

``?=`` is a special operator that checks that this object exists and only then compares it or executes some script.

``capital_county ?= title:c_byzantion`` checks that the character has a capital county first. Same as:

```c
exists = capital_county
capital_county = title:c_byzantion
```
This helps avoid errors from unset scopes and makes the script more compact.


## Saved scopes

A saved scope is similar to a variable.

It saves an object so you can reference it later and exists only temporarily in the script where it was saved.

``save_scope_as = name``

``scope:name = { # do something }``

```c
primary_heir = { save_scope_as = my_son }
scope:my_son = { death = natural }
```
The saved scope persist in other events or scripted effects that are called from the same script, but once the whole script ends execution, the saved scope will be gone too.

``save_scope_value_as`` can save a value or a string flag, referenced the same way.

```c
save_scope_value_as = {
  name = cost
  value = primary_heir.age
}
add_gold = scope:cost
```

```c
save_scope_value_as = {
  name = kill_locale
  value = flag:tower
}
if = {
  limit = { scope:kill_locale = flag:tower }
  # do something
}
```


In triggers, use ``save_temporary_scope_as`` and ``save_temporary_scope_value_as``

Normal versions will not work there.


Some saved scopes are premade by the game itself in on_actions and character interactions.

For example, in an interaction, ``scope:actor`` is the character who started the interaction, ``scope:recipient`` is the target character.

For on_actions see comments in their files, they list available saved scopes.


Important, do not use ``scope:`` before event targets or keywords like ``root`` and ``prev``.

``scope:`` is only used with saved scopes that you or the game saved before!


## Variables

A variable is a container that can hold a value.

Variables can hold pretty much anything: numbers, characters, booleans or string flags.

We don't need to declare the data type of a variable. All number variables are fixed-point values. Example:

```c
set_variable = {
  name = test
  value = 10
}
```
Get its value with ``var:``

``add_gold = var:test``

``marry = var:my_crush``

A variable can be set simply with ``set_variable = test``. It is the same as setting a variable with ``value = yes``.


To change it, use ``change_variable``, to remove, ``remove_variable``, for example:

``change_variable = { name = test add = 1 }`` and ``remove_variable = test``

Make sure to not use var: here, simply the name of the variable!

Value field can also be expanded to do math without using multiple change_variables:

```c
set_variable = {
  name = test
  value = {
    add = 10
    divide = 5
    subtract = 1
  }
}
```


There are different types of variables based on how they are stored:

* **normal**, ``set_variable`` - stored on the [Scopes](Scopes.md) where the effect was used. To access it, you need to scope to that object first.
    - accessed with ``var:``. Could be chained like this: ``primary_heir.var:my_sons_birthday``.
    - if stored on a character, will be lost when the character dies! Use dead character variables in that case.
* **global**, ``set_global_variable`` - stored globally and accessible from anywhere. Of course, only one global variable with a unique name can exist.
    - accessed with ``global_var:``.
* **local**, ``set_local_variable`` - a temporary variable that only exists while the script is executed, not stored on any object.
    - accessed with ``local_var:``. Could be useful as a counter, although rarely used.
* **dead**, ``set_dead_character_variable`` - stored on a dead character, requires a duration after which it is removed. This is for performance reasons.
    - accessed with ``dead_var:``, does not have a ``change_`` effect.

global and local have their own effects for changing and removing:

``change_global_variable``, ``remove_global_variable`` and ``change_local_variable``, ``remove_local_variable``


In UI and localization variables can be displayed like this:

``"[GetPlayer.MakeScope.Var('test').GetValue]"`` - returns the number for a normal variable set on a player.

If the variable stores another character, use GetCharacter instead of GetValue. Same for other types.

A global variable is displayed like this:

``"[GetGlobalVariable('test').GetValue]"``

For more see [Variables](Variables.md) and [Interface#Displaying a variable or script value](Interface.md#displaying-a-variable-or-script-value)


## Statements


#### if / else / else_if

Executes an effect if the limit = {} returns true.

```c
if = {
  limit = { is_ai = no }
  add_gold = 100
}
```
This would add gold only if the character is not an AI.

If the limit is false, a different effect can be executed with ``else`` right after the ``if`` block. To add another condition for that effect, use ``else_if``.

```c
if = {
  limit = {
    # condition
  }
  # effect
}
1. optional
else_if = {
  limit = { #condition }
  # effect
}
else = {
  # effect
}
```
Multiple ``else_if`` can be used right after each other.

Notes:

``limit`` acts like an AND block, so you can put multiple conditions in without using AND

Make sure your effect is inside the ``if`` block and outside of ``limit``. This is an easy mistake to make.


#### switch

If you have many else_ifs checking for the same trigger, it could be replaced with a switch

Switch selects one effect that matches the value of the trigger.

```c
switch = {
  trigger = #some trigger
  #value = { #effect }
  #value = { #effect }
  ...
}
```
Example:
```c
switch = {
  trigger = has_culture
  culture:english = { add_gold = 10 }
  culture:french = { add_gold = 20 }
  culture:italian = { add_gold = 30 }
}
```
This is identical to:
```c
if = {
  limit = { has_culture = culture:english }
  add_gold = 10
}
else_if = {
  limit = { has_culture = culture:french }
  add_gold = 20
}
else_if = {
  limit = { has_culture = culture:italian}
  add_gold = 30
}
```


#### while loop

``while`` is used to repeat an action multiple times

it can be used with ``count`` to run a set amount of times or ``limit`` to continue running until the condition returns false.

Examples:

```c
while = {
  count = 10
  add_gold = 100
}

while = {
  limit = { gold > 0 }
  remove_short_term_gold = 50
}
```
``while`` is limited to 1000 iterations by default, to avoid accidental infinite loops.

There is no way to break from a loop.


#### trigger_if / trigger_else / trigger_else_if

``trigger_if`` checks a trigger only if the ``limit`` block is true. If it's false, the check is skipped.

Example: if a character is not an AI, check if they are an independent ruler.
```
 trigger_if = {
    limit = { is_ai = no }
    is_independent_ruler = yes
 }
```
``trigger_else_if`` can be used after a ``trigger_if`` the same way as if/else are.

```c
trigger_if = {
  limit = { ... }
  ...
}
trigger_else_if = {
  limit = { ... }
  ...
}
trigger_else = {}
```
Note that sometimes the script might expect a trigger_else at the end. Try adding it if something isn't working.

Remember to only use ``trigger_if`` in a trigger block, not in an effect!


## Lists / Arrays

Lists, like variables, can hold multiple objects, variables and string flags.

Lists cannot hold other lists.

There are two types of lists: temporary and permanent.

UI can display permanent lists, like variable and global variable lists. See [Interface#Displaying data lists](Interface.md#displaying-data-lists)

Confusingly, a local variable list isn't permanent.


To make a list, we need to add each item to it with one of these commands:

**Temporary:**

- ``add_to_list`` - adds to a simple list, only exists while the script is executing
- ``add_to_local_variable_list`` - similar, but supports adding duration for the item after which it is removed from the list
- ``add_to_temporary_list`` - unlike all others, can be used in a trigger block

**Permanent:**

- ``add_to_variable_list`` - adds to a list stored on the scope where the effect is executed, supports duration
- ``add_to_global_variable_list`` - adds to a global permanent list, supports duration

If a list doesn't exist yet, one of these commands will create it and add the item.

If an item is already in the list, it won't be duplicated.

See effects.log for the correct syntax for each one.


Note that ``add_to_variable_list`` has confusing syntax.

Remember to run this effect on the scope that will store the list, not on the target.

In iteratiors we often use it this way, first scoping to the root to store the list there, and then adding the previous scope as the target.

```c
every_ruler = {
  root = {
    add_to_variable_list = {
      name = rulers
      target = prev
    }
  }
}
```


To check if an item is in a list:

``is_in_list, is_target_in_variable_list, is_target_in_global_variable_list, is_target_in_local_variable_list``

To remove an item:

``remove_from_list, remove_list_variable, remove_list_local_variable, remove_list_global_variable``


There is no effect to clear a simple list, only to clear variable lists:

``clear_variable_list, clear_global_variable_list, clear_local_variable_list``

To clear a simple list, try going through it and removing each item from the list.

You'll almost always want to run ``clear_variable_list`` before creating one, to avoid having old items in a list when it is recreated.

It will not error if you try to clear a list that doesn't exist yet.


``*_list_size`` triggers can check the size of a trigger, but they can't return the value.

If you need the size as a value, go through the list and count items. Script values can help with that, see the .info file in common/script_values.


## Iterators

Iterators go through a series of items and run effects or triggers for each one

Example:

```c
every_ruler = {
  limit = { age > 20 }
  add_gold = 100
}
```
This adds 100 gold to every ruler older than 20.

``limit = {}`` is optional. If it returns false, the effect will not run.

Be careful not to do something like ``every_living_character = { every_province = {``, this could cause lag since it would run through 9000 provinces 20000 times, once for each living character.


##### Effect iterators

These all run some effect on the item and can only to be used in *effect* blocks:

- ``every_x`` - runs through all items in the order they were added in
- ``ordered_x`` - orders items by a value, like ``age``. Can go through all or pick one.
- ``random_x`` - picks one random item, the chance can be manipulated


##### Trigger iterator

- ``any_x`` - goes through all items in a *trigger* block, returns true if the condition is true for *all* items.

``any_x`` can use ``count`` and ``percent`` with ``< <= = != > >=`` to specify how many items should return true.

Example:

```c
any_living_character = {
  count > 10
  has_culture = culture:english
  is_adult = yes
}
```
This checks that there are more than 10 english adults.

Make sure to not use ``limit`` inside an ``any_`` iterator! It is already a trigger. And do not use any effects here.


There are many iterators like ``every_ruler``, ``every_province``, etc. Search through triggers.log for ``any`` and effects.log for ``every, random, ordered``.

Tip: to find all ``every*county`` iterators, enable regex search (a ``.*`` button in the search panel) and search for ``every_.*county -``

It will find things ``like every_realm_border_county, every_connected_county, every_title_to_title_neighboring_and_across_water_county``, etc.


##### List iterators

We iterate through our lists with:

- ``every_in_list, every_in_local_list, every_in_global_list``
- ``ordered_in_list, ordered_in_local_list, ordered_in_global_list``
- ``random_in_list, random_in_local_list, random_in_global_list``
- ``any_in_list, any_in_local_list, any_in_global_list``

They are used for both simple and variable lists, specify which with ``list = name`` or ``variable = name``


## Templates


#### Scripted effects

To avoid copying the same code multiple times, we can create a template called a scripted effect.

When it's used, it essentially pastes its contents into script.

They can be defined in:

- common/scripted_effects to be used globally 
- event files, just for the events there

In common/scripted_effects:

``my_effect = { add_gold = 100 }``

Use it in script:

``my_effect = yes``

And then it becomes ``add_gold = 100``


In events we add ``scripted_effect`` keyword first:

```c
scripted_effect convert_family = {
  every_close_family_member = {
    set_character_faith = faith:adamites
  }
}
```
Used the same way: ``convert_family = yes``

This will convert all close family to adamatism.


#### Substitution

We can also define parameters that can be replaced when the scripted effect is used.

Use $$ to mark where to insert your parameter, choose any name:

``gift = { add_gold = $val$ }``

When used, replace that name with something else:

``gift = { val = 100 }`` 

In script this becomes ``add_gold = 100``


We can replace any part this way, even parts of effects:

``my_iterator = { every_$WHO$ = { add_gold = 10 } }``

Use like this:

``my_iterator = { WHO = child }``

This would become ``every_child = { add_gold = 10 }`` when used.


We can also insert whole chunks of script:

``do_anything = { $DO$ }``

``do_anything = { DO = "add_gold = 100" }``

Be careful, only use $$ in the definition of a scriped effect, not when it's used.

It is common practice to capitalize parameters, so they stand out better in code. But it's not a requirement.


#### Scripted triggers

Scripted triggers work much the same way as scripted effects.

When used, they paste their contents intro script.

Defined in common/scripted_triggers or also in event files, with ``scripted_trigger`` in front

``my_trigger = { is_ai = yes }``

Used: ``my_trigger = yes``

Note that you can also use ``= no``, when calling it, to check whether it's false.

``my_trigger = no`` is the same as ``NOT = { my_trigger = yes }``

Substitution also works in scripted triggers.


#### Script values

Script values can run a calculation and return a value.

Defined in common/script_values

```c
my_value = {
  add = age
  add = 10
  divide = 5
}
```
Used: ``add_gold = my_value``

Can be displayed in UI like this:

``"[GetPlayer.MakeScope.ScriptValue('my_value')]"``

Note that unlike variables, we don't use GetValue here.

Script values run every time they are used, so if it's a *very* complex calculation, that could cause lag.

This is especially a concern for UI, since it recalculates script values on every frame.


## Workarounds


#### Exchanging information with other apps

Debug and error logs can be used to export information, for example:

``error_log = "Event fired for [ROOT.Char.GetName]"``

Include an identifier in your string, so it's easy to find, for example ``"<value> [GetPlayer.MakeScope.Var('test').GetValue]"``

Then a 3rd party app can read the logs, search for strings with that identifier and execute some code based on the data.


To import information we can use ``run/`` folder (next to your mod folder).

You can create a text file there with game script and execute it, with your player as root, with console command ``run filename.txt``

UI can run console commands with ``ExecuteConsoleCommand`` function, so you can add a button or an animation state to run it automatically.

However, console commands disable achievements, so warn players about it!


#### Arrays

We can create a list with "containers" that would hold multiple values for us, using either:

- provinces
- [Story cycles modding](Story_cycles_modding.md)

Provinces don't require any extra setup and since there are 9000 of them, you can safely create large lists without worrying about running out of "containers".

Story cycles can be created as needed, they can execute effects automatically, so it's a more robust solution, but requires some work to setup.

The basic process is:

1. Add a container to a variable list
1. Set variables to that container
1. Use the list and reference the variables in each item


For more on script syntax see other documentation pages:


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Scripting*
