
-- Add sort column to menu_items table
ALTER TABLE public.menu_items 
ADD COLUMN sort INTEGER NOT NULL DEFAULT 0;

-- Update existing items to have sequential sort values within each category
WITH sorted_items AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY id) as new_sort
  FROM menu_items
)
UPDATE menu_items 
SET sort = sorted_items.new_sort
FROM sorted_items 
WHERE menu_items.id = sorted_items.id;
