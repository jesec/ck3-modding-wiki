# Culture modding

> **Note:** Last verified for version 1.4


New cultures, innovations and eras can easily be added into the game using the highly modular design which the game offers.
This article covers every subfolder of *common/culture*.

- [Culture Groups](#culture-groups)
- [Cultures](#cultures)
- [Culture group ID](#culture-group-id)
- [Culture ID](#culture-id)

## Culture Groups

Each culture belongs to a culture group.


```
name_of_culture_group = {
	graphical_cultures = {
		first_culture_group_coa_gfx
		second_culture_group_coa_gfx
		culture_group_building_gfx
		culture_group_clothing_gfx
		culture_group_unit_gfx
	}
	mercenary_names = {
		{ name = "mercenary_company_name1" coat_of_arms = "mercenary_company_coa1" }
		{ name = "mercenary_company_name2" coat_of_arms = "mercenary_company_coa2" }
		...
	}
	first_culture = {
		...
	}
	second_culture = {
		...
	}
}
```


Below is a list of all parameters that can be set for culture groups.

| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| name | List&lt;culturegfx&gt; | List of graphical cultures used for coat of arms, buildings, clothings and units. It's possible to give more than one from each type, then all of them will be used. | graphical_cultures = { steppe_coa_gfx } |
| mercenary_names | List&lt;complex&gt; | List of names and CoAs that can be used by mercenaries of this culture group.<br><table><tr><td>name</td><td>localization key</td><td>Localization key for the name of the mercenary.</td></tr><tr><td>coat_of_arms</td><td>coat of arm</td><td>Optional. Coat of Arm for the name of the mercenary.</td></tr><tr></tr></table> | <code style="white-space: pre">mercenary_names = {<br>    { name = "mercenary_company_ghilman" coat_of_arms = "mc_ghilman" }<br>}</code> |


## Cultures

Each culture belongs to a culture group.


```
name_of_culture_group = {
		...

	first_culture = {
		# graphical_cultures = { ... }

		mercenary_names = {			# Names and CoAs that can be used by mercenaries of this culture
			{ name = "mercenary_company_name1" coat_of_arms = "mercenary_company_coa1" }
			{ name = "mercenary_company_name2" coat_of_arms = "mercenary_company_coa2" }
			...
		}

		color = { 1 0.5 0.2 }	# The color of the culture, used e.g. on the map

                heritage = heritage_name # Name of the heritage the culture belongs to, used to group cultures

		character_modifier = {	# Modifier effects on all characters of the culture
			diplomacy = 1
		}

		male_names = {
			10 = {	// The weight for this group of names, the higher, the more common the name is
				commonNameA commonNameB_baseA commonNameC commonNameD_baseA	// A list of names, nameX_baseY means that nameX is a variant of a base name baseY (e.g. John_John Jan_John Ian_John)
			}
			1 = {
				rareNameA rareNameB
			}
		}

		female_names = {	// Names can also be defined as a single list with no weights
			nameA_baseB nameB nameC_baseB
		}

		dynasty_names = {	// Dynasty name list, similar to male_names/female_names, just without weights
			{ dynnp_von dynn_Pommern }	// but it supports defining prefixes in addition to base names. The {} are required then
			{ dynn_Orsini }	// prefixes are optional
			dynn_Fournier	// and so are the {} when not using a prefix
		}
		dynasty_of_location_prefix = "dynnp_von" // when generating a dynasty name based on a title, add this prefix

		# Chance of male children being named after their paternal or maternal grandfather, or their father. Sum must not exceed 100.
		pat_grf_name_chance = 50
		mat_grf_name_chance = 5
		father_name_chance = 10

		# Chance of female children being named after their paternal or maternal grandmother, or their mother. Sum must not exceed 100.
		pat_grm_name_chance = 10
		mat_grm_name_chance = 50
		mother_name_chance = 5

		# Patronyms. Names after the primary parent. Can use both prefix and suffix together ("McDavidson"). _vowel is used for when the parent's name starts with a vowel.
		patronym_prefix_male = "dynnpat_pre_mac"
		patronym_prefix_male_vowel = "dynnpat_pre_vow_mag"
		patronym_prefix_female = "dynnpat_pre_nic"
		patronym_prefix_female_vowel = "dynnpat_pre_vow_nig"

		patronym_suffix_male = "dynnpat_suf_son"
		patronym_suffix_female = "dynnpat_suf_sdaughter"

		# Patronyms will display in names if:
		# - the Character's culture has "always_use_patronym = yes", or
		# - the Character's government has "always_use_patronym = yes", or
		# - the Character's Liege's government has "always_use_patronym = yes"
		# Default is no.
		always_use_patronym = yes	

		ethnicities = {
			10 = german		// The weight says how common the ethnicity is within the culture
			10 = caucasian
		}
	}

	second_culture = {
		...
	}
}
```


Below is a list of all parameters that can be set for cultures.


| **Attribute** | **Type** | **Description** | **Example** |  |
| --- | --- | --- | --- | --- |
| mercenary_names | List&lt;complex&gt; | List of names and CoAs that can be used by mercenaries of this culture.<br><table><tr><td>name</td><td>localization key</td><td>Localization key for the name of the mercenary.</td></tr><tr><td>coat_of_arms</td><td>coat of arm</td><td>Optional. Coat of Arm for the name of the mercenary.</td></tr><tr></tr></table> | <code style="white-space: pre">mercenary_names = {<br>    { name = "mercenary_company_1" coat_of_arms = "coa_1" }<br>}</code> |  |
| graphical_cultures | List&lt;culturegfx&gt; | List of graphical cultures used for coat of arms, buildings, clothings and units. It's possible to give more than one from each type, then all of them will be used. | graphical_cultures = { english_coa_gfx } |  |
| Color | Decimal RGB Values | Color of the culture. | color = { 0.1 0.75 0.1 } |  |
| character_modifier | List&lt;character_modifiers&gt; | Modifier effects on all characters of the culture. | <code style="white-space: pre">character_modifier = {<br>     diplomacy = 1<br>}</code> |  |
| cadet_dynasty_names | List&lt;localization&gt; | List of names for cadet dynasties. | <code style="white-space: pre">cadet_dynasty_names = {<br>     "dynasty_loc"<br>     "dynasty2_loc"<br>}</code> |  |
| dynasty_names | List&lt;localization&gt; | List of names for dynasties. | <code style="white-space: pre">dynasty_names = {<br>     "dynasty_loc"<br>     "dynasty2_loc"<br>}</code> |  |
| male_names | List&lt;localization&gt; | List of cultural names for male characters. Names with spaces need enclosing quotation marks. ("Name name2")<br><table><tr><td>#</td><td>name group weight</td><td>The weight for this group of names, the higher, the more common the name is.</td></tr><tr></tr></table> | <code style="white-space: pre">male_names = {<br>     male_name_1 male-name-2 maleName3 "Male Name 4"<br>}</code> |  |
| female_names | List&lt;localization&gt; | List of cultural names for male characters. Names with spaces need enclosing quotation marks. ("Name name2")<br><table><tr><td>#</td><td>name group weight</td><td>The weight for this group of names, the higher, the more common the name is.</td></tr><tr></tr></table> | <code style="white-space: pre">female_names = {<br>     female_name_1 female-name-2 femaleName3 "Female Name 4"<br>}</code> |  |
| dynasty_of_location_prefix | Localization | Cultural equivalent of 'of', when followed by a placename, e.g - Geoffrey 'of' Monmouth, Chrétien 'de' Troyes (Christian 'of' Troyes) | dynasty_of_location_prefix = "prefix" |  |
| bastard_dynasty_prefix | Localization | Optional, Prefix for bastard dynasties | bastard_dynasty_prefix = "snow" |  |
| Male Ancestor Name Chance | Integer | Chance of male children being named after their paternal or maternal grandfather, or their father. Sum must not exceed 100.<br><table><tr><td>pat_grf_name_chance</td><td>integer</td><td>Chance of male being named after Paternal Grandfather.</td></tr><tr><td>mat_grf_name_chance</td><td>integer</td><td>Chance of male being named after Maternal Grandfather.</td></tr><tr><td>father_name_chance</td><td>integer</td><td>Chance of male being named after their father.</td></tr><tr></tr></table> | <code style="white-space: pre">pat_grf_name_chance = 50 #50% chance of being named after Paternal Grandfather<br>mat_grf_name_chance = 5  #5% chance of being named after Maternal Grandfather<br>father_name_chance = 10  #10% chance of being named after Father</code> |  |
| Female Ancestor Name Chance | Integer | Chance of female children being named after their paternal or maternal grandmother, or their mother. Sum must not exceed 100.<br><table><tr><td>pat_grm_name_chance</td><td>integer</td><td>Chance of male being named after Paternal Grandmother.</td></tr><tr><td>mat_grm_name_chance</td><td>integer</td><td>Chance of male being named after Maternal Grandmother.</td></tr><tr><td>mother_name_chance</td><td>integer</td><td>Chance of female being named after their mother.</td></tr><tr></tr></table> | <code style="white-space: pre">pat_grm_name_chance = 10 #10% chance of being named after Paternal Grandmother<br>mat_grm_name_chance = 50 #50% chance of being named after Maternal Grandmother<br>mother_name_chance = 5   #5% chance of being named after Mother</code> |  |
| patronym_prefix_male | Localization | Names after the primary male parent | patronym_prefix_male= "patronym" |  |
| patronym_prefix_male_vowel | Localization | Names after the primary male parent whose name starts with a vowel | patronym_prefix_male_vowel = "v_patronym" |  |
| patronym_suffix_male | Localization | Names after the primary male parent but adds a suffix, e.g- Erik*sson* | patronym_suffix_male = "patronym_s" |  |
| patronym_prefix_female | Localization | Names after the primary female parent | patronym_prefix_female = "f_patronym" |  |
| patronym_prefix_female_vowel | Localization | Names after the primary female parent whose name starts with a vowel | patronym_prefix_female_vowel = "fv_patronym" |  |
| patronym_suffix_female | Localization | Names after the primary female parent but adds a suffix, e.g- Ayla*sdaughter* | patronym_suffix_female = "f_patronym_s" |  |
| always_use_patronym | Boolean | Optional (default is no), whether or not a culture always displays Patronyms. (Patronyms can also be turned on from government/liege's government) | always_use_patronym = yes |  |
| ethnicities | List&lt;ethnicities&gt; | List of ethnicities common within the culture<br><table><tr><td>#</td><td>ethnicity weight</td><td>The weight says how common the ethnicity is within the culture.</td></tr><tr></tr></table> | <code style="white-space: pre">ethnicities = {<br>     10 = ethnicity_1<br>      5 = ethnicity_2 #Half as common as ethnicity 1<br>}</code> |  |
| dynasty_title_names | Boolean | Optional (default is no), uses dynasty name rather than title name when appropriate | dynasty_title_names = yes |  |
| founder_named_dynasties | Boolean | Optional (default is no), uses dynasty name rather than title name when appropriate | founder_named_dynasties = yes |  |
| dynasty_name_first | Boolean | Optional (default is no), dynasty name comes before given name (Far-East Style) | dynasty_name_first = yes |  |
| heritage | ID | The heritage group that the culture will belong to. | heritage = heritage_north_germanic |  |


## Culture group ID

Culture groups have an internal ID used within the game files. To get a culture group's ID from its in-game name:
1. Turn all letters into lowercase (``A...Z-&gt;a...z``).
1. Replace spaces (`` ``) and hyphens (``-``) with underscores (``_``).
1. Add ``_group`` to the end.

Groups that do not follow the convention above have been listed in this table:

| **Culture group** | **Internal ID** |
| --- | --- |
| Horn African | somalian_group |
| Guinean Uplander | west_african_group |


## Culture ID

Similar to the above, each culture has an internal ID. To get a culture's ID from its in-game name:
1. Turn all letters into lowercase (``A...Z-&gt;a...z``).
1. Remove any diacritics from letters, including accents (``á-&gt;a``) and umlauts/diaereses (``ü-&gt;u``).

Cultures that do not fit this pattern have been listed below:

| **Culture** | **Internal ID** |
| --- | --- |
| Qaw | gaw |
| Permian | komi |
| Ostyak | khanty |
| Bjarmian | samoyed |
| Scots | scottish |
| Pomeranian | pommeranian |
| Oghuz | turkish |
| Mashriqi | levantine |
| Syriac | assyrian |
| Kannauji | hindustani |
| Kamrupi | assamese |
| Rajasthani | rajput |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Culture_modding*
