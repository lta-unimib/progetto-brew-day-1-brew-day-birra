import React from "react";
import MButton from '../components/MButton';

const BeerDelete = (props) => {
  return (
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questa birra?</h4>
        <MButton text="Conferma" onClick={props.onConfirm} />
      </center>
    </div>
  );
};

export default BeerDelete;
