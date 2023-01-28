import React from "react";

const RecipeView = (props) => {

  const itemList = props.ingredients.map(item => {
    let imagePath = `../../icons/inventory-icons/${item.name}.png`;
    let defaultImage = "../../icons/inventory-icons/sconosciuto.png";
    return <tr key={item.name}>
        <td>
          <img
            className="shoppingImage"
            src={imagePath}                 
            onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }}
          />
        </td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
      </tr>
  });

  return (
    <div>
      <center>
        <h1> {props.name}</h1>
        <p>In RecipeView devo cambiare questo testo con props.description tra graffe per avere la descrizione</p>
        <table className="myTable">
          <thead>
            <tr>
              <th width="25%">Immagine</th>
              <th width="25%">Nome</th>
              <th width="25%">Quantità</th>
            </tr>
          </thead>
          <tbody>
            {itemList}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default RecipeView;