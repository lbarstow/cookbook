# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
user_1 = User.create(name: "Laura", email: "l@l.com", password: "password")
user_2 = User.create(name: "Tom", email: "t@t.com", password: "verysecure")


Recipe.delete_all
r_1 = Recipe.create(title: "tea", body: "add boiling water to \na mug with a tea bag", author: user_1)
r_2 = Recipe.create(title: "Maple Corn Plops", body:"1 ½ c	flour \n 1 ½ c	cornmeal (5.8 oz) \
  \n1 ½ T	baking powder\n3/8 t	salt\n8 T	margarine\n3/8 c	maple syrup \
  \nAdditional milk to make 1 c \n\nPreheat oven to 425 degrees\nStir dry ingredients together \
  \nCut in margarine\nCombine maple syrup and milk in 1 cup measure \
  \nAdd liquids to dry ingredients and combine with fork, then hand \
  \nBreak into 6 or 8 plops, shape roughly, and place on insulated baking sheet \
  \nBake 12 – 14 minutes", description: "A good breakfast to make quickly us. Similar to scones, but with maple flavor",
  source: "Biscuits and Scones by Elizabeth Alston", author: user_1)
r_3 = Recipe.create(title: "Mournful Oatmeal", body: "3 c 	water\n¼ t	salt\n1 c	steel-cut oats \
  \n1 c	milk\n\nBring water, salt and oats to a rolling boil in an ovenproof saucepan \
  \nAdd milk and reheat just to a boil\nRemove from heat, cover, and place in the oven \
  \nTurn oven on, either manually or via programmed start, to 375° and cook for 75 minutes \
  \nStir and serve", source:"Recipe from Cook’s Illustrated (March 2000). Cooking method devised by Tom Barstow.",
  author: user_1)
r_4 = Recipe.create(title:"No-Knead White Bread", body:"20 oz (4c) white flour (all-purpose or bread) \
  \n1/3 t instant dry yeast (see notes)\n0.30 oz (2t) salt\n12.5 oz (1-½ c) water \
  \n0.8 oz (1-½ T) white vinegar\n\nMix dry ingredients in large bowl. \
  \nAdd liquids and mix until the dough forms a ball and no dry flour \
  remains in the ball. The dough will look “shaggy” rather than sleek. \
  Cover with plastic wrap and let sit at room temperature for 8 to 18 hours. \
  \nKnead 10 to 15 times on lightly floured surface. (Sprinkle with more \
  flour as necessary to keep it from sticking too much.)\nForm the dough \
  into a smooth ball and place it on parchment paper in 8” (or 10”) skillet. \
  Cover with plastic wrap. Let rise for 2 hours.\n30 minutes before end of rise, \
  turn the oven to 450 and put Dutch oven (or equivalent) and lid in the \
  oven to preheat. Put the lid beside the pan or at least tilted on top so \
  air can circulate in the pan. At the end of the rise, turn temperature down to 400.\
  \nSprinkle a bit of flour on top of loaf, slash with sharp knife so \
  the bread will crack where you want it to. (I do three parallel slashes.) \
  Remove the preheated pan from the oven. Be very careful – it’s \
  blazing hot! Place bottom of springform pan in the pan, lift dough \
  into pan using parchment paper as sling, cover, and bake 45 minutes. \
  \nUncover and bake another 3-6 minutes until browned to the level you like. \
  Internal temperature should be 203-210.\nWait at least one incredibly long hour before cutting. \
  \nThe bread lasts best if it’s simply placed cut-side down, rather then enclosed \
  in a plastic or paper bag.\n\nNotes: I use instant dry yeast but active dry \
  yeast (“normal” yeast) works fine. Just increase the yeast a little bit, from ¼ \
  t to 1/3 t in the smaller recipe and from 1/3 t to ½ t in the larger one. \
  If you really get involved in making bread, considering getting a \
  two-pound package of instant yeast (about $5) at BJ’s Wholesale Club \
  and storing it in 8 oz canning jars in the freezer. It should last for \
  years.", source: "Tom Barstow, July 2015", author: user_2)
r_5 = Recipe.create(parent_recipe: r_4, title:"Dried Fruit",
  body:"4 oz (4/5 c) dried cherries, mixed berries, or other dried fruit\n3 oz (3/8 c) \
  water\n11 oz (1-3/8 c) water (reduced amount)\n\nSimmer the berries in the small \
  amount of water for about 15 minutes, cool them, and add them to the \
  dry ingredients. Toss a bit to separate the berries so they don’t clump.
  This makes terrific toast, too.", source: "Tom Barstow", author: user_2)
r_6 = Recipe.create(parent_recipe: r_4, title: "Garlic", body: "1 oz (5 cloves) garlic \
  \n1.5 oz (3 T) olive oil\n12 oz (1-½ c) water (reduced amount)\nPut the garlic through a press, or mince it.\
  Sauté garlic in oil over very low heat for 5-10 minutes. Add (including oil) with wet ingredients.", author: user_2)
r_7 = Recipe.create(parent_recipe: r_4, title: "Herb", body: "2 t dried herbs (oregano and rosemary both work well)\
  \nAdd the herb to the dry ingredients.\nIf you have fresh herbs,\
  use triple the amount shown and dice them.", author: user_1)
