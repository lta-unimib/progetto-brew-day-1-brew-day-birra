import React, { useState } from "react";
import RecipeView from "./RecipeView";

const BeerView = (props) => {
    const [showRicetta, setShowRicetta] = useState(false);
  
    return (
      <div>
        <center>
          <h1>{props.name}</h1>
          <button onClick={() => setShowRicetta(true)}>Visualizza ricetta</button>
          {showRicetta && <RecipeView name="Prova" description="Prova" ingredients={[]}/>}
          <h4>Note:</h4>
          {props.notes.map((note) => (
            <p key={note.id}>• {note.description}</p>
          ))}
        </center>
      </div>
    );
  };
  
  export default BeerView;

//<h4>ID ricetta: {props.recipeID}</h4>