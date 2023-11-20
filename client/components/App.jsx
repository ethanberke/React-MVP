import React, { useEffect, useState } from "react";
import Recipes from "./Recipes.jsx";
import Contribute from "./Contribute.jsx";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  console.log(recipes)

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        const recipeNames = data.map((recipe) => recipe.recipe_name);
        const uniqueRecipes = [...new Set(recipeNames)];
        setSelectedRecipe(uniqueRecipes[0]);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const handleRecipeSelection = (recipe_id) => {
    fetch(`/api/recipes/${recipe_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRecipe(data);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  };

  const handleRecipeSubmit = (newRecipe) => {
    // POST request to add the recipe
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contributor: newRecipe.contributor,
        recipe_name: newRecipe.recipe_name,
        style: newRecipe.style,
        image_url: newRecipe.image_url,
      }),
    })
      .then((res) => res.json())
      .then((recipeData) => {
        // Handle successful recipe addition
        console.log("Recipe added:", recipeData);
  
        // Use the added recipe's ID for ingredients and instructions
        const recipeId = recipeData.recipe_id;
  
        // POST request to add ingredients
        newRecipe.ingredients.forEach((ingredient) => {
          fetch("/api/ingredients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_id: recipeId,
              ingredient: ingredient,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // Handle successful ingredient addition
              console.log("Ingredient added:", data);
            })
            .catch((error) => {
              console.error("Error adding ingredient:", error);
            });
        });
  
        // POST request to add instructions
        newRecipe.instructions.forEach((instruction) => {
          fetch("/api/instructions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_id: recipeId,
              step_order: instruction.step_order,
              step: instruction.step,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // Handle successful instruction addition
              console.log("Instruction added:", data);
            })
            .catch((error) => {
              console.error("Error adding instruction:", error);
            });
        });
  
        // After adding recipe, ingredients, and instructions, update the UI or perform other actions
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
      });
  };
  

  return (
    <main>
      <h1>Galvanize Recipes</h1>
      <Recipes
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        handleRecipeSelection={handleRecipeSelection}
      />
<Contribute onRecipeSubmit={(newRecipe) => handleRecipeSubmit(newRecipe)} />
    </main>
  );
};

export default App;
