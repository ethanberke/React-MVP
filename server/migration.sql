-- Drop existing tables if they exist
DROP TABLE IF EXISTS instructions;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

-- Create recipes table
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  contributor TEXT NOT NULL,
  recipe_name TEXT NOT NULL,
  style TEXT NOT NULL,
  image_url TEXT
);

-- Create ingredients table
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  ingredient TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- Create instructions table
CREATE TABLE instructions (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  step_order INT NOT NULL,
  step TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- Insert into recipes table
INSERT INTO recipes (contributor, recipe_name, style, image_url)
VALUES 
  ('Ethan', 'Example Dish', 'American', null),
  ('Ethan2', 'Example Dish2', 'American', null);

-- Get recipe IDs
SELECT id FROM recipes;

-- Insert into ingredients table
INSERT INTO ingredients (recipe_id, ingredient)
VALUES  
  (1, '2 cups of flour'),
  (1, '1 teaspoon of baking soda'),
  (1, '1/2 cup of sugar'),
  (1, '1/2 cup of butter'),
  (2, '2 cups of flour'),
  (2, '1 teaspoon of baking soda'),
  (2, '1/2 cup of sugar'),
  (2, '1/2 cup of butter');

-- Insert into instructions table
INSERT INTO instructions (recipe_id, step_order, step)
VALUES
  (1, 1, 'Preheat the oven'),
  (1, 2, 'Mix the ingredients'),
  (1, 3, 'Bake for 30 minutes'),
  (2, 1, 'Preheat the oven'),
  (2, 2, 'Mix the ingredients'),
  (2, 3, 'Bake for 30 minutes');
