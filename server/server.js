import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());
app.use(express.static("../client"));



app.get("/api/recipes", (req, res) => {
  sql`
    SELECT 
      recipes.id AS recipe_id,
      recipes.contributor,
      recipes.recipe_name,
      recipes.style,
      recipes.image_url,
      ingredients.id AS ingredient_id,
      ingredients.ingredient,
      instructions.id AS instruction_id,
      instructions.step_order,
      instructions.step
    FROM 
      recipes
    INNER JOIN 
      ingredients ON recipes.id = ingredients.recipe_id
    INNER JOIN 
      instructions ON recipes.id = instructions.recipe_id
  `
    .then((data) => {
      const recipes = {};
      data.forEach((row) => {
        const {
          recipe_id,
          contributor,
          recipe_name,
          style,
          image_url,
          ingredient_id,
          ingredient,
          instruction_id,
          step_order,
          step,
        } = row;

        if (!recipes[recipe_id]) {
          recipes[recipe_id] = {
            recipe_id,
            contributor,
            recipe_name,
            style,
            image_url,
            ingredients: [],
            instructions: [],
          };
        }

        if (ingredient_id && ingredient) {
          recipes[recipe_id].ingredients.push({ ingredient_id, ingredient });
        }

        if (instruction_id && step_order && step) {
          recipes[recipe_id].instructions.push({ instruction_id, step_order, step });
        }
      });

      const recipesArray = Object.values(recipes);

      res.send(recipesArray);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/api/recipes/:recipe_id", (req, res) => {
  const recipeId = req.params.recipe_id;

  sql`
    SELECT 
      recipes.id AS recipe_id,
      recipes.contributor,
      recipes.recipe_name,
      recipes.style,
      recipes.image_url,
      ingredients.id AS ingredient_id,
      ingredients.ingredient,
      instructions.id AS instruction_id,
      instructions.step_order,
      instructions.step
    FROM 
      recipes
    INNER JOIN 
      ingredients ON recipes.id = ingredients.recipe_id
    INNER JOIN 
      instructions ON recipes.id = instructions.recipe_id
    WHERE 
      recipes.id = ${recipeId}
  `
    .then((data) => {
      if (data.length === 0) {
        res.sendStatus(404);
      } else {
        const recipeData = {
          recipe_id: data[0].recipe_id,
          contributor: data[0].contributor,
          recipe_name: data[0].recipe_name,
          style: data[0].style,
          image_url: data[0].image_url,
          ingredients: [],
          instructions: [],
        };
        //Set prevents duplication
        const seenIngredients = new Set();
        const seenInstructions = new Set();

        data.forEach((row) => {
          if (row.ingredient_id && row.ingredient && !seenIngredients.has(row.ingredient_id)) {
            recipeData.ingredients.push({ ingredient_id: row.ingredient_id, ingredient: row.ingredient });
            seenIngredients.add(row.ingredient_id);
          }

          if (row.instruction_id && row.step_order && row.step && !seenInstructions.has(row.instruction_id)) {
            recipeData.instructions.push({ instruction_id: row.instruction_id, step_order: row.step_order, step: row.step });
            seenInstructions.add(row.instruction_id);
          }
        });

        res.json(recipeData);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//recipes
app.post("/api/recipes", (req, res) => {
  const { contributor, recipe_name, style, image_url } = req.body;
  sql`INSERT INTO recipes(contributor, recipe_name, style, image_url) VALUES (${contributor}, ${recipe_name}, ${style}, ${image_url}) RETURNING *`
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
//ingredients
app.post("/api/ingredients", (req, res) => {
  const { recipe_id, ingredient } = req.body;
  sql`INSERT INTO ingredients( recipe_id, ingredient) VALUES (${recipe_id}, ${ingredient}) RETURNING *`
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => {
      console.error("Error Adding Ingredients:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
//instructions
app.post("/api/instructions", (req, res) => {
  const { recipe_id, step_order, step } = req.body;
  sql`INSERT INTO instructions(recipe_id, step_order, step) VALUES (${recipe_id}, ${step_order}, ${step}) RETURNING *`
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});