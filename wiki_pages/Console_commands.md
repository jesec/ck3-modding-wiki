# Console commands

> **Note:** Last verified for version 1.18


![Commands console](https://ck3.paradoxwikis.com/File:Commands_console.png)
Crusader Kings III offers a debug mode **(disabled by default)** that allows the inputting of console commands. This page lists the codes that may be input into the Console Window, a special debugging window that may be accessed in non-ironman games while in debug mode by pressing Shift+2, ALT+2+1, Shift+3, [§], [~], [^], [°], [²], or [`] (key varies based upon keyboard layout). For QWERTY keyboards, the key is [`]. Otherwise, Shift + Alt + C may work if the prior combinations did not. Press the up or down arrow keys to traverse through previously executed commands. Many codes can be turned off by repeating the command, but sometimes reloading the save or exiting the game is necessary.

Character IDs can be seen by hovering the cursor over a character with debug mode enabled.

TOC


## Debug mode

Debug mode is a set of game tools that allow to modify game behavior outside of normal means. It includes:
* Console Window (accepts console commands)
* Debug Menus (including the Portrait Editor, GUI Editor, Tweak Menu and others)
* Debug Character Interactions (user can instantly change opinion, imprison and more)
* Ctrl + clicking on a portrait takes control of the character, while Alt + click kills them
* File watcher that automatically reloads changed files (including mods) into memory


### Enabling debug mode

Debug mode can be enabled before launching the game and/or toggled in the game using mods. It can be disabled from the console, but can't be re-enabled after it's closed (unless with mods).

How to enable it:


#### Mods

There are a number of mods, like [Free Console Access](https://steamcommunity.com/sharedfiles/filedetails/?id=2218150778) and [Debug Toggle](https://steamcommunity.com/sharedfiles/filedetails/?id=2264428428).

They allow to toggle the debug mode on and off, making it convenient to use the console and play, but this doesn't enable instant reloading of files. For modding, it's better to use both a mod and launch options.


#### Launcher

In the game Launcher:
#Switch to Game Settings on the left
#Scroll down to "Open game in Debug Mode" section and click Launch


#### Steam

On Steam:
#Right-click the game, open Properties
#Add ``-debug_mode`` to the Launch Options at the bottom
#Start the game


#### Windows

Without Steam, on Windows:
#Go to your CK3 directory, "binaries" folder
#Right-click ck3.exe and create a shortcut
#Right-click the shortcut, open Properties
#In the Target field add ``-debug_mode`` at the end (so it looks like this ``"...\ck3.exe" -debug_mode``)
#Launch the game using the shortcut
Alternatively

# Go to your CK3 directory, "binaries" folder
# Right click to create a new text file in Notepad
# Add the following: ``start ck3.exe -debug_mode`` 
# Go to File and click Save As
# Save As a batch file (.bat)
# Launch the game using the batch file


#### GOG

On GOG:
# Right-click the game, open Settings
# Check "Add command line arguments" and enter ``debug_mode``

On GOG Galaxy 2.0:
# In the game page, select Settings (next to the Play button at the top of the page)
# Open Manage installation and select Configure...
# Make sure the Launch parameters "Custom executables / arguments" is ticked at the bottom of the page. You can duplicate the "startgame" executable and type ``-debug_mode`` into the Arguments field.


#### Xbox Game Pass

For the Xbox Game Pass / Windows 10 Store edtion it's more complicated, as you cannot create a normal shortcut for it, so you'll have to run the following commands in Command Prompt every time you open the game:

``start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode``

To simplify it, you can also create a batch (.bat) file with this command and run it from the desktop:

# Right-click on your Desktop, choose New -> Text Document.
# Rename it to "ck3.bat". Make sure to remove ".txt" from the end. Confirm changes when prompted.
# Right-click the file and select Edit.
# Paste the command: ``start shell:AppsFolder\ParadoxInteractive.ProjectTitus_zfnrdv2de78ny!App -debug_mode``
# Save the file
# Double-click it to start the game


### Disabling debug mode

To activate achivements again, disable all active mods and remove -debug_mode from launch options. After launching the game, make sure you have the [Patches](https://ck3.paradoxwikis.com/Patches). It can be found in the right corner in the Main Menu.


## Debug info

Debug info can be enabled and disabled either from one of the console buttons or by using the debug_mode command. When debug info is activated, characters, interactions and events will show debug info which is normally hidden during normal gameplay. It should be noted that when debug info is enabled the game will consume a bit more resources but it shouldn't have a noticeable effect on most machines.


### Characters

The following values are shown for characters under debug mode:

| **Name** | **Description** |
| --- | --- |
| ID | The [Character ID](https://ck3.paradoxwikis.com/Character_ID). Used to reference them in events and console commands. |
| Historical ID |  |
| Fertility | The character's [fertility](https://ck3.paradoxwikis.com/fertility) as a percentage. |
| Health | The character's [health](https://ck3.paradoxwikis.com/health) as a number. Values are provided with one decimal place. |
| Stress | The amount of [stress](https://ck3.paradoxwikis.com/stress) the character has. |
| Base Weight | Related to the [weight](https://ck3.paradoxwikis.com/weight) mechanic. |
| Target Weight | Related to the weight mechanic. |
| Current Weight | Related to the weight mechanic. |


### Events

Hovering over event options will show the AI weight for the option. Also, in the top-right corner of the event window, hovering over the question mark (``?``) shows internal details, including the following:
* [Event ID](https://ck3.paradoxwikis.com/Event_ID)
* Character for whom the event triggered
* Root character
* Saved event targets
* Saved list targets
* Descriptions


### Interactions

In a given interaction's menu, hovering over the purple R next to the final button will show the root scope, the primary/secondary actors and the primary/secondary recipients.


## Cheats

Cheats are console commands that can be used to give unfair advantages as opposed to sole testing purposes. Note that pressing the Tab key with the debug window open will show a list of commands, and pressing tab again after typing chosen command will show parameters available for the command in the debug window.

| **Command** | **Effect** | **Parameters** | **Example** |
| --- | --- | --- | --- |
| abort_travel_plan | Cancels the current activity for [character id], if no character is specified then the player character. | [character id] | abort_travel_plan |
| add_claim | Adds a pressed claim on [title id] to [character id], if no character is specified then the player character. | [title id] [character id] | add_claim e_hre |
| add_doctrine | Adds [doctrine id] to [faith id], if no faith is specified then the player character's faith. Pressing tab reveals all doctrine IDs. | [doctrine id] [faith id] | add_doctrine doctrine_gender_equal catholic |
| add_dread | Adds [amount] of dread to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | add_dread 100 |
| add_house_unity_value | Adds [amount] of house unity. Negative values lower it. | [amount] | add_house_unity_value 20 |
| add_maa | Adds [regiment id] of of men-at-arms to [character id], if no character is specified then the player character. Pressing tab reveals all regiment IDs. | [regiment id] [character id] | add_maa bowmen |
| add_perk | Adds [perk id] to [character id], if no character is specified then the player character. Pressing tab reveals all perk IDs. | [perk id] [character id] | add_perk thoughtful_perk |
| add_piety | Adds [amount] of piety to the player character. Negative values lower it. Default 1000. | [amount] | add_piety 9000 |
| add_piety_no_experience | Adds [amount] of piety to the player character without increasing level of devotion. Negative values lower it. Default 1000. | [amount] | add_piety_no_experience 9000 |
| add_prestige | Adds [amount] of prestige to the player character. Negative values lower it. Default 1000. | [amount] | add_prestige 16000 |
| add_realm_law | Passes [law id] to the realm of [character id], if no character is specified then the player character's realm. Pressing tab reveals all law IDs. | [law id] [character id] | add_realm_law crown_authority_3 |
| add_realm_law_skip_effects | Adds [law id] to the realm of [character id], if no character is specified then the player character's realm. Pressing tab reveals all law IDs. | [law id] [character id] | add_realm_law_skip_effects crown_authority_3 |
| add_relation | Adds [relation id] between [character id] and [character id], if only one character is specified then between the player character and them. | [relation id] [character id] | add_relation friend 1234 |
| add_secret | Adds [secret id] to the player character. Pressing tab reveals all secret IDs. If no IDs are specified then the player character. Adding [character id 1] [character id 2] creates a secret held by the respective character(s). | [secret id] [character id] | add_secret secret_witch |
| add_stress | Adds [amount] of stress to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | add_stress 50 |
| add_title_law | Adds [succession law id] to [title id]. | [title id] [law id] | add_title_law e_hre feudal_elective_succession_law |
| add_trait | Adds [trait id] to [character id], if no character is specified then the player character. | [trait id] [character id] | add_trait witch |
| add_lifestyle_xp_all | Adds [amount] of experience to all lifestyles of [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_lifestyle_xp_all 2000 |
| add_diplomacy_lifestyle_xp | Adds [amount] of diplomacy lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_diplomacy_lifestyle_xp 2000 |
| add_martial_lifestyle_xp | Adds [amount] of martial lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_martial_lifestyle_xp 2000 |
| add_stewardship_lifestyle_xp | Adds [amount] of stewardship lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_stewardship_lifestyle_xp 2000 |
| add_intrigue_lifestyle_xp | Adds [amount] of intrigue lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_intrigue_lifestyle_xp 2000 |
| add_learning_lifestyle_xp | Adds [amount] of learning lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_learning_lifestyle_xp 2000 |
| add_wanderer_lifestyle_xp | Adds [amount] of learning lifestyle experience to [character id], if no character is specified then the player character. Default 1000. | [amount] [character id] | add_wanderer_lifestyle_xp 2000 |
| age | Adds [amount] of age to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | age 20 |
| ai.disable | Disables AI for [character id], if no character is specified then all characters. | [character id] | ai.disable 20076 |
| ai.enable | Enables AI for [character id], if no character is specified then all characters. | [character id] | ai.enable 20076 |
| bypass_requirements | Ignores the requirements for player decisions, interactions, schemes, laws, title creation, struggle endings, royal court language and legend completion. | None | bypass_requirements |
| change_culture | Changes the culture of [county id] to [culture id]. | [county id] [culture id] | change_culture 496 swedish |
| change_development_level | Adds [amount] of development to [county id or barony id], if no county is specified then the player character's capital. Negative values lower it. | [amount] [county id or barony id] | change_development_level 100 496 |
| change_fervor | Adds [amount] of fervor to [faith id], if no faith is specified then the player character's faith. Negative values lower it. Default 10. | [amount] [faith id] | change_fervor 100 catholic |
| change_house_unity_stage | Sets house unity to [level name]. Pressing tab reveals all level names. | [level name] | change_house_unity_stage friendly |
| change_diplomacy | Adds [amount] of diplomacy skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_diplomacy 16 |
| change_martial | Adds [amount] of martial skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_martial 16 |
| change_stewardship | Adds [amount] of stewardship skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_stewardship 16 |
| change_intrigue | Adds [amount] of intrigue skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_intrigue 16 |
| change_learning | Adds [amount] of learning skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_learning 16 |
| change_prowess | Adds [amount] of prowess skill to [character id], if no character is specified then the player character. Negative values lower it. | [amount] [character id] | change_prowess 16 |
| charinfo | You can view infomation such as characters' ID in the game. | None | charinfo |
| clear_character_modifiers | Removes all character modifiers from [character id], if no character is specified then the player character. | [character id] | clear_character_modifiers |
| clear_title_laws | Removes all title succession laws from [title id]. | [title id] | clear_title_laws e_hre |
| clear_traits | Removes all traits from [character id], if no character is specified then the player character. | [character id] | clear_traits |
| complete_schemes | Completes all schemes started by [character id], if no character is specified then the player character. | [character id] | complete_schemes |
| discover_all_eras | Discovers all innovations for the culture of [character id], if no character is specified then the player character's. | [character id] | discover_all_eras all |
| discover_era | Discovers [era id] and all its innovations for the player character's culture. Pressing tab reveals all era IDs. Default current era. | [era id] | discover_era culture_era_early_medieval |
| discover_fascination | Discovers the current fascination for the culture of [character id], if no character is specified then the player character's. | [character id] | discover_fascination |
| discover_innovation | Discovers [innovation id] for the culture of [character id], if no character is specified then the player character's. Pressing tab reveals all innovation IDs. | [innovation id] [character id] | discover_innovation innovation_motte |
| dynasty_prestige | Adds [amount] of renown to [dynasty id], if no dynasty is specified then the player character's dynasty. Negative values lower it. Default 1000. | [amount] [dynasty id] | dynasty_prestige 100000 |
| effect change_government = | Change government to [government id], will not work if the government's DLC is not installed. | [government id] | effect change_government = feudal_government |
| end_diarchy | Ends power sharing for [character id], if no character is specified then the player character. | [character id] | end_diarchy |
| end_schemes | All schemes targeting the player character are abandoned. | None | end_schemes |
| event | Triggers [event id]. | [event id] [character id] | event court_maintenance.0012 |
| fow | Toggles the fog of war. | None | fow |
| gain_all_dynasty_perks | Buys all dynasty legacies for the dynasty of [character id], if no character is specified then the player character's. | [character id] | gain_all_dynasty_perks |
| gain_all_perks | Gives all lifestyle perks to [character id], if no character is specified then the player character. | [character id] | gain_all_perks |
| give_title | Gives [title id] to [character id], if no character is specified then the player character. | [title id] [character id] | give_title e_hre |
| gold | Adds [amount] of gold to the player character. Negative values lower it. Default 1000. | [amount] | gold 500 |
| guaranteed_scheme_success | Schemes are always successful. | None | guaranteed_scheme_success |
| guaranteed_scheme_secrecy_success | Schemes are always secret. | None | guaranteed_scheme_secrecy_success |
| instabuild | Player Men-at-Arms are reinforced instantly. Current constructions in the player's domain are finished instantly. New constructions are finished in a day. Entering it again disables it. | None | instabuild |
| instant_birth | Pregnancies last a day. Entering it again disables it. | None | instant_birth |
| instant_responses | Characters respond to player actions immediately. Entering it again disables it. | None | instant_responses |
| instasiege | Sieges will immediately complete at the end of the day. Command toggles the function on and off. | None | instasiege |
| join_era | Enters [era id] for the culture of [character id], if no character is specified then the player character's. Pressing tab reveals all era IDs. | [era id] | join_era culture_era_high_medieval |
| kill | Kills [character id], if no character is specified then the player character. | [character id] | kill |
| know_schemes | Discovers all schemes targeting the player character. | None | know_schemes |
| merge_culture | Changes the culture of all counties of [culture id] to [culture id]. | [culture id] [culture id] | merge_culture greek swedish |
| pregnancy | Impregnates female [character id] with father [character id], if no character is specified then an unknown father. | [character id] [character id] | pregnancy 1234 |
| progress_struggle_phase | Adds [amount] of catalyst points towards the next phase of [struggle id]. Pressing tab reveals all struggle IDs. | [struggle id] [phase id] [amount] | progress_struggle_phase iberian_struggle struggle_iberia_phase_hostility 1000 |
| remove_doctrine | Removes [doctrine id] from [faith id], if no faith is specified then the player character's faith. Pressing tab reveals all doctrine IDs. | [doctrine id] [faith id] | remove_doctrine doctrine_gender_equal catholic |
| remove_nick | Removes the current nickname from [character id], if no character is specified then the player character. | [character id] | remove_nick |
| remove_relation | Removes [relation id] between [character id] and [character id], if only one character is specified then between the player character and them. | [relation id] [character id] | remove_relation friend 1234 |
| remove_trait | Removes [trait id] from [character id], if no character is specified then the player character. Pressing tab reveals all trait IDs. | [trait id] [character id] | remove_trait witch |
| set_culture | Changes the culture to [culture id] for [character id], if no character is specified then the player character. Pressing tab reveals all culture IDs. | [culture id] [character id] | set_culture swedish |
| set_dread | Sets the dread to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_dread 100 |
| set_faith | Changes the faith to [faith id] for [character id], if no character is specified then the player character. Pressing tab reveals all faith IDs.<br>**Note**: Does not work on heads of faith | [faith id] [character id] | set_faith catholic |
| set_focus | Sets the focus to [focus id] for [character id], if no character is specified then the player character. | [focus id] [character id] | set_focus diplomacy_majesty_focus |
| set_nick | Gives [nickname id] to [character id], if no character is specified then the player character. Pressing tab reveals all nickname IDs. | [nickname id] [character id] | set_nick nick_the_lazy |
| set_sexuality | Changes the sexual orientation to [sexuality id] for [character id], if no character is specified then the player character. | [sexuality id] [character id] | set_sexuality bisexual |
| set_stress | Sets the stress to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_stress 0 |
| set_diplomacy | Sets the diplomacy skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_diplomacy 16 |
| set_martial | Sets the martial skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_martial 16 |
| set_stewardship | Sets the stewardship skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_stewardship 16 |
| set_intrigue | Sets the intrigue skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_intrigue 16 |
| set_learning | Sets the learning skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_learning 16 |
| set_prowess | Sets the prowess skill to [amount] for [character id], if no character is specified then the player character. | [amount] [character id] | set_prowess 16 |
| set_date | Sets the date to [year.month.day], if no month or day is specified, sets to the 1 of January. | [year.month.day] | set_date 1100.6.15 |
| skip_activity_phase | Goes to the next activity phase for [character id], if no character is specified then the player character. | [character id] | skip_activity_phase |
| start_diarchy | Starts power sharing for [character id], if no character is specified then the player character. | [character id] | start_diarchy |
| start_struggle | Starts [struggle id]. Pressing Tab reveals all struggle IDs. | [struggle id] | start_struggle iberian_struggle |
| yesmen | AI characters accept all proposals. Entering it again disables it. | None | yesmen |
| yesmen_instant | AI characters accept all proposals instantly. Entering it again disables it. | None | yesmen_instant |
| **rtp****auh** change_treasury | Adds [amount] of treasury. Negative values lower it. | [amount] | change_treasury 500 |
| **roc** add_pending_court_event | Adds a pending event to the player character's royal court. | None | add_pending_court_event |
| **roc** effect change_current_court_grandeur = | Adds [amount] of court grandeur. Negative values lower it. | [amount] | effect change_current_court_grandeur = 10 |
| **rtp** add_influence | Adds [amount] of influence to the player character. Negative values lower it. Default 1000. | [amount] | add_influence 16000 |
| **rtp** change_provisions | Adds [amount] of provisions to the player character. Negative values lower it. | [amount] | change_provisions 2500 |
| **auh** add_merit | Adds [amount] of merit to the player character. Negative values lower it. Default 1000. | [amount] | add_merit 10000 |
| **auh** barter_goods | Adds [amount] of barter goods to the player character. Negative values lower it. Default 500. | [amount] | barter_goods 1000 |


### Spawning artifacts

Most artifacts are randomly generated through complex scripts and cannot be spawned with the console. However historical artifacts can be created that way. To spawn an artifact copy one of the following lines in the console. The game will crash without the ``{ OWNER = this }`` scope.

| **Command** | **Artifact** |
| --- | --- |
| effect create_artifact_fp3_ancient_drinking_vessel_effect = { OWNER = this } | Achaemenid Drinking Vessel |
| effect create_artifact_al_dawat_effect = { OWNER = this } | al-Dawat |
| effect create_artifact_al_hafir_effect = { OWNER = this } | al-Hafir |
| effect create_artifact_pedestal_al_jabal_effect = { OWNER = this } | al-Jabal |
| effect create_artifact_al_sayf_al_khass_effect = { OWNER = this } | al-Sayf al Khass |
| effect create_artifact_al_taj_crown_effect = { OWNER = this } | al-Taj al-Sharif |
| effect create_artifact_pedestal_al_yatima_effect = { OWNER = this } | al-Yatima |
| effect create_artifact_abhidhamma_pitaka_effect = { OWNER = this } | Abhidhamma Pitaka |
| effect create_artifact_afarganyu_effect = { OWNER = this } | Afarganyu |
| effect create_artifact_arms_of_alexander_effect = { OWNER = this } | Alexander's Armor |
| effect create_artifact_aruval_effect = { OWNER = this } | Ancient Aruval |
| effect create_artifact_kantele_effect = { OWNER = this } | Ancient Kantele |
| effect create_artifact_angelicas_ring_effect = { OWNER = this } | Angelica's Ring |
| effect create_artifact_aram_effect = { OWNER = this } | Aram |
| effect create_artifact_sculpture_ark_of_covenant_effect = { OWNER = this } | Ark of the Covenant |
| effect create_artifact_ascalon_effect = { OWNER = this } | Ascalon |
| effect create_artifact_sculpture_babr_e_bayan_effect = { OWNER = this } | Babr-e Bayan |
| effect create_artifact_wall_banner_thankfulness_effect = { OWNER = this } | Banner of Thankfulness |
| effect create_artifact_various_bells_santiago = { OWNER = this } | Bells of Santiago |
| effect create_artifact_pedestal_branch_relic_boog_effect = { OWNER = this } | Branch of Somb, the First Tree on Earth |
| effect create_artifact_pedestal_branch_relic_hinduism_effect = { OWNER = this } | Branch of one of the Wish-Granting Kalpavrikshas |
| effect create_artifact_pedestal_branch_relic_slavic_effect = { OWNER = this } | Branch of the Tree of Life standing on the rock Alatyr |
| effect create_artifact_bronze_head_effect = { OWNER = this } | Bronze Head |
| effect create_artifact_byz_throne_effect = { OWNER = this } | Byzantine Throne of Solomon |
| effect create_artifact_khanda_effect = { OWNER = this } | Ceremonial Khanda |
| effect create_artifact_goblet_chalice_of_dona_urraca = { OWNER = this } | Chalice of Dona Urraca |
| effect create_artifact_chinese_caligraphy_effect = { OWNER = this } | Chinese Calligraphy |
| effect create_colada_effect = { OWNER = this } | Colada |
| effect create_artifact_pedestal_justinian_effect = { OWNER = this } | Crown of Justinian |
| effect create_artifact_nikephoros_crown_effect = { OWNER = this } | Crown of Nikephoros II Phokas |
| effect create_artifact_crystal_carving_effect = { OWNER = this } | Crystal Carving |
| effect create_artifact_pedestal_cup_jamshid_effect = { OWNER = this } | Cup of Jamshid |
| effect create_artifact_curtana_effect = { OWNER = this } | Curtana |
| effect create_artifact_dagger_of_rostam_effect = { OWNER = this } | Dagger of Rostam |
| effect create_artifact_pedestal_david_harp_effect = { OWNER = this } | David's Harp |
| effect create_artifact_wall_banner_kaviani_effect = { OWNER = this } | Derafsh Kaviani |
| effect create_artifact_dhammapada_effect = { OWNER = this } | Dhammapada |
| effect create_artifact_dragvandil_effect = { OWNER = this } | Dragvandil |
| effect create_artifact_durendal_effect = { OWNER = this } | Durendal |
| effect create_artifact_excalibur_effect = { OWNER = this } | Excalibur |
| effect create_artifact_various_aquamanile_santiago = { OWNER = this } | Former Bells of Santiago |
| effect create_artifact_fp2_4p_chess_board_effect = { OWNER = this } | Four-Player Chess Board |
| effect create_artifact_pedestal_great_diamond_effect = { OWNER = this } | Great Diamond |
| effect create_artifact_edmund_head_effect = { OWNER = this } | Head of St. Edmund |
| effect create_artifact_hydraulic_organ_effect = { OWNER = this } | Hydraulic Organ |
| effect create_artifact_ibeji_effect = { OWNER = this } | Ibeji |
| effect create_artifact_pedestal_ikenga_effect = { OWNER = this } | Ikenga |
| effect create_artifact_wall_banner_edessa_effect = { OWNER = this } | Image of Edessa |
| effect create_artifact_pedestal_crown_iron_effect = { OWNER = this } | Iron Crown of Lombardy |
| effect create_artifact_jewelled_danda_effect = { OWNER = this } | Jeweled Danda |
| effect create_artifact_joyeuse_effect = { OWNER = this } | Joyeuse |
| effect create_artifact_kaves_apron_effect = { OWNER = this } | Kave's Apron |
| effect create_artifact_essen_crown_effect = { OWNER = this } | Kinderkrone |
| effect create_artifact_kladenets_effect = { OWNER = this } | Kladenets |
| effect create_artifact_legbiter_effect = { OWNER = this } | Legbiter |
| effect create_artifact_fp2_2p_chess_board_effect = { OWNER = this } | Lucky Chessboard |
| effect create_artifact_makarakundala_effect = { OWNER = this } | Makarakindala |
| effect create_artifact_mantle_of_the_prophet_effect = { OWNER = this } | Mantle of the Prophet |
| effect create_artifact_pedestal_reliquary_judaism_effect = { OWNER = this } | Menorah of Jerusalem |
| effect create_artifact_sword_mmaagha_kamalu_effect = { OWNER = this } | Mmaagha Kamalu |
| effect create_artifact_monomachus_crown_effect = { OWNER = this } | Monomachus Crown |
| effect create_artifact_pedestal_koh_i_noor_effect = { OWNER = this } | Mountain of Light |
| effect create_artifact_nagelring_effect = { OWNER = this } | Nagelring |
| effect create_artifact_navaratna_effect = { OWNER = this } | Navaratna |
| effect create_artifact_olifant_effect = { OWNER = this } | Olifant |
| effect create_artifact_oxus_bracelet_effect = { OWNER = this } | Oxus Bracelet |
| effect create_artifact_papal_tiara_effect = { OWNER = this } | Papal Tiara |
| effect create_artifact_peacock_throne_effect = { OWNER = this } | Peacock Throne |
| effect create_artifact_sculpture_cabinet_pentapyrgion_effect = { OWNER = this } | Pentapyrgion |
| effect create_artifact_robe_kassapa_effect = { OWNER = this } | Piece of Kassapa's Robe |
| effect create_artifact_qadib_al_mulk_effect = { OWNER = this } | Qadib al-Mulk |
| effect create_artifact_quernbiter_effect = { OWNER = this } | Quern-Biter |
| effect create_artifact_reichskrone_effect = { OWNER = this } | Reichskrone |
| effect create_artifact_ruyi_effect = { OWNER = this } | Ruyi |
| effect create_artifact_illustrious_sassanian_sword_effect = { OWNER = this } | Sassanian Sword |
| effect create_artifact_zomorrodnegar_effect = { OWNER = this } | Shamshir-e Zomorrodnegar |
| effect create_artifact_pedestal_shankha_conch_effect = { OWNER = this } | Shankha Conch |
| effect create_artifact_siddhachakra_effect = { OWNER = this } | Siddhachakra |
| effect create_artifact_skull_cap_charlemagne_effect = { OWNER = this } | Skull Cap of Charlemagne |
| effect create_artifact_sledovik_effect = { OWNER = this } | Sledovik |
| effect create_artifact_spear_of_the_prophet_effect = { OWNER = this } | Spear of the Prophet |
| effect create_artifact_staff_kakusandha_effect = { OWNER = this } | Staff of Kakusandha |
| effect create_artifact_statue_roman_woman_effect = { OWNER = this } | Statue of a Roman Woman |
| effect create_artifact_statue_constantine_effect = { OWNER = this } | Statue of Constantine |
| effect create_artifact_statue_four_tetrarchs_effect = { OWNER = this } | Statue of the Four Tetrarchs |
| effect create_artifact_throne_scone_effect = { OWNER = this } | Stone of Scone |
| effect create_artifact_sutta_pitaka_effect = { OWNER = this } | Sutta Pitaka |
| effect create_artifact_wall_sword_attila_effect = { OWNER = this } | Sword of God |
| effect create_artifact_wall_muhammad_sword_effect = { OWNER = this } | Sword of Muhammad |
| effect create_artifact_szczerbiec_effect = { OWNER = this } | Szczerbiec |
| effect create_artifact_throne_charlemagne_effect = { OWNER = this } | Throne of Charlemagne |
| effect create_artifact_throne_solomon_effect = { OWNER = this } | Throne of Solomon |
| effect create_artifact_wall_cid_sword_effect = { OWNER = this } | Tizona |
| effect create_artifact_tree_automa_effect = { OWNER = this } | Tree Automata |
| effect create_artifact_turquoise_throne_effect = { OWNER = this } | Turquoise Throne |
| effect create_artifact_vinaya_pitaka_effect = { OWNER = this } | Vinaya Pitaka |
| effect create_artifact_fp2_votive_crowns_effect = { OWNER = this } | Visigothic Votive Crown |
| effect create_artifact_konagamana_effect = { OWNER = this } | Water Filter of Koṇāgamana |


### Converting commands

The following commands can be used to convert the realm to a faith or culture.

| **Command** | **Conversion** |
| --- | --- |
| Converts every domain county to the character's culture |  |
| Converts every realm county to the character's culture |  |
| Converts every realm county to the character's faith |  |
| Converts every vassal and sub-vassal to the character's culture |  |
| Converts every vassal and sub-vassal to the character's faith |  |
| Converts every courtier and guest to the character's culture |  |
| Converts every courtier and guest to the character's faith |  |
| Converts every courtier and guest to the age of 20 (can replace the number with a different value) |  |
| Converts every vassal and sub-vassal to Feudal government (can replace the government ID with any other) |  |


### Scripting commands

Script commands are typically more involved, and mostly used for setting up events. These can be used in the console as cheats.

| **Script** | **Effect** | **Parameters** | **Example** |
| --- | --- | --- | --- |
| ``effect title:(county id) = { set_county_faith = faith:(faith id)}`` | Changes the faith to [faith id] for a county [county id] | [title: county id], [faith: faith id] | ``effect title:(c_byzantion) = { set_county_faith = faith:(catholic)}`` |
| ``effect spawn_army = { men_at_arms = { type = (men at arms type) = (amount) } location = capital_province }`` | Adds special soldiers | (men at arms type), (amount) | ``effect spawn_army = { men_at_arms = { type = huscarl men = 500 } location = capital_province }`` |
| effect province:(province_id) = { add_province_modifier = extra_building_slot } | Adds a building slot to the province (stackable) | [title: province id] | effect province:496 = { add_province_modifier = extra_building_slot } |
| effect add_trait_xp = {trait = [x] value=[y]} | increases one-path leveled lifestyle trait experiences | [x]: leveled trait tag,[y]: experiences | effect add_trait_xp = {trait = lifestyle_blademaster value = 100}<br>leveled trait tag:<br>lifestyle_blademaster,lifestyle_reveler,lifestyle_physician,pilgrim,<br>lifestyle_mystic,lifestyle_hunter,lifestyle_traveler,tourney_participant |
| effect add_trait_xp = {trait = [x] track=[y] value=[z]} | increases multiple-path leveled lifestyle trait experiences | [x]: leveled trait tag,[y]:trait path name ,[z]: experiences | effect add_trait_xp = {trait = lifestyle_hunter track=venator value=100}<br>lifestyle_hunter path name: venator,falconer<br><br>lifestyle_traveler path name: travel,danger<br><br>tourney_participant path name: bow,foot,horse,wit |
| effect root.culture = {add_culture_tradition = tradition_here} | effect block to add traditions instantly. | tradition_here | effect root.culture = {add_culture_tradition = tradition_castle_keepers} |
| effect root.culture = {remove_culture_tradition = tradition_here} | same as above but to remove traditions instead. | tradition_here | effect root.culture = {remove_culture_tradition = tradition_castle_keepers} |
| effect root = { set_father/mother = character:historical_id) | set your parents, only works with historical id | father/mother<br>historical_id | effect root = { set_father = character:7627) |
| effect root = { set_house = character:historical_id.house} | set your house, only works with historical id | historical_id | effect root = { set_house = character:7627.house} |
| effect every_sub_realm_county = { change_development_level = [x] } | changes development level of all realm countries | [x]: numeric value | effect every_sub_realm_county = { change_development_level = 100 } |
| effect title:[x] = { set_de_jure_liege_title = title:[y] } | Makes [x] de jure part of [y] | [x]: title id<br>[y]: title id | effect title:k_egypt = { set_de_jure_liege_title = title:e_byzantium } |
| effect every_vassal_or_below = { add_trait = traitname } | Adds trait to every subject | trait name | effect every_vassal_or_below = { add_trait = intellect_good_3 } |
| effect every_vassal_or_below = { remove_trait = traitname } | Removes trait from every subject | trait name | effect every_vassal_or_below = { remove_trait = ill } |
| effect every_courtier_or_guest = { add_trait = traitname } | Adds trait to every courtier or guest | trait name | effect every_courtier_or_guest = { add_trait = strong } |
| effect every_courtier_or_guest = { remove_trait = traitname } | Removes trait from every courtier or guest | trait name | effect every_courtier_or_guest = { remove_trait = infertile } |
| effect title:[x] = { set_capital_county = title:[y] } | Makes [x] de jure part of [y] | [x]:title id<br>[y]:county id | effect title:e_byzantium = { set_capital_county = title:c_rome } |


## Testing commands

Testing commands are used for developer, beta tester or modder testing.

| **Command** | **Effect** | **Parameters** | **Example** |
| --- | --- | --- | --- |
| clear | Clears console history. | None | clear |
| dump_bookmark_portraits | Creates bookmark portraits of all current bookmark characters, stored in `Documents\Paradox Interactive\Crusader Kings III\common\bookmark_portraits`. Any changes applied through the barbershop will be kept. | None | dump_bookmark_portraits |
| effect | Executes a scripted effect.
To run the effect on a character other than the player, use either ``effect character:<character_id> = {<effect_name> = <parameters>}``, or pin the character you want to affect (unpinning all other characters) and use ``effect random_pinned_character = { <effects> }`<pre><code><br><br>Note: It was previously possible to write an effect with an equal sign and curly braces around the entire effect (e.g., </code></pre>`effect = { add_prestige = 100 }``), but this is no longer supported as of v. 1.18.0. You can still use curly braces inside of effects, but you can no longer write effects as ``effect = {}`` and must now write all effects like ``effect add_prestige = 100`` | [effect script] | effect test |
| faction_spawn | Spawns [faction type] if there are valid counties or courtiers to create it. | [faction type] | faction_spawn peasant_faction |
| generate_cadet_coa | Generates a new coat of arms for the player character's house. | None | generate_cadet_coa |
| guaranteed_scheme_failure | Schemes are never successful. | None | guaranteed_scheme_failure |
| guaranteed_scheme_secrecy_failure | Schemes are never secret. | None | guaranteed_scheme_secrecy_failure |
| help | Prints the description of [command], if empty lists all console commands. | [command] | help help |
| instamove | Armies move one barony per day. Affects AI as well as the player. | None | instamove |
| map_editor | Opens the map editor. | None | map_editor |
| nomen | AI characters refuse all proposals. Entering it again disables it. | None | nomen |
| observe | Enters observer mode. | None | observe |
| play | Switches character to [character id]. | [character id] | play 1234 |
| portrait_editor | Opens the portrait editor. | None | portrait_editor |
| reload | Reloads mod and game files into memory.  Press tab to see all the (many) possible targets that can be reloaded. | [filename][target] | reload events |
| run | Executes the commands in [file name]. The txt file must be placed in Documents/Paradox Interactive/Crusader Kings III/run. | None | run test.txt |
| set_is_ai | Allows the AI to control [character id]. | [character id] | set_is_ai 1234 |
| set_is_player | Disallows the AI to control [character id]. | [character id] | set_is_player 1234 |
| script_docs | Prints all effects, event scopes, modifiers, on actions, triggers, etc. to `Documents\Paradox Interactive\Crusader Kings III\logs`. | None | script_docs |
| tick_development | Adds [amount] of development to all counties. | [amount] | tick_development 200 |


## Trait tags


> **Main article:** [Traits](https://ck3.paradoxwikis.com/Traits)


All traits have a tag that is referenced internally by the game. They can be found in ``game\common\traits\00_traits.txt``. A trait's tag typically matches its name. To get a trait's tag from its name, perform the following steps:
*Replace spaces (`` ``) and dashes (``-``) with underscores (``_``)
*Remove all apostrophes (``'``)
*Turn all upper case letters into lower case (``A...Z->a...z``)

Traits that do not follow this pattern have been listed below for reference.

| **Trait (education)** | **Tag** |
| --- | --- |
| **Naive Appeaser** | education_diplomacy_1 |
| **Adequate Bargainer** | education_diplomacy_2 |
| **Charismatic Negotiator** | education_diplomacy_3 |
| **Grey Eminence** | education_diplomacy_4 |
| **Virtuoso Arbitrator** | education_diplomacy_5 |
| **Misguided Warrior** | education_martial_1 |
| **Tough Soldier** | education_martial_2 |
| **Skilled Tactician** | education_martial_3 |
| **Brilliant Strategist** | education_martial_4 |
| **Exalted Warlord** | education_martial_5 |
| **Indulgent Wastrel** | education_stewardship_1 |
| **Thrifty Clerk** | education_stewardship_2 |
| **Fortune Builder** | education_stewardship_3 |
| **Midas Touched** | education_stewardship_4 |
| **Golden Sovereign** | education_stewardship_5 |
| **Amateurish Plotter** | education_intrigue_1 |
| **Flamboyant Trickster** | education_intrigue_2 |
| **Intricate Webweaver** | education_intrigue_3 |
| **Elusive Shadow** | education_intrigue_4 |
| **Conniving Puppetmaster** | education_intrigue_5 |
| **Conscientious Scribe** | education_learning_1 |
| **Insightful Thinker** | education_learning_2 |
| **Astute Intellectual** | education_learning_3 |
| **Mastermind Philosopher** | education_learning_4 |
| **Erudite Oracle** | education_learning_5 |
| **Bumbling Squire** | education_martial_prowess_1 |
| **Confident Knight** | education_martial_prowess_2 |
| **Formidable Banneret** | education_martial_prowess_3 |
| **Famous Champion** | education_martial_prowess_4 |
| **Town Dweller** | education_republican_knowledge_1 |
| **Mayor Trainee** | education_republican_knowledge_2 |
| **Town Maven** | education_republican_knowledge_3 |
| **Republican Heir** | education_republican_knowledge_4 |


| **Trait (congenital)** | **Tag** |
| --- | --- |
| **Homely** | beauty_bad_1 |
| **Ugly** | beauty_bad_2 |
| **Hideous** | beauty_bad_3 |
| **Comely** | beauty_good_1 |
| **Handsome** / Pretty | beauty_good_2 |
| **Beautiful** | beauty_good_3 |
| **Slow** | intellect_bad_1 |
| **Stupid** | intellect_bad_2 |
| **Imbecile** | intellect_bad_3 |
| **Quick** | intellect_good_1 |
| **Intelligent** | intellect_good_2 |
| **Genius** | intellect_good_3 |
| **Delicate** | physique_bad_1 |
| **Frail** | physique_bad_2 |
| **Feeble** | physique_bad_3 |
| **Hale** | physique_good_1 |
| **Robust** | physique_good_2 |
| **Amazonian** / Herculean | physique_good_3 |
| **Melancholic** | depressed_1 / depressed_genetic |
| **Lunatic** | lunatic_1 / lunatic_genetic |
| **Possessed** | possessed_1 / possessed_genetic |
| **Sterile** / Barren | infertile |


| **Trait (other)** | **Tag** |
| --- | --- |
| **Blademaster** | lifestyle_blademaster |
| **Hunter** | lifestyle_hunter |
| **Wise Man** / Wise Woman | lifestyle_mystic |
| **Eager Reveler** | lifestyle_reveler |
| **Novice Physician** | lifestyle_physician |
| **Herbalist** | lifestyle_herbalist |
| **Gardener** | lifestyle_gardener |
| **Patriarch** / Matriarch | family_first |
| **Dynastic Kinslayer** | kinslayer_1 |
| **Familial Kinslayer** | kinslayer_2 |
| **Kinslayer** | kinslayer_3 |
| **Wounded** | wounded_1 |
| **Severely Injured** | wounded_2 |
| **Brutally Mauled** | wounded_3 |
| **Monk** / Nun | devoted |
| **Crusader**<br>**Mujahid**<br>**Warrior of the Faith** | faith_warrior |
| **Holy Monarch** | crusader_king |
| **Bloody Flux** | dysentery |
| **Club-footed** | clubfooted |
| **Holy Fire** | ergotism |
| **Pneumonia** | pneumonic |
| **The Savior** | savior |
| **Raider** / Viking | viking |
| **Child of Concubine** | child_of_concubine_female |
| **Child of Consort** | child_of_concubine_male |
| **Venerated Ancestor** / Saint | saint |
| ![Trait the wake](https://ck3.paradoxwikis.com/File:Trait_the_wake.png) Exiled | the_wake |
| **Accused of Decadence** | decadent |
| **Extolled by House** | extolled |
| **adventurer** Former Adventurer | adventurer |
| **Follower** | adventurer_follower |
| ![Diplomatic court 1](https://ck3.paradoxwikis.com/File:Diplomatic_court_1.png) Diplomatic Courtier | diplomatic_court_1 |
| ![Diplomatic court 1](https://ck3.paradoxwikis.com/File:Diplomatic_court_1.png) Valued Diplomatic Courtier | diplomatic_court_2 |
| ![Warlike court 1](https://ck3.paradoxwikis.com/File:Warlike_court_1.png) Warlike Courtier | warlike_court_1 |
| ![Warlike court 1](https://ck3.paradoxwikis.com/File:Warlike_court_1.png) Valued Warlike Courtier | warlike_court_2 |
| ![Administrative court 1](https://ck3.paradoxwikis.com/File:Administrative_court_1.png) Administrative Courtier | administrative_court_1 |
| ![Administrative court 1](https://ck3.paradoxwikis.com/File:Administrative_court_1.png) Valued Administrative Courtier | administrative_court_2 |
| ![Intrigue court 1](https://ck3.paradoxwikis.com/File:Intrigue_court_1.png) Intrigue Courtier | intrigue_court_1 |
| ![Intrigue court 1](https://ck3.paradoxwikis.com/File:Intrigue_court_1.png) Valued Intrigue Courtier | intrigue_court_2 |
| ![Scholarly court 1](https://ck3.paradoxwikis.com/File:Scholarly_court_1.png) Scholarly Courtier | scholarly_court_1 |
| ![Scholarly court 1](https://ck3.paradoxwikis.com/File:Scholarly_court_1.png) Valued Scholarly Courtier | scholarly_court_2 |
| **Hastiluder** | tourney_participant |
| **Detractor of the Caliphate** | fp3_struggle_detractor |
| **Supporter of Caliphal Authority** | fp3_struggle_supporter |
| **Inspector** | lifestyle_surveyor |
| **Wayfarer** | lifestyle_wayfarer |
| **Voyager** | lifestyle_voyager |


## Innovation tags


> **Main article:** [Innovation](https://ck3.paradoxwikis.com/Innovation)


Innovation IDs usually match their name. The following innovations use a different ID however:

| **Innovation** | **Tag** |
| --- | --- |
| ![Innovation majesty 02](https://ck3.paradoxwikis.com/File:Innovation_majesty_02.png) Currency | innovation_currency_01 |
| ![Innovation civil construction 01](https://ck3.paradoxwikis.com/File:Innovation_civil_construction_01.png) Public Works | innovation_development_01 |
| ![Innovation siege weapons](https://ck3.paradoxwikis.com/File:Innovation_siege_weapons.png) Onager | innovation_catapult |
| ![Innovation special maa 02](https://ck3.paradoxwikis.com/File:Innovation_special_maa_02.png) Chu-ko-nu | innovation_repeating_crossbow |
| ![Innovation special maa 01](https://ck3.paradoxwikis.com/File:Innovation_special_maa_01.png) Defensive Tactics | innovation_mobile_guards |
| ![Innovation special maa 01](https://ck3.paradoxwikis.com/File:Innovation_special_maa_01.png) Konni Raids | innovation_hussar_raids |
| ![Innovation misc inventions](https://ck3.paradoxwikis.com/File:Innovation_misc_inventions.png) Longships | innovation_longboats |
| ![Innovation majesty 01](https://ck3.paradoxwikis.com/File:Innovation_majesty_01.png) West African Canoes | innovation_african_canoes |
| ![Innovation nobility 01](https://ck3.paradoxwikis.com/File:Innovation_nobility_01.png) Coinage | innovation_currency_02 |
| ![Innovation nobility 03](https://ck3.paradoxwikis.com/File:Innovation_nobility_03.png) Communal Development | innovation_development_02 |
| ![Innovation maa 01](https://ck3.paradoxwikis.com/File:Innovation_maa_01.png) Household Soldiers | innovation_house_soldiers |
| ![Innovation maa 02](https://ck3.paradoxwikis.com/File:Innovation_maa_02.png) Desert Mountain Practices | innovation_desert_mountain_herding |
| ![Innovation majesty 03](https://ck3.paradoxwikis.com/File:Innovation_majesty_03.png) Stammesherzogtum | innovation_stem_duchies |
| ![Innovation majesty 02](https://ck3.paradoxwikis.com/File:Innovation_majesty_02.png) Banking | innovation_currency_03 |
| ![Innovation civil construction 01](https://ck3.paradoxwikis.com/File:Innovation_civil_construction_01.png) Urbanization | innovation_development_03 |
| ![Innovation misc inventions](https://ck3.paradoxwikis.com/File:Innovation_misc_inventions.png) Ostsiedlung | innovation_east_settling |
| ![Innovation administration 01](https://ck3.paradoxwikis.com/File:Innovation_administration_01.png) Promissory Notes | innovation_currency_04 |
| ![Innovation misc inventions](https://ck3.paradoxwikis.com/File:Innovation_misc_inventions.png) Renaissance Thought | innovation_development_04 |


## Title Tags


> **Main article:** [Titles](https://ck3.paradoxwikis.com/Titles)


All titles have an internal title tag that can be found in ``game\common\landed_titles\00_landed_titles.txt``. Title tags have a prefix based on their rank, followed by an underscore (``_``) and then their name.

| **Rank** | **Prefix** | **Example** |
| --- | --- | --- |
| **Barony** | ``b_`` | ``Wigmore -> b_wigmore`` |
| **County** | ``c_`` | ``Sundgau -> c_sundgau`` |
| **Duchy** | ``d_`` | ``Sicily -> d_sicily`` |
| **Kingdom** | ``k_`` | ``Denmark -> k_denmark`` |
| **Empire** | ``e_`` | ``Persia -> e_persia`` |


Title Tags can also be seen in their respective title lists:
*[List of baronies](https://ck3.paradoxwikis.com/List_of_baronies)
*[List of counties](https://ck3.paradoxwikis.com/List_of_counties)
* [List of duchies](https://ck3.paradoxwikis.com/List_of_duchies)
*[List of kingdoms](https://ck3.paradoxwikis.com/List_of_kingdoms)
*[List of empires](https://ck3.paradoxwikis.com/List_of_empires)

### Finding title tags based on in-game name

The title ID may not match the title's name in-game. For example, the player may have their game set to a language other than English or a title has a culture-specific name. Use the following steps to find a title ID purely on its in-game name:
*Navigate to the file located at ``game\localization\LANGUAGE\titles_l_LANGUAGE.yml``, replacing ``LANGUAGE`` with your game language.
*Open the file with a text editor like Notepad++ and search for any instances of the in-game name using [CTRL] + [F].
*If you managed to find a match:
**The line should look similar to `` b_my_barony_name:0 "In-game name for barony"``.
**The title ID is the word before the ``:0``, therefore being ``b_my_barony_name`` in this example.
* If you could not find a match:
**Close the file.
**In the same folder as the previous file, open the file ``titles_cultural_names_l_LANGUAGE.yml``, replacing ``LANGUAGE`` appropriately.
**Repeat your search for the title's in-game name in this file.
**When you find a match, it should look like so: `` cn_lunden:0 "Lunden"``.
**Remember/copy the word before the ``:0`` (in this example, ``cn_lunden``); this is a *cultural name key* of the title.
**Close the file.
**Navigate to the file ``game\common\landed_titles\00_landed_titles.txt`` and open it with your text editor.
**Perform a search for the *cultural name key* you found in the previous file (e.g., ``cn_lunden``).
**The search query should land within a block named ``cultural_names`` enclosed by curly brackets (``{``, ``}``).
**Read the lines above until you reach another start of a block (denoted by ``b_london = {``). Ignore any blocks like ``color = {`` or ``color2 ={``.
**The word in place of ``b_london`` is your title ID.


### Finding custom title tags

Custom titles (i.e. the title of a player created Empire) do not follow the same naming convention. To find the ID:
*From the debug console use the command ``explorer`` to open Object Browser
*In Object Browser choose Provider: Landed Titles
*Enter search term
*Hover over the Name field to show the title card


## See also

*[Nickname ID](https://ck3.paradoxwikis.com/Nickname_ID)
*[Decision ID](https://ck3.paradoxwikis.com/Decision_ID)


## References


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Console_commands*
