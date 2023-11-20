import React from "react";

const Recipes = ({ recipes, selectedRecipe, handleRecipeSelection }) => {

  return (
    <div>
      {selectedRecipe ? (
        <div className="recipe">
          <h2>{selectedRecipe.recipe_name}</h2>
          <p>Contributor: {selectedRecipe.contributor}</p>
          <p>Style: {selectedRecipe.style}</p>
          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={`ingredient-${index}`}>{ingredient.ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {selectedRecipe.instructions.map((step, index) => (
              <li key={`step-${index}`}>{step.step}</li>
            ))}
          </ol>
        </div>
      ) : null}

      <select onChange={(event) => handleRecipeSelection(event.target.value)}>
        <option value="">Select a recipe</option>
        {recipes.map((recipe) => (
          <option key={recipe.recipe_id} value={recipe.recipe_id}>
            {recipe.recipe_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Recipes;
