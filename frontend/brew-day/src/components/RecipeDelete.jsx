import React from "react";
import RecipeView from "./RecipeView";

const RecipeDelete = (props) => {
  return (
    <div>
      <RecipeView name={props.name} description={props.description} ingredients={props.ingredients}/>
      <button class="recipeButton">Sei sicuro di voler rimuovere la ricetta?</button>
    </div>
  );
};

export default RecipeDelete;