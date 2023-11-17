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
  sql`SELECT * FROM recipes`
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/api/recipes/style/:recipe_name", (req, res) => {
  const recipeName = req.params.recipe_name;
  sql`SELECT * FROM recipes WHERE recipe_name = ${recipeName}`
    .then((data) => {
      if (data.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(data[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/api/recipes/random", (req, res) => {
  sql`SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1`
    .then((data) => {
      console.log(data)
      res.json(data[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


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

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
