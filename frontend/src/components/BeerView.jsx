import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from '../components/MButton';
import {BEERS_ENDPOINT} from '../Protocol';
import BeerNoteTableReadOnly from "./BeerNoteTableReadOnly";


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
    const { showRicetta, recipeID, name } = this.state;

    const recipeView = (
      <div>
        {(recipeID !== null) ? (
          showRicetta
            ? (<RecipeView recipeID={recipeID}/>)
            : <MButton text="Visualizza Ricetta" onClick={this.handleShowRicetta}/>
        ) : null}
      </div>
    );

    return (
      <div>
        <center>
          <h1>{name}</h1>
          {recipeView}
          <BeerNoteTableReadOnly
            notes={this.state.notes}
          />
        </center>
      </div>
    );
  }
}

export default BeerView;
