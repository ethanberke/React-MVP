import React, { useEffect, useState } from "react";
// import Contribute from "./components/Contribute.jsx";
// import Recipes from "./components/Recipes.jsx"


const App = () => {
  const handleRandomRecipe = () => {
  }
  const handleContribute = () => {
  }
  const handleStyle = (event) => {
    setSelectedStyle(event.target.value);
  }
  const [selectedStyle, setSelectedStyle] = useState("")
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
    <button onClick={handleRandomRecipe}>Random Recipe</button>
    <select value={selectedStyle} onChange={handleStyle}>
        <option value="">Select Style</option>
        <option value="American">American</option>
        <option value="Mexican">Mexican</option></select>
      <button onClick={handleContribute}>Contribute</button>
      {recipes.map((recipe) => (
        <div className="recipe" key={recipe.id}>
          <h2>{recipe.recipe_name}</h2>
          <p>Contributor: {recipe.contributor}</p>
        </div>
      ))}
    </main>
  );
};

export default App;
