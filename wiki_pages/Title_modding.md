# Title modding

> **Note:** Last verified for version 1.1


> ⚠️ **This section needs expansion with examples**


Titles are defined in the */common/landed_titles/* folder


## Basic Titular Title

A simple titular title can be created with very little difficulty. The title prefix defines the tier. 


| **Prefix** | **Tier** |
| --- | --- |
| b_ | Barony (cannot be titular) |
| c_ | County (cannot be titular) |
| d_ | Duchy |
| k_ | Kingdom |
| e_ | Empire |
| h_ | Hegemony |


Decide on a name for the title, which is to be added on to the prefix. Then, you must select a color. Colors are defined in RGB. The title can take two color modifiers color and color2, which is optional. The color2 modifier changes the secondary color of your border.:

(As of game version 1.18, color2 is unused and unsupported by the game engine anymore.)
```coffeescript
k_titular_kingdom_name = {
	color = { 100 255 200 }
}
```
This is the bare minimum required to create a title, and it can now be granted through the console. However, it will lack localization, meaning that it will appear as "k_titular_kingdom_name" in-game.

Please notice that you cannot add titular barony or county titles, since baronies and counties are more linked to the game map itself (like province id for baronies and duchy capital building for counties). As the result, you cannot add county outside the scope of a defined duchy, nor can you add a barony outside the scope of a defined county. Further more, in the scope of any given county, at least 1 barony needs to be defined there, and in the scope of any given barony, the province id must be assigned. See examples below: 
```coffeescript
1. all colors will be assigned write just to save typing time

1. this works
e_my_empire = {
	color = "white"
}

1. this works
k_my_kingdom = {
	color = "white"
}

1. this works
d_my_duchy = {
	color = "white"
}

1. this does not work
1. counties must be defined within the scope of duchies and be assigned with at least 1 barony
c_my_county = {
	color = "white"
}

1. this does not work
1. baronies must be defined within the scope of counties and be assigned with a province id
b_my_barony = {
	color = "white"
}

1. this works
1. it's ok to put counties in an orphan duchy/kingdom
d_my_another_duchy = {
	color = "white"
	c_my_another_county = {
		color = "white"
		b_my_another_barony = {
			color = "white"
			province = 12345 # the province id defined in map_data
		}
	}
}
```


## Localization

A title requires two localization keys to be defined.

- <title_name>
- <title_name>_adj

Additionally, a title can have a unique article. For example Byzantium is 'the ' Byzantine Empire.
- <title_name>_article

Vanilla title localization can be found in */localization/<language>/titles_l_<language>.yml*.


## Coat of Arms

[Coat of arms modding](Coat_of_arms_modding.md)

## List of attributes

Below is a list of attributes that can be applied to a title.


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| color | rgb | The color of the title displayed on the map | color = { 100 255 200 } |
| color2 | rgb | Changes the secondary color of your border | color2 = { 150 240 200 } |
| definite_form | boolean | If yes, the title prefix (e.g. "Kingdom of" or "Duchy of" will not be used) It most often used when the type of title is included in the name already, in order to avoid "Empire of the Byzantine Empire", for example. | definite_form = yes |
| ruler_uses_title_name | boolean |  | ruler_uses_title_name = no |
| landless | boolean | If yes, the title will always exist once it has been made. This allows, for example, religious heads to continue to exist even when unlanded. | landless = yes |
| capital | title | The preferred (de jure?) capital of the title | capital = c_roma |
| ai_primary_priority | clause | Determines how likely AI is to make this title their primary title. Conditions can be used to alter the primary score. | ai_primary_priority = {<br>			if = {<br>				limit = {<br>					culture = culture:greek<br>				}<br>				add = @correct_culture_primary_score<br>			}<br>			if = {<br>				limit = {<br>					NOT = { culture = culture:greek }<br>					culture_group = culture_group:byzantine_group<br>				}<br>				add = @better_than_the_alternatives_score<br>			}<br>		} |
| destroy_if_invalid_heir |  | Destroys the title if the heir (having just inherited the title?) is invalid. (To prevent a character of the wrong religion holding a religious head title, for example) | destroy_if_invalid_heir = yes |
| no_automatic_claims | boolean |  | no_automatic_claims = yes |
| always_follows_primary_heir | boolean | The title will always go to the holder's primary heir | always_follows_primary_heir = yes |
| de_jure_drift_disabled | boolean | Prevents the title from de jure drifting into a kingdom or empire | de_jure_drift_disabled = yes |
| male_names/female_names | list<string> | A list of names that can be adopted by the title holder. For example, this allows the Pope to gain a Papal name upon his election. | male_names = { Alexander Anastasius Benedictus Caelestinus Callistus Clemens Eugenius Leo Gregorius Hadrianus Honorius Innocentius Ioannes Lucius Marinus Martinus Nicolaus Sergius Silvester Stephanus Urbanus Victor } |
| name_list | clause | If the title is held by somebody with culture X, the title name will use the Y localization key and the adjective will use Y_adj | name_list = { name_list_X = Y} |
| province | ID | The province ID of a barony | province = 3699 |


