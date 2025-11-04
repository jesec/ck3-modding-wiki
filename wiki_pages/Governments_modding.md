# Governments modding

Goverments are defined in the /common/governments folder, in the 00_government_types.txt file. More info available in _governments.info

```
 feudal_government = {
         create_cadet_branches = yes 
         rulers_should_have_dynasty = yes
         dynasty_named_realms = yes
         council = yes/no  # The council is available for this ruler; default: yes
         regiments_prestige_as_gold = yes/not 	# Is this govenmnet type using prestige to buy and reinforce MaA Regiments? ( mainteance still costs gold ). default: no
         fallback = 1

         # this line defines the type holding your government considers primary
         # you should use this line if you are changing the primary holding type your government type uses
         primary_holding = castle_holding
         # this line defines the type holding your government can also use without penalties
         # you should use this line if you are adding an aditional custom holding that your government type can use
         valid_holdings = { city_holding }

         # this line defines those pesky restrictions: you need additional ~~pylons~~ temple/city holding
         required_county_holdings = { castle_holding city_holding church_holding } 


        vassal_contract = {
               feudal_government_taxes
               feudal_government_levies
               special_contract
               religious_rights
               fortification_rights
               coinage_rights
               succession_rights
               war_declaration_rights
               council_rights
               title_revocation_rights
         }

      # Disable some AI features for this government type (all are enabled by default). /good if you want to cheat a bit :P 
      # Note that some features might be disabled for other reasons (e.g. if not independent, if below a certain tier).
         ai = {
               use_lifestyle = yes/no
               imprison = yes/no # Imprison & release from prison
               start_murders = yes/no
               arrange_marriage = yes/no # Actively arrange marriages. Can still receive marriage requests if disabled.
               use_goals = yes/no # Use longterm goals (build holdings, perform major decisions, ...)
               use_decisions = yes/no # Use minor decisions
               use_scripted_guis = yes/no # Will evaluate using scripted guis
               perform_religious_reformation = yes/no
        }


   color = hsv{ 0.67 1.00 0.78 }
  }
```


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Governments_modding*
