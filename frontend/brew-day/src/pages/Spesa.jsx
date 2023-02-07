import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class Spesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [{
        ingredientName: '',
        ingredientQuantity: ''
      }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
  }

  handleSubmit() {
    fetch('api/shopping/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.ingredients.map(({ ingredientName, ingredientQuantity }) => ({ name: ingredientName, quantity: ingredientQuantity })))
    }).then(() => this.setState({ ingredients: [{ ingredientName: '', ingredientQuantity: '' }] }));
  }

  handleAddIngredient() {
    this.setState({
      ingredients: [...this.state.ingredients, { ingredientName: '', ingredientQuantity: '' }]
    });
  }

  handleIngredientChange(field, index, value) {
    const ingredients = this.state.ingredients;
    ingredients[index][field] = value;
    this.setState({ ingredients });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <table className="myTable">
          <thead>
            <tr>
              <th>Nome ingrediente</th>
              <th>Quantità</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={ingredient.ingredientName}
                    onChange={e => this.handleIngredientChange('ingredientName', index, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={ingredient.ingredientQuantity}
                    onChange={e => this.handleIngredientChange('ingredientQuantity', index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MButton text="Aggiungi" id="shoppingBuyButton" onClick={this.handleSubmit} />
        <MButton text="Altro ingrediente" onClick={this.handleAddIngredient} />
      </ThemeProvider>
    );
  }
}

export default Spesa;
