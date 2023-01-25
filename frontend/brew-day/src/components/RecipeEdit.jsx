import React from "react";

const RecipeEdit = (props) => {
  return (
    <div>
      <p>Nome:</p>
      <textarea id="nameTextArea">{props.name}</textarea><br></br>
      <p>Descrizione:</p>
      <textarea id="descriptionTextArea">{props.description}</textarea>
    </div>
  );
};

export default RecipeEdit;