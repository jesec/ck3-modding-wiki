# Weight modifier

Weight modifiers are conditional modifiers to a base value, used in:
- events' ``weight_modifier`` blocks
- some effects such as ``random`` and ``random_list``
- AI logic blocks such as ``ai_will_do``

For legacy reasons, they are sometimes referred to as MTTH syntax, by opposition to [script math](https://ck3.paradoxwikis.com/script_math) syntax.


- [Syntax](#syntax)
- [scripted_modifiers](#scripted_modifiers)
  - [Simple form](#simple-form)
  - [Complex form](#complex-form)
- [References](#references)


## Syntax

Weight modifiers are script blocks used to sequentially modify a base value.
They contain:
- a mathematical operator, either ``add`` or ``factor``
- triggers, which determine when the weight modifier should apply
- an optional ``desc`` parameter, which specifies the localization key used in the tooltip, where applicable


```
base = 10
modifier = {
   add = 10
}
1. total value is 20
```


The ``base`` is always an integer.
The ``add`` and ``factor`` parameters, on the other hand, accept any type of numerical values: numbers, script math, script_values, saved scope values.

Weight modifiers are applied in the order they are listed.


```
base = 10
modifier = {
   add = 10
}
modifier = {
   factor = 2
}
1. total value is 40
```


A weight modifier that contains a set of triggers applies if the set of triggers is evaluated as true.


```
base = 10
modifier = {
   is_adult = yes
   add = 10
}
modifier = {
   is_male = yes
   add = 20
}
1. total value for a male adult is 40
1. total value for a male child is 30
1. total value for a female adult is 20
1. total value for a female child is 10
```


## scripted_modifiers

Scripted_modifiers are macros that enable replacing a set of weight_modifiers with a single statement, to make script more legible and avoid repetition.

They are defined in `/Crusader Kings III/game/common/scripted_modifiers`, and can be used anywhere weight modifiers are allowed.


### Simple form

If a set of weight modifiers are repeatedly used together, they can be defined as a scripted_modifier:


```
age_and_gender_modifier = {
   modifier = {
      is_adult = yes
      add = 10
   }
   modifier = {
      is_male = yes
      add = 20
   }
}
```


Wherever that set of weight modifiers should apply, it can be replaced by the scripted_modifier:


```
base = 10
age_and_gender_modifier = yes
```


### Complex form

Scripted_modifiers also have a complex form that handles literal text replacement, allowing to pass arguments.

For example, if the following weight modifier applies when a character is vassal to the King of France, and has more than 1000 gold:

```
modifier = {
   add = 10
   is_vassal_of = title:k_france.holder
   gold >= 1000
}
```


It can be defined in a scripted_modifier, replacing specific scopes or values with capitalized arguments between two ``$`` signs:


```
rich_vassal_modifier = {
   modifier = {
      add = 10
      is_vassal_of = $TARGET$
      gold >= $VALUE$
   }
}
```


When used, the complex form of the scripted_modifier specifies what the expected arguments are, by using the same name but without the $ signs:


```
base = 10
rich_vassal_modifier = { TARGET = title:k_france.holder VALUE = 1000 }
```


With that form, every occurrence of $TARGET$ and $VALUE$ in the scripted_modifier will be *literally* replaced with the argument provided: the text replacement happens *before* the scripted_modifier is evaluated.


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Weight_modifier*
