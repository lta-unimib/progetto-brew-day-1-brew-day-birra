import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from '../components/MButton';
import {BEERS_ENDPOINT} from '../Protocol';


class BeerView extends Component {
  state = {
    showRicetta: false,
    recipeID: null,
    name: "",
    notes: []
  };

  triggerReload = () => {
    fetch(BEERS_ENDPOINT + `${this.props.beerID}`)
    .then(response => response.json())
    .then(data => this.setState({...data}));
  }

  componentDidMount() {
    this.triggerReload();
  }

  handleShowRicetta = async () => {
    this.setState({ showRicetta: true });
  };

  render() {
    const { showRicetta, recipeID, name, notes } = this.state;

    const recipeView = (
      <div>
        {(recipeID !== null) ? (
          <div>
            <MButton text="Visualizza Ricetta" onClick={this.handleShowRicetta}/>
            {showRicetta ? (<RecipeView recipeID={recipeID}/>) : null}
          </div>
        ) : null}
      </div>
    );

    return (
      <div>
        <center>
          <h1>{name}</h1>
          {recipeView}
          <h4>Note:</h4>
          {notes.map(note => (
            <p key={note.noteID}>• {note.description}</p>
          ))}
        </center>
      </div>
    );
  }
}

export default BeerView;
