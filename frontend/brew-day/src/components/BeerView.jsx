import React from "react";

const BeerView = (props) => {
  return (
    <div>
      <center>
        <h1>{props.name}</h1>
        <h4>ID ricetta: {props.recipeID}</h4>
        <h4>Note:</h4>
        {props.notes.map((note) => (
          <p key={note.id}>• {note.description}</p>
        ))}
      </center>
    </div>
  );
};

export default BeerView;