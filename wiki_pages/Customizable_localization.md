# Customizable localization

Note: this page is about customizable localization. For similar but different function of flavorization, see [Flavorization](Flavorization.md). 

Most in-game texts appearing in user interfaces are static, which means they will never change during time. However, sometimes dynamic texts are needed, when similar but different contents need to be put into same place in different conditions, and that's when Customizable Localization is needed. 

- [Game files](#game-files)
- [Modding customizable localization](#modding-customizable-localization)


## Game files

The customizable localization are defined in `/Crusader Kings III/game//common/customizable_localization` folder. Paradox provides basic tooltip for the usage of customizable localization in `/Crusader Kings III/game/_readme.info` file in that folder.


## Modding customizable localization

Customizable localization can be defined with a key and a scope. Below is an example: 
```coffeescript
MyCustomLocalization = {
	# allowed types are: 
		# artifact
		# character
		# landed_title
		# province
		# activity
		# secret
		# scheme
		# combat
		# combat_side
		# title_and_vassal_change
		# faith
		# dynasty
	type = character 
	random_valid = yes # optional
	text = { # possibility 1
		localization_key = my_loc_1 # my_loc_1 should be defined in a localization file. same for my_loc_2 below
	}
	text = { # possibility 2
		trigger = {  
			my_trigger1 = no # my_trigger1 should be defined in a scripted_triggers file.
		}
		localization_key = my_loc_2
	}
	text = { # possibility 3
		trigger = {
			my_trigger2 = yes
		}
		localization_key = my_loc_3
		fallback = yes
	}
	# you may add as many text blocks as you want
}
```

You may add more multiple texts in one customizable localization. The game will check if each text is valid via their trigger conditions. If `/Crusader Kings III/game/random_valid` is set to `/Crusader Kings III/game/no`, then the first valid text will be selected. If `/Crusader Kings III/game/random_valid` is `/Crusader Kings III/game/yes`, one result will be picked between all valid texts randomly each time this customizable localization is invoked. If there is one text that `/Crusader Kings III/game/fallback` is set to `/Crusader Kings III/game/yes`, then that text will always be picked if none other texts are valid, even if the fall back text is not valid.Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Customizable_localization*
