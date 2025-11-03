# Defines

> **Note:** Last verified for version 1.2


**Defines** are constants that affect certain non-scriptable game behaviors, such as army movement and schemes. They are static and global: they apply to the whole game and cannot be changed dynamically. 


## Configuration

Vanilla defines are set in *game\common\defines\00_defines.txt*.

To modify defines, it is best not to modify the original file, but rather to use a mod. To do so, [Mod_structure#Creating_initial_files](Mod_structure.md#creating_initial_files), then create a text file in *Documents\Paradox Interactive\mod\[mod name]\common\defines*. To change a define, use the following format in the following example, which changes the end date to 1800:


```
NGame = {
    END_DATE = "1800.1.1"
}
```

The file only needs to contain the edited defines—ones that are not being changed can be left out.


## List of defines

The following is a (non-exhaustive) list of defines, organized by category.


### Game


|  |  |  |
| --- | --- | --- |
| **Variable** | **Unit** | **Notes/description** |
| END_DATE = "1453.1.1" |  | YYYY.M.D |
| GAME_SPEED_TICKS | Seconds | Number of seconds a day should take at every game speed (first value is speed 1, last value is speed 5). |
| COMBAT_TICK_LIMIT = 1 |  |  |
| LAG_DECREASE_SPEED_DAYS = 15 | Days | Number of days of client lag that will cause a speed decrease in multiplayer. |
| LAG_PAUSE_DAYS  = 30 | Days | Number of days of client lag that will cause a pause in multiplayer. |
| MULTIPLAYER_EVENT_TIME_OUT = 90 | Days | Number of days an event will show in multiplayer. When all time has passed, the game will automatically select an option. |
| BENCHMARK_TEST_DURATION = 135 | Seconds | Duration of a benchmark test using the "-benchmark" launch option. |
| BENCHMARK_INTERFACE_INTERVAL = 5.0 | Seconds | Time before the benchmark changes the open UI window. |
| BENCHMARK_OBSERVE_CHARACTER = k_england | Title | The title of the character who will be observed for the benchmark. |
| BENCHMARK_WAYPOINTS |  | Where the camera should pan during the benchmark. |


### Setup


|  |  |  |
| --- | --- | --- |
| **Variable** | **Unit** | **Notes/description** |
| COURTLESS_CHARACTER_GUEST_CHANCE = 0.25 |  | Chance that a courtless character is sent to a court as a guest instead of a regular courtier on game start. |
| GENERATED_POOL_CHARACTERS |  | Random range for number of characters per pool (duchy) generated at the start of the game |
| GENERATED_POOL_CHARACTER_TEMPLATES |  | Templates used for the pool character. Presumably, the trait-based templates are characters skilled in that trait. |
| GENERATED_POOL_CHARACTER_TEMPLATE_WEIGHTS |  | Influence the chance of each template appearing. Correspond to the template names at the same index. |
| DESIRED_NEIGHBOR_POOLS = 4 |  | Number of pools each pool should try to border. |
| MAX_POOL_NEIGHBOR_DISTANCE = 3 |  | Maximum number of sea zones away a pool should search for a neighboring pool. |


### Jomini Map


|  |  |  |
| --- | --- | --- |
| **Variable** | **Unit** | **Notes/description** |
| WORLD_EXTENTS_X = 8191 |  | How wide the map is. |
| WORLD_EXTENTS_Y = 51 |  | How deep the map is. |
| WORLD_EXTENTS_Z = 4095 |  | How tall the map is. |
| WATERLEVEL = 3.8 |  |  |


### Characters


|  |  |  |
| --- | --- | --- |
| **Variable** | **Unit** | **Notes/description** |
| MALE_RANDOM_AGE_BASE = 16 | Years | The initial age of randomly-generated male characters. |
| MALE_RANDOM_AGE_SPAN = 20 | Years | The maximum difference from the base age of male characters. The age of a random character is equal to the base plus a random value within the span. |
| FEMALE_RANDOM_AGE_BASE = 16 | Years | The initial age of randomly-generated female characters. |
| FEMALE_RANDOM_AGE_SPAN = 16 | Years | The maximum difference from the base age of female characters. The age of a random character is equal to the base plus a random value within the span. |
| RANDOM_PERSONALITY_TRAITS_BASE = 3 |  | The initial number of personality traits for randomly-generated characters. |
| RANDOM_PERSONALITY_TRAITS_SPAN = 0 |  | The maximum difference from the base number of traits. By default, randomly-generated characters always have 3 traits. |
| RANDOM_CHARACTER_DIPLOMACY_MIN = 0 |  | Minimum possible base diplomacy of a randomly-generated character. |
| RANDOM_CHARACTER_DIPLOMACY_MAX = 10 |  | Maximum possible base diplomacy of a randomly-generated character. |
| RANDOM_CHARACTER_MARTIAL_MIN = 0 |  | Minimum possible base martial of a randomly-generated character. |
| RANDOM_CHARACTER_MARTIAL_MAX = 10 |  | Maximum possible base martial of a randomly-generated character. |
| RANDOM_CHARACTER_STEWARDSHIP_MIN = 0 |  | Minimum possible base stewardship of a randomly-generated character. |
| RANDOM_CHARACTER_STEWARDSHIP_MAX = 10 |  | Maximum possible base stewardship of a randomly-generated character. |
| RANDOM_CHARACTER_INTRIGUE_MIN = 0 |  | Minimum possible base intrigue of a randomly-generated character. |
| RANDOM_CHARACTER_INTRIGUE_MAX = 10 |  | Maximum possible base intrigue of a randomly-generated character. |
| RANDOM_CHARACTER_LEARNING_MIN = 0 |  | Minimum possible base learning of a randomly-generated character. |
| RANDOM_CHARACTER_LEARNING_MAX = 10 |  | Maximum possible base learning of a randomly-generated character. |
| RANDOM_CHARACTER_PROWESS_MIN = 0 |  | Minimum possible base prowess of a randomly-generated character. |
| RANDOM_CHARACTER_PROWESS_MAX = 10 |  | Maximum possible base prowess of a randomly-generated character. |
| RANDOM_CHARACTER_MIN_FERTILITY = 0.5 |  | Minimum possible base fertility of a randomly-generated character. |
| RANDOM_CHARACTER_MAX_FERTILITY = 0.6 |  | Maximum possible base fertility of a randomly-generated character. |
| RANDOM_CHARACTER_MIN_HEALTH = 4.0 |  | Minimum possible base health of a randomly-generated character. |
| RANDOM_CHARACTER_MAX_HEALTH = 5.0 |  | Maximum possible base health of a randomly-generated character. |
| RANDOM_CHARACTER_AGE_MIN_HEALTH = 2.5 |  | Minimum base health for randomly-generated characters after adjusting for age. |
| MAX_STRESS_LEVEL = 3 |  |  |
| STRESS_PER_LEVEL = 100 |  |  |
| STRESS_MONTHLY_CHANGE = 0 |  | Stress changes monthly by this value until reaching a character's base stress. |
| MAX_DREAD = 100 |  |  |
| BASE_DREAD = 0 |  |  |
| DREAD_MONTHLY_CHANGE = 0.5 |  | Dread changes monthly by this value until reaching a character's base dread. |
| BOLD_LEVEL_COWED = 45 |  | The amount of dread above a character's [Attributes#Dread](https://ck3.paradoxwikis.com/Attributes#dread) for them to be terrified. |
| BOLD_LEVEL_INTIMIDATED = 20 |  | The amount of dread above a character's [Attributes#Dread](https://ck3.paradoxwikis.com/Attributes#dread) for them to be intimidated. |
| MAX_TYRANNY = 1000 |  |  |
| TYRANNY_MONTHLY_CHANGE = -0.25 |  | Tyranny changes by this amount every month. |
| BASE_FERTILITY = 0.5 |  |  |
| BASE_HEALTH = 5.0 |  |  |
| LEVELS_PIETY |  | Amounts of piety needed for various devotion levels. The first/lowest level is first in the list, and they are sorted in ascending order. |
| LEVELS_PRESTIGE |  | Amounts of prestige needed for various fame levels. The first/lowest level is first in the list, and they are sorted in ascending order. |
| BASE_PIETY_EXPERIENCE = 1000 |  | Initial piety experience (used for devotion). |
| BASE_PRESTIGE_EXPERIENCE = 1000 |  | Initial prestige experience (used for fame). |
| LEVEL_DROP_MAX_RETAINED_PROGRESS_PIETY = 0.5 |  | A character who drops a level of devotion retains this amount (percentage) of progress towards the next level. |
| LEVEL_DROP_MAX_RETAINED_PROGRESS_PRESTIGE = 0.5 |  | A character who drops a level of fame retains this amount (percentage) of progress towards the next level. |
| LEVELS_PIETY_GRAPHICAL_STEP = 1 |  | How many levels of devotion should increment before the icon changes. |
| LEVELS_PRESTIGE_GRAPHICAL_STEP = 1 |  | How many levels of fame should increment before the icon changes. |
| PIETY_ZERO_LEVEL = 1 |  | The devotion level considered to be the initial or "zero" level. |
| PRESTIGE_ZERO_LEVEL = 1 |  | The fame level considered to be the initial or "zero" level. |
| TODDLER_AGE = 3 | Years | Age at which a character becomes a toddler. This is when they receive their childhood trait. |
| CHILDHOOD_AGE = 6 | Years | Age at which a character becomes a child. This is when they are assigned an education (based on the childhood trait) and begin their education. |
| ADOLESCENCE_AGE = 12 | Years | Age of adolescence. Used for education. |
| MALE_ADULT_AGE = 16 | Years | Age at which male characters become adults, which has several effects, such as unlocking various diplomatic actions. |
| FEMALE_ADULT_AGE = 16 | Years | Age at which female characters become adults, which has several effects, such as unlocking various diplomatic actions. |
| BETROTHAL_TIMEOUT_AGE = 17 | Years | Presumably the age at which unfulfilled betrothals are cancelled (once both have reached this age). |
| MALE_ATTRACTION_CUTOFF_AGE = 65 | Years | After this age, the attraction of traits no longer has an effect for male characters. |
| FEMALE_ATTRACTION_CUTOFF_AGE = 50 | Years | After this age, the attraction of traits no longer has an effect for female characters. |
| HEALTH_STATE_LEVELS_VALUES |  | Health thresholds for the various health levels (such as "fine," "poor," etc.). |
| HEALTH_STATE_LEVELS_TEXTS |  | Text for the various health thresholds. They correspond with the levels defined in HEALTH_STATE_LEVELS_VALUES. |
| SKILL_LEVELS_VALUES |  | Skill level thresholds used for the descriptions (such as "average," "good," etc.). |
| SKILL_LEVELS_TEXTS |  | Text for the various skill level thresholds. They correspond with the levels defined in SKILL_LEVELS_VALUES. |
| SKILL_MODIFIER_OFFSET = -8 |  | Skill modifiers with offset add this from the skill value. |
| MAX_RELATIONS_TO_SHOW = 3 |  | Used for the character window. |
| PRESTIGE_FROM_DYNASTY_ON_MARRIAGE_FACTOR = 0.1 |  | Used to calculate prestige gain on marriage. |
| PRESTIGE_FROM_DYNASTY_ON_BORN_FACTOR = 0.2 |  | Used to calculate initial prestige on birth. |
| MARRIAGE_TIER_DIFF_PRESTIGE_MULT = 100 |  |  |
| CHARACTER_TRAVEL_TIME = 0.1 |  | Multiplied by the distance between locations on the map. |
| FOCUS_CHILD_MIN_AGE = 6 |  |  |
| FOCUS_CHILD_MAX_CHANGES = 1 |  | Maximum number of times a child's education focus can be changed. |
| FOCUS_ADULT_COOLDOWN_MONTHS = 60 | Months | Number of months between being able to change lifestyle focus. |
| SKILL_SCALE_AGE = 16 |  |  |
| MAX_HEIR_TO_SHOWN = 4 |  | Number of "heir to" titles to be shown. |
| MAX_PARENT_STEPS_FOR_HEIR = 6 |  | Number of steps up to search for heirs if no descendants can be found. |
| MIN_HEIR_TO_FIND = 20 |  | Number of heirs to find (in the line of succession) before stopping to look for more. Higher numbers can negatively impact performance. |
| MAX_HEIRS_IN_LINE_OF_SUCCESSION_TOOLTIP = 5 |  | How many heirs to show in the tooltip for a title. |
| MAX_POTENTIAL_SPOUSES = 100000 |  | Maximum number of potential spouses shown in the "find spouse" or "arrange marriage" windows. |
| MONTHS_OF_INCOME_AT_START = 12 | Months | All rulers start with this many months of income in their treasuries. |
| MAXIMUM_DIPLOMATIC_RANGE = 1000 |  | Distance before characters are considered outside of diplomatic range on the default setting. |
| MAXIMUM_DIPLOMATIC_RANGE_RESTRICTED = 750 |  | Distance before characters are considered outside of diplomatic range on the restricted diplomatic range game rule. |
| HOOK_COOLDOWN_DURATION_YEARS = 5 | Years | Strong hook cooldown duration (upon being used). |
| MAX_COUNTIES_IN_REALM_AS_DUKE = 30 |  | As a duke or count, the player (AI characters are unaffected) will begin to suffer penalties if going beyond this number of counties. Kings and emperors do not suffer the penalty. |
| INCOME_PENALTY_PER_COUNTY_ABOVE_LIMIT = 0.05 |  | Going above the county limit defined in MAX_COUNTIES_IN_REALM_AS_DUKE reduces monthly income by this percentage per county. |
| FORCED_SUCCESSION_ELECTION_YEARS = 5 | Years | Length of time someone is forced to vote with another elector when a strong hook is used to do so. |
| MINIMUM_VALUE_FOR_PERSONALITY_DESCRIPTION = 25 |  | [Character#AI_Personality](https://ck3.paradoxwikis.com/Character#ai_personality) values below this are ignored when building personality descriptions. |
| STRONG_VALUE_FOR_PERSONALITY_DESCRIPTION = 75 |  | AI personality values above this get a stronger version in the personality description. |
| MINIMUM_TIER_FOR_REGNAL_NUMBERING = 3 |  | Minimum tier in order for regnal numbering to be used. 1 is baron, 5 is emperor. |
| PERCENTAGE_HOMOSEXUAL = 5.0 |  | Percentage chance of a randomly-created character being homosexual. |
| PERCENTAGE_BISEXUAL = 5.0 |  | Percentage chance of a randomly-created character being bisexual. |
| PERCENTAGE_ASEXUAL = 1.0 |  | Percentage chance of a randomly-created character being asexual. |
| DESIGNATE_HEIR_DISPLAY_COST = 1000 |  | Prestige cost for designating an heir. |
| PRETENDERS_TO_TITLE = 5 |  | Maximum number of characters to be stored as pretenders to a title (including the heir). |
| PARTITION_SCORE_PER_OWN_COUNTY = 2 |  | Score an owned county contributes in partition when selecting a title. The higher this value, the more getting a title with personally-owned land is encouraged. |
| PARTITION_SCORE_PER_OTHER_COUNTY = 1 |  | Score that a county owned by another heir takes away in partition when selecting a title. The higher this is, the more getting a title with land not owned by other heirs is encouraged. |
| DESIRED_CONCUBINES_PER_TIER |  | Number of concubines a ruler of each tier wants if their faith allows concubines, in ascending order by tier. |
| PRESTIGE_LOSS_PER_MISSING_CONCUBINE = 0.1 |  | Monthly prestige loss per missing fertile concubine. |
| DEBT_MODIFIER_THRESHOLDS |  | When the various debt modifiers take effect, by months of income of debt. |


Category:Modding

---

*Source: https://ck3.paradoxwikis.com/Defines*
