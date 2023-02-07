import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class Spesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientQuantity: '',
    };
  }

  handleSubmit() {
    fetch('api/shopping/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ name: this.state.ingredientName, quantity: this.state.ingredientQuantity }]),
    })
      .then(response => response.json())
      .then(this.setState({ ingredientName: '', ingredientQuantity: '' }));
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
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.ingredientName}
                  onChange={e => this.setState({ ingredientName: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.ingredientQuantity}
                  onChange={e => this.setState({ ingredientQuantity: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <MButton text="Aggiungi" id="shoppingBuyButton" onClick={() => this.handleSubmit()} />
      </ThemeProvider>
    );
  }
}

export default Spesa;