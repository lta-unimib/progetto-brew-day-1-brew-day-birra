import React, { useState } from "react";

const Ricetta = ({ match }) => {
  const recipeId = match.params.id;
  const [recipe, setRecipe] = useState({ name: "", description: "" });

  return (
    <div>
      <label>Nome:</label>
      <input type="text" value={recipe.name}/>
      <br/>
      <label>Descrizione:</label>
      <textarea value={recipe.description}/>
    </div>
  );
};

export default Ricetta;