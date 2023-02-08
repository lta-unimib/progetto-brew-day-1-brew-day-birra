import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from "../components/MButton";

class Spesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: 0,
      ingredients: [
        {
          ingredientName: "",
          ingredientQuantity: "",
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
  }

  handleSubmit() {
    const _ingredients = [];
    for (const ingredient of this.state.ingredients) {
      const { ingredientName, ingredientQuantity } = ingredient;
      if (
        ingredientName &&
        ingredientQuantity &&
        this.state.ingredients.indexOf(ingredient) < this.state.added
      ) {
        _ingredients.push({
          name: ingredientName,
          quantity: ingredientQuantity,
        });
      }
    }
    if (_ingredients.length !== 0) {
      fetch("api/shopping/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_ingredients),
      }).then(() => {
        this.setState({
          ingredients: [{ ingredientName: "", ingredientQuantity: "" }],
        });
      });
    }
  }
  handleDeleteIngredient(index) {
    this.state.added -= 1;
    this.setState({
      ingredients: this.state.ingredients.filter((p, i) => i !== index),
    });
  }

  handleAddIngredient() {
    const { ingredientName: newIngName, ingredientQuantity: newIngQuantity } =
      this.state.ingredients[this.state.ingredients.length - 1];
    const ingredients = this.state.ingredients;
    ingredients[ingredients.length - 1] = {
      ingredientName: newIngName,
      ingredientQuantity: newIngQuantity,
    };
    if (newIngName !== '' && newIngQuantity !== '') {
      ingredients.push({ ingredientName: "", ingredientQuantity: "" });
      this.setState({ ingredients });
    }
  }

  handleIngredientChange(field, index, value) {
    const ingredients = this.state.ingredients;
    ingredients[index][field] = value;
    this.setState({ ingredients });
  }

  render() {
    this.state.added = 0;
    return (
      <ThemeProvider theme={theme}>
        <table className="myTable">
          <thead>
            <tr>
              <th>Nome ingrediente</th>
              <th>Quantità</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredients.map((ingredient, index) => {
              let firstColumn = (
                <input
                  id="shoppingInputName"
                  data-testid="shopping-name"
                  type="text"
                  value={ingredient.ingredientName}
                  onChange={(e) =>
                    this.handleIngredientChange(
                      "ingredientName",
                      index,
                      e.target.value
                    )
                  }
                />
              );
              let button = (
                <MButton text="Aggiungi" onClick={this.handleAddIngredient} />
              );
              if (index !== this.state.ingredients.length - 1) {
                this.state.added += 1;
                button = (
                  <MButton
                    text="Elimina"
                    onClick={() => this.handleDeleteIngredient(index)}
                  />
                );
                firstColumn = <p>{ingredient.ingredientName}</p>;
              }
              return (
                <tr key={(this.state.ingredients.length - 1) === index ? 'default' : ingredient.ingredientName}>
                  <td>{firstColumn}</td>
                  <td>
                    <input
                      type="text"
                      data-testid="shopping-quantity"
                      value={ingredient.ingredientQuantity}
                      onChange={(e) =>
                        this.handleIngredientChange(
                          "ingredientQuantity",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>{button}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="shoppingButtonContainer">
          <MButton text="Conferma" onClick={this.handleSubmit} />
        </div>
      </ThemeProvider>
    );
  }
}

export default Spesa;
