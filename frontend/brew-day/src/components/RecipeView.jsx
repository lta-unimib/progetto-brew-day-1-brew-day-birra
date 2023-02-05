import React from "react";

const RecipeView = (props) => {
  const itemList = props.ingredients.map((item) => {
    return (
      <tr key={item.name}>
        <td>
          <img
            className="shoppingImage"
            src={`../../icons/inventory-icons/${item.name}.png`}
            alt={item.name}
            onError={(e) => {
              e.target.src = "../../icons/inventory-icons/sconosciuto.png";
            }}
          />
        </td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  });

  return (
    <div>
      <center>
        <h1> {props.name}</h1>
        <p> {props.description} </p>
        <table className="myTable">
          <thead>
            <tr>
              <th width="25%">Immagine</th>
              <th width="25%">Nome</th>
              <th width="25%">Quantità</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </table>
      </center>
    </div>
  );
};

export default RecipeView;
