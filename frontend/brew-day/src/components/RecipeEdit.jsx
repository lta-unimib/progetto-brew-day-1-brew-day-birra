import React from "react";

const RecipeEdit = (props) => {
  return (
    <div>
      <p>Nome:</p>
      <textarea>{props.name}</textarea><br></br>
      <p>Descrizione:</p>
      <textarea>{props.descrizione}</textarea>
    </div>
  );
};

export default RecipeEdit;