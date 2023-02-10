import React, { Component } from "react";
import RecipeView from "./RecipeView";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class BeerView extends Component {
  state = {
    showRicetta: false,
    recipeID: null,
    name: "",
    notes: []
  };

  triggerReload = () => {
    fetch(`/api/beers/${this.props.beerID}`)
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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default BeerView;
