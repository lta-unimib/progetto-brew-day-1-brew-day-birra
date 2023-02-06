import React, { Component } from "react";
import RecipeView from "./RecipeView";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class BeerView extends Component {
  state = {
    showRicetta: false,
    recipe: {},
    name: "",
    notes: []
  };

  triggerReload = () => {
    fetch(`/api/beer/${this.props.beerID}`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  componentDidMount() {
    this.triggerReload();
  }

  fetchRecipe = async () => {
    const response = await fetch(
      `/api/recipes/${this.state.recipeID}`
    );
    const recipe = await response.json();
    this.setState({ recipe });
  };

  handleShowRicetta = async () => {
    await this.fetchRecipe();
    this.setState({ showRicetta: true });
  };

  render() {
    const { showRicetta, recipe, name, notes } = this.state;

    return (
      <ThemeProvider theme={theme}>
      <div>
        <center>
          <h1>{name}</h1>
          <MButton text="Visualizza ricetta" onClick={this.handleShowRicetta} />
          {showRicetta ?
          (<RecipeView
              name={recipe.name}
              description={recipe.description}
              ingredients={recipe.ingredients}/>) : null}
          <h4>Note:</h4>
          {notes.map(note => (
            <p key={note.id}>• {note.description}</p>
          ))}
        </center>
      </div>
      </ThemeProvider>
    );
  }
}

export default BeerView;
