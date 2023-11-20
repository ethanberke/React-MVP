import React, { useState } from "react";

const Contribute = ({ onRecipeSubmit }) => {
  const [newRecipe, setNewRecipe] = useState({
    contributor: "",
    recipe_name: "",
    style: "",
    image_url: "",
    ingredients: [],
    instructions: [],
  });

  const handleAddIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, ""],
    });
  };

  const handleAddInstruction = () => {
    setNewRecipe({
      ...newRecipe,
      instructions: [...newRecipe.instructions, ""],
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index] = e.target.value;
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (e, index) => {
    const updatedInstructions = [...newRecipe.instructions];
    updatedInstructions[index] = e.target.value;
    setNewRecipe({ ...newRecipe, instructions: updatedInstructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecipeSubmit(newRecipe);
  };

  return (
    <div>
      <h3>Contribute a Recipe</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="recipe_name"
            value={newRecipe.recipe_name}
            onChange={(e) => setNewRecipe({ ...newRecipe, recipe_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Contributor:
          <input
            type="text"
            name="contributor"
            value={newRecipe.contributor}
            onChange={(e) => setNewRecipe({ ...newRecipe, contributor: e.target.value })}
          />
        </label>
        <br />
        <label>
          Style/Nationality:
          <input
            type="text"
            name="style"
            value={newRecipe.style}
            onChange={(e) => setNewRecipe({ ...newRecipe, style: e.target.value })}
          />
        </label>
        <br />
        <label>
          Image URL (optional):
          <input
            type="text"
            name="image_url"
            value={newRecipe.image_url}
            onChange={(e) => setNewRecipe({ ...newRecipe, image_url: e.target.value })}
          />
        </label>
        <br />
        <h4>Ingredients:</h4>
        {newRecipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <br />
        <h4>Instructions:</h4>
        {newRecipe.instructions.map((instruction, index) => (
          <div key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction}>
          Add Instruction
        </button>
        <br />
        <br />
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default Contribute;
