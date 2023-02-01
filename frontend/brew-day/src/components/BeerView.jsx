import React, { Component } from "react";
import RecipeView from "./RecipeView";

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
      <div>
        <center>
          <h1>{name}</h1>
          <button onClick={this.handleShowRicetta}>Visualizza ricetta</button>
          {showRicetta && (
            <RecipeView
              name={recipe.name ? recipe.name : ""}
              description="Descrizione"
              ingredients={recipe.ingredients ? recipe.ingredients : []}
            />
          )}
          <h4>Note:</h4>
          {notes.map(note => (
            <p key={note.id}>• {note.description}</p>
          ))}
        </center>
      </div>
    );
  }
}

export default BeerView;