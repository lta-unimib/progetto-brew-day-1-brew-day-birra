import React, { useState } from "react";
import RecipeView from "./RecipeView";

const RecipeDelete = (props) => {
  const [showRecipe, setShowRecipe] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    setShowRecipe(false);
    setShowButton(false);
  };

  return (
    <div>
      {showRecipe ? (
        <RecipeView name={props.name} description={props.description} ingredients={props.ingredients}/>
      ) : (
        <p>Ricetta rimossa correttamente</p>
      )}
      {showButton && (
        <button className="recipeButton" onClick={handleClick}>Sei sicuro di voler rimuovere la ricetta?</button>
      )}
    </div>
  );
};

export default RecipeDelete;