
-- First, delete any stray/incorrect options that shouldn't exist
DELETE FROM builder_options WHERE name IN (
  'Salade mixte', 'Quinoa', 'Nouilles soba', 'Mayo épicée', 'Avocat crème',
  'Edamame', 'Chou rouge', 'Mangue', 'Ananas', 'Crevettes', 'Surimi',
  'Algues nori', 'Gingembre mariné', 'Oignons frits', 'Tempura flakes',
  'Wasabi', 'Citron vert'
);

-- Now insert/update all options with correct step_id assignments
-- Size options (step_id = 1)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (100, 1, 'Regular', 0, false),
  (101, 1, 'Large', 2.00, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Base options (step_id = 2) - corrected assignment
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (1, 2, 'Riz blanc', 0, false),
  (2, 2, 'Riz sushi', 0, false),
  (102, 2, 'Quinoa', 0, false),
  (103, 2, 'Salade', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Sauce options (step_id = 3) - corrected assignment
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (4, 3, 'Sésame', 0, false),
  (5, 3, 'Teriyaki', 0, false),
  (6, 3, 'Soja', 0, false),
  (104, 3, 'Ponzu', 0, false),
  (105, 3, 'Miso', 0, false),
  (106, 3, 'Épicée', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Garnitures options (step_id = 4) - corrected assignment
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (7, 4, 'Avocat', 0, false),
  (107, 4, 'Edamame', 0, false),
  (8, 4, 'Concombre', 0, false),
  (108, 4, 'Mangue', 0, false),
  (9, 4, 'Carotte', 0, false),
  (109, 4, 'Oignons frits', 0, false),
  (10, 4, 'Maïs', 0, false),
  (11, 4, 'Radis', 0, false),
  (110, 4, 'Betterave', 0, false),
  (111, 4, 'Wakame', 0, false),
  (112, 4, 'Ananas', 0, false),
  (113, 4, 'Coriandre', 0, false),
  (114, 4, 'Tomate', 0, false),
  (115, 4, 'Chou rouge', 0, false),
  (116, 4, 'Oignons nouveaux', 0, false),
  (117, 4, 'Courgette', 0, false),
  (118, 4, 'Jalapeño', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Protein options (step_id = 5) - corrected assignment
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (12, 5, 'Saumon', 0, false),
  (13, 5, 'Thon', 0, false),
  (14, 5, 'Poulet', 0, false),
  (119, 5, 'Crevettes', 0, false),
  (15, 5, 'Tofu', 0, false),
  (120, 5, 'Tempeh', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Toppings options (step_id = 6) - corrected assignment
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (16, 6, 'Graines de sésame', 0, false),
  (121, 6, 'Cacahuètes', 0, false),
  (122, 6, 'Crispy oignons', 0, false),
  (123, 6, 'Furikake', 0, false),
  (124, 6, 'Chips wonton', 0, false),
  (125, 6, 'Menthe', 0, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra sauce options (step_id = 7) - same as sauce but with price
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (126, 7, 'Extra Sésame', 1.00, false),
  (127, 7, 'Extra Teriyaki', 1.00, false),
  (128, 7, 'Extra Soja', 1.00, false),
  (129, 7, 'Extra Ponzu', 1.00, false),
  (130, 7, 'Extra Miso', 1.00, false),
  (131, 7, 'Extra Épicée', 1.00, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra garniture options (step_id = 8) - key ones from garnitures with price
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (132, 8, 'Extra Avocat', 1.00, false),
  (133, 8, 'Extra Edamame', 1.00, false),
  (134, 8, 'Extra Concombre', 1.00, false),
  (135, 8, 'Extra Mangue', 1.00, false),
  (136, 8, 'Extra Carotte', 1.00, false),
  (137, 8, 'Extra Maïs', 1.00, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;

-- Extra protein options (step_id = 9) - same as protein but with higher price
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (138, 9, 'Extra Saumon', 2.00, false),
  (139, 9, 'Extra Thon', 2.00, false),
  (140, 9, 'Extra Poulet', 2.00, false),
  (141, 9, 'Extra Crevettes', 2.00, false),
  (142, 9, 'Extra Tofu', 2.00, false),
  (143, 9, 'Extra Tempeh', 2.00, false)
ON CONFLICT (id) DO UPDATE SET
  step_id = EXCLUDED.step_id,
  name = EXCLUDED.name,
  extra_price = EXCLUDED.extra_price;
