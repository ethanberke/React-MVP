import React from "react";

const Recipes = ({ recipes, selectedRecipe, handleRecipeSelection }) => {
  return (
    <div>
      {selectedRecipe ? (
        <div className="recipe">
          <h2>{selectedRecipe.recipe_name}</h2>
          <br />
          <p>Contributor: {selectedRecipe.contributor}</p>
          <br />
          <p>Style: {selectedRecipe.style}</p>
          <br />
          <img
          src={selectedRecipe.image_url}
          alt="Recipe"
          style={{ maxWidth: "300px", border: "1px solid black" }}
        />
          <br />
          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={`ingredient-${index}`}>{ingredient.ingredient}</li>
            ))}
          </ul>
          <br />
          <h3>Instructions:</h3>
          <ol>
            {selectedRecipe.instructions && selectedRecipe.instructions.map((step, index) => (
              <li key={`step-${index}`}>{step.step}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default Recipes;
