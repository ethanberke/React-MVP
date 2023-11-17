import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());
app.use(express.static("../client"))

app.get("/api/recipes", (req, res) => {
  sql`SELECT * FROM recipes`.then((rows) => {
    res.send(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
