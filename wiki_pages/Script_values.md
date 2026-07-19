# Script values

Script values are functions that calculate a value and can be used almost anywhere in script.

Defined in``common/script_values`` in .txt files.

A script value can be a single number:

``minor_stress_gain = 20``

Used like this:

``add_stress = minor_stress_gain`` 

Or they can be formulas, using mathematical operators, effects and triggers:

```c
sum_of_all_skills_value = {
	add = intrigue
	add = diplomacy
	add = stewardship
	add = martial
	add = learning
}
```


### Formulas

A formula is declared using curly brackets and follows this format:
```c
name_of_scripted_value = {
	# Mathematical operations
	add = number/scripted value/scope.something
	subtract = ...
	multiply = ...
	divide = ... # Be careful not to divide by 0
	modulo = ...

	value = ... # Sets the value to this number

	max = ... # Sets the value to this number if it is currently higher. E.G., "max = 10" would cause the number 15 to become 10
	min = ... # Sets the value to this number if it is currently lower

	round = yes # Rounds to nearest whole number
	ceiling = yes # Rounds up (towards positive infinity)
	floor = yes # Rounds down (towards negative infinity)

	if = { # Do something if the limit is met. You can also put "if" inside an "if"
		limit = { some conditions }
		add = 5
		divide = ...
		...
	}
	else_if = { # Do this if the "if" above is not met, and also check for this limit. You can put several "else_if" in a row
		limit = { some conditions }
		operations...
	}
	else = { # If the "if" or "else_if" above is not met, do this...
	}

	fixed_range = { # Gives a random fixed-point number in the range (E.G., 1.242)
		min = ... script value
		max = ...
	}

	integer_range = { # Gives a random integer number in the range (E.G., 1)
		min = ...
		max = ...
	}
}
```

Note that a script value cannot change the gamestate. It can't set variables or execute most effects.

Remember which scope the script value was used on, that limits which triggers and effects you can use. For example, a province won't have ``age``.


### Execution order

Operations are executed in the order defined. Example:

```c
value = {
	add = 5
	multiply = 4
	max = 10
	add = 5
}
```

Would result in "15", since "max = 10" would be applied before the last "add = 5"


### Inlining

Formulas can be written inline wherever scripted values work. 

So if a formula is only to be used once, there's no need to name it and have it in the script values folder.

Example:
```c
add_gold = {
	value = gold
	multiply = { # Yes, you can even inline them in the mathematical operators
		value = 1
		multiply = 0.5
	}
}
```


### Chaining

You can reference named script formulas using scope chaining. For example, if you were to define this formula:
```c
example_age = {
	value = age
}
```

Then the following would work:
```c
add_gold = {
	value = mother.example_age
}
```


### Ranges

Script values can also define ranges. 

``add_gold = { 1 5 }`` will add 1 to 5 gold. 

``add_gold = { named_value another_named_value }`` will resolve the named values (including formulas).

Note that you can't inline formulas within a range. E.g., you cannot do ``add_gold = { { value = 1 add = 2 } some_named_value }``. 

If you need that, use integer_range or fixed_range from the script math system.


### Lists

Script values support every_ and ordered_ lists.

``add_gold = { every_child = { add = 1 } }`` will add as much gold as you have children.

```c
add_gold = {
	ordered_child = {
		order_by = age
		max = 3
		add = age
	}
}
```

Do not use any_ lists, they are used in triggers!


### Scoping

You can change scope within script values just as you can in regular script. Example:
```c
add_gold = {
	father = {
		every_child = { add = 1 }
	}
}
```

This would add as much gold as your father has children.


### Saving current value

We can use ``save_temporary_value_as`` to get the current value in the middle of calculation.

```c
temp = {
  add = 10
  divide = 2
  save_temporary_value_as = temp_total
  multiply = scope:temp_total
}
```

This will result in 25. We're multiplying the value by itself = (10/2)^2

This can help with performance-heavy svalues, to avoid recalculating the same value multiple times.

It can also be used to apply different math based on the value, for example if it's positive or negative.


### Displaying in UI

For a script value meant for characters, we can display it like this, with the player as root:
```c
text_single = {
  raw_text = "[GetPlayer.MakeScope.ScriptValue('my_value')]"
}
```

Replace ``GetPlayer`` with other promotes as needed, like ``HoldingView.GetProvince``

If a script value doesn't need a specific scope, we can run it on an ``EmptyScope``

``"[EmptyScope.ScriptValue('my_value')]"``

We can also pass values or scopes from UI, using this syntax:

``"[GuiScope.SetRoot( GetPlayer.MakeScope ).AddScope( 'target', CharacterWindow.GetCharacter.MakeScope ).ScriptValue('sval_name')]"``

**Be careful!** UI calculates the script value on *every* frame.

A large list of complex script values can cause massive lag.

In that situation, consider setting variables equal to said script value and displaying them instead.

For more, see [Interface/Displaying_a_variable_or_script_value](Interface.md#displaying-a-variable-or-script-value)

Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Script_values*
