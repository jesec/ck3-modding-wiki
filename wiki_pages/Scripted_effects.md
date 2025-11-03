# Scripted effects

*This article is timeless and should be accurate for any version of the game.*


**Scripted effects** are a way of reducing necessary code duplication. They work like a macro, and can take particular values to help significantly reduce the amount of code that must be created. 

Scripted effects are defined in `/Crusader Kings III/game/common/scripted_effects`. 

Below is an example of a scripted effect:


```
mana_power_increase = { 
	if = {
		limit = {
		NOT = { exists = var:magic_power }
		}
		set_variable = {
			name = magic_power
			value = 0
		}
	}
	change_variable = { name = magic_power add = $MAGIC_POWER$ }
}
```


This scripted effect will increase a variable in a scope by the integer value that corresponds to $MAGIC_POWER$. This effect is invoked by the following example found in a lifestyle_perk. 


```
mana_power_increase = { 
	MAGIC_POWER = 5
}
```


As should be pretty clear, mana_power_increase is a basic function designed to change a single variable so long as the trigger conditions are met. Each invocation merely requires defining the value MAGIC_POWER which will be the value that is added to the variable. 

An important feature of scripted effects are that the values that can be passed to the scripted effect from the invocation are string values. If you pass a string, you can use this to create a dynamic function that will apply different modifiers or execute different effects without using large case statements.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Scripted_effects*
