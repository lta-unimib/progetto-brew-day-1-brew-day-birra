import React from "react";

const RecipeEdit = (props) => {
  return (
    <div>
      <p>Nome:</p>
      <textarea id="nameTextArea" value={props.name}></textarea>
      <p>Descrizione:</p>
      <textarea id="descriptionTextArea" value={props.description}></textarea>
    </div>
  );
};

export default RecipeEdit;