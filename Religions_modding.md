# Religions modding

> **Note:** Last verified for version 1.0


New religions can easily be added into the game using the highly modular design which the game offers.

- [Religion family](#religion-family)
- [Religion structure](#religion-structure)
- [Faiths](#faiths)
- [Localization](#localization)
- [Graphics](#graphics)
- [Holy sites](#holy-sites)
- [Tenet ID](#tenet-id)


## Religion family

Each religion belongs to a family. The three vanilla families are Abrahamic, Eastern and Pagan. For instance:

- Christianity and Islam are part of the Abrahamic Family
- Slavism and Tengrism are part of the Pagan Family

Religion families are located in */common/religion/religion_families*. The religion family is defined as a tag with an alphanumerical ID. For example, the Abrahamic family is defined as follows:


```
rf_abrahamic = {
	graphical_faith = "orthodox_gfx"
	hostility_doctrine = abrahamic_hostility_doctrine
	doctrine_background_icon = core_tenet_banner_christian.dds
}
```


Below is a list of all parameters that can be set for religion families.


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| name | localization key | If not set will use the object key as localization key | name = name_of_the_family |
| is_pagan | boolean | Specifies if the group is pagan or not (default value is yes) | is_pagan = no |
| graphical_faith | gfx | All religions in this family default to this 3D model (currently used for temple assets). Order of precedence is the lowest level scripted in: faith > religion > family. | graphical_faith = catholic_gfx |
| piety_icon_group | gfx | All religions in this family default to this set of piety icons. Order of precedence is the lowest level scripted in: faith > religion > family. | piety_icon_group = christian |
| doctrine_background_icon | gfx | All religions in this family default to this doctrine background icon. Order of precedence is the lowest level scripted in: faith > religion > family. | doctrine_background_icon = core_tenet_banner_christian.dds |
| hostility_doctrine | doctrine | INTERFACE ONLY: Use this doctrine when displaying hostility information for the whole religious family (if not scripted, then show no information) | hostility_doctrine = christian_hostility_doctrine |


## Religion structure

Religions are located in the */common/religion/religions* folder. Each religion is defined within a file, and the faiths that belong to it are defined within that definition. The religion is defined as a tag with an alphanumerical ID. Here is an example of a fictional religion (localization and faiths are addressed below):

```
sea_cults = {
	family = rf_pagan
	graphical_faith = pagan_gfx

	doctrine = pagan_hostility_doctrine

	pagan_roots = yes

	#Main Group
	doctrine = doctrine_spiritual_head
	doctrine = doctrine_gender_male_dominated
	doctrine = doctrine_pluralism_fundamentalist
	doctrine = doctrine_theocracy_lay_clergy
	doctrine = doctrine_pilgrimage_encouraged
	doctrine = doctrine_funeral_bewailment

	#Marriage
	doctrine = doctrine_concubines
	doctrine = doctrine_divorce_allowed
	doctrine = doctrine_bastardry_legitimization
	doctrine = doctrine_consanguinity_cousins

	#Crimes
	doctrine = doctrine_homosexuality_shunned
	doctrine = doctrine_adultery_men_shunned
	doctrine = doctrine_adultery_women_accepted
	doctrine = doctrine_kinslaying_accepted
	doctrine = doctrine_deviancy_accepted
	doctrine = doctrine_witchcraft_crime

	#Clerical Functions
	doctrine = doctrine_clerical_function_taxation
	doctrine = doctrine_clerical_gender_either
	doctrine = doctrine_clerical_marriage_allowed
	doctrine = doctrine_clerical_succession_spiritual_appointment

	traits = {
		virtues = { brave lunatic_1 wrathful }
		sins = { patient content shy }
	}

	reserved_male_names = {
		Lobbo Lobbeu Lobst Lob Lobr Loabstr Lobb Lub Leurbo
	}
	reserved_female_names = {
		Lobba Lobbelia Lobsta Loba Lober Loabstra Lobba Lubas Leurbos
	}
	holy_order_names = {
		{ name = "holy_order_claw_bearers" }
		{ name = "holy_order_clackers" }
		{ name = "holy_order_servants_of_the_lobbo" }
		{ name = "holy_order_the_pile" }
	}
	holy_order_maa = { huscarl }
	custom_faith_icons = { custom_faith_1 custom_faith_2 custom_faith_3 custom_faith_4 custom_faith_5 custom_faith_6 custom_faith_7 custom_faith_8 custom_faith_9 custom_faith_10 lobbist lobbist_reformed }

	localization = {
		...
	}

	faiths = {
		...
	}
}
```


Below is a list of all parameters that can be set for religions.


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| family | religion family | What religion family the religion belongs to | family = family_name |
| graphical_faith | gfx | All faiths in this religion default to this 3D model (currently used for temple assets). Order of precedence is the lowest level scripted in: faith > religion > family. | graphical_faith = catholic_gfx |
| piety_icon_group | gfx | All faiths in this religion default to this set of piety icons. Order of precedence is the lowest level scripted in: faith > religion > family. | piety_icon_group = christian |
| doctrine_background_icon | image file | All faiths in this religion default to this doctrine background icon. Order of precedence is the lowest level scripted in: faith > religion > family. | doctrine_background_icon = core_tenet_banner_christian.dds |
| pagan_roots | boolean | If yes, then faiths without the unreformed doctrine are considered reformed by the interface. | pagan_roots = yes |
| doctrine | doctrine | Doctrines defined in a religion will be applied to all faiths within it. This is only at game start; it is purely for script convenience, and would be equivalent to putting the doctrine in all the faiths. It can be overridden by putting a different doctrine in the group in the specific faith. Note that doctrines that allow more than one pick can **not** be defined on a religion level, as there's no obvious override system that would work then. Doctrines cannot be defined after the faiths section. | doctrine = doctrine_spiritual_head |
| traits | clause | Defines which traits are considered virtues and sins by the religion. Notes on virtues and sins: List traits that are virtues for all followers. Trait groups also work. If more than one trait in a group is defined (or the group itself), only the first will be shown in the UI<br>		sins = { ... }					#					  (sins)<br>		# Virtues and sins give an opinion bonus/penalty (see VIRTUOUS_TRAIT and SINFUL_TRAIT defines). For that it is the "viewer's" faith that matters.<br>		# E.g. if generous is a christian virtue, all christian characters will think more highly of all others with that trait, even if the others are not christian.<br>		# Holders of the traits will also get the virtue_owner_modifier/sin_owner_modifier for each matching trait.<br>		# Virtues and sins can optionally have a multiplier to scale the effects (default is 1):<br>		virtues = { brave = 0.5 }		# scales both the opinion effect and the modifier<br>		# And they can specify a custom modifier (default is virtue_owner_modifier/sin_owner_modifier):<br>		sins = { stubborn = { monthly_prestige = -0.1 } }<br>		# When using a custom modifier you can specify a scale as well (default is 1):<br>		sins = { stubborn = { monthly_prestige = -0.1 scale = 2 } }		# scales both the opinion effect and the modifier | virtues = { brave generous } sins = { stubborn = { monthly_prestige = -0.1 scale = 2 } } |
| reserved_male_names | list&lt;string&gt; | Names listed here will be applied to all faiths that don't define reserved_male_names themselves. These names can be applied to newborn males when selecting a religion-based name. | reserved_male_names = { Rodrigo Johan Paradoxus } |
| reserved_female_names | list&lt;string&gt; | Same as reserved_male_names, but applied to female characters instead. |  |
| custom_faith_icons | list&lt;gfx&gt; | When creating a custom faith, these will be the available icons. Path is  "gfx/interface/icons/religion/%s.dds", where %s is the name. Also needs a text icon | custom_faith_icons = { custom_faith_1 custom_faith_2 custom_faith_3 } |
| localization | list&lt;localization keys&gt; | See localization inside faiths below. |  |
| holy_order_names | list&lt;clause&gt; | Names and CoAs that can be used by holy orders of this religion. These are used if there are none available for the faith. If there are none left here, it uses "holy_order_default" as name and a randomly generated CoA instead. | <code style="white-space: pre">holy_order_names = {<br>        { name = "holy_order_name1" coat_of_arms = "holy_order_coa1" }<br>        { name = "holy_order_name2" coat_of_arms = "holy_order_coa2" }<br>        ...<br>    }</code> |
| holy_order_maa | list&lt;regiment type&gt; | Men-At-Arms types mostly used for holy orders. The culture of the headquarters of the holy order must have unlocked the required innovation. (It will use the last available type in the list.) | holy_order_maa = { huscarl } |
| faiths | list&lt;Faiths&gt; | See below |  |


## Faiths

Faiths are defined within the faith clause of a religion. They can overwrite default doctrines and graphics set for the whole religion. Here is an example of a fictional faith within the religion defined above.


```
faiths = {
	lobbist = {
		color = { 0.2 0.2 0.9 }
		icon = lobbist
		reformed_icon = lobbist_reformed
		holy_site = uppsala
		holy_site = lejre
		holy_site = paderborn
		holy_site = zeeland
		holy_site = ranaheim

		doctrine = unreformed_faith_doctrine
		doctrine = tenet_warmonger
		doctrine = tenet_human_sacrifice
		doctrine = tenet_ancestor_worship

	}
}
```


Below is a list of all parameters that can be set for faiths.


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| color | rgb |  | color = { 0.2 0.2 0.9 } |
| icon | gfx | If you want to use another faith's icon | icon = bosnian_church |
| graphical_faith | gfx | This faith (and custom faiths based on this faith) use this 3D model (currently used for temple assets). Order of precedence is the lowest level scripted in: faith > religion > family. | graphical_faith = catholic_gfx |
| piety_icon_group | gfx | This faith (and custom faiths based on this faith) use this set of piety icons. Order of precedence is the lowest level scripted in: faith > religion > family. | piety_icon_group = christian |
| doctrine_background_icon | gfx | This faith (and custom faiths based on this faith) use this doctrine background icon. Order of precedence is the lowest level scripted in: faith > religion > family. |  |
| religious_head | title | What title should be this faith's religious head. If not set, will not have a religious head (unless created elsewhere in script) | religious_head = d_coptic_papacy |
| holy_site | holy site | Holy site, as defined in the holy_site folder. You can add any number of these | holy_site = jerusalem |
| doctrine | doctrine |  |  |
| reserved_male_names/reserved_female_names | list&lt;string&gt; |  |  |
| localization |  |  |  |


## Localization

The localization clause in both faiths and religions provides key-value pairs for localization. However, this clause does not include object localization for the religion/faith itself and its basic properties. The following localization keys also need defining:
- &lt;religion/faith_name&gt;
- &lt;religion/faith_name&gt;_adj
- &lt;religion/faith_name&gt;_adherent
- &lt;religion/faith_name&gt;_adherent_plural
- &lt;religion/faith_name&gt;_desc

Below is a list of keys that need to be paired for localization. Although you can use this as a reference, it is also possible to simply copy and paste this list from a vanilla file and add your own keys where needed. Although many items in the list are not relevant to many religions/faiths, they can simply be assigned to a key used by another more relevant item. (e.g. FertilityGodName in Christianity is given as "$christianity_high_god_name$" in the localization file):
- HighGodName
- HighGodNamePossessive
- HighGodNameSheHe
- HighGodHerselfHimself
- HighGodHerHis
- HighGodNameAlternate
- HighGodNameAlternatePossessive
- CreatorName
- CreatorNamePossessive
- CreatorSheHe
- CreatorHerHis
- CreatorHerHim
- HealthGodName
- HealthGodNamePossessive
- HealthGodSheHe
- HealthGodHerHis
- HealthGodHerHim
- FertilityGodName
- FertilityGodNamePossessive
- FertilityGodSheHe
- FertilityGodHerHis
- FertilityGodHerHim
- WealthGodName
- WealthGodNamePossessive
- WealthGodSheHe
- WealthGodHerHis
- WealthGodHerHim
- HouseholdGodName
- HouseholdGodNamePossessive
- HouseholdGodSheHe
- HouseholdGodHerHis
- HouseholdGodHerHim
- FateGodName
- FateGodNamePossessive
- FateGodSheHe
- FateGodHerHis
- FateGodHerHim
- KnowledgeGodName
- KnowledgeGodNamePossessive
- KnowledgeGodSheHe
- KnowledgeGodHerHis
- KnowledgeGodHerHim
- WarGodName
- WarGodNamePossessive
- WarGodSheHe
- WarGodHerHis
- WarGodHerHim
- TricksterGodName
- TricksterGodNamePossessive
- TricksterGodSheHe
- TricksterGodHerHis
- TricksterGodHerHim
- NightGodName
- NightGodNamePossessive
- NightGodSheHe
- NightGodHerHis
- NightGodHerHim
- WaterGodName
- WaterGodNamePossessive
- WaterGodSheHe
- WaterGodHerHis
- WaterGodHerHim
- PantheonTerm
- PantheonTermHasHave
- GoodGodNames (list)
- DevilName
- DevilNamePossessive
- DevilSheHe
- DevilHerHis
- DevilHerselfHimself
- EvilGodNames (list)
- HouseOfWorship
- HouseOfWorshipPlural
- ReligiousSymbol
- ReligiousText
- ReligiousHeadName
- ReligiousHeadTitleName
- DevoteeMale
- DevoteeMalePlural
- DevoteeFemalePlural
- DevoteeNeuter
- DevoteeNeuterPlural
- PriestMale
- PriestMalePlural
- PriestFemale
- PriestFemalePlural
- PriestNeuter
- PriestNeuterPlural
- AltPriestTermPlural
- BishopMale
- BishopMalePlural
- BishopFemale
- BishopFemalePlural
- BishopNeuter
- BishopNeuterPlural
- DivineRealm
- PositiveAfterLife
- NegativeAfterLife
- DeathDeityName
- DeathDeityNamePossessive
- DeathDeitySheHe
- DeathDeityHerHis
- WitchGodName
- WitchGodHerHis
- WitchGodSheHe
- WitchGodHerHim
- WitchGodMistressMaster
- WitchGodMotherFather
- GHWName
- GHWNamePlural


## Graphics

No graphical modding is required to create a religion or faith, since there is an abundance of icons in the vanilla game, either in use by other religions or reserved for custom faiths. However, adding a new icon is very simple, if you feel that none of the vanilla icons are fitting for your religion. In the path */gfx/interface/icons/faith*, create a new 100x100 dds file. The name of the file is how the icon is referred to in the religion file. (e.g. icon = lobbist will refer to /gfx/interface/icons/faith/lobbist.dds).


## Holy sites


> **See also:**
Custom holy sites can be added in a text document in the */common/religion/holy_sites* folder. Each site is identified by a name, and contains information on the location of the site and the benefits (or potentially negatives) it brings. 

```
jerusalem = {
	county = c_jerusalem

	character_modifier = {
		monthly_piety_gain_mult = 0.2
	}
	flag = jerusalem_conversion_bonus # +20% County Conversion
}
```


Below are the attributes which can be assigned to a holy site. Only the county is necessary.


| **Attribute** | **Type** | **Description** | **Example** |
| --- | --- | --- | --- |
| county | title | The county in which the holy site is located | county = c_jerusalem |
| barony | title | The barony in which the holy site is located | barony = b_vaticano |
| character modifier | modifier | Applied to all characters of any faith with this holy site when the holder of the barony is of their faith | character_modifier = {<br>		monthly_piety_gain_mult = 0.2<br>	} |
| flag | flag |  | flag = jerusalem_conversion_bonus |


Holy sites also require the following keys in localization:
- holy_site_&lt;name&gt;_name
- holy_site_&lt;name&gt;_effect_name
- holy_site_&lt;name&gt;_effects

```
holy_site_jerusalem_name:0 "Jerusalem"
 holy_site_jerusalem_effect_name:0 "From [holy_site|E] #weak ($holy_site_jerusalem_name$)#!"
 holy_site_jerusalem_effects:0 "County Conversion Speed: #P +20%#!"
```


## Tenet ID

Each tenet has an internal ID used to reference it within the game files. In general, to get the tenet ID from its name:
1. Take the non-variant name (i.e. non-faith specific)
1. Turn all upper case letters into lower case (``A...Z-&gt;a...z``)
1. Replace all spaces (`` ``) with underscores (``_``)
1. Add ``tenet_`` to the beginning

Tenets that do not fit the pattern above have been listed below:

| **Name** | **Tenet ID** |
| --- | --- |
| [Auspicious Birthright](https://ck3.paradoxwikis.com/Auspicious_Birthright) | tenet_mystical_birthright |
| [Ritual Suicide](https://ck3.paradoxwikis.com/Ritual_Suicide) | tenet_consolamentum |
| [Ecclesiarchy](https://ck3.paradoxwikis.com/Ecclesiarchy) | tenet_pentarchy |
| [Religious Law](https://ck3.paradoxwikis.com/Religious_Law) | tenet_religious_legal_pronouncements |
| [Sacred Lies](https://ck3.paradoxwikis.com/Sacred_Lies) | tenet_sacred_shadows |
| [Sanctioned False Conversions](https://ck3.paradoxwikis.com/Sanctioned_False_Conversions) | tenet_false_conversion_sanction |
| [Struggle and Submission](https://ck3.paradoxwikis.com/Struggle_and_Submission) | tenet_struggle_submission |
| [Syncretic Folk Traditions](https://ck3.paradoxwikis.com/Syncretic_Folk_Traditions) | tenet_unreformed_syncretism |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Religions_modding*
