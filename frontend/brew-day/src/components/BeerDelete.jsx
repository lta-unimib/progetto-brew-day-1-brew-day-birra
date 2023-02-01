import React from "react";

const BeerDelete = (props) => {
  return (
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questa birra?</h4>
        <button onClick={props.onConfirm}>Elimina</button>
      </center>
    </div>
  );
};

export default BeerDelete;
