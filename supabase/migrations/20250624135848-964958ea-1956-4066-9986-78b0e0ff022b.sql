
-- Update signature bowl descriptions in the database to match what customers see
UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Riz blanc, Salade • Sauce: Sauce soja, Mayo épicée • Garnitures: Avocat, Concombre, Edamame • Protéine: Saumon • Toppings: Graines de sésame',
  'en', 'Base: White rice, Salad • Sauce: Soy sauce, Spicy mayo • Vegetables: Avocado, Cucumber, Edamame • Protein: Salmon • Toppings: Sesame seeds',
  'nl', 'Basis: Witte rijst, Salade • Saus: Sojasaus, Pittige mayo • Groenten: Avocado, Komkommer, Edamame • Proteïne: Zalm • Toppings: Sesamzaadjes'
)
WHERE id = 15;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Riz brun • Sauce: Sauce teriyaki • Garnitures: Mangue, Carottes, Chou rouge • Protéine: Thon • Toppings: Algues nori, Gingembre',
  'en', 'Base: Brown rice • Sauce: Teriyaki sauce • Vegetables: Mango, Carrots, Red cabbage • Protein: Tuna • Toppings: Nori seaweed, Ginger',
  'nl', 'Basis: Bruine rijst • Saus: Teriyakisaus • Groenten: Mango, Wortels, Rode kool • Proteïne: Tonijn • Toppings: Nori zeewier, Gember'
)
WHERE id = 16;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Quinoa • Sauce: Sauce ponzu • Garnitures: Radis, Pousses de bambou • Protéine: Tofu grillé • Toppings: Noix de coco râpée',
  'en', 'Base: Quinoa • Sauce: Ponzu sauce • Vegetables: Radish, Bamboo shoots • Protein: Grilled tofu • Toppings: Shredded coconut',
  'nl', 'Basis: Quinoa • Saus: Ponzusaus • Groenten: Radijs, Bamboescheuten • Proteïne: Gegrilde tofu • Toppings: Geraspte kokos'
)
WHERE id = 17;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Riz blanc, Nouilles soba • Sauce: Sauce sriracha mayo • Garnitures: Avocat, Ananas, Poivrons • Protéine: Crevettes tempura • Toppings: Oignons frits',
  'en', 'Base: White rice, Soba noodles • Sauce: Sriracha mayo sauce • Vegetables: Avocado, Pineapple, Peppers • Protein: Tempura shrimp • Toppings: Fried onions',
  'nl', 'Basis: Witte rijst, Soba noedels • Saus: Sriracha mayosaus • Groenten: Avocado, Ananas, Paprika • Proteïne: Tempura garnalen • Toppings: Gebakken uien'
)
WHERE id = 18;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Salade mixte • Sauce: Vinaigrette sésame • Garnitures: Tomates cerises, Concombre • Protéine: Poulet teriyaki • Toppings: Amandes effilées',
  'en', 'Base: Mixed salad • Sauce: Sesame vinaigrette • Vegetables: Cherry tomatoes, Cucumber • Protein: Teriyaki chicken • Toppings: Sliced almonds',
  'nl', 'Basis: Gemengde salade • Saus: Sesam vinaigrette • Groenten: Cherrytomaatjes, Komkommer • Proteïne: Teriyaki kip • Toppings: Geschaafde amandelen'
)
WHERE id = 19;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Riz noir • Sauce: Sauce yuzu • Garnitures: Avocat, Wakame • Protéine: Saumon fumé • Toppings: Caviar de poisson volant',
  'en', 'Base: Black rice • Sauce: Yuzu sauce • Vegetables: Avocado, Wakame • Protein: Smoked salmon • Toppings: Flying fish roe',
  'nl', 'Basis: Zwarte rijst • Saus: Yuzusaus • Groenten: Avocado, Wakame • Proteïne: Gerookte zalm • Toppings: Vliegende viskuit'
)
WHERE id = 20;

UPDATE menu_items 
SET descriptions = jsonb_build_object(
  'fr', 'Base: Riz blanc, Vermicelles • Sauce: Sauce chimichurri, Mayo citron • Garnitures: Maïs, Haricots noirs, Jalapeños • Protéine: Bœuf grillé • Toppings: Coriandre fraîche',
  'en', 'Base: White rice, Vermicelli • Sauce: Chimichurri sauce, Lemon mayo • Vegetables: Corn, Black beans, Jalapeños • Protein: Grilled beef • Toppings: Fresh cilantro',
  'nl', 'Basis: Witte rijst, Vermicelli • Saus: Chimichurrisaus, Citroenmayo • Groenten: Maïs, Zwarte bonen, Jalapeños • Proteïne: Gegrild rundvlees • Toppings: Verse koriander'
)
WHERE id = 21;
