# History modding

> **Note:** Last verified for version 1.1


History modding is about applying changes to the data stored at the path *game/history*. The history folder contains subfolders for characters, cultures, provice mapping, provinces, titles and wars.
[Character](Characters_modding.md) modding is explained on a dedicated article. Except for characters, where history (birth and death) and other data like name and traits are definded, history modding is only about changing the history not the existence of for example a title.

- [Title history modding](#title-history-modding)
- [Culture history modding](#culture-history-modding)
- [Effects](#effects)


## Title history modding

Modding title history means to make changes about the holder history of landed titles and it's affiliation to a specific liege. The files for every existing dejure kingdom can be found at *game/history/titles*. The file contains the data for the kingdom, as well as all of it's dejure duchies and counties. For example the county of Lyon in the file *k_burgundy.txt* looks like this:


```
c_lyon = {
	867.1.1 = { change_development_level = 8 }
	1066.1.1 = { change_development_level = 10 }

	765.1.1 = {
		liege = "k_lotharingia"
		holder = 91491 #VUODO, historical count as placeholder
	}
	855.8.23 = {
		liege = "k_burgundy"
		holder = 144998
	}
	863.1.1 = {
		holder = 168238  #Guilhem I de Forez
	}
	863.1.25 = {
		liege = d_dauphine
	}
	871.1.1 = {
		holder = 168239  #Guilhem II de Forez
	}
	925.8.27 = {
		holder = 168240  #Artaud I de Forez
	}
	933.1.1 = {
		liege = k_burgundy
	}
	960.1.1 = {
		holder = 168241  #Geraud I de Forez
	}
	993.1.1 = {
		holder = 168242  #Artaud II de Forez
	}
	1000.10.11 = {
		holder = 168243  #Artaud III de Forez
	}
	1017.1.1 = {
		holder = 10028
	}
	1032.1.1 = {
		liege = e_hre
	}
	1058.1.1 = {
		holder = 20290
	}
	1079.12.1 = {
		holder = 212806
	}
	1097.6.1 = {
		holder = 212807
	}
	1107.1.1 = {
		holder = 205681 #Guy d'Albon
	}
	1138.10.27 = {
		holder = 205680 #Guigues d'Albon
	}
	1163.1.1 = {
		liege = "k_france"
	}
	1187.1.1 = {
		liege = "d_burgundy"
	}
	1193.1.1 = { #Guigues III should hold Lyon from 1193 to his death, after which his brother Archbishop Renaud holds it.
		holder = 205684
	}
	1202.11.28 = {
		holder = 205685 #Archbishop Renaud d'Albon
	}
	1226.10.21 = {
		holder = 138427 #ArchBishop Robert d'Auvergne
	}
	1234.1.1 = {
		holder = 138425 #ArchBishop Raoul I de La Roche-Aymon
	}
	1236.1.1 = {
		holder = 138437 #Bishop Aimery de Rives
	}
	1245.1.1 = {
		holder = 70913 #ArchBishop Philippe I de Savoie
	}
	1267.1.1 = {
		holder = 138438	#Bishop Guy II
	}
	1268.1.1 = {
		holder = 71827 #ArchBishop Pierre II de Tarentaise/future Pope Innocent IV
	}
	1273.1.1 = {
		holder = 138439	#ArchBishop Aymar de Roussillon
	}
	1283.1.1 = {
		holder = 138453 #ArchBishop Raoul II de la Tourette
	}
	1288.1.1 = {
		holder = 138404 #ArchBishop Bérard de Got brother of Pope Clement V
	}
	1294.1.1 = {
		holder = 138440 #ArchBishop Henri I de Villars
	}
	1301.1.1 = {
		holder = 138441	#ArchBishop Louis de Villars
	}
	1308.1.1 = {
		holder = 70926 #ArchBishop Pierre de Savoie
	}
	1312.4.10 = {
		liege = "k_france"
	}
	1332.11.1 = {
		holder = 138442 #ArchBishop Guillaume I de Sure
	}

}
```


Every title needs his id, like here c_lyon. The Duchy of Viennois for example, it's dejure liege, would have the id d_dauphine. The second step determines the development of Lyon at the two starting dates. In 867 the county has a development of 8 and in 1066 a development of 10. The following lines set holder and liege at a specific date. It's possible to change the holder by inserting the id of another character. If no other liege or holder is added, they will be identical to the previous entry. A completely missing liege will result in an independent holder. For example Guilhelm de Forez becomes holder of the county with the king of burgundy as his liege on the 1.1.863 and gets transferred as a vassal to the Dauphin of Viennois in 863. He looses the title in 871 to his heir Guilhem II. As there are no changes between 863 and 867 Guilhelm I de Forez will be the Count of Lyon starting at the early bookmark.

In the textfile the lines look like this:


```
855.8.23 = {
		liege = "k_burgundy"
		holder = 144998
	}
	863.1.1 = {
		holder = 168238  #Guilhem I de Forez
	}
	863.1.25 = {
		liege = d_dauphine
	}
	871.1.1 = {
		holder = 168239  #Guilhem II de Forez
	}
	925.8.27 = {
		holder = 168240  #Artaud I de Forez
```


To change a liege at a certain date the line *liege = "x"* needs to be added inside the brackets of *year.month.day = { }*. This doesn't change the dejure liege, only which kingdom or duchy controls the county. The same can be done with the holder by inserting *holder = id*. Character ids can be found in the one of the *culture.txt* in *game/history/characters*. In order to make a title independent, use the line *liege = 0*. 


To change a title's government type utilize the line *government = "x"* where x is the government type you wish to enable for this holding at the given time. Please be aware that special government types may require different holdings to be eligible.


```
866.1.1 = {
		government = theocracy_government #Change to theocratic government
	}
	867.1.1 = {
		government = republic_government #Change to republic government
	}
	868.1.1 = {
		government = feudal_government #Change to feudal government
	}
	869.1.1 = {
		government = clan_government #Change to clan government
	}
	870.1.1 = {
		government = tribal_government #Change to tribal government
	}
	871.1.1 = {
		government = mercenary_government #Change to mercenary government
	}
	872.1.1 = {
		government = holy_order_government #Change to holy order government
	}
```


If modding titles, it is advised to adjust the living dates to those of the assigned holder. For example if an newly added character is assigned as Count of Lyon his death should be identical to the date when a successor takes over the title. If forgotten the mod will keep working, but in the dynasty tree the predecessor won't be Count X of Lyon but instead X of Dynasty Y because he will have lost the title before his death.


## Culture history modding

The folder *game/history/cultures* contains the culture files for all culture groups. For example the frankish culture groups file looks like this:


```
1. Frankish
1. French
1. Occitan
1. Outremer

1. Norman in separate file

867.1.1 = {
	discover_innovation = innovation_bannus
	discover_innovation = innovation_catapult
	discover_innovation = innovation_quilted_armor
	#
	discover_innovation = innovation_development_01
	discover_innovation = innovation_gavelkind
	discover_innovation = innovation_currency_01
	discover_innovation = innovation_crop_rotation
	discover_innovation = innovation_ledger
}

950.1.1 = {
	discover_innovation = innovation_motte
	discover_innovation = innovation_barracks
	discover_innovation = innovation_mustering_grounds
	#
	discover_innovation = innovation_city_planning
	discover_innovation = innovation_plenary_assemblies
	discover_innovation = innovation_casus_belli
	#
	join_era = culture_era_early_medieval
}

1066 = {
	discover_innovation = innovation_horseshoes
	discover_innovation = innovation_mangonel
	discover_innovation = innovation_arched_saddle
	#
	discover_innovation = innovation_hereditary_rule
	discover_innovation = innovation_royal_prerogative
	discover_innovation = innovation_manorialism
	discover_innovation = innovation_currency_02
}
```


It only contains the innovations discovered at a certain date. The lines are only true for the specific starting date. For example starting in 867 catapults are already discovered, but the date of discovery of the innovation barracks now depends on the cultural heads fascination and not on the year mentionned in the file (which is 950). If starting at a newly created bookmark in 950, every mentioned innovation as well as the past ones from 867 will have been discovered at game start.

Any existing innovation can be added here at a specific date. For example primogenitur can already exist in year 1000:


```
1000.1.1 = {
	discover_innovation = innovation_primogenitur
}
```


Innovation ids can be found in *game/common/culture/innovations*. Which culture is part of which culture group is defined by the associated file in *game/common/culture/cultures*. See also [culture modding](Culture_modding.md).


## Effects

It is also possible to call effects in history scripts like other dynamic scripts. The ROOT for called effects depends on the type of history. For example, vanilla script has effects called for k_england: 
```coffee
k_england = {
...
	1066.1.5 = {
		holder = 122 # Harold Godwinson
		effect = { # Should technically be the capital after William wins, but London was already quite important, so we'll have it be the capital at game start 1066.
			set_capital_county = title:c_middlesex
		}
	}
...
}
```


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/History_modding*
