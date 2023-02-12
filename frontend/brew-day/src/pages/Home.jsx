import React, { Component } from "react";
import RecipeExecute from "../components/RecipeExecute";
import {ADVICE_ENDPOINT, SETTINGS_ENDPOINT } from '../Protocol';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null,
      nextRecipeID: null,
    };
  }

  triggerReload() {
    fetch(ADVICE_ENDPOINT)
      .then((res) => res.json())
      .then((data) => this.setState({ advice: data }))
      .catch(() => {});
  }

  triggerReloadSettings() {
    fetch(SETTINGS_ENDPOINT + "nextRecipeID")
      .then((res) => res.json())
      .then((data) => this.setState({ nextRecipeID: data.value }))
      .catch(() => {});
  }

  componentDidMount() {
    this.triggerReload();
    this.triggerReloadSettings();
  }

  render() {
    return (
      <div>
        <center>
          <h1 className="advice-texts">Vuoi un consiglio?</h1>
          {this.state.advice === null ? (
            <h1 className="advice-texts">Prova ad inserire qualche ricetta</h1>
          ) : (
            <div>
              <h1 className="advice-texts">
                Ecco quale birra dovresti preparare
              </h1>
              <RecipeExecute
                recipeID={this.state.advice.recipeID}
                color="white"
                onConfirm={this.triggerReload}
              />
              <h3 className="advice-texts">
                La massima quantità realizzabile è {" "}
                {this.state.advice.quantity == -1 ? "infinita" : this.state.advice.quantity}
              </h3>
            </div>
          )}
          {this.state.nextRecipeID === null || this.state.nextRecipeID === "" ? (
            <h1 className="advice-texts">Nessuna ricetta in programma</h1>
          ) : (
            <div>
              <h1 className="advice-texts">
                Ecco la prossima birra in programma
              </h1>
              <RecipeExecute
                recipeID={this.state.nextRecipeID}
                color="white"
                onConfirm={this.triggerReload}
              />
            </div>
          )}
        </center>
      </div>
    );
  }
}

export default Home;
