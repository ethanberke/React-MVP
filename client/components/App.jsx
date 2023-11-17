import React, { useEffect, useState } from "react";

const App = () => {
  const [recipes, setrecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setrecipes(recipes);
      });
  }, []);

  return (
    <main>
      {recipes.map((recipe) => (
        <span className="recipe" key={recipe.id}>
          {recipe.description}
        </span>
      ))}
    </main>
  );
};

export default App;
