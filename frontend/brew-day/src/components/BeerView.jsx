import React, { Component } from "react";
import RecipeView from "./RecipeView";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class BeerView extends Component {
  state = {
    showRicetta: false,
    recipe: {}
  };

  fetchRecipe = async () => {
    const response = await fetch(
      `/api/recipes/${this.props.recipeID}`
    );
    const recipe = await response.json();
    this.setState({ recipe });
  };

  handleShowRicetta = async () => {
    await this.fetchRecipe();
    this.setState({ showRicetta: true });
  };

  render() {
    const { name, notes } = this.props;
    const { showRicetta, recipe } = this.state;

    return (
      <ThemeProvider theme={theme}>
      <div>
        <center>
          <h1>{name}</h1>
          <MButton text="Visualizza ricetta" onClick={this.handleShowRicetta} />
          {showRicetta && (
            <RecipeView
              name={recipe.name}
              description={recipe.description}
              ingredients={recipe.ingredients}
            />
          )}
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