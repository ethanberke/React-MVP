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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, ""],
    });
  };

  const handleIngredientChange = (e, index) => {
    const ingredients = [...newRecipe.ingredients];
    ingredients[index] = e.target.value;
    setNewRecipe({ ...newRecipe, ingredients });
  };

  const handleAddInstruction = () => {
    setNewRecipe({
      ...newRecipe,
      instructions: [...newRecipe.instructions, ""],
    });
  };

  const handleInstructionChange = (e, index) => {
    const instructions = [...newRecipe.instructions];
    instructions[index] = e.target.value;
    setNewRecipe({ ...newRecipe, instructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onRecipeSubmit function from props to submit the new recipe
    onRecipeSubmit(newRecipe);
  };

  return (
    <div>
      <h3>Contribute a Recipe</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Contributor:
          <input
            type="text"
            name="contributor"
            value={newRecipe.contributor}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Recipe Name:
          <input
            type="text"
            name="recipe_name"
            value={newRecipe.recipe_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Style:
          <input
            type="text"
            name="style"
            value={newRecipe.style}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={newRecipe.image_url}
            onChange={handleInputChange}
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
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default Contribute;
