
-- First, let's add the missing builder steps with proper structure
INSERT INTO builder_steps (id, name, sort, max_select) VALUES 
  (1, 'Taille', 1, 1),
  (2, 'Base', 2, 2), 
  (3, 'Sauce', 3, 2),
  (4, 'Garnitures', 4, 5),
  (5, 'Protéine', 5, 1),
  (6, 'Toppings', 6, 2),
  (7, 'Extra sauce', 7, 0),
  (8, 'Extra garniture', 8, 0),
  (9, 'Extra protéine', 9, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sort = EXCLUDED.sort,
  max_select = EXCLUDED.max_select;

-- Now let's add all the missing options for each step
-- Size options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (100, 1, 'Regular', 0, false),
  (101, 1, 'Large', 2.00, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Base options (updating existing ones and adding missing)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (1, 1, 'Riz blanc', 0, false),
  (2, 1, 'Riz brun', 0.50, false),
  (3, 1, 'Salade mixte', 0, false),
  (102, 1, 'Quinoa', 1.00, false),
  (103, 1, 'Nouilles soba', 1.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = 1,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Sauce options (complete list)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (4, 2, 'Sésame', 0, false),
  (5, 2, 'Teriyaki', 0, false),
  (6, 2, 'Soja', 0, false),
  (104, 2, 'Ponzu', 0, false),
  (105, 2, 'Miso', 0, false),
  (106, 2, 'Épicée', 0, false),
  (107, 2, 'Mayo épicée', 0.50, false),
  (108, 2, 'Avocat crème', 0.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = 2,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Garnitures options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (7, 3, 'Concombre', 0, false),
  (8, 3, 'Carotte', 0, false),
  (9, 3, 'Avocat', 1.00, false),
  (10, 3, 'Radis', 0, false),
  (11, 3, 'Maïs', 0, false),
  (109, 3, 'Edamame', 0.50, false),
  (110, 3, 'Chou rouge', 0, false),
  (111, 3, 'Mangue', 1.00, false),
  (112, 3, 'Ananas', 0.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = 3,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Protein options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (12, 4, 'Saumon', 3.00, false),
  (13, 4, 'Thon', 2.50, false),
  (14, 4, 'Poulet', 2.00, false),
  (15, 4, 'Tofu', 1.50, false),
  (113, 4, 'Crevettes', 3.50, false),
  (114, 4, 'Surimi', 1.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = 4,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Toppings options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (16, 5, 'Graines de sésame', 0, false),
  (17, 5, 'Algues nori', 0.50, false),
  (18, 5, 'Gingembre mariné', 0, false),
  (115, 5, 'Oignons frits', 0.50, false),
  (116, 5, 'Tempura flakes', 0.50, false),
  (117, 5, 'Wasabi', 0, false),
  (118, 5, 'Citron vert', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = 5,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra sauce options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (119, 7, 'Extra Sésame', 0.50, false),
  (120, 7, 'Extra Teriyaki', 0.50, false),
  (121, 7, 'Extra Soja', 0.50, false),
  (122, 7, 'Extra Ponzu', 0.50, false),
  (123, 7, 'Extra Miso', 0.50, false),
  (124, 7, 'Extra Épicée', 0.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra garniture options
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (125, 8, 'Extra Avocat', 1.50, false),
  (126, 8, 'Extra Concombre', 0.50, false),
  (127, 8, 'Extra Edamame', 1.00, false),
  (128, 8, 'Extra Mangue', 1.50, false),
  (129, 8, 'Extra Maïs', 0.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra protein options  
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (130, 9, 'Extra Saumon', 4.00, false),
  (131, 9, 'Extra Thon', 3.50, false),
  (132, 9, 'Extra Poulet', 3.00, false),
  (133, 9, 'Extra Tofu', 2.50, false),
  (134, 9, 'Extra Crevettes', 4.50, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;
