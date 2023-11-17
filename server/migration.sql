DROP TABLE IF EXISTS instructions;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  contributor TEXT NOT NULL,
  recipe_name TEXT NOT NULL,
  style TEXT NOT NULL,
  image_url TEXT
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  ingredient TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE instructions (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  step_order INT NOT NULL,
  step TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

INSERT INTO recipes (contributor, recipe_name, style, image_url)
VALUES ('Ethan', 'Example Dish', 'American', null);

INSERT INTO ingredients (recipe_id, ingredient)
VALUES  
  (1, '2 cups of flour'),
  (1, '1 teaspoon of baking soda'),
  (1, '1/2 cup of sugar'),
  (1, '1/2 cup of butter');

INSERT INTO instructions (recipe_id, step_order, step)
VALUES
    (1, 1, 'Preheat the oven'),
    (1, 2, 'Mix the ingredients'),
    (1, 3, 'Bake for 30 minutes');
