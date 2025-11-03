# Bookmarks modding

> **Note:** Last verified for version 1.1


Bookmark modding allows the highlighting of new interesting characters and scenarios on the *Select Start Date* screen.


## Creating the bookmark

Create a new file or edit a already existing one in the folder mods/yourmod/common/bookmarks with a corresponding name of your choice. Make sure the labeling stays coherent and is referenced in other files with the same ID. For example bm_3000_wotr.

Make sure to bracket the file lines correctly.

Start by deciding a startdate, which is written in the year.month.day format like start_date = 3000.5.12 for the 12th of May, year 3000. Next add a is_playable = yes to indicate that it is, in fact, undoubtly, playable by a human being. 

Next you decide on the selectable special characters and start defining him/her. For example:


```
1. Halfdan Whiteshirt (York) ID: 163112
	character = {
		name = "bookmark_northmen_halfdan_whiteshirt"      #name has to be localized
		dynasty = 7514                                     #dynasty ID
		dynasty_splendor_level = 1                         #splendor level
		type = male                                        #gender
		birth = 828.1.1                                    #birthdate - defines the age
		title = d_york                                     #held primary title
		government = feudal_government                     #government type
                culture = norse                                    #culture
		religion = norse_pagan                             #religion
		difficulty = "BOOKMARK_CHARACTER_DIFFICULTY_EASY"  #difficulty shown on screen
		history_id = 163112                                #ID
		position = { 765 590 }                             #where it will be located 

		animation = disapproval                            #pose

		# Gudfrid, son who became Duke of Frisia, ID: 168336 
		character = {                                      #same thing for the son
			name = "bookmark_northmen_halfdan_whiteshirt_alt_gudfrid"
			relation = "BOOKMARK_RELATION_SON"
			dynasty = 7514
                        type = male
			birth = 844.1.1
                 	culture = norse
                        religion = norse_pagan
			history_id = 168336
			animation = personality_greedy
		}

		# Eldest child and favorite, Saga, ID: 306010
		character = {                                
			name = "bookmark_northmen_halfdan_whiteshirt_alt_saga"
			relation = "BOOKMARK_RELATION_DAUGHTER"
			dynasty = 7514
			type = female
			birth = 845.1.1
			culture = norse
			religion = norse_pagan
			history_id = 306010
        		animation = worry
		}
	}
```


Character stats and traits are found in the history folder.


## Portraits

Another folder needed will be bookmark_portraits, which includes the files for the characters selectable in the bookmark screen. They are auto generated files and do not have to be edited. 

You use the console via dump_bookmark_portraits. They will get dumped to this folder on Windows : 
```
C:\Users\USERNAME\Documents\Paradox Interactive\Crusader Kings III\common\bookmark_portraits
```
```
 If you instead intend on creating the characters personally, then check out the character modding page.
```


## Bookmark Screen

The bookmarks selection screen is not automatically generated but rather an image of the map. They can be found in \gfx\interface\bookmarks. They are .dds and are custom made. The positions part in the bookmark file looks at this file for where to put a character. 

You can also trial-and-error test the positions value by going into debug mode and checking how the position of the characters moves after you save your edits. You may have to flip back to the bookmark for it to work properly. This is prone to crashes.  


##### Designing the Selection Screen Map

What can be done is just screenshotting the map then putting it in a .dds file. Won't be as pretty as what Paradox did but it works<sup>[1]</sup>

If you want to try to mimic Paradox's design, download a blank copy of the CK3 map and paste the provinces.png map (which can be found by searching the CK3 directory) over it. Using a program like Photoshop or Paint.net, you can now use a magic wand tool to select each barony that comprises your character's realm. Fill this space with a color of your choosing, and set the opacity to something around half. Then, you can create a border or other visual effects on it. You will also have to save a version with only the realm of each bookmarked character showing (with a highlight around it) for when you select it in-game. There is a decent video tutorial for this process.[https://www.youtube.com/watch?v=CxoPHmBTPhw](https://www.youtube.com/watch?v=CxoPHmBTPhw)

It will have to be saved as a .dds file with mipmaps and BC3 encoding.

gui\frontend_bookmarks.gui
size = { 1920 1200 }


##### Bookmark Coat of Arms

If a title has pre-defined coat of arms, it will properly appear in the bookmark selection screen. If your character has blank coat of arms, that means that title has procedurally generated coat of arms every patch.

You will need to add a new coat of arms for that title under common\coat of arms. An easy way to do this is to just customize the current coat of arms in-game, click copy to clipboard, and paste it into your coat of arms file. Make sure to remove the 'custom' field.


## Buttons

You will also need a start button under \gfx\interface\bookmarks\start_buttons. This is a more minor detail and copying one of the vanilla buttons will probably be acceptable.

There is also the stained glass banner button - these are located in  \gfx\interface\icons\bookmark_buttons. Aside from copying the vanilla ones, you can try to mash some of the vanilla ones together with rudimentary skill in photoshop or try to make it look differently with color adjustment.Baptism of Rus by Meat Plague.[https://steamcommunity.com/sharedfiles/filedetails/?id=3108225018&tscn=1706983331] See gfx\interface\icons\bookmark_buttons\bm_brus_1066_rus.dds


## Localization

A bookmark *will not load* if it has any character/title history errors.More Bookmarks by Leviathonix [https://steamcommunity.com/sharedfiles/filedetails/?id=2216670956], Credits to Leviathonix [https://steamcommunity.com/sharedfiles/filedetails/?id=2216670956&searchtext=].


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Bookmarks_modding*
