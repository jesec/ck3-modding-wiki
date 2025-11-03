# Triggers

> **Note:** Last verified for version 1.7


![a screenshot of the in-game tool to check triggers showing multiple triggers being false or true](https://ck3.paradoxwikis.com/File:Trigger_runner.png)

A trigger is a check that returns **true** or **false** for the scope where it's used.

For example, ``is_ai = yes`` would return **true** for an AI character, and **false** for a player.

This could be used to disable an event for a player, by using it in a trigger block of an event.

Triggers that compare values can also return the value itself.

For example, ``add_gold = gold`` would add the same amount of gold that the character currently has.

The full list of available code triggers can be found in [Triggers_list](Triggers_list.md). 

Run ``script_docs`` console command in the game and find the log in Documents\Paradox Interactive\Crusader Kings III\logs.


## Trigger blocks

Triggers are used in trigger script blocks.

Those usually are either explicitly named so, like an event's ``trigger = { }`` block, or their name are questions which can be answered by yes or no, like a decision's ``is_shown = { }`` and ``is_valid = { }``.

In some cases, triggers are used in hybrid script blocks that accept triggers amongst other things.

Ex: [weight modifier](Weight_modifier.md)


```
modifier = {
   is_ai = yes
   factor = 0
}
```

In this block, ``is_ai = no`` is a trigger, but ``factor = 0`` is an operator.


### Early out

Unless they are being tooltipped, trigger blocks operate on the so-called "early out" principle.

For a trigger block to be true, all triggers within must be true. "early out" means that as soon as a trigger in the block is evaluated as false, the rest of the triggers in that block are not evaluated.

This is useful to avoid errors.

Ex: the following trigger block checks that the current character scope's primary spouse has the same culture as them. To avoid errors, it first checks that the character `has` a spouse to begin with.


```
trigger = {
   exists = primary_spouse
   culture = primary_spouse.culture
}
```

If ``exists = primary_spouse`` is false, the second trigger is not evaluated.

It is also useful for performance optimization. In a trigger block containing multiple triggers, putting the ones most likely to fail first can significantly reduce the number of triggers checked overall.

Ex: this trigger block checks that the current character scope is a player and an independent ruler.


```
trigger = {
   is_ai = no
   is_independent_ruler = yes
}
```

If this trigger block is evaluated once a year for each character in the game, since most characters in the game are not players, ``is_ai = no`` will almost always be false, and the 2nd trigger will almost never be evaluated at all.


### Logic blocks

Trigger blocks can contain several triggers. By default, if all of them are true, the trigger block as a whole is true, but some logic blocks can manipulate that logic.


#### AND


```
AND = {
   is_ai = no
   is_independent_ruler = yes
}
```


The ``AND`` block is true if the current character both is a player and an independent ruler.


#### OR


```
OR = {
   is_ai = no
   is_independent_ruler = yes
}
```


The ``OR`` block is true if the current character scope is either a player `or` an independent ruler.


#### NOT/NOR/NAND


```
NOT = { has_title = title:k_france }
```


The ``NOT`` block is true if the current character scope does not hold the Kingdom of France.

To avoid ambiguity, ``NOT`` should only contain a single trigger. For multiple triggers, using ``NOR`` or ``NAND`` makes the intent clear.


```
NAND = {
   has_title = title:k_france
   has_title = title:k_aquitaine
}
```


The ``NAND`` block is true if the current character scope holds either the Kingdom of France or the Kingdom of Aquitaine or neither of the two. It is false if they hold both titles.


```
NOR = {
   has_title = title:k_france
   has_title = title:k_aquitaine
}
```


The ``NOR`` block is true if the current character scope holds neither the Kingdom of France nor the Kingdom of Aquitaine. It is false if they hold either of the titles.


### Limit blocks

The ``limit`` block is used for conditional effects and triggers.


#### if/else_if

The most common use of the ``limit`` block is with the ``if``/``else_if`` effects, to execute effects only if the ``limit`` block is true.

Ex: this effect adds gold to the current character scope if they are a player.


```
if = {
   limit = { is_ai = no }
   add_gold = 100
}
```


#### effect list-builders

Limit blocks are also commonly used to restrict effect list builders.

Ex: this effect adds gold to the current character scope's children if they are male

```
every_child = {
   limit = { is_male = yes }
   add_gold = 100
}
```


Note: the ``any_X`` list-builder does *not* use a ``limit`` block.


#### trigger_if/trigger_else_if/trigger_else

``trigger_if`` can be used to check a trigger only if the ``limit`` block is true.

Ex: if the current character scope is not an ai, this trigger checks whether they are an independent ruler


```
trigger_if = {
   limit = { is_ai = no }
   is_independent_ruler = yes
}
```


Conditional triggers are often used in tooltipped trigger blocks both for legibility and to avoid errors, because when tooltipped, early-out does not apply.

Ex: this trigger, when tooltipped, would throw an error when ``primary_spouse`` does not exist.


```
trigger = {
   exists = primary_spouse
   culture = primary_spouse.culture
}
```

but this would not throw an error, because if the ``limit`` block is false, the trigger is not evaluated.


```
trigger_if = {
   limit = { exists = primary_spouse }
   culture = primary_spouse.culture
}
```


## Trigger syntax


### Scope comparison

A scope comparison is a statement with two scopes on either side of an ``=`` sign. It is true if both objects are the same, and false otherwise.

Scopes in a scope comparison can be database scopes, event targets, saved scopes or variables.

Note: even if both scopes are not the same objects, they do need to be of the same scope type.

Ex: this trigger checks whether whoever holds the kingdom of France is the same character as the father of the current character scope.


```
title:k_france.holder = father
```


In a scope comparison, both sides need to be valid. In this example, the current character must have a father, and the Kingdom of France must be created, otherwise the scope comparison throws an error in the error log, so the existence of both scopes needs to be checked at some point before the comparison is made.

The existence of the scope on the left-hand side of the comparison itself by using ``?=``:


```
title:k_france.holder ?= father
```


### Value comparison

A value comparison is a statement with two numerical values on either side of either
- an equal sign ``=``
- a comparison symbol
    - strictly greater than ``>``
    - greater than or equal to ``>=``
    - lower than ``<``
    - lower than or equal to ``<=``
It is true if the comparison is mathematically correct.

Numerical values in a value comparison can be:
- a number
- a named value
- a [script_value](https://ck3.paradoxwikis.com/script_value)
- a saved scope value
- a [variable](Variables.md) storing a number

Ex: this trigger checks whether the current character scope's gold is strictly greater than 1000.


```
gold > 1000
```


### Code triggers

Code triggers have a predetermined syntax. They usually require a specific scope type context to work.

Code triggers can take several forms:


#### Basic triggers

Basic triggers check whether the statement has the expected positive or negative result.

Ex: this trigger is true if the current character scope is *not* an AI.
``is_ai = no``


#### Simple triggers

Simple triggers check whether they are true depending on the argument provided on the right hand side of the ``=`` sign.

The argument is either:

- a scope
Ex: this trigger checks whether the current character scope is a vassal of the saved scope ``scope:actor``.


```
is_vassal_of = scope:actor
```


- a database key
Ex: this trigger checks whether the current character scope has the trait defined with the ``infirm`` key.


```
has_trait = infirm
```


#### Complex triggers

Complex triggers use several parameters in a script block. Those parameters can be a scope, a database key, a numerical value or a flag value.

Ex: this trigger checks whether the current character scope has an active scheme of the murder type targeting their liege.

```
is_scheming_against = {
  target = liege
  type = murder
}
```


Some code triggers have both a simple form and a complex form.


#### In-line complex triggers

Some complex triggers can be written in one line to return a value.

It is written in quotation marks, with the additional argument in brackets.

For example, a script value would look like this:
```c
distance_to_liege_sval = {
  value = "realm_to_title_distance_squared(liege.capital_county)"
}
```
This feature is not documented and doesn't work with all triggers. From testing, it seems to only support triggers with this line in their description: ``Traits: <, <=, =, !=, >, >=``

If a trigger has multiple arguments, like ``has_trait_xp`` which requires trait and track, they are added with a |

``value = "has_trait_xp(lifestyle_traveler|danger)"``

So far, this is the only known trigger with this multi-argument syntax.


### scripted_triggers

Scripted_triggers are macros that enable replacing a set of triggers with a single statement, to make script more legible and avoid repetition.

They are usually defined in ``common/scripted_triggers``, and can then be used anywhere triggers are allowed.

They are sometimes defined locally in event files (see [events](https://ck3.paradoxwikis.com/events)), in which case they can only be used in events from the same file.


#### Basic scripted_triggers

Simple scripted_triggers check whether a predetermined set of triggers is evaluated as a whole as true (``= yes``) or false (``= no``).

Ex: if the following set of triggers is repeatedly used to check whether a character is a rich adult independent ruler:


```
is_independent_ruler = yes
is_adult = yes
gold > 1000
```

instead of repeating the same set of triggers in different places, they can be defined as a scripted_trigger:

```
is_rich_adult_independent_ruler = {
   is_adult = yes
   is_independent_ruler = yes
   gold > 1000
}
```


and anywhere that set of triggers needs to be checked, it can be replaced by the following statement:
``is_rich_adult_independent_ruler = yes``

Using the negative version


```
is_rich_adult_independent_ruler = no
```

is the same as using a ``NOT`` logic block


```
NOT = { is_rich_adult_independent_ruler = yes }
```


Because scripted_triggers can be used in a variety of different contexts, it is advised not to use in their definition ambiguous event targets such as ``root`` or ``prev``.


#### Complex scripted_triggers

Scripted_triggers can also have a complex form that handles literal text replacement, allowing to pass arguments.

For example, if the following set of triggers are used to check that the current character scope is a vassal of the King of France and related to them:


```
is_vassal_of = title:k_france.holder
is_close_family_of = title:k_france.holder
```

that set of triggers can be defined as a scripted_trigger, but instead of referencing ``title:k_france.holder`` specifically, the scripted_trigger uses an argument defined in uppercase letters wrapped in two ``$`` signs:


```
is_related_vassal_of = {
   is_vassal_of = $TARGET$
   is_close_family_of = $TARGET$
}
```

When used, the complex form of the scripted_trigger specifies what the expected argument is, by using the same name but without the ``$`` signs:


```
is_related_vassal_of = {
   TARGET = title:k_france.holder
}
```


With that form, every occurrence of ``$TARGET$`` in the scripted_trigger  will be *literally* replaced with the argument provided: the text replacement happens *before* the scripted_trigger is evaluated.


## Logical Operators/Triggers

These triggers provide basic logical functionality.

| **Name** | **Description** | **Usage** | **Traits** | **Supported Scopes** | **Supported Targets** |
| --- | --- | --- | --- | --- | --- |
| always | Always the same value | always = yes | yes/no |  |  |
| AND | All inside trigger must be true | AND = { <triggers> } |  |  |  |
| OR | At least one entry inside trigger must be true | OR = { <triggers> } |  |  |  |
| NOT | Negates content of trigger | NOT = { <triggers> } |  |  |  |
| NOR | A negated OR trigger | NOR = { <triggers> } |  |  |  |
| NAND | A negated AND trigger | NAND = { <triggers> } |  |  |  |
| all_false | True if all children are false (equivalent to NOR) | all_false = { <triggers> } |  |  |  |
| any_false | True if any child is false (equivalent to NAND) | any_false = { <triggers> } |  |  |  |
| switch | Switch on a trigger for the evaluation of another trigger with an optional fallback trigger | switch = {<br>trigger = simple_assign_trigger<br><br>case_1 = { <triggers> }<br><br>case_2 = { <triggers> }<br><br>case_n = { <triggers> }<br><br>fallback = { <triggers> }<br><br>} |  |  |  |
| trigger_if | Evaluates the triggers if the display_triggers of the limit are met | trigger_if = { limit = { <display_triggers> } <triggers> } |  |  |  |
| trigger_else_if | Evaluates the enclosed triggers if the display_triggers of the preceding `trigger_if` or `trigger_else_if` is not met and its own display_trigger of the limit is met | trigger_if = { limit = { <display_triggers> } <triggers> }<br>trigger_else_if = { limit = { <display_triggers> } <triggers> } |  |  |  |
| trigger_else | Evaluates the triggers if the display_triggers of preceding 'trigger_if' or 'trigger_else_if' is not met | trigger_if = { limit = { <display_triggers> } <triggers> }<br>trigger_else = { <triggers> } |  |  |  |


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Triggers*
