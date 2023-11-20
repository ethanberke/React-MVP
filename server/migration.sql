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
  ('Danny', 'Just Okay Beef Stew', 'American', 'https://www.budgetbytes.com/wp-content/uploads/2023/02/Slow-Cooker-Beef-Stew-V1.jpeg'),
  ('Ethan2', 'Example Dish2', 'American', null);

-- Get recipe IDs
SELECT id FROM recipes;

-- Insert into ingredients table
INSERT INTO ingredients (recipe_id, ingredient)
VALUES  
  (1, '2 lbs red potatoes'),
  (1, '1 yellow onion'),
  (1, '3 carrots'),
  (1, '4 stalks celery'),
  (1, '4 cloves garlic'),
  (1, '1.5 lbs beef stew meat'),
  (1, '2 tbsp all purpose flour'),
  (1, '1/4 tsp salt'),
  (1, '1/4 tsp freshly cracked pepper'),
  (1, '2 tbsp cooking oil'),
  (1, '1 tbsp soy sauce'),
  (1, '1.5 tsp brown sugar'),
  (1, '1.5 tsp dried rosemary'),
  (1, '1.5 tsp dried thyme'),
  (2, '1 teaspoon of baking soda'),
  (2, '1/2 cup of sugar'),
  (2, '1/2 cup of butter');

-- Insert into instructions table
INSERT INTO instructions (recipe_id, step_order, step)
VALUES
  (1, 1, 'Dice the onion and red potatoes. Slice the carrots and celery. Mince the garlic. Place the prepared vegetables in a four or five quart slow cooker.'),
  (1, 2, 'Place the stew meat in a bowl and sprinkle the flour, salt, and pepper over top. Toss the meat until it is evenly coated in flour.'),
  (1, 3, 'Heat a large skillet over medium-high. Once very hot, add the cooking oil and swirl to coat the surface of the skillet. Add the stew meat and cook, without stirring, until browned on the bottom. Stir and then allow the beef to brown on a second side. Transfer the meat to the slow cooker.'),
  (1, 4, 'Turn the heat under the skillet down to medium-low. Add the broth, Dijon, Worcestershire sauce, soy sauce, brown sugar, rosemary, and thyme to the skillet. Stir and cook over medium-low until all the browned bits have dissolved off the bottom of the skillet.'),
  (1, 5, 'Pour the broth over the ingredients in the slow cooker and everything a good stir.'),
  (1, 6, 'Place the lid on the slow cooker and cook on high for four hours or low for eight hours.'),
  (1, 7, 'After cooking the meat and vegetables should both be tender. Stir the stew well to allow the potatoes to slightly break down and thicken the gravy. Taste the stew and adjust the salt or other seasonings to your liking. Serve hot!'),
  (2, 1, 'Preheat the oven'),
  (2, 2, 'Mix the ingredients'),
  (2, 3, 'Bake for 30 minutes');
