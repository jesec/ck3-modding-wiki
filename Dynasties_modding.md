# Dynasties modding

> *This article is timeless and should be accurate for any version of the game.*


A new feature of Crusader Kings 3 are the improved dynasties, which can be composed by a limitless number of houses. Dynasty modding gives the opportunity to create new dynasties.
It's also possible to change name, coat of arms and houses of any existing dynasty.


- [Creating a new dynasty](#creating-a-new-dynasty)
- [Prefixes](#prefixes)
- [Coat of arms](#coat-of-arms)
- [Motto](#motto)
- [House](#house)


## Creating a new dynasty

A new dynasty is created by adding files to four folders.

The first change is applied by adding a new file *example-dynasty.txt* to the folder *common/dynasties* of the mod folder. In the file an id is assigned to the new dynasty, for example 2100001. Then lines are added for culture and name. The name line doesn't contain the name, but instead the path in the localisation file. It should look like this when finished:


```
2100001 = {
	prefix = "dynnp_de"
	name = "dynn_Lyon"
	culture = "french"
}
```


The prefix only adds the "de" before the name and is already included in the original localisation files. There are several prefixes for different cultures.


The second change is made in the folder *localization/german/dynasties* either to a copy of the original *dynasty_names_I_german.yml* or an empty *example_dynasty_names_german.yml*. The same path applies for other languages, only the name of the file changes as well as the folder following *common/localization*. In this file, the real name of the dynasty is added.


```
dynn_Lyon:0 "Lyon"
```


## Prefixes

To see a list of existing prefixes, see ``localization/english/dynasty_names_l_english.yml`` (or the version for your language). They are at the top of the file, starting with ``dynnp_``.

To add a new prefix, simply add it to your customised dynasties file, or (if you have a lot), create a new file, such as ``dynasty_prefixes_l_english.yml``.

Note that you need to leave a space in the localization string if there is supposed to be a space in the resulting text. For example:


```
1. In localization/english/my_dynasty_names_l_english.yml
dynnp_de:0 "de " # Space after de
dynnp_d-:0 "d'" # No space after d'

1. In common/dynasties/my_dynasties.txt
200001 = {
  prefix = dynnp_de
  name = dynn_Lyon
}
200002 = {
  prefix = dynnp_d-
  name = dynn_Oeuvre
}
```


Results in:
- **de Lyon**
- **d'Oeuvre**


## Coat of arms

1. *Main article: [Coat of arms modding](Coat_of_arms_modding.md)*

The next change is made in *common/coat_of_arms/coat_of_arms* to the *90_dynasties.txt* or the empty new file. Here is added the description of the coat of arms. Here any existing or new one can be pasted. The example uses the coat of arms of the county of Saarbrücken in Lotharingia.


```
2100001 = { # Lyon
	pattern = "pattern_solid.dds"	
	color1 = "blue"
	color2 = "white"				
	colored_emblem = {
		texture = "ce_lion_rampant_crown.dds"
		color1 = "white"
		color2 = "yellow"
		instance = { position = { 0.5 0.5 } scale = { 1.0 1.0 }  }			
	}		
}
```


## Motto

Mottos can be added to dynasties or to houses (or both):


```
2100001 = {
	prefix = "dynnp_de"
	name = "dynn_Lyon"
	culture = "french"
	motto = "dynn_Lyon_motto"
}
```


You will then need to [localize](Localization.md) the motto.


## House

Finally, the founding house can be assigned in a text file in *common/dynasty_houses*. If you choose not to do this, the game will create a founding house using details from the dynasty.


```
house_lyon = {
	prefix = "dynnp_de"
	name = "dynn_Lyon"
	dynasty = 2100001 #Lyon
}
```


When every step is done, the final result ingame should look like this:
![Modded Lyon-Dynasty](assets/images/Modded_Lyon-Dynasty.jpg)


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Dynasties_modding*
