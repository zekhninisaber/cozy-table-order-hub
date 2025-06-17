
-- Create tables table (for the 7 restaurant tables)
CREATE TABLE public.tables (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL UNIQUE
);

-- Insert the 7 tables
INSERT INTO public.tables (label) VALUES 
  ('01'), ('02'), ('03'), ('04'), ('05'), ('06'), ('07');

-- Create categories table
CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  names JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  thumbnail_url TEXT
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES public.categories(id) ON DELETE CASCADE,
  names JSONB NOT NULL DEFAULT '{}'::jsonb,
  descriptions JSONB NOT NULL DEFAULT '{}'::jsonb,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  photo_url TEXT,
  out_of_stock BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}'::text[]
);

-- Create builder_steps table (for Poke Bowl builder)
CREATE TABLE public.builder_steps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0,
  max_select INTEGER NOT NULL DEFAULT 1
);

-- Create builder_options table (for Poke Bowl builder options)
CREATE TABLE public.builder_options (
  id SERIAL PRIMARY KEY,
  step_id INTEGER REFERENCES public.builder_steps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  extra_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  out_of_stock BOOLEAN NOT NULL DEFAULT false
);

-- Create orders table
CREATE TABLE public.orders (
  id SERIAL PRIMARY KEY,
  table_id INTEGER REFERENCES public.tables(id),
  customer_name TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'fr',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_lines table
CREATE TABLE public.order_lines (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES public.orders(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES public.menu_items(id),
  builder_json JSONB,
  price_each DECIMAL(10,2) NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1
);

-- Insert initial menu categories
INSERT INTO public.categories (names, sort, visible) VALUES 
  ('{"fr": "Sushi Burger Menu", "en": "Sushi Burger Menu", "nl": "Sushi Burger Menu"}', 1, true),
  ('{"fr": "Bao Bun Menu", "en": "Bao Bun Menu", "nl": "Bao Bun Menu"}', 2, true),
  ('{"fr": "Poke Bowls", "en": "Poke Bowls", "nl": "Poke Bowls"}', 3, true),
  ('{"fr": "Sides", "en": "Sides", "nl": "Sides"}', 4, true),
  ('{"fr": "Drinks", "en": "Drinks", "nl": "Drinks"}', 5, true),
  ('{"fr": "Desserts", "en": "Desserts", "nl": "Desserts"}', 6, true);

-- Insert initial menu items
INSERT INTO public.menu_items (category_id, names, descriptions, price) VALUES 
  -- Sushi Burger Menu
  (1, '{"fr": "Sushi Burger Crispy Chicken", "en": "Sushi Burger Crispy Chicken", "nl": "Sushi Burger Crispy Chicken"}', '{"fr": "Délicieux sushi burger au poulet croustillant", "en": "Delicious crispy chicken sushi burger", "nl": "Heerlijke knapperige kip sushi burger"}', 12.50),
  (1, '{"fr": "Sushi Burger Creamy Salmon", "en": "Sushi Burger Creamy Salmon", "nl": "Sushi Burger Creamy Salmon"}', '{"fr": "Sushi burger au saumon crémeux", "en": "Creamy salmon sushi burger", "nl": "Romige zalm sushi burger"}', 13.50),
  
  -- Bao Bun Menu
  (2, '{"fr": "Bao Bun Teriyaki Beef", "en": "Bao Bun Teriyaki Beef", "nl": "Bao Bun Teriyaki Beef"}', '{"fr": "Bao bun au bœuf teriyaki", "en": "Teriyaki beef bao bun", "nl": "Teriyaki rundvlees bao bun"}', 11.00),
  (2, '{"fr": "Bao Bun Chicken", "en": "Bao Bun Chicken", "nl": "Bao Bun Chicken"}', '{"fr": "Bao bun au poulet", "en": "Chicken bao bun", "nl": "Kip bao bun"}', 10.50),
  
  -- Sides
  (4, '{"fr": "Crispy Chicken", "en": "Crispy Chicken", "nl": "Crispy Chicken"}', '{"fr": "Poulet croustillant", "en": "Crispy chicken", "nl": "Knapperige kip"}', 8.50),
  (4, '{"fr": "Nachos Chicken", "en": "Nachos Chicken", "nl": "Nachos Chicken"}', '{"fr": "Nachos au poulet", "en": "Chicken nachos", "nl": "Kip nachos"}', 9.00),
  (4, '{"fr": "Scampi Tempura", "en": "Scampi Tempura", "nl": "Scampi Tempura"}', '{"fr": "Scampi en tempura", "en": "Tempura scampi", "nl": "Tempura scampi"}', 10.00),
  (4, '{"fr": "Falafels", "en": "Falafels", "nl": "Falafels"}', '{"fr": "Falafels croustillants", "en": "Crispy falafels", "nl": "Knapperige falafels"}', 7.50),
  (4, '{"fr": "Gyozas Crevettes", "en": "Shrimp Gyozas", "nl": "Garnalen Gyozas"}', '{"fr": "Gyozas aux crevettes", "en": "Shrimp gyozas", "nl": "Garnalen gyozas"}', 9.50),
  (4, '{"fr": "Gyozas Légumes", "en": "Vegetable Gyozas", "nl": "Groenten Gyozas"}', '{"fr": "Gyozas aux légumes", "en": "Vegetable gyozas", "nl": "Groenten gyozas"}', 8.50),
  
  -- Drinks
  (5, '{"fr": "Soft Drinks", "en": "Soft Drinks", "nl": "Frisdranken"}', '{"fr": "Boissons gazeuses", "en": "Soft drinks", "nl": "Frisdranken"}', 3.50),
  (5, '{"fr": "SPA Water", "en": "SPA Water", "nl": "SPA Water"}', '{"fr": "Eau SPA", "en": "SPA water", "nl": "SPA water"}', 3.00),
  
  -- Desserts
  (6, '{"fr": "Iced Mochis (2 pcs)", "en": "Iced Mochis (2 pcs)", "nl": "Iced Mochis (2 stuks)"}', '{"fr": "Mochis glacés (2 pièces)", "en": "Iced mochis (2 pieces)", "nl": "Ijs mochis (2 stuks)"}', 6.50),
  (6, '{"fr": "Iced Mochis (4 pcs)", "en": "Iced Mochis (4 pcs)", "nl": "Iced Mochis (4 stuks)"}', '{"fr": "Mochis glacés (4 pièces)", "en": "Iced mochis (4 pieces)", "nl": "Ijs mochis (4 stuks)"}', 12.00);

-- Insert Poke Bowl signature dishes (for category 3)
INSERT INTO public.menu_items (category_id, names, descriptions, price) VALUES 
  (3, '{"fr": "Signature Bowl 1", "en": "Signature Bowl 1", "nl": "Signature Bowl 1"}', '{"fr": "Notre première création signature", "en": "Our first signature creation", "nl": "Onze eerste signature creatie"}', 14.50),
  (3, '{"fr": "Signature Bowl 2", "en": "Signature Bowl 2", "nl": "Signature Bowl 2"}', '{"fr": "Notre deuxième création signature", "en": "Our second signature creation", "nl": "Onze tweede signature creatie"}', 15.00),
  (3, '{"fr": "Signature Bowl 3", "en": "Signature Bowl 3", "nl": "Signature Bowl 3"}', '{"fr": "Notre troisième création signature", "en": "Our third signature creation", "nl": "Onze derde signature creatie"}', 15.50),
  (3, '{"fr": "Signature Bowl 4", "en": "Signature Bowl 4", "nl": "Signature Bowl 4"}', '{"fr": "Notre quatrième création signature", "en": "Our fourth signature creation", "nl": "Onze vierde signature creatie"}', 16.00),
  (3, '{"fr": "Signature Bowl 5", "en": "Signature Bowl 5", "nl": "Signature Bowl 5"}', '{"fr": "Notre cinquième création signature", "en": "Our fifth signature creation", "nl": "Onze vijfde signature creatie"}', 16.50),
  (3, '{"fr": "Signature Bowl 6", "en": "Signature Bowl 6", "nl": "Signature Bowl 6"}', '{"fr": "Notre sixième création signature", "en": "Our sixth signature creation", "nl": "Onze zesde signature creatie"}', 17.00),
  (3, '{"fr": "Signature Bowl 7", "en": "Signature Bowl 7", "nl": "Signature Bowl 7"}', '{"fr": "Notre septième création signature", "en": "Our seventh signature creation", "nl": "Onze zevende signature creatie"}', 17.50);

-- Insert builder steps for "Make Your Own" Poke Bowl
INSERT INTO public.builder_steps (name, sort, max_select) VALUES 
  ('Base', 1, 0), -- 0 means no limit (required, no max)
  ('Sauce', 2, 2), -- max 2
  ('Vegetables', 3, 5), -- max 5
  ('Protein', 4, 1), -- max 1
  ('Toppings', 5, 2); -- max 2

-- Insert builder options for each step
-- Base options (step 1)
INSERT INTO public.builder_options (step_id, name, extra_price) VALUES 
  (1, 'Riz blanc', 0.00),
  (1, 'Riz complet', 0.50),
  (1, 'Salade verte', 0.00),
  (1, 'Quinoa', 1.00);

-- Sauce options (step 2)
INSERT INTO public.builder_options (step_id, name, extra_price) VALUES 
  (2, 'Sauce soja', 0.00),
  (2, 'Sauce teriyaki', 0.00),
  (2, 'Sauce épicée mayo', 0.00),
  (2, 'Sauce wasabi', 0.00),
  (2, 'Sauce ponzu', 0.50);

-- Vegetable options (step 3)
INSERT INTO public.builder_options (step_id, name, extra_price) VALUES 
  (3, 'Concombre', 0.00),
  (3, 'Avocat', 1.00),
  (3, 'Radis', 0.00),
  (3, 'Edamame', 0.50),
  (3, 'Carotte', 0.00),
  (3, 'Algues wakame', 0.50),
  (3, 'Maïs', 0.00),
  (3, 'Tomate cerise', 0.50);

-- Protein options (step 4)
INSERT INTO public.builder_options (step_id, name, extra_price) VALUES 
  (4, 'Saumon', 3.00),
  (4, 'Thon', 3.50),
  (4, 'Crevettes', 2.50),
  (4, 'Poulet teriyaki', 2.00),
  (4, 'Tofu', 1.50);

-- Topping options (step 5)
INSERT INTO public.builder_options (step_id, name, extra_price) VALUES 
  (5, 'Graines de sésame', 0.00),
  (5, 'Oignons frits', 0.50),
  (5, 'Nori', 0.00),
  (5, 'Gingembre mariné', 0.00),
  (5, 'Cacahuètes', 0.50);
