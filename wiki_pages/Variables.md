# Variables

Variables store information permanently until removed.


## Setting a variable

A variable is set using the ``set_variable`` [effect](Effects.md), on the [scope](Scopes.md) in the context of which the [effect](Effects.md) is executed.


```
set_variable = {
   name = X
   value = Y
}
```


The name of the variable is a string that can be chosen arbitrarily: setting a variable defines it, and there is no list of existing or predefined variables in the game.

The value of a variable can be:
* a boolean

The ``set_variable`` effect also has a simple form that sets a boolean value.


```
set_variable = X
```

is the same thing as

```
set_variable = {
   name = X
   value = yes
}
```


When used in a character [scope](Scopes.md), it is also the same thing as using the confusingly named ``add_character_flag`` effect:


```
add_character_flag = X
```


* a number

Variables can be set to an arbitrary decimal value:

```
set_variable = {
   name = test
   value = 2.37
}
```


The value can also be calculated dynamically using a [script math](https://ck3.paradoxwikis.com/script_math) block:

```
set_variable = {
   name = test
   value = {
      value = 5
      add = 2
      multiply = 3
   }
}
```


... or set to a [script_values](https://ck3.paradoxwikis.com/script_values) directly

```
set_variable = {
   name = test
   value = some_script_value
}
```


Recall that most [triggers](Triggers.md) that compare against a number (i.e. support the <, <=, =, !=, >, >= operators) can also be used as script values:


```
set_variable = {
   name = test
   value = prestige
}
set_variable = {
   name = test
   value = "culture.cultural_acceptance(culture:french)"
}
```


* a flag value

Variables can store flag values:

```
set_variable = {
   name = test
   value = flag:some_flag
}
```


* a [Scope#database_scopes](Scopes.md#database_scopes)

Variables can store scopes:

```
set_variable = {
   name = test
   value = scope:some_scope
}
```


This example uses a saved scope, but any means of accessing a scope can be used to feed into the value parameter: database access, event targets, etc.


> **Main article:** [Scopes](Scopes.md)


The variable doesn't store a copy of the scope, it rather acts as a pointer to that scope.


## Modifying a variable

If a variable is already set on a scope, setting a new variable with the same name replaces the existing variable, even if it stores a value of a different nature.

If a variable stores a numerical value, it can be changed using the ``change_variable`` effect to either add to its value, or multiply it.


```
change_variable = {
   name = X
   add/multiply = Y
}
```


## Removing a variable

Once set on a scope, a variable remains there until either:
* it is manually removed in script
* the scope it is stored on is destroyed
* if stored on a character, when the character dies

To avoid savegame bloat, amongst other thing, variables should be removed when no longer useful by using the ``remove_variable`` effect.


```
remove_variable = X
```


## Accessing a variable

Because variables are set on a specific scope, they can only be accessed from that same scope, using the syntax ``var:<variable name>``.

A variable can only be accessed if it has been set, which can be verified from the scope the variable was supposedly set on by using the ``has_variable`` trigger.

Like event targets, a variable can be chained to the scope it is stored on:


```
scope:some_scope.var:some_var
```


If the variable stores a scope, valid event targets can be chained off of it:

```
# if var:some_var 
scope:some_scope.var:some_var.father
```


Likewise, if the variable stores a scope, on which another variable is set, the 2nd variable can be chained as well:

```
scope:some_scope.var:some_var.var:other_var
```


## Global variables

While variables are set on a scope, and accessible from that scope, global variables are set on the gamestate itself, and as such are accessible from any context.

Aside from that, a global variable works in every respect like a variable:
* it is set using the ``set_global_variable``effect
* if it has a numerical value, it can be changed with the ``change_global_variable`` effect
* it is removed with the ``remove_global_variable`` effect
* it is accessed using ``global_var:some_global_var``


## Local variables

While variables are set on a scope, and accessible from that scope, local variables are set on a top scope, and as such are accessible from any context within that same top scope.
In practice, because top scopes are temporary in nature, it means that local variables are much less permanent than regular variables, and in most cases, using a saved scope or a saved scope value achieves is more practical.


> **Main article:** [Saved scope](https://ck3.paradoxwikis.com/Saved_scope)


Aside from that, a local variable works in every respect like a variable:
* it is set using the ``set_local_variable`` effect
* if it has a numerical value, it can be changed with the ``change_local_variable`` effect
* it is removed with the ``remove_local_variable`` effect
* it is accessed using ``local_var:some_local_var``


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Variables*
