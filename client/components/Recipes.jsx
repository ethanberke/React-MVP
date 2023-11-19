import React from "react";

const Recipes = ({ recipes }) => {
  return (
    <div>
      <h3></h3>
      {recipes.map((recipe) => (
        <div className="recipe" key={recipe.id}>
          <h2>{recipe.recipe_name}</h2>
          <p>Contributor: {recipe.contributor}</p>
          {/* Display other recipe details */}
        </div>
      ))}
    </div>
  );
};

export default Recipes;
