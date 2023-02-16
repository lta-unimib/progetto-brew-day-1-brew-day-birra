import React, { Component } from "react";
import {SHOPPING_ENDPOINT} from '../utils/Protocol';
import RecipeIngredientTableReadOnly from "./RecipeIngredientTableReadOnly";

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
    return (
      <div>
        <center>
          <h2>Ingredienti Mancanti</h2>
          <RecipeIngredientTableReadOnly
            ingredients={this.state.missingIngredients}/>
        </center>
      </div>
    );
  }


}
export default ShoppingList;