## Duchy Capital Building

To locate the duchy capital building in the defined de jure duchy capital, list the capital as the first county defined under the duchy title. The special duchy building is placed in the first listed barony of the first listed county, even if a different county is defined as the capital. - doesn't seem correct anymore


## History

The history is definded with textfiles located at: <Mod_root>\history\titles\<filename>.txt

Some important attributes can only be set via the history of the titles. 

- **Holder**: The holder is a reference to a char ID (which does not have to be a number in CK3, but can also be a string) - the holder should also be alive, otherwise there is a risk of an error or a crash. Depending on the government or title, errors can also occur - for example, a Muslim cannot be the Catholic Pope. If set to 0 the title is destroyed. This doesn't work for contries or baronies.
- **Government**: This allows the form of government to be set. Without setting the variables, the government will determine the holding (castle, church, city or tribal). Warning! If you work improperly with history and a person has many titles at different times, strange and undesirable cross effects can happen. If, for example, a few years later a feudal emperor gets a county that was historically a republic, it could happen that the feudal empire becomes a republic. One should work with the government as cautiously.
- **Liege**: The liege refers to a higher title. If this value is set, this title is a vassal of the other title until the value is reset. This can lead to strange events if you work improperly. If the history of a county states that it is a vassal of an emperor but that county is later conquered by an independent king, this can lead to the king being interpreted as a vassal of the emperor at the start of the game. The liege can be solved by setting it to 0. This corresponds to independence.
- **De jure Liege**: With this attribute you can carry out a de jure shift of a title. Also works for Counties and results in critical errors if done with Barony. You can also set it to 0 - then the title no longer has a de jure master.
- **Development**: The development of an area can be stopped here. If the value is applied to a high title (e.g. Kingdom), this is also transferred to titles below it. CK3 reads and executes these commands in the order they appear in the text files. That's why you should do big titles first and then small ones. So you can then set all of Italy to 8 but then Rome to 12. Conversely, Rome would be overwritten by Italy, assuming that time is equal, of course.
- **Succession Law(s)**: Special succession laws for a title are also set via the title history. Since a title can have several such laws (e.g. only men and elective monarchy), they must be in a {} block.
- **Court Language**: If you have Royal Court active as DLC, a rank 4 (Kingdom) or 5 (Empire) title can have a court language, although the default is always the language corresponding to the culture of the title holder, so you will probably only need this very rarely. Points to the ID of the language. It is recommended to put a DLC check block in front of it.
    - Note it is also possible to reduce the royal court requirement in 00_defines.txt, and all ranks can have royal courts if modified in defines.
- **Capital County**: You may wish for a title's de jure capital to vary with different start dates. This can be done using the effect with set_capital_county in the title history. There is an example of this in the main game - the capital of England is Winchester at the 867 start and London in subsequent start dates. This effect can also move the duchy capital, but doing so will not move the special building slot, so its primary use is cosmetic. You also cannot use this effect to make another barony the capital of a county.


The following code box demonstrates the more important attributes.
```coffeescript
d_NAME={
	YYYY.MM.DD={
		holder = <historical_char_id> # 0 if title should no longer exists
		government = <feudal/theocracy/clan/republican/holy_order>_government 
		liege = k_NAME # Musst be a higher tier or 0 if independent now
		de_jure_liege = k_OTHER # de jure part of
		change_development_level = INT #
		succession_laws = { <NAME>_succession_law }

		set_court_language = language_NAME # consider a has_dlc_feature = royal_court block before

		effect = {
			set_capital_county = title:c_<NAME> # Relocate capital province - like Winchester to London
		}
	}
}
```
You should have an entry for each title at least for the start date. If a title does not have a starting entry, the game will do the following:

If county

-Does a valid (also living & existing) dujure carrier exist?

--If so, take the bottom one and give this county to him

--If not, create a random character according to the current culture and beliefs of the county capital and create an independent 1-province county

If Barony

-Create a random character according to culture and beliefs and become a vassal of the county owner.

Otherwise

-Title is not created

One should be very careful with the barony. It is possible to create an independent barony or a barony, which can already lead to big mistakes. It is therefore recommended, if possible, not to define barony in the title or, if so, to always add "liege" according to the county in order to avoid possible sources of error. If not set development is 0.


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Title_modding*
