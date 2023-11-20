import React, { useEffect, useState } from "react";
import Recipes from "./Recipes.jsx";
import Contribute from "./Contribute.jsx";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
console.log(recipes)


  const handleRecipeSelection = (recipe_name = null) => {
    let fetchURL = "/api/recipes";
    if (recipe_name) {
      fetchURL += `/${recipe_name}`;
    }
  
    fetch(fetchURL)
      .then((res) => {
        // Log the response text before parsing as JSON
        return res.text();
      })
      .then((data) => {
        console.log("Response received:", data); // Log the response
  
        // Try parsing the response as JSON
        try {
          const jsonData = JSON.parse(data);
          setSelectedRecipe(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  };
  

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <main>
      <Recipes
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        handleRecipeSelection={handleRecipeSelection}
      />
      <Contribute reloadRecipes={() => window.location.reload()} />
    </main>
  );
};

export default App;
