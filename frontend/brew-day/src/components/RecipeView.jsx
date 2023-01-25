import React from "react";

const RecipeView = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default RecipeView;