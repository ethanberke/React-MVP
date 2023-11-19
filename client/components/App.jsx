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
        <option value="Cambodian">Cambodian</option>
        <option value="Dessert">Dessert</option>
        <option value="Fusion">Fusion</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Polish">Polish</option>
        <option value="Southern">Southern</option>
        </select>

      <button onClick={handleContribute}>Contribute</button>

      {recipes.map((recipe) => (
        <div className="recipe" key={recipe.id}>
          <h2>{recipe.recipe_name}</h2>
          <p>Contributor: {recipe.contributor}</p>
        </div>
      ))}


      <div>
      <input type="text"
      id="recipeName"
      value="Recipe"/>
      <input type="text"
      id="contributorName"
      value="Contribute"/>
      <input type="text"
      id="imageLink"
      value="Image Link (optional)"/>
      </div>

    </main>
  );
};

export default App;
