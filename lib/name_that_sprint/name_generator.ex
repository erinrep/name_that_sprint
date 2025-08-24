defmodule NameThatSprint.NameGenerator do
  @adj ~w(abhorrent abnormal abrasive absurd acidic acrid actually addicted
adequate ad-hoc adorable adventurous agreeable alert amazing amusing ancient
anemic angry annoyed anxious apathetic apologetic apoplectic aquatic arrogant
aware awful awkward bad barbarous bashful beautiful belligerent benevolent bent
bewildered bitter blistering blithe boiling boorish bored brave brawny brazen
bright brilliant broken bulky bustling busy cagey calculating callous calm
capable carefree careless caring cautious cavernous ceaseless certain
challenging challenging charming cheeky cheerful cheerful chilly chivalrous
clever clumsy coherent cold colorful combative common compassionate contrary
cool copious courageous courteous cowardly cozy crabby cranky crawling crazy
creaky creative creeping creepy crispy crowded cruel cuddly cumbersome curious
curly cute damaged dangerous daring deafening decisive decorous decrepit deep
defiant delirious delicate delighted delinquent demanding dense depressed
desolate determined devilish difficult diligent diminutive disastrous discreet
disgusting dishonest disillusioned dismal dispensable disrespectful domineering
dowdy dreadful dull dynamic early earsplitting easy eccentric ecstatic edgy
effortless elastic elfin enchanted enchanting endless energetic enormous
entertaining erratic eternal excited exhausted exuberant fabulous fair familiar
famished fanatical fantastic far-flung feeble fetid fidgety fierce filthy flimsy
fluttering foolish foul freezing fretful friendly frightened frosty full furious
furtive fussy fuzzy gabby gainful garrulous gaunt gauzy generous gentle ghastly
gilded glassy glistening gloomy glorious glowing good gorgeous graceful grand
grave great greedy grey grimy groggy grotesque guiltless gullible habitual handy
hapless happy hard hardworking hasty haughty heady heavy hellish helpless
hideous highfalutin holistic hopeful horrid hostile huge humble humdrum
hysterical icky icy idyllic ill-fated illustrious imminent immense impatient
indifferent industrious infamous ingenious inquisitive intense intimidating
invincible irritable jaded jittery joyful jumbled kaput kind knowing
knowledgeable lame lamentable languid last lavish lazy lethal lively living
lonely long longing loud lousy lovely loyal ludicrous lulling lumpy lush
luxuriant macabre madly magnificent malicious mammoth mangy marvelous massive
material meandering meaty meek menacing merciful messy microscopic mighty minute
miscreant miserable modest monstrous moody mountainous muffled muggy mushy
mysterious nappy nasty naughty nauseating naïve nebulous nervous nimble
nonchalant normal noxious oafish obnoxious obsequious obtuse oceanic odd
omniscient onerous oppressive optimal optimistic opulent ornery ossified paltry
parched peculiar perfect perpetual petite picturesque piercing piquant pleasant
plucky plump plush polite precise pretty previous private probable proud prudent
puny pushy quack quaint quarrelsome questionable quick quiet quirky quixotic
rabid rambunctious rampant rancid rapid raspy rebellious relaxed remarkable
repulsive resolute revolting rich ridiculous righteous ritzy roasted romantic
rotten rotund rude rusty savage savory scared scorching sedate selfish serious
severe sharp shining shocking shrill shy silly simple sizzling skinny sleepy
slick slight slimy sloppy slow sluggish small smart smelly smooth snug soaring
solemn somber sour sparkling special speedy spiffy spiky splendid spoiled spooky
squalid stanky startled starving steaming stern stiff stifling stingy stinky
stormy strict striking striped stubborn stuffed stunning stupendous sturdy
subdued subtle sudden sullen super superb superficial superlative surprised
swanky sweltering swift swollen taboo tangy tedious temporary tense terrified
testy thick thrifty timid tiny toothsome torpid tough towering tranquil trashy
trendy tricky truthful ugly unbecoming unhealthy unruly unsuitable vacuous
valuable vast vengeful verdant victorious vigilant vigorous vile violet
vivacious volatile vulgar wacky wakeful wary watery well-to-do whimsical
whispering wide-eyed wild wiry wise woebegone wonderful workable worried
wrathful wrinkly yielding yummy zany zealous zesty zippy zonked)

  @animals1 ~w(aardvark antelope beaver bison bobcat cat crocodile cub dinosaur
dog dolphin donkey elephant fish frog giraffe goat goose gorilla horse leopard
monkey moose owl panda penguin pig rabbit raccoon rat shark skunk snake tiger
turtle whale wolf zebra)

  @animals2 ~w(aardvark alligator antelope armadillo badger beaver bison bobcat
bunny butterfly cat cheetah chicken clam crocodile crow cub dinosaur dog dolphin
donkey duck eagle elephant falcon ferret fish flamingo fowl frog giraffe goat
goose gorilla hawk honey-badger horse iguana jellyfish kangaroo kitten kitty
koala lamb leopard lion lizard meerkat monkey moose mouse ostrich owl oyster
panda panther parrot pelican penguin pig piglet pony puppy rabbit raccoon rat
salamander shark sheep skink skunk slug snail snake squirrel tiger toad tortoise
turtle whale wolf zebra)

  @nouns ~w(act action activity actor advertisement advice aftermath afternoon
afterthought agreement air airplane airport alarm alley amusement angle answer
apparatus apparel apple apples appliance argument arithmetic arm army art
attempt attention attraction aunt authority baby back badge bag bait balance
ball balloon balls banana band base baseball basin basket basketball bath battle
bead beam bean beast bed bedroom beds beef beggar beginner behavior belief bell
bells berry bike birth birthday bite blade blood board boat boats body bone book
books boot border bottle boundary box boy boys brain branch brass bread
breakfast breath brick bridge brother brothers brush bubble bucket building bulb
bun burn burst bushes business butter button cabbage cable cactus cake cakes
calculator calendar camera camp can cannon canvas cap caption car card care
carpenter carriage cars cart cast cave celery cellar cemetery cent chain chair
chairs chalk chance change channel cheese cherries cherry chess children chin
church circle class clock clocks cloth cloud clouds clover club coach coal coast
coat cobweb coil collar color comb comfort committee company comparison
competition condition connection control cook copper copy cord cork corn cough
country cover crack crate crayon cream creator creature credit crib crime crook
crowd crown crush cry cup current curtain curve cushion dad daughter day debt
decision degree design desire desk destruction detail development digestion dime
dinner direction dirt discovery discussion disease disgust distance distribution
division dock doctor doll dolls door drain drawer dress drink driving drop drum
dust ear earth earthquake edge education effect egg eggnog eggs elbow end engine
error event example exchange existence expansion experience expert eye eyes
face fact fairies fall family fan fang farm farmer father faucet fear feast
feather feeling feet fiction field fifth fight finger fire fireman flag flame
flavor flesh flight flock floor flower flowers fly fog fold food foot force
fork form frame friction friend friends front fruit fuel furniture galley game
garden gate ghost giants girl girls glass glove glue gold good-bye government
governor grade grain grandfather grandmother grape grass grip ground group
growth guide guitar hair haircut hall hammer hand hands harbor harmony hat
head health hearing heart heat help hill history hobbies hole holiday home
honey hook hope horn hose hospital hour house houses humor hydrant ice icicle
idea impulse income increase industry ink instrument insurance interest
invention iron island jail jam jar jeans jelly jewel join joke journey judge
juice jump kettle key kick kiss kite knee knot knowledge laborer lace lake
lamp land language laugh lawyer lead leaf learning leather leg legs letter
letters lettuce level library lift light limit line linen lip liquid list loaf
lock locket look loss love low lumber lunch lunchroom machine magic maid
mailbox man manager map marble mark market mask mass match meal measure meat
meeting memory men metal middle milk mind mine minister mint minute mist
mitten mom money month moon morning mother motion mountain mouth move muscle
music nail name nation neck need needle nerve nest net news night noise north
nose note notebook number nut oatmeal observation ocean offer office oil
operation opinion orange oranges order organization ornament owner page pail
pain paint pan pancake paper parcel parent park part partner party passenger
paste patch payment peace pear pen pencil person pest pet pets pickle picture
pie pies pin pipe pizza place plane planes plant plants plastic plate play
playground pleasure plot pocket point poison police pollution popcorn position
potato powder power price print prison process produce profit property prose
protest pull pump punishment purpose push quarter quartz queen question
quicksand quill quilt quiver rail railway rain rainstorm rake range rate
reaction reading reason receipt record regret relation religion representative
request respect rest reward rhythm rice riddle rifle ring rings river road
rock roll roof room root rose route rub rule run sack sail salt sand scale
scarecrow scarf scene scent school science scissors screw sea seashore seat
secretary seed selection self sense servant shade shake shame shape sheet
shelf ship shirt shock shoe shoes shop show side sidewalk sign silk silver
sink sister sisters size skate skin skirt sky sleep sleet slip slope smash
smell smile smoke sneeze snow soap society sock soda sofa son song songs sort
sound soup space spade spark spoon spot spring spy square stage stamp star
start statement station steam steel stem step stew stick sticks stitch
stocking stomach stone stop store story stove stranger straw stream street
stretch string structure substance sugar suggestion suit summer sun support
surprise sweater swim swing system table tail talk tank taste tax teaching
team teeth temper tendency tent territory test texture theory thing things
thought thread thrill throat throne thumb thunder ticket time tin title toe
toes tomatoes tongue tooth toothbrush toothpaste top touch town toy toys trade
trail train trains tramp transport tray treatment tree trees trick trip
trouble trousers truck trucks tub turn twig twist umbrella uncle underwear
unit use vacation value van vase vegetable veil vein verse vessel vest view
visitor voice volcano volleyball voyage walk wall war wash waste watch water
wave waves wax way wealth weather week weight wheel whip whistle wilderness
wind window wine wing winter wire wish woman women wood wool word work wound
wrench wrist writer writing yam yard yarn year yoke zinc zipper zoo)

  def create do
    case :rand.uniform(100) do
      x when x in 0..50 ->
        "#{Enum.random(@adj)} #{Enum.random(@nouns)}"

      x when x in 51..75 ->
        "#{Enum.random(@animals1)} #{Enum.random(@nouns)}"

      x when x in 76..100 ->
        "#{Enum.random(@adj)} #{Enum.random(@animals2)}"
    end
  end
end
