import React, { useEffect, useState } from "react";
import Contribute from "./Contribute.jsx";
import Recipes from "./Recipes.jsx";

const App = () => {
  const [selectedDish, setSelectedDish] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store selected recipe details
  const [showMeals, setShowMeals] = useState(false);

  useEffect(() => {
    // fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data); // Update recipes state with fetched data
        // Extract dish names to update the dropdown
        const dishNames = data.map((recipe) => recipe.recipe_name);
        // Remove duplicates and update the dropdown with unique dish names
        const uniqueDishes = [...new Set(dishNames)];
        setSelectedDish(uniqueDishes[0]); // Set the selected dish to the first available dish
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  const fetchRecipeDetails = (recipeId) => {
    fetch(`/api/recipes/${recipeId}`) // Assuming an endpoint like /api/recipes/:id to fetch a recipe by ID
      .then((res) => res.json())
      .then((data) => {
        setSelectedRecipe(data); // Set selected recipe details including ingredients and instructions
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  };

  const handleRandomRecipe = () => {
    fetch("/api/recipes/random")
      .then((res) => res.json())
      .then((data) => {
        setRandomRecipe(data); // Update state with the random recipe
      })
      .catch((error) => {
        console.error("Error fetching random recipe:", error);
      });
  };

  const handleContribute = () => {
    // Logic for handling Contribute button click
  };

  const handleSelectDish = (event) => {
    const selectedRecipeName = event.target.value;
    const selectedRecipeData = recipes.find(
      (recipe) => recipe.recipe_name === selectedRecipeName
    );
    setSelectedDish(selectedRecipeData);
    fetchRecipeDetails(selectedRecipeData.id); // Fetch details (ingredients and instructions) for the selected recipe
  };

  return (
    <main>
      <button onClick={handleRandomRecipe}>Random Recipe</button>

      {randomRecipe && (
        <div className="recipe">
          <h2>{randomRecipe.recipe_name}</h2>
          <p>Contributor: {randomRecipe.contributor}</p>
          {/* Display other details of the random recipe */}
        </div>
      )}

      <select value={selectedDish} onChange={handleSelectDish}>
       {recipes.map((recipe) => (
        <option key={recipe.id} value={recipe.recipe_name}>
          {recipe.recipe_name}
        </option>
        ))}
      </select>

      {selectedRecipe && (
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3>Instructions:</h3>
          <ol>
            {selectedRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}








      <button onClick={handleContribute}>Contribute</button>

      <Recipes recipes={recipes} />

      <Contribute />
    </main>
  );
};

export default App;
