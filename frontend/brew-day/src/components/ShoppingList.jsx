import React, { Component } from "react";
import {SHOPPING_ENDPOINT} from '../Protocol';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: [],
      newBeerQuantity: props.quantity,
      recipeID: props.recipeID,
    };
  }

  componentDidMount() {
    fetch(SHOPPING_ENDPOINT + `${this.state.recipeID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: this.state.newBeerQuantity,
      }),
      }).then((response) => response.json())
      .then((data) => this.setState({ missingIngredients: data }));
  }


  render() {
    const itemList = this.state.missingIngredients.map((item) => {
      let imagePath = `../../icons/inventory-icons/${item.name}.png`;
      let defaultImage = "../../icons/inventory-icons/sconosciuto.png";
      return (
        <tr key={item.name}>
          <td>
            <img
              className="shoppingImage"
              src={imagePath}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });

    const action = () => {
      if (this.state.missingIngredients.length !== 0) {
        return (
          <div>
            <center>
              <h2 style={{color: (this.props.color ?? 'black')}}>Ingredienti Mancanti</h2>
            </center>
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
          </div>
        );
      }
    };

    return (
        <div>
          {action()}
        </div>
    );
  }


}
export default ShoppingList;
