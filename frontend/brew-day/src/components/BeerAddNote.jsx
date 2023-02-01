import React from "react";

const BeerAddNote = (props) => {
  return (
    <div>
      <center>
        <h1>Aggiunta nota:</h1>
        <h4>Descrizione:</h4>
        <textarea id="descriptionTextArea"></textarea>
        <h4>Tipo:</h4>
        <textarea></textarea>
        <br></br>
        <br></br>
        <button>Aggiungi</button>
      </center>
    </div>
  );
};

export default BeerAddNote;