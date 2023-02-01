import React, { Component } from "react";
import RecipeView from "./RecipeView";

class BeerView extends Component {
  state = {
    showRicetta: false
  };

  handleShowRicetta = () => {
    this.setState({ showRicetta: true });
  };

  render() {
    const { name, notes } = this.props;
    const { showRicetta } = this.state;

    return (
      <div>
        <center>
          <h1>{name}</h1>
          <button onClick={this.handleShowRicetta}>Visualizza ricetta</button>
          {showRicetta && (
            <RecipeView name="Prova" description="Prova" ingredients={[]} />
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

//<h4>ID ricetta: {props.recipeID}</h4>