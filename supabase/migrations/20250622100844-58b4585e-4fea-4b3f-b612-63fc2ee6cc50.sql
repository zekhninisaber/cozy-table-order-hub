
-- Clean up builder_options table with correct mapping
-- First, delete all invalid/misplaced options
DELETE FROM builder_options;

-- Insert Size options (step_id = 1)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (100, 1, 'Regular', 0, false),
  (101, 1, 'Large', 2.00, false);

-- Insert Base options (step_id = 2)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (200, 2, 'Riz blanc', 0, false),
  (201, 2, 'Riz sushi', 0, false),
  (202, 2, 'Quinoa', 0, false),
  (203, 2, 'Salade', 0, false);

-- Insert Sauce options (step_id = 3)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (300, 3, 'Sésame', 0, false),
  (301, 3, 'Teriyaki', 0, false),
  (302, 3, 'Soja', 0, false),
  (303, 3, 'Ponzu', 0, false),
  (304, 3, 'Miso', 0, false),
  (305, 3, 'Épicée', 0, false);

-- Insert Garnitures options (step_id = 4)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (400, 4, 'Avocat', 0, false),
  (401, 4, 'Edamame', 0, false),
  (402, 4, 'Concombre', 0, false),
  (403, 4, 'Mangue', 0, false),
  (404, 4, 'Carotte', 0, false),
  (405, 4, 'Oignons frits', 0, false),
  (406, 4, 'Maïs', 0, false),
  (407, 4, 'Radis', 0, false),
  (408, 4, 'Betterave', 0, false),
  (409, 4, 'Wakame', 0, false),
  (410, 4, 'Ananas', 0, false),
  (411, 4, 'Coriandre', 0, false),
  (412, 4, 'Tomate', 0, false),
  (413, 4, 'Chou rouge', 0, false),
  (414, 4, 'Oignons nouveaux', 0, false),
  (415, 4, 'Courgette', 0, false),
  (416, 4, 'Jalapeño', 0, false);

-- Insert Protein options (step_id = 5)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (500, 5, 'Saumon', 0, false),
  (501, 5, 'Thon', 0, false),
  (502, 5, 'Poulet', 0, false),
  (503, 5, 'Crevettes', 0, false),
  (504, 5, 'Tofu', 0, false),
  (505, 5, 'Tempeh', 0, false);

-- Insert Toppings options (step_id = 6)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (600, 6, 'Graines de sésame', 0, false),
  (601, 6, 'Cacahuètes', 0, false),
  (602, 6, 'Crispy oignons', 0, false),
  (603, 6, 'Furikake', 0, false),
  (604, 6, 'Chips wonton', 0, false),
  (605, 6, 'Menthe', 0, false);

-- Insert Extra Sauce options (step_id = 7)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (700, 7, 'Extra Sésame', 1.00, false),
  (701, 7, 'Extra Teriyaki', 1.00, false),
  (702, 7, 'Extra Soja', 1.00, false),
  (703, 7, 'Extra Ponzu', 1.00, false),
  (704, 7, 'Extra Miso', 1.00, false),
  (705, 7, 'Extra Épicée', 1.00, false);

-- Insert Extra Garniture options (step_id = 8)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (800, 8, 'Extra Avocat', 1.00, false),
  (801, 8, 'Extra Edamame', 1.00, false),
  (802, 8, 'Extra Concombre', 1.00, false),
  (803, 8, 'Extra Mangue', 1.00, false),
  (804, 8, 'Extra Carotte', 1.00, false),
  (805, 8, 'Extra Maïs', 1.00, false);

-- Insert Extra Protein options (step_id = 9)
INSERT INTO builder_options (id, step_id, name, extra_price, out_of_stock) VALUES
  (900, 9, 'Extra Saumon', 2.00, false),
  (901, 9, 'Extra Thon', 2.00, false),
  (902, 9, 'Extra Poulet', 2.00, false),
  (903, 9, 'Extra Crevettes', 2.00, false),
  (904, 9, 'Extra Tofu', 2.00, false),
  (905, 9, 'Extra Tempeh', 2.00, false);
