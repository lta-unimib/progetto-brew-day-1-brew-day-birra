import React from "react";

const RecipeEdit = (props) => {
  return (
    <div>
      <p>Nome:</p>
      <textarea id="nameTextArea" defaultValue={props.name}></textarea>
      <p>Descrizione:</p>
      <textarea id="descriptionTextArea" defaultValue={props.description} readOnly={false}></textarea>
    </div>
  );
};

export default RecipeEdit;