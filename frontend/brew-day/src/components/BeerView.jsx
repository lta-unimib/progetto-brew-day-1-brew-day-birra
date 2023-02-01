import React from "react";

const BeerView = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.recipeID}</p>
      {props.notes.map((note) => (
        <p key={note.id}>{note.description}</p>
      ))}
    </div>
  );
};

export default BeerView;
